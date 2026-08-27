<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('web_cam_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('web_cam_page.hero.description')
    }
  ]
});

// https://mrcodingroom.freesite.host/js%E5%B0%87video-webcam%E7%95%AB%E5%9C%A8canvas%E4%B8%8A/
const videoEl = useTemplateRef('videoEl');
const canvasEl = useTemplateRef('canvasEl');

const streamObj = useCameraStream(null, handleFrameFromVideo);

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

<template>
  <div class="web_cam_page">
    <!-- Hero Section -->
    <section class="web_cam_page-hero">
      <div class="web_cam_page-hero-background">
        <img
          src="/img/web-cam/web-cam-v.05.webp"
          alt="WebCam Test"
          class="web_cam_page-hero-background-image"
        />
        <div class="web_cam_page-hero-background-overlay" />
      </div>

      <div class="web_cam_page-hero-content">
        <h1 class="web_cam_page-hero-content-title">
          {{ $t('web_cam_page.hero.title') }}
        </h1>
        <p class="web_cam_page-hero-content-subtitle">
          {{ $t('web_cam_page.hero.subtitle') }}
        </p>
        <p class="web_cam_page-hero-content-description">
          {{ $t('web_cam_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Introduction -->
    <section class="web_cam_page-intro">
      <div class="web_cam_page-intro-container">
        <p class="web_cam_page-intro-text">
          {{ $t('web_cam_page.intro') }}
        </p>
      </div>
    </section>

    <!-- Camera Preview -->
    <section class="web_cam_page-section">
      <div class="web_cam_page-section-container">
        <div class="web_cam_page-preview_card">
          <h2 class="web_cam_page-preview_card-title">
            {{ $t('web_cam_page.permission_required') }}
          </h2>
          <p class="web_cam_page-preview_card-description">
            {{ $t('web_cam_page.permission_desc') }}
          </p>

          <!-- Video Preview Container -->
          <div class="web_cam_page-preview_card-video_container">
            <!-- Hidden video element for stream -->
            <video
              id="vid"
              ref="videoEl"
              class="web_cam_page-preview_card-video_container-video"
              width="480"
              height="360"
              autoplay
              controls
              :srcObject="streamObj"
            />

            <!-- Canvas for rendering -->
            <canvas
              id="canvas"
              ref="canvasEl"
              class="web_cam_page-preview_card-video_container-canvas"
              width="480"
              height="360"
            />
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
.web_cam_page-hero {
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
.web_cam_page-intro {
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
// Preview Section
// ========================================
.web_cam_page-section {
  // Display & Box Model
  padding: 60px 20px;

  &-container {
    // Display & Box Model
    max-width: 800px;
    margin: 0 auto;
  }
}

.web_cam_page-preview_card {
  // Display & Box Model
  padding: 32px;
  border-radius: 12px;

  // Visual
  background: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  // Animation
  animation: fade-in-up 0.6s ease-out 0.3s both;

  @media (max-width: 768px) {
    padding: 24px 16px;
  }

  &-title {
    // Display & Box Model
    margin: 0 0 16px 0;

    // Typography
    font-size: 24px;
    font-weight: 700;
    color: var(--color-text-primary, #2d3748);
    text-align: center;

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  &-description {
    // Display & Box Model
    margin: 0 0 32px 0;

    // Typography
    font-size: 16px;
    line-height: 1.6;
    color: var(--color-text-secondary, #4a5568);
    text-align: center;
  }

  &-video_container {
    // Positioning
    position: relative;

    // Display & Box Model
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
    border-radius: 8px;

    // Visual
    background: #000000;
    overflow: hidden;

    &-video {
      // Display & Box Model
      display: none;
      width: 100%;
      height: auto;

      // Misc
      object-fit: contain;
    }

    &-canvas {
      // Display & Box Model
      display: block;
      width: 100%;
      height: auto;

      // Misc
      object-fit: contain;
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
