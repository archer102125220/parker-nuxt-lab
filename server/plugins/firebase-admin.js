import {
  getFirebaseAdminWeb,
  getFirebaseAdminAndroid,
  getFirebaseAdminIos
} from '@server/utils/firebase-admin';

export default defineNitroPlugin((nitroApp) => {
  console.log('firebase-admin.js');

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

  nitroApp.hooks.hook('request', (event) => {
    event.context.$firebaseAdminApp = firebaseAdminApp;
  });

  console.log('firebase-admin.js hooks registered');
});
