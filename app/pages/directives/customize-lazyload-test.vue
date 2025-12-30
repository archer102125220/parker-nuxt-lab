<template>
  <div class="lazyload_test_page">
    <!-- Hero Section -->
    <section class="lazyload_test_page-hero">
      <div class="lazyload_test_page-hero-background">
        <div class="lazyload_test_page-hero-background-overlay" />
      </div>

      <div class="lazyload_test_page-hero-content">
        <h1 class="lazyload_test_page-hero-content-title">
          {{ $t('lazyload_test_page.hero.title') }}
        </h1>
        <p class="lazyload_test_page-hero-content-subtitle">
          {{ $t('lazyload_test_page.hero.subtitle') }}
        </p>
        <p class="lazyload_test_page-hero-content-description">
          {{ $t('lazyload_test_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="lazyload_test_page-section">
      <div class="lazyload_test_page-demo">
        <h3 class="lazyload_test_page-demo-label">一般圖片 (立即加載)：</h3>
        <img
          class="lazyload_test_page-demo-normal"
          src="/img/test-img/1e0ef282c7831f762deb4b4ded8592d5ff7962d832cebcf11709ae670e721560.jpg"
        />

        <div class="lazyload_test_page-demo-spacer">
          <p class="lazyload_test_page-demo-spacer-text">⬇️ 請繼續往下滾動 ⬇️</p>
          <p class="lazyload_test_page-demo-spacer-hint">
            此區域為測試用空白區塊，確保懶加載圖片在滾動前不會被提前載入。<br/>
            當您滾動到下方圖片可見區域時，圖片才會開始加載。
          </p>
        </div>

        <h3 class="lazyload_test_page-demo-label">懶加載圖片 (滾動到可見區域時加載)：</h3>
        <img
          v-customize-lazyload="'/img/test-img/1499231493_936.gif'"
          class="lazyload_test_page-demo-lazyload"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('lazyload_test_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('lazyload_test_page.hero.description')
    }
  ]
});
</script>

<style lang="scss" scoped>
.lazyload_test_page {
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
    padding: 40px 20px;
    max-width: 1000px;
    margin: 0 auto;
  }

  &-demo {
    &-label {
      margin: 24px 0 16px;
      font-size: 18px;
      font-weight: 600;
      color: #333;

      &:first-child {
        margin-top: 0;
      }
    }

    &-normal {
      width: 100%;
      max-height: 400px;
      margin-bottom: 24px;
      border-radius: 8px;
      background-color: #89afff;
      object-fit: contain;
    }

    &-spacer {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      margin: 40px 0;
      padding: 40px;
      border-radius: 12px;
      background: linear-gradient(135deg, rgba(68, 160, 141, 0.1) 0%, rgba(78, 205, 196, 0.1) 100%);
      border: 2px dashed rgba(68, 160, 141, 0.3);

      &-text {
        margin: 0 0 16px 0;
        font-size: 24px;
        font-weight: 600;
        color: #44A08D;
        animation: bounce 2s infinite;
      }

      &-hint {
        margin: 0;
        font-size: 16px;
        line-height: 1.8;
        color: #666;
        text-align: center;
      }
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(8px); }
    }

    &-lazyload {
      width: 100%;
      height: 300px;
      border-radius: 8px;
      background-color: #89afff;
      object-fit: contain;
    }
  }
}
</style>
