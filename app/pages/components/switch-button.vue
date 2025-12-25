<template>
  <div class="switch_button_page">
    <!-- Hero Section -->
    <section class="switch_button_page-hero">
      <div class="switch_button_page-hero-background">
        <div class="switch_button_page-hero-background-overlay" />
      </div>
      
      <div class="switch_button_page-hero-content">
        <h1 class="switch_button_page-hero-content-title">
          {{ $t('switch_button_page.hero.title') }}
        </h1>
        <p class="switch_button_page-hero-content-subtitle">
          {{ $t('switch_button_page.hero.subtitle') }}
        </p>
        <p class="switch_button_page-hero-content-description">
          {{ $t('switch_button_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="switch_button_page-section">
      <div class="switch_button_page-demo">
        <p class="switch_button_page-demo-value">
          {{ $t('switch_button_page.current_value') }}: 
          <strong>{{ value ? 'ON' : 'OFF' }}</strong>
        </p>
        <SwitchButton
          v-model="value"
          :label="$t('switch_button_page.label')"
          color="#909090"
          bg-color="#f2f3f4"
          checked-color="rgba(227, 151, 83, 1)"
          checked-bg-color="rgba(253, 244, 239, 1)"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('switch_button_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('switch_button_page.hero.description')
    }
  ]
});

const value = ref(false);
</script>

<style lang="scss" scoped>
.switch_button_page {
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
    display: flex;
    justify-content: center;
  }

  &-demo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 40px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);

    &-value {
      margin: 0;
      font-size: 18px;
      color: #333;

      strong {
        color: #44A08D;
      }
    }
  }
}
</style>
