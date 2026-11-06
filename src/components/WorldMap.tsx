import React from 'react';
import { PlayerSaveState, LevelConfig } from '../types';
import { GAME_LEVELS, IMAGE_QUIZ_DATA } from '../data/levels';
import { getCharacterById } from '../data/characters';
import { CharacterAvatar } from './CharacterAvatar';
import { audioService } from '../services/audioService';
import { 
  Star, 
  Lock, 
  CheckCircle2, 
  Crown, 
  Trophy, 
  UserCheck, 
  Settings, 
  Coins, 
  Sparkles,
  ArrowRight,
  Flame,
  Info,
  Play
} from 'lucide-react';

interface WorldMapProps {
  playerState: PlayerSaveState;
  onSelectLevel: (level: LevelConfig) => void;
  onOpenMenu: () => void;
  onOpenAchievements: () => void;
  onOpenParentDashboard: () => void;
  onOpenSettings: () => void;
  onOpenCredits: () => void;
  onOpenCharacterSelect?: () => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  playerState,
  onSelectLevel,
  onOpenMenu,
  onOpenAchievements,
  onOpenParentDashboard,
  onOpenSettings,
  onOpenCredits,
  onOpenCharacterSelect
}) => {
  const currentCompanion = getCharacterById(playerState.selectedCharacterId);
  const chapterNames = [
    'جنگل واژه‌ها', 'جزیره نشانه‌ها', 'شهر جمله‌ها', 'کارگاه کلمه‌سازی',
    'دره درک مطلب', 'جزیره هم‌قافیه‌ها', 'آزمایشگاه دقت', 'بندر دیکته',
    'قلعه فارسی', 'قصر قهرمانان فارسی'
  ];

  const handleNodeClick = (level: LevelConfig) => {
    const isUnlocked = level.id <= playerState.currentLevel || playerState.completedLevels[level.id] !== undefined;
    if (isUnlocked) {
      audioService.playClick();
      onSelectLevel(level);
    } else {
      audioService.playWrong();
      audioService.speakPersian(`مرحله ${level.id} هنوز قفل است! مرحله قبلی را کامل کن.`);
    }
  };

  return (
    <div className="map-screen flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex flex-col z-20 pb-24 select-none">
      {/* Top Header & HUD: Organic Driftwood Plank */}
      <header className="map-topbar flex items-center justify-between cartoon-wood-panel p-3 sm:p-4 mb-4 sm:mb-6 shadow-2xl relative z-30">
        {/* Decorative Wooden Rivets */}
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-amber-950 border border-amber-600/80 shadow-inner" />
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-950 border border-amber-600/80 shadow-inner" />
        <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-amber-950 border border-amber-600/80 shadow-inner" />
        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-amber-950 border border-amber-600/80 shadow-inner" />

        {/* Back to Menu */}
        <button
          onClick={() => {
            audioService.playClick();
            onOpenMenu();
          }}
          className="flex items-center gap-1.5 sm:gap-2 btn-marine-wood px-3.5 sm:px-4 py-2 font-black text-xs sm:text-base cursor-pointer shadow-md"
        >
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
          <span>منوی اصلی</span>
        </button>

        {/* Player Stats (Coins & Stars) in Floating Bubble Pods */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 border-2 border-yellow-200 px-3 sm:px-4 py-1.5 rounded-full text-slate-950 font-black text-xs sm:text-sm shadow-md">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-950 fill-amber-950 animate-pulse" />
            <span>{playerState.stars} ستاره</span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-yellow-300 to-amber-400 border-2 border-yellow-100 px-3 sm:px-4 py-1.5 rounded-full text-slate-950 font-black text-xs sm:text-sm shadow-md">
            <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-amber-950 fill-amber-950" />
            <span>{playerState.coins} سکه</span>
          </div>
        </div>

        {/* Action Buttons: Tactile Circular Pearl Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => {
              audioService.playClick();
              onOpenAchievements();
            }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full btn-spongebob-pink flex items-center justify-center p-0 cursor-pointer shadow-md"
            title="دستاوردها و نشان‌ها"
          >
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-200" />
          </button>
          <button
            onClick={() => {
              audioService.playClick();
              onOpenParentDashboard();
            }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full btn-spongebob-blue flex items-center justify-center p-0 cursor-pointer shadow-md"
            title="کارنامه والدین و آموزگار"
          >
            <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
          <button
            onClick={() => {
              audioService.playClick();
              onOpenSettings();
            }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full btn-marine-wood flex items-center justify-center p-0 cursor-pointer shadow-md"
            title="تنظیمات"
          >
            <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
          </button>
          <button
            onClick={() => {
              audioService.playClick();
              onOpenCredits();
            }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full btn-spongebob-yellow flex items-center justify-center p-0 cursor-pointer shadow-md"
            title="شناسنامه بازی"
          >
            <Info className="w-4 h-4 sm:w-5 sm:h-5 text-amber-950" />
          </button>
        </div>
      </header>

      {/* Hero Banner: Organic Marine Parchment Sign */}
      <div className="map-hero marine-parchment p-3 sm:p-5 mb-6 flex flex-col sm:flex-row items-center justify-between shadow-2xl relative z-20">
        <div 
          onClick={() => {
            if (onOpenCharacterSelect) {
              audioService.playClick();
              onOpenCharacterSelect();
            }
          }}
          className="flex items-center gap-3 sm:gap-4 z-10 cursor-pointer group"
          title="تغییر شخصیت همراه"
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-yellow-400/40 rounded-full blur-xs" />
            <CharacterAvatar character={currentCompanion} mood="happy" size="md" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl">🎓</span>
              <h1 className="text-xl sm:text-2xl font-black text-amber-950 flex items-center gap-1.5 drop-shadow-xs">
                <span>مسیر ماجراجویی املایی باب اسفنجی</span>
                <Sparkles className="w-5 h-5 text-amber-700 animate-spin" />
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-amber-900 mt-1 font-bold">
              همراه با <span className="text-amber-950 font-black underline decoration-wavy">{currentCompanion.namePersian}</span> (کلیک برای تغییر)
            </p>
          </div>
        </div>

        <div className="mt-3 sm:mt-0 text-center sm:text-left cartoon-wood-panel px-4 py-2 shadow-md z-10 border-2 border-amber-950">
          <span className="text-[11px] sm:text-xs text-amber-200 font-bold block">مرحله فعال شما</span>
          <span className="text-base sm:text-lg font-black text-yellow-300 flex items-center justify-center gap-1">
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
            <span>مرحله {playerState.currentLevel}</span>
          </span>
        </div>
      </div>

      {/* Levels Grid or Empty State */}
      {GAME_LEVELS.length === 0 ? (
        <div className="bg-slate-900/90 border-3 border-dashed border-yellow-400/50 rounded-3xl p-8 text-center flex flex-col items-center justify-center gap-4 shadow-2xl backdrop-blur-md">
          <div className="w-20 h-20 bg-yellow-400/10 border-2 border-yellow-400/40 rounded-full flex items-center justify-center text-4xl shadow-inner animate-bounce">
            🍍
          </div>
          <h2 className="text-2xl font-black text-yellow-300">
            هنوز مرحله‌ای تعریف نشده است
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed">
            تمام مراحل قبلی پاک شدند! هر زمانی که مشخصات، کلمات و نوع بازی مرحله مد نظرتان را بگویید، مراحل را دانه به دانه و با دقت برایتان می‌سازیم.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => {
                audioService.playClick();
                onOpenMenu();
              }}
              className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black rounded-xl text-sm transition-all transform active:scale-95 shadow cursor-pointer"
            >
              بازگشت به منوی اصلی
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GAME_LEVELS.map((level) => {
            const result = playerState.completedLevels[level.id];
            const isCompleted = result !== undefined;
            const isCurrent = level.id === playerState.currentLevel && !isCompleted;
            const isUnlocked = level.id <= playerState.currentLevel || isCompleted;
            const starsCount = result?.stars || 0;

            const startsChapter = level.id === 1 || (level.id >= 10 && (level.id - 10) % 10 === 0);
            const chapterIndex = Math.min(9, Math.floor((level.id - 10) / 10));
            const chapterTitle = level.id < 10 ? 'آماده‌سازی و آشنایی با دنیای کلمات' : chapterNames[chapterIndex];

            return (
              <React.Fragment key={level.id}>
                {startsChapter && (
                  <div className="col-span-full mt-3 mb-1 flex items-center gap-3 rounded-2xl border border-cyan-200/40 bg-slate-950/75 px-4 py-3 shadow-lg backdrop-blur-md">
                    <span className="text-2xl">{level.id < 10 ? '🐚' : level.isBoss ? '👑' : '🗺️'}</span>
                    <div className="min-w-0">
                      <h2 className="text-base sm:text-lg font-black text-amber-200">{chapterTitle}</h2>
                      <p className="text-xs sm:text-sm font-bold text-cyan-100">
                        {level.id < 10 ? 'مقدمه‌ی سفر' : `پایه ${level.id < 50 ? 'دوم' : 'سوم'} • مراحل ${level.id} تا ${Math.min(level.id + 9, 100)}`}
                      </p>
                    </div>
                    <span className="mr-auto rounded-full bg-amber-400/15 px-3 py-1 text-xs font-black text-amber-200">{level.id < 10 ? '۹ مرحله‌ی شروع' : '۱۰ مأموریت هیجان‌انگیز'}</span>
                  </div>
                )}
              <div
                onClick={() => handleNodeClick(level)}
                className={`map-level-card p-4 sm:p-5 relative overflow-hidden transition-all duration-300 cursor-pointer select-none flex flex-col justify-between min-h-[165px] ${
                  isCurrent
                    ? 'cartoon-sponge-panel scale-[1.02] shadow-2xl'
                    : isCompleted
                    ? 'cartoon-wood-panel hover:scale-[1.01]'
                    : isUnlocked
                    ? 'stepping-stone-bubble hover:scale-[1.01]'
                    : 'bg-slate-900/60 border-3 border-slate-700/60 rounded-[2rem] opacity-55 cursor-not-allowed'
                }`}
              >
                {/* Lightweight decorative overlay avoids one large image request per level card */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-cyan-300/10 via-transparent to-blue-950/20" />

                {/* Header inside Card */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center font-black text-lg shadow-lg border-2 ${
                        isCurrent
                          ? 'btn-spongebob-yellow animate-bounce'
                          : isCompleted
                          ? 'bg-gradient-to-br from-emerald-400 to-green-600 text-slate-950 border-emerald-200'
                          : isUnlocked
                          ? 'btn-spongebob-blue'
                          : 'bg-stone-800 text-stone-400 border-stone-600'
                      }`}
                    >
                      {!isUnlocked ? (
                        <Lock className="w-4 h-4 text-stone-400" />
                      ) : (
                        <span>{level.id}</span>
                      )}
                    </div>
                    <div>
                      <h2 className={`text-base font-black flex items-center gap-1.5 ${isCurrent ? 'text-amber-950' : isCompleted ? 'text-amber-100' : 'text-slate-900'}`}>
                        <span>{level.title}</span>
                        {level.isBoss && (
                          <span className="bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full text-[10px] font-black flex items-center gap-0.5 shadow">
                            <Crown className="w-3 h-3 fill-amber-950" />
                            <span>غول نهایی</span>
                          </span>
                        )}
                      </h2>
                      <p className={`text-xs font-bold ${isCurrent ? 'text-amber-900' : isCompleted ? 'text-amber-200' : 'text-cyan-900'}`}>
                        {level.subtitle}
                      </p>
                    </div>
                  </div>

                  {isCompleted ? (
                    <div className="flex items-center gap-1 bg-emerald-500 text-slate-950 px-3 py-1 rounded-full text-xs font-black shadow-md">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />
                      <span>تکمیل شد</span>
                    </div>
                  ) : isCurrent ? (
                    <div className="flex items-center gap-1 btn-marine-wood px-3 py-1 rounded-full text-xs font-black animate-pulse shadow-md">
                      <Play className="w-3 h-3 fill-amber-200" />
                      <span>بازی کن</span>
                    </div>
                  ) : null}
                </div>

                {/* Description & Educational Focus & Image Preview */}
                <div className="my-2.5 relative z-10 flex items-center gap-3">
                  {IMAGE_QUIZ_DATA[level.id] ? (
                    <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-amber-500 shadow-md shrink-0 bg-amber-950/80">
                      <img
                        src={IMAGE_QUIZ_DATA[level.id].imageUrl}
                        alt={IMAGE_QUIZ_DATA[level.id].imageNamePersian}
                        width={64}
                        height={64}
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : level.mechanic === 'twenty_bubble_spelling' ? (
                    <div className="w-16 h-16 rounded-full border-3 border-cyan-400 shadow-md shrink-0 bg-gradient-to-br from-cyan-400/50 to-blue-600/60 flex items-center justify-center text-2xl animate-pulse">
                      🫧
                    </div>
                  ) : level.mechanic === 'basketball_trash_sort' ? (
                    <div className="w-16 h-16 rounded-full border-3 border-orange-400 shadow-md shrink-0 bg-gradient-to-br from-amber-500/50 to-orange-600/60 flex items-center justify-center text-2xl animate-pulse">
                      🏀🗑️
                    </div>
                  ) : level.mechanic === 'syllable_count_quiz' ? (
                    <div className="w-16 h-16 rounded-full border-3 border-yellow-400 shadow-md shrink-0 bg-gradient-to-br from-yellow-400/50 to-amber-600/60 flex items-center justify-center text-2xl animate-pulse">
                      👏🔢
                    </div>
                  ) : null}
                  <p className={`text-xs leading-relaxed font-bold flex-1 ${isCurrent ? 'text-amber-950' : isCompleted ? 'text-amber-100' : 'text-slate-800'}`}>
                    {level.descriptionPersian}
                  </p>
                </div>

                {/* Footer: Stars & Educational Focus */}
                <div className={`flex items-center justify-between pt-2 border-t relative z-10 ${isCurrent ? 'border-amber-800/20' : isCompleted ? 'border-amber-500/30' : 'border-cyan-600/30'}`}>
                  <span className={`text-[11px] font-extrabold ${isCurrent ? 'text-amber-900' : isCompleted ? 'text-yellow-200' : 'text-cyan-900'}`}>
                    {level.educationalFocus}
                  </span>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= starsCount
                            ? 'text-yellow-400 fill-yellow-400 filter drop-shadow'
                            : isCompleted
                            ? 'text-amber-950/60'
                            : 'text-slate-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};
