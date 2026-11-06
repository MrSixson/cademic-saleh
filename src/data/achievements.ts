import { Achievement } from '../types';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_step',
    titlePersian: 'اولین پیروزی: صابون',
    descriptionPersian: 'مرحله اول و املای صحیح «صابون» را با موفقیت تمام کردی!',
    iconName: 'Footprints',
    requiredCount: 1,
    rewardCoins: 20,
    category: 'levels'
  },
  {
    id: 'frog_master',
    titlePersian: 'قهرمان برکه: قورباغه',
    descriptionPersian: 'مرحله دوم و تشخیص «ق» و «غ» در واژه «قورباغه» را کامل کردی!',
    iconName: 'Sparkles',
    requiredCount: 2,
    rewardCoins: 40,
    category: 'levels'
  },
  {
    id: 'umbrella_master',
    titlePersian: 'پناه باران: چتر',
    descriptionPersian: 'مرحله سوم و املای درست «چتر» با نشانه «ت» را فتح کردی!',
    iconName: 'Shield',
    requiredCount: 3,
    rewardCoins: 60,
    category: 'levels'
  },
  {
    id: 'samanu_master',
    titlePersian: 'استاد سفره نوروز: سمنو',
    descriptionPersian: 'مرحله چهارم و املای شیرین «سمنو» با نشانه «س» را پاسخ دادی!',
    iconName: 'Award',
    requiredCount: 4,
    rewardCoins: 80,
    category: 'levels'
  },
  {
    id: 'ruby_king',
    titlePersian: 'درخشش نگین یاقوت',
    descriptionPersian: 'مرحله پنجم و املای درخشان «یاقوت» را با موفقیت پشت سر گذاشتی!',
    iconName: 'Sparkles',
    requiredCount: 5,
    rewardCoins: 100,
    category: 'levels'
  },
  {
    id: 'bubble_master_6',
    titlePersian: 'کارآگاه تیزبین حباب‌های املایی',
    descriptionPersian: 'مرحله ششم و چالش ترکاندن حباب کلمات غلط را با موفقیت پشت سر گذاشتی!',
    iconName: 'Sparkles',
    requiredCount: 6,
    rewardCoins: 120,
    category: 'levels'
  },
  {
    id: 'bubble_boss_master',
    titlePersian: 'شکارچی اعظم حباب‌های نپتون',
    descriptionPersian: 'مرحله هفتم و چالش ۲۹ حباب املایی را با پیروزی قاطع فتح کردی!',
    iconName: 'Crown',
    requiredCount: 7,
    rewardCoins: 250,
    category: 'bosses'
  },
  {
    id: 'basketball_spelling_star',
    titlePersian: 'ستاره بسکتبال کلمات',
    descriptionPersian: 'مرحله هشتم و چالش پرتاب کلمات درست به سبد بسکتبال و تفکیک کلمات غلط را کامل کردی!',
    iconName: 'Trophy',
    requiredCount: 8,
    rewardCoins: 150,
    category: 'levels'
  },
  {
    id: 'syllable_count_master',
    titlePersian: 'استاد هجا و بخش‌بندی کلمات',
    descriptionPersian: 'مرحله نهم و چالش ۲۰ کلمه‌ای شمارش بخش‌های کلمه را با موفقیت فتح کردی!',
    iconName: 'Sparkles',
    requiredCount: 9,
    rewardCoins: 150,
    category: 'levels'
  },
  {
    id: 'combo_3',
    titlePersian: 'زنجیره ۳ پاسخ درست',
    descriptionPersian: '۳ مرحله را بدون اشتباه پشت سر هم جواب دادی!',
    iconName: 'Flame',
    requiredCount: 3,
    rewardCoins: 30,
    category: 'streak'
  },
  {
    id: 'combo_5',
    titlePersian: 'طوفان بدون اشتباه ۵ پاسخ',
    descriptionPersian: 'تمام ۵ مرحله را با هوش و دقت کامل پاسخ دادی!',
    iconName: 'Zap',
    requiredCount: 5,
    rewardCoins: 60,
    category: 'streak'
  }
];
