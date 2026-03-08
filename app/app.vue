<template>
  <div class="root_style" :style="cssVariable">
    <NotificationPermission />

    <SpeedInsights />
    <Analytics />

    <!-- <NuxtPwaManifest /> -->
    <NuxtPwaAssets />

    <LoadingBar :loading="loading" position="sticky" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <client-only>
      <Message
        :message-state="messageState"
        @reset-message-state="resetMessageState"
      />
      <DialogModal
        :value="dialogSettings.trigger"
        :width="dialogSettings.width"
        :content="dialogSettings.content"
        :bg-color="dialogSettings.bgColor"
        :radius="dialogSettings.radius"
        :content-class="dialogSettings.contentClass"
        :content-props="dialogSettings.contentProps"
        :dialog-props="dialogSettings.dialogProps"
        :broswer-info="$store.system.broswerInfo"
        @handle-trigger="$store.system.setDialog"
      />

      <PWALoading />
    </client-only>

    <GoTop v-if="needGoTop" />
  </div>
</template>

<script setup>
import { SpeedInsights } from '@vercel/speed-insights/nuxt';
import { Analytics } from '@vercel/analytics/nuxt';
import _debounce from 'lodash/debounce';

useHead({
  meta: [
    {
      name: 'google-site-verification',
      content: import.meta.env.VITE_GOOGLE_SITE_VERIFICATION
    }
  ]
});

useSecurityNonce();

const NO_GO_TOP = [];

// const runtimeConfig = useRuntimeConfig();
useRequestInit(import.meta.env.VITE_API_BASE);

const nuxtApp = useNuxtApp();
const { $i18n, $dayjs, $store, $setLocalLanguage } = nuxtApp;

const gtm = useNuxtGtm();
const firebase = useNuxtFirebase();

const router = useRouter();
const route = useRoute();

const getRouteBaseName = useRouteBaseName();
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} | ${$i18n.t('system.titleTemplate')}`
      : $i18n.t('system.titleTemplate');
  }
});

nuxtApp.hook('page:start', () => {
  $store.system.setLoading(true);
});
nuxtApp.hook('page:finish', () => {
  $store.system.setLoading(false);
});

const removeWindowEventListener = ref(null);

const loading = computed(() => $store.system.loading);
const cssVariable = computed(() => {
  const _cssVariable = {};

  if (loading.value === true) {
    // _cssVariable['--root_cursor'] = 'wait';
    _cssVariable['--root_cursor'] = 'url(/img/icon/loadcat.gif), wait';
  }

  return _cssVariable;
});
const messageState = computed(() => $store.system.messageState || {});
const needGoTop = computed(() => {
  const routeName = getRouteBaseName(route);
  // const routeName = route.name;
  if (NO_GO_TOP.includes(routeName)) {
    return false;
  }
  return true;
});
const dialogSettings = computed(() => $store.system.dialog || {});

function resetMessageState() {
  $store.system.setMessageState({ text: '', type: 'success' });
}

const handleTrackData = _debounce(function handleTrackData(
  newRoutePath,
  newGtm,
  newFirebase
) {
  // console.log({ newRoutePath, newGtm });
  if (typeof newGtm === 'function') {
    // console.log('trackView', newRoutePath);
    newGtm({ event: 'scnOpen', url: newRoutePath });
    // newGtm('scnOpen', 'newRoutePath');
  }

  if (typeof newFirebase?.analytics?.log === 'function') {
    // console.log('newFirebase?.analytics?.log', newRoutePath);
    newFirebase.analytics.log({
      event: 'scnOpen',
      url: newRoutePath
    });
  }
}, 100);

watch(() => [route.path, gtm.value, firebase.value], handleTrackData);

watch(
  () => $i18n.locale.value,
  (newLocale) => {
    console.log('watch $i18n.locale.value', newLocale);
    $setLocalLanguage(newLocale);

    $dayjs.locale(newLocale.includes('en') ? 'en' : 'zh-tw');
    const _newLocale = newLocale || 'zh';
    useHead({
      htmlAttrs: {
        lang: _newLocale
      }
    });
    if (typeof document?.querySelector === 'function') {
      const metaLang = document.querySelector('#meta-lang');
      if (metaLang !== null) {
        metaLang.setAttribute('language', _newLocale);
        metaLang.language = _newLocale;
      }
    }

    console.log('watch $i18n.locale.value end');
  },
  { immediate: true }
);

onMounted(async () => {
  // console.log('onMounted', { gtm });
  if (typeof gtm.value === 'function') {
    // console.log('trackView onMounted', route.path);
    gtm.value({ event: 'scnOpen', url: route.path });
    // gtm.value('scnOpen', 'newRoutePath');
  }

  // $store.system.setDialog({
  //   trigger: true,
  //   content: 'Profile/Birthday',
  // });

  const query = route.query || {};
  const errorMsg = query.errorMsg;
  if (typeof errorMsg === 'string' && errorMsg !== '') {
    nuxtApp.$errorMessage(errorMsg);
  }
  const infoMsg = query.infoMsg;
  if (typeof infoMsg === 'string' && infoMsg !== '') {
    nuxtApp.$infoMessage(infoMsg);
  }
  const warnMsg = query.warnMsg;
  if (typeof warnMsg === 'string' && warnMsg !== '') {
    nuxtApp.$warningMessage(warnMsg);
  }
  const successMsg = query.successMsg;
  if (typeof successMsg === 'string' && successMsg !== '') {
    nuxtApp.$successMessage(successMsg);
  }
  if (typeof $store.clientInit === 'function') {
    removeWindowEventListener.value = await $store.clientInit();
  }
  router.replace({
    query: {
      ...query,
      errorMsg: undefined,
      successMsg: undefined,
      warnMsg: undefined,
      infoMsg: undefined
    }
  });
});
onUnmounted(() => {
  if (typeof removeWindowEventListener.value === 'function') {
    removeWindowEventListener.value();
  }
});
</script>

<style lang="scss">
.root_style {
  /* Misc */
  --loading_cursor: var(--root_cursor);

  /* Misc */
  cursor: var(--root_cursor);
  // * {
  //   cursor: var(--root_cursor);
  // }
}
.page-enter-active,
.page-leave-active,
.layout-enter-active,
.layout-leave-active {
  /* Animation */
  transition: all 0.2s ease-out;
}
.page-enter-from,
.page-leave-to,
.layout-enter-from,
.layout-leave-to {
  /* Visual */
  filter: blur(1rem);
}
.page-enter-from,
.layout-enter-from {
  /* Visual */
  opacity: 0;
}
.page-leave-to,
.layout-leave-to {
  /* Visual */
  opacity: 1;
}
</style>
