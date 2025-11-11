<template>
  <section class="socket_test_page">
    <div class="socket_test_page-description">
      <p>紀錄原生配合Nuxt4內建的websocket以及前後端皆由</p>
      <a target="_blank" href="https://socket.io/">socket.io</a>
      <p>實作的結果</p>
    </div>

    <v-img
      class="socket_test_page-banner"
      max-height="400"
      cover
      src="/img/socket/socket-v.05.webp"
    />

    <p
      v-if="$store.system.supportWebsocket === false"
      class="socket_test_page-warning"
    >
      *當前部署環境可能不支援 Websocket （如：vercel等部署平台），可能會無效
    </p>

    <nav class="socket_test_page-content">
      <!-- <NuxtLink
        v-for="link in linkList"
        :key="link.to"
        class="socket_test_page-content-link"
        :to="link.to"
      >
        {{ link.label }}
      </NuxtLink> -->

      <LinkCard
        v-for="link in linkList"
        :key="link.to"
        :to="link.to"
        :banner="link.banner"
        :label="link.label"
        class="socket_test_page-content-link"
      />
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
    label: '前端原生/後端Nuxt4內建'
  }
]);
</script>

<style lang="scss">
.socket_test_page {
  &-description {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    margin-bottom: 8px;
  }

  &-warning {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  &-banner {
    width: 100%;
    margin-bottom: 8px;
  }

  &-content {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 8px;

    &-link {
      flex: 1;
      flex-basis: 150px;
    }
  }
}
</style>
