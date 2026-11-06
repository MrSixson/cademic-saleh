import React from 'react';
import { audioService } from '../services/audioService';
import { Sparkles, BookOpen, Trophy, ArrowRight, Heart, Star } from 'lucide-react';

interface CreditsModalProps {
  onClose: () => void;
}

export const CreditsModal: React.FC<CreditsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in select-none">
      <div className="w-full max-w-lg cartoon-wood-panel p-6 sm:p-8 shadow-2xl relative overflow-hidden border-4 border-amber-950">
        {/* Decorative Rivets */}
        <div className="absolute top-2.5 left-3 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
        <div className="absolute top-2.5 right-3 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
        <div className="absolute bottom-2.5 left-3 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
        <div className="absolute bottom-2.5 right-3 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-full bg-amber-400 border-2 border-yellow-100 mb-2 text-amber-950 shadow-md">
            <Sparkles className="w-8 h-8 text-amber-950 animate-spin" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-amber-100 drop-shadow">
            شناسنامه و عوامل پروژه
          </h2>
          <p className="text-xs sm:text-sm text-amber-200 mt-1 font-bold">
            بازی آموزشی «دریای کلمات باب اسفنجی»
          </p>
        </div>

        {/* Roles Box in Soft Parchments */}
        <div className="space-y-4 mb-6">
          <div className="marine-parchment p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full btn-spongebob-blue flex items-center justify-center text-white shadow-md">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div className="text-right">
                <span className="text-xs text-amber-900 font-bold block">آموزگار و ناظر آموزشی</span>
                <span className="text-lg font-black text-amber-950">آرزو صالح</span>
              </div>
            </div>
            <div className="flex text-amber-700">
              <Star className="w-5 h-5 fill-amber-500" />
            </div>
          </div>

          <div className="marine-parchment p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full btn-spongebob-yellow flex items-center justify-center text-amber-950 shadow-md">
                <Trophy className="w-5 h-5 text-amber-950" />
              </div>
              <div className="text-right">
                <span className="text-xs text-amber-900 font-bold block">طراحی و توسعه بازی</span>
                <span className="text-lg font-black text-amber-950">امین جدایی</span>
              </div>
            </div>
            <div className="flex text-amber-700">
              <Star className="w-5 h-5 fill-amber-500" />
            </div>
          </div>
        </div>

        {/* Tagline & Goal in Rounded Sandy Plaque */}
        <div className="bg-amber-950/70 border-2 border-amber-600/50 rounded-2xl p-4 text-center mb-6 shadow-inner">
          <span className="text-sm font-black text-yellow-300 block mb-1">
            «بخون، پیدا کن، یاد بگیر و قهرمان دریای کلمات شو!»
          </span>
          <p className="text-xs text-amber-100 font-bold leading-relaxed">
            طراحی شده با هدف تقویت حافظه دیداری، تمایز حروف چندشکلی، حساسیت املایی و ارتقای اعتمادبه‌نفس کودکان پایه اول در آستانه ورود به پایه دوم دبستان.
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={() => {
            audioService.playClick();
            onClose();
          }}
          className="w-full py-3.5 btn-marine-wood font-black text-base flex items-center justify-center gap-2 cursor-pointer shadow-lg"
        >
          <ArrowRight className="w-5 h-5 text-amber-200" />
          <span>بستن پنجره</span>
        </button>
      </div>
    </div>
  );
};
