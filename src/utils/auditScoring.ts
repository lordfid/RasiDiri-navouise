/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ALL_QUESTIONS_CATALOG } from "../data/questions";

export interface AuditReport {
  totalQuestions: number;
  duplicateIDs: string[];
  disallowedFormatsFound: string[];
  uiLeaks: Array<{ id: string; type: "prompt" | "option"; text: string; word: string }>;
  incompleteOptions: Array<{ qId: string; optId: string; missing: string[] }>;
  measurementPoints: Record<string, Record<string, number>>;
  coverageWarnings: string[];
  coverageSuccess: string[];
}

export function auditScoring(): AuditReport {
  const report: AuditReport = {
    totalQuestions: ALL_QUESTIONS_CATALOG.length,
    duplicateIDs: [],
    disallowedFormatsFound: [],
    uiLeaks: [],
    incompleteOptions: [],
    measurementPoints: {},
    coverageWarnings: [],
    coverageSuccess: []
  };

  const idSet = new Set<string>();
  const forbiddenWords = [
    "mbti", "cognitive", "cognitive function", "enneagram", "wing", "socionics", 
    "quadra", "disc", "riasec", "introvert", "extrovert", "introversion", "extroversion",
    "ne", "ni", "se", "si", "fe", "fi", "te", "ti", "sp/sx", "sp/so", "sx/so", "attachment style",
    "attachment tendency", "moral style", "conflict style", "communication style", "temperament"
  ];

  // Helper to add measurement point absolute sums
  const addPoint = (system: string, subscale: string, value: number) => {
    if (!report.measurementPoints[system]) {
      report.measurementPoints[system] = {};
    }
    report.measurementPoints[system][subscale] = (report.measurementPoints[system][subscale] || 0) + Math.abs(value);
  };

  ALL_QUESTIONS_CATALOG.forEach(q => {
    // 1. Check duplicate ID
    if (idSet.has(q.id)) {
      report.duplicateIDs.push(q.id);
    }
    idSet.add(q.id);

    // 2. Disallowed formats check (ranking, multiChoice)
    if (q.kind !== "singleChoice" && q.kind !== "forcedChoice") {
      report.disallowedFormatsFound.push(`Question ${q.id} uses kind: ${q.kind}`);
    }

    // 3. UI Leak Check in Prompt
    forbiddenWords.forEach(word => {
      if (q.prompt.toLowerCase().includes(word)) {
        report.uiLeaks.push({ id: q.id, type: "prompt", text: q.prompt, word });
      }
    });

    // 4. Audit options
    q.options.forEach(opt => {
      // UI Leak Check in Option Text
      forbiddenWords.forEach(word => {
        if (opt.text.toLowerCase().includes(word)) {
          report.uiLeaks.push({ id: `${q.id}.${opt.id}`, type: "option", text: opt.text, word });
        }
      });

      // Incomplete option structures audit
      const missing: string[] = [];
      const w = opt.weights;

      // Ensure option weights exist
      if (!w) {
        missing.push("weights object completely missing");
      } else {
        if (!w.positive || Object.keys(w.positive).length === 0) missing.push("positive signals missing");
        if (!w.negative || Object.keys(w.negative).length === 0) missing.push("negative signals missing");
        if (!w.evidence || Object.keys(w.evidence).length === 0) missing.push("evidence tracking missing");
        if (w.reliability === undefined) missing.push("reliability factor missing");
      }

      if (missing.length > 0) {
        report.incompleteOptions.push({
          qId: q.id,
          optId: opt.id,
          missing
        });
      }

      // Add weights to point measurement charts
      if (w) {
        const accumulate = (obj: any, sysName: string) => {
          if (!obj) return;
          Object.keys(obj).forEach(k => {
            const v = obj[k];
            if (typeof v === "number") {
              addPoint(sysName, k, v);
            } else if (typeof v === "object" && v !== null) {
              // double nest like attitudinalPsyche { L: { confident: 1.0 } }
              Object.keys(v).forEach(subK => {
                const subV = v[subK];
                if (typeof subV === "number") {
                  addPoint(`${sysName}.${k}`, subK, subV);
                }
              });
            }
          });
        };

        Object.keys(w).forEach(sysKey => {
          if (sysKey === "reliability" || sysKey === "positive" || sysKey === "negative" || sysKey === "evidence") return;
          const sysVal = (w as any)[sysKey];
          if (typeof sysVal === "object" && sysVal !== null) {
            accumulate(sysVal, sysKey);
          } else if (typeof sysVal === "number") {
            addPoint("directWeights", sysKey, sysVal);
          }
        });
      }
    });
  });

  // Calculate audit targets validation
  const targets: Array<{ system: string; key?: string; name: string; target: number }> = [
    // Cognitive Functions (Ni, Ne, etc)
    { system: "cognitive", key: "Ni", name: "Cognitive Ni", target: 50 },
    { system: "cognitive", key: "Ne", name: "Cognitive Ne", target: 50 },
    { system: "cognitive", key: "Si", name: "Cognitive Si", target: 50 },
    { system: "cognitive", key: "Se", name: "Cognitive Se", target: 50 },
    { system: "cognitive", key: "Fi", name: "Cognitive Fi", target: 50 },
    { system: "cognitive", key: "Fe", name: "Cognitive Fe", target: 50 },
    { system: "cognitive", key: "Ti", name: "Cognitive Ti", target: 50 },
    { system: "cognitive", key: "Te", name: "Cognitive Te", target: 50 },
    // MBTI axis (I, E, etc)
    { system: "mbtiAxis", key: "I", name: "MBTI axis I", target: 40 },
    { system: "mbtiAxis", key: "E", name: "MBTI axis E", target: 40 },
    { system: "mbtiAxis", key: "S", name: "MBTI axis S", target: 40 },
    { system: "mbtiAxis", key: "N", name: "MBTI axis N", target: 40 },
    { system: "mbtiAxis", key: "T", name: "MBTI axis T", target: 40 },
    { system: "mbtiAxis", key: "F", name: "MBTI axis F", target: 40 },
    { system: "mbtiAxis", key: "J", name: "MBTI axis J", target: 40 },
    { system: "mbtiAxis", key: "P", name: "MBTI axis P", target: 40 },
    // Enneagram type 1-9
    ...[1,2,3,4,5,6,7,8,9].map(num => ({
      system: "enneagram", key: String(num), name: `Enneagram Type ${num}`, target: 30
    })),
    // Instinct sp, sx, so
    { system: "instinct", key: "sp", name: "Instinct sp", target: 40 },
    { system: "instinct", key: "sx", name: "Instinct sx", target: 40 },
    { system: "instinct", key: "so", name: "Instinct so", target: 40 },
    // Big Five
    { system: "bigFive", key: "openness", name: "Big Five Openness", target: 40 },
    { system: "bigFive", key: "conscientiousness", name: "Big Five Conscientiousness", target: 40 },
    { system: "bigFive", key: "extraversion", name: "Big Five Extraversion", target: 40 },
    { system: "bigFive", key: "agreeableness", name: "Big Five Agreeableness", target: 40 },
    { system: "bigFive", key: "neuroticism", name: "Big Five Neuroticism", target: 40 },
  ];

  targets.forEach(tgt => {
    const points = (report.measurementPoints[tgt.system] && tgt.key && report.measurementPoints[tgt.system][tgt.key]) || 0;
    if (points < tgt.target) {
      report.coverageWarnings.push(`Coverage kurang: ${tgt.name} hanya mendapat ${points.toFixed(1)} / target ${tgt.target}`);
    } else {
      report.coverageSuccess.push(`Coverage cukup: ${tgt.name} mendapat ${points.toFixed(1)} / target ${tgt.target}`);
    }
  });

  return report;
}
