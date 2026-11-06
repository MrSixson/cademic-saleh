import { PlayerSaveState } from '../types';

const STORAGE_KEY = 'word_sea_adventure_save_v3';

const INITIAL_SAVE_STATE: PlayerSaveState = {
  currentLevel: 1,
  completedLevels: {},
  coins: 0,
  stars: 0,
  selectedCharacterId: 'puki',
  unlockedCharacters: ['puki', 'octo'],
  unlockedBadges: [],
  adaptiveStats: {
    totalQuestions: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentCombo: 0,
    longestCombo: 0,
    averageResponseTimeMs: 0,
    letterMistakes: {},
    wordMistakes: {},
    skillMastery: {},
    timeSpentSeconds: 0,
    recentRecords: []
  },
  settings: {
    musicVolume: 0.6,
    sfxVolume: 0.8,
    voiceVolume: 0.9,
    musicEnabled: true,
    sfxEnabled: true,
    voiceEnabled: true,
    highContrastMode: false
  }
};

export const loadPlayerState = (): PlayerSaveState => {
  try {
    // Clean old storage versions if present
    ['word_sea_adventure_save_v1', 'word_sea_adventure_save_v2'].forEach(k => {
      try { localStorage.removeItem(k); } catch {}
    });

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...INITIAL_SAVE_STATE };
    const parsed = JSON.parse(raw) as Partial<PlayerSaveState>;
    return {
      ...INITIAL_SAVE_STATE,
      ...parsed,
      settings: { ...INITIAL_SAVE_STATE.settings, ...parsed.settings },
      adaptiveStats: { ...INITIAL_SAVE_STATE.adaptiveStats, ...parsed.adaptiveStats },
      completedLevels: parsed.completedLevels || {},
      unlockedCharacters: parsed.unlockedCharacters || INITIAL_SAVE_STATE.unlockedCharacters,
      unlockedBadges: parsed.unlockedBadges || []
    };
  } catch {
    return { ...INITIAL_SAVE_STATE };
  }
};

export const savePlayerState = (state: PlayerSaveState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save player state', err);
  }
};

export const resetPlayerState = (): PlayerSaveState => {
  try {
    localStorage.removeItem('word_sea_adventure_save_v1');
    localStorage.removeItem('word_sea_adventure_save_v2');
    localStorage.removeItem('word_sea_adventure_save_v3');
    localStorage.removeItem(STORAGE_KEY);
    localStorage.clear();
  } catch {}
  return { ...INITIAL_SAVE_STATE };
};
