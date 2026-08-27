<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('image_upload_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('image_upload_page.hero.description')
    }
  ]
});

const identifyImage = ref('');
</script>

<template>
  <div class="image_upload_page">
    <!-- Hero Section -->
    <section class="image_upload_page-hero">
      <div class="image_upload_page-hero-background">
        <div class="image_upload_page-hero-background-overlay" />
      </div>

      <div class="image_upload_page-hero-content">
        <h1 class="image_upload_page-hero-content-title">
          {{ $t('image_upload_page.hero.title') }}
        </h1>
        <p class="image_upload_page-hero-content-subtitle">
          {{ $t('image_upload_page.hero.subtitle') }}
        </p>
        <p class="image_upload_page-hero-content-description">
          {{ $t('image_upload_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="image_upload_page-section">
      <ImageUpload v-model="identifyImage" class="image_upload_page-upload" />

      <div v-if="identifyImage" class="image_upload_page-result">
        <p class="image_upload_page-result-label">已選擇圖片：</p>
        <code class="image_upload_page-result-value"
          >{{ identifyImage.substring(0, 100) }}...</code
        >
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.image_upload_page {
  min-height: 100vh;

  // Hero Section
  &-hero {
    position: relative;
    min-height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    overflow: hidden;

    &-background {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #44a08d 0%, #4ecdc4 100%);

      &-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          135deg,
          rgba(68, 160, 141, 0.9) 0%,
          rgba(78, 205, 196, 0.85) 100%
        );
      }
    }

    &-content {
      position: relative;
      z-index: 1;
      max-width: 800px;
      text-align: center;

      &-title {
        margin: 0 0 12px 0;
        font-size: 42px;
        font-weight: 800;
        color: #ffffff;

        @media (max-width: 768px) {
          font-size: 32px;
        }
      }

      &-subtitle {
        margin: 0 0 16px 0;
        font-size: 20px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.95);
      }

      &-description {
        margin: 0;
        font-size: 16px;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.9);
      }
    }
  }

  &-section {
    padding: 60px 20px;
    max-width: 800px;
    margin: 0 auto;
  }

  &-upload {
    height: 300px;
    margin-bottom: 24px;
  }

  &-result {
    padding: 16px;
    border-radius: 8px;
    background: #f8f9fa;

    &-label {
      margin-bottom: 8px;
      font-weight: 600;
      color: #333;
    }

    &-value {
      display: block;
      padding: 12px;
      border-radius: 4px;
      background: #e9ecef;
      font-size: 12px;
      word-break: break-all;
    }
  }
}
</style>
