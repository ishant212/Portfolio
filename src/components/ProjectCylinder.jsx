import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function ProjectCylinder() {
  const cylinderRef = useRef();

  const texture = useTexture("/img.png");

  useFrame((_, delta) => {
    if (cylinderRef.current) {
      cylinderRef.current.rotation.y += delta * 0.65;
    }
  });

  return (
    <group
      rotation={[0, -0.1, 0.2]}
      position={[0, 0, 0]}
    >
      <mesh
        ref={cylinderRef}
        onClick={() =>
          document
            .getElementById("projects")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      >
        {/* Match original dimensions */}
        <cylinderGeometry
          args={[1.25, 1.25, 1.65, 30, 30, true]}
        />

        <meshStandardMaterial
          map={texture}
          transparent
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}