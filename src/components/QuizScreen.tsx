/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, HelpCircle, Inbox, Grid, X } from "lucide-react";
import { QuestionItem } from "../types";
import { ConstellationCanvas } from "./ConstellationCanvas";

interface QuizProps {
  questions: QuestionItem[];
  currentIndex: number;
  answers: Record<string, string>;
  isTieBreaker: boolean;
  tieBreakerIndex?: number;
  tieBreakerTotal?: number;
  onAnswer: (qId: string, optionId: string) => void;
  onPrev: () => void;
  onNext: () => void;
  onSkip: () => void;
  onJump: (index: number) => void;
  onFinish: () => void;
}

export function QuizScreen({
  questions,
  currentIndex,
  answers,
  isTieBreaker,
  tieBreakerIndex = 0,
  tieBreakerTotal = 0,
  onAnswer,
  onPrev,
  onNext,
  onSkip,
  onJump,
  onFinish
}: QuizProps) {
  const [showNavigator, setShowNavigator] = useState(false);

  const currentQ = questions[currentIndex];
  if (!currentQ) return null;

  const currentAnswer = answers[currentQ.id];
  const progressPercent = Math.round((currentIndex / questions.length) * 100);

  // Sub-domains translation for helpful visual context
  const getDomainLabel = (domain: string) => {
    const maps: Record<string, string> = {
      cognitive_focus: "Fokus Atensi & Masukan",
      communication_energy: "Arus Energi Verbal",
      social_confrontation: "Tekanan Pendirian Sosial",
      conflict_response: "Respon Benturan Personal",
      work_organization: "Organisasi Target Karir",
      learning_retention: "Asimilasi & Penyerapan Teori",
      moral_dilemma_cheat: "Integritas & Nurani Intim",
      moral_dilemma_lie: "Dilema Loyalitas vs Hukum",
      moral_secret: "Sirkulasi Rahasia & Mandat",
      moral_weak_blaming: "Nyali Kemanusiaan & Penindasan",
      moral_failure: "Coping kegagalan & Duka",
      moral_criticism_response: "Luka Ego & Umpan Balik",
      moral_giving: "Intensi Dermawan Altruisme",
      rejection_fear: "Asimilasi Luka Penolakan Cinta",
      core_fear_trigger: "Trigger Kewaspadaan Primordial",
      moral_conflict_with_society: "Rute Etika Komunal",
      scheduling_surprise: "Adaptabilitas Disrupsi Hari",
      sudden_double_date: "Manajemen Energi Spontan",
      intellectual_scrutiny: "Pilar Kebenaran Digital",
      group_belonging: "Keamanan Sandaran Kelompok",
      gossip_ethics: "Sirkulasi Desas Desus Sosial",
      aesthetic_pulp_vs_art: "Estetika Saraf Indrawi"
    };
    return maps[domain] || domain.replace(/_/g, " ").toUpperCase();
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden px-4 md:px-8 py-6">
      <ConstellationCanvas />

      {/* HEADER BAR */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex items-center justify-between gap-4">
        {/* Logo indicator */}
        <div className="flex flex-col">
          <span className="font-display font-bold text-white tracking-widest text-lg select-none">Rasi Diri</span>
          <span className="text-[9px] font-mono text-indigo-300 uppercase tracking-widest mt-0.5">
            {isTieBreaker ? "Penyelarasan Tie-Breaker" : "Pemetaan Pola Batin"}
          </span>
        </div>

        {/* Dynamic navigation button */}
        <button
          onClick={() => setShowNavigator(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono font-medium tracking-wider text-slate-300 hover:text-white uppercase bg-slate-900/40 hover:bg-slate-900 border border-slate-800/80 rounded-xl transition-all select-none cursor-pointer"
        >
          <Grid className="w-3.5 h-3.5 text-indigo-400" />
          Peta Kuesioner
        </button>
      </div>

      {/* CENTER ZONE: CHRONICLE QUESTION CONTAINER */}
      <div className="relative z-10 w-full max-w-2xl mx-auto my-auto py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="backdrop-blur-xl bg-slate-900/55 border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col justify-between"
          >
            {/* Domain & Reliability Indicator */}
            <div className="flex items-center justify-between text-left gap-4 pb-4 border-b border-slate-800/60">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-widest font-bold">
                  Aspek: {getDomainLabel(currentQ.domain)}
                </span>
                <span className="text-[9px] text-slate-400 mt-0.5">
                  Item No. {currentIndex + 1} dari {questions.length}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-950/40 px-2 py-0.5 border border-slate-800/40 rounded-md">
                <HelpCircle className="w-3 h-3 text-indigo-400" />
                Reliability: {(currentQ.reliability * 100).toFixed(0)}%
              </div>
            </div>

            {/* Prompt Statement */}
            <p className="text-white text-base sm:text-lg font-display tracking-wide leading-relaxed font-normal text-left my-6 sm:my-8 text-[#f1f5f9]">
              {currentQ.prompt}
            </p>

            {/* Instruction tooltip */}
            <p className="text-[10px] font-mono text-indigo-300 tracking-wider text-left bg-indigo-950/20 border border-indigo-500/10 px-3 py-1.5 rounded-xl mb-4 sm:mb-6 select-none">
              💡 {currentQ.instruction}
            </p>

            {/* Interactive Options Cards */}
            <div className="space-y-3 sm:space-y-4 text-left">
              {currentQ.options.map((opt) => {
                const isSelected = currentAnswer === opt.id;
                return (
                  <motion.div
                    key={opt.id}
                    onClick={() => onAnswer(currentQ.id, opt.id)}
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.995 }}
                    className={`p-4 sm:p-5 cursor-pointer border rounded-2xl transition-all duration-300 backdrop-blur-md select-none ${
                      isSelected
                        ? "bg-indigo-600/35 border-indigo-500 shadow-lg shadow-indigo-500/10"
                        : "bg-slate-950/35 hover:bg-slate-950/60 border-slate-800/60 hover:border-slate-800"
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Indicator ball */}
                      <span
                        className={`flex items-center justify-center font-mono font-bold text-xs shrink-0 w-6 h-6 rounded-full border transition-all ${
                          isSelected
                            ? "bg-indigo-500 text-white border-indigo-400"
                            : "bg-slate-900 border-slate-800 text-slate-400"
                        }`}
                      >
                        {opt.id.toUpperCase()}
                      </span>

                      {/* Content statement */}
                      <p className={`text-xs sm:text-sm leading-relaxed transition-all ${isSelected ? "text-white" : "text-slate-300"}`}>
                        {opt.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* FOOTER BAR: NAV TOOLS AND BUTTONS */}
      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col gap-4">
        {/* Tiny progress banner */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
          <span>Keutuhan Rasi</span>
          <span className="text-indigo-300 font-bold">{progressPercent}%</span>
        </div>

        {/* Dynamic tracker line */}
        <div className="h-1.5 w-full bg-slate-900/80 border border-slate-800/40 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Buttons drawer */}
        <div className="flex justify-between items-center gap-4 mt-2">
          <button
            onClick={onPrev}
            disabled={currentIndex === 0}
            className={`flex items-center gap-1 px-4 py-2 text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase bg-slate-900/30 border border-slate-800/40 hover:border-slate-750 rounded-xl transition-all ${
              currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:text-white cursor-pointer"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Kembali
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onSkip}
              className="px-4 py-2 text-xs font-mono font-semibold tracking-wider text-slate-400 hover:text-white uppercase bg-slate-900/20 border border-slate-800/30 rounded-xl transition-all cursor-pointer"
            >
              Skip
            </button>

            {currentIndex === questions.length - 1 ? (
              <button
                onClick={onFinish}
                className="flex items-center gap-1 px-5 py-2.5 text-xs font-display font-bold tracking-widest text-white uppercase bg-emerald-600 hover:bg-emerald-500 hover:border-emerald-400 shadow-lg shadow-emerald-500/10 border border-emerald-500/30 rounded-xl transition-all cursor-pointer focus:outline-none"
              >
                Pecahkan Rasi
                <ChevronRight className="w-4 h-4 animate-pulse" />
              </button>
            ) : (
              <button
                onClick={onNext}
                className="flex items-center gap-1 px-5 py-2.5 text-xs font-display font-bold tracking-widest text-indigo-300 hover:text-white uppercase bg-indigo-950/20 border border-indigo-500/20 hover:border-indigo-500 transition-all rounded-xl cursor-pointer focus:outline-none"
              >
                Lanjut
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* FLOATING POPUP: MAP SELECTOR PATH DRAWER */}
      <AnimatePresence>
        {showNavigator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[85vh]"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Grid className="w-5 h-5 text-indigo-400" />
                  <p className="font-display font-bold text-white tracking-wider text-base sm:text-lg">Konstelasi Peta Kuesioner</p>
                </div>
                <button
                  onClick={() => setShowNavigator(false)}
                  className="p-1 text-slate-400 hover:text-white transition-all bg-slate-950 border border-slate-800 rounded-lg cursor-pointer focus:outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Legend charts */}
              <div className="flex flex-wrap gap-4 my-4 ml-1 text-[10px] font-mono select-none">
                <div className="flex items-center gap-1.5 text-indigo-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Terjawab
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-850 border border-slate-800" /> Belum Terjawab
                </div>
                <div className="flex items-center gap-1.5 text-indigo-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-transparent border border-indigo-400/80" /> Sedang Aktif
                </div>
              </div>

              {/* Matrix list layout */}
              <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-10 gap-2 p-1">
                {questions.map((q, idx) => {
                  const isAns = !!answers[q.id];
                  const isAct = idx === currentIndex;

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        onJump(idx);
                        setShowNavigator(false);
                      }}
                      className={`relative aspect-square rounded-xl text-[10px] font-mono font-bold flex flex-col items-center justify-center border transition-all ${
                        isAct
                          ? "bg-slate-900 border-indigo-400 text-indigo-200"
                          : isAns
                          ? "bg-indigo-600/20 border-indigo-500 text-indigo-300"
                          : "bg-slate-950/60 border-slate-800/80 text-slate-600 hover:border-slate-700"
                      }`}
                    >
                      <span>{idx + 1}</span>
                      <span className="text-[7px] text-slate-500 uppercase mt-0.5 max-w-[48px] truncate tracking-normal">
                        {q.domain.split("_")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Progress feedback detail */}
              <p className="text-[10px] font-mono text-slate-400 text-center mt-6 select-none bg-slate-950/40 p-3 rounded-2xl border border-slate-800/40 leading-relaxed">
                *Klik kotak angka di atas untuk navigasi kilat ke pertanyaan mana pun. Kuesioner dapat diserahkan kapan saja setelah terkumpul kecukupan data yang presisi.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
