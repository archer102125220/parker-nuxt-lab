
import { firebase } from '@utils/third-party/firebase';

export default defineNuxtPlugin({
  name: 'firebase-plugin',

  async setup() {
    const Firebase = new firebase();
    // client 需配合PWA載入完畢
    if (import.meta.server) {
      await Firebase.croeInit();
      await Firebase.appInit();
    }

    return {
      provide: {
        firebase,
        firebaseFirestore: Firebase.store
      }
    }
  },

  hooks: {
    // You can directly register Nuxt app runtime hooks here
    // 'app:created'() {
    //   const nuxtApp = useNuxtApp();
    //   // do something in the hook
    // }
    'app:beforeMount'() {
      const nuxtApp = useNuxtApp();

      const Firebase = new firebase();
      nuxtApp.provide('Firebase', Firebase);

      const { $store, $pwa } = nuxtApp;

      // https://cn.vuejs.org/guide/essentials/watchers#watcheffect
      // watchEffect(async () => {
      //   if ($pwa.needRefresh === true) {
      //     await $pwa.updateServiceWorker();
      //   }
      // });

      $store.system.setAgreeNotification(Firebase.getNotificationPermission());

      watchEffect(async () => {
        if ($pwa.offlineReady === true) {
          $store.system.setMessageState({ text: 'App ready to work offline', type: 'success' });
        }

        if ($pwa.isPWAInstalled === true || $pwa.swActivated === true) {
          await Firebase.croeInit();
          await Firebase.appInit();

          nuxtApp.provide('firebaseFirestore', Firebase.store);
          $store.system.setFirebaseCroeInited(true);
        }
      });
    }
  },
});