<template>
  <div class="sse_room_post_page">
    <!-- Hero Section -->
    <section class="sse_room_post_page-hero">
      <div class="sse_room_post_page-hero-background">
        <div class="sse_room_post_page-hero-background-overlay" />
      </div>

      <div class="sse_room_post_page-hero-content">
        <h1 class="sse_room_post_page-hero-content-title">
          {{ $t('sse_room_post_page.hero.title') }}
        </h1>
        <p class="sse_room_post_page-hero-content-subtitle">
          {{ $t('sse_room_post_page.hero.subtitle') }}
        </p>
        <p class="sse_room_post_page-hero-content-description">
          {{ $t('sse_room_post_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="sse_room_post_page-section">
      <!-- Room Info -->
      <div class="sse_room_post_page-section-room_info">
        <div class="sse_room_post_page-section-room_info-row">
          <span class="sse_room_post_page-section-room_info-row-label">Room ID:</span>
          <code class="sse_room_post_page-section-room_info-row-id">{{ route.params.uuId }}</code>
          <v-btn
            icon
            size="x-small"
            variant="text"
            class="sse_room_post_page-section-room_info-row-copy"
            title="複製 Room ID"
            @click="copyRoomId"
          >
            <v-icon size="16">{{ copiedId ? 'mdi-check' : 'mdi-content-copy' }}</v-icon>
          </v-btn>
          <span v-if="copiedId" class="sse_room_post_page-section-room_info-row-feedback">已複製！</span>
        </div>
        <div class="sse_room_post_page-section-room_info-row">
          <span class="sse_room_post_page-section-room_info-row-label">分享網址:</span>
          <v-btn
            size="small"
            variant="tonal"
            color="primary"
            class="sse_room_post_page-section-room_info-row-url_btn"
            @click="copyUrl"
          >
            <v-icon size="16" class="mr-1">{{ copiedUrl ? 'mdi-check' : 'mdi-link' }}</v-icon>
            {{ copiedUrl ? '已複製網址！' : '複製網址' }}
          </v-btn>
        </div>
      </div>


      <!-- TODO: 發送訊息功能需要調整伺服器端結構
           目前 SSE 是單向通訊（伺服器→客戶端），要實現發送訊息需要：
           1. 建立共享的 EventEmitter 或訊息佇列 (可參考 server/utils/eventEmitter.js)
           2. 新增 POST endpoint 接收客戶端訊息並觸發事件
           3. SSE 連線訂閱該事件來廣播訊息給同房間的其他客戶端
      -->
      <!--
      <div class="sse_room_post_page-section-send">
        <h3 class="sse_room_post_page-section-send-title">發送訊息</h3>
        <div class="sse_room_post_page-section-send-form">
          <v-text-field
            v-model="messageToSend"
            label="輸入訊息"
            placeholder="輸入要發送的測試訊息..."
            class="sse_room_post_page-section-send-form-input"
            hide-details
          />
          <v-btn
            color="primary"
            :disabled="!messageToSend"
            :loading="sending"
            @click="sendMessage"
          >
            發送
          </v-btn>
        </div>
      </div>
      -->

      <!-- Messages -->
      <p class="sse_room_post_page-section-label">接收到的 data：</p>
      <div class="sse_room_post_page-section-messages">
        <p
          v-for="(SSEMessage, index) in SSEMessageList"
          :key="index"
          class="sse_room_post_page-section-messages-item"
        >
          {{ SSEMessage }}
        </p>
        <p v-if="SSEMessageList.length === 0" class="sse_room_post_page-section-messages-empty">
          尚未收到任何訊息...
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import _cloneDeep from 'lodash/cloneDeep';
const { t } = useI18n();

useHeadMataData({
  title: t('sse_room_post_page.hero.title')
});
definePageMeta({
  middleware: 'check-params-uuid'
});
const route = useRoute();

// Copy states
const copiedId = ref(false);
const copiedUrl = ref(false);

// TODO: Send message states (功能暫時停用)
// const messageToSend = ref('');
// const sending = ref(false);

async function copyRoomId() {
  try {
    await navigator.clipboard.writeText(route.params.uuId);
    copiedId.value = true;
    setTimeout(() => {
      copiedId.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
}

async function copyUrl() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copiedUrl.value = true;
    setTimeout(() => {
      copiedUrl.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy URL:', err);
  }
}

// TODO: 發送訊息功能需要調整伺服器端結構，詳見 template 中的 TODO 說明
// async function sendMessage() {
//   if (!messageToSend.value) return;
//
//   sending.value = true;
//   try {
//     await $fetch(`/api/server-sent-event/room/${route.params.uuId}`, {
//       method: 'POST',
//       body: { message: messageToSend.value }
//     });
//     messageToSend.value = '';
//   } catch (err) {
//     console.error('Failed to send message:', err);
//   } finally {
//     sending.value = false;
//   }
// }

const SSEMessageList = ref([]);
const postEventSource = usePostEventSource({
  channel: `/room/${route.params.uuId}`,
  payload: {
    test: 'test'
  },
  eventList: [
    {
      name: 'room',
      handler(payload) {
        console.log({ payload });
        const newSSEMessageList = _cloneDeep(SSEMessageList.value);
        newSSEMessageList.push(payload?.data);
        SSEMessageList.value = newSSEMessageList;
      }
    }
  ]
});
watch(
  () => postEventSource.croe,
  (newPostEventSource) => {
    console.log({ newPostEventSource });
  },
  { deep: true }
);
</script>

<style lang="scss">
.sse_room_post_page {
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
    max-width: 800px;
    margin: 0 auto;

    &-room_info {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 24px;
      padding: 16px;
      border-radius: 8px;
      background: #e2e8f0;

      &-row {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;

        &-label {
          font-size: 14px;
          font-weight: 600;
          color: #4a5568;
        }

        &-id {
          padding: 4px 8px;
          border-radius: 4px;
          background: #fff;
          font-family: monospace;
          font-size: 13px;
          color: #44a08d;
        }

        &-copy {
          margin-left: 4px;
        }

        &-feedback {
          font-size: 12px;
          color: #44a08d;
        }

        &-url_btn {
          text-transform: none;
        }
      }
    }

    &-send {
      margin-bottom: 24px;
      padding: 16px;
      border-radius: 8px;
      background: #f0fdf4;
      border: 1px solid #86efac;

      &-title {
        margin: 0 0 12px 0;
        font-size: 16px;
        font-weight: 600;
        color: #166534;
      }

      &-form {
        display: flex;
        gap: 12px;
        align-items: center;

        &-input {
          flex: 1;
        }
      }
    }

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

      &-empty {
        margin: 0;
        padding: 24px;
        border-radius: 8px;
        background: #f7fafc;
        font-size: 14px;
        color: #a0aec0;
        text-align: center;
      }
    }
  }
}
</style>
