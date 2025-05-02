import {
  PoseLandmarker,
  FilesetResolver,
  PoseLandmarkerResult,
  DrawingUtils,
} from "@mediapipe/tasks-vision";

class PoseLandmarkManager {
  private static instance: PoseLandmarkManager = new PoseLandmarkManager();
  private results!: PoseLandmarkerResult;
  poseLandmarker!: PoseLandmarker | null;
  private initialized = false;

  private constructor() {
    this.initializeModel();
  }

  static getInstance(): PoseLandmarkManager {
    return PoseLandmarkManager.instance;
  }

  async initializeModel() {
    if (this.initialized) return;

    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    this.poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
        delegate: "GPU",
      },
      runningMode: "VIDEO",
      numPoses: 1,
    });

    this.initialized = true;
  }

  getResults = () => {
    return this.results;
  };

  async detectLandmarks(videoElement: HTMLVideoElement, time: number) {
    if (!this.poseLandmarker) return;
    this.results = await this.poseLandmarker.detectForVideo(videoElement, time);
  }

  drawLandmarks(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx || !this.results?.landmarks) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const drawingUtils = new DrawingUtils(ctx);
    const lineWidth = 2;

    for (const landmarks of this.results.landmarks) {
      drawingUtils.drawLandmarks(landmarks, {
        color: "#FF9900",
        lineWidth,
      });
      drawingUtils.drawConnectors(landmarks, PoseLandmarker.POSE_CONNECTIONS, {
        color: "#00FFAA",
        lineWidth,
      });
    }
  }
}

export default PoseLandmarkManager;
