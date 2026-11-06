import React from 'react';
import { Zap, Flame, Sparkles } from 'lucide-react';

interface ComboBannerProps {
  combo: number;
}

export const ComboBanner: React.FC<ComboBannerProps> = ({ combo }) => {
  if (combo < 2) return null;

  const getComboDetails = () => {
    if (combo >= 8) {
      return {
        label: 'طوفان کلمات! 🔥',
        color: 'from-amber-500 via-rose-500 to-purple-600',
        borderColor: 'border-amber-300',
        textColor: 'text-amber-200'
      };
    }
    if (combo >= 5) {
      return {
        label: 'فوق‌العاده! ⚡',
        color: 'from-cyan-500 via-teal-500 to-emerald-500',
        borderColor: 'border-cyan-300',
        textColor: 'text-cyan-100'
      };
    }
    return {
      label: 'پاسخ پیاپی! ✨',
      color: 'from-blue-600 to-cyan-500',
      borderColor: 'border-blue-300',
      textColor: 'text-blue-100'
    };
  };

  const details = getComboDetails();

  return (
    <div
      className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 animate-bounce pointer-events-none"
      id="combo-banner"
    >
      <div
        className={`flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r ${details.color} border-2 ${details.borderColor} shadow-2xl backdrop-blur-md text-white font-black`}
        style={{
          boxShadow: '0 0 25px rgba(245, 158, 11, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.6)'
        }}
      >
        {combo >= 5 ? <Flame className="w-6 h-6 text-amber-300 animate-pulse" /> : <Zap className="w-5 h-5 text-yellow-300" />}
        <span className="text-xl sm:text-2xl font-display tracking-wider font-extrabold">
          {combo}x کمبو!
        </span>
        <span className={`text-xs sm:text-sm font-bold ${details.textColor} hidden sm:inline`}>
          {details.label}
        </span>
        <Sparkles className="w-4 h-4 text-white animate-spin" />
      </div>
    </div>
  );
};
