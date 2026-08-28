<script setup>
const { t } = useI18n();

// State
const currentBannerIndex = ref(0);

// Banner Data
const singleBanner = computed(() => [
  {
    id: 1,
    image: '/img/test-img/mimi033-1603188493.jpg',
    title: t('banner_demo_page.banners.single.title'),
    description: t('banner_demo_page.banners.single.desc')
  }
]);

const twoBanners = computed(() => [
  {
    id: 1,
    image: '/img/test-img/0d0a3-0514-5-2-2048x1365.jpg',
    title: t('banner_demo_page.banners.two_1.title'),
    description: t('banner_demo_page.banners.two_1.desc')
  },
  {
    id: 2,
    image: '/img/test-img/00f162883105a01b28455c44b56926a1.jpg',
    title: t('banner_demo_page.banners.two_2.title'),
    description: t('banner_demo_page.banners.two_2.desc')
  }
]);

const threeBanners = computed(() => [
  {
    id: 1,
    image:
      '/img/test-img/1e0ef282c7831f762deb4b4ded8592d5ff7962d832cebcf11709ae670e721560.jpg',
    title: t('banner_demo_page.banners.three_1.title'),
    description: t('banner_demo_page.banners.three_1.desc')
  },
  {
    id: 2,
    image: '/img/test-img/4f1f0af4efd8be0a2218d271c5725aab.jpg',
    title: t('banner_demo_page.banners.three_2.title'),
    description: t('banner_demo_page.banners.three_2.desc')
  },
  {
    id: 3,
    image: '/img/test-img/4fc0f012-662b-40e9-873e-97cf1419ff13.jpeg',
    title: t('banner_demo_page.banners.three_3.title'),
    description: t('banner_demo_page.banners.three_3.desc')
  }
]);

const fiveBanners = computed(() => [
  {
    id: 1,
    image: '/img/test-img/6d1090ba3fe05cff4525cc164e9614f9_t.jpeg',
    title: t('banner_demo_page.banners.five_1.title'),
    description: t('banner_demo_page.banners.five_1.desc')
  },
  {
    id: 2,
    image: '/img/test-img/28.webp',
    title: t('banner_demo_page.banners.five_2.title'),
    description: t('banner_demo_page.banners.five_2.desc')
  },
  {
    id: 3,
    image: '/img/test-img/31c0e197-9c75-4869-8b86-825720a976e5.jpeg',
    title: t('banner_demo_page.banners.five_3.title'),
    description: t('banner_demo_page.banners.five_3.desc')
  },
  {
    id: 4,
    image: '/img/test-img/013976b74285f13e03c761f6be8861ce.jpeg',
    title: t('banner_demo_page.banners.five_4.title'),
    description: t('banner_demo_page.banners.five_4.desc')
  },
  {
    id: 5,
    image: '/img/test-img/2126235bd865479b10bb9e019b47df50.jpg',
    title: t('banner_demo_page.banners.five_5.title'),
    description: t('banner_demo_page.banners.five_5.desc')
  }
]);

const customBanners = computed(() => [
  {
    id: 1,
    title: t('banner_demo_page.banners.custom_1.title'),
    description: t('banner_demo_page.banners.custom_1.desc')
  },
  {
    id: 2,
    title: t('banner_demo_page.banners.custom_2.title'),
    description: t('banner_demo_page.banners.custom_2.desc')
  },
  {
    id: 3,
    title: t('banner_demo_page.banners.custom_3.title'),
    description: t('banner_demo_page.banners.custom_3.desc')
  }
]);

// Methods
function handleBannerChange(index, banner) {
  console.log('Banner changed:', index, banner);
}

// SEO
useHeadMataData({
  title: t('banner_demo_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('banner_demo_page.hero.description')
    }
  ]
});
</script>

<template>
  <div class="banner-demo">
    <div class="banner-demo-header">
      <h1 class="banner-demo-title">
        {{ $t('banner_demo_page.hero.title') }}
      </h1>
      <p class="banner-demo-description">
        {{ $t('banner_demo_page.hero.description') }}
      </p>
    </div>

    <div class="banner-demo-content">
      <!-- 單張 Banner -->
      <section class="banner-demo-section">
        <h2 class="banner-demo-section-title">
          {{ $t('banner_demo_page.sections.single') }}
        </h2>
        <Banner :banners="singleBanner" :autoplay="false" height="250px" />
      </section>

      <!-- 兩張 Banner -->
      <section class="banner-demo-section">
        <h2 class="banner-demo-section-title">
          {{ $t('banner_demo_page.sections.two') }}
        </h2>
        <Banner :banners="twoBanners" :interval="3000" height="250px" />
      </section>

      <!-- 三張 Banner -->
      <section class="banner-demo-section">
        <h2 class="banner-demo-section-title">
          {{ $t('banner_demo_page.sections.three') }}
        </h2>
        <Banner :banners="threeBanners" :interval="4000" height="300px" />
      </section>

      <!-- 五張 Banner -->
      <section class="banner-demo-section">
        <h2 class="banner-demo-section-title">
          {{ $t('banner_demo_page.sections.five') }}
        </h2>
        <Banner
          v-model="currentBannerIndex"
          :banners="fiveBanners"
          :interval="3500"
          height="350px"
          @change="handleBannerChange"
        />
        <p class="banner-demo-info">
          {{ $t('banner_demo_page.current_index', { index: currentBannerIndex }) }}
        </p>
      </section>

      <!-- 自定義內容 Banner -->
      <section class="banner-demo-section">
        <h2 class="banner-demo-section-title">
          {{ $t('banner_demo_page.sections.custom_content') }}
        </h2>
        <Banner :banners="customBanners" height="300px">
          <template #default="{ banner, index, isActive }">
            <div class="custom-banner-content" :class="{ active: isActive }">
              <div class="custom-banner-number">{{ index + 1 }}</div>
              <h3 class="custom-banner-title">{{ banner.title }}</h3>
              <p class="custom-banner-text">{{ banner.description }}</p>
            </div>
          </template>
        </Banner>
      </section>

      <!-- 自定義導航按鈕 -->
      <section class="banner-demo-section">
        <h2 class="banner-demo-section-title">
          {{ $t('banner_demo_page.sections.custom_nav') }}
        </h2>
        <Banner :banners="threeBanners" height="250px">
          <template #prev>
            <div class="custom-nav-btn">◀</div>
          </template>
          <template #next>
            <div class="custom-nav-btn">▶</div>
          </template>
        </Banner>
      </section>

      <!-- 不同高度設定 -->
      <section class="banner-demo-section">
        <h2 class="banner-demo-section-title">
          {{ $t('banner_demo_page.sections.different_heights') }}
        </h2>
        <div class="banner-demo-grid">
          <div class="banner-demo-grid-item">
            <h3 class="banner-demo-grid-title">
              {{ $t('banner_demo_page.sections.height_200') }}
            </h3>
            <Banner :banners="twoBanners" :autoplay="true" height="200px" />
          </div>
          <div class="banner-demo-grid-item">
            <h3 class="banner-demo-grid-title">
              {{ $t('banner_demo_page.sections.height_400') }}
            </h3>
            <Banner :banners="twoBanners" :autoplay="true" height="400px" />
          </div>
        </div>
      </section>

      <!-- 無指示器和導航 -->
      <section class="banner-demo-section">
        <h2 class="banner-demo-section-title">
          {{ $t('banner_demo_page.sections.no_indicators') }}
        </h2>
        <Banner
          :banners="threeBanners"
          :show-indicators="false"
          :show-navigation="false"
          height="250px"
        />
      </section>

      <!-- 鍵盤導航 -->
      <section class="banner-demo-section">
        <h2 class="banner-demo-section-title">
          {{ $t('banner_demo_page.sections.keyboard_nav') }}
        </h2>
        <p class="banner-demo-info">
          {{ $t('banner_demo_page.keyboard_guide.info') }}
        </p>
        <div class="banner-demo-keyboard-guide">
          <div class="keyboard-item">
            <kbd>←</kbd>
            <span>{{ $t('banner_demo_page.keyboard_guide.prev') }}</span>
          </div>
          <div class="keyboard-item">
            <kbd>→</kbd>
            <span>{{ $t('banner_demo_page.keyboard_guide.next') }}</span>
          </div>
          <div class="keyboard-item">
            <kbd>Space</kbd>
            <span>{{ $t('banner_demo_page.keyboard_guide.toggle_play') }}</span>
          </div>
          <div class="keyboard-item">
            <kbd>Home</kbd>
            <span>{{ $t('banner_demo_page.keyboard_guide.first') }}</span>
          </div>
          <div class="keyboard-item">
            <kbd>End</kbd>
            <span>{{ $t('banner_demo_page.keyboard_guide.last') }}</span>
          </div>
        </div>
        <Banner :banners="fiveBanners" height="300px" />
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner-demo {
  /* Display & Box Model */
  min-height: 100vh;
  padding: 40px 20px;

  /* Visual */
  background: linear-gradient(135deg, #44a08d 0%, #4ecdc4 100%);

  &-header {
    /* Display & Box Model */
    max-width: 1200px;
    margin: 0 auto 40px;
    padding: 30px;
    border-radius: 12px;

    /* Typography */
    text-align: center;

    /* Visual */
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  &-title {
    /* Display & Box Model */
    margin: 0 0 15px;

    /* Typography */
    font-size: 36px;
    font-weight: 700;
    color: #333;
  }

  &-description {
    /* Display & Box Model */
    margin: 0;

    /* Typography */
    font-size: 18px;
    color: #666;
  }

  &-content {
    /* Display & Box Model */
    max-width: 1200px;
    margin: 0 auto;
  }

  &-section {
    /* Display & Box Model */
    margin-bottom: 50px;
    padding: 30px;
    border-radius: 12px;

    /* Visual */
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

    &-title {
      /* Display & Box Model */
      margin: 0 0 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #44a08d;

      /* Typography */
      font-size: 24px;
      font-weight: 600;
      color: #333;
    }
  }

  &-info {
    /* Display & Box Model */
    margin: 15px 0 0;
    padding: 10px 15px;
    border-radius: 6px;

    /* Typography */
    font-size: 14px;
    font-weight: 500;
    color: #44a08d;

    /* Visual */
    background: rgba(68, 160, 141, 0.1);
  }

  &-grid {
    /* Display & Box Model */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;

    &-item {
      /* Display & Box Model */
      padding: 20px;
      border-radius: 8px;

      /* Visual */
      background: rgba(68, 160, 141, 0.05);
    }

    &-title {
      /* Display & Box Model */
      margin: 0 0 15px;

      /* Typography */
      font-size: 18px;
      font-weight: 600;
      color: #555;
    }
  }
}

.custom-banner-content {
  /* Positioning */
  position: relative;

  /* Display & Box Model */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 40px;

  /* Visual */
  background: linear-gradient(135deg, #44a08d 0%, #4ecdc4 100%);

  /* Animation */
  transition: all 0.3s ease;

  &.active {
    /* Animation */
    transform: scale(1.02);
  }
}

.custom-banner-number {
  /* Display & Box Model */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  border: 4px solid #fff;
  border-radius: 50%;

  /* Typography */
  font-size: 36px;
  font-weight: 700;
  color: #fff;
}

.custom-banner-title {
  /* Display & Box Model */
  margin: 0 0 15px;

  /* Typography */
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  text-align: center;
}

.custom-banner-text {
  /* Display & Box Model */
  margin: 0;

  /* Typography */
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
}

.custom-nav-btn {
  /* Display & Box Model */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border: 3px solid #fff;
  border-radius: 50%;

  /* Typography */
  font-size: 24px;
  color: #fff;

  /* Visual */
  background: rgba(68, 160, 141, 0.8);

  /* Animation */
  transition: all 0.3s ease;

  /* Misc */
  cursor: pointer;

  &:hover {
    /* Visual */
    background: rgba(68, 160, 141, 1);

    /* Animation */
    transform: scale(1.1);
  }
}

@media (max-width: 768px) {
  .banner-demo {
    /* Display & Box Model */
    padding: 20px 10px;

    &-header {
      /* Display & Box Model */
      padding: 20px;
    }

    &-title {
      /* Typography */
      font-size: 28px;
    }

    &-description {
      /* Typography */
      font-size: 16px;
    }

    &-section {
      /* Display & Box Model */
      padding: 20px;
      margin-bottom: 30px;

      &-title {
        /* Typography */
        font-size: 20px;
      }
    }

    &-grid {
      /* Display & Box Model */
      grid-template-columns: 1fr;
    }
  }

  .custom-banner-number {
    /* Display & Box Model */
    width: 60px;
    height: 60px;

    /* Typography */
    font-size: 28px;
  }

  .custom-banner-title {
    /* Typography */
    font-size: 24px;
  }

  .custom-banner-text {
    /* Typography */
    font-size: 16px;
  }

  .banner-demo-keyboard-guide {
    /* Display & Box Model */
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 20px;

    .keyboard-item {
      /* Display & Box Model */
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 15px;
      border-radius: 8px;

      /* Visual */
      background: rgba(68, 160, 141, 0.1);

      kbd {
        /* Display & Box Model */
        display: inline-block;
        min-width: 40px;
        padding: 5px 10px;
        border: 2px solid rgba(68, 160, 141, 0.3);
        border-radius: 4px;

        /* Typography */
        font-family: monospace;
        font-size: 14px;
        font-weight: 600;
        color: #44a08d;
        text-align: center;

        /* Visual */
        background: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      span {
        /* Typography */
        font-size: 14px;
        color: #555;
      }
    }
  }
}
</style>
