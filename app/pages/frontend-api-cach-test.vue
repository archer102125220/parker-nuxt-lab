<template>
  <div class="frontend_api_cache_page">
    <!-- Hero Section -->
    <section class="frontend_api_cache_page-hero">
      <div class="frontend_api_cache_page-hero-background">
        <img 
          src="/img/frontend-api-cach/frontend-api-cach-v.06.webp" 
          alt="Frontend API Cache Test" 
          class="frontend_api_cache_page-hero-background-image"
        />
        <div class="frontend_api_cache_page-hero-background-overlay" />
      </div>
      
      <div class="frontend_api_cache_page-hero-content">
        <h1 class="frontend_api_cache_page-hero-content-title">
          {{ $t('frontend_api_cache_page.hero.title') }}
        </h1>
        <p class="frontend_api_cache_page-hero-content-subtitle">
          {{ $t('frontend_api_cache_page.hero.subtitle') }}
        </p>
        <p class="frontend_api_cache_page-hero-content-description">
          {{ $t('frontend_api_cache_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Introduction -->
    <section class="frontend_api_cache_page-intro">
      <div class="frontend_api_cache_page-intro-container">
        <p class="frontend_api_cache_page-intro-text">
          {{ $t('frontend_api_cache_page.intro') }}
        </p>
        <div class="frontend_api_cache_page-intro-link">
          <span class="frontend_api_cache_page-intro-link-text">
            {{ $t('frontend_api_cache_page.pwa_note') }}
          </span>
          <a
            href="https://valley-hortensia-084.notion.site/Nuxt3-Progressive-Web-Apps-PWA-1906dcd96fa280acaafbeaec0828cfad"
            target="_blank"
            rel="noopener noreferrer"
            class="frontend_api_cache_page-intro-link-anchor"
          >
            {{ $t('frontend_api_cache_page.notion_link') }}
          </a>
        </div>
      </div>
    </section>

    <!-- Test Form -->
    <section class="frontend_api_cache_page-section">
      <div class="frontend_api_cache_page-section-container">
        <div class="frontend_api_cache_page-test_card">
          <form
            class="frontend_api_cache_page-test_card-form"
            @submit.prevent="handleSubmit"
          >
            <!-- Input Fields -->
            <v-text-field
              v-model="queryData"
              :label="$t('frontend_api_cache_page.form.get_param')"
              variant="outlined"
              color="primary"
              density="comfortable"
              class="frontend_api_cache_page-test_card-form-group"
            />

            <v-text-field
              v-model="payloadData"
              :label="$t('frontend_api_cache_page.form.post_param')"
              variant="outlined"
              color="primary"
              density="comfortable"
              class="frontend_api_cache_page-test_card-form-group"
            />

            <!-- Radio Group -->
            <v-radio-group
              v-model="isPost"
              color="primary"
              inline
              hide-details
              class="frontend_api_cache_page-test_card-form-radio_group"
            >
              <v-radio
                :value="true"
                :label="$t('frontend_api_cache_page.form.use_post')"
              />
              <v-radio
                :value="false"
                :label="$t('frontend_api_cache_page.form.use_get')"
              />
            </v-radio-group>

            <!-- Checkboxes -->
            <div class="frontend_api_cache_page-test_card-form-checkbox_group">
              <v-checkbox
                v-model="useCache"
                color="primary"
                hide-details
                class="frontend_api_cache_page-test_card-form-checkbox_group-item"
              >
                <template #label>
                  <span class="frontend_api_cache_page-test_card-form-checkbox_group-item-label">
                    {{ $t('frontend_api_cache_page.form.enable_cache') }}
                  </span>
                </template>
              </v-checkbox>
              <v-checkbox
                v-model="useServiceWorkerCache"
                color="primary"
                hide-details
                class="frontend_api_cache_page-test_card-form-checkbox_group-item"
              >
                <template #label>
                  <span class="frontend_api_cache_page-test_card-form-checkbox_group-item-label">
                    {{ $t('frontend_api_cache_page.form.enable_sw_cache') }}
                  </span>
                </template>
              </v-checkbox>
            </div>

            <!-- Submit Button -->
            <v-btn
              type="submit"
              color="primary"
              size="large"
              block
              class="frontend_api_cache_page-test_card-form-submit"
            >
              {{ $t('frontend_api_cache_page.form.test_button') }}
            </v-btn>
          </form>

          <!-- Results Display -->
          <div class="frontend_api_cache_page-test_card-results">
            <div class="frontend_api_cache_page-test_card-results-time">
              <span class="frontend_api_cache_page-test_card-results-time-label">
                {{ $t('frontend_api_cache_page.results.time_label') }}
              </span>
              <span class="frontend_api_cache_page-test_card-results-time-value">
                {{ timeConsuming }}
              </span>
              <span class="frontend_api_cache_page-test_card-results-time-unit">
                {{ $t('frontend_api_cache_page.results.time_unit') }}
              </span>
            </div>

            <div class="frontend_api_cache_page-test_card-results-response">
              <h3 class="frontend_api_cache_page-test_card-results-response-label">
                {{ $t('frontend_api_cache_page.results.response_label') }}
              </h3>
              <pre class="frontend_api_cache_page-test_card-results-response-content">{{ JSON.stringify(response, null, 2) }}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('frontend_api_cache_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('frontend_api_cache_page.hero.description')
    }
  ]
});

const nuxtApp = useNuxtApp();
const { $store } = nuxtApp;

const queryData = ref('queryTest');
const payloadData = ref('payloadTest');
const isPost = ref(true);
const timeConsuming = ref('');
const useCache = ref(false);
const useServiceWorkerCache = ref(false);
const response = ref(null);

function handleSubmit() {
  if (isPost.value !== true) {
    handleGetApi();
  } else {
    handlePostApi();
  }
}

async function handlePostApi() {
  if ($store.system.loading === true) return;
  console.log('--test post api start--');
  const startTime = Date.now();
  console.time();
  $store.system.setLoading(true);
  try {
    const _response = await nuxtApp.$nuxtServer.POST_frontendApiCachTest(
      {
        query: { data: queryData.value },
        payload: { data: payloadData.value }
      },
      {
        useCache: useCache.value
      }
    );
    console.log({ response: _response });
    response.value = _response;
  } catch (error) {
    console.log(error);
  }
  $store.system.setLoading(false);
  console.timeEnd();
  timeConsuming.value = Date.now() - startTime;
  console.log('--test post api end--', timeConsuming.value);
}

async function handleGetApi() {
  if ($store.system.loading === true) return;
  console.log('--test get api start--');
  const startTime = Date.now();
  console.time();
  $store.system.setLoading(true);
  try {
    const _response = await nuxtApp.$nuxtServer.GET_frontendApiCachTest(
      {
        query: { data: queryData.value }
      },
      {
        useCache: useCache.value,
        useServiceWorkerCache: useServiceWorkerCache.value
      }
    );
    console.log({ response: _response });
    response.value = _response;
  } catch (error) {
    console.log(error);
  }
  $store.system.setLoading(false);
  console.timeEnd();
  timeConsuming.value = Date.now() - startTime;
  console.log('--test get api end--', timeConsuming.value);
}
</script>

<style lang="scss" scoped>
// ========================================
// Hero Section
// ========================================
.frontend_api_cache_page-hero {
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
// Introduction
// ========================================
.frontend_api_cache_page-intro {
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
    margin: 0 auto 24px auto;
  }
  
  &-link {
    // Display & Box Model
    display: flex;
    align-items: baseline;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
    
    &-text {
      // Typography
      font-size: 16px;
      color: var(--color-text-secondary, #4a5568);
    }
    
    &-anchor {
      // Typography
      font-size: 16px;
      font-weight: 600;
      color: var(--color-primary, #44A08D);
      text-decoration: none;
      
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
// Test Section
// ========================================
.frontend_api_cache_page-section {
  // Display & Box Model
  padding: 60px 20px;
  
  &-container {
    // Display & Box Model
    max-width: 800px;
    margin: 0 auto;
  }
}

.frontend_api_cache_page-test_card {
  // Display & Box Model
  padding: 32px;
  border-radius: 12px;
  
  // Visual
  background: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  // Animation
  animation: fade-in-up 0.6s ease-out 0.3s both;
  
  @media (max-width: 768px) {
    padding: 24px 16px;
  }
  
  &-form {
    // Display & Box Model
    margin-bottom: 32px;
    
    &-group {
      // Display & Box Model
      margin-bottom: 16px;
    }
    
    &-radio_group {
      // Display & Box Model
      margin-bottom: 16px;
    }
    
    &-checkbox_group {
      // Display & Box Model
      display: flex;
      flex-direction: column;
      gap: 0;
      margin-bottom: 16px;
      
      &-item {
        &-label {
          // Typography
          font-size: 14px;
          line-height: 1.5;
          color: var(--color-text-primary, #2d3748);
        }
      }
    }
    
    &-submit {
      // Display & Box Model
      margin-top: 8px;
    }
  }
  
  &-results {
    // Display & Box Model
    padding: 24px;
    border-radius: 8px;
    
    // Visual
    background: var(--color-bg-secondary, #f7fafc);
    
    &-time {
      // Display & Box Model
      display: flex;
      align-items: baseline;
      gap: 8px;
      margin-bottom: 24px;
      
      &-label {
        // Typography
        font-size: 16px;
        font-weight: 600;
        color: var(--color-text-primary, #2d3748);
      }
      
      &-value {
        // Typography
        font-size: 24px;
        font-weight: 700;
        color: var(--color-primary, #44A08D);
      }
      
      &-unit {
        // Typography
        font-size: 16px;
        color: var(--color-text-secondary, #4a5568);
      }
    }
    
    &-response {
      &-label {
        // Display & Box Model
        margin: 0 0 12px 0;
        
        // Typography
        font-size: 16px;
        font-weight: 600;
        color: var(--color-text-primary, #2d3748);
      }
      
      &-content {
        // Display & Box Model
        padding: 16px;
        margin: 0;
        border-radius: 8px;
        
        // Typography
        font-family: 'Courier New', monospace;
        font-size: 14px;
        line-height: 1.6;
        color: var(--color-text-primary, #2d3748);
        
        // Visual
        background: #ffffff;
        border: 1px solid #e2e8f0;
        overflow-x: auto;
      }
    }
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
