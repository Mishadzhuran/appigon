"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, RoundedBox } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function MiniPhone() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.45;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.12;
  });

  return (
    <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.7}>
      <group ref={group} scale={1.05}>
        <RoundedBox args={[1.25, 2.55, 0.14]} radius={0.14} smoothness={5}>
          <meshStandardMaterial color="#111114" metalness={0.88} roughness={0.22} />
        </RoundedBox>
        <mesh position={[0, 0, 0.08]}>
          <planeGeometry args={[1.08, 2.28]} />
          <meshStandardMaterial
            color="#140606"
            emissive="#ef1a12"
            emissiveIntensity={0.4}
            metalness={0.35}
            roughness={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
}

function Core({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={2} floatIntensity={1.2}>
      <mesh position={position} scale={0.42}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#ef1a12"
          emissive="#8a0400"
          emissiveIntensity={0.75}
          roughness={0.2}
          metalness={0.55}
          distort={0.32}
          speed={2.2}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 3]} intensity={1.3} />
      <pointLight position={[-2, -1, 2]} intensity={2} color="#ef1a12" />
      <MiniPhone />
      <Core position={[-2.1, 0.7, -1]} />
      <Core position={[2.0, -0.55, -0.7]} />
    </>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
