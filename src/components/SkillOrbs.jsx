import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Pre-allocated at module level — reused every frame via .set(), never GC'd.
// Replaces `new THREE.Vector3(scale, scale, scale)` that was allocated
// 12 times per frame (once per orb) in the original code.
const _targetScale = new THREE.Vector3();

const SKILL_ORBS = [
  { label: 'Python',      color: '#00f5ff', pos: [0,    0,    0]    },
  { label: 'React',       color: '#61dafb', pos: [2.5,  0.5,  -1]   },
  { label: 'TensorFlow',  color: '#ff6d00', pos: [-2.5, -0.5, -1]   },
  { label: 'FastAPI',     color: '#009688', pos: [1.5,  -1.5,  1]   },
  { label: 'Spring Boot', color: '#6db33f', pos: [-1.5,  1.5,  1]   },
  { label: 'Next.js',     color: '#ffffff', pos: [2.8,  -1,   -2]   },
  { label: 'PostgreSQL',  color: '#336791', pos: [-2.8,  0.8, -0.5] },
  { label: 'Docker',      color: '#2496ed', pos: [0.5,   2,   -2]   },
  { label: 'GCP',         color: '#fbbc04', pos: [-0.5, -2,    0.5] },
  { label: 'XGBoost',     color: '#7c3aed', pos: [1,    1.8,   2]   },
  { label: 'YOLOv8',      color: '#ef4444', pos: [-1,  -1.8,   2]   },
  { label: 'TypeScript',  color: '#3178c6', pos: [3,    0,     1]   },
];

// SkillOrb no longer owns a useFrame subscription.
// Animation is driven entirely by the single loop in the parent SkillOrbs.
//
// groupRef — a callback ref from the parent: (el) => (orbRefs.current[i] = el)
//   Populates the parent's plain array with the raw THREE.Group.
//
// selfRef — a local ref used only for the pointer handlers so they can
//   write userData.hovered without going through the parent.
//
// useState(hovered) — drives emissiveIntensity only on pointer events,
//   not per-frame, so it is not a performance concern.
function SkillOrb({ color, label, position, groupRef }) {
  const [hovered, setHovered] = useState(false);
  // Local ref gives the pointer handlers direct access to the group element
  // without needing groupRef to be a ref-object.
  const selfRef = useRef(null);

  return (
    <group
      ref={(el) => {
        selfRef.current = el;  // local access for pointer handlers
        groupRef(el);          // populate orbRefs.current[i] in parent
      }}
      position={position}
    >
      <Sphere
        args={[0.35, 32, 32]}
        onPointerOver={() => {
          setHovered(true);
          if (selfRef.current) selfRef.current.userData.hovered = true;
        }}
        onPointerOut={() => {
          setHovered(false);
          if (selfRef.current) selfRef.current.userData.hovered = false;
        }}
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

export default function SkillOrbs() {
  // Plain array — orbRefs.current[i] is the raw THREE.Group, not a wrapper.
  // Each SkillOrb populates it via its callback ref: (el) => (orbRefs.current[i] = el).
  const orbRefs = useRef([]);

  // ONE useFrame drives all 12 orbs.
  // orbRefs.current[i] is now the direct THREE.Group — no .current dereference.
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    for (let i = 0; i < SKILL_ORBS.length; i++) {
      const group = orbRefs.current[i];
      if (!group) continue;
      const orb = SKILL_ORBS[i];

      // Y-axis bobbing — same formula as before.
      group.position.y = orb.pos[1] + Math.sin(t * 0.8 + i * 1.2) * 0.3;
      // Spin — same as before.
      group.rotation.y = t * 0.5;

      // Scale lerp toward hover target.
      // _targetScale.set() mutates in place — no allocation.
      const s = group.userData.hovered ? 1.3 : 1;
      _targetScale.set(s, s, s);
      group.scale.lerp(_targetScale, 0.1);
    }
  });

  return (
    <>
      {/* Lights are retained: meshStandardMaterial IS a lit material,
          unlike PointsMaterial. These lights correctly affect the spheres. */}
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} color="#00f5ff" intensity={2} />
      <pointLight position={[-5, -5, -5]} color="#7c3aed" intensity={1.5} />
      {SKILL_ORBS.map((orb, i) => (
        <SkillOrb
          key={orb.label}
          label={orb.label}
          color={orb.color}
          position={orb.pos}
          groupRef={(el) => (orbRefs.current[i] = el)}
        />
      ))}
    </>
  );
}
