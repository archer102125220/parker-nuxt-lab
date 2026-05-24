import pdfReader from '../utils/third-party/pdf-reader.js';

// Provide the pdfReader factory and shared classes through the Nuxt plugin
// system so any component can do:
//
//   const { $pdfReader } = useNuxtApp();
//   const app = $pdfReader.createApp({ container, viewer });
//   await app.open({ url });

export default defineNuxtPlugin(() => {
  return {
    provide: {
      pdfReader,
    },
  };
});

