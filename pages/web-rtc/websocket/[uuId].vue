<template>
  <div class="web_rtc_websocket_page">
    <p class="web_rtc_websocket_page-description">
      配合 Nuxt3 內建的 WebSocket 實作
    </p>

    <p
      v-if="$store.system.supportWebsocket === false"
      class="web_rtc_websocket_page-warning"
    >
      *當前部署環境可能不支援 Websocket （如：vercel等部署平台），可能會無效
    </p>

    <video
      class="web_rtc_socket_io_page-video"
      width="100%"
      height="360"
      autoplay
      :srcObject="streamObj"
    />

    <video
      v-for="streamItem in streamList"
      :key="streamItem?.id"
      class="web_rtc_socket_io_page-video"
      width="100%"
      height="360"
      autoplay
      :srcObject="streamItem"
    />
  </div>
</template>

<script setup>
useHeadMataData({
  title: 'WebRTC測試 - 原生配合Nuxt3內建Websocket信號交換'
});
definePageMeta({
  middleware: 'check-params-uuid'
});
const route = useRoute();

// https://johnnywang1994.github.io/book/articles/js/webrtc-realtime-meeting.html
// https://nuxt.com/modules/socket-io

const streamObj = useCameraStream({ audio: true });
// https://medium.com/@hiro05097952/%E5%88%9D%E6%8E%A2-webrtc-%E6%89%8B%E6%8A%8A%E6%89%8B%E5%BB%BA%E7%AB%8B%E7%B7%9A%E4%B8%8A%E8%A6%96%E8%A8%8A-3-65e14b07cc87
const webRTC = useWebRTC(
  {
    iceCandidate(localIceCandidateEvent) {
      // console.log({ localIceCandidateEvent });
      console.log('onIceCandidate => ', localIceCandidateEvent.candidate);
    },
    iceconnectionStateChange(iceconnectionStateChangeEvent) {
      // console.log({ iceconnectionStateChangeEvent });
      console.log(
        'ICE 伺服器狀態變更 => ',
        iceconnectionStateChangeEvent.target.iceConnectionState
      );
    }
  },
  streamObj
);
const websocket = useWebSocket({
  channel: `/web-rtc/${route.params.uuId}`,
  message: onMessage
});

const streamList = computed(() => {
  return Array.isArray(webRTC.streamList) === true ? webRTC.streamList : [];
});

function onMessage(payload) {
  console.log({ payload });
  console.log({ ['payload?.data']: payload?.data });
}

watch(
  () => [streamObj.value, webRTC.RTC, websocket.value],
  ([newStream, newWebRTC, newWebsocket]) => {
    console.log({ newStream, newWebRTC, newWebsocket });
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.web_rtc_websocket_page {
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

    background-color: #f0f8ff;
    // opacity: 0;
  }
}
</style>
