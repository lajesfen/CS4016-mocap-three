import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

const loadGltf = async (url: string): Promise<GLTF> => {
  const loader = new GLTFLoader();
  return await new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf: GLTF) => resolve(gltf),
      (progress: any) => {},
      (error: any) => reject(error)
    );
  });
};

export { loadGltf };
