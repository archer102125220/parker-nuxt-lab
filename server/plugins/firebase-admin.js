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
    console.log('firebase-admin.js request');
    event.context.$firebaseAdminApp = firebaseAdminApp;
    console.log('firebase-admin.js request end');
  });

  console.log('firebase-admin.js hooks registered');
});
