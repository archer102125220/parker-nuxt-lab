<template>
  <div class="home_page">
    <!-- Hero Section -->
    <section
      class="home_page-hero"
      v-ripples-auto-drops="{
        interval: 300,
        dropRadius: 20,
        strength: 0.04,
        strengthVariance: 0.04,
        interactive: true
      }"
    >
      <div class="home_page-hero-content">
        <h1 class="home_page-hero-content-title">Parker Nuxt Lab</h1>
        <p class="home_page-hero-content-subtitle">
          {{ t('home.hero.subtitle') }}
        </p>
        <p class="home_page-hero-content-description">
          {{ t('home.hero.description') }}
        </p>
        <div class="home_page-hero-content-actions">
          <v-btn
            @click="scrollToNavigation"
            class="home_page-hero-content-actions-btn"
            css-variant="primary"
          >
            {{ t('home.hero.cta_explore') }}
          </v-btn>
          <NuxtLink
            :to="localePath('/about')"
            v-ripple
            class="home_page-hero-content-actions-btn"
            css-variant="secondary"
          >
            {{ t('home.hero.cta_about') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="home_page-features">
      <div class="home_page-features-container">
        <h2 class="home_page-features-title">{{ t('home.features.title') }}</h2>
        <div class="home_page-features-grid">
          <div
            v-for="feature in features"
            :key="feature.key"
            class="home_page-features-grid-card"
          >
            <div class="home_page-features-grid-card-icon">
              <img
                class="home_page-features-grid-card-icon-image"
                v-lazy="`/img/home/features/${feature.icon}.svg`"
                :alt="feature.title"
              />
            </div>
            <h3 class="home_page-features-grid-card-title">
              {{ feature.title }}
            </h3>
            <p class="home_page-features-grid-card-description">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Navigation Grid Section -->
    <section ref="navigationRef" class="home_page-navigation">
      <div class="home_page-navigation-container">
        <h2 class="home_page-navigation-title">
          {{ t('home.navigation.title') }}
        </h2>
        <nav class="home_page-navigation-grid" role="navigation">
          <!-- <NuxtLink
      v-for="link in linkList"
      :key="link.to"
      class="index_page-content-link"
      :to="link.to"
    >
      {{ link.label }}
    </NuxtLink> -->

          <LinkCard
            v-for="link in linkList"
            :key="link.to"
            :to="link.to"
            :banner="link.banner"
            :label="link.label"
            :description="link.description"
            class="home_page-navigation-grid-item"
          />
        </nav>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="home_page-stats">
      <div class="home_page-stats-container">
        <div v-for="stat in stats" :key="stat.key" class="home_page-stats-card">
          <div class="home_page-stats-card-value">{{ stat.value }}</div>
          <div class="home_page-stats-card-label">{{ stat.label }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHeadMataData();
definePageMeta({
  title: 'system.defaultTitle'
});

const localePath = useLocalePath();
const { t } = useI18n();

// Template refs
const navigationRef = ref(null);

// Smooth scroll to navigation section
function scrollToNavigation() {
  const element = navigationRef.value;
  if (
    element instanceof HTMLElement &&
    typeof element.scrollIntoView === 'function'
  ) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Features data
const features = computed(() => [
  {
    key: 'pwa',
    icon: 'feature-pwa',
    title: t('home.features.pwa.title'),
    description: t('home.features.pwa.description')
  },
  {
    key: 'realtime',
    icon: 'feature-realtime',
    title: t('home.features.realtime.title'),
    description: t('home.features.realtime.description')
  },
  {
    key: 'ai',
    icon: 'feature-ai',
    title: t('home.features.ai.title'),
    description: t('home.features.ai.description')
  },
  {
    key: 'testing',
    icon: 'feature-testing',
    title: t('home.features.testing.title'),
    description: t('home.features.testing.description')
  }
]);

// Stats data
const stats = computed(() => [
  {
    key: 'components',
    value: '30+',
    label: t('home.stats.components')
  },
  {
    key: 'pages',
    value: '60+',
    label: t('home.stats.pages')
  },
  {
    key: 'features',
    value: '15+',
    label: t('home.stats.features')
  },
  {
    key: 'tests',
    value: '100+',
    label: t('home.stats.tests')
  }
]);

const linkList = computed(() => [
  {
    to: localePath('/about'),
    banner: '/img/about/about-v.10.webp',
    label: t('index.about'),
    description: t('home.nav.about_desc')
  },
  {
    to: localePath('/components'),
    banner: '/img/components-page/components-page-v.05.webp',
    label: t('index.components'),
    description: t('home.nav.components_desc')
  },
  {
    to: localePath('/directives'),
    banner: '/img/vue-directives/vue-directives-v.04.webp',
    label: t('index.directives'),
    description: t('home.nav.directives_desc')
  },
  {
    to: localePath('/route'),
    banner: '/img/route/route-v.05.webp',
    label: t('index.route'),
    description: t('home.nav.route_desc')
  },
  {
    to: localePath('/css-drawing'),
    banner: '/img/css-drawing/css-drawing-v.05.webp',
    label: t('index.css_drawing'),
    description: t('home.nav.css_drawing_desc')
  },
  {
    to: localePath('/web-authn'),
    banner: '/img/web-authn/web-authn-v.06.webp',
    label: t('index.web_authn'),
    description: t('home.nav.web_authn_desc')
  },
  {
    to: localePath('/fido2-lib'),
    banner: '/img/fido2-lib/fido2-lib-v.09.webp',
    label: t('index.fido2_lib'),
    description: t('home.nav.fido2_lib_desc')
  },
  {
    to: localePath('/web-cam'),
    banner: '/img/web-cam/web-cam-v.05.webp',
    label: t('index.web_cam'),
    description: t('home.nav.web_cam_desc')
  },
  {
    to: localePath('/face-api'),
    banner: '/img/face-api/face-api-v.04.webp',
    label: t('index.face_api'),
    description: t('home.nav.face_api_desc')
  },
  {
    to: localePath('/frontend-api-cach-test'),
    banner: '/img/frontend-api-cach/frontend-api-cach-v.06.webp',
    label: t('index.frontend_cach_api'),
    description: t('home.nav.frontend_cach_api_desc')
  },
  {
    to: localePath('/firebase'),
    banner: '/img/firebase/firebase-v.07.webp',
    label: t('index.firebase'),
    description: t('home.nav.firebase_desc')
  },
  {
    to: localePath('/socket-test'),
    banner: '/img/socket/socket-v.05.webp',
    label: t('index.socket'),
    description: t('home.nav.socket_desc')
  },
  {
    to: localePath('/server-sent-event-test'),
    banner: '/img/server-sent-event/server-sent-event-v.04.webp',
    label: t('index.server_sent_event'),
    description: t('home.nav.server_sent_event_desc')
  },
  {
    to: localePath('/web-rtc'),
    banner: '/img/web-rtc/web-rtc-v.04.webp',
    label: t('index.web_rtc'),
    description: t('home.nav.web_rtc_desc')
  },
  {
    to: localePath('/face-swap'),
    label: 'AI 換臉 測試',
    description: t('home.nav.face_swap_desc')
  },
  {
    to: localePath('/swagger-doc'),
    label: t('index.swagger_doc'),
    description: t('home.nav.swagger_doc_desc')
  },
  {
    to: localePath('/indexeddb-demo'),
    label: t('index.indexeddb_demo'),
    description: t('home.nav.indexeddb_demo_desc')
  }
]);
</script>

<style lang="scss">
.home_page {
  /* Display & Box Model */
  min-height: 100vh;

  /* Visual */
  background: var(--color-bg-primary, #ffffff);

  // ========================================
  // Hero Section
  // ========================================
  &-hero {
    /* Positioning */
    position: relative;

    /* Display & Box Model */
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 80px 24px;
    overflow: hidden;

    /* Visual - for Ripples animation */
    background-image: url('/img/home/hero-gradient.svg');
    background-size: cover;
    background-position: center;

    &-content {
      /* Positioning */
      position: relative;
      z-index: 1;

      /* Display & Box Model */
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 900px;
      text-align: center;

      &-title {
        /* Display & Box Model */
        margin-bottom: 24px;

        /* Typography */
        font-size: 64px;
        font-weight: 800;
        line-height: 1.1;
        color: #ffffff;
        letter-spacing: -0.02em;

        /* Animation */
        animation: fade-in-up 0.8s ease-out;

        @media (max-width: 768px) {
          font-size: 48px;
        }
      }

      &-subtitle {
        /* Display & Box Model */
        margin-bottom: 16px;

        /* Typography */
        font-size: 28px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.95);

        /* Animation */
        animation: fade-in-up 0.8s ease-out 0.2s backwards;

        @media (max-width: 768px) {
          font-size: 22px;
        }
      }

      &-description {
        /* Display & Box Model */
        margin-bottom: 40px;
        max-width: 600px;

        /* Typography */
        font-size: 18px;
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.85);

        /* Animation */
        animation: fade-in-up 0.8s ease-out 0.4s backwards;

        @media (max-width: 768px) {
          font-size: 16px;
        }
      }

      &-actions {
        /* Display & Box Model */
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        justify-content: center;

        /* Animation */
        animation: fade-in-up 0.8s ease-out 0.6s backwards;

        &-btn {
          /* Display & Box Model */
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 32px;
          border: none;
          border-radius: 12px;

          /* Typography */
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;

          /* Misc */
          cursor: pointer;

          /* Animation */
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

          &[css-variant='primary'] {
            height: 100%;

            /* Visual */
            background: #ffffff;
            color: #44a08d;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            }
          }

          &[css-variant='secondary'] {
            /* Visual */
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff;
            border: 2px solid rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(10px);

            &:hover {
              background: rgba(255, 255, 255, 0.2);
              border-color: rgba(255, 255, 255, 0.5);
              transform: translateY(-2px);
            }
          }
        }
      }
    }
  }

  // ========================================
  // Features Section
  // ========================================
  &-features {
    /* Display & Box Model */
    padding: 100px 24px;

    /* Visual */
    background: var(--color-bg-secondary, #f8f9fa);

    &-container {
      /* Display & Box Model */
      max-width: 1200px;
      margin: 0 auto;
    }

    &-title {
      /* Display & Box Model */
      margin-bottom: 60px;

      /* Typography */
      font-size: 42px;
      font-weight: 700;
      text-align: center;
      color: var(--color-text-primary, #1a1a1a);

      @media (max-width: 768px) {
        font-size: 32px;
      }
    }

    &-grid {
      /* Display & Box Model */
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 32px;

      &-card {
        /* Display & Box Model */
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px 24px;
        border-radius: 16px;
        text-align: center;

        /* Visual */
        background: rgba(255, 255, 255, 0.8);
        border: 1px solid rgba(0, 0, 0, 0.05);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);

        /* Animation */
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        &:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
        }

        &-icon {
          /* Display & Box Model */
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          margin-bottom: 24px;
          border-radius: 16px;

          /* Visual */
          background: linear-gradient(135deg, #ffd6a5 0%, #ffb88c 100%);

          &-image {
            width: 48px;
            height: 48px;
          }
        }

        &-title {
          /* Display & Box Model */
          margin-bottom: 12px;

          /* Typography */
          font-size: 20px;
          font-weight: 600;
          color: var(--color-text-primary, #1a1a1a);
        }

        &-description {
          /* Typography */
          font-size: 15px;
          line-height: 1.6;
          color: var(--color-text-secondary, #6c757d);
        }
      }
    }
  }

  // ========================================
  // Navigation Section
  // ========================================
  &-navigation {
    /* Display & Box Model */
    padding: 100px 24px;

    &-container {
      /* Display & Box Model */
      max-width: 1400px;
      margin: 0 auto;
    }

    &-title {
      /* Display & Box Model */
      margin-bottom: 60px;

      /* Typography */
      font-size: 42px;
      font-weight: 700;
      text-align: center;
      color: var(--color-text-primary, #1a1a1a);

      @media (max-width: 768px) {
        font-size: 32px;
      }
    }

    &-grid {
      /* Display & Box Model */
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;

      @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 16px;
      }
    }
  }

  // ========================================
  // Stats Section
  // ========================================
  &-stats {
    /* Display & Box Model */
    padding: 80px 24px;

    /* Visual */
    background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);

    &-container {
      /* Display & Box Model */
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 40px;
      max-width: 1200px;
      margin: 0 auto;
    }
    &-card {
      /* Display & Box Model */
      text-align: center;

      &-value {
        /* Display & Box Model */
        margin-bottom: 8px;

        /* Typography */
        font-size: 48px;
        font-weight: 800;
        color: #ffffff;

        @media (max-width: 768px) {
          font-size: 36px;
        }
      }

      &-label {
        /* Typography */
        font-size: 16px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.9);
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

@keyframes gradient-shift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style>
