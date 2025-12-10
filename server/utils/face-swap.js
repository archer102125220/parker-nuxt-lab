// Server utility for face swap operations using face-api.js
import { join } from 'path';
import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';

// Patch node environment for face-api.js
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

let modelsLoaded = false;

/**
 * Load face-api models
 */
export async function loadModels() {
  if (modelsLoaded) {
    return;
  }

  // Use process.cwd() for consistent path resolution in Nitro
  const modelsPath = join(process.cwd(), 'public/models');

  console.log('Loading face-api models from:', modelsPath);

  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromDisk(modelsPath),
    faceapi.nets.faceLandmark68Net.loadFromDisk(modelsPath),
    faceapi.nets.faceRecognitionNet.loadFromDisk(modelsPath)
  ]);

  console.log('Face-api models loaded successfully');
  modelsLoaded = true;
}

/**
 * Load image from base64 string
 * @param {string} base64 - Base64 encoded image
 * @returns {Promise<Image>}
 */
export async function loadImageFromBase64(base64) {
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
  const detection = await faceapi
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
  const resultCanvas = canvas.createCanvas(targetImg.width, targetImg.height);
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
  const tempCanvas = canvas.createCanvas(sw, sh);
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

export { faceapi, canvas };
