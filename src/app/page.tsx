"use client";
import dynamic from "next/dynamic";

const LandmarkCanvas = dynamic(
  () => {
    return import("../components/LandmarkCanvas");
  },
  { ssr: false }
);

export default function Home() {
  return (
    <div className="flex m-5 flex-row">
      <LandmarkCanvas />
    </div>
  );
}
