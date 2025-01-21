<template>
  <section class="route_test_page">
    <p>主要用作複現狀況，篇筆記用途的測試</p>
    <nav class="route_test_page-content">
      <NuxtLink
        v-for="link in linkList"
        :key="link.to"
        class="route_test_page-content-link"
        :to="link.to"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>
  </section>
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
  &-content {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 8px;

    &-link {
      flex: 1;
      flex-basis: 400px;
    }
  }
}
</style>
