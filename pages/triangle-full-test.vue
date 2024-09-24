<template>
  <div class="triangle_full_test_page">
    <Triangle
      class="triangle_full_test_page-left"
      height="100vh"
      width="100vw"
      angle-upper-left
    />
    <Triangle
      class="triangle_full_test_page-right"
      height="100vh"
      width="100vw"
      angle-lower-right
      color="rgb(147, 147, 255)"
    />
  </div>
</template>

<script setup>
useHead({
  title: 'css三角形滿版測試'
});
</script>

<style lang="scss">
.triangle_full_test_page {
  &-left {
    position: fixed;
    top: 0;
    left: 0;
  }

  &-right {
    position: fixed;
    right: 0;
    bottom: 0;
  }
}
</style>
