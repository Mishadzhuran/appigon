"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import { ProductPhone } from "@/components/three/ProductPhone";

export function ScrollPhoneCanvas() {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 40 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ProductPhone />
          <ContactShadows
            position={[0, -2.35, 0]}
            opacity={0.45}
            scale={12}
            blur={2.8}
            far={4.5}
            color="#000000"
          />
          <Environment preset="city" environmentIntensity={0.45} />
        </Suspense>
      </Canvas>
    </div>
  );
}
