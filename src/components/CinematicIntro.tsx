import React, { useEffect, useState } from 'react';
import { CHARACTERS } from '../data/characters';
import { CharacterAvatar } from './CharacterAvatar';
import { audioService } from '../services/audioService';
import { Sparkles, Play, ArrowLeft } from 'lucide-react';

interface CinematicIntroProps {
  onFinishIntro: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onFinishIntro }) => {
  const [step, setStep] = useState<number>(0);
  const puki = CHARACTERS[0];

  useEffect(() => {
    audioService.startMusic('adventure');
    const timer1 = setTimeout(() => setStep(1), 1800);
    const timer2 = setTimeout(() => setStep(2), 3600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 flex flex-col items-center justify-center z-20 select-none text-center">
      {/* Intro Camera Glide Scene */}
      <div className="relative mb-8 flex flex-col items-center">
        <div className="transform transition-all duration-1000 scale-125 mb-4 animate-float-slow">
          <CharacterAvatar character={puki} mood="celebration" size="xl" />
        </div>

        {/* Story Snippets in Cartoon Wood Panel */}
        {step >= 0 && (
          <div className="cartoon-wood-panel p-6 sm:p-8 shadow-2xl border-4 border-amber-950 max-w-lg animate-fade-in relative">
            <div className="absolute top-2.5 left-3 w-2.5 h-2.5 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
            <div className="absolute top-2.5 right-3 w-2.5 h-2.5 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
            <div className="absolute bottom-2.5 left-3 w-2.5 h-2.5 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
            <div className="absolute bottom-2.5 right-3 w-2.5 h-2.5 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />

            <h2 className="text-2xl sm:text-3xl font-display font-black text-amber-200 mb-2 drop-shadow">
              🌊 دریای کلمات
            </h2>
            <div className="marine-parchment p-4 mb-2 text-amber-950 text-base sm:text-lg leading-relaxed shadow-md">
              سلام قهرمان! به اعماق اقیانوس کلمات خوش آمدی! 🐠✨
            </div>
            <p className="text-amber-200 text-xs sm:text-sm leading-relaxed font-bold">
              با هم به یک ماجراجویی ۲۰ مرحله‌ای پر از گنج، حباب و کشف املای درست می‌رویم تا با اقتدار آماده ورود به کلاس دوم بشی!
            </p>
          </div>
        )}
      </div>

      {/* Start Adventure Action */}
      <button
        onClick={() => {
          audioService.playClick();
          onFinishIntro();
        }}
        className="py-4 px-10 btn-spongebob-yellow font-black text-xl sm:text-2xl flex items-center justify-center gap-3 transition-all cursor-pointer shadow-2xl"
      >
        <Play className="w-7 h-7 fill-amber-950 text-amber-950" />
        <span>بزن بریم به دریا!</span>
        <Sparkles className="w-6 h-6 text-amber-800" />
      </button>
    </div>
  );
};
