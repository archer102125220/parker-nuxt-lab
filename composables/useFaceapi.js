import * as _faceapi from 'face-api.js';

export function useFaceapi(modelsPath = '/') {
  const faceapi = useNuxtApp()?.$faceapi || _faceapi;

  async function faceapiInit(_modelsPath = modelsPath, callback) {
    await faceapi.nets.ssdMobilenetv1.loadFromUri(_modelsPath);
    await faceapi.nets.ssdMobilenetv1.load(_modelsPath);
    if (typeof callback === 'function') {
      callback(faceapi);
    }
  }

  return [faceapi, faceapiInit];
}

export default useFaceapi;