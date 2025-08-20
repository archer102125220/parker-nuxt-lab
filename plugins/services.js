import * as lineOauth from '@/services/client/line-oauth';
import * as nuxtServer from '@/services/client/nuxt-server';
import * as webAuthn from '@/services/client/web-authn';
import * as fido2Lib from '@/services/client/fido2-lib';
import * as clientFirebaseAdmin from '@/services/client/firebase-admin';
// import * as serverFirebaseAdmin from '@/services/server/firebase-admin';

export default defineNuxtPlugin(() => {
  const clientServices = {
    lineOauth,
    nuxtServer,
    webAuthn,
    fido2Lib,
    clientFirebaseAdmin
  }
  const serverServices = {
    // serverFirebaseAdmin
  }

  return {
    provide: {
      ...clientServices,
      ...serverServices,
      clientServices,
      serverServices
    },
  };
});