import * as nuxtServer from '@services/nuxt-server';
import * as lineOauth from '@services/client/line-oauth';
import * as webAuthn from '@services/client/web-authn';
import * as fido2Lib from '@services/client/fido2-lib';
import * as clientFirebaseAdmin from '@services/client/firebase-admin';
import * as serverSentEvent from '@services/client/server-sent-event';
import * as faceSwap from '@services/client/face-swap';

export default defineNuxtPlugin(() => {
  console.log('services client plugin loading...');

  const clientServices = {
    lineOauth,
    nuxtServer,
    webAuthn,
    fido2Lib,
    clientFirebaseAdmin,
    serverSentEvent,
    faceSwap
  };

  console.log('services client plugin loaded');

  return {
    provide: {
      ...clientServices,
      clientServices
    }
  };
});
