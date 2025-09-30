<template>
  <div class="web_rtc_websocket_page">
    <p>測試中</p>

    <video
      ref="localVideoEl"
      id="localVideo"
      class="web_rtc_websocket_page-video"
      width="100%"
      height="360"
      autoplay
      :srcObject="streamObj"
    />
  </div>
</template>

<script setup>
useHeadMataData({
  title: 'WebRTC測試'
});

// https://johnnywang1994.github.io/book/articles/js/webrtc-realtime-meeting.html
// https://nuxt.com/modules/socket-io

const localVideoEl = useTemplateRef('localVideoEl');
const streamObj = useCameraStream({ audio: true });

// https://medium.com/@hiro05097952/%E5%88%9D%E6%8E%A2-webrtc-%E6%89%8B%E6%8A%8A%E6%89%8B%E5%BB%BA%E7%AB%8B%E7%B7%9A%E4%B8%8A%E8%A6%96%E8%A8%8A-3-65e14b07cc87
const webRTC = useWebRTC(null, streamObj);
const websocket = useWebSocket({ channel: '/web-rtc' });

watch(
  () => [streamObj.value, webRTC.value, websocket.value],
  ([newStream, newWebRTC, newWebsocket]) => {
    console.log({ newStream, newWebRTC, newWebsocket });
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.web_rtc_websocket_page {
}
</style>
