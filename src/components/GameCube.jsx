import CellCube from "./CellCube";

export default function GameCube({ board, onCellClick, focusedCell, selectedCell }) {
    const spacing = 1.2;

    const isCellFocused = (x, y, z) => {
        return focusedCell && focusedCell[0] === x && focusedCell[1] === y && focusedCell[2] === z;
    };

    const isCellSelected = (x, y, z) => {
        return selectedCell && selectedCell[0] === x && selectedCell[1] === y && selectedCell[2] === z;
    };

    return (
        <group>
            {board.map((plane, x) =>
                plane.map((row, y) =>
                    row.map((cell, z) => (
                        <CellCube
                            key={`${x}-${y}-${z}`}
                            position={[
                                (x - 1) * spacing,
                                (1 - y) * spacing,
                                (z - 1) * spacing,
                            ]}
                            value={cell}
                            coords={[x, y, z]}
                            onClick={onCellClick}
                            isFocused={isCellFocused(x, y, z)}
                            isSelected={isCellSelected(x, y, z)}
                        />
                    ))
                )
            )}
        </group>
    );
}
