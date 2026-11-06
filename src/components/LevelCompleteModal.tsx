import React, { useEffect } from 'react';
import { LevelConfig, Character } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import { audioService } from '../services/audioService';
import { Star, Coins, ArrowRight, Play, Trophy, Sparkles } from 'lucide-react';

interface LevelCompleteModalProps {
  level: LevelConfig;
  companion: Character;
  stars: number;
  coinsEarned: number;
  score: number;
  timeSpent: number;
  hasNextLevel: boolean;
  onNextLevel: () => void;
  onReturnToMap: () => void;
}

export const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({
  level,
  companion,
  stars,
  coinsEarned,
  score,
  timeSpent,
  hasNextLevel,
  onNextLevel,
  onReturnToMap
}) => {
  useEffect(() => {
    audioService.playStarReward();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in select-none">
      <div className="w-full max-w-md cartoon-wood-panel p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden animate-float-gentle border-4 border-amber-950">
        {/* Decorative Rivets */}
        <div className="absolute top-2.5 left-3 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
        <div className="absolute top-2.5 right-3 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
        <div className="absolute bottom-2.5 left-3 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
        <div className="absolute bottom-2.5 right-3 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />

        {/* Mascot in Bubbly Halo */}
        <div className="relative mb-2 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-3 bg-yellow-400/40 rounded-full blur-xs" />
            <CharacterAvatar character={companion} mood="celebration" size="lg" />
          </div>
        </div>

        {/* Celebration Title */}
        <h2 className="text-3xl sm:text-4xl font-display font-black text-amber-100 drop-shadow-md mb-1">
          آفرین قهرمان! 🎉
        </h2>
        <p className="text-amber-200 font-bold text-sm sm:text-base mb-4">
          مرحله {level.id}: {level.title} با موفقیت تمام شد!
        </p>

        {/* Animated Stars */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {[1, 2, 3].map(s => {
            const earned = s <= stars;
            return (
              <div
                key={s}
                className={`transform transition-all duration-500 ${
                  earned ? 'scale-110 animate-bounce' : 'scale-90 opacity-40'
                }`}
                style={{ animationDelay: `${s * 0.15}s` }}
              >
                <Star
                  className={`w-12 h-12 sm:w-14 sm:h-14 ${
                    earned
                      ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]'
                      : 'text-amber-950/60'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Rewards Summary in Marine Parchment */}
        <div className="grid grid-cols-2 gap-3 marine-parchment p-4 mb-6 shadow-md">
          <div className="flex flex-col items-center">
            <span className="text-xs text-amber-900 font-bold mb-1">سکه‌های پاداش</span>
            <div className="flex items-center gap-1.5 font-black text-xl text-amber-950">
              <Coins className="w-5 h-5 fill-amber-600 text-amber-600" />
              <span>+{coinsEarned}</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xs text-amber-900 font-bold mb-1">امتیاز کسب‌شده</span>
            <div className="flex items-center gap-1.5 font-black text-xl text-amber-950">
              <Trophy className="w-5 h-5 text-amber-800" />
              <span>+{score}</span>
            </div>
          </div>
        </div>

        {/* Actions with Tactile 3D Buttons */}
        <div className="flex flex-col gap-3">
          {hasNextLevel && (
            <button
              onClick={() => {
                audioService.playClick();
                onNextLevel();
              }}
              className="w-full py-3.5 btn-spongebob-yellow font-black text-lg sm:text-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Play className="w-6 h-6 fill-amber-950 text-amber-950" />
              <span>مرحله بعد</span>
              <Sparkles className="w-5 h-5 text-amber-800" />
            </button>
          )}

          <button
            onClick={() => {
              audioService.playClick();
              onReturnToMap();
            }}
            className="w-full py-3 btn-marine-wood font-black text-base flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <ArrowRight className="w-5 h-5 text-amber-200" />
            <span>بازگشت به نقشه</span>
          </button>
        </div>
      </div>
    </div>
  );
};
