<template>
  <div class="youtube_test_page">
    <div class="youtube_test_page-content">
      <Youtube video-id="RTtmcqPXwuw" autoplay />
    </div>
  </div>
</template>

<script setup>
useHeadMataData({
  title: 'youtube整合測試'
});
</script>

<style lang="scss" scoped>
.youtube_test_page {
  /* Display & Box Model */
  // height: 100dvh;

  &-content {
    /* Display & Box Model */
    height: 80dvh;
  }
}
</style>
