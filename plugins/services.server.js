import * as serverFirebaseMessaging from '@/services/server/firebase-messaging';

export default defineNuxtPlugin(async () => {
  const serverServices = {
    serverFirebaseMessaging
  }

  return {
    provide: {
      ...serverServices,
      serverServices
    },
  };
});