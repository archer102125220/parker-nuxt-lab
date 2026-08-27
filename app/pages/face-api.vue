<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('face_api_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('face_api_page.hero.description')
    }
  ]
});

const DOMAIN = import.meta.env.VITE_DOMAIN || '';
const localePath = useLocalePath();

// Schema.org 結構化資料 (nuxt-schema-org)
useSchemaOrg([
  defineWebPage({
    '@type': 'WebPage',
    name: t('face_api_page.hero.title'),
    description: t('face_api_page.hero.description'),
    url: `${DOMAIN}${localePath('/face-api')}`,
    inLanguage: ['zh-TW', 'en'],
    image: `${DOMAIN}/img/face-api/face-api-v.04.webp`
  })
]);

// https://justadudewhohacks.github.io/face-api.js/docs/globals.html
// https://gitee.com/tongjh/face-api-demo

const MODELS_PATH = '/ai_models';

const system = useSystemStore();

const imgSelectorEl = useTemplateRef('imgSelectorEl');
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
const streamObj = useCameraStream(null, handleFaceApi);

const faceBoundingBoxesData = ref(null);
const faceLandmarksData = ref(null);
const faceExpressionResultsData = ref(null);
const identifyImage = ref('');
const distance = ref(100);

function handleFrameFromVideo(canvas) {
  const video = videoEl.value;
  if (video === null) return;

  if (typeof canvas?.getContext !== 'function') return;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();

  ctx.drawImage(video, 0, 0, video.width, video.height);
  ctx.restore();
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

// https://justadudewhohacks.github.io/face-api.js/docs/index.html
// https://www.cnblogs.com/keatkeat/p/15106226.html
async function handleDiscern() {
  if (
    (typeof identifyImage.value !== 'object' &&
      typeof identifyImage.value !== 'string') ||
    identifyImage.value === '' ||
    identifyImage.value === null
  ) {
    return;
  }
  system.setLoading(true);

  try {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODELS_PATH),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODELS_PATH),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODELS_PATH),
      faceapi.nets.faceExpressionNet.loadFromUri(MODELS_PATH),
      faceapi.nets.ageGenderNet.loadFromUri(MODELS_PATH)
    ]);

    const [videoDetections, imgDetections] = await Promise.all([
      faceapi
        .detectAllFaces(videoEl.value, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors()
        .withFaceExpressions()
        .withAgeAndGender(),
      faceapi
        .detectAllFaces(
          imgSelectorEl.value?.previewEl,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceDescriptors()
        .withFaceExpressions()
        .withAgeAndGender()
    ]);
    if (videoDetections === undefined) {
      throw new Error('video is no faces detected');
    }
    if (imgDetections === undefined) {
      throw new Error('image is no faces detected');
    }
    if (videoDetections?.[0] === undefined) {
      throw new Error('The video does not have any faces');
    }
    if (imgDetections?.[0] === undefined) {
      throw new Error('The image does not have any faces');
    }

    const _distance = faceapi.euclideanDistance(
      videoDetections?.[0]?.descriptor,
      imgDetections?.[0]?.descriptor
    );

    distance.value = _distance;
  } catch (error) {
    distance.value = 100;
    console.error(error);
  }

  system.setLoading(false);
}

async function handleDetections(modelsPath = MODELS_PATH) {
  if (videoEl.value === null) return;
  await faceapi.nets.ssdMobilenetv1.load(modelsPath);

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

    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    faceapi.draw.drawDetections(detectionsOutput.value, resizedDetections);
  } catch (error) {
    console.error(error);
  }
}

async function handleDetectionsWithLandmarks(modelsPath = MODELS_PATH) {
  if (videoEl.value === null) return;
  await Promise.all([
    faceapi.nets.ssdMobilenetv1.load(modelsPath),
    faceapi.nets.faceLandmark68Net.load(modelsPath)
  ]);

  const canvas = detectionsWithLandmarksVideo.value;
  handleFrameFromVideo(canvas);

  try {
    const displaySize = getDisplaySize(videoEl.value);

    /* Display face landmarks */
    const detectionsWithLandmarks = await faceapi
      .detectAllFaces(videoEl.value)
      .withFaceLandmarks();

    faceapi.matchDimensions(detectionsWithLandmarksOutput.value, displaySize);

    const _faceLandmarksData = [];
    if (Array.isArray(detectionsWithLandmarks)) {
      detectionsWithLandmarks.forEach((detection) => {
        _faceLandmarksData.push(detection.detection.score);
      });
    }
    faceLandmarksData.value = _faceLandmarksData;

    const resizedDetections = faceapi.resizeResults(
      detectionsWithLandmarks,
      displaySize
    );

    resizedDetections.forEach((detection) => {
      faceapi.draw.drawFaceLandmarks(
        detectionsWithLandmarksOutput.value,
        detection.landmarks
      );
    });
  } catch (error) {
    console.error(error);
  }
}

async function hadnleDetectionsWithExpressions(modelsPath = MODELS_PATH) {
  if (videoEl.value === null) return;
  await Promise.all([
    faceapi.nets.ssdMobilenetv1.load(modelsPath),
    faceapi.nets.faceExpressionNet.load(modelsPath)
  ]);

  const canvas = detectionsWithExpressionsVideo.value;
  handleFrameFromVideo(canvas);

  try {
    const displaySize = getDisplaySize(videoEl.value);

    /* Display face expression results */
    const detectionsWithExpressions = await faceapi
      .detectAllFaces(videoEl.value)
      .withFaceExpressions();

    faceapi.matchDimensions(detectionsWithExpressionsOutput.value, displaySize);

    const _faceExpressionResultsData = [];
    if (Array.isArray(detectionsWithExpressions)) {
      detectionsWithExpressions.forEach((detection) => {
        _faceExpressionResultsData.push(detection.expressions);
      });
    }
    faceExpressionResultsData.value = _faceExpressionResultsData;

    const resizedResults = faceapi.resizeResults(
      detectionsWithExpressions,
      displaySize
    );

    faceapi.draw.drawFaceExpressions(
      detectionsWithExpressionsOutput.value,
      resizedResults
    );
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div class="face_api_page">
    <!-- Hero Section -->
    <section class="face_api_page-hero">
      <div class="face_api_page-hero-background">
        <img
          src="/img/face-api/face-api-v.04.webp"
          alt="Face API Test"
          class="face_api_page-hero-background-image"
        />
        <div class="face_api_page-hero-background-overlay" />
      </div>

      <div class="face_api_page-hero-content">
        <h1 class="face_api_page-hero-content-title">
          {{ $t('face_api_page.hero.title') }}
        </h1>
        <p class="face_api_page-hero-content-subtitle">
          {{ $t('face_api_page.hero.subtitle') }}
        </p>
        <p class="face_api_page-hero-content-description">
          {{ $t('face_api_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Introduction -->
    <section class="face_api_page-intro">
      <div class="face_api_page-intro-container">
        <p class="face_api_page-intro-text">
          {{ $t('face_api_page.intro') }}
        </p>
      </div>
    </section>

    <!-- Face Comparison Form -->
    <section class="face_api_page-section">
      <div class="face_api_page-section-container">
        <div class="face_api_page-card">
          <form class="face_api_page-card-form" @submit.prevent="handleDiscern">
            <ImageUpload
              ref="imgSelectorEl"
              v-model="identifyImage"
              :btn-label="$t('face_api_page.form.upload_button')"
              :label="$t('face_api_page.form.upload_label')"
              :mask-label="$t('face_api_page.form.upload_mask')"
            />

            <v-btn
              color="primary"
              type="submit"
              size="large"
              block
              class="face_api_page-card-form-submit"
            >
              {{ $t('face_api_page.form.submit_button') }}
            </v-btn>

            <div class="face_api_page-card-form-result">
              <span class="face_api_page-card-form-result-label">
                {{ $t('face_api_page.form.similarity_label') }}
              </span>
              <span class="face_api_page-card-form-result-value">
                {{ distance.toFixed(4) }}
              </span>
              <span
                class="face_api_page-card-form-result-status"
                :css-status="distance < 0.6 ? 'same' : 'different'"
              >
                {{
                  distance < 0.6
                    ? $t('face_api_page.form.same_person')
                    : $t('face_api_page.form.different_person')
                }}
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- Video Preview Section -->
    <section class="face_api_page-section">
      <div class="face_api_page-section-container">
        <h2 class="face_api_page-section-title">
          {{ $t('face_api_page.sections.video_preview') }}
        </h2>
        <div class="face_api_page-video_row">
          <div class="face_api_page-video_row-item">
            <video
              ref="videoEl"
              class="face_api_page-video_row-item-video"
              width="480"
              height="360"
              autoplay
              controls
              :srcObject="streamObj"
            />
          </div>
          <div class="face_api_page-video_row-item">
            <canvas
              ref="canvasVideo"
              class="face_api_page-video_row-item-canvas"
              width="480"
              height="360"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Bounding Boxes Section -->
    <section class="face_api_page-section">
      <div class="face_api_page-section-container">
        <h2 class="face_api_page-section-title">
          {{ $t('face_api_page.sections.bounding_boxes') }}
        </h2>
        <div class="face_api_page-detection_row">
          <div class="face_api_page-detection_row-canvas_wrapper">
            <canvas
              ref="detectionsVideo"
              class="face_api_page-detection_row-canvas_wrapper-canvas"
              width="480"
              height="360"
            />
            <canvas
              ref="detectionsOutput"
              class="face_api_page-detection_row-canvas_wrapper-overlay"
              width="480"
              height="360"
            />
          </div>
          <div class="face_api_page-detection_row-data">
            <h3 class="face_api_page-detection_row-data-title">
              {{ $t('face_api_page.data.bounding_boxes') }}
            </h3>
            <pre class="face_api_page-detection_row-data-content">{{
              JSON.stringify(faceBoundingBoxesData, null, 2)
            }}</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Landmarks Section -->
    <section class="face_api_page-section">
      <div class="face_api_page-section-container">
        <h2 class="face_api_page-section-title">
          {{ $t('face_api_page.sections.landmarks') }}
        </h2>
        <div class="face_api_page-detection_row">
          <div class="face_api_page-detection_row-canvas_wrapper">
            <canvas
              ref="detectionsWithLandmarksVideo"
              class="face_api_page-detection_row-canvas_wrapper-canvas"
              width="480"
              height="360"
            />
            <canvas
              ref="detectionsWithLandmarksOutput"
              class="face_api_page-detection_row-canvas_wrapper-overlay"
              width="480"
              height="360"
            />
          </div>
          <div class="face_api_page-detection_row-data">
            <h3 class="face_api_page-detection_row-data-title">
              {{ $t('face_api_page.data.landmarks') }}
            </h3>
            <pre class="face_api_page-detection_row-data-content">{{
              JSON.stringify(faceLandmarksData, null, 2)
            }}</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Expressions Section -->
    <section class="face_api_page-section">
      <div class="face_api_page-section-container">
        <h2 class="face_api_page-section-title">
          {{ $t('face_api_page.sections.expressions') }}
        </h2>
        <div class="face_api_page-detection_row">
          <div class="face_api_page-detection_row-canvas_wrapper">
            <canvas
              ref="detectionsWithExpressionsVideo"
              class="face_api_page-detection_row-canvas_wrapper-canvas"
              width="480"
              height="360"
            />
            <canvas
              ref="detectionsWithExpressionsOutput"
              class="face_api_page-detection_row-canvas_wrapper-overlay"
              width="480"
              height="360"
            />
          </div>
          <div class="face_api_page-detection_row-data">
            <h3 class="face_api_page-detection_row-data-title">
              {{ $t('face_api_page.data.expressions') }}
            </h3>
            <pre class="face_api_page-detection_row-data-content">{{
              JSON.stringify(faceExpressionResultsData, null, 2)
            }}</pre>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
// ========================================
// Hero Section
// ========================================
.face_api_page-hero {
  // Positioning
  position: relative;

  // Display & Box Model
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;

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
      background: linear-gradient(
        135deg,
        rgba(68, 160, 141, 0.9) 0%,
        rgba(78, 205, 196, 0.85) 100%
      );
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
      margin: 0 0 16px 0;

      // Typography
      font-size: 48px;
      font-weight: 800;
      color: #ffffff;

      // Animation
      animation: fade-in-up 0.6s ease-out;

      @media (max-width: 768px) {
        font-size: 36px;
      }
    }

    &-subtitle {
      // Display & Box Model
      margin: 0 0 24px 0;

      // Typography
      font-size: 24px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.95);

      // Animation
      animation: fade-in-up 0.6s ease-out 0.1s both;

      @media (max-width: 768px) {
        font-size: 20px;
      }
    }

    &-description {
      // Display & Box Model
      margin: 0;

      // Typography
      font-size: 18px;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.9);

      // Animation
      animation: fade-in-up 0.6s ease-out 0.2s both;

      @media (max-width: 768px) {
        font-size: 16px;
      }
    }
  }
}

// ========================================
// Introduction
// ========================================
.face_api_page-intro {
  // Display & Box Model
  padding: 60px 20px;

  // Visual
  background: var(--color-bg-secondary, #f7fafc);

  &-container {
    // Display & Box Model
    max-width: 1200px;
    margin: 0 auto;
  }

  &-text {
    // Typography
    font-size: 18px;
    line-height: 1.8;
    color: var(--color-text-secondary, #4a5568);
    text-align: center;

    // Display & Box Model
    max-width: 800px;
    margin: 0 auto;
  }
}

// ========================================
// Sections
// ========================================
.face_api_page-section {
  // Display & Box Model
  padding: 60px 20px;

  &-container {
    // Display & Box Model
    max-width: 1200px;
    margin: 0 auto;
  }

  &-title {
    // Display & Box Model
    margin: 0 0 32px 0;

    // Typography
    font-size: 28px;
    font-weight: 700;
    color: var(--color-text-primary, #2d3748);
    text-align: center;

    @media (max-width: 768px) {
      font-size: 24px;
    }
  }
}

// ========================================
// Card
// ========================================
.face_api_page-card {
  // Display & Box Model
  padding: 32px;
  border-radius: 12px;
  max-width: 600px;
  margin: 0 auto;

  // Visual
  background: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  // Animation
  animation: fade-in-up 0.6s ease-out 0.3s both;

  @media (max-width: 768px) {
    padding: 24px 16px;
  }

  &-form {
    &-submit {
      // Display & Box Model
      margin-top: 24px;
      margin-bottom: 24px;
    }

    &-result {
      // Display & Box Model
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 8px;
      padding: 16px;
      border-radius: 8px;

      // Visual
      background: var(--color-bg-secondary, #f7fafc);

      &-label {
        // Typography
        font-size: 16px;
        font-weight: 600;
        color: var(--color-text-primary, #2d3748);
      }

      &-value {
        // Typography
        font-size: 24px;
        font-weight: 700;
        font-family: 'Courier New', monospace;
        color: var(--color-primary, #44a08d);
      }

      &-status {
        // Display & Box Model
        padding: 4px 12px;
        border-radius: 16px;

        // Typography
        font-size: 14px;
        font-weight: 600;

        &[css-status='same'] {
          background: rgba(72, 187, 120, 0.2);
          color: #22543d;
        }

        &[css-status='different'] {
          background: rgba(245, 101, 101, 0.2);
          color: #742a2a;
        }
      }
    }
  }
}

// ========================================
// Video Row
// ========================================
.face_api_page-video_row {
  // Display & Box Model
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  &-item {
    // Display & Box Model
    border-radius: 12px;
    overflow: hidden;

    // Visual
    background: #000000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &-video,
    &-canvas {
      // Display & Box Model
      width: 100%;
      height: auto;
      display: block;
    }
  }
}

// ========================================
// Detection Row
// ========================================
.face_api_page-detection_row {
  // Display & Box Model
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 24px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  &-canvas_wrapper {
    // Positioning
    position: relative;

    // Display & Box Model
    border-radius: 12px;
    overflow: hidden;

    // Visual
    background: #000000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &-canvas,
    &-overlay {
      // Display & Box Model
      display: block;
      max-width: 100%;
      height: auto;
    }

    &-overlay {
      // Positioning
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  &-data {
    // Display & Box Model
    padding: 24px;
    border-radius: 12px;

    // Visual
    background: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &-title {
      // Display & Box Model
      margin: 0 0 16px 0;

      // Typography
      font-size: 18px;
      font-weight: 600;
      color: var(--color-text-primary, #2d3748);
    }

    &-content {
      // Display & Box Model
      padding: 16px;
      margin: 0;
      border-radius: 8px;
      max-height: 250px;

      // Typography
      font-family: 'Courier New', monospace;
      font-size: 13px;
      line-height: 1.6;
      color: var(--color-text-primary, #2d3748);

      // Visual
      background: var(--color-bg-secondary, #f7fafc);
      border: 1px solid #e2e8f0;
      overflow: auto;
      word-wrap: break-word;
    }
  }
}

// ========================================
// Animations
// ========================================
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
