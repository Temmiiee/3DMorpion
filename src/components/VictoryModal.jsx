import React from 'react';

const VictoryModal = ({ winner, onNewGame }) => {
    if (!winner || winner === 'Draw') return null;

    const winnerColor = winner === 'X' ? 'ROUGE' : 'BLEU';

    return (
        <div
            className="modal-overlay"
            style={{
                zIndex: 9999,
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(5px)'
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="victory-title"
            aria-describedby="victory-description"
        >
            <div style={{
                textAlign: 'center',
                border: `3px solid ${winner === 'X' ? '#ff0040' : '#00e5ff'}`,
                padding: '60px',
                maxWidth: '600px',
                background: '#000'
            }}>
                <div
                    style={{
                        fontSize: '5rem',
                        color: winner === 'X' ? '#ff0040' : '#00e5ff',
                        marginBottom: '20px'
                    }}
                    aria-hidden="true"
                >
                    {winner === 'X' ? '✕' : '○'}
                </div>
                <h2
                    id="victory-title"
                    style={{
                        fontSize: '3rem',
                        color: winner === 'X' ? '#ff0040' : '#00e5ff',
                        marginBottom: '10px',
                        letterSpacing: '6px'
                    }}
                >
                    VICTOIRE
                </h2>
                <p
                    id="victory-description"
                    style={{
                        fontSize: '1.5rem',
                        color: '#ffffff',
                        marginBottom: '30px',
                        letterSpacing: '3px'
                    }}
                >
                    {winnerColor} GAGNE
                </p>
                <button
                    onClick={onNewGame}
                    className="btn-base btn-large"
                    style={{
                        border: `2px solid ${winner === 'X' ? '#ff0040' : '#00e5ff'}`,
                        color: winner === 'X' ? '#ff0040' : '#00e5ff'
                    }}
                    aria-label={`Commencer une nouvelle partie. ${winnerColor} a gagné cette partie.`}
                    onMouseEnter={(e) => {
                        e.target.style.background = winner === 'X' ? '#ff0040' : '#00e5ff';
                        e.target.style.color = '#000';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = winner === 'X' ? '#ff0040' : '#00e5ff';
                    }}
                >
                    NOUVELLE PARTIE
                </button>
            </div>
        </div>
    );
};

export default VictoryModal;
