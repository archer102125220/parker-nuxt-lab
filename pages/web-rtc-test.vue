<template>
  <div class="web_rtc_test_page">web-rtc-test</div>
</template>

<script setup>
import freeice from 'freeice';

useHeadMataData({
  title: 'WebRTC測試'
});

// https://medium.com/@hiro05097952/%E5%88%9D%E6%8E%A2-webrtc-%E6%89%8B%E6%8A%8A%E6%89%8B%E5%BB%BA%E7%AB%8B%E7%B7%9A%E4%B8%8A%E8%A6%96%E8%A8%8A-3-65e14b07cc87
// https://nuxt.com/modules/socket-io

console.log({ freeice: freeice() });
</script>

<style lang="scss" scoped>
.web_rtc_test_page {
}
</style>
