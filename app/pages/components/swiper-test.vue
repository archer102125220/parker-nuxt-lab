<template>
  <div class="swiper_test_page">
    <!-- Hero Section -->
    <section class="swiper_test_page-hero">
      <div class="swiper_test_page-hero-background">
        <div class="swiper_test_page-hero-background-overlay" />
      </div>
      
      <div class="swiper_test_page-hero-content">
        <h1 class="swiper_test_page-hero-content-title">
          {{ $t('swiper_test_page.hero.title') }}
        </h1>
        <p class="swiper_test_page-hero-content-subtitle">
          {{ $t('swiper_test_page.hero.subtitle') }}
        </p>
        <p class="swiper_test_page-hero-content-description">
          {{ $t('swiper_test_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="swiper_test_page-section">
      <div class="swiper_test_page-describe">
        <p class="swiper_test_page-describe-text">{{ $t('swiper_test_page.describe.text') }}</p>
        <span class="swiper_test_page-describe-note">（</span>
        <del class="swiper_test_page-describe-strikethrough">{{ $t('swiper_test_page.describe.strikethrough') }}</del>
        <span class="swiper_test_page-describe-note">）</span>
      </div>

      <SwiperCustom
        v-model="slide"
        should-fill-height
        :slide-list="slideList"
        class="swiper_test_page-swiper"
      />
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('swiper_test_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('swiper_test_page.hero.description')
    }
  ]
});

const slide = ref(0);

const slideList = computed(() => {
  const slides = [];
  for (let i = 0; i <= 20; i++) {
    let slideContent = '';
    for (let j = i; j >= 0; j--) {
      slideContent += j;
    }
    slides.push(slideContent);
  }
  return slides;
});
</script>

<style lang="scss" scoped>
.swiper_test_page {
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
  }

  &-describe {
    display: inline;
    margin-bottom: 24px;

    &-text {
      display: inline;
      margin: 0;
      font-size: 16px;
      line-height: 1.7;
      color: #333;
    }

    &-note {
      font-size: 14px;
      color: #999;
    }

    &-strikethrough {
      font-size: 14px;
      color: #999;
    }
  }

  &-swiper {
    height: 50vh;
    overflow-x: hidden;
  }
}
</style>
