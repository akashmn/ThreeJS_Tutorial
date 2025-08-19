import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { Mesh } from "three";

const RotatingCube = () => {
    const meshRef = useRef(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="blue" />
        </mesh>
    );
};

function App() {
    return (
        <Canvas
            style={{
                height: "100vh",
                width: "100vw",
                backgroundColor: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {/* Controls for camera movement */}
            <OrbitControls enableZoom enablePan enableRotate />

            {/* Directional light to illuminate the scene */}
            <directionalLight position={[10, 10, 5]} intensity={1} />

            {/* Set background color to black */}
            <color attach="background" args={["#000000"]} />

            {/* Ambient light for soft illumination */}
            <ambientLight intensity={0.5} />

            {/* Custom component for the rotating cube */}
            <RotatingCube />
        </Canvas>
    );
}

export default App;
