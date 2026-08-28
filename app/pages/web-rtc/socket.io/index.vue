<script setup>
const { t } = useI18n();
const localePath = useLocalePath();
const router = useRouter();

useHeadMataData({
  title: t('web_rtc_socket_io_page.hero.title')
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
    t('web_rtc_page.invalid_room_id')
);

function joinRoom() {
  if (disabledJoinLink.value) return;
  router.push(localePath(`/web-rtc/socket.io/room/${roomId.value}`));
}
</script>

<template>
  <div class="web_rtc_socket_io_page">
    <!-- Hero Section -->
    <section class="web_rtc_socket_io_page-hero">
      <div class="web_rtc_socket_io_page-hero-background">
        <div class="web_rtc_socket_io_page-hero-background-overlay" />
      </div>

      <div class="web_rtc_socket_io_page-hero-content">
        <h1 class="web_rtc_socket_io_page-hero-content-title">
          {{ $t('web_rtc_socket_io_page.hero.title') }}
        </h1>
        <p class="web_rtc_socket_io_page-hero-content-subtitle">
          {{ $t('web_rtc_socket_io_page.hero.subtitle') }}
        </p>
        <p class="web_rtc_socket_io_page-hero-content-description">
          {{ $t('web_rtc_socket_io_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="web_rtc_socket_io_page-section">
      <p
        v-if="$store.system.supportWebsocket === false"
        class="web_rtc_socket_io_page-section-warning"
      >
        {{ $t('web_rtc_page.websocket_env_warning') }}
      </p>

      <div class="web_rtc_socket_io_page-section-actions">
        <div class="web_rtc_socket_io_page-section-actions-create">
          <h3 class="web_rtc_socket_io_page-section-actions-create-title">
            {{ $t('web_rtc_page.create_video_chat') }}
          </h3>
          <NuxtLink :to="$localePath('/web-rtc/socket.io/room')">
            <v-btn color="primary" size="large" block>
              <v-icon class="mr-2">mdi-video-plus</v-icon>
              {{ $t('web_rtc_page.create_new_room') }}
            </v-btn>
          </NuxtLink>
        </div>

        <div class="web_rtc_socket_io_page-section-actions-divider">
          <span>{{ $t('web_rtc_page.or') }}</span>
        </div>

        <div class="web_rtc_socket_io_page-section-actions-join">
          <h3 class="web_rtc_socket_io_page-section-actions-join-title">
            {{ $t('web_rtc_page.join_video_chat') }}
          </h3>
          <form
            class="web_rtc_socket_io_page-section-actions-join-form"
            @submit.prevent="joinRoom"
          >
            <v-text-field
              v-model="roomId"
              label="Room ID"
              :placeholder="$t('web_rtc_page.input_room_id_placeholder')"
              :rules="[rules]"
              hide-details="auto"
            />
            <v-btn
              type="submit"
              color="primary"
              variant="tonal"
              size="large"
              :disabled="disabledJoinLink"
            >
              <v-icon class="mr-2">mdi-video-account</v-icon>
              {{ $t('web_rtc_page.join_room') }}
            </v-btn>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.web_rtc_socket_io_page {
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

    &-warning {
      margin-bottom: 24px;
      padding: 12px 16px;
      border-radius: 8px;
      background: #fef3c7;
      border: 1px solid #f59e0b;
      font-size: 14px;
      font-weight: 500;
      color: #92400e;
    }

    &-actions {
      display: flex;
      flex-direction: column;
      gap: 32px;

      @media (min-width: 768px) {
        flex-direction: row;
        align-items: stretch;
      }

      &-create,
      &-join {
        flex: 1;
        padding: 24px;
        border-radius: 12px;
        background: #f7fafc;

        &-title {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #2d3748;
        }
      }

      &-join {
        &-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
      }

      &-divider {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #a0aec0;
        font-weight: 500;

        @media (min-width: 768px) {
          flex-direction: column;
        }
      }
    }
  }
}
</style>
