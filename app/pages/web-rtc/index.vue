<template>
  <section class="web_rtc_page">
    <p>
      目前視訊功能已初步完成，但是詳細的流程尚未完成，若要測試需手動複製網址才能做測試
    </p>
    <p class="web_rtc_page-description">WebRTC的實作測試，主要分爲：</p>

    <nav class="web_rtc_page-content">
      <!-- <NuxtLink
        v-for="link in linkList"
        :key="link.to"
        class="web_rtc_page-content-link"
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
        class="web_rtc_page-content-link"
      />
    </nav>
  </section>
</template>

<script setup>
useHeadMataData({
  title: 'WebRTC測試列表',
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | WebRTC測試` : 'WebRTC測試';
  }
});

const localePath = useLocalePath();
const linkList = computed(() => [
  {
    to: localePath(`/web-rtc/socket.io`),
    label: '配合socket.io實作'
  },
  {
    to: localePath(`/web-rtc/websocket`),
    label: '配合前端原生/後端Nuxt4內建實作'
  },
  {
    to: localePath(`/web-rtc/server-sent-event`),
    label: '配合SSE實作'
  }
]);
</script>

<style lang="scss">
.web_rtc_page {
  &-description {
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
