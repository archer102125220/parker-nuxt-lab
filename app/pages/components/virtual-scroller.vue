<template>
  <div class="virtual_scroller_page">
    <!-- Hero Section -->
    <section class="virtual_scroller_page-hero">
      <div class="virtual_scroller_page-hero-background">
        <div class="virtual_scroller_page-hero-background-overlay" />
      </div>

      <div class="virtual_scroller_page-hero-content">
        <h1 class="virtual_scroller_page-hero-content-title">
          {{ $t('virtual_scroller_page.hero.title') }}
        </h1>
        <p class="virtual_scroller_page-hero-content-subtitle">
          {{ $t('virtual_scroller_page.hero.subtitle') }}
        </p>
        <p class="virtual_scroller_page-hero-content-description">
          {{ $t('virtual_scroller_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="virtual_scroller_page-section">
      <div class="virtual_scroller_page-describe">
        <p class="virtual_scroller_page-describe-text">{{ $t('virtual_scroller_page.describe.text') }}</p>
      </div>

      <div class="virtual_scroller_page-demo">
        <p class="virtual_scroller_page-demo-title">Vuetify Virtual Scroll:</p>
        <v-virtual-scroll
          class="virtual_scroller_page-demo-scroller"
          :height="300"
          :items="itemList"
        >
          <template #default="{ item, index }">
            <p
              class="virtual_scroller_page-demo-scroller-item"
              :style="{ '--item_height': `${24 * (index || 1)}px` }"
            >
              Item {{ item }}
            </p>
          </template>
        </v-virtual-scroll>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('virtual_scroller_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('virtual_scroller_page.hero.description')
    }
  ]
});

const itemList = computed(() => {
  const items = [];
  for (let i = 1; i <= 30; i++) {
    items.push(String(i));
  }
  return items;
});
</script>

<style lang="scss">
.virtual_scroller_page {
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
    max-width: 800px;
    margin: 0 auto;
  }

  &-describe {
    margin-bottom: 24px;
    text-align: center;

    &-text {
      display: inline;
      margin: 0;
      font-size: 16px;
      line-height: 1.7;
      color: #333;
    }
  }

  &-demo {
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

    &-scroller {
      border: 1px solid #e0e0e0;
      border-radius: 8px;

      &-item {
        padding: 8px 16px;
        height: var(--item_height);
        border-bottom: 1px solid #f0f0f0;

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
