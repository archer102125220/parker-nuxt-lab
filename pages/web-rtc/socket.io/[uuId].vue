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

// https://medium.com/@hiro05097952/%E5%88%9D%E6%8E%A2-webrtc-%E6%89%8B%E6%8A%8A%E6%89%8B%E5%BB%BA%E7%AB%8B%E7%B7%9A%E4%B8%8A%E8%A6%96%E8%A8%8A-3-65e14b07cc87
const webRTC = useWebRTC({
  iceCandidate(localIceCandidateEvent) {
    console.log('onIceCandidate => ', localIceCandidateEvent.candidate);
    // socketIoClient.value.emit('webrtc', localIceCandidateEvent.candidate);
    if (localIceCandidateEvent.candidate) {
      candidate.value = localIceCandidateEvent.candidate;
    }
    if (
      typeof webRTC.value?.localDescription === 'object' &&
      webRTC.value?.localDescription !== null
    ) {
      localDescription.value = webRTC.value.localDescription;
    }
  },
  iceconnectionStateChange(localIceconnectionStateChangeEvent) {
    console.log({ localIceconnectionStateChangeEvent });
    console.log(
      'ICE 伺服器狀態變更 => ',
      localIceconnectionStateChangeEvent.target.iceConnectionState
    );
  },
  track(localTrackEvent) {
    console.log({ localTrackEvent });
    console.log('onTrack => ', localTrackEvent.track);

    const streamList = Array.isArray(localTrackEvent.streams)
      ? localTrackEvent.streams
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
  { channel: `/web-rtc?webRtcId=${route.params.uuId}` },
  function (socketIo) {
    socketIo.on('webrtc', async function (webrtcPayload) {
      console.log({ webrtcPayload });

      // 檢查描述檔，避免重複設定
      if (
        webRTC.value.localDescription?.type ===
          webrtcPayload.description?.type ||
        webRTC.value.remoteDescription?.type === webrtcPayload.description?.type
      ) {
        return;
      }

      await webRTC.value.setRemoteDescription(
        new RTCSessionDescription(webrtcPayload.description)
      );
      console.log(`已成功設定遠端 ${webrtcPayload.description?.type}。`);
    });
    socketIo.emit('webrtc-join', route.params.uuId);

    socketIo.on('connect', () => {
      socketIoConnected.value = socketIo.connected;
    });
    socketIo.on('disconnect', () => {
      socketIoConnected.value = socketIo.connected;
    });
  }
);

watch(
  () => [streamObj.value, webRTC.value, socketIoClient.value],
  async ([newStream, newWebRTC, newSocketIoClient]) => {
    console.log({ newStream, newWebRTC, newSocketIoClient });

    if (
      offer.value?.type !== 'offer' &&
      typeof newWebRTC?.addTrack === 'function' &&
      newStream instanceof window?.MediaStream
    ) {
      console.log({ tracks: newStream.getTracks() });

      // 將本地視訊軌加入 RTCPeerConnection
      newStream.getTracks().forEach((track) => {
        console.log({ track });
        newWebRTC.addTrack(track, newStream);
      });

      try {
        console.log(newWebRTC.createOffer);
        const newOffer = await newWebRTC.createOffer();
        console.log({ offer: newOffer });
        const response = await newWebRTC.setLocalDescription(newOffer);
        console.log({ response });

        offer.value = newOffer;
      } catch (error) {
        console.error(error);
      }
    }
  },
  { deep: true }
);
watch(
  () => [candidate.value, localDescription.value, socketIoConnected.value],
  ([newCandidate, newLocalDescription, newSocketIoConnected]) => {
    console.log({ newCandidate, newLocalDescription, newSocketIoConnected });
    if (newSocketIoConnected === true) {
      socketIoClient.value.emit('webrtc', {
        candidate: newCandidate,
        description: newLocalDescription
      });
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
