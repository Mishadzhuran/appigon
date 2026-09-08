"use client";

/* eslint-disable react-hooks/immutability -- R3F/Three scene graph is mutated every frame */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import {
  IPhoneModel,
  preloadPhoneModel,
} from "@/components/three/IPhoneModel";
import {
  JourneySnapshot,
  OUTRO_START,
  lerp,
} from "@/lib/journeyMotion";

const SPACE = "#050508";

/** In-memory studio env — reflections without downloading HDR */
function SoftEnvironment() {
  const { gl, scene } = useThree();

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    pmrem.compileEquirectangularShader();
    const envScene = new RoomEnvironment();
    const rt = pmrem.fromScene(envScene, 0.04);
    scene.environment = rt.texture;
    scene.environmentIntensity = 0.95;

    return () => {
      scene.environment = null;
      rt.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);

  return null;
}

function makeRadialTexture(
  size: number,
  stops: [number, string][]
): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d");
  if (!ctx) return null;
  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  for (const [t, color] of stops) g.addColorStop(t, color);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function SoftContactShadow() {
  const tex = useMemo(
    () =>
      makeRadialTexture(256, [
        [0, "rgba(0,0,0,0.85)"],
        [0.35, "rgba(0,0,0,0.4)"],
        [0.7, "rgba(0,0,0,0.12)"],
        [1, "rgba(0,0,0,0)"],
      ]),
    []
  );

  if (!tex) return null;

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2.672, 0]}
      renderOrder={-1}
    >
      <planeGeometry args={[8, 8]} />
      <meshBasicMaterial
        map={tex}
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </mesh>
  );
}

/** Premium dark pedestal — layered rings, soft red wash, real depth */
function OutroGround({
  snapshotRef,
}: {
  snapshotRef: React.MutableRefObject<JourneySnapshot>;
}) {
  const group = useRef<THREE.Group>(null);
  const bead = useRef<THREE.Mesh>(null);

  const discTex = useMemo(
    () =>
      makeRadialTexture(512, [
        [0, "rgba(8,8,12,1)"],
        [0.28, "rgba(6,6,9,1)"],
        [0.55, "rgba(4,4,6,1)"],
        [0.78, "rgba(239,26,18,0.07)"],
        [0.9, "rgba(3,3,5,1)"],
        [1, "rgba(2,2,3,0)"],
      ]),
    []
  );

  const glowTex = useMemo(
    () =>
      makeRadialTexture(256, [
        [0, "rgba(239,26,18,0)"],
        [0.55, "rgba(239,26,18,0.05)"],
        [0.78, "rgba(239,26,18,0.35)"],
        [0.9, "rgba(255,60,45,0.18)"],
        [1, "rgba(239,26,18,0)"],
      ]),
    []
  );

  const mats = useMemo(() => {
    const mk = (
      color: string,
      opts: Partial<THREE.MeshBasicMaterialParameters> = {}
    ) =>
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        side: THREE.DoubleSide,
        ...opts,
      });

    return {
      abyss: mk("#030305"),
      disc: new THREE.MeshBasicMaterial({
        map: discTex ?? undefined,
        color: discTex ? "#ffffff" : "#050508",
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
      wash: new THREE.MeshBasicMaterial({
        map: glowTex ?? undefined,
        color: "#ffffff",
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
      rimCore: mk("#ef1a12"),
      rimInner: mk("#ff4a3a"),
      rimOuter: mk("#ef1a12"),
      rimBloom: mk("#ff2a1a", { blending: THREE.AdditiveBlending }),
      torus: new THREE.MeshStandardMaterial({
        color: "#ef1a12",
        emissive: "#ef1a12",
        emissiveIntensity: 0,
        metalness: 0.35,
        roughness: 0.35,
        transparent: true,
        opacity: 0,
      }),
      bead: new THREE.MeshStandardMaterial({
        color: "#ff3b30",
        emissive: "#ef1a12",
        emissiveIntensity: 0,
        metalness: 0.2,
        roughness: 0.25,
        transparent: true,
        opacity: 0,
      }),
    };
  }, [discTex, glowTex]);

  useFrame((state) => {
    const outro = snapshotRef.current.outro;
    const show = Math.min(1, outro * 1.55);
    const pulse = 0.92 + Math.sin(state.clock.elapsedTime * 1.6) * 0.08;

    mats.abyss.opacity = show * 0.95;
    mats.disc.opacity = show;
    mats.wash.opacity = show * 0.7 * pulse;
    mats.rimCore.opacity = show * 0.95;
    mats.rimInner.opacity = show * 0.45;
    mats.rimOuter.opacity = show * 0.55;
    mats.rimBloom.opacity = show * 0.28 * pulse;
    mats.torus.opacity = show * 0.9;
    mats.torus.emissiveIntensity = show * 1.8 * pulse;
    mats.bead.opacity = show;
    mats.bead.emissiveIntensity = show * 2.4;
    mats.abyss.depthWrite = show > 0.05;
    mats.disc.depthWrite = show > 0.05;

    if (group.current) group.current.visible = show > 0.02;

    if (bead.current) {
      const a = state.clock.elapsedTime * 0.55;
      const r = 2.85;
      bead.current.position.set(Math.cos(a) * r, -2.58, Math.sin(a) * r);
      bead.current.visible = show > 0.15;
    }
  });

  const y = -2.7;

  return (
    <group ref={group} visible={false}>
      {/* Far black ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]} material={mats.abyss}>
        <circleGeometry args={[16, 64]} />
      </mesh>

      {/* Soft additive red wash under the stage */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, y + 0.012, 0]}
        material={mats.wash}
      >
        <circleGeometry args={[4.2, 96]} />
      </mesh>

      {/* Main pedestal disc with vignette + red edge cue */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, y + 0.018, 0]}
        material={mats.disc}
      >
        <circleGeometry args={[3.35, 128]} />
      </mesh>

      <SoftContactShadow />

      {/* Hairline inner track */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, y + 0.028, 0]}
        material={mats.rimInner}
      >
        <ringGeometry args={[2.42, 2.48, 128]} />
      </mesh>

      {/* Soft bloom band */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, y + 0.03, 0]}
        material={mats.rimBloom}
      >
        <ringGeometry args={[2.55, 3.35, 160]} />
      </mesh>

      {/* Outer soft ring */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, y + 0.032, 0]}
        material={mats.rimOuter}
      >
        <ringGeometry args={[3.05, 3.22, 160]} />
      </mesh>

      {/* Crisp neon core */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, y + 0.036, 0]}
        material={mats.rimCore}
      >
        <ringGeometry args={[2.72, 2.92, 160]} />
      </mesh>

      {/* Raised torus for real 3D edge */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, y + 0.055, 0]}
        material={mats.torus}
      >
        <torusGeometry args={[2.82, 0.028, 12, 160]} />
      </mesh>

      {/* Orbiting accent */}
      <mesh ref={bead} material={mats.bead}>
        <sphereGeometry args={[0.045, 16, 16]} />
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
  const topFill = useRef<THREE.DirectionalLight>(null);
  const ringGlow = useRef<THREE.PointLight>(null);
  const { camera, gl } = useThree();
  const look = useRef(new THREE.Vector3(0.1, 0.15, 0));

  const sx = useRef(0.1);
  const sy = useRef(0.22);
  const sz = useRef(0.05);
  const ry = useRef(Math.PI + 0.06);
  const rx = useRef(0.04);
  const rz = useRef(-0.1);
  const sc = useRef(18);
  const camZ = useRef(11);

  useEffect(() => {
    gl.setClearColor(0x000000, 0);
  }, [gl]);

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

    const o = snap.outro;
    if (topFill.current) {
      // Keep phone lit without washing the stand grey
      topFill.current.intensity = lerp(0.3, 1.85, o);
      topFill.current.position.set(sx.current + 0.35, 7, sz.current + 0.5);
      topFill.current.target.position.set(sx.current, sy.current, sz.current);
      topFill.current.target.updateMatrixWorld();
    }
    if (ringGlow.current) {
      ringGlow.current.intensity = lerp(0, 1.4, o);
      ringGlow.current.position.set(sx.current, -2.15, sz.current);
    }

    camera.position.x = lerp(camera.position.x, -sx.current * 0.1, a);
    camera.position.y = lerp(
      camera.position.y,
      inOutro ? lerp(0.32, 1.2, snap.outro) : 0.28,
      a
    );
    camera.position.z = camZ.current;
    look.current.set(
      sx.current * 0.3,
      inOutro ? -0.55 * snap.outro : 0.16,
      0
    );
    camera.lookAt(look.current);
  });

  return (
    <>
      <directionalLight
        ref={topFill}
        intensity={0.35}
        color="#ffffff"
        position={[0.35, 7, 0.5]}
      >
        <object3D attach="target" position={[0, 0, 0]} />
      </directionalLight>
      <pointLight
        ref={ringGlow}
        intensity={0}
        color="#ff5a45"
        distance={10}
        decay={2}
      />
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
  useEffect(() => {
    preloadPhoneModel();
  }, []);

  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0.28, 11], fov: 30, near: 0.1, far: 60 }}
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
        performance={{ min: 0.55, max: 1, debounce: 200 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          preserveDrawingBuffer: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          gl.domElement.style.pointerEvents = "none";
        }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={[SPACE, 16, 40]} />
          <SoftEnvironment />
          <ambientLight intensity={0.28} />
          <hemisphereLight args={["#8a8a98", "#050508", 0.28]} />
          <directionalLight
            position={[5, 8, 4]}
            intensity={1.85}
            color="#ffffff"
          />
          <directionalLight
            position={[-4, 3, -3]}
            intensity={0.95}
            color="#ffc2b8"
          />
          <directionalLight
            position={[0, 2, 6]}
            intensity={0.7}
            color="#dfe4ff"
          />
          <pointLight
            position={[-1.2, 1.4, 2.2]}
            intensity={0.55}
            color="#ef1a12"
          />

          <ScrollRig snapshotRef={snapshotRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
