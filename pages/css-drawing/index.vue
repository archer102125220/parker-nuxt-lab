<template>
  <div class="css_triangle_page">
    <p>主要以css繪圖及anime.js整合測試為主</p>
    <NuxtLink
      v-for="link in linkList"
      :key="link.to"
      class="css_triangle_page-content"
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
  { to: '/css-drawing/triangle-test', label: 'css三角形測試' },
  { to: '/css-drawing/triangle-full-test', label: 'css三角形滿版測試' },
  { to: '/css-drawing/triangle-anime-test', label: 'css三角形滿版動畫測試' }
]);
</script>

<style lang="scss">
.css_triangle_page {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  &-content {
    flex: 1;
    flex-basis: 400px;
  }
}
</style>
