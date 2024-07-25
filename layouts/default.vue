<template>
  <div class="defalut_layout">
    <!-- <LayoutHeader /> -->
    <main :class="mainClassName">
      <slot />
    </main>
    <!-- <LayoutFooter /> -->
  </div>
</template>

<script setup>
const { $store } = useNuxtApp();
const route = useRoute();
const getRouteBaseName = useRouteBaseName();

const mainClassName = computed(() =>
  getRouteBaseName(route) === 'index' || $store.system.isIndexPage === true
    ? 'defalut_layout-home_content'
    : 'defalut_layout-content'
);
</script>

<style lang="scss" scoped>
.defalut_layout {
  // height: 100vh;
  width: 100vw;
  // width: 1210px;
  // margin: auto;
  overflow: auto;
  @include mobile {
    // height: auto;
    overflow: unset;
    // width: 327px;
  }
  &-content {
    width: 1210px;
    max-width: 100%;
    min-height: 100vh;
    // margin: 0 40px;
    margin: auto;
    @include mobile {
      width: 327px;
      // margin: 0 20px;
    }
    @include tabletOnly {
      width: calc(100% - 20px);
      margin: 20px 10px;
    }
  }
  &-home_content {
    min-height: 100vh;
  }
}
</style>