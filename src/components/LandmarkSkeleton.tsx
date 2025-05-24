import { Sphere } from "@react-three/drei";
import { useMemo } from "react";
import { Landmark } from "./LandmarkCanvas";
import { PoseLandmarks } from "./PoseLandmarks";

export default function LandmarkSkeleton({
  landmarks,
}: {
  landmarks: Landmark[];
}) {
  const spheres = useMemo(
    () =>
      landmarks
        .filter((_, i) => {
          return Object.values(PoseLandmarks).some(
            (enumValue) => typeof enumValue === "number" && enumValue === i
          );
        })
        .map((landmark, i) => (
          <Sphere
            key={i}
            args={[0.01, 16, 16]}
            //   position={[
            //     landmark.x - 0.5,
            //     -(landmark.y - 2.5),
            //     -landmark.z * 0.5,
            //   ]} // -- Position if we used landmarks instead of worldLandmarks
            position={[landmark.x, -(landmark.y - 0.5), -landmark.z * 0.5]}
          >
            <meshStandardMaterial attach="material" color="hotpink" />
          </Sphere>
        )),
    [landmarks]
  );

  return <group scale={2}>{spheres}</group>;
}
