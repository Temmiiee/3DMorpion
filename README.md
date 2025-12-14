# 🌌 Retro-Futuristic 3D Morpion

A visually stunning, neon-soaked 3D Tic-Tac-Toe game built with **React Three Fiber**. Experience the classic strategy game in a completely new dimension with glowing aesthetics, smooth animations, and deep strategy modes.

![Project Preview](public/preview.png)

## ✨ Features

-   **Interactive 3D Board**: Rotate the cube freely to find the perfect angle.
-   **Neon Aesthetic**: High-end bloom effects, glassmorphism UI, and deep space atmosphere.
-   **Game Modes**:
    -   **Human vs Bot**: Test your skills against an AI opponent.
    -   **Local Multiplayer**: Two players on the same screen (Pass & Play).
-   **Rule Variants**:
    -   **Normal**: Align 3 to WIN.
    -   **Misère**: Align 3 to LOSE (The ultimate strategy challenge).
-   **Accessibility**: Full keyboard navigation and screen reader support (Invisible Accessible Grid).

## 🛠️ Tech Stack

-   **Core**: React 18, Vite
-   **3D Engine**: Three.js, @react-three/fiber
-   **Helpers**: @react-three/drei
-   **Post-Processing**: @react-three/postprocessing (Bloom effects)
-   **Styling**: Vanilla CSS (Performance focused)

## 🚀 Getting Started

### Prerequisites
-   Node.js (v16+)
-   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/3d-morpion.git
    cd 3d-morpion
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open `http://localhost:5173` in your browser.

## 🎮 How to Play

1.  **Select Opponent**: Choose "Solo (vs Bot)" or "2 Players".
2.  **Select Mode**:
    -   **Normal**: Get 3 symbols in a row (axis or diagonal) to win.
    -   **Misère**: Avoid getting 3 in a row!
3.  **Coin Flip**: Randomly decides who starts (and who gets the center advantage in mid-game).
4.  **Confirm Move**: Click a cube to select it, then click "VALIDER" to confirm.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
