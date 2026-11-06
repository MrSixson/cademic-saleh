import React from 'react';
import { ACHIEVEMENTS } from '../data/achievements';
import { PlayerSaveState } from '../types';
import { audioService } from '../services/audioService';
import { 
  Trophy, 
  ArrowRight, 
  CheckCircle, 
  Lock, 
  Coins, 
  Sparkles,
  Footprints,
  Brain,
  PenTool,
  Shield,
  Zap,
  Compass,
  Crown,
  Music,
  Key
} from 'lucide-react';

interface AchievementsViewProps {
  playerState: PlayerSaveState;
  onClaimReward: (badgeId: string, coins: number) => void;
  onBack: () => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  playerState,
  onClaimReward,
  onBack
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Footprints': return <Footprints className="w-6 h-6" />;
      case 'Brain': return <Brain className="w-6 h-6" />;
      case 'PenTool': return <PenTool className="w-6 h-6" />;
      case 'Shield': return <Shield className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'Compass': return <Compass className="w-6 h-6" />;
      case 'Crown': return <Crown className="w-6 h-6" />;
      case 'Music': return <Music className="w-6 h-6" />;
      case 'Key': return <Key className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <div className="dashboard-screen flex-1 w-full max-w-4xl mx-auto px-4 py-6 flex flex-col z-20 select-none pb-16">
      {/* Header: Organic Driftwood Plank */}
      <div className="flex items-center justify-between cartoon-wood-panel p-4 mb-6 shadow-2xl relative z-30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-500 border-2 border-yellow-200 flex items-center justify-center text-slate-950 shadow-md">
            <Trophy className="w-6 h-6 text-amber-950" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-display font-black text-amber-100 drop-shadow">
              تالار مدال‌ها و نشان‌های افتخار
            </h1>
            <span className="text-xs text-amber-200 font-bold">
              با پیشرفت در مراحل ماجراجویی املایی، پاداش‌ها و سکه‌های طلایی بگیر!
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            audioService.playClick();
            onBack();
          }}
          className="flex items-center gap-1.5 btn-marine-wood px-4 py-2 font-bold text-sm cursor-pointer shadow-md"
        >
          <ArrowRight className="w-4 h-4 text-amber-200" />
          <span>بازگشت</span>
        </button>
      </div>

      {/* Badges Grid in Floating Bubble Pods */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ACHIEVEMENTS.map(ach => {
          const completedCount = Object.keys(playerState.completedLevels).length;
          let isUnlocked = false;

          if (ach.category === 'levels') {
            isUnlocked = completedCount >= ach.requiredCount;
          } else if (ach.category === 'bosses') {
            if (ach.id === 'bubble_boss_master') isUnlocked = playerState.completedLevels[7] !== undefined;
            else isUnlocked = completedCount >= ach.requiredCount;
          } else if (ach.category === 'streak') {
            isUnlocked = playerState.adaptiveStats.longestCombo >= ach.requiredCount;
          } else if (ach.category === 'accuracy' || ach.category === 'speed') {
            isUnlocked = playerState.adaptiveStats.correctAnswers >= ach.requiredCount;
          }

          const isClaimed = playerState.unlockedBadges.includes(ach.id);

          return (
            <div
              key={ach.id}
              className={`p-4 sm:p-5 rounded-[2rem] border-3 flex items-start justify-between gap-3 transition-all ${
                isUnlocked
                  ? 'stepping-stone-bubble shadow-xl hover:scale-[1.01]'
                  : 'bg-stone-900/60 border-stone-700/60 opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0 shadow-md ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-amber-400 to-yellow-400 text-slate-950 border-yellow-200'
                      : 'bg-stone-800 text-stone-500 border-stone-700'
                  }`}
                >
                  {getIcon(ach.iconName)}
                </div>

                <div>
                  <h3 className={`font-black text-base flex items-center gap-2 ${isUnlocked ? 'text-slate-900' : 'text-stone-300'}`}>
                    <span>{ach.titlePersian}</span>
                    {isUnlocked && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                  </h3>
                  <p className={`text-xs mt-1 leading-relaxed font-bold ${isUnlocked ? 'text-slate-700' : 'text-stone-400'}`}>
                    {ach.descriptionPersian}
                  </p>

                  <div className="flex items-center gap-1.5 text-amber-800 text-xs font-black mt-2">
                    <Coins className="w-4 h-4 fill-amber-600 text-amber-600" />
                    <span>پاداش: {ach.rewardCoins} سکه</span>
                  </div>
                </div>
              </div>

              {/* Claim / Status Button */}
              <div className="flex-shrink-0">
                {isClaimed ? (
                  <span className="text-xs text-emerald-800 bg-emerald-200 border-2 border-emerald-400 px-3 py-1.5 rounded-full font-black block shadow-sm">
                    دریافت شد
                  </span>
                ) : isUnlocked ? (
                  <button
                    onClick={() => {
                      audioService.playClick();
                      onClaimReward(ach.id, ach.rewardCoins);
                    }}
                    className="btn-spongebob-yellow font-black px-4 py-1.5 text-xs shadow-md cursor-pointer animate-bounce"
                  >
                    دریافت جایزه
                  </button>
                ) : (
                  <div className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center text-stone-500 border border-stone-700">
                    <Lock className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
