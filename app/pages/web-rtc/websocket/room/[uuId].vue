<template>
  <section class="web_rtc_websocket_room_page">
    <p class="web_rtc_websocket_room_page-description">
      配合 Nuxt4 內建的 WebSocket 實作
    </p>

    <p
      v-if="$store.system.supportWebsocket === false"
      class="web_rtc_websocket_room_page-warning"
    >
      *當前部署環境可能不支援 Websocket （如：vercel等部署平台），可能會無效
    </p>

    <p class="web_rtc_websocket_room_page-uuid">目前配對ID為: {{ uuId }}</p>

    <div class="web_rtc_websocket_room_page-video_list">
      <video
        class="web_rtc_websocket_room_page-video_list-self"
        width="100%"
        height="360"
        muted
        autoplay
        :srcObject="streamObj"
      />

      <video
        v-for="streamItem in streamList"
        :key="streamItem?.id"
        class="web_rtc_websocket_room_page-video_list-other"
        width="100%"
        height="360"
        autoplay
        :srcObject="streamItem"
      />
    </div>
  </section>
</template>

<script setup>
useHeadMataData({
  title: 'WebRTC測試 - 原生配合Nuxt4內建Websocket信號交換'
});
definePageMeta({
  middleware: 'check-params-uuid'
});
const route = useRoute();

const uuId = computed(() => route.params.uuId);

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
const websocket = useWebSocket(
  {
    channel: `/web-rtc/${route.params.uuId}`,
    listener: {
      webrtcJoined(webrtcJoinedEvent) {
        const webrtcJoinedPayload = webrtcJoinedEvent.jsonData?.data || {};
        console.log({ webrtcJoinedEvent, webrtcJoinedPayload });
        webRTC.isOffer = webrtcJoinedPayload.isOffer === true;
        webRTC.isAnswer = webrtcJoinedPayload.isOffer === false;
      },
      async webrtcDescription(webrtcEvent) {
        const RTCLocalDescription = webRTC.RTC?.localDescription || {};
        const RTCRemoteDescription = webRTC.RTC?.remoteDescription || {};

        const webrtcPayload = webrtcEvent.jsonData?.data || {};
        const candidate = webrtcPayload?.candidate;
        const description = webrtcPayload?.description || {};

        console.log({ webrtcEvent, webrtcPayload });

        await webRTC.RTC.addIceCandidate(candidate);

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

          webRTC.remoteDescriptionAdded = true;
        } catch (error) {
          console.error(error);
        }
      },
      newUser() {
        websocket.value.send('webrtcDescription', {
          description:
            typeof webRTC.offer === 'object' && webRTC.offer !== null
              ? webRTC.offer
              : webRTC.answer
        });
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
        candidate: webRTC.candidate,
        description: webRTC.localDescription
      }),
      watch: true
    }
  }
);

const streamList = computed(() => {
  return Array.isArray(webRTC.streamList) === true ? webRTC.streamList : [];
});

watch(
  () => [streamObj.value, webRTC.RTC, websocket.value],
  ([newStream, newWebRTC, newWebsocket]) => {
    console.log({ newStream, newWebRTC, newWebsocket });
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.web_rtc_websocket_room_page {
  &-description {
    /* Display & Box Model */
    margin-bottom: 8px;
  }

  &-uuid {
    /* Display & Box Model */
    margin-bottom: 8px;
  }

  &-warning {
    /* Display & Box Model */
    margin-bottom: 8px;

    /* Typography */
    font-size: 16px;
    font-weight: 600;
  }

  &-video_list {
    /* Display & Box Model */
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 8px;
    margin-bottom: 8px;

    /* Visual */
    background-color: #f0f8ff;

    &-self {
      /* Display & Box Model */
      aspect-ratio: 1/1;
      // opacity: 0;
    }
    &-other {
      /* Display & Box Model */
      flex: 1;
      aspect-ratio: 1 / 1;
      // opacity: 0;
    }
  }
}
</style>
