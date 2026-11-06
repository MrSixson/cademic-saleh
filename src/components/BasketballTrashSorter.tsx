import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BasketballTrashWordItem } from '../data/basketballTrashData';
import { audioService } from '../services/audioService';
import {
  Trophy,
  Sparkles,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BasketballTrashSorterProps {
  items: BasketballTrashWordItem[];
  onSuccess: (score: number, combo: number) => void;
  onMistake: (item: BasketballTrashWordItem, chosenTarget: 'basket' | 'trash') => void;
}

export const BasketballTrashSorter: React.FC<BasketballTrashSorterProps> = ({
  items,
  onSuccess,
  onMistake
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [basketsCount, setBasketsCount] = useState<number>(0);
  const [trashCount, setTrashCount] = useState<number>(0);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'mistake';
    message: string;
    target: 'basket' | 'trash';
  } | null>(null);

  // Animation states for flying object
  const [flyingObject, setFlyingObject] = useState<{
    target: 'basket' | 'trash';
    word: string;
    isCorrectAction: boolean;
  } | null>(null);

  const [basketHoopActive, setBasketHoopActive] = useState<boolean>(false);
  const [trashCanActive, setTrashCanActive] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Dragging state
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const currentItem = items[currentIndex];

  // Sound generator for Basketball Swish & Trash Crunch
  const playSwishSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      }
    } catch {
      // Fallback
    }
  };

  const playTrashSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.16);
      }
    } catch {
      // Fallback
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCompleted || !currentItem || flyingObject) return;
      if (e.key === 'ArrowRight' || e.key === 'b' || e.key === 'B') {
        handleSort('basket');
      } else if (e.key === 'ArrowLeft' || e.key === 't' || e.key === 'T' || e.key === 'Delete') {
        handleSort('trash');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isCompleted, flyingObject, currentItem]);

  // Main Sorting Logic
  const handleSort = (chosenTarget: 'basket' | 'trash') => {
    if (!currentItem || flyingObject || isCompleted) return;

    const isCorrectToss =
      (chosenTarget === 'basket' && currentItem.isCorrect) ||
      (chosenTarget === 'trash' && !currentItem.isCorrect);

    // Trigger visual flying toss
    setFlyingObject({
      target: chosenTarget,
      word: currentItem.word,
      isCorrectAction: isCorrectToss
    });

    if (chosenTarget === 'basket') {
      setBasketHoopActive(true);
      setTimeout(() => setBasketHoopActive(false), 700);
      playSwishSound();
    } else {
      setTrashCanActive(true);
      setTimeout(() => setTrashCanActive(false), 700);
      playTrashSound();
    }

    if (isCorrectToss) {
      // Success!
      const newCombo = combo + 1;
      setCombo(newCombo);
      const points = 100 + (newCombo > 1 ? newCombo * 20 : 0);
      setScore(prev => prev + points);
      audioService.playCorrect(newCombo);

      if (chosenTarget === 'basket') {
        setBasketsCount(prev => prev + 1);
        setFeedback({
          type: 'success',
          target: 'basket',
          message: `🏀 گل شد! «${currentItem.word}» املای کاملاً درست دارد! (+${points} امتیاز)`
        });
      } else {
        setTrashCount(prev => prev + 1);
        setFeedback({
          type: 'success',
          target: 'trash',
          message: `🗑️ عالی! «${currentItem.word}» غلط بود و دور انداخته شد! املای درست: «${currentItem.correctSpelling}» (+${points} امتیاز)`
        });
      }

      // Confetti burst on milestones
      if (newCombo % 5 === 0) {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    } else {
      // Mistake
      setCombo(0);
      audioService.playWrong();
      onMistake(currentItem, chosenTarget);

      if (chosenTarget === 'basket') {
        setFeedback({
          type: 'mistake',
          target: 'basket',
          message: `❌ اوه نه! کلمه «${currentItem.word}» غلط املایی دارد و باید به سطل زباله می‌رفت! (املای درست: ${currentItem.correctSpelling})`
        });
      } else {
        setFeedback({
          type: 'mistake',
          target: 'trash',
          message: `❌ حیف شد! کلمه «${currentItem.word}» املای درستی داشت و باید داخل سبد بسکتبال شوت می‌شد!`
        });
      }
    }

    // Move to next word after flying animation
    setTimeout(() => {
      setFlyingObject(null);
      if (currentIndex + 1 >= items.length) {
        // Completed all items!
        setIsCompleted(true);
        audioService.playVictoryFanfare();
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.5 }
        });
        setTimeout(() => {
          onSuccess(score + 500, combo);
        }, 1800);
      } else {
        setCurrentIndex(prev => prev + 1);
      }
    }, 600);
  };

  const progressPercent = Math.round((currentIndex / items.length) * 100);

  return (
    <div className="w-full flex flex-col items-center select-none" dir="rtl">
      {/* 1. TOP STATS BAR */}
      <div className="w-full max-w-4xl bg-slate-900/90 border border-amber-500/40 rounded-2xl p-3 sm:p-4 mb-4 backdrop-blur-md shadow-2xl flex flex-wrap items-center justify-between gap-2">
        {/* Progress & Count */}
        <div className="flex items-center gap-3">
          <div className="bg-amber-500/20 border border-amber-400/50 px-3 py-1.5 rounded-xl flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span className="text-xs sm:text-sm font-bold text-amber-200">
              کلمه {currentIndex + 1} از {items.length}
            </span>
          </div>

          {/* Combo badge */}
          {combo > 1 && (
            <div className="bg-gradient-to-r from-orange-600 to-amber-500 text-white font-black text-xs px-2.5 py-1.5 rounded-xl flex items-center gap-1 animate-pulse shadow-md">
              <Flame className="w-4 h-4 text-yellow-200" />
              <span>{combo} متوالی!</span>
            </div>
          )}
        </div>

        {/* Counters */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-bold">
          <div className="flex items-center gap-1.5 bg-orange-950/80 border border-orange-500/50 text-orange-300 px-3 py-1.5 rounded-xl shadow">
            <span>🏀 گل‌های بسکتبال:</span>
            <span className="text-white font-black text-base">{basketsCount}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 px-3 py-1.5 rounded-xl shadow">
            <span>🗑️ زباله‌های بازیافتی:</span>
            <span className="text-white font-black text-base">{trashCount}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-yellow-500 text-slate-950 px-3 py-1.5 rounded-xl font-black shadow-md">
            <span>امتیاز:</span>
            <span>{score}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-4xl bg-slate-950/80 h-3 rounded-full overflow-hidden border border-cyan-500/30 mb-4">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-orange-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* 2. MAIN ARENA: BASKETBALL HOOP & TRASH CAN & ACTIVE WORD */}
      <div className="w-full max-w-4xl bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-900/90 border-2 border-cyan-500/30 rounded-3xl p-4 sm:p-6 shadow-2xl relative flex flex-col items-center min-h-[380px] justify-between overflow-hidden">
        {/* Background Court Markings */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
          <div className="w-72 h-72 rounded-full border-4 border-amber-400" />
          <div className="absolute w-full h-0.5 bg-cyan-400" />
        </div>

        {/* FEEDBACK BANNER */}
        <div className="w-full min-h-[50px] flex items-center justify-center z-10">
          <AnimatePresence mode="wait">
            {feedback && (
              <motion.div
                key={feedback.message}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg ${
                  feedback.type === 'success'
                    ? 'bg-emerald-950/90 border border-emerald-400 text-emerald-200'
                    : 'bg-rose-950/90 border border-rose-400 text-rose-200 animate-shake'
                }`}
              >
                {feedback.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
                <span>{feedback.message}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* TWO TARGET BINS (Basketball on Right / Trash Can on Left) */}
        <div className="w-full grid grid-cols-2 gap-4 sm:gap-8 my-2 z-10">
          {/* TRASH CAN (LEFT - FOR WRONG WORDS) */}
          <motion.div
            animate={{
              scale: trashCanActive ? [1, 1.15, 1] : 1,
              borderColor: trashCanActive ? '#10b981' : 'rgba(16, 185, 129, 0.4)'
            }}
            onClick={() => handleSort('trash')}
            className={`flex flex-col items-center justify-center p-3 sm:p-5 rounded-[2.25rem_2.5rem_2rem_2.4rem] border-4 cursor-pointer transition-all ${
              trashCanActive
                ? 'bg-emerald-900/80 border-emerald-300 shadow-2xl shadow-emerald-500/40 ring-4 ring-emerald-400/50'
                : 'stepping-stone-bubble hover:border-emerald-400'
            }`}
          >
            {/* Trash Can Graphic */}
            <div className="relative mb-2">
              <motion.div
                animate={{ rotate: trashCanActive ? -25 : 0 }}
                className="text-4xl sm:text-6xl select-none drop-shadow"
              >
                🗑️
              </motion.div>
              {trashCanActive && (
                <div className="absolute -top-2 -right-2 text-xl animate-bounce">✨</div>
              )}
            </div>

            <span className="text-sm sm:text-base font-black text-emerald-300 drop-shadow">
              سطل زباله 🗑️
            </span>
            <span className="text-[11px] sm:text-xs text-emerald-200 font-bold mt-0.5">
              مخصوص کلمات غلط املایی
            </span>
            <span className="text-[10px] text-amber-950 font-black mt-1 marine-parchment px-2.5 py-0.5 shadow-sm">
              کلید ⬅️ یا کلیک
            </span>
          </motion.div>

          {/* BASKETBALL HOOP (RIGHT - FOR CORRECT WORDS) */}
          <motion.div
            animate={{
              scale: basketHoopActive ? [1, 1.15, 1] : 1,
              borderColor: basketHoopActive ? '#f59e0b' : 'rgba(245, 158, 11, 0.4)'
            }}
            onClick={() => handleSort('basket')}
            className={`flex flex-col items-center justify-center p-3 sm:p-5 rounded-[2.25rem_2.5rem_2rem_2.4rem] border-4 cursor-pointer transition-all ${
              basketHoopActive
                ? 'bg-amber-900/80 border-amber-300 shadow-2xl shadow-amber-500/40 ring-4 ring-amber-400/50'
                : 'stepping-stone-bubble hover:border-amber-400'
            }`}
          >
            {/* Basketball Hoop Graphic */}
            <div className="relative mb-2">
              <motion.div
                animate={{
                  y: basketHoopActive ? [0, -8, 4, 0] : 0
                }}
                className="text-4xl sm:text-6xl select-none drop-shadow"
              >
                🏀
              </motion.div>
              {basketHoopActive && (
                <div className="absolute -top-2 -left-2 text-xl animate-bounce">🔥</div>
              )}
            </div>

            <span className="text-sm sm:text-base font-black text-amber-300 drop-shadow">
              سبد بسکتبال 🏀
            </span>
            <span className="text-[11px] sm:text-xs text-amber-200 font-bold mt-0.5">
              مخصوص کلمات املای درست
            </span>
            <span className="text-[10px] text-amber-950 font-black mt-1 marine-parchment px-2.5 py-0.5 shadow-sm">
              کلید ➡️ یا کلیک
            </span>
          </motion.div>
        </div>

        {/* 3. ACTIVE WORD CARD IN CENTER */}
        <div className="w-full flex flex-col items-center justify-center my-3 relative z-20">
          <AnimatePresence mode="wait">
            {!isCompleted && currentItem && !flyingObject && (
              <motion.div
                key={currentItem.id}
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative marine-parchment p-6 sm:p-8 shadow-2xl flex flex-col items-center justify-center min-w-[240px] sm:min-w-[320px] max-w-md"
              >
                <div className="absolute -top-3 btn-spongebob-yellow text-amber-950 text-xs font-black px-3.5 py-1 shadow flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                  <span>این کلمه رو بررسی کن:</span>
                </div>

                <span className="text-4xl sm:text-5xl mb-2 drop-shadow-md">{currentItem.emoji}</span>

                <span className="text-3xl sm:text-5xl font-black text-amber-950 drop-shadow-xs tracking-wide mb-2">
                  {currentItem.word}
                </span>

                <button
                  onClick={() => audioService.speakPersian(currentItem.word)}
                  className="flex items-center gap-1 text-xs text-amber-100 hover:text-white mt-1 btn-marine-wood px-3.5 py-1 shadow-md cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-yellow-300" />
                  <span>تلفظ کلمه</span>
                </button>
              </motion.div>
            )}

            {/* FLYING OBJECT ANIMATION */}
            {flyingObject && (
              <motion.div
                key="flying"
                initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
                animate={{
                  scale: [1, 1.2, 0.4],
                  x: flyingObject.target === 'basket' ? 180 : -180,
                  y: [0, -80, 40],
                  opacity: [1, 1, 0]
                }}
                transition={{ duration: 0.55, ease: 'easeInOut' }}
                className={`text-4xl sm:text-6xl font-black p-4 rounded-full border-4 shadow-2xl z-50 ${
                  flyingObject.target === 'basket'
                    ? 'bg-orange-500 border-amber-300 text-white'
                    : 'bg-emerald-600 border-emerald-300 text-white'
                }`}
              >
                {flyingObject.target === 'basket' ? '🏀' : '🗑️'}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 4. FAST ACTION BUTTONS (THROW TO BASKET VS THROW TO TRASH) */}
        {!isCompleted && currentItem && (
          <div className="w-full max-w-xl grid grid-cols-2 gap-3 sm:gap-4 mt-2 z-10">
            {/* Trash Can Button (Left) */}
            <button
              disabled={!!flyingObject}
              onClick={() => handleSort('trash')}
              className="btn-spongebob-green p-3.5 sm:p-4 font-black text-sm sm:text-lg flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <span>🗑️</span>
              <span>بنداز تو سطل زباله</span>
              <span className="text-xs bg-emerald-950/80 text-emerald-200 px-2 py-0.5 rounded-full hidden sm:inline font-bold">
                (غلطه)
              </span>
            </button>

            {/* Basketball Hoop Button (Right) */}
            <button
              disabled={!!flyingObject}
              onClick={() => handleSort('basket')}
              className="btn-spongebob-yellow p-3.5 sm:p-4 font-black text-sm sm:text-lg flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <span>🏀</span>
              <span>شوت کن تو سبد</span>
              <span className="text-xs bg-amber-950/80 text-yellow-200 px-2 py-0.5 rounded-full hidden sm:inline font-bold">
                (درسته)
              </span>
            </button>
          </div>
        )}

        {/* UPCOMING QUEUE PREVIEW */}
        {!isCompleted && items.length > currentIndex + 1 && (
          <div className="w-full flex items-center justify-center gap-2 mt-3 pt-2 border-t-2 border-amber-900/30 text-xs text-amber-200">
            <span className="font-bold">کلمات بعدی:</span>
            <div className="flex items-center gap-1.5 overflow-hidden">
              {items.slice(currentIndex + 1, currentIndex + 5).map((item) => (
                <span
                  key={item.id}
                  className="stepping-stone-bubble px-2.5 py-0.5 text-cyan-100 text-[11px] font-bold"
                >
                  {item.word}
                </span>
              ))}
              {items.length > currentIndex + 5 && (
                <span className="text-[10px] text-amber-300/70 font-bold">+{items.length - (currentIndex + 5)} دیگر</span>
              )}
            </div>
          </div>
        )}

        {/* 5. VICTORY CELEBRATION */}
        {isCompleted && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full flex flex-col items-center justify-center py-6 bg-gradient-to-r from-emerald-600 via-amber-500 to-orange-500 text-slate-950 p-6 rounded-3xl shadow-2xl font-black text-center"
          >
            <Trophy className="w-16 h-16 text-yellow-200 mb-2 animate-bounce" />
            <h2 className="text-2xl sm:text-3xl font-black mb-1">
              🏆 آفرین قهرمان بسکتبال کلمات! 🏀
            </h2>
            <p className="text-sm sm:text-base font-bold text-slate-900 max-w-md">
              تمام ۲۹ کلمه را با مهارت کامل تفکیک کردی! کلمات درست گل شدند و کلمات غلط بازیافت شدند!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
