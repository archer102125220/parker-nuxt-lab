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
    // Display & Box Model
    flex: 1;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 24px;
    
    // Visual
    background: transparent;
  }
}
</style>
