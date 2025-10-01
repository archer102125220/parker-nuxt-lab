<template>
  <div class="web_rtc_socket_io_page">
    <p class="web_rtc_socket_io_page-description">
      配合 socket.io 實作
    </p>

    <video
      ref="localVideoEl"
      id="localVideo"
      class="web_rtc_socket_io_page-video"
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
definePageMeta({
  middleware: 'check-params-uuid'
});
const route = useRoute();

// https://johnnywang1994.github.io/book/articles/js/webrtc-realtime-meeting.html
// https://nuxt.com/modules/socket-io

const localVideoEl = useTemplateRef('localVideoEl');
const streamObj = useCameraStream({ audio: true });

// https://medium.com/@hiro05097952/%E5%88%9D%E6%8E%A2-webrtc-%E6%89%8B%E6%8A%8A%E6%89%8B%E5%BB%BA%E7%AB%8B%E7%B7%9A%E4%B8%8A%E8%A6%96%E8%A8%8A-3-65e14b07cc87
const webRTC = useWebRTC(null, streamObj);
const socketIoClient = useSocketIoClient({ channel: `/web-rtc/${route.params.uuId}` });

watch(
  () => [streamObj.value, webRTC.value, socketIoClient.value],
  ([newStream, newWebRTC, newSocketIoClient]) => {
    console.log({ newStream, newWebRTC, newSocketIoClient });
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.web_rtc_socket_io_page {
}
</style>
