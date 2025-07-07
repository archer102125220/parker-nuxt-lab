export default defineNuxtPlugin(nuxtApp => {
  const runtimeConfig = useRuntimeConfig();
  const gtagConfig = runtimeConfig.public.gtag;
  nuxtApp.$googleGAInit(gtagConfig.gaId, gtagConfig.debug, gtagConfig.log);
  nuxtApp.$googleGTMInit(gtagConfig.gtmId, gtagConfig.log, (gtag, gtm) => {
    const currentNuxtApp = useNuxtApp();
    currentNuxtApp.provide('gtag', gtag);
    currentNuxtApp.provide('gtm', gtm);
  });
});