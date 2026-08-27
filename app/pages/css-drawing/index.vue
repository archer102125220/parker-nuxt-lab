<script setup>
const { t } = useI18n();
const localePath = useLocalePath();

useHeadMataData({
  title: t('css_drawing_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('css_drawing_page.hero.description')
    }
  ]
});

const DOMAIN = import.meta.env.VITE_DOMAIN || '';

// Schema.org 結構化資料 (nuxt-schema-org)
useSchemaOrg([
  defineWebPage({
    '@type': ['WebPage', 'CollectionPage'],
    name: t('css_drawing_page.hero.title'),
    description: t('css_drawing_page.hero.description'),
    url: `${DOMAIN}${localePath('/css-drawing')}`,
    inLanguage: ['zh-TW', 'en'],
    image: `${DOMAIN}/img/css-drawing/css-drawing-v.05.webp`,
    author: {
      '@type': 'Person',
      name: 'Parker Chen',
      url: `${DOMAIN}${localePath('/about')}`
    },
    about: {
      '@type': 'SoftwareApplication',
      name: 'Parker Nuxt Lab',
      applicationCategory: 'DeveloperApplication',
      description: t('css_drawing_page.hero.description'),
      operatingSystem: 'Web Browser',
      url: DOMAIN
    },
    mainEntity: {
      '@type': 'ItemList',
      name: t('css_drawing_page.hero.title'),
      description: t('css_drawing_page.hero.subtitle'),
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'CSS 三角形測試',
          url: `${DOMAIN}${localePath('/css-drawing/triangle-test')}`
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'CSS 三角形滿版測試',
          url: `${DOMAIN}${localePath('/css-drawing/triangle-full-test')}`
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'CSS 六邊形測試',
          url: `${DOMAIN}${localePath('/css-drawing/hexagon-test')}`
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'SVG 替換顏色測試',
          url: `${DOMAIN}${localePath('/css-drawing/svg-color-change')}`
        }
      ]
    }
  })
]);

// CSS Drawing Tests List
const drawingTests = computed(() => [
  {
    to: localePath('/css-drawing/triangle-test'),
    label: 'CSS 三角形測試'
  },
  {
    to: localePath('/css-drawing/triangle-full-test'),
    label: 'CSS 三角形滿版測試'
  },
  {
    to: localePath('/css-drawing/hexagon-test'),
    label: 'CSS 六邊形測試'
  },
  {
    to: localePath('/css-drawing/svg-color-change'),
    label: 'SVG 替換顏色測試'
  }
]);
</script>

<template>
  <div class="css_drawing_page">
    <!-- Hero Section -->
    <section class="css_drawing_page-hero">
      <div class="css_drawing_page-hero-background">
        <img
          src="/img/css-drawing/css-drawing-v.05.webp"
          alt="CSS Drawing"
          class="css_drawing_page-hero-background-image"
        />
        <div class="css_drawing_page-hero-background-overlay" />
      </div>

      <div class="css_drawing_page-hero-content">
        <h1 class="css_drawing_page-hero-content-title">
          {{ $t('css_drawing_page.hero.title') }}
        </h1>
        <p class="css_drawing_page-hero-content-subtitle">
          {{ $t('css_drawing_page.hero.subtitle') }}
        </p>
        <p class="css_drawing_page-hero-content-description">
          {{ $t('css_drawing_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Introduction -->
    <section class="css_drawing_page-intro">
      <div class="css_drawing_page-section-container">
        <p class="css_drawing_page-intro-text">
          {{ $t('css_drawing_page.intro') }}
        </p>
      </div>
    </section>

    <!-- CSS Drawing Tests List -->
    <section class="css_drawing_page-section">
      <div class="css_drawing_page-section-container">
        <h2 class="css_drawing_page-section-title">CSS 繪圖測試列表</h2>
        <div class="css_drawing_page-grid">
          <LinkCard
            v-for="test in drawingTests"
            :key="test.to"
            :to="test.to"
            :label="test.label"
            :banner="test.banner"
            class="css_drawing_page-grid-item"
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
.css_drawing_page-hero {
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
.css_drawing_page-section {
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
.css_drawing_page-intro {
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
    margin: 0 auto;
  }
}

// ========================================
// Drawing Tests Grid
// ========================================
.css_drawing_page-grid {
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
    &:nth-child(4) {
      animation-delay: 0.2s;
    }
    &:nth-child(5) {
      animation-delay: 0.25s;
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
