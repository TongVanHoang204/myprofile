"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, OrbitControls } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { TextureLoader, Mesh } from "three";
import SkeletonLoader from "./SkeletonLoader";

function AnimatedSphere() {
  const meshRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, "/profile/tong-van-hoang-avatar.jpg");

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <Sphere args={[1, 100, 200]} scale={2.4} ref={meshRef}>
      <MeshDistortMaterial
        map={texture} // Map avatar texture
        color="#ffffff" // White base for texture
        attach="material"
        distort={0.3} // Giảm distort một chút để vẫn nhìn rõ mặt
        speed={1.5}
        roughness={0.4}
      />
    </Sphere>
  );
}

export default function Hero3D() {
  return (
    <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px]">
      <Suspense fallback={<SkeletonLoader variant="circular" className="h-full w-full opacity-20" />}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          {/* Lights */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 2, 1]} intensity={1.5} />
          <pointLight position={[-20, -5, -10]} color="purple" intensity={1} />
          
          {/* Floating Object */}
          <Float
            speed={4} // Animation speed
            rotationIntensity={0.5} // XYZ rotation intensity
            floatIntensity={2} // Up/down float intensity
          >
            <AnimatedSphere />
          </Float>
          
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </Suspense>
    </div>
  );
}
