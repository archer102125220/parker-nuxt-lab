<template>
  <div class="drawer_page">
    <!-- Hero Section -->
    <section class="drawer_page-hero">
      <div class="drawer_page-hero-background">
        <div class="drawer_page-hero-background-overlay" />
      </div>
      
      <div class="drawer_page-hero-content">
        <h1 class="drawer_page-hero-content-title">
          {{ $t('drawer_page.hero.title') }}
        </h1>
        <p class="drawer_page-hero-content-subtitle">
          {{ $t('drawer_page.hero.subtitle') }}
        </p>
        <p class="drawer_page-hero-content-description">
          {{ $t('drawer_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="drawer_page-section">
      <Drawer v-model="isShow" :anchor="anchor" />

      <div class="drawer_page-controls">
        <v-radio-group
          class="drawer_page-controls-radio"
          v-model="anchor"
        >
          <v-radio color="primary" :label="$t('drawer_page.buttons.top')" value="top" />
          <v-radio color="primary" :label="$t('drawer_page.buttons.right')" value="right" />
          <v-radio color="primary" :label="$t('drawer_page.buttons.bottom')" value="bottom" />
          <v-radio color="primary" :label="$t('drawer_page.buttons.left')" value="left" />
        </v-radio-group>

        <v-btn color="primary" size="large" @click="handleOpen">
          {{ $t('dialog_page.buttons.open') }}
        </v-btn>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('drawer_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('drawer_page.hero.description')
    }
  ]
});

const isShow = ref(false);
const anchor = ref('bottom');

function handleOpen() {
  isShow.value = true;
}
</script>

<style lang="scss" scoped>
.drawer_page {
  // ========================================
  // Hero Section
  // ========================================
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
      background: linear-gradient(135deg, #44A08D 0%, #4ECDC4 100%);
      
      &-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(68, 160, 141, 0.9) 0%, rgba(78, 205, 196, 0.85) 100%);
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
        animation: fade-in-up 0.6s ease-out;
        
        @media (max-width: 768px) {
          font-size: 32px;
        }
      }
      
      &-subtitle {
        margin: 0 0 16px 0;
        font-size: 20px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.95);
        animation: fade-in-up 0.6s ease-out 0.1s both;
      }
      
      &-description {
        margin: 0;
        font-size: 16px;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.9);
        animation: fade-in-up 0.6s ease-out 0.2s both;
      }
    }
  }

  &-section {
    padding: 60px 20px;
    max-width: 800px;
    margin: 0 auto;
  }

  &-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    &-radio {
      :deep(.v-selection-control-group) {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 16px;
      }
    }
  }
}
</style>
