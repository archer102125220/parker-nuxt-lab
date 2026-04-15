<template>
  <div class="animation_page">
    <!-- Hero Section -->
    <section class="animation_page-hero">
      <div class="animation_page-hero-background">
        <div class="animation_page-hero-background-overlay" />
        <div class="animation_page-hero-background-particles">
          <span
            v-for="i in 12"
            :key="i"
            class="animation_page-hero-background-particles-dot"
          />
        </div>
      </div>

      <div class="animation_page-hero-content">
        <h1 class="animation_page-hero-content-title">
          {{ $t('animation_page.hero.title') }}
        </h1>
        <p class="animation_page-hero-content-subtitle">
          {{ $t('animation_page.hero.subtitle') }}
        </p>
        <p class="animation_page-hero-content-description">
          {{ $t('animation_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Introduction -->
    <section class="animation_page-intro">
      <div class="animation_page-section-container">
        <p class="animation_page-intro-text">
          {{ $t('animation_page.intro.text') }}
        </p>
      </div>
    </section>

    <!-- Animation Demos Grid -->
    <section class="animation_page-section">
      <div class="animation_page-section-container">
        <h2 class="animation_page-section-title">
          {{ $t('animation_page.demos.title') }}
        </h2>
        <div class="animation_page-grid">
          <LinkCard
            v-for="item in demoItems"
            :key="item.to"
            :to="item.to"
            :label="item.label"
            :description="item.description"
            class="animation_page-grid-item"
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
  title: t('animation_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('animation_page.hero.description')
    }
  ]
});

const DOMAIN = import.meta.env.VITE_DOMAIN || '';

// Schema.org 結構化資料 (nuxt-schema-org)
useSchemaOrg([
  defineWebPage({
    '@type': ['WebPage', 'CollectionPage'],
    name: t('animation_page.hero.title'),
    description: t('animation_page.hero.description'),
    url: `${DOMAIN}${localePath('/animation')}`,
    inLanguage: ['zh-TW', 'en'],
    author: {
      '@type': 'Person',
      name: 'Parker Chen',
      url: `${DOMAIN}${localePath('/about')}`
    },
    about: {
      '@type': 'SoftwareApplication',
      name: 'Parker Nuxt Lab',
      applicationCategory: 'DeveloperApplication',
      description: t('animation_page.hero.description'),
      operatingSystem: 'Web Browser',
      url: DOMAIN
    },
    mainEntity: {
      '@type': 'ItemList',
      name: t('animation_page.demos.title'),
      description: t('animation_page.intro.text'),
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: t('animation_page.demos.enter_label.label'),
          url: `${DOMAIN}${localePath('/animation/enter-label')}`
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: t('animation_page.demos.ripples.label'),
          url: `${DOMAIN}${localePath('/animation/ripples-component')}`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: t('animation_page.demos.triangle_anime.label'),
          url: `${DOMAIN}${localePath('/animation/triangle-anime-test')}`
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: t('animation_page.demos.waving_image.label'),
          url: `${DOMAIN}${localePath('/animation/waving-image')}`
        }
      ]
    }
  })
]);

const demoItems = computed(() => [
  {
    to: localePath('/animation/enter-label'),
    label: t('animation_page.demos.enter_label.label'),
    description: t('animation_page.demos.enter_label.description')
  },
  {
    to: localePath('/animation/ripples-component'),
    label: t('animation_page.demos.ripples.label'),
    description: t('animation_page.demos.ripples.description')
  },
  {
    to: localePath('/animation/triangle-anime-test'),
    label: t('animation_page.demos.triangle_anime.label'),
    description: t('animation_page.demos.triangle_anime.description')
  },
  {
    to: localePath('/animation/waving-image'),
    label: t('animation_page.demos.waving_image.label'),
    description: t('animation_page.demos.waving_image.description')
  }
]);
</script>

<style lang="scss" scoped>
.animation_page {
  // ========================================
  // Hero Section
  // ========================================
  &-hero {
    /* Positioning */
    position: relative;

    /* Display & Box Model */
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;

    /* Visual */
    overflow: hidden;

    &-background {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        135deg,
        #1a1a2e 0%,
        #16213e 40%,
        #0f3460 70%,
        #44a08d 100%
      );

      &-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background:
          radial-gradient(
            ellipse at 30% 50%,
            rgba(68, 160, 141, 0.25) 0%,
            transparent 60%
          ),
          radial-gradient(
            ellipse at 80% 20%,
            rgba(78, 205, 196, 0.15) 0%,
            transparent 50%
          );
      }

      &-particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        &-dot {
          position: absolute;
          display: block;
          border-radius: 50%;
          background: rgba(78, 205, 196, 0.6);
          animation: float-particle 8s infinite ease-in-out;

          &:nth-child(1) {
            width: 6px;
            height: 6px;
            top: 15%;
            left: 10%;
            animation-delay: 0s;
            animation-duration: 7s;
          }
          &:nth-child(2) {
            width: 4px;
            height: 4px;
            top: 30%;
            left: 25%;
            animation-delay: 1s;
            animation-duration: 9s;
          }
          &:nth-child(3) {
            width: 8px;
            height: 8px;
            top: 60%;
            left: 15%;
            animation-delay: 2s;
            animation-duration: 6s;
          }
          &:nth-child(4) {
            width: 5px;
            height: 5px;
            top: 20%;
            left: 70%;
            animation-delay: 0.5s;
            animation-duration: 8s;
          }
          &:nth-child(5) {
            width: 3px;
            height: 3px;
            top: 50%;
            left: 80%;
            animation-delay: 3s;
            animation-duration: 10s;
          }
          &:nth-child(6) {
            width: 7px;
            height: 7px;
            top: 75%;
            left: 60%;
            animation-delay: 1.5s;
            animation-duration: 7.5s;
          }
          &:nth-child(7) {
            width: 4px;
            height: 4px;
            top: 10%;
            left: 45%;
            animation-delay: 2.5s;
            animation-duration: 8.5s;
          }
          &:nth-child(8) {
            width: 6px;
            height: 6px;
            top: 85%;
            left: 30%;
            animation-delay: 0.8s;
            animation-duration: 9.5s;
          }
          &:nth-child(9) {
            width: 5px;
            height: 5px;
            top: 40%;
            left: 90%;
            animation-delay: 3.5s;
            animation-duration: 6.5s;
          }
          &:nth-child(10) {
            width: 3px;
            height: 3px;
            top: 65%;
            left: 5%;
            animation-delay: 4s;
            animation-duration: 11s;
          }
          &:nth-child(11) {
            width: 8px;
            height: 8px;
            top: 5%;
            left: 85%;
            animation-delay: 1.2s;
            animation-duration: 7.2s;
          }
          &:nth-child(12) {
            width: 4px;
            height: 4px;
            top: 95%;
            left: 50%;
            animation-delay: 2.8s;
            animation-duration: 8.8s;
          }
        }
      }
    }

    &-content {
      /* Positioning */
      position: relative;
      z-index: 1;

      /* Display & Box Model */
      max-width: 800px;
      text-align: center;

      &-title {
        /* Display & Box Model */
        margin: 0 0 16px 0;

        /* Typography */
        font-size: 48px;
        font-weight: 800;
        color: #ffffff;

        /* Animation */
        animation: fade-in-up 0.6s ease-out;

        @media (max-width: 768px) {
          font-size: 36px;
        }
      }

      &-subtitle {
        /* Display & Box Model */
        margin: 0 0 24px 0;

        /* Typography */
        font-size: 24px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.95);

        /* Animation */
        animation: fade-in-up 0.6s ease-out 0.1s both;

        @media (max-width: 768px) {
          font-size: 20px;
        }
      }

      &-description {
        /* Display & Box Model */
        margin: 0;

        /* Typography */
        font-size: 18px;
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.9);

        /* Animation */
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
  &-section {
    /* Display & Box Model */
    padding: 60px 20px;

    &-container {
      /* Display & Box Model */
      max-width: 1200px;
      margin: 0 auto;
    }

    &-title {
      /* Display & Box Model */
      margin: 0 0 40px 0;

      /* Typography */
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
  &-intro {
    /* Display & Box Model */
    padding: 60px 20px;

    /* Visual */
    background: var(--color-bg-secondary, #f7fafc);

    &-container {
      /* Display & Box Model */
      max-width: 1200px;
      margin: 0 auto;
    }

    &-text {
      /* Typography */
      font-size: 18px;
      line-height: 1.8;
      color: var(--color-text-secondary, #4a5568);
      text-align: center;

      /* Display & Box Model */
      max-width: 800px;
      margin: 0 auto;
    }
  }

  // ========================================
  // Animation Demos Grid
  // ========================================
  &-grid {
    /* Display & Box Model */
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    &-item {
      /* Animation */
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
