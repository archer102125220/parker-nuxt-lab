// https://github.com/nuxt/nuxt/blob/4e05650cde31ca73be4d14b1f0d23c7854008749/packages/nuxt/src/core/nuxt.ts#L404
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { defineNuxtModule, useNitro } from '@nuxt/kit';

// import nodejs bindings to native tensorflow,
// not required, but will speed up things drastically (python required)
import '@tensorflow/tfjs-node';

// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData
import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineNuxtModule({
  setup(options, nuxt) {

    nuxt.hook('ready', async () => {
      const nitroApp = useNitro();

      // patch nodejs environment, we need to provide an implementation of
      // HTMLCanvasElement and HTMLImageElement
      const { Canvas, Image, ImageData } = canvas
      faceapi.env.monkeyPatch({ Canvas, Image, ImageData })
      await faceapi.nets.ssdMobilenetv1.loadFromDisk(join(__dirname, '../public/models'));

      nitroApp.$faceapi = faceapi;

      nuxt.$faceapi = faceapi;

    });
  }
});
