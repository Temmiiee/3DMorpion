import React from 'react';

const Controls = ({
    currentPlayer,
    scores,
    winner,
    gameMode = 'misere',
    onNewGame,
    onReset,
    onRotate
}) => {
    return (
        <div
            role="complementary"
            aria-label="Panneau de contrôle du jeu"
            style={{
                flex: '0 1 300px',
                minWidth: 'min(250px, 100%)',
                maxWidth: '350px',
                width: '100%',
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid #00e5ff',
                padding: 'clamp(15px, 3vw, 20px)',
                fontFamily: 'Roboto Mono, monospace'
            }}
        >
            <h2 style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                marginBottom: 'clamp(15px, 3vw, 20px)',
                color: '#00e5ff',
                borderBottom: '1px solid #00e5ff',
                paddingBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: 'clamp(2px, 0.5vw, 3px)',
                fontWeight: '400'
            }}>CONTRÔLES</h2>

            <section
                aria-label="Scores des joueurs"
                style={{ marginBottom: '20px' }}
            >
                <div
                    role="group"
                    aria-label={`Joueur Rouge (X) - Score: ${scores.X}${currentPlayer === 'X' ? ' - Tour actuel' : ''}`}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px',
                        marginBottom: '8px',
                        border: currentPlayer === 'X' ? '1px solid #ff0040' : '1px solid #333',
                        background: currentPlayer === 'X' ? 'rgba(255, 0, 64, 0.05)' : 'transparent'
                    }}
                >
                    <div>
                        <div style={{ color: '#ff0040', fontSize: '0.85rem', marginBottom: '4px' }}>ROUGE</div>
                        <div style={{ color: '#999', fontSize: '0.75rem' }}>SCORE: {scores.X}</div>
                    </div>
                    <div
                        aria-hidden="true"
                        style={{
                            width: '24px',
                            height: '24px',
                            border: '2px solid #ff0040',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ff0040',
                            fontSize: '1rem',
                            fontWeight: 'bold'
                        }}
                    >X</div>
                </div>

                <div
                    role="group"
                    aria-label={`Joueur Bleu (O) - Score: ${scores.O}${currentPlayer === 'O' ? ' - Tour actuel' : ''}`}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px',
                        border: currentPlayer === 'O' ? '1px solid #00e5ff' : '1px solid #333',
                        background: currentPlayer === 'O' ? 'rgba(0, 229, 255, 0.05)' : 'transparent'
                    }}
                >
                    <div>
                        <div style={{ color: '#00e5ff', fontSize: '0.85rem', marginBottom: '4px' }}>BLEU</div>
                        <div style={{ color: '#999', fontSize: '0.75rem' }}>SCORE: {scores.O}</div>
                    </div>
                    <div
                        aria-hidden="true"
                        style={{
                            width: '24px',
                            height: '24px',
                            border: '2px solid #00e5ff',
                            borderRadius: '50%'
                        }}
                    ></div>
                </div>
            </section>

            <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                style={{
                    textAlign: 'center',
                    padding: '15px',
                    border: '1px solid #00e5ff',
                    marginBottom: '20px',
                    fontSize: '0.85rem',
                    letterSpacing: '1px'
                }}
            >
                {winner ? (
                    winner === 'Draw' ? (
                        <span style={{ color: '#6b7280' }}>MATCH NUL</span>
                    ) : (
                        <span>
                            <span style={{ color: winner === 'X' ? '#ff0040' : '#00e5ff' }}>
                                {winner === 'X' ? 'ROUGE' : 'BLEU'}
                            </span> GAGNE
                        </span>
                    )
                ) : (
                    <span>
                        TOUR: <span style={{ color: currentPlayer === 'X' ? '#ff0040' : '#00e5ff' }}>
                            {currentPlayer === 'X' ? 'ROUGE' : 'BLEU'}
                        </span>
                    </span>
                )}
            </div>

            <nav aria-label="Actions de jeu" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <button
                    onClick={onNewGame}
                    style={buttonStyle}
                    aria-label="Commencer une nouvelle partie"
                >
                    NOUVELLE PARTIE
                </button>

                <button
                    onClick={onReset}
                    style={{ ...buttonStyle, borderColor: '#6b7280', color: '#6b7280' }}
                    aria-label="Réinitialiser tous les scores"
                >
                    RESET SCORES
                </button>
            </nav>

            <div style={{
                padding: '15px',
                border: `1px solid ${gameMode === 'misere' ? '#ff0040' : '#00e5ff'}`,
                fontSize: '0.75rem',
                color: '#999',
                lineHeight: '1.6',
                background: 'transparent'
            }}>
                <div style={{ color: gameMode === 'misere' ? '#ff0040' : '#00e5ff', marginBottom: '8px', fontSize: '0.85rem', letterSpacing: '1px' }}>
                    {gameMode === 'misere' ? '⚠️ RÈGLE MISERE' : '✓ RÈGLE NORMAL'}
                </div>
                <div>Aligner 3 cubes = {gameMode === 'misere' ? 'PERTE' : 'VICTOIRE'}</div>
                <div style={{ marginTop: '8px', fontSize: '0.7rem', color: '#666' }}>
                    Clic pour sélectionner, clic pour valider
                </div>
            </div>
        </div>
    );
};

const buttonStyle = {
    padding: '12px',
    background: 'transparent',
    border: '1px solid #00e5ff',
    color: '#00e5ff',
    fontFamily: 'Roboto Mono, monospace',
    fontSize: '0.85rem',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    transition: 'all 0.2s'
};

const rotateBtnStyle = {
    padding: '10px',
    background: 'transparent',
    border: '1px solid #333',
    color: '#00e5ff',
    fontFamily: 'Roboto Mono, monospace',
    fontSize: '1.2rem',
    cursor: 'pointer',
    transition: 'all 0.2s'
};

export default Controls;
