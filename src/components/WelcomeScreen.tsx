/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Compass, Sparkles, SlidersHorizontal, ShieldCheck } from "lucide-react";
import { ConstellationCanvas } from "./ConstellationCanvas";

interface WelcomeProps {
  onStart: () => void;
  savedAnswersCount?: number;
  onRestore?: () => void;
}

export function WelcomeScreen({ onStart, savedAnswersCount = 0, onRestore }: WelcomeProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12">
      {/* Background starmap */}
      <ConstellationCanvas />

      {/* Main glass card portal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl backdrop-blur-xl bg-slate-900/60 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col items-center text-center"
      >
        {/* Little celestial badge */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-medium tracking-widest text-indigo-300 uppercase bg-slate-800/60 border border-indigo-500/20 rounded-full"
        >
          <Sparkles className="w-3 h-3 text-indigo-400" />
          Kuesioner Tipologi Kedalaman
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl sm:text-5xl font-display font-medium text-white tracking-wider mt-6 select-none"
        >
          Rasi Diri
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-slate-300 text-sm sm:text-base font-normal max-w-lg mt-3 leading-relaxed"
        >
          Hubungkan titik-titik keputusan kecil keseharian Anda, lukis kembali gugusan kepribadian Anda dalam rasi yang presisi di balik layar.
        </motion.p>

        {/* Feature Icons Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg my-8 text-left"
        >
          <div className="flex gap-3 backdrop-blur-md bg-slate-950/40 border border-slate-800/50 rounded-2xl p-4">
            <Compass className="w-5 h-5 text-indigo-400 shrink-0" />
            <div>
              <p className="font-display font-semibold text-xs text-white uppercase tracking-wider">Pertanyaan Ringan</p>
              <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                Skenario manusia sehari-hari, tidak membosankan dan bebas istilah psikologi teknis.
              </p>
            </div>
          </div>

          <div className="flex gap-3 backdrop-blur-md bg-slate-950/40 border border-slate-800/50 rounded-2xl p-4">
            <SlidersHorizontal className="w-5 h-5 text-rose-400 shrink-0" />
            <div>
              <p className="font-display font-semibold text-xs text-white uppercase tracking-wider">Scoring Matematis</p>
              <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                Scoring berlapis memetakan puluhan tipologi (MBTI, Enneagram, AP, HEXACO, dll.) sekaligus secara proporsional.
              </p>
            </div>
          </div>

          <div className="flex gap-3 backdrop-blur-md bg-slate-950/40 border border-slate-800/50 rounded-2xl p-4">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="font-display font-semibold text-xs text-white uppercase tracking-wider">Nir-Klinis</p>
              <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                Membantu menemukan kecenderungan, pola yang tampak, dan kemungkinan interpretasi diri secara objektif-empati.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Buttons Action UI */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-sm items-center justify-center p-2"
        >
          {savedAnswersCount > 0 && onRestore && (
            <button
              onClick={onRestore}
              className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-display font-bold text-slate-300 uppercase tracking-widest bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 transition-all rounded-xl focus:outline-none"
            >
              Lanjutkan ({savedAnswersCount})
            </button>
          )}

          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-3 text-xs sm:text-sm font-display font-bold text-white uppercase tracking-widest bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 border border-indigo-400/20 hover:border-indigo-400 transition-all rounded-xl cursor-pointer focus:outline-none"
          >
            Mulai Pengembaraan
          </button>
        </motion.div>

        {/* Disclaimer footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.2 }}
          className="text-[9px] text-slate-400 max-w-sm mt-8 select-none leading-relaxed"
        >
          *Rasi Diri bukan diagnosis klinis resmi. Hasil didapatkan murni dari pemetaan logika perilaku andal melalui data statistik internal secara aman di browser Anda.
        </motion.p>
      </motion.div>
    </div>
  );
}
