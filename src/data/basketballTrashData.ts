export interface BasketballTrashWordItem {
  id: string;
  word: string;
  isCorrect: boolean;
  correctSpelling?: string;
  explanation?: string;
  emoji: string;
}

export interface BasketballTrashLevelData {
  levelId: number;
  title: string;
  description: string;
  instruction: string;
  items: BasketballTrashWordItem[];
}

export const BASKETBALL_TRASH_LEVELS: Record<number, BasketballTrashLevelData> = {
  8: {
    levelId: 8,
    title: 'مرحله هشتم: مسابقه بسکتبال کلمات و سطل زباله',
    description: 'کلمات درست را داخل سبد بسکتبال پرتاب کن و کلمات غلط املایی را به سطل زباله بنداز!',
    instruction: 'کلمات درست را به سبد بسکتبال و کلمات غلط را به سطل زباله بینداز!',
    items: [
      // 1. خانه (Correct)
      { id: 'bt_1', word: 'خانه', isCorrect: true, correctSpelling: 'خانه', explanation: 'املای کلمه «خانه» کاملاً درست است 🏠', emoji: '🏠' },
      // 2. خرشید (Wrong -> خورشید)
      { id: 'bt_2', word: 'خرشید', isCorrect: false, correctSpelling: 'خورشید', explanation: 'خورشید با نشانه (و) او کوتاه نوشته می‌شود (خورشید) ☀️', emoji: '☀️' },
      // 3. نان (Correct)
      { id: 'bt_3', word: 'نان', isCorrect: true, correctSpelling: 'نان', explanation: 'املای کلمه «نان» کاملاً درست است 🍞', emoji: '🍞' },
      // 4. فوتبال (Correct)
      { id: 'bt_4', word: 'فوتبال', isCorrect: true, correctSpelling: 'فوتبال', explanation: 'املای کلمه «فوتبال» کاملاً درست است ⚽', emoji: '⚽' },
      // 5. صاعت (Wrong -> ساعت)
      { id: 'bt_5', word: 'صاعت', isCorrect: false, correctSpelling: 'ساعت', explanation: 'ساعت با نشانه (سـ) سه دندانه نوشته می‌شود نه (ص) ⏰', emoji: '⏰' },
      // 6. لیمو (Correct)
      { id: 'bt_6', word: 'لیمو', isCorrect: true, correctSpelling: 'لیمو', explanation: 'املای کلمه «لیمو» کاملاً درست است 🍋', emoji: '🍋' },
      // 7. باق (Wrong -> باغ)
      { id: 'bt_7', word: 'باق', isCorrect: false, correctSpelling: 'باغ', explanation: 'باغ با نشانه (غ) غین نوشته می‌شود نه (ق) 🌳', emoji: '🌳' },
      // 8. اسب (Correct)
      { id: 'bt_8', word: 'اسب', isCorrect: true, correctSpelling: 'اسب', explanation: 'املای کلمه «اسب» کاملاً درست است 🐴', emoji: '🐴' },
      // 9. اتشنشان (Correct)
      { id: 'bt_9', word: 'اتشنشان', isCorrect: true, correctSpelling: 'آتش‌نشان', explanation: 'املای کلمه «آتش‌نشان» درست است 👨‍🚒', emoji: '👨‍🚒' },
      // 10. خواطره (Wrong -> خاطره)
      { id: 'bt_10', word: 'خواطره', isCorrect: false, correctSpelling: 'خاطره', explanation: 'خاطره بدون واو ناخوانا و با (تـ) دو نقطه نوشته می‌شود 💭', emoji: '💭' },
      // 11. شیرینی (Correct)
      { id: 'bt_11', word: 'شیرینی', isCorrect: true, correctSpelling: 'شیرینی', explanation: 'املای کلمه «شیرینی» کاملاً درست است 🍰', emoji: '🍰' },
      // 12. سندوق (Wrong -> صندوق)
      { id: 'bt_12', word: 'سندوق', isCorrect: false, correctSpelling: 'صندوق', explanation: 'صندوق با نشانه (صـ) صاد نوشته می‌شود نه (س) 📦', emoji: '📦' },
      // 13. صندلی (Correct)
      { id: 'bt_13', word: 'صندلی', isCorrect: true, correctSpelling: 'صندلی', explanation: 'املای کلمه «صندلی» با نشانه (صـ) صاد درست است 🪑', emoji: '🪑' },
      // 14. عروسک (Correct)
      { id: 'bt_14', word: 'عروسک', isCorrect: true, correctSpelling: 'عروسک', explanation: 'املای کلمه «عروسک» با نشانه (عـ) عین درست است 🧸', emoji: '🧸' },
      // 15. طبیعت (Correct)
      { id: 'bt_15', word: 'طبیعت', isCorrect: true, correctSpelling: 'طبیعت', explanation: 'طبیعت با نشانه (ط) دسته‌دار و (عـ) عین نوشته می‌شود 🌲', emoji: '🌲' },
      // 16. توطی (Wrong -> طوطی)
      { id: 'bt_16', word: 'توطی', isCorrect: false, correctSpelling: 'طوطی', explanation: 'طوطی با هر دو نشانه (ط) دسته‌دار نوشته می‌شود (طوطی) 🦜', emoji: '🦜' },
      // 17. پیشرفط (Wrong -> پیشرفت)
      { id: 'bt_17', word: 'پیشرفط', isCorrect: false, correctSpelling: 'پیشرفت', explanation: 'پیشرفت با نشانه (ت) دو نقطه تمام می‌شود نه (ط) 📈', emoji: '📈' },
      // 18. هنوانه (Wrong -> هندوانه)
      { id: 'bt_18', word: 'هنوانه', isCorrect: false, correctSpelling: 'هندوانه', explanation: 'هندوانه نشانه (د) وسط کلمه دارد (هندوانه) 🍉', emoji: '🍉' },
      // 19. طفریح (Wrong -> تفریح)
      { id: 'bt_19', word: 'طفریح', isCorrect: false, correctSpelling: 'تفریح', explanation: 'تفریح با نشانه (تـ) دو نقطه و (ح) جیمی نوشته می‌شود 🎡', emoji: '🎡' },
      // 20. رعد و برغ (Wrong -> رعد و برق)
      { id: 'bt_20', word: 'رعد و برغ', isCorrect: false, correctSpelling: 'رعد و برق', explanation: 'برق با نشانه (ق) قاف نوشته می‌شود نه (غ) ⚡', emoji: '⚡' },
      // 21. سبحگاه (Wrong -> صبحگاه)
      { id: 'bt_21', word: 'سبحگاه', isCorrect: false, correctSpelling: 'صبحگاه', explanation: 'صبحگاه با نشانه (صـ) صاد و (ح) جیمی نوشته می‌شود 🌅', emoji: '🌅' },
      // 22. مهربان (Correct)
      { id: 'bt_22', word: 'مهربان', isCorrect: true, correctSpelling: 'مهربان', explanation: 'املای کلمه «مهربان» کاملاً درست است 💖', emoji: '💖' },
      // 23. ارام (Correct)
      { id: 'bt_23', word: 'ارام', isCorrect: true, correctSpelling: 'آرام', explanation: 'املای کلمه «آرام» کاملاً درست است 🕊️', emoji: '🕊️' },
      // 24. لیوان (Correct)
      { id: 'bt_24', word: 'لیوان', isCorrect: true, correctSpelling: 'لیوان', explanation: 'املای کلمه «لیوان» کاملاً درست است 🥛', emoji: '🥛' },
      // 25. صنجاقک (Wrong -> سنجاقک)
      { id: 'bt_25', word: 'صنجاقک', isCorrect: false, correctSpelling: 'سنجاقک', explanation: 'سنجاقک با نشانه (سـ) سه دندانه نوشته می‌شود نه (ص) 🦗', emoji: '🦗' },
      // 26. قفل (Correct)
      { id: 'bt_26', word: 'قفل', isCorrect: true, correctSpelling: 'قفل', explanation: 'املای کلمه «قفل» با نشانه (قـ) قاف درست است 🔒', emoji: '🔒' },
      // 27. روباه (Correct)
      { id: 'bt_27', word: 'روباه', isCorrect: true, correctSpelling: 'روباه', explanation: 'املای کلمه «روباه» کاملاً درست است 🦊', emoji: '🦊' },
      // 28. سدا (Wrong -> صدا)
      { id: 'bt_28', word: 'سدا', isCorrect: false, correctSpelling: 'صدا', explanation: 'صدا با نشانه (صـ) صاد نوشته می‌شود نه (س) 🔊', emoji: '🔊' },
      // 29. سمیمانه (Wrong -> صمیمانه)
      { id: 'bt_29', word: 'سمیمانه', isCorrect: false, correctSpelling: 'صمیمانه', explanation: 'صمیمانه با نشانه (صـ) صاد نوشته می‌شود (صمیمانه) 🤝', emoji: '🤝' }
    ]
  }
};
