import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { LevelConfig, PlayerSaveState, QuestionData } from '../types';
import { getCharacterById } from '../data/characters';
import { generateQuestionForLevel } from '../services/questionGenerator';
import { audioService } from '../services/audioService';
import { CharacterCompanion } from './CharacterCompanion';
import { CharacterMood } from './CharacterAvatar';
import { ComboBanner } from './ComboBanner';
import { TwentyBubbleDetective } from './TwentyBubbleDetective';
import { BasketballTrashSorter } from './BasketballTrashSorter';
import { SyllableQuizView } from './SyllableQuizView';
import { KrabbyBurgerBuilder } from './KrabbyBurgerBuilder';
import { JellyfishNetCatch } from './JellyfishNetCatch';
import { SandyKarateBreak } from './SandyKarateBreak';
import { WordRhymeBubble } from './WordRhymeBubble';
import { KrustyCashRegister } from './KrustyCashRegister';
import { AudioDictationListen } from './AudioDictationListen';
import { 
  Sparkles, 
  HelpCircle, 
  ArrowRight, 
  Flame, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Crown,
  Lightbulb
} from 'lucide-react';

interface GameplayViewProps {
  level: LevelConfig;
  playerState: PlayerSaveState;
  onLevelComplete: (stars: number, coinsEarned: number, score: number, timeSpent: number) => void;
  onExitToMap: () => void;
  onRecordAnswer: (letterOrWord: string, wasCorrect: boolean, timeMs: number, skill: string) => void;
}

export const GameplayView: React.FC<GameplayViewProps> = ({
  level,
  playerState,
  onLevelComplete,
  onExitToMap,
  onRecordAnswer
}) => {
  const companion = getCharacterById(level.companionCharacterId || playerState.selectedCharacterId);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);

  // Phases: 'briefing' | 'observing' | 'answering' | 'feedback' | 'completed'
  const [phase, setPhase] = useState<'briefing' | 'observing' | 'answering' | 'feedback'>('briefing');
  const [observationTimer, setObservationTimer] = useState<number>(level.observationTimeSeconds);

  // Companion interactive state
  const [companionMood, setCompanionMood] = useState<CharacterMood>('idle');
  const [companionSpeech, setCompanionSpeech] = useState<string>(level.instructionPersian);

  // In-game score & combo
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [mistakesCount, setMistakesCount] = useState<number>(0);
  const startTimeRef = useRef<number>(Date.now());
  const roundStartTimeRef = useRef<number>(Date.now());
  const advanceTimeoutRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (advanceTimeoutRef.current !== null) {
      window.clearTimeout(advanceTimeoutRef.current);
      advanceTimeoutRef.current = null;
    }
  }, []);

  // Player input for memory ordering
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  // Initialize questions
  const loadRound = (roundNum: number) => {
    const weakLetters = Object.keys(playerState.adaptiveStats.letterMistakes).slice(0, 3);
    const qData = generateQuestionForLevel(level, roundNum, level.roundsToComplete, weakLetters);
    setQuestionData(qData);
    setSelectedOrderIds([]);
    setSelectedOptionId(null);
    setIsAnswerCorrect(null);
    roundStartTimeRef.current = Date.now();

    // Check if round needs observation phase
    const observationMechanics = [
      'visual_memory_order',
      'find_new_word',
      'find_missing_word',
      'flash_memory',
      'memory_and_spelling'
    ];

    if (observationMechanics.includes(level.mechanic)) {
      setPhase('observing');
      setObservationTimer(qData.timeLimitSeconds || level.observationTimeSeconds);
      setCompanionMood('thinking');
      setCompanionSpeech('خوب به کلمات دقت کن و تصویرشان را در ذهن بسپار!');
    } else {
      setPhase('answering');
      setCompanionMood('idle');
      setCompanionSpeech(qData.promptText);
    }
  };

  // Automatically start round when level is loaded or changes
  useEffect(() => {
    setCurrentRound(1);
    setScore(0);
    setCombo(0);
    setMistakesCount(0);
    startTimeRef.current = Date.now();
    loadRound(1);
  }, [level.id]);

  // Start Level from Briefing (if manually invoked)
  const handleStartBriefing = () => {
    audioService.playClick();
    loadRound(1);
  };

  // Observation Timer countdown
  useEffect(() => {
    if (phase !== 'observing') return;

    if (observationTimer <= 0) {
      setPhase('answering');
      setCompanionMood('excited');
      setCompanionSpeech('حالا با دقت پاسخ بده!');
      return;
    }

    const timer = setInterval(() => {
      setObservationTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, observationTimer]);

  // Handle single choice option selection
  const handleOptionClick = (optionId: string, isCorrect: boolean, targetText: string) => {
    if (phase !== 'answering' || selectedOptionId !== null) return;

    const timeSpentMs = Date.now() - roundStartTimeRef.current;
    setSelectedOptionId(optionId);
    setIsAnswerCorrect(isCorrect);
    setPhase('feedback');

    // Record learning stats
    onRecordAnswer(targetText, isCorrect, timeSpentMs, level.mechanic);

    if (isCorrect) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      setScore(prev => prev + 100 * newCombo);
      audioService.playCorrect(newCombo);
      setCompanionMood('celebration');

      const cheerLine = companion.cheerVoiceLines[Math.floor(Math.random() * companion.cheerVoiceLines.length)];
      setCompanionSpeech(cheerLine);
      audioService.speakPersian(cheerLine);

      // Trigger sparkles confetti
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {}

      // Advance after short celebration
      if (advanceTimeoutRef.current !== null) {
        window.clearTimeout(advanceTimeoutRef.current);
      }
      advanceTimeoutRef.current = window.setTimeout(() => {
        advanceTimeoutRef.current = null;
        if (currentRound >= level.roundsToComplete) {
          finishLevel(mistakesCount);
        } else {
          setCurrentRound(prev => prev + 1);
          loadRound(currentRound + 1);
        }
      }, 1500);
    } else {
      setCombo(0);
      setMistakesCount(prev => prev + 1);
      audioService.playWrong();
      setCompanionMood('funny_fail');

      const retryLine = companion.retryVoiceLines[Math.floor(Math.random() * companion.retryVoiceLines.length)];
      setCompanionSpeech(retryLine);
      audioService.speakPersian(retryLine);

      // Allow retry
      setTimeout(() => {
        setSelectedOptionId(null);
        setIsAnswerCorrect(null);
        setPhase('answering');
        setCompanionMood('idle');
      }, 1400);
    }
  };

  // Handle visual memory sequence selection (Level 1 & 2)
  const handleSequenceCardClick = (wordId: string) => {
    if (phase !== 'answering' || !questionData) return;
    if (selectedOrderIds.includes(wordId)) return;

    audioService.playClick();
    const newSelected = [...selectedOrderIds, wordId];
    setSelectedOrderIds(newSelected);

    const requiredOrder = questionData.originalOrderIds || [];

    // When child has picked all cards in sequence
    if (newSelected.length === requiredOrder.length) {
      const isCorrect = newSelected.every((id, idx) => id === requiredOrder[idx]);
      const timeSpentMs = Date.now() - roundStartTimeRef.current;
      setIsAnswerCorrect(isCorrect);
      setPhase('feedback');

      onRecordAnswer('sequence_' + level.id, isCorrect, timeSpentMs, 'visual_memory_order');

      if (isCorrect) {
        const newCombo = combo + 1;
        setCombo(newCombo);
        setScore(prev => prev + 150 * newCombo);
        audioService.playCorrect(newCombo);
        setCompanionMood('celebration');

        const cheer = companion.cheerVoiceLines[0];
        setCompanionSpeech(cheer);
        audioService.speakPersian(cheer);

        try {
          confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
        } catch {}

        setTimeout(() => {
          if (currentRound >= level.roundsToComplete) {
            finishLevel(mistakesCount);
          } else {
            setCurrentRound(prev => prev + 1);
            loadRound(currentRound + 1);
          }
        }, 1600);
      } else {
        setCombo(0);
        setMistakesCount(prev => prev + 1);
        audioService.playWrong();
        setCompanionMood('funny_fail');
        setCompanionSpeech('ترتیب درست نبود! یک بار دیگر امتحان کن.');
        audioService.speakPersian('دوباره امتحان کن!');

        setTimeout(() => {
          setSelectedOrderIds([]);
          setIsAnswerCorrect(null);
          setPhase('answering');
          setCompanionMood('idle');
        }, 1500);
      }
    }
  };

  const finishLevel = (mistakes: number) => {
    const totalTimeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
    let stars = 3;
    if (mistakes >= 3) stars = 1;
    else if (mistakes >= 1) stars = 2;

    const coinsEarned = stars * 10 + (level.isBoss ? 25 : 0);
    audioService.playVictoryFanfare();
    onLevelComplete(stars, coinsEarned, score + 200, totalTimeSpent);
  };

  const handleNextRound = () => {
    audioService.playCorrect(combo + 1);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch {}

    setTimeout(() => {
      if (currentRound >= level.roundsToComplete) {
        finishLevel(mistakesCount);
      } else {
        setCurrentRound(prev => prev + 1);
        loadRound(currentRound + 1);
      }
    }, 1500);
  };

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-3 flex flex-col justify-between z-20 select-none pb-8">
      {/* Top HUD: Organic Driftwood Plank */}
      <header className="flex items-center justify-between cartoon-wood-panel p-3 sm:p-4 shadow-2xl relative z-30">
        {/* Corner Rivets */}
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-amber-950 border border-amber-600/80 shadow-inner" />
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-950 border border-amber-600/80 shadow-inner" />
        <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-amber-950 border border-amber-600/80 shadow-inner" />
        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-amber-950 border border-amber-600/80 shadow-inner" />

        {/* Back to Map button */}
        <button
          onClick={() => {
            audioService.playClick();
            onExitToMap();
          }}
          className="flex items-center gap-1.5 btn-marine-wood px-3.5 py-1.5 font-bold text-xs sm:text-sm cursor-pointer shadow-md"
        >
          <ArrowRight className="w-4 h-4 text-amber-200" />
          <span>نقشه</span>
        </button>

        {/* Level Title & Round Indicator */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            {level.isBoss && <Crown className="w-5 h-5 text-amber-300 fill-amber-300" />}
            <h1 className="text-lg sm:text-2xl font-display font-black text-amber-100 drop-shadow">
              {level.title}
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="text-xs text-amber-200 font-bold">
              راند {currentRound} از {level.roundsToComplete}
            </span>
            <div className="flex gap-1.5">
              {Array.from({ length: level.roundsToComplete }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i + 1 < currentRound
                      ? 'bg-emerald-400 ring-2 ring-emerald-200 shadow-sm'
                      : i + 1 === currentRound
                      ? 'bg-amber-300 ring-2 ring-yellow-100 animate-pulse shadow-md'
                      : 'bg-stone-800 border border-stone-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Score & Combo in Golden Bubble Pod */}
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-amber-400 to-yellow-500 border-2 border-yellow-200 px-3.5 py-1.5 rounded-full text-slate-950 font-black text-xs sm:text-sm shadow-md">
            <span className="text-xs text-amber-950 ml-1">امتیاز:</span>
            <span>{score}</span>
          </div>
        </div>
      </header>

      {/* Combo Banner */}
      <ComboBanner combo={combo} />

      {/* Main Content Arena */}
      <main className="flex-1 flex flex-col items-center justify-center my-4 w-full">
        {/* 1. BRIEFING PHASE: Organic Marine Wooden Plaque */}
        {phase === 'briefing' && (
          <div className="w-full max-w-xl cartoon-wood-panel p-6 sm:p-8 shadow-2xl text-center animate-float-gentle border-4 border-amber-950">
            <div className="inline-flex p-3 rounded-full bg-amber-400 border-2 border-yellow-100 mb-4 text-amber-950 shadow-md">
              <Lightbulb className="w-8 h-8 animate-pulse text-amber-950" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-black text-amber-100 mb-2 drop-shadow">
              {level.title}
            </h2>
            <p className="text-amber-200 text-sm sm:text-base mb-6 font-bold leading-relaxed">
              {level.descriptionPersian}
            </p>

            <div className="marine-parchment p-4 mb-6 text-right shadow-md">
              <span className="text-xs text-amber-900 font-extrabold block mb-1">🎯 هدف آموزشی:</span>
              <p className="text-xs sm:text-sm text-amber-950 font-bold">{level.educationalFocus}</p>
            </div>

            <button
              onClick={handleStartBriefing}
              className="w-full py-4 btn-spongebob-yellow font-black text-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-6 h-6 text-amber-800" />
              <span>آماده‌ام! شروع کنیم</span>
            </button>
          </div>
        )}

        {/* 2. OBSERVING PHASE (For Visual Memory Levels) */}
        {phase === 'observing' && questionData && (
          <div className="w-full max-w-2xl flex flex-col items-center justify-center text-center">
            {/* Countdown Progress in Marine Parchment */}
            <div className="marine-parchment px-5 py-2 mb-6 text-amber-950 font-black text-sm flex items-center gap-2 shadow-md">
              <Eye className="w-5 h-5 text-amber-900 animate-pulse" />
              <span>خوب نگاه کن و حفظ کن: {observationTimer} ثانیه</span>
            </div>

            {/* Word Display Cards for Observation */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8 w-full">
              {(questionData.memoryWords || [questionData.targetWord]).filter(Boolean).map((word, idx) => (
                <div
                  key={idx}
                  className="stepping-stone-bubble p-6 sm:p-8 flex flex-col items-center justify-center min-w-[140px] sm:min-w-[170px] transform hover:scale-105 transition-transform"
                >
                  <span className="text-3xl sm:text-4xl mb-2">{word?.iconEmoji}</span>
                  <span className="text-2xl sm:text-4xl font-extrabold text-white tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {word?.persianWord}
                  </span>
                  <span className="text-xs text-cyan-200 mt-2 font-black">کارت شماره {idx + 1}</span>
                </div>
              ))}
            </div>

            {/* Skip observation if child memorized early */}
            <button
              onClick={() => {
                audioService.playClick();
                setPhase('answering');
                setCompanionMood('excited');
                setCompanionSpeech('حالا با دقت پاسخ بده!');
              }}
              className="px-6 py-2.5 bg-cyan-600/80 hover:bg-cyan-500 text-white font-bold text-sm sm:text-base rounded-2xl border border-cyan-300 shadow-lg transition-all active:scale-95"
            >
              حفظ کردم! شروع پاسخ
            </button>
          </div>
        )}

        {/* 3. ANSWERING & FEEDBACK PHASE */}
        {(phase === 'answering' || phase === 'feedback') && questionData && (
          <div className="w-full max-w-3xl flex flex-col items-center">
            {/* Prompt Banner: Organic Marine Parchment Scroll */}
            {level.mechanic !== 'twenty_bubble_spelling' && level.mechanic !== 'basketball_trash_sort' && level.mechanic !== 'syllable_count_quiz' && (
              <div className="marine-parchment px-6 py-3.5 shadow-xl mb-6 text-center">
                <h2 className="text-lg sm:text-xl font-black text-amber-950 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-800" />
                  <span>{questionData.promptText}</span>
                </h2>
              </div>
            )}

            {/* SPECIAL MECHANIC: 20-BUBBLE SPELLING DETECTIVE (Levels 6, 7, 101-110) */}
            {level.mechanic === 'twenty_bubble_spelling' && questionData.twentyBubbleItems && (
              <TwentyBubbleDetective
                level={level}
                items={questionData.twentyBubbleItems}
                companionName={companion.namePersian}
                onPopSuccess={(item, newCount) => {
                  const newCombo = combo + 1;
                  setCombo(newCombo);
                  setScore(prev => prev + 100 * newCombo);
                  onRecordAnswer(item.displayedText, true, 800, 'twenty_bubble_spelling');
                  setCompanionMood('celebration');
                  const speech = `آفرین! «${item.displayedText}» غلط بود، املای درست: «${item.correctForm}»`;
                  setCompanionSpeech(speech);
                }}
                onMistakeClickCorrect={(item) => {
                  setCombo(0);
                  setMistakesCount(prev => prev + 1);
                  onRecordAnswer(item.displayedText, false, 800, 'twenty_bubble_spelling');
                  setCompanionMood('funny_fail');
                  const speech = `کلمه «${item.displayedText}» درسته و حبابش نباید بترکه!`;
                  setCompanionSpeech(speech);
                  audioService.speakPersian(speech);
                }}
                onAllPopped={(mistakesCountTotal, finalScore) => {
                  setCompanionMood('celebration');
                  finishLevel(mistakesCountTotal);
                }}
              />
            )}

            {/* SPECIAL MECHANIC: BASKETBALL VS TRASH SORT (Level 8) */}
            {level.mechanic === 'basketball_trash_sort' && questionData.basketballTrashSetup && (
              <BasketballTrashSorter
                items={questionData.basketballTrashSetup.items}
                onSuccess={(finalScore, finalCombo) => {
                  setScore(finalScore);
                  setCompanionMood('celebration');
                  const cheer = 'آفرین قهرمان بسکتبال کلمات! همه کلمات رو به بهترین شکل مرتب کردی! 🏀🗑️';
                  setCompanionSpeech(cheer);
                  audioService.speakPersian(cheer);
                  finishLevel(mistakesCount);
                }}
                onMistake={(item, target) => {
                  setCombo(0);
                  setMistakesCount(prev => prev + 1);
                  onRecordAnswer(item.word, false, 900, 'basketball_trash_sort');
                  setCompanionMood('funny_fail');
                  if (target === 'basket') {
                    const speech = `کلمه «${item.word}» غلط املایی داشت و باید به سطل زباله می‌رفت! (املای درست: ${item.correctSpelling})`;
                    setCompanionSpeech(speech);
                  } else {
                    const speech = `کلمه «${item.word}» کاملاً درست بود و باید به سبد بسکتبال پرتاب می‌شد!`;
                    setCompanionSpeech(speech);
                  }
                }}
              />
            )}

            {/* SPECIAL MECHANIC: SYLLABLE COUNT QUIZ (Level 9) */}
            {level.mechanic === 'syllable_count_quiz' && questionData.syllableQuizSetup && (
              <SyllableQuizView
                items={questionData.syllableQuizSetup.items}
                onSuccess={(finalScore, finalCombo) => {
                  setScore(finalScore);
                  setCompanionMood('celebration');
                  const cheer = 'آفرین! تمام کلمات رو با مهارت و دقت کامل بخش کردی! 👏';
                  setCompanionSpeech(cheer);
                  audioService.speakPersian(cheer);
                  finishLevel(mistakesCount);
                }}
                onMistake={(item, chosenCount) => {
                  setCombo(0);
                  setMistakesCount(prev => prev + 1);
                  onRecordAnswer(item.word, false, 800, 'syllable_count_quiz');
                  setCompanionMood('funny_fail');
                  const speech = `کلمه «${item.word}» ${item.syllableCount} بخش دارد (${item.syllablesDisplay.join(' + ')})`;
                  setCompanionSpeech(speech);
                  audioService.speakPersian(speech);
                }}
              />
            )}

            {/* 1. KRABBY BURGER BUILDER (Syllable Assembly) */}
            {level.mechanic === 'krabby_burger_builder' && questionData.burgerSyllablesSetup && (
              <KrabbyBurgerBuilder
                targetWord={questionData.burgerSyllablesSetup.targetWord}
                targetEmoji={questionData.burgerSyllablesSetup.targetEmoji}
                syllables={questionData.burgerSyllablesSetup.syllables}
                shuffledSyllables={questionData.burgerSyllablesSetup.shuffledSyllables}
                onSuccess={() => {
                  const newCombo = combo + 1;
                  setCombo(newCombo);
                  setScore(prev => prev + 150 * newCombo);
                  setCompanionMood('celebration');
                  setCompanionSpeech(`آفرین! برگر کلمه «${questionData.burgerSyllablesSetup?.targetWord}» را عالی درست کردی!`);
                  handleNextRound();
                }}
                onMistake={() => {
                  setCombo(0);
                  setMistakesCount(prev => prev + 1);
                  setCompanionMood('funny_fail');
                  setCompanionSpeech('ترتیب بخش‌های برگر اشتباه شد، دوباره تلاش کن!');
                }}
              />
            )}

            {/* 2. JELLYFISH NET CATCH */}
            {level.mechanic === 'jellyfish_net_catch' && questionData.jellyfishItemsSetup && (
              <JellyfishNetCatch
                promptText={questionData.promptText}
                items={questionData.jellyfishItemsSetup}
                onSuccess={() => {
                  const newCombo = combo + 1;
                  setCombo(newCombo);
                  setScore(prev => prev + 150 * newCombo);
                  setCompanionMood('celebration');
                  setCompanionSpeech('شکار فوق‌العاده با تور عروس دریایی!');
                  handleNextRound();
                }}
                onMistake={(item) => {
                  setCombo(0);
                  setMistakesCount(prev => prev + 1);
                  setCompanionMood('funny_fail');
                  setCompanionSpeech(`گزینه «${item.text}» مورد نظر نبود!`);
                }}
              />
            )}

            {/* 3. SANDY KARATE BREAK */}
            {level.mechanic === 'sandy_target_kick' && questionData.sandyKarateBoardsSetup && (
              <SandyKarateBreak
                promptText={questionData.promptText}
                boards={questionData.sandyKarateBoardsSetup}
                onSuccess={() => {
                  const newCombo = combo + 1;
                  setCombo(newCombo);
                  setScore(prev => prev + 150 * newCombo);
                  setCompanionMood('celebration');
                  setCompanionSpeech('ضربه کاراته سندی عالی بود! همه تخته‌های غلط خرد شدند!');
                  handleNextRound();
                }}
                onMistake={(board) => {
                  setCombo(0);
                  setMistakesCount(prev => prev + 1);
                  setCompanionMood('funny_fail');
                  setCompanionSpeech(`تخته «${board.text}» کلمه درست بود!`);
                }}
              />
            )}

            {/* 4. WORD RHYME BUBBLE */}
            {level.mechanic === 'word_rhyme_bubble' && questionData.rhymeSetup && (
              <WordRhymeBubble
                baseWord={questionData.rhymeSetup.baseWord}
                baseEmoji={questionData.rhymeSetup.baseEmoji}
                options={questionData.rhymeSetup.options}
                onSuccess={() => {
                  const newCombo = combo + 1;
                  setCombo(newCombo);
                  setScore(prev => prev + 150 * newCombo);
                  setCompanionMood('celebration');
                  setCompanionSpeech(`آفرین! حباب‌های هم‌قافیه «${questionData.rhymeSetup?.baseWord}» را پیدا کردی!`);
                  handleNextRound();
                }}
                onMistake={(opt) => {
                  setCombo(0);
                  setMistakesCount(prev => prev + 1);
                  setCompanionMood('funny_fail');
                  setCompanionSpeech(`کلمه «${opt.text}» هم‌قافیه نبود!`);
                }}
              />
            )}

            {/* 5. KRUSTY CASH REGISTER */}
            {level.mechanic === 'krusty_cash_register' && questionData.syllableCountSetup && (
              <KrustyCashRegister
                word={questionData.syllableCountSetup.word}
                emoji={questionData.syllableCountSetup.emoji}
                correctSyllables={questionData.syllableCountSetup.correctSyllables}
                correctSounds={questionData.syllableCountSetup.correctSounds}
                syllablesText={questionData.syllableCountSetup.syllablesText}
                soundsText={questionData.syllableCountSetup.soundsText}
                onSuccess={() => {
                  const newCombo = combo + 1;
                  setCombo(newCombo);
                  setScore(prev => prev + 150 * newCombo);
                  setCompanionMood('celebration');
                  setCompanionSpeech(`آقای خرچنگ از شمارش دقیق بخش‌ها و صداها خوشحاله! 🪙`);
                  handleNextRound();
                }}
                onMistake={(type, val) => {
                  setCombo(0);
                  setMistakesCount(prev => prev + 1);
                  setCompanionMood('funny_fail');
                  setCompanionSpeech(`تعداد ${type === 'syllables' ? 'بخش‌ها' : 'صداها'} را دوباره با دقت بشمار!`);
                }}
              />
            )}

            {/* 6. AUDIO DICTATION LISTEN */}
            {level.mechanic === 'audio_dictation_listen' && questionData.dictationSetup && (
              <AudioDictationListen
                word={questionData.dictationSetup.word}
                audioText={questionData.dictationSetup.audioText}
                emoji={questionData.dictationSetup.emoji}
                options={questionData.dictationSetup.options}
                onSuccess={() => {
                  const newCombo = combo + 1;
                  setCombo(newCombo);
                  setScore(prev => prev + 150 * newCombo);
                  setCompanionMood('celebration');
                  setCompanionSpeech('املای صوتی را بسیار تمیز و دقیق نوشتی!');
                  handleNextRound();
                }}
                onMistake={(opt) => {
                  setCombo(0);
                  setMistakesCount(prev => prev + 1);
                  setCompanionMood('funny_fail');
                  setCompanionSpeech(`کلمه «${opt.text}» املای درست صدای پخش‌شده نبود!`);
                }}
              />
            )}

            {/* A. VISUAL MEMORY ORDER MECHANIC (Level 1 & 2) */}
            {level.mechanic === 'visual_memory_order' && questionData.shuffledWords && (
              <div className="w-full flex flex-col items-center">
                <p className="text-xs sm:text-sm text-cyan-200 mb-4 font-medium">
                  کلمات را به ترتیب اولیه لمس کن ({selectedOrderIds.length} از {questionData.shuffledWords.length} انتخاب شده)
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                  {questionData.shuffledWords.map((word, idx) => {
                    const isSelected = selectedOrderIds.includes(word.id);
                    const selectedIndex = selectedOrderIds.indexOf(word.id);

                    return (
                      <button
                        key={word.id}
                        disabled={isSelected || phase === 'feedback'}
                        onClick={() => handleSequenceCardClick(word.id)}
                        className={`relative p-5 sm:p-7 rounded-3xl border-3 font-extrabold text-2xl sm:text-3xl transition-all select-none min-w-[130px] sm:min-w-[160px] flex flex-col items-center justify-center ${
                          isSelected
                            ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 scale-95 opacity-80'
                            : 'bg-gradient-to-b from-slate-800 to-slate-900 hover:from-cyan-900/80 hover:to-slate-800 border-cyan-400/80 text-white shadow-xl hover:scale-105 active:scale-95 cursor-pointer'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center shadow-md">
                            {selectedIndex + 1}
                          </div>
                        )}
                        <span className="text-3xl mb-1">{word.iconEmoji}</span>
                        <span>{word.persianWord}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* B. SCRAMBLED LETTERS DISPLAY (Level 8 & 9) */}
            {(level.mechanic === 'scrambled_letters_word' || level.mechanic === 'scrambled_letters_image') && questionData.scrambledLetters && (
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 bg-cyan-950/80 border-2 border-cyan-400/50 p-4 sm:p-5 rounded-3xl shadow-xl">
                {questionData.scrambledLetters.map((letter, idx) => (
                  <div
                    key={idx}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-amber-200 text-slate-950 font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform"
                  >
                    {letter}
                  </div>
                ))}
              </div>
            )}

            {/* C. MISSING LETTER DISPLAY (Level 10 & 11) */}
            {questionData.missingLetterSetup && (
              <div className="cartoon-wood-panel p-6 sm:p-8 mb-8 text-center shadow-2xl border-4 border-amber-950 relative">
                <div className="absolute top-2.5 left-3 w-2.5 h-2.5 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
                <div className="absolute top-2.5 right-3 w-2.5 h-2.5 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
                <span className="text-3xl sm:text-5xl font-black text-amber-200 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {questionData.missingLetterSetup.wordWithHole}
                </span>
              </div>
            )}

            {/* D. IMAGE SPELLING QUIZ DISPLAY (Levels 1 to 5) */}
            {level.mechanic === 'image_spelling_quiz' && questionData.imageQuizSetup && (
              <div className="w-full flex flex-col items-center mb-6">
                <div className="relative group p-3 cartoon-wood-panel border-4 border-amber-950 shadow-2xl max-w-[280px] sm:max-w-[340px] w-full">
                  {/* Decorative Rivets */}
                  <div className="absolute top-2.5 left-3 w-2.5 h-2.5 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
                  <div className="absolute top-2.5 right-3 w-2.5 h-2.5 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
                  <div className="absolute bottom-2.5 left-3 w-2.5 h-2.5 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />
                  <div className="absolute bottom-2.5 right-3 w-2.5 h-2.5 rounded-full bg-amber-950 border border-amber-600/60 shadow-inner" />

                  <div className="w-full h-56 sm:h-64 rounded-[1.85rem] overflow-hidden bg-amber-950/40 border-3 border-amber-800/80 relative flex items-center justify-center shadow-inner">
                    <img
                      src={questionData.imageQuizSetup.imageUrl}
                      alt={questionData.imageQuizSetup.imageNamePersian}
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2 marine-parchment px-3 py-1 text-xs font-black text-amber-950 shadow-md flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                      <span>تصویر را ببین</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* E. INTERACTIVE OPTIONS: Organic Bubble Answer Pods */}
            {questionData.options && level.mechanic !== 'visual_memory_order' && (
              <div
                className={`w-full max-w-2xl gap-3 sm:gap-4 ${
                  level.mechanic === 'image_spelling_quiz'
                    ? questionData.options.length === 2
                      ? 'grid grid-cols-1 sm:grid-cols-2'
                      : 'grid grid-cols-1 sm:grid-cols-3'
                    : 'grid grid-cols-1 sm:grid-cols-2'
                }`}
              >
                {questionData.options.map(option => {
                  const isSelected = selectedOptionId === option.id;
                  const showSuccess = isSelected && isAnswerCorrect;
                  const showError = isSelected && isAnswerCorrect === false;

                  return (
                    <button
                      key={option.id}
                      disabled={phase === 'feedback'}
                      onClick={() => handleOptionClick(option.id, option.isCorrect, option.text || '')}
                      className={`relative p-4 sm:p-5 btn-bubble-option font-black text-2xl sm:text-3xl transition-all shadow-xl flex items-center justify-center gap-3 select-none ${
                        showSuccess
                          ? 'bg-gradient-to-r from-emerald-400 to-green-500 text-slate-950 scale-105 shadow-emerald-500/50 ring-4 ring-emerald-300'
                          : showError
                          ? 'bg-rose-950/95 border-rose-400 text-rose-200 animate-shake ring-4 ring-rose-500'
                          : 'hover:scale-105 active:scale-95 cursor-pointer shadow-lg'
                      }`}
                    >
                      {option.emoji && <span className="text-3xl">{option.emoji}</span>}
                      <span className="tracking-wide text-slate-900">{option.text}</span>

                      {showSuccess && <CheckCircle2 className="w-7 h-7 text-emerald-800 animate-bounce absolute left-3" />}
                      {showError && <XCircle className="w-7 h-7 text-rose-400 absolute left-3" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom Companion Interaction Bar */}
      <footer className="w-full flex items-center justify-between mt-2 pt-2 border-t-2 border-amber-900/30">
        <CharacterCompanion
          character={companion}
          mood={companionMood}
          speechText={companionSpeech}
          size="md"
        />

        {/* Hint button */}
        {questionData?.hint && (
          <button
            onClick={() => {
              audioService.playClick();
              setCompanionSpeech(questionData.hint || '');
              audioService.speakPersian(questionData.hint || '');
            }}
            className="flex items-center gap-1.5 btn-marine-wood text-amber-100 px-4 py-2 text-xs sm:text-sm font-black transition-all cursor-pointer shadow-md"
            title="راهنمایی"
          >
            <HelpCircle className="w-4 h-4 text-amber-300" />
            <span>راهنمایی</span>
          </button>
        )}
      </footer>
    </div>
  );
};
