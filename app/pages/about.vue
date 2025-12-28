<template>
  <div class="about_page">
    <!-- Hero Section -->
    <section class="about_page-hero">
      <div class="about_page-hero-background">
        <img
          src="/img/about/about-v.10.webp"
          alt="About Banner"
          class="about_page-hero-background-image"
        />
        <div class="about_page-hero-background-overlay" />
      </div>
      <div class="about_page-hero-content">
        <h1 class="about_page-hero-content-title">
          {{ $t('about.hero.title') }}
        </h1>
        <p class="about_page-hero-content-subtitle">
          {{ $t('about.hero.subtitle') }}
        </p>
        <p class="about_page-hero-content-description">
          {{ $t('about.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Project Overview -->
    <section class="about_page-section about_page-overview">
      <div class="about_page-section-container">
        <h2 class="about_page-section-title">
          {{ $t('about.overview.title') }}
        </h2>
        <div class="about_page-overview-content">
          <p class="about_page-overview-content-text">
            {{ $t('about.overview.intro') }}
          </p>
          <p class="about_page-overview-content-text">
            {{ $t('about.overview.purpose') }}
          </p>
          <p class="about_page-overview-content-text">
            {{ $t('about.overview.features') }}
          </p>

          <!-- GitHub Link -->
          <div class="about_page-overview-github">
            <a
              href="https://github.com/archer102125220/parker-nuxt-lab"
              target="_blank"
              rel="noopener noreferrer"
              class="about_page-overview-github-link"
            >
              <span class="about_page-overview-github-link-icon">📦</span>
              {{ $t('about.overview.view_source') }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack -->
    <section class="about_page-section about_page-tech_stack">
      <div class="about_page-section-container">
        <h2 class="about_page-section-title">
          {{ $t('about.tech_stack.title') }}
        </h2>
        <div class="about_page-tech_stack-grid">
          <div class="tech_stack-card">
            <h3 class="tech_stack-card-title">
              {{ $t('about.tech_stack.frontend.title') }}
            </h3>
            <ul class="tech_stack-card-list">
              <li
                v-for="(item, index) in frontendItems"
                :key="index"
                class="tech_stack-card-list-item"
              >
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="tech_stack-card">
            <h3 class="tech_stack-card-title">
              {{ $t('about.tech_stack.backend.title') }}
            </h3>
            <ul class="tech_stack-card-list">
              <li
                v-for="(item, index) in backendItems"
                :key="index"
                class="tech_stack-card-list-item"
              >
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="tech_stack-card">
            <h3 class="tech_stack-card-title">
              {{ $t('about.tech_stack.tools.title') }}
            </h3>
            <ul class="tech_stack-card-list">
              <li
                v-for="(item, index) in toolsItems"
                :key="index"
                class="tech_stack-card-list-item"
              >
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="tech_stack-card">
            <h3 class="tech_stack-card-title">
              {{ $t('about.tech_stack.features_tech.title') }}
            </h3>
            <ul class="tech_stack-card-list">
              <li
                v-for="(item, index) in featuresTechItems"
                :key="index"
                class="tech_stack-card-list-item"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Features -->
    <section class="about_page-section about_page-features">
      <div class="about_page-section-container">
        <h2 class="about_page-section-title">
          {{ $t('about.features.title') }}
        </h2>
        <div class="about_page-features-grid">
          <div
            v-for="feature in features"
            :key="feature.key"
            class="about_page-features-grid-card"
          >
            <div class="about_page-features-grid-card-icon">
              <div class="about_page-features-grid-card-icon-circle" />
            </div>
            <h3 class="about_page-features-grid-card-title">
              {{ $t(`about.features.${feature.key}.title`) }}
            </h3>
            <p class="about_page-features-grid-card-description">
              {{ $t(`about.features.${feature.key}.description`) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Development Philosophy -->
    <section class="about_page-section about_page-development">
      <div class="about_page-section-container">
        <h2 class="about_page-section-title">
          {{ $t('about.development.title') }}
        </h2>
        <div class="about_page-development-content">
          <p class="about_page-development-content-text">
            {{ $t('about.development.philosophy') }}
          </p>
          <p class="about_page-development-content-text">
            {{ $t('about.development.approach') }}
          </p>
          <p
            class="about_page-development-content-text about_page-development-content-credit"
          >
            {{ $t('about.development.design_credit') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Statistics -->
    <section class="about_page-stats">
      <div class="about_page-stats-container">
        <div v-for="stat in stats" :key="stat.key" class="stat_card">
          <div class="stat_card-value">{{ stat.value }}</div>
          <div class="stat_card-label">{{ $t(`home.stats.${stat.key}`) }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n();

// Tech Stack Items - defined directly to avoid i18n array handling issues
const techStack = {
  frontend: ['Nuxt 4', 'Vue 3', 'Vuetify 3', 'TypeScript', 'SCSS'],
  backend: ['Nuxt Server', 'H3', 'Nitro', 'Node.js'],
  tools: ['Vite', 'Playwright', 'ESLint', 'Git'],
  features_tech: ['PWA', 'i18n', 'WebRTC', 'Socket.IO', 'face-api.js']
};

const frontendItems = computed(() => techStack.frontend);
const backendItems = computed(() => techStack.backend);
const toolsItems = computed(() => techStack.tools);
const featuresTechItems = computed(() => techStack.features_tech);

// Features
const features = [
  { key: 'pwa' },
  { key: 'realtime' },
  { key: 'ai' },
  { key: 'testing' },
  { key: 'components' },
  { key: 'i18n' }
];

// Statistics
const stats = [
  { key: 'components', value: '30+' },
  { key: 'pages', value: '60+' },
  { key: 'features', value: '15+' },
  { key: 'tests', value: '100+' }
];

useHeadMataData({
  title: t('about.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('about.hero.description')
    }
  ]
});
</script>

<style lang="scss">
.about_page {
  // Display & Box Model
  min-height: 100vh;

  // Visual
  background: var(--color-bg-primary, #ffffff);
}

// ========================================
// Hero Section
// ========================================
.about_page-hero {
  // Positioning
  position: relative;

  // Display & Box Model
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 80px 24px;
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
        rgba(78, 205, 196, 0.9) 0%,
        rgba(68, 160, 141, 0.9) 100%
      );
    }
  }

  &-content {
    // Positioning
    position: relative;
    z-index: 1;

    // Display & Box Model
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 900px;
    text-align: center;

    &-title {
      // Display & Box Model
      margin-bottom: 24px;

      // Typography
      font-size: 56px;
      font-weight: 800;
      line-height: 1.1;
      color: #ffffff;
      letter-spacing: -0.02em;

      // Animation
      animation: fade-in-up 0.8s ease-out;

      @media (max-width: 768px) {
        font-size: 42px;
      }
    }

    &-subtitle {
      // Display & Box Model
      margin-bottom: 16px;

      // Typography
      font-size: 24px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.95);

      // Animation
      animation: fade-in-up 0.8s ease-out 0.2s backwards;

      @media (max-width: 768px) {
        font-size: 20px;
      }
    }

    &-description {
      // Display & Box Model
      max-width: 600px;

      // Typography
      font-size: 18px;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.85);

      // Animation
      animation: fade-in-up 0.8s ease-out 0.4s backwards;

      @media (max-width: 768px) {
        font-size: 16px;
      }
    }
  }
}

// ========================================
// Common Section Styles
// ========================================
.about_page-section {
  // Display & Box Model
  padding: 80px 24px;

  &-container {
    // Display & Box Model
    max-width: 1200px;
    margin: 0 auto;
  }

  &-title {
    // Display & Box Model
    margin-bottom: 48px;

    // Typography
    font-size: 42px;
    font-weight: 700;
    text-align: center;
    color: var(--color-text-primary, #1a1a1a);

    @media (max-width: 768px) {
      font-size: 32px;
    }
  }
}

// ========================================
// Project Overview
// ========================================
.about_page-overview {
  // Visual
  background: var(--color-bg-secondary, #f8f9fa);

  &-content {
    // Display & Box Model
    max-width: 800px;
    margin: 0 auto;

    &-text {
      // Display & Box Model
      margin-bottom: 24px;

      // Typography
      font-size: 18px;
      line-height: 1.8;
      color: var(--color-text-secondary, #4a5568);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &-github {
    // Display & Box Model
    margin-top: 32px;
    text-align: center;

    &-link {
      // Display & Box Model
      display: inline-flex;
      align-items: center;
      gap: 12px;
      padding: 14px 28px;
      border-radius: 12px;

      // Typography
      font-size: 16px;
      font-weight: 600;
      text-decoration: none;
      color: #ffffff;

      // Visual
      background: linear-gradient(135deg, #24292e 0%, #40484f 100%);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);

      // Animation
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      }

      &-icon {
        // Typography
        font-size: 20px;
      }
    }
  }
}

// ========================================
// Tech Stack
// ========================================
.about_page-tech_stack {
  &-grid {
    // Display & Box Model
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 24px;
  }
}

.tech_stack-card {
  // Display & Box Model
  padding: 32px 24px;
  border-radius: 16px;

  // Visual
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);

  // Animation
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  &-title {
    // Display & Box Model
    margin-bottom: 20px;

    // Typography
    font-size: 20px;
    font-weight: 600;
    color: #44a08d;
  }

  &-list {
    // Display & Box Model
    padding-left: 0;

    // Misc
    list-style: none;

    &-item {
      // Display & Box Model
      padding: 8px 0;
      padding-left: 24px;

      // Positioning
      position: relative;

      // Typography
      font-size: 16px;
      line-height: 1.6;
      color: var(--color-text-secondary, #6c757d);

      &::before {
        // Positioning
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);

        // Display & Box Model
        content: '▸';

        // Typography
        color: #4ecdc4;
        font-size: 14px;
      }
    }
  }
}

// ========================================
// Features
// ========================================
.about_page-features {
  // Visual
  background: var(--color-bg-secondary, #f8f9fa);

  &-grid {
    // Display & Box Model
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 32px;

    &-card {
      // Display & Box Model
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 24px;
      border-radius: 16px;
      text-align: center;

      // Visual
      background: rgba(255, 255, 255, 0.8);
      border: 1px solid rgba(0, 0, 0, 0.05);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);

      // Animation
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
      }

      &-icon {
        // Display & Box Model
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        margin-bottom: 24px;
        border-radius: 50%;

        // Visual
        background: linear-gradient(135deg, #ffd6a5 0%, #ffb88c 100%);

        &-circle {
          // Display & Box Model
          width: 40px;
          height: 40px;
          border-radius: 50%;

          // Visual
          background: white;
        }
      }

      &-title {
        // Display & Box Model
        margin-bottom: 12px;

        // Typography
        font-size: 20px;
        font-weight: 600;
        color: var(--color-text-primary, #1a1a1a);
      }

      &-description {
        // Typography
        font-size: 15px;
        line-height: 1.6;
        color: var(--color-text-secondary, #6c757d);
      }
    }
  }
}

// ========================================
// Development Philosophy
// ========================================
.about_page-development {
  &-content {
    // Display & Box Model
    max-width: 800px;
    margin: 0 auto;

    &-text {
      // Display & Box Model
      margin-bottom: 24px;

      // Typography
      font-size: 18px;
      line-height: 1.8;
      color: var(--color-text-secondary, #4a5568);

      &:last-child {
        margin-bottom: 0;
      }
    }

    &-credit {
      // Typography
      font-style: italic;
      font-size: 16px;
      color: var(--color-text-tertiary, #718096);

      // Display & Box Model
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid rgba(0, 0, 0, 0.08);
    }
  }
}

// ========================================
// Statistics
// ========================================
.about_page-stats {
  // Display & Box Model
  padding: 80px 24px;

  // Visual
  background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);

  &-container {
    // Display & Box Model
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
  }
}

.stat_card {
  // Display & Box Model
  text-align: center;

  &-value {
    // Display & Box Model
    margin-bottom: 8px;

    // Typography
    font-size: 48px;
    font-weight: 800;
    color: #ffffff;

    @media (max-width: 768px) {
      font-size: 36px;
    }
  }

  &-label {
    // Typography
    font-size: 16px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
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
