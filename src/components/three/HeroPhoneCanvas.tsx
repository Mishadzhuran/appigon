"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
  HERO_SCREEN_H,
  HERO_SCREEN_W,
  HeroScreenId,
  paintHeroPhoneScreen,
} from "@/lib/heroPhoneScreens";

const KEEP_ORIGINAL = new Set([
  "zFdeDaGNRwzccye",
  "ujsvqBWRMnqdwPx",
  "hUlRcbieVuIiOXG",
  "jlzuBkUzuJqgiAK",
  "xNrofRCqOXXHVZt",
  "pIJKfZsazmcpEiU",
]);

const SCREEN_IDS: HeroScreenId[] = ["hello", "care", "ready"];

type GLTFResult = {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.MeshStandardMaterial>;
};

function PhoneMesh({ screenId }: { screenId: HeroScreenId }) {
  const group = useRef<THREE.Group>(null);
  const screenMat = useRef<THREE.MeshBasicMaterial>(null);
  const { nodes, materials } = useGLTF(
    "/models/scene.glb",
  ) as unknown as GLTFResult;

  const screenTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = HERO_SCREEN_W;
    c.height = HERO_SCREEN_H;
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.flipY = true;
    tex.anisotropy = 4;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    return tex;
  }, []);

  useEffect(() => {
    Object.entries(materials).forEach(([name, mat]) => {
      if (!mat) return;
      if (KEEP_ORIGINAL.has(name)) {
        mat.envMapIntensity = 1.35;
        mat.needsUpdate = true;
        return;
      }
      if (mat.map) mat.color.set("#121218");
      else mat.color.set("#08080c");
      if (!mat.metalnessMap) mat.metalness = Math.max(mat.metalness ?? 0.5, 0.78);
      if (!mat.roughnessMap) mat.roughness = Math.min(mat.roughness ?? 0.35, 0.34);
      mat.envMapIntensity = 1.45;
      mat.needsUpdate = true;
    });
  }, [materials]);

  useEffect(() => {
    if (!screenTexture || !screenMat.current) return;
    const mat = screenMat.current;
    const canvas = screenTexture.image as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Soft fade between screens
    let cancelled = false;
    const fadeOut = () =>
      new Promise<void>((resolve) => {
        const start = performance.now();
        const tick = (now: number) => {
          if (cancelled) return resolve();
          const t = Math.min(1, (now - start) / 220);
          mat.opacity = 1 - t;
          if (t < 1) requestAnimationFrame(tick);
          else resolve();
        };
        requestAnimationFrame(tick);
      });

    const fadeIn = () =>
      new Promise<void>((resolve) => {
        const start = performance.now();
        const tick = (now: number) => {
          if (cancelled) return resolve();
          const t = Math.min(1, (now - start) / 320);
          mat.opacity = t;
          if (t < 1) requestAnimationFrame(tick);
          else resolve();
        };
        requestAnimationFrame(tick);
      });

    (async () => {
      mat.transparent = true;
      await fadeOut();
      if (cancelled) return;
      paintHeroPhoneScreen(ctx, screenId);
      screenTexture.needsUpdate = true;
      mat.map = screenTexture;
      mat.needsUpdate = true;
      await fadeIn();
    })();

    return () => {
      cancelled = true;
    };
  }, [screenId, screenTexture]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.PI + 0.1 + Math.sin(t * 0.32) * 0.06;
    group.current.rotation.x = 0.04 + Math.sin(t * 0.24) * 0.012;
    group.current.rotation.z = -0.025;
  });

  const s = 0.036;
  const mesh = (geo: string, mat: string) => (
    <mesh geometry={nodes[geo].geometry} material={materials[mat]} scale={s} />
  );

  return (
    <Float speed={0.9} rotationIntensity={0.035} floatIntensity={0.22}>
      <group ref={group} dispose={null} position={[0, -0.02, 0]}>
        {mesh("ttmRoLdJipiIOmf", "hUlRcbieVuIiOXG")}
        {mesh("DjsDkGiopeiEJZK", "PaletteMaterial001")}
        {mesh("buRWvyqhBBgcJFo", "PaletteMaterial002")}
        {mesh("MrMmlCAsAxJpYqQ_0", "dxCVrUCvYhjVxqy")}
        {mesh("wqbHSzWaUxBCwxY_0", "MHFGNLrDQbTNima")}
        {mesh("QvGDcbDApaGssma", "kUhjpatHUvkBwfM")}
        {mesh("vFwJFNASGvEHWhs", "RJoymvEsaIItifI")}
        {mesh("evAxFwhaQUwXuua", "KSIxMqttXxxmOYl")}
        {mesh("USxQiqZgxHbRvqB", "mcPrzcBUcdqUybC")}
        {mesh("TvgBVmqNmSrFVfW", "pIhYLPqiSQOZTjn")}
        {mesh("GuYJryuYunhpphO", "eShKpuMNVJTRrgg")}
        {mesh("pvdHknDTGDzVpwc", "xdyiJLYTYRfJffH")}
        {mesh("CfghdUoyzvwzIum", "jpGaQNgTtEGkTfo")}
        {mesh("DjdhycfQYjKMDyn", "ujsvqBWRMnqdwPx")}
        {mesh("usFLmqcyrnltBUr", "sxNzrmuTqVeaXdg")}
        <mesh geometry={nodes.xXDHkMplTIDAXLN.geometry} scale={s}>
          <meshBasicMaterial ref={screenMat} toneMapped={false} />
        </mesh>
        {mesh("vELORlCJixqPHsZ", "zFdeDaGNRwzccye")}
        {mesh("EbQGKrWAqhBHiMv", "TBLSREBUyLMVtJa")}
        {mesh("EddVrWkqZTlvmci", "xNrofRCqOXXHVZt")}
        {mesh("KSWlaxBcnPDpFCs", "yQQySPTfbEJufve")}
        {mesh("TakBsdEjEytCAMK", "PaletteMaterial003")}
        {mesh("IykfmVvLplTsTEW", "PaletteMaterial004")}
        {mesh("wLfSXtbwRlBrwof", "oZRkkORNzkufnGD")}
        {mesh("WJwwVjsahIXbJpU", "yhcAXNGcJWCqtIS")}
        {mesh("YfrJNXgMvGOAfzz", "bCgzXjHOanGdTFV")}
        {mesh("DCLCbjzqejuvsqH", "vhaEJjZoqGtyLdo")}
        {mesh("CdalkzDVnwgdEhS", "jlzuBkUzuJqgiAK")}
        {mesh("NtjcIgolNGgYlCg", "PpwUTnTFZJXxCoE")}
        {mesh("pXBNoLiaMwsDHRF", "yiDkEwDSyEhavuP")}
        {mesh("IkoiNqATMVoZFKD", "hiVunnLeAHkwGEo")}
        {mesh("rqgRAGHOwnuBypi", "HGhEhpqSBZRnjHC")}
      </group>
    </Float>
  );
}

useGLTF.preload("/models/scene.glb");

export function HeroPhoneCanvas({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setI((n) => (n + 1) % SCREEN_IDS.length),
      4000,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className={`relative h-full w-full ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[62%] h-20 w-[50%] -translate-x-1/2 rounded-full bg-black/10 blur-3xl"
      />
      <Canvas
        camera={{ position: [0, 0.12, 1.95], fov: 30 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[3.2, 5, 2.2]} intensity={1.45} />
        <directionalLight
          position={[-2.8, 1.8, -1]}
          intensity={0.5}
          color="#dbe4ff"
        />
        <Suspense fallback={null}>
          <PhoneMesh screenId={SCREEN_IDS[i]} />
          <Environment preset="city" environmentIntensity={0.55} />
        </Suspense>
      </Canvas>

      <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-1.5">
        {SCREEN_IDS.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Show screen ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === i ? "w-5 bg-[#1d1d1f]" : "w-1.5 bg-black/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
