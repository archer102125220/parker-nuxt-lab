import * as lineOauth from '@/services/line-oauth';
import * as nuxtServer from '@/services/nuxt-server';
import * as webAuthn from '@/services/web-authn';

export default defineNuxtPlugin(() => {

  return {
    provide: {
      lineOauth,
      nuxtServer,
      webAuthn
    },
  };
});