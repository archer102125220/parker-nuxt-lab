// Server utility for face-api.js operations
import { join } from 'path';
import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';

// Patch node environment for face-api.js
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({
  Canvas,
  Image,
  ImageData
});

let modelsLoaded = false;

/**
 * Load face-api models
 * Handles different paths for development and production environments
 */
export async function loadModels() {
  if (modelsLoaded) {
    return;
  }

  // Determine models path based on environment
  let modelsPath;

  if (process.env.NODE_ENV === 'production') {
    // Production: models are in .output/public/models after build
    modelsPath = join(process.cwd(), 'public/models');
  } else {
    // Development: models are in project root public/models
    modelsPath = join(process.cwd(), 'public/models');
  }

  console.log('Environment:', process.env.NODE_ENV);
  console.log('Loading face-api models from:', modelsPath);

  try {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelsPath);

    console.log('✅ Face-api models loaded successfully');
    modelsLoaded = true;
  } catch (error) {
    console.error('❌ Failed to load face-api models:', error);
    console.error('Attempted path:', modelsPath);
    throw error;
  }
}

export { faceapi, canvas };
