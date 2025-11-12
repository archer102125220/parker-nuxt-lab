
import { firebase } from '@shared/third-party/firebase';

export default defineNuxtPlugin({
  name: 'firebase-plugin',

  async setup() {
    const Firebase = new firebase();

    const provide = { firebase };

    provide.firebaseFirestoreUpdate = function firebaseFirestoreUpdate(firebaseFirestore) {
      this.firebaseFirestore = firebaseFirestore;
    }.bind(provide);

    // client 需配合PWA載入完畢
    if (import.meta.server) {
      await Firebase.croeInit();
      await Firebase.appInit();

      // provide.firebaseFirestore = Firebase.store;
      provide.firebaseFirestoreUpdate(Firebase.store);
    }

    return {
      provide
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

      const { $store, $successMessage, $infoMessage, $pwa } = nuxtApp;

      // https://cn.vuejs.org/guide/essentials/watchers#watcheffect
      watchEffect(async () => {
        if ($pwa.needRefresh === true) {
          $infoMessage('偵測到PWA資源可更新，將在背景更新PWA資源，並在更新完成後自動重新載入．');
          $store.system.setPwaUpdataing(true);
          await $pwa.updateServiceWorker();
          $store.system.setPwaUpdataing(false);
        }
      });

      watchEffect(async () => {
        if ($pwa.swActivated === false) {
          $infoMessage('PWA開始安裝...');
          $store.system.setPwaUpdataing(true);
        } else {
          $successMessage('PWA安裝並啟用完成');
          $store.system.setPwaUpdataing(false);
        }
      });

      watchEffect(async () => {
        if ($pwa.offlineReady === true) {
          $successMessage('PWA資源載入完成');
        }
      });

      $store.system.setAgreeNotification(Firebase.getNotificationPermission());

      watchEffect(async () => {
        if ($pwa.isPWAInstalled === true || $pwa.swActivated === true || $pwa.offlineReady === true) {
          await Firebase.croeInit();
          await Firebase.appInit();

          $store.system.setFirebaseCroeInited(true);
          nuxtApp.$firebaseFirestoreUpdate(Firebase.store);
        }
      });
    }
  },
});