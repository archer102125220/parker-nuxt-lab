<template>
  <div class="server_sent_event_global_page">
    <!-- Hero Section -->
    <section class="server_sent_event_global_page-hero">
      <div class="server_sent_event_global_page-hero-background">
        <div class="server_sent_event_global_page-hero-background-overlay" />
      </div>

      <div class="server_sent_event_global_page-hero-content">
        <h1 class="server_sent_event_global_page-hero-content-title">
          {{ $t('sse_global_get_page.hero.title') }}
        </h1>
        <p class="server_sent_event_global_page-hero-content-subtitle">
          {{ $t('sse_global_get_page.hero.subtitle') }}
        </p>
        <p class="server_sent_event_global_page-hero-content-description">
          {{ $t('sse_global_get_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="server_sent_event_global_page-section">
      <p class="server_sent_event_global_page-section-label">接收到的 data：</p>
      <div class="server_sent_event_global_page-section-messages">
        <p
          v-for="(SSEMessage, index) in SSEMessageList"
          :key="index"
          class="server_sent_event_global_page-section-messages-item"
        >
          {{ SSEMessage }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('sse_global_get_page.hero.title')
});

import _cloneDeep from 'lodash/cloneDeep';

const SSEMessageList = ref([]);
const eventSource = useEventSource({
  channel: '/',
  open(event) {
    console.log({ event });
  },
  ping(event) {
    console.log({ pingEvent: event });
  },
  message(payload) {
    console.log({ payload });
    const newSSEMessageList = _cloneDeep(SSEMessageList.value);
    newSSEMessageList.push(payload?.data);
    SSEMessageList.value = newSSEMessageList;
  }
});
console.log({ eventSource });
watch(
  () => eventSource.croe,
  (newEventSource) => {
    console.log({ newEventSource });
  },
  { deep: true }
);
</script>

<style lang="scss">
.server_sent_event_global_page {
  min-height: 100vh;

  &-hero {
    position: relative;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    overflow: hidden;

    &-background {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #44a08d 0%, #4ecdc4 100%);

      &-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          135deg,
          rgba(68, 160, 141, 0.9) 0%,
          rgba(78, 205, 196, 0.85) 100%
        );
      }
    }

    &-content {
      position: relative;
      z-index: 1;
      max-width: 800px;
      text-align: center;

      &-title {
        margin: 0 0 8px 0;
        font-size: 36px;
        font-weight: 800;
        color: #ffffff;

        @media (max-width: 768px) {
          font-size: 28px;
        }
      }

      &-subtitle {
        margin: 0 0 12px 0;
        font-size: 18px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.95);
      }

      &-description {
        margin: 0;
        font-size: 14px;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.9);
      }
    }
  }

  &-section {
    padding: 40px 20px;

    &-label {
      margin: 0 0 16px 0;
      font-size: 16px;
      font-weight: 600;
      color: #2d3748;
    }

    &-messages {
      display: flex;
      flex-direction: column;
      gap: 8px;

      &-item {
        margin: 0;
        padding: 12px 16px;
        border-radius: 8px;
        background: #f7fafc;
        font-size: 14px;
        color: #4a5568;
      }
    }
  }
}
</style>
