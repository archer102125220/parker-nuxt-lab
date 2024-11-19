<template>
  <div class="face_api_page">
    <video
      ref="videoEl"
      class="face_api_page-video"
      width="480"
      height="360"
      autoplay
      controls
      :srcObject="streamObj"
    />
    <div class="face_api_page-video_output">
      <canvas
        ref="detectionsVideo"
        class="face_api_page-video_output-canvas"
        width="480"
        height="360"
      />
      <canvas
        ref="detectionsOutput"
        class="face_api_page-video_output-face_output"
        width="480"
        height="360"
      />
    </div>

    <div class="face_api_page-video_output">
      <canvas
        ref="detectionsWithLandmarksVideo"
        class="face_api_page-video_output-canvas"
        width="480"
        height="360"
      />

      <canvas
        ref="detectionsWithLandmarksOutput"
        class="face_api_page-video_output-face_output"
        width="480"
        height="360"
      />
    </div>

    <div class="face_api_page-video_output">
      <canvas
        ref="detectionsWithExpressionsVideo"
        class="face_api_page-video_output-canvas"
        width="480"
        height="360"
      />

      <canvas
        ref="detectionsWithExpressionsOutput"
        class="face_api_page-video_output-face_output"
        width="480"
        height="360"
      />
    </div>
  </div>
</template>
<script setup>
// https://github.com/justadudewhohacks/face-api.js/tree/master

const videoEl = useTemplateRef('videoEl');
const detectionsVideo = useTemplateRef('detectionsVideo');
const detectionsOutput = useTemplateRef('detectionsOutput');
const detectionsWithLandmarksVideo = useTemplateRef(
  'detectionsWithLandmarksVideo'
);
const detectionsWithLandmarksOutput = useTemplateRef(
  'detectionsWithLandmarksOutput'
);
const detectionsWithExpressionsVideo = useTemplateRef(
  'detectionsWithExpressionsVideo'
);
const detectionsWithExpressionsOutput = useTemplateRef(
  'detectionsWithExpressionsOutput'
);

const [faceapi, faceapiInit] = useFaceapi('/models');
const streamObj = useCameraStream(handleFaceApi);

function handleFrameFromVideo(canvas) {
  const video = videoEl.value;
  if (video === null) return;

  if (typeof canvas?.getContext !== 'function') return;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save(); // 儲存狀態

  // 左右翻轉
  // ctx.translate(video.width, 0);
  // ctx.scale(-1, 1);

  ctx.drawImage(video, 0, 0, video.width, video.height);
  ctx.restore(); // 到此才輸出，才不會還沒整體操作完就放出，會造成畫面快速抖動
  window.requestAnimationFrame(() => handleFrameFromVideo(canvas));
}

async function handleFaceApi() {
  if (videoEl.value === null) return;
  console.log('handleFaceApi');

  await faceapiInit();
  await handleDetections();
  // await handleDetectionsWithLandmarks();
  // await hadnleDetectionsWithExpressions();

  window.requestAnimationFrame(() =>
    setTimeout(async () => {
      await handleFaceApi();
    }, 100)
  );
}

function getDisplaySize(outputEl) {
  const outputStyle = window.getComputedStyle(outputEl);
  console.log(outputStyle.width, outputEl.width);

  return {
    width: outputEl.width || Number(outputStyle.width.replace('px', '')),
    height: outputEl.height || Number(outputStyle.height.replace('px', ''))
  };
}

async function handleDetections() {
  if (videoEl.value === null) return;
  const canvas = detectionsVideo.value;
  handleFrameFromVideo(canvas);

  try {
    const displaySize = getDisplaySize(videoEl.value);

    /* Display detected face bounding boxes */
    const detections = await faceapi.detectAllFaces(videoEl.value);

    faceapi.matchDimensions(detectionsOutput.value, displaySize);

    // resize the detected boxes in case your displayed image has a different size than the original
    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    // draw detections into the canvas
    faceapi.draw.drawDetections(detectionsOutput.value, resizedDetections);
  } catch (error) {
    console.error(error);
  }
}

async function handleDetectionsWithLandmarks() {
  if (videoEl.value === null) return;
  const canvas = detectionsWithLandmarksVideo.value;
  handleFrameFromVideo(canvas);

  console.log('handleDetectionsWithLandmarks');
  try {
    const displaySize = getDisplaySize(videoEl.value);

    faceapi.matchDimensions(detectionsOutput.value, displaySize);

    /* Display face landmarks */
    const detectionsWithLandmarks = await faceapi
      .detectAllFaces(videoEl.value)
      .withFaceLandmarks();
    // resize the detected boxes and landmarks in case your displayed image has a different size than the original
    const resizedResults = faceapi.resizeResults(
      detectionsWithLandmarks,
      displaySize
    );
    // draw detections into the canvas
    faceapi.draw.drawDetections(
      detectionsWithLandmarksOutput.value,
      resizedResults
    );
    // draw the landmarks into the canvas
    faceapi.draw.drawFaceLandmarks(
      detectionsWithLandmarksOutput.value,
      resizedResults
    );
  } catch (error) {
    console.error(error);
  }
}

async function hadnleDetectionsWithExpressions() {
  if (videoEl.value === null) return;
  const canvas = detectionsWithExpressionsVideo.value;
  handleFrameFromVideo(canvas);

  console.log('hadnleDetectionsWithExpressions');
  try {
    const displaySize = getDisplaySize(videoEl.value);

    faceapi.matchDimensions(detectionsOutput.value, displaySize);

    /* Display face expression results */
    const detectionsWithExpressions = await faceapi
      .detectAllFaces(videoEl.value)
      .withFaceLandmarks()
      .withFaceExpressions();
    // resize the detected boxes and landmarks in case your displayed image has a different size than the original
    const resizedResults = faceapi.resizeResults(
      detectionsWithExpressions,
      displaySize
    );
    // draw detections into the canvas
    faceapi.draw.drawDetections(
      detectionsWithExpressionsOutput.value,
      resizedResults
    );
    // draw a textbox displaying the face expressions with minimum probability into the canvas
    const minProbability = 0.05;
    faceapi.draw.drawFaceExpressions(
      detectionsWithExpressionsOutput.vaq,
      resizedResults,
      minProbability
    );
  } catch (error) {
    console.error(error);
  }
}
</script>
<style lang="scss">
.face_api_page {
  font-family: sans-serif;
  &-video {
    display: none;
    width: 480px;
    height: 360px;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  &-video_output {
    @extend .face_api_page-video;
    position: relative;
    display: block;
    border: 1px solid;
    margin-bottom: 8px;

    &-canvas {
      @extend .face_api_page-video;
      display: block;
    }
    &-face_output {
      @extend .face_api_page-video;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>
