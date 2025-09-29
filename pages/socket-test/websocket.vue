<template>
  <div class="websocket_page">
    <p>測試中</p>
  </div>
</template>

<script setup>
useHeadMataData({
  title: '原生配合Nuxt3內建的websocket'
});
const webSocket = useWebSocket({ channel: '/' });

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
