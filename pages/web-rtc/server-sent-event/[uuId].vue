<template>
  <section class="web_rtc_server_sent_event_page">
    <p class="web_rtc_server_sent_event_page-description">
      配合 Server-Sent Event 實作
    </p>

    <video
      id="localVideo"
      class="web_rtc_server_sent_event_page-video"
      width="100%"
      height="360"
      autoplay
      :srcObject="streamObj"
    />

    <video
      id="remoteVideo"
      class="web_rtc_server_sent_event_page-video"
      width="100%"
      height="360"
      autoplay
      :srcObject="remoteStream"
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
const remoteStream = ref(null);

const localWebRTC = useWebRTC({
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

const eventSourceConfig = computed(() => ({
  channel: `/web-rtc/${route.params.uuId}`,
  eventList: [
    {
      name: 'webrtc',
      handler(payload) {
        console.log({ payload });
      }
    }
  ]
}));
const eventSource = useEventSource(eventSourceConfig);

watch(
  () => [streamObj.value, localWebRTC.value, eventSource.value],
  async ([newStream, newLocalWebRTC, newEventSource]) => {
    console.log({ newStream, newLocalWebRTC, newEventSource });
    if (
      typeof newLocalWebRTC?.addTrack === 'function' &&
      newStream instanceof window?.MediaStream
    ) {
      // 將本地視訊軌加入 RTCPeerConnection
      newStream.getTracks().forEach((track) => {
        console.log({ track });
        newLocalWebRTC.addTrack(track, newStream);
      });

      try {
        console.log(newLocalWebRTC.createOffer);
        const offer = await newLocalWebRTC.createOffer();
        console.log({ offer });
        const response = await newLocalWebRTC.setLocalDescription(offer);
        console.log({ response });
      } catch (error) {
        console.error(error);
      }
    }
  },
  { deep: true }
);
</script>

<style lang="scss">
.web_rtc_server_sent_event_page {
}
</style>
