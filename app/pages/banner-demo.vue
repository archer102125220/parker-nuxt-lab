<template>
  <div class="banner-demo">
    <div class="banner-demo-header">
      <h1 class="banner-demo-title">Banner 輪播組件示範</h1>
      <p class="banner-demo-description">
        展示不同數量和配置的 Banner 輪播效果
      </p>
    </div>

    <div class="banner-demo-content">
      <!-- 單張 Banner -->
      <section class="banner-demo-section">
        <h2 class="banner-demo-section-title">單張 Banner（無自動播放）</h2>
        <Banner :banners="singleBanner" :autoplay="false" height="250px" />
      </section>

      <!-- 兩張 Banner -->
      <section class="banner-demo-section">
        <h2 class="banner-demo-section-title">兩張 Banner（自動播放）</h2>
        <Banner :banners="twoBanners" :interval="3000" height="250px" />
      </section>

      <!-- 三張 Banner -->
      <section class="banner-demo-section">
        <h2 class="banner-demo-section-title">三張 Banner（左右預覽效果）</h2>
        <Banner :banners="threeBanners" :interval="4000" height="300px" />
      </section>

      <!-- 五張 Banner -->
      <section class="banner-demo-section">
        <h2 class="banner-demo-section-title">五張 Banner（完整輪播）</h2>
        <Banner
          v-model="currentBannerIndex"
          :banners="fiveBanners"
          :interval="3500"
          height="350px"
          @change="handleBannerChange"
        />
        <p class="banner-demo-info">
          當前 Banner 索引: {{ currentBannerIndex }}
        </p>
      </section>

      <!-- 自定義內容 Banner -->
      <section class="banner-demo-section">
        <h2 class="banner-demo-section-title">自定義內容 Banner</h2>
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
        <h2 class="banner-demo-section-title">自定義導航按鈕</h2>
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
        <h2 class="banner-demo-section-title">不同高度設定</h2>
        <div class="banner-demo-grid">
          <div class="banner-demo-grid-item">
            <h3 class="banner-demo-grid-title">高度 200px</h3>
            <Banner :banners="twoBanners" height="200px" />
          </div>
          <div class="banner-demo-grid-item">
            <h3 class="banner-demo-grid-title">高度 400px</h3>
            <Banner :banners="twoBanners" height="400px" />
          </div>
        </div>
      </section>

      <!-- 無指示器和導航 -->
      <section class="banner-demo-section">
        <h2 class="banner-demo-section-title">無指示器和導航按鈕</h2>
        <Banner
          :banners="threeBanners"
          :show-indicators="false"
          :show-navigation="false"
          height="250px"
        />
      </section>
    </div>
  </div>
</template>

<script setup>
// State
const currentBannerIndex = ref(0);

// Banner Data
const singleBanner = ref([
  {
    id: 1,
    image: 'https://picsum.photos/1200/400?random=1',
    title: '單張 Banner',
    description: '這是唯一的一張 Banner，不會自動播放'
  }
]);

const twoBanners = ref([
  {
    id: 1,
    image: '/img/test-img/0d0a3-0514-5-2-2048x1365.jpg',
    title: 'Banner 1',
    description: '兩張 Banner 會自動播放'
  },
  {
    id: 2,
    image: '/img/test-img/00f162883105a01b28455c44b56926a1.jpg',
    title: 'Banner 2',
    description: '支援手勢滑動切換'
  }
]);

const threeBanners = ref([
  {
    id: 1,
    image:
      '/img/test-img/1e0ef282c7831f762deb4b4ded8592d5ff7962d832cebcf11709ae670e721560.jpg',
    title: 'Banner 1',
    description: '三張以上會顯示左右預覽效果'
  },
  {
    id: 2,
    image: '/img/test-img/4f1f0af4efd8be0a2218d271c5725aab.jpg',
    title: 'Banner 2',
    description: '滑鼠懸停會暫停自動播放'
  },
  {
    id: 3,
    image: '/img/test-img/4fc0f012-662b-40e9-873e-97cf1419ff13.jpeg',
    title: 'Banner 3',
    description: '支援循環播放'
  }
]);

const fiveBanners = ref([
  {
    id: 1,
    image: '/img/test-img/6d1090ba3fe05cff4525cc164e9614f9_t.jpeg',
    title: '足球賽事',
    description: '精彩賽事直播'
  },
  {
    id: 2,
    image: '/img/test-img/28.webp',
    title: '籃球比賽',
    description: '熱血對決'
  },
  {
    id: 3,
    image: '/img/test-img/31c0e197-9c75-4869-8b86-825720a976e5.jpeg',
    title: '網球公開賽',
    description: '頂尖選手對決'
  },
  {
    id: 4,
    image: '/img/test-img/013976b74285f13e03c761f6be8861ce.jpeg',
    title: '電競賽事',
    description: '全球總決賽'
  },
  {
    id: 5,
    image: '/img/test-img/2126235bd865479b10bb9e019b47df50.jpg',
    title: '棒球聯賽',
    description: '季後賽開打'
  }
]);

const customBanners = ref([
  {
    id: 1,
    title: '自定義樣式 1',
    description: '完全自定義的 Banner 內容'
  },
  {
    id: 2,
    title: '自定義樣式 2',
    description: '使用插槽自由設計'
  },
  {
    id: 3,
    title: '自定義樣式 3',
    description: '靈活的組件設計'
  }
]);

// Methods
function handleBannerChange(index, banner) {
  console.log('Banner changed:', index, banner);
}

// SEO
useHead({
  title: 'Banner 輪播組件示範',
  meta: [
    {
      name: 'description',
      content: '展示 Banner 輪播組件的各種使用場景和配置選項'
    }
  ]
});
</script>

<style lang="scss" scoped>
.banner-demo {
  /* Display & Box Model */
  min-height: 100vh;
  padding: 40px 20px;

  /* Visual */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

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
      border-bottom: 2px solid #667eea;

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
    color: #667eea;

    /* Visual */
    background: rgba(102, 126, 234, 0.1);
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
      background: rgba(102, 126, 234, 0.05);
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

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
  background: rgba(102, 126, 234, 0.8);

  /* Animation */
  transition: all 0.3s ease;

  /* Misc */
  cursor: pointer;

  &:hover {
    /* Visual */
    background: rgba(102, 126, 234, 1);

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
}
</style>
