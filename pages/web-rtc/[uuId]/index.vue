<template>
  <section class="web_rtc_page">
    <p class="web_rtc_page-description">WebRTC的實作測試，主要分爲：</p>

    <nav class="web_rtc_page-content">
      <NuxtLink
        v-for="link in linkList"
        :key="link.to"
        class="web_rtc_page-content-link"
        :to="link.to"
      >
        {{ link.label }}
      </NuxtLink>
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
definePageMeta({
  middleware: 'check-params-uuid'
});
const route = useRoute();
console.log(route);

const localePath = useLocalePath();
const linkList = computed(() => [
  {
    to: localePath(`/web-rtc/${route.params.uuId}/socket.io`),
    label: '配合socket.io實作'
  },
  {
    to: localePath(`/web-rtc/${route.params.uuId}/websocket`),
    label: '配合前端原生/後端Nuxt3內建實作'
  },
  {
    to: localePath(`/web-rtc/${route.params.uuId}/server-sent-event`),
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
      flex-basis: 400px;
    }
  }
}
</style>
