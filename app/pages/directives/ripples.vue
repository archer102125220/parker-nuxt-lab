<script setup>
/**
 * Ripples 指令展示頁面
 *
 * 展示 v-ripples-animation 和 v-ripples-auto-drops 指令的使用方式。
 */

const { t } = useI18n();
const localePath = useLocalePath();

useHeadMataData({
  title: t('ripples_directive_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('ripples_directive_page.hero.description')
    }
  ]
});

// 指令範例程式碼
const directiveExampleCode = `<!-- 基本水波紋動畫 -->
<div
  v-ripples-animation="{
    imageUrl: '/img/background.svg',
    resolution: 512,
    interactive: true
  }"
  class="ripples-container"
>
  Content here
</div>`;

const autoDropsExampleCode = `<!-- 自動水滴效果 -->
<div
  v-ripples-auto-drops="{
    interval: 300,
    dropRadius: 20,
    strength: 0.04,
    strengthVariance: 0.04,
    interactive: true
  }"
  class="ripples-container"
>
  Content here
</div>`;
</script>

<template>
  <div class="ripples_directive_page">
    <!-- Hero Section -->
    <section class="ripples_directive_page-hero">
      <div class="ripples_directive_page-hero-background">
        <div class="ripples_directive_page-hero-background-gradient" />
      </div>

      <div class="ripples_directive_page-hero-content">
        <h1 class="ripples_directive_page-hero-content-title">
          {{ t('ripples_directive_page.hero.title') }}
        </h1>
        <p class="ripples_directive_page-hero-content-subtitle">
          {{ t('ripples_directive_page.hero.subtitle') }}
        </p>
        <p class="ripples_directive_page-hero-content-description">
          {{ t('ripples_directive_page.hero.description') }}
        </p>
        <div class="ripples_directive_page-hero-content-actions">
          <NuxtLink
            v-ripple
            :to="localePath('/animation/ripples-component')"
            class="ripples_directive_page-hero-content-actions-btn"
          >
            {{ t('ripples_directive_page.view_component') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- v-ripples-animation Demo -->
    <section class="ripples_directive_page-demo">
      <div class="ripples_directive_page-section-container">
        <h2 class="ripples_directive_page-section-title">
          v-ripples-animation
        </h2>
        <p class="ripples_directive_page-demo-description">
          {{ t('ripples_directive_page.animation.description') }}
        </p>

        <!-- Demo Area -->
        <div class="ripples_directive_page-demo-area">
          <div
            v-ripples-animation="{
              imageUrl: '/img/home/hero-gradient.svg',
              resolution: 512,
              interactive: true
            }"
            class="ripples_directive_page-demo-area-container"
          >
            <div class="ripples_directive_page-demo-area-content">
              <h3 class="ripples_directive_page-demo-area-content-title">
                v-ripples-animation
              </h3>
              <p class="ripples_directive_page-demo-area-content-text">
                {{ t('ripples_directive_page.animation.hint') }}
              </p>
            </div>
          </div>
        </div>

        <!-- Code Example -->
        <div class="ripples_directive_page-demo-code">
          <h3 class="ripples_directive_page-demo-code-title">
            {{ t('ripples_directive_page.code_example') }}
          </h3>
          <pre
            class="ripples_directive_page-demo-code-block"
          ><code>{{ directiveExampleCode }}</code></pre>
        </div>
      </div>
    </section>

    <!-- v-ripples-auto-drops Demo -->
    <section class="ripples_directive_page-demo" css-variant="alt">
      <div class="ripples_directive_page-section-container">
        <h2 class="ripples_directive_page-section-title">
          v-ripples-auto-drops
        </h2>
        <p class="ripples_directive_page-demo-description">
          {{ t('ripples_directive_page.auto_drops.description') }}
        </p>

        <!-- Demo Area -->
        <div class="ripples_directive_page-demo-area">
          <div
            v-ripples-auto-drops="{
              interval: 300,
              dropRadius: 20,
              strength: 0.04,
              strengthVariance: 0.04,
              interactive: true
            }"
            class="ripples_directive_page-demo-area-container"
            style="background-image: url('/img/home/hero-gradient.svg')"
          >
            <div class="ripples_directive_page-demo-area-content">
              <h3 class="ripples_directive_page-demo-area-content-title">
                v-ripples-auto-drops
              </h3>
              <p class="ripples_directive_page-demo-area-content-text">
                {{ t('ripples_directive_page.auto_drops.hint') }}
              </p>
            </div>
          </div>
        </div>

        <!-- Code Example -->
        <div class="ripples_directive_page-demo-code">
          <h3 class="ripples_directive_page-demo-code-title">
            {{ t('ripples_directive_page.code_example') }}
          </h3>
          <pre
            class="ripples_directive_page-demo-code-block"
          ><code>{{ autoDropsExampleCode }}</code></pre>
        </div>
      </div>
    </section>

    <!-- Options Table -->
    <section class="ripples_directive_page-options">
      <div class="ripples_directive_page-section-container">
        <h2 class="ripples_directive_page-section-title">
          {{ t('ripples_directive_page.options.title') }}
        </h2>

        <!-- v-ripples-animation options -->
        <h3 class="ripples_directive_page-options-subtitle">
          v-ripples-animation
        </h3>
        <div class="ripples_directive_page-options-table-wrapper">
          <table class="ripples_directive_page-options-table">
            <thead class="ripples_directive_page-options-table-head">
              <tr class="ripples_directive_page-options-table-row">
                <th class="ripples_directive_page-options-table-cell">
                  Option
                </th>
                <th class="ripples_directive_page-options-table-cell">Type</th>
                <th class="ripples_directive_page-options-table-cell">
                  Default
                </th>
                <th class="ripples_directive_page-options-table-cell">
                  {{ t('ripples_directive_page.options.description') }}
                </th>
              </tr>
            </thead>
            <tbody class="ripples_directive_page-options-table-body">
              <tr class="ripples_directive_page-options-table-row">
                <td class="ripples_directive_page-options-table-cell">
                  <code>imageUrl</code>
                </td>
                <td class="ripples_directive_page-options-table-cell">
                  String
                </td>
                <td class="ripples_directive_page-options-table-cell">-</td>
                <td class="ripples_directive_page-options-table-cell">
                  {{ t('ripples_directive_page.options.image_url') }}
                </td>
              </tr>
              <tr class="ripples_directive_page-options-table-row">
                <td class="ripples_directive_page-options-table-cell">
                  <code>resolution</code>
                </td>
                <td class="ripples_directive_page-options-table-cell">
                  Number
                </td>
                <td class="ripples_directive_page-options-table-cell">256</td>
                <td class="ripples_directive_page-options-table-cell">
                  {{ t('ripples_directive_page.options.resolution') }}
                </td>
              </tr>
              <tr class="ripples_directive_page-options-table-row">
                <td class="ripples_directive_page-options-table-cell">
                  <code>interactive</code>
                </td>
                <td class="ripples_directive_page-options-table-cell">
                  Boolean
                </td>
                <td class="ripples_directive_page-options-table-cell">true</td>
                <td class="ripples_directive_page-options-table-cell">
                  {{ t('ripples_directive_page.options.interactive') }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- v-ripples-auto-drops options -->
        <h3 class="ripples_directive_page-options-subtitle">
          v-ripples-auto-drops
        </h3>
        <div class="ripples_directive_page-options-table-wrapper">
          <table class="ripples_directive_page-options-table">
            <thead class="ripples_directive_page-options-table-head">
              <tr class="ripples_directive_page-options-table-row">
                <th class="ripples_directive_page-options-table-cell">
                  Option
                </th>
                <th class="ripples_directive_page-options-table-cell">Type</th>
                <th class="ripples_directive_page-options-table-cell">
                  Default
                </th>
                <th class="ripples_directive_page-options-table-cell">
                  {{ t('ripples_directive_page.options.description') }}
                </th>
              </tr>
            </thead>
            <tbody class="ripples_directive_page-options-table-body">
              <tr class="ripples_directive_page-options-table-row">
                <td class="ripples_directive_page-options-table-cell">
                  <code>interval</code>
                </td>
                <td class="ripples_directive_page-options-table-cell">
                  Number
                </td>
                <td class="ripples_directive_page-options-table-cell">400</td>
                <td class="ripples_directive_page-options-table-cell">
                  {{ t('ripples_directive_page.options.interval') }}
                </td>
              </tr>
              <tr class="ripples_directive_page-options-table-row">
                <td class="ripples_directive_page-options-table-cell">
                  <code>dropRadius</code>
                </td>
                <td class="ripples_directive_page-options-table-cell">
                  Number
                </td>
                <td class="ripples_directive_page-options-table-cell">20</td>
                <td class="ripples_directive_page-options-table-cell">
                  {{ t('ripples_directive_page.options.drop_radius') }}
                </td>
              </tr>
              <tr class="ripples_directive_page-options-table-row">
                <td class="ripples_directive_page-options-table-cell">
                  <code>strength</code>
                </td>
                <td class="ripples_directive_page-options-table-cell">
                  Number
                </td>
                <td class="ripples_directive_page-options-table-cell">0.04</td>
                <td class="ripples_directive_page-options-table-cell">
                  {{ t('ripples_directive_page.options.strength') }}
                </td>
              </tr>
              <tr class="ripples_directive_page-options-table-row">
                <td class="ripples_directive_page-options-table-cell">
                  <code>strengthVariance</code>
                </td>
                <td class="ripples_directive_page-options-table-cell">
                  Number
                </td>
                <td class="ripples_directive_page-options-table-cell">0.04</td>
                <td class="ripples_directive_page-options-table-cell">
                  {{ t('ripples_directive_page.options.strength_variance') }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
// ========================================
// Page Container
// ========================================
.ripples_directive_page {
  /* Display & Box Model */
  min-height: 100vh;

  /* Visual */
  background: var(--color-bg-primary, #ffffff);
}

// ========================================
// Section Container
// ========================================
.ripples_directive_page-section-container {
  /* Display & Box Model */
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.ripples_directive_page-section-title {
  /* Display & Box Model */
  margin: 0 0 24px 0;

  /* Typography */
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  color: var(--color-text-primary, #1a1a1a);
}

// ========================================
// Hero Section
// ========================================
.ripples_directive_page-hero {
  /* Positioning */
  position: relative;

  /* Display & Box Model */
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 80px 24px;
  overflow: hidden;

  &-background {
    /* Positioning */
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;

    /* Display & Box Model */
    width: 100%;
    height: 100%;

    &-gradient {
      /* Display & Box Model */
      width: 100%;
      height: 100%;

      /* Visual */
      background: linear-gradient(135deg, #44a08d 0%, #4ecdc4 100%);
    }
  }

  &-content {
    /* Positioning */
    position: relative;
    z-index: 1;

    /* Display & Box Model */
    max-width: 800px;
    text-align: center;

    &-title {
      /* Display & Box Model */
      margin: 0 0 16px 0;

      /* Typography */
      font-size: 48px;
      font-weight: 800;
      color: #ffffff;

      /* Animation */
      animation: fade-in-up 0.6s ease-out;

      @media (max-width: 768px) {
        font-size: 36px;
      }
    }

    &-subtitle {
      /* Display & Box Model */
      margin: 0 0 16px 0;

      /* Typography */
      font-size: 24px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.95);

      /* Animation */
      animation: fade-in-up 0.6s ease-out 0.1s both;
    }

    &-description {
      /* Display & Box Model */
      margin: 0 0 32px 0;

      /* Typography */
      font-size: 18px;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.9);

      /* Animation */
      animation: fade-in-up 0.6s ease-out 0.2s both;
    }

    &-actions {
      /* Animation */
      animation: fade-in-up 0.6s ease-out 0.3s both;

      &-btn {
        /* Display & Box Model */
        display: inline-flex;
        align-items: center;
        padding: 14px 28px;
        border-radius: 12px;

        /* Typography */
        font-size: 16px;
        font-weight: 600;
        text-decoration: none;
        color: #44a08d;

        /* Visual */
        background: #ffffff;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

        /* Animation */
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }
      }
    }
  }
}

// ========================================
// Demo Section
// ========================================
.ripples_directive_page-demo {
  /* Display & Box Model */
  padding: 80px 0;

  &[css-variant='alt'] {
    /* Visual */
    background: var(--color-bg-secondary, #f8f9fa);
  }

  &-description {
    /* Display & Box Model */
    margin: 0 0 32px 0;

    /* Typography */
    font-size: 18px;
    line-height: 1.6;
    text-align: center;
    color: var(--color-text-secondary, #6c757d);
  }

  &-area {
    /* Display & Box Model */
    margin-bottom: 40px;
    border-radius: 16px;
    overflow: hidden;

    /* Visual */
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

    &-container {
      /* Display & Box Model */
      height: 350px;

      /* Visual - for Ripples animation */
      background-size: cover;
      background-position: center;
    }

    &-content {
      /* Display & Box Model */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 24px;
      text-align: center;

      &-title {
        /* Display & Box Model */
        margin: 0 0 12px 0;

        /* Typography */
        font-size: 28px;
        font-weight: 700;
        font-family: 'Fira Code', monospace;
        color: #ffffff;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      }

      &-text {
        /* Display & Box Model */
        margin: 0;

        /* Typography */
        font-size: 16px;
        color: rgba(255, 255, 255, 0.9);
        text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
      }
    }
  }

  &-code {
    /* Display & Box Model */
    padding: 24px;
    border-radius: 16px;

    /* Visual */
    background: #1e1e1e;

    &-title {
      /* Display & Box Model */
      margin: 0 0 16px 0;

      /* Typography */
      font-size: 16px;
      font-weight: 600;
      color: #ffffff;
    }

    &-block {
      /* Display & Box Model */
      margin: 0;
      padding: 16px;
      border-radius: 8px;
      overflow-x: auto;

      /* Typography */
      font-family: 'Fira Code', monospace;
      font-size: 14px;
      line-height: 1.6;
      color: #d4d4d4;

      /* Visual */
      background: #2d2d2d;
    }
  }
}

// ========================================
// Options Section
// ========================================
.ripples_directive_page-options {
  /* Display & Box Model */
  padding: 80px 0;

  &-subtitle {
    /* Display & Box Model */
    margin: 40px 0 20px 0;

    /* Typography */
    font-size: 20px;
    font-weight: 600;
    font-family: 'Fira Code', monospace;
    color: var(--color-text-primary, #1a1a1a);

    &:first-of-type {
      margin-top: 0;
    }
  }

  &-table-wrapper {
    /* Display & Box Model */
    overflow-x: auto;
    margin-bottom: 32px;
    border-radius: 12px;

    /* Visual */
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  }

  &-table {
    /* Display & Box Model */
    width: 100%;
    border-collapse: collapse;

    /* Visual */
    background: #ffffff;

    &-head {
      /* Visual */
      background: #f8f9fa;
    }

    &-row {
      &:not(:last-child) {
        border-bottom: 1px solid #e9ecef;
      }
    }

    &-cell {
      /* Display & Box Model */
      padding: 16px 20px;

      /* Typography */
      font-size: 14px;
      text-align: left;

      code {
        /* Display & Box Model */
        padding: 2px 8px;
        border-radius: 4px;

        /* Typography */
        font-family: 'Fira Code', monospace;

        /* Visual */
        background: #f1f3f4;
        color: #44a08d;
      }
    }
  }
}

// ========================================
// Source Section
// ========================================
.ripples_directive_page-source {
  /* Display & Box Model */
  padding: 60px 0;
  text-align: center;

  /* Visual */
  background: var(--color-bg-secondary, #f8f9fa);

  &-link {
    /* Display & Box Model */
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 16px 32px;
    border-radius: 12px;

    /* Typography */
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    color: #ffffff;

    /* Visual */
    background: linear-gradient(135deg, #24292e 0%, #40484f 100%);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);

    /* Animation */
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }

    &-icon {
      /* Typography */
      font-size: 20px;
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
