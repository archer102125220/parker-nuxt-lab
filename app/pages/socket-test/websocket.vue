<template>
  <div class="websocket_page">
    <!-- Hero Section -->
    <section class="websocket_page-hero">
      <div class="websocket_page-hero-background">
        <div class="websocket_page-hero-background-overlay" />
      </div>

      <div class="websocket_page-hero-content">
        <h1 class="websocket_page-hero-content-title">
          {{ $t('websocket_page.hero.title') }}
        </h1>
        <p class="websocket_page-hero-content-subtitle">
          {{ $t('websocket_page.hero.subtitle') }}
        </p>
        <p class="websocket_page-hero-content-description">
          {{ $t('websocket_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="websocket_page-section">
      <!-- Send Message Form -->
      <div class="websocket_page-section-send">
        <h3 class="websocket_page-section-send-title">發送訊息</h3>
        <form class="websocket_page-section-send-form" @submit.prevent="sendMessage">
          <v-text-field
            v-model="messageToSend"
            label="輸入訊息"
            placeholder="輸入要發送的測試訊息..."
            class="websocket_page-section-send-form-input"
            hide-details
          />
          <v-btn
            type="submit"
            color="primary"
            :disabled="!messageToSend"
          >
            發送
          </v-btn>
        </form>
      </div>

      <p class="websocket_page-section-label">接收到的 data：</p>
      <div class="websocket_page-section-messages">
        <p
          v-for="(webSocketMessage, index) in webSocketMessageList"
          :key="index"
          class="websocket_page-section-messages-item"
        >
          {{ webSocketMessage }}
        </p>
        <p v-if="webSocketMessageList.length === 0" class="websocket_page-section-messages-empty">
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
  title: t('websocket_page.hero.title')
});

const webSocket = useWebSocket(
  {
    channel: '/',
    message: onMessage,
    listener: {
      ['websocket-test']: onMessage,
      // 監聽廣播事件
      ['broadcast-message']: onMessage
    }
  },
  null,
  function (newWebSocket) {
    newWebSocket.send('websocket-test', {
      a: 'b',
      c: [],
      testData: 'websocket test Data'
    });
    newWebSocket.send('message', {
      a: 'b',
      c: [],
      testData: 'websocket test Data'
    });
  }
);

const webSocketMessageList = ref([]);
const messageToSend = ref('');

function onMessage(event) {
  try {
    // console.log({ event, data: event.data });
    const payload = JSON.parse(event.data);
    if (payload.data) {
      const newWebSocketMessage = _cloneDeep(webSocketMessageList.value);
      newWebSocketMessage.push(payload.data);
      webSocketMessageList.value = newWebSocketMessage;
    }
  } catch (e) {
    console.log('onMessage error', e);
  }
}

function sendMessage() {
  if (!messageToSend.value || !webSocket.value) return;

  // 使用 broadcast-message 事件，讓所有連線都能收到
  webSocket.value.send('broadcast-message', {
    content: messageToSend.value,
    timestamp: new Date().toISOString()
  });
  messageToSend.value = '';
}

watch(
  () => webSocket.value,
  (newWebSocket) => {
    console.log({ newWebSocket });
  },
  { deep: true }
);
</script>

<style lang="scss">
.websocket_page {
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
