<template>
  <div class="components_page">
    <!-- Hero Section -->
    <section class="components_page-hero">
      <div class="components_page-hero-background">
        <img
          src="/img/components-page/components-page-v.05.webp"
          alt="Components"
          class="components_page-hero-background-image"
        />
        <div class="components_page-hero-background-overlay" />
      </div>

      <div class="components_page-hero-content">
        <h1 class="components_page-hero-content-title">
          {{ $t('components_page.hero.title') }}
        </h1>
        <p class="components_page-hero-content-subtitle">
          {{ $t('components_page.hero.subtitle') }}
        </p>
        <p class="components_page-hero-content-description">
          {{ $t('components_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Introduction -->
    <section class="components_page-intro">
      <div class="components_page-section-container">
        <p class="components_page-intro-text">
          {{ $t('components_page.intro.custom') }}
        </p>
        <p class="components_page-intro-text">
          {{ $t('components_page.intro.integration') }}
        </p>
      </div>
    </section>

    <!-- UI Components -->
    <section class="components_page-category">
      <div class="components_page-section-container">
        <h2 class="components_page-section-title">
          {{ $t('components_page.categories.ui') }}
        </h2>
        <div class="components_page-grid">
          <LinkCard
            v-for="component in uiComponents"
            :key="component.to"
            :to="component.to"
            :label="component.label"
            :banner="component.banner"
            class="components_page-grid-item"
          />
        </div>
      </div>
    </section>

    <!-- Functional Components -->
    <section class="components_page-category">
      <div class="components_page-section-container">
        <h2 class="components_page-section-title">
          {{ $t('components_page.categories.functional') }}
        </h2>
        <div class="components_page-grid">
          <LinkCard
            v-for="component in functionalComponents"
            :key="component.to"
            :label="component.label"
            :to="component.to"
            :banner="component.banner"
            class="components_page-grid-item"
          />
        </div>
      </div>
    </section>

    <!-- Third-party Integrations -->
    <section class="components_page-category">
      <div class="components_page-section-container">
        <h2 class="components_page-section-title">
          {{ $t('components_page.categories.integration') }}
        </h2>
        <div class="components_page-grid">
          <LinkCard
            v-for="component in integrationComponents"
            :key="component.to"
            :to="component.to"
            :label="component.label"
            :banner="component.banner"
            class="components_page-grid-item"
          />
        </div>
      </div>
    </section>

    <!-- Combined Tests -->
    <section class="components_page-category">
      <div class="components_page-section-container">
        <h2 class="components_page-section-title">
          {{ $t('components_page.categories.combined') }}
        </h2>
        <div class="components_page-grid">
          <LinkCard
            v-for="component in combinedComponents"
            :key="component.to"
            :to="component.to"
            :label="component.label"
            :banner="component.banner"
            class="components_page-grid-item"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n();
const localePath = useLocalePath();

useHeadMataData({
  title: t('components_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('components_page.hero.description')
    }
  ]
});

const DOMAIN = import.meta.env.VITE_DOMAIN || '';

// Schema.org 結構化資料 (nuxt-schema-org)
useSchemaOrg([
  defineWebPage({
    '@type': ['WebPage', 'CollectionPage'],
    name: t('components_page.hero.title'),
    description: t('components_page.hero.description'),
    url: `${DOMAIN}${localePath('/components')}`,
    inLanguage: ['zh-TW', 'en'],
    image: `${DOMAIN}/img/components-page/components-page-v.05.webp`,
    author: {
      '@type': 'Person',
      name: 'Parker Chen',
      url: `${DOMAIN}${localePath('/about')}`
    },
    about: {
      '@type': 'SoftwareApplication',
      name: 'Parker Nuxt Lab',
      applicationCategory: 'DeveloperApplication',
      description: t('components_page.hero.description'),
      operatingSystem: 'Web Browser',
      url: DOMAIN
    },
    mainEntity: {
      '@type': 'ItemList',
      name: t('components_page.hero.title'),
      description: t('components_page.hero.subtitle'),
      itemListElement: [
        // UI Components
        { '@type': 'ListItem', position: 1, name: t('components.tab'), url: `${DOMAIN}${localePath('/components/tab-test')}` },
        { '@type': 'ListItem', position: 2, name: '彈窗組件', url: `${DOMAIN}${localePath('/components/dialog')}` },
        { '@type': 'ListItem', position: 3, name: '抽屜收展組件', url: `${DOMAIN}${localePath('/components/drawer')}` },
        { '@type': 'ListItem', position: 4, name: '下拉選單組件', url: `${DOMAIN}${localePath('/components/selector')}` },
        { '@type': 'ListItem', position: 5, name: 'Switch 組件測試', url: `${DOMAIN}${localePath('/components/switch-button')}` },
        { '@type': 'ListItem', position: 6, name: 'Skeleton 組件', url: `${DOMAIN}${localePath('/components/skeleton-loader')}` },
        { '@type': 'ListItem', position: 7, name: '文字特效測試', url: `${DOMAIN}${localePath('/components/enter-label')}` },
        { '@type': 'ListItem', position: 8, name: '倒數計時組件', url: `${DOMAIN}${localePath('/components/countdown-test')}` },
        // Functional Components
        { '@type': 'ListItem', position: 9, name: t('components.scroll_fetch'), url: `${DOMAIN}${localePath('/components/scroll-fetch')}` },
        { '@type': 'ListItem', position: 10, name: '選擇圖片組件測試', url: `${DOMAIN}${localePath('/components/image-upload-test')}` },
        { '@type': 'ListItem', position: 11, name: '電話號碼輸入組件', url: `${DOMAIN}${localePath('/components/phone-input')}` },
        { '@type': 'ListItem', position: 12, name: '返回置頂組件測試', url: `${DOMAIN}${localePath('/components/go-top')}` },
        { '@type': 'ListItem', position: 13, name: 'Virtual Scroller 組件測試', url: `${DOMAIN}${localePath('/components/virtual-scroller')}` },
        { '@type': 'ListItem', position: 14, name: '訊息佇列測試', url: `${DOMAIN}${localePath('/components/slide-in-panel')}` },
        { '@type': 'ListItem', position: 15, name: 'QR Code 測試', url: `${DOMAIN}${localePath('/components/qr-code-test')}` },
        // Third-party Integrations
        { '@type': 'ListItem', position: 16, name: t('components.wang_editor'), url: `${DOMAIN}${localePath('/components/wang-editor-test')}` },
        { '@type': 'ListItem', position: 17, name: t('components.youtube'), url: `${DOMAIN}${localePath('/components/youtube-test')}` },
        { '@type': 'ListItem', position: 18, name: '自製 Swiper 測試', url: `${DOMAIN}${localePath('/components/swiper-test')}` },
        { '@type': 'ListItem', position: 19, name: 'SwiperJS 測試', url: `${DOMAIN}${localePath('/components/swiper-js-test')}` },
        { '@type': 'ListItem', position: 20, name: 'Banner 輪播組件測試', url: `${DOMAIN}${localePath('/components/banner-demo')}` },
        { '@type': 'ListItem', position: 21, name: t('ripples_component_page.hero.title'), url: `${DOMAIN}${localePath('/components/ripples-component')}` },
        // Combined Tests
        { '@type': 'ListItem', position: 22, name: '組件綜合測試（Tabs、下拉重載、WangEditor、Youtube）', url: `${DOMAIN}${localePath('/components/components-test')}` }
      ]
    }
  })
]);

// UI Components
const uiComponents = computed(() => [
  { to: localePath('/components/tab-test'), label: t('components.tab') },
  { to: localePath('/components/dialog'), label: '彈窗組件' },
  { to: localePath('/components/drawer'), label: '抽屜收展組件' },
  { to: localePath('/components/selector'), label: '下拉選單組件' },
  { to: localePath('/components/switch-button'), label: 'Switch 組件測試' },
  { to: localePath('/components/skeleton-loader'), label: 'Skeleton 組件' },
  { to: localePath('/components/enter-label'), label: '文字特效測試' },
  { to: localePath('/components/countdown-test'), label: '倒數計時組件' }
]);

// Functional Components
const functionalComponents = computed(() => [
  {
    to: localePath('/components/scroll-fetch'),
    label: t('components.scroll_fetch')
  },
  {
    to: localePath('/components/image-upload-test'),
    label: '選擇圖片組件測試'
  },
  { to: localePath('/components/phone-input'), label: '電話號碼輸入組件' },
  { to: localePath('/components/go-top'), label: '返回置頂組件測試' },
  {
    to: localePath('/components/virtual-scroller'),
    label: 'Virtual Scroller 組件測試'
  },
  { to: localePath('/components/slide-in-panel'), label: '訊息佇列測試' },
  { to: localePath('/components/qr-code-test'), label: 'QR Code 測試' }
]);

// Third-party Integrations
const integrationComponents = computed(() => [
  {
    to: localePath('/components/wang-editor-test'),
    label: t('components.wang_editor')
  },
  {
    to: localePath('/components/youtube-test'),
    label: t('components.youtube')
  },
  { to: localePath('/components/swiper-test'), label: '自製 Swiper 測試' },
  { to: localePath('/components/swiper-js-test'), label: 'SwiperJS 測試' },
  { to: localePath('/components/banner-demo'), label: 'Banner 輪播組件測試' },
  {
    to: localePath('/components/ripples-component'),
    label: t('ripples_component_page.hero.title')
  }
]);

// Combined Tests
const combinedComponents = computed(() => [
  {
    to: localePath('/components/components-test'),
    banner: '/img/components-test/components-test-v.05.webp',
    label: '組件綜合測試（Tabs、下拉重載、WangEditor、Youtube）'
  }
]);
</script>

<style lang="scss" scoped>
// ========================================
// Hero Section
// ========================================
.components_page-hero {
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
.components_page-section {
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
.components_page-intro {
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
    margin-bottom: 20px;

    // Typography
    font-size: 18px;
    line-height: 1.8;
    color: var(--color-text-secondary, #4a5568);

    &:last-child {
      margin-bottom: 0;
    }
  }
}

// ========================================
// Category Sections
// ========================================
.components_page-category {
  // Display & Box Model
  padding: 60px 20px;

  &:nth-child(even) {
    // Visual
    background: var(--color-bg-secondary, #f7fafc);
  }

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
// Components Grid
// ========================================
.components_page-grid {
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
    &:nth-child(6) {
      animation-delay: 0.3s;
    }
  }
}

// ========================================
// Category Section
// ========================================
.components_page-category {
  &:nth-child(even) {
    background: var(--color-bg-secondary, #f7fafc);
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
