import { firebaseServerInit } from '@/utils/third-party/firebase-admin';

export default defineNitroPlugin((nitroApp) => {
  const { firebaseAdminApp, androidFirebaseAdminApp, iosFirebaseAdminApp } = firebaseServerInit();

  nitroApp.hooks.hook("request", (event) => {
    event.context.$firebaseAdminApp = firebaseAdminApp;
    event.context.$androidFirebaseAdminApp = androidFirebaseAdminApp;
    event.context.$iosFirebaseAdminApp = iosFirebaseAdminApp;
  });
})