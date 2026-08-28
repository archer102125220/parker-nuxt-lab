<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('dialog_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('dialog_page.hero.description')
    }
  ]
});

const nuxtApp = useNuxtApp();
const { $store } = nuxtApp;

const isShow = ref(false);

function handleOpen() {
  isShow.value = true;
}

function handleVuetifyDialogOpen() {
  $store.system.setDialog({
    trigger: true,
    width: '500px',
    content: 'DemoContent',
    bgColor: '#fff',
    radius: '4px',
    contentClass: 'dialog_content',
    contentProps: {
      dialogCouponCnName: t('dialog_page.demo_coupon_title'),
      dialogCodeId: '1234567890',
      dialogQrcode: 'https://example.com/qrcode'
    },
    dialogProps: {}
  });
}
</script>

<template>
  <div class="dialog_page">
    <!-- Hero Section -->
    <section class="dialog_page-hero">
      <div class="dialog_page-hero-background">
        <div class="dialog_page-hero-background-overlay" />
      </div>

      <div class="dialog_page-hero-content">
        <h1 class="dialog_page-hero-content-title">
          {{ $t('dialog_page.hero.title') }}
        </h1>
        <p class="dialog_page-hero-content-subtitle">
          {{ $t('dialog_page.hero.subtitle') }}
        </p>
        <p class="dialog_page-hero-content-description">
          {{ $t('dialog_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="dialog_page-section">
      <Dialog v-model="isShow" />
      <div class="dialog_page-trigger_group">
        <div class="dialog_page-trigger">
          <v-btn color="primary" size="large" @click="handleOpen">
            {{ $t('dialog_page.buttons.open') }}
          </v-btn>
        </div>
        <div class="dialog_page-trigger">
          <v-btn
            color="primary"
            size="large"
            variant="outlined"
            @click="handleVuetifyDialogOpen"
          >
            {{ $t('dialog_page.buttons.vuetify_dialog') }}
          </v-btn>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.dialog_page {
  // ========================================
  // Hero Section
  // ========================================
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
        animation: fade-in-up 0.6s ease-out;

        @media (max-width: 768px) {
          font-size: 32px;
        }
      }

      &-subtitle {
        margin: 0 0 16px 0;
        font-size: 20px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.95);
        animation: fade-in-up 0.6s ease-out 0.1s both;
      }

      &-description {
        margin: 0;
        font-size: 16px;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.9);
        animation: fade-in-up 0.6s ease-out 0.2s both;
      }
    }
  }

  &-section {
    padding: 60px 20px;
    max-width: 800px;
    margin: 0 auto;
  }

  &-trigger_group {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }

  &-trigger {
    margin: 10px 0;
  }
}
</style>
