import React, { useEffect, useState } from 'react';
import { Character } from '../types';
import { CharacterAvatar, CharacterMood } from './CharacterAvatar';
import { audioService } from '../services/audioService';
import { Volume2, Sparkles } from 'lucide-react';

interface CharacterCompanionProps {
  character: Character;
  mood?: CharacterMood;
  speechText?: string;
  onCompanionClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  position?: 'bottom-left' | 'bottom-right' | 'top-right' | 'inline';
  showSpeechBubble?: boolean;
}

export const CharacterCompanion: React.FC<CharacterCompanionProps> = ({
  character,
  mood = 'idle',
  speechText,
  onCompanionClick,
  size = 'md',
  position = 'inline',
  showSpeechBubble = true
}) => {
  const [currentText, setCurrentText] = useState<string>(speechText || character.cheerVoiceLines[0]);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    if (speechText) {
      setCurrentText(speechText);
    }
  }, [speechText]);

  const handleSpeak = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsSpeaking(true);
    audioService.speakPersian(currentText);
    setTimeout(() => setIsSpeaking(false), 2000);
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'fixed bottom-4 left-4 z-30 flex items-end gap-3';
      case 'bottom-right':
        return 'fixed bottom-4 right-4 z-30 flex items-end gap-3 flex-row-reverse';
      case 'top-right':
        return 'fixed top-4 right-4 z-30 flex items-start gap-3';
      default:
        return 'relative flex items-center gap-3';
    }
  };

  return (
    <div className={getPositionClasses()} id={`companion-${character.id}`}>
      {/* Speech Bubble: Organic Bubble Pod */}
      {showSpeechBubble && currentText && (
        <div
          onClick={handleSpeak}
          className="relative max-w-xs sm:max-w-sm cartoon-bubble-card text-slate-900 px-4 py-2.5 rounded-[1.85rem] shadow-xl cursor-pointer hover:scale-105 transition-all select-none"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base font-black leading-relaxed text-slate-900">
              {currentText}
            </span>
            <button
              type="button"
              className={`p-1 rounded-full text-cyan-900 hover:text-cyan-700 bg-white/80 border border-cyan-300 transition-colors ${
                isSpeaking ? 'animate-pulse text-amber-500' : ''
              }`}
              title="پخش صدا"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
          {/* Organic Bubble Tail */}
          <div className="absolute -bottom-2 left-6 w-3.5 h-3.5 bg-sky-100 border-r-3 border-b-3 border-sky-600 transform rotate-45 rounded-xs" />
        </div>
      )}

      {/* Character Avatar with interactive trigger */}
      <div
        onClick={() => {
          handleSpeak();
          onCompanionClick?.();
        }}
        className="cursor-pointer transition-transform hover:scale-110 active:scale-95 group relative"
      >
        <CharacterAvatar character={character} mood={mood} size={size} />
        {/* Glow indicator on hover */}
        <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
        </div>
      </div>
    </div>
  );
};
