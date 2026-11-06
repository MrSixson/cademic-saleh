import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CHARACTERS } from '../data/characters';
import { CharacterAvatar } from './CharacterAvatar';
import { audioService } from '../services/audioService';
import { Crown, Sparkles, Trophy, Star, BookOpen, ArrowRight, Award } from 'lucide-react';

interface FinalCelebrationProps {
  onReturnToMap: () => void;
}

export const FinalCelebration: React.FC<FinalCelebrationProps> = ({
  onReturnToMap
}) => {
  useEffect(() => {
    audioService.switchMusicTheme('celebration');
    audioService.playVictoryFanfare();

    // Continuous celebration confetti bursts
    const interval = setInterval(() => {
      try {
        confetti({
          particleCount: 50,
          spread: 80,
          origin: { x: Math.random(), y: 0.6 }
        });
      } catch {}
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 flex flex-col items-center justify-between z-20 select-none pb-12">
      {/* Top Banner */}
      <div className="w-full text-center my-4 animate-bounce">
        <div className="inline-flex items-center gap-2 marine-parchment text-amber-950 px-8 py-2.5 font-black text-lg sm:text-xl shadow-2xl">
          <Crown className="w-6 h-6 fill-amber-700 text-amber-900" />
          <span>فاتح تاج طلایی ماجراجویی املای اول دبستان</span>
          <Crown className="w-6 h-6 fill-amber-700 text-amber-900" />
        </div>
      </div>

      {/* Main Graduation Certificate Card: Cartoon Wood Panel with Rivets */}
      <div className="w-full cartoon-wood-panel border-4 border-amber-950 p-6 sm:p-10 shadow-2xl text-center relative overflow-hidden my-4">
        {/* Decorative Wooden Rivets */}
        <div className="absolute top-3 left-4 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
        <div className="absolute top-3 right-4 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
        <div className="absolute bottom-3 left-4 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
        <div className="absolute bottom-3 right-4 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />

        <div className="flex items-center justify-center gap-2 text-amber-300 mb-2">
          <Sparkles className="w-8 h-8 text-amber-400 animate-spin" />
          <Award className="w-12 h-12 text-amber-400 fill-amber-400 animate-pulse" />
          <Sparkles className="w-8 h-8 text-amber-400 animate-spin" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-black text-amber-200 mb-3 drop-shadow">
          تبریک قهرمان بزرگ الفبا! 🎓🎉
        </h1>

        {/* Certificate Body in Marine Parchment */}
        <div className="marine-parchment p-6 my-4 shadow-md text-amber-950">
          <p className="text-xl sm:text-2xl font-black text-amber-950 mb-3 leading-relaxed">
            تو با موفقیت کامل آماده ورود به کلاس دوم شدی! 📚✨
          </p>

          <p className="text-xs sm:text-sm text-amber-900 max-w-2xl mx-auto leading-relaxed font-bold">
            تو تمام مراحل چالش املایی از جمله تصاویر «صابون»، «قورباغه»، «چتر»، «سمنو»، «یاقوت» و شکار حباب کلمات اشتباه را با هوش، دقت و تلاش قهرمانانه خود فتح کردی و نشان طلایی پادشاه نپتون را به دست آوردی!
          </p>
        </div>

        {/* 8 Characters Assembly Row in Organic Stepping Stones */}
        <div className="stepping-stone-bubble p-4 mb-5">
          <span className="text-xs text-amber-200 font-black block mb-3 drop-shadow">
            باب اسفنجی، پاتریک، سندی و تمام دوستان بیکینی باتم به افتخارت جشن گرفته‌اند:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            {CHARACTERS.map(c => (
              <div key={c.id} className="flex flex-col items-center">
                <CharacterAvatar character={c} mood="celebration" size="sm" />
                <span className="text-[10px] text-cyan-100 mt-0.5 font-black">{c.namePersian}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Official Credits Box in Marine Parchment */}
        <div className="marine-parchment p-4 sm:p-5 text-right flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div>
            <div className="flex items-center gap-2 text-amber-950 text-sm font-black mb-1">
              <BookOpen className="w-4 h-4 text-amber-800" />
              <span>آموزگار و ناظر آموزشی:</span>
              <span className="text-amber-950 font-black text-base">آرزو صالح</span>
            </div>
            <div className="flex items-center gap-2 text-amber-950 text-sm font-black">
              <Trophy className="w-4 h-4 text-amber-800" />
              <span>طراحی و توسعه بازی:</span>
              <span className="text-amber-950 font-black text-base">امین جدایی</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-amber-500">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className="w-6 h-6 fill-amber-500 text-amber-500 animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Return to Map Button */}
      <button
        onClick={() => {
          audioService.playClick();
          onReturnToMap();
        }}
        className="px-10 py-4 btn-spongebob-yellow font-black text-lg sm:text-xl flex items-center gap-3 transition-all cursor-pointer shadow-2xl"
      >
        <ArrowRight className="w-6 h-6 text-amber-950" />
        <span>بازگشت به نقشه ۱۰۰ مرحله</span>
      </button>
    </div>
  );
};
