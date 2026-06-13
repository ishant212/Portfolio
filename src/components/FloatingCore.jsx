  import { useRef } from 'react';
  import { useFrame } from '@react-three/fiber';
  import { MeshDistortMaterial, Sphere, Torus, Icosahedron } from '@react-three/drei';
  import * as THREE from 'three';

  function FloatingCore() {
    const meshRef = useRef();
    const torusRef = useRef();
    const torusRef2 = useRef();

    useFrame((state) => {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.3;
      meshRef.current.rotation.y = t * 0.5;
      meshRef.current.position.y = Math.sin(t * 0.8) * 0.3;

      torusRef.current.rotation.x = t * 0.3;
      torusRef.current.rotation.y = t * 0.2;
      torusRef2.current.rotation.x = -t * 0.2;
      torusRef2.current.rotation.z = t * 0.35;
    });

    return (
      <group>
        {/* Core sphere */}
        <Sphere ref={meshRef} args={[1.2, 64, 64]}>
          <MeshDistortMaterial
            color="#050810"
            roughness={0.1}
            metalness={0.9}
            distort={0.4}
            speed={2}
            envMapIntensity={2}
          />
        </Sphere>

        {/* Outer wireframe icosahedron */}
        <Icosahedron args={[1.6, 1]}>
          <meshBasicMaterial color="#00f5ff" wireframe transparent opacity={0.15} />
        </Icosahedron>

        {/* Orbit rings */}
        <Torus ref={torusRef} args={[2.2, 0.02, 16, 100]}>
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.6} />
        </Torus>
        <Torus ref={torusRef2} args={[1.8, 0.015, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
          <meshBasicMaterial color="#7c3aed" transparent opacity={0.5} />
        </Torus>

        {/* Glow sphere */}
        <Sphere args={[1.25, 32, 32]}>
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.05} />
        </Sphere>
      </group>
    );
  }

  export default FloatingCore;
