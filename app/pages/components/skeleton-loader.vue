<template>
  <div class="skeleton_loader_page">
    <!-- Hero Section -->
    <section class="skeleton_loader_page-hero">
      <div class="skeleton_loader_page-hero-background">
        <div class="skeleton_loader_page-hero-background-overlay" />
      </div>
      
      <div class="skeleton_loader_page-hero-content">
        <h1 class="skeleton_loader_page-hero-content-title">
          {{ $t('skeleton_loader_page.hero.title') }}
        </h1>
        <p class="skeleton_loader_page-hero-content-subtitle">
          {{ $t('skeleton_loader_page.hero.subtitle') }}
        </p>
        <p class="skeleton_loader_page-hero-content-description">
          {{ $t('skeleton_loader_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="skeleton_loader_page-section">
      <div class="skeleton_loader_page-demo">
        <v-checkbox
          v-model="loading"
          :value="true"
          color="primary"
          :label="$t('skeleton_loader_page.toggle_loading')"
          class="skeleton_loader_page-demo-checkbox"
        />
        <SkeletonLoader :loading="loading" class="skeleton_loader_page-demo-skeleton">
          <div class="skeleton_loader_page-demo-skeleton-content">
            <p class="skeleton_loader_page-demo-skeleton-content-text">
              {{ $t('skeleton_loader_page.loaded_content') }}
            </p>
          </div>
        </SkeletonLoader>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('skeleton_loader_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('skeleton_loader_page.hero.description')
    }
  ]
});

const loading = ref(true);
</script>

<style lang="scss" scoped>
.skeleton_loader_page {
  min-height: 100vh;

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
        
        @media (max-width: 768px) {
          font-size: 32px;
        }
      }
      
      &-subtitle {
        margin: 0 0 16px 0;
        font-size: 20px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.95);
      }
      
      &-description {
        margin: 0;
        font-size: 16px;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.9);
      }
    }
  }

  &-section {
    padding: 60px 20px;
    max-width: 800px;
    margin: 0 auto;
  }

  &-demo {
    padding: 32px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);

    &-checkbox {
      margin-bottom: 24px;
    }

    &-skeleton {
      width: 100%;
      height: 320px;

      &-content {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 320px;
        border-radius: 8px;
        background: linear-gradient(135deg, rgba(68, 160, 141, 0.1) 0%, rgba(78, 205, 196, 0.1) 100%);

        &-text {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
          color: #44A08D;
        }
      }
    }
  }
}
</style>
