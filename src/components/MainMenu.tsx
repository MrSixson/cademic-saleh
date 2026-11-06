import React from 'react';
import { PlayerSaveState, GameScreen } from '../types';
import { GAME_LEVELS } from '../data/levels';
import { getCharacterById } from '../data/characters';
import { CharacterAvatar } from './CharacterAvatar';
import { audioService } from '../services/audioService';
import {
  Play, Map, Trophy, UserCheck, Settings, Sparkles, Info, Star, Coins,
  BookOpen, Waves, ArrowUpLeft, Compass
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
  const completedCount = Object.keys(playerState.completedLevels).length;
  const totalLevels = GAME_LEVELS.length;
  const progress = totalLevels > 0 ? Math.min(100, Math.round((completedCount / totalLevels) * 100)) : 0;
  const isNewGame = completedCount === 0;

  const navigate = (screen: GameScreen) => {
    audioService.playClick();
    onNavigate(screen);
  };

  return (
    <div className="home-screen flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-8 flex flex-col z-20 select-none">
      <header className="home-topbar">
        <div className="home-brand">
          <div className="home-brand-mark"><Waves size={22} /></div>
          <div>
            <span className="home-eyebrow">دنیای یادگیری و ماجراجویی</span>
            <strong>دریای کلمات</strong>
          </div>
        </div>

        <div className="home-stats" aria-label="امتیازهای بازیکن">
          <div className="home-stat home-stat-star"><Star size={17} fill="currentColor" /><span>{playerState.stars}</span><small>ستاره</small></div>
          <div className="home-stat home-stat-coin"><Coins size={17} /><span>{playerState.coins}</span><small>سکه</small></div>
        </div>

        <div className="home-top-actions">
          <button className="home-icon-button" onClick={() => navigate('settings')} aria-label="تنظیمات" title="تنظیمات"><Settings size={19} /></button>
          <button className="home-icon-button" onClick={() => navigate('credits')} aria-label="درباره بازی" title="درباره بازی"><Info size={19} /></button>
        </div>
      </header>

      <main className="home-hero">
        <section className="home-copy">
          <div className="home-kicker"><span className="home-kicker-dot" /> ماجراجویی آموزشی فارسی</div>
          <h1>یادگیری، این‌بار<br /><span>زیر آب شروع می‌شود!</span></h1>
          <p className="home-description">
            وارد دنیای رنگارنگ کلمات شو، با دوستان دریایی بازی کن و هر مرحله یک مهارت تازه یاد بگیر.
          </p>

          <div className="home-hero-actions">
            <button className="home-primary-button" onClick={() => { audioService.playClick(); onStartAdventure(); }}>
              <span className="home-play-icon"><Play size={19} fill="currentColor" /></span>
              <span>{isNewGame ? 'شروع ماجراجویی' : 'ادامه ماجراجویی'}</span>
              <ArrowUpLeft size={19} />
            </button>
            <button className="home-secondary-button" onClick={() => navigate('map')}>
              <Compass size={18} /> مشاهده نقشه مراحل
            </button>
          </div>

          <div className="home-progress-card">
            <div className="home-progress-heading">
              <span><BookOpen size={16} /> مسیر یادگیری تو</span>
              <strong>{completedCount} از {totalLevels} مرحله</strong>
            </div>
            <div className="home-progress-track"><span style={{ width: `${progress}%` }} /></div>
            <div className="home-progress-foot"><span>{progress}% پیشرفت</span><span>{completedCount ? 'ادامه بده، قهرمان!' : 'اولین مرحله منتظر توست'}</span></div>
          </div>
        </section>

        <section className="home-character-stage" aria-label="شخصیت همراه">
          <div className="home-orbit home-orbit-one" />
          <div className="home-orbit home-orbit-two" />
          <div className="home-bubble home-bubble-one">✦</div>
          <div className="home-bubble home-bubble-two">✧</div>
          <div className="home-character-glow" />
          <button
            className="home-character-button"
            onClick={() => navigate('characterSelect')}
            title="تغییر شخصیت همراه"
          >
            <CharacterAvatar character={currentCompanion} mood="celebration" size="xl" />
          </button>
          <button className="home-companion-tag" onClick={() => navigate('characterSelect')}>
            <span>همراه ماجراجویی تو</span>
            <strong>{currentCompanion.namePersian}</strong>
            <span className="home-companion-edit">تغییر شخصیت</span>
          </button>
          <div className="home-floating-note"><Sparkles size={15} /> هر جواب درست، یک قدم جلوتر!</div>
        </section>
      </main>

      <section className="home-shortcuts" aria-label="بخش‌های بازی">
        <button className="home-shortcut home-shortcut-blue" onClick={() => navigate('characterSelect')}>
          <span className="home-shortcut-icon">🐚</span><span><strong>دوستان دریایی</strong><small>انتخاب همراه بازی</small></span><ArrowUpLeft size={17} />
        </button>
        <button className="home-shortcut home-shortcut-gold" onClick={() => navigate('achievements')}>
          <span className="home-shortcut-icon">🏆</span><span><strong>تالار افتخارات</strong><small>مدال‌ها و پاداش‌ها</small></span><ArrowUpLeft size={17} />
        </button>
        <button className="home-shortcut home-shortcut-violet" onClick={() => navigate('parentDashboard')}>
          <span className="home-shortcut-icon">📘</span><span><strong>گزارش یادگیری</strong><small>ویژه والدین و آموزگار</small></span><ArrowUpLeft size={17} />
        </button>
      </section>

      <footer className="home-footer">
        <span>آموزگار و ناظر آموزشی: آرزو صالح</span>
        <i />
        <span>طراحی و توسعه: امین جدایی</span>
      </footer>
    </div>
  );
};
