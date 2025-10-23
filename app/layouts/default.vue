<template>
  <div class="defalut_layout">
    <LayoutHeader />
    <main class="defalut_layout-content">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup>
// const { $store } = useNuxtApp();
// const route = useRoute();
// const getRouteBaseName = useRouteBaseName();

// const mainClassName = computed(() =>
//   getRouteBaseName(route) === 'index' || $store.system.isIndexPage === true
//     ? 'defalut_layout-home_content'
//     : 'defalut_layout-content'
// );
</script>

<style lang="scss" scoped>
.defalut_layout {
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
