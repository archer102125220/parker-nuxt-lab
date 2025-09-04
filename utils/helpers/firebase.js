import { initializeApp, initializeServerApp } from 'firebase/app';
import {
  getAnalytics,
  logEvent,
  isSupported as analyticsIsSupported
} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore/lite';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported as messagingIsSupported
} from 'firebase/messaging';

import { POST_registerMessageToken } from '@/services/client/firebase-admin';

// https://firebase.google.com/docs/cloud-messaging/js/receive?hl=zh-cn#web-version-9_2

// Your web app's Firebase configuration
// For Firebase JS SDK v11.10.0 and later, measurementId is optional
export const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'parker-nuxt-lab.firebaseapp.com',
  projectId: 'parker-nuxt-lab',
  storageBucket: 'parker-nuxt-lab.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_GA_ID
};

let firebaseCroe;
const firebaseAnalytics = {
  app: null,
  logEvent: (...arg) => logEvent(...arg)
};
let firebaseDB;
let firebaseMessaging;
export function getFirebaseCroe() {
  return firebaseCroe;
}
export function getFirebaseAnalytics() {
  return firebaseAnalytics;
}
export function getFirebaseDB() {
  return firebaseDB;
}
export function getFirebaseMessaging() {
  return firebaseMessaging;
}

// Initialize server Firebase
export function firebaseCroeServerInit(firebaseConfig = FIREBASE_CONFIG) {
  if (import.meta.client) return { firebaseCroe };

  try {
    const newFirebaseCroe = initializeServerApp(firebaseConfig);
    firebaseCroe = newFirebaseCroe;
  } catch (error) {
    console.error(error);
  }

  return { firebaseCroe };
}

// Initialize client Firebase
export function firebaseCroeClientInit(firebaseConfig = FIREBASE_CONFIG) {
  if (import.meta.server) return { firebaseCroe };

  try {
    const newFirebaseCroe = initializeApp(firebaseConfig);
    firebaseCroe = newFirebaseCroe;
  } catch (error) {
    console.error(error);
  }

  return { firebaseCroe };
}
if (typeof window === 'object') {
  window.firebaseCroeClientInit = firebaseCroeClientInit;
}

// Initialize Firebase
export async function firebaseAppInit(currentFirebaseCroe) {
  if (import.meta.server) {
    return await firebaseAppServerInit(currentFirebaseCroe);
  } else {
    return await firebaseAppClientInit(currentFirebaseCroe);
  }
}
if (typeof window === 'object') {
  window.firebaseAppInit = firebaseAppInit;
}

export function firebaseAppServerInit(currentFirebaseCroe) {
  firebaseFirestore(currentFirebaseCroe);

  return { firebaseCroe: currentFirebaseCroe, firebaseDB };
}

export async function firebaseAppClientInit(currentFirebaseCroe = firebaseCroe) {
  await Promise.all([
    firebaseAnalyticsInit(currentFirebaseCroe),
    firebaseMessagingInit(currentFirebaseCroe)
  ]);

  firebaseFirestore(currentFirebaseCroe);

  return { firebaseCroe: currentFirebaseCroe, firebaseAnalytics, firebaseDB };
}
if (typeof window === 'object') {
  window.firebaseAppClientInit = firebaseAppClientInit;
}

export function firebaseFirestore(currentFirebaseCroe) {
  try {
    const newFirebaseDB = getFirestore(currentFirebaseCroe);

    firebaseDB = newFirebaseDB;
  } catch (error) {
    console.error(error);
  }

  return firebaseDB;
}

export async function firebaseAnalyticsInit(currentFirebaseCroe = firebaseCroe) {
  if (import.meta.server) return firebaseAnalytics;

  const isAnalyticsSupport = await analyticsIsSupported();

  if (isAnalyticsSupport === false) console.warn('firebase analytics is not Supported');

  try {
    if (typeof window === 'object' && isAnalyticsSupport === true) {
      const newFirebaseAnalytics = getAnalytics(currentFirebaseCroe);

      firebaseAnalytics.app = newFirebaseAnalytics;
    }
  } catch (error) {
    console.error(error);
  }

  return firebaseAnalytics;
}
if (typeof window === 'object') {
  window.firebaseAnalyticsInit = firebaseAnalyticsInit
}

export function getNotificationPermission() {
  if (import.meta.server || typeof window?.Notification === 'undefined') {
    return false;
  }
  return Notification.permission === 'granted';
}

export async function requestNotificationPermission() {
  try {
    const isMessagingSupport = await messagingIsSupported();

    if (isMessagingSupport === false) {
      console.warn('FCM is not Supported');
      return false;
    }
    console.log('Requesting permission...');

    console.log({ ['Notification.permission']: Notification.permission });
    if (Notification.permission === 'granted') {
      console.log('Notification permission granted.');
      return true;
    } else if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      console.log({ permission });
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        return true;
      }
    }
  } catch (error) {
    console.error(error);
  }
  return false;
}

export async function getServiceWorker(scope = '/') {
  if (
    'serviceWorker' in navigator &&
    typeof window.navigator.serviceWorker !== 'undefined'
  ) {
    const serviceWorker = await window.navigator.serviceWorker.getRegistration(
      scope
    );
    if (serviceWorker) return serviceWorker;
  }
  // throw new Error('The browser doesn`t support service worker.');

  return null;
}

export async function registerServiceWorker(scope = '/') {
  if (
    'serviceWorker' in navigator &&
    typeof window.navigator.serviceWorker !== 'undefined'
  ) {
    return await window.navigator.serviceWorker.register('/service-worker.js', {
      scope
    });
  }
  // throw new Error('The browser doesn`t support service worker.');

  return null;
}

export async function getOrRegisterServiceWorker(scope = '/') {
  const serviceWorker = await getServiceWorker(scope)
  if (serviceWorker) return serviceWorker;

  return await registerServiceWorker(scope);
}

export async function firebaseMessagingInit(currentFirebaseCroe = firebaseCroe) {
  if (import.meta.server) return firebaseMessaging;

  const isMessagingSupport = await messagingIsSupported();
  if (isMessagingSupport === false) console.warn('FCM is not Supported');

  const permission = getNotificationPermission();
  if (permission !== true) console.warn('firebaseMessagingInit: Notification Permissio.');

  if (isMessagingSupport === true && permission === true) {
    try {
      const serviceWorkerRegistration = await getServiceWorker();

      if (typeof serviceWorkerRegistration === 'undefined' || serviceWorkerRegistration === null) {
        throw new Error('The browser doesn\'t support service worker.')
      }

      const newFirebaseMessaging = getMessaging(currentFirebaseCroe);

      const token = await getToken(newFirebaseMessaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration
      });

      await POST_registerMessageToken({ token, os: 'web' });

      /*
        interface MessagePayload {
          readonly collapseKey: string; // 僅限 FCM 訊息才有
          readonly from: string;       // 訊息的發送者
          readonly messageId: string;  // 訊息的唯一 ID
          readonly messageType: string; // "push" 或 "data"

          readonly data?: { [key: string]: string }; // 如果有資料訊息，則包含此屬性

          readonly notification?: NotificationPayload; // 如果有通知訊息，則包含此屬性

          readonly rawData: object; // 原始訊息數據，可能包含更多低級別屬性
        }

        interface NotificationPayload {
          readonly title: string | undefined;
          readonly body: string | undefined;
          readonly image: string | undefined; // 如果設定了通知圖片
          // 還有其他可能的標準通知屬性，例如 icon, badge, click_action, tag, etc.
          // 這些屬性通常在 `notification` 物件內部，或者作為 `data` 的一部分，視如何發送而定
        }
      */

      onMessage(newFirebaseMessaging, payload => {
        try {
          // new Notification('測試', {
          //   body: payload.data?.msg,
          //   icon: '/img/favicon/favicon.ico'
          // });

          const notificationTitle =
            payload?.notification?.title || payload?.data?.title || '';
          const notificationBody =
            payload?.notification?.body || payload?.data?.msg || '';
          const notificationIcon =
            payload?.notification?.image || payload?.data?.img || '';

          serviceWorkerRegistration.showNotification(notificationTitle, {
            body: notificationBody,
            icon: notificationIcon || '/img/favicon/favicon.ico'
          });
        } catch (error) {
          console.error(error);
        }
      });

      return newFirebaseMessaging;
    } catch (error) {
      console.error(error);
    }
  }

  return firebaseMessaging;
}
if (typeof window === 'object') {
  window.firebaseMessagingInit = firebaseMessagingInit;
}
