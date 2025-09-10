import firebaseAdmin from 'firebase-admin';

// https://firebase.google.com/docs/cloud-messaging/migrate-v1?authuser=0&_gl=11yc83x4_gaMTMzNDU0MDY5LjE2ODYxMDI5NzQ._ga_CW55HF8NVT*MTY5NDY3NzAxMy4yNC4xLjE2OTQ2NzgxODEuMC4wLjA.&hl=zh-tw#linux-or-macos
// https://firebase.google.com/docs/cloud-messaging/js/client?hl=zh-tw#web
// https://firebase.google.com/docs/cloud-messaging/js/client?hl=zh-tw#web_2

export const CREDENTIAL = import.meta.env.VITE_FIREBASE_CREDENTIAL || '{}';

export const FIREBASE_ADMIN_CONFIG = {
  authDomain: 'parker-nuxt-lab.firebaseapp.com',
  projectId: 'parker-nuxt-lab',
  storageBucket: 'parker-nuxt-lab.firebasestorage.app'
};

export let firebaseAdminApp = null;
export function getFirebaseAdminApp() {
  return firebaseAdminApp;
}

export const ANDROID_CREDENTIAL =
  import.meta.env.VITE_ANDROID_FIREBASE_CREDENTIAL || '{}';

export const ANDROID_FIREBASE_ADMIN_CONFIG = {
  authDomain: 'httpsbibiancojp.firebaseapp.com',
  projectId: 'httpsbibiancojp',
  storageBucket: 'httpsbibiancojp.appspot.com'
};
export let androidFirebaseAdminApp = null;
export function getAndroidFirebaseAdminApp() {
  return androidFirebaseAdminApp;
}

export const IOS_CREDENTIAL = import.meta.env.VITE_IOS_FIREBASE_CREDENTIAL || '{}';

export const IOS_FIREBASE_ADMIN_CONFIG = {
  authDomain: 'httpsbibiancojp.firebaseapp.com',
  projectId: 'httpsbibiancojp',
  storageBucket: 'httpsbibiancojp.appspot.com'
};
export let iosFirebaseAdminApp = null;
export function getIosFirebaseAdminApp() {
  return iosFirebaseAdminApp;
}

export function firebaseAdminServerInit() {
  try {
    if (typeof window !== 'undefined') return;


    const firebaseAdminAppStore = firebaseAdmin.INTERNAL.appStore.appStore;

    if (firebaseAdminAppStore.get('[DEFAULT]')) {
      firebaseAdminApp = firebaseAdminAppStore.get('[DEFAULT]');
    } else if (typeof CREDENTIAL === 'string' && CREDENTIAL !== '{}' && CREDENTIAL !== '') {
      firebaseAdminApp = firebaseAdmin.initializeApp({
        ...FIREBASE_ADMIN_CONFIG,
        credential: firebaseAdmin.credential.cert(JSON.parse(CREDENTIAL))
      });
    }

    if (firebaseAdminAppStore.get('androidFirebaseAdmin')) {
      androidFirebaseAdminApp = firebaseAdminAppStore.get('androidFirebaseAdmin');
    } else if (typeof ANDROID_CREDENTIAL === 'string' && ANDROID_CREDENTIAL !== '{}' && ANDROID_CREDENTIAL !== '') {
      androidFirebaseAdminApp = firebaseAdmin.initializeApp(
        {
          ...ANDROID_FIREBASE_ADMIN_CONFIG,
          credential: firebaseAdmin.credential.cert(
            JSON.parse(ANDROID_CREDENTIAL)
          )
        },
        'androidFirebaseAdmin'
      );
    }

    if (firebaseAdminAppStore.get('iosFirebaseAdmin')) {
      iosFirebaseAdminApp = firebaseAdminAppStore.get('iosFirebaseAdmin');
    } else if (typeof IOS_CREDENTIAL === 'string' && IOS_CREDENTIAL !== '{}' && IOS_CREDENTIAL !== '') {
      iosFirebaseAdminApp = firebaseAdmin.initializeApp(
        {
          ...IOS_FIREBASE_ADMIN_CONFIG,
          credential: firebaseAdmin.credential.cert(JSON.parse(IOS_CREDENTIAL))
        },
        'iosFirebaseAdmin'
      );
    }
  } catch (error) {
    console.error(error);
  }

  if (typeof firebaseAdminApp !== 'object' || firebaseAdminApp === null) {
    console.warn(
      'Firebase Admin app initialization failed.'
    );
  }

  if (typeof androidFirebaseAdminApp !== 'object' || androidFirebaseAdminApp === null) {
    console.warn(
      'Android Firebase Admin app initialization failed.'
    );
  }

  if (typeof iosFirebaseAdminApp !== 'object' || iosFirebaseAdminApp === null) {
    console.warn(
      'IOS Firebase Admin app initialization failed.'
    );
  }

  return { firebaseAdminApp, androidFirebaseAdminApp, iosFirebaseAdminApp };
}

// https://ithelp.ithome.com.tw/articles/10269342
// https://vercel.com/archer102125220/resume-web

firebaseAdminServerInit();

