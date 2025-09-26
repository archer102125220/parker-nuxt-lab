import {
  getFirebaseAdminWeb,
  getFirebaseAdminAndroid,
  getFirebaseAdminIos
} from '@/utils/third-party/firebase-admin';

export default defineNitroPlugin((nitroApp) => {
  const firebaseAdminApp = {
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

  nitroApp.$firebaseAdminApp = firebaseAdminApp;

  nitroApp.hooks.hook("request", (event) => {
    event.context.$firebaseAdminApp = firebaseAdminApp;
  });
})