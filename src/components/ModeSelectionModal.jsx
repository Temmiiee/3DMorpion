import React from 'react';

const ModeSelectionModal = ({ onModeSelect }) => {
    const [step, setStep] = React.useState('opponent'); // 'opponent' or 'rules'
    const [opponent, setOpponent] = React.useState(null); // 'bot' or 'human'

    const handleOpponentSelect = (type) => {
        setOpponent(type);
        setStep('rules');
    };

    const handleRuleSelect = (rule) => {
        onModeSelect(rule, opponent);
    };

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
            aria-labelledby="mode-selection-title"
        >
            <div className="modal-content" style={{ width: 'min(500px, 90%)' }}>
                <h2
                    id="mode-selection-title"
                    style={{
                        fontSize: '2rem',
                        color: '#00e5ff',
                        marginBottom: '30px',
                        letterSpacing: '4px',
                        textAlign: 'center'
                    }}
                >
                    {step === 'opponent' ? 'JOUEURS' : 'RÈGLES'}
                </h2>

                <div style={{ display: 'flex', gap: '20px', flexDirection: 'column', width: '100%' }}>

                    {step === 'opponent' ? (
                        <>
                            <button
                                onClick={() => handleOpponentSelect('bot')}
                                style={buttonStyle('#00e5ff')}
                                aria-label="Jouer contre l'ordinateur"
                            >
                                SOLO (VS BOT)
                                <div style={subTextStyle}>
                                    Un joueur contre l'IA
                                </div>
                            </button>

                            <button
                                onClick={() => handleOpponentSelect('human')}
                                style={buttonStyle('#ff0040')}
                                aria-label="Jouer à deux sur le même écran"
                            >
                                2 JOUEURS (LOCAL)
                                <div style={subTextStyle}>
                                    Même ordinateur
                                </div>
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => handleRuleSelect('normal')}
                                style={buttonStyle('#00e5ff')}
                                aria-label="Mode Normal"
                            >
                                NORMAL
                                <div style={subTextStyle}>
                                    Aligner 3 = VICTOIRE
                                </div>
                            </button>

                            <button
                                onClick={() => handleRuleSelect('misere')}
                                style={buttonStyle('#ff0040')}
                                aria-label="Mode Misère"
                            >
                                MISERE
                                <div style={subTextStyle}>
                                    Aligner 3 = DÉFAITE
                                </div>
                            </button>

                            <button
                                onClick={() => setStep('opponent')}
                                style={{
                                    ...buttonStyle('#fff'),
                                    background: 'transparent',
                                    border: '1px solid #666',
                                    color: '#fff',
                                    marginTop: '10px',
                                    padding: '10px'
                                }}
                            >
                                RETOUR
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const buttonStyle = (color) => ({
    padding: '20px',
    background: 'transparent',
    color: color,
    border: `2px solid ${color}`,
    fontSize: '1.2rem',
    fontWeight: 'bold',
    letterSpacing: '2px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '10px'
});

const subTextStyle = {
    fontSize: '0.8rem',
    marginTop: '5px',
    letterSpacing: '1px',
    fontWeight: 'normal',
    color: '#ccc'
};

export default ModeSelectionModal;
