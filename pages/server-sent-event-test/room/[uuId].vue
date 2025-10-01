<template>
  <section class="server_sent_event_route_param_page">
    <p></p>
  </section>
</template>

<script setup>
useHeadMataData({
  title: 'Server Sent Event route param分組測試'
});
definePageMeta({
  middleware: 'check-params-uuid'
});
</script>

<style lang="scss">
.server_sent_event_route_param_page {
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
