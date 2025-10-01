<template>
  <section class="server_sent_event_global_page">
    <p></p>
  </section>
</template>

<script setup>
useHeadMataData({
  title: 'Server Sent Event全域測試'
});
</script>

<style lang="scss">
.server_sent_event_global_page {
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
