<template>
  <section class="face_swap_backend_page">
    <v-img
      class="face_swap_backend_page-banner"
      max-height="200"
      cover
      src="/img/face-swap/face-swap-v.02.png"
    />

    <h1 class="face_swap_backend_page-title">後端 AI 人臉替換</h1>
    <p class="face_swap_backend_page-subtitle">
      使用 Node.js + TensorFlow.js 伺服器端處理
    </p>

    <!-- Upload Section -->
    <div class="face_swap_backend_page-upload_section">
      <div class="face_swap_backend_page-upload_section-source">
        <h3>來源臉部</h3>
        <ImageUpload
          ref="sourceFaceEl"
          v-model="sourceFaceImage"
          btn-label="選取來源照片"
          label="點擊或拖拉來源照片到此區塊"
          mask-label="拖拉來源照片到此區塊"
          class="face_swap_backend_page-upload_section-upload"
        />
      </div>

      <div class="face_swap_backend_page-upload_section-target">
        <h3>目標圖片</h3>
        <ImageUpload
          ref="targetFaceEl"
          v-model="targetFaceImage"
          btn-label="選取目標照片"
          label="點擊或拖拉目標照片到此區塊"
          mask-label="拖拉目標照片到此區塊"
          class="face_swap_backend_page-upload_section-upload"
        />
      </div>

      <div class="face_swap_backend_page-upload_section-result">
        <h3>替換結果</h3>
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
            <p>結果將顯示在此</p>
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
        執行替換
      </v-btn>

      <v-btn
        color="secondary"
        size="large"
        variant="outlined"
        @click="resetSwap"
      >
        <v-icon start>mdi-refresh</v-icon>
        重置
      </v-btn>

      <v-btn
        color="success"
        size="large"
        variant="outlined"
        :disabled="resultImage === ''"
        @click="downloadResult"
      >
        <v-icon start>mdi-download</v-icon>
        下載結果
      </v-btn>
    </div>

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
      <v-expansion-panel title="技術說明">
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
              <v-list-item-subtitle
                >Server-side face detection</v-list-item-subtitle
              >
            </v-list-item>
            <v-list-item prepend-icon="mdi-palette">
              <v-list-item-title>node-canvas</v-list-item-title>
              <v-list-item-subtitle
                >Server-side image processing</v-list-item-subtitle
              >
            </v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </section>
</template>

<script setup>
useHeadMataData({
  title: '後端 AI 人臉替換'
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
    showStatus('請先上傳來源照片和目標照片', 'warning');
    return;
  }

  isProcessing.value = true;
  showStatus('正在處理中，請稍候...', 'info');

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
      showStatus('人臉替換完成！', 'success');
    } else {
      throw new Error(response.error || '處理失敗');
    }
  } catch (error) {
    console.error('Face swap error:', error);
    showStatus(
      error.message || error?.response?.data?.message || '人臉替換處理失敗',
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

  showStatus('圖片已下載', 'success');
}

function showStatus(message, type = 'info') {
  statusMessage.value = message;
  statusType.value = type;
}
</script>

<style lang="scss" scoped>
.face_swap_backend_page {
  /* Display & Box Model */
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 16px 16px 32px;

  /* Typography */
  font-family: sans-serif;

  &-banner {
    /* Display & Box Model */
    width: 100%;
    max-width: 600px;
    margin-bottom: 16px;

    /* Visual */
    border-radius: 8px;
  }

  &-title {
    /* Display & Box Model */
    margin-bottom: 8px;

    /* Typography */
    font-size: 1.8rem;
    font-weight: 700;
    text-align: center;
  }

  &-subtitle {
    /* Display & Box Model */
    margin-bottom: 24px;

    /* Typography */
    font-size: 1rem;
    text-align: center;
    color: rgba(0, 0, 0, 0.6);
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
    margin-bottom: 24px;
  }

  &-info {
    /* Display & Box Model */
    width: 100%;
    max-width: 600px;
  }
}
</style>
