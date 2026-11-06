import React from 'react';
import { PlayerSaveState, GameScreen } from '../types';
import { getCharacterById } from '../data/characters';
import { CharacterAvatar } from './CharacterAvatar';
import { audioService } from '../services/audioService';
import { 
  Play, 
  Map, 
  Trophy, 
  UserCheck, 
  Settings, 
  Sparkles, 
  Info, 
  Star, 
  Coins 
} from 'lucide-react';

interface MainMenuProps {
  playerState: PlayerSaveState;
  onNavigate: (screen: GameScreen) => void;
  onStartAdventure: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  playerState,
  onNavigate,
  onStartAdventure
}) => {
  const currentCompanion = getCharacterById(playerState.selectedCharacterId);
  const isNewGame = Object.keys(playerState.completedLevels).length === 0;

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 flex flex-col items-center justify-between z-20 select-none">
      {/* Top Header with Stars & Coins: Organic Floating Driftwood Bar */}
      <div className="w-full flex items-center justify-between cartoon-wood-panel px-5 py-3 shadow-2xl relative z-30">
        {/* Cartoon Wooden Rivets */}
        <div className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-600/80 shadow-inner" />
        <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-600/80 shadow-inner" />
        <div className="absolute bottom-2 left-2 w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-600/80 shadow-inner" />
        <div className="absolute bottom-2 right-2 w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-600/80 shadow-inner" />

        {/* Currency Pods: Bubble Pods */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 border-2 border-yellow-200 px-3.5 py-1 rounded-full text-slate-950 font-black text-sm shadow-md">
            <Star className="w-4 h-4 text-amber-950 fill-amber-950" />
            <span>{playerState.stars} ستاره</span>
          </div>

          <div className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-300 to-amber-400 border-2 border-yellow-100 px-3.5 py-1 rounded-full text-slate-950 font-black text-sm shadow-md">
            <Coins className="w-4 h-4 text-amber-950 fill-amber-950" />
            <span>{playerState.coins} سکه</span>
          </div>
        </div>

        {/* Action Icon Controls: Rounded Pearl Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              audioService.playClick();
              onNavigate('settings');
            }}
            className="w-10 h-10 rounded-full btn-spongebob-blue flex items-center justify-center p-0 cursor-pointer shadow-md"
            title="تنظیمات صدا و بازی"
          >
            <Settings className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => {
              audioService.playClick();
              onNavigate('credits');
            }}
            className="w-10 h-10 rounded-full btn-spongebob-yellow flex items-center justify-center p-0 cursor-pointer shadow-md"
            title="شناسنامه و عوامل"
          >
            <Info className="w-5 h-5 text-amber-950" />
          </button>
        </div>
      </div>

      {/* Hero Title and Mascot Display: Organic Wooden Undersea Plaque */}
      <div className="my-6 flex flex-col items-center text-center relative z-20">
        {/* Animated Mascot in a Bubbly Halo */}
        <div 
          onClick={() => {
            audioService.playClick();
            onNavigate('characterSelect');
          }}
          className="relative mb-3 cursor-pointer group animate-subtle-float"
          title="تغییر شخصیت همراه"
        >
          <div className="relative">
            {/* Organic Glow / Bubble behind mascot */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-400/40 via-yellow-300/30 to-pink-400/30 rounded-full blur-md animate-pulse" />
            <CharacterAvatar character={currentCompanion} mood="celebration" size="xl" />
          </div>
          <div className="absolute -bottom-2 right-1/2 translate-x-1/2 btn-spongebob-yellow px-4 py-1 font-black text-xs shadow-lg group-hover:scale-105 transition-transform flex items-center gap-1.5 whitespace-nowrap">
            <span>{currentCompanion.namePersian}</span>
            <span className="text-[10px] bg-amber-950 text-yellow-200 px-2 py-0.5 rounded-full font-bold">تغییر</span>
          </div>
        </div>

        {/* Big Game Title Wooden Board */}
        <div className="cartoon-wood-panel px-6 sm:px-10 py-5 my-2 shadow-2xl relative max-w-lg border-4 border-amber-950">
          {/* Decorative Corner Rivets */}
          <div className="absolute top-2.5 left-3 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
          <div className="absolute top-2.5 right-3 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
          <div className="absolute bottom-2.5 left-3 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
          <div className="absolute bottom-2.5 right-3 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />

          <h1 className="text-3xl sm:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-amber-200 to-yellow-400 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] tracking-wide mb-1">
            🍍 دریای کلمات باب اسفنجی 🌊
          </h1>
          <p className="text-sm sm:text-base text-amber-100 font-extrabold drop-shadow">
            ماجراجویی شاد و مهیج چالش‌های املایی و یادگیری فارسی
          </p>
        </div>

        <div className="marine-parchment px-5 py-2 mt-2 shadow-md flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-800" />
          <span className="text-xs sm:text-sm font-bold text-amber-950">
            ۹ مرحله جذاب: آزمون تصویری، حباب‌های غلط املایی، بسکتبال کلمات و شمارش هجاها
          </span>
        </div>
      </div>

      {/* Main Action Menu Buttons: Tactile 3D Organic Buttons */}
      <div className="w-full max-w-md flex flex-col gap-3.5 mb-6 z-20">
        {/* Start / Continue Button: Big SpongeBob Yellow Plank */}
        <button
          onClick={() => {
            audioService.playClick();
            onStartAdventure();
          }}
          className="w-full py-4 px-6 btn-spongebob-yellow font-black text-xl sm:text-2xl flex items-center justify-center gap-3 cursor-pointer group"
        >
          <Play className="w-7 h-7 fill-amber-950 text-amber-950 group-hover:scale-110 transition-transform" />
          <span>ادامه ماجراجویی املا</span>
          <Sparkles className="w-6 h-6 text-amber-800 animate-spin" />
        </button>

        {/* World Map: Marine Wooden Button */}
        <button
          onClick={() => {
            audioService.playClick();
            onNavigate('map');
          }}
          className="w-full py-3.5 px-6 btn-marine-wood font-black text-lg flex items-center justify-center gap-3 cursor-pointer"
        >
          <Map className="w-6 h-6 text-amber-200" />
          <span>نقشه ماجراجویی مراحل</span>
        </button>

        {/* Character Selection: Ocean Blue Button */}
        <button
          onClick={() => {
            audioService.playClick();
            onNavigate('characterSelect');
          }}
          className="w-full py-3.5 px-6 btn-spongebob-blue font-black text-base flex items-center justify-center gap-3 cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-yellow-300" />
          <span>همراهان دریایی (باب اسفنجی، پاتریک، سندی و گری)</span>
        </button>

        {/* Achievements: Patrick Pink Button */}
        <button
          onClick={() => {
            audioService.playClick();
            onNavigate('achievements');
          }}
          className="w-full py-3.5 px-6 btn-spongebob-pink font-black text-base flex items-center justify-center gap-3 cursor-pointer"
        >
          <Trophy className="w-6 h-6 text-yellow-200" />
          <span>تالار افتخارات، مدال‌ها و دستاوردها</span>
        </button>

        {/* Parent / Teacher Dashboard: Organic Bubble Pill Card */}
        <button
          onClick={() => {
            audioService.playClick();
            onNavigate('parentDashboard');
          }}
          className="w-full py-3 px-6 btn-bubble-option font-extrabold text-base flex items-center justify-center gap-3 cursor-pointer"
        >
          <UserCheck className="w-5 h-5 text-cyan-800" />
          <span>کارنامه و گزارش پیشرفت والدین و آموزگار</span>
        </button>
      </div>

      {/* Footer credits tag: Soft Undersea Parchment Tag */}
      <footer className="text-center text-xs text-amber-100 font-bold bg-amber-950/60 border border-amber-500/40 px-4 py-1.5 rounded-full shadow-md z-20">
        آموزگار و ناظر آموزشی: آرزو صالح • طراحی و توسعه: امین جدایی
      </footer>
    </div>
  );
};
