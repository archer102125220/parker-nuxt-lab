<template>
  <!-- TODO:人工測試換臉功能是否正常運作 -->
  <div class="face_swap_frontend_page">
    <!-- Hero Section -->
    <section class="face_swap_frontend_page-hero">
      <div class="face_swap_frontend_page-hero-background">
        <img
          src="/img/face-swap/face-swap-v.02.png"
          alt="Face Swap Frontend"
          class="face_swap_frontend_page-hero-background-image"
        />
        <div class="face_swap_frontend_page-hero-background-overlay" />
      </div>

      <div class="face_swap_frontend_page-hero-content">
        <h1 class="face_swap_frontend_page-hero-content-title">
          {{ $t('face_swap_frontend.hero.title') }}
        </h1>
        <p class="face_swap_frontend_page-hero-content-subtitle">
          {{ $t('face_swap_frontend.hero.subtitle') }}
        </p>
        <p class="face_swap_frontend_page-hero-content-description">
          {{ $t('face_swap_frontend.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Usage Tip -->
    <v-alert
      type="info"
      variant="tonal"
      class="face_swap_frontend_page-tip"
      closable
    >
      <strong>{{ $t('face_swap_frontend.tip.title') }}</strong>
      {{ $t('face_swap_frontend.tip.content') }}
    </v-alert>

    <!-- Face Swap Section -->
    <section class="face_swap_frontend_page-section">
      <div class="face_swap_frontend_page-swap_section">
        <div class="face_swap_frontend_page-swap_section-source">
          <h3>{{ $t('face_swap_frontend.sections.source') }}</h3>
          <ImageUpload
            ref="sourceFaceEl"
            v-model="sourceFaceImage"
            :btn-label="$t('face_swap_frontend.upload.button')"
            :label="$t('face_swap_frontend.upload.label')"
            :mask-label="$t('face_swap_frontend.upload.mask')"
            class="face_swap_frontend_page-swap_section-source-upload"
            @change="handleSourceImageChange"
          />
        </div>

        <div class="face_swap_frontend_page-swap_section-target">
          <h3>{{ $t('face_swap_frontend.sections.target') }}</h3>
        <div
          class="face_swap_frontend_page-swap_section-target-video_container"
        >
          <video
            ref="videoEl"
            class="face_swap_frontend_page-swap_section-target-video"
            width="480"
            height="360"
            autoplay
            :srcObject="streamObj"
          />
          <canvas
            ref="targetOverlayCanvas"
            class="face_swap_frontend_page-swap_section-target-overlay"
            width="480"
            height="360"
          />
        </div>
        </div>

        <div class="face_swap_frontend_page-swap_section-result">
          <h3>{{ $t('face_swap_frontend.sections.result') }}</h3>
        <canvas
          ref="resultCanvas"
          class="face_swap_frontend_page-swap_section-result-canvas"
          width="480"
          height="360"
        />
      </div>
    </div>
    </section>

    <!-- Image Size Warning -->
    <v-alert v-if="imageSizeWarning" type="warning" variant="tonal" class="face_swap_frontend_page-warning">
      <p>⚠️ <strong>{{ $t('face_swap_frontend.size_warning.title') }}</strong></p>
      <p>{{ $t('face_swap_frontend.size_warning.content') }}</p>
    </v-alert>

    <!-- Control Buttons -->
    <div class="face_swap_frontend_page-controls">
      <v-btn
        color="primary"
        size="large"
        :loading="isSwapping"
        :disabled="!canSwap"
        @click="performFaceSwap"
      >
        <v-icon start>mdi-face-recognition</v-icon>
        {{ $t('face_swap_frontend.buttons.swap') }}
      </v-btn>

      <v-btn
        color="secondary"
        size="large"
        variant="outlined"
        @click="resetSwap"
      >
        <v-icon start>mdi-refresh</v-icon>
        {{ $t('face_swap_frontend.buttons.reset') }}
      </v-btn>

      <v-btn
        color="success"
        size="large"
        variant="outlined"
        :disabled="!hasResult"
        @click="downloadResult"
      >
        <v-icon start>mdi-download</v-icon>
        {{ $t('face_swap_frontend.buttons.download') }}
      </v-btn>
    </div>

    <!-- Status Message -->
    <v-alert
      v-if="statusMessage"
      :type="statusType"
      class="face_swap_frontend_page-status"
      closable
      @click:close="statusMessage = ''"
    >
      {{ statusMessage }}
    </v-alert>

    <!-- Detection Info (Collapsible) -->
    <v-expansion-panels
      v-model="expansionPanels"
      class="face_swap_frontend_page-panels"
    >
      <v-expansion-panel :title="$t('face_swap_frontend.panels.detection')">
        <v-expansion-panel-text>
          <div class="face_swap_frontend_page-row">
            <div class="face_swap_frontend_page-row-face_output">
              <canvas
                ref="detectionsVideo"
                class="face_swap_frontend_page-row-face_output-canvas"
                width="480"
                height="360"
              />
              <canvas
                ref="detectionsOutput"
                class="face_swap_frontend_page-row-face_output-face_video"
                width="480"
                height="360"
              />
            </div>
            <div class="face_swap_frontend_page-row-data_output">
              <p class="face_swap_frontend_page-row-data_output-title">
                faceBoundingBoxesData:
              </p>
              <p class="face_swap_frontend_page-row-data_output-content">
                {{ faceBoundingBoxesData }}
              </p>
            </div>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel :title="$t('face_swap_frontend.panels.landmarks')">
        <v-expansion-panel-text>
          <div class="face_swap_frontend_page-row">
            <div class="face_swap_frontend_page-row-face_output">
              <canvas
                ref="detectionsWithLandmarksVideo"
                class="face_swap_frontend_page-row-face_output-canvas"
                width="480"
                height="360"
              />
              <canvas
                ref="detectionsWithLandmarksOutput"
                class="face_swap_frontend_page-row-face_output-face_video"
                width="480"
                height="360"
              />
            </div>
            <div class="face_swap_frontend_page-row-data_output">
              <p class="face_swap_frontend_page-row-data_output-title">
                faceLandmarksData:
              </p>
              <p class="face_swap_frontend_page-row-data_output-content">
                {{ faceLandmarksData }}
              </p>
            </div>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel :title="$t('face_swap_frontend.panels.expressions')">
        <v-expansion-panel-text>
          <div class="face_swap_frontend_page-row">
            <div class="face_swap_frontend_page-row-face_output">
              <canvas
                ref="detectionsWithExpressionsVideo"
                class="face_swap_frontend_page-row-face_output-canvas"
                width="480"
                height="360"
              />
              <canvas
                ref="detectionsWithExpressionsOutput"
                class="face_swap_frontend_page-row-face_output-face_video"
                width="480"
                height="360"
              />
            </div>
            <div class="face_swap_frontend_page-row-data_output">
              <p class="face_swap_frontend_page-row-data_output-title">
                faceExpressionResultsData:
              </p>
              <p class="face_swap_frontend_page-row-data_output-content">
                {{ faceExpressionResultsData }}
              </p>
            </div>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('face_swap_frontend.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('face_swap_frontend.hero.description')
    }
  ]
});
// https://github.com/justadudewhohacks/face-api.js/tree/master
// https://justadudewhohacks.github.io/face-api.js/docs/globals.html
// https://gitee.com/tongjh/face-api-demo

const MODELS_PATH = '/ai_models';

const system = useSystemStore();

// Template refs
const sourceFaceEl = useTemplateRef('sourceFaceEl');
const videoEl = useTemplateRef('videoEl');
const targetOverlayCanvas = useTemplateRef('targetOverlayCanvas');
const resultCanvas = useTemplateRef('resultCanvas');
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

// Face API
const [faceapi, faceapiInit] = useFaceapi(MODELS_PATH);
const streamObj = useCameraStream(null, handleFaceApi);

// State
const faceBoundingBoxesData = ref(null);
const faceLandmarksData = ref(null);
const faceExpressionResultsData = ref(null);
const sourceFaceImage = ref('');
const isSwapping = ref(false);
const hasResult = ref(false);
const statusMessage = ref('');
const statusType = ref('info');
const imageSizeWarning = ref(false); // Track if source image size is problematic
const expansionPanels = ref([]);

// Computed
const canSwap = computed(() => {
  return (
    sourceFaceImage.value !== '' &&
    sourceFaceImage.value !== null &&
    streamObj.value !== null
  );
});

// Face swap core functions
async function performFaceSwap() {
  if (!canSwap.value) {
    showStatus('請先上傳來源照片並確認攝影機已啟動', 'warning');
    return;
  }

  isSwapping.value = true;
  showStatus('正在偵測人臉...', 'info');

  try {
    // Use ssdMobilenetv1 to match the detection box display
    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODELS_PATH),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODELS_PATH),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODELS_PATH)
    ]);

    // Detect source face on preview element
    // NOTE: For best results, source image should have similar dimensions to target video
    const sourceDetection = await faceapi
      .detectSingleFace(sourceFaceEl.value?.previewEl)
      .withFaceLandmarks();

    if (sourceDetection === undefined) {
      throw new Error('無法在來源照片中偵測到人臉');
    }

    // Detect target face from video
    const targetDetection = await faceapi
      .detectSingleFace(videoEl.value)
      .withFaceLandmarks();

    if (targetDetection === undefined) {
      throw new Error('無法在攝影機畫面中偵測到人臉');
    }

    showStatus('正在執行人臉替換...', 'info');

    // Perform face swap
    await blendFaces(sourceDetection, targetDetection);

    hasResult.value = true;
    showStatus('人臉替換完成！', 'success');
  } catch (error) {
    console.error(error);
    showStatus(error.message || '人臉替換失敗', 'error');
  } finally {
    isSwapping.value = false;
  }
}

// Helper function to load image from base64 (same as backend)
function loadImageFromBase64(base64) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = base64;
  });
}

async function blendFaces(sourceDetection, targetDetection) {
  const canvas = resultCanvas.value;
  const ctx = canvas.getContext('2d');
  const video = videoEl.value;
  const sourceImg = sourceFaceEl.value?.previewEl;

  if (ctx === null || video === null || sourceImg === null) {
    return;
  }

  // Draw video frame as background
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Get face bounding boxes
  const sourceBox = sourceDetection.detection.box;
  const targetBox = targetDetection.detection.box;

  // LIMITATION: This simple approach works best when source and target images
  // have similar dimensions. For production use, consider using backend API
  // which handles coordinate scaling properly.

  const padding = 20;

  // Extract source face region
  const sx = Math.max(0, sourceBox.x - padding);
  const sy = Math.max(0, sourceBox.y - padding);
  let sw = Math.min(sourceImg.width - sx, sourceBox.width + padding * 2);
  let sh = Math.min(sourceImg.height - sy, sourceBox.height + padding * 2);

  // If dimensions are invalid, use fallback values to prevent errors
  // (User has already been warned via UI alert)
  if (sw <= 0 || sh <= 0) {
    console.warn('Invalid face region dimensions, using fallback:', {
      original: { sw, sh },
      sourceImg: { w: sourceImg.width, h: sourceImg.height },
      sourceBox
    });
    // Use minimum safe dimensions as fallback
    sw = Math.max(10, Math.min(sourceImg.width, sourceBox.width));
    sh = Math.max(10, Math.min(sourceImg.height, sourceBox.height));
  }

  // Target placement region
  const tx = targetBox.x - padding;
  const ty = targetBox.y - padding;
  const tw = targetBox.width + padding * 2;
  const th = targetBox.height + padding * 2;

  // Create temporary canvas for source face
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = sw;
  tempCanvas.height = sh;
  const tempCtx = tempCanvas.getContext('2d');

  // Draw source face region
  tempCtx.drawImage(sourceImg, sx, sy, sw, sh, 0, 0, sw, sh);

  // Apply elliptical mask
  tempCtx.globalCompositeOperation = 'destination-in';
  tempCtx.beginPath();
  tempCtx.ellipse(sw / 2, sh / 2, sw / 2.2, sh / 2.2, 0, 0, Math.PI * 2);
  tempCtx.fill();

  // Blend onto result canvas
  ctx.globalAlpha = 0.85;
  ctx.drawImage(tempCanvas, 0, 0, sw, sh, tx, ty, tw, th);
  ctx.globalAlpha = 1;
}

// Check source image dimensions and show warning if needed
function handleSourceImageChange(file) {
  if (!file || !file.width || !file.height) {
    imageSizeWarning.value = false;
    return;
  }

  // Target video dimensions (typical webcam resolution)
  const targetWidth = 640;
  const targetHeight = 480;

  // Check if image dimensions differ significantly from target
  const widthRatio = file.width / targetWidth;
  const heightRatio = file.height / targetHeight;

  // Show warning if dimensions are very different (more than 2x or less than 0.5x)
  const isDifferent =
    widthRatio > 2 || widthRatio < 0.5 || heightRatio > 2 || heightRatio < 0.5;

  imageSizeWarning.value = isDifferent;

  if (isDifferent) {
    console.log('Image size warning:', {
      source: { w: file.width, h: file.height },
      target: { w: targetWidth, h: targetHeight },
      ratio: { w: widthRatio.toFixed(2), h: heightRatio.toFixed(2) }
    });
  }
}

function resetSwap() {
  const canvas = resultCanvas.value;
  if (canvas !== null) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  hasResult.value = false;
  statusMessage.value = '';
  imageSizeWarning.value = false; // Reset warning
}

function downloadResult() {
  const canvas = resultCanvas.value;
  if (canvas === null) {
    return;
  }

  const link = document.createElement('a');
  link.download = `face-swap-result-${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();

  showStatus('圖片已下載', 'success');
}

function showStatus(message, type = 'info') {
  statusMessage.value = message;
  statusType.value = type;
}

// Existing detection functions
function handleFrameFromVideo(canvas) {
  const video = videoEl.value;
  if (video === null) {
    return;
  }

  if (typeof canvas?.getContext !== 'function') {
    return;
  }

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.drawImage(video, 0, 0, video.width, video.height);
  ctx.restore();
}

async function handleFaceApi() {
  if (videoEl.value === null) {
    return;
  }

  await faceapiInit(MODELS_PATH);
  await handleDetections(MODELS_PATH);
  await handleDetectionsWithLandmarks(MODELS_PATH);
  await hadnleDetectionsWithExpressions(MODELS_PATH);

  // Draw overlay on target video
  drawTargetOverlay();

  window.requestAnimationFrame(() =>
    setTimeout(async () => {
      await handleFaceApi(MODELS_PATH);
    }, 100)
  );
}

async function drawTargetOverlay() {
  const canvas = targetOverlayCanvas.value;
  if (canvas === null || videoEl.value === null) {
    return;
  }

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  try {
    // Use ssdMobilenetv1 for accurate face detection (same as face-api.vue)
    await faceapi.nets.ssdMobilenetv1.load(MODELS_PATH);

    const displaySize = {
      width: canvas.width,
      height: canvas.height
    };

    // Detect face without TinyFaceDetectorOptions (same as face-api.vue)
    const detection = await faceapi.detectSingleFace(videoEl.value);

    if (detection !== undefined) {
      // Use face-api's built-in method to draw detection box
      faceapi.matchDimensions(canvas, displaySize);
      const resizedDetection = faceapi.resizeResults(detection, displaySize);
      faceapi.draw.drawDetections(canvas, [resizedDetection]);
    }
  } catch (error) {
    // Silently ignore detection errors
  }
}

function getDisplaySize(outputEl) {
  const outputStyle = window.getComputedStyle(outputEl);

  return {
    width: outputEl.width || Number(outputStyle.width.replace('px', '')),
    height: outputEl.height || Number(outputStyle.height.replace('px', ''))
  };
}

async function handleDetections(modelsPath = MODELS_PATH) {
  if (videoEl.value === null) {
    return;
  }
  await faceapi.nets.ssdMobilenetv1.load(modelsPath);

  const canvas = detectionsVideo.value;
  // Skip if canvas not rendered (expansion panel collapsed)
  if (canvas === null || detectionsOutput.value === null) {
    return;
  }
  handleFrameFromVideo(canvas);

  try {
    const displaySize = getDisplaySize(videoEl.value);

    const detections = await faceapi.detectAllFaces(videoEl.value);

    faceapi.matchDimensions(detectionsOutput.value, displaySize);

    const _faceBoundingBoxesData = [];
    if (Array.isArray(detections)) {
      detections.forEach((detection) => {
        _faceBoundingBoxesData.push(detection.score);
      });
    }
    faceBoundingBoxesData.value = _faceBoundingBoxesData;

    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    faceapi.draw.drawDetections(detectionsOutput.value, resizedDetections);
  } catch (error) {
    console.error(error);
  }
}

async function handleDetectionsWithLandmarks(modelsPath = MODELS_PATH) {
  if (videoEl.value === null) {
    return;
  }
  await faceapi.loadFaceLandmarkModel(modelsPath);

  const canvas = detectionsWithLandmarksVideo.value;
  // Skip if canvas not rendered (expansion panel collapsed)
  if (canvas === null || detectionsWithLandmarksOutput.value === null) {
    return;
  }
  handleFrameFromVideo(canvas);

  try {
    const displaySize = getDisplaySize(videoEl.value);

    faceapi.matchDimensions(detectionsWithLandmarksOutput.value, displaySize);

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

    const resizedResults = faceapi.resizeResults(
      detectionsWithLandmarks,
      displaySize
    );

    faceapi.draw.drawDetections(
      detectionsWithLandmarksOutput.value,
      resizedResults
    );
    faceapi.draw.drawFaceLandmarks(
      detectionsWithLandmarksOutput.value,
      resizedResults
    );
  } catch (error) {
    console.error(error);
  }
}

async function hadnleDetectionsWithExpressions(modelsPath = MODELS_PATH) {
  if (videoEl.value === null) {
    return;
  }
  await faceapi.loadFaceLandmarkModel(modelsPath);
  await faceapi.loadFaceExpressionModel(modelsPath);

  const canvas = detectionsWithExpressionsVideo.value;
  // Skip if canvas not rendered (expansion panel collapsed)
  if (canvas === null || detectionsWithExpressionsOutput.value === null) {
    return;
  }
  handleFrameFromVideo(canvas);

  try {
    const displaySize = getDisplaySize(videoEl.value);

    faceapi.matchDimensions(detectionsWithExpressionsOutput.value, displaySize);

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

    const resizedResults = faceapi.resizeResults(
      detectionsWithExpressions,
      displaySize
    );

    faceapi.draw.drawDetections(
      detectionsWithExpressionsOutput.value,
      resizedResults
    );
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
.face_swap_frontend_page {
  /* Display & Box Model */
  min-height: 100vh;

  /* Typography */
  font-family: sans-serif;

  // ========================================
  // Hero Section
  // ========================================
  &-hero {
    // Positioning
    position: relative;

    // Display & Box Model
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;

    // Visual
    overflow: hidden;

    &-background {
      // Positioning
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;

      // Display & Box Model
      width: 100%;
      height: 100%;

      &-image {
        // Display & Box Model
        width: 100%;
        height: 100%;

        // Visual
        object-fit: cover;
      }

      &-overlay {
        // Positioning
        position: absolute;
        top: 0;
        left: 0;

        // Display & Box Model
        width: 100%;
        height: 100%;

        // Visual
        background: linear-gradient(135deg, rgba(68, 160, 141, 0.9) 0%, rgba(78, 205, 196, 0.85) 100%);
      }
    }

    &-content {
      // Positioning
      position: relative;
      z-index: 1;

      // Display & Box Model
      max-width: 800px;
      text-align: center;

      &-title {
        // Display & Box Model
        margin: 0 0 12px 0;

        // Typography
        font-size: 42px;
        font-weight: 800;
        color: #ffffff;

        // Animation
        animation: fade-in-up 0.6s ease-out;

        @media (max-width: 768px) {
          font-size: 32px;
        }
      }

      &-subtitle {
        // Display & Box Model
        margin: 0 0 16px 0;

        // Typography
        font-size: 20px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.95);

        // Animation
        animation: fade-in-up 0.6s ease-out 0.1s both;

        @media (max-width: 768px) {
          font-size: 18px;
        }
      }

      &-description {
        // Display & Box Model
        margin: 0;

        // Typography
        font-size: 16px;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.9);

        // Animation
        animation: fade-in-up 0.6s ease-out 0.2s both;
      }
    }
  }

  &-tip {
    // Display & Box Model
    max-width: 1200px;
    margin: 24px auto;
  }

  &-section {
    // Display & Box Model
    padding: 40px 20px;
  }

  &-swap_section {
    /* Display & Box Model */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    width: 100%;
    max-width: 1200px;
    margin-bottom: 24px;
    padding: 24px;

    /* Visual */
    background-color: rgba(0, 0, 0, 0.02);
    border-radius: 12px;

    h3 {
      /* Display & Box Model */
      margin-bottom: 12px;

      /* Typography */
      font-size: 1.1rem;
      text-align: center;
    }

    &-source {
      /* Display & Box Model */
      display: flex;
      flex-direction: column;

      &-upload {
        /* Display & Box Model */
        min-height: 280px;
      }
    }

    &-target {
      /* Display & Box Model */
      display: flex;
      flex-direction: column;

      &-video_container {
        /* Positioning */
        position: relative;

        /* Display & Box Model */
        width: 100%;
        max-width: 480px;
        margin: 0 auto;
      }

      &-video {
        /* Display & Box Model */
        width: 100%;
        height: auto;

        /* Visual */
        border-radius: 8px;
        object-fit: cover;
      }

      &-overlay {
        /* Positioning */
        position: absolute;
        top: 0;
        left: 0;

        /* Display & Box Model */
        width: 100%;
        height: 100%;

        /* Misc */
        pointer-events: none;
      }
    }

    &-result {
      /* Display & Box Model */
      display: flex;
      flex-direction: column;

      &-canvas {
        /* Display & Box Model */
        width: 100%;
        max-width: 480px;
        height: auto;
        margin: 0 auto;

        /* Visual */
        background-color: #f0f0f0;
        border: 2px dashed #ccc;
        border-radius: 8px;
      }
    }
  }

  &-controls {
    /* Display & Box Model */
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    margin-top: 16px;
    margin-bottom: 24px;
  }

  &-status {
    /* Display & Box Model */
    width: 100%;
    max-width: 600px;
    margin: auto;
    margin-bottom: 24px;
  }

  &-panels {
    /* Display & Box Model */
    width: 100%;
    max-width: 1200px;
  }

  &-row {
    /* Display & Box Model */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;

    &-origin_video {
      /* Display & Box Model */
      width: 480px;
      height: 360px;
      max-width: 100%;
      max-height: 100%;

      /* Misc */
      object-fit: contain;
    }

    &-canvas {
      @extend .face_swap_frontend_page-row-origin_video;
    }

    &-face_output {
      @extend .face_swap_frontend_page-row-origin_video;

      /* Positioning */
      position: relative;

      /* Display & Box Model */
      display: block;
      margin-bottom: 8px;
      border: 1px solid;

      &-canvas {
        @extend .face_swap_frontend_page-row-origin_video;
      }

      &-face_video {
        @extend .face_swap_frontend_page-row-origin_video;

        /* Positioning */
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    &-data_output {
      /* Display & Box Model */
      flex: 1;
      width: 100%;

      &-title {
        /* Typography */
        font-size: 24px;
      }

      &-content {
        /* Display & Box Model */
        width: 480px;
        max-width: 100%;
        height: 360px;
        overflow: auto;
      }
    }
  }
}
</style>
