<template>
  <div class="youtube_test_page">
    <div class="youtube_test_page-content">
      <Youtube video-id="RTtmcqPXwuw" autoplay />
    </div>
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
useHead({
  title: 'youtube整合測試'
});
</script>

<style lang="scss" scoped>
.youtube_test_page {
  // height: 100dvh;
  &-content {
    height: 80dvh;
  }
}
</style>
