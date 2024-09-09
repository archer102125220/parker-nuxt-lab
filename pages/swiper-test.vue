<template>
  <div class="swiper_test_page">
    <Swiper
      v-model="slide"
      should-fill-height
      :slide-list="slideList"
      class="swiper_test_page-content"
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
.swiper_test_page {
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
