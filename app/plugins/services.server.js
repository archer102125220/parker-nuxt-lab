import * as nuxtServer from '@services/nuxt-server';
import * as serverFirebaseMessaging from '@services/server/firebase-messaging';

export default defineNuxtPlugin(() => {
  const serverServices = {
    serverFirebaseMessaging,
    nuxtServer
  };

  return {
    provide: {
      ...serverServices,
      serverServices
    }
  };
});
