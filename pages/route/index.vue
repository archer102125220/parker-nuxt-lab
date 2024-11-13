<template>
  <div class="route_test_page">
    <p>主要用作複現狀況，篇筆記用途的測試</p>
    <NuxtLink
      v-for="link in linkList"
      :key="link.to"
      class="route_test_page-content"
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
  { to: '/route/query-back-test', label: '路由query與上一頁測試' },
  { to: '/route/params-back-test/0', label: '路由參數與上一頁測試' }
]);
</script>

<style lang="scss">
.route_test_page {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  &-content {
    flex: 1;
    flex-basis: 400px;
  }
}
</style>
