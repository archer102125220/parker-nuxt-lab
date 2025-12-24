<template>
  <div class="socket_test_page">
    <!-- Hero Section -->
    <section class="socket_test_page-hero">
      <div class="socket_test_page-hero-background">
        <img 
          src="/img/socket/socket-v.05.webp" 
          alt="Socket Tests" 
          class="socket_test_page-hero-background-image"
        />
        <div class="socket_test_page-hero-background-overlay"></div>
      </div>
      
      <div class="socket_test_page-hero-content">
        <h1 class="socket_test_page-hero-content-title">
          {{ $t('socket_test_page.hero.title') }}
        </h1>
        <p class="socket_test_page-hero-content-subtitle">
          {{ $t('socket_test_page.hero.subtitle') }}
        </p>
        <p class="socket_test_page-hero-content-description">
          {{ $t('socket_test_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Introduction -->
    <section class="socket_test_page-intro">
      <div class="socket_test_page-section-container">
        <p class="socket_test_page-intro-text">
          {{ $t('socket_test_page.intro') }}
        </p>
        <p 
          v-if="$store.system.supportWebsocket === false"
          class="socket_test_page-intro-warning"
        >
          ⚠️ {{ $t('socket_test_page.warning') }}
        </p>
      </div>
    </section>

    <!-- Socket Tests List -->
    <section class="socket_test_page-section">
      <div class="socket_test_page-section-container">
        <h2 class="socket_test_page-section-title">
          Socket 測試列表
        </h2>
        <div class="socket_test_page-grid">
          <LinkCard
            v-for="test in socketTests"
            :key="test.to"
            :to="test.to"
            :label="test.label"
            :banner="test.banner"
            class="socket_test_page-grid-item"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n();
const localePath = useLocalePath();

useHeadMataData({
  title: t('socket_test_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('socket_test_page.hero.description')
    }
  ]
});

// Socket Tests List
const socketTests = computed(() => [
  {
    to: localePath('/socket-test/socket.io'),
    label: '前後端皆由 Socket.IO 做處理'
  },
  {
    to: localePath('/socket-test/websocket'),
    label: '前端原生 / 後端 Nuxt 4 內建'
  }
]);
</script>

<style lang="scss" scoped>
// ========================================
// Hero Section
// ========================================
.socket_test_page-hero {
  // Positioning
  position: relative;
  
  // Display & Box Model
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  
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
    
    &-image {
      // Display & Box Model
      width: 100%;
      height: 100%;
      
      // Visual
      object-fit: cover;
    }
    
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
// Common Section Styles
// ========================================
.socket_test_page-section {
  // Display & Box Model
  padding: 60px 20px;
  
  &-container {
    // Display & Box Model
    max-width: 1200px;
    margin: 0 auto;
  }
  
  &-title {
    // Display & Box Model
    margin: 0 0 40px 0;
    
    // Typography
    font-size: 32px;
    font-weight: 700;
    color: var(--color-text-primary, #2d3748);
    text-align: center;
    
    @media (max-width: 768px) {
      font-size: 28px;
      margin-bottom: 32px;
    }
  }
}

// ========================================
// Introduction
// ========================================
.socket_test_page-intro {
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
    margin: 0 auto 20px auto;
  }
  
  &-warning {
    // Display & Box Model
    max-width: 800px;
    margin: 0 auto;
    padding: 16px 20px;
    border-radius: 8px;
    
    // Typography
    font-size: 16px;
    font-weight: 600;
    color: #d97706;
    text-align: center;
    
    // Visual
    background: #fef3c7;
    border: 1px solid #fbbf24;
  }
}

// ========================================
// Socket Tests Grid
// ========================================
.socket_test_page-grid {
  // Display & Box Model
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  &-item {
    // Animation
    animation: fade-in-up 0.5s ease-out both;
    
    &:nth-child(1) { animation-delay: 0.05s; }
    &:nth-child(2) { animation-delay: 0.1s; }
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
</style>
