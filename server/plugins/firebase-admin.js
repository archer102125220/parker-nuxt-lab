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

  nitroApp.hooks.hook('beforeResponse', (event, response) => {
    console.log('firebase-admin.js beforeResponse');
  });

  nitroApp.hooks.hook('afterResponse', (event, response) => {
    console.log('firebase-admin.js afterResponse');
  });

  nitroApp.hooks.hook('render:html', (html, { event }) => {
    console.log('firebase-admin.js render:html');
  });

  console.log('firebase-admin.js hooks registered');
});
