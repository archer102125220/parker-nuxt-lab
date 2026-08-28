<script setup>
definePageMeta({
  middleware: 'generate-params-uuid'
});
</script>

<template>
  <div class="web_rtc_room_redirect_page">
    <div class="web_rtc_room_redirect_page-loader">
      <v-progress-circular indeterminate color="primary" size="64" />
      <p class="web_rtc_room_redirect_page-loader-text">
        {{ $t('web_rtc_page.creating_room') }}
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.web_rtc_room_redirect_page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f7fafc 0%, #e2e8f0 100%);

  &-loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    &-text {
      font-size: 18px;
      font-weight: 500;
      color: #4a5568;
    }
  }
}
</style>
