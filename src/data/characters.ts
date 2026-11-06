import { Character } from '../types';
import spongebobImg from '../assets/images/spongebob_art_1787503287674.jpg';
import patrickImg from '../assets/images/patrick_art_1787503301653.jpg';
import squidwardImg from '../assets/images/squidward_art_1787503314380.jpg';
import mrKrabsImg from '../assets/images/mr_krabs_art_1787503326971.jpg';
import sandyImg from '../assets/images/sandy_art_1787503340299.jpg';
import garyImg from '../assets/images/gary_art_1787503352275.jpg';
import planktonImg from '../assets/images/plankton_art_1787503363340.jpg';
import kingNeptuneImg from '../assets/images/neptune_art_1787503396713.jpg';

export const CHARACTERS: Character[] = [
  {
    id: 'spongebob',
    namePersian: 'باب اسفنجی شلوار مکعبی',
    titlePersian: 'قهرمان شاداب بیکینی باتم',
    personality: 'بسیار پرانرژی، خنده‌رو، کنجکاو و همیشه آماده برای یادگیری کلمات جدید!',
    imageUrl: spongebobImg,
    colorScheme: {
      primary: '#facc15',
      secondary: '#ca8a04',
      accent: '#ef4444',
      bgGlow: 'rgba(250, 204, 21, 0.45)'
    },
    cheerVoiceLines: [
      'هورااا! من آماده‌ام، تو هم فوق‌العاده‌ای!',
      'عالی بود! مثل یک همبرگر خرچنگی بی‌نقص!',
      'بهترین املای تمام اقیانوس بود!',
      'وای خدای من، چه دقتی! آفرین رفیق!',
      'یک ستاره درخشان دیگر برای تو!'
    ],
    retryVoiceLines: [
      'اشکالی نداره رفیق! یه بار دیگه با هم تلاش می‌کنیم!',
      'حتی گری هم گاهی اشتباه می‌کنه، دوباره امتحان کن!',
      'من آماده‌ام! تو هم می‌تونی درستش کنی!',
      'یه نگاه دقیق‌تر بنداز، جواب خیلی نزدیکه!'
    ],
    avatarSvgType: 'spongebob',
    unlockedByDefault: true
  },
  {
    id: 'patrick',
    namePersian: 'پاتریک ستاره',
    titlePersian: 'دوست وفادار و خوش‌قلب',
    personality: 'خوش‌خنده، صمیمی، ساده‌دل و پر از شگفتی‌های بامزه!',
    imageUrl: patrickImg,
    colorScheme: {
      primary: '#f87171',
      secondary: '#dc2626',
      accent: '#84cc16',
      bgGlow: 'rgba(248, 113, 113, 0.45)'
    },
    cheerVoiceLines: [
      'وای! مغز من داره از خوشحالی پرواز می‌کنه!',
      'تو از من هم باهوش‌تری! ایول!',
      'هورااا! بریم جشن شکار عروس دریایی بگیریم!',
      'عجب هوشی داری رفیق ستاره‌ای من!'
    ],
    retryVoiceLines: [
      'صبر کن ببینم... منم اولش همین فکر رو کردم! دوباره بزن!',
      'اشکالی نداره، شکلاتتو بخور و دوباره فکر کن!',
      'یه بار دیگه تلاش کن، ما با هم موفق می‌شیم!'
    ],
    avatarSvgType: 'patrick',
    unlockedByDefault: true
  },
  {
    id: 'squidward',
    namePersian: 'اختاپوس دانا',
    titlePersian: 'استاد هنر و ادبیات دریا',
    personality: 'دقیق، نکته‌سنج، عاشق هنر، خط خوش و املای بی‌نقص!',
    imageUrl: squidwardImg,
    colorScheme: {
      primary: '#2dd4bf',
      secondary: '#0f766e',
      accent: '#fde047',
      bgGlow: 'rgba(45, 212, 191, 0.45)'
    },
    cheerVoiceLines: [
      'حتی نت‌های کلارینت من هم به زیبایی پاسخ تو نبودند!',
      'تحسین‌برانگیز بود! یک اثر هنری واقعی در املا!',
      'کاملاً اصولی و باوقار پاسخ دادی! آفرین!',
      'بسیار عالی، دقت ادبی تو ستودنی است!'
    ],
    retryVoiceLines: [
      'کمی تمرکز بیشتر روی جزئیات لازم است. دوباره امتحان کن!',
      'هنر نیاز به تمرین دارد، با دقت بیشتری نگاه کن!',
      'دندانه‌ها و نقطه‌ها را از نو بررسی کن!'
    ],
    avatarSvgType: 'squidward',
    unlockedByDefault: false,
    unlockCostCoins: 80
  },
  {
    id: 'mr_krabs',
    namePersian: 'آقای خرچنگ زرنگ',
    titlePersian: 'نگهبان سکه‌ها و گنجینه‌ها',
    personality: 'زرنگ، حسابگر، عاشق سکه‌های طلا و پاداش‌های درخشان!',
    imageUrl: mrKrabsImg,
    colorScheme: {
      primary: '#ef4444',
      secondary: '#b91c1c',
      accent: '#facc15',
      bgGlow: 'rgba(239, 68, 68, 0.45)'
    },
    cheerVoiceLines: [
      'جینگ جینگ! بوی سکه‌های طلای جایزه می‌آید!',
      'هزاران سکه گوارای وجودت با این دقت عالی!',
      'یک پاسخ گرانبها و درخشان مانند مروارید!',
      'آفرین بر تو، گنجینه هوش دریایی!'
    ],
    retryVoiceLines: [
      'مواظب سکه‌هات باش ملوان! دوباره با دقت شلیک کن!',
      'صبر کن ببینم، فرمول این کلمه فرق داشت! دوباره بزن!',
      'هیچ تاجری با اولین اشتباه تسلیم نمی‌شود!'
    ],
    avatarSvgType: 'mr_krabs',
    unlockedByDefault: false,
    unlockCostCoins: 120
  },
  {
    id: 'sandy',
    namePersian: 'سندی ماجراجو',
    titlePersian: 'دانشمند و مخترع زیر آب',
    personality: 'شجاع، علمی، ورزشکار، مسلط به کلمات پیچیده و حافظه برق‌آسا!',
    imageUrl: sandyImg,
    colorScheme: {
      primary: '#d97706',
      secondary: '#b45309',
      accent: '#ec4899',
      bgGlow: 'rgba(217, 119, 6, 0.45)'
    },
    cheerVoiceLines: [
      'یا هووو! مثل رعد و برق تگزاس سریع و درست بود!',
      'دقت آزمایشگاهی‌ات فوق‌العاده است قهرمان!',
      'فرمول علمی این مرحله رو با موفقیت کشف کردی!',
      'عالی بود! نشان دانشمند طلایی برازنده توست!'
    ],
    retryVoiceLines: [
      'یک دانشمند از هر آزمایش درس می‌گیره! دوباره امتحان کن!',
      'محاسباتت رو بررسی کن، پاسخ درست خیلی شفافه!',
      'کمربند شجاعتت رو سفت کن و دوباره بزن!'
    ],
    avatarSvgType: 'sandy',
    unlockedByDefault: false,
    unlockCostCoins: 160
  },
  {
    id: 'gary',
    namePersian: 'گری حلزون باهوش',
    titlePersian: 'فیلسوف کتابخانه بیکینی باتم',
    personality: 'آرام، دانا، با چشمانی تیزبین برای پیدا کردن کوچک‌ترین تفاوت‌ها!',
    imageUrl: garyImg,
    colorScheme: {
      primary: '#f472b6',
      secondary: '#be185d',
      accent: '#38bdf8',
      bgGlow: 'rgba(244, 114, 182, 0.45)'
    },
    cheerVoiceLines: [
      'میائو! (یعنی پاسخ شما بی‌نهایت هوشمندانه بود!)',
      'میائو میائو! (آفرین بر حافظه تصویری خیره‌کننده‌ات!)',
      'میائو! (کلمات را مثل کتاب شعر حفظ کرده‌ای!)'
    ],
    retryVoiceLines: [
      'میائو؟ (آرام باش و با طمأنینه یک بار دیگر کلمه را بخوان!)',
      'میائو! (دوباره امتحان کن، تو حتماً می‌توانی!)'
    ],
    avatarSvgType: 'gary',
    unlockedByDefault: false,
    unlockCostCoins: 200
  },
  {
    id: 'plankton',
    namePersian: 'پلانکتون پرانرژی',
    titlePersian: 'استاد محاسبات ریز و سریع',
    personality: 'بسیار مصمم، باهوش، سریع و مشتاق کشف رمز و رازها!',
    imageUrl: planktonImg,
    colorScheme: {
      primary: '#16a34a',
      secondary: '#15803d',
      accent: '#dc2626',
      bgGlow: 'rgba(22, 163, 74, 0.45)'
    },
    cheerVoiceLines: [
      'هاهاها! نقشه پیروزی با موفقیت کامل اجرا شد!',
      'عجب تمرکز میکروسکوپی و دقیقی! شگفت‌انگیز بود!',
      'فرمول کلمات در دستان پرقدرت توست!'
    ],
    retryVoiceLines: [
      'شکست برای ما معنا ندارد! دوباره نقشه را اجرا کن!',
      'تنها یک تغییر کوچک لازم است، دوباره امتحان کن!'
    ],
    avatarSvgType: 'plankton',
    unlockedByDefault: false,
    unlockCostCoins: 250
  },
  {
    id: 'king_neptune',
    namePersian: 'پادشاه نپتون',
    titlePersian: 'فرمانروای افسانه‌ای اقیانوس کلمات',
    personality: 'پرشکوه، مهربان، بخشنده و اعطا کننده مدال‌های ۵۰ ستاره!',
    imageUrl: kingNeptuneImg,
    colorScheme: {
      primary: '#eab308',
      secondary: '#ca8a04',
      accent: '#10b981',
      bgGlow: 'rgba(234, 179, 8, 0.5)'
    },
    cheerVoiceLines: [
      'به نام پادشاهی دریاها، شایستگی تو به بالاترین درجه رسید!',
      'کفگیر طلایی و افتخار کلاس دوم برازنده توست!',
      'افتخار اقیانوس بر تو باد، فاتح ۵۰ مرحله طلایی!'
    ],
    retryVoiceLines: [
      'صبر و تلاش، راز هر پادشاه داناست. دوباره بکوش!',
      'امواج دریا با تو همراهند، دوباره امتحان کن!'
    ],
    avatarSvgType: 'king_neptune',
    unlockedByDefault: false,
    unlockCostCoins: 350
  }
];

export const getCharacterById = (id: string): Character => {
  // Alias support for backwards compatibility
  const aliasMap: Record<string, string> = {
    puki: 'spongebob',
    octo: 'squidward',
    changool: 'mr_krabs',
    dana: 'sandy',
    jelly: 'gary',
    sharky: 'plankton',
    starry: 'patrick',
    esbi: 'king_neptune'
  };

  const resolvedId = aliasMap[id] || id;
  return CHARACTERS.find(c => c.id === resolvedId) || CHARACTERS[0];
};
