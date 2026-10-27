"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { motion, useMotionValue, useSpring } from "framer-motion";

const KEEP_ORIGINAL = new Set([
  "zFdeDaGNRwzccye",
  "ujsvqBWRMnqdwPx",
  "hUlRcbieVuIiOXG",
  "jlzuBkUzuJqgiAK",
  "xNrofRCqOXXHVZt",
  "pIJKfZsazmcpEiU",
]);

type GLTFResult = {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.MeshStandardMaterial>;
};

function PhoneMesh({ screenUrl }: { screenUrl: string }) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF("/models/scene.glb") as unknown as GLTFResult;
  const screenMap = useTexture(screenUrl);

  useMemo(() => {
    screenMap.colorSpace = THREE.SRGBColorSpace;
    screenMap.anisotropy = 4;
    screenMap.flipY = true;
    screenMap.needsUpdate = true;
  }, [screenMap]);

  useEffect(() => {
    Object.entries(materials).forEach(([name, mat]) => {
      if (!mat) return;
      if (KEEP_ORIGINAL.has(name)) {
        mat.envMapIntensity = 1.3;
        mat.needsUpdate = true;
        return;
      }
      if (mat.map) mat.color.set("#121218");
      else mat.color.set("#08080c");
      if (!mat.metalnessMap) mat.metalness = Math.max(mat.metalness ?? 0.5, 0.75);
      if (!mat.roughnessMap) mat.roughness = Math.min(mat.roughness ?? 0.35, 0.36);
      mat.envMapIntensity = 1.4;
      mat.needsUpdate = true;
    });
  }, [materials]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    // Calm Apple-style present: gentle yaw only
    group.current.rotation.y = Math.PI + 0.18 + Math.sin(t * 0.25) * 0.08;
    group.current.rotation.x = 0.06;
    group.current.rotation.z = -0.04;
  });

  const s = 0.032;
  const mesh = (geo: string, mat: string) => (
    <mesh geometry={nodes[geo].geometry} material={materials[mat]} scale={s} />
  );

  return (
    <Float speed={0.9} rotationIntensity={0.05} floatIntensity={0.35}>
      <group ref={group} dispose={null} position={[0, -0.35, 0]}>
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
          <meshBasicMaterial map={screenMap} toneMapped={false} />
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

export function PortfolioPhoneCanvas({
  screenUrl = "/work/lifemaxxing-home.png",
  className = "",
}: {
  screenUrl?: string;
  className?: string;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  return (
    <motion.div
      className={`relative h-full w-full ${className}`}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 28);
        my.set(((e.clientY - r.top) / r.height - 0.5) * 18);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[62%] h-28 w-[60%] -translate-x-1/2 rounded-full bg-black/10 blur-3xl"
      />
      <Canvas
        camera={{ position: [0, 0.1, 2.15], fov: 28 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3.5, 5, 2]} intensity={1.35} />
        <directionalLight position={[-3, 2, -1]} intensity={0.4} color="#dbe4ff" />
        <Suspense fallback={null}>
          <PhoneMesh screenUrl={screenUrl} />
          <Environment preset="studio" environmentIntensity={0.45} />
        </Suspense>
      </Canvas>
    </motion.div>
  );
}
