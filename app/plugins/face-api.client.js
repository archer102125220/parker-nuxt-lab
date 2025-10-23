import * as faceapi from 'face-api.js';

export default defineNuxtPlugin(() => {

  return {
    provide: {
      faceapi
    }
  };
});