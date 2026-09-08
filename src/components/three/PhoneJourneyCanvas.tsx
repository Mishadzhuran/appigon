"use client";

/* eslint-disable react-hooks/immutability -- R3F/Three scene graph is mutated every frame */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { IPhoneModel } from "@/components/three/IPhoneModel";
import {
  JourneySnapshot,
  OUTRO_START,
  lerp,
} from "@/lib/journeyMotion";

function OutroGround({
  snapshotRef,
}: {
  snapshotRef: React.MutableRefObject<JourneySnapshot>;
}) {
  const group = useRef<THREE.Group>(null);
  const mats = useMemo(
    () => ({
      floor: new THREE.MeshBasicMaterial({
        color: "#070708",
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
      rim: new THREE.MeshBasicMaterial({
        color: "#ef1a12",
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    }),
    []
  );

  useFrame(() => {
    const outro = snapshotRef.current.outro;
    const show = Math.min(1, outro * 1.6);
    mats.floor.opacity = show;
    mats.rim.opacity = 0.28 * show;
    mats.floor.depthWrite = show > 0.05;
    if (group.current) group.current.visible = show > 0.02;
  });

  return (
    <group ref={group} visible={false}>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.7, 0]}
        material={mats.floor}
      >
        <circleGeometry args={[14, 32]} />
      </mesh>
      <mesh
        position={[0, -2.65, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={mats.rim}
      >
        <ringGeometry args={[2.8, 3.1, 48]} />
      </mesh>
    </group>
  );
}

function ScrollRig({
  snapshotRef,
}: {
  snapshotRef: React.MutableRefObject<JourneySnapshot>;
}) {
  const phone = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3(0.1, 0.15, 0));

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
      <OutroGround snapshotRef={snapshotRef} />
      <group ref={phone}>
        <IPhoneModel snapshotRef={snapshotRef} />
      </group>
    </>
  );
}

export function PhoneJourneyCanvas({
  snapshotRef,
  active = true,
}: {
  snapshotRef: React.MutableRefObject<JourneySnapshot>;
  active?: boolean;
}) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0.28, 11], fov: 30, near: 0.1, far: 60 }}
        dpr={[1, 1.25]}
        frameloop={active ? "always" : "never"}
        performance={{ min: 0.5, max: 1, debounce: 200 }}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#050508"]} />
          <fog attach="fog" args={["#050508", 16, 42]} />
          <ambientLight intensity={0.62} />
          <directionalLight position={[4, 6, 5]} intensity={1.45} color="#fff4f0" />
          <directionalLight
            position={[-3.2, 2, -2]}
            intensity={0.85}
            color="#ffc4be"
          />
          <pointLight position={[-1.5, 1.2, 2]} intensity={0.55} color="#ef1a12" />

          <ScrollRig snapshotRef={snapshotRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
