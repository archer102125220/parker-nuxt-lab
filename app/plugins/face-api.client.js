import * as faceapi from 'face-api.js';

export default defineNuxtPlugin(() => {
  console.log('face-api');
  return {
    provide: {
      faceapi
    }
  };
});
