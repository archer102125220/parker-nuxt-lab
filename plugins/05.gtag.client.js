export default defineNuxtPlugin(nuxtApp => {
  const runtimeConfig = useRuntimeConfig();
  nuxtApp.$googleGAInit(import.meta.env.VITE_APP_ID, runtimeConfig.public.isDev, true);
  nuxtApp.$googleGTMInit(import.meta.env.VITE_GTM_ID, true, (gtag, gtm) => {
    const currentNuxtApp = useNuxtApp();
    currentNuxtApp.provide('gtag', gtag);
    currentNuxtApp.provide('gtm', gtm);
  });
});