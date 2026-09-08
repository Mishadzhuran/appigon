"use client";

import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Text } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useScroll3DProgress } from "@/components/three/ScrollProgressContext";
import { scrollChapters } from "@/data/site";

const CHAPTER_COLORS = [
  "#ef1a12",
  "#ff4d3d",
  "#ff6a00",
  "#ff2d55",
  "#ff1f14",
  "#e10600",
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function OrbitRing({
  radius,
  speed,
  tilt,
  color,
}: {
  radius: number;
  speed: number;
  tilt: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.z += dt * speed;
  });
  return (
    <mesh ref={ref} rotation={[tilt, 0.2, 0]}>
      <torusGeometry args={[radius, 0.012, 12, 120]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  );
}

function FloatingBadge({
  position,
  label,
  phase,
  progressRef,
}: {
  position: [number, number, number];
  label: string;
  phase: number;
  progressRef: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const textMat = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const visible = clamp01((progressRef.current - phase) / 0.12);
    ref.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 1.4 + phase * 10) * 0.08;
    ref.current.rotation.y = state.clock.elapsedTime * 0.35;
    ref.current.scale.setScalar(0.7 + visible * 0.4);
    if (mat.current) {
      mat.current.opacity = 0.2 + visible * 0.8;
      mat.current.emissiveIntensity = 0.12 * visible;
    }
    ref.current.visible = visible > 0.05;
  });

  return (
    <group ref={ref} position={position}>
      <RoundedBox args={[1.15, 0.4, 0.08]} radius={0.08} smoothness={4}>
        <meshStandardMaterial
          ref={mat}
          color="#141418"
          metalness={0.65}
          roughness={0.28}
          emissive="#ef1a12"
          emissiveIntensity={0.1}
          transparent
          opacity={0.2}
        />
      </RoundedBox>
      <Text
        position={[0, 0, 0.05]}
        fontSize={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      {/* silence unused */}
      <mesh visible={false}>
        <boxGeometry args={[0.01, 0.01, 0.01]} />
        <meshBasicMaterial ref={textMat} />
      </mesh>
    </group>
  );
}

export function ProductPhone() {
  const progressMv = useScroll3DProgress();
  const group = useRef<THREE.Group>(null);
  const glow = useRef<THREE.PointLight>(null);
  const screenMat = useRef<THREE.MeshStandardMaterial>(null);
  const progressRef = useRef(0);
  const [chapterIndex, setChapterIndex] = useState(0);

  const particles = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let i = 0; i < 56; i++) {
      const a = (i / 56) * Math.PI * 2;
      const r = 2.25 + (i % 5) * 0.14;
      arr.push([
        Math.cos(a) * r,
        ((i % 9) - 4) * 0.16,
        Math.sin(a) * r * 0.55,
      ]);
    }
    return arr;
  }, []);

  useFrame((state, dt) => {
    const target = progressMv.get();
    progressRef.current = lerp(progressRef.current, target, 1 - Math.pow(0.0008, dt));
    const p = progressRef.current;

    const nextChapter = Math.min(
      scrollChapters.length - 1,
      Math.floor(p * 0.999 * scrollChapters.length)
    );
    if (nextChapter !== chapterIndex) setChapterIndex(nextChapter);

    if (!group.current) return;

    group.current.rotation.y =
      p * Math.PI * 2.2 + Math.sin(p * Math.PI) * 0.2;
    group.current.rotation.x =
      lerp(0.2, -0.32, p) + Math.sin(state.clock.elapsedTime * 0.55) * 0.025;
    group.current.rotation.z = Math.sin(p * Math.PI * 2) * 0.1;

    group.current.position.x = Math.sin(p * Math.PI * 2) * 0.6;
    group.current.position.y = Math.cos(p * Math.PI) * 0.22;
    group.current.position.z = lerp(0.1, -0.35, Math.sin(p * Math.PI));

    const scale = lerp(1.02, 1.18, Math.sin(p * Math.PI));
    group.current.scale.setScalar(scale);

    const color = CHAPTER_COLORS[nextChapter];
    if (glow.current) {
      glow.current.color.set(color);
      glow.current.intensity = 2.1 + Math.sin(state.clock.elapsedTime * 2) * 0.35;
    }
    if (screenMat.current) {
      screenMat.current.emissive.set(color);
      screenMat.current.emissiveIntensity = 0.2 + Math.sin(p * Math.PI * 4) * 0.05;
    }
  });

  const chapter = scrollChapters[chapterIndex];
  const accent = CHAPTER_COLORS[chapterIndex];

  return (
    <>
      <ambientLight intensity={0.32} />
      <directionalLight position={[4, 5, 3]} intensity={1.3} color="#ffffff" />
      <pointLight ref={glow} position={[0, 0.4, 2.6]} intensity={2.3} color="#ef1a12" />
      <pointLight position={[-3, -1, -2]} intensity={0.75} color="#4a1010" />

      <OrbitRing radius={2.35} speed={0.28} tilt={Math.PI / 2.55} color="#ef1a12" />
      <OrbitRing radius={2.8} speed={-0.16} tilt={Math.PI / 3.1} color="#ff4d3d" />
      <OrbitRing radius={3.25} speed={0.11} tilt={Math.PI / 2.15} color="#ffffff" />

      {particles.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? "#ef1a12" : "#ffffff"}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}

      <Float speed={1.15} rotationIntensity={0.12} floatIntensity={0.3}>
        <group ref={group}>
          <RoundedBox args={[1.42, 2.88, 0.17]} radius={0.17} smoothness={6}>
            <meshStandardMaterial color="#101014" metalness={0.92} roughness={0.2} />
          </RoundedBox>

          <mesh position={[0.73, 0.38, 0]}>
            <boxGeometry args={[0.03, 0.3, 0.06]} />
            <meshStandardMaterial color="#2c2c32" metalness={0.85} roughness={0.28} />
          </mesh>

          <mesh position={[0, 1.14, 0.09]}>
            <RoundedBox args={[0.44, 0.1, 0.02]} radius={0.04} smoothness={4}>
              <meshStandardMaterial color="#050506" />
            </RoundedBox>
          </mesh>

          {/* Screen */}
          <group position={[0, 0, 0.095]}>
            <mesh>
              <planeGeometry args={[1.2, 2.46]} />
              <meshStandardMaterial
                ref={screenMat}
                color="#090406"
                emissive={accent}
                emissiveIntensity={0.22}
                roughness={0.32}
                metalness={0.15}
              />
            </mesh>

            <Text
              position={[0, 0.62, 0.02]}
              fontSize={0.12}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {chapter.index}
            </Text>
            <Text
              position={[0, 0.32, 0.02]}
              fontSize={0.125}
              color={accent}
              anchorX="center"
              anchorY="middle"
              maxWidth={1.05}
              textAlign="center"
            >
              {chapter.title}
            </Text>
            <Text
              position={[0, -0.05, 0.02]}
              fontSize={0.068}
              color="#d8d8e0"
              anchorX="center"
              anchorY="middle"
              maxWidth={0.98}
              textAlign="center"
              lineHeight={1.4}
            >
              {chapter.line}
            </Text>

            {[-0.7, -0.96, -1.22].map((y, i) => (
              <mesh key={y} position={[0, y, 0.015]}>
                <planeGeometry args={[0.96, 0.17]} />
                <meshStandardMaterial
                  color="#180a0a"
                  emissive={accent}
                  emissiveIntensity={0.06 + i * 0.03}
                  roughness={0.45}
                />
              </mesh>
            ))}
          </group>
        </group>
      </Float>

      <FloatingBadge
        position={[-2.35, 0.95, 0]}
        label="App Store"
        phase={0.3}
        progressRef={progressRef}
      />
      <FloatingBadge
        position={[2.4, -0.15, 0.15]}
        label="Google Play"
        phase={0.44}
        progressRef={progressRef}
      />
      <FloatingBadge
        position={[-2.15, -1.05, 0.1]}
        label="Live Release"
        phase={0.64}
        progressRef={progressRef}
      />
    </>
  );
}
