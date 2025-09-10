import {
  getFirebaseAdminApp,
  getAndroidFirebaseAdminApp,
  getIosFirebaseAdminApp
} from '@/utils/third-party/firebase-admin';

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("request", (event) => {
    event.context.$firebaseAdminApp = {
      get web() {
        return getFirebaseAdminApp();
      },
      get android() {
        return getAndroidFirebaseAdminApp();
      },
      get ios() {
        return getIosFirebaseAdminApp();
      }
    };
  });
})