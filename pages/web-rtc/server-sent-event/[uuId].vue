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
useHeadMataData({
  title: 'WebRTC Server-Sent Event測試'
});
definePageMeta({
  middleware: 'check-params-uuid'
});
const route = useRoute();

const streamObj = useCameraStream({ audio: true });
const webRTC = useWebRTC({
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
});
const eventSource = useEventSource({
  channel: `/web-rtc/${route.params.uuId}`,
  eventList: [
    {
      name: 'webrtc',
      handler(payload) {
        console.log({ payload });
      }
    }
  ]
});

const system = useSystemStore();

const offer = ref(null);
const answer = ref(null);

const localStreamAdded = ref(false);
const isOffer = ref(false);
const isAnswer = ref(false);
const streamList = computed(() => {
  return Array.isArray(webRTC.streamList) === true ? webRTC.streamList : [];
});

watch(
  () => [streamObj.value, webRTC.RTC],
  async ([newStream, newWebRTC]) => {
    if (
      typeof newWebRTC?.addTrack === 'function' &&
      newStream instanceof window?.MediaStream
    ) {
      // 將本地視訊軌加入 RTCPeerConnection
      newStream.getTracks().forEach((track) => {
        newWebRTC.addTrack(track, newStream);
      });

      localStreamAdded.value = true;
    }
  },
  { deep: true }
);
watch(
  () => [localStreamAdded.value, isOffer.value, isAnswer.value],
  async ([newLocalStreamAdded, newIsOffer, newIsAnswer]) => {
    if (newLocalStreamAdded === false) return;

    try {
      if (newIsOffer === true) {
        const newOffer = await webRTC.RTC.createOffer();
        webRTC.localDescription = newOffer;

        isOffer.value = false;
        offer.value = newOffer;
      } else if (newIsAnswer === true) {
        const newAnswer = await webRTC.RTC.createAnswer();
        webRTC.localDescription = newAnswer;

        isAnswer.value = false;
        answer.value = newAnswer;
      }
    } catch (error) {
      console.error(error);
    }
  }
);
if (system.supportWebsocket === false) {
  onMounted(() => {
    window.webRTC = webRTC;
    window.getWebRTC = function () {
      webRTC.value;
    };
  });
}
onBeforeUnmount(() => {
  socketIoClient.io.emit('leaveWebRTC', {
    candidate: webRTC.candidate,
    description: webRTC.localDescription,
    offer: offer.value,
    answer: answer.value
  });
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
