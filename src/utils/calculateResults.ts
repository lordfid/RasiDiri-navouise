/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuestionItem, FinalQuizResult, RawScores } from "../types";
import { ALL_QUESTIONS_CATALOG } from "../data/questions";

// Standard cognitive stacks for the 16 MBTI types
const MBTI_COGNITIVE_STACKS: Record<string, string[]> = {
  INTJ: ["Ni", "Te", "Fi", "Se", "Ne", "Fe", "Ti", "Si"],
  INFJ: ["Ni", "Fe", "Ti", "Se", "Ne", "Fi", "Te", "Si"],
  INTP: ["Ti", "Ne", "Si", "Fe", "Te", "Ni", "Se", "Fi"],
  INFP: ["Fi", "Ne", "Si", "Te", "Fe", "Ni", "Se", "Ti"],
  ISTJ: ["Si", "Te", "Fi", "Ne", "Se", "Fe", "Ti", "Ne"], // standard layout
  ISFJ: ["Si", "Fe", "Ti", "Ne", "Se", "Fi", "Te", "Ne"],
  ISTP: ["Ti", "Se", "Ni", "Fe", "Te", "Ne", "Si", "Fi"],
  ISFP: ["Fi", "Se", "Ni", "Te", "Fe", "Ne", "Si", "Te"],
  ENTJ: ["Te", "Ni", "Se", "Fi", "Ti", "Ne", "Si", "Fe"],
  ENFJ: ["Fe", "Ni", "Se", "Ti", "Fi", "Ne", "Si", "Te"],
  ENTP: ["Ne", "Ti", "Fe", "Si", "Ni", "Te", "Fi", "Se"],
  ENFP: ["Ne", "Fi", "Te", "Si", "Ni", "Fe", "Ti", "Se"],
  ESTJ: ["Te", "Si", "Ne", "Fi", "Ti", "Se", "Ni", "Fe"],
  ESFJ: ["Fe", "Si", "Ne", "Ti", "Fi", "Se", "Ni", "Te"],
  ESTP: ["Se", "Ti", "Fe", "Ni", "Si", "Te", "Fi", "Ne"],
  ESFP: ["Se", "Fi", "Te", "Ni", "Si", "Fe", "Ti", "Ne"],
};

// Socionics equivalent mapping
const SOCIONICS_MAP: Record<string, string> = {
  INTJ: "ILI",
  INFJ: "IEI",
  INTP: "LII",
  INFP: "EII",
  ISTJ: "LSI",
  ISFJ: "SEI",
  ISTP: "SLI",
  ISFP: "ESI",
  ENTJ: "LIE",
  ENFJ: "EIE",
  ENTP: "ILE",
  ENFP: "IEE",
  ESTJ: "LSE",
  ESFJ: "ESE",
  ESTP: "SLE",
  ESFP: "SEE",
};

// Quadra classification
const QUADRA_MAP: Record<string, string> = {
  ILE: "Alpha", SEI: "Alpha", ESE: "Alpha", LII: "Alpha",
  SLE: "Beta", IEI: "Beta", EIE: "Beta", LSI: "Beta",
  SEE: "Gamma", ILI: "Gamma", LIE: "Gamma", ESI: "Gamma",
  IEE: "Delta", SLI: "Delta", LSE: "Delta", EII: "Delta",
};

export function calculateResults(answers: Record<string, string>): FinalQuizResult {
  // 1. Initialize empty raw counters
  const raw: RawScores = {
    cognitive: { Ni: 0, Ne: 0, Si: 0, Se: 0, Fi: 0, Fe: 0, Ti: 0, Te: 0 },
    mbtiAxis: { I: 0, E: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 },
    mbtiTypeSupport: {},
    enneagram: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0 },
    wing: {},
    instinct: { sp: 0, sx: 0, so: 0 },
    bigFive: { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0 },
    hexaco: { honestyHumility: 0, emotionality: 0, extraversion: 0, agreeableness: 0, conscientiousness: 0, openness: 0 },
    attitudinalPsyche: {
      L: { confident: 0, flexible: 0, insecure: 0, indifferent: 0 },
      E: { confident: 0, flexible: 0, insecure: 0, indifferent: 0 },
      F: { confident: 0, flexible: 0, insecure: 0, indifferent: 0 },
      V: { confident: 0, flexible: 0, insecure: 0, indifferent: 0 }
    },
    disc: { D: 0, I: 0, S: 0, C: 0 },
    riasec: { Realistic: 0, Investigative: 0, Artistic: 0, Social: 0, Enterprising: 0, Conventional: 0 },
    moral: { idealist: 0, altruist: 0, pragmatist: 0, ruleBased: 0, libertarian: 0 },
    decision: { riskAware: 0, fastAction: 0, analytical: 0, valueBased: 0, consensus: 0 },
    conflict: { competitive: 0, collaborative: 0, compromising: 0, avoiding: 0, accommodating: 0 },
    communication: { direct: 0, diplomatic: 0, expressive: 0, analytical: 0 },
    relationship: { secureLeaning: 0, anxiousLeaning: 0, avoidantLeaning: 0, fearfulLeaning: 0 },
    stress: { hypervigilant: 0, freeze: 0, flight: 0, fight: 0, fawn: 0 },
    defense: { rationalization: 0, projection: 0, repression: 0, sublimation: 0, denial: 0 },
    coreFear: { uselessness: 0, corruptness: 0, insignificance: 0, vulnerability: 0, empty: 0 },
    coreDesire: { peace: 0, impact: 0, identity: 0, security: 0, truth: 0 },
    values: {},
    work: { planner: 0, executor: 0, innovator: 0, caretaker: 0 },
    learning: { visual: 0, verbal: 0, structured: 0, projectBased: 0 },
    idealPartner: {},
    loveStyle: {},
    environment: {},
    evidence: {},
    positive: {},
    negative: {}
  };

  // Keep track of total item response count and possible min/max bounds dynamically
  const activeQuestions = ALL_QUESTIONS_CATALOG.filter(q => !!answers[q.id]);
  const answeredCount = activeQuestions.length;

  if (answeredCount === 0) {
    // Return a dummy fallback report if nothing is answered
    return getFallbackResult();
  }

  // Helper structures to scan overall bounds for exact mathematical normalization
  const maxPossible: any = {};
  const minPossible: any = {};

  const initMinMax = (path: string) => {
    if (!maxPossible[path]) maxPossible[path] = {};
    if (!minPossible[path]) minPossible[path] = {};
  };

  // Pre-calculate min/max possible scores across all answered items
  activeQuestions.forEach(q => {
    const systems = q.targetSystems;

    // We can evaluate weights across all options for precise system normalization
    q.options.forEach(opt => {
      const w = opt.weights;
      // Resolve systems recursively
      Object.keys(w).forEach(sysKey => {
        const sysVal = (w as any)[sysKey];
        if (typeof sysVal === "object" && sysVal !== null) {
          // Nested metrics
          Object.keys(sysVal).forEach(metricKey => {
            const nestedVal = sysVal[metricKey];
            if (typeof nestedVal === "number") {
              const boundsKey = `${sysKey}.${metricKey}`;
              if (maxPossible[boundsKey] === undefined) {
                maxPossible[boundsKey] = 0;
                minPossible[boundsKey] = 0;
              }
            } else if (typeof nestedVal === "object" && nestedVal !== null) {
              // Double nested (like attitudinalPsyche L.confident)
              Object.keys(nestedVal).forEach(subKey => {
                const tripleVal = nestedVal[subKey];
                if (typeof tripleVal === "number") {
                  const boundsKey = `${sysKey}.${metricKey}.${subKey}`;
                  if (maxPossible[boundsKey] === undefined) {
                    maxPossible[boundsKey] = 0;
                    minPossible[boundsKey] = 0;
                  }
                }
              });
            }
          }
          );
        } else if (typeof sysVal === "number") {
          const boundsKey = sysKey;
          if (maxPossible[boundsKey] === undefined) {
            maxPossible[boundsKey] = 0;
            minPossible[boundsKey] = 0;
          }
        }
      });
    });

    // For each resolved metric key, find the actual max/min this question could provide
    Object.keys(maxPossible).forEach(boundsKey => {
      const parts = boundsKey.split(".");
      let valsForThisQuestion: number[] = [];

      q.options.forEach(opt => {
        let currentVal = 0;
        const w = opt.weights as any;
        if (parts.length === 1) {
          currentVal = w[parts[0]] || 0;
        } else if (parts.length === 2) {
          currentVal = (w[parts[0]] && w[parts[0]][parts[1]]) || 0;
        } else if (parts.length === 3) {
          currentVal = (w[parts[0]] && w[parts[0]][parts[1]] && w[parts[0]][parts[1]][parts[2]]) || 0;
        }
        valsForThisQuestion.push(currentVal);
      });

      const maxInQ = Math.max(...valsForThisQuestion, 0);
      const minInQ = Math.min(...valsForThisQuestion, 0);

      maxPossible[boundsKey] += maxInQ * q.reliability;
      minPossible[boundsKey] += minInQ * q.reliability;
    });
  });

  // 2. Score answered options
  activeQuestions.forEach(q => {
    const chosenID = answers[q.id];
    const opt = q.options.find(o => o.id === chosenID);
    if (!opt) return;

    const w = opt.weights;
    const qRel = q.reliability;
    const optRel = opt.weights.reliability || 1.0;
    const multiplier = qRel * optRel;

    // Apply weights to raw scores
    const applyWeights = (source: any, target: any) => {
      if (!source) return;
      Object.keys(source).forEach(k => {
        const val = source[k];
        if (typeof val === "number") {
          target[k] = (target[k] || 0) + val * multiplier;
        } else if (typeof val === "object" && val !== null) {
          if (!target[k]) target[k] = {};
          applyWeights(val, target[k]);
        }
      });
    };

    // Distribute weights across raw structure
    Object.keys(w).forEach(sysKey => {
      if (sysKey === "reliability") return;
      const targetSub = (raw as any)[sysKey];
      const sourceSub = (w as any)[sysKey];
      if (typeof sourceSub === "number") {
        (raw as any)[sysKey] = ((raw as any)[sysKey] || 0) + sourceSub * multiplier;
      } else if (targetSub) {
        applyWeights(sourceSub, targetSub);
      } else {
        // Dynamic keys like values, environment, coreFear
        if (!(raw as any)[sysKey]) (raw as any)[sysKey] = {};
        applyWeights(sourceSub, (raw as any)[sysKey]);
      }
    });
  });

  // 3. Normalization Helper Function
  const normalize = (sysKey: string, metricKey?: string, subKey?: string, fallback: number = 50): number => {
    let boundsKey = sysKey;
    let score = 0;

    if (subKey && metricKey) {
      boundsKey = `${sysKey}.${metricKey}.${subKey}`;
      score = (raw as any)[sysKey] && (raw as any)[sysKey][metricKey] && (raw as any)[sysKey][metricKey][subKey] || 0;
    } else if (metricKey) {
      boundsKey = `${sysKey}.${metricKey}`;
      score = (raw as any)[sysKey] && (raw as any)[sysKey][metricKey] || 0;
    } else {
      score = (raw as any)[sysKey] || 0;
    }

    const maxVal = maxPossible[boundsKey] || 0;
    const minVal = minPossible[boundsKey] || 0;

    if (maxVal === minVal) return fallback;
    const norm = ((score - minVal) / (maxVal - minVal)) * 100;
    return Math.max(0, Math.min(100, Math.round(norm)));
  };

  // 4. Calculate Normalized Scores
  // A. MBTI axis percentages (I_E, S_N, T_F, J_P) first to guide cognitive influence
  const mbtiAxisNorm = {
    I: normalize("mbtiAxis", "I", undefined, 50),
    E: normalize("mbtiAxis", "E", undefined, 50),
    S: normalize("mbtiAxis", "S", undefined, 50),
    N: normalize("mbtiAxis", "N", undefined, 50),
    T: normalize("mbtiAxis", "T", undefined, 50),
    F: normalize("mbtiAxis", "F", undefined, 50),
    J: normalize("mbtiAxis", "J", undefined, 50),
    P: normalize("mbtiAxis", "P", undefined, 50),
  };

  // Convert axes to relative percentages e.g. Introvert vs Extrovert
  const calcContrast = (val1: number, val2: number): number => {
    const total = val1 + val2;
    if (total === 0) return 50;
    return Math.round((val1 / total) * 100);
  };

  const I_E = calcContrast(mbtiAxisNorm.I, mbtiAxisNorm.E); // % of I
  const S_N = calcContrast(mbtiAxisNorm.S, mbtiAxisNorm.N); // % of S
  const T_F = calcContrast(mbtiAxisNorm.T, mbtiAxisNorm.F); // % of T
  const J_P = calcContrast(mbtiAxisNorm.J, mbtiAxisNorm.P); // % of J

  // B. Cognitive Functions influenced by MBTI Axis and Direct Questions
  const adjustedCognitive: Record<string, number> = {};
  Object.keys(raw.cognitive).forEach(func => {
    const baseScore = normalize("cognitive", func, undefined, 50);

    // I_E (Introversion vs Extraversion percentage) influence
    const isIntro = ["Ni", "Si", "Fi", "Ti"].includes(func);
    const ieWeight = isIntro ? (I_E / 100) : ((100 - I_E) / 100);

    // S_N (Sensing vs Intuition percentage) influence (S_N is Sensing %)
    const isSens = ["Si", "Se"].includes(func);
    const snWeight = isSens ? (S_N / 100) : ((100 - S_N) / 100);

    // T_F (Thinking vs Feeling percentage) influence (T_F is Thinking %)
    const isThink = ["Ti", "Te"].includes(func);
    const tfWeight = isThink ? (T_F / 100) : ((100 - T_F) / 100);

    // J_P (Judging vs Perceiving percentage) influence (J_P is Judging %)
    const alignsJ = ["Te", "Fe", "Ni", "Si"].includes(func);
    const jpWeight = alignsJ ? (J_P / 100) : ((100 - J_P) / 100);

    // Blend: Base direct score is 60%, Axis alignment is 40% (producing deep integration)
    const axisScore = (ieWeight * 35) + (snWeight * 35) + (tfWeight * 20) + (jpWeight * 10);
    const finalScore = (baseScore * 0.60) + (axisScore * 0.40);

    adjustedCognitive[func] = Math.max(0, Math.min(100, Math.round(finalScore)));
  });

  const cognitiveRanking = Object.keys(adjustedCognitive).map(func => ({
    name: func,
    score: adjustedCognitive[func]
  })).sort((a, b) => b.score - a.score);

  // C. Enneagram wing and elements
  const enneagramNorm: Record<string, number> = {};
  for (let i = 1; i <= 9; i++) {
    const key = String(i);
    enneagramNorm[key] = normalize("enneagram", key, undefined, 40);
  }

  // Find primary Enneagram
  const sortedEnneagram = Object.keys(enneagramNorm).map(type => ({
    type,
    score: enneagramNorm[type]
  })).sort((a, b) => b.score - a.score);

  const primaryEnneagram = sortedEnneagram[0].type;
  const primaryScore = sortedEnneagram[0].score;

  // Wing calculation (neighbors)
  const pInt = parseInt(primaryEnneagram);
  const rN = pInt === 9 ? 1 : pInt + 1;
  const lN = pInt === 1 ? 9 : pInt - 1;

  const leftScore = enneagramNorm[String(lN)] || 0;
  const rightScore = enneagramNorm[String(rN)] || 0;
  const wing = leftScore >= rightScore ? `${primaryEnneagram}w${lN}` : `${primaryEnneagram}w${rN}`;

  // Instinctual Stacking
  const instinctNorm = {
    sp: normalize("instinct", "sp", undefined, 50),
    sx: normalize("instinct", "sx", undefined, 50),
    so: normalize("instinct", "so", undefined, 50),
  };
  const sortedInstincts = Object.keys(instinctNorm).map(inst => ({
    inst,
    score: (instinctNorm as any)[inst]
  })).sort((a, b) => b.score - a.score);
  const instinctualStack = `${sortedInstincts[0].inst}/${sortedInstincts[1].inst}`;

  // Tritype calculation
  // Triad 1 (Heart): 2, 3, 4
  const heartTriad = ["2", "3", "4"].map(t => ({ t, s: enneagramNorm[t] || 0 })).sort((a, b) => b.s - a.s);
  // Triad 2 (Head): 5, 6, 7
  const headTriad = ["5", "6", "7"].map(t => ({ t, s: enneagramNorm[t] || 0 })).sort((a, b) => b.s - a.s);
  // Triad 3 (Gut): 8, 9, 1
  const gutTriad = ["8", "9", "1"].map(t => ({ t, s: enneagramNorm[t] || 0 })).sort((a, b) => b.s - a.s);

  const tritypeElements = [heartTriad[0], headTriad[0], gutTriad[0]].sort((a, b) => b.s - a.s);
  const tritype = tritypeElements.map(el => el.t).join("");

  // Stack fit algorithm for all 16 MBTI types
  const cogniMap: Record<string, number> = {};
  cognitiveRanking.forEach(item => {
    cogniMap[item.name] = item.score;
  });

  const mbtiTypesScores = Object.keys(MBTI_COGNITIVE_STACKS).map(type => {
    const stack = MBTI_COGNITIVE_STACKS[type];
    const dom = cogniMap[stack[0]] || 50;
    const aux = cogniMap[stack[1]] || 50;
    const tert = cogniMap[stack[2]] || 50;
    const inf = cogniMap[stack[3]] || 50;

    // Direct dichotomy support matches
    const axisMatch =
      (type[0] === "I" ? I_E : (100 - I_E)) +
      (type[1] === "S" ? S_N : (100 - S_N)) +
      (type[2] === "T" ? T_F : (100 - T_F)) +
      (type[3] === "J" ? J_P : (100 - J_P));

    // Dynamic type support from question choices
    const support = raw.mbtiTypeSupport[type] || 0;

    // Beautiful matching formula (normalized scale to avoid capping saturation bias)
    const stackScore = (dom * 1.5) + (aux * 1.25) + (tert * 0.8) + ((100 - inf) * 0.4);
    const normalizedStack = (stackScore / 395) * 100;
    const dichotomyBonus = (axisMatch / 400) * 100;
    const finalMatchScore = Math.round((normalizedStack * 0.6) + (dichotomyBonus * 0.4) + (support * 10));

    return { type, score: Math.max(0, Math.min(100, finalMatchScore)) };
  }).sort((a, b) => b.score - a.score);

  const top3Mbti = mbtiTypesScores.slice(0, 3);
  const primaryMbti = top3Mbti[0].type;

  // Setup MBTI stack and shadow roles
  const primaryStack = MBTI_COGNITIVE_STACKS[primaryMbti];
  const mbtiStack = {
    dominant: `${primaryStack[0]} (Kesadaran Utama)`,
    auxiliary: `${primaryStack[1]} (Pendukung Aksi)`,
    tertiary: `${primaryStack[2]} (Sisi Kreatif/Labil)`,
    inferior: `${primaryStack[3]} (Titik Rentan)`,
    opposing: `${primaryStack[4]} (Pertahanan Bawah Sadar)`,
    critical: `${primaryStack[5]} (Kritikus Internal)`,
    trickster: `${primaryStack[6]} (Perangkap Ilusi)`,
    demon: `${primaryStack[7]} (Ancaman Transformasi)`,
  };

  // D. Big Five Traits
  const bigFive = [
    { trait: "Openness (Eksplorasi Ide)", score: normalize("bigFive", "openness", undefined, 50) },
    { trait: "Conscientiousness (Keteraturan Teguh)", score: normalize("bigFive", "conscientiousness", undefined, 50) },
    { trait: "Extraversion (Simfoni Sosial)", score: normalize("bigFive", "extraversion", undefined, 50) },
    { trait: "Agreeableness (Kehangatan Empati)", score: normalize("bigFive", "agreeableness", undefined, 50) },
    { trait: "Neuroticism (Sensitivitas Badai)", score: normalize("bigFive", "neuroticism", undefined, 50) },
  ].sort((a, b) => b.score - a.score);

  // E. HEXACO Traits
  const hexaco = [
    { trait: "Honesty-Humility (Ketulusan Nurani)", score: normalize("hexaco", "honestyHumility", undefined, 50) },
    { trait: "Emotionality (Sentuhan Perasaan)", score: normalize("hexaco", "emotionality", undefined, 50) },
    { trait: "Extraversion (Sinar Karismatik)", score: normalize("hexaco", "extraversion", undefined, 50) },
    { trait: "Agreeableness (Kelenturan Diplomatik)", score: normalize("hexaco", "agreeableness", undefined, 50) },
    { trait: "Conscientiousness (Presisi Eksekusi)", score: normalize("hexaco", "conscientiousness", undefined, 50) },
    { trait: "Openness to Experience (Gerbang Eksplorasi)", score: normalize("hexaco", "openness", undefined, 50) },
  ].sort((a, b) => b.score - a.score);

  // F. Socionics & Quadra
  const socionicsEstimate = SOCIONICS_MAP[primaryMbti] || "ILI";
  const quadraTendency = QUADRA_MAP[socionicsEstimate] || "Gamma";

  // G. Temperament Calculation
  const tempScores = {
    Melancholic: normalize("bigFive", "conscientiousness", undefined, 50) * 0.5 + normalize("bigFive", "neuroticism", undefined, 50) * 0.5 + (100 - normalize("bigFive", "extraversion", undefined, 50)) * 0.4,
    Sanguine: normalize("bigFive", "extraversion", undefined, 50) * 0.6 + normalize("bigFive", "agreeableness", undefined, 50) * 0.4 + (100 - normalize("bigFive", "neuroticism", undefined, 50)) * 0.2,
    Choleric: normalize("bigFive", "extraversion", undefined, 50) * 0.5 + (100 - normalize("bigFive", "agreeableness", undefined, 50)) * 0.5 + normalize("bigFive", "conscientiousness", undefined, 0.4),
    Phlegmatic: (100 - normalize("bigFive", "neuroticism", undefined, 50)) * 0.5 + normalize("bigFive", "agreeableness", undefined, 50) * 0.5 + (100 - normalize("bigFive", "extraversion", undefined, 50)) * 0.2,
  };
  const sortedTemps = Object.keys(tempScores).map(temp => ({
    temp,
    score: Math.round((tempScores as any)[temp])
  })).sort((a, b) => b.score - a.score);

  const temperament = {
    primary: sortedTemps[0].temp,
    secondary: sortedTemps[1].temp,
    scorePrimary: sortedTemps[0].score
  };

  // H. Attitudinal Psyche / Psychosophy sorting
  const aspects = ["L", "E", "F", "V"];
  const roles = ["confident", "flexible", "insecure", "indifferent"];
  const resolvedAp: Record<string, string> = {};

  aspects.forEach(asp => {
    const roleScores = roles.map(role => ({
      role,
      score: normalize("attitudinalPsyche", asp, role, 25)
    })).sort((a, b) => b.score - a.score);
    resolvedAp[asp] = roleScores[0].role;
  });

  // Reconcile AP to avoid duplicates in numbering (e.g. producing valid 1st, 2nd, 3rd, 4th positions)
  // Let's compute a matrix of scores for each aspect/position and solve it cleanly
  const apMatrix = aspects.map(asp => {
    return {
      aspect: asp,
      "1": normalize("attitudinalPsyche", asp, "confident", 25),
      "2": normalize("attitudinalPsyche", asp, "flexible", 25),
      "3": normalize("attitudinalPsyche", asp, "insecure", 25),
      "4": normalize("attitudinalPsyche", asp, "indifferent", 25)
    };
  });

  // Map aspects to positions dynamically based on highest scores
  const assignedPositions: Record<string, number> = {};
  const occupiedAspects: Record<string, boolean> = {};

  ["1", "2", "3", "4"].forEach(position => {
    // Find the unassigned aspect with the highest score for this position
    const sortedOptions = apMatrix
      .filter(row => !occupiedAspects[row.aspect])
      .map(row => ({
        aspect: row.aspect,
        score: (row as any)[position]
      }))
      .sort((a, b) => b.score - a.score);

    if (sortedOptions.length > 0) {
      const chosenAspect = sortedOptions[0].aspect;
      assignedPositions[chosenAspect] = parseInt(position);
      occupiedAspects[chosenAspect] = true;
    }
  });

  // fallback to fill gaps if any
  aspects.forEach(asp => {
    if (!assignedPositions[asp]) {
      for (let i = 1; i <= 4; i++) {
        if (!Object.values(assignedPositions).includes(i)) {
          assignedPositions[asp] = i;
          break;
        }
      }
    }
  });

  // Sort aspects to form 4 letter AP type (e.g. VLFE, ELVF)
  const apTypeLetters = aspects.map(asp => ({
    letter: asp,
    pos: assignedPositions[asp] || 4
  })).sort((a, b) => a.pos - b.pos).map(el => el.letter).join("");

  const attitudinalPsyche = {
    type: apTypeLetters,
    L: `${assignedPositions["L"]}L (${resolvedAp["L"]})`,
    E: `${assignedPositions["E"]}E (${resolvedAp["E"]})`,
    F: `${assignedPositions["F"]}F (${resolvedAp["F"]})`,
    V: `${assignedPositions["V"]}V (${resolvedAp["V"]})`,
  };

  // I. DISC
  const discNorm = [
    { style: "Dominance (D - Sang Driver)", score: normalize("disc", "D", undefined, 50) },
    { style: "Influence (I - Sang Inspirator)", score: normalize("disc", "I", undefined, 50) },
    { style: "Steadiness (S - Sang Penjaga Harmoni)", score: normalize("disc", "S", undefined, 50) },
    { style: "Compliance (C - Sang Analis Teliti)", score: normalize("disc", "C", undefined, 50) },
  ].sort((a, b) => b.score - a.score);

  // J. RIASEC
  const riasecNorm = [
    { interest: "Realistic (Teknik & Kriya Fisik)", score: normalize("riasec", "Realistic", undefined, 50) },
    { interest: "Investigative (Sains & Logika Abstrak)", score: normalize("riasec", "Investigative", undefined, 50) },
    { interest: "Artistic (Estetika & Karya Seni)", score: normalize("riasec", "Artistic", undefined, 50) },
    { interest: "Social (Mediasi & Asuhan Sosial)", score: normalize("riasec", "Social", undefined, 50) },
    { interest: "Enterprising (Daya Pengaruh & Bisnis)", score: normalize("riasec", "Enterprising", undefined, 50) },
    { interest: "Conventional (Presisi & Administrasi)", score: normalize("riasec", "Conventional", undefined, 50) },
  ].sort((a, b) => b.score - a.score);

  // K. Styling & Tendencies - Extract highest scoring profile
  const extractMaxKey = (system: string, labels: Record<string, string>, fallback: string): string => {
    const sys = (raw as any)[system];
    if (!sys) return fallback;
    const sorted = Object.keys(sys).map(k => ({
      key: k,
      score: normalize(system, k, undefined, 0)
    })).sort((a, b) => b.score - a.score);

    if (sorted.length === 0 || sorted[0].score === 0) return fallback;
    return labels[sorted[0].key] || sorted[0].key;
  };

  const moralLabels = {
    idealist: "Moralis Idealis (Menjunjung Keaslian Integritas)",
    altruist: "Moralis Altruis (Menjunjung Kemanusiaan & Kepedulian)",
    pragmatist: "Moralis Pragmatis (Menjunjung Kemaslahatan Praktis)",
    ruleBased: "Moralis Normatif (Menjunjung Aturan & Kepatuhan)",
    libertarian: "Moralis Otonom (Menjunjung Kedaulitan Diri & Kebebasan)"
  };
  const moralStyle = extractMaxKey("moral", moralLabels, "Moralis Pragmatis");

  const decisionLabels = {
    riskAware: "Risk-Aware (Prinsip Mitigasi Resiko Tinggi)",
    fastAction: "Fast-Action (Orientasi Kecepatan Eksekusi Spontan)",
    analytical: "Analytical (Mendasarkan Data & Validitas Logis)",
    valueBased: "Value-Based (Penyelarasan Nilai Batin & Autentisitas)",
    consensus: "Consensus (Mengejar Mufakat Relasional Kelompok)"
  };
  const decisionStyle = extractMaxKey("decision", decisionLabels, "Value-Based");

  const conflictLabels = {
    competitive: "Competitive (Mengarahkan Dominansi & Argumentasi)",
    collaborative: "Collaborative (Dialog Asertif & Solusi Menang-Menang)",
    compromising: "Compromising (Kelenturan Diplomasi Saling Mengalah)",
    avoiding: "Avoiding (Penghindaran Demi Keselamatan Energi Batin)",
    accommodating: "Accommodating (Mengalah Merawat Harmoni Sosial)"
  };
  const conflictStyle = extractMaxKey("conflict", conflictLabels, "Collaborative");

  const commLabels = {
    direct: "Direct (Bicara Jujur, Lugas, Tanpa Tedeng Aling-Aling)",
    diplomatic: "Diplomatic (Sopan, Santun, Menghargai Ruang Emosional)",
    expressive: "Expressive (Hangat, Antusias, Penuh Lelucon & Aura)",
    analytical: "Analytical (Tenang, Rinci, Berbasis Struktur Argumen)"
  };
  const communicationStyle = extractMaxKey("communication", commLabels, "Diplomatic");

  const relLabels = {
    secureLeaning: "Secure Leaning (Kemandirian Matang Berpadu Keaslian)",
    anxiousLeaning: "Anxious Leaning (Kehangatan Rawan Tersulut Kecemasan)",
    avoidantLeaning: "Avoidant Leaning (Kemandirian Baja Tirai Privat)",
    fearfulLeaning: "Fearful Leaning (Kerinduan Kedalaman yang Rawan Terluka)"
  };
  const relationshipTendency = extractMaxKey("relationship", relLabels, "Secure Leaning");

  const stressLabels = {
    hypervigilant: "Hypervigilant (Kewaspadaan Tinggi & Hiper-Analisis)",
    freeze: "Freeze (Kebekuan Respon & Penutupan Komunikasi)",
    flight: "Flight (Pelarian Spontan Mencari Ruang Kebahagiaan Lain)",
    fight: "Fight (Mobilisasi Amarah Melawan Ancaman Dominasi)",
    fawn: "Fawn (Penaklukan Ego untuk Merawat Penerimaan Sosial)"
  };
  const stressResponse = extractMaxKey("stress", stressLabels, "Freeze");

  const defenseLabels = {
    rationalization: "Rationalization (Menutupi Luka dengan Logika Rasional)",
    projection: "Projection (Melempar Ancaman Ego ke Kesalahan Orang Lain)",
    repression: "Repression (Memarkir Duka dalam Gudang Rahasia Sanubari)",
    sublimation: "Sublimation (Mengalihkan Amarah Menjadi Karya Berguna)",
    denial: "Denial (Penolakan Realitas Pahit untuk Melindungi Jiwa)"
  };
  const defensePattern = extractMaxKey("defense", defenseLabels, "Rationalization");

  const coreFearLabels = {
    uselessness: "Inkompetensi & Ketiadaan Guna",
    corruptness: "Kebobrokan Moral & Dosa Kotor",
    insignificance: "Hampanya Identitas & Kehilangan Ciri Khas",
    vulnerability: "Kerentanan Terjajah & Ditindas Tanpa Taring",
    rejection: "Penolakan Sosial & Kehilangan Cinta",
    failure: "Kegagalan Fatal Menghilangkan Harga Diri",
    conflictBoundary: "Kekacauan Konflik yang Merusak Kedamaian"
  };
  const coreFear = extractMaxKey("coreFear", coreFearFear(), "Inkompetensi & Ketiadaan Guna");
  function coreFearFear() { return coreFearLabels; }

  const coreDesireLabels = {
    peace: "Kedamaian Batin & Kebebasan dari Goncangan",
    impact: "Daya Pengaruh & Legacy Keberadaan Riil",
    identity: "Kebasahan Ekspresi Pengakuan Autentisitas",
    security: "Pilar Jaminan Keselamatan & Perlindungan Diri",
    truth: "Penyanderaan Arsitektur Kebenaran Hakiki",
    success: "Kejayaan Kinerja & Pujian Kelompok",
    helper: "Menjadi Pelindung Kehangatan Hidup Sesama"
  };
  const coreDesire = extractMaxKey("coreDesire", coreDesireLabels, "Kedamaian Batin & Kebebasan dari Goncangan");

  const sortedValues = Object.keys(raw.values).map(k => ({
    key: k,
    score: normalize("values", k, undefined, 0)
  })).sort((a, b) => b.score - a.score).slice(0, 5).map(item => {
    const valueDictionary: Record<string, string> = {
      security: "Keandalan Aman Jangka Panjang",
      autonomy: "Kedaulatan Otonomi Diri",
      peace: "Ketenteraman Tanpa Drama",
      beauty: "Keindahan Estetika Hidup",
      competence: "Kapasitas Ahli & Keterampilan",
      achievement: "Kejayaan Reputasi Kinerja",
      empathy: "Kedalaman Rasa Kemanusiaan",
      benevolence: "Kedermawanan Tulus Peduli",
      individuality: "Originalitas Karakter Diri",
      conformity: "Kesopanan Kepatuhan Komunal",
      freedom: "Kebebasan Gerak Eksplorasi",
      trust: "Keandalan Amanah Hubungan",
      correctness: "Kesucian Kebenaran Normatif",
      loyalty: "Kesetiaan Janji Kelompok",
      comfort: "Kenyamanan Ruang Batin",
      durability: "Ketahanan Daya Uji",
      maturity: "Kedewasaan Relasional"
    };
    const mapped = valueDictionary[item.key];
    if (mapped) return mapped;
    
    // Fallback: Capitalize first letter of item.key or split camelCase
    return item.key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, str => str.toUpperCase())
      .trim();
  });

  const workLabels = {
    planner: "Perencana Sistematis (Merumuskan Arsitektur Prosedur)",
    executor: "Eksekutor Tangkas (Penyelesaian Target Prioritas Kilat)",
    innovator: "Inovator Visioner (Mendobrak Hambatan Baku Lewat Ide)",
    caretaker: "Caretaker Harmoni (Membangun Kekuatan Jiwa Anggota)"
  };
  const workStyle = extractMaxKey("work", workLabels, "Perencana Sistematis");

  const learningLabels = {
    visual: "Visual-Metaforis (Mengasimilasi Ilustrasi Analogi)",
    verbal: "Verbal-Introspektif (Merenungkan Struktur Teks Panjang)",
    structured: "Struktural-Linier (Membedah Manual Dari Fondasi Bab 1)",
    projectBased: "Eksperimen-Induktif (Langsung Terjun Trial-Error)"
  };
  const learningStyle = extractMaxKey("learning", learningLabels, "Struktural-Linier");

  const partnerLabels = {
    stable: "Jangkar Stabilisator (Siap Melindungi di Atas Realitas)",
    creative: "Muse Estetis Kreatif (Pemicu Petualangan Rasa Orisinal)",
    intellectual: "Teman Debat Intelektual (Spontanitas Berbagi Teori)",
    passionate: "Api Cinta Visioner (Getaran Gairah & Tekad Tinggi)"
  };
  const idealPartnerTendency = extractMaxKey("idealPartner", partnerLabels, "Jangkar Stabilisator");

  const loveStyleLabels = {
    qualityTime: "Waktu Berkualitas Intim (Penyandingan Jiwa Hadir Utuh)",
    wordsOfAffirmation: "Kata-Kata Pengakuan Autentik (Pilar Validasi Verbal)",
    physicalTouch: "Kedekatan Fisik Teduh (Pelukan Pengurang Badai)",
    actsOfService: "Bakti Tindakan Nyata (Pemudahan Beban Keseharian)",
    receivingGifts: "Hadiah Kejutan Berselera (Simbol Perhatian Detail)",
    emotionalDepth: "Pendedahan Kedalaman Rahasia (Penyatuan Sanubari Sunyi)"
  };
  const preferredLoveStyle = extractMaxKey("loveStyle", loveStyleLabels, "Waktu Berkualitas Intim");

  const envLabels = {
    cozySpace: "Pristine Cozy Nest (Kehangatan Temaram Dipenuhi Buku)",
    pristineMinimalist: "Symmetrical Clean (Minimalis Tanpa Distraksi Fisik)",
    natureSolitary: "Solitary Hermitage (Koneksi Alami Rindang Sunyi)",
    natureOutdoor: "Open Garden (Outdoor Udara Bebas Dekat Air Trik)",
    workspace: "Laboratorium Kognitif (Whiteboard Coretan & Gawai Keren)",
    socialCompanionSpace: "Communal Living Room (Ruang Sosial Kumpul Teman)"
  };
  const preferredEnvironment = extractMaxKey("environment", envLabels, "Pristine Cozy Nest");

  // 5. Confidence Score Calculation
  // Factors: Answer percentage, Top1 vs Top2 gap, contradictions, too rapid, response extremes
  const totalQuestions = ALL_QUESTIONS_CATALOG.length;
  const answerRatio = answeredCount / totalQuestions; // weight 30%

  // Gap between top 1 and top 2 MBTI
  const mbtiGap = mbtiTypesScores[0].score - mbtiTypesScores[1].score;
  const gapFactor = Math.min(100, mbtiGap * 6); // weight 30%

  // Consistency checks - are cognitive functions logically aligned with the dichotomies (e.g. introverts shouldn't score 100% on external functions without internal)
  let consistencyScore = 100;
  if (I_E > 70 && (cogniMap.Se > 75 || cogniMap.Fe > 75)) consistencyScore -= 15;
  if (I_E < 30 && (cogniMap.Ni > 75 || cogniMap.Ti > 75)) consistencyScore -= 15;
  if (S_N > 70 && (cogniMap.Ni > 75 || cogniMap.Ne > 75)) consistencyScore -= 15;
  if (S_N < 30 && (cogniMap.Si > 75 || cogniMap.Si > 75)) consistencyScore -= 15;

  const confidenceScoreVal = Math.max(10, Math.min(100, Math.round(
    (answerRatio * 35) +
    (gapFactor * 0.35) +
    (consistencyScore * 0.30)
  )));

  let category: "lemah" | "sedang" | "cukup kuat" | "kuat" | "sangat kuat" = "sedang";
  let notes: string[] = [];

  if (confidenceScoreVal < 40) {
    category = "lemah";
    notes.push("Jawaban Anda menunjukkan kontradiksi pola batin di beberapa domain keseharian.");
    notes.push("Anda mungkin sedang dalam kondisi stres transisi atau menginginkan banyak peran sekaligus.");
  } else if (confidenceScoreVal < 60) {
    category = "sedang";
    notes.push("Dua elemen kepribadian tertinggi Anda bersaing sangat ketat (ambivalensi seimbang).");
    notes.push("Aplikasi menyarankan Anda mencoba sesi pertanyaan penyaring tambahan (Tie-breaker) untuk mempertajam hasil.");
  } else if (confidenceScoreVal < 75) {
    category = "cukup kuat";
    notes.push("Pola rasi kepribadian Anda terpetakan dengan kelancaran yang konsisten di berbagai domain.");
  } else if (confidenceScoreVal < 90) {
    category = "kuat";
    notes.push("Arsitektur tipe kognitif Anda memancarkan sinar dominansi yang tegas dan berakar kuat.");
  } else {
    category = "sangat kuat";
    notes.push("Rasi pola ketiadaan keraguan: Anda memiliki penyelarasan batin yang sangat kokoh dan konsisten.");
  }

  if (answeredCount < totalQuestions * 0.5) {
    notes.push("Disarankan menggenapi sisa kuesioner terlewat untuk meningkatkan tingkat keakuratan visual.");
  }

  const confidence = {
    score: confidenceScoreVal,
    category,
    notes
  };

  return {
    top3Mbti,
    cognitiveRanking,
    mbtiStack,
    mbtiDichotomy: {
      I_E,
      S_N,
      T_F,
      J_P
    },
    bigFive,
    hexaco,
    enneagram: {
      primaryType: primaryEnneagram,
      score: primaryScore,
      wing,
      instinctualStack,
      tritype
    },
    socionicsEstimate,
    quadraTendency,
    temperament,
    attitudinalPsyche: attitudinalPsyche as any,
    disc: discNorm,
    riasec: riasecNorm,
    moralStyle,
    decisionStyle,
    conflictStyle,
    communicationStyle,
    relationshipTendency,
    stressResponse,
    defensePattern,
    coreFear,
    coreDesire,
    valuesRanking: sortedValues,
    workStyle,
    learningStyle,
    idealPartnerTendency,
    preferredLoveStyle,
    preferredEnvironment,
    confidence,
    rawScores: raw
  };
}

function getFallbackResult(): FinalQuizResult {
  return {
    top3Mbti: [
      { type: "INFJ", score: 50 },
      { type: "INTJ", score: 48 },
      { type: "INFP", score: 45 }
    ],
    cognitiveRanking: [
      { name: "Ni", score: 50 },
      { name: "Fi", score: 48 },
      { name: "Ti", score: 45 },
      { name: "Ne", score: 40 },
      { name: "Fe", score: 38 },
      { name: "Te", score: 35 },
      { name: "Si", score: 30 },
      { name: "Se", score: 25 }
    ],
    mbtiStack: {
      dominant: "Ni",
      auxiliary: "Fe",
      tertiary: "Ti",
      inferior: "Se",
      opposing: "Ne",
      critical: "Fi",
      trickster: "Te",
      demon: "Si"
    },
    mbtiDichotomy: {
      I_E: 50,
      S_N: 50,
      T_F: 50,
      J_P: 50
    },
    bigFive: [
      { trait: "Openness", score: 50 },
      { trait: "Conscientiousness", score: 50 }
    ],
    hexaco: [],
    enneagram: {
      primaryType: "9",
      score: 50,
      wing: "9w1",
      instinctualStack: "sp/sx",
      tritype: "945"
    },
    socionicsEstimate: "IEI",
    quadraTendency: "Beta",
    temperament: {
      primary: "Phlegmatic",
      secondary: "Melancholic",
      scorePrimary: 50
    },
    attitudinalPsyche: {
      type: "ELVF",
      L: "2L",
      E: "1E",
      F: "4F",
      V: "3V"
    },
    disc: [],
    riasec: [
      { interest: "Artistic", score: 50 },
      { interest: "Investigative", score: 45 },
      { interest: "Social", score: 40 },
      { interest: "Realistic", score: 35 },
      { interest: "Enterprising", score: 30 },
      { interest: "Conventional", score: 25 }
    ],
    moralStyle: "Moralis Pragmatis",
    decisionStyle: "Value-Based",
    conflictStyle: "Collaborative",
    communicationStyle: "Diplomatic",
    relationshipTendency: "Secure Leaning",
    stressResponse: "Freeze",
    defensePattern: "Rationalization",
    coreFear: "Inkompetensi",
    coreDesire: "Kedamaian Batin",
    valuesRanking: ["Ketenteraman Tanpa Drama"],
    workStyle: "Caretaker Harmoni",
    learningStyle: "Struktural-Linier",
    idealPartnerTendency: "Jangkar Stabilisator",
    preferredLoveStyle: "Waktu Berkualitas",
    preferredEnvironment: "Pristine Cozy Nest",
    confidence: {
      score: 20,
      category: "lemah",
      notes: ["Anda belum memilih kuesioner apa pun."]
    },
    rawScores: undefined
  };
}
