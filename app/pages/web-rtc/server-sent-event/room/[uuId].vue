<script>
import { nanoid } from 'nanoid';
import _debounce from 'lodash/debounce';
</script>
<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('web_rtc_sse_page.room.title')
});
definePageMeta({
  middleware: 'check-params-uuid'
});

const nuxtApp = useNuxtApp();
const route = useRoute();

const uuId = computed(() => route.params.uuId);
const userId = computed(() => nanoid());

// 複製功能
const copiedId = ref(false);
const copiedUrl = ref(false);

async function handleCopyId() {
  if (copiedId.value === true) return;
  try {
    await navigator.clipboard.writeText(uuId.value);
    copiedId.value = true;
    setTimeout(() => {
      copiedId.value = false;
    }, 2000);
  } catch (error) {
    console.error('複製失敗:', error);
  }
}

async function handleCopyUrl() {
  if (copiedUrl.value === true) return;
  try {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    copiedUrl.value = true;
    setTimeout(() => {
      copiedUrl.value = false;
    }, 2000);
  } catch (error) {
    console.error('複製失敗:', error);
  }
}

const streamObj = useCameraStream({ audio: true });
const webRTC = useWebRTC(
  {
    iceCandidate(localIceCandidateEvent) {
      console.log('onIceCandidate => ', localIceCandidateEvent.candidate);
    },
    iceconnectionStateChange(localIceconnectionStateChangeEvent) {
      console.log(
        'ICE 伺服器狀態變更 => ',
        localIceconnectionStateChangeEvent.target.iceConnectionState
      );
    }
  },
  streamObj
);
const streamList = computed(() => {
  return Array.isArray(webRTC.streamList) === true ? webRTC.streamList : [];
});
const postEventSourceConfig = computed(() => ({
  channel: `/web-rtc/subscription/${uuId.value}`,
  payload: {
    userId: userId.value
  },
  eventList: [
    {
      name: 'webrtc',
      handler(event) {
        const payload = event.data;
        console.log({ payload, ['webRTC.RTC']: webRTC });

        if (
          typeof payload.isOffer !== 'boolean' &&
          typeof payload.isAnswer !== 'boolean'
        ) {
          return;
        }

        const isOffer = payload.isOffer;
        console.log({
          isOffer,
          ['webRTC.offer']: webRTC.offer,
          ['webRTC.answer']: webRTC.answer
        });

        if (webRTC.offer === null && webRTC.answer === null) {
          webRTC.isOffer = isOffer === true;
        }
        if (webRTC.answer === null) {
          webRTC.isAnswer = isOffer === false;
        }

        const remoteCandidateList = payload.memberCandidateList || [];
        remoteCandidateList.forEach(async function (remoteData) {
          console.log({ remoteData });
          if (remoteData.userId === userId.value) return;

          const candidateList = remoteData?.candidateList;

          if (Array.isArray(candidateList) === true) {
            await Promise.all(
              candidateList.map((candidate) =>
                webRTC.RTC.addIceCandidate(candidate)
              )
            );
          }
        });

        const remoteDescriptionList = payload.memberDescriptionList || [];
        remoteDescriptionList.forEach(async function (remoteData) {
          console.log({ remoteData });
          if (remoteData.userId === userId.value) return;

          const description = remoteData?.description || {};

          const RTCLocalDescription = webRTC.RTC?.localDescription || {};
          const RTCRemoteDescription = webRTC.RTC?.remoteDescription || {};

          // 檢查描述檔，避免重複設定
          if (
            description?.type === undefined &&
            (RTCLocalDescription?.type === description?.type ||
              RTCRemoteDescription?.type === description?.type)
          ) {
            return;
          }

          try {
            console.log(`設在設定設定遠端 ${description?.type}...`);
            await webRTC.RTC.setRemoteDescription(
              new RTCSessionDescription(description)
            );
            console.log(`已成功設定遠端 ${description?.type}。`);

            webRTC.remoteDescriptionAdded = true;
          } catch (error) {
            console.error(error);
          }
        });
      }
    }
  ]
}));
const postEventSource = usePostEventSource(postEventSourceConfig);

watch(
  () => webRTC.candidateList,
  _debounce(
    async function (newCandidateList) {
      console.log({ newCandidateList });
      try {
        await nuxtApp.$serverSentEvent.POST_webRTCCandidateList({
          roomId: route.params.uuId,
          userId: userId.value,
          candidateList: newCandidateList
        });
      } catch (error) {
        console.error(error);
      }
    },
    200,
    { trailing: true }
  ),
  { deep: true }
);

watch(
  () => webRTC.localDescription,
  _debounce(
    async function (newLocalDescription) {
      console.log({ newLocalDescription });
      try {
        await nuxtApp.$serverSentEvent.POST_webRTCDescription({
          roomId: route.params.uuId,
          userId: userId.value,
          description: newLocalDescription
        });
      } catch (error) {
        console.error(error);
      }
    },
    200,
    { trailing: true }
  ),
  { deep: true }
);

onBeforeMount(async function () {
  try {
    await nuxtApp.$serverSentEvent.POST_webRTCJoinRoom({
      roomId: route.params.uuId,
      userId: userId.value
    });
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div class="web_rtc_sse_room_page">
    <!-- Hero Section -->
    <section class="web_rtc_sse_room_page-hero">
      <div class="web_rtc_sse_room_page-hero-background">
        <div class="web_rtc_sse_room_page-hero-background-overlay" />
      </div>

      <div class="web_rtc_sse_room_page-hero-content">
        <h1 class="web_rtc_sse_room_page-hero-content-title">
          {{ $t('web_rtc_sse_page.room.title') }}
        </h1>
        <p class="web_rtc_sse_room_page-hero-content-subtitle">
          {{ $t('web_rtc_sse_page.hero.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="web_rtc_sse_room_page-section">
      <div class="web_rtc_sse_room_page-section-id">
        <span class="web_rtc_sse_room_page-section-id-label">
          {{ $t('web_rtc_socket_io_page.room.current_id') }}:
        </span>
        <code class="web_rtc_sse_room_page-section-id-value">{{ uuId }}</code>
        <v-btn
          icon
          size="small"
          variant="text"
          :title="
            copiedId
              ? $t('web_rtc_socket_io_page.room.copied')
              : $t('web_rtc_socket_io_page.room.copy_id')
          "
          @click="handleCopyId"
        >
          <v-icon>{{ copiedId ? 'mdi-check' : 'mdi-content-copy' }}</v-icon>
        </v-btn>
        <v-btn
          icon
          size="small"
          variant="text"
          :title="
            copiedUrl
              ? $t('web_rtc_socket_io_page.room.copied')
              : $t('web_rtc_socket_io_page.room.copy_url')
          "
          @click="handleCopyUrl"
        >
          <v-icon>{{ copiedUrl ? 'mdi-check' : 'mdi-link' }}</v-icon>
        </v-btn>
      </div>

      <div class="web_rtc_sse_room_page-section-videos">
        <div class="web_rtc_sse_room_page-section-videos-self">
          <span class="web_rtc_sse_room_page-section-videos-self-label">
            {{ $t('web_rtc_socket_io_page.room.your_video') }}
          </span>
          <video
            class="web_rtc_sse_room_page-section-videos-self-video"
            muted
            autoplay
            :srcObject="streamObj"
          />
        </div>

        <div class="web_rtc_sse_room_page-section-videos-others">
          <template v-if="streamList.length > 0">
            <div
              v-for="streamItem in streamList"
              :key="streamItem?.id"
              class="web_rtc_sse_room_page-section-videos-others-item"
            >
              <span
                class="web_rtc_sse_room_page-section-videos-others-item-label"
              >
                {{ $t('web_rtc_socket_io_page.room.remote_video') }}
              </span>
              <video
                class="web_rtc_sse_room_page-section-videos-others-item-video"
                autoplay
                :srcObject="streamItem"
              />
            </div>
          </template>
          <div
            v-else
            class="web_rtc_sse_room_page-section-videos-others-waiting"
          >
            {{ $t('web_rtc_socket_io_page.room.waiting') }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.web_rtc_sse_room_page {
  min-height: 100vh;

  &-hero {
    position: relative;
    min-height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 20px;
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
        font-size: 32px;
        font-weight: 800;
        color: #ffffff;

        @media (max-width: 768px) {
          font-size: 24px;
        }
      }

      &-subtitle {
        margin: 0;
        font-size: 16px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.9);
      }
    }
  }

  &-section {
    padding: 24px 20px;
    max-width: 1200px;
    margin: 0 auto;

    &-id {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 24px;
      padding: 16px;
      border-radius: 8px;
      background: #f7fafc;

      &-label {
        font-size: 14px;
        font-weight: 500;
        color: #4a5568;
      }

      &-value {
        padding: 4px 12px;
        border-radius: 4px;
        background: #e2e8f0;
        font-size: 14px;
        font-family: monospace;
        color: #2d3748;
      }
    }

    &-videos {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 16px;
      align-items: end;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      &-self,
      &-others-item {
        position: relative;
        border-radius: 12px;
        overflow: hidden;
        background: #1a202c;

        &-label {
          position: absolute;
          top: 8px;
          left: 8px;
          padding: 4px 8px;
          border-radius: 4px;
          background: rgba(0, 0, 0, 0.6);
          font-size: 12px;
          font-weight: 500;
          color: #ffffff;
          z-index: 1;
        }

        &-video {
          display: block;
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
        }
      }

      &-others {
        display: flex;
        flex-direction: column;
        gap: 16px;

        &-waiting {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 200px;
          border-radius: 12px;
          background: #f7fafc;
          font-size: 16px;
          color: #a0aec0;
        }
      }
    }
  }
}
</style>
