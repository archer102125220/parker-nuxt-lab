<template>
  <div class="waving_image_page">
    <!-- Hero Section -->
    <section class="waving_image_page-hero">
      <div class="waving_image_page-hero-background">
        <div class="waving_image_page-hero-background-overlay" />
      </div>

      <div class="waving_image_page-hero-content">
        <h1 class="waving_image_page-hero-content-title">
          {{ $t('waving_image_page.hero.title') }}
        </h1>
        <p class="waving_image_page-hero-content-subtitle">
          {{ $t('waving_image_page.hero.subtitle') }}
        </p>
        <p class="waving_image_page-hero-content-description">
          {{ $t('waving_image_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="waving_image_page-section">
      <div class="waving_image_page-demo">
        <AnimationWavingImage
          class="waving_image_page-demo-image"
          :src="demoImageSrc"
          :amplitude="form.amplitude"
          :period="form.period"
          :frequency="form.frequency"
          :fps="form.fps"
          :direction="form.direction"
        />
      </div>

      <form class="waving_image_page-form" @submit.prevent>
        <p class="waving_image_page-form-title">
          {{ $t('waving_image_page.controls') }}
        </p>

        <div class="waving_image_page-form-row">
          <v-slider
            v-model="form.amplitude"
            :label="$t('waving_image_page.amplitude')"
            min="0"
            max="100"
            step="1"
            thumb-label
            class="waving_image_page-form-row-input"
          />
        </div>

        <div class="waving_image_page-form-row">
          <v-slider
            v-model="form.period"
            :label="$t('waving_image_page.period')"
            min="0.1"
            max="10"
            step="0.1"
            thumb-label
            class="waving_image_page-form-row-input"
          />
        </div>

        <div class="waving_image_page-form-row">
          <v-slider
            v-model="form.frequency"
            :label="$t('waving_image_page.frequency')"
            min="0.1"
            max="5"
            step="0.1"
            thumb-label
            class="waving_image_page-form-row-input"
          />
        </div>

        <div class="waving_image_page-form-row">
          <v-slider
            v-model="form.fps"
            :label="$t('waving_image_page.fps')"
            min="10"
            max="120"
            step="1"
            thumb-label
            class="waving_image_page-form-row-input"
          />
        </div>

        <div class="waving_image_page-form-row">
          <VSelector
            v-model="form.direction"
            display-key="title"
            :menu-full-width="true"
            :option-list="directionOptions"
            :label="$t('waving_image_page.direction')"
            class="waving_image_page-form-row-selector"
          />
        </div>
      </form>
    </section>
  </div>
</template>

<script setup>
import {
  DIRECTION_VERTICAL,
  DIRECTION_HORIZONTAL
} from '@app/components/Animation/WavingImage';

const { t } = useI18n();

useHeadMataData({
  title: t('waving_image_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('waving_image_page.hero.description')
    }
  ]
});

const demoImageSrc = '/img/test-img/messageImage_1602166329419.jpg';
// const demoImageSrc =
//   '/img/test-img/1e0ef282c7831f762deb4b4ded8592d5ff7962d832cebcf11709ae670e721560.jpg';

const directionOptions = computed(() => [
  {
    title: t('waving_image_page.direction_horizontal'),
    value: DIRECTION_HORIZONTAL
  },
  {
    title: t('waving_image_page.direction_vertical'),
    value: DIRECTION_VERTICAL
  }
]);

const form = reactive({
  amplitude: 30,
  period: 2,
  frequency: 1,
  fps: 70,
  direction: DIRECTION_HORIZONTAL
});
</script>

<style lang="scss">
.waving_image_page {
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
    max-width: 90dvw;
    margin: 0 auto;
  }

  &-demo {
    margin-bottom: 40px;
    padding: 32px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;

    &-image {
      max-width: 100%;
      // height: auto;
    }
  }

  &-form {
    padding: 32px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);

    &-title {
      margin: 0 0 24px 0;
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    &-row {
      margin-bottom: 16px;

      &-selector {
        border-radius: 6px;

        background-color: rgb(237 237 237);
      }
    }
  }
}
</style>
