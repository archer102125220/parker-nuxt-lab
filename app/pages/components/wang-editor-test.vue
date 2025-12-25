<template>
  <div class="wang_editor_page">
    <!-- Hero Section -->
    <section class="wang_editor_page-hero">
      <div class="wang_editor_page-hero-background">
        <div class="wang_editor_page-hero-background-overlay" />
      </div>
      
      <div class="wang_editor_page-hero-content">
        <h1 class="wang_editor_page-hero-content-title">
          {{ $t('wang_editor_page.hero.title') }}
        </h1>
        <p class="wang_editor_page-hero-content-subtitle">
          {{ $t('wang_editor_page.hero.subtitle') }}
        </p>
        <p class="wang_editor_page-hero-content-description">
          {{ $t('wang_editor_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="wang_editor_page-section">
      <div class="wang_editor_page-describe">
        <p class="wang_editor_page-describe-text">{{ $t('wang_editor_page.describe.text') }}</p>
      </div>

      <div class="wang_editor_page-editor">
        <WangEditor class="wang_editor_page-editor-content" editorHeight="350px" />
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('wang_editor_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('wang_editor_page.hero.description')
    }
  ]
});
</script>

<style lang="scss" scoped>
.wang_editor_page {
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
    max-width: 1000px;
    margin: 0 auto;
  }

  &-describe {
    margin-bottom: 24px;
    text-align: center;

    &-text {
      display: inline;
      margin: 0;
      font-size: 16px;
      line-height: 1.7;
      color: #333;
    }
  }

  &-editor {
    padding: 24px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);

    &-content {
      margin-bottom: 0;
    }
  }
}
</style>
