<template>
  <div class="home_layout">
    <LayoutHeader
      class="home_layout-header"
      :has-back="false"
      :animation="animation"
    />
    <main class="home_layout-content">
      <slot />
    </main>
    <LayoutFooter class="home_layout-footer" :animation="animation" />
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
// const { $pwa } = nuxtApp;
// onMounted(() => {
//   console.log({ $pwa });
// });
const animation = computed(() => {
  if (import.meta.client) {
    return window.___IS_NUXT_INITED__ !== true;
  }
  return true;
});
onMounted(() => {
  console.log({ nuxtApp, ['nuxtApp?.isHydrating']: nuxtApp?.isHydrating });
  console.log('home_layout');
  window.___IS_NUXT_INITED__ = true;
});
</script>

<style lang="scss" scoped>
@keyframes headerEnterAnimation {
  from {
    opacity: 0;
    transform: translate(0px, -120px);
  }

  to {
    opacity: 1;
    transform: translate(0px, 0px);
  }
}
@keyframes footerEnterAnimation {
  from {
    opacity: 0;
    transform: translate(0px, 120px);
  }

  to {
    opacity: 1;
    transform: translate(0px, 0px);
  }
}

.home_layout {
  display: flex;
  flex-direction: column;

  min-height: 100dvh;

  &-header {
    &[animation='true'] {
      animation-name: headerEnterAnimation;
      animation-duration: 0.3s;
    }
  }

  &-footer {
    &[animation='true'] {
      animation-name: footerEnterAnimation;
      animation-duration: 0.3s;
    }
  }

  &-content {
    flex: 1;
    // min-height: 100vh;
    width: 80%;
    margin: auto;
  }
}
</style>
