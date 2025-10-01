<template>
  <section class="server_sent_event_test_page">
    <p class="server_sent_event_test_page-description">
      測試全域及依照route param做分組的 Server-Sent Event
    </p>

    <nav class="server_sent_event_test_page-content">
      <NuxtLink
        v-for="link in linkList"
        :key="link.to"
        class="server_sent_event_test_page-content-link"
        :to="link.to"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>
  </section>
</template>

<script setup>
useHeadMataData({
  title: 'Server Sent Event測試列表',
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} | Server Sent Event測試`
      : 'Server Sent Event測試';
  }
});
// https://www.cnblogs.com/ganto/articles/17917868.html
const nuxtApp = useNuxtApp();

const localePath = useLocalePath();
const linkList = computed(() => [
  {
    to: localePath('/server-sent-event-test/global'),
    label: 'Server Sent Event全域測試'
  },
  {
    to: localePath('/server-sent-event-test/room'),
    label: 'Server Sent Event route param分組測試'
  }
]);
</script>

<style lang="scss">
.server_sent_event_test_page {
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
