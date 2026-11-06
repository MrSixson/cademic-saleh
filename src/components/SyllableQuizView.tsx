import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SyllableQuizItem } from '../data/syllableQuizData';
import { audioService } from '../services/audioService';
import {
  Trophy,
  Sparkles,
  Flame,
  CheckCircle2,
  XCircle,
  Volume2,
  HandMetal
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SyllableQuizViewProps {
  items: SyllableQuizItem[];
  onSuccess: (finalScore: number, finalCombo: number) => void;
  onMistake: (item: SyllableQuizItem, chosenCount: number) => void;
}

const PERSIAN_NUMBERS = ['۱', '۲', '۳', '۴'];

export const SyllableQuizView: React.FC<SyllableQuizViewProps> = ({
  items,
  onSuccess,
  onMistake
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showSyllableBreakdown, setShowSyllableBreakdown] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentItem = items[currentIndex];

  // Auto-speak word on change
  useEffect(() => {
    if (currentItem && !isCompleted) {
      setSelectedOption(null);
      setIsAnswerCorrect(null);
      setShowSyllableBreakdown(false);
    }
  }, [currentIndex, isCompleted]);

  // Keyboard shortcut listener (keys 1, 2, 3, 4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCompleted || selectedOption !== null) return;
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 4) {
        handleSelect(num);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, selectedOption, isCompleted, currentItem]);

  const handleSelect = (count: number) => {
    if (selectedOption !== null || !currentItem || isCompleted) return;

    setSelectedOption(count);
    const correct = count === currentItem.syllableCount;
    setIsAnswerCorrect(correct);
    setShowSyllableBreakdown(true);

    if (correct) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      const points = 100 + (newCombo > 1 ? newCombo * 20 : 0);
      setScore(prev => prev + points);
      audioService.playCorrect(newCombo);

      if (newCombo % 5 === 0) {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    } else {
      setCombo(0);
      audioService.playWrong();
      onMistake(currentItem, count);
    }

    // Proceed to next question after breakdown animation
    setTimeout(() => {
      if (currentIndex + 1 >= items.length) {
        setIsCompleted(true);
        audioService.playVictoryFanfare();
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.5 }
        });
        setTimeout(() => {
          onSuccess(score + (correct ? 100 : 0) + 500, combo);
        }, 1800);
      } else {
        setCurrentIndex(prev => prev + 1);
      }
    }, 1400);
  };

  const progressPercent = Math.round((currentIndex / items.length) * 100);

  return (
    <div className="w-full flex flex-col items-center select-none" dir="rtl">
      {/* 1. TOP STATS BAR: Organic Driftwood Plank */}
      <div className="w-full max-w-3xl cartoon-wood-panel p-3.5 sm:p-4 mb-4 shadow-2xl flex flex-wrap items-center justify-between gap-2 relative z-30">
        {/* Progress Badge */}
        <div className="flex items-center gap-3">
          <div className="bg-amber-950/70 border-2 border-yellow-400/50 px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-inner">
            <Trophy className="w-5 h-5 text-yellow-300" />
            <span className="text-xs sm:text-sm font-black text-amber-200">
              کلمه {currentIndex + 1} از {items.length}
            </span>
          </div>

          {/* Combo badge */}
          {combo > 1 && (
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-xs px-3 py-1.5 rounded-full flex items-center gap-1 animate-pulse shadow-md">
              <Flame className="w-4 h-4 text-amber-950 fill-amber-950" />
              <span>{combo} زنجیره درست!</span>
            </div>
          )}
        </div>

        {/* Score in Golden Pod */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-black">
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 px-4 py-1.5 rounded-full shadow-md border-2 border-yellow-100">
            <span>امتیاز:</span>
            <span>{score}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar in Rounded Sandy Groove */}
      <div className="w-full max-w-3xl bg-amber-950/70 h-3.5 rounded-full overflow-hidden border-2 border-amber-600/40 mb-6 shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-400 via-amber-400 to-emerald-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* 2. MAIN CARD: TARGET WORD DISPLAY (Organic Driftwood Board) */}
      <div className="w-full max-w-3xl cartoon-wood-panel p-6 sm:p-8 shadow-2xl relative flex flex-col items-center justify-between min-h-[400px] border-4 border-amber-950">
        {/* Corner Rivets */}
        <div className="absolute top-2.5 left-3 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
        <div className="absolute top-2.5 right-3 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
        <div className="absolute bottom-2.5 left-3 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
        <div className="absolute bottom-2.5 right-3 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />

        {/* Instruction Header in Soft Parchment */}
        <div className="w-full flex items-center justify-center gap-2 mb-4">
          <div className="marine-parchment px-5 py-1.5 shadow-md flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-800" />
            <span className="text-xs sm:text-sm font-black text-amber-950">
              این کلمه چند بخش (هجا) دارد؟
            </span>
          </div>
        </div>

        {/* Central Word Container */}
        <AnimatePresence mode="wait">
          {!isCompleted && currentItem && (
            <motion.div
              key={currentItem.id}
              initial={{ scale: 0.8, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col items-center justify-center my-2"
            >
              {/* Emoji Icon in Floating Bubble Glow */}
              <span className="text-5xl sm:text-6xl mb-3 drop-shadow-lg select-none">
                {currentItem.emoji}
              </span>

              {/* Word with Bold Contrast */}
              <h2 className="text-4xl sm:text-6xl font-black text-yellow-200 tracking-wider drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] mb-2">
                {currentItem.word}
              </h2>

              {/* Audio Pronunciation Button */}
              <button
                onClick={() => audioService.speakPersian(currentItem.word)}
                className="flex items-center gap-1.5 text-xs sm:text-sm text-amber-100 hover:text-white btn-marine-wood px-4 py-1.5 shadow-md mb-2 cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-yellow-300" />
                <span>تلفظ و بخش کردن با دست</span>
              </button>

              {/* Syllable Breakdown Visualizer on Answer */}
              {showSyllableBreakdown && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="flex flex-col items-center gap-2 mt-3 p-3.5 marine-parchment shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    {currentItem.syllablesDisplay.map((syl, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: idx * 0.15 }}
                        className="btn-spongebob-yellow text-amber-950 font-black text-lg sm:text-2xl px-4 py-2 shadow-lg"
                      >
                        {syl}
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-black text-amber-950">
                    {currentItem.explanation}
                  </span>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. FOUR NUMBER OPTION BUTTONS (1, 2, 3, 4) in Bubble Pods */}
        {!isCompleted && currentItem && (
          <div className="w-full max-w-xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 z-10">
            {[1, 2, 3, 4].map(num => {
              const isSelected = selectedOption === num;
              const isCorrectOpt = num === currentItem.syllableCount;
              const showSuccess = isSelected && isAnswerCorrect;
              const showError = isSelected && isAnswerCorrect === false;

              let buttonStyle =
                'btn-bubble-option text-slate-900 shadow-xl';

              if (showSuccess) {
                buttonStyle =
                  'bg-gradient-to-r from-emerald-400 to-green-500 text-slate-950 scale-105 shadow-emerald-500/50 ring-4 ring-emerald-300';
              } else if (showError) {
                buttonStyle =
                  'bg-rose-950 border-rose-400 text-rose-200 animate-shake ring-4 ring-rose-500';
              } else if (selectedOption !== null && isCorrectOpt) {
                buttonStyle =
                  'bg-gradient-to-r from-emerald-400 to-green-500 text-slate-950 ring-4 ring-emerald-300';
              }

              return (
                <button
                  key={num}
                  disabled={selectedOption !== null}
                  onClick={() => handleSelect(num)}
                  className={`relative p-4 sm:p-5 flex flex-col items-center justify-center gap-1.5 transition-all select-none cursor-pointer ${buttonStyle}`}
                >
                  {/* Big Number */}
                  <span className="text-3xl sm:text-4xl font-black drop-shadow-xs">
                    {PERSIAN_NUMBERS[num - 1]}
                  </span>
                  {/* Label */}
                  <span className="text-xs sm:text-sm font-black text-slate-800">
                    {num === 1 ? '۱ بخش' : `${PERSIAN_NUMBERS[num - 1]} بخش`}
                  </span>

                  {/* Feedback Icons */}
                  {showSuccess && (
                    <CheckCircle2 className="w-6 h-6 text-emerald-900 animate-bounce absolute top-2 left-2" />
                  )}
                  {showError && (
                    <XCircle className="w-6 h-6 text-rose-400 absolute top-2 left-2" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* 4. VICTORY CELEBRATION */}
        {isCompleted && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full flex flex-col items-center justify-center py-6 bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 text-white p-6 rounded-3xl shadow-2xl font-black text-center"
          >
            <Trophy className="w-16 h-16 text-yellow-300 mb-2 animate-bounce" />
            <h2 className="text-2xl sm:text-3xl font-black mb-1">
              🏆 آفرین استاد بخش‌کردن کلمات! 👏
            </h2>
            <p className="text-sm sm:text-base font-bold text-cyan-100 max-w-md">
              تمام ۲۰ کلمه را با موفقیت و مهارت کامل هجابندی کردی!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
