import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import GameCube from "./GameCube";
import AccessibleGrid from "./AccessibleGrid";

export default function CubeScene({
    board,
    onCellClick,
    rotation,
    setRotation,
}) {
    const [focusedCell, setFocusedCell] = useState(null);
    const [selectedCube, setSelectedCube] = useState(null); // [x, y, z]

    // Handle click on a cell
    const handleCellInteract = (x, y, z) => {
        // If already selected, confirm move
        if (selectedCube && selectedCube[0] === x && selectedCube[1] === y && selectedCube[2] === z) {
            onCellClick(x, y, z);
            setSelectedCube(null);
        } else {
            // Select the cube
            setSelectedCube([x, y, z]);
        }
    };

    const confirmSelection = () => {
        if (selectedCube) {
            onCellClick(selectedCube[0], selectedCube[1], selectedCube[2]);
            setSelectedCube(null);
        }
    };

    const cancelSelection = () => {
        setSelectedCube(null);
    };

    return (
        <div style={{
            width: "100%",
            height: "min(600px, 75vh)",
            minHeight: "400px",
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>

            {/* HTML Overlay for Accessibility */}
            <AccessibleGrid board={board} onCellClick={handleCellInteract} onFocusCell={setFocusedCell} />

            <Canvas
                camera={{ position: [6, 6, 6], fov: 50 }}
                gl={{ antialias: false, alpha: true }}
                dpr={[1, 1.5]}
                style={{ flex: 1 }}
            >
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00e5ff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0040" />

                <GameCube
                    board={board}
                    onCellClick={handleCellInteract}
                    rotation={rotation}
                    setRotation={setRotation}
                    focusedCell={focusedCell}
                    selectedCell={selectedCube}
                />

                <EffectComposer disableNormalPass>
                    <Bloom
                        luminanceThreshold={0.5}
                        mipmapBlur
                        intensity={1.5}
                        radius={0.6}
                    />
                </EffectComposer>

                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    rotateSpeed={0.6}
                    minDistance={3}
                    maxDistance={15}
                />
            </Canvas>

            {/* Validation Buttons Overlay */}
            {selectedCube && (
                <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '15px',
                    zIndex: 10
                }}>
                    <button
                        onClick={confirmSelection}
                        style={{
                            background: '#00e5ff',
                            color: '#000',
                            fontWeight: 'bold',
                            boxShadow: '0 0 15px rgba(0, 229, 255, 0.5)',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        ✓ VALIDER
                    </button>
                    <button
                        onClick={cancelSelection}
                        style={{
                            background: 'rgba(0,0,0,0.8)',
                            color: '#fff',
                            border: '1px solid #666',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        ANNULER
                    </button>
                </div>
            )}
        </div>
    );
}
