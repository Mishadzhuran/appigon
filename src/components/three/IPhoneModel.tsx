"use client";

/* eslint-disable react-hooks/immutability -- CanvasTexture.needsUpdate + Three materials */

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { JourneySnapshot } from "@/lib/journeyMotion";
import { paintPhoneScreen } from "@/lib/phoneScreens";

type GLTFResult = {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.MeshStandardMaterial>;
};

export function IPhoneModel({
  snapshotRef,
}: {
  snapshotRef: React.MutableRefObject<JourneySnapshot>;
}) {
  const { nodes, materials } = useGLTF("/models/scene.glb") as unknown as GLTFResult;
  const screenMat = useRef<THREE.MeshBasicMaterial>(null);
  const lastKey = useRef("");

  const screenTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 1170;
    c.height = 2532;
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.flipY = true;
    tex.anisotropy = 8;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    return tex;
  }, []);

  useEffect(() => {
    Object.entries(materials).forEach(([name, mat]) => {
      if (
        name !== "zFdeDaGNRwzccye" &&
        name !== "ujsvqBWRMnqdwPx" &&
        name !== "hUlRcbieVuIiOXG" &&
        name !== "jlzuBkUzuJqgiAK" &&
        name !== "xNrofRCqOXXHVZt" &&
        name !== "pIJKfZsazmcpEiU"
      ) {
        mat.color = new THREE.Color("#2a2a32");
        mat.metalness = 0.92;
        mat.roughness = 0.3;
        mat.needsUpdate = true;
      }
    });
  }, [materials]);

  useEffect(() => {
    if (!screenMat.current || !screenTexture) return;
    screenMat.current.map = screenTexture;
    screenMat.current.toneMapped = false;
    screenMat.current.needsUpdate = true;
  }, [screenTexture]);

  useFrame((state) => {
    if (!screenTexture) return;
    const ctx = (screenTexture.image as HTMLCanvasElement).getContext("2d");
    if (!ctx) return;
    const snap = snapshotRef.current;
    const t = state.clock.elapsedTime;

    // Repaint often for hologram flicker
    const key = [
      snap.holoIndex,
      snap.holo.toFixed(2),
      snap.power.toFixed(2),
      Math.floor(t * 20),
    ].join("|");

    if (key !== lastKey.current) {
      lastKey.current = key;
      paintPhoneScreen(ctx, {
        chapterIndex: snap.chapter,
        holoIndex: snap.holoIndex,
        morph: 1,
        title: snap.title,
        line: snap.line,
        body: snap.body,
        bullets: snap.bullets,
        detail: 0,
        holo: snap.holo,
        power: snap.power,
        time: t,
      });
      screenTexture.needsUpdate = true;
    }
  });

  const s = 0.01;

  return (
    <group dispose={null}>
      <mesh geometry={nodes.ttmRoLdJipiIOmf.geometry} material={materials.hUlRcbieVuIiOXG} scale={s} />
      <mesh geometry={nodes.DjsDkGiopeiEJZK.geometry} material={materials.PaletteMaterial001} scale={s} />
      <mesh geometry={nodes.buRWvyqhBBgcJFo.geometry} material={materials.PaletteMaterial002} scale={s} />
      <mesh geometry={nodes.MrMmlCAsAxJpYqQ_0.geometry} material={materials.dxCVrUCvYhjVxqy} scale={s} />
      <mesh geometry={nodes.wqbHSzWaUxBCwxY_0.geometry} material={materials.MHFGNLrDQbTNima} scale={s} />
      <mesh geometry={nodes.QvGDcbDApaGssma.geometry} material={materials.kUhjpatHUvkBwfM} scale={s} />
      <mesh geometry={nodes.vFwJFNASGvEHWhs.geometry} material={materials.RJoymvEsaIItifI} scale={s} />
      <mesh geometry={nodes.evAxFwhaQUwXuua.geometry} material={materials.KSIxMqttXxxmOYl} scale={s} />
      <mesh geometry={nodes.USxQiqZgxHbRvqB.geometry} material={materials.mcPrzcBUcdqUybC} scale={s} />
      <mesh geometry={nodes.TvgBVmqNmSrFVfW.geometry} material={materials.pIhYLPqiSQOZTjn} scale={s} />
      <mesh geometry={nodes.GuYJryuYunhpphO.geometry} material={materials.eShKpuMNVJTRrgg} scale={s} />
      <mesh geometry={nodes.pvdHknDTGDzVpwc.geometry} material={materials.xdyiJLYTYRfJffH} scale={s} />
      <mesh geometry={nodes.CfghdUoyzvwzIum.geometry} material={materials.jpGaQNgTtEGkTfo} scale={s} />
      <mesh geometry={nodes.DjdhycfQYjKMDyn.geometry} material={materials.ujsvqBWRMnqdwPx} scale={s} />
      <mesh geometry={nodes.usFLmqcyrnltBUr.geometry} material={materials.sxNzrmuTqVeaXdg} scale={s} />

      <mesh geometry={nodes.xXDHkMplTIDAXLN.geometry} scale={s}>
        <meshBasicMaterial
          ref={screenMat}
          map={screenTexture ?? undefined}
          toneMapped={false}
        />
      </mesh>

      <mesh geometry={nodes.vELORlCJixqPHsZ.geometry} material={materials.zFdeDaGNRwzccye} scale={s} />
      <mesh geometry={nodes.EbQGKrWAqhBHiMv.geometry} material={materials.TBLSREBUyLMVtJa} scale={s} />
      <mesh geometry={nodes.EddVrWkqZTlvmci.geometry} material={materials.xNrofRCqOXXHVZt} scale={s} />
      <mesh geometry={nodes.KSWlaxBcnPDpFCs.geometry} material={materials.yQQySPTfbEJufve} scale={s} />
      <mesh geometry={nodes.TakBsdEjEytCAMK.geometry} material={materials.PaletteMaterial003} scale={s} />
      <mesh geometry={nodes.IykfmVvLplTsTEW.geometry} material={materials.PaletteMaterial004} scale={s} />
      <mesh geometry={nodes.wLfSXtbwRlBrwof.geometry} material={materials.oZRkkORNzkufnGD} scale={s} />
      <mesh geometry={nodes.WJwwVjsahIXbJpU.geometry} material={materials.yhcAXNGcJWCqtIS} scale={s} />
      <mesh geometry={nodes.YfrJNXgMvGOAfzz.geometry} material={materials.bCgzXjHOanGdTFV} scale={s} />
      <mesh geometry={nodes.DCLCbjzqejuvsqH.geometry} material={materials.vhaEJjZoqGtyLdo} scale={s} />
      <mesh geometry={nodes.CdalkzDVnwgdEhS.geometry} material={materials.jlzuBkUzuJqgiAK} scale={s} />
      <mesh geometry={nodes.NtjcIgolNGgYlCg.geometry} material={materials.PpwUTnTFZJXxCoE} scale={s} />
      <mesh geometry={nodes.pXBNoLiaMwsDHRF.geometry} material={materials.yiDkEwDSyEhavuP} scale={s} />
      <mesh geometry={nodes.IkoiNqATMVoZFKD.geometry} material={materials.hiVunnLeAHkwGEo} scale={s} />
      <mesh geometry={nodes.rqgRAGHOwnuBypi.geometry} material={materials.HGhEhpqSBZRnjHC} scale={s} />
    </group>
  );
}

useGLTF.preload("/models/scene.glb");
