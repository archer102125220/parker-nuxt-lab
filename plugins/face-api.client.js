import * as faceapi from 'face-api.js';

export default defineNuxtPlugin(async () => {
  await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
  console.log(faceapi.nets);

  return {
    provide: {
      faceapi
    }
  };
});