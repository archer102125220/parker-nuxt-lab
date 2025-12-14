// Server utility for face-api.js operations
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

  console.log('Loading face-api dependencies...');

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
  console.log('✅ Face-api dependencies loaded');

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
    // Production: models are in .output/public/models after build
    modelsPath = join(process.cwd(), 'public/models');
  } else {
    // Development: models are in project root public/models
    modelsPath = join(process.cwd(), 'public/models');
  }

  console.log('Environment:', process.env.NODE_ENV);
  console.log('Loading face-api models from:', modelsPath);

  try {
    await deps.faceapi.nets.ssdMobilenetv1.loadFromDisk(modelsPath);

    console.log('✅ Face-api models loaded successfully');
    modelsLoaded = true;
  } catch (error) {
    console.error('❌ Failed to load face-api models:', error);
    console.error('Attempted path:', modelsPath);
    throw error;
  }
}
