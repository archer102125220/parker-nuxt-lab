<script setup>
/**
 * Ripples Background 元件展示頁面
 *
 * 展示 AnimationRipplesBackground 元件的使用方式與功能。
 */

const { t } = useI18n();
const localePath = useLocalePath();

useHeadMataData({
  title: t('ripples_component_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('ripples_component_page.hero.description')
    }
  ]
});

// Demo 狀態
const resolution = ref(512);
const dropRadius = ref(20);
const perturbance = ref(0.03);
const interactive = ref(true);
const autoDrops = ref(true);
const autoDropsInterval = ref(400);
const autoDropsStrength = ref(0.04);

// 範例程式碼
const exampleCode = computed(
  () => `<AnimationRipplesBackground
  image-url="/img/home/hero-gradient.svg"
  :resolution="${resolution.value}"
  :drop-radius="${dropRadius.value}"
  :perturbance="${perturbance.value}"
  :interactive="${interactive.value}"
  :auto-drops="${autoDrops.value}"
  :auto-drops-interval="${autoDropsInterval.value}"
  :auto-drops-strength="${autoDropsStrength.value}"
>
  <h1>Content on top of ripples</h1>
</AnimationRipplesBackground>`
);
</script>

<template>
  <div class="ripples_component_page">
    <!-- Hero Section -->
    <section class="ripples_component_page-hero">
      <div class="ripples_component_page-hero-background">
        <div class="ripples_component_page-hero-background-gradient" />
      </div>

      <div class="ripples_component_page-hero-content">
        <h1 class="ripples_component_page-hero-content-title">
          {{ t('ripples_component_page.hero.title') }}
        </h1>
        <p class="ripples_component_page-hero-content-subtitle">
          {{ t('ripples_component_page.hero.subtitle') }}
        </p>
        <p class="ripples_component_page-hero-content-description">
          {{ t('ripples_component_page.hero.description') }}
        </p>
        <div class="ripples_component_page-hero-content-actions">
          <NuxtLink
            v-ripple
            :to="localePath('/directives/ripples')"
            class="ripples_component_page-hero-content-actions-btn"
          >
            {{ t('ripples_component_page.view_directive') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Demo Section -->
    <section class="ripples_component_page-demo">
      <div class="ripples_component_page-section-container">
        <h2 class="ripples_component_page-section-title">
          {{ t('ripples_component_page.demo.title') }}
        </h2>

        <!-- Ripples Demo Area -->
        <div class="ripples_component_page-demo-area">
          <AnimationRipplesBackground
            image-url="/img/home/hero-gradient.svg"
            :resolution="resolution"
            :drop-radius="dropRadius"
            :perturbance="perturbance"
            :interactive="interactive"
            :auto-drops="autoDrops"
            :auto-drops-interval="autoDropsInterval"
            :auto-drops-strength="autoDropsStrength"
            class="ripples_component_page-demo-area-container"
          >
            <div class="ripples_component_page-demo-area-content">
              <h3 class="ripples_component_page-demo-area-content-title">
                {{ t('ripples_component_page.demo.interactive_hint') }}
              </h3>
              <p class="ripples_component_page-demo-area-content-text">
                {{ t('ripples_component_page.demo.touch_hint') }}
              </p>
            </div>
          </AnimationRipplesBackground>
        </div>

        <!-- Controls -->
        <div class="ripples_component_page-demo-controls">
          <h3 class="ripples_component_page-demo-controls-title">
            {{ t('ripples_component_page.demo.controls') }}
          </h3>

          <div class="ripples_component_page-demo-controls-grid">
            <!-- Resolution -->
            <div class="ripples_component_page-demo-controls-item">
              <label class="ripples_component_page-demo-controls-item-label">
                Resolution: {{ resolution }}
              </label>
              <input
                v-model.number="resolution"
                type="range"
                min="128"
                max="1024"
                step="128"
                class="ripples_component_page-demo-controls-item-slider"
              />
            </div>

            <!-- Drop Radius -->
            <div class="ripples_component_page-demo-controls-item">
              <label class="ripples_component_page-demo-controls-item-label">
                Drop Radius: {{ dropRadius }}
              </label>
              <input
                v-model.number="dropRadius"
                type="range"
                min="5"
                max="50"
                step="5"
                class="ripples_component_page-demo-controls-item-slider"
              />
            </div>

            <!-- Perturbance -->
            <div class="ripples_component_page-demo-controls-item">
              <label class="ripples_component_page-demo-controls-item-label">
                Perturbance: {{ perturbance.toFixed(2) }}
              </label>
              <input
                v-model.number="perturbance"
                type="range"
                min="0.01"
                max="0.1"
                step="0.01"
                class="ripples_component_page-demo-controls-item-slider"
              />
            </div>

            <!-- Auto Drops Interval -->
            <div class="ripples_component_page-demo-controls-item">
              <label class="ripples_component_page-demo-controls-item-label">
                Auto Drops Interval: {{ autoDropsInterval }}ms
              </label>
              <input
                v-model.number="autoDropsInterval"
                type="range"
                min="100"
                max="1000"
                step="50"
                class="ripples_component_page-demo-controls-item-slider"
              />
            </div>

            <!-- Toggles -->
            <div class="ripples_component_page-demo-controls-item">
              <label class="ripples_component_page-demo-controls-item-checkbox">
                <input v-model="interactive" type="checkbox" />
                Interactive
              </label>
            </div>

            <div class="ripples_component_page-demo-controls-item">
              <label class="ripples_component_page-demo-controls-item-checkbox">
                <input v-model="autoDrops" type="checkbox" />
                Auto Drops
              </label>
            </div>
          </div>
        </div>

        <!-- Code Example -->
        <div class="ripples_component_page-demo-code">
          <h3 class="ripples_component_page-demo-code-title">
            {{ t('ripples_component_page.demo.code_example') }}
          </h3>
          <pre
            class="ripples_component_page-demo-code-block"
          ><code>{{ exampleCode }}</code></pre>
        </div>
      </div>
    </section>

    <!-- Props Section -->
    <section class="ripples_component_page-props">
      <div class="ripples_component_page-section-container">
        <h2 class="ripples_component_page-section-title">
          {{ t('ripples_component_page.props.title') }}
        </h2>

        <div class="ripples_component_page-props-table-wrapper">
          <table class="ripples_component_page-props-table">
            <thead class="ripples_component_page-props-table-head">
              <tr class="ripples_component_page-props-table-row">
                <th class="ripples_component_page-props-table-cell">Prop</th>
                <th class="ripples_component_page-props-table-cell">Type</th>
                <th class="ripples_component_page-props-table-cell">Default</th>
                <th class="ripples_component_page-props-table-cell">
                  {{ t('ripples_component_page.props.description') }}
                </th>
              </tr>
            </thead>
            <tbody class="ripples_component_page-props-table-body">
              <tr class="ripples_component_page-props-table-row">
                <td class="ripples_component_page-props-table-cell">
                  <code>imageUrl</code>
                </td>
                <td class="ripples_component_page-props-table-cell">String</td>
                <td class="ripples_component_page-props-table-cell">
                  <em>required</em>
                </td>
                <td class="ripples_component_page-props-table-cell">
                  {{ t('ripples_component_page.props.image_url') }}
                </td>
              </tr>
              <tr class="ripples_component_page-props-table-row">
                <td class="ripples_component_page-props-table-cell">
                  <code>resolution</code>
                </td>
                <td class="ripples_component_page-props-table-cell">Number</td>
                <td class="ripples_component_page-props-table-cell">256</td>
                <td class="ripples_component_page-props-table-cell">
                  {{ t('ripples_component_page.props.resolution') }}
                </td>
              </tr>
              <tr class="ripples_component_page-props-table-row">
                <td class="ripples_component_page-props-table-cell">
                  <code>dropRadius</code>
                </td>
                <td class="ripples_component_page-props-table-cell">Number</td>
                <td class="ripples_component_page-props-table-cell">20</td>
                <td class="ripples_component_page-props-table-cell">
                  {{ t('ripples_component_page.props.drop_radius') }}
                </td>
              </tr>
              <tr class="ripples_component_page-props-table-row">
                <td class="ripples_component_page-props-table-cell">
                  <code>perturbance</code>
                </td>
                <td class="ripples_component_page-props-table-cell">Number</td>
                <td class="ripples_component_page-props-table-cell">0.03</td>
                <td class="ripples_component_page-props-table-cell">
                  {{ t('ripples_component_page.props.perturbance') }}
                </td>
              </tr>
              <tr class="ripples_component_page-props-table-row">
                <td class="ripples_component_page-props-table-cell">
                  <code>interactive</code>
                </td>
                <td class="ripples_component_page-props-table-cell">Boolean</td>
                <td class="ripples_component_page-props-table-cell">true</td>
                <td class="ripples_component_page-props-table-cell">
                  {{ t('ripples_component_page.props.interactive') }}
                </td>
              </tr>
              <tr class="ripples_component_page-props-table-row">
                <td class="ripples_component_page-props-table-cell">
                  <code>autoDrops</code>
                </td>
                <td class="ripples_component_page-props-table-cell">Boolean</td>
                <td class="ripples_component_page-props-table-cell">false</td>
                <td class="ripples_component_page-props-table-cell">
                  {{ t('ripples_component_page.props.auto_drops') }}
                </td>
              </tr>
              <tr class="ripples_component_page-props-table-row">
                <td class="ripples_component_page-props-table-cell">
                  <code>autoDropsInterval</code>
                </td>
                <td class="ripples_component_page-props-table-cell">Number</td>
                <td class="ripples_component_page-props-table-cell">400</td>
                <td class="ripples_component_page-props-table-cell">
                  {{ t('ripples_component_page.props.auto_drops_interval') }}
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
.ripples_component_page {
  /* Display & Box Model */
  min-height: 100vh;

  /* Visual */
  background: var(--color-bg-primary, #ffffff);
}

// ========================================
// Section Container
// ========================================
.ripples_component_page-section-container {
  /* Display & Box Model */
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.ripples_component_page-section-title {
  /* Display & Box Model */
  margin: 0 0 40px 0;

  /* Typography */
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  color: var(--color-text-primary, #1a1a1a);
}

// ========================================
// Hero Section
// ========================================
.ripples_component_page-hero {
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
.ripples_component_page-demo {
  /* Display & Box Model */
  padding: 80px 0;

  /* Visual */
  background: var(--color-bg-secondary, #f8f9fa);

  &-area {
    /* Display & Box Model */
    margin-bottom: 40px;
    border-radius: 16px;
    overflow: hidden;

    /* Visual */
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

    &-container {
      /* Display & Box Model */
      height: 400px;
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
        font-size: 32px;
        font-weight: 700;
        color: #ffffff;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      }

      &-text {
        /* Display & Box Model */
        margin: 0;

        /* Typography */
        font-size: 18px;
        color: rgba(255, 255, 255, 0.9);
        text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
      }
    }
  }

  &-controls {
    /* Display & Box Model */
    padding: 24px;
    margin-bottom: 40px;
    border-radius: 16px;

    /* Visual */
    background: #ffffff;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);

    &-title {
      /* Display & Box Model */
      margin: 0 0 24px 0;

      /* Typography */
      font-size: 20px;
      font-weight: 600;
      color: var(--color-text-primary, #1a1a1a);
    }

    &-grid {
      /* Display & Box Model */
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
    }

    &-item {
      &-label {
        /* Display & Box Model */
        display: block;
        margin-bottom: 8px;

        /* Typography */
        font-size: 14px;
        font-weight: 500;
        color: var(--color-text-secondary, #6c757d);
      }

      &-slider {
        /* Display & Box Model */
        width: 100%;
        height: 8px;
        border-radius: 4px;

        /* Visual */
        background: #e9ecef;
        appearance: none;

        /* Misc */
        cursor: pointer;

        &::-webkit-slider-thumb {
          /* Display & Box Model */
          width: 20px;
          height: 20px;
          border: none;
          border-radius: 50%;

          /* Visual */
          background: #44a08d;
          appearance: none;

          /* Misc */
          cursor: pointer;
        }
      }

      &-checkbox {
        /* Display & Box Model */
        display: flex;
        align-items: center;
        gap: 8px;

        /* Typography */
        font-size: 14px;
        color: var(--color-text-primary, #1a1a1a);

        /* Misc */
        cursor: pointer;

        input {
          /* Display & Box Model */
          width: 18px;
          height: 18px;

          /* Misc */
          cursor: pointer;
        }
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
// Props Section
// ========================================
.ripples_component_page-props {
  /* Display & Box Model */
  padding: 80px 0;

  &-table-wrapper {
    /* Display & Box Model */
    overflow-x: auto;
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
        color: #e91e63;
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
