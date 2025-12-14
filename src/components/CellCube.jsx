import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";

export default function CellCube({ position, value, coords, onClick, isFocused, isSelected }) {
    const [hovered, setHovered] = useState(false);
    const meshRef = useRef();

    // Emissive interaction
    useFrame((state, delta) => {
        if (meshRef.current) {
            // Pulse effect when hovered or focused
            const targetEmissive = (hovered || isFocused || isSelected) ? 0.8 : 0;
            meshRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
                meshRef.current.material.emissiveIntensity,
                targetEmissive,
                delta * 10
            );
        }
    });

    const getColor = () => {
        if (value === "X") return "#ff0040"; // Neon Red
        if (value === "O") return "#00e5ff"; // Neon Cyan
        if (isSelected) return "#ffaa00"; // Orange for Selection
        if (hovered || isFocused) return "#ffffff";
        return "#111111"; // Dark glass base
    };

    const getEmissive = () => {
        if (value === "X") return "#ff0040";
        if (value === "O") return "#00e5ff";
        if (isSelected) return "#ffaa00";
        return "#444444";
    };

    return (
        <group position={position}>
            <mesh
                ref={meshRef}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                }}
                onPointerOut={() => setHovered(false)}
                onClick={(e) => {
                    e.stopPropagation();
                    if (!value) {
                        const [x, y, z] = coords;
                        onClick(x, y, z);
                    }
                }}
                castShadow
                receiveShadow
            >
                <boxGeometry args={[1, 1, 1]} />
                <meshPhysicalMaterial
                    color={value || isSelected ? getColor() : "#222222"}
                    emissive={getEmissive()}
                    emissiveIntensity={value ? 2 : (isSelected ? 1.5 : 0)}
                    roughness={0.1}
                    metalness={0.1}
                    transmission={value || isSelected ? 0.2 : 0.6}
                    thickness={1.5}
                    transparent
                    opacity={value || isSelected ? 0.9 : 0.5}
                />
                <Edges
                    scale={1}
                    threshold={15}
                    color={value === "X" ? "#ff0040" : value === "O" ? "#00e5ff" : isSelected ? "#ffaa00" : (hovered || isFocused) ? "#ffffff" : "#4444ff"}
                    opacity={0.5}
                    renderOrder={1000}
                />
            </mesh>

            {/* Inner light pulse for empty cells */}
            {!value && (hovered || isFocused || isSelected) && (
                <pointLight intensity={isSelected ? 2 : 1} distance={2} color={isSelected ? "#ffaa00" : "#ffffff"} />
            )}
        </group>
    );
}
