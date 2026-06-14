import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Html, useProgress } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function NeuralNetwork() {
  const groupRef = useRef();

  const nodes = useMemo(() => {
    return Array.from({ length: 18 }, () => [
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4,
    ]);
  }, []);

  const connections = useMemo(() => {
    const lines = [];

    nodes.forEach((a, i) => {
      nodes.forEach((b, j) => {
        if (i >= j) return;

        const dist = Math.sqrt(
          (a[0] - b[0]) ** 2 +
          (a[1] - b[1]) ** 2 +
          (a[2] - b[2]) ** 2
        );

        if (dist < 1.5) {
          lines.push([a, b]);
        }
      });
    });

    return lines;
  }, [nodes]);

  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y =
      state.clock.getElapsedTime() * 0.15;

    groupRef.current.rotation.x =
      Math.sin(state.clock.getElapsedTime() * 0.2) * 0.15;
  });

  return (
    <group ref={groupRef}>
      {connections.map((line, i) => (
        <Line
          key={i}
          points={line}
          color="#00f5ff"
          lineWidth={0.5}
          transparent
          opacity={0.3}
        />
      ))}

      {nodes.map((pos, i) => (
        <Node key={i} position={pos} />
      ))}
    </group>
  );
}

function Node({ position }) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (meshRef.current) {
      const scale =
        1 + Math.sin(t * 2 + position[0]) * 0.15;

      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.07, 16, 16]} />
      <meshBasicMaterial color="#00f5ff" />
    </mesh>
  );
}

function LoaderText() {
  const { progress } = useProgress();
  const messages = [
    "Initializing Neural Network",
    "Loading Projects",
    "Compiling Experience",
    "Preparing Portfolio",
  ];
  const current = messages[Math.floor((progress / 100) * messages.length)] || messages[messages.length - 1];

  return (
    <Html center>
      <div className="flex flex-col items-center text-center">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
          Ishant Shekhar Eeshu
        </h1>
        <p className="font-mono text-cyan-400 tracking-widest uppercase text-sm">
          {current}
        </p>
        <div className="w-64 h-2 bg-white/10 rounded-full mt-4 overflow-hidden">
          <div
            className="h-full bg-cyan-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white mt-3 font-mono">{Math.floor(progress)}%</p>
      </div>
    </Html>
  );
}

export default function PortfolioLoader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#050816]">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 5]} color="#7c3aed" intensity={1} />
        <NeuralNetwork />
        <LoaderText />
      </Canvas>
    </div>
  );
}