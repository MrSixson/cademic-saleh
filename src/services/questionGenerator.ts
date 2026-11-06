import { QuestionData, LevelConfig, WordItem } from '../types';
import { WORD_DATABASE, getRandomWords } from '../data/words';
import { TWENTY_BUBBLE_LEVELS } from '../data/twentyBubbleData';
import { BASKETBALL_TRASH_LEVELS } from '../data/basketballTrashData';
import { SYLLABLE_QUIZ_LEVELS } from '../data/syllableQuizData';
import { IMAGE_QUIZ_DATA } from '../data/levels';
import {
  SOUND_CHALLENGES,
  KHWA_CHALLENGES,
  TASHDID_CHALLENGES,
  TANVIN_CHALLENGES,
  SENTENCE_CHALLENGES,
  MISSING_LETTER_CHALLENGES,
  SIMILAR_LETTER_CHALLENGES,
  FOUR_FORM_CHALLENGES,
  SYLLABLE_BURGER_WORDS,
  JELLYFISH_ROUNDS,
  KARATE_ROUNDS,
  RHYME_ROUNDS,
  CASH_REGISTER_WORDS,
  AUDIO_DICTATION_LIST
} from '../data/challengeData';

export function generateQuestionForLevel(
  level: LevelConfig,
  roundNumber: number,
  totalRounds: number,
  adaptiveWeakLetters: string[] = []
): QuestionData {
  const mechanic = level.mechanic;

  // IMAGE SPELLING QUIZ (Levels 1 to 5)
  if (mechanic === 'image_spelling_quiz') {
    const quizItem = IMAGE_QUIZ_DATA[level.id] || IMAGE_QUIZ_DATA[1];
    return {
      roundNumber,
      totalRounds,
      mechanic,
      imageQuizSetup: {
        imageUrl: quizItem.imageUrl,
        imageNamePersian: quizItem.imageNamePersian,
        options: quizItem.options,
        hint: quizItem.hint
      },
      options: quizItem.options.map(opt => ({
        id: opt.id,
        text: opt.text,
        isCorrect: opt.isCorrect,
        explanation: opt.isCorrect ? `آفرین! املای درست کلمه «${quizItem.targetWord}» است.` : undefined
      })),
      promptText: level.instructionPersian || 'مطابق با تصویر بالا ، گزینه ی درست املایی رو انتخاب کن',
      hint: quizItem.hint
    };
  }

  // 0. BUBBLE SPELLING DETECTIVE (Levels 6, 7, 101-110)
  if (mechanic === 'twenty_bubble_spelling') {
    const levelData = TWENTY_BUBBLE_LEVELS[level.id] || TWENTY_BUBBLE_LEVELS[6] || TWENTY_BUBBLE_LEVELS[101];
    return {
      roundNumber,
      totalRounds,
      mechanic,
      twentyBubbleItems: levelData.items,
      promptText: levelData.instruction,
      hint: levelData.themeDescription || 'حباب کلمات دارای غلط املایی را پیدا کن و بترکان تا فقط کلمات درست بمانند!'
    };
  }

  // 0.1 BASKETBALL VS TRASH SORT (Level 8)
  if (mechanic === 'basketball_trash_sort') {
    const levelData = BASKETBALL_TRASH_LEVELS[level.id] || BASKETBALL_TRASH_LEVELS[8];
    return {
      roundNumber,
      totalRounds,
      mechanic,
      basketballTrashSetup: { items: levelData.items },
      promptText: levelData.instruction,
      hint: 'کلمات با املای درست را به سمت سبد بسکتبال 🏀 شوت کن و کلمات با غلط املایی را به سطل زباله 🗑️ بینداز!'
    };
  }

  // 0.2 SYLLABLE COUNT QUIZ (Level 9)
  if (mechanic === 'syllable_count_quiz') {
    const levelData = SYLLABLE_QUIZ_LEVELS[level.id] || SYLLABLE_QUIZ_LEVELS[9];
    return {
      roundNumber,
      totalRounds,
      mechanic,
      syllableQuizSetup: { items: levelData.items },
      promptText: levelData.instruction,
      hint: 'کلمه را با دست زدن یا تلفظ آرام بخش کن و عدد تعداد بخش‌های آن را از بین ۴ گزینه انتخاب کن!'
    };
  }

  // Filter words by difficulty according to level tier
  // Curriculum is intentionally aligned to elementary Persian (grades 2 and 3).
  // Grade 2 uses familiar words (difficulty 1-2); grade 3 gradually adds
  // richer vocabulary (difficulty 1-3), without jumping to adult-level items.
  const targetDifficulty = level.id < 50 ? 1 : 2;

  let eligibleWords = WORD_DATABASE.filter(w => Math.abs(w.difficulty - targetDifficulty) <= 1);
  if (eligibleWords.length < 8) {
    eligibleWords = [...WORD_DATABASE];
  }

  // Words with incorrect variants for spelling challenges
  const wordsWithMistakes = eligibleWords.filter(w => w.incorrectVariants && w.incorrectVariants.length > 0);
  const wordsWithScramble = eligibleWords.filter(w => w.scrambledLetters && w.scrambledLetters.length >= 3);
  const wordsWithEmoji = eligibleWords.filter(w => w.meaningEmoji || w.iconEmoji);

  // Deterministic seed for variety without repeating same word
  const seed = (level.id * 17 + roundNumber * 31) % 997;

  // Favor words with weak letters if available for adaptive learning
  if (adaptiveWeakLetters.length > 0 && Math.random() > 0.35) {
    const tailored = eligibleWords.filter(w =>
      w.problematicLetters?.some(l => adaptiveWeakLetters.includes(l))
    );
    if (tailored.length >= 4) {
      eligibleWords = tailored;
    }
  }

  // 1. NEGAREH SOUND MATCH (Level 6 & Negareh Zone)
  if (mechanic === 'negareh_sound_match') {
    const item = SOUND_CHALLENGES[(seed + roundNumber) % SOUND_CHALLENGES.length];
    return {
      roundNumber,
      totalRounds,
      mechanic,
      options: item.options.map(opt => ({
        id: opt,
        text: opt,
        isCorrect: opt === item.target,
        explanation: opt === item.target ? `آفرین! کلمه «${opt}» دارای ${item.sound} است.` : undefined
      })),
      promptText: `کدام کلمه دارای ${item.sound} است؟`,
      hint: `به صدای تلفظ کلمه خوب گوش کن تا ${item.sound} را بیابی.`
    };
  }

  // 2. KHWA EXCEPTION (Silent Vav in خواب، خواهر، خواستن)
  if (mechanic === 'khwa_exception') {
    const challenge = KHWA_CHALLENGES[(seed + roundNumber) % KHWA_CHALLENGES.length];
    const distractors = getRandomWords(2, []).map(w => w.persianWord);
    const options = [
      { id: 'opt_corr', text: challenge.correct, isCorrect: true, explanation: challenge.note },
      { id: 'opt_wrong', text: challenge.wrong, isCorrect: false },
      ...distractors.map((d, i) => ({ id: `opt_dist_${i}`, text: d, isCorrect: false }))
    ].sort(() => 0.5 - Math.random());

    return {
      roundNumber,
      totalRounds,
      mechanic,
      options,
      promptText: `املای صحیح کلمه دارای واو ناخوانا («${challenge.correct}») را انتخاب کن:`,
      hint: 'یادت باشد صدای (خا) در این کلمات به شکل (خوا) نوشته می‌شود!'
    };
  }

  // 3. TASHDID HUNTER (تشدید ّ در بنّا، نجّار، معلّم)
  if (mechanic === 'tashdid_hunter') {
    const current = TASHDID_CHALLENGES[(seed + roundNumber) % TASHDID_CHALLENGES.length];
    const otherWords = getRandomWords(3).map(w => ({
      id: w.id,
      text: w.persianWord,
      isCorrect: false
    }));

    const options = [
      { id: 'tashdid_target', text: current.word, isCorrect: true, explanation: current.desc },
      ...otherWords
    ].sort(() => 0.5 - Math.random());

    return {
      roundNumber,
      totalRounds,
      mechanic,
      options,
      promptText: 'کلمه‌ای که دارای علامت تشدید ( ّ ) است را پیدا کن!',
      hint: 'به بالای حروف دقت کن تا علامت شبیه به دندانه ( ّ ) را ببینی.'
    };
  }

  // 4. TANVIN & HAMZEH (اتفاقاً، حتماً، مثلاً، جزء، قرائت)
  if (mechanic === 'tanvin_hamzeh') {
    const c = TANVIN_CHALLENGES[(seed + roundNumber) % TANVIN_CHALLENGES.length];
    const otherOptions = getRandomWords(2).map((w, idx) => ({ id: `rand_${idx}`, text: w.persianWord, isCorrect: false }));
    const options = [
      { id: 'tanvin_corr', text: c.correct, isCorrect: true, explanation: c.desc },
      { id: 'tanvin_wrong', text: c.wrong, isCorrect: false },
      ...otherOptions
    ].sort(() => 0.5 - Math.random());

    return {
      roundNumber,
      totalRounds,
      mechanic,
      options,
      promptText: `شکل املایی صحیح کلمه «${c.correct}» را انتخاب کن:`,
      hint: 'تنوین ( ً ) صدای اَن می‌دهد ولی با حرف نون نوشته نمی‌شود.'
    };
  }

  // 5. SENTENCE COMPLETION
  if (mechanic === 'sentence_completion') {
    const s = SENTENCE_CHALLENGES[(seed + roundNumber) % SENTENCE_CHALLENGES.length];

    return {
      roundNumber,
      totalRounds,
      mechanic,
      options: s.options.map(opt => ({
        id: opt,
        text: opt,
        isCorrect: opt === s.answer,
        explanation: opt === s.answer ? `بسیار عالی! «${s.sentence.replace('...', opt)}»` : undefined
      })),
      promptText: `جای خالی جمله را کامل کن: «${s.sentence}»`,
      hint: 'کلمه‌ای که به معنای جمله می‌خورد را لمس کن.'
    };
  }

  // 6. VISUAL MEMORY ORDER
  if (mechanic === 'visual_memory_order') {
    const wordCount = level.id <= 10 ? 3 : (level.id <= 50 ? 4 : (level.id <= 90 ? 4 : 5));
    const startIndex = (seed + roundNumber * 5) % Math.max(1, eligibleWords.length - wordCount);
    const selectedWords = eligibleWords.slice(startIndex, startIndex + wordCount);
    if (selectedWords.length < wordCount) {
      selectedWords.push(...getRandomWords(wordCount - selectedWords.length));
    }
    const shuffled = [...selectedWords].sort(() => 0.5 - Math.random());
    
    return {
      roundNumber,
      totalRounds,
      mechanic,
      memoryWords: selectedWords,
      shuffledWords: shuffled,
      originalOrderIds: selectedWords.map(w => w.id),
      promptText: level.instructionPersian || 'کلمات را به ترتیب اولیه‌ای که دیدی لمس کن',
      hint: 'به ترتیب قرار گرفتن کلمات در صدف‌ها و حباب‌ها خوب توجه کن!'
    };
  }

  // 7. FIND NEW WORD
  if (mechanic === 'find_new_word') {
    const baseCount = level.id > 30 ? 4 : 3;
    const startIndex = (seed + roundNumber * 7) % Math.max(1, eligibleWords.length - baseCount - 2);
    const baseWords = eligibleWords.slice(startIndex, startIndex + baseCount);
    const newWord = getRandomWords(1, baseWords.map(w => w.id))[0] || WORD_DATABASE[0];
    const combinedShuffled = [...baseWords, newWord].sort(() => 0.5 - Math.random());

    return {
      roundNumber,
      totalRounds,
      mechanic,
      memoryWords: baseWords,
      targetWord: newWord,
      options: combinedShuffled.map(w => ({
        id: w.id,
        text: w.persianWord,
        isCorrect: w.id === newWord.id,
        explanation: w.id === newWord.id ? 'آفرین! این کلمه تازه به جمع ما پیوسته است.' : undefined
      })),
      promptText: 'کدام کلمه جدیداً به تصویر اضافه شده است؟',
      hint: 'کلمه‌ای که در مرحله اول ندیده بودی را پیدا کن.'
    };
  }

  // 8. FIND MISSING WORD
  if (mechanic === 'find_missing_word') {
    const wordCount = level.id > 30 ? 4 : 3;
    const startIndex = (seed + roundNumber * 8) % Math.max(1, eligibleWords.length - wordCount - 2);
    const baseWords = eligibleWords.slice(startIndex, startIndex + wordCount);
    const missingIndex = (seed + roundNumber) % baseWords.length;
    const missingWord = baseWords[missingIndex] || WORD_DATABASE[0];
    const remainingWords = baseWords.filter((_, i) => i !== missingIndex);
    const distractor = getRandomWords(1, baseWords.map(w => w.id))[0] || WORD_DATABASE[1];
    
    const choices = [missingWord, distractor, ...remainingWords.slice(0, 1)].sort(() => 0.5 - Math.random());

    return {
      roundNumber,
      totalRounds,
      mechanic,
      memoryWords: baseWords,
      shuffledWords: remainingWords,
      targetWord: missingWord,
      options: choices.map(w => ({
        id: w.id,
        text: w.persianWord,
        isCorrect: w.id === missingWord.id
      })),
      promptText: 'کدام کلمه از تصویر ناپدید شد؟',
      hint: 'کلمه‌ای که جای خالی‌اش باقی مانده را انتخاب کن.'
    };
  }

  // 9. VISUAL DIFFERENCE
  if (mechanic === 'visual_difference') {
    const pool = wordsWithMistakes.length > 0 ? wordsWithMistakes : WORD_DATABASE;
    const targetWord = pool[(seed + roundNumber) % pool.length] || WORD_DATABASE[0];
    const correctVariant = targetWord.persianWord;
    const wrongVariant = targetWord.incorrectVariants?.[0] || correctVariant + 'ـ';

    const items = [
      { id: '1', text: correctVariant, isTarget: false },
      { id: '2', text: correctVariant, isTarget: false },
      { id: '3', text: wrongVariant, isTarget: true },
      { id: '4', text: correctVariant, isTarget: false }
    ].sort(() => 0.5 - Math.random());

    return {
      roundNumber,
      totalRounds,
      mechanic,
      targetWord,
      options: items.map(item => ({
        id: item.id,
        text: item.text,
        isCorrect: item.isTarget,
        explanation: item.isTarget ? `آفرین! «${wrongVariant}» املای اشتباه است، شکل صحیح: «${correctVariant}»` : undefined
      })),
      promptText: 'کلمه‌ای که شکل یا املایش با بقیه متفاوت است را پیدا کن!',
      hint: 'به نقطه‌ها، دندانه‌ها و نوع حروف با دقت نگاه کن!'
    };
  }

  // 10. SPELLING CHOICE & BUBBLE HUNTER & MOVING BUBBLES
  if (mechanic === 'spelling_choice' || mechanic === 'bubble_hunter' || mechanic === 'moving_bubbles') {
    const pool = wordsWithMistakes.length > 0 ? wordsWithMistakes : WORD_DATABASE;
    const candidate = pool[(seed + roundNumber * 3) % pool.length] || WORD_DATABASE[0];
    const correctWords = getRandomWords(3, [candidate.id]);
    const incorrectWord = candidate.incorrectVariants?.[0] || candidate.persianWord + 'ـ';

    const allBubbles = [
      { id: 'wrong_' + candidate.id, text: incorrectWord, isCorrect: true, originCorrect: candidate.persianWord },
      ...correctWords.map(w => ({ id: 'corr_' + w.id, text: w.persianWord, isCorrect: false }))
    ].sort(() => 0.5 - Math.random());

    return {
      roundNumber,
      totalRounds,
      mechanic,
      targetWord: candidate,
      options: allBubbles.map(b => ({
        id: b.id,
        text: b.text,
        isCorrect: b.isCorrect,
        explanation: b.isCorrect ? `عالی بود! «${b.text}» غلط بود؛ املای درست: «${candidate.persianWord}»` : undefined
      })),
      promptText: mechanic === 'moving_bubbles' ? 'حباب متحرکی که کلمه‌اش غلط نوشته شده را بترکان!' : 'حبابی که کلمه‌اش غلط نوشته شده را بترکان!',
      hint: 'کلمه دارای غلط املایی را هدف بگیر!'
    };
  }

  // 11. SCRAMBLED LETTERS TO WORD
  if (mechanic === 'scrambled_letters_word') {
    const pool = wordsWithScramble.length > 0 ? wordsWithScramble : eligibleWords;
    const targetWord = pool[(seed + roundNumber * 4) % pool.length] || WORD_DATABASE[0];
    const distractors = getRandomWords(2, [targetWord.id]);
    const choices = [targetWord, ...distractors].sort(() => 0.5 - Math.random());

    return {
      roundNumber,
      totalRounds,
      mechanic,
      targetWord,
      scrambledLetters: targetWord.scrambledLetters || targetWord.persianWord.split('').sort(() => 0.5 - Math.random()),
      options: choices.map(w => ({
        id: w.id,
        text: w.persianWord,
        isCorrect: w.id === targetWord.id
      })),
      promptText: 'این حروف کنار هم کدام کلمه را می‌سازند؟',
      hint: 'حروف را در ذهن به هم متصل کن و کلمه را بخوان.'
    };
  }

  // 12. SCRAMBLED LETTERS TO IMAGE
  if (mechanic === 'scrambled_letters_image') {
    const pool = wordsWithEmoji.length > 0 ? wordsWithEmoji : eligibleWords;
    const targetWord = pool[(seed + roundNumber * 5) % pool.length] || WORD_DATABASE[0];
    const distractorWords = pool.filter(w => w.id !== targetWord.id).slice(0, 3);
    const choices = [targetWord, ...distractorWords].sort(() => 0.5 - Math.random());

    return {
      roundNumber,
      totalRounds,
      mechanic,
      targetWord,
      scrambledLetters: targetWord.scrambledLetters || targetWord.persianWord.split(''),
      options: choices.map(w => ({
        id: w.id,
        emoji: w.meaningEmoji || w.iconEmoji || '✨',
        text: w.persianWord,
        isCorrect: w.id === targetWord.id
      })),
      promptText: 'حروف را بخوان و تصویر متناسب با آن را لمس کن!',
      hint: 'حروف درهم ریخته را بخوان تا معنی و تصویرش را پیدا کنی.'
    };
  }

  // 13. MISSING LETTER (جای خالی نشانه)
  if (mechanic === 'missing_letter') {
    const setup = MISSING_LETTER_CHALLENGES[(seed + roundNumber) % MISSING_LETTER_CHALLENGES.length];

    return {
      roundNumber,
      totalRounds,
      mechanic,
      missingLetterSetup: {
        wordWithHole: setup.hole,
        correctLetter: setup.correct,
        options: setup.options.sort(() => 0.5 - Math.random())
      },
      options: setup.options.map(opt => ({
        id: opt,
        text: opt,
        isCorrect: opt === setup.correct,
        explanation: opt === setup.correct ? `آفرین! کلمه کامل: «${setup.word}»` : undefined
      })),
      promptText: `جای خالی کلمه «${setup.hole}» با کدام حرف کامل می‌شود؟`,
      hint: 'حرف درست را لمس کن تا کلمه کامل شود.'
    };
  }

  // 14. SIMILAR LETTERS DISCRIMINATION (ص/س، ت/ط، ق/غ، ح/ه، ث/س)
  if (mechanic === 'similar_letters_discrim') {
    const challenge = SIMILAR_LETTER_CHALLENGES[seed % SIMILAR_LETTER_CHALLENGES.length];

    return {
      roundNumber,
      totalRounds,
      mechanic,
      missingLetterSetup: {
        wordWithHole: challenge.wordHole,
        correctLetter: challenge.correctLetter,
        options: challenge.options
      },
      options: challenge.options.map(opt => ({
        id: opt,
        text: opt,
        isCorrect: opt === challenge.correctLetter,
        explanation: opt === challenge.correctLetter ? `آفرین! کلمه «${challenge.correctWord}» با حرف «${challenge.correctLetter}» نوشته می‌شود.` : undefined
      })),
      promptText: `جای خالی را با نشانه‌ی درست کامل کن: «${challenge.wordHole}»`,
      hint: 'شکل صحیح صدای هم‌نام را انتخاب کن.'
    };
  }

  // 15. FOUR-FORM LETTERS (عـ ـعـ ـع ع یا ز / ذ / ض / ظ)
  if (mechanic === 'four_form_letters') {
    const c = FOUR_FORM_CHALLENGES[(seed + roundNumber) % FOUR_FORM_CHALLENGES.length];

    return {
      roundNumber,
      totalRounds,
      mechanic,
      options: c.options.map(opt => ({
        id: opt,
        text: opt,
        isCorrect: opt === c.correct,
        explanation: opt === c.correct ? `باریکلا! «${c.word}» با شکل «${c.correct}» صحیح است.` : undefined
      })),
      promptText: `کلمه «${c.word}» با کدام شکل از نشانه‌ها نوشته می‌شود؟`,
      hint: 'به موقعیت نشانه (اول، وسط، آخر) دقت کن.'
    };
  }

  // 16. SIMILAR WORDS PRECISION
  if (mechanic === 'similar_words_precision') {
    const pairs = [
      { target: 'صورتی', choices: ['صورت', 'صورتی', 'صورتک'] },
      { target: 'تمیز', choices: ['تمیز', 'تمیزتر', 'تمیزی'] },
      { target: 'صندوق', choices: ['صندوق', 'صندوقچه', 'صندلی'] },
      { target: 'باران', choices: ['باران', 'بارانی', 'بادام'] },
      { target: 'ستاره', choices: ['ستاره', 'ستارگان', 'سیاره'] },
      { target: 'درخت', choices: ['درخت', 'درختان', 'درختچه'] },
      { target: 'کتاب', choices: ['کتاب', 'کتابچه', 'کتابخانه'] },
      { target: 'دانشمند', choices: ['دانش', 'دانش‌آموز', 'دانشمند'] },
      { target: 'گل', choices: ['گل', 'گلاب', 'گلدان'] }
    ];
    const p = pairs[(seed + roundNumber) % pairs.length];

    return {
      roundNumber,
      totalRounds,
      mechanic,
      options: p.choices.map(choice => ({
        id: choice,
        text: choice,
        isCorrect: choice === p.target
      })),
      promptText: `دقیقاً کلمه «${p.target}» را انتخاب کن!`,
      hint: 'به آخر کلمه و پسوندها دقت کن.'
    };
  }

  // 17. FLASH MEMORY
  if (mechanic === 'flash_memory') {
    const targetWord = eligibleWords[(seed + roundNumber * 6) % eligibleWords.length] || WORD_DATABASE[0];
    const distractors = getRandomWords(3, [targetWord.id]);
    const choices = [targetWord, ...distractors].sort(() => 0.5 - Math.random());

    return {
      roundNumber,
      totalRounds,
      mechanic,
      targetWord,
      options: choices.map(w => ({
        id: w.id,
        text: w.persianWord,
        isCorrect: w.id === targetWord.id
      })),
      timeLimitSeconds: 1.5,
      promptText: 'کلمه‌ای که برای یک لحظه درخشید کدام بود؟',
      hint: 'تصویر کلمه را در ذهنت مرور کن.'
    };
  }

  // 18. SPEED HUNT
  if (mechanic === 'speed_hunt') {
    const count = 5;
    const startIndex = (seed + roundNumber * 7) % Math.max(1, eligibleWords.length - count);
    const words = eligibleWords.slice(startIndex, startIndex + count);
    const target = words[0] || eligibleWords[0];
    const shuffled = [...words].sort(() => 0.5 - Math.random());

    return {
      roundNumber,
      totalRounds,
      mechanic,
      targetWord: target,
      options: shuffled.map(w => ({
        id: w.id,
        text: w.persianWord,
        isCorrect: w.id === target.id
      })),
      promptText: `سریع حباب کلمه «${target.persianWord}» را شکار کن!`,
      hint: 'با سرعت کلمه هدف را بزن!'
    };
  }

  // 19. COMBINATION CHALLENGE
  if (mechanic === 'combination_challenge') {
    const subMechanics: ('missing_letter' | 'spelling_choice' | 'scrambled_letters_word' | 'sentence_completion')[] = [
      'missing_letter',
      'spelling_choice',
      'scrambled_letters_word',
      'sentence_completion'
    ];
    const subM = subMechanics[(seed + roundNumber) % subMechanics.length];
    const mockLevel = { ...level, mechanic: subM };
    return generateQuestionForLevel(mockLevel, roundNumber, totalRounds, adaptiveWeakLetters);
  }

  // 20. TREASURE WORDS
  if (mechanic === 'treasure_words') {
    const advanceWords = eligibleWords.filter(w => w.difficulty >= 2);
    const target = advanceWords[(seed + roundNumber) % advanceWords.length] || WORD_DATABASE[0];
    const distractors = getRandomWords(3, [target.id]);
    const choices = [target, ...distractors].sort(() => 0.5 - Math.random());

    return {
      roundNumber,
      totalRounds,
      mechanic,
      targetWord: target,
      options: choices.map(w => ({
        id: w.id,
        text: w.persianWord,
        isCorrect: w.id === target.id
      })),
      promptText: `صندوقچه گنج: کلمه باارزش «${target.persianWord}» را بیاب!`,
      hint: 'واژه‌های کتاب فارسی اول را با دقت بخوان.'
    };
  }

  // 21. KRABBY BURGER BUILDER (Syllable Assembly)
  if (mechanic === 'krabby_burger_builder') {
    const picked = SYLLABLE_BURGER_WORDS[(seed + roundNumber) % SYLLABLE_BURGER_WORDS.length];
    const shuffled = [...picked.syllables].sort(() => 0.5 - Math.random());
    return {
      roundNumber,
      totalRounds,
      mechanic,
      burgerSyllablesSetup: {
        targetWord: picked.word,
        targetEmoji: picked.emoji,
        syllables: picked.syllables,
        shuffledSyllables: shuffled
      },
      promptText: `برگر کلمه «${picked.word}» را با چیدن به ترتیب بخش‌ها درست کن!`,
      hint: 'کلمه را آرام بخوان و بخش اول تا آخر را به نوبت انتخاب کن.'
    };
  }

  // 22. JELLYFISH NET CATCH (Catch with Net)
  if (mechanic === 'jellyfish_net_catch') {
    const pickedJelly = JELLYFISH_ROUNDS[(seed + roundNumber) % JELLYFISH_ROUNDS.length];
    return {
      roundNumber,
      totalRounds,
      mechanic,
      jellyfishItemsSetup: pickedJelly.items,
      promptText: pickedJelly.prompt,
      hint: 'به شکل نشانه‌ها با دقت نگاه کن و با لمس تور آن‌ها را بگیر!'
    };
  }

  // 23. SANDY TARGET KICK (Karate Board Breaking)
  if (mechanic === 'sandy_target_kick') {
    const pickedKarate = KARATE_ROUNDS[(seed + roundNumber) % KARATE_ROUNDS.length];
    return {
      roundNumber,
      totalRounds,
      mechanic,
      sandyKarateBoardsSetup: pickedKarate.boards,
      promptText: pickedKarate.prompt,
      hint: 'با لمس تخته دارای اشتباه املایی، ضربه محکم کاراته سندی را اجرا کن!'
    };
  }

  // 24. WORD RHYME BUBBLE (Rhyming and Phonetic Awareness)
  if (mechanic === 'word_rhyme_bubble') {
    const pickedRhyme = RHYME_ROUNDS[(seed + roundNumber) % RHYME_ROUNDS.length];
    return {
      roundNumber,
      totalRounds,
      mechanic,
      rhymeSetup: pickedRhyme,
      promptText: `حباب‌های هم‌قافیه با کلمه «${pickedRhyme.baseWord}» را پیدا کن!`,
      hint: 'به آهنگ و صدای پایان کلمات دقت کن که شبیه هم باشند.'
    };
  }

  // 25. KRUSTY CASH REGISTER (Syllables and Sounds Counter)
  if (mechanic === 'krusty_cash_register') {
    const pickedCash = CASH_REGISTER_WORDS[(seed + roundNumber) % CASH_REGISTER_WORDS.length];
    return {
      roundNumber,
      totalRounds,
      mechanic,
      syllableCountSetup: pickedCash,
      promptText: `شمارش بخش‌ها و صداهای کلمه «${pickedCash.word}» با سکه‌های آقای خرچنگ!`,
      hint: 'ابتدا با دست زدن بخش‌ها را بشمار، سپس تک تک صداها را پیدا کن.'
    };
  }

  // 26. AUDIO DICTATION LISTEN (Voice Dictation)
  if (mechanic === 'audio_dictation_listen') {
    const pickedDict = AUDIO_DICTATION_LIST[(seed + roundNumber) % AUDIO_DICTATION_LIST.length];
    return {
      roundNumber,
      totalRounds,
      mechanic,
      dictationSetup: pickedDict,
      promptText: `گوش کن و املای صحیح «${pickedDict.word}» را انتخاب کن!`,
      hint: 'به صدای گوینده و نشانه‌های کلمه دقت کن.'
    };
  }

  // 27. FINAL BOSS (Level 10, 20, 30, 40, 50, 60, 70, 80, 90, 100)
  const bossTarget = eligibleWords[(seed + roundNumber * 9) % eligibleWords.length] || WORD_DATABASE[0];
  const bossOptions = [
    { id: 'b1', text: bossTarget.persianWord, isCorrect: true },
    { id: 'b2', text: bossTarget.incorrectVariants?.[0] || bossTarget.persianWord + 'ـ', isCorrect: false },
    { id: 'b3', text: bossTarget.similarWords?.[0] || 'کلمه دیگر', isCorrect: false }
  ].sort(() => 0.5 - Math.random());

  const bossTitle = level.bossNamePersian || 'غول آزمون';

  return {
    roundNumber,
    totalRounds,
    mechanic: 'final_boss',
    targetWord: bossTarget,
    options: bossOptions,
    promptText: `آزمون ${bossTitle}: از میان گزینه‌ها، املای درست را پیدا کن!`,
    hint: 'با تمرکز و دقت بالا نشان بده که قهرمان زبان فارسی هستی!'
  };
}
