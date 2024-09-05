<template>
  <div class="swiper_js_test_page">
    <SwiperJs
      v-model="slide"
      :slide-list="slideList"
      class="swiper_js_test_page-content"
    />
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();

const slide = ref(0);

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
  // width: 100vw;
  &-content {
    // width: 100%;
    overflow-x: hidden;
  }
}
</style>
