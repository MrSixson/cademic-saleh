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

export const GAME_LEVELS: LevelConfig[] = [
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

export const getLevelById = (id: number): LevelConfig | undefined => {
  return GAME_LEVELS.find(l => l.id === id);
};
