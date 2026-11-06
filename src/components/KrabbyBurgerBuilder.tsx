import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { audioService } from '../services/audioService';
import { Sparkles, Utensils, CheckCircle2, RotateCcw } from 'lucide-react';

interface KrabbyBurgerBuilderProps {
  targetWord: string;
  targetEmoji?: string;
  syllables: string[];
  shuffledSyllables: string[];
  onSuccess: () => void;
  onMistake: (selectedSyllables: string[]) => void;
}

const INGREDIENTS = [
  { name: 'نان بالایی کنجدی', color: 'from-amber-400 to-amber-600', border: 'border-amber-300', emoji: '🍞', rounded: 'rounded-t-3xl rounded-b-lg' },
  { name: 'کاهوی تازه دریایی', color: 'from-emerald-500 to-green-600', border: 'border-emerald-300', emoji: '🥬', rounded: 'rounded-xl' },
  { name: 'گوجه‌فرنگی و پنیر', color: 'from-red-500 via-rose-600 to-amber-500', border: 'border-rose-300', emoji: '🍅', rounded: 'rounded-xl' },
  { name: 'برگر خرچنگی خوشمزه', color: 'from-amber-800 to-yellow-950', border: 'border-amber-700', emoji: '🥩', rounded: 'rounded-xl' },
  { name: 'نان پایینی', color: 'from-amber-500 to-amber-700', border: 'border-amber-400', emoji: '🍞', rounded: 'rounded-b-3xl rounded-t-lg' },
];

export const KrabbyBurgerBuilder: React.FC<KrabbyBurgerBuilderProps> = ({
  targetWord,
  targetEmoji = '🍔',
  syllables,
  shuffledSyllables,
  onSuccess,
  onMistake
}) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isWrongOrder, setIsWrongOrder] = useState<boolean>(false);

  const selectedSyllables = selectedIndices.map(idx => shuffledSyllables[idx]);

  const handleSelectSyllable = (index: number) => {
    if (isCompleted || selectedIndices.includes(index)) return;

    audioService.playClick();
    const newSelected = [...selectedIndices, index];
    setSelectedIndices(newSelected);

    // Check if the current partial sequence matches the prefix of the target
    const currentBuilt = newSelected.map(idx => shuffledSyllables[idx]).join('');
    const targetPrefix = syllables.slice(0, newSelected.length).join('');

    if (currentBuilt !== targetPrefix) {
      // Wrong syllable selected in this step
      audioService.playWrong();
      setIsWrongOrder(true);
      onMistake(newSelected.map(idx => shuffledSyllables[idx]));
      setTimeout(() => {
        setIsWrongOrder(false);
        setSelectedIndices([]);
      }, 1000);
      return;
    }

    // If all syllables placed correctly!
    if (newSelected.length === syllables.length) {
      setIsCompleted(true);
      audioService.playVictoryFanfare();
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }
  };

  const handleReset = () => {
    audioService.playClick();
    setSelectedIndices([]);
    setIsWrongOrder(false);
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Target Word Clue Banner: Marine Parchment */}
      <div className="w-full max-w-lg marine-parchment p-4 mb-4 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-4xl drop-shadow-md">{targetEmoji}</span>
          <div>
            <span className="text-xs text-amber-900 font-extrabold block">برگر کلمه مورد نظر:</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-950">{targetWord}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            disabled={selectedIndices.length === 0 || isCompleted}
            className="w-10 h-10 rounded-full btn-marine-wood flex items-center justify-center disabled:opacity-30 p-0 transition-all cursor-pointer shadow-md"
            title="شروع مجدد بخش‌ها"
          >
            <RotateCcw className="w-4 h-4 text-amber-200" />
          </button>
        </div>
      </div>

      {/* Burger Assembly Plate Stage: Stepping Stone Bubble Plate */}
      <div className="w-full max-w-md stepping-stone-bubble p-6 mb-6 shadow-2xl flex flex-col items-center relative min-h-[220px] justify-center">
        {/* Top Bun */}
        <div className="w-48 sm:w-56 h-8 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-t-full border-2 border-amber-200 shadow-md flex items-center justify-center text-xs font-black text-amber-950">
          🍔 نان بالایی کنجدی
        </div>

        {/* Dynamic Built Layers */}
        <div className="w-full flex flex-col items-center gap-2 my-2 min-h-[70px] justify-center">
          {selectedIndices.length === 0 ? (
            <div className="text-cyan-900 text-xs font-black py-4 animate-pulse">
              بخش‌های کلمه (سیلاب‌ها) را به ترتیب از پایین انتخاب کن تا برگر کامل شود!
            </div>
          ) : (
            selectedIndices.map((sIdx, orderIdx) => {
              const ing = INGREDIENTS[(orderIdx + 1) % INGREDIENTS.length];
              return (
                <div
                  key={`layer_${sIdx}`}
                  className={`w-44 sm:w-52 py-2 px-4 bg-gradient-to-r ${ing.color} ${ing.border} border-2 ${ing.rounded} shadow-lg text-white font-black text-xl sm:text-2xl flex items-center justify-between animate-fade-in`}
                >
                  <span>{ing.emoji}</span>
                  <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wider">
                    {shuffledSyllables[sIdx]}
                  </span>
                  <span className="text-xs bg-black/30 px-2 py-0.5 rounded-full font-sans">
                    بخش {orderIdx + 1}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Bun */}
        <div className="w-48 sm:w-56 h-7 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 rounded-b-full border-2 border-amber-300 shadow-md flex items-center justify-center text-xs font-black text-amber-950">
          🍔 نان زیرین همبرگر خرچنگ
        </div>

        {/* Wrong order warning shake banner */}
        {isWrongOrder && (
          <div className="absolute inset-0 bg-rose-950/95 rounded-[2rem] flex flex-col items-center justify-center text-rose-200 font-black text-lg p-4 animate-shake border-3 border-rose-400">
            <span>❌ ترتیب بخش‌ها اشتباه بود!</span>
            <span className="text-xs text-rose-300 mt-1">دوباره با دقت بچین!</span>
          </div>
        )}
      </div>

      {/* Available Syllables to pick */}
      <div className="w-full max-w-lg flex flex-col items-center">
        <span className="text-xs font-black text-amber-200 mb-2 flex items-center gap-1.5 drop-shadow">
          <Utensils className="w-4 h-4 text-amber-300" />
          <span>بخش‌های زیر را به ترتیب درست لمس کن:</span>
        </span>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {shuffledSyllables.map((syllable, idx) => {
            const isUsed = selectedIndices.includes(idx);
            return (
              <button
                key={`syll_${idx}`}
                disabled={isUsed || isCompleted}
                onClick={() => handleSelectSyllable(idx)}
                className={`py-3 px-6 btn-spongebob-yellow font-black text-2xl sm:text-3xl cursor-pointer ${
                  isUsed
                    ? 'opacity-25 scale-95 pointer-events-none'
                    : 'hover:scale-110 active:scale-95 shadow-xl'
                }`}
              >
                {syllable}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
