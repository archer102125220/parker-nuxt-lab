import * as lineOauth from '@/services/line-oauth';
import * as nuxtServer from '@/services/nuxt-server';
import * as webAuthn from '@/services/web-authn';
import * as fido2Lib from '@/services/fido2-lib';

export default defineNuxtPlugin(() => {

  return {
    provide: {
      lineOauth,
      nuxtServer,
      webAuthn,
      fido2Lib
    },
  };
});