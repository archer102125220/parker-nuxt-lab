export default defineNuxtPlugin((nuxtApp) => {
  console.log('gtag plugin loading...');

  nuxtApp.$googleGAInit(import.meta.env.VITE_APP_ID, import.meta.dev, true);
  nuxtApp.$googleGTMInit(import.meta.env.VITE_GTM_ID, true, (gtag, gtm) => {
    const currentNuxtApp = useNuxtApp();
    currentNuxtApp.provide('gtag', gtag);
    currentNuxtApp.provide('gtm', gtm);
  });

  console.log('gtag plugin loaded');
});
