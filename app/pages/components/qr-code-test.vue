<template>
  <div class="qr_code_page">
    <!-- Hero Section -->
    <section class="qr_code_page-hero">
      <div class="qr_code_page-hero-background">
        <div class="qr_code_page-hero-background-overlay" />
      </div>

      <div class="qr_code_page-hero-content">
        <h1 class="qr_code_page-hero-content-title">
          {{ $t('qr_code_page.hero.title') }}
        </h1>
        <p class="qr_code_page-hero-content-subtitle">
          {{ $t('qr_code_page.hero.subtitle') }}
        </p>
        <p class="qr_code_page-hero-content-description">
          {{ $t('qr_code_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="qr_code_page-section">
      <div class="qr_code_page-demo">
        <v-text-field
          v-model="qrCodeValue"
          clearable
          :label="$t('qr_code_page.input_label')"
          class="qr_code_page-demo-input"
        />
        <div class="qr_code_page-demo-qrcode">
          <QRcode :qr-code-value="qrCodeValue" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('qr_code_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('qr_code_page.hero.description')
    }
  ]
});

const qrCodeValue = ref('QRcodeTest');
</script>

<style lang="scss" scoped>
.qr_code_page {
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
    padding: 60px 20px;
    display: flex;
    justify-content: center;
  }

  &-demo {
    max-width: 400px;
    width: 100%;
    padding: 32px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);

    &-input {
      margin-bottom: 24px;
    }

    &-qrcode {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
