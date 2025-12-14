import React from 'react';

const CoinFlipModal = ({
    gameMode,
    coinFlipChoice,
    coinFlipping,
    coinFlipResult,
    onCoinFlipChoice
}) => {
    // Styles réutilisables
    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
    };

    const modalStyle = {
        background: '#000',
        border: '1px solid rgba(0, 229, 255, 0.5)',
        padding: '40px',
        maxWidth: '500px',
        width: '90%',
        textAlign: 'center'
    };

    const coinFaceStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        background: '#000'
    };

    const renderCoinButton = (symbol, color) => {
        const symbolName = symbol === 'X' ? 'Croix (Rouge)' : 'Cercle (Bleu)';
        return (
            <button
                onClick={() => onCoinFlipChoice(symbol)}
                aria-label={`Choisir ${symbolName} pour le pile ou face`}
                style={{
                    width: '120px',
                    height: '120px',
                    background: '#000',
                    border: `2px solid ${color}`,
                    borderRadius: '50%',
                    color: color,
                    fontSize: '4rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontFamily: 'Arial, sans-serif',
                    lineHeight: 1,
                    padding: 0
                }}
                onMouseEnter={(e) => {
                    e.target.style.background = color;
                    e.target.style.color = '#000';
                }}
                onMouseLeave={(e) => {
                    e.target.style.background = '#000';
                    e.target.style.color = color;
                }}
            >
                <span aria-hidden="true">{symbol === 'X' ? '✕' : '◯'}</span>
            </button>
        );
    };

    const renderCoinFace = (symbol, color, rotation = 0) => (
        <div
            style={{
                ...coinFaceStyle,
                transform: `rotateY(${rotation}deg)`,
                border: `2px solid ${color}`,
                fontSize: '5rem',
                color: color,
                fontWeight: 'bold',
                fontFamily: 'Arial, sans-serif',
                lineHeight: 1
            }}
        >
            {symbol === 'X' ? '✕' : '◯'}
        </div>
    );

    // Écran de choix
    if (!coinFlipChoice) {
        return (
            <div
                style={overlayStyle}
                role="dialog"
                aria-modal="true"
                aria-labelledby="coinflip-title"
                aria-describedby="coinflip-description"
            >
                <div style={modalStyle}>
                    <h2
                        id="coinflip-title"
                        style={{
                            color: '#00e5ff',
                            fontSize: '1.5rem',
                            marginBottom: '20px',
                            fontFamily: 'monospace',
                            textTransform: 'uppercase',
                            letterSpacing: '4px',
                            fontWeight: 'normal'
                        }}
                    >
                        PILE OU FACE
                    </h2>

                    <p
                        id="coinflip-description"
                        style={{
                            color: '#6b7280',
                            marginBottom: '30px',
                            lineHeight: '1.6',
                            fontSize: '0.9rem',
                            fontFamily: 'monospace'
                        }}
                    >
                        {gameMode === 'misere'
                            ? 'Le perdant aura sa couleur au centre'
                            : 'Le gagnant aura sa couleur au centre'}
                    </p>

                    <p style={{
                        color: '#00e5ff',
                        marginBottom: '30px',
                        fontSize: '0.9rem',
                        fontFamily: 'monospace',
                        letterSpacing: '2px'
                    }}>
                        CHOISISSEZ VOTRE CÔTÉ
                    </p>

                    <div
                        role="group"
                        aria-label="Choix du symbole pour le pile ou face"
                        style={{
                            display: 'flex',
                            gap: '30px',
                            justifyContent: 'center'
                        }}
                    >
                        {renderCoinButton('X', '#ff0040')}
                        {renderCoinButton('O', '#00e5ff')}
                    </div>
                </div>
            </div>
        );
    }

    // Écran d'animation/résultat
    return (
        <div
            style={overlayStyle}
            role="dialog"
            aria-modal="true"
            aria-live="polite"
            aria-busy={coinFlipping}
            aria-labelledby="coinflip-result-title"
        >
            <style>
                {`
                    @keyframes coinFlip3D {
                        0% { transform: rotateY(0deg); }
                        100% { transform: rotateY(360deg); }
                    }
                    
                    @keyframes resultAppear {
                        0% { 
                            opacity: 0;
                            transform: scale(0.8);
                        }
                        100% { 
                            opacity: 1;
                            transform: scale(1);
                        }
                    }
                    
                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.7; }
                    }
                `}
            </style>
            <div style={{
                ...modalStyle,
                padding: '60px 40px'
            }}>
                {coinFlipping && (
                    <>
                        <h3 style={{
                            color: '#00e5ff',
                            fontSize: '1rem',
                            marginBottom: '30px',
                            letterSpacing: '3px',
                            fontFamily: 'monospace',
                            animation: 'pulse 1s ease-in-out infinite'
                        }}>
                            LANCEMENT...
                        </h3>
                        <div style={{
                            perspective: '1200px',
                            width: '120px',
                            height: '120px',
                            margin: '0 auto'
                        }}>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                position: 'relative',
                                transformStyle: 'preserve-3d',
                                animation: 'coinFlip3D 0.5s linear infinite'
                            }}>
                                {/* Face X (avant) */}
                                {renderCoinFace('X', '#ff0040', 0)}
                                {/* Face O (arrière) */}
                                {renderCoinFace('O', '#00e5ff', 180)}
                            </div>
                        </div>
                    </>
                )}

                {coinFlipResult && !coinFlipping && (
                    <div style={{
                        animation: 'resultAppear 0.4s ease-out'
                    }}>
                        <div style={{
                            width: '120px',
                            height: '120px',
                            margin: '0 auto 30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '5rem',
                            fontWeight: 'bold',
                            color: coinFlipResult === 'X' ? '#ff0040' : '#00e5ff',
                            border: `2px solid ${coinFlipResult === 'X' ? '#ff0040' : '#00e5ff'}`,
                            borderRadius: '50%',
                            background: '#000',
                            lineHeight: 1
                        }}>
                            {coinFlipResult === 'X' ? '✕' : '◯'}
                        </div>

                        <div style={{
                            fontSize: '1.2rem',
                            fontWeight: 'normal',
                            marginBottom: '20px',
                            fontFamily: 'monospace',
                            letterSpacing: '2px',
                            color: coinFlipResult === coinFlipChoice 
                                ? (gameMode === 'misere' ? '#ff0040' : '#00e5ff')
                                : (gameMode === 'misere' ? '#00e5ff' : '#ff0040')
                        }}>
                            {coinFlipResult === coinFlipChoice ? (
                                <span>
                                    {gameMode === 'misere' ? 'VOUS PERDEZ' : 'VOUS GAGNEZ'}
                                </span>
                            ) : (
                                <span>
                                    {gameMode === 'misere' ? 'VOUS GAGNEZ' : 'VOUS PERDEZ'}
                                </span>
                            )}
                        </div>

                        <p style={{
                            color: '#6b7280',
                            fontSize: '0.9rem',
                            lineHeight: '1.6',
                            fontFamily: 'monospace'
                        }}>
                            <span style={{
                                color: coinFlipResult === 'X' ? '#ff0040' : '#00e5ff'
                            }}>
                                {coinFlipResult}
                            </span>
                            {' '}COMMENCE AU CENTRE
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoinFlipModal;