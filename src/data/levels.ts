import { LevelConfig } from '../types';
import soapImg from '../assets/images/soap_spelling_img_1787570244842.jpg';
import frogImg from '../assets/images/frog_spelling_img_1787570259870.jpg';
import umbrellaImg from '../assets/images/umbrella_spelling_img_1787570272452.jpg';
import samanuImg from '../assets/images/samanu_spelling_img_1787570287907.jpg';
import rubyImg from '../assets/images/ruby_spelling_img_1787570301320.jpg';

export interface ImageQuizLevelData {
  imageUrl: string;
  imageNamePersian: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  hint: string;
  targetWord: string;
}

export const IMAGE_QUIZ_DATA: Record<number, ImageQuizLevelData> = {
  1: {
    imageUrl: soapImg,
    imageNamePersian: 'صابون',
    targetWord: 'صابون',
    options: [
      { id: 'opt_1_1', text: 'سابون', isCorrect: false },
      { id: 'opt_1_2', text: 'صابون', isCorrect: true },
      { id: 'opt_1_3', text: 'ثابون', isCorrect: false }
    ],
    hint: 'صابون با نشانه «صـ» (صاد) نوشته می‌شود: صـ + ا + بـ + و + ن'
  },
  2: {
    imageUrl: frogImg,
    imageNamePersian: 'قورباغه',
    targetWord: 'قورباغه',
    options: [
      { id: 'opt_2_1', text: 'غورباقه', isCorrect: false },
      { id: 'opt_2_2', text: 'قورباقه', isCorrect: false },
      { id: 'opt_2_3', text: 'قورباغه', isCorrect: true }
    ],
    hint: 'قورباغه در اول با «قـ» و در پایان با «غـه» نوشته می‌شود: قـ + و + ر + بـ + ا + غـ + ـه'
  },
  3: {
    imageUrl: umbrellaImg,
    imageNamePersian: 'چتر',
    targetWord: 'چتر',
    options: [
      { id: 'opt_3_1', text: 'چطر', isCorrect: false },
      { id: 'opt_3_2', text: 'چتر', isCorrect: true }
    ],
    hint: 'چتر با نشانه «تـ» دو نقطه نوشته می‌شود: چـ + تـ + ر'
  },
  4: {
    imageUrl: samanuImg,
    imageNamePersian: 'سمنو',
    targetWord: 'سمنو',
    options: [
      { id: 'opt_4_1', text: 'سمنو', isCorrect: true },
      { id: 'opt_4_2', text: 'ثمنو', isCorrect: false },
      { id: 'opt_4_3', text: 'صمنو', isCorrect: false }
    ],
    hint: 'سمنو با نشانه «سـ» دندانه‌دار نوشته می‌شود: سـ + مـ + نـ + و'
  },
  5: {
    imageUrl: rubyImg,
    imageNamePersian: 'یاقوت',
    targetWord: 'یاقوت',
    options: [
      { id: 'opt_5_1', text: 'یاقوت', isCorrect: true },
      { id: 'opt_5_2', text: 'یاغوت', isCorrect: false },
      { id: 'opt_5_3', text: 'یاعوت', isCorrect: false }
    ],
    hint: 'یاقوت با نشانه «قـ» دو نقطه نوشته می‌شود: یـ + ا + قـ + و + ت'
  }
};

const INTRO_LEVELS: LevelConfig[] = [
  {
    id: 1,
    levelNumber: 1,
    title: 'مرحله اول: تصویر صابون',
    englishTitle: 'Soap Spelling',
    subtitle: 'مطابق با تصویر بالا ، گزینه ی درست املایی رو انتخاب کن',
    mechanic: 'image_spelling_quiz',
    environment: 'pineapple_home',
    isBoss: false,
    observationTimeSeconds: 0,
    roundsToComplete: 1,
    companionCharacterId: 'spongebob',
    descriptionPersian: 'به تصویر زیبای صابون نگاه کن و گزینه درست املایی را از بین ۳ گزینه انتخاب کن.',
    instructionPersian: 'مطابق با تصویر بالا ، گزینه ی درست املایی رو انتخاب کن',
    educationalFocus: 'تشخیص املای صحیح «صابون» با نشانه «صـ»'
  },
  {
    id: 2,
    levelNumber: 2,
    title: 'مرحله دوم: تصویر قورباغه',
    englishTitle: 'Frog Spelling',
    subtitle: 'مطابق با تصویر بالا ، گزینه ی درست املایی رو انتخاب کن',
    mechanic: 'image_spelling_quiz',
    environment: 'jellyfish_fields',
    isBoss: false,
    observationTimeSeconds: 0,
    roundsToComplete: 1,
    companionCharacterId: 'patrick',
    descriptionPersian: 'به تصویر قورباغه نگاه کن و گزینه درست املایی را لمس کن.',
    instructionPersian: 'مطابق با تصویر بالا ، گزینه ی درست املایی رو انتخاب کن',
    educationalFocus: 'تشخیص املای صحیح «قورباغه» با نشانه‌های «ق» و «غ»'
  },
  {
    id: 3,
    levelNumber: 3,
    title: 'مرحله سوم: تصویر چتر',
    englishTitle: 'Umbrella Spelling',
    subtitle: 'مطابق با تصویر بالا ، گزینه ی درست املایی رو انتخاب کن',
    mechanic: 'image_spelling_quiz',
    environment: 'sandy_dome',
    isBoss: false,
    observationTimeSeconds: 0,
    roundsToComplete: 1,
    companionCharacterId: 'sandy',
    descriptionPersian: 'به تصویر چتر نگاه کن و از بین ۲ گزینه، املای درست را انتخاب کن.',
    instructionPersian: 'مطابق با تصویر بالا ، گزینه ی درست املایی رو انتخاب کن',
    educationalFocus: 'تشخیص املای صحیح «چتر» با نشانه «ت»'
  },
  {
    id: 4,
    levelNumber: 4,
    title: 'مرحله چهارم: کاسه سمنو',
    englishTitle: 'Samanu Spelling',
    subtitle: 'مطابق با تصویر بالا ، گزینه ی درست املایی رو انتخاب کن',
    mechanic: 'image_spelling_quiz',
    environment: 'krusty_krab',
    isBoss: false,
    observationTimeSeconds: 0,
    roundsToComplete: 1,
    companionCharacterId: 'mr_krabs',
    descriptionPersian: 'به تصویر کاسه سمنو دقت کن و گزینه درست املایی را انتخاب کن.',
    instructionPersian: 'مطابق با تصویر بالا ، گزینه ی درست املایی رو انتخاب کن',
    educationalFocus: 'تشخیص املای صحیح «سمنو» با نشانه «سـ»'
  },
  {
    id: 5,
    levelNumber: 5,
    title: 'مرحله پنجم: نگین یاقوت',
    englishTitle: 'Ruby Spelling',
    subtitle: 'مطابق با تصویر بالا ، گزینه ی درست املایی رو انتخاب کن',
    mechanic: 'image_spelling_quiz',
    environment: 'neptune_palace',
    isBoss: false,
    observationTimeSeconds: 0,
    roundsToComplete: 1,
    companionCharacterId: 'spongebob',
    descriptionPersian: 'به تصویر یاقوت درخشان نگاه کن و گزینه درست املایی را انتخاب کن.',
    instructionPersian: 'مطابق با تصویر بالا ، گزینه ی درست املایی رو انتخاب کن',
    educationalFocus: 'تشخیص املای صحیح «یاقوت» با نشانه «قـ»'
  },
  {
    id: 6,
    levelNumber: 6,
    title: 'مرحله ششم: شکار حباب‌های غلط املایی ۱',
    englishTitle: 'Bubble Spelling Detective 1',
    subtitle: 'حباب کلمات اشتباه را پیدا کن و بترکان تا برنده شوی!',
    mechanic: 'twenty_bubble_spelling',
    environment: 'jellyfish_fields',
    isBoss: false,
    observationTimeSeconds: 0,
    roundsToComplete: 1,
    companionCharacterId: 'spongebob',
    descriptionPersian: 'کلمات داخل حباب‌ها را بخوان؛ حباب کلماتی که غلط املایی دارند را بترکان تا فقط کلمات درست باقی بمانند!',
    instructionPersian: 'حباب کلمات دارای غلط املایی را پیدا کن و بترکان!',
    educationalFocus: 'تشخیص املای صحیح واژگان (واو ناخوانا، ص/س، ث/س) و ترکاندن حباب‌های غلط'
  },
  {
    id: 7,
    levelNumber: 7,
    title: 'مرحله هفتم: شکارچی بزرگ حباب‌های غلط املایی',
    englishTitle: 'Grand Bubble Detective',
    subtitle: 'شکارچی شو! حباب‌های املای اشتباه (وضیر، اهساس، سبح، طمسلح و...) را بترکان!',
    mechanic: 'twenty_bubble_spelling',
    environment: 'neptune_palace',
    isBoss: true,
    bossNamePersian: 'پادشاه نپتون',
    observationTimeSeconds: 0,
    roundsToComplete: 1,
    companionCharacterId: 'spongebob',
    descriptionPersian: 'در میان ۲۹ حباب شناور، کلمات غلط املایی مانند وضیر، اهساس، سبح، گزشته، کسیف، دماق، طمسلح و تول را پیدا کن و بترکان!',
    instructionPersian: 'حباب کلمات دارای غلط املایی را پیدا کن و بترکان تا برنده شوی!',
    educationalFocus: 'مهارت املایی پیشرفته در تشخیص نشانه‌های هم‌صدا (ز/ض/ذ/ظ، س/ص/ث، ت/ط، غ/ق، ه/ح)'
  },
  {
    id: 8,
    levelNumber: 8,
    title: 'مرحله هشتم: بسکتبال کلمات و سطل زباله',
    englishTitle: 'Basketball vs Trash Spelling',
    subtitle: 'کلمات درست را شوت کن تو سبد 🏀 و غلط‌ها را بنداز تو سطل زباله 🗑️',
    mechanic: 'basketball_trash_sort',
    environment: 'sandy_dome',
    isBoss: false,
    observationTimeSeconds: 0,
    roundsToComplete: 1,
    companionCharacterId: 'sandy',
    descriptionPersian: '۲۹ کلمه به نوبت ظاهر می‌شوند؛ کلمات با املای درست را به سمت سبد بسکتبال پرتاب کن و کلمات با غلط املایی را به سطل زباله بینداز!',
    instructionPersian: 'کلمات درست را به سبد بسکتبال 🏀 و کلمات غلط را به سطل زباله 🗑️ بینداز!',
    educationalFocus: 'تفکیک سریع و تقویت حافظه دیداری برای نشانه‌های هم‌صدا، واو ناخوانا و دندانه‌ها'
  },
  {
    id: 9,
    levelNumber: 9,
    title: 'مرحله نهم: چالش شمارش بخش‌های کلمه',
    englishTitle: 'Syllable Counting Challenge',
    subtitle: 'کلمه رو ببین، بخش‌هاش رو بشمار و از بین گزینه‌های ۱ تا ۴ پاسخ درست رو انتخاب کن!',
    mechanic: 'syllable_count_quiz',
    environment: 'gary_library',
    isBoss: false,
    observationTimeSeconds: 0,
    roundsToComplete: 1,
    companionCharacterId: 'gary',
    descriptionPersian: '۲۰ کلمه متنوع (آب، گل، نان، ابر، مادر، کتاب، مدرسه، ستاره، کتابخانه و...) را بخش کن و تعداد بخش را از بین گزینه‌های ۱، ۲، ۳ و ۴ انتخاب کن!',
    instructionPersian: 'کلمه را بخوان، بخش‌هایش را بشمار و گزینه درست (۱، ۲، ۳ یا ۴) را انتخاب کن!',
    educationalFocus: 'تقویت مهارت تفکیک هجاها و بخش‌بندی کلمات فارسی پایه اول و دوم دبستان'
  }

];

const CURRICULUM_CHAPTERS = [
  { title: 'جنگل واژه‌ها', focus: 'خواندن و نوشتن واژه‌های ساده، واژه‌های هم‌خانواده و نشانه‌های آشنا', environment: 'pineapple_home' as const },
  { title: 'جزیره نشانه‌ها', focus: 'تشخیص نشانه‌های هم‌صدا و انتخاب املای درست واژه‌ها', environment: 'jellyfish_fields' as const },
  { title: 'شهر جمله‌ها', focus: 'کامل‌کردن جمله، درک معنی واژه و کاربرد آن در جمله', environment: 'krusty_krab' as const },
  { title: 'کارگاه کلمه‌سازی', focus: 'ساخت واژه از حروف و بخش‌ها و تقویت دقت دیداری', environment: 'sandy_dome' as const },
  { title: 'دره درک مطلب', focus: 'خواندن دقیق، فهم واژه‌ها و پیدا کردن پاسخ مناسب', environment: 'gary_library' as const },
  { title: 'جزیره هم‌قافیه‌ها', focus: 'شناخت آهنگ واژه‌ها، بخش‌بندی و صداهای پایانی', environment: 'jellyfish_fields' as const },
  { title: 'آزمایشگاه دقت', focus: 'تقویت حافظه دیداری، ترتیب واژه‌ها و تشخیص تفاوت‌ها', environment: 'sandy_dome' as const },
  { title: 'بندر دیکته', focus: 'گوش‌دادن، درست‌نویسی و اصلاح اشتباه‌های رایج', environment: 'krusty_krab' as const },
  { title: 'قلعه فارسی', focus: 'ترکیب مهارت‌های املا، واژه‌سازی و جمله‌خوانی', environment: 'neptune_palace' as const },
  { title: 'قصر قهرمانان فارسی', focus: 'مرور مهارت‌های پایه دوم و سوم در آزمون بزرگ پایانی', environment: 'neptune_palace' as const }
];

const CURRICULUM_MECHANICS: LevelConfig['mechanic'][] = [
  'spelling_choice',
  'missing_letter',
  'similar_letters_discrim',
  'scrambled_letters_word',
  'sentence_completion',
  'visual_memory_order',
  'find_new_word',
  'find_missing_word',
  'visual_difference',
  'flash_memory',
  'speed_hunt',
  'combination_challenge',
  'treasure_words',
  'krabby_burger_builder',
  'jellyfish_net_catch',
  'sandy_target_kick',
  'word_rhyme_bubble',
  'audio_dictation_listen'
];

const CURRICULUM_COMPANIONS = ['spongebob', 'patrick', 'sandy', 'gary', 'mr_krabs', 'squidward'];
const CURRICULUM_BOSSES: NonNullable<LevelConfig['bossCharacter']>[] = [
  'king_neptune_boss', 'plankton_boss', 'jelly_king', 'shark_boss', 'squidward_boss',
  'gary_boss', 'crystal_golem', 'guardian_whale', 'pirate_captain', 'king_neptune_boss'
];

const CURRICULUM_MISSIONS = [
  'گنج واژه‌های درست را پیدا کن',
  'حرف گمشده را به خانه‌اش برگردان',
  'نشانه‌ی درست را از میان رقیب‌ها انتخاب کن',
  'حروف به‌هم‌ریخته را به یک واژه‌ی قشنگ تبدیل کن',
  'جمله‌ی ناقص را کامل کن',
  'ترتیب واژه‌ها را مثل یک قهرمان به خاطر بسپار',
  'واژه‌ی تازه‌وارد را پیدا کن',
  'جای خالی واژه‌ی ناپدیدشده را کشف کن',
  'کلمه‌ی متفاوت را با چشم تیزبین پیدا کن',
  'واژه‌ی درخشان را به خاطر بسپار',
  'پیش از تمام شدن زمان، واژه‌ی هدف را شکار کن',
  'از چند چالش فارسی با موفقیت عبور کن',
  'صندوقچه‌ی واژه‌های ارزشمند را باز کن',
  'بخش‌های کلمه را مثل یک برگر خوشمزه کنار هم بچین',
  'عروس‌های دریاییِ واژه‌ها را با تور بگیر',
  'تخته‌ی دارای غلط املایی را بشکن',
  'حباب‌های هم‌آهنگ و هم‌قافیه را پیدا کن',
  'بخش‌ها و صداهای واژه را بشمار',
  'به دیکته گوش کن و شکل درست را انتخاب کن',
  'حباب اشتباه را پیش از فرار بترکان'
];

const EXTENDED_LEVELS: LevelConfig[] = Array.from({ length: 91 }, (_, index) => {
  const id = index + 10;
  const chapterIndex = Math.min(9, Math.floor((id - 10) / 10));
  const chapter = CURRICULUM_CHAPTERS[chapterIndex];
  const grade = id < 50 ? 2 : 3;
  const isBoss = id % 10 === 0 || id === 100;
  // Stage 19 uses the spelling-choice mechanic: the child must identify the misspelled word.
  // The old visual_difference setup relied on a fallback punctuation mark for many words,
  // which did not create a meaningful Persian spelling error.
  // Stage 20 is a four-choice spelling boss: exactly one word is correct.
  const mechanic = isBoss
    ? 'final_boss'
    : id === 19
      ? 'spelling_choice'
      : id === 23
        ? 'letter_circle_builder'
        : CURRICULUM_MECHANICS[(id - 11) % CURRICULUM_MECHANICS.length];
  const mission = id === 20
    ? 'از میان چهار واژه‌ی متفاوت، تنها واژه‌ای را پیدا کن که املای درست دارد'
    : id === 23
      ? 'حروف داخل دایره را کنار هم بگذار و واژه‌های تازه بساز'
      : isBoss
      ? 'آزمون بزرگ این سرزمین را پشت سر بگذار و نشان قهرمان فارسی را بگیر!'
      : id === 19
        ? 'حبابِ واژه‌ای را که غلط املایی دارد پیدا کن و بترکان'
        : CURRICULUM_MISSIONS[(id - 11) % CURRICULUM_MISSIONS.length];
  return {
    id,
    levelNumber: id,
    title: isBoss ? `مرحله ${id}: نبرد بزرگ ${chapter.title}` : `مرحله ${id}: ${mission}`,
    englishTitle: `Persian Adventure Level ${id}`,
    subtitle: `پایه ${grade === 2 ? 'دوم' : 'سوم'} • ${chapter.title}`,
    mechanic,
    environment: chapter.environment,
    isBoss,
    ...(isBoss ? {
      bossCharacter: CURRICULUM_BOSSES[chapterIndex],
      bossNamePersian: ['فرمانروای واژه‌ها', 'پلانکتون بداملاء', 'پادشاه جمله‌ها', 'غول حروف گمشده', 'نگهبان درک مطلب', 'شاه قافیه‌ها', 'ربات حافظه', 'ناخدای دیکته', 'اژدهای غلط‌های املایی', 'پادشاه بزرگ فارسی'][chapterIndex]
    } : {}),
    observationTimeSeconds: mechanic === 'visual_memory_order' || mechanic === 'find_new_word' || mechanic === 'find_missing_word' ? (grade === 2 ? 4 : 3) : 0,
    roundsToComplete: isBoss ? 4 : 3,
    companionCharacterId: CURRICULUM_COMPANIONS[index % CURRICULUM_COMPANIONS.length],
    descriptionPersian: id === 23
      ? 'در هر راند یک دایره از حروف می‌بینی. با انتخاب حروف، واژه‌ی نشان‌داده‌شده با تصویر و راهنما را بساز؛ در راند اول ۴ واژه، راند دوم ۶ واژه و راند سوم ۱۰ واژه باید کامل کنی.'
      : id === 21
      ? 'عزیزم, برای موفقیت در این مرحله باید سرعت خواندن و مهارت دیداری قوی داشته باشی تا بتوانی کلمه‌ی هدف را سریع شکار کنی. اگر آماده‌ای، روی دکمه‌ی شروع کلیک کن!'
      : id === 20
        ? 'در هر راند چهار واژه‌ی متفاوت می‌بینی؛ فقط یکی از آن‌ها املای درست دارد و سه واژه‌ی دیگر غلط املایی دارند. با دقت گزینه‌ی درست را پیدا کن.'
        : `ماجراجوی پایه ${grade === 2 ? 'دوم' : 'سوم'}! در ${chapter.title} باید ${mission}؛ هر پاسخ درست تو را به گنج بعدی نزدیک‌تر می‌کند.`,
    instructionPersian: id === 23
      ? 'حروف داخل دایره را به ترتیب درست انتخاب کن و کلمه را بساز؛ هر راند تعداد بیشتری واژه در انتظارت است!'
      : id === 20
      ? 'چهار واژه‌ی متفاوت می‌بینی؛ فقط یکی درست نوشته شده است. املای درست را پیدا کن!'
      : id === 21
        ? 'برای شکار واژه باید تند و دقیق بخوانی؛ در هر راند فقط ۶ ثانیه فرصت داری!'
        : isBoss
          ? `وقت آزمون قهرمان‌هاست! ${chapter.focus} را به کار بگیر و به پادشاه این مرحله نشان بده چه بلدی!`
          : `ماموریت تو: ${mission}! با دقت بخوان، فکر کن و پاسخ درست را انتخاب کن.`,
    educationalFocus: id === 23
      ? 'تقویت شناخت حروف، ترتیب‌دهی نشانه‌ها، ترکیب حروف و ساخت واژه با حافظه‌ی دیداری'
      : id === 20
      ? 'تشخیص املای صحیح واژه‌ها و تمایز میان شکل درست و سه شکل دارای غلط املایی'
      : id === 21
        ? 'افزایش سرعت خواندن، تقویت توجه دیداری و تشخیص سریع واژه‌ی هدف'
        : id === 19
          ? 'تشخیص واژه‌های دارای غلط املایی و مقایسه‌ی شکل درست و نادرست واژه‌ها'
          : chapter.focus,
    zoneIndex: chapterIndex
  };
});

export const GAME_LEVELS: LevelConfig[] = [...INTRO_LEVELS, ...EXTENDED_LEVELS];

export const getLevelById = (id: number): LevelConfig | undefined => {
  return GAME_LEVELS.find(l => l.id === id);
};
