/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, Award, Heart, ShieldAlert, Sparkles, SlidersHorizontal, 
  Lightbulb, Undo2, Bug, BookOpen, UserCheck, Smile, HelpCircle, 
  ChevronDown, ChevronUp, Layers, CheckCircle 
} from "lucide-react";
import { FinalQuizResult } from "../types";
import { ConstellationCanvas } from "./ConstellationCanvas";
import { auditScoring, AuditReport } from "../utils/auditScoring";

interface ResultProps {
  results: FinalQuizResult;
  onRestart: () => void;
}

export function ResultScreen({ results, onRestart }: ResultProps) {
  const [showDevAudit, setShowDevAudit] = useState(false);
  const [activeTab, setActiveTab] = useState<"cahaya" | "perilaku" | "ekosistem">("cahaya");
  const [auditReport] = useState<AuditReport>(() => auditScoring());

  // Helper translations for Enneagram explanations based on primary type
  const getEnneagramPoem = (type: string) => {
    const maps: Record<string, { title: string; desc: string }> = {
      "1": { title: "Sang Penjaga Prasaja", desc: "Mengejar kesucian moral dan kebenaran normatif, rawan tersiksa kritikus internal." },
      "2": { title: "Sang Perawat Kehangatan", desc: "Mencurahkan kasih sayang demi penerimaan tulus, rawan melupakan otonomi diri." },
      "3": { title: "Sang Arsitek Kejayaan", desc: "Mengejar prestasi nyata dan reputasi kinerja tinggi, rawan diperbudak topeng ego." },
      "4": { title: "Sang Penjaga Originalitas", desc: "Merenungi keunikan estetik dan kedalaman batin murni, rawan dipenjara melankoli." },
      "5": { title: "Sang Penjelajah Teori", desc: "Mengumpulkan arsitektur pengetahuan fungsional privat, rawan membekukan diri dari rasa." },
      "6": { title: "Sang Penjaga Sekuritas", desc: "Menguji keandalan sistem dan loyalitas persahabatan, rawan dicengkeram kecemasan." },
      "7": { title: "Sang Pemburu Sinar", desc: "Merajut petualangan kebahagiaan bebas dari nestapa, rawan lari dari luka mendalam." },
      "8": { title: "Sang Singa Otonom", desc: "Melindungi kedaulatan hakiri dan mematikan ketertundukan, rawan membenci kerentanan batin." },
      "9": { title: "Sang Penyemai Damai", desc: "Merawat keharmonisan tanpa turbulensi hubungan, rawan membiarkan diri hanyut sepi." },
    };
    return maps[type] || { title: "Jiwa Penjelajah", desc: "Mencari keselarasan batin" };
  };

  const getDichotomyLabelValue = (axis: string, val: number) => {
    if (axis === "IE") {
      return val >= 55 ? "Introvert (Pusat Energi Privat)" : val <= 45 ? "Extrovert (Sirkulasi Energi Sosial)" : "Ambivert (Penyeimbang Lentur)";
    }
    if (axis === "SN") {
      return val >= 55 ? "Intuisi (Orientasi Pola & Visi)" : val <= 45 ? "Sensoris (Orientasi Data Riil)" : "Perspektif Seimbang";
    }
    if (axis === "TF") {
      return val >= 55 ? "Thinking (Logika & Kebenaran Objektif)" : val <= 45 ? "Feeling (Nilai Rasa & Kemanusiaan)" : "Pertimbangan Proporsional";
    }
    return val >= 55 ? "Judging (Sistem Kepatuhan Struktur)" : val <= 45 ? "Perceiving (Sistem Spontanitas Kelenturan)" : "Gaya Eksekusi Fleksibel";
  };

  const enneagramInfo = getEnneagramPoem(results.enneagram.primaryType);

  const constellationSummaryInfo = {
    mbti: results.top3Mbti[0].type,
    enneagram: results.enneagram.wing,
    instinct: results.enneagram.instinctualStack,
    value: results.valuesRanking[0] || "Aspek Batin",
    fear: results.coreFear,
    love: results.preferredLoveStyle,
    comfort: results.preferredEnvironment
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-x-hidden">
      
      {/* BACKGROUND FLOATING STAR DECORE */}
      <div className="absolute inset-0 bg-cosmic-grid opacity-20 pointer-events-none" />

      {/* TOP GLOWING ATMOSPHERE */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-indigo-950/40 via-transparent to-transparent pointer-events-none" />

      {/* RESULT CONTAINER MAIN */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        
        {/* HEADER BAR RESULT */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800/80 pb-6">
          <div className="text-left">
            <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-widest bg-indigo-950/45 px-3 py-1 rounded-full border border-indigo-500/10">
              Hasil Interpretasi Tipologi
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mt-3">
              Rasi {results.top3Mbti[0].type} ({results.enneagram.wing})
            </h1>
            <p className="text-sm text-slate-400 mt-1 select-none font-sans max-w-lg leading-relaxed">
              Sebuah rajutan rasi kepribadian {results.top3Mbti[0].type} yang dipandu intuisi esensial {enneagramInfo.title}.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onRestart}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono font-bold tracking-wider text-slate-300 hover:text-white uppercase bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl transition-all select-none cursor-pointer"
            >
              <Undo2 className="w-3.5 h-3.5" />
              Uji Ulang
            </button>
            <button
              onClick={() => setShowDevAudit(!showDevAudit)}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono font-bold tracking-wider text-teal-300 hover:text-teal-200 uppercase bg-teal-950/25 border border-teal-500/20 rounded-xl transition-all select-none cursor-pointer"
            >
              <Bug className="w-3.5 h-3.5" />
              Audit Sistem
            </button>
          </div>
        </div>

        {/* METADATA DIAGNOSTIC DRAWER DEVS */}
        <AnimatePresence>
          {showDevAudit && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full bg-slate-900/40 border border-teal-500/15 rounded-3xl p-6 overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Bug className="w-5 h-5 text-teal-400" />
                  <p className="font-display font-bold text-teal-300 tracking-wider">Laboratorium Audit Diagnostik Kuesioner</p>
                </div>
                <span className="text-[10px] font-mono bg-teal-950 border border-teal-500/20 text-teal-300 px-2 py-0.5 rounded-md">
                  Status: Compliant
                </span>
              </div>

              {/* Grid content audit */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left text-xs font-mono mt-4 leading-normal">
                
                {/* Visual points summary */}
                <div className="backdrop-blur-md bg-slate-950/40 border border-slate-850 p-4 rounded-2xl flex flex-col gap-2">
                  <h4 className="text-teal-400 font-bold uppercase tracking-wider text-[10px]">Points Per Subscale</h4>
                  <div className="space-y-1 text-[10px] overflow-y-auto max-h-48 pr-1 mt-1 text-slate-300">
                    {Object.keys(auditReport.measurementPoints).map(sys => {
                      const keys = Object.keys(auditReport.measurementPoints[sys]);
                      return (
                        <div key={sys} className="pb-1 border-b border-slate-900">
                          <span className="text-indigo-300">{sys}:</span>
                          <div className="grid grid-cols-2 gap-1 pl-2 text-[9px] text-slate-400">
                            {keys.slice(0, 8).map(k => (
                              <div key={k}>{k}: {auditReport.measurementPoints[sys][k].toFixed(0)}pt</div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Audit Warnings and Success Logs */}
                <div className="backdrop-blur-md bg-slate-950/40 border border-slate-850 p-4 rounded-2xl flex flex-col gap-2">
                  <h4 className="text-teal-400 font-bold uppercase tracking-wider text-[10px]">Sinyal & Integritas Item</h4>
                  <div className="space-y-2 mt-1 max-h-48 overflow-y-auto pr-1">
                    <div className="text-[10px] text-slate-400">
                      Total Item Berjalan: <span className="text-white">{auditReport.totalQuestions}</span>
                    </div>
                    {auditReport.duplicateIDs.length > 0 ? (
                      <div className="text-red-400 text-[10px]">Duplicate IDs: {auditReport.duplicateIDs.join(", ")}</div>
                    ) : (
                      <div className="text-emerald-400 text-[10px] flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> ID unik berantai lengkap
                      </div>
                    )}
                    {auditReport.uiLeaks.length > 0 ? (
                      <div className="text-amber-400 text-[10px]">UI Leaks Deteksi ({auditReport.uiLeaks.length}). Ada bocoran di: {auditReport.uiLeaks.slice(0, 3).map(l => l.id).join(", ")}</div>
                    ) : (
                      <div className="text-emerald-400 text-[10px] flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Bersih dari bocoran teori di UI
                      </div>
                    )}
                    {auditReport.incompleteOptions.length > 0 ? (
                      <div className="text-red-400 text-[10px]">Incomplete Option structure: {auditReport.incompleteOptions.length} errors found.</div>
                    ) : (
                      <div className="text-emerald-400 text-[10px] flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Struktur bobot options 100% lengkap
                      </div>
                    )}
                  </div>
                </div>

                {/* System targets metrics summary */}
                <div className="backdrop-blur-md bg-slate-950/40 border border-slate-850 p-4 rounded-2xl flex flex-col gap-2">
                  <h4 className="text-teal-400 font-bold uppercase tracking-wider text-[10px]">Target Coverage Status</h4>
                  <div className="space-y-1.5 mt-1 overflow-y-auto max-h-48 pr-1 text-[9px] text-slate-400">
                    <div className="text-emerald-400 font-semibold mb-1">Success Checklist:</div>
                    {auditReport.coverageSuccess.slice(0, 10).map((succ, sIdx) => (
                      <div key={sIdx} className="truncate">✓ {succ}</div>
                    ))}
                    {auditReport.coverageWarnings.length > 0 && (
                      <div className="text-amber-400 mt-2 font-semibold">Warnings:</div>
                    )}
                    {auditReport.coverageWarnings.map((warn, wIdx) => (
                      <div key={wIdx}>! {warn}</div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BENTO VIEW TABS SELECTOR */}
        <div className="flex gap-2 p-1 bg-slate-900/60 border border-slate-800 rounded-2xl w-full max-w-md mx-auto justify-between select-none">
          {[
            { id: "cahaya", label: "Cahaya Utama", icon: Sparkles },
            { id: "perilaku", label: "Gaya Perilaku", icon: SlidersHorizontal },
            { id: "ekosistem", label: "Ekosistem Afeksi", icon: BookOpen }
          ].map(tab => {
            const Icon = tab.icon;
            const isAct = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-display font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  isAct 
                    ? "bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-500/10" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* VIEW SHIFT CHANNELS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          {/* TAB 1: CAHAYA UTAMA */}
          {activeTab === "cahaya" && (
            <>
              {/* CONSTELATION CANVAS bento card */}
              <div className="relative md:col-span-2 aspect-square md:aspect-auto md:h-[500px] border border-slate-800/80 rounded-3xl overflow-hidden flex flex-col justify-end p-6 bg-slate-950/40">
                <ConstellationCanvas interactive={true} results={constellationSummaryInfo} />
              </div>

              {/* COGNITIVE STACK DETAILS */}
              <div className="backdrop-blur-md bg-slate-900/15 border border-slate-800/80 rounded-3xl p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <Layers className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-display font-semibold text-white tracking-wide">Arsitektur Cognitive Stack</h3>
                </div>
                
                <p className="text-[10px] font-mono text-slate-400 leading-normal">
                  Peta urutan pengolahan data Anda dari ranah kesadaran utama hingga pertahanan terdalam:
                </p>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex justify-between items-center p-2 rounded-xl bg-indigo-950/30 border border-indigo-500/15">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-indigo-300 font-bold">Dominant (Hulu Utama)</p>
                      <p className="font-display font-bold text-white mt-0.5">{results.mbtiStack.dominant}</p>
                    </div>
                    <span className="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded-md font-bold">1st</span>
                  </div>

                  <div className="flex justify-between items-center p-2 rounded-xl bg-indigo-950/20 border border-indigo-500/10">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400">Auxiliary (Pengarah Aksi)</p>
                      <p className="font-display font-bold text-slate-200 mt-0.5">{results.mbtiStack.auxiliary}</p>
                    </div>
                    <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-md">2nd</span>
                  </div>

                  <div className="flex justify-between items-center p-2 rounded-xl bg-slate-950/40 border border-slate-850">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400">Tertiary (Sisi Kreatif/Labil)</p>
                      <p className="font-display font-bold text-slate-300 mt-0.5">{results.mbtiStack.tertiary}</p>
                    </div>
                    <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-md">3rd</span>
                  </div>

                  <div className="flex justify-between items-center p-2 rounded-xl bg-slate-950/40 border border-slate-850">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-rose-400/80">Inferior (Titik Lemah)</p>
                      <p className="font-display font-bold text-rose-300/80 mt-0.5">{results.mbtiStack.inferior}</p>
                    </div>
                    <span className="text-[10px] font-mono bg-rose-950/20 text-rose-400 px-1.5 py-0.5 rounded-md">4th</span>
                  </div>
                </div>

                {/* Shadows roles link */}
                <div className="mt-2 p-3 bg-rose-950/10 border border-rose-500/10 rounded-2xl text-[10px] leading-relaxed text-slate-400">
                  <span className="font-bold text-rose-400 uppercase">Pertahanan Shadow (Bawah Sadar):</span>
                  <p className="mt-1">
                    Saat Anda terpojok stress, asimilasi kognitif akan memicu <span className="text-slate-300 font-semibold">{results.mbtiStack.opposing}</span> sebagai tameng asertif, 
                    diikuti suara destruktif <span className="text-slate-300 font-semibold">{results.mbtiStack.critical}</span> untuk menghakimi diri sepi.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: GAYA PERILAKU */}
          {activeTab === "perilaku" && (
            <>
              {/* MBTI AXIS DICHOTOMY CONTRAST PANEL */}
              <div className="backdrop-blur-md bg-slate-900/15 border border-slate-800/80 rounded-3xl p-6 flex flex-col gap-5 justify-between md:col-span-2">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <Compass className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-display font-semibold text-white tracking-wide">Spektrum Kutub Kognitif</h3>
                </div>

                <div className="space-y-5 py-4">
                  {/* I vs E */}
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between font-mono text-[10px] uppercase text-indigo-300">
                      <span>Introversi (I): {results.mbtiDichotomy.I_E}%</span>
                      <span>Ekstraversi (E): {100 - results.mbtiDichotomy.I_E}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden flex">
                      <div className="h-full bg-indigo-500" style={{ width: `${results.mbtiDichotomy.I_E}%` }} />
                      <div className="h-full bg-slate-800" style={{ width: `${100 - results.mbtiDichotomy.I_E}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-400 select-none pt-0.5 leading-normal">
                      Cenderung mengarah ke: <span className="text-indigo-200 font-semibold">{getDichotomyLabelValue("IE", results.mbtiDichotomy.I_E)}</span>.
                    </p>
                  </div>

                  {/* S vs N */}
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between font-mono text-[10px] uppercase text-emerald-300">
                      <span>Intuitif (N): {results.mbtiDichotomy.S_N}%</span>
                      <span>Sensoris (S): {100 - results.mbtiDichotomy.S_N}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden flex">
                      <div className="h-full bg-emerald-500" style={{ width: `${results.mbtiDichotomy.S_N}%` }} />
                      <div className="h-full bg-slate-800" style={{ width: `${100 - results.mbtiDichotomy.S_N}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-400 select-none pt-0.5 leading-normal">
                      Cenderung mengarah ke: <span className="text-emerald-200 font-semibold">{getDichotomyLabelValue("SN", results.mbtiDichotomy.S_N)}</span>.
                    </p>
                  </div>

                  {/* T vs F */}
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between font-mono text-[10px] uppercase text-amber-300">
                      <span>Logika & Struktur (T): {results.mbtiDichotomy.T_F}%</span>
                      <span>Nilai & Simpati (F): {100 - results.mbtiDichotomy.T_F}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden flex">
                      <div className="h-full bg-amber-500" style={{ width: `${results.mbtiDichotomy.T_F}%` }} />
                      <div className="h-full bg-slate-800" style={{ width: `${100 - results.mbtiDichotomy.T_F}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-400 select-none pt-0.5 leading-normal">
                      Cenderung mengarah ke: <span className="text-amber-200 font-semibold">{getDichotomyLabelValue("TF", results.mbtiDichotomy.T_F)}</span>.
                    </p>
                  </div>

                  {/* J vs P */}
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between font-mono text-[10px] uppercase text-rose-300">
                      <span>Kepatuhan Rencana (J): {results.mbtiDichotomy.J_P}%</span>
                      <span>Fleksibilitas Spontan (P): {100 - results.mbtiDichotomy.J_P}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden flex">
                      <div className="h-full bg-rose-500" style={{ width: `${results.mbtiDichotomy.J_P}%` }} />
                      <div className="h-full bg-slate-800" style={{ width: `${100 - results.mbtiDichotomy.J_P}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-400 select-none pt-0.5 leading-normal">
                      Cenderung mengarah ke: <span className="text-rose-200 font-semibold">{getDichotomyLabelValue("JP", results.mbtiDichotomy.J_P)}</span>.
                    </p>
                  </div>
                </div>

                {/* Additional metrics info */}
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-400">
                  <div>Socionics Estimate: <span className="text-indigo-300 font-bold">{results.socionicsEstimate}</span></div>
                  <div>Quadra Group: <span className="text-indigo-300 font-bold">{results.quadraTendency} Quadra</span></div>
                </div>
              </div>

              {/* CORE ENNEAGRAM AND TRITYPE BANNER */}
              <div className="backdrop-blur-md bg-slate-900/15 border border-slate-800/80 rounded-3xl p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <Award className="w-5 h-5 text-rose-400" />
                  <h3 className="font-display font-semibold text-white tracking-wide">Sinar Enneagram & Tritype</h3>
                </div>

                <div className="text-center bg-slate-950/40 p-5 rounded-2xl border border-rose-500/10">
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Tipe Utama</span>
                  <p className="text-4xl font-display font-bold text-rose-300 mt-1">{results.enneagram.wing}</p>
                  <p className="text-xs font-display font-semibold text-white tracking-wider mt-2 uppercase">{enneagramInfo.title}</p>
                </div>

                <div className="space-y-3 pt-1 text-xs leading-relaxed text-slate-300">
                  <div className="flex justify-between items-center p-2 rounded-xl bg-slate-950/40 border border-slate-850">
                    <span className="text-slate-400 font-mono text-[10px] uppercase">Stacking Naluri:</span>
                    <span className="text-white font-mono font-bold tracking-wider">{results.enneagram.instinctualStack}</span>
                  </div>

                  <div className="flex justify-between items-center p-2 rounded-xl bg-slate-950/40 border border-slate-850">
                    <span className="text-slate-400 font-mono text-[10px] uppercase">Tritype Model:</span>
                    <span className="text-white font-mono font-bold tracking-wider">{results.enneagram.tritype}</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 leading-relaxed mt-2 p-3 bg-rose-950/10 border border-rose-500/5 rounded-2xl">
                  💡 <span className="font-bold text-rose-400 font-display">Refleksi Ego:</span> {enneagramInfo.desc}
                </p>
              </div>
            </>
          )}

          {/* TAB 3: EKOSISTEM AFEKSI & NURTURE */}
          {activeTab === "ekosistem" && (
            <>
              {/* INTERPERSONAL & VALUE SATELLITES */}
              <div className="backdrop-blur-md bg-slate-900/15 border border-slate-800/80 rounded-3xl p-6 flex flex-col gap-4 md:col-span-2">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <Heart className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-display font-semibold text-white tracking-wide">Pilar Siklus & Kepribadian Batin</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  
                  {/* Values Satellite beads */}
                  <div className="backdrop-blur-md bg-slate-950/30 border border-slate-850 p-4 rounded-2xl">
                    <h4 className="font-display font-semibold text-xs text-emerald-300 uppercase tracking-wider pb-2 border-b border-slate-900/65">
                      Gugusan Nilai Tertinggi
                    </h4>
                    <ul className="space-y-2.5 mt-3">
                      {results.valuesRanking.map((val, idx) => (
                        <li key={val} className="flex items-center gap-2 leading-none text-slate-300">
                          <span className="flex items-center justify-center w-5 h-5 rounded-md bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                            {idx + 1}
                          </span>
                          <span className="text-xs truncate">{val}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Character style tags */}
                  <div className="backdrop-blur-md bg-slate-950/30 border border-slate-850 p-4 rounded-2xl flex flex-col gap-3">
                    <h4 className="font-display font-semibold text-xs text-indigo-300 uppercase tracking-wider pb-2 border-b border-slate-900/65">
                      Sifat & Reaksi Kunci
                    </h4>
                    
                    <div className="space-y-2 mt-1 select-none leading-none">
                      <div>
                        <p className="text-[9px] font-mono text-slate-500 uppercase">Gaya Memutuskan</p>
                        <p className="text-[11px] font-sans font-semibold text-white mt-1">{results.decisionStyle}</p>
                      </div>

                      <div>
                        <p className="text-[9px] font-mono text-slate-500 uppercase">Gaya Berkomunikasi</p>
                        <p className="text-[11px] font-sans font-semibold text-white mt-1">{results.communicationStyle}</p>
                      </div>

                      <div>
                        <p className="text-[9px] font-mono text-slate-500 uppercase">Respon Berkonflik</p>
                        <p className="text-[11px] font-sans font-semibold text-white mt-1">{results.conflictStyle}</p>
                      </div>

                      <div>
                        <p className="text-[9px] font-mono text-slate-500 uppercase">Reaksi Saat Depresi</p>
                        <p className="text-[11px] font-sans font-semibold text-rose-300 mt-1">{results.stressResponse}</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Love and Partner narration box */}
                <div className="p-4 bg-emerald-950/10 border border-emerald-500/10 rounded-2xl text-[11px] leading-relaxed text-slate-300">
                  <span className="font-bold text-emerald-400 font-display">Kamus Afeksi & Ruang Kedempingan:</span>
                  <p className="mt-1">
                    Anda merasakan kedalaman kehangatan yang tulus di atas fondasi afeksi berupa <span className="font-semibold text-white">{results.preferredLoveStyle}</span>, 
                    dan paling harmonis ketika bersandar mendampingi partner dengan sifat <span className="font-semibold text-white">{results.idealPartnerTendency}</span>. 
                    Hari-hari lelah Anda lekas pulih di dalam ruang perlindungan berkarakter <span className="font-semibold text-white">{results.preferredEnvironment}</span>.
                  </p>
                </div>
              </div>

              {/* PROFESSIONAL WORK MODEL & LEARNING */}
              <div className="backdrop-blur-md bg-slate-900/15 border border-slate-800/80 rounded-3xl p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <Smile className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-display font-semibold text-white tracking-wide">Ekosistem Kinerja</h3>
                </div>

                <div className="space-y-4">
                  <div className="backdrop-blur-md bg-slate-950/30 border border-slate-850 p-4 rounded-2xl">
                    <p className="text-[9px] font-mono text-slate-400 uppercase">Gaya Kerja Terkuat</p>
                    <p className="text-xs font-display font-bold text-white mt-1">{results.workStyle}</p>
                  </div>

                  <div className="backdrop-blur-md bg-slate-950/30 border border-slate-850 p-4 rounded-2xl">
                    <p className="text-[9px] font-mono text-slate-400 uppercase">Gaya Belajar Efektif</p>
                    <p className="text-xs font-display font-bold text-white mt-1">{results.learningStyle}</p>
                  </div>

                  <div className="backdrop-blur-md bg-slate-950/30 border border-slate-850 p-4 rounded-2xl">
                    <p className="text-[9px] font-mono text-slate-405 uppercase">Karakter Klasik Temperament</p>
                    <p className="text-xs font-display font-bold text-indigo-300 mt-1 uppercase">
                      {results.temperament.primary} - {results.temperament.secondary} ({results.temperament.scorePrimary.toFixed(0)}%)
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>

        {/* BOTTOM VALIDITY CONFIDENCE AREA */}
        <div className="backdrop-blur-md bg-slate-900/40 border border-slate-800 rounded-3xl p-6 text-left flex flex-col md:flex-row items-start md:items-center gap-6 justify-between mt-4">
          <div className="flex gap-4 items-start max-w-2xl text-xs sm:text-sm">
            <ShieldAlert className="w-8 h-8 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-display font-bold text-white text-base">Tingkat Keandalan Sinyal (Confidence)</p>
              <div className="flex items-center gap-2 mt-1 select-none">
                <span className="text-[10px] font-mono bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded-md border border-indigo-500/10 uppercase font-bold">
                  {results.confidence.category}
                </span>
                <span className="text-slate-400 font-mono text-[10px]">Skor Validitas: {results.confidence.score}%</span>
              </div>
              <ul className="list-disc list-inside mt-2 text-[10px] sm:text-xs text-slate-400 space-y-1 pl-1 leading-relaxed">
                {results.confidence.notes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 shrink-0 w-full md:w-auto">
            <p className="text-[9px] font-mono text-slate-500 uppercase select-none tracking-wider font-bold">Rasi Diri Core Engine v2.4.0</p>
            <p className="text-[10px] text-slate-400 text-center md:text-right font-sans leading-normal max-w-xs select-none">
              Integritas data dijamin melalui andil audit parameter matematis secara lurus di browser lokal Anda.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
