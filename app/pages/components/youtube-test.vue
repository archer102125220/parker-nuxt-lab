<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('youtube_test_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('youtube_test_page.hero.description')
    }
  ]
});
</script>

<template>
  <div class="youtube_test_page">
    <!-- Hero Section -->
    <section class="youtube_test_page-hero">
      <div class="youtube_test_page-hero-background">
        <div class="youtube_test_page-hero-background-overlay" />
      </div>

      <div class="youtube_test_page-hero-content">
        <h1 class="youtube_test_page-hero-content-title">
          {{ $t('youtube_test_page.hero.title') }}
        </h1>
        <p class="youtube_test_page-hero-content-subtitle">
          {{ $t('youtube_test_page.hero.subtitle') }}
        </p>
        <p class="youtube_test_page-hero-content-description">
          {{ $t('youtube_test_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="youtube_test_page-section">
      <div class="youtube_test_page-describe">
        <p class="youtube_test_page-describe-text">
          {{ $t('youtube_test_page.describe.text') }}
        </p>
      </div>

      <div class="youtube_test_page-player">
        <Youtube video-id="RTtmcqPXwuw" autoplay />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.youtube_test_page {
  min-height: 100vh;

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
    max-width: 1000px;
    margin: 0 auto;
  }

  &-describe {
    margin-bottom: 24px;
    text-align: center;

    &-text {
      display: inline;
      margin: 0;
      font-size: 16px;
      line-height: 1.7;
      color: #333;
    }
  }

  &-player {
    height: 60vh;
    min-height: 400px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  }
}
</style>
