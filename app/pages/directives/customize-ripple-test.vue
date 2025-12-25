<template>
  <div class="ripple_test_page">
    <!-- Hero Section -->
    <section class="ripple_test_page-hero">
      <div class="ripple_test_page-hero-background">
        <div class="ripple_test_page-hero-background-overlay" />
      </div>
      
      <div class="ripple_test_page-hero-content">
        <h1 class="ripple_test_page-hero-content-title">
          {{ $t('ripple_test_page.hero.title') }}
        </h1>
        <p class="ripple_test_page-hero-content-subtitle">
          {{ $t('ripple_test_page.hero.subtitle') }}
        </p>
        <p class="ripple_test_page-hero-content-description">
          {{ $t('ripple_test_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="ripple_test_page-section">
      <div class="ripple_test_page-demo">
        <p 
          v-customize-ripple 
          class="ripple_test_page-demo-button"
        >
          {{ $t('ripple_test_page.click_me') }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('ripple_test_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('ripple_test_page.hero.description')
    }
  ]
});
</script>

<style lang="scss" scoped>
.ripple_test_page {
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
    padding: 80px 20px;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }

  &-demo {
    &-button {
      display: inline-block;
      padding: 20px 48px;
      border-radius: 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      user-select: none;
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
      }

      &:active {
        transform: translateY(0);
      }
    }
  }
}
</style>
