"use client";

/* eslint-disable react-hooks/immutability -- R3F/Three scene graph is mutated every frame */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { IPhoneModel } from "@/components/three/IPhoneModel";
import {
  JourneySnapshot,
  OUTRO_START,
  lerp,
} from "@/lib/journeyMotion";

function SceneDressing() {
  const mats = useMemo(
    () => ({
      floor: new THREE.MeshStandardMaterial({
        color: "#0c0c10",
        metalness: 0.55,
        roughness: 0.4,
      }),
      rim: new THREE.MeshBasicMaterial({
        color: "#ef1a12",
        transparent: true,
        opacity: 0.22,
        side: THREE.DoubleSide,
      }),
    }),
    []
  );

  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.7, 0]}
        material={mats.floor}
        receiveShadow
      >
        <circleGeometry args={[22, 64]} />
      </mesh>
      <mesh
        position={[0, -2.65, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={mats.rim}
      >
        <ringGeometry args={[2.8, 3.15, 64]} />
      </mesh>
    </group>
  );
}

/**
 * Apply scroll pose nearly 1:1 — smoothness comes from the continuous
 * progress curve + GSAP scrub, not stacked damping that causes lag/jump.
 */
function ScrollRig({
  snapshotRef,
}: {
  snapshotRef: React.MutableRefObject<JourneySnapshot>;
}) {
  const phone = useRef<THREE.Group>(null);
  const rim = useRef<THREE.DirectionalLight>(null);
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3(0.1, 0.15, 0));

  // Very light tracking so micro scroll jitter doesn't hard-snap
  const sx = useRef(0.1);
  const sy = useRef(0.22);
  const sz = useRef(0.05);
  const ry = useRef(Math.PI + 0.06);
  const rx = useRef(0.04);
  const rz = useRef(-0.1);
  const sc = useRef(18);
  const camZ = useRef(11);

  useFrame((_, dt) => {
    const snap = snapshotRef.current;
    const pose = snap.pose;
    const inOutro = snap.progress >= OUTRO_START;

    // Fast track of an already-smooth curve (no heavy lag)
    const a = 1 - Math.exp(-dt * 12);

    sx.current = lerp(sx.current, pose.x, a);
    sy.current = lerp(sy.current, pose.y, a);
    sz.current = lerp(sz.current, pose.z, a);
    ry.current = lerp(ry.current, pose.yaw, a);
    rx.current = lerp(rx.current, pose.pitch, a);
    rz.current = lerp(rz.current, pose.roll, a);
    sc.current = lerp(sc.current, pose.scale, a);
    camZ.current = lerp(camZ.current, pose.camZ, a);

    if (phone.current) {
      phone.current.scale.setScalar(sc.current);
      phone.current.position.set(sx.current, sy.current, sz.current);
      phone.current.rotation.set(rx.current, ry.current, rz.current);

      if (rim.current) {
        rim.current.intensity = inOutro
          ? lerp(1.2, 0.35, snap.outro)
          : 1.3;
      }
    }

    camera.position.x = lerp(camera.position.x, -sx.current * 0.1, a);
    camera.position.y = lerp(
      camera.position.y,
      inOutro ? lerp(0.32, 0.85, snap.outro) : 0.28,
      a
    );
    camera.position.z = camZ.current;
    look.current.set(
      sx.current * 0.3,
      inOutro ? -0.35 * snap.outro : 0.16,
      0
    );
    camera.lookAt(look.current);
  });

  return (
    <>
      <directionalLight
        ref={rim}
        position={[-3.5, 2, -2.5]}
        intensity={1.3}
        color="#ffc4be"
      />
      <SceneDressing />
      <group ref={phone}>
        <IPhoneModel snapshotRef={snapshotRef} />
      </group>
    </>
  );
}

export function PhoneJourneyCanvas({
  snapshotRef,
}: {
  snapshotRef: React.MutableRefObject<JourneySnapshot>;
}) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0.28, 11], fov: 30, near: 0.1, far: 120 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#070708"]} />
          <fog attach="fog" args={["#070708", 14, 38]} />
          <ambientLight intensity={0.55} />
          <directionalLight position={[4, 7, 5]} intensity={1.7} />
          <spotLight
            position={[2, 5, 6]}
            angle={0.4}
            penumbra={0.9}
            intensity={2}
            color="#fff5f2"
          />
          <pointLight position={[-2, 1.5, 2]} intensity={1.1} color="#ef1a12" />

          <ScrollRig snapshotRef={snapshotRef} />

          <ContactShadows
            position={[0, -2.68, 0]}
            opacity={0.4}
            scale={24}
            blur={2.8}
            far={8}
          />
          <Environment preset="city" environmentIntensity={0.35} />
        </Suspense>
      </Canvas>
    </div>
  );
}
