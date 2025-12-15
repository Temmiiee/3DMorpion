import React from 'react';

const CoinFlipModal = ({
    gameMode,
    coinFlipChoice,
    coinFlipping,
    coinFlipResult,
    userSymbol,
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

    // manual choice removed — toss runs automatically

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

    // Auto-run toss: display introductory screen while toss is performed automatically.
    // We remove manual choice UI — toss will use `userSymbol` if present, otherwise a random pick.
    // If toss hasn't started yet (`!coinFlipChoice && !coinFlipping && !coinFlipResult`),
    // trigger `onCoinFlipChoice` automatically shortly after mount.
    React.useEffect(() => {
        if (!coinFlipChoice && !coinFlipping && !coinFlipResult) {
            const choiceToUse = userSymbol || (Math.random() < 0.5 ? 'X' : 'O');
            const timer = setTimeout(() => onCoinFlipChoice(choiceToUse), 300);
            return () => clearTimeout(timer);
        }
    }, [userSymbol, coinFlipChoice, coinFlipping, coinFlipResult, onCoinFlipChoice]);

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

                {coinFlipResult && !coinFlipping && (() => {
                    const didPlayerWin = coinFlipResult === coinFlipChoice;
                    const centerSymbol = (gameMode === 'misere')
                        ? (didPlayerWin ? (coinFlipChoice === 'X' ? 'O' : 'X') : coinFlipChoice)
                        : (didPlayerWin ? coinFlipChoice : (coinFlipChoice === 'X' ? 'O' : 'X'));

                    const centerColor = centerSymbol === 'X' ? '#ff0040' : '#00e5ff';
                    const centerLabel = centerSymbol === 'X' ? 'ROUGE' : 'BLEU';

                    return (
                        <div style={{ animation: 'resultAppear 0.4s ease-out' }}>
                            <div style={{
                                width: '120px',
                                height: '120px',
                                margin: '0 auto 20px',
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

                            <h3 style={{
                                color: didPlayerWin ? '#00e5ff' : '#ff0040',
                                fontSize: '1rem',
                                marginBottom: '10px',
                                letterSpacing: '2px',
                                fontFamily: 'monospace'
                            }}>
                                {didPlayerWin ? 'VOUS GAGNEZ LE TOSS' : 'VOUS PERDEZ LE TOSS'}
                            </h3>

                            <p style={{
                                color: '#6b7280',
                                fontSize: '0.9rem',
                                lineHeight: '1.4',
                                fontFamily: 'monospace',
                                marginBottom: '12px'
                            }}>
                                {gameMode === 'misere' ? (
                                    'Mode MISÈRE : le gagnant reçoit l\'inconvénient — la couleur adverse peut se retrouver au centre.'
                                ) : (
                                    'Mode NORMAL : le gagnant obtient l\'avantage (sa couleur au centre).'
                                )}
                            </p>

                            <div style={{
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                marginBottom: '6px',
                                fontFamily: 'monospace'
                            }}>
                                AU CENTRE: <span style={{ color: centerColor }}>{centerLabel}</span>
                            </div>
                        </div>
                    );
                })()}
            </div>
        </div>
    );
};

export default CoinFlipModal;