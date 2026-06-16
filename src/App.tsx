/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { QuizScreen } from "./components/QuizScreen";
import { ResultScreen } from "./components/ResultScreen";
import { MASTER_QUESTIONS, TIE_BREAKER_QUESTIONS } from "./data/questions";
import { calculateResults } from "./utils/calculateResults";
import { QuestionItem } from "./types";
import { Sparkles, Brain } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const STORAGE_KEY = "rasi_diri_session_answers";

export default function App() {
  const [view, setView] = useState<"welcome" | "quiz" | "results">("welcome");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [activeQuestions, setActiveQuestions] = useState<QuestionItem[]>(MASTER_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tieBreakerActive, setTieBreakerActive] = useState(false);
  const [showTieBreakerOverlay, setShowTieBreakerOverlay] = useState(false);

  // 1. Initial State Load checking localStorage cache
  useEffect(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (typeof parsed === "object" && parsed !== null) {
          setAnswers(parsed);
        }
      }
    } catch {
      // quiet catch for sandboxed iframe environments
    }
  }, []);

  const savedAnswersCount = Object.keys(answers).length;

  const handleStartNew = () => {
    setView("quiz");
    setCurrentIndex(0);
    setAnswers({});
    setActiveQuestions(MASTER_QUESTIONS);
    setTieBreakerActive(false);
    setShowTieBreakerOverlay(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const handleRestoreSession = () => {
    setView("quiz");
    // Find the first unanswered question
    let firstUnanswered = MASTER_QUESTIONS.findIndex(q => !answers[q.id]);
    if (firstUnanswered === -1) firstUnanswered = MASTER_QUESTIONS.length - 1;
    setCurrentIndex(firstUnanswered);

    // If they already completed regular questions and tie-breaker had been added
    const answeredKeys = Object.keys(answers);
    const hasTieAnswers = TIE_BREAKER_QUESTIONS.some(tbQ => answeredKeys.includes(tbQ.id));
    if (hasTieAnswers) {
      setActiveQuestions([...MASTER_QUESTIONS, ...TIE_BREAKER_QUESTIONS]);
      setTieBreakerActive(true);
      const totalCombinedIndex = [...MASTER_QUESTIONS, ...TIE_BREAKER_QUESTIONS].findIndex(q => !answers[q.id]);
      setCurrentIndex(totalCombinedIndex !== -1 ? totalCombinedIndex : MASTER_QUESTIONS.length);
    }
  };

  const handleAnswer = (qId: string, optionId: string) => {
    const updated = { ...answers, [qId]: optionId };
    setAnswers(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}

    // Auto-advance to next question with a small delay for tactile feedback
    setTimeout(() => {
      if (currentIndex < activeQuestions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    }, 280);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleJump = (index: number) => {
    if (index >= 0 && index < activeQuestions.length) {
      setCurrentIndex(index);
    }
  };

  // CHECKPOINTS: evaluate regular finish & trigger tie-breaker if scores are within 3%
  const handleFinish = () => {
    if (!tieBreakerActive) {
      const previewReport = calculateResults(answers);
      const mbtiScores = previewReport.top3Mbti;
      
      const isMbtiTie = mbtiScores.length >= 2 && (mbtiScores[0].score - mbtiScores[1].score) <= 3;
      
      if (isMbtiTie) {
        // Yes, there is a tight tie! Dynamically expand the kuesioner with 10 tie-breakers
        setActiveQuestions([...MASTER_QUESTIONS, ...TIE_BREAKER_QUESTIONS]);
        setTieBreakerActive(true);
        setShowTieBreakerOverlay(true);
        setCurrentIndex(MASTER_QUESTIONS.length);
        return;
      }
    }

    // Go to results immediately
    setView("results");
  };

  const closeTieBreakerOverlay = () => {
    setShowTieBreakerOverlay(false);
  };

  // Final Results compilation
  const ultimateResults = calculateResults(answers);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans antialiased overflow-x-hidden relative">
      <AnimatePresence mode="wait">
        
        {/* VIEW 1: WELCOME INTRO */}
        {view === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WelcomeScreen
              onStart={handleStartNew}
              savedAnswersCount={savedAnswersCount}
              onRestore={handleRestoreSession}
            />
          </motion.div>
        )}

        {/* VIEW 2: ACTIVE TESTING PORTAL */}
        {view === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizScreen
              questions={activeQuestions}
              currentIndex={currentIndex}
              answers={answers}
              isTieBreaker={tieBreakerActive && currentIndex >= MASTER_QUESTIONS.length}
              tieBreakerIndex={tieBreakerActive ? (currentIndex - MASTER_QUESTIONS.length) : undefined}
              tieBreakerTotal={tieBreakerActive ? TIE_BREAKER_QUESTIONS.length : undefined}
              onAnswer={handleAnswer}
              onPrev={handlePrev}
              onNext={handleNext}
              onSkip={handleSkip}
              onJump={handleJump}
              onFinish={handleFinish}
            />
          </motion.div>
        )}

        {/* VIEW 3: IN-DEPTH BENTO RESULTS PANEL */}
        {view === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ResultScreen
              results={ultimateResults}
              onRestart={handleStartNew}
            />
          </motion.div>
        )}

      </AnimatePresence>

      {/* TIE BREAKER COSMIC TRANSITION DIALOG OVERLAY */}
      <AnimatePresence>
        {showTieBreakerOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-md w-full backdrop-blur-xl bg-slate-900/60 border border-indigo-500/20 p-8 rounded-3xl text-center flex flex-col items-center gap-5 shadow-2xl"
            >
              <div className="w-14 h-14 bg-indigo-950/40 border border-indigo-400/20 text-indigo-400 rounded-full flex items-center justify-center shadow-lg star-glowing">
                <Brain className="w-6 h-6 animate-pulse" />
              </div>

              <h3 className="font-display font-bold text-xl text-white tracking-wide">Pola Batin Sangat Berimbang</h3>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mt-1">
                Akurasi analitis mendeteksi rasi kognitif Anda bersaing ketat dalam margin tipis (&le; 3%). 
                Aplikasi menyusun <span className="text-indigo-300 font-semibold">10 Skala Pertanyaan Tambahan (Tie-Breaker)</span> untuk mengasah hasil orisinal yang solid.
              </p>

              <button
                onClick={closeTieBreakerOverlay}
                className="w-full mt-3 py-3 font-display font-bold text-xs uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all cursor-pointer focus:outline-none"
              >
                Selaraskan Rasi Tambahan
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
