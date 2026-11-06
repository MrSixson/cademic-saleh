import React, { useMemo } from 'react';
import { EnvironmentTheme } from '../types';
import bikiniBottomBg from '../assets/images/bikini_bottom_bg_1787503379932.jpg';
import pineappleBg from '../assets/images/pineapple_bg_1787504057995.jpg';
import jellyfishFieldsBg from '../assets/images/jellyfish_fields_bg_1787504073235.jpg';
import krustyKrabBg from '../assets/images/krusty_krab_bg_1787504086571.jpg';
import sandysTreedomeBg from '../assets/images/sandys_treedome_bg_1787504098635.jpg';
import neptunePalaceBg from '../assets/images/neptune_palace_bg_1787504113369.jpg';

interface UnderwaterBackgroundProps {
  theme?: EnvironmentTheme;
  children?: React.ReactNode;
  interactive?: boolean;
}

export const UnderwaterBackground: React.FC<UnderwaterBackgroundProps> = ({
  theme = 'pineapple_home',
  children
}) => {
  // Select authentic SpongeBob backdrop according to theme/zone
  const themeImage = useMemo(() => {
    switch (theme) {
      case 'pineapple_home':
      case 'coral_reef':
      case 'boating_school':
        return pineappleBg;
      case 'jellyfish_fields':
      case 'jellyfish_zone':
        return jellyfishFieldsBg;
      case 'krusty_krab':
      case 'sunken_ship':
      case 'gary_library':
        return krustyKrabBg;
      case 'sandy_dome':
      case 'octopus_cave':
        return sandysTreedomeBg;
      case 'neptune_palace':
      case 'deep_bikini_reef':
      case 'crystal_abyss':
      case 'ancient_palace':
        return neptunePalaceBg;
      default:
        return bikiniBottomBg;
    }
  }, [theme]);

  // SpongeBob / Bikini Bottom Cartoon gradient accents
  const themeGradients: Record<EnvironmentTheme, string> = {
    pineapple_home: 'from-sky-500/30 via-cyan-600/40 to-slate-950/80',
    jellyfish_fields: 'from-fuchsia-500/20 via-cyan-600/40 to-slate-950/80',
    boating_school: 'from-sky-600/30 via-blue-700/40 to-slate-950/80',
    krusty_krab: 'from-amber-500/25 via-red-900/40 to-slate-950/80',
    sandy_dome: 'from-emerald-500/25 via-teal-800/40 to-slate-950/80',
    gary_library: 'from-pink-500/20 via-indigo-900/40 to-slate-950/80',
    deep_bikini_reef: 'from-blue-700/30 via-slate-900/60 to-slate-950/90',
    neptune_palace: 'from-amber-400/30 via-yellow-700/40 to-slate-950/85',
    // Fallback aliases
    coral_reef: 'from-sky-500/30 via-cyan-600/40 to-slate-950/80',
    jellyfish_zone: 'from-fuchsia-500/20 via-cyan-600/40 to-slate-950/80',
    octopus_cave: 'from-sky-600/30 via-blue-700/40 to-slate-950/80',
    sunken_ship: 'from-amber-500/25 via-red-900/40 to-slate-950/80',
    crystal_abyss: 'from-blue-700/30 via-slate-900/60 to-slate-950/90',
    ancient_palace: 'from-amber-400/30 via-yellow-700/40 to-slate-950/85'
  };

  // SpongeBob Sky Flower Clouds
  const flowerClouds = useMemo(() => {
    return [
      { id: 1, top: '8%', left: '8%', size: 90, color: '#f472b6', fill: '#fbcfe8', delay: '0s', duration: '18s' },
      { id: 2, top: '16%', right: '12%', size: 110, color: '#38bdf8', fill: '#bae6fd', delay: '3s', duration: '22s' },
      { id: 3, top: '4%', left: '45%', size: 80, color: '#fde047', fill: '#fef08a', delay: '6s', duration: '19s' },
      { id: 4, top: '28%', left: '78%', size: 95, color: '#c084fc', fill: '#e9d5ff', delay: '1s', duration: '24s' },
      { id: 5, top: '35%', left: '5%', size: 85, color: '#4ade80', fill: '#bbf7d0', delay: '4s', duration: '20s' }
    ];
  }, []);

  // Randomized Cartoon bubbles
  const bubbles = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: `${(i * 6.2 + Math.random() * 4) % 95}%`,
      size: `${14 + (i % 5) * 8}px`,
      duration: `${6 + (i % 5) * 2}s`,
      delay: `${(i * 0.8) % 4.5}s`,
      opacity: 0.45 + (i % 4) * 0.15
    }));
  }, []);

  // Floating cartoon jellyfishes
  const cartoonJellies = useMemo(() => {
    return [
      { id: 1, top: '18%', left: '82%', delay: '0s', scale: 0.85 },
      { id: 2, top: '38%', left: '12%', delay: '1.5s', scale: 0.7 },
      { id: 3, top: '65%', left: '88%', delay: '3s', scale: 0.9 }
    ];
  }, []);

  return (
    <div className={`relative min-h-screen w-full overflow-hidden bg-slate-950 transition-colors duration-1000 select-none`}>
      {/* Authentic SpongeBob High-Resolution Artwork Backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <img
          src={themeImage}
          alt="Bikini Bottom Scene"
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-105 transition-opacity duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Cartoon undersea color grading overlay */}
        <div className={`absolute inset-0 bg-gradient-to-b ${themeGradients[theme] || themeGradients.pineapple_home} mix-blend-multiply transition-colors duration-1000`} />
        {/* Soft radial vignette for clear UI contrast and focus */}
        <div className="absolute inset-0 bg-radial from-transparent via-slate-950/20 to-slate-950/70 pointer-events-none" />
      </div>

      {/* SpongeBob Signature Flower Clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-60">
        {flowerClouds.map(f => (
          <div
            key={f.id}
            className="absolute animate-flower-float"
            style={{
              top: f.top,
              left: f.left,
              right: f.right,
              width: `${f.size}px`,
              height: `${f.size}px`,
              animationDelay: f.delay,
              animationDuration: f.duration
            }}
          >
            {/* SpongeBob Flower Outline SVG */}
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              <g stroke={f.color} strokeWidth="6" fill={f.fill} strokeLinecap="round" strokeLinejoin="round">
                {/* 5 Petals */}
                <circle cx="50" cy="22" r="18" />
                <circle cx="76" cy="42" r="18" />
                <circle cx="66" cy="74" r="18" />
                <circle cx="34" cy="74" r="18" />
                <circle cx="24" cy="42" r="18" />
                {/* Flower Center */}
                <circle cx="50" cy="50" r="16" fill="#ffffff" stroke={f.color} strokeWidth="5" />
              </g>
            </svg>
          </div>
        ))}
      </div>

      {/* Floating Cartoon Bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {bubbles.map(b => (
          <div
            key={b.id}
            className="absolute bottom-0 rounded-full border-2 border-white/80 bg-cyan-200/30 backdrop-blur-xs"
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              animation: `bubbleFloat ${b.duration} infinite linear`,
              animationDelay: b.delay,
              opacity: b.opacity,
              boxShadow: 'inset -2px -2px 6px rgba(255,255,255,0.9), 0 0 10px rgba(56,189,248,0.5)'
            }}
          >
            {/* Bubble shine */}
            <div className="absolute top-1 left-1.5 w-1.5 h-1.5 bg-white rounded-full opacity-90" />
          </div>
        ))}
      </div>

      {/* Ambient Cartoon Jellyfishes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {cartoonJellies.map(j => (
          <div
            key={j.id}
            className="absolute animate-jelly-wobble"
            style={{
              top: j.top,
              left: j.left,
              animationDelay: j.delay,
              transform: `scale(${j.scale})`
            }}
          >
            <svg width="60" height="70" viewBox="0 0 60 70" fill="none" opacity="0.65" className="drop-shadow-lg">
              {/* Jelly Bell */}
              <path
                d="M 10 32 C 10 12, 50 12, 50 32 C 45 36, 40 32, 30 35 C 20 32, 15 36, 10 32 Z"
                fill="#f472b6"
                stroke="#db2777"
                strokeWidth="3"
              />
              {/* Jelly Spots */}
              <circle cx="24" cy="22" r="3" fill="#fbcfe8" />
              <circle cx="36" cy="20" r="3.5" fill="#fbcfe8" />
              <circle cx="30" cy="28" r="2.5" fill="#fbcfe8" />
              {/* Tentacles */}
              <path d="M 18 35 Q 15 50 20 65" stroke="#db2777" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M 26 36 Q 30 52 24 68" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M 34 36 Q 32 52 38 68" stroke="#db2777" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M 42 35 Q 45 50 40 65" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        ))}
      </div>

      {/* Bikini Bottom Sandy Floor & Coral Reef */}
      <div className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none overflow-hidden z-0">
        {/* Sandy bed with warm cartoon colors */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-600 via-amber-400 to-transparent opacity-85" />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-amber-400 border-t-4 border-amber-600" />

        {/* Corner kelp removed: the previous cropped bars competed with the interface. */}

        {/* Cute Starfish & Clam on sand */}
        <div className="absolute bottom-2 left-1/3 opacity-90 hidden sm:block">
          <svg width="40" height="40" viewBox="0 0 40 40">
            <polygon
              points="20,5 24,15 35,16 27,24 29,35 20,29 11,35 13,24 5,16 16,15"
              fill="#fb923c"
              stroke="#c2410c"
              strokeWidth="2.5"
            />
            <circle cx="17" cy="18" r="1.5" fill="#431407" />
            <circle cx="23" cy="18" r="1.5" fill="#431407" />
          </svg>
        </div>

        {/* Corner kelp removed for a cleaner, unobstructed frame. */}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
};

