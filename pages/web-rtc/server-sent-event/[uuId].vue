<template>
  <section class="web_rtc_server_sent_event_page">
    <p class="web_rtc_server_sent_event_page-description">
      配合 Server-Sent Event 實作
    </p>

    <video
      class="web_rtc_server_sent_event_page-video"
      width="100%"
      height="360"
      autoplay
      :srcObject="streamObj"
    />

    <video
      v-for="streamItem in streamList"
      :key="streamItem?.id"
      class="web_rtc_server_sent_event_page-video"
      width="100%"
      height="360"
      autoplay
      :srcObject="streamItem"
    />
  </section>
</template>

<script setup>
import { nanoid } from 'nanoid';

useHeadMataData({
  title: 'WebRTC測試 - 配合Server-Sent Event實作'
});
definePageMeta({
  middleware: 'check-params-uuid'
});
const route = useRoute();

const postEventSourceAutonInit = ref(false);
const userId = computed(() => nanoid());

const streamObj = useCameraStream({ audio: true });
const webRTC = useWebRTC(
  {
    afterInit() {
      postEventSourceAutonInit.value = true;
    },
    iceCandidate(localIceCandidateEvent) {
      console.log({ localIceCandidateEvent });
      console.log('onIceCandidate => ', localIceCandidateEvent.candidate);
    },
    iceconnectionStateChange(localIceconnectionStateChangeEvent) {
      console.log({ localIceconnectionStateChangeEvent });
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
  channel: `/web-rtc/${route.params.uuId}`,
  autonInit: postEventSourceAutonInit.value,
  payload: {
    userId: userId.value,
    candidate: webRTC.candidate,
    description: webRTC.localDescription
  },
  eventList: [
    {
      name: 'webrtc',
      handler(event) {
        const payload = event.data;
        console.log({ payload, ['webRTC.RTC']: webRTC });

        if (Array.isArray(payload) === false) return;
        const isOffer = payload.length <= 1;
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
        payload.forEach(async function (remoteData) {
          console.log({ remoteData });
          if (remoteData.userId === userId.value) return;

          const RTCLocalDescription = webRTC.RTC?.localDescription || {};
          const RTCRemoteDescription = webRTC.RTC?.remoteDescription || {};

          const candidate = remoteData?.candidate;
          const description = remoteData?.description || {};

          await webRTC.RTC.addIceCandidate(candidate);

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
</script>

<style lang="scss">
.web_rtc_server_sent_event_page {
  &-description {
    margin-bottom: 8px;
  }

  // &-warning {
  //   font-size: 16px;
  //   font-weight: 600;
  //   margin-bottom: 8px;
  // }

  &-video {
    margin-bottom: 8px;

    background-color: #f0f8ff;
    opacity: 0;
  }
}
</style>
