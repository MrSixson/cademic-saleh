import React from 'react';
import { Character } from '../types';

export type CharacterMood = 'idle' | 'happy' | 'thinking' | 'excited' | 'funny_fail' | 'victory' | 'celebration';

interface CharacterAvatarProps {
  character: Character;
  mood?: CharacterMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  character,
  mood = 'idle',
  size = 'md',
  className = '',
  animate = true
}) => {
  const sizeMap = {
    sm: 'w-14 h-14',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48'
  };

  const getMoodTransform = () => {
    if (!animate) return '';
    switch (mood) {
      case 'happy':
      case 'excited':
        return 'animate-cartoon-bounce';
      case 'celebration':
      case 'victory':
        return 'animate-jelly-wobble scale-110';
      case 'funny_fail':
        return 'rotate-12 transition-transform duration-300';
      case 'thinking':
        return '-rotate-6 transition-transform duration-300';
      default:
        return 'animate-float-gentle';
    }
  };

  // Render cartoon SpongeBob styled SVG characters
  const renderSvg = () => {
    switch (character.avatarSvgType) {
      // 1. SPONGEBOB SQUAREPANTS (باب اسفنجی)
      case 'spongebob':
      case 'puki_fish':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl select-none">
            <defs>
              <linearGradient id="sbYellow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="60%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
              <filter id="spongeShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#713f12" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* Wavy Yellow Sponge Body */}
            <path
              d="M 28 20 Q 60 16 92 20 Q 96 55 90 80 Q 60 84 30 80 Q 24 55 28 20 Z"
              fill="url(#sbYellow)"
              stroke="#713f12"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            {/* Sponge Pores / Green-brown circles */}
            <circle cx="34" cy="30" r="4.5" fill="#ca8a04" opacity="0.65" />
            <circle cx="86" cy="32" r="3.5" fill="#ca8a04" opacity="0.65" />
            <circle cx="35" cy="70" r="4" fill="#ca8a04" opacity="0.65" />
            <circle cx="84" cy="68" r="5" fill="#ca8a04" opacity="0.65" />
            <circle cx="48" cy="22" r="2.5" fill="#ca8a04" opacity="0.5" />
            <circle cx="72" cy="24" r="3" fill="#ca8a04" opacity="0.5" />

            {/* White Shirt Collar & Pants */}
            <rect x="30" y="80" width="60" height="12" fill="#ffffff" stroke="#713f12" strokeWidth="3.5" />
            <rect x="30" y="92" width="60" height="14" fill="#854d0e" stroke="#713f12" strokeWidth="3.5" />

            {/* Black Belt Dashes */}
            <rect x="36" y="94" width="7" height="3" fill="#1c1917" />
            <rect x="49" y="94" width="7" height="3" fill="#1c1917" />
            <rect x="64" y="94" width="7" height="3" fill="#1c1917" />
            <rect x="77" y="94" width="7" height="3" fill="#1c1917" />

            {/* Red Tie */}
            <polygon points="56,80 64,80 62,94 60,98 58,94" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />

            {/* Big Blue Cartoon Eyes */}
            {/* Left Eye */}
            <circle cx="46" cy="46" r="14" fill="#ffffff" stroke="#713f12" strokeWidth="3.5" />
            <circle cx="47" cy="46" r="6" fill="#38bdf8" />
            <circle cx="47" cy="46" r="3" fill="#0f172a" />
            <circle cx="49" cy="44" r="1.5" fill="#ffffff" />
            {/* Left Eyelashes */}
            <line x1="40" y1="32" x2="38" y2="26" stroke="#713f12" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="46" y1="31" x2="46" y2="24" stroke="#713f12" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="52" y1="32" x2="54" y2="26" stroke="#713f12" strokeWidth="2.5" strokeLinecap="round" />

            {/* Right Eye */}
            <circle cx="74" cy="46" r="14" fill="#ffffff" stroke="#713f12" strokeWidth="3.5" />
            <circle cx="73" cy="46" r="6" fill="#38bdf8" />
            <circle cx="73" cy="46" r="3" fill="#0f172a" />
            <circle cx="75" cy="44" r="1.5" fill="#ffffff" />
            {/* Right Eyelashes */}
            <line x1="68" y1="32" x2="66" y2="26" stroke="#713f12" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="74" y1="31" x2="74" y2="24" stroke="#713f12" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="80" y1="32" x2="82" y2="26" stroke="#713f12" strokeWidth="2.5" strokeLinecap="round" />

            {/* Cute Long Nose */}
            <path d="M 57 48 C 55 52, 65 52, 63 48" fill="none" stroke="#ca8a04" strokeWidth="3.5" strokeLinecap="round" />
            <ellipse cx="60" cy="50" rx="3.5" ry="5.5" fill="#facc15" stroke="#713f12" strokeWidth="2.5" />

            {/* Cheeks with Freckles */}
            <circle cx="36" cy="54" r="6.5" fill="#f87171" stroke="#dc2626" strokeWidth="2" opacity="0.8" />
            <circle cx="35" cy="53" r="1" fill="#7f1d1d" />
            <circle cx="37" cy="55" r="1" fill="#7f1d1d" />

            <circle cx="84" cy="54" r="6.5" fill="#f87171" stroke="#dc2626" strokeWidth="2" opacity="0.8" />
            <circle cx="83" cy="53" r="1" fill="#7f1d1d" />
            <circle cx="85" cy="55" r="1" fill="#7f1d1d" />

            {/* Cheerful Smile with 2 Front Teeth */}
            <path d="M 38 56 Q 60 76 82 56" fill="#881337" stroke="#713f12" strokeWidth="3.5" strokeLinecap="round" />
            {/* Teeth */}
            <rect x="52" y="60" width="6" height="7" fill="#ffffff" stroke="#713f12" strokeWidth="2" rx="1" />
            <rect x="62" y="60" width="6" height="7" fill="#ffffff" stroke="#713f12" strokeWidth="2" rx="1" />
            {/* Tongue */}
            <path d="M 52 68 Q 60 74 68 68" fill="#f43f5e" />
          </svg>
        );

      // 2. PATRICK STAR (پاتریک ستاره)
      case 'patrick':
      case 'starry_starfish':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl select-none">
            <defs>
              <linearGradient id="patPink" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fca5a5" />
                <stop offset="50%" stopColor="#f87171" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>

            {/* Pointed Head & Star Body */}
            <path
              d="M 60 12 Q 78 45 92 65 Q 98 85 88 102 Q 60 106 32 102 Q 22 85 28 65 Q 42 45 60 12 Z"
              fill="url(#patPink)"
              stroke="#991b1b"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            {/* Patrick Green Flowered Shorts */}
            <path
              d="M 32 84 Q 60 88 88 84 L 92 106 Q 60 112 28 106 Z"
              fill="#84cc16"
              stroke="#3f6212"
              strokeWidth="3.5"
            />
            {/* Purple flowers on shorts */}
            <circle cx="45" cy="95" r="3.5" fill="#a855f7" />
            <circle cx="72" cy="96" r="4" fill="#a855f7" />
            <circle cx="58" cy="102" r="3" fill="#a855f7" />

            {/* Eyes */}
            <ellipse cx="53" cy="40" rx="6" ry="9" fill="#ffffff" stroke="#991b1b" strokeWidth="2.5" />
            <circle cx="54" cy="40" r="3" fill="#0f172a" />
            <ellipse cx="67" cy="40" rx="6" ry="9" fill="#ffffff" stroke="#991b1b" strokeWidth="2.5" />
            <circle cx="66" cy="40" r="3" fill="#0f172a" />

            {/* Thick Z-shaped Eyebrows */}
            <path d="M 46 28 L 52 30 L 56 28" stroke="#991b1b" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 64 28 L 68 30 L 74 28" stroke="#991b1b" strokeWidth="3" strokeLinecap="round" fill="none" />

            {/* Belly Button */}
            <path d="M 58 72 Q 60 76 62 72" stroke="#991b1b" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Big Silly Smile */}
            <path d="M 44 54 Q 60 72 76 54" fill="#881337" stroke="#991b1b" strokeWidth="3" strokeLinecap="round" />
            <path d="M 52 62 Q 60 67 68 62" fill="#f43f5e" />
          </svg>
        );

      // 3. SQUIDWARD TENTACLES (اختاپوس دانا)
      case 'squidward':
      case 'octo_octopus':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl select-none">
            <defs>
              <linearGradient id="sqTeal" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a7f3d0" />
                <stop offset="50%" stopColor="#5eead4" />
                <stop offset="100%" stopColor="#2dd4bf" />
              </linearGradient>
            </defs>

            {/* Bulbous Head */}
            <ellipse cx="60" cy="40" rx="30" ry="26" fill="url(#sqTeal)" stroke="#0f766e" strokeWidth="4" />

            {/* Brown Polo Collar */}
            <path d="M 42 86 L 60 92 L 78 86 L 82 108 L 38 108 Z" fill="#92400e" stroke="#451a03" strokeWidth="3" />
            <polygon points="54,86 60,94 66,86" fill="#fef08a" stroke="#713f12" strokeWidth="1.5" />

            {/* Neck */}
            <rect x="52" y="64" width="16" height="24" fill="#2dd4bf" stroke="#0f766e" strokeWidth="3.5" />

            {/* Drooping Big Nose */}
            <ellipse cx="60" cy="56" rx="9" ry="16" fill="#2dd4bf" stroke="#0f766e" strokeWidth="3.5" />

            {/* Half-Lidded Eyes */}
            <ellipse cx="44" cy="40" rx="9" ry="11" fill="#fef08a" stroke="#0f766e" strokeWidth="2.5" />
            <rect x="42" y="39" width="4" height="2" fill="#991b1b" rx="1" />
            <path d="M 35 36 Q 44 42 53 36" fill="#2dd4bf" stroke="#0f766e" strokeWidth="2.5" />

            <ellipse cx="76" cy="40" rx="9" ry="11" fill="#fef08a" stroke="#0f766e" strokeWidth="2.5" />
            <rect x="74" y="39" width="4" height="2" fill="#991b1b" rx="1" />
            <path d="M 67 36 Q 76 42 85 36" fill="#2dd4bf" stroke="#0f766e" strokeWidth="2.5" />

            {/* Smug / Scholarly Smile */}
            <path d="M 48 70 Q 60 74 72 70" stroke="#0f766e" strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>
        );

      // 4. MR. KRABS (آقای خرچنگ زرنگ)
      case 'mr_krabs':
      case 'changool_crab':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl select-none">
            <defs>
              <linearGradient id="krabRed" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="60%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>
            </defs>

            {/* Tall Stalk Eyes */}
            <rect x="46" y="12" width="8" height="26" fill="#dc2626" stroke="#7f1d1d" strokeWidth="2.5" rx="3" />
            <ellipse cx="50" cy="18" rx="6" ry="9" fill="#ffffff" stroke="#7f1d1d" strokeWidth="2" />
            <circle cx="50" cy="18" r="2.5" fill="#0f172a" />

            <rect x="66" y="12" width="8" height="26" fill="#dc2626" stroke="#7f1d1d" strokeWidth="2.5" rx="3" />
            <ellipse cx="70" cy="18" rx="6" ry="9" fill="#ffffff" stroke="#7f1d1d" strokeWidth="2" />
            <circle cx="70" cy="18" r="2.5" fill="#0f172a" />

            {/* Claws */}
            <circle cx="20" cy="50" r="14" fill="url(#krabRed)" stroke="#7f1d1d" strokeWidth="3" />
            <path d="M 12 44 Q 22 50 12 56 Z" fill="#ffffff" />

            <circle cx="100" cy="50" r="14" fill="url(#krabRed)" stroke="#7f1d1d" strokeWidth="3" />
            <path d="M 108 44 Q 98 50 108 56 Z" fill="#ffffff" />

            {/* Body */}
            <ellipse cx="60" cy="66" rx="32" ry="24" fill="url(#krabRed)" stroke="#7f1d1d" strokeWidth="3.5" />

            {/* Blue Shirt & Belt */}
            <path d="M 34 76 Q 60 84 86 76 L 84 94 Q 60 100 36 94 Z" fill="#38bdf8" stroke="#0369a1" strokeWidth="3" />
            <rect x="36" y="92" width="48" height="10" fill="#1e1b4b" stroke="#0f172a" strokeWidth="2" />
            <rect x="56" y="90" width="8" height="14" fill="#facc15" stroke="#713f12" strokeWidth="2" />

            {/* Toothy Grin */}
            <path d="M 44 58 Q 60 72 76 58" fill="#ffffff" stroke="#7f1d1d" strokeWidth="3" />
            <line x1="52" y1="60" x2="52" y2="66" stroke="#7f1d1d" strokeWidth="2" />
            <line x1="60" y1="61" x2="60" y2="67" stroke="#7f1d1d" strokeWidth="2" />
            <line x1="68" y1="60" x2="68" y2="66" stroke="#7f1d1d" strokeWidth="2" />
          </svg>
        );

      // 5. SANDY CHEEKS (سندی ماجراجو)
      case 'sandy':
      case 'dana_turtle':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl select-none">
            {/* Clear Diving Glass Dome */}
            <circle cx="60" cy="46" r="32" fill="#e0f2fe" opacity="0.65" stroke="#38bdf8" strokeWidth="3.5" />
            {/* Flower on Dome */}
            <g transform="translate(76, 18) scale(0.6)">
              <circle cx="10" cy="10" r="12" fill="#ec4899" stroke="#9d174d" strokeWidth="3" />
              <circle cx="10" cy="10" r="4" fill="#facc15" />
            </g>

            {/* Squirrel Head inside Dome */}
            <ellipse cx="60" cy="48" rx="20" ry="18" fill="#d97706" stroke="#78350f" strokeWidth="3" />
            <ellipse cx="60" cy="52" rx="14" ry="11" fill="#fde68a" />
            {/* Ears */}
            <ellipse cx="44" cy="32" rx="6" ry="8" fill="#d97706" stroke="#78350f" strokeWidth="2" />
            <ellipse cx="76" cy="32" rx="6" ry="8" fill="#d97706" stroke="#78350f" strokeWidth="2" />

            {/* Eyes */}
            <circle cx="53" cy="46" r="4" fill="#ffffff" stroke="#78350f" strokeWidth="1.5" />
            <circle cx="53" cy="46" r="2" fill="#0f172a" />
            <circle cx="67" cy="46" r="4" fill="#ffffff" stroke="#78350f" strokeWidth="1.5" />
            <circle cx="67" cy="46" r="2" fill="#0f172a" />

            {/* Nose & Buck Teeth */}
            <circle cx="60" cy="50" r="2.5" fill="#451a03" />
            <rect x="58" y="54" width="4" height="4" fill="#ffffff" stroke="#451a03" strokeWidth="1" />

            {/* White Diving Suit Body */}
            <path d="M 38 78 Q 60 72 82 78 L 86 108 Q 60 114 34 108 Z" fill="#ffffff" stroke="#475569" strokeWidth="3.5" />
            {/* Acorn Badge */}
            <ellipse cx="60" cy="92" rx="5" ry="6" fill="#d97706" stroke="#78350f" strokeWidth="1.5" />
            <path d="M 55 88 Q 60 85 65 88" stroke="#78350f" strokeWidth="2" fill="#78350f" />
          </svg>
        );

      // 6. GARY THE SNAIL (گری حلزون باهوش)
      case 'gary':
      case 'jelly_jellyfish':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl select-none">
            {/* Pink Shell with red dots */}
            <circle cx="70" cy="52" r="26" fill="#f472b6" stroke="#db2777" strokeWidth="4" />
            {/* Spiral & Dots on Shell */}
            <path d="M 70 52 M 70 38 A 14 14 0 1 1 58 58" fill="none" stroke="#be185d" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="82" cy="44" r="3.5" fill="#38bdf8" />
            <circle cx="60" cy="62" r="3" fill="#38bdf8" />

            {/* Teal Snail Foot / Body */}
            <path d="M 24 88 Q 60 76 98 88 Q 94 98 30 98 Z" fill="#5eead4" stroke="#0f766e" strokeWidth="3.5" />

            {/* Eye Stalks */}
            <line x1="36" y1="78" x2="32" y2="38" stroke="#5eead4" strokeWidth="5" strokeLinecap="round" />
            <circle cx="32" cy="34" r="9" fill="#ffffff" stroke="#0f766e" strokeWidth="2.5" />
            <circle cx="32" cy="34" r="4.5" fill="#ef4444" />
            <circle cx="32" cy="34" r="2" fill="#0f172a" />

            <line x1="46" y1="78" x2="48" y2="44" stroke="#5eead4" strokeWidth="5" strokeLinecap="round" />
            <circle cx="48" cy="40" r="9" fill="#ffffff" stroke="#0f766e" strokeWidth="2.5" />
            <circle cx="48" cy="40" r="4.5" fill="#ef4444" />
            <circle cx="48" cy="40" r="2" fill="#0f172a" />
          </svg>
        );

      // 7. PLANKTON (پلانکتون شیطون و پرانرژی)
      case 'plankton':
      case 'sharky_shark':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl select-none">
            {/* Antennas */}
            <path d="M 52 38 Q 42 16 34 18" stroke="#14532d" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <line x1="34" y1="18" x2="32" y2="24" stroke="#14532d" strokeWidth="2.5" />
            <line x1="38" y1="20" x2="36" y2="26" stroke="#14532d" strokeWidth="2.5" />

            <path d="M 68 38 Q 78 16 86 18" stroke="#14532d" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <line x1="86" y1="18" x2="84" y2="24" stroke="#14532d" strokeWidth="2.5" />
            <line x1="82" y1="20" x2="80" y2="26" stroke="#14532d" strokeWidth="2.5" />

            {/* Green Bean Body */}
            <ellipse cx="60" cy="65" rx="22" ry="32" fill="#16a34a" stroke="#14532d" strokeWidth="4" />

            {/* Single Big Red Eye */}
            <circle cx="60" cy="56" r="13" fill="#fef08a" stroke="#14532d" strokeWidth="3" />
            <circle cx="60" cy="56" r="6.5" fill="#dc2626" />
            <circle cx="60" cy="56" r="3" fill="#0f172a" />
            <circle cx="62" cy="54" r="1.5" fill="#ffffff" />

            {/* Bushy Uni-brow */}
            <path d="M 45 44 Q 60 48 75 44" stroke="#14532d" strokeWidth="3.5" fill="none" strokeLinecap="round" />

            {/* Mischievous Grin */}
            <path d="M 50 78 Q 60 88 70 78" stroke="#14532d" strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>
        );

      // 8. KING NEPTUNE (پادشاه نپتون / نهنگ زرین)
      case 'king_neptune':
      case 'esbi_seahorse':
      default:
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl select-none">
            {/* Golden Trident in background */}
            <line x1="95" y1="20" x2="95" y2="105" stroke="#ca8a04" strokeWidth="3.5" />
            <path d="M 88 28 L 88 20 L 95 15 L 102 20 L 102 28 M 95 15 L 95 32" stroke="#eab308" strokeWidth="3" fill="none" />

            {/* Powerful Green Torso & Tail */}
            <ellipse cx="56" cy="70" rx="28" ry="24" fill="#059669" stroke="#064e3b" strokeWidth="3.5" />
            <path d="M 40 88 Q 56 108 30 112 Q 70 114 72 88 Z" fill="#10b981" stroke="#064e3b" strokeWidth="3" />

            {/* Head & Majestic Beard */}
            <circle cx="56" cy="46" r="18" fill="#fed7aa" stroke="#7c2d12" strokeWidth="2.5" />
            <path d="M 40 50 Q 56 75 72 50 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />

            {/* Golden Crown */}
            <polygon points="42,32 46,20 56,26 66,20 70,32" fill="#facc15" stroke="#854d0e" strokeWidth="2.5" />
            <circle cx="56" cy="27" r="2" fill="#ef4444" />

            {/* Eyes & Smile */}
            <circle cx="50" cy="44" r="2.5" fill="#0f172a" />
            <circle cx="62" cy="44" r="2.5" fill="#0f172a" />
            <path d="M 52 54 Q 56 58 60 54" stroke="#7c2d12" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        );
    }
  };

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${sizeMap[size]} ${getMoodTransform()} ${className}`}>
      {character.imageUrl ? (
        <div className="relative w-full h-full rounded-full overflow-hidden border-3 border-yellow-400/90 shadow-xl shadow-yellow-500/30 bg-amber-950/60 p-0.5">
          <img
            src={character.imageUrl}
            alt={character.namePersian}
            className="w-full h-full object-cover rounded-full transform transition-transform hover:scale-110 duration-300"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        renderSvg()
      )}
    </div>
  );
};

