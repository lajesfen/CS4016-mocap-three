"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Landmark } from "./LandmarkCanvas";
import LandmarkSkeleton from "./LandmarkSkeleton";

export default function ThreeCanvas({ landmarks }: { landmarks: Landmark[] }) {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <gridHelper args={[10, 10]} />
      <axesHelper args={[5]} />
      <LandmarkSkeleton landmarks={landmarks} />
    </Canvas>
  );
}
