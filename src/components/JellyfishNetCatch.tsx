import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { audioService } from '../services/audioService';
import { Sparkles, Target, CheckCircle2 } from 'lucide-react';

interface JellyfishItem {
  id: string;
  text: string;
  isTarget: boolean;
  color: string;
}

interface JellyfishNetCatchProps {
  promptText: string;
  items: JellyfishItem[];
  onSuccess: () => void;
  onMistake: (item: JellyfishItem) => void;
}

export const JellyfishNetCatch: React.FC<JellyfishNetCatchProps> = ({
  promptText,
  items,
  onSuccess,
  onMistake
}) => {
  const [caughtIds, setCaughtIds] = useState<string[]>([]);
  const [wobbleId, setWobbleId] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const targetCount = items.filter(i => i.isTarget).length;
  const caughtTargetCount = caughtIds.filter(id => {
    const item = items.find(i => i.id === id);
    return item?.isTarget;
  }).length;

  const handleCatch = (item: JellyfishItem) => {
    if (isCompleted || caughtIds.includes(item.id)) return;

    if (item.isTarget) {
      audioService.playPop();
      const nextCaught = [...caughtIds, item.id];
      setCaughtIds(nextCaught);

      try {
        confetti({
          particleCount: 20,
          spread: 45,
          origin: { y: 0.5 }
        });
      } catch {}

      const nextTargetCount = nextCaught.filter(id => items.find(i => i.id === id)?.isTarget).length;
      if (nextTargetCount >= targetCount) {
        setIsCompleted(true);
        audioService.playVictoryFanfare();
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }
    } else {
      audioService.playWrong();
      setWobbleId(item.id);
      onMistake(item);
      setTimeout(() => {
        setWobbleId(null);
      }, 700);
    }
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Objective and Hunter Tracker: Driftwood Plank */}
      <div className="w-full max-w-2xl cartoon-wood-panel p-4 mb-4 shadow-xl border-4 border-amber-950 flex items-center justify-between relative">
        <div className="absolute top-2.5 left-3 w-2.5 h-2.5 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
        <div className="absolute top-2.5 right-3 w-2.5 h-2.5 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full btn-spongebob-pink flex items-center justify-center text-2xl shadow-md">
            🪼
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-amber-100 drop-shadow">{promptText}</h3>
            <p className="text-xs text-amber-200 font-bold">با تور شکار عروس دریایی، گزینه‌های درست را به دام بینداز!</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 marine-parchment px-3.5 py-1 text-amber-950 font-black text-sm shadow-md">
          <span className="text-xs text-amber-900">شکار شده:</span>
          <span className="text-base font-black text-amber-950">{caughtTargetCount} / {targetCount}</span>
        </div>
      </div>

      {/* Underwater Jellyfish Field Area: Organic Lagoon */}
      <div className="w-full max-w-2xl min-h-[320px] bg-gradient-to-b from-blue-950/60 via-purple-950/40 to-slate-950/80 border-4 border-pink-400/50 rounded-[2.25rem_2.5rem_2rem_2.4rem] p-6 relative overflow-hidden flex flex-wrap items-center justify-center gap-6 shadow-2xl">
        {/* Ambient Bubbles */}
        <div className="absolute top-4 left-6 w-3 h-3 rounded-full bg-cyan-300/30 animate-ping pointer-events-none" />
        <div className="absolute bottom-6 right-10 w-4 h-4 rounded-full bg-pink-300/30 animate-bounce pointer-events-none" />

        {items.map((item, index) => {
          const isCaught = caughtIds.includes(item.id);
          const isWobbling = wobbleId === item.id;
          const floatDelay = `${(index % 4) * 0.5}s`;

          return (
            <button
              key={item.id}
              disabled={isCaught || isCompleted}
              onClick={() => handleCatch(item)}
              style={{ animationDelay: floatDelay }}
              className={`relative flex flex-col items-center justify-center p-4 rounded-full transition-all duration-300 transform cursor-pointer ${
                isCaught
                  ? 'scale-90 opacity-40 bg-pink-950/30 border-2 border-dashed border-emerald-400/50 pointer-events-none'
                  : isWobbling
                  ? 'animate-shake bg-rose-950/90 border-2 border-rose-400'
                  : 'hover:scale-110 active:scale-95 animate-float-gentle'
              }`}
            >
              {/* Jellyfish Dome Head */}
              <div
                className={`w-24 h-16 sm:w-28 sm:h-20 rounded-t-full rounded-b-2xl bg-gradient-to-b ${
                  item.color || 'from-pink-400 to-purple-600'
                } border-2 border-pink-200 shadow-lg shadow-pink-500/30 flex items-center justify-center relative overflow-hidden`}
              >
                {/* Highlights */}
                <div className="absolute top-1.5 right-4 w-5 h-2 rounded-full bg-white/50 -rotate-12" />
                <span className="text-xl sm:text-2xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-10 px-2 text-center">
                  {item.text}
                </span>
              </div>

              {/* Jellyfish Tentacles */}
              <div className="flex gap-2 -mt-1">
                <div className="w-1.5 h-6 bg-pink-400/80 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-1.5 h-8 bg-purple-400/80 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                <div className="w-1.5 h-7 bg-pink-300/80 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-1.5 h-5 bg-purple-300/80 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>

              {/* Caught Check Badge */}
              {isCaught && (
                <div className="absolute -top-2 -right-2 bg-emerald-500 text-slate-950 p-1 rounded-full shadow-lg">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
