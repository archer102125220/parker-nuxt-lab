import { createGtm } from '@gtm-support/vue-gtm';

export default defineNuxtPlugin(nuxtApp => {
  const runtimeConfig = useRuntimeConfig();
  nuxtApp.vueApp.use(createGtm(runtimeConfig.public.gtm));
  nuxtApp.$gtm = nuxtApp.vueApp.config.globalProperties.$gtm;
});