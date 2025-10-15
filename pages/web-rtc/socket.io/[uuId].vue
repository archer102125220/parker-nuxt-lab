<template>
  <div class="web_rtc_socket_io_page">
    <p class="web_rtc_socket_io_page-description">配合 socket.io 實作</p>

    <p
      v-if="$store.system.supportWebsocket === false"
      class="web_rtc_socket_io_page-warning"
    >
      *當前部署環境可能不支援 Websocket （如：vercel等部署平台），可能會無效
    </p>

    <!-- <video
      class="web_rtc_socket_io_page-video"
      width="100%"
      height="360"
      autoplay
      :srcObject="streamObj"
    />

    <video
      v-if="remoteStream !== null"
      ref="remoteVideo"
      class="web_rtc_socket_io_page-video"
      width="100%"
      height="360"
      autoplay
      :srcObject="remoteStream"
    /> -->
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
  title: 'WebRTC測試'
});
definePageMeta({
  middleware: 'check-params-uuid'
});
const route = useRoute();

// https://johnnywang1994.github.io/book/articles/js/webrtc-realtime-meeting.html
// https://nuxt.com/modules/socket-io

// const remoteVideo = useTemplateRef('remoteVideo');

const streamObj = useCameraStream({ audio: true });
const remoteStream = ref(null);

// const localDescription = ref(null);
const offer = ref(null);
const answer = ref(null);

const localStreamAdded = ref(false);
const isOffer = ref(false);
const isAnswer = ref(false);

// https://medium.com/@hiro05097952/%E5%88%9D%E6%8E%A2-webrtc-%E6%89%8B%E6%8A%8A%E6%89%8B%E5%BB%BA%E7%AB%8B%E7%B7%9A%E4%B8%8A%E8%A6%96%E8%A8%8A-3-65e14b07cc87
const webRTC = useWebRTC({
  // iceconnectionStateChange(iceconnectionStateChangeEvent) {
  //   console.log({ iceconnectionStateChangeEvent });
  //   console.log(
  //     'ICE 伺服器狀態變更 => ',
  //     iceconnectionStateChangeEvent.target.iceConnectionState
  //   );
  // },
});
const socketIoClient = useSocketIoClient(
  {
    channel: '/web-rtc',
    listener: {
      webrtcJoined(webrtcJoinedPayload) {
        console.log({ webrtcJoinedPayload });
        isOffer.value = webrtcJoinedPayload.isOffer === true;
        isAnswer.value = webrtcJoinedPayload.isOffer === false;
      },
      async webrtcDescription(webrtcPayload) {
        const RTCLocalDescription = webRTC.RTC?.localDescription || {};
        const RTCRemoteDescription = webRTC.RTC?.remoteDescription || {};
        const description =
          webrtcPayload?.offer ||
          webrtcPayload?.answer ||
          webrtcPayload?.description ||
          {};

        console.log({
          webrtcPayload,
          ['webRTC.RTC']: webRTC.RTC,
          RTCLocalDescription,
          RTCRemoteDescription,
          description
        });

        // 檢查描述檔，避免重複設定
        if (
          RTCLocalDescription?.type === description?.type ||
          RTCRemoteDescription?.type === description?.type
        ) {
          return;
        }

        try {
          console.log(`設在設定設定遠端 ${description?.type}...`);
          await webRTC.RTC.setRemoteDescription(
            new RTCSessionDescription(description)
          );
          console.log(`已成功設定遠端 ${description?.type}。`);
        } catch (error) {
          console.error(error);
        }
      },
      newUser(newUserPayload) {
        console.log({ newUserPayload });
        let payload = {};

        if (typeof offer.value === 'object' && offer.value !== null) {
          payload.offer = offer.value;
        } else if (typeof answer.value === 'object' && answer.value !== null) {
          payload.answer = answer.value;
        }
        socketIoClient.io.emit('webrtcDescription', payload);
      }
      // webrtcSignal(webrtcSignalPaylaod) {
      //   if (
      //     typeof webrtcSignal?.offer === 'object' &&
      //     webrtcSignalPaylaod?.offer !== null
      //   ) {
      //   }
      // }
    }
  },
  {
    webrtcJoin: {
      value: () => route.params.uuId,
      watch: false
    },
    webrtcDescription: {
      value: () => ({
        candidate: webRTC.candidate,
        description: webRTC.localDescription
      }),
      watch: true
    }
  }
);
const streamList = computed(() => {
  return Array.isArray(webRTC.streamList) ? webRTC.streamList : [];
});

watch(
  () => [streamObj.value, webRTC.RTC],
  async ([newStream, newWebRTC]) => {
    console.log({ newStream });
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
        const newOffer = await webRTC.RTC.createOffer();
        webRTC.localDescription = newOffer;

        // socketIoClient.io.emit('newUser', { offer: newOffer });
        isOffer.value = false;
        offer.value = newOffer;
      } else if (newIsAnswer === true) {
        const newAnswer = await webRTC.RTC.createAnswer();
        webRTC.localDescription = newAnswer;

        // socketIoClient.io.emit('newUser', { answer: newAnswer });
        isAnswer.value = false;
        answer.value = newAnswer;
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

    background-color: #f0f8ff;
    opacity: 0;
  }
}
</style>
