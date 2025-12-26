<template>
  <div class="triangle_anime_test_page">
    <!-- Hero Section -->
    <section class="triangle_anime_test_page-hero">
      <div class="triangle_anime_test_page-hero-background">
        <div class="triangle_anime_test_page-hero-background-overlay" />
      </div>

      <div class="triangle_anime_test_page-hero-content">
        <h1 class="triangle_anime_test_page-hero-content-title">
          {{ $t('triangle_anime_test_page.hero.title') }}
        </h1>
        <p class="triangle_anime_test_page-hero-content-subtitle">
          {{ $t('triangle_anime_test_page.hero.subtitle') }}
        </p>
        <p class="triangle_anime_test_page-hero-content-description">
          {{ $t('triangle_anime_test_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="triangle_anime_test_page-section">
      <AnimationTriangleEnter :is-mobile="$store.system.isMobile">
        <p class="triangle_anime_test_page-demo-text">test</p>
      </AnimationTriangleEnter>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('triangle_anime_test_page.hero.title')
});
</script>

<style lang="scss">
.triangle_anime_test_page {
  min-height: 100vh;

  &-hero {
    position: relative;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
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
        margin: 0 0 8px 0;
        font-size: 36px;
        font-weight: 800;
        color: #ffffff;

        @media (max-width: 768px) {
          font-size: 28px;
        }
      }

      &-subtitle {
        margin: 0 0 12px 0;
        font-size: 18px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.95);
      }

      &-description {
        margin: 0;
        font-size: 14px;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.9);
      }
    }
  }

  &-section {
    height: 80vh;
    background-color: #f2f9ff;
  }

  &-demo {
    &-text {
      text-align: center;
      font-size: 24px;
    }
  }
}
</style>
