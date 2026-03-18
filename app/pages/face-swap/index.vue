<template>
  <div class="face_swap_page">
    <!-- Hero Section -->
    <section class="face_swap_page-hero">
      <div class="face_swap_page-hero-background">
        <img
          src="/img/face-swap/face-swap-v.02.png"
          alt="AI Face Swap"
          class="face_swap_page-hero-background-image"
        />
        <div class="face_swap_page-hero-background-overlay" />
      </div>

      <div class="face_swap_page-hero-content">
        <h1 class="face_swap_page-hero-content-title">
          {{ $t('face_swap_page.hero.title') }}
        </h1>
        <p class="face_swap_page-hero-content-subtitle">
          {{ $t('face_swap_page.hero.subtitle') }}
        </p>
        <p class="face_swap_page-hero-content-description">
          {{ $t('face_swap_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Introduction -->
    <section class="face_swap_page-intro">
      <div class="face_swap_page-intro-container">
        <p class="face_swap_page-intro-text">
          {{ $t('face_swap_page.intro') }}
        </p>
      </div>
    </section>

    <!-- Face Swap Versions -->
    <section class="face_swap_page-section">
      <div class="face_swap_page-section-container">
        <h2 class="face_swap_page-section-title">
          {{ $t('face_swap_page.section_title') }}
        </h2>

        <!-- Serverless Environment Notice -->
        <div v-if="isVercel" class="face_swap_page-serverless-notice">
          <div class="face_swap_page-serverless-notice-icon">⚠️</div>
          <div class="face_swap_page-serverless-notice-content">
            <h3 class="face_swap_page-serverless-notice-content-title">
              {{ $t('face_swap_page.serverless_notice.title') }}
            </h3>
            <p class="face_swap_page-serverless-notice-content-text">
              {{ $t('face_swap_page.serverless_notice.text') }}
            </p>
          </div>
        </div>

        <div class="face_swap_page-grid">
          <LinkCard
            v-for="version in faceSwapVersions"
            :key="version.label"
            :to="version.to"
            :label="version.label"
            :banner="version.banner"
            :badge="version.badge"
            :disabled="version.disabled"
            class="face_swap_page-grid-item"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n();
const localePath = useLocalePath();
const runtimeConfig = useRuntimeConfig();

// 偵測是否為 Vercel 部署環境（serverless）
const isVercel = computed(() => runtimeConfig.public.isVercel === true);

useHeadMataData({
  title: t('face_swap_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('face_swap_page.hero.description')
    }
  ]
});

const DOMAIN = import.meta.env.VITE_DOMAIN || '';

// Schema.org 結構化資料 (nuxt-schema-org)
useSchemaOrg([
  defineWebPage({
    '@type': 'WebPage',
    name: t('face_swap_page.hero.title'),
    description: t('face_swap_page.hero.description'),
    url: `${DOMAIN}${localePath('/face-swap')}`,
    inLanguage: ['zh-TW', 'en'],
    image: `${DOMAIN}/img/face-swap/face-swap-v.02.png`
  })
]);

// Face Swap Versions
const faceSwapVersions = computed(() => [
  {
    to: localePath('/face-swap/frontend'),
    label: t('face_swap_page.versions.frontend')
  },
  {
    to: isVercel.value ? null : localePath('/face-swap/backend'),
    label: t('face_swap_page.versions.backend'),
    badge: isVercel.value
      ? t('face_swap_page.badges.unavailable')
      : t('face_swap_page.badges.developing'),
    disabled: isVercel.value
  }
]);
</script>

<style lang="scss" scoped>
// ========================================
// Hero Section
// ========================================
.face_swap_page-hero {
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

    // Typography
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
// Common Section Styles
// ========================================
.face_swap_page-section {
  // Display & Box Model
  padding: 60px 20px;

  &-container {
    // Display & Box Model
    max-width: 1200px;
    margin: 0 auto;
  }

  &-title {
    // Display & Box Model
    margin: 0 0 40px 0;

    // Typography
    font-size: 32px;
    font-weight: 700;
    color: var(--color-text-primary, #2d3748);
    text-align: center;

    @media (max-width: 768px) {
      font-size: 28px;
      margin-bottom: 32px;
    }
  }
}

// ========================================
// Introduction
// ========================================
.face_swap_page-intro {
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
    // Display & Box Model
    max-width: 800px;
    margin: 0 auto;

    // Typography
    font-size: 18px;
    line-height: 1.8;
    text-align: center;
    color: var(--color-text-secondary, #4a5568);
  }
}

// ========================================
// Serverless Notice
// ========================================
.face_swap_page-serverless-notice {
  // Display & Box Model
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  padding: 20px 24px;
  border-radius: 12px;
  border: 1px solid #ffc107;

  // Visual
  background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);

  &-icon {
    // Display & Box Model
    flex-shrink: 0;

    // Typography
    font-size: 24px;
  }

  &-content {
    // Display & Box Model
    flex: 1;

    &-title {
      // Display & Box Model
      margin: 0 0 8px 0;

      // Typography
      font-size: 16px;
      font-weight: 600;
      color: #856404;
    }

    &-text {
      // Display & Box Model
      margin: 0;

      // Typography
      font-size: 14px;
      line-height: 1.6;
      color: #856404;
    }
  }
}

// ========================================
// Face Swap Versions Grid
// ========================================
.face_swap_page-grid {
  // Display & Box Model
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  &-item {
    // Animation
    animation: fade-in-up 0.5s ease-out both;

    &:nth-child(1) {
      animation-delay: 0.05s;
    }
    &:nth-child(2) {
      animation-delay: 0.1s;
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
