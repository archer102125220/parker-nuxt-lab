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

    <video
      ref="remoteVideoEl"
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

const localVideoEl = useTemplateRef('localVideoEl');
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
const remoteWebRTC = useWebRTC({
  iceCandidate(remoteIceCandidateEvent) {
    console.log({ remoteIceCandidateEvent });
    console.log('onIceCandidate => ', remoteIceCandidateEvent.candidate);
  },
  iceconnectionStateChange(remoteIceconnectionStateChangeEvent) {
    console.log({ remoteIceconnectionStateChangeEvent });
    console.log(
      'ICE 伺服器狀態變更 => ',
      remoteIceconnectionStateChangeEvent.target.iceConnectionState
    );
  },
  addStream(remoteaddStreamEvenr) {
    console.log({ remoteaddStreamEvenr });
    if (!remoteStream.value && remoteaddStreamEvenr.stream) {
      remoteStream.value = remoteaddStreamEvenr.stream;
      console.log('接收流並顯示於遠端視訊！', remoteaddStreamEvenr);
    }
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
      typeof newLocalWebRTC?.addStream === 'function' &&
      newStream instanceof window?.EventSource
    ) {
      newLocalWebRTC.addStream(newStream);

      try {
        console.log(newLocalWebRTC.createOffer);
        const RTCSessionDescription = await newLocalWebRTC.createOffer();
        console.log({ RTCSessionDescription });
        const response = await newLocalWebRTC.setLocalDescription(
          RTCSessionDescription
        );
        console.log({ response });
      } catch (error) {
        console.error(error);
      }
    }
  },
  { deep: true }
);
watch(
  () => [remoteWebRTC.value, localWebRTC.value],
  ([newRemoteWebRTC, newLocalWebRTC]) => {
    console.log({ newRemoteWebRTC, newLocalWebRTC });
  },
  { deep: true }
);
</script>

<style lang="scss">
.web_rtc_server_sent_event_page {
}
</style>
