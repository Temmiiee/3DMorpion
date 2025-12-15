import { useState, useEffect, useCallback } from 'react';

const WINNING_LINES = [];

// Generate winning lines (same as original logic)
function generateWinningLines() {
    if (WINNING_LINES.length > 0) return;

    // X planes
    for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
            WINNING_LINES.push([[0, y, z], [1, y, z], [2, y, z]]);
        }
    }
    // Y planes
    for (let x = 0; x < 3; x++) {
        for (let z = 0; z < 3; z++) {
            WINNING_LINES.push([[x, 0, z], [x, 1, z], [x, 2, z]]);
        }
    }
    // Z planes
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            WINNING_LINES.push([[x, y, 0], [x, y, 1], [x, y, 2]]);
        }
    }
    // Diagonals in XY
    for (let z = 0; z < 3; z++) {
        WINNING_LINES.push([[0, 0, z], [1, 1, z], [2, 2, z]]);
        WINNING_LINES.push([[0, 2, z], [1, 1, z], [2, 0, z]]);
    }
    // Diagonals in XZ
    for (let y = 0; y < 3; y++) {
        WINNING_LINES.push([[0, y, 0], [1, y, 1], [2, y, 2]]);
        WINNING_LINES.push([[0, y, 2], [1, y, 1], [2, y, 0]]);
    }
    // Diagonals in YZ
    for (let x = 0; x < 3; x++) {
        WINNING_LINES.push([[x, 0, 0], [x, 1, 1], [x, 2, 2]]);
        WINNING_LINES.push([[x, 0, 2], [x, 1, 1], [x, 2, 0]]);
    }
    // 3D Diagonals
    WINNING_LINES.push([[0, 0, 0], [1, 1, 1], [2, 2, 2]]);
    WINNING_LINES.push([[0, 0, 2], [1, 1, 1], [2, 2, 0]]);
    WINNING_LINES.push([[0, 2, 0], [1, 1, 1], [2, 0, 2]]);
    WINNING_LINES.push([[0, 2, 2], [1, 1, 1], [2, 0, 0]]);
}

generateWinningLines();

export function useGameLogic(gameMode = 'misere', opponent = 'human', userSymbol = null) {
    const [board, setBoard] = useState(Array(3).fill().map(() => Array(3).fill().map(() => Array(3).fill(null))));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [gameActive, setGameActive] = useState(true);
    const [scores, setScores] = useState({ X: 0, O: 0 });
    const [losingLine, setLosingLine] = useState(null);
    const [winner, setWinner] = useState(null);

    const resetGame = useCallback(() => {
        setBoard(Array(3).fill().map(() => Array(3).fill().map(() => Array(3).fill(null))));
        setCurrentPlayer('X');
        setGameActive(true);
        setLosingLine(null);
        setWinner(null);
    }, []);

    const fullReset = useCallback(() => {
        resetGame();
        setScores({ X: 0, O: 0 });
    }, [resetGame]);

    const checkLine = useCallback((currentBoard, playerJustMoved) => {
        for (const line of WINNING_LINES) {
            const [a, b, c] = line;
            const [ax, ay, az] = a;
            const [bx, by, bz] = b;
            const [cx, cy, cz] = c;

            if (
                currentBoard[ax][ay][az] === playerJustMoved &&
                currentBoard[bx][by][bz] === playerJustMoved &&
                currentBoard[cx][cy][cz] === playerJustMoved
            ) {
                return line;
            }
        }
        return null;
    }, []);

    const checkDraw = useCallback((currentBoard) => {
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                for (let z = 0; z < 3; z++) {
                    if (currentBoard[x][y][z] === null) return false;
                }
            }
        }
        return true;
    }, []);

    const processTurn = useCallback((newBoard, player) => {
        // Check if the move caused a line
        const line = checkLine(newBoard, player);

        if (line) {
            setGameActive(false);
            setLosingLine(line);
            
            // Determine winner based on mode
            let winningPlayer;
            if (gameMode === 'misere') {
                winningPlayer = player === 'X' ? 'O' : 'X';
            } else {
                winningPlayer = player;
            }
            
            setWinner(winningPlayer);
            setScores(prev => ({ ...prev, [winningPlayer]: prev[winningPlayer] + 1 }));
        } else if (checkDraw(newBoard)) {
            setGameActive(false);
            setWinner('Draw');
        } else {
            setCurrentPlayer(prev => prev === 'X' ? 'O' : 'X');
        }
    }, [checkLine, checkDraw, gameMode]);

    const handleCellClick = useCallback((x, y, z) => {
        // Prevent interaction if game inactive, cell taken, OR if it's bot's turn
        if (!gameActive || board[x][y][z] !== null) return;
        const botSymbol = opponent === 'bot' ? (userSymbol ? (userSymbol === 'X' ? 'O' : 'X') : 'O') : null;
        if (opponent === 'bot' && botSymbol && currentPlayer === botSymbol) return; 

        const newBoard = board.map(plane => plane.map(row => [...row]));
        newBoard[x][y][z] = currentPlayer;
        setBoard(newBoard);

        processTurn(newBoard, currentPlayer);
    }, [board, currentPlayer, gameActive, opponent, processTurn]);

    // BOT LOGIC
    useEffect(() => {
        const botSymbol = opponent === 'bot' ? (userSymbol ? (userSymbol === 'X' ? 'O' : 'X') : 'O') : null;
        if (opponent === 'bot' && botSymbol && currentPlayer === botSymbol && gameActive) {
            // Simple random delay to simulate thinking
            const timer = setTimeout(() => {
                const emptyCells = [];
                board.forEach((plane, x) => {
                    plane.forEach((row, y) => {
                        row.forEach((cell, z) => {
                            if (cell === null) emptyCells.push({x, y, z});
                        });
                    });
                });

                if (emptyCells.length > 0) {
                    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                    
                    const newBoard = board.map(plane => plane.map(row => [...row]));
                    newBoard[randomCell.x][randomCell.y][randomCell.z] = botSymbol;
                    setBoard(newBoard);
                    processTurn(newBoard, botSymbol);
                }
            }, 1000); // 1 second think time

            return () => clearTimeout(timer);
        }
    }, [currentPlayer, gameActive, opponent, board, processTurn]);

    return {
        board,
        currentPlayer,
        setCurrentPlayer,
        gameActive,
        scores,
        losingLine,
        winner,
        handleCellClick,
        resetGame,
        fullReset,
        setBoard
    };
}
