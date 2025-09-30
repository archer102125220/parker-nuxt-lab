<template>
  <div class="socket_io_page">
    <p>測試中</p>
    <div>
      <p
        v-for="(socketIoClientMessage, index) in socketIoClientMessageList"
        :key="index"
      >
        {{ socketIoClientMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
useHeadMataData({
  title: 'socket.io測試'
});
import _cloneDeep from 'lodash/cloneDeep';

const socketIoClientConnected = ref(false);
const socketIoClient = useSocketIoClient(
  { channel: '/' },
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

function onMessage(...arg) {
  console.log({ arg });
  const newSocketIoClientMessage = _cloneDeep(socketIoClientMessageList.value);
  newSocketIoClientMessage.push([...arg]);
  socketIoClientMessageList.value = newSocketIoClientMessage;
}

watch(
  () => socketIoClientConnected.value,
  async (newSocketIoClientConnected) => {
    console.log({ newSocketIoClientConnected });
    if (newSocketIoClientConnected === true) {
      await new Promise((resolve) => nextTick(() => setTimeout(resolve, 250)));

      socketIoClient.value.emit('socket.io-test', {
        a: 'b',
        c: [],
        testData: 'socket.io test Data'
      });
      socketIoClient.value.emit('message', {
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
