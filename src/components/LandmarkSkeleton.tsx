import { Sphere } from "@react-three/drei";
import { useMemo } from "react";
import { Landmark } from "./LandmarkCanvas";

export default function LandmarkSkeleton({
  landmarks,
}: {
  landmarks: Landmark[];
}) {
  const spheres = useMemo(
    () =>
      landmarks.map((landmark, i) => (
        <Sphere
          key={i}
          args={[0.01, 16, 16]}
          position={[
            landmark.x - 0.5,
            -(landmark.y - 0.5),
            -landmark.z * 0.5,
          ]}
        >
          <meshStandardMaterial attach="material" color="hotpink" />
        </Sphere>
      )),
    [landmarks]
  );

  return <>{spheres}</>;
}
