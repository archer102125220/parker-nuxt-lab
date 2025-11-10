<template>
  <section class="triangle_anime_test_page">
    <AnimationTriangleEnter :is-mobile="$store.system.isMobile">
      <p>test</p>
    </AnimationTriangleEnter>
  </section>
</template>

<script setup>
useHeadMataData({
  title: 'css三角形滿版動畫測試'
});
</script>

<style lang="scss">
.triangle_anime_test_page {
  background-color: #f2f9ff;
  height: 100vh;
}
</style>
