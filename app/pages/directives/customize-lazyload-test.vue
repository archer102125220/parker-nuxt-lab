<template>
  <section class="customize_lazyload_test_page">
    <!-- <div style="height: 50vh" /> -->
    <img
      class="customize_lazyload_test_page-normal"
      src="/img/test-img/1e0ef282c7831f762deb4b4ded8592d5ff7962d832cebcf11709ae670e721560.jpg"
    />
    <img
      class="customize_lazyload_test_page-lazyload"
      v-customize-lazyload="'/img/test-img/1499231493_936.gif'"
    />
  </section>
</template>

<script setup>
useHeadMataData({
  title: '自製lazyload directive測試'
});
</script>

<style lang="scss" scoped>
.customize_lazyload_test_page {
  &-normal {
    /* Display & Box Model */
    width: 100%;
    height: 100vh;
    margin-bottom: 100px;

    /* Visual */
    background-color: #89afff;
    object-fit: contain;
  }
  &-lazyload {
    /* Display & Box Model */
    width: 100%;
    height: 200px;

    /* Visual */
    background-color: #89afff;
    object-fit: contain;
  }
}
</style>
