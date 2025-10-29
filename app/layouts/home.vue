<template>
  <div class="home_layout">
    <LayoutHeader :has-back="false" />
    <main class="home_layout-content">
      <slot />
    </main>
    <LayoutFooter />
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
</script>

<style lang="scss" scoped>
.home_layout {
  display: flex;
  flex-direction: column;

  min-height: 100dvh;

  &-content {
    flex: 1;
    // min-height: 100vh;
    width: 80%;
    margin: auto;
  }
}
</style>
