import React from "react";

export default function AccessibleGrid({ board, onCellClick, onFocusCell }) {
    // SR-only style allows keyboard navigation without blocking mouse clicks on the canvas
    return (
        <div
            style={{
                position: "absolute",
                width: "1px",
                height: "1px",
                padding: 0,
                margin: "-1px",
                overflow: "hidden",
                clip: "rect(0, 0, 0, 0)",
                whiteSpace: "nowrap",
                borderWidth: 0,
                // Ensure it doesn't interfere with layout but remains in DOM
            }}
            role="grid"
            aria-label="Grille de jeu 3D (3 par 3 par 3)"
        >
            {board.map((plane, x) => (
                <div key={`plane-${x}`} role="rowgroup" aria-label={`Étage ${x + 1}`}>
                    {plane.map((row, y) => (
                        <div key={`row-${x}-${y}`} role="row">
                            {row.map((cell, z) => (
                                <button
                                    key={`${x}-${y}-${z}`}
                                    aria-label={`Case ${x + 1}, ${y + 1}, ${z + 1} : ${cell || "Vide"}`}
                                    onClick={() => onCellClick(x, y, z)}
                                    // Focus handling to sync with 3D scene
                                    onFocus={() => onFocusCell([x, y, z])}
                                    onBlur={() => onFocusCell(null)}
                                    style={{
                                        width: "1px",
                                        height: "1px",
                                        padding: 0,
                                        border: "none",
                                        background: "transparent"
                                    }}
                                >
                                    {cell || "Vide"}
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
