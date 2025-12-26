<template>
  <div class="svg_color_change_page">
    <!-- Hero Section -->
    <section class="svg_color_change_page-hero">
      <div class="svg_color_change_page-hero-background">
        <div class="svg_color_change_page-hero-background-overlay" />
      </div>

      <div class="svg_color_change_page-hero-content">
        <h1 class="svg_color_change_page-hero-content-title">
          {{ $t('svg_color_change_page.hero.title') }}
        </h1>
        <p class="svg_color_change_page-hero-content-subtitle">
          {{ $t('svg_color_change_page.hero.subtitle') }}
        </p>
        <p class="svg_color_change_page-hero-content-description">
          {{ $t('svg_color_change_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="svg_color_change_page-section" :style="{ '--change_color': color }">
      <form class="svg_color_change_page-form" @submit.prevent="">
        <v-color-picker v-model="color" />
        <p class="svg_color_change_page-form-value">{{ color }}</p>
      </form>
      <div class="svg_color_change_page-demo">
        <p class="svg_color_change_page-demo-label">偽元素測試：</p>
        <div class="svg_color_change_page-demo-icon" />
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('svg_color_change_page.hero.title')
});

const color = ref('#000000');
</script>

<style lang="scss">
// https://codepen.io/noahblon/post/coloring-svgs-in-css-background-images
.svg_color_change_page {
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
    padding: 40px 20px;
  }

  &-form {
    margin-bottom: 24px;

    &-value {
      margin-top: 12px;
      font-family: monospace;
    }
  }

  &-demo {
    display: flex;
    align-items: center;
    gap: 8px;

    &-label {
      margin: 0;
    }

    &-icon {
      display: block;
      width: 24px;
      height: 24px;
      background-color: var(--change_color, #fff);
      mask: url('/img/svg-color-change/android.svg');
    }
  }
}
</style>
