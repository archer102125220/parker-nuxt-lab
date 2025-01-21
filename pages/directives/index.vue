<template>
  <section class="directives_page">
    <p>
      為避免因套件版本相容性或專案性質不合適使用npm上相關工具之狀況，因此自己實作相關directives
    </p>
    <nav class="directives_page-content">
      <NuxtLink
        v-for="link in linkList"
        :key="link.to"
        class="directives_page-content-link"
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
  {
    to: '/directives/customize-ripple-test',
    label: '自製ripple directive測試'
  },
  {
    to: '/directives/customize-lazyload-test',
    label: '自製lazyload directive測試'
  }
]);
</script>

<style lang="scss">
.directives_page {
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
