import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { audioService } from '../services/audioService';
import { Volume2, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

interface DictationOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface AudioDictationListenProps {
  word: string;
  audioText: string;
  emoji?: string;
  options: DictationOption[];
  onSuccess: () => void;
  onMistake: (option: DictationOption) => void;
}

export const AudioDictationListen: React.FC<AudioDictationListenProps> = ({
  word,
  audioText,
  emoji = '🎧',
  options,
  onSuccess,
  onMistake
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [wobbleId, setWobbleId] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const playSpeech = () => {
    setIsPlayingAudio(true);
    audioService.speakPersian(audioText || word);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 1500);
  };

  useEffect(() => {
    // Auto play on mount
    const timer = setTimeout(() => {
      playSpeech();
    }, 400);
    return () => clearTimeout(timer);
  }, [word]);

  const handleSelectOption = (option: DictationOption) => {
    if (isCompleted || selectedId) return;

    setSelectedId(option.id);
    if (option.isCorrect) {
      audioService.playVictoryFanfare();
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {}
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } else {
      audioService.playWrong();
      setWobbleId(option.id);
      onMistake(option);
      setTimeout(() => {
        setWobbleId(null);
        setSelectedId(null);
      }, 1000);
    }
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Dictation Header: Driftwood Plank */}
      <div className="w-full max-w-xl cartoon-wood-panel p-4 mb-4 shadow-xl border-4 border-amber-950 flex items-center justify-between relative">
        <div className="absolute top-2.5 left-3 w-2.5 h-2.5 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
        <div className="absolute top-2.5 right-3 w-2.5 h-2.5 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full btn-spongebob-yellow flex items-center justify-center text-2xl shadow-md">
            🎧
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-amber-100 drop-shadow">به صدای گوینده گوش بده و املای درست را بنویس!</h3>
            <p className="text-xs text-amber-200 font-bold">با زدن دکمه بلندگو می‌توانی دوباره صدا را بشنوی.</p>
          </div>
        </div>
      </div>

      {/* Audio Playback Radio Station Box: Stepping Stone Bubble */}
      <div className="w-full max-w-xl stepping-stone-bubble p-6 mb-6 shadow-2xl flex flex-col items-center justify-center relative">
        <span className="text-4xl mb-3 drop-shadow">{emoji}</span>

        {/* Big Audio Replay Button */}
        <button
          onClick={playSpeech}
          className={`py-3.5 px-6 btn-spongebob-yellow font-black text-lg flex items-center gap-3 transition-all cursor-pointer ${
            isPlayingAudio ? 'ring-4 ring-yellow-200 animate-pulse' : ''
          }`}
        >
          <Volume2 className={`w-6 h-6 text-amber-950 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
          <span>{isPlayingAudio ? 'در حال پخش صدا...' : 'پخش مجدد صدای کلمه 🔊'}</span>
        </button>
      </div>

      {/* Options Grid: Organic Bubble Options */}
      <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((option) => {
          const isSelected = selectedId === option.id;
          const isWobbling = wobbleId === option.id;

          return (
            <button
              key={option.id}
              disabled={isCompleted}
              onClick={() => handleSelectOption(option)}
              className={`p-5 btn-bubble-option flex items-center justify-between font-black text-2xl transition-all cursor-pointer shadow-lg ${
                isSelected && option.isCorrect
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 border-3 border-emerald-200 scale-102 shadow-xl'
                  : isWobbling
                  ? 'animate-shake bg-rose-950/90 border-2 border-rose-400 text-rose-200'
                  : 'text-white hover:scale-102 active:scale-95'
              }`}
            >
              <span className="tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{option.text}</span>
              {isSelected && option.isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-slate-950" />
              ) : (
                <span className="text-xs marine-parchment text-amber-950 px-3 py-1 font-black shadow-sm">
                  انتخاب ✍️
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
