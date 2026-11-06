import React, { useState, useEffect } from 'react';
import { 
  GameScreen, 
  LevelConfig, 
  PlayerSaveState 
} from './types';
import { GAME_LEVELS } from './data/levels';
import { getCharacterById } from './data/characters';
import { loadPlayerState, savePlayerState, resetPlayerState } from './services/storageService';
import { audioService } from './services/audioService';

import { UnderwaterBackground } from './components/UnderwaterBackground';
import { MainMenu } from './components/MainMenu';
import { WorldMap } from './components/WorldMap';
import { GameplayView } from './components/GameplayView';
import { LevelCompleteModal } from './components/LevelCompleteModal';
import { FinalCelebration } from './components/FinalCelebration';
import { ParentDashboard } from './components/ParentDashboard';
import { AchievementsView } from './components/AchievementsView';
import { SettingsModal } from './components/SettingsModal';
import { CreditsModal } from './components/CreditsModal';
import { CinematicIntro } from './components/CinematicIntro';
import { CharacterSelectModal } from './components/CharacterSelectModal';

export default function App() {
  const [playerState, setPlayerState] = useState<PlayerSaveState>(loadPlayerState);
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('menu');
  const [activeLevel, setActiveLevel] = useState<LevelConfig | null>(null);

  // Level Complete Modal state
  const [completedLevelData, setCompletedLevelData] = useState<{
    level: LevelConfig;
    stars: number;
    coinsEarned: number;
    score: number;
    timeSpent: number;
  } | null>(null);

  // Modals overlay
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showCreditsModal, setShowCreditsModal] = useState<boolean>(false);
  const [showCharacterSelectModal, setShowCharacterSelectModal] = useState<boolean>(false);

  // Save state on updates
  useEffect(() => {
    savePlayerState(playerState);
  }, [playerState]);

  // Audio setup on user interaction
  const handleStartMusic = () => {
    if (playerState.settings.musicEnabled) {
      audioService.startMusic('adventure');
    }
  };

  // Navigate to Level
  const handleSelectLevel = (level: LevelConfig) => {
    setActiveLevel(level);
    setCurrentScreen('gameplay');
    handleStartMusic();
  };

  // Start / Continue Adventure
  const handleStartAdventure = () => {
    handleStartMusic();
    if (GAME_LEVELS.length === 0) {
      setCurrentScreen('map');
      return;
    }
    const targetId = (playerState.currentLevel >= 1 && playerState.currentLevel <= GAME_LEVELS.length)
      ? playerState.currentLevel
      : 1;
    const levelToPlay = GAME_LEVELS.find(l => l.id === targetId) || GAME_LEVELS[0];
    if (levelToPlay) {
      setActiveLevel(levelToPlay);
      setCurrentScreen('gameplay');
    } else {
      setCurrentScreen('map');
    }
  };

  // Answer recording for adaptive analytics
  const handleRecordAnswer = (
    letterOrWord: string,
    wasCorrect: boolean,
    timeMs: number,
    skill: string
  ) => {
    setPlayerState(prev => {
      const stats = { ...prev.adaptiveStats };
      stats.totalQuestions += 1;
      if (wasCorrect) {
        stats.correctAnswers += 1;
        stats.currentCombo += 1;
        if (stats.currentCombo > stats.longestCombo) {
          stats.longestCombo = stats.currentCombo;
        }
      } else {
        stats.incorrectAnswers += 1;
        stats.currentCombo = 0;

        // Log problematic letters
        const matchedChars = letterOrWord.match(/[صسثزذضظتطهحکگقغ]/g);
        if (matchedChars) {
          matchedChars.forEach(ch => {
            stats.letterMistakes[ch] = (stats.letterMistakes[ch] || 0) + 1;
          });
        }
        stats.wordMistakes[letterOrWord] = (stats.wordMistakes[letterOrWord] || 0) + 1;
      }

      // Update average response time
      stats.averageResponseTimeMs = Math.round(
        (stats.averageResponseTimeMs * (stats.totalQuestions - 1) + timeMs) / stats.totalQuestions
      );

      return {
        ...prev,
        adaptiveStats: stats
      };
    });
  };

  // Handle Level Completion
  const handleLevelComplete = (
    stars: number,
    coinsEarned: number,
    score: number,
    timeSpent: number
  ) => {
    if (!activeLevel) return;

    setPlayerState(prev => {
      const existing = prev.completedLevels[activeLevel.id];
      const previousStars = existing ? existing.stars : 0;
      const starDiff = Math.max(0, stars - previousStars);

      const nextLevelNum = Math.max(prev.currentLevel, activeLevel.id + 1);

      return {
        ...prev,
        stars: prev.stars + starDiff,
        coins: prev.coins + coinsEarned,
        currentLevel: Math.min(nextLevelNum, Math.max(GAME_LEVELS.length, 1)),
        completedLevels: {
          ...prev.completedLevels,
          [activeLevel.id]: {
            stars: Math.max(previousStars, stars),
            highScore: Math.max(existing?.highScore || 0, score),
            completedAt: Date.now(),
            bestTimeSeconds: existing?.bestTimeSeconds ? Math.min(existing.bestTimeSeconds, timeSpent) : timeSpent,
            attempts: (existing?.attempts || 0) + 1
          }
        }
      };
    });

    // If final level (Level 6) was completed -> Show victory celebration!
    if (activeLevel.id === GAME_LEVELS[GAME_LEVELS.length - 1].id) {
      setCurrentScreen('finalCelebration');
    } else {
      setCompletedLevelData({
        level: activeLevel,
        stars,
        coinsEarned,
        score,
        timeSpent
      });
    }
  };

  // Progress to Next Level from Modal
  const handleNextLevelFromModal = () => {
    if (!completedLevelData) return;
    const nextId = completedLevelData.level.id + 1;
    const nextLevelConfig = GAME_LEVELS.find(l => l.id === nextId);

    setCompletedLevelData(null);
    if (nextLevelConfig) {
      setActiveLevel(nextLevelConfig);
      setCurrentScreen('gameplay');
    } else {
      setCurrentScreen('map');
    }
  };

  // Return to Map from Modal
  const handleReturnToMapFromModal = () => {
    setCompletedLevelData(null);
    setCurrentScreen('map');
  };

  // Claim achievement reward
  const handleClaimReward = (badgeId: string, rewardCoins: number) => {
    setPlayerState(prev => ({
      ...prev,
      coins: prev.coins + rewardCoins,
      unlockedBadges: [...prev.unlockedBadges, badgeId]
    }));
  };

  // Select Companion
  const handleSelectCharacter = (characterId: string) => {
    setPlayerState(prev => ({
      ...prev,
      selectedCharacterId: characterId
    }));
    setShowCharacterSelectModal(false);
  };

  // Unlock Companion with coins
  const handleUnlockCharacter = (characterId: string, cost: number) => {
    setPlayerState(prev => ({
      ...prev,
      coins: prev.coins - cost,
      unlockedCharacters: [...prev.unlockedCharacters, characterId],
      selectedCharacterId: characterId
    }));
  };

  // Reset Progress
  const handleResetProgress = () => {
    const fresh = resetPlayerState();
    setPlayerState(fresh);
    setCurrentScreen('menu');
  };

  // Get active background theme
  const getActiveTheme = () => {
    if (currentScreen === 'gameplay' && activeLevel) {
      return activeLevel.environment;
    }
    if (currentScreen === 'finalCelebration') {
      return 'ancient_palace';
    }
    return 'coral_reef';
  };

  return (
    <UnderwaterBackground theme={getActiveTheme()}>
      {/* 1. CINEMATIC INTRO SCREEN */}
      {currentScreen === 'intro' && (
        <CinematicIntro
          onFinishIntro={() => {
            setCurrentScreen('map');
          }}
        />
      )}

      {/* 2. MAIN MENU SCREEN */}
      {currentScreen === 'menu' && (
        <MainMenu
          playerState={playerState}
          onNavigate={screen => {
            if (screen === 'settings') setShowSettingsModal(true);
            else if (screen === 'credits') setShowCreditsModal(true);
            else setCurrentScreen(screen);
          }}
          onStartAdventure={handleStartAdventure}
        />
      )}

      {/* 3. WORLD MAP SCREEN */}
      {currentScreen === 'map' && (
        <WorldMap
          playerState={playerState}
          onSelectLevel={handleSelectLevel}
          onOpenMenu={() => setCurrentScreen('menu')}
          onOpenAchievements={() => setCurrentScreen('achievements')}
          onOpenParentDashboard={() => setCurrentScreen('parentDashboard')}
          onOpenSettings={() => setShowSettingsModal(true)}
          onOpenCredits={() => setShowCreditsModal(true)}
          onOpenCharacterSelect={() => setShowCharacterSelectModal(true)}
        />
      )}

      {/* 4. GAMEPLAY SCREEN */}
      {currentScreen === 'gameplay' && activeLevel && (
        <GameplayView
          key={activeLevel.id}
          level={activeLevel}
          playerState={playerState}
          onLevelComplete={handleLevelComplete}
          onExitToMap={() => setCurrentScreen('map')}
          onRecordAnswer={handleRecordAnswer}
        />
      )}

      {/* 5. LEVEL COMPLETE MODAL */}
      {completedLevelData && (
        <LevelCompleteModal
          level={completedLevelData.level}
          companion={getCharacterById(completedLevelData.level.companionCharacterId || playerState.selectedCharacterId)}
          stars={completedLevelData.stars}
          coinsEarned={completedLevelData.coinsEarned}
          score={completedLevelData.score}
          timeSpent={completedLevelData.timeSpent}
          hasNextLevel={completedLevelData.level.id < GAME_LEVELS.length}
          onNextLevel={handleNextLevelFromModal}
          onReturnToMap={handleReturnToMapFromModal}
        />
      )}

      {/* 6. FINAL CELEBRATION (GRADUATION) */}
      {currentScreen === 'finalCelebration' && (
        <FinalCelebration
          onReturnToMap={() => setCurrentScreen('map')}
        />
      )}

      {/* 7. PARENT / TEACHER DASHBOARD */}
      {currentScreen === 'parentDashboard' && (
        <ParentDashboard
          playerState={playerState}
          onBack={() => setCurrentScreen('map')}
        />
      )}

      {/* 8. ACHIEVEMENTS VIEW */}
      {currentScreen === 'achievements' && (
        <AchievementsView
          playerState={playerState}
          onClaimReward={handleClaimReward}
          onBack={() => setCurrentScreen('map')}
        />
      )}

      {/* 9. SETTINGS MODAL */}
      {showSettingsModal && (
        <SettingsModal
          playerState={playerState}
          onUpdateSettings={newSettings => {
            setPlayerState(prev => ({
              ...prev,
              settings: newSettings
            }));
          }}
          onResetProgress={handleResetProgress}
          onClose={() => setShowSettingsModal(false)}
        />
      )}

      {/* 10. CREDITS MODAL */}
      {showCreditsModal && (
        <CreditsModal
          onClose={() => setShowCreditsModal(false)}
        />
      )}

      {/* 11. CHARACTER SELECTION MODAL / SCREEN */}
      {(showCharacterSelectModal || currentScreen === 'characterSelect') && (
        <CharacterSelectModal
          playerState={playerState}
          onSelectCharacter={handleSelectCharacter}
          onUnlockCharacter={handleUnlockCharacter}
          onClose={() => {
            setShowCharacterSelectModal(false);
            if (currentScreen === 'characterSelect') {
              setCurrentScreen('menu');
            }
          }}
        />
      )}
    </UnderwaterBackground>
  );
}
