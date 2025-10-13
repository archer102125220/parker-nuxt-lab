<template>
  <div class="web_rtc_socket_io_page">
    <p class="web_rtc_socket_io_page-description">配合 socket.io 實作</p>

    <p
      v-if="$store.system.supportWebsocket === false"
      class="web_rtc_socket_io_page-warning"
    >
      *當前部署環境可能不支援 Websocket （如：vercel等部署平台），可能會無效
    </p>

    <video
      id="localVideo"
      class="web_rtc_socket_io_page-video"
      width="100%"
      height="360"
      autoplay
      :srcObject="streamObj"
    />

    <video
      id="remoteVideo"
      class="web_rtc_socket_io_page-video"
      width="100%"
      height="360"
      autoplay
      :srcObject="remoteStream"
    />
  </div>
</template>

<script setup>
useHeadMataData({
  title: 'WebRTC測試'
});
definePageMeta({
  middleware: 'check-params-uuid'
});
const nuxtApp = useNuxtApp();
const route = useRoute();

// https://johnnywang1994.github.io/book/articles/js/webrtc-realtime-meeting.html
// https://nuxt.com/modules/socket-io

const streamObj = useCameraStream({ audio: true });
const remoteStream = ref(null);

const socketIoConnected = ref(false);
const candidate = ref(null);
const localDescription = ref(null);
const offer = ref(null);
const answer = ref(null);

const localStreamAdded = ref(false);
const isOffer = ref(false);
const isAnswer = ref(false);

// https://medium.com/@hiro05097952/%E5%88%9D%E6%8E%A2-webrtc-%E6%89%8B%E6%8A%8A%E6%89%8B%E5%BB%BA%E7%AB%8B%E7%B7%9A%E4%B8%8A%E8%A6%96%E8%A8%8A-3-65e14b07cc87
const webRTC = useWebRTC({
  iceCandidate(iceCandidateEvent) {
    // console.log('onIceCandidate => ', iceCandidateEvent.candidate);
    if (iceCandidateEvent.candidate) {
      candidate.value = iceCandidateEvent.candidate;
    }
    if (
      typeof webRTC.value?.localDescription === 'object' &&
      webRTC.value?.localDescription !== null
    ) {
      localDescription.value = webRTC.value.localDescription;
    }
  },
  // iceconnectionStateChange(iceconnectionStateChangeEvent) {
  //   console.log({ iceconnectionStateChangeEvent });
  //   console.log(
  //     'ICE 伺服器狀態變更 => ',
  //     iceconnectionStateChangeEvent.target.iceConnectionState
  //   );
  // },
  track(trackEvent) {
    const streamList = Array.isArray(trackEvent.streams)
      ? trackEvent.streams
      : [];

    const newRemoteStream = streamList.find(
      (stream) =>
        streamObj.value?.id !== stream?.id &&
        remoteStream.value?.id !== stream?.id
    );

    console.log({ newRemoteStream });

    if (newRemoteStream !== undefined) {
      remoteStream.value = newRemoteStream;
      console.log('接收到遠端串流。');
    }
  }
});
const socketIoClient = useSocketIoClient(
  {
    channel: '/web-rtc',
    listener: {
      connect() {
        socketIoConnected.value = socketIoClient.value.connected;
      },
      disconnect() {
        socketIoConnected.value = socketIoClient.value.connected;
      },
      webrtcJoined(webrtcJoinedPayload) {
        console.log({ webrtcJoinedPayload });
        isOffer.value = webrtcJoinedPayload.isOffer === true;
        isAnswer.value = webrtcJoinedPayload.isOffer === false;
      },
      async webrtcDescription(webrtcPayload) {
        console.log({ webrtcPayload });

        const localDescription = webRTC.value?.localDescription || {};
        const remoteDescription = webRTC.value?.remoteDescription || {};
        const description = webrtcPayload?.description || {};

        // 檢查描述檔，避免重複設定
        if (
          localDescription?.type === description?.type ||
          remoteDescription?.type === description?.type
        ) {
          return;
        }

        await webRTC.value?.setRemoteDescription(
          new RTCSessionDescription(description)
        );
        console.log(`已成功設定遠端 ${description?.type}。`);
      }
    }
  },
  {
    webrtcJoin: {
      value: () => route.params.uuId,
      watch: false
    },
    webrtcDescription: {
      value: () => ({
        candidate: candidate.value,
        description: localDescription.value
      }),
      watch: true
    }
  }
);

watch(
  () => [streamObj.value, webRTC.value],
  async ([newStream, newWebRTC]) => {
    if (
      localStreamAdded.value === false &&
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
        const newOffer = await webRTC.value.createOffer();
        await webRTC.value.setLocalDescription(newOffer);
        isOffer.value = false;
      }
      if (newIsAnswer === true) {
        const newAnswer = await webRTC.value.createAnswer();
        await newWewebRTC.valuebRTC.setLocalDescription(newAnswer);
        isAnswer.value = false;
      }
    } catch (error) {
      console.error(error);
    }
  }
);
</script>

<style lang="scss" scoped>
.web_rtc_socket_io_page {
  &-description {
    margin-bottom: 8px;
  }

  &-warning {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  &-video {
    margin-bottom: 8px;
  }
}
</style>
