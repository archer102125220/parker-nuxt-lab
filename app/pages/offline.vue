<template>
  <div class="offline_page">
    <!-- Hero Section -->
    <section class="offline_page-hero">
      <div class="offline_page-hero-background">
        <div class="offline_page-hero-background-overlay" />
      </div>

      <div class="offline_page-hero-content">
        <h1 class="offline_page-hero-content-title">
          {{ $t('offline_page.hero.title') }}
        </h1>
        <p class="offline_page-hero-content-subtitle">
          {{ $t('offline_page.hero.subtitle') }}
        </p>
        <p class="offline_page-hero-content-description">
          {{ $t('offline_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Introduction -->
    <section class="offline_page-intro">
      <div class="offline_page-intro-container">
        <p class="offline_page-intro-text">
          {{ $t('offline_page.intro') }}
        </p>
      </div>
    </section>

    <!-- Network Status Test -->
    <section class="offline_page-section">
      <div class="offline_page-section-container">
        <div class="offline_page-status_card">
          <!-- Network Icon -->
          <div class="offline_page-status_card-icon_container">
            <div
              class="offline_page-status_card-icon"
              :css-status="isOnline ? 'online' : 'offline'"
            >
              <svg v-if="isOnline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.64 7c-.45-.34-4.93-4-11.64-4-1.5 0-2.89.19-4.15.48L18.18 13.8 23.64 7zm-6.6 8.22L3.27 1.44 2 2.72l2.05 2.06C1.91 5.76.59 6.82.36 7l11.63 14.49.01.01.01-.01 3.9-4.86 3.32 3.32 1.27-1.27-3.46-3.46z"/>
              </svg>
            </div>
          </div>

          <!-- Status Title -->
          <h2 class="offline_page-status_card-title">
            {{ isOnline ? $t('offline.backOnline') : $t('offline.title') }}
          </h2>

          <!-- Status Description -->
          <p class="offline_page-status_card-description">
            {{ isOnline ? $t('offline.canRetry') : $t('offline.description') }}
          </p>

          <!-- Status Badge -->
          <div
            class="offline_page-status_card-badge"
            :css-status="isOnline ? 'online' : 'offline'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path v-if="isOnline" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              <path v-else d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <span class="offline_page-status_card-badge-text">
              {{ isOnline ? $t('offline.online') : $t('offline.offline') }}
            </span>
          </div>

          <!-- Action Buttons -->
          <div class="offline_page-status_card-actions">
            <button
              v-if="isOnline"
              class="offline_page-status_card-actions-button"
              css-variant="primary"
              @click="retryLoad"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
              </svg>
              {{ $t('offline.retry') }}
            </button>

            <button
              class="offline_page-status_card-actions-button"
              :css-variant="isOnline ? 'secondary' : 'primary'"
              @click="goHome"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              {{ $t('offline.goHome') }}
            </button>
          </div>

          <!-- Tip Alert -->
          <div
            v-if="!isOnline"
            class="offline_page-status_card-tip"
          >
            <div class="offline_page-status_card-tip-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
            </div>
            <div class="offline_page-status_card-tip-content">
              <h3 class="offline_page-status_card-tip-content-title">
                {{ $t('offline.tipTitle') }}
              </h3>
              <p class="offline_page-status_card-tip-content-text">
                {{ $t('offline.tipMessage') }}
              </p>
            </div>
          </div>

          <!-- Auto Detect Info -->
          <p class="offline_page-status_card-info">
            {{ $t('offline.autoDetect') }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n();
const router = useRouter();

useHeadMataData({
  title: t('offline_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('offline_page.hero.description')
    },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
});

// 網路狀態 - 初始化為 true 避免 SSR 問題
const isOnline = ref(true);

// 網路狀態變化處理
const handleOnline = () => {
  isOnline.value = true;
};

const handleOffline = () => {
  isOnline.value = false;
};

// 重試載入
const retryLoad = () => {
  if (import.meta.client) {
    // 嘗試返回上一頁或重新載入
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.reload();
    }
  }
};

// 返回首頁
const goHome = () => {
  router.push('/');
};

// 生命週期
onMounted(() => {
  if (import.meta.client) {
    // 設置初始網路狀態
    isOnline.value = navigator.onLine;

    // 監聽網路狀態變化
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
  }
});

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  }
});
</script>

<style lang="scss" scoped>
// ========================================
// Hero Section
// ========================================
.offline_page-hero {
  // Positioning
  position: relative;

  // Display & Box Model
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;

  // Visual
  overflow: hidden;

  &-background {
    // Positioning
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;

    // Display & Box Model
    width: 100%;
    height: 100%;

    &-overlay {
      // Positioning
      position: absolute;
      top: 0;
      left: 0;

      // Display & Box Model
      width: 100%;
      height: 100%;

      // Visual
      background: linear-gradient(135deg, rgba(68, 160, 141, 0.9) 0%, rgba(78, 205, 196, 0.85) 100%);
    }
  }

  &-content {
    // Positioning
    position: relative;
    z-index: 1;

    // Display & Box Model
    max-width: 800px;
    text-align: center;

    &-title {
      // Display & Box Model
      margin: 0 0 16px 0;

      // Typography
      font-size: 48px;
      font-weight: 800;
      color: #ffffff;

      // Animation
      animation: fade-in-up 0.6s ease-out;

      @media (max-width: 768px) {
        font-size: 36px;
      }
    }

    &-subtitle {
      // Display & Box Model
      margin: 0 0 24px 0;

      // Typography
      font-size: 24px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.95);

      // Animation
      animation: fade-in-up 0.6s ease-out 0.1s both;

      @media (max-width: 768px) {
        font-size: 20px;
      }
    }

    &-description {
      // Display & Box Model
      margin: 0;

      // Typography
      font-size: 18px;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.9);

      // Animation
      animation: fade-in-up 0.6s ease-out 0.2s both;

      @media (max-width: 768px) {
        font-size: 16px;
      }
    }
  }
}

// ========================================
// Introduction
// ========================================
.offline_page-intro {
  // Display & Box Model
  padding: 60px 20px;

  // Visual
  background: var(--color-bg-secondary, #f7fafc);

  &-container {
    // Display & Box Model
    max-width: 1200px;
    margin: 0 auto;
  }

  &-text {
    // Typography
    font-size: 18px;
    line-height: 1.8;
    color: var(--color-text-secondary, #4a5568);
    text-align: center;

    // Display & Box Model
    max-width: 800px;
    margin: 0 auto;
  }
}

// ========================================
// Status Section
// ========================================
.offline_page-section {
  // Display & Box Model
  padding: 60px 20px;

  &-container {
    // Display & Box Model
    max-width: 600px;
    margin: 0 auto;
  }
}

.offline_page-status_card {
  // Display & Box Model
  padding: 48px 32px;
  border-radius: 16px;

  // Visual
  background: #ffffff;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);

  // Animation
  animation: fade-in-up 0.6s ease-out 0.3s both;

  @media (max-width: 768px) {
    padding: 32px 24px;
  }

  &-icon_container {
    // Display & Box Model
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
  }

  &-icon {
    // Display & Box Model
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    // Visual
    background: var(--color-bg-secondary, #f7fafc);

    // Animation
    animation: pulse 2s ease-in-out infinite;

    svg {
      // Display & Box Model
      width: 64px;
      height: 64px;

      // Visual
      color: #718096;
    }

    &[css-status='online'] {
      // Visual
      background: rgba(72, 187, 120, 0.1);

      svg {
        color: #48bb78;
      }
    }

    &[css-status='offline'] {
      // Visual
      background: rgba(160, 174, 192, 0.1);

      svg {
        color: #a0aec0;
      }
    }
  }

  &-title {
    // Display & Box Model
    margin: 0 0 16px 0;

    // Typography
    font-size: 32px;
    font-weight: 700;
    color: var(--color-text-primary, #2d3748);
    text-align: center;

    @media (max-width: 768px) {
      font-size: 28px;
    }
  }

  &-description {
    // Display & Box Model
    margin: 0 0 24px 0;

    // Typography
    font-size: 16px;
    line-height: 1.6;
    color: var(--color-text-secondary, #4a5568);
    text-align: center;
  }

  &-badge {
    // Display & Box Model
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    margin-bottom: 32px;
    border-radius: 24px;

    // Typography
    font-size: 16px;
    font-weight: 600;

    svg {
      // Display & Box Model
      width: 20px;
      height: 20px;
    }

    &[css-status='online'] {
      // Visual
      background: rgba(72, 187, 120, 0.1);
      color: #48bb78;
    }

    &[css-status='offline'] {
      // Visual
      background: rgba(245, 101, 101, 0.1);
      color: #f56565;
    }

    &-text {
      // Typography
      font-size: 16px;
      font-weight: 600;
    }
  }

  &-actions {
    // Display & Box Model
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;

    &-button {
      // Display & Box Model
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 14px 24px;
      border: none;
      border-radius: 8px;

      // Typography
      font-size: 16px;
      font-weight: 600;

      // Misc
      cursor: pointer;
      transition: all 0.3s;

      svg {
        // Display & Box Model
        width: 20px;
        height: 20px;
      }

      &[css-variant='primary'] {
        // Visual
        background: var(--color-primary, #44A08D);
        color: #ffffff;

        &:hover {
          background: var(--color-primary-dark, #2d6a5a);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(68, 160, 141, 0.3);
        }
      }

      &[css-variant='secondary'] {
        // Visual
        background: transparent;
        color: var(--color-primary, #44A08D);
        border: 2px solid var(--color-primary, #44A08D);

        &:hover {
          background: var(--color-primary, #44A08D);
          color: #ffffff;
          transform: translateY(-2px);
        }
      }
    }
  }

  &-tip {
    // Display & Box Model
    display: flex;
    gap: 16px;
    padding: 16px;
    margin-bottom: 24px;
    border-radius: 8px;

    // Visual
    background: rgba(66, 153, 225, 0.1);
    border-left: 4px solid #4299e1;

    &-icon {
      // Display & Box Model
      flex-shrink: 0;

      svg {
        // Display & Box Model
        width: 24px;
        height: 24px;

        // Visual
        color: #4299e1;
      }
    }

    &-content {
      &-title {
        // Display & Box Model
        margin: 0 0 8px 0;

        // Typography
        font-size: 16px;
        font-weight: 600;
        color: var(--color-text-primary, #2d3748);
      }

      &-text {
        // Display & Box Model
        margin: 0;

        // Typography
        font-size: 14px;
        line-height: 1.6;
        color: var(--color-text-secondary, #4a5568);
      }
    }
  }

  &-info {
    // Display & Box Model
    margin: 0;

    // Typography
    font-size: 14px;
    color: var(--color-text-tertiary, #718096);
    text-align: center;
  }
}

// ========================================
// Animations
// ========================================
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(0.95);
  }
}
</style>
