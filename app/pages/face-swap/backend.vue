<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('face_swap_backend.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('face_swap_backend.hero.description')
    }
  ]
});

const localePath = useLocalePath();

// Refs
const sourceFaceEl = useTemplateRef('sourceFaceEl');
const targetFaceEl = useTemplateRef('targetFaceEl');

// State
const sourceFaceImage = ref('');
const targetFaceImage = ref('');
const resultImage = ref('');
const isProcessing = ref(false);
const statusMessage = ref('');
const statusType = ref('info');

// Computed
const canProcess = computed(() => {
  return (
    sourceFaceImage.value !== '' &&
    sourceFaceImage.value !== null &&
    targetFaceImage.value !== '' &&
    targetFaceImage.value !== null
  );
});

// Methods
async function handleFaceSwap() {
  if (!canProcess.value) {
    showStatus(t('face_swap_backend.status.no_source'), 'warning');
    return;
  }

  isProcessing.value = true;
  showStatus(t('face_swap_backend.status.processing'), 'info');

  try {
    // Get blobs from preview elements
    const sourceBlob = await getImageBlob(sourceFaceEl.value?.previewEl);
    const targetBlob = await getImageBlob(targetFaceEl.value?.previewEl);

    // Create FormData
    const formData = new FormData();
    formData.append('sourceImage', sourceBlob, 'source.png');
    formData.append('targetImage', targetBlob, 'target.png');

    // Call API using service
    const { $faceSwap } = useNuxtApp();
    const response = await $faceSwap.POST_faceSwapProcess(formData);

    if (response.success === true) {
      resultImage.value = response.resultImage;
      showStatus(t('face_swap_backend.status.success'), 'success');
    } else {
      throw new Error(response.error || t('face_swap_backend.status.error'));
    }
  } catch (error) {
    console.error('Face swap error:', error);
    showStatus(
      error.message ||
        error?.response?.data?.message ||
        t('face_swap_backend.status.error_fallback'),
      'error'
    );
  } finally {
    isProcessing.value = false;
  }
}

function getImageBlob(imgEl) {
  return new Promise((resolve, reject) => {
    if (imgEl === null || imgEl === undefined) {
      reject(new Error('圖片元素不存在'));
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = imgEl.naturalWidth || imgEl.width;
    canvas.height = imgEl.naturalHeight || imgEl.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(imgEl, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('無法轉換圖片為 Blob'));
      }
    }, 'image/png');
  });
}

function resetSwap() {
  sourceFaceImage.value = '';
  targetFaceImage.value = '';
  resultImage.value = '';
  statusMessage.value = '';
}

function downloadResult() {
  if (resultImage.value === '') {
    return;
  }

  const link = document.createElement('a');
  link.download = `face-swap-backend-${Date.now()}.png`;
  link.href = resultImage.value;
  link.click();

  showStatus(t('face_swap_backend.status.downloaded'), 'success');
}

function showStatus(message, type = 'info') {
  statusMessage.value = message;
  statusType.value = type;
}
</script>

<template>
  <div class="face_swap_backend_page">
    <!-- Hero Section -->
    <section class="face_swap_backend_page-hero">
      <div class="face_swap_backend_page-hero-background">
        <img
          src="/img/face-swap/face-swap-v.02.png"
          alt="Face Swap Backend"
          class="face_swap_backend_page-hero-background-image"
        />
        <div class="face_swap_backend_page-hero-background-overlay" />
      </div>

      <div class="face_swap_backend_page-hero-content">
        <h1 class="face_swap_backend_page-hero-content-title">
          {{ $t('face_swap_backend.hero.title') }}
        </h1>
        <p class="face_swap_backend_page-hero-content-subtitle">
          {{ $t('face_swap_backend.hero.subtitle') }}
        </p>
        <p class="face_swap_backend_page-hero-content-description">
          {{ $t('face_swap_backend.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Upload Section -->
    <section class="face_swap_backend_page-section">
      <div class="face_swap_backend_page-upload_section">
        <div class="face_swap_backend_page-upload_section-source">
          <h3>{{ $t('face_swap_backend.sections.source') }}</h3>
          <ImageUpload
            ref="sourceFaceEl"
            v-model="sourceFaceImage"
            :btn-label="$t('face_swap_backend.upload.source_button')"
            :label="$t('face_swap_backend.upload.source_label')"
            :mask-label="$t('face_swap_backend.upload.source_label')"
            class="face_swap_backend_page-upload_section-upload"
          />
        </div>

        <div class="face_swap_backend_page-upload_section-target">
          <h3>{{ $t('face_swap_backend.sections.target') }}</h3>
          <ImageUpload
            ref="targetFaceEl"
            v-model="targetFaceImage"
            :btn-label="$t('face_swap_backend.upload.target_button')"
            :label="$t('face_swap_backend.upload.target_label')"
            :mask-label="$t('face_swap_backend.upload.target_label')"
            class="face_swap_backend_page-upload_section-upload"
          />
        </div>

        <div class="face_swap_backend_page-upload_section-result">
          <h3>{{ $t('face_swap_backend.sections.result') }}</h3>
          <div class="face_swap_backend_page-upload_section-result-container">
            <img
              v-if="resultImage !== ''"
              :src="resultImage"
              class="face_swap_backend_page-upload_section-result-img"
              alt="Face swap result"
            />
            <div
              v-else
              class="face_swap_backend_page-upload_section-result-placeholder"
            >
              <v-icon size="48" color="grey">mdi-image-outline</v-icon>
              <p>{{ $t('face_swap_backend.sections.result') }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Control Buttons -->
      <div class="face_swap_backend_page-controls">
        <v-btn
          color="primary"
          size="large"
          :loading="isProcessing"
          :disabled="!canProcess"
          @click="handleFaceSwap"
        >
          <v-icon start>mdi-face-recognition</v-icon>
          {{ $t('face_swap_backend.buttons.swap') }}
        </v-btn>

        <v-btn
          color="secondary"
          size="large"
          variant="outlined"
          @click="resetSwap"
        >
          <v-icon start>mdi-refresh</v-icon>
          {{ $t('face_swap_backend.buttons.reset') }}
        </v-btn>

        <v-btn
          color="success"
          size="large"
          variant="outlined"
          :disabled="resultImage === ''"
          @click="downloadResult"
        >
          <v-icon start>mdi-download</v-icon>
          {{ $t('face_swap_backend.buttons.download') }}
        </v-btn>
      </div>
    </section>

    <!-- Status Message -->
    <v-alert
      v-if="statusMessage !== ''"
      :type="statusType"
      class="face_swap_backend_page-status"
      closable
      @click:close="statusMessage = ''"
    >
      {{ statusMessage }}
    </v-alert>

    <!-- Tech Info -->
    <v-expansion-panels class="face_swap_backend_page-info">
      <v-expansion-panel :title="$t('face_swap_backend.tech_info.title')">
        <v-expansion-panel-text>
          <v-list density="compact">
            <v-list-item prepend-icon="mdi-nodejs">
              <v-list-item-title>Nitro Server API</v-list-item-title>
              <v-list-item-subtitle
                >POST /api/face-swap/process</v-list-item-subtitle
              >
            </v-list-item>
            <v-list-item prepend-icon="mdi-face-recognition">
              <v-list-item-title>face-api.js + TensorFlow.js</v-list-item-title>
              <v-list-item-subtitle>{{
                $t('face_swap_backend.tech_info.detection')
              }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item prepend-icon="mdi-palette">
              <v-list-item-title>node-canvas</v-list-item-title>
              <v-list-item-subtitle>{{
                $t('face_swap_backend.tech_info.processing')
              }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style lang="scss" scoped>
.face_swap_backend_page {
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

  &-section {
    // Display & Box Model
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &-upload_section {
    /* Display & Box Model */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    width: 100%;
    max-width: 1000px;
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

    &-upload {
      /* Display & Box Model */
      min-height: 250px;
    }

    &-source,
    &-target {
      /* Display & Box Model */
      display: flex;
      flex-direction: column;
    }

    &-result {
      /* Display & Box Model */
      display: flex;
      flex-direction: column;

      &-container {
        /* Display & Box Model */
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 250px;

        /* Visual */
        background-color: #f5f5f5;
        border: 2px dashed #ccc;
        border-radius: 8px;
      }

      &-img {
        /* Display & Box Model */
        max-width: 100%;
        max-height: 300px;

        /* Visual */
        object-fit: contain;
        border-radius: 8px;
      }

      &-placeholder {
        /* Display & Box Model */
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;

        /* Typography */
        color: rgba(0, 0, 0, 0.4);
      }
    }
  }

  &-controls {
    /* Display & Box Model */
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    margin-bottom: 24px;
  }

  &-status {
    /* Display & Box Model */
    width: 100%;
    max-width: 600px;
    margin: auto;
    margin-bottom: 24px;
  }

  &-info {
    /* Display & Box Model */
    width: 100%;
    margin: auto;
    max-width: 600px;
  }
}
</style>
