import { firebaseServerInit } from '@/utils/helpers/firebase-admin';

export default defineNitroPlugin((nitroApp) => {
  nitroApp
  nitroApp.hooks.hook("request", (event) => {
    const firebaseAdmin = firebaseServerInit();
    event.context.$firebaseAdminApp = firebaseAdmin.firebaseAdminApp;
    event.context.$androidFirebaseAdminApp = firebaseAdmin.androidFirebaseAdminApp;
    event.context.$iosFirebaseAdminApp = firebaseAdmin.iosFirebaseAdminApp;
  });
})