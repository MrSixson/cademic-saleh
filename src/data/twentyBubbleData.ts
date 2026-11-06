import { TwentyBubbleItem } from '../types';

export interface TwentyBubbleLevelData {
  levelId: number;
  title: string;
  themeDescription: string;
  instruction: string;
  items: TwentyBubbleItem[];
}

export const TWENTY_BUBBLE_LEVELS: Record<number, TwentyBubbleLevelData> = {
  6: {
    levelId: 6,
    title: 'مرحله ششم: شکار حباب کلمات اشتباه املایی',
    themeDescription: 'در میان حباب‌ها، تعدادی کلمه با املای اشتباه وجود دارند. حباب‌های کلمات اشتباه را بترکان تا برنده شوی!',
    instruction: 'حباب کلمات دارای غلط املایی را پیدا کن و بترکان!',
    items: [
      // Misspelled words (isWrong: true) - student must POP these to win
      { id: '6_w1', displayedText: 'خاهر', isWrong: true, correctForm: 'خواهر', explanation: 'خواهر با نشانه واو ناخوانا (خوا) نوشته می‌شود', emoji: '👧' },
      { id: '6_w2', displayedText: 'سندوق', isWrong: true, correctForm: 'صندوق', explanation: 'صندوق با نشانه (صـ) نوشته می‌شود نه (س)', emoji: '📦' },
      { id: '6_w3', displayedText: 'استخان', isWrong: true, correctForm: 'استخوان', explanation: 'استخوان با نشانه واو ناخوانا (خوا) نوشته می‌شود', emoji: '🦴' },
      { id: '6_w4', displayedText: 'سروت', isWrong: true, correctForm: 'ثروت', explanation: 'ثروت با نشانه (ثـ) سه نقطه نوشته می‌شود', emoji: '💰' },
      { id: '6_w5', displayedText: 'خابید', isWrong: true, correctForm: 'خوابید', explanation: 'خوابید با نشانه واو ناخوانا (خوا) نوشته می‌شود', emoji: '😴' },

      // Correctly spelled words (isWrong: false) - student must KEEP these
      { id: '6_c1', displayedText: 'خوردن', isWrong: false, correctForm: 'خوردن', emoji: '🍽️' },
      { id: '6_c2', displayedText: 'ورزش', isWrong: false, correctForm: 'ورزش', emoji: '⚽' },
      { id: '6_c3', displayedText: 'لیوان', isWrong: false, correctForm: 'لیوان', emoji: '🥛' },
      { id: '6_c4', displayedText: 'صدف', isWrong: false, correctForm: 'صدف', emoji: '🐚' },
      { id: '6_c5', displayedText: 'جوان', isWrong: false, correctForm: 'جوان', emoji: '🧑' },
      { id: '6_c6', displayedText: 'چوپان', isWrong: false, correctForm: 'چوپان', emoji: '🐑' },
      { id: '6_c7', displayedText: 'خوراکی', isWrong: false, correctForm: 'خوراکی', emoji: '🍎' },
      { id: '6_c8', displayedText: 'خوشحال', isWrong: false, correctForm: 'خوشحال', emoji: '😄' }
    ]
  },
  7: {
    levelId: 7,
    title: 'مرحله هفتم: شکارچی بزرگ حباب‌های غلط املایی',
    themeDescription: 'در میان این حباب‌ها، کلماتی با املای اشتباه مانند وضیر❌، اهساس❌، سبح❌ و طمسلح❌ پنهان شده‌اند. همه حباب‌های اشتباه را بترکان!',
    instruction: 'حباب کلمات دارای غلط املایی را پیدا کن و بترکان تا برنده شوی!',
    items: [
      // 8 Misspelled words (isWrong: true) - student must POP these to win
      { id: '7_w1', displayedText: 'وضیر', isWrong: true, correctForm: 'وزیر', explanation: 'وزیر با نشانه (ز) نوشته می‌شود نه (ض)', emoji: '👑' },
      { id: '7_w2', displayedText: 'اهساس', isWrong: true, correctForm: 'احساس', explanation: 'احساس با نشانه (حـ) جیمی نوشته می‌شود نه (هـ)', emoji: '❤️' },
      { id: '7_w3', displayedText: 'سبح', isWrong: true, correctForm: 'صبح', explanation: 'صبح با نشانه (صـ) صاد نوشته می‌شود نه (س)', emoji: '🌅' },
      { id: '7_w4', displayedText: 'گزشته', isWrong: true, correctForm: 'گذشته', explanation: 'گذشته با نشانه (ذ) ذال نوشته می‌شود نه (ز)', emoji: '⏳' },
      { id: '7_w5', displayedText: 'کسیف', isWrong: true, correctForm: 'کثیف', explanation: 'کثیف با نشانه (ثـ) سه نقطه نوشته می‌شود نه (س)', emoji: '🧼' },
      { id: '7_w6', displayedText: 'دماق', isWrong: true, correctForm: 'دماغ', explanation: 'دماغ با نشانه (غ) غین نوشته می‌شود نه (ق)', emoji: '👃' },
      { id: '7_w7', displayedText: 'طمسلح', isWrong: true, correctForm: 'تمساح', explanation: 'تمساح با نشانه (تـ) دو نقطه و (ح) جیمی نوشته می‌شود', emoji: '🐊' },
      { id: '7_w8', displayedText: 'تول', isWrong: true, correctForm: 'طول', explanation: 'طول با نشانه (ط) دسته‌دار نوشته می‌شود نه (ت)', emoji: '📏' },

      // 21 Correct words (isWrong: false) - student must KEEP these
      { id: '7_c1', displayedText: 'حلزون', isWrong: false, correctForm: 'حلزون', emoji: '🐌' },
      { id: '7_c2', displayedText: 'ورزش', isWrong: false, correctForm: 'ورزش', emoji: '⚽' },
      { id: '7_c3', displayedText: 'مار', isWrong: false, correctForm: 'مار', emoji: '🐍' },
      { id: '7_c4', displayedText: 'کلید', isWrong: false, correctForm: 'کلید', emoji: '🔑' },
      { id: '7_c5', displayedText: 'استفاده', isWrong: false, correctForm: 'استفاده', emoji: '💡' },
      { id: '7_c6', displayedText: 'میمون', isWrong: false, correctForm: 'میمون', emoji: '🐵' },
      { id: '7_c7', displayedText: 'گربه', isWrong: false, correctForm: 'گربه', emoji: '🐱' },
      { id: '7_c8', displayedText: 'قنادی', isWrong: false, correctForm: 'قنادی', emoji: '🍰' },
      { id: '7_c9', displayedText: 'ریاضی', isWrong: false, correctForm: 'ریاضی', emoji: '📐' },
      { id: '7_c10', displayedText: 'صدا', isWrong: false, correctForm: 'صدا', emoji: '🔊' },
      { id: '7_c11', displayedText: 'خواهش', isWrong: false, correctForm: 'خواهش', emoji: '🙏' },
      { id: '7_c12', displayedText: 'رطب', isWrong: false, correctForm: 'رطب', emoji: '🌴' },
      { id: '7_c13', displayedText: 'صورتی', isWrong: false, correctForm: 'صورتی', emoji: '🌸' },
      { id: '7_c14', displayedText: 'آبی', isWrong: false, correctForm: 'آبی', emoji: '🌊' },
      { id: '7_c15', displayedText: 'عینک', isWrong: false, correctForm: 'عینک', emoji: '👓' },
      { id: '7_c16', displayedText: 'حیات', isWrong: false, correctForm: 'حیات', emoji: '🌱' },
      { id: '7_c17', displayedText: 'شکار', isWrong: false, correctForm: 'شکار', emoji: '🏹' },
      { id: '7_c18', displayedText: 'خورشید', isWrong: false, correctForm: 'خورشید', emoji: '☀️' },
      { id: '7_c19', displayedText: 'کلمات', isWrong: false, correctForm: 'کلمات', emoji: '📝' },
      { id: '7_c20', displayedText: 'نقطه', isWrong: false, correctForm: 'نقطه', emoji: '🔘' },
      { id: '7_c21', displayedText: 'زرد', isWrong: false, correctForm: 'زرد', emoji: '💛' }
    ]
  },
  101: {
    levelId: 101,
    title: 'کارآگاه ۲۰ حباب ۱: نگاره‌ها و کلمات روزمره',
    themeDescription: 'در میان ۲۰ حباب، ۱۰ حباب غلط املایی دارند (مانند اباس❌->عباس و سابون❌->صابون). آن‌ها را بترکان تا فقط کلمات درست در حباب‌ها باقی بمانند!',
    instruction: '۱۰ حباب دارای غلط املایی را پیدا کن و بترکان!',
    items: [
      // 10 Misspelled Words (isWrong: true)
      { id: '101_w1', displayedText: 'اباس', isWrong: true, correctForm: 'عباس', explanation: 'عباس با نشانه (عـ) نوشته می‌شود نه (ا)', emoji: '👦' },
      { id: '101_w2', displayedText: 'سابون', isWrong: true, correctForm: 'صابون', explanation: 'صابون با نشانه (صـ) نوشته می‌شود', emoji: '🧼' },
      { id: '101_w3', displayedText: 'سدف', isWrong: true, correctForm: 'صدف', explanation: 'صدف با نشانه (صـ) نوشته می‌شود', emoji: '🐚' },
      { id: '101_w4', displayedText: 'خاب', isWrong: true, correctForm: 'خواب', explanation: 'خواب با نشانه واو ناخوانا (خوا) نوشته می‌شود', emoji: '😴' },
      { id: '101_w5', displayedText: 'هوله', isWrong: true, correctForm: 'حوله', explanation: 'حوله با نشانه (حـ) نوشته می‌شود', emoji: '🧖' },
      { id: '101_w6', displayedText: 'توتی', isWrong: true, correctForm: 'طوطی', explanation: 'طوطی با نشانه (ط) نوشته می‌شود نه (ت)', emoji: '🦜' },
      { id: '101_w7', displayedText: 'کلاق', isWrong: true, correctForm: 'کلاغ', explanation: 'کلاغ با نشانه (غ) پایانی نوشته می‌شود', emoji: '🦅' },
      { id: '101_w8', displayedText: 'باق', isWrong: true, correctForm: 'باغ', explanation: 'باغ با نشانه (غ) نوشته می‌شود', emoji: '🌳' },
      { id: '101_w9', displayedText: 'مدرصـه', isWrong: true, correctForm: 'مدرسه', explanation: 'مدرسه با نشانه (سـ) نوشته می‌شود', emoji: '🏫' },
      { id: '101_w10', displayedText: 'انارر', isWrong: true, correctForm: 'انار', explanation: 'انار فقط یک نشانه (ر) در پایان دارد', emoji: '🍎' },

      // 10 Correctly Spelled Words (isWrong: false)
      { id: '101_c1', displayedText: 'آب', isWrong: false, correctForm: 'آب', emoji: '💧' },
      { id: '101_c2', displayedText: 'بابا', isWrong: false, correctForm: 'بابا', emoji: '👨' },
      { id: '101_c3', displayedText: 'مادر', isWrong: false, correctForm: 'مادر', emoji: '👩' },
      { id: '101_c4', displayedText: 'نان', isWrong: false, correctForm: 'نان', emoji: '🍞' },
      { id: '101_c5', displayedText: 'سیب', isWrong: false, correctForm: 'سیب', emoji: '🍏' },
      { id: '101_c6', displayedText: 'درخت', isWrong: false, correctForm: 'درخت', emoji: '🌲' },
      { id: '101_c7', displayedText: 'ایران', isWrong: false, correctForm: 'ایران', emoji: '🇮🇷' },
      { id: '101_c8', displayedText: 'کتاب', isWrong: false, correctForm: 'کتاب', emoji: '📖' },
      { id: '101_c9', displayedText: 'باران', isWrong: false, correctForm: 'باران', emoji: '🌧️' },
      { id: '101_c10', displayedText: 'ستاره', isWrong: false, correctForm: 'ستاره', emoji: '⭐' }
    ]
  },

  102: {
    levelId: 102,
    title: 'کارآگاه ۲۰ حباب ۲: نشانه‌های هم‌صدا (س / ص / ث)',
    themeDescription: 'تشخیص دقیق واژگان دارای نشانه‌های هم‌صدای (سـ س، صـ ص، ثـ ث). ۱۰ حباب غلط را بترکان!',
    instruction: '۱۰ حباب با املای اشتباه (س/ص/ث) را شکار کن!',
    items: [
      // 10 Misspelled
      { id: '102_w1', displayedText: 'مسلس', isWrong: true, correctForm: 'مثلث', explanation: 'مثلث با نشانه (ثـ ث) نوشته می‌شود', emoji: '📐' },
      { id: '102_w2', displayedText: 'سورت', isWrong: true, correctForm: 'صورت', explanation: 'صورت با نشانه (صـ) نوشته می‌شود', emoji: '😀' },
      { id: '102_w3', displayedText: 'کسیف', isWrong: true, correctForm: 'کثیف', explanation: 'کثیف با نشانه (ثـ) نوشته می‌شود', emoji: '🧦' },
      { id: '102_w4', displayedText: 'صـتاره', isWrong: true, correctForm: 'ستاره', explanation: 'ستاره با نشانه (سـ) نوشته می‌شود', emoji: '⭐' },
      { id: '102_w5', displayedText: 'سندوق', isWrong: true, correctForm: 'صندوق', explanation: 'صندوق با نشانه (صـ) نوشته می‌شود', emoji: '📦' },
      { id: '102_w6', displayedText: 'سداب', isWrong: true, correctForm: 'صدا', explanation: 'صدا با نشانه (صـ) نوشته می‌شود', emoji: '🔊' },
      { id: '102_w7', displayedText: 'ثیب', isWrong: true, correctForm: 'سیب', explanation: 'سیب با نشانه (سـ) نوشته می‌شود', emoji: '🍎' },
      { id: '102_w8', displayedText: 'صـلام', isWrong: true, correctForm: 'سلام', explanation: 'سلام با نشانه (سـ) نوشته می‌شود', emoji: '👋' },
      { id: '102_w9', displayedText: 'مخسوس', isWrong: true, correctForm: 'مخصوص', explanation: 'مخصوص با نشانه (ص) نوشته می‌شود', emoji: '🎯' },
      { id: '102_w10', displayedText: 'قصرر', isWrong: true, correctForm: 'قصر', explanation: 'قصر با نشانه (ص) و یک ر نوشته می‌شود', emoji: '🏰' },

      // 10 Correct
      { id: '102_c1', displayedText: 'ساعت', isWrong: false, correctForm: 'ساعت', emoji: '⏰' },
      { id: '102_c2', displayedText: 'سیب', isWrong: false, correctForm: 'سیب', emoji: '🍏' },
      { id: '102_c3', displayedText: 'پروانه', isWrong: false, correctForm: 'پروانه', emoji: '🦋' },
      { id: '102_c4', displayedText: 'مدرسه', isWrong: false, correctForm: 'مدرسه', emoji: '🏫' },
      { id: '102_c5', displayedText: 'کلاس', isWrong: false, correctForm: 'کلاس', emoji: '📚' },
      { id: '102_c6', displayedText: 'صبح', isWrong: false, correctForm: 'صبح', emoji: '🌅' },
      { id: '102_c7', displayedText: 'صدف', isWrong: false, correctForm: 'صدف', emoji: '🐚' },
      { id: '102_c8', displayedText: 'مثلث', isWrong: false, correctForm: 'مثلث', emoji: '📐' },
      { id: '102_c9', displayedText: 'کثیف', isWrong: false, correctForm: 'کثیف', emoji: '🧽' },
      { id: '102_c10', displayedText: 'ثانیه', isWrong: false, correctForm: 'ثانیه', emoji: '⏱️' }
    ]
  },

  103: {
    levelId: 103,
    title: 'کارآگاه ۲۰ حباب ۳: نشانه‌های هم‌صدا (ت / ط)',
    themeDescription: 'تمایز نشانه‌های (تـ ت) و (ط) در واژگان اول دبستان. ۱۰ حباب غلط را هدف بگیر!',
    instruction: '۱۰ حباب دارای نشانه غلط ت یا ط را بترکان!',
    items: [
      // 10 Misspelled
      { id: '103_w1', displayedText: 'توتی', isWrong: true, correctForm: 'طوطی', explanation: 'طوطی با نشانه (ط) نوشته می‌شود', emoji: '🦜' },
      { id: '103_w2', displayedText: 'تناب', isWrong: true, correctForm: 'طناب', explanation: 'طناب با نشانه (ط) نوشته می‌شود', emoji: '🪢' },
      { id: '103_w3', displayedText: 'بتری', isWrong: true, correctForm: 'بطری', explanation: 'بطری با نشانه (ط) نوشته می‌شود', emoji: '🍾' },
      { id: '103_w4', displayedText: 'طوت', isWrong: true, correctForm: 'توت', explanation: 'توت با نشانه‌های (تـ ت) نوشته می‌شود', emoji: '🫐' },
      { id: '103_w5', displayedText: 'طوپ', isWrong: true, correctForm: 'توپ', explanation: 'توپ با نشانه (تـ) نوشته می‌شود', emoji: '⚽' },
      { id: '103_w6', displayedText: 'دستـط', isWrong: true, correctForm: 'دست', explanation: 'دست با نشانه (ت) نوشته می‌شود', emoji: '✋' },
      { id: '103_w7', displayedText: 'طاب', isWrong: true, correctForm: 'تاب', explanation: 'تاب با نشانه (تـ) نوشته می‌شود', emoji: '🎪' },
      { id: '103_w8', displayedText: 'طیر', isWrong: true, correctForm: 'تیر', explanation: 'تیر با نشانه (تـ) نوشته می‌شود', emoji: '🏹' },
      { id: '103_w9', displayedText: 'طازه', isWrong: true, correctForm: 'تازه', explanation: 'تازه با نشانه (تـ) نوشته می‌شود', emoji: '✨' },
      { id: '103_w10', displayedText: 'دفطر', isWrong: true, correctForm: 'دفتر', explanation: 'دفتر با نشانه (تـ) نوشته می‌شود', emoji: '📓' },

      // 10 Correct
      { id: '103_c1', displayedText: 'طوطی', isWrong: false, correctForm: 'طوطی', emoji: '🦜' },
      { id: '103_c2', displayedText: 'طناب', isWrong: false, correctForm: 'طناب', emoji: '🪢' },
      { id: '103_c3', displayedText: 'حیاط', isWrong: false, correctForm: 'حیاط', emoji: '🏡' },
      { id: '103_c4', displayedText: 'توت', isWrong: false, correctForm: 'توت', emoji: '🫐' },
      { id: '103_c5', displayedText: 'تاب', isWrong: false, correctForm: 'تاب', emoji: '🎡' },
      { id: '103_c6', displayedText: 'درخت', isWrong: false, correctForm: 'درخت', emoji: '🌳' },
      { id: '103_c7', displayedText: 'دفتر', isWrong: false, correctForm: 'دفتر', emoji: '📔' },
      { id: '103_c8', displayedText: 'دست', isWrong: false, correctForm: 'دست', emoji: '🖐️' },
      { id: '103_c9', displayedText: 'آبشار', isWrong: false, correctForm: 'آبشار', emoji: '🌊' },
      { id: '103_c10', displayedText: 'توپ', isWrong: false, correctForm: 'توپ', emoji: '🏀' }
    ]
  },

  104: {
    levelId: 104,
    title: 'کارآگاه ۲۰ حباب ۴: نشانه‌های هم‌صدا (ز / ذ / ض / ظ)',
    themeDescription: 'تمایز ۴ نشانه هم‌صدای ز، ذ، ض، ظ در واژگان اول دبستان. ۱۰ حباب غلط را نابود کن!',
    instruction: '۱۰ حباب با املای اشتباه خانواده صدای (ز) را بترکان!',
    items: [
      // 10 Misspelled
      { id: '104_w1', displayedText: 'زرّت', isWrong: true, correctForm: 'ذرت', explanation: 'ذرت با نشانه (ذ) نوشته می‌شود', emoji: '🌽' },
      { id: '104_w2', displayedText: 'مریز', isWrong: true, correctForm: 'مریض', explanation: 'مریض با نشانه (ض) نوشته می‌شود', emoji: '🤒' },
      { id: '104_w3', displayedText: 'رزا', isWrong: true, correctForm: 'رضا', explanation: 'رضا با نشانه (ضـ) نوشته می‌شود', emoji: '👦' },
      { id: '104_w4', displayedText: 'طمیز', isWrong: true, correctForm: 'تمیز', explanation: 'تمیز با نشانه‌های (ت) و (ز) نوشته می‌شود', emoji: '✨' },
      { id: '104_w5', displayedText: 'زرّه‌بین', isWrong: true, correctForm: 'ذره‌بین', explanation: 'ذره‌بین با نشانه (ذ) نوشته می‌شود', emoji: '🔍' },
      { id: '104_w6', displayedText: 'هوض', isWrong: true, correctForm: 'حوض', explanation: 'حوض با نشانه (حـ) و (ض) نوشته می‌شود', emoji: '⛲' },
      { id: '104_w7', displayedText: 'ظرّت', isWrong: true, correctForm: 'ذرت', explanation: 'ذرت با نشانه (ذ) نوشته می‌شود نه (ظ)', emoji: '🌽' },
      { id: '104_w8', displayedText: 'ظرّه', isWrong: true, correctForm: 'ذره', explanation: 'ذره با نشانه (ذ) نوشته می‌شود', emoji: '🔬' },
      { id: '104_w9', displayedText: 'ظردآلو', isWrong: true, correctForm: 'زردآلو', explanation: 'زردآلو با نشانه (ز) نوشته می‌شود', emoji: '🍑' },
      { id: '104_w10', displayedText: 'ظمستان', isWrong: true, correctForm: 'زمستان', explanation: 'زمستان با نشانه (ز) نوشته می‌شود', emoji: '❄️' },

      // 10 Correct
      { id: '104_c1', displayedText: 'ذرت', isWrong: false, correctForm: 'ذرت', emoji: '🌽' },
      { id: '104_c2', displayedText: 'ذره‌بین', isWrong: false, correctForm: 'ذره‌بین', emoji: '🔍' },
      { id: '104_c3', displayedText: 'تمیز', isWrong: false, correctForm: 'تمیز', emoji: '✨' },
      { id: '104_c4', displayedText: 'مریض', isWrong: false, correctForm: 'مریض', emoji: '🛌' },
      { id: '104_c5', displayedText: 'رضا', isWrong: false, correctForm: 'رضا', emoji: '👦' },
      { id: '104_c6', displayedText: 'حوض', isWrong: false, correctForm: 'حوض', emoji: '⛲' },
      { id: '104_c7', displayedText: 'زردآلو', isWrong: false, correctForm: 'زردآلو', emoji: '🍑' },
      { id: '104_c8', displayedText: 'آزاد', isWrong: false, correctForm: 'آزاد', emoji: '🕊️' },
      { id: '104_c9', displayedText: 'بازی', isWrong: false, correctForm: 'بازی', emoji: '🎮' },
      { id: '104_c10', displayedText: 'زمستان', isWrong: false, correctForm: 'زمستان', emoji: '⛄' }
    ]
  },

  105: {
    levelId: 105,
    title: 'کارآگاه ۲۰ حباب ۵: نشانه‌های هم‌صدا (ق / غ)',
    themeDescription: 'تمایز نشانه‌های (قـ ق) و ۴ شکل (غـ ـغـ ـغ غ). ۱۰ حباب غلط را در آب بترکان!',
    instruction: '۱۰ حباب با املای اشتباه (ق یا غ) را هدف بگیر!',
    items: [
      // 10 Misspelled
      { id: '105_w1', displayedText: 'کلاق', isWrong: true, correctForm: 'کلاغ', explanation: 'کلاغ با نشانه (غ) پایانی نوشته می‌شود', emoji: '🦅' },
      { id: '105_w2', displayedText: 'باق', isWrong: true, correctForm: 'باغ', explanation: 'باغ با نشانه (غ) پایانی نوشته می‌شود', emoji: '🌳' },
      { id: '105_w3', displayedText: 'قورباقه', isWrong: true, correctForm: 'قورباغه', explanation: 'قورباغه در وسط با نشانه (ـغـ) نوشته می‌شود', emoji: '🐸' },
      { id: '105_w4', displayedText: 'قار', isWrong: true, correctForm: 'غار', explanation: 'غار با نشانه (غـ) نوشته می‌شود', emoji: '⛰️' },
      { id: '105_w5', displayedText: 'غاشق', isWrong: true, correctForm: 'قاشق', explanation: 'قاشق با نشانه (قـ ق) نوشته می‌شود', emoji: '🥄' },
      { id: '105_w6', displayedText: 'غمری', isWrong: true, correctForm: 'قمری', explanation: 'قمری با نشانه (قـ) نوشته می‌شود', emoji: '🕊️' },
      { id: '105_w7', displayedText: 'مرق', isWrong: true, correctForm: 'مرغ', explanation: 'مرغ با نشانه (ـغ) پایانی نوشته می‌شود', emoji: '🐔' },
      { id: '105_w8', displayedText: 'چراق', isWrong: true, correctForm: 'چراغ', explanation: 'چراغ با نشانه (غ) پایانی نوشته می‌شود', emoji: '💡' },
      { id: '105_w9', displayedText: 'قاز', isWrong: true, correctForm: 'غاز', explanation: 'غاز با نشانه (غـ) اول نوشته می‌شود', emoji: '🪿' },
      { id: '105_w10', displayedText: 'غوری', isWrong: true, correctForm: 'قوری', explanation: 'قوری با نشانه (قـ) اول نوشته می‌شود', emoji: '🫖' },

      // 10 Correct
      { id: '105_c1', displayedText: 'کلاغ', isWrong: false, correctForm: 'کلاغ', emoji: '🦅' },
      { id: '105_c2', displayedText: 'باغ', isWrong: false, correctForm: 'باغ', emoji: '🏡' },
      { id: '105_c3', displayedText: 'قورباغه', isWrong: false, correctForm: 'قورباغه', emoji: '🐸' },
      { id: '105_c4', displayedText: 'غار', isWrong: false, correctForm: 'غار', emoji: '🏞️' },
      { id: '105_c5', displayedText: 'قاشق', isWrong: false, correctForm: 'قاشق', emoji: '🥄' },
      { id: '105_c6', displayedText: 'مرغ', isWrong: false, correctForm: 'مرغ', emoji: '🐓' },
      { id: '105_c7', displayedText: 'چراغ', isWrong: false, correctForm: 'چراغ', emoji: '🏮' },
      { id: '105_c8', displayedText: 'غاز', isWrong: false, correctForm: 'غاز', emoji: '🪿' },
      { id: '105_c9', displayedText: 'قوری', isWrong: false, correctForm: 'قوری', emoji: '🫖' },
      { id: '105_c10', displayedText: 'قایق', isWrong: false, correctForm: 'قایق', emoji: '⛵' }
    ]
  },

  106: {
    levelId: 106,
    title: 'کارآگاه ۲۰ حباب ۶: نشانه‌های هم‌صدا (ح / ه)',
    themeDescription: 'تمایز نشانه‌های (حـ ح) و (هـ ـهـ ـه ه). ۱۰ حباب غلط را در صخره‌های مرجانی پیدا کن!',
    instruction: '۱۰ حباب با املای اشتباه (ح یا ه) را بترکان!',
    items: [
      // 10 Misspelled
      { id: '106_w1', displayedText: 'هوله', isWrong: true, correctForm: 'حوله', explanation: 'حوله با نشانه (حـ) اول نوشته می‌شود', emoji: '🧖' },
      { id: '106_w2', displayedText: 'هلزون', isWrong: true, correctForm: 'حلزون', explanation: 'حلزون با نشانه (حـ) اول نوشته می‌شود', emoji: '🐌' },
      { id: '106_w3', displayedText: 'صبه', isWrong: true, correctForm: 'صبح', explanation: 'صبح با نشانه (ح) پایانی نوشته می‌شود', emoji: '🌅' },
      { id: '106_w4', displayedText: 'حوا', isWrong: true, correctForm: 'هوا', explanation: 'هوا با نشانه (هـ) اول نوشته می‌شود', emoji: '💨' },
      { id: '106_w5', displayedText: 'محربان', isWrong: true, correctForm: 'مهربان', explanation: 'مهربان با نشانه (ـهـ) وسط نوشته می‌شود', emoji: '💖' },
      { id: '106_w6', displayedText: 'بحار', isWrong: true, correctForm: 'بهار', explanation: 'بهار با نشانه (ـهـ) وسط نوشته می‌شود', emoji: '🌸' },
      { id: '106_w7', displayedText: 'حوشحال', isWrong: true, correctForm: 'خوشحال', explanation: 'خوشحال با نشانه (خـ) نوشته می‌شود', emoji: '😊' },
      { id: '106_w8', displayedText: 'تمساه', isWrong: true, correctForm: 'تمساح', explanation: 'تمساح با نشانه (ح) پایانی نوشته می‌شود', emoji: '🐊' },
      { id: '106_w9', displayedText: 'هوض', isWrong: true, correctForm: 'حوض', explanation: 'حوض با نشانه (حـ) اول نوشته می‌شود', emoji: '⛲' },
      { id: '106_w10', displayedText: 'ماح', isWrong: true, correctForm: 'ماه', explanation: 'ماه با نشانه (ه) پایانی نوشته می‌شود', emoji: '🌙' },

      // 10 Correct
      { id: '106_c1', displayedText: 'حوله', isWrong: false, correctForm: 'حوله', emoji: '🧖' },
      { id: '106_c2', displayedText: 'حلزون', isWrong: false, correctForm: 'حلزون', emoji: '🐌' },
      { id: '106_c3', displayedText: 'صبح', isWrong: false, correctForm: 'صبح', emoji: '🌅' },
      { id: '106_c4', displayedText: 'حوض', isWrong: false, correctForm: 'حوض', emoji: '⛲' },
      { id: '106_c5', displayedText: 'تمساح', isWrong: false, correctForm: 'تمساح', emoji: '🐊' },
      { id: '106_c6', displayedText: 'مهربان', isWrong: false, correctForm: 'مهربان', emoji: '💖' },
      { id: '106_c7', displayedText: 'بهار', isWrong: false, correctForm: 'بهار', emoji: '🌸' },
      { id: '106_c8', displayedText: 'هوا', isWrong: false, correctForm: 'هوا', emoji: '🌬️' },
      { id: '106_c9', displayedText: 'ماه', isWrong: false, correctForm: 'ماه', emoji: '🌙' },
      { id: '106_c10', displayedText: 'آهو', isWrong: false, correctForm: 'آهو', emoji: '🦌' }
    ]
  },

  107: {
    levelId: 107,
    title: 'کارآگاه ۲۰ حباب ۷: ۴ شکل نشانه عین (عـ ـعـ ـع ع) و همزه',
    themeDescription: 'کشف و ترکاندن ۱۰ حباب غلط املایی مربوط به ۴ شکل نشانه عین (مانند اباس❌->عباس).',
    instruction: '۱۰ حباب غلط نشانه عین را پیدا کن و بترکان!',
    items: [
      // 10 Misspelled
      { id: '107_w1', displayedText: 'اباس', isWrong: true, correctForm: 'عباس', explanation: 'عباس با نشانه (عـ) اول نوشته می‌شود', emoji: '👦' },
      { id: '107_w2', displayedText: 'ساات', isWrong: true, correctForm: 'ساعت', explanation: 'ساعت با نشانه (ـعـ) وسط نوشته می‌شود', emoji: '⏰' },
      { id: '107_w3', displayedText: 'مزره', isWrong: true, correctForm: 'مزرعه', explanation: 'مزرعه با نشانه (ـع) چسبان پایانی نوشته می‌شود', emoji: '🚜' },
      { id: '107_w4', displayedText: 'شمء', isWrong: true, correctForm: 'شمع', explanation: 'شمع با نشانه (ع) پایانی نوشته می‌شود', emoji: '🕯️' },
      { id: '107_w5', displayedText: 'اینک', isWrong: true, correctForm: 'عینک', explanation: 'عینک با نشانه (عـ) اول نوشته می‌شود', emoji: '👓' },
      { id: '107_w6', displayedText: 'الی', isWrong: true, correctForm: 'علی', explanation: 'علی با نشانه (عـ) اول نوشته می‌شود', emoji: '👦' },
      { id: '107_w7', displayedText: 'مالّم', isWrong: true, correctForm: 'معلّم', explanation: 'معلّم با نشانه (ـعـ) وسط نوشته می‌شود', emoji: '👩‍🏫' },
      { id: '107_w8', displayedText: 'جئبه', isWrong: true, correctForm: 'جعبه', explanation: 'جعبه با نشانه (ـعـ) وسط نوشته می‌شود', emoji: '📦' },
      { id: '107_w9', displayedText: 'جمه', isWrong: true, correctForm: 'جمعه', explanation: 'جمعه با نشانه (ـع) پایانی نوشته می‌شود', emoji: '📅' },
      { id: '107_w10', displayedText: 'اسل', isWrong: true, correctForm: 'عسل', explanation: 'عسل با نشانه (عـ) اول نوشته می‌شود', emoji: '🍯' },

      // 10 Correct
      { id: '107_c1', displayedText: 'عباس', isWrong: false, correctForm: 'عباس', emoji: '👦' },
      { id: '107_c2', displayedText: 'ساعت', isWrong: false, correctForm: 'ساعت', emoji: '⏰' },
      { id: '107_c3', displayedText: 'مزرعه', isWrong: false, correctForm: 'مزرعه', emoji: '🌾' },
      { id: '107_c4', displayedText: 'شمع', isWrong: false, correctForm: 'شمع', emoji: '🕯️' },
      { id: '107_c5', displayedText: 'عینک', isWrong: false, correctForm: 'عینک', emoji: '👓' },
      { id: '107_c6', displayedText: 'معلّم', isWrong: false, correctForm: 'معلّم', emoji: '👩‍🏫' },
      { id: '107_c7', displayedText: 'جعبه', isWrong: false, correctForm: 'جعبه', emoji: '🎁' },
      { id: '107_c8', displayedText: 'جمعه', isWrong: false, correctForm: 'جمعه', emoji: '🎈' },
      { id: '107_c9', displayedText: 'عسل', isWrong: false, correctForm: 'عسل', emoji: '🍯' },
      { id: '107_c10', displayedText: 'شجاع', isWrong: false, correctForm: 'شجاع', emoji: '🦁' }
    ]
  },

  108: {
    levelId: 108,
    title: 'کارآگاه ۲۰ حباب ۸: استثنای واو ناخوانا (خواب و خواهر)',
    themeDescription: 'تشخیص واژگان استثنای (خوا) که با واو ناخوانا نوشته می‌شوند ولی صدای (خا) می‌دهند.',
    instruction: '۱۰ حباب غلط واو ناخوانا (مانند خاب❌->خواب) را بترکان!',
    items: [
      // 10 Misspelled
      { id: '108_w1', displayedText: 'خاب', isWrong: true, correctForm: 'خواب', explanation: 'خواب با نشانه واو ناخوانا (خوا) نوشته می‌شود', emoji: '😴' },
      { id: '108_w2', displayedText: 'خاهر', isWrong: true, correctForm: 'خواهر', explanation: 'خواهر با نشانه واو ناخوانا (خوا) نوشته می‌شود', emoji: '👧' },
      { id: '108_w3', displayedText: 'خاستن', isWrong: true, correctForm: 'خواستن', explanation: 'خواستن با نشانه واو ناخوانا (خوا) نوشته می‌شود', emoji: '🙋' },
      { id: '108_w4', displayedText: 'خاندن', isWrong: true, correctForm: 'خواندن', explanation: 'خواندن با نشانه واو ناخوانا (خوا) نوشته می‌شود', emoji: '📖' },
      { id: '108_w5', displayedText: 'تختخاب', isWrong: true, correctForm: 'تختخواب', explanation: 'تختخواب با نشانه (خوا) نوشته می‌شود', emoji: '🛏️' },
      { id: '108_w6', displayedText: 'خاهش', isWrong: true, correctForm: 'خواهش', explanation: 'خواهش با نشانه (خوا) نوشته می‌شود', emoji: '🙏' },
      { id: '108_w7', displayedText: 'خابالو', isWrong: true, correctForm: 'خواب‌آلود', explanation: 'خواب‌آلود با نشانه (خوا) نوشته می‌شود', emoji: '🥱' },
      { id: '108_w8', displayedText: 'خانش', isWrong: true, correctForm: 'خوانش', explanation: 'خوانش با نشانه (خوا) نوشته می‌شود', emoji: '🗣️' },
      { id: '108_w9', displayedText: 'خاربار', isWrong: true, correctForm: 'خواربار', explanation: 'خواربار با نشانه (خوا) نوشته می‌شود', emoji: '🧺' },
      { id: '108_w10', displayedText: 'خاستگار', isWrong: true, correctForm: 'خواستگار', explanation: 'خواستگار با نشانه (خوا) نوشته می‌شود', emoji: '💐' },

      // 10 Correct
      { id: '108_c1', displayedText: 'خواب', isWrong: false, correctForm: 'خواب', emoji: '🛌' },
      { id: '108_c2', displayedText: 'خواهر', isWrong: false, correctForm: 'خواهر', emoji: '👧' },
      { id: '108_c3', displayedText: 'خواستن', isWrong: false, correctForm: 'خواستن', emoji: '🙋‍♂️' },
      { id: '108_c4', displayedText: 'خواندن', isWrong: false, correctForm: 'خواندن', emoji: '📚' },
      { id: '108_c5', displayedText: 'تختخواب', isWrong: false, correctForm: 'تختخواب', emoji: '🛏️' },
      { id: '108_c6', displayedText: 'خواهش', isWrong: false, correctForm: 'خواهش', emoji: '🤝' },
      { id: '108_c7', displayedText: 'خواب‌آلود', isWrong: false, correctForm: 'خواب‌آلود', emoji: '😴' },
      { id: '108_c8', displayedText: 'خورشید', isWrong: false, correctForm: 'خورشید', emoji: '☀️' },
      { id: '108_c9', displayedText: 'خودکار', isWrong: false, correctForm: 'خودکار', emoji: '🖊️' },
      { id: '108_c10', displayedText: 'خوشحال', isWrong: false, correctForm: 'خوشحال', emoji: '😄' }
    ]
  },

  109: {
    levelId: 109,
    title: 'کارآگاه ۲۰ حباب ۹: نشانه‌های تشدید ( ّ ) و تنوین ( ً )',
    themeDescription: 'تشخیص دقیق کلمات تنوین‌دار (مانند اتفاقاً) و کلمات تشدیددار (مانند معلّم، بنّا، نجّار). ۱۰ حباب غلط را شکار کن!',
    instruction: '۱۰ حباب غلط تنوین و تشدید را بترکان!',
    items: [
      // 10 Misspelled
      { id: '109_w1', displayedText: 'اتفاقن', isWrong: true, correctForm: 'اتفاقاً', explanation: 'صدای (اَن) در پایان این کلمه تنوین ( ً ) است نه نون', emoji: '💡' },
      { id: '109_w2', displayedText: 'حتمن', isWrong: true, correctForm: 'حتماً', explanation: 'حتماً با علامت تنوین ( ً ) نوشته می‌شود', emoji: '🎯' },
      { id: '109_w3', displayedText: 'مثلن', isWrong: true, correctForm: 'مثلاً', explanation: 'مثلاً با علامت تنوین ( ً ) نوشته می‌شود', emoji: '✨' },
      { id: '109_w4', displayedText: 'قطعن', isWrong: true, correctForm: 'قطعاً', explanation: 'قطعاً با علامت تنوین ( ً ) نوشته می‌شود', emoji: '✅' },
      { id: '109_w5', displayedText: 'معلمم', isWrong: true, correctForm: 'معلّم', explanation: 'معلّم با علامت تشدید روی حرف ل نوشته می‌شود نه دو تا میم', emoji: '👩‍🏫' },
      { id: '109_w6', displayedText: 'بننا', isWrong: true, correctForm: 'بنّا', explanation: 'بنّا با علامت تشدید روی حرف ن نوشته می‌شود', emoji: '👷' },
      { id: '109_w7', displayedText: 'نججار', isWrong: true, correctForm: 'نجّار', explanation: 'نجّار با علامت تشدید روی حرف ج نوشته می‌شود', emoji: '🪚' },
      { id: '109_w8', displayedText: 'تشککر', isWrong: true, correctForm: 'تشکّر', explanation: 'تشکّر با علامت تشدید روی حرف ک نوشته می‌شود', emoji: '🙏' },
      { id: '109_w9', displayedText: 'دققت', isWrong: true, correctForm: 'دقّت', explanation: 'دقّت با علامت تشدید روی حرف ق نوشته می‌شود', emoji: '🔍' },
      { id: '109_w10', displayedText: 'اولن', isWrong: true, correctForm: 'اوّلاً', explanation: 'اوّلاً هم تشدید و هم تنوین دارد', emoji: '🥇' },

      // 10 Correct
      { id: '109_c1', displayedText: 'اتفاقاً', isWrong: false, correctForm: 'اتفاقاً', emoji: '💡' },
      { id: '109_c2', displayedText: 'حتماً', isWrong: false, correctForm: 'حتماً', emoji: '🎯' },
      { id: '109_c3', displayedText: 'مثلاً', isWrong: false, correctForm: 'مثلاً', emoji: '✨' },
      { id: '109_c4', displayedText: 'قطعاً', isWrong: false, correctForm: 'قطعاً', emoji: '✅' },
      { id: '109_c5', displayedText: 'معلّم', isWrong: false, correctForm: 'معلّم', emoji: '👩‍🏫' },
      { id: '109_c6', displayedText: 'بنّا', isWrong: false, correctForm: 'بنّا', emoji: '👷' },
      { id: '109_c7', displayedText: 'نجّار', isWrong: false, correctForm: 'نجّار', emoji: '🪚' },
      { id: '109_c8', displayedText: 'تشکّر', isWrong: false, correctForm: 'تشکّر', emoji: '🙏' },
      { id: '109_c9', displayedText: 'دقّت', isWrong: false, correctForm: 'دقّت', emoji: '🔍' },
      { id: '109_c10', displayedText: 'اوّلاً', isWrong: false, correctForm: 'اوّلاً', emoji: '🥇' }
    ]
  },

  110: {
    levelId: 110,
    title: 'غول نهایی ۲۰ حباب طلایی: آزمون بزرگ پادشاه نپتون و باب اسفنجی',
    themeDescription: 'آزمون جامع نهایی: ۲۰ حباب زرین پادشاه نپتون! ۱۰ کلمه دارای غلط‌های مختلف املایی را پیدا کن و بترکان تا برنده جام زرین شوی!',
    instruction: '۱۰ حباب غلط آزمون پادشاه نپتون را بترکان تا فقط کلمات درست بدرخشند!',
    items: [
      // 10 Misspelled
      { id: '110_w1', displayedText: 'اباس', isWrong: true, correctForm: 'عباس', explanation: 'عباس با نشانه (عـ) نوشته می‌شود', emoji: '👦' },
      { id: '110_w2', displayedText: 'سابون', isWrong: true, correctForm: 'صابون', explanation: 'صابون با نشانه (صـ) نوشته می‌شود', emoji: '🧼' },
      { id: '110_w3', displayedText: 'توتی', isWrong: true, correctForm: 'طوطی', explanation: 'طوطی با نشانه (ط) نوشته می‌شود', emoji: '🦜' },
      { id: '110_w4', displayedText: 'مسلس', isWrong: true, correctForm: 'مثلث', explanation: 'مثلث با نشانه (ث) نوشته می‌شود', emoji: '📐' },
      { id: '110_w5', displayedText: 'خاب', isWrong: true, correctForm: 'خواب', explanation: 'خواب با نشانه واو ناخوانا (خوا) نوشته می‌شود', emoji: '😴' },
      { id: '110_w6', displayedText: 'کلاق', isWrong: true, correctForm: 'کلاغ', explanation: 'کلاغ با نشانه (غ) نوشته می‌شود', emoji: '🦅' },
      { id: '110_w7', displayedText: 'هوله', isWrong: true, correctForm: 'حوله', explanation: 'حوله با نشانه (حـ) نوشته می‌شود', emoji: '🧖' },
      { id: '110_w8', displayedText: 'مریز', isWrong: true, correctForm: 'مریض', explanation: 'مریض با نشانه (ض) نوشته می‌شود', emoji: '🤒' },
      { id: '110_w9', displayedText: 'زرّت', isWrong: true, correctForm: 'ذرت', explanation: 'ذرت با نشانه (ذ) نوشته می‌شود', emoji: '🌽' },
      { id: '110_w10', displayedText: 'اتفاقن', isWrong: true, correctForm: 'اتفاقاً', explanation: 'اتفاقاً با علامت تنوین ( ً ) نوشته می‌شود', emoji: '💡' },

      // 10 Correct
      { id: '110_c1', displayedText: 'ایران', isWrong: false, correctForm: 'ایران', emoji: '🇮🇷' },
      { id: '110_c2', displayedText: 'پرچم', isWrong: false, correctForm: 'پرچم', emoji: '🚩' },
      { id: '110_c3', displayedText: 'کفگیر', isWrong: false, correctForm: 'کفگیر', emoji: '🍳' },
      { id: '110_c4', displayedText: 'پادشاه', isWrong: false, correctForm: 'پادشاه', emoji: '👑' },
      { id: '110_c5', displayedText: 'مدرسه', isWrong: false, correctForm: 'مدرسه', emoji: '🏫' },
      { id: '110_c6', displayedText: 'کتاب', isWrong: false, correctForm: 'کتاب', emoji: '📖' },
      { id: '110_c7', displayedText: 'ستاره', isWrong: false, correctForm: 'ستاره', emoji: '⭐' },
      { id: '110_c8', displayedText: 'دوستان', isWrong: false, correctForm: 'دوستان', emoji: '🤝' },
      { id: '110_c9', displayedText: 'همبرگر', isWrong: false, correctForm: 'همبرگر', emoji: '🍔' },
      { id: '110_c10', displayedText: 'الفبا', isWrong: false, correctForm: 'الفبا', emoji: '🎓' }
    ]
  }
};
