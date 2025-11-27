// import _cloneDeep from 'lodash/cloneDeep';

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

    // 'service-worker:registered'(serviceWorkerRegisteredEvent) {
    'service-worker:registered'() {
      const { $pwa, $store } = useNuxtApp();
      if ($pwa.swActivated === false) {
        // $infoMessage('PWA開始安裝...');
        $store.system.setPwaLoading(true);
      }

      // console.log({ serviceWorkerRegisteredEvent, $pwa: _cloneDeep($pwa) });
    },
    // async 'service-worker:activated'(serviceWorkerActivatedEvent) {
    async 'service-worker:activated'() {
      const { $store, $successMessage, $infoMessage, $pwa, $Firebase, $firebaseFirestoreUpdate } = useNuxtApp();

      watchEffect(() => {
        if ($pwa.swActivated === false) {
          // $infoMessage('正在安裝 PWA 核心資源...');
          $store.system.setPwaLoading(true);
        } else {
          // $successMessage('PWA 已就緒！其他資源將在需要時自動載入。');
          $store.system.setPwaLoading(false);
        }
      }, { immediate: true });

      // https://cn.vuejs.org/guide/essentials/watchers#watcheffect
      watchEffect(async () => {
        if ($pwa.needRefresh === true) {
          $infoMessage('偵測到PWA資源可更新，將在背景更新PWA資源。');
          $store.system.setPwaLoading(true);

          // await $pwa.updateServiceWorker();
          await $pwa.updateServiceWorker(true);
          // await $pwa.updateServiceWorker(false);

          await nextTick();
          await new Promise((resolve) => window.requestAnimationFrame(resolve));

          $successMessage('PWA 更新完成。');
          $store.system.setPwaLoading(false);
        }
      }, { immediate: true });

      watchEffect(() => {
        if ($pwa.offlineReady === true) {
          // $successMessage('PWA資源載入完成');
          $successMessage('PWA 已就緒！其他資源將在需要時自動載入。');
        }
      }, { immediate: true });

      $store.system.setAgreeNotification($Firebase.getNotificationPermission());

      await $Firebase.croeInit();
      await $Firebase.appInit();

      $store.system.setFirebaseCroeInited(true);
      $firebaseFirestoreUpdate($Firebase.store);

      // console.log({ serviceWorkerActivatedEvent, $pwa: _cloneDeep($pwa) });
    },
    'app:beforeMount'() {
      const nuxtApp = useNuxtApp();

      const Firebase = new firebase();
      nuxtApp.provide('Firebase', Firebase);
    }
  },
});