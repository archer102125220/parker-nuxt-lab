<template>
  <div class="index_page">
    <NuxtLink
      v-for="link in linkList"
      :key="link.to"
      class="index_page-content"
      :to="link.to"
    >
      {{ link.label }}
    </NuxtLink>
  </div>
</template>

<script setup>
// https://www.cnblogs.com/ganto/articles/17917868.html
const nuxtApp = useNuxtApp();

const linkList = computed(() => [
  { to: '/tab-test', label: 'Tabs組件測試' },
  { to: '/scroll-fetch-test', label: '下拉重載/無限滾動測試' },
  { to: '/wang-editor-test', label: 'WangEditor（HTML編輯器）測試' },
  { to: '/youtube-test', label: 'Youtube測試' },
  { to: '/swiper-js-test', label: 'SwiperJs測試' },
  { to: '/swiper-test', label: '自製Swiper測試' },
  { to: '/components-test', label: '組件綜合測試' },
  { to: '/triangle-test', label: 'css三角形測試' },
  { to: '/triangle-full-test', label: 'css三角形滿版測試' },
  { to: '/triangle-anime-test', label: 'css三角形滿版動畫測試' },
  { to: '/query-back-test', label: '路由query與上一頁測試' },
  { to: '/params-back-test/0', label: '路由參數與上一頁測試' }
]);
</script>

<style lang="scss">
.index_page {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  &-content {
    flex: 1;
    flex-basis: 400px;
  }
}
</style>
