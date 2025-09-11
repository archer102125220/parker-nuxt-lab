import {
  getFirebaseAdminWeb,
  getFirebaseAdminAndroid,
  getFirebaseAdminIos
} from '@/utils/third-party/firebase-admin';

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("request", (event) => {
    event.context.$firebaseAdminApp = {
      get web() {
        return getFirebaseAdminWeb();
      },
      get android() {
        return getFirebaseAdminAndroid();
      },
      get ios() {
        return getFirebaseAdminIos();
      }
    };
  });
})