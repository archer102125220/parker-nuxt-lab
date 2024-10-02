<template>
  <div class="home_layout">
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
    ? 'home_layout-home_content'
    : 'home_layout-content'
);
</script>

<style lang="scss" scoped>
.home_layout {
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
