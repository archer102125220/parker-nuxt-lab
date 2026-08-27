<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('swiper_js_test_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('swiper_js_test_page.hero.description')
    }
  ]
});

const slide = ref(0);
const slideLoop = ref(0);

const slideList = computed(() => {
  const slides = [];
  for (let i = 0; i <= 20; i++) {
    // let slideContent = '';
    // for (let j = i; j >= 0; j--) {
    //   slideContent += j;
    // }
    // slides.push(slideContent);
    slides.push(i);
  }
  return slides;
});
</script>

<template>
  <div class="swiper_js_test_page">
    <!-- Hero Section -->
    <section class="swiper_js_test_page-hero">
      <div class="swiper_js_test_page-hero-background">
        <div class="swiper_js_test_page-hero-background-overlay" />
      </div>

      <div class="swiper_js_test_page-hero-content">
        <h1 class="swiper_js_test_page-hero-content-title">
          {{ $t('swiper_js_test_page.hero.title') }}
        </h1>
        <p class="swiper_js_test_page-hero-content-subtitle">
          {{ $t('swiper_js_test_page.hero.subtitle') }}
        </p>
        <p class="swiper_js_test_page-hero-content-description">
          {{ $t('swiper_js_test_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="swiper_js_test_page-section">
      <div class="swiper_js_test_page-note">
        <p class="swiper_js_test_page-note-text">
          📝 此組件誕生於 Swiper v9 至 v10 期間，當時官方宣布停止維護 React/Vue
          框架組件並轉向 Web Components。 直到 Swiper v11（2023
          年底）官方才恢復對 Vue 的第一方支援，目前可直接使用官方 Vue 版本。
        </p>
      </div>

      <div class="swiper_js_test_page-demo">
        <h3 class="swiper_js_test_page-demo-title">基本用法：</h3>
        <SwiperJs
          v-model="slide"
          should-fill-height
          :slide-list="slideList"
          class="swiper_js_test_page-demo-swiper"
        >
          <template #default="{ item, index, isSliderMoveing }">
            <div class="swiper_js_test_page-demo-swiper-slide">
              <p class="swiper_js_test_page-demo-swiper-slide-text">
                item: {{ item }}
              </p>
              <p class="swiper_js_test_page-demo-swiper-slide-text">
                index: {{ index }}
              </p>
              <p class="swiper_js_test_page-demo-swiper-slide-text">
                isSliderMoveing: {{ `${isSliderMoveing}` }}
              </p>
            </div>
          </template>
        </SwiperJs>
      </div>

      <div class="swiper_js_test_page-demo">
        <h3 class="swiper_js_test_page-demo-title">循環自動播放：</h3>
        <!-- TODO: loop fix -->
        <SwiperJs
          v-model="slideLoop"
          overflow
          has-pagination
          :autoplay-delay="3000"
          :slide-list="slideList"
          class="swiper_js_test_page-demo-swiper"
        />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.swiper_js_test_page {
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
      background: linear-gradient(135deg, #44a08d 0%, #4ecdc4 100%);

      &-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          135deg,
          rgba(68, 160, 141, 0.9) 0%,
          rgba(78, 205, 196, 0.85) 100%
        );
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

  &-note {
    margin-bottom: 24px;
    padding: 16px 20px;
    border-radius: 8px;
    border-left: 4px solid #44a08d;
    background: linear-gradient(
      135deg,
      rgba(68, 160, 141, 0.08) 0%,
      rgba(78, 205, 196, 0.08) 100%
    );

    &-text {
      margin: 0;
      font-size: 14px;
      line-height: 1.7;
      color: #555;
    }
  }

  &-demo {
    margin-bottom: 40px;
    padding: 24px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);

    &-title {
      margin: 0 0 16px 0;
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    &-swiper {
      height: 200px;
      overflow-x: hidden;

      &-slide {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 20px;
        background: linear-gradient(
          135deg,
          rgba(68, 160, 141, 0.1) 0%,
          rgba(78, 205, 196, 0.1) 100%
        );
        border-radius: 8px;

        &-text {
          margin: 4px 0;
          font-size: 14px;
          color: #333;
        }
      }
    }
  }
}
</style>
