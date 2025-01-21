<template>
  <div class="face_api_page">
    <div class="face_api_page-video_output">
      <video
        ref="videoEl"
        class="face_api_page-video_output-origin_video"
        width="480"
        height="360"
        autoplay
        controls
        :srcObject="streamObj"
      />
      <canvas
        ref="canvasVideo"
        class="face_api_page-video_output-canvas"
        width="480"
        height="360"
      />
    </div>

    <p>Display detected face bounding boxes</p>
    <div class="face_api_page-video_output">
      <div class="face_api_page-video_output-face_output">
        <canvas
          ref="detectionsVideo"
          class="face_api_page-video_output-face_output-canvas"
          width="480"
          height="360"
        />
        <canvas
          ref="detectionsOutput"
          class="face_api_page-video_output-face_output-face_video"
          width="480"
          height="360"
        />
      </div>
      <div class="face_api_page-video_output-data_output">
        <p class="face_api_page-video_output-data_output-title">
          faceBoundingBoxesData:
        </p>
        <p class="face_api_page-video_output-data_output-content">
          {{ faceBoundingBoxesData }}
        </p>
      </div>
    </div>

    <p>Display face landmarks</p>
    <div class="face_api_page-video_output">
      <div class="face_api_page-video_output-face_output">
        <canvas
          ref="detectionsWithLandmarksVideo"
          class="face_api_page-video_output-face_output-canvas"
          width="480"
          height="360"
        />

        <canvas
          ref="detectionsWithLandmarksOutput"
          class="face_api_page-video_output-face_output-face_video"
          width="480"
          height="360"
        />
      </div>
      <div class="face_api_page-video_output-data_output">
        <p class="face_api_page-video_output-data_output-title">
          faceLandmarksData:
        </p>
        <p class="face_api_page-video_output-data_output-content">
          {{ faceLandmarksData }}
        </p>
      </div>
    </div>

    <p>Display face expression results</p>
    <div class="face_api_page-video_output">
      <div class="face_api_page-video_output-face_output">
        <canvas
          ref="detectionsWithExpressionsVideo"
          class="face_api_page-video_output-face_output-canvas"
          width="480"
          height="360"
        />

        <canvas
          ref="detectionsWithExpressionsOutput"
          class="face_api_page-video_output-face_output-face_video"
          width="480"
          height="360"
        />
      </div>
      <div class="face_api_page-video_output-data_output">
        <p class="face_api_page-video_output-data_output-title">
          faceExpressionResultsData:
        </p>
        <p class="face_api_page-video_output-data_output-content">
          {{ faceExpressionResultsData }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
// https://github.com/justadudewhohacks/face-api.js/tree/master
// https://justadudewhohacks.github.io/face-api.js/docs/globals.html
// https://gitee.com/tongjh/face-api-demo

const MODELS_PATH = '/models';

const videoEl = useTemplateRef('videoEl');
const canvasVideo = useTemplateRef('canvasVideo');
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

const [faceapi, faceapiInit] = useFaceapi(MODELS_PATH);
const streamObj = useCameraStream(handleFaceApi);

const faceBoundingBoxesData = ref(null);
const faceLandmarksData = ref(null);
const faceExpressionResultsData = ref(null);

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
  // window.requestAnimationFrame(() => handleFrameFromVideo(canvas));
}

async function handleFaceApi() {
  if (videoEl.value === null) return;
  handleFrameFromVideo(canvasVideo.value);

  await faceapiInit(MODELS_PATH);
  await handleDetections(MODELS_PATH);
  await handleDetectionsWithLandmarks(MODELS_PATH);
  await hadnleDetectionsWithExpressions(MODELS_PATH);

  window.requestAnimationFrame(() =>
    setTimeout(async () => {
      await handleFaceApi(MODELS_PATH);
    }, 100)
  );
}

function getDisplaySize(outputEl) {
  const outputStyle = window.getComputedStyle(outputEl);

  return {
    width: outputEl.width || Number(outputStyle.width.replace('px', '')),
    height: outputEl.height || Number(outputStyle.height.replace('px', ''))
  };
}

async function handleDetections(MODELS_PATH) {
  if (videoEl.value === null) return;
  await faceapi.nets.ssdMobilenetv1.load(MODELS_PATH);

  const canvas = detectionsVideo.value;
  handleFrameFromVideo(canvas);

  try {
    const displaySize = getDisplaySize(videoEl.value);

    /* Display detected face bounding boxes */
    const detections = await faceapi.detectAllFaces(videoEl.value);

    faceapi.matchDimensions(detectionsOutput.value, displaySize);

    const _faceBoundingBoxesData = [];
    if (Array.isArray(detections)) {
      detections.forEach((detection) => {
        _faceBoundingBoxesData.push(detection.score);
      });
    }
    faceBoundingBoxesData.value = _faceBoundingBoxesData;

    // resize the detected boxes in case your displayed image has a different size than the original
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    // console.log({ detections, resizedDetections });

    // draw detections into the canvas
    faceapi.draw.drawDetections(detectionsOutput.value, resizedDetections);
  } catch (error) {
    console.error(error);
  }
}

async function handleDetectionsWithLandmarks(MODELS_PATH) {
  if (videoEl.value === null) return;
  await faceapi.loadFaceLandmarkModel(MODELS_PATH);

  const canvas = detectionsWithLandmarksVideo.value;
  handleFrameFromVideo(canvas);

  try {
    const displaySize = getDisplaySize(videoEl.value);

    faceapi.matchDimensions(detectionsWithLandmarksOutput.value, displaySize);

    /* Display face landmarks */
    const detectionsWithLandmarks = await faceapi
      .detectAllFaces(videoEl.value)
      .withFaceLandmarks();

    const _faceLandmarksData = [];
    if (Array.isArray(detectionsWithLandmarks)) {
      detectionsWithLandmarks.forEach((detectionsWithLandmark) => {
        if (typeof detectionsWithLandmark === 'object') {
          _faceLandmarksData.push(detectionsWithLandmark);
        }
      });
    }
    faceLandmarksData.value = _faceLandmarksData;

    // resize the detected boxes and landmarks in case your displayed image has a different size than the original
    const resizedResults = faceapi.resizeResults(
      detectionsWithLandmarks,
      displaySize
    );
    // console.log({ detectionsWithLandmarks, resizedResults });

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

async function hadnleDetectionsWithExpressions(MODELS_PATH) {
  if (videoEl.value === null) return;
  await faceapi.loadFaceLandmarkModel(MODELS_PATH);
  await faceapi.loadFaceExpressionModel(MODELS_PATH);

  const canvas = detectionsWithExpressionsVideo.value;
  handleFrameFromVideo(canvas);

  try {
    const displaySize = getDisplaySize(videoEl.value);

    faceapi.matchDimensions(detectionsWithExpressionsOutput.value, displaySize);

    /* Display face expression results */
    const detectionsWithExpressions = await faceapi
      .detectAllFaces(videoEl.value)
      .withFaceLandmarks()
      .withFaceExpressions();

    const _faceExpressionResultsData = [];
    if (Array.isArray(detectionsWithExpressions)) {
      detectionsWithExpressions.forEach((detectionsWithExpression) => {
        if (typeof detectionsWithExpression?.expressions === 'object') {
          _faceExpressionResultsData.push(detectionsWithExpression.expressions);
        }
      });
    }
    faceExpressionResultsData.value = _faceExpressionResultsData;

    // resize the detected boxes and landmarks in case your displayed image has a different size than the original
    const resizedResults = faceapi.resizeResults(
      detectionsWithExpressions,
      displaySize
    );
    // draw detections into the canvas
    // console.log({ detectionsWithExpressions, resizedResults });

    faceapi.draw.drawDetections(
      detectionsWithExpressionsOutput.value,
      resizedResults
    );
    // draw a textbox displaying the face expressions with minimum probability into the canvas
    const minProbability = 0.05;
    faceapi.draw.drawFaceExpressions(
      detectionsWithExpressionsOutput.value,
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

  &-video_output {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;

    &-origin_video {
      // display: none;
      width: 480px;
      height: 360px;
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    &-canvas {
      @extend .face_api_page-video_output-origin_video;
      // display: block;
    }

    &-face_output {
      @extend .face_api_page-video_output-origin_video;
      position: relative;
      display: block;
      border: 1px solid;
      margin-bottom: 8px;

      &-canvas {
        @extend .face_api_page-video_output-origin_video;
        // display: block;
      }
      &-face_video {
        @extend .face_api_page-video_output-origin_video;
        position: absolute;
        top: 0;
        left: 0;
        // display: block;
      }
    }
    &-data_output {
      flex: 1;
      width: 100%;

      &-title {
        font-size: 24px;
      }
      &-content {
        width: 480px;
        max-width: 100%;
        height: 360px;
        overflow: auto;
      }
    }
  }
}
</style>
