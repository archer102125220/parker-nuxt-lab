<template>
  <section class="web_rtc_server_sent_event_page">
    <p class="web_rtc_server_sent_event_page-description">
      配合 Server-Sent Event 實作
    </p>

    <video
      ref="localVideoEl"
      id="localVideo"
      class="web_rtc_server_sent_event_page-video"
      width="100%"
      height="360"
      autoplay
      :srcObject="streamObj"
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

const localVideoEl = useTemplateRef('localVideoEl');
const streamObj = useCameraStream({ audio: true });

const webRTC = useWebRTC(null, streamObj);
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

watch(
  () => [streamObj.value, webRTC.value, eventSource.value],
  ([newStream, newWebRTC, newEventSource]) => {
    console.log({ newStream, newWebRTC, newEventSource });
  },
  { deep: true }
);
</script>

<style lang="scss">
.web_rtc_server_sent_event_page {
}
</style>
