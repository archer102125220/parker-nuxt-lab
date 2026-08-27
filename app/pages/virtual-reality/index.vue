<script setup>
const { t } = useI18n();
const localePath = useLocalePath();

const linkList = computed(() => [
  {
    to: localePath('/virtual-reality/krpano-demo'),
    label: t('virtual_reality.krpano_demo', 'Krpano Demo'),
    description: t(
      'virtual_reality.krpano_desc',
      '360° Panorama and Virtual Tour Demo using Krpano.'
    )
  },
  {
    to: localePath('/virtual-reality/a-frame-demo'),
    label: t('virtual_reality.aframe_demo', 'A-Frame Demo'),
    description: t(
      'virtual_reality.aframe_desc',
      '3D and WebVR experiences built with A-Frame framework.'
    )
  }
]);
</script>

<template>
  <div class="virtual_reality_page">
    <!-- Hero Section -->
    <section class="virtual_reality_page-hero">
      <div class="virtual_reality_page-hero-content">
        <h1 class="virtual_reality_page-hero-content-title">
          {{ t('virtual_reality.title', 'Virtual Reality') }}
        </h1>
        <p class="virtual_reality_page-hero-content-subtitle">
          {{ t('virtual_reality.subtitle', 'WebVR & WebXR Experiments') }}
        </p>
      </div>
    </section>

    <!-- Navigation Grid Section -->
    <section class="virtual_reality_page-navigation">
      <div class="virtual_reality_page-navigation-container">
        <nav class="virtual_reality_page-navigation-grid">
          <LinkCard
            v-for="link in linkList"
            :key="link.to"
            :to="link.to"
            :banner="link.banner"
            :label="link.label"
            :description="link.description"
            class="virtual_reality_page-navigation-grid-item"
          />
        </nav>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.virtual_reality_page {
  /* Display & Box Model */
  min-height: 100vh;

  /* Visual */
  background: var(--color-bg-primary, #ffffff);

  &-hero {
    /* Positioning */
    position: relative;

    /* Display & Box Model */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 100px 24px;

    /* Visual */
    background: linear-gradient(135deg, #cbd5e1 0%, #f1f5f9 100%);
    color: #0f172a;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);

    &-content {
      /* Display & Box Model */
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      max-width: 800px;

      &-title {
        /* Display & Box Model */
        margin-bottom: 16px;

        /* Typography */
        font-size: 48px;
        font-weight: 800;
        letter-spacing: -0.02em;
        background: linear-gradient(135deg, #020617 0%, #1e293b 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        /* Animation */
        animation: fade-in-up 0.8s ease-out;

        @media (max-width: 768px) {
          font-size: 36px;
        }
      }

      &-subtitle {
        /* Typography */
        font-size: 20px;
        font-weight: 500;
        color: #334155;

        /* Animation */
        animation: fade-in-up 0.8s ease-out 0.2s backwards;

        @media (max-width: 768px) {
          font-size: 16px;
        }
      }
    }
  }

  &-navigation {
    /* Display & Box Model */
    padding: 60px 24px;

    &-container {
      /* Display & Box Model */
      max-width: 1200px;
      margin: 0 auto;
    }

    &-grid {
      /* Display & Box Model */
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;

      &-item {
        /* Animation */
        animation: fade-in-up 0.8s ease-out 0.4s backwards;
      }

      @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 16px;
      }
    }
  }
}

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
