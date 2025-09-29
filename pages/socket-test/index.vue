<template>
  <section class="socket_test_page">
    <div class="socket_test_page-description">
      <p>紀錄原生配合Nuxt3內建的websocket以及前後端皆由</p>
      <a target="_blank" href="https://socket.io/">socket.io</a>
      <p>實作的結果</p>
    </div>

    <nav class="socket_test_page-content">
      <NuxtLink
        v-for="link in linkList"
        :key="link.to"
        class="socket_test_page-content-link"
        :to="link.to"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>
  </section>
</template>

<script setup>
useHeadMataData({
  title: 'socket測試列表',
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | socket測試` : 'socket測試';
  }
});
// https://www.cnblogs.com/ganto/articles/17917868.html
const nuxtApp = useNuxtApp();

const localePath = useLocalePath();
const linkList = computed(() => [
  {
    to: localePath('/socket-test/socket.io'),
    label: '前後端皆由socket.io做處理'
  },
  {
    to: localePath('/socket-test/websocket'),
    label: '前端原生/後端Nuxt3內建'
  }
]);
</script>

<style lang="scss">
.socket_test_page {
  &-description {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
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
