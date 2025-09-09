// https://github.com/nuxt/nuxt/blob/4e05650cde31ca73be4d14b1f0d23c7854008749/packages/nuxt/src/core/nuxt.ts#L404
// import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// import nodejs bindings to native tensorflow,
// not required, but will speed up things drastically (python required)
// import '@tensorflow/tfjs-node';

// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData
import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// patch nodejs environment, we need to provide an implementation of
// HTMLCanvasElement and HTMLImageElement
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
if (process.env.NODE_ENV === 'production') {
  // faceapi.nets.ssdMobilenetv1.loadFromDisk('./public/models');
} else {
  faceapi.nets.ssdMobilenetv1.loadFromDisk(join(__dirname, '../public/models'));
}

// console.log(import.meta.url);
// console.log({ __dirname, __filename });
// console.log('./public/models');
// console.log(fs.existsSync('./public/models'));
// console.log(join(__dirname, '../public/models'));

export default defineNitroPlugin((nitroApp) => {
  console.log('faceapi plugin');

  nitroApp.hooks.hook("request", (event) => {
    console.log('faceapi plugin request');
    event.context.$faceapi = faceapi;
  });
})