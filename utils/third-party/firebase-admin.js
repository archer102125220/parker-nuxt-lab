import firebaseAdmin from 'firebase-admin';

// https://firebase.google.com/docs/cloud-messaging/migrate-v1?authuser=0&_gl=11yc83x4_gaMTMzNDU0MDY5LjE2ODYxMDI5NzQ._ga_CW55HF8NVT*MTY5NDY3NzAxMy4yNC4xLjE2OTQ2NzgxODEuMC4wLjA.&hl=zh-tw#linux-or-macos
// https://firebase.google.com/docs/cloud-messaging/js/client?hl=zh-tw#web
// https://firebase.google.com/docs/cloud-messaging/js/client?hl=zh-tw#web_2

export const credential = import.meta.env.VITE_FIREBASE_CREDENTIAL || '{}';

export const firebaseConfig = {
  authDomain: 'parker-nuxt-lab.firebaseapp.com',
  projectId: 'parker-nuxt-lab',
  storageBucket: 'parker-nuxt-lab.firebasestorage.app'
};

export let firebaseAdminApp = null;
export function getFirebaseAdminApp() {
  return firebaseAdminApp;
}

export const androidCredential =
  import.meta.env.VITE_ANDROID_FIREBASE_CREDENTIAL || '{}';

export const androidFirebaseConfig = {
  authDomain: 'httpsbibiancojp.firebaseapp.com',
  projectId: 'httpsbibiancojp',
  storageBucket: 'httpsbibiancojp.appspot.com'
};
export let androidFirebaseAdminApp = null;
export function getAndroidFirebaseAdminApp() {
  return androidFirebaseAdminApp;
}

export const iosCredential = import.meta.env.VITE_IOS_FIREBASE_CREDENTIAL || '{}';

export const iosFirebaseConfig = {
  authDomain: 'httpsbibiancojp.firebaseapp.com',
  projectId: 'httpsbibiancojp',
  storageBucket: 'httpsbibiancojp.appspot.com'
};
export let iosFirebaseAdminApp = null;
export function getIosFirebaseAdminApp() {
  return iosFirebaseAdminApp;
}

export function firebaseServerInit() {
  try {
    if (typeof window === 'undefined') {
      const firebaseAdminAppStore = firebaseAdmin.INTERNAL.appStore.appStore;
      // console.log(firebaseAdmin.messaging);
      // console.log(firebaseAdmin.INTERNAL.appStore.appStore);
      // console.log(firebaseAdmin.appStore);
      // console.log(firebaseAdmin.getApp);
      if (firebaseAdminAppStore.get('[DEFAULT]')) {
        firebaseAdminApp = firebaseAdminAppStore.get('[DEFAULT]');
      } else if (typeof credential === 'string' && credential !== '{}' && credential !== '') {
        firebaseAdminApp = firebaseAdmin.initializeApp({
          ...firebaseConfig,
          credential: firebaseAdmin.credential.cert(JSON.parse(credential))
        });
      }
      if (firebaseAdminAppStore.get('androidFirebase')) {
        androidFirebaseAdminApp = firebaseAdminAppStore.get('androidFirebase');
      } else if (typeof androidCredential === 'string' && androidCredential !== '{}' && androidCredential !== '') {
        androidFirebaseAdminApp = firebaseAdmin.initializeApp(
          {
            ...androidFirebaseConfig,
            credential: firebaseAdmin.credential.cert(
              JSON.parse(androidCredential)
            )
          },
          'androidFirebase'
        );
      }
      if (firebaseAdminAppStore.get('iosFirebase')) {
        iosFirebaseAdminApp = firebaseAdminAppStore.get('iosFirebase');
      } else if (typeof iosCredential === 'string' && iosCredential !== '{}' && iosCredential !== '') {
        iosFirebaseAdminApp = firebaseAdmin.initializeApp(
          {
            ...iosFirebaseConfig,
            credential: firebaseAdmin.credential.cert(JSON.parse(iosCredential))
          },
          'iosFirebase'
        );
      }
    }
  } catch (error) {
    console.error(error);
  }

  if (typeof firebaseAdminApp !== 'object' || firebaseAdminApp === null) {
    console.warn(
      'Firebase app initialization failed.'
    );
  }

  if (typeof androidFirebaseAdminApp !== 'object' || androidFirebaseAdminApp === null) {
    console.warn(
      'Android Firebase app initialization failed.'
    );
  }

  if (typeof iosFirebaseAdminApp !== 'object' || iosFirebaseAdminApp === null) {
    console.warn(
      'IOS Firebase app initialization failed.'
    );
  }

  return { firebaseAdminApp, androidFirebaseAdminApp, iosFirebaseAdminApp };
}

// https://ithelp.ithome.com.tw/articles/10269342
// https://vercel.com/archer102125220/resume-web

firebaseServerInit();

