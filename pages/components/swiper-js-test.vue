<template>
  <div class="swiper_js_test_page">
    <SwiperJs
      v-model="slide"
      should-fill-height
      :slide-list="slideList"
      class="swiper_js_test_page-content"
    >
      <template #default="{ item, index, isSliderMoveing }">
        <div class="swiper_js_test_page-content-slide">
          <p>item: {{ item }}</p>
          <p>index: {{ index }}</p>
          <p>isSliderMoveing: {{ `${isSliderMoveing}` }}</p>
        </div>
      </template>
    </SwiperJs>
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
  height: 50dvh;
  // min-height: 100dvh;
  overflow-y: auto;

  &-content {
    // width: 100%;
    height: 100%;
    overflow-x: hidden;

    &-slide {
      height: 100%;
      overflow: hidden;
    }
  }
}
</style>
