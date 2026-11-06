import React from 'react';
import { CHARACTERS } from '../data/characters';
import { Character, PlayerSaveState } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import { audioService } from '../services/audioService';
import { 
  X, 
  Check, 
  Lock, 
  Volume2, 
  Coins, 
  Sparkles,
  Users
} from 'lucide-react';

interface CharacterSelectModalProps {
  playerState: PlayerSaveState;
  onSelectCharacter: (characterId: string) => void;
  onUnlockCharacter: (characterId: string, cost: number) => void;
  onClose: () => void;
}

export const CharacterSelectModal: React.FC<CharacterSelectModalProps> = ({
  playerState,
  onSelectCharacter,
  onUnlockCharacter,
  onClose
}) => {
  const handlePlayVoice = (char: Character, e: React.MouseEvent) => {
    e.stopPropagation();
    audioService.speakPersian(char.cheerVoiceLines[0]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in select-none">
      <div className="cartoon-wood-panel p-5 sm:p-7 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative text-white border-4 border-amber-950">
        {/* Decorative Rivets */}
        <div className="absolute top-2.5 left-3 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
        <div className="absolute top-2.5 right-3 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
        <div className="absolute bottom-2.5 left-3 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
        <div className="absolute bottom-2.5 right-3 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />

        {/* Close Button: Pearl Circle */}
        <button
          onClick={() => {
            audioService.playClick();
            onClose();
          }}
          className="absolute top-4 left-4 w-9 h-9 rounded-full btn-marine-wood flex items-center justify-center p-0 cursor-pointer shadow-md"
        >
          <X className="w-5 h-5 text-amber-200" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-amber-800/40">
          <div className="w-12 h-12 rounded-full btn-spongebob-yellow flex items-center justify-center text-amber-950 shadow-md">
            <Users className="w-6 h-6 text-amber-950" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-amber-100 drop-shadow">
              انتخاب قهرمان و همراه بیکینی باتم
            </h2>
            <p className="text-xs sm:text-sm text-amber-200 mt-1 font-bold">
              شخصیت مورد علاقه‌ات را برای ماجراجویی املایی انتخاب کن!
            </p>
          </div>
        </div>

        {/* Coins indicator */}
        <div className="flex items-center justify-end mb-4">
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-300 to-amber-400 border-2 border-yellow-100 px-3.5 py-1.5 rounded-full text-slate-950 font-black text-sm shadow-md">
            <Coins className="w-4 h-4 text-amber-950 fill-amber-950 animate-pulse" />
            <span>سکه شما: {playerState.coins}</span>
          </div>
        </div>

        {/* Characters Grid in Organic Bubble Pods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {CHARACTERS.map(char => {
            const isUnlocked = char.unlockedByDefault || playerState.unlockedCharacters.includes(char.id);
            const isSelected = playerState.selectedCharacterId === char.id;
            const canAfford = playerState.coins >= (char.unlockCostCoins || 0);

            return (
              <div
                key={char.id}
                onClick={() => {
                  if (isUnlocked) {
                    audioService.playClick();
                    onSelectCharacter(char.id);
                  }
                }}
                className={`relative flex flex-col items-center p-4 rounded-[2rem] border-3 transition-all duration-300 text-center ${
                  isSelected
                    ? 'cartoon-sponge-panel scale-105 shadow-2xl ring-4 ring-yellow-300'
                    : isUnlocked
                    ? 'stepping-stone-bubble hover:scale-105 cursor-pointer shadow-lg'
                    : 'bg-stone-900/60 border-stone-800 opacity-60 rounded-[2rem]'
                }`}
              >
                {/* Selected Check Badge */}
                {isSelected && (
                  <div className="absolute top-3 right-3 bg-emerald-500 text-slate-950 p-1 rounded-full shadow-md font-bold">
                    <Check className="w-4 h-4 text-slate-950" />
                  </div>
                )}

                {/* Character Photo / Avatar in Bubbly Halo */}
                <div className="mb-3 relative group">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-yellow-400/40 rounded-full blur-xs" />
                    <CharacterAvatar character={char} mood={isSelected ? 'excited' : 'idle'} size="lg" />
                  </div>
                  <button
                    onClick={(e) => handlePlayVoice(char, e)}
                    className="absolute -bottom-1 -left-1 w-8 h-8 rounded-full btn-spongebob-yellow flex items-center justify-center p-0 shadow transition-transform hover:scale-110"
                    title="پخش صدای شخصیت"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-amber-950" />
                  </button>
                </div>

                {/* Name and Title */}
                <h3 className={`font-black text-base mb-0.5 ${isSelected ? 'text-amber-950' : 'text-slate-900'}`}>
                  {char.namePersian}
                </h3>
                <span className={`text-[11px] font-extrabold mb-2 line-clamp-1 ${isSelected ? 'text-amber-900' : 'text-cyan-800'}`}>
                  {char.titlePersian}
                </span>

                {/* Personality quote in Soft Parchment Tag */}
                <p className={`text-[11px] line-clamp-2 leading-relaxed mb-3 font-bold ${isSelected ? 'text-amber-950' : 'text-slate-700'}`}>
                  "{char.cheerVoiceLines[0]}"
                </p>

                {/* Action button */}
                {isSelected ? (
                  <div className="w-full py-1.5 btn-spongebob-yellow text-amber-950 font-black text-xs shadow">
                    همراه فعال ⭐
                  </div>
                ) : isUnlocked ? (
                  <button
                    onClick={() => {
                      audioService.playClick();
                      onSelectCharacter(char.id);
                    }}
                    className="w-full py-1.5 btn-spongebob-blue font-black text-xs cursor-pointer shadow"
                  >
                    انتخاب همراه
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (canAfford && char.unlockCostCoins) {
                        audioService.playCoin();
                        onUnlockCharacter(char.id, char.unlockCostCoins);
                      } else {
                        audioService.playWrong();
                        audioService.speakPersian(`برای آزاد کردن ${char.namePersian} نیاز به ${char.unlockCostCoins} سکه داری!`);
                      }
                    }}
                    disabled={!canAfford}
                    className={`w-full py-1.5 font-black text-xs flex items-center justify-center gap-1.5 transition-all ${
                      canAfford
                        ? 'btn-spongebob-yellow cursor-pointer shadow-md'
                        : 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700 rounded-full'
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>آزادسازی: {char.unlockCostCoins} سکه</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
