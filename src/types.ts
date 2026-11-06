export type GameScreen =
  | 'intro'
  | 'menu'
  | 'map'
  | 'gameplay'
  | 'parentDashboard'
  | 'achievements'
  | 'credits'
  | 'characterSelect'
  | 'finalCelebration'
  | 'settings';

export type LevelMechanic =
  | 'image_spelling_quiz'
  | 'visual_memory_order'
  | 'find_new_word'
  | 'find_missing_word'
  | 'visual_difference'
  | 'spelling_choice'
  | 'bubble_hunter'
  | 'scrambled_letters_word'
  | 'scrambled_letters_image'
  | 'missing_letter'
  | 'similar_letters_discrim'
  | 'four_form_letters'
  | 'similar_words_precision'
  | 'flash_memory'
  | 'memory_and_spelling'
  | 'moving_bubbles'
  | 'speed_hunt'
  | 'combination_challenge'
  | 'treasure_words'
  | 'tashdid_hunter'
  | 'negareh_sound_match'
  | 'khwa_exception'
  | 'tanvin_hamzeh'
  | 'sentence_completion'
  | 'twenty_bubble_spelling'
  | 'basketball_trash_sort'
  | 'syllable_count_quiz'
  | 'krabby_burger_builder'
  | 'jellyfish_net_catch'
  | 'sandy_target_kick'
  | 'word_rhyme_bubble'
  | 'krusty_cash_register'
  | 'audio_dictation_listen'
  | 'final_boss';

export type EnvironmentTheme =
  | 'pineapple_home'
  | 'jellyfish_fields'
  | 'boating_school'
  | 'krusty_krab'
  | 'sandy_dome'
  | 'gary_library'
  | 'deep_bikini_reef'
  | 'neptune_palace'
  | 'coral_reef'
  | 'jellyfish_zone'
  | 'octopus_cave'
  | 'sunken_ship'
  | 'crystal_abyss'
  | 'ancient_palace';

export interface WordItem {
  id: string;
  persianWord: string;
  syllables?: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  category: 'nature' | 'animals' | 'school' | 'home' | 'ocean' | 'qualities' | 'actions' | 'food';
  problematicLetters?: string[]; // e.g. ['ص', 'س'], ['ز', 'ذ', 'ض', 'ظ'], ['ت', 'ط'], ['ق', 'غ'], ['ه', 'ح']
  iconEmoji: string;
  incorrectVariants: string[];    // e.g. for جذاب -> ['جزاب', 'جظاب']
  similarWords?: string[];        // e.g. for صورت -> ['صورتی', 'سورت', 'صورتک']
  visualDifferenceVariants?: { text: string; isDifferent: boolean; differenceDesc?: string }[];
  scrambledLetters?: string[];   // e.g. ['ن', 'ا', 'ر', 'ا', 'ب']
  meaningImageDesc?: string;
  meaningEmoji?: string;
  audioPronunciationText?: string;
  sampleSentence?: string;
}

export interface LevelConfig {
  id: number;
  levelNumber: number;
  title: string;
  englishTitle: string;
  subtitle: string;
  mechanic: LevelMechanic;
  environment: EnvironmentTheme;
  isBoss: boolean;
  bossCharacter?: 'spongebob' | 'patrick' | 'squidward' | 'mr_krabs' | 'sandy' | 'gary' | 'plankton' | 'king_neptune' | 'jelly_king' | 'plankton_boss' | 'karate_robot' | 'king_neptune_boss' | 'mrs_puff' | 'pirate_captain' | 'crystal_golem' | 'shark_boss' | 'squidward_boss' | 'gary_boss' | 'turtle' | 'octopus' | 'shark' | 'guardian_whale';
  bossNamePersian?: string;
  observationTimeSeconds: number;
  roundsToComplete: number;
  companionCharacterId: string;
  descriptionPersian: string;
  instructionPersian: string;
  educationalFocus: string;
  targetLetterFocus?: string;
  zoneIndex?: number;
}

export interface Character {
  id: string;
  namePersian: string;
  titlePersian: string;
  personality: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    bgGlow: string;
  };
  cheerVoiceLines: string[];
  retryVoiceLines: string[];
  avatarSvgType: 'spongebob' | 'patrick' | 'squidward' | 'mr_krabs' | 'sandy' | 'gary' | 'plankton' | 'king_neptune' | 'puki_fish' | 'octo_octopus' | 'changool_crab' | 'dana_turtle' | 'jelly_jellyfish' | 'sharky_shark' | 'starry_starfish' | 'esbi_seahorse';
  unlockedByDefault: boolean;
  unlockCostCoins?: number;
  imageUrl?: string;
}

export interface Achievement {
  id: string;
  titlePersian: string;
  descriptionPersian: string;
  iconName: string;
  requiredCount: number;
  rewardCoins: number;
  category: 'streak' | 'levels' | 'accuracy' | 'speed' | 'bosses';
}

export interface LevelResult {
  stars: number;
  highScore: number;
  completedAt: number;
  bestTimeSeconds: number;
  attempts: number;
}

export interface AdaptiveStats {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  currentCombo: number;
  longestCombo: number;
  averageResponseTimeMs: number;
  letterMistakes: Record<string, number>;
  wordMistakes: Record<string, number>;
  skillMastery: Record<string, { total: number; correct: number }>;
  timeSpentSeconds: number;
  recentRecords: {
    timestamp: number;
    levelId: number;
    word: string;
    wasCorrect: boolean;
    timeMs: number;
    skill: string;
  }[];
}

export interface PlayerSaveState {
  currentLevel: number;
  completedLevels: Record<number, LevelResult>;
  coins: number;
  stars: number;
  selectedCharacterId: string;
  unlockedCharacters: string[];
  unlockedBadges: string[];
  adaptiveStats: AdaptiveStats;
  settings: {
    musicVolume: number;
    sfxVolume: number;
    voiceVolume: number;
    musicEnabled: boolean;
    sfxEnabled: boolean;
    voiceEnabled: boolean;
    highContrastMode: boolean;
  };
}

export interface TwentyBubbleItem {
  id: string;
  displayedText: string;
  isWrong: boolean;
  correctForm: string;
  explanation?: string;
  emoji?: string;
}

export interface QuestionData {
  roundNumber: number;
  totalRounds: number;
  mechanic: LevelMechanic;
  targetWord?: WordItem;
  wordsList?: WordItem[];
  options?: { id: string; text?: string; emoji?: string; isCorrect: boolean; explanation?: string }[];
  scrambledLetters?: string[];
  missingLetterSetup?: { wordWithHole: string; correctLetter: string; options: string[] };
  imageQuizSetup?: { imageUrl: string; imageNamePersian: string; options: { id: string; text: string; isCorrect: boolean }[]; hint?: string };
  visualDifferenceSetup?: { items: { id: string; text: string; isTarget: boolean }[] };
  twentyBubbleItems?: TwentyBubbleItem[];
  basketballTrashSetup?: { items: { id: string; word: string; isCorrect: boolean; correctSpelling?: string; explanation?: string; emoji?: string }[] };
  syllableQuizSetup?: { items: { id: string; word: string; syllableCount: number; syllablesDisplay: string[]; emoji: string; explanation?: string }[] };
  burgerSyllablesSetup?: { targetWord: string; targetEmoji?: string; syllables: string[]; shuffledSyllables: string[] };
  jellyfishItemsSetup?: { id: string; text: string; isTarget: boolean; color: string }[];
  sandyKarateBoardsSetup?: { id: string; text: string; isWrongWord: boolean; correctForm?: string; explanation?: string }[];
  rhymeSetup?: { baseWord: string; baseEmoji?: string; options: { id: string; text: string; isRhyme: boolean; emoji?: string }[] };
  syllableCountSetup?: { word: string; emoji?: string; correctSyllables: number; correctSounds: number; syllablesText: string; soundsText: string };
  dictationSetup?: { word: string; audioText: string; emoji?: string; options: { id: string; text: string; isCorrect: boolean }[] };
  memoryWords?: WordItem[];
  shuffledWords?: WordItem[];
  originalOrderIds?: string[];
  timeLimitSeconds?: number;
  promptText: string;
  hint?: string;
}
