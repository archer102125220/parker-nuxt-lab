// https://github.com/nuxt/nuxt/blob/4e05650cde31ca73be4d14b1f0d23c7854008749/packages/nuxt/src/core/nuxt.ts#L404
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { defineNuxtModule, useNitro } from '@nuxt/kit';
import * as faceapi from 'face-api.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineNuxtModule({
  setup(options, nuxt) {

    nuxt.hook('ready', async () => {
      const nitroApp = useNitro();
      await faceapi.nets.ssdMobilenetv1.loadFromDisk(join(__dirname, '../public/models'));
      nitroApp.$faceapi = faceapi;

    });
  }
});
