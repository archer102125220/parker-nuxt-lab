<template>
  <section class="web_rtc_server_sent_event_page">
    <p class="web_rtc_server_sent_event_page-description">
      配合 Server-Sent Event 及 @upstash/redis 實作
    </p>

    <video
      class="web_rtc_server_sent_event_page-video"
      width="100%"
      height="360"
      muted
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
import _debounce from 'lodash/debounce';

useHeadMataData({
  title: 'WebRTC測試 - 配合Server-Sent Event 及 @upstash/redis實作'
});
definePageMeta({
  middleware: 'check-params-uuid'
});

const nuxtApp = useNuxtApp();
const route = useRoute();

const userId = computed(() => nanoid());

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
  channel: `/web-rtc/subscription/${route.params.uuId}`,
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
    // opacity: 0;
  }
}
</style>
