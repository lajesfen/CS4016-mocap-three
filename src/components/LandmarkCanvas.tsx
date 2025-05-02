"use client";
import { useEffect, useRef, useState } from "react";
import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils,
  PoseLandmarkerResult,
} from "@mediapipe/tasks-vision";

const LandmarkCanvas = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const landmarkerRef = useRef<PoseLandmarker | null>(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [showLandmarks, setShowLandmarks] = useState(true);

  useEffect(() => {
    const loadModel = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      landmarkerRef.current = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
        },
        runningMode: "VIDEO",
      });
    };

    loadModel();
  }, []);

  useEffect(() => {
    let animationId = 0;

    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            const width = videoRef.current!.videoWidth;
            const height = videoRef.current!.videoHeight;
            setDimensions({ width, height });
            videoRef.current!.play();
            animationId = requestAnimationFrame(runDetection);
          };
        }
      } catch (err) {
        console.error("Camera error:", err);
        alert("Camera access failed.");
      }
    };

    const runDetection = async () => {
      if (videoRef.current && landmarkerRef.current && canvasRef.current) {
        const results: PoseLandmarkerResult =
          await landmarkerRef.current.detectForVideo(
            videoRef.current,
            performance.now()
          );

        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          ctx.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          const utils = new DrawingUtils(ctx);

          results.landmarks?.forEach((landmarks) => {
            utils.drawLandmarks(landmarks, { color: "#00FFAA", lineWidth: 2 });
            utils.drawConnectors(landmarks, PoseLandmarker.POSE_CONNECTIONS, {
              color: "#FF9900",
              lineWidth: 2,
            });
          });
        }
      }
      animationId = requestAnimationFrame(runDetection);
    };

    setupCamera();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="relative">
      <video
        className="w-full transform -scale-x-100"
        ref={videoRef}
        autoPlay
        muted
        playsInline
      />
      {dimensions && (
        <>
          {showLandmarks && (
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 pointer-events-none"
              width={dimensions.width}
              height={dimensions.height}
              style={{ transform: "scaleX(-1)" }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default LandmarkCanvas;
