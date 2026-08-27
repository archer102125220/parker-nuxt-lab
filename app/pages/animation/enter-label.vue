<script>
const DEMO_TEXT = 'Parker Chen 的Nuxt實驗室';
</script>
<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('enter_label_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('enter_label_page.hero.description')
    }
  ]
});

const demoLabel = ref(DEMO_TEXT);
const demoInput = ref(DEMO_TEXT);

function handleDemoLabel() {
  demoLabel.value = demoInput.value;
}
</script>

<template>
  <div class="enter_label_page">
    <!-- Hero Section -->
    <section class="enter_label_page-hero">
      <div class="enter_label_page-hero-background">
        <div class="enter_label_page-hero-background-overlay" />
      </div>

      <div class="enter_label_page-hero-content">
        <h1 class="enter_label_page-hero-content-title">
          {{ $t('enter_label_page.hero.title') }}
        </h1>
        <p class="enter_label_page-hero-content-subtitle">
          {{ $t('enter_label_page.hero.subtitle') }}
        </p>
        <p class="enter_label_page-hero-content-description">
          {{ $t('enter_label_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="enter_label_page-section">
      <div class="enter_label_page-demo">
        <p class="enter_label_page-demo-title">
          {{ $t('enter_label_page.demo_title') }}：
        </p>
        <AnimationEnterLabel
          class="enter_label_page-demo-label"
          :label="demoLabel"
        />
      </div>

      <form class="enter_label_page-form" @submit.prevent="handleDemoLabel">
        <p class="enter_label_page-form-title">
          {{ $t('enter_label_page.test_title') }}：
        </p>
        <v-text-field
          v-model="demoInput"
          clearable
          :label="$t('enter_label_page.test_title')"
          class="enter_label_page-form-input"
        />

        <div class="enter_label_page-form-submit">
          <v-btn color="primary" type="submit" size="large">
            {{ $t('enter_label_page.update') }}
          </v-btn>
        </div>
      </form>
    </section>
  </div>
</template>

<style lang="scss">
.enter_label_page {
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
    padding: 60px 20px;
    max-width: 800px;
    margin: 0 auto;
  }

  &-demo {
    margin-bottom: 40px;
    padding: 32px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);

    &-title {
      margin: 0 0 16px 0;
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    &-label {
      min-height: 32px;
      font-size: 24px;
      color: #44a08d;
    }
  }

  &-form {
    padding: 32px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);

    &-title {
      margin: 0 0 16px 0;
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    &-input {
      margin-bottom: 16px;
    }

    &-submit {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
