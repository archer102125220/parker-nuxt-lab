import * as nuxtServer from '@services/nuxt-server';
import * as serverFirebaseMessaging from '@services/server/firebase-messaging';

export default defineNuxtPlugin(() => {
  console.log('services server plugin loading...');

  const serverServices = {
    serverFirebaseMessaging,
    nuxtServer
  };

  console.log('services server plugin loaded');

  return {
    provide: {
      ...serverServices,
      serverServices
    }
  };
});
