import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { audioService } from '../services/audioService';
import { Coins, Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react';

interface KrustyCashRegisterProps {
  word: string;
  emoji?: string;
  correctSyllables: number;
  correctSounds: number;
  syllablesText: string;
  soundsText: string;
  onSuccess: () => void;
  onMistake: (type: 'syllables' | 'sounds', selected: number) => void;
}

export const KrustyCashRegister: React.FC<KrustyCashRegisterProps> = ({
  word,
  emoji = '🦀',
  correctSyllables,
  correctSounds,
  syllablesText,
  soundsText,
  onSuccess,
  onMistake
}) => {
  const [selectedSyllables, setSelectedSyllables] = useState<number | null>(null);
  const [selectedSounds, setSelectedSounds] = useState<number | null>(null);
  const [step, setStep] = useState<'syllables' | 'sounds'>('syllables');
  const [wobble, setWobble] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleChoose = (num: number) => {
    if (isCompleted) return;

    if (step === 'syllables') {
      setSelectedSyllables(num);
      if (num === correctSyllables) {
        audioService.playPop();
        setFeedback(`💰 آفرین! کلمه «${word}» دارای ${correctSyllables} بخش است: (${syllablesText})`);
        setTimeout(() => {
          setStep('sounds');
          setFeedback(null);
        }, 1400);
      } else {
        audioService.playWrong();
        setWobble(true);
        setFeedback(`❌ تعداد بخش‌ها ${num} نبود. کلمه را با دست زدن بخش کن!`);
        onMistake('syllables', num);
        setTimeout(() => {
          setWobble(false);
          setSelectedSyllables(null);
        }, 1200);
      }
    } else {
      setSelectedSounds(num);
      if (num === correctSounds) {
        audioService.playVictoryFanfare();
        setFeedback(`🪙 فوق‌العاده! کلمه «${word}» دارای ${correctSounds} صدا است: (${soundsText})`);
        setIsCompleted(true);
        try {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch {}
        setTimeout(() => {
          onSuccess();
        }, 1600);
      } else {
        audioService.playWrong();
        setWobble(true);
        setFeedback(`❌ تعداد صداها ${num} نبود. صداهای تک‌تک حروف را بشمار!`);
        onMistake('sounds', num);
        setTimeout(() => {
          setWobble(false);
          setSelectedSounds(null);
        }, 1200);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Cash Register Header: Driftwood Plank */}
      <div className="w-full max-w-xl cartoon-wood-panel p-4 mb-4 shadow-xl border-4 border-amber-950 flex items-center justify-between relative">
        <div className="absolute top-2.5 left-3 w-2.5 h-2.5 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
        <div className="absolute top-2.5 right-3 w-2.5 h-2.5 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full btn-spongebob-yellow flex items-center justify-center text-2xl shadow-md animate-bounce">
            🪙
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-amber-100 drop-shadow">
              {step === 'syllables' ? 'چند بخش (سیلاب) دارد؟' : 'چند صدا (واج) دارد؟'}
            </h3>
            <p className="text-xs text-amber-200 font-bold">
              {step === 'syllables' ? 'تعداد بخش‌های کلمه را با سکه‌های طلایی آقای خرچنگ انتخاب کن' : 'حالا تعداد صداهای کلمه را بشمار'}
            </p>
          </div>
        </div>

        <div className="marine-parchment px-3 py-1 text-amber-950 font-black text-xs shadow-md">
          مرحله {step === 'syllables' ? '۱ از ۲' : '۲ از ۲'}
        </div>
      </div>

      {/* Target Word Display Stand: Marine Parchment */}
      <div className="w-full max-w-xl marine-parchment p-6 mb-5 shadow-2xl flex flex-col items-center justify-center text-center">
        <span className="text-4xl mb-2 drop-shadow">{emoji}</span>
        <span className="text-3xl sm:text-5xl font-black text-amber-950 tracking-wider mb-2 drop-shadow-sm">
          {word}
        </span>

        {feedback && (
          <div className="text-xs sm:text-sm font-black text-center mt-2 px-4 py-1.5 cartoon-wood-panel text-amber-100 animate-fade-in shadow-md">
            {feedback}
          </div>
        )}
      </div>

      {/* Coin Quantity Selector Buttons */}
      <div className="w-full max-w-xl flex flex-col items-center">
        <span className="text-xs font-black text-amber-200 mb-3 flex items-center gap-1.5 drop-shadow">
          <Coins className="w-4 h-4 text-amber-400" />
          <span>تعداد سکه‌های طلایی مورد نظر را انتخاب کن:</span>
        </span>

        <div className={`grid grid-cols-5 gap-3 w-full ${wobble ? 'animate-shake' : ''}`}>
          {[1, 2, 3, 4, 5].map((num) => {
            const isSelected = (step === 'syllables' ? selectedSyllables : selectedSounds) === num;
            return (
              <button
                key={`coin_${num}`}
                disabled={isCompleted}
                onClick={() => handleChoose(num)}
                className={`py-3 px-2 rounded-full aspect-square flex flex-col items-center justify-center gap-0.5 font-black text-2xl transition-all cursor-pointer shadow-lg ${
                  isSelected
                    ? 'btn-spongebob-yellow scale-110 ring-4 ring-yellow-200 shadow-xl'
                    : 'bg-gradient-to-b from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-amber-950 border-3 border-amber-200 hover:scale-105 active:scale-95'
                }`}
              >
                <span className="text-base sm:text-lg">🪙</span>
                <span className="leading-none text-xl sm:text-2xl">{num}</span>
                <span className="text-[10px] font-sans font-black text-amber-950">
                  {step === 'syllables' ? 'بخش' : 'صدا'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
