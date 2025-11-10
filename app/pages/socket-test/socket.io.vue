<template>
  <section class="socket_io_page">
    <p>接收到的data：</p>
    <div>
      <p
        v-for="(socketIoClientMessage, index) in socketIoClientMessageList"
        :key="index"
      >
        {{ socketIoClientMessage }}
      </p>
    </div>
  </section>
</template>

<script setup>
useHeadMataData({
  title: 'socket.io測試'
});
import _cloneDeep from 'lodash/cloneDeep';

const socketIoClientConnected = ref(false);
const socketIoClient = useSocketIoClient(
  { channel: '/' },
  null,
  function (newSocketIo) {
    newSocketIo.on('socket.io-test', onMessage);
    newSocketIo.on('message', onMessage);
    newSocketIo.on('connect', () => {
      socketIoClientConnected.value = newSocketIo.connected;
    });
    newSocketIo.on('disconnect', () => {
      socketIoClientConnected.value = newSocketIo.connected;
    });
  }
);

const socketIoClientMessageList = ref([]);

function onMessage(payload) {
  console.log({ payload });
  const newSocketIoClientMessage = _cloneDeep(socketIoClientMessageList.value);
  newSocketIoClientMessage.push(payload);
  socketIoClientMessageList.value = newSocketIoClientMessage;
}

watch(
  () => socketIoClientConnected.value,
  async (newSocketIoClientConnected) => {
    console.log({ newSocketIoClientConnected });
    if (newSocketIoClientConnected === true) {
      await new Promise((resolve) => nextTick(() => setTimeout(resolve, 250)));

      socketIoClient.io.emit('socket.io-test', {
        a: 'b',
        c: [],
        testData: 'socket.io test Data'
      });
      socketIoClient.io.emit('message', {
        a: 'b',
        c: [],
        testData: 'message test Data'
      });
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.socket_io_page {
}
</style>
