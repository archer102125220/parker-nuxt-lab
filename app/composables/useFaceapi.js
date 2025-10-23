import * as _faceapi from 'face-api.js';

export function useFaceapi(modelsPath = '/') {
  const faceapi = useNuxtApp()?.$faceapi || _faceapi;

  async function faceapiInit(_modelsPath = modelsPath, callback) {
    await faceapi.nets.ssdMobilenetv1.loadFromUri(_modelsPath);
    if (typeof callback === 'function') {
      callback(_modelsPath, faceapi);
    }
  }

  return [faceapi, faceapiInit];
}

export default useFaceapi;