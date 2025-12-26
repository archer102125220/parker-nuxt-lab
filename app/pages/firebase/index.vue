<template>
  <div class="firebase_page">
    <!-- Hero Section -->
    <section class="firebase_page-hero">
      <div class="firebase_page-hero-background">
        <img 
          src="/img/firebase/firebase-v.07.webp" 
          alt="Firebase Integration" 
          class="firebase_page-hero-background-image"
        />
        <div class="firebase_page-hero-background-overlay" />
      </div>
      
      <div class="firebase_page-hero-content">
        <h1 class="firebase_page-hero-content-title">
          {{ $t('firebase_page.hero.title') }}
        </h1>
        <p class="firebase_page-hero-content-subtitle">
          {{ $t('firebase_page.hero.subtitle') }}
        </p>
        <p class="firebase_page-hero-content-description">
          {{ $t('firebase_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Introduction -->
    <section class="firebase_page-intro">
      <div class="firebase_page-intro-container">
        <p class="firebase_page-intro-text">
          {{ $t('firebase_page.intro') }}
        </p>
        <p class="firebase_page-intro-link">
          原本在 
          <a 
            href="https://resume-web-orpin.vercel.app/portfolio/firebase-admin" 
            target="_blank"
            rel="noopener noreferrer"
            class="firebase_page-intro-link-anchor"
          >
            電子履歷
          </a> 
          中實作。
        </p>
      </div>
    </section>

    <!-- Firebase Tests List -->
    <section class="firebase_page-section">
      <div class="firebase_page-section-container">
        <h2 class="firebase_page-section-title">
          Firebase 功能測試
        </h2>
        <div class="firebase_page-grid">
          <LinkCard
            v-for="test in firebaseTests"
            :key="test.to"
            :to="test.to"
            :label="test.label"
            :banner="test.banner"
            class="firebase_page-grid-item"
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
  title: t('firebase_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('firebase_page.hero.description')
    }
  ]
});

// Firebase Tests List
const firebaseTests = computed(() => [
  {
    to: localePath('/firebase/cloud-messaging'),
    label: 'FCM 推播通知後台'
  }
]);
</script>

<style lang="scss" scoped>
// ========================================
// Hero Section
// ========================================
.firebase_page-hero {
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
.firebase_page-section {
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
.firebase_page-intro {
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
    margin: 0 auto 16px auto;
  }
  
  &-link {
    // Typography
    font-size: 16px;
    color: var(--color-text-secondary, #4a5568);
    text-align: center;
    
    // Display & Box Model
    max-width: 800px;
    margin: 0 auto;
    
    &-anchor {
      // Typography
      color: var(--color-primary, #44A08D);
      text-decoration: none;
      font-weight: 600;
      
      // Animation
      transition: color 0.3s;
      
      &:hover {
        color: var(--color-primary-dark, #2d6a5a);
        text-decoration: underline;
      }
    }
  }
}

// ========================================
// Firebase Tests Grid
// ========================================
.firebase_page-grid {
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
