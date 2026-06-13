import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function SkillOrb({ position, label, color, index }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y =
      position[1] + Math.sin(t * 0.8 + index * 1.2) * 0.3;
    meshRef.current.rotation.y = t * 0.5;

    const scale = hovered ? 1.3 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
  });

  return (
    <group ref={meshRef} position={position}>
      <Sphere
        args={[0.35, 32, 32]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.7}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.1}
        />
      </Sphere>
      <Text
        position={[0, -0.6, 0]}
        fontSize={0.18}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

const SKILL_ORBS = [
  { label: 'Python', color: '#00f5ff', pos: [0, 0, 0] },
  { label: 'React', color: '#61dafb', pos: [2.5, 0.5, -1] },
  { label: 'TensorFlow', color: '#ff6d00', pos: [-2.5, -0.5, -1] },
  { label: 'FastAPI', color: '#009688', pos: [1.5, -1.5, 1] },
  { label: 'Spring Boot', color: '#6db33f', pos: [-1.5, 1.5, 1] },
  { label: 'Next.js', color: '#ffffff', pos: [2.8, -1, -2] },
  { label: 'PostgreSQL', color: '#336791', pos: [-2.8, 0.8, -0.5] },
  { label: 'Docker', color: '#2496ed', pos: [0.5, 2, -2] },
  { label: 'GCP', color: '#fbbc04', pos: [-0.5, -2, 0.5] },
  { label: 'XGBoost', color: '#7c3aed', pos: [1, 1.8, 2] },
  { label: 'YOLOv8', color: '#ef4444', pos: [-1, -1.8, 2] },
  { label: 'TypeScript', color: '#3178c6', pos: [3, 0, 1] },
];

export default function SkillOrbs() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} color="#00f5ff" intensity={2} />
      <pointLight position={[-5, -5, -5]} color="#7c3aed" intensity={1.5} />
      {SKILL_ORBS.map((orb, i) => (
        <SkillOrb
          key={orb.label}
          label={orb.label}
          color={orb.color}
          position={orb.pos}
          index={i}
        />
      ))}
    </>
  );
}
