<script>
import { v4 as uuidv4 } from 'uuid';
</script>
<script setup>
const { t } = useI18n();
const localePath = useLocalePath();
const router = useRouter();

useHeadMataData({
  title: t('sse_room_post_page.hero.title')
});

const roomId = ref('');

const disabledJoinLink = computed(
  () =>
    typeof roomId.value !== 'string' ||
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
      roomId.value
    ) === false
);

const rules = computed(
  () => () =>
    disabledJoinLink.value === false ||
    roomId.value === '' ||
    '無效的 Room ID 格式'
);

function createRoom() {
  const newRoomId = uuidv4();
  router.push(localePath(`/server-sent-event-test/room-post/${newRoomId}`));
}

function joinRoom() {
  if (!disabledJoinLink.value) {
    router.push(
      localePath(`/server-sent-event-test/room-post/${roomId.value}`)
    );
  }
}
</script>

<template>
  <div class="sse_room_post_entry_page">
    <!-- Hero Section -->
    <section class="sse_room_post_entry_page-hero">
      <div class="sse_room_post_entry_page-hero-background">
        <div class="sse_room_post_entry_page-hero-background-overlay" />
      </div>

      <div class="sse_room_post_entry_page-hero-content">
        <h1 class="sse_room_post_entry_page-hero-content-title">
          {{ $t('sse_room_post_page.hero.title') }}
        </h1>
        <p class="sse_room_post_entry_page-hero-content-subtitle">
          {{ $t('sse_room_post_page.hero.subtitle') }}
        </p>
        <p class="sse_room_post_entry_page-hero-content-description">
          {{ $t('sse_room_post_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="sse_room_post_entry_page-section">
      <div class="sse_room_post_entry_page-section-actions">
        <!-- Create Room -->
        <div class="sse_room_post_entry_page-section-actions-create">
          <h2 class="sse_room_post_entry_page-section-actions-create-title">
            建立房間
          </h2>
          <p class="sse_room_post_entry_page-section-actions-create-desc">
            自動產生 Room ID 並進入房間 (POST 模式)
          </p>
          <v-btn color="primary" size="large" block @click="createRoom">
            建立 SSE 房間 (POST)
          </v-btn>
        </div>

        <!-- Join Room -->
        <div class="sse_room_post_entry_page-section-actions-join">
          <h2 class="sse_room_post_entry_page-section-actions-join-title">
            加入房間
          </h2>
          <p class="sse_room_post_entry_page-section-actions-join-desc">
            輸入 Room ID 加入現有房間 (POST 模式)
          </p>
          <v-text-field
            v-model="roomId"
            clearable
            label="Room ID"
            placeholder="請輸入 UUID 格式的 Room ID"
            class="sse_room_post_entry_page-section-actions-join-input"
            :rules="[rules]"
          />
          <v-btn
            color="primary"
            variant="tonal"
            size="large"
            block
            :disabled="disabledJoinLink"
            @click="joinRoom"
          >
            加入房間
          </v-btn>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.sse_room_post_entry_page {
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

    &-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 32px;
      max-width: 800px;
      margin: 0 auto;

      &-create,
      &-join {
        flex: 1;
        min-width: 280px;
        padding: 24px;
        border-radius: 12px;
        background: #f7fafc;

        &-title {
          margin: 0 0 8px 0;
          font-size: 20px;
          font-weight: 700;
          color: #2d3748;
        }

        &-desc {
          margin: 0 0 16px 0;
          font-size: 14px;
          color: #718096;
        }

        &-input {
          margin-bottom: 16px;
        }
      }
    }
  }
}
</style>
