<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('triangle_full_test_page.hero.title')
});

const isCollapsed = ref(false);
</script>

<template>
  <div class="triangle_full_test_page">
    <!-- Fullscreen Triangles Background -->
    <Triangle
      class="triangle_full_test_page-left"
      height="100vh"
      width="100vw"
      angle-upper-left
    />
    <Triangle
      class="triangle_full_test_page-right"
      height="100vh"
      width="100vw"
      angle-lower-right
      color="rgb(147, 147, 255)"
    />

    <!-- Fixed Toggle Button -->
    <v-btn
      class="triangle_full_test_page-toggle"
      icon
      size="small"
      color="primary"
      :aria-expanded="!isCollapsed"
      @click="isCollapsed = !isCollapsed"
    >
      <span class="triangle_full_test_page-toggle-icon">
        {{ isCollapsed ? '▶' : '◀' }}
      </span>
    </v-btn>

    <!-- Sliding Info Panel -->
    <div class="triangle_full_test_page-info" :css-collapsed="isCollapsed">
      <div class="triangle_full_test_page-info-content">
        <h1 class="triangle_full_test_page-info-content-title">📖 說明</h1>
        <p class="triangle_full_test_page-info-content-subtitle">
          {{ $t('triangle_full_test_page.hero.subtitle') }}
        </p>
        <p class="triangle_full_test_page-info-content-description">
          {{ $t('triangle_full_test_page.hero.description') }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.triangle_full_test_page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  &-left {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  }

  &-right {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 1;
  }

  &-toggle {
    position: fixed;
    top: 50%;
    left: 20px;
    z-index: 12;
    border-radius: 8px !important;
    transform: translateY(-50%);

    &-icon {
      display: block;
      font-size: 12px;
    }
  }

  &-info {
    position: fixed;
    top: 50%;
    left: 56px;
    z-index: 10;
    max-width: 320px;
    padding: 20px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);
    transform: translateY(-50%);
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;

    &[css-collapsed='true'] {
      transform: translateY(-50%) translateX(calc(-100% - 56px));
    }

    &-content {
      &-title {
        display: inline-block;
        margin: 0 0 12px 0;
        padding: 4px 10px;
        border-radius: 4px;
        background: linear-gradient(135deg, #44a08d 0%, #4ecdc4 100%);
        font-size: 14px;
        font-weight: 600;
        color: #fff;
      }

      &-subtitle {
        margin: 0 0 10px 0;
        padding-bottom: 10px;
        border-bottom: 1px dashed #e2e8f0;
        font-size: 15px;
        font-weight: 600;
        color: #2d3748;
      }

      &-description {
        margin: 0;
        font-size: 13px;
        line-height: 1.6;
        color: #718096;
      }
    }
  }
}
</style>
