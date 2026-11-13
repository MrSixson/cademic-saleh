export interface SoundChallenge {
  sound: string;
  target: string;
  options: string[];
}

export const SOUND_CHALLENGES: SoundChallenge[] = [
  { sound: 'صدای اول (آ)', target: 'آب', options: ['آب', 'بابا', 'دست', 'مداد'] },
  {
    sound: 'صدای اول (ج)',
    target: 'جوجه',
    options: ['جوجه', 'قاشق', 'گلابی', 'پنجره'],
    grade: 2,
    skill: 'تشخیص صدای آغازین واژه',
    answer: 'جوجه',
    explanation: 'واژه‌ی جوجه با صدای «ج» آغاز می‌شود.'
  },
  { sound: 'صدای اول (ب)', target: 'باران', options: ['باران', 'مادر', 'دریا', 'نان'] },
  { sound: 'صدای اول (م)', target: 'مدرسه', options: ['مدرسه', 'کتاب', 'پرچم', 'سیب'] },
  { sound: 'صدای اول (ک)', target: 'کتاب', options: ['کتاب', 'مداد', 'باران', 'تاب'] },
  { sound: 'صدای اول (د)', target: 'درخت', options: ['درخت', 'پرنده', 'انار', 'گل'] },
  { sound: 'صدای اول (س)', target: 'سیب', options: ['سیب', 'توت', 'بادام', 'انار'] },
  { sound: 'صدای اول (پ)', target: 'پرچم', options: ['پرچم', 'درخت', 'نان', 'آب'] },
  { sound: 'صدای اول (ن)', target: 'نان', options: ['نان', 'بادام', 'سیب', 'گل'] },
  { sound: 'صدای آخر (ب)', target: 'سیب', options: ['سیب', 'توت', 'بادام', 'انار'] },
  { sound: 'صدای آخر (ن)', target: 'باران', options: ['باران', 'آب', 'بابا', 'دست'] },
  { sound: 'صدای آخر (ت)', target: 'دست', options: ['دست', 'دریا', 'مادر', 'میز'] },
  { sound: 'صدای آخر (ر)', target: 'انار', options: ['انار', 'سیب', 'پرچم', 'آب'] },
  { sound: 'صدای آخر (م)', target: 'بادام', options: ['بادام', 'توت', 'دست', 'درخت'] },
  { sound: 'صدای آخر (د)', target: 'مداد', options: ['مداد', 'کتاب', 'باران', 'پرنده'] },
  { sound: 'صدای اول (ت)', target: 'توت', options: ['توت', 'دست', 'سیب', 'آب'] },
  { sound: 'صدای اول (خ)', target: 'خورشید', options: ['خورشید', 'درخت', 'مادر', 'سیب'] },
  { sound: 'صدای اول (ص)', target: 'صابون', options: ['صابون', 'سوزن', 'سیب', 'ساعت'] },
  { sound: 'صدای آخر (ش)', target: 'آتش', options: ['آتش', 'آب', 'نان', 'کتاب'] },
  { sound: 'صدای اول (ط)', target: 'طوطی', options: ['طوطی', 'توت', 'تاب', 'توپ'] },
  { sound: 'صدای آخر (ز)', target: 'میز', options: ['میز', 'مداد', 'انار', 'آب'] }
];

export const KHWA_CHALLENGES = [
  { correct: 'خواب', wrong: 'خاب', note: 'کلمه خواب با (خوا) نوشته می‌شود، ولی خاب خوانده می‌شود' },
  { correct: 'خواهر', wrong: 'خاهر', note: 'کلمه خواهر با واو ناخوانا نوشته می‌شود' },
  { correct: 'خواندن', wrong: 'خاندن', note: 'خواندن با (خوا) ناخوانا نوشته می‌شود' },
  { correct: 'خواستن', wrong: 'خاستن', note: 'خواستن با (خوا) ناخوانا نوشته می‌شود' },
  { correct: 'تختخواب', wrong: 'تختخاب', note: 'تختخواب با (خوا) نوشته می‌شود' },
  { correct: 'خوابیدن', wrong: 'خابیدن', note: 'خوابیدن دارای واو ناخوانا است' },
  { correct: 'خواهش', wrong: 'خاهش', note: 'خواهش با واو ناخوانا نوشته می‌شود' },
  { correct: 'خوانا', wrong: 'خانا', note: 'خط خوانا با واو ناخوانا نوشته می‌شود' },
  { correct: 'استخوان', wrong: 'استخان', note: 'استخوان با واو ناخوانا نوشته می‌شود' },
  { correct: 'خویشان', wrong: 'خیشان', note: 'خویشان با واو ناخوانا نوشته می‌شود' }
];

export const TASHDID_CHALLENGES = [
  { word: 'معلّم', without: 'معلم', desc: 'معلّم دارای علامت تشدید ّ روی حرف ل است' },
  { word: 'بنّا', without: 'بنا', desc: 'بنّا دارای علامت تشدید ّ روی حرف ن است' },
  { word: 'نجّار', without: 'نجار', desc: 'نجّار دارای علامت تشدید ّ روی حرف ج است' },
  { word: 'تشکّر', without: 'تشکر', desc: 'تشکّر دارای علامت تشدید ّ روی حرف ک است' },
  { word: 'دقّت', without: 'دقت', desc: 'دقّت دارای علامت تشدید ّ روی حرف ق است' },
  { word: 'مکّه', without: 'مکه', desc: 'مکّه شهر مقدس دارای علامت تشدید ّ روی حرف ک است' },
  { word: 'اوّل', without: 'اول', desc: 'کلاس اوّل دارای علامت تشدید ّ روی حرف و است' },
  { word: 'بچّه', without: 'بچه', desc: 'بچّه دارای علامت تشدید ّ روی حرف چ است' },
  { word: 'نقّاش', without: 'نقاش', desc: 'نقّاش هنرمند دارای تشدید روی حرف ق است' },
  { word: 'مربّا', without: 'مربا', desc: 'مربّای شیرین دارای تشدید روی حرف ب است' },
  { word: 'قلّاب', without: 'قلاب', desc: 'قلّاب ماهی‌گیری با تشدید روی ل نوشته می‌شود' },
  { word: 'طیّاره', without: 'طیاره', desc: 'طیّاره با تشدید روی ی نوشته می‌شود' },
  { word: 'قنّاد', without: 'قناد', desc: 'قنّاد شیرینی‌پز با تشدید روی ن نوشته می‌شود' }
];

export const TANVIN_CHALLENGES = [
  { correct: 'اتفاقاً', wrong: 'اتفاقن', desc: 'صدای (اَن) در پایان این کلمه تنوین ( ً ) است نه نون' },
  { correct: 'حتماً', wrong: 'حتمن', desc: 'حتماً با علامت تنوین نوشته می‌شود' },
  { correct: 'مثلاً', wrong: 'مثلن', desc: 'مثلاً با علامت تنوین نوشته می‌شود' },
  { correct: 'قطعاً', wrong: 'قطعن', desc: 'قطعاً با علامت تنوین نوشته می‌شود' },
  { correct: 'واقعاً', wrong: 'واقعن', desc: 'واقعاً با علامت تنوین نوشته می‌شود' },
  { correct: 'کاملاً', wrong: 'کاملن', desc: 'کاملاً با علامت تنوین نوشته می‌شود' },
  { correct: 'معمولاً', wrong: 'معمولن', desc: 'معمولاً با علامت تنوین نوشته می‌شود' },
  { correct: 'قرائت', wrong: 'قرایت', desc: 'قرائت با نشانه همزه نوشته می‌شود' },
  { correct: 'جزء', wrong: 'جز', desc: 'جزء با همزه پایانی نوشته می‌شود' },
  { correct: 'مؤدب', wrong: 'مودب', desc: 'مؤدب با همزه روی واو نوشته می‌شود' },
  { correct: 'مسأله', wrong: 'مسئله', desc: 'مسأله با همزه روی الف نوشته می‌شود' }
];

export const SENTENCE_CHALLENGES = [
  { sentence: 'من هر روز به ... می‌روم.', answer: 'مدرسه', options: ['مدرسه', 'دریا', 'باغ', 'خانه'] },
  {
    sentence: 'سارا کتابی را که امانت گرفته بود، پس از خواندن به ... برگرداند.',
    answer: 'کتابخانه',
    options: ['کتابخانه', 'نانوایی', 'زمین بازی', 'آشپزخانه'],
    grade: 2,
    skill: 'درک جمله و انتخاب واژه مناسب',
    explanation: 'کتاب امانتی پس از خواندن به کتابخانه برگردانده می‌شود.'
  },
  {
    sentence: 'واژه‌ی «شادمان» یعنی ...',
    answer: 'خوشحال',
    options: ['خوشحال', 'خسته', 'ترسیده', 'گرسنه'],
    grade: 3,
    skill: 'درک معنی واژه',
    explanation: 'شادمان یعنی خوشحال و شاد.'
  },
  { sentence: 'مادر برای من یک ... خرید.', answer: 'دفتر', options: ['دفتر', 'باران', 'پرنده', 'درخت'] },
  { sentence: 'پرنده روی شاخه‌ی ... نشست.', answer: 'درخت', options: ['درخت', 'مداد', 'کفش', 'نان'] },
  { sentence: 'ما با ... نقاشی می‌کشیم.', answer: 'مداد', options: ['مداد', 'قاشق', 'توپ', 'باران'] },
  { sentence: 'در آسمان آبی، ... می‌تابد.', answer: 'خورشید', options: ['خورشید', 'کتاب', 'صندلی', 'مدرسه'] },
  { sentence: 'بابا یک ... تازه از باغ چید.', answer: 'سیب', options: ['سیب', 'دفتر', 'کفش', 'قلم'] },
  { sentence: 'ماهی در ... زندگی می‌کند.', answer: 'آب', options: ['آب', 'درخت', 'آسمان', 'کلاس'] },
  { sentence: 'در فصل بهار، گل‌ها ... می‌شوند.', answer: 'شکوفا', options: ['شکوفا', 'خسته', 'خاموش', 'گم'] },
  { sentence: 'من کتابم را در ... گذاشتم.', answer: 'کیف', options: ['کیف', 'باغ', 'آسمان', 'دریا'] },
  { sentence: 'زنبور از روی گل ... جمع می‌کند.', answer: 'شهد', options: ['شهد', 'سنگ', 'برف', 'خاک'] },
  { sentence: 'برای پاک کردن دست‌ها از ... استفاده می‌کنیم.', answer: 'صابون', options: ['صابون', 'مداد', 'توپ', 'کتاب'] },
  { sentence: 'خواهرم با ... قصه می‌خواند.', answer: 'کتاب', options: ['کتاب', 'قاشق', 'چتر', 'لیوان'] },
  { sentence: 'در روز بارانی، ... برمی‌دارم.', answer: 'چتر', options: ['چتر', 'عینک', 'مداد', 'نان'] },
  { sentence: 'خرگوش با ... بلندش می‌پرد.', answer: 'گوش', options: ['گوش', 'بال', 'چرخ', 'دست'] },
  { sentence: 'ما در باغ، یک ... دیدیم.', answer: 'پروانه', options: ['پروانه', 'مدرسه', 'دفتر', 'قاشق'] },
  { sentence: 'دانش‌آموزان با دقت به ... گوش می‌دهند.', answer: 'آموزگار', options: ['آموزگار', 'باران', 'پرنده', 'ساعت'] },
  { sentence: 'وقتی تشنه می‌شوم، ... می‌نوشم.', answer: 'آب', options: ['آب', 'کتاب', 'خاک', 'برگ'] },
  { sentence: 'در شب، ... در آسمان می‌درخشد.', answer: 'ستاره', options: ['ستاره', 'مداد', 'صندوق', 'مدرسه'] },
  { sentence: 'برای دوختن لباس از ... استفاده می‌کنند.', answer: 'سوزن', options: ['سوزن', 'قاشق', 'توپ', 'کتاب'] },
  { sentence: 'فردوسی شاعر بزرگ زبان ... است.', answer: 'فارسی', options: ['فارسی', 'بارانی', 'مدادی', 'دریایی'] }
];

export const MISSING_LETTER_CHALLENGES = [
  { word: 'صابون', hole: '...ابون', correct: 'ص', options: ['ص', 'س', 'ث', 'ش'] },
  {
    word: 'غذا',
    hole: '...ذا',
    correct: 'غ',
    options: ['غ', 'ق', 'خ', 'ع'],
    grade: 2,
    skill: 'تکمیل واژه با نشانه هم‌آوا',
    answer: 'غ',
    explanation: 'واژه‌ی غذا با نشانه‌ی «غ» نوشته می‌شود.'
  },
  {
    word: 'ظرف',
    hole: '...رف',
    correct: 'ظ',
    options: ['ظ', 'ز', 'ذ', 'ض'],
    grade: 3,
    skill: 'تشخیص املای درست حروف هم‌آوا',
    answer: 'ظ',
    explanation: 'در واژه‌ی ظرف، صدای «ز» با نشانه‌ی «ظ» نوشته می‌شود.'
  },
  { word: 'صدف', hole: '...دف', correct: 'ص', options: ['ص', 'س', 'ث', 'ش'] },
  { word: 'صورت', hole: '...ورت', correct: 'ص', options: ['ص', 'س', 'ث', 'ش'] },
  { word: 'صندوق', hole: '...ندوق', correct: 'ص', options: ['ص', 'س', 'ث', 'ش'] },
  { word: 'حوله', hole: '...وله', correct: 'ح', options: ['ح', 'ه', 'خ', 'چ'] },
  { word: 'حوض', hole: 'حو...', correct: 'ض', options: ['ض', 'ز', 'ذ', 'ظ'] },
  { word: 'طوطی', hole: '...وطی', correct: 'ط', options: ['ط', 'ت', 'ظ', 'ض'] },
  { word: 'طناب', hole: '...ناب', correct: 'ط', options: ['ط', 'ت', 'ظ', 'ض'] },
  { word: 'کلاغ', hole: 'کلا...', correct: 'غ', options: ['غ', 'ق', 'خ', 'ع'] },
  { word: 'باغ', hole: 'با...', correct: 'غ', options: ['غ', 'ق', 'خ', 'ع'] },
  { word: 'قورباغه', hole: 'قوربا...ه', correct: 'غ', options: ['غ', 'ق', 'ع', 'خ'] },
  { word: 'قاشق', hole: '...اشق', correct: 'ق', options: ['ق', 'غ', 'ک', 'گ'] },
  { word: 'ذرت', hole: '...رت', correct: 'ذ', options: ['ذ', 'ز', 'ض', 'ظ'] },
  { word: 'زمین', hole: '...مین', correct: 'ز', options: ['ز', 'ذ', 'ض', 'ظ'] },
  { word: 'لیوان', hole: '...یوان', correct: 'ل', options: ['ل', 'ن', 'ر', 'م'] },
  { word: 'ورزش', hole: '...رزش', correct: 'و', options: ['و', 'ا', 'ی', 'ر'] },
  { word: 'ستاره', hole: '...تاره', correct: 'س', options: ['س', 'ص', 'ث', 'ش'] },
  { word: 'گندم', hole: '...ندم', correct: 'گ', options: ['گ', 'ک', 'ق', 'غ'] },
  { word: 'پروانه', hole: '...روانه', correct: 'پ', options: ['پ', 'ب', 'ت', 'ث'] },
  { word: 'خورشید', hole: 'خور...ید', correct: 'ش', options: ['ش', 'س', 'ص', 'ث'] }
];

export const SIMILAR_LETTER_CHALLENGES = [
  { wordHole: '...ابون', correctWord: 'صابون', correctLetter: 'ص', options: ['ص', 'س', 'ث'] },
  { wordHole: '...دف', correctWord: 'صدف', correctLetter: 'ص', options: ['ص', 'س', 'ث'] },
  { wordHole: '...ورت', correctWord: 'صورت', correctLetter: 'ص', options: ['ص', 'س', 'ث'] },
  { wordHole: '...ندوق', correctWord: 'صندوق', correctLetter: 'ص', options: ['ص', 'س', 'ث'] },
  { wordHole: '...وطی', correctWord: 'طوطی', correctLetter: 'ط', options: ['ط', 'ت'] },
  { wordHole: '...ناب', correctWord: 'طناب', correctLetter: 'ط', options: ['ط', 'ت'] },
  { wordHole: '...وله', correctWord: 'حوله', correctLetter: 'ح', options: ['ح', 'ه'] },
  { wordHole: 'حو...', correctWord: 'حوض', correctLetter: 'ض', options: ['ض', 'ز', 'ذ', 'ظ'] },
  { wordHole: 'کلا...', correctWord: 'کلاغ', correctLetter: 'غ', options: ['غ', 'ق'] },
  { wordHole: 'با...', correctWord: 'باغ', correctLetter: 'غ', options: ['غ', 'ق'] },
  { wordHole: 'قوربا...ه', correctWord: 'قورباغه', correctLetter: 'غ', options: ['غ', 'ق'] },
  { wordHole: '...اشق', correctWord: 'قاشق', correctLetter: 'ق', options: ['ق', 'غ'] },
  { wordHole: '...رت', correctWord: 'ذرت', correctLetter: 'ذ', options: ['ذ', 'ز', 'ض', 'ظ'] },
  { wordHole: '...مین', correctWord: 'زمین', correctLetter: 'ز', options: ['ز', 'ذ', 'ض', 'ظ'] },
  { wordHole: '...ندم', correctWord: 'گندم', correctLetter: 'گ', options: ['گ', 'ک'] },
  { wordHole: '...یوان', correctWord: 'لیوان', correctLetter: 'ل', options: ['ل', 'ن'] }
];

export const FOUR_FORM_CHALLENGES = [
  { word: 'عینک', correct: 'عـ', options: ['عـ', 'ـعـ', 'ـع', 'ع'] },
  {
    word: 'سفید',
    correct: 'ـفـ',
    options: ['فـ', 'ـفـ', 'ـف', 'ف'],
    grade: 3,
    skill: 'تشخیص شکل میانی نشانه',
    answer: 'ـفـ',
    explanation: 'نشانه‌ی «ف» در میانه‌ی واژه‌ی سفید به شکل «ـفـ» نوشته می‌شود.'
  },
  { word: 'ساعت', correct: 'ـعـ', options: ['عـ', 'ـعـ', 'ـع', 'ع'] },
  { word: 'مزرعه', correct: 'ـع', options: ['عـ', 'ـعـ', 'ـع', 'ع'] },
  { word: 'شمع', correct: 'ع', options: ['عـ', 'ـعـ', 'ـع', 'ع'] },
  { word: 'جذاب', correct: 'ذ', options: ['ز', 'ذ', 'ض', 'ظ'] },
  { word: 'مریض', correct: 'ض', options: ['ز', 'ذ', 'ض', 'ظ'] },
  { word: 'ظهر', correct: 'ظ', options: ['ز', 'ذ', 'ض', 'ظ'] },
  { word: 'تمیز', correct: 'ز', options: ['ز', 'ذ', 'ض', 'ظ'] },
  { word: 'ناظم', correct: 'ظ', options: ['ز', 'ذ', 'ض', 'ظ'] },
  { word: 'حوض', correct: 'ض', options: ['ز', 'ذ', 'ض', 'ظ'] },
  { word: 'کلاغ', correct: 'غ', options: ['غـ', 'ـغـ', 'ـغ', 'غ'] },
  { word: 'غروب', correct: 'غـ', options: ['غـ', 'ـغـ', 'ـغ', 'غ'] },
  { word: 'اصغر', correct: 'ـغـ', options: ['غـ', 'ـغـ', 'ـغ', 'غ'] },
  { word: 'جیغ', correct: 'ـغ', options: ['غـ', 'ـغـ', 'ـغ', 'غ'] },
  { word: 'هوا', correct: 'هـ', options: ['هـ', 'ـهـ', 'ـه', 'ه'] },
  { word: 'بهار', correct: 'ـهـ', options: ['هـ', 'ـهـ', 'ـه', 'ه'] },
  { word: 'نامه', correct: 'ـه', options: ['هـ', 'ـهـ', 'ـه', 'ه'] },
  { word: 'کوه', correct: 'ه', options: ['هـ', 'ـهـ', 'ـه', 'ه'] }
];

export const SYLLABLE_BURGER_WORDS = [
  { word: 'باران', emoji: '🌧️', syllables: ['با', 'ران'] },
  {
    word: 'کبوتر',
    emoji: '🕊️',
    syllables: ['کَ', 'بو', 'تَر'],
    grade: 2,
    skill: 'بخش‌بندی و ساخت واژه',
    answer: 'کَ + بو + تَر',
    explanation: 'کبوتر سه بخش دارد: کَ، بو و تَر.'
  },
  {
    word: 'کتابدار',
    emoji: '📚',
    syllables: ['کِ', 'تاب', 'دار'],
    grade: 3,
    skill: 'بخش‌بندی واژه‌های سه‌بخشی',
    answer: 'کِ + تاب + دار',
    explanation: 'کتابدار سه بخش دارد: کِ، تاب و دار.'
  },
  { word: 'مدرسه', emoji: '🏫', syllables: ['مَد', 'رِ', 'سه'] },
  { word: 'خرچنگ', emoji: '🦀', syllables: ['خَر', 'چَنگ'] },
  { word: 'ستاره', emoji: '⭐', syllables: ['سِ', 'تا', 'ره'] },
  { word: 'بادام', emoji: '🥜', syllables: ['با', 'دام'] },
  { word: 'پروانه', emoji: '🦋', syllables: ['پَر', 'وا', 'نه'] },
  { word: 'خورشید', emoji: '☀️', syllables: ['خور', 'شید'] },
  { word: 'آبشار', emoji: '🌊', syllables: ['آب', 'شار'] },
  { word: 'درخت', emoji: '🌳', syllables: ['دِ', 'رَخت'] },
  { word: 'حلزون', emoji: '🐌', syllables: ['حَ', 'لَ', 'زون'] },
  { word: 'چتر', emoji: '☂️', syllables: ['چَ', 'تِر'] },
  { word: 'حوض', emoji: '🌊', syllables: ['حَوض'] },
  { word: 'عینک', emoji: '👓', syllables: ['عِی', 'نَک'] },
  { word: 'مزرعه', emoji: '🌾', syllables: ['مَز', 'رَ', 'عَه'] },
  { word: 'طوطی', emoji: '🦜', syllables: ['طو', 'طی'] },
  { word: 'کلاغ', emoji: '🐦‍⬛', syllables: ['کَ', 'لاغ'] },
  { word: 'تابستان', emoji: '☀️', syllables: ['تا', 'بِس', 'تان'] },
  { word: 'زمستان', emoji: '❄️', syllables: ['زِ', 'مِس', 'تان'] },
  { word: 'پاییز', emoji: '🍂', syllables: ['پا', 'ییز'] },
  { word: 'بهار', emoji: '🌸', syllables: ['بَ', 'هار'] },
  { word: 'دانشمند', emoji: '🧑‍🔬', syllables: ['دا', 'نِش', 'مَند'] },
  { word: 'کتابخانه', emoji: '📚', syllables: ['کِ', 'تاب', 'خا', 'نه'] },
  { word: 'اقیانوس', emoji: '🌊', syllables: ['اُق', 'یا', 'نوس'] },
  { word: 'آموزگار', emoji: '👩‍🏫', syllables: ['آ', 'موز', 'گار'] }
];

export const JELLYFISH_ROUNDS = [
  {
    prompt: 'عروس‌های دریایی دارای نشانه «صـ ص» را با تور شکار کن!',
    items: [
      { id: 'j1', text: 'صابون', isTarget: true, color: 'from-pink-500 to-rose-600' },
      { id: 'j2', text: 'صورت', isTarget: true, color: 'from-purple-500 to-pink-600' },
      { id: 'j3', text: 'سوزن', isTarget: false, color: 'from-cyan-500 to-blue-600' },
      { id: 'j4', text: 'سیب', isTarget: false, color: 'from-amber-500 to-orange-600' },
      { id: 'j5', text: 'صندوق', isTarget: true, color: 'from-fuchsia-500 to-purple-600' },
      { id: 'j6', text: 'سلام', isTarget: false, color: 'from-emerald-500 to-teal-600' }
    ]
  },
  {
    prompt: 'عروس‌های دریایی با املای درست نشانه «ط» را با تور بگیر!',
    items: [
      { id: 'j7', text: 'طوطی', isTarget: true, color: 'from-pink-500 to-purple-600' },
      { id: 'j8', text: 'طناب', isTarget: true, color: 'from-fuchsia-500 to-pink-600' },
      { id: 'j9', text: 'توپ', isTarget: false, color: 'from-cyan-500 to-sky-600' },
      { id: 'j10', text: 'توت', isTarget: false, color: 'from-amber-500 to-yellow-600' },
      { id: 'j11', text: 'طوفان', isTarget: true, color: 'from-rose-500 to-pink-600' },
      { id: 'j12', text: 'دست', isTarget: false, color: 'from-emerald-500 to-teal-600' }
    ]
  },
  {
    prompt: 'عروس‌های دریایی دارای ۴ شکل نشانه «ع» را شکار کن!',
    items: [
      { id: 'j13', text: 'عینک', isTarget: true, color: 'from-purple-500 to-pink-600' },
      { id: 'j14', text: 'شمع', isTarget: true, color: 'from-pink-500 to-rose-600' },
      { id: 'j15', text: 'الفبا', isTarget: false, color: 'from-blue-500 to-cyan-600' },
      { id: 'j16', text: 'مزرعه', isTarget: true, color: 'from-fuchsia-500 to-purple-600' },
      { id: 'j17', text: 'انار', isTarget: false, color: 'from-amber-500 to-orange-600' },
      { id: 'j18', text: 'آب', isTarget: false, color: 'from-emerald-500 to-teal-600' }
    ]
  },
  {
    prompt: 'عروس‌های دریایی دارای نشانه «ض» را به دام بینداز!',
    items: [
      { id: 'j19', text: 'حوض', isTarget: true, color: 'from-rose-500 to-pink-600' },
      { id: 'j20', text: 'مریض', isTarget: true, color: 'from-purple-500 to-fuchsia-600' },
      { id: 'j21', text: 'میز', isTarget: false, color: 'from-cyan-500 to-blue-600' },
      { id: 'j22', text: 'ریاضی', isTarget: true, color: 'from-pink-500 to-rose-600' },
      { id: 'j23', text: 'زرد', isTarget: false, color: 'from-amber-500 to-orange-600' },
      { id: 'j24', text: 'بادام', isTarget: false, color: 'from-emerald-500 to-teal-600' }
    ]
  },
  {
    prompt: 'عروس‌های دریایی با واو استثنا و ناخوانا (خوا) را صید کن!',
    items: [
      { id: 'j25', text: 'خواب', isTarget: true, color: 'from-fuchsia-500 to-pink-600' },
      { id: 'j26', text: 'خواهر', isTarget: true, color: 'from-purple-500 to-indigo-600' },
      { id: 'j27', text: 'خانه', isTarget: false, color: 'from-cyan-500 to-blue-600' },
      { id: 'j28', text: 'خواستن', isTarget: true, color: 'from-pink-500 to-rose-600' },
      { id: 'j29', text: 'خروس', isTarget: false, color: 'from-amber-500 to-orange-600' },
      { id: 'j30', text: 'خندان', isTarget: false, color: 'from-emerald-500 to-teal-600' }
    ]
  }
];

export const KARATE_ROUNDS = [
  {
    prompt: 'تخته کلمه دارای غلط املایی را با ضربه کاراته خرد کن!',
    boards: [
      { id: 'k1', text: 'مسلس❌', isWrongWord: true, correctForm: 'مثلث', explanation: 'مثلث با سه نقطه ث نوشته می‌شود' },
      { id: 'k2', text: 'مدرسه✅', isWrongWord: false },
      { id: 'k3', text: 'باران✅', isWrongWord: false }
    ]
  },
  {
    prompt: 'تخته غلط املایی نشانه (ت / ط) را با ضربه کاراته بشکن!',
    boards: [
      { id: 'k4', text: 'درخت✅', isWrongWord: false },
      { id: 'k5', text: 'توتی❌', isWrongWord: true, correctForm: 'طوطی', explanation: 'طوطی با دسته دار ط نوشته می‌شود' },
      { id: 'k6', text: 'کتاب✅', isWrongWord: false }
    ]
  },
  {
    prompt: 'تخته کلمه غلط واو ناخوانا را با کاراته خرد کن!',
    boards: [
      { id: 'k7', text: 'خواهر✅', isWrongWord: false },
      { id: 'k8', text: 'خاب❌', isWrongWord: true, correctForm: 'خواب', explanation: 'خواب با واو ناخوانا نوشته می‌شود' },
      { id: 'k9', text: 'خواندن✅', isWrongWord: false }
    ]
  },
  {
    prompt: 'تخته با غلط املایی صدای (ز) را با ضربه کاراته سندی نابود کن!',
    boards: [
      { id: 'k10', text: 'زرّت❌', isWrongWord: true, correctForm: 'ذرت', explanation: 'ذرت با نقطه بالا ذ نوشته می‌شود' },
      { id: 'k11', text: 'زرد✅', isWrongWord: false },
      { id: 'k12', text: 'میز✅', isWrongWord: false }
    ]
  },
  {
    prompt: 'تخته کلمه غلط نشانه (ح / ه) را با لگد کاراته خرد کن!',
    boards: [
      { id: 'k13', text: 'هوله❌', isWrongWord: true, correctForm: 'حوله', explanation: 'حوله با ح جیمی نوشته می‌شود' },
      { id: 'k14', text: 'بهار✅', isWrongWord: false },
      { id: 'k15', text: 'حلزون✅', isWrongWord: false }
    ]
  },
  {
    prompt: 'تخته کلمه غلط نشانه (ق / غ) را بشکن!',
    boards: [
      { id: 'k16', text: 'کلاق❌', isWrongWord: true, correctForm: 'کلاغ', explanation: 'کلاغ با غین آخر نوشته می‌شود' },
      { id: 'k17', text: 'قایق✅', isWrongWord: false },
      { id: 'k18', text: 'باغ✅', isWrongWord: false }
    ]
  },
  {
    prompt: 'تخته کلمه دارای اشتباه در تشدید را خرد کن!',
    boards: [
      { id: 'k19', text: 'بنا✅', isWrongWord: false },
      { id: 'k20', text: 'معلّلم❌', isWrongWord: true, correctForm: 'معلّم', explanation: 'معلّم با تشدید روی یک ل نوشته می‌شود نه دو ل جدا' },
      { id: 'k21', text: 'نجّار✅', isWrongWord: false }
    ]
  }
];

export const RHYME_ROUNDS = [
  {
    baseWord: 'آب',
    baseEmoji: '💧',
    options: [
      { id: 'r1', text: 'تاب', isRhyme: true, emoji: '🎪' },
      { id: 'r2', text: 'طناب', isRhyme: true, emoji: '🪢' },
      { id: 'r3', text: 'نان', isRhyme: false, emoji: '🥖' },
      { id: 'r4', text: 'کتاب', isRhyme: true, emoji: '📚' }
    ]
  },
  {
    baseWord: 'باران',  {
    baseWord: 'نور',
    baseEmoji: '💡',
    options: [
      { id: 'r29', text: 'دور', isRhyme: true, emoji: '🔭' },
      { id: 'r30', text: 'شور', isRhyme: true, emoji: '🧂' },
      { id: 'r31', text: 'باران', isRhyme: false, emoji: '🌧️' },
      { id: 'r32', text: 'کتاب', isRhyme: false, emoji: '📘' }
    ],
    grade: 2,
    skill: 'شناخت قافیه و صدای پایانی',
    answer: 'دور و شور',
    explanation: 'نور، دور و شور به صدای «ور» پایان می‌یابند.'
  },
  {
    baseWord: 'کار',
    baseEmoji: '🛠️',
    options: [
      { id: 'r33', text: 'یار', isRhyme: true, emoji: '🤝' },
      { id: 'r34', text: 'بهار', isRhyme: true, emoji: '🌸' },
      { id: 'r35', text: 'مداد', isRhyme: false, emoji: '✏️' },
      { id: 'r36', text: 'پنجره', isRhyme: false, emoji: '🪟' }
    ],
    grade: 3,
    skill: 'تشخیص واژه‌های هم‌قافیه',
    answer: 'یار و بهار',
    explanation: 'کار، یار و بهار به صدای «ار» پایان می‌یابند.'
  },

    baseEmoji: '🌧️',
    options: [
      { id: 'r5', text: 'آسمان', isRhyme: true, emoji: '☁️' },
      { id: 'r6', text: 'ماه', isRhyme: false, emoji: '🌙' },
      { id: 'r7', text: 'دستان', isRhyme: true, emoji: '🤲' },
      { id: 'r8', text: 'درختان', isRhyme: true, emoji: '🌳' }
    ]
  },
  {
    baseWord: 'موش',
    baseEmoji: '🐭',
    options: [
      { id: 'r9', text: 'گوش', isRhyme: true, emoji: '👂' },
      { id: 'r10', text: 'هوش', isRhyme: true, emoji: '🧠' },
      { id: 'r11', text: 'سیب', isRhyme: false, emoji: '🍎' },
      { id: 'r12', text: 'خرگوش', isRhyme: true, emoji: '🐰' }
    ]
  },
  {
    baseWord: 'باد',
    baseEmoji: '💨',
    options: [
      { id: 'r13', text: 'شاد', isRhyme: true, emoji: '😃' },
      { id: 'r14', text: 'داد', isRhyme: true, emoji: '🎁' },
      { id: 'r15', text: 'دریا', isRhyme: false, emoji: '🌊' },
      { id: 'r16', text: 'یاد', isRhyme: true, emoji: '💭' }
    ]
  },
  {
    baseWord: 'سنگ',
    baseEmoji: '🪨',
    options: [
      { id: 'r17', text: 'رنگ', isRhyme: true, emoji: '🎨' },
      { id: 'r18', text: 'خرچنگ', isRhyme: true, emoji: '🦀' },
      { id: 'r19', text: 'درخت', isRhyme: false, emoji: '🌳' },
      { id: 'r20', text: 'پلنگ', isRhyme: true, emoji: '🐆' }
    ]
  }
];

export const CASH_REGISTER_WORDS = [
  { word: 'آبشار', emoji: '🌊', correctSyllables: 2, correctSounds: 5, syllablesText: 'آب + شار', soundsText: 'آ - ب - ش - ا - ر' },
  { word: 'پروانه', emoji: '🦋', correctSyllables: 3, correctSounds: 6, syllablesText: 'پَر + وا + نه', soundsText: 'پ - َ - ر - و - ا - ن - ِ' },
  { word: 'مدرسه', emoji: '🏫', correctSyllables: 3, correctSounds: 6, syllablesText: 'مَد + رِ + سه', soundsText: 'م - َ - د - ر - ِ - س - ِ' },
  { word: 'بادام', emoji: '🥜', correctSyllables: 2, correctSounds: 5, syllablesText: 'با + دام', soundsText: 'ب - ا - د - ا - م' },
  { word: 'ستاره', emoji: '⭐', correctSyllables: 3, correctSounds: 6, syllablesText: 'سِ + تا + ره', soundsText: 'س - ِ - ت - ا - ر - ِ' },
  { word: 'سیب', emoji: '🍎', correctSyllables: 1, correctSounds: 3, syllablesText: 'سیب (۱ بخش)', soundsText: 'س - ی - ب (۳ صدا)' },
  { word: 'خرچنگ', emoji: '🦀', correctSyllables: 2, correctSounds: 6, syllablesText: 'خَر + چَنگ', soundsText: 'خ - َ - ر - چ - َ - ن - گ' },
  { word: 'طوطی', emoji: '🦜', correctSyllables: 2, correctSounds: 4, syllablesText: 'طو + طی', soundsText: 'ط - و - ط - ی' },
  { word: 'عینک', emoji: '👓', correctSyllables: 2, correctSounds: 4, syllablesText: 'عِی + نَک', soundsText: 'ع - ی - ن - ک' },
  { word: 'حلزون', emoji: '🐌', correctSyllables: 3, correctSounds: 5, syllablesText: 'حَ + لَ + زون', soundsText: 'ح - ل - ز - و - ن' },
  { word: 'دانشمند', emoji: '🧑‍🔬', correctSyllables: 3, correctSounds: 7, syllablesText: 'دا + نِش + مَند', soundsText: 'د - ا - ن - ِ - ش - م - َ - ن - د' }
];

export const AUDIO_DICTATION_LIST = [
  {
    word: 'بابا آب داد',
    audioText: 'بابا آب داد',
    emoji: '👨💧',
    options: [
      { id: 'd1', text: 'بابا آب داد', isCorrect: true },
      { id: 'd2', text: 'پاپا آب داد', isCorrect: false },
      { id: 'd3', text: 'بابا اب داد', isCorrect: false },
      { id: 'd4', text: 'بابا آپ داد', isCorrect: false }
    ]
  },
  {
    word: 'طوطی زیبا',
    audioText: 'طوطی زیبا',
    emoji: '🦜✨',
    options: [
      { id: 'd5', text: 'طوطی زیبا', isCorrect: true },
      { id: 'd6', text: 'توتی زیبا', isCorrect: false },
      { id: 'd7', text: 'طوطی زیفا', isCorrect: false },
      { id: 'd8', text: 'توتی زیوا', isCorrect: false }
    ]
  },
  {
    word: 'صدای باران',
    audioText: 'صدای باران',
    emoji: '🌧️🎵',
    options: [
      { id: 'd9', text: 'صدای باران', isCorrect: true },
      { id: 'd10', text: 'سدای باران', isCorrect: false },
      { id: 'd11', text: 'صدای بارام', isCorrect: false },
      { id: 'd12', text: 'ثدای باران', isCorrect: false }
    ]
  },
  {
    word: 'خواهر مهربان',
    audioText: 'خواهر مهربان',
    emoji: '👧💖',
    options: [
      { id: 'd13', text: 'خواهر مهربان', isCorrect: true },
      { id: 'd14', text: 'خاهر مهربان', isCorrect: false },
      { id: 'd15', text: 'خواهر ماحربان', isCorrect: false },
      { id: 'd16', text: 'خاهر مهرام', isCorrect: false }
    ]
  },
  {
    word: 'معلّم دانا',
    audioText: 'معلّم دانا',
    emoji: '👩‍🏫📖',
    options: [
      { id: 'd17', text: 'معلّم دانا', isCorrect: true },
      { id: 'd18', text: 'معلم دانا', isCorrect: false },
      { id: 'd19', text: 'مهلم دانا', isCorrect: false },
      { id: 'd20', text: 'مؤلّم دانا', isCorrect: false }
    ]
  },
  {
    word: 'ایران سرسبز',
    audioText: 'ایران سرسبز',
    emoji: '🇮🇷🌱',
    options: [
      { id: 'd21', text: 'ایران سرسبز', isCorrect: true },
      { id: 'd22', text: 'ایرام سرسبز', isCorrect: false },
      { id: 'd23', text: 'ایران صرصبز', isCorrect: false },
      { id: 'd24', text: 'ایران سرسبظ', isCorrect: false }
    ]
  },
  {
    word: 'آزمایشگاه بزرگ',
    audioText: 'آزمایشگاه بزرگ',
    emoji: '🧪🔬',
    options: [
      { id: 'd25', text: 'آزمایشگاه بزرگ', isCorrect: true },
      { id: 'd26', text: 'ازمایشگاه بزرگ', isCorrect: false },
      { id: 'd27', text: 'آزمایشکاه بزرگ', isCorrect: false },
      { id: 'd28', text: 'آزمایشگاه بظرگ', isCorrect: false }
    ]
  }
];
