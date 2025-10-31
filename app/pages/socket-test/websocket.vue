<template>
  <div class="websocket_page">
    <p>接收到的data：</p>
    <div>
      <p v-for="(webSocketMessage, index) in webSocketMessageList" :key="index">
        {{ webSocketMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
useHeadMataData({
  title: '原生配合Nuxt3內建的websocket'
});
import _cloneDeep from 'lodash/cloneDeep';

const webSocket = useWebSocket(
  {
    channel: '/',
    message: onMessage
  },
  null,
  function (newWebSocket) {
    newWebSocket.send('websocket-test', {
      a: 'b',
      c: [],
      testData: 'websocket test Data'
    });
    newWebSocket.send('message', {
      a: 'b',
      c: [],
      testData: 'websocket test Data'
    });
  }
);

const webSocketMessageList = ref([]);

function onMessage(event) {
  try {
    console.log({ event, data: event.data });
    const payload = JSON.parse(event.data);
    if (payload.data) {
      const newWebSocketMessage = _cloneDeep(webSocketMessageList.value);
      newWebSocketMessage.push(payload.data);
      webSocketMessageList.value = newWebSocketMessage;
    }
  } catch (e) {
    console.log('onMessage error', e);
  }
}

watch(
  () => webSocket.value,
  (newWebSocket) => {
    console.log({ newWebSocket });
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.websocket_page {
}
</style>
