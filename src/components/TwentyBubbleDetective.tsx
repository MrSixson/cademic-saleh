import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { TwentyBubbleItem, LevelConfig } from '../types';
import { audioService } from '../services/audioService';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Flame, 
  Target, 
  ShieldCheck,
  Zap
} from 'lucide-react';

interface TwentyBubbleDetectiveProps {
  level: LevelConfig;
  items: TwentyBubbleItem[];
  companionName?: string;
  onPopSuccess: (item: TwentyBubbleItem, newCount: number) => void;
  onMistakeClickCorrect: (item: TwentyBubbleItem) => void;
  onAllPopped: (mistakes: number, score: number) => void;
}

interface BubbleState extends TwentyBubbleItem {
  isPopped: boolean;
  isPopping: boolean;
  isWobbling: boolean;
  glowCorrect: boolean;
}

export const TwentyBubbleDetective: React.FC<TwentyBubbleDetectiveProps> = ({
  level,
  items,
  companionName = 'باب اسفنجی',
  onPopSuccess,
  onMistakeClickCorrect,
  onAllPopped
}) => {
  // Initialize and shuffle bubbles once per round
  const [bubbles, setBubbles] = useState<BubbleState[]>(() => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    return shuffled.map(item => ({
      ...item,
      isPopped: false,
      isPopping: false,
      isWobbling: false,
      glowCorrect: false
    }));
  });

  const [poppedCount, setPoppedCount] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [lastPoppedInfo, setLastPoppedInfo] = useState<{
    wrongWord: string;
    correctWord: string;
    explanation?: string;
  } | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const completedRef = useRef<boolean>(false);

  const totalWrongToPop = items.filter(i => i.isWrong).length; // always 10

  const handleBubbleClick = (bubbleId: string) => {
    if (isCompleted || completedRef.current) return;

    const bubbleIndex = bubbles.findIndex(b => b.id === bubbleId);
    if (bubbleIndex === -1) return;

    const targetBubble = bubbles[bubbleIndex];
    if (targetBubble.isPopped || targetBubble.isPopping) return;

    // CASE 1: Student clicked a MISSPELLED word (CORRECT ACTION: POP IT!)
    if (targetBubble.isWrong) {
      audioService.playPop();

      const newCombo = combo + 1;
      setCombo(newCombo);
      const points = 100 * newCombo;
      setScore(prev => prev + points);

      const nextPoppedCount = poppedCount + 1;
      setPoppedCount(nextPoppedCount);

      setLastPoppedInfo({
        wrongWord: targetBubble.displayedText,
        correctWord: targetBubble.correctForm,
        explanation: targetBubble.explanation
      });

      // Trigger bubble popping animation
      setBubbles(prev => prev.map((b, idx) => {
        if (idx === bubbleIndex) {
          return { ...b, isPopping: true };
        }
        return b;
      }));

      onPopSuccess(targetBubble, nextPoppedCount);

      // Micro confetti on pop
      try {
        confetti({
          particleCount: 15,
          spread: 40,
          origin: { y: 0.6 }
        });
      } catch {}

      // After pop animation finishes, mark as popped
      setTimeout(() => {
        setBubbles(prev => prev.map((b, idx) => {
          if (idx === bubbleIndex) {
            return { ...b, isPopping: false, isPopped: true };
          }
          return b;
        }));
      }, 350);

      // CHECK VICTORY: All 10 misspelled bubbles popped!
      if (nextPoppedCount >= totalWrongToPop) {
        completedRef.current = true;
        setIsCompleted(true);
        audioService.playVictoryFanfare();

        // Glow all remaining 10 correct bubbles in gold/emerald
        setTimeout(() => {
          setBubbles(prev => prev.map(b => (!b.isWrong ? { ...b, glowCorrect: true } : b)));
        }, 400);

        try {
          confetti({
            particleCount: 80,
            spread: 90,
            origin: { y: 0.5 }
          });
        } catch {}

        setTimeout(() => {
          onAllPopped(mistakes, score + points + 300);
        }, 2200);
      }
    } 
    // CASE 2: Student clicked a CORRECT word (WRONG ACTION: DO NOT POP!)
    else {
      setCombo(0);
      setMistakes(prev => prev + 1);
      audioService.playWrong();

      // Wobble & shake the bubble
      setBubbles(prev => prev.map((b, idx) => {
        if (idx === bubbleIndex) {
          return { ...b, isWobbling: true, glowCorrect: true };
        }
        return b;
      }));

      onMistakeClickCorrect(targetBubble);

      setTimeout(() => {
        setBubbles(prev => prev.map((b, idx) => {
          if (idx === bubbleIndex) {
            return { ...b, isWobbling: false, glowCorrect: false };
          }
          return b;
        }));
      }, 800);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Objective & Progress HUD */}
      {/* Objective & Progress HUD: Organic Driftwood Plank */}
      <div className="w-full max-w-4xl cartoon-wood-panel p-4 sm:p-5 shadow-2xl mb-4 flex flex-col gap-3 relative z-30 border-4 border-amber-950">
        {/* Decorative Rivets */}
        <div className="absolute top-2.5 left-3 w-2.5 h-2.5 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
        <div className="absolute top-2.5 right-3 w-2.5 h-2.5 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
        <div className="absolute bottom-2.5 left-3 w-2.5 h-2.5 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
        <div className="absolute bottom-2.5 right-3 w-2.5 h-2.5 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />

        {/* Top Status Bar */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full btn-spongebob-yellow flex items-center justify-center text-amber-950 shadow-md">
              <Target className="w-5 h-5 text-amber-950 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-amber-100 drop-shadow">
                {level.instructionPersian || `شکار ${totalWrongToPop} حباب غلط املایی`}
              </h3>
              <p className="text-xs text-amber-200 font-bold">
                حباب کلمات غلط را بترکان تا فقط کلمات درست باقی بمانند!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Combo Badge */}
            {combo > 1 && (
              <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-md animate-bounce">
                <Flame className="w-3.5 h-3.5 fill-slate-950" />
                <span>کمبو ×{combo}</span>
              </div>
            )}

            {/* Counter Badge in Golden Pod */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 border-2 border-yellow-100 px-4 py-1.5 rounded-full font-black text-sm shadow-md">
              <span className="text-xs text-amber-950">غلط‌های کشف‌شده:</span>
              <span className="text-base sm:text-lg font-black text-amber-950">
                {poppedCount} / {totalWrongToPop}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar in Rounded Sandy Groove */}
        <div className="w-full bg-amber-950/70 rounded-full h-3.5 overflow-hidden border-2 border-amber-600/40 shadow-inner">
          <div 
            className="bg-gradient-to-r from-yellow-400 via-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(poppedCount / totalWrongToPop) * 100}%` }}
          />
        </div>

        {/* Last Popped Word Feedback Toast in Marine Parchment */}
        {lastPoppedInfo && (
          <div className="w-full marine-parchment px-4 py-2 flex items-center justify-between text-xs sm:text-sm animate-fade-in shadow-md">
            <div className="flex items-center gap-2 font-black">
              <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0" />
              <span className="text-rose-800 line-through font-extrabold">{lastPoppedInfo.wrongWord} ❌</span>
              <span className="text-emerald-900 font-extrabold">➔ املای درست: {lastPoppedInfo.correctWord} ✅</span>
            </div>
            {lastPoppedInfo.explanation && (
              <span className="hidden sm:inline text-xs text-amber-900 font-bold">
                ({lastPoppedInfo.explanation})
              </span>
            )}
          </div>
        )}
      </div>

      {/* BUBBLE ARENA: Organic Underwater Lagoon */}
      <div className="w-full max-w-5xl grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-2 sm:gap-3.5 p-3 sm:p-5 rounded-[2.25rem_2.5rem_2rem_2.4rem] bg-gradient-to-b from-cyan-950/60 via-sky-950/40 to-teal-950/70 border-4 border-cyan-400/50 backdrop-blur-md min-h-[360px] relative items-center justify-items-center shadow-2xl">
        {bubbles.map((bubble, index) => {
          // If popped, render subtle popped placeholder
          if (bubble.isPopped) {
            return (
              <div
                key={bubble.id}
                className="w-full aspect-square max-w-[110px] rounded-full border border-dashed border-cyan-500/20 bg-cyan-950/10 flex items-center justify-center opacity-40 select-none pointer-events-none transition-all duration-500"
              >
                <span className="text-[10px] sm:text-xs text-cyan-400/60 font-bold">ترکید 💥</span>
              </div>
            );
          }

          // Floating animation delay per bubble for organic underwater feel
          const animDelay = `${(index % 6) * 0.3}s`;

          return (
            <button
              key={bubble.id}
              disabled={isCompleted || bubble.isPopping}
              onClick={() => handleBubbleClick(bubble.id)}
              style={{ animationDelay: animDelay }}
              className={`relative w-full aspect-square max-w-[115px] rounded-full flex flex-col items-center justify-center select-none transition-all duration-300 cursor-pointer ${
                bubble.isPopping
                  ? 'scale-125 bg-amber-400/80 border-amber-200 animate-ping'
                  : bubble.isWobbling
                  ? 'animate-shake bg-rose-950/90 border-2 border-rose-400 shadow-rose-500/50'
                  : bubble.glowCorrect
                  ? 'bg-gradient-to-br from-emerald-600/90 to-teal-800/90 border-3 border-emerald-300 text-emerald-100 shadow-xl shadow-emerald-400/40 scale-105'
                  : 'bg-gradient-to-b from-cyan-400/35 via-sky-600/25 to-blue-900/50 hover:from-cyan-300/50 hover:to-sky-700/60 border-2 border-cyan-300/70 hover:border-cyan-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/50 hover:scale-108 active:scale-95 animate-float-gentle'
              }`}
            >
              {/* Bubble Shiny Highlight Reflections */}
              <div className="absolute top-2 right-2.5 w-3 h-1.5 rounded-full bg-white/60 blur-[0.5px] -rotate-45 pointer-events-none" />
              <div className="absolute top-2.5 right-1.5 w-1 h-1 rounded-full bg-white/40 pointer-events-none" />

              {/* Word Display */}
              <span className="text-sm sm:text-base md:text-xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wide z-10 px-1 text-center leading-tight">
                {bubble.displayedText}
              </span>

              {/* Correct Victory Indicator (When all wrong bubbles popped) */}
              {bubble.glowCorrect && !bubble.isWrong && (
                <div className="absolute -bottom-1 bg-emerald-500 text-slate-950 text-[9px] sm:text-[10px] font-black px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-md">
                  <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span>درست</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Completion Victory Toast in Marine Parchment */}
      {isCompleted && (
        <div className="mt-4 marine-parchment text-amber-950 px-8 py-3.5 font-black text-lg sm:text-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Sparkles className="w-6 h-6 text-amber-700" />
          <span>آفرین کارآگاه! تمام کلمات غلط رو ترکوندی و برنده شدی! 🏆✨</span>
        </div>
      )}
    </div>
  );
};
