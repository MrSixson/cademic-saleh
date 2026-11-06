import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { audioService } from '../services/audioService';
import { Music, Sparkles, CheckCircle2 } from 'lucide-react';

interface RhymeOption {
  id: string;
  text: string;
  isRhyme: boolean;
  emoji?: string;
}

interface WordRhymeBubbleProps {
  baseWord: string;
  baseEmoji?: string;
  options: RhymeOption[];
  onSuccess: () => void;
  onMistake: (option: RhymeOption) => void;
}

export const WordRhymeBubble: React.FC<WordRhymeBubbleProps> = ({
  baseWord,
  baseEmoji = '🎵',
  options,
  onSuccess,
  onMistake
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [wobbleId, setWobbleId] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const targetRhymes = options.filter(o => o.isRhyme);
  const selectedRhymeCount = selectedIds.filter(id => {
    const opt = options.find(o => o.id === id);
    return opt?.isRhyme;
  }).length;

  const handleSelect = (option: RhymeOption) => {
    if (isCompleted || selectedIds.includes(option.id)) return;

    if (option.isRhyme) {
      audioService.playPop();
      const nextSelected = [...selectedIds, option.id];
      setSelectedIds(nextSelected);

      try {
        confetti({
          particleCount: 25,
          spread: 50,
          origin: { y: 0.6 }
        });
      } catch {}

      const nextRhymeCount = nextSelected.filter(id => options.find(o => o.id === id)?.isRhyme).length;
      if (nextRhymeCount >= targetRhymes.length) {
        setIsCompleted(true);
        audioService.playVictoryFanfare();
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }
    } else {
      audioService.playWrong();
      setWobbleId(option.id);
      onMistake(option);
      setTimeout(() => {
        setWobbleId(null);
      }, 700);
    }
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Rhyme Header Banner: Driftwood Plank */}
      <div className="w-full max-w-xl cartoon-wood-panel p-4 mb-4 shadow-xl border-4 border-amber-950 flex items-center justify-between relative">
        <div className="absolute top-2.5 left-3 w-2.5 h-2.5 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
        <div className="absolute top-2.5 right-3 w-2.5 h-2.5 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full btn-spongebob-blue flex items-center justify-center text-2xl shadow-md">
            🎶
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-amber-100 drop-shadow">حباب‌های هم‌قافیه و هم‌آوا را پیدا کن!</h3>
            <p className="text-xs text-amber-200 font-bold">کلماتی که صدای پایان یا آهنگ مشابه دارند را انتخاب کن.</p>
          </div>
        </div>

        <div className="marine-parchment px-3.5 py-1 text-amber-950 font-black text-sm shadow-md">
          <span className="text-xs text-amber-900">پیدا شده:</span>
          <span className="text-base font-black text-amber-950">{selectedRhymeCount} / {targetRhymes.length}</span>
        </div>
      </div>

      {/* Center Giant Pearl with Base Word */}
      <div className="w-full max-w-xl flex flex-col items-center mb-6">
        <div className="relative p-6 rounded-full bg-gradient-to-b from-indigo-500 via-purple-600 to-indigo-900 border-4 border-amber-300 shadow-2xl flex flex-col items-center justify-center min-w-[160px] min-h-[160px] animate-float-gentle">
          <div className="absolute top-3 right-4 w-5 h-2.5 rounded-full bg-white/60 blur-[0.5px] -rotate-45" />
          <span className="text-3xl sm:text-4xl mb-1 drop-shadow">{baseEmoji}</span>
          <span className="text-xs text-amber-200 font-black">کلمه اصلی:</span>
          <span className="text-3xl sm:text-4xl font-black text-yellow-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
            {baseWord}
          </span>
        </div>
      </div>

      {/* Floating Surrounding Rhyme Bubbles */}
      <div className="w-full max-w-xl grid grid-cols-2 sm:grid-cols-4 gap-3">
        {options.map((opt) => {
          const isSelected = selectedIds.includes(opt.id);
          const isWobbling = wobbleId === opt.id;

          return (
            <button
              key={opt.id}
              disabled={isSelected || isCompleted}
              onClick={() => handleSelect(opt)}
              className={`p-4 btn-bubble-option flex flex-col items-center justify-center gap-1 transition-all duration-300 cursor-pointer shadow-lg ${
                isSelected
                  ? 'bg-emerald-950/80 border-3 border-emerald-400 text-emerald-200 scale-95 opacity-80 pointer-events-none'
                  : isWobbling
                  ? 'animate-shake bg-rose-950/90 border-2 border-rose-400 text-rose-200'
                  : 'hover:scale-105 active:scale-95'
              }`}
            >
              {opt.emoji && <span className="text-2xl drop-shadow">{opt.emoji}</span>}
              <span className="text-xl sm:text-2xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {opt.text}
              </span>
              {isSelected && (
                <span className="text-[10px] text-emerald-300 font-black flex items-center gap-0.5 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>هم‌قافیه ✅</span>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
