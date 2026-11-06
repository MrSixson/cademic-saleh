import React from 'react';
import { PlayerSaveState } from '../types';
import { audioService } from '../services/audioService';
import { 
  Settings, 
  Volume2, 
  VolumeX, 
  Music, 
  Mic, 
  RotateCcw, 
  ArrowRight,
  Check
} from 'lucide-react';

interface SettingsModalProps {
  playerState: PlayerSaveState;
  onUpdateSettings: (newSettings: PlayerSaveState['settings']) => void;
  onResetProgress: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  playerState,
  onUpdateSettings,
  onResetProgress,
  onClose
}) => {
  const { settings } = playerState;

  const handleToggleMusic = () => {
    const updated = { ...settings, musicEnabled: !settings.musicEnabled };
    onUpdateSettings(updated);
    audioService.updateSettings(updated);
    if (updated.musicEnabled) audioService.startMusic('adventure');
    else audioService.stopMusic();
  };

  const handleToggleSfx = () => {
    const updated = { ...settings, sfxEnabled: !settings.sfxEnabled };
    onUpdateSettings(updated);
    audioService.updateSettings(updated);
    if (updated.sfxEnabled) audioService.playClick();
  };

  const handleToggleVoice = () => {
    const updated = { ...settings, voiceEnabled: !settings.voiceEnabled };
    onUpdateSettings(updated);
    audioService.updateSettings(updated);
    if (updated.voiceEnabled) audioService.speakPersian('صدای راهنما فعال شد.');
  };

  const handleVolumeChange = (type: 'music' | 'sfx' | 'voice', value: number) => {
    const updated = {
      ...settings,
      [`${type}Volume`]: value
    };
    onUpdateSettings(updated as unknown as PlayerSaveState['settings']);
    audioService.updateSettings(updated as unknown as PlayerSaveState['settings']);
  };

  const [showConfirmReset, setShowConfirmReset] = React.useState(false);

  const handleExecuteReset = () => {
    audioService.playClick();
    onResetProgress();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in select-none">
      <div className="w-full max-w-md cartoon-wood-panel p-6 sm:p-8 shadow-2xl relative overflow-hidden border-4 border-amber-950">
        {/* Decorative Rivets */}
        <div className="absolute top-2.5 left-3 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
        <div className="absolute top-2.5 right-3 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
        <div className="absolute bottom-2.5 left-3 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
        <div className="absolute bottom-2.5 right-3 w-3 h-3 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b-2 border-amber-800/40 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full btn-spongebob-blue flex items-center justify-center p-0 shadow-md">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-black text-amber-100 drop-shadow">
              تنظیمات بازی
            </h2>
          </div>

          <button
            onClick={() => {
              audioService.playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-full btn-marine-wood flex items-center justify-center p-0 cursor-pointer shadow-md"
          >
            <ArrowRight className="w-4 h-4 text-amber-200" />
          </button>
        </div>

        {/* Audio Controls */}
        <div className="space-y-4 mb-6">
          {/* Music */}
          <div className="marine-parchment p-3.5 flex flex-col gap-2 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-950 font-black text-sm">
                <Music className="w-4 h-4 text-amber-800" />
                <span>موسیقی پس‌زمینه</span>
              </div>
              <button
                onClick={handleToggleMusic}
                className={`px-3 py-1 rounded-full border text-xs font-black transition-all cursor-pointer ${
                  settings.musicEnabled
                    ? 'bg-emerald-600 border-emerald-400 text-white shadow-sm'
                    : 'bg-rose-700 border-rose-500 text-white shadow-sm'
                }`}
              >
                {settings.musicEnabled ? 'روشن' : 'خاموش'}
              </button>
            </div>
            {settings.musicEnabled && (
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.musicVolume}
                onChange={e => handleVolumeChange('music', parseFloat(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            )}
          </div>

          {/* SFX */}
          <div className="marine-parchment p-3.5 flex flex-col gap-2 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-950 font-black text-sm">
                <Volume2 className="w-4 h-4 text-amber-800" />
                <span>افکت‌های صوتی و حباب‌ها</span>
              </div>
              <button
                onClick={handleToggleSfx}
                className={`px-3 py-1 rounded-full border text-xs font-black transition-all cursor-pointer ${
                  settings.sfxEnabled
                    ? 'bg-emerald-600 border-emerald-400 text-white shadow-sm'
                    : 'bg-rose-700 border-rose-500 text-white shadow-sm'
                }`}
              >
                {settings.sfxEnabled ? 'روشن' : 'خاموش'}
              </button>
            </div>
            {settings.sfxEnabled && (
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.sfxVolume}
                onChange={e => handleVolumeChange('sfx', parseFloat(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            )}
          </div>

          {/* Voice */}
          <div className="marine-parchment p-3.5 flex flex-col gap-2 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-950 font-black text-sm">
                <Mic className="w-4 h-4 text-amber-800" />
                <span>صدای فارسی راهنما و تشویق</span>
              </div>
              <button
                onClick={handleToggleVoice}
                className={`px-3 py-1 rounded-full border text-xs font-black transition-all cursor-pointer ${
                  settings.voiceEnabled
                    ? 'bg-emerald-600 border-emerald-400 text-white shadow-sm'
                    : 'bg-rose-700 border-rose-500 text-white shadow-sm'
                }`}
              >
                {settings.voiceEnabled ? 'روشن' : 'خاموش'}
              </button>
            </div>
          </div>
        </div>

        {/* Reset Progress */}
        <div className="pt-2 mb-6 border-t-2 border-amber-950/40">
          {!showConfirmReset ? (
            <button
              onClick={() => {
                audioService.playClick();
                setShowConfirmReset(true);
              }}
              className="w-full py-2.5 bg-rose-950/80 hover:bg-rose-900 border-2 border-rose-500/60 text-rose-100 text-xs font-black rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <RotateCcw className="w-4 h-4 text-rose-300" />
              <span>شروع مجدد بازی از ابتدا (پاک‌کردن پیشرفت مراحل)</span>
            </button>
          ) : (
            <div className="p-3 bg-rose-950/90 border-2 border-rose-500 rounded-[1.5rem_1.75rem_1.4rem_1.6rem] flex flex-col gap-2.5 text-center animate-fade-in shadow-xl">
              <p className="text-xs text-rose-200 font-black leading-relaxed">
                آیا از پاک شدن تمام مراحل گذرانده شده و شروع از مرحله ۱ مطمئن هستید؟
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExecuteReset}
                  className="flex-1 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-black rounded-full transition-colors cursor-pointer shadow"
                >
                  بله، پاک کن
                </button>
                <button
                  onClick={() => setShowConfirmReset(false)}
                  className="flex-1 py-1.5 btn-marine-wood text-amber-200 text-xs font-black rounded-full transition-colors cursor-pointer shadow"
                >
                  انصراف
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Save and Close Button */}
        <button
          onClick={() => {
            audioService.playClick();
            onClose();
          }}
          className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-black text-base rounded-2xl border border-cyan-200 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-lg"
        >
          <Check className="w-5 h-5" />
          <span>تأیید و بازگشت</span>
        </button>
      </div>
    </div>
  );
};
