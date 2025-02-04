<template>
  <div class="swiper_js_test_page">
    <SwiperJs
      v-model="slide"
      should-fill-height
      :slide-list="slideList"
      class="swiper_js_test_page-content"
    />
    <SwiperJs
      v-model="slideLoop"
      loop
      overflow
      has-pagination
      :autoplay-delay="3000"
      :slide-list="slideList"
      class="swiper_js_test_page-content"
    />
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
useHead({
  title: 'Swiper.js整合測試'
});

const slide = ref(0);
const slideLoop = ref(0);

const slideList = computed(() => {
  const _tabList = [];
  for (let i = 0; i <= 100; i++) {
    // _tabList.push(i);
    let slide = '';
    for (let j = i; j >= 0; j--) {
      slide += j;
    }
    _tabList.push(slide);
  }
  return _tabList;
});
</script>

<style lang="scss" scoped>
.swiper_js_test_page {
  // width: 100dvw;
  height: 90dvh;
  // min-height: 100dvh;
  &-content {
    // width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
}
</style>
