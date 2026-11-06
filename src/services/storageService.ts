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

const createInitialState = (): PlayerSaveState => JSON.parse(JSON.stringify(INITIAL_SAVE_STATE));

const asNonNegativeNumber = (value: unknown, fallback: number): number => {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
};

const asVolume = (value: unknown, fallback: number): number => {
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(1, Math.max(0, number)) : fallback;
};

export const loadPlayerState = (): PlayerSaveState => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialState();

    const parsed: Partial<PlayerSaveState> = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return createInitialState();
    }

    const base = createInitialState();
    const stats = parsed.adaptiveStats ?? base.adaptiveStats;
    const settings = parsed.settings ?? base.settings;

    return {
      ...base,
      ...parsed,
      currentLevel: Math.max(1, Math.floor(asNonNegativeNumber(parsed.currentLevel, 1))),
      coins: asNonNegativeNumber(parsed.coins, 0),
      stars: asNonNegativeNumber(parsed.stars, 0),
      completedLevels: parsed.completedLevels && typeof parsed.completedLevels === 'object' && !Array.isArray(parsed.completedLevels)
        ? parsed.completedLevels
        : {},
      unlockedCharacters: Array.isArray(parsed.unlockedCharacters) ? parsed.unlockedCharacters.filter((id): id is string => typeof id === 'string') : [...base.unlockedCharacters],
      unlockedBadges: Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges.filter((id): id is string => typeof id === 'string') : [],
      adaptiveStats: {
        ...base.adaptiveStats,
        ...stats,
        totalQuestions: asNonNegativeNumber(stats.totalQuestions, 0),
        correctAnswers: asNonNegativeNumber(stats.correctAnswers, 0),
        incorrectAnswers: asNonNegativeNumber(stats.incorrectAnswers, 0),
        currentCombo: asNonNegativeNumber(stats.currentCombo, 0),
        longestCombo: asNonNegativeNumber(stats.longestCombo, 0),
        averageResponseTimeMs: asNonNegativeNumber(stats.averageResponseTimeMs, 0),
        timeSpentSeconds: asNonNegativeNumber(stats.timeSpentSeconds, 0),
        letterMistakes: stats.letterMistakes && typeof stats.letterMistakes === 'object' ? stats.letterMistakes : {},
        wordMistakes: stats.wordMistakes && typeof stats.wordMistakes === 'object' ? stats.wordMistakes : {},
        skillMastery: stats.skillMastery && typeof stats.skillMastery === 'object' ? stats.skillMastery : {},
        recentRecords: Array.isArray(stats.recentRecords) ? stats.recentRecords : []
      },
      settings: {
        ...base.settings,
        ...settings,
        musicVolume: asVolume(settings.musicVolume, base.settings.musicVolume),
        sfxVolume: asVolume(settings.sfxVolume, base.settings.sfxVolume),
        voiceVolume: asVolume(settings.voiceVolume, base.settings.voiceVolume),
        musicEnabled: typeof settings.musicEnabled === 'boolean' ? settings.musicEnabled : base.settings.musicEnabled,
        sfxEnabled: typeof settings.sfxEnabled === 'boolean' ? settings.sfxEnabled : base.settings.sfxEnabled,
        voiceEnabled: typeof settings.voiceEnabled === 'boolean' ? settings.voiceEnabled : base.settings.voiceEnabled,
        highContrastMode: typeof settings.highContrastMode === 'boolean' ? settings.highContrastMode : base.settings.highContrastMode
      }
    };
  } catch (error) {
    console.error('Unable to load saved game state. Starting with a clean state.', error);
    return createInitialState();
  }
};

export const savePlayerState = (state: PlayerSaveState): void => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save player state. Browser storage may be unavailable or full.', error);
  }
};

export const resetPlayerState = (): PlayerSaveState => {
  try {
    // Only remove this game's save keys. Never clear storage owned by other apps or services.
    ['word_sea_adventure_save_v1', 'word_sea_adventure_save_v2', STORAGE_KEY].forEach(key => {
      window.localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Unable to clear the game save from browser storage.', error);
  }
  return createInitialState();
};
