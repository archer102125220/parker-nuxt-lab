<script setup>
const { t } = useI18n();
const localePath = useLocalePath();

useHeadMataData({
  title: t('web_rtc_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('web_rtc_page.hero.description')
    }
  ]
});

const DOMAIN = import.meta.env.VITE_DOMAIN || '';

// Schema.org 結構化資料 (nuxt-schema-org)
useSchemaOrg([
  defineWebPage({
    '@type': 'WebPage',
    name: t('web_rtc_page.hero.title'),
    description: t('web_rtc_page.hero.description'),
    url: `${DOMAIN}${localePath('/web-rtc')}`,
    inLanguage: ['zh-TW', 'en'],
    image: `${DOMAIN}/img/web-rtc/web-rtc-v.04.webp`
  })
]);

// WebRTC Tests List
const webrtcTests = computed(() => [
  {
    to: localePath('/web-rtc/socket.io'),
    label: t('web_rtc_page.test_socket_io_label')
  },
  {
    to: localePath('/web-rtc/websocket'),
    label: t('web_rtc_page.test_websocket_label')
  },
  {
    to: localePath('/web-rtc/server-sent-event'),
    label: t('web_rtc_page.test_sse_label')
  }
]);
</script>

<template>
  <div class="web_rtc_page">
    <!-- Hero Section -->
    <section class="web_rtc_page-hero">
      <div class="web_rtc_page-hero-background">
        <img
          src="/img/web-rtc/web-rtc-v.04.webp"
          alt="WebRTC Tests"
          class="web_rtc_page-hero-background-image"
        />
        <div class="web_rtc_page-hero-background-overlay" />
      </div>

      <div class="web_rtc_page-hero-content">
        <h1 class="web_rtc_page-hero-content-title">
          {{ $t('web_rtc_page.hero.title') }}
        </h1>
        <p class="web_rtc_page-hero-content-subtitle">
          {{ $t('web_rtc_page.hero.subtitle') }}
        </p>
        <p class="web_rtc_page-hero-content-description">
          {{ $t('web_rtc_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Introduction -->
    <section class="web_rtc_page-intro">
      <div class="web_rtc_page-section-container">
        <p class="web_rtc_page-intro-text">
          {{ $t('web_rtc_page.intro') }}
        </p>
        <!-- <p class="web_rtc_page-intro-note">
          ℹ️ {{ $t('web_rtc_page.note') }}
        </p> -->
      </div>
    </section>

    <!-- WebRTC Tests List -->
    <section class="web_rtc_page-section">
      <div class="web_rtc_page-section-container">
        <h2 class="web_rtc_page-section-title">
          {{ $t('web_rtc_page.tests_list_title') }}
        </h2>
        <div class="web_rtc_page-grid">
          <LinkCard
            v-for="test in webrtcTests"
            :key="test.to"
            :to="test.to"
            :label="test.label"
            :banner="test.banner"
            class="web_rtc_page-grid-item"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
// ========================================
// Hero Section
// ========================================
.web_rtc_page-hero {
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
.web_rtc_page-section {
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
.web_rtc_page-intro {
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
    // Typography
    font-size: 18px;
    line-height: 1.8;
    color: var(--color-text-secondary, #4a5568);
    text-align: center;

    // Display & Box Model
    max-width: 800px;
    margin: 0 auto 20px auto;
  }

  &-note {
    // Display & Box Model
    max-width: 800px;
    margin: 0 auto;
    padding: 16px 20px;
    border-radius: 8px;

    // Typography
    font-size: 16px;
    font-weight: 500;
    color: #0369a1;
    text-align: center;

    // Visual
    background: #e0f2fe;
    border: 1px solid #7dd3fc;
  }
}

// ========================================
// WebRTC Tests Grid
// ========================================
.web_rtc_page-grid {
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
    &:nth-child(3) {
      animation-delay: 0.15s;
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
