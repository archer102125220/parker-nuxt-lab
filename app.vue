<template>
  <div :style="$store.system.loading === true ? 'cursor: wait;' : ''">
    <!-- <NuxtPwaManifest /> -->
    <NuxtPwaAssets />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <client-only>
      <LoadingBar :loading="loading" position="fixed" />
      <Message
        :message-state="messageState"
        @reset-message-state="resetMessageState"
      />
      <DialogModal
        :trigger="$store.system.dialog?.trigger"
        :width="$store.system.dialog?.width"
        :content="$store.system.dialog?.content"
        :bg-color="$store.system.dialog?.bgColor"
        :radius="$store.system.dialog?.radius"
        :content-class="$store.system.dialog?.contentClass"
        :content-props="$store.system.dialog?.contentProps"
        :dialog-props="$store.system.dialog?.dialogProps"
        :broswer-info="$store.system.broswerInfo"
        @handle-trigger="$store.system.setDialog"
      />
    </client-only>
    <GoTop v-if="needGoTop" :px="goTopPx" />
  </div>
</template>

<script setup>
const NO_GO_TOP = [];

const nuxtApp = useNuxtApp();
const { $i18n, $dayjs, $store } = nuxtApp;

const router = useRouter();
const route = useRoute();
// console.log(route);
const getRouteBaseName = useRouteBaseName();
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} | ${$i18n.t('system.titleTemplate')}`
      : $i18n.t('system.titleTemplate');
  },
  meta: [
    { id: 'meta-lang', language: $i18n.locale.value },
    {
      copyright: `Copyright © ${$dayjs().year()} Parker Chen. All rights reserved.`
    }
  ]
});

nuxtApp.hook('page:start', () => {
  $store.system.setLoading(true);
});
nuxtApp.hook('page:finish', () => {
  $store.system.setLoading(false);
});

const goTopPx = ref(100);
const loading = computed(() => $store.system.loading);
const messageState = computed(() => $store.system.messageState || {});
const needGoTop = computed(() => {
  const routeName = getRouteBaseName(route);
  if (NO_GO_TOP.includes(routeName)) {
    return false;
  }
  return true;
});

function resetMessageState() {
  $store.system.setMessageState({ text: '', type: 'success' });
}

watch(
  () => $i18n.locale.value,
  (newLocale) => {
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
  },
  { immediate: true }
);

onMounted(async () => {
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
    await $store.clientInit();
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
  window.removeEventListener('resize', window._pluginwareHandleResize_);
});
</script>

<style>
.page-enter-active,
.page-leave-active,
.layout-enter-active,
.layout-leave-active {
  transition: all 0.2s ease-out;
}
.page-enter-from,
.page-leave-to,
.layout-enter-from,
.layout-leave-to {
  filter: blur(1rem);
}
.page-enter-from,
.layout-enter-from {
  opacity: 0;
}
.page-leave-to,
.layout-leave-to {
  opacity: 1;
}
</style>
