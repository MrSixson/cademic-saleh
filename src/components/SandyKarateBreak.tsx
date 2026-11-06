import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { audioService } from '../services/audioService';
import { Zap, Flame, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface KarateBoardItem {
  id: string;
  text: string;
  isWrongWord: boolean;
  correctForm?: string;
  explanation?: string;
}

interface SandyKarateBreakProps {
  promptText: string;
  boards: KarateBoardItem[];
  onSuccess: () => void;
  onMistake: (board: KarateBoardItem) => void;
}

export const SandyKarateBreak: React.FC<SandyKarateBreakProps> = ({
  promptText,
  boards,
  onSuccess,
  onMistake
}) => {
  const [brokenIds, setBrokenIds] = useState<string[]>([]);
  const [wobbleId, setWobbleId] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);

  const targetWrongCount = boards.filter(b => b.isWrongWord).length;
  const brokenTargetCount = brokenIds.filter(id => {
    const b = boards.find(item => item.id === id);
    return b?.isWrongWord;
  }).length;

  const handleChopBoard = (board: KarateBoardItem) => {
    if (isCompleted || brokenIds.includes(board.id)) return;

    if (board.isWrongWord) {
      audioService.playPop();
      const nextBroken = [...brokenIds, board.id];
      setBrokenIds(nextBroken);

      if (board.correctForm) {
        setLastFeedback(`💥 تخته «${board.text}» خرد شد! املای درست: «${board.correctForm}»`);
      }

      try {
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {}

      const nextTargetCount = nextBroken.filter(id => boards.find(item => item.id === id)?.isWrongWord).length;
      if (nextTargetCount >= targetWrongCount) {
        setIsCompleted(true);
        audioService.playVictoryFanfare();
        setTimeout(() => {
          onSuccess();
        }, 1800);
      }
    } else {
      audioService.playWrong();
      setWobbleId(board.id);
      setLastFeedback(`⚠️ کلمه «${board.text}» درسته و نباید شکسته بشه!`);
      onMistake(board);
      setTimeout(() => {
        setWobbleId(null);
      }, 800);
    }
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Sandy Karate Dojo Banner: Driftwood Plank */}
      <div className="w-full max-w-2xl cartoon-wood-panel p-4 mb-4 shadow-xl border-4 border-amber-950 flex items-center justify-between relative">
        <div className="absolute top-2.5 left-3 w-2.5 h-2.5 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
        <div className="absolute top-2.5 right-3 w-2.5 h-2.5 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full btn-spongebob-yellow flex items-center justify-center text-2xl shadow-md animate-pulse">
            🥋
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-amber-100 drop-shadow">{promptText}</h3>
            <p className="text-xs text-amber-200 font-bold">با ضربه کاراته، تخته کلمات غلط املایی را خرد کن!</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 marine-parchment px-3.5 py-1 text-amber-950 font-black text-sm shadow-md">
          <Zap className="w-4 h-4 text-amber-800" />
          <span className="text-xs text-amber-900">خرد شده:</span>
          <span className="text-base font-black text-amber-950">{brokenTargetCount} / {targetWrongCount}</span>
        </div>
      </div>

      {/* Feedback Toast: Marine Parchment */}
      {lastFeedback && (
        <div className="w-full max-w-2xl marine-parchment text-amber-950 px-4 py-2 font-black text-xs sm:text-sm text-center mb-4 animate-fade-in shadow-md">
          {lastFeedback}
        </div>
      )}

      {/* Wooden Karate Boards Arena */}
      <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 cartoon-wood-panel border-4 border-amber-950/70 min-h-[220px] items-center">
        {boards.map((board) => {
          const isBroken = brokenIds.includes(board.id);
          const isWobbling = wobbleId === board.id;

          if (isBroken) {
            return (
              <div
                key={board.id}
                className="h-32 rounded-[1.75rem] bg-amber-950/40 border-2 border-dashed border-amber-600/40 flex flex-col items-center justify-center text-amber-300 opacity-60 pointer-events-none"
              >
                <span className="text-3xl">🪵💥</span>
                <span className="text-xs font-bold mt-1">تخته شکسته شد!</span>
                {board.correctForm && (
                  <span className="text-xs text-emerald-400 font-black mt-0.5">({board.correctForm})</span>
                )}
              </div>
            );
          }

          return (
            <button
              key={board.id}
              disabled={isCompleted}
              onClick={() => handleChopBoard(board)}
              className={`h-36 sm:h-40 cartoon-wood-panel border-4 border-amber-950 shadow-2xl p-4 flex flex-col items-center justify-between transition-all duration-300 cursor-pointer ${
                isWobbling
                  ? 'animate-shake bg-rose-950 border-rose-500'
                  : 'hover:scale-105 active:scale-95'
              }`}
            >
              {/* Wood Grain Lines */}
              <div className="w-full flex items-center justify-between text-amber-400/50 text-[10px] font-mono">
                <span>═══</span>
                <span>تخته کاراته</span>
                <span>═══</span>
              </div>

              {/* Board Persian Text */}
              <span className="text-2xl sm:text-3xl font-black text-amber-100 drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)] tracking-wide">
                {board.text}
              </span>

              {/* Strike Button Tag */}
              <div className="w-full py-1 marine-parchment text-amber-950 text-xs font-black flex items-center justify-center gap-1 shadow-sm">
                <Flame className="w-3.5 h-3.5 text-amber-700" />
                <span>ضربه کاراته سندی 🥋</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
