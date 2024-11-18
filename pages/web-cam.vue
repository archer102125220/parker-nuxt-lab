<template>
  <div class="web_cam_page">
    <video
      ref="videoEl"
      id="vid"
      class="web_cam_page-video"
      width="480"
      height="360"
      autoplay
      controls
      :srcObject="streamObj"
    />
    <canvas
      ref="canvasEl"
      id="canvas"
      class="web_cam_page-canvas"
      width="480"
      height="360"
    />
  </div>
</template>
<script setup>
// https://mrcodingroom.freesite.host/js%E5%B0%87video-webcam%E7%95%AB%E5%9C%A8canvas%E4%B8%8A/
const videoEl = useTemplateRef('videoEl');
const canvasEl = useTemplateRef('canvasEl');

const streamObj = useCameraStream(handleFrameFromVideo);

function handleFrameFromVideo() {
  const video = videoEl.value;
  const canvas = canvasEl.value;

  if (typeof canvas?.getContext !== 'function') return;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save(); // 儲存狀態

  // 左右翻轉
  // ctx.translate(video.width, 0);
  // ctx.scale(-1, 1);

  ctx.drawImage(video, 0, 0, video.width, video.height);
  ctx.restore(); // 到此才輸出，才不會還沒整體操作完就放出，會造成畫面快速抖動
  window.requestAnimationFrame(handleFrameFromVideo);
}
</script>
<style lang="scss">
.web_cam_page {
  font-family: sans-serif;
  &-video {
    display: none;
    width: 480px;
    height: 360px;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  &-canvas {
    @extend .web_cam_page-video;
    display: block;
    border: 1px solid;
  }
}
</style>
