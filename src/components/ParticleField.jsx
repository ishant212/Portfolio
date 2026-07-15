import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Hard cap on particle count.
// Reduces vertex buffer size (positions + colors + sizes) uploaded to the GPU
// and shrinks the per-draw vertex count. The caller may still pass any value;
// this component enforces the ceiling.
const MAX_PARTICLES = 800;

export default function ParticleField({ count = 2000 }) {
  const mesh = useRef();

  // Clamp caller-supplied count to the performance ceiling.
  const actualCount = Math.min(count, MAX_PARTICLES);

  const particles = useMemo(() => {
    const positions = new Float32Array(actualCount * 3);
    const colors    = new Float32Array(actualCount * 3);
    const sizes     = new Float32Array(actualCount);

    const color1 = new THREE.Color('#00f5ff');
    const color2 = new THREE.Color('#7c3aed');
    const color3 = new THREE.Color('#ffffff');

    for (let i = 0; i < actualCount; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const r = Math.random();
      const c = r < 0.3 ? color1 : r < 0.6 ? color2 : color3;
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = Math.random() * 2 + 0.5;
    }
    return { positions, colors, sizes };
  }, [actualCount]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Halved from 0.04 / 0.06 — visual preference; does not reduce
    // the per-frame matrix recalculation cost (that happens regardless of speed).
    mesh.current.rotation.x = t * 0.02;
    mesh.current.rotation.y = t * 0.03;
    // Light position updates removed — see note below.
  });

  // NOTE: ambientLight and pointLight are both removed.
  //
  // PointsMaterial is an UNLIT material. Three.js's lighting system
  // (ambient, point, directional, spot) has zero effect on <points> using
  // PointsMaterial — the renderer skips the lighting shader path entirely.
  //
  // The old pointLight was also animating its position every frame:
  //   position.x = Math.sin(t * 0.3) * 20
  //   position.y = Math.cos(t * 0.2) * 20
  //
  // Two Math.sin/cos calls + two property writes + Three.js scene light
  // traversal per frame — for no visual output. Both lights are removed.
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particles.sizes.length}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
