"use client";
import LandmarkCanvas from "@/components/LandmarkCanvas";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex m-5">
        <LandmarkCanvas />
      </div>
      <a className="text-neutral-500 hover:text-white hover:underline transition-all duration-200" href="https://github.com/lajesfen/CS4016-mocap-three">github.com/CS4016-mocap-three</a>
    </div>
  );
}
