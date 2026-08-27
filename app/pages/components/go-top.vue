<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('go_top_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('go_top_page.hero.description')
    }
  ]
});
</script>

<template>
  <div class="go_top_page">
    <!-- Hero Section -->
    <section class="go_top_page-hero">
      <div class="go_top_page-hero-background">
        <div class="go_top_page-hero-background-overlay" />
      </div>

      <div class="go_top_page-hero-content">
        <h1 class="go_top_page-hero-content-title">
          {{ $t('go_top_page.hero.title') }}
        </h1>
        <p class="go_top_page-hero-content-subtitle">
          {{ $t('go_top_page.hero.subtitle') }}
        </p>
        <p class="go_top_page-hero-content-description">
          {{ $t('go_top_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Scroll Area -->
    <section class="go_top_page-section">
      <div class="go_top_page-scroll-hint">
        <p class="go_top_page-scroll-hint-text">
          ⬇️ {{ $t('go_top_page.scroll_hint') }} ⬇️
        </p>
      </div>
    </section>

    <GoTop />
  </div>
</template>

<style lang="scss" scoped>
.go_top_page {
  min-height: 250vh;

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
    padding: 80px 20px;
  }

  &-scroll-hint {
    display: flex;
    justify-content: center;

    &-text {
      padding: 20px 40px;
      border-radius: 12px;
      background: linear-gradient(
        135deg,
        rgba(68, 160, 141, 0.1) 0%,
        rgba(78, 205, 196, 0.1) 100%
      );
      border: 2px dashed rgba(68, 160, 141, 0.3);
      font-size: 20px;
      font-weight: 600;
      color: #44a08d;
      animation: bounce 2s infinite;
    }
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(8px);
    }
  }
}
</style>
