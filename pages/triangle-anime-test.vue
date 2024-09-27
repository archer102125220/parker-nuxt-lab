<template>
  <div class="triangle_anime_test_page" @click="handleAnime">
    <AnimationTriangleEnter>
      <p>test</p>
    </AnimationTriangleEnter>
  </div>
</template>

<script setup>
// const nuxtApp = useNuxtApp();
useHead({
  title: 'css三角形滿版動畫測試'
});
</script>

<style lang="scss">
.triangle_anime_test_page {
  background-color: #f2f9ff;
  height: 100vh;
}
</style>
