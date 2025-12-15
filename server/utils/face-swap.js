// Server utility for face swap operations using face-api.js
import { join } from 'path';

// Use dynamic imports to avoid loading heavy dependencies during cold start
let canvas = null;
let faceapi = null;
let modelsLoaded = false;
let dependenciesLoaded = false;

/**
 * Load canvas and face-api.js dependencies dynamically
 * This prevents loading during Vercel cold start
 */
async function loadDependencies() {
  if (dependenciesLoaded) {
    return {
      canvas,
      faceapi
    };
  }

  console.log('Loading face-swap dependencies...');

  // Dynamic import to avoid cold start overhead
  const canvasModule = await import('canvas');
  const faceapiModule = await import('face-api.js');

  // Store the modules
  canvas = canvasModule;
  faceapi = faceapiModule;

  // Patch node environment for face-api.js
  const { Canvas, Image, ImageData } = canvasModule;
  faceapi.env.monkeyPatch({
    Canvas,
    Image,
    ImageData
  });

  dependenciesLoaded = true;
  console.log('✅ Face-swap dependencies loaded');

  return {
    canvas,
    faceapi
  };
}

/**
 * Load face-api models
 * Handles different paths for development and production environments
 */
export async function loadModels() {
  if (modelsLoaded) {
    return;
  }

  // Load dependencies first
  const deps = await loadDependencies();

  // Determine models path based on environment
  let modelsPath;

  if (process.env.NODE_ENV === 'production') {
    // Production: models are in .output/public/ai_models after build
    modelsPath = join(process.cwd(), 'public/ai_models');
  } else {
    // Development: models are in project root public/ai_models
    modelsPath = join(process.cwd(), 'public/ai_models');
  }

  console.log('Environment:', process.env.NODE_ENV);
  console.log('Loading face-api models from:', modelsPath);

  try {
    await Promise.all([
      deps.faceapi.nets.ssdMobilenetv1.loadFromDisk(modelsPath),
      deps.faceapi.nets.faceLandmark68Net.loadFromDisk(modelsPath),
      deps.faceapi.nets.faceRecognitionNet.loadFromDisk(modelsPath)
    ]);

    console.log('✅ Face-api models loaded successfully');
    modelsLoaded = true;
  } catch (error) {
    console.error('❌ Failed to load face-api models:', error);
    console.error('Attempted path:', modelsPath);
    throw error;
  }
}

/**
 * Load image from base64 string
 * @param {string} base64 - Base64 encoded image
 * @returns {Promise<Image>}
 */
export async function loadImageFromBase64(base64) {
  // Ensure dependencies are loaded
  const deps = await loadDependencies();
  const { Image } = deps.canvas;

  const img = new Image();

  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = reject;

    // Handle data URL or raw base64
    if (base64.startsWith('data:')) {
      img.src = base64;
    } else {
      img.src = `data:image/png;base64,${base64}`;
    }
  });
}

/**
 * Detect face and landmarks in an image
 * @param {Image} image - Canvas Image object
 * @returns {Promise<FaceDetectionWithLandmarks|null>}
 */
export async function detectFace(image) {
  // Ensure dependencies are loaded
  const deps = await loadDependencies();

  const detection = await deps.faceapi
    .detectSingleFace(image)
    .withFaceLandmarks();

  return detection || null;
}

/**
 * Perform face swap between source and target images
 * @param {string} sourceBase64 - Base64 source image (face to use)
 * @param {string} targetBase64 - Base64 target image (background)
 * @returns {Promise<string>} - Base64 result image
 */
export async function performFaceSwap(sourceBase64, targetBase64) {
  // Load dependencies and models
  const deps = await loadDependencies();
  await loadModels();

  // Load images
  const sourceImg = await loadImageFromBase64(sourceBase64);
  const targetImg = await loadImageFromBase64(targetBase64);

  // Detect faces
  const sourceDetection = await detectFace(sourceImg);
  const targetDetection = await detectFace(targetImg);

  if (sourceDetection === null) {
    throw new Error('無法在來源圖片中偵測到人臉');
  }

  if (targetDetection === null) {
    throw new Error('無法在目標圖片中偵測到人臉');
  }

  // Create result canvas
  const resultCanvas = deps.canvas.createCanvas(
    targetImg.width,
    targetImg.height
  );
  const ctx = resultCanvas.getContext('2d');

  // Draw target image as background
  ctx.drawImage(targetImg, 0, 0);

  // Get face regions
  const sourceBox = sourceDetection.detection.box;
  const targetBox = targetDetection.detection.box;

  // Add padding
  const padding = 20;
  const sx = Math.max(0, sourceBox.x - padding);
  const sy = Math.max(0, sourceBox.y - padding);
  const sw = Math.min(sourceImg.width - sx, sourceBox.width + padding * 2);
  const sh = Math.min(sourceImg.height - sy, sourceBox.height + padding * 2);

  const tx = targetBox.x - padding;
  const ty = targetBox.y - padding;
  const tw = targetBox.width + padding * 2;
  const th = targetBox.height + padding * 2;

  // Create temporary canvas for source face with elliptical mask
  const tempCanvas = deps.canvas.createCanvas(sw, sh);
  const tempCtx = tempCanvas.getContext('2d');

  // Draw source face region
  tempCtx.drawImage(sourceImg, sx, sy, sw, sh, 0, 0, sw, sh);

  // Apply elliptical mask
  tempCtx.globalCompositeOperation = 'destination-in';
  tempCtx.beginPath();
  tempCtx.ellipse(sw / 2, sh / 2, sw / 2.2, sh / 2.2, 0, 0, Math.PI * 2);
  tempCtx.fill();

  // Blend onto result canvas
  ctx.globalAlpha = 0.85;
  ctx.drawImage(tempCanvas, 0, 0, sw, sh, tx, ty, tw, th);
  ctx.globalAlpha = 1;

  // Return as base64
  return resultCanvas.toDataURL('image/png');
}
