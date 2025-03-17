<template>
  <div class="customize_lazyload_test_page">
    <!-- <div style="height: 50vh" /> -->
    <img
      class="customize_lazyload_test_page-normal"
      src="/img/test-img/1e0ef282c7831f762deb4b4ded8592d5ff7962d832cebcf11709ae670e721560.jpg"
    />
    <img
      class="customize_lazyload_test_page-lazyload"
      v-customize-lazyload="'/img/test-img/1499231493_936.gif'"
    />
  </div>
</template>

<style lang="scss" scoped>
.customize_lazyload_test_page {
  &-normal {
    height: 100vh;
    width: 100%;
    margin-bottom: 100px;

    object-fit: contain;
    background-color: #89afff;
  }
  &-lazyload {
    height: 200px;
    width: 100%;

    object-fit: contain;
    background-color: #89afff;
  }
}
</style>
