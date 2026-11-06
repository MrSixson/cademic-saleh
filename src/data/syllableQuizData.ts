export interface SyllableQuizItem {
  id: string;
  word: string;
  syllableCount: number;
  syllablesDisplay: string[];
  emoji: string;
  explanation?: string;
}

export interface SyllableQuizLevelData {
  levelId: number;
  title: string;
  description: string;
  instruction: string;
  items: SyllableQuizItem[];
}

export const SYLLABLE_QUIZ_LEVELS: Record<number, SyllableQuizLevelData> = {
  9: {
    levelId: 9,
    title: 'مرحله نهم: چالش شمارش بخش‌های کلمه',
    description: 'تعداد بخش‌های هر کلمه را با دقت تشخیص بده و از بین گزینه‌های ۱، ۲، ۳ یا ۴ بخش، پاسخ درست را انتخاب کن!',
    instruction: 'این کلمه چند بخش دارد؟ گزینه درست را انتخاب کن!',
    items: [
      {
        id: 'syl_1',
        word: 'آب',
        syllableCount: 1,
        syllablesDisplay: ['آب'],
        emoji: '💧',
        explanation: 'کلمه «آب» یک بخش دارد (آب)'
      },
      {
        id: 'syl_2',
        word: 'گُل',
        syllableCount: 1,
        syllablesDisplay: ['گُل'],
        emoji: '🌸',
        explanation: 'کلمه «گُل» یک بخش دارد (گُل)'
      },
      {
        id: 'syl_3',
        word: 'نان',
        syllableCount: 1,
        syllablesDisplay: ['نان'],
        emoji: '🍞',
        explanation: 'کلمه «نان» یک بخش دارد (نان)'
      },
      {
        id: 'syl_4',
        word: 'اَبر',
        syllableCount: 1,
        syllablesDisplay: ['اَبْر'],
        emoji: '☁️',
        explanation: 'کلمه «اَبر» یک بخش دارد (اَبْر)'
      },
      {
        id: 'syl_5',
        word: 'مادر',
        syllableCount: 2,
        syllablesDisplay: ['ما', 'دَر'],
        emoji: '👩',
        explanation: 'کلمه «مادر» ۲ بخش دارد: ما + دَر'
      },
      {
        id: 'syl_6',
        word: 'کتاب',
        syllableCount: 2,
        syllablesDisplay: ['کِ', 'تاب'],
        emoji: '📚',
        explanation: 'کلمه «کتاب» ۲ بخش دارد: کِ + تاب'
      },
      {
        id: 'syl_7',
        word: 'باران',
        syllableCount: 2,
        syllablesDisplay: ['با', 'ران'],
        emoji: '🌧️',
        explanation: 'کلمه «باران» ۲ بخش دارد: با + ران'
      },
      {
        id: 'syl_8',
        word: 'مدرسه',
        syllableCount: 3,
        syllablesDisplay: ['مَد', 'رَ', 'سِه'],
        emoji: '🏫',
        explanation: 'کلمه «مدرسه» ۳ بخش دارد: مَد + رَ + سِه'
      },
      {
        id: 'syl_9',
        word: 'مداد',
        syllableCount: 2,
        syllablesDisplay: ['مِ', 'داد'],
        emoji: '✏️',
        explanation: 'کلمه «مداد» ۲ بخش دارد: مِ + داد'
      },
      {
        id: 'syl_10',
        word: 'ستاره',
        syllableCount: 3,
        syllablesDisplay: ['سِ', 'تا', 'رِه'],
        emoji: '⭐',
        explanation: 'کلمه «ستاره» ۳ بخش دارد: سِ + تا + رِه'
      },
      {
        id: 'syl_11',
        word: 'پرنده',
        syllableCount: 3,
        syllablesDisplay: ['پَ', 'رَن', 'دِه'],
        emoji: '🐦',
        explanation: 'کلمه «پرنده» ۳ بخش دارد: پَ + رَن + دِه'
      },
      {
        id: 'syl_12',
        word: 'درخت',
        syllableCount: 2,
        syllablesDisplay: ['دِ', 'رَخْت'],
        emoji: '🌳',
        explanation: 'کلمه «درخت» ۲ بخش دارد: دِ + رَخْت'
      },
      {
        id: 'syl_13',
        word: 'کتابخانه',
        syllableCount: 4,
        syllablesDisplay: ['کِ', 'تاب', 'خا', 'نِه'],
        emoji: '🏛️',
        explanation: 'کلمه «کتابخانه» ۴ بخش دارد: کِ + تاب + خا + نِه'
      },
      {
        id: 'syl_14',
        word: 'آسمان',
        syllableCount: 3,
        syllablesDisplay: ['آ', 'سِ', 'مان'],
        emoji: '🌌',
        explanation: 'کلمه «آسمان» ۳ بخش دارد: آ + سِ + مان'
      },
      {
        id: 'syl_15',
        word: 'پنجره',
        syllableCount: 3,
        syllablesDisplay: ['پَن', 'جَ', 'رِه'],
        emoji: '🪟',
        explanation: 'کلمه «پنجره» ۳ بخش دارد: پَن + جَ + رِه'
      },
      {
        id: 'syl_16',
        word: 'کفش',
        syllableCount: 1,
        syllablesDisplay: ['کَفْش'],
        emoji: '👟',
        explanation: 'کلمه «کفش» یک بخش دارد (کَفْش)'
      },
      {
        id: 'syl_17',
        word: 'دوچرخه',
        syllableCount: 3,
        syllablesDisplay: ['دو', 'چَر', 'خِه'],
        emoji: '🚲',
        explanation: 'کلمه «دوچرخه» ۳ بخش دارد: دو + چَر + خِه'
      },
      {
        id: 'syl_18',
        word: 'ماشین',
        syllableCount: 2,
        syllablesDisplay: ['ما', 'شین'],
        emoji: '🚗',
        explanation: 'کلمه «ماشین» ۲ بخش دارد: ما + شین'
      },
      {
        id: 'syl_19',
        word: 'گلخانه',
        syllableCount: 3,
        syllablesDisplay: ['گُل', 'خا', 'نِه'],
        emoji: '🏡',
        explanation: 'کلمه «گلخانه» ۳ بخش دارد: گُل + خا + نِه'
      },
      {
        id: 'syl_20',
        word: 'پروانه',
        syllableCount: 3,
        syllablesDisplay: ['پَرْ', 'وا', 'نِه'],
        emoji: '🦋',
        explanation: 'کلمه «پروانه» ۳ بخش دارد: پَرْ + وا + نِه'
      }
    ]
  }
};
