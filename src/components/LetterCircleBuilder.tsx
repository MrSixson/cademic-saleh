import React, { useState } from 'react';
import { audioService } from '../services/audioService';
import { RotateCcw, Sparkles } from 'lucide-react';

interface LetterCircleItem {
  word: string;
  emoji: string;
  meaning: string;
  letters: string[];
}

interface LetterCircleBuilderProps {
  items: LetterCircleItem[];
  onSuccess: () => void;
  onMistake: (word: string) => void;
}

export const LetterCircleBuilder: React.FC<LetterCircleBuilderProps> = ({
  items,
  onSuccess,
  onMistake
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showWrong, setShowWrong] = useState(false);

  const currentItem = items[currentIndex];

  const resetCurrentWord = () => {
    setSelectedIndices([]);
    setIsLocked(false);
    setShowWrong(false);
  };

  const handleLetterClick = (letterIndex: number) => {
    if (isLocked || isComplete || selectedIndices.includes(letterIndex) || !currentItem) return;

    audioService.playClick();
    const expectedLetter = Array.from(currentItem.word)[selectedIndices.length];
    const selectedLetter = currentItem.letters[letterIndex];

    if (selectedLetter !== expectedLetter) {
      audioService.playWrong();
      setIsLocked(true);
      setShowWrong(true);
      onMistake(currentItem.word);
      window.setTimeout(resetCurrentWord, 650);
      return;
    }

    const nextSelection = [...selectedIndices, letterIndex];
    setSelectedIndices(nextSelection);

    if (nextSelection.length === Array.from(currentItem.word).length) {
      setIsLocked(true);
      audioService.playCorrect(nextSelection.length);
      window.setTimeout(() => {
        if (currentIndex + 1 >= items.length) {
          setIsComplete(true);
          onSuccess();
        } else {
          setCurrentIndex(prev => prev + 1);
          setSelectedIndices([]);
          setIsLocked(false);
        }
      }, 650);
    }
  };

  const handleReset = () => {
    if (isLocked || isComplete) return;
    audioService.playClick();
    setSelectedIndices([]);
  };

  if (!currentItem) return null;

  const expectedLetters = Array.from(currentItem.word);
  const progress = Math.round((currentIndex / items.length) * 100);

  return (
    <div className="w-full flex flex-col items-center gap-4 select-none">
      <div className="w-full max-w-xl flex items-center justify-between rounded-2xl border border-cyan-300/40 bg-slate-950/70 px-4 py-3 shadow-lg">
        <div className="text-right">
          <p className="text-xs font-bold text-cyan-200">کلمه‌سازی با دایره‌ی حروف</p>
          <p className="text-sm font-black text-white">کلمه {currentIndex + 1} از {items.length}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-200">{Math.round(((currentIndex + (isComplete ? 1 : 0)) / items.length) * 100)}٪</span>
          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-700">
            <div className="h-full rounded-full bg-emerald-400 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="w-full max-w-xl rounded-3xl border-2 border-amber-300/50 bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-950 p-4 text-center shadow-2xl">
        <div className="text-5xl mb-2">{currentItem.emoji}</div>
        <p className="text-sm sm:text-base font-bold text-amber-100">{currentItem.meaning}</p>
        <p className="mt-2 text-xs font-semibold text-cyan-200">حروف را به ترتیب درست انتخاب کن و واژه را بساز.</p>
        <div className="mt-4 flex min-h-12 items-center justify-center gap-2" dir="rtl">
          {expectedLetters.map((letter, index) => (
            <span
              key={index}
              className={`flex h-10 min-w-9 items-center justify-center rounded-xl border-2 px-2 text-xl font-black transition-all ${
                index < selectedIndices.length
                  ? 'border-emerald-300 bg-emerald-500/20 text-emerald-100'
                  : 'border-dashed border-cyan-300/50 bg-slate-800/70 text-slate-500'
              }`}
            >
              {index < selectedIndices.length ? letter : '؟'}
            </span>
          ))}
        </div>
      </div>

      <div className="relative flex h-[290px] w-[290px] items-center justify-center sm:h-[320px] sm:w-[320px]">
        <div className="absolute inset-3 rounded-full border-[5px] border-cyan-300/70 bg-[radial-gradient(circle,_rgba(8,145,178,0.24)_0%,_rgba(15,23,42,0.9)_68%)] shadow-[0_0_35px_rgba(34,211,238,0.25)]" />
        <div className="absolute h-24 w-24 rounded-full border border-amber-200/50 bg-slate-950/80 flex flex-col items-center justify-center shadow-inner">
          <Sparkles className="h-5 w-5 text-amber-300" />
          <span className="text-xs font-black text-amber-100">کلمه‌ساز</span>
        </div>
        {currentItem.letters.map((letter, index) => {
          const angle = (360 / currentItem.letters.length) * index;
          const isSelected = selectedIndices.includes(index);
          return (
            <button
              key={`${currentIndex}-${index}`}
              type="button"
              disabled={isSelected || isLocked || isComplete}
              onClick={() => handleLetterClick(index)}
              style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-112px) rotate(-${angle}deg)` }}
              className={`absolute left-1/2 top-1/2 flex h-12 w-12 items-center justify-center rounded-full border-2 text-2xl font-black shadow-lg transition-all sm:h-14 sm:w-14 sm:text-3xl ${
                isSelected
                  ? 'border-emerald-300 bg-emerald-500 text-slate-950 scale-90 opacity-45'
                  : 'border-amber-200 bg-gradient-to-br from-amber-300 to-orange-500 text-slate-950 hover:scale-110 active:scale-95'
              }`}
            >
              {letter}
            </button>
          );
        })}
        {showWrong && (
          <div className="absolute inset-0 z-20 flex items-center justify-center rounded-full border-4 border-rose-400 bg-rose-950/90 text-lg font-black text-rose-100 animate-shake">
            ترتیب حروف درست نبود!
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleReset}
          disabled={selectedIndices.length === 0 || isLocked || isComplete}
          className="flex items-center gap-2 rounded-xl border border-amber-200/40 bg-amber-500/15 px-4 py-2 text-sm font-black text-amber-100 transition hover:bg-amber-500/25 disabled:opacity-40"
        >
          <RotateCcw className="h-4 w-4" />
          پاک کردن حروف
        </button>
        <span className="text-xs font-bold text-cyan-100">هر حرف را فقط یک بار می‌توانی انتخاب کنی.</span>
      </div>
      {isComplete && <p className="text-lg font-black text-emerald-300">همه‌ی واژه‌ها ساخته شدند! آفرین! 🎉</p>}
    </div>
  );
};
