<template>
  <div class="params_back_test_page">
    <!-- Hero Section -->
    <section class="params_back_test_page-hero">
      <div class="params_back_test_page-hero-background">
        <div class="params_back_test_page-hero-background-overlay" />
      </div>

      <div class="params_back_test_page-hero-content">
        <h1 class="params_back_test_page-hero-content-title">
          {{ $t('params_back_test_page.hero.title') }}
        </h1>
        <p class="params_back_test_page-hero-content-subtitle">
          {{ $t('params_back_test_page.hero.subtitle') }}
        </p>
        <p class="params_back_test_page-hero-content-description">
          {{ $t('params_back_test_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="params_back_test_page-section">
      <div class="params_back_test_page-section-value">
        <span class="params_back_test_page-section-value-label">目前 Params 值：</span>
        <span class="params_back_test_page-section-value-number">{{ paramsTestData }}</span>
      </div>

      <div class="params_back_test_page-section-actions">
        <v-btn color="primary" size="large" @click="handleRouteParamsPush">
          <v-icon class="mr-2">mdi-plus</v-icon>
          增加 Params (Push)
        </v-btn>
        <v-btn color="primary" variant="tonal" size="large" @click="handleRouteParamsReplace">
          <v-icon class="mr-2">mdi-swap-horizontal</v-icon>
          增加 Params (Replace)
        </v-btn>
      </div>

      <div class="params_back_test_page-section-info">
        <p><strong>Push：</strong>會增加瀏覽器歷史紀錄，可以按上一頁返回</p>
        <p><strong>Replace：</strong>會替換當前歷史紀錄，無法按上一頁返回</p>
        <p class="params_back_test_page-section-info-note">
          <strong>注意：</strong>動態參數修改可能需要特殊處理
          (<a href="https://github.com/nuxt/nuxt/issues/27982" target="_blank">相關 Issue</a>)
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
// https://github.com/nuxt/nuxt/issues/27982
const { t } = useI18n();

useHeadMataData({
  title: t('params_back_test_page.hero.title')
});

const route = useRoute();
const router = useRouter();

const paramsTestData = ref(0);

watch(
  () => route.params,
  (newRouteParams) => {
    if (
      typeof newRouteParams?.testData === 'string' &&
      isNaN(Number(newRouteParams.testData)) === false
    ) {
      paramsTestData.value = Number(newRouteParams.testData);
    }
  },
  { deep: true, immediate: true }
);

function handleRouteParamsPush() {
  router.push({
    params: {
      testData: paramsTestData.value + 1
    }
  });
}

function handleRouteParamsReplace() {
  router.replace({
    params: {
      testData: paramsTestData.value + 1
    }
  });
}
</script>

<style lang="scss">
.params_back_test_page {
  min-height: 100vh;

  &-hero {
    position: relative;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
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
        margin: 0 0 8px 0;
        font-size: 36px;
        font-weight: 800;
        color: #ffffff;

        @media (max-width: 768px) {
          font-size: 28px;
        }
      }

      &-subtitle {
        margin: 0 0 12px 0;
        font-size: 18px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.95);
      }

      &-description {
        margin: 0;
        font-size: 14px;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.9);
      }
    }
  }

  &-section {
    padding: 40px 20px;
    max-width: 600px;
    margin: 0 auto;

    &-value {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-bottom: 32px;
      padding: 24px;
      border-radius: 12px;
      background: #f7fafc;

      &-label {
        font-size: 16px;
        font-weight: 500;
        color: #4a5568;
      }

      &-number {
        font-size: 48px;
        font-weight: 800;
        color: #44a08d;
      }
    }

    &-actions {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 32px;

      @media (min-width: 480px) {
        flex-direction: row;
        justify-content: center;
      }
    }

    &-info {
      padding: 16px;
      border-radius: 8px;
      background: #f0fdf4;
      border: 1px solid #86efac;

      p {
        margin: 0 0 8px 0;
        font-size: 14px;
        color: #166534;

        &:last-child {
          margin-bottom: 0;
        }
      }

      &-note {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px dashed #86efac;

        a {
          color: #0d9488;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
