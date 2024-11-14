import * as faceapi from 'face-api.js';

export function useFaceapi() {
  return useNuxtApp()?.$faceapi || faceapi;
}