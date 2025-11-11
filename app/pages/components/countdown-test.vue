<template>
  <div class="countdown_test_page">
    <Countdown :initial-seconds="100" />
  </div>
</template>

<script setup>
useHeadMataData({
  title: '倒數計時組件測試'
});
const nuxtApp = useNuxtApp();
</script>

<style lang="scss" scoped>
.countdown_test_page {
}
</style>
