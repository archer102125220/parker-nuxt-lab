<template>
  <div class="swagger_doc_page">
    <!-- Hero Section -->
    <section class="swagger_doc_page-hero">
      <div class="swagger_doc_page-hero-background">
        <div class="swagger_doc_page-hero-background-overlay" />
      </div>

      <div class="swagger_doc_page-hero-content">
        <h1 class="swagger_doc_page-hero-content-title">
          {{ $t('swagger_doc_page.hero.title') }}
        </h1>
        <p class="swagger_doc_page-hero-content-subtitle">
          {{ $t('swagger_doc_page.hero.subtitle') }}
        </p>
        <p class="swagger_doc_page-hero-content-description">
          {{ $t('swagger_doc_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Introduction -->
    <section class="swagger_doc_page-intro">
      <div class="swagger_doc_page-intro-container">
        <p class="swagger_doc_page-intro-text">
          {{ $t('swagger_doc_page.intro') }}
        </p>
      </div>
    </section>

    <!-- Swagger UI Container -->
    <section class="swagger_doc_page-section">
      <div class="swagger_doc_page-section-container">
        <div class="swagger_doc_page-swagger_container">
          <main ref="swaggerUI" class="swagger_doc_page-swagger_ui" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('swagger_doc_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('swagger_doc_page.hero.description')
    }
  ]
});

const swaggerUI = useTemplateRef('swaggerUI');

// https://www.npmjs.com/package/swagger-ui-dist
// https://github.com/nuxt/nuxt/discussions/16165
onMounted(async () => {
  const { SwaggerUIBundle, SwaggerUIStandalonePreset } = await import(
    'swagger-ui-dist'
  );

  const ui = SwaggerUIBundle({
    url: `${import.meta.env.VITE_DOMAIN}/api/nuxt-server/swagger-docs`,
    domNode: swaggerUI.value,
    deepLinking: true,
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    layout: 'StandaloneLayout'
  });
  window.ui = ui;
});
</script>

<style lang="scss">
// Import Swagger UI styles globally (must not be scoped)
@import 'swagger-ui-dist/swagger-ui.css';
</style>

<style lang="scss" scoped>
// ========================================
// Hero Section
// ========================================
.swagger_doc_page-hero {
  // Positioning
  position: relative;

  // Display & Box Model
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;

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

    &-overlay {
      // Positioning
      position: absolute;
      top: 0;
      left: 0;

      // Display & Box Model
      width: 100%;
      height: 100%;

      // Visual
      background: linear-gradient(135deg, rgba(68, 160, 141, 0.9) 0%, rgba(78, 205, 196, 0.85) 100%);
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
// Introduction
// ========================================
.swagger_doc_page-intro {
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
// Swagger UI Section
// ========================================
.swagger_doc_page-section {
  // Display & Box Model
  padding: 60px 20px;

  &-container {
    // Display & Box Model
    max-width: 1400px;
    margin: 0 auto;
  }
}

.swagger_doc_page-swagger_container {
  // Display & Box Model
  padding: 32px;
  border-radius: 12px;

  // Visual
  background: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  // Animation
  animation: fade-in-up 0.6s ease-out 0.3s both;

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 8px;
  }
}

.swagger_doc_page-swagger_ui {
  // Display & Box Model
  min-height: 600px;
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
