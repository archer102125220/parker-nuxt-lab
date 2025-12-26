<template>
  <div class="socket_io_page">
    <!-- Hero Section -->
    <section class="socket_io_page-hero">
      <div class="socket_io_page-hero-background">
        <div class="socket_io_page-hero-background-overlay" />
      </div>

      <div class="socket_io_page-hero-content">
        <h1 class="socket_io_page-hero-content-title">
          {{ $t('socket_io_page.hero.title') }}
        </h1>
        <p class="socket_io_page-hero-content-subtitle">
          {{ $t('socket_io_page.hero.subtitle') }}
        </p>
        <p class="socket_io_page-hero-content-description">
          {{ $t('socket_io_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="socket_io_page-section">
      <div class="socket_io_page-section-status">
        <span class="socket_io_page-section-status-label">連線狀態:</span>
        <span
          class="socket_io_page-section-status-indicator"
          :css-connected="socketIoClientConnected"
        >
          {{ socketIoClientConnected ? '已連線' : '未連線' }}
        </span>
      </div>

      <!-- Send Message Form -->
      <div class="socket_io_page-section-send">
        <h3 class="socket_io_page-section-send-title">發送訊息</h3>
        <form class="socket_io_page-section-send-form" @submit.prevent="sendMessage">
          <v-text-field
            v-model="messageToSend"
            label="輸入訊息"
            placeholder="輸入要發送的測試訊息..."
            class="socket_io_page-section-send-form-input"
            hide-details
            :disabled="!socketIoClientConnected"
          />
          <v-btn
            type="submit"
            color="primary"
            :disabled="!messageToSend || !socketIoClientConnected"
          >
            發送
          </v-btn>
        </form>
      </div>

      <p class="socket_io_page-section-label">接收到的 data：</p>
      <div class="socket_io_page-section-messages">
        <p
          v-for="(socketIoClientMessage, index) in socketIoClientMessageList"
          :key="index"
          class="socket_io_page-section-messages-item"
        >
          {{ socketIoClientMessage }}
        </p>
        <p v-if="socketIoClientMessageList.length === 0" class="socket_io_page-section-messages-empty">
          尚未收到任何訊息...
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('socket_io_page.hero.title')
});
import _cloneDeep from 'lodash/cloneDeep';

const socketIoClientConnected = ref(false);
const socketIoClient = useSocketIoClient(
  { channel: '/' },
  null,
  function (newSocketIo) {
    newSocketIo.on('socket.io-test', onMessage);
    newSocketIo.on('message', onMessage);
    // 監聽廣播事件
    newSocketIo.on('broadcast-message', onMessage);
    newSocketIo.on('connect', () => {
      socketIoClientConnected.value = newSocketIo.connected;
    });
    newSocketIo.on('disconnect', () => {
      socketIoClientConnected.value = newSocketIo.connected;
    });
  }
);

const socketIoClientMessageList = ref([]);
const messageToSend = ref('');

function onMessage(payload) {
  console.log({ payload });
  const newSocketIoClientMessage = _cloneDeep(socketIoClientMessageList.value);
  newSocketIoClientMessage.push(payload);
  socketIoClientMessageList.value = newSocketIoClientMessage;
}

function sendMessage() {
  if (!messageToSend.value || !socketIoClientConnected.value) return;
  
  // 使用 broadcast-message 事件，讓所有連線都能收到
  socketIoClient.io.emit('broadcast-message', {
    content: messageToSend.value,
    timestamp: new Date().toISOString()
  });
  messageToSend.value = '';
}

watch(
  () => socketIoClientConnected.value,
  async (newSocketIoClientConnected) => {
    console.log({ newSocketIoClientConnected });
    if (newSocketIoClientConnected === true) {
      await new Promise((resolve) => nextTick(() => setTimeout(resolve, 250)));

      socketIoClient.io.emit('socket.io-test', {
        a: 'b',
        c: [],
        testData: 'socket.io test Data'
      });
      socketIoClient.io.emit('message', {
        a: 'b',
        c: [],
        testData: 'message test Data'
      });
    }
  },
  { immediate: true }
);
</script>

<style lang="scss">
.socket_io_page {
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

    &-status {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 24px;
      padding: 12px 16px;
      border-radius: 8px;
      background: #f7fafc;

      &-label {
        font-size: 14px;
        font-weight: 600;
        color: #4a5568;
      }

      &-indicator {
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
        background: #fed7d7;
        color: #c53030;

        &[css-connected="true"] {
          background: #c6f6d5;
          color: #276749;
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
