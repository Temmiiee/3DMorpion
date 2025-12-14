import React, { useState, useEffect } from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import CubeScene from './components/CubeScene';
import Controls from './components/Controls';
import ModeSelectionModal from './components/ModeSelectionModal';
import CoinFlipModal from './components/CoinFlipModal';
import VictoryModal from './components/VictoryModal';
import './styles/index.css';

function App() {
  const [gameMode, setGameMode] = useState(null); // null, 'normal', 'misere'
  const [showModeSelection, setShowModeSelection] = useState(true);
  const [showCoinFlip, setShowCoinFlip] = useState(false);
  const [coinFlipChoice, setCoinFlipChoice] = useState(null); // 'X' or 'O'
  const [coinFlipResult, setCoinFlipResult] = useState(null);
  const [coinFlipping, setCoinFlipping] = useState(false);
  const [coinFlipSymbol, setCoinFlipSymbol] = useState('X');

  const [opponent, setOpponent] = useState('human'); // 'human' or 'bot'

  const {
    board,
    currentPlayer,
    gameActive,
    scores,
    losingLine,
    winner,
    handleCellClick,
    resetGame,
    fullReset,
    setBoard
  } = useGameLogic(gameMode, opponent);

  const [rotation, setRotation] = useState({ x: -20, y: -20 });

  const handleModeSelect = (mode, opponentType) => {
    setGameMode(mode);
    setOpponent(opponentType || 'human');
    setShowModeSelection(false);
    setShowCoinFlip(true);
  };

  const handleCoinFlipChoice = (choice) => {
    setCoinFlipChoice(choice);
    setCoinFlipping(true);

    // Alternate symbols during flip
    const interval = setInterval(() => {
      setCoinFlipSymbol(prev => prev === 'X' ? 'O' : 'X');
    }, 150);

    setTimeout(() => {
      clearInterval(interval);
      const result = Math.random() < 0.5 ? 'X' : 'O';
      setCoinFlipResult(result);
      setCoinFlipping(false);

      setTimeout(() => {
        // Place color in center based on mode and result
        let colorToPlace;
        if (gameMode === 'misere') {
          // In Misere mode: if you WIN the flip, you get the DISADVANTAGE (opponent's color in center)
          // If you LOSE the flip, you get the ADVANTAGE (your color in center)
          colorToPlace = result === choice ? (choice === 'X' ? 'O' : 'X') : choice;
        } else {
          // In Normal mode: if you WIN the flip, you get the ADVANTAGE (your color in center)
          // If you LOSE the flip, you get the DISADVANTAGE (opponent's color in center)
          colorToPlace = result === choice ? choice : (choice === 'X' ? 'O' : 'X');
        }

        const newBoard = board.map(plane => plane.map(row => [...row]));
        newBoard[1][1][1] = colorToPlace;
        setBoard(newBoard);

        setShowCoinFlip(false);
      }, 2000);
    }, 1500);
  };

  const handleRotation = (direction) => {
    setRotation(prev => {
      const step = 15;
      let newRotation = { ...prev };

      switch (direction) {
        case 'left': newRotation.y = prev.y - step; break;
        case 'right': newRotation.y = prev.y + step; break;
        case 'up': newRotation.x = prev.x - step; break;
        case 'down': newRotation.x = prev.x + step; break;
        case 'cw':
          newRotation.x = prev.x + 5;
          newRotation.y = prev.y + step;
          break;
        case 'ccw':
          newRotation.x = prev.x - 5;
          newRotation.y = prev.y - step;
          break;
      }

      // Pas de contrainte - rotation libre à 360°
      return newRotation;
    });
  };

  const handleRotationChange = (newRotation) => {
    // Rotation libre sans contraintes pour une visualisation 3D complète
    setRotation(newRotation);
  };

  const handleNewGame = () => {
    resetGame();
    setShowModeSelection(true);
    setCoinFlipResult(null);
    setCoinFlipChoice(null);
  };

  const handleFullReset = () => {
    fullReset(); // Réinitialise le plateau et les scores
    setGameMode(null); // Réinitialise le mode de jeu
    setShowModeSelection(true); // Affiche la sélection de mode
    setShowCoinFlip(false); // Cache le coin flip
    setCoinFlipResult(null); // Réinitialise le résultat du coin flip
    setCoinFlipChoice(null); // Réinitialise le choix du coin flip
    setCoinFlipping(false); // Arrête l'animation du coin flip
    setRotation({ x: -20, y: -20 }); // Réinitialise la rotation du cube
  };

  return (
    <div style={{
      minHeight: '100vh',
      color: '#ffffff',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          left: '-9999px',
          zIndex: 9999,
          padding: '1em',
          background: '#00e5ff',
          color: '#000',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
        onFocus={(e) => e.target.style.left = '0'}
        onBlur={(e) => e.target.style.left = '-9999px'}
      >
        Aller au contenu principal
      </a>

      {/* Mode Selection Screen */}
      {showModeSelection && (
        <ModeSelectionModal onModeSelect={handleModeSelect} />
      )}

      {/* Coin Flip Screen */}
      {showCoinFlip && (
        <CoinFlipModal
          gameMode={gameMode}
          coinFlipChoice={coinFlipChoice}
          coinFlipping={coinFlipping}
          coinFlipResult={coinFlipResult}
          onCoinFlipChoice={handleCoinFlipChoice}
        />
      )}

      {/* Victory Screen */}
      <VictoryModal winner={winner} onNewGame={handleNewGame} />

      <header role="banner" style={{
        textAlign: 'center',
        padding: 'clamp(15px, 3vw, 20px)',
        borderBottom: '1px solid #00e5ff',
        marginBottom: 'clamp(20px, 4vw, 30px)'
      }}>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
          color: '#00e5ff',
          textTransform: 'uppercase',
          letterSpacing: 'clamp(3px, 1.5vw, 8px)',
          fontWeight: '400',
          margin: 0
        }}>MORPION 3D</h1>
        <p
          aria-live="polite"
          aria-atomic="true"
          style={{
            fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
            color: '#6b7280',
            marginTop: '8px',
            letterSpacing: 'clamp(1px, 0.5vw, 3px)'
          }}
        >
          {gameMode === 'misere' ? 'MODE MISERE' : gameMode === 'normal' ? 'MODE NORMAL' : ''}
        </p>
      </header>

      <main id="main-content" role="main" style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '40px',
        padding: '20px',
        maxWidth: '1400px',
        margin: '0 auto',
        paddingBottom: '40px'
      }}>
        <section
          aria-label="Zone de jeu principale"
          style={{
            flex: '1 1 500px',
            maxWidth: '600px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <CubeScene
            board={board}
            onCellClick={handleCellClick}
            rotation={rotation}
            setRotation={setRotation}
          />

          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            style={{
              fontSize: 'clamp(0.9rem, 3vw, 1.3rem)',
              textAlign: 'center',
              padding: 'clamp(15px, 3vw, 20px)',
              marginTop: 'clamp(20px, 4vw, 30px)',
              border: '1px solid #00e5ff',
              width: '100%',
              maxWidth: '500px',
              letterSpacing: 'clamp(1px, 0.5vw, 2px)',
              textTransform: 'uppercase'
            }}
          >
            {winner ? (
              winner === 'Draw' ? (
                <span style={{ color: '#6b7280' }}>MATCH NUL</span>
              ) : (
                <span>
                  VICTOIRE: <span style={{ color: winner === 'X' ? '#ff0040' : '#00e5ff' }}>
                    {winner === 'X' ? 'ROUGE' : 'BLEU'}
                  </span>
                </span>
              )
            ) : (
              <span>
                <span style={{ color: currentPlayer === 'X' ? '#ff0040' : '#00e5ff' }}>
                  {currentPlayer === 'X' ? 'ROUGE' : 'BLEU'}
                </span>
              </span>
            )}
          </div>
        </section>

        <aside aria-label="Panneau de contrôle">
          <Controls
            currentPlayer={currentPlayer}
            scores={scores}
            winner={winner}
            gameMode={gameMode}
            onNewGame={handleNewGame}
            onReset={handleFullReset}
            onRotate={handleRotation}
          />
        </aside>
      </main>
    </div>
  );
}

export default App;
