<template>
  <div class="swiper_test_page">
    <!-- Hero Section -->
    <section class="swiper_test_page-hero">
      <div class="swiper_test_page-hero-background">
        <div class="swiper_test_page-hero-background-overlay" />
      </div>

      <div class="swiper_test_page-hero-content">
        <h1 class="swiper_test_page-hero-content-title">
          {{ $t('swiper_test_page.hero.title') }}
        </h1>
        <p class="swiper_test_page-hero-content-subtitle">
          {{ $t('swiper_test_page.hero.subtitle') }}
        </p>
        <p class="swiper_test_page-hero-content-description">
          {{ $t('swiper_test_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Demo 1: 基本滑動 -->
    <section class="swiper_test_page-section">
      <h2 class="swiper_test_page-section-title">
        {{ $t('swiper_test_page.demo.basic.title') }}
      </h2>
      <p class="swiper_test_page-section-description">
        {{ $t('swiper_test_page.demo.basic.description') }}
      </p>

      <div class="swiper_test_page-section-status">
        <p class="swiper_test_page-section-status-text">
          {{ $t('swiper_test_page.demo.current_slide') }}:
          {{ basicSlideIndex + 1 }} / {{ basicSlideList.length }}
        </p>
      </div>

      <SwiperCustom
        v-model="basicSlide"
        :slide-list="basicSlideList"
        :slot-name-is-default="true"
        class="swiper_test_page-section-swiper"
      >
        <template #default="{ item, index }">
          <div class="swiper_test_page-section-swiper-slide">
            <div class="swiper_test_page-section-swiper-slide-number">{{ index + 1 }}</div>
            <h3 class="swiper_test_page-section-swiper-slide-title">{{ item.title }}</h3>
            <p class="swiper_test_page-section-swiper-slide-content">{{ item.content }}</p>
          </div>
        </template>
      </SwiperCustom>
    </section>

    <!-- Demo 2: 帶導航按鈕 -->
    <section class="swiper_test_page-section">
      <h2 class="swiper_test_page-section-title">
        {{ $t('swiper_test_page.demo.navigation.title') }}
      </h2>
      <p class="swiper_test_page-section-description">
        {{ $t('swiper_test_page.demo.navigation.description') }}
      </p>

      <div class="swiper_test_page-section-status">
        <p class="swiper_test_page-section-status-text">
          {{ $t('swiper_test_page.demo.current_slide') }}:
          {{ navSlideIndex + 1 }} / {{ navSlideList.length }}
        </p>
      </div>

      <SwiperCustom
        v-model="navSlide"
        :slide-list="navSlideList"
        :slot-name-is-default="true"
        has-navigation
        class="swiper_test_page-section-swiper"
        css-has-nav="true"
      >
        <template #prev>
          <div class="swiper_test_page-section-swiper-nav_btn">
            <v-icon icon="mdi-chevron-left" size="32" />
          </div>
        </template>
        <template #next>
          <div class="swiper_test_page-section-swiper-nav_btn">
            <v-icon icon="mdi-chevron-right" size="32" />
          </div>
        </template>
        <template #default="{ item, index }">
          <div
            class="swiper_test_page-section-swiper-slide"
            :style="{ backgroundColor: item.color }"
          >
            <div class="swiper_test_page-section-swiper-slide-number">{{ index + 1 }}</div>
            <h3 class="swiper_test_page-section-swiper-slide-title">{{ item.title }}</h3>
          </div>
        </template>
      </SwiperCustom>
    </section>

    <!-- Demo 3: 事件處理 -->
    <section class="swiper_test_page-section">
      <h2 class="swiper_test_page-section-title">
        {{ $t('swiper_test_page.demo.events.title') }}
      </h2>
      <p class="swiper_test_page-section-description">
        {{ $t('swiper_test_page.demo.events.description') }}
      </p>

      <div class="swiper_test_page-section-status">
        <p class="swiper_test_page-section-status-text">
          {{ $t('swiper_test_page.demo.current_slide') }}:
          {{ eventSlideIndex + 1 }} / {{ eventSlideList.length }}
        </p>
        <p class="swiper_test_page-section-status-event">
          {{ $t('swiper_test_page.demo.events.last_event') }}:
          {{ lastEvent || '-' }}
        </p>
      </div>

      <SwiperCustom
        v-model="eventSlide"
        :slide-list="eventSlideList"
        :slot-name-is-default="true"
        has-navigation
        class="swiper_test_page-section-swiper"
        @change="handleChange"
        @slider-move="handleSliderMove"
        @slider-move-end="handleSliderMoveEnd"
      >
        <template #default="{ item, index }">
          <div
            class="swiper_test_page-section-swiper-slide"
            :style="{ backgroundColor: item.color }"
          >
            <div class="swiper_test_page-section-swiper-slide-number">{{ index + 1 }}</div>
            <h3 class="swiper_test_page-section-swiper-slide-title">{{ item.title }}</h3>
          </div>
        </template>
      </SwiperCustom>

      <div class="swiper_test_page-section-event_log">
        <h4 class="swiper_test_page-section-event_log-title">
          {{ $t('swiper_test_page.demo.events.log_title') }}
        </h4>
        <ul class="swiper_test_page-section-event_log-list">
          <li
            v-for="(log, index) in eventLog"
            :key="index"
            class="swiper_test_page-section-event_log-list-item"
          >
            {{ log }}
          </li>
        </ul>
      </div>
    </section>

    <!-- Demo 4: 滑動比例調整 -->
    <section class="swiper_test_page-section">
      <h2 class="swiper_test_page-section-title">
        {{ $t('swiper_test_page.demo.ratio.title') }}
      </h2>
      <p class="swiper_test_page-section-description">
        {{ $t('swiper_test_page.demo.ratio.description') }}
      </p>

      <div class="swiper_test_page-section-controls">
        <label class="swiper_test_page-section-controls-label">
          longSwipesRatio: {{ longSwipesRatio }}
        </label>
        <v-slider
          v-model="longSwipesRatio"
          :min="0.1"
          :max="0.9"
          :step="0.1"
          thumb-label
          class="swiper_test_page-section-controls-slider"
        />
      </div>

      <SwiperCustom
        v-model="ratioSlide"
        :slide-list="ratioSlideList"
        :slot-name-is-default="true"
        :long-swipes-ratio="longSwipesRatio"
        has-navigation
        class="swiper_test_page-section-swiper"
      >
        <template #default="{ item, index }">
          <div
            class="swiper_test_page-section-swiper-slide"
            :style="{ backgroundColor: item.color }"
          >
            <div class="swiper_test_page-section-swiper-slide-number">{{ index + 1 }}</div>
            <h3 class="swiper_test_page-section-swiper-slide-title">{{ item.title }}</h3>
            <p class="swiper_test_page-section-swiper-slide-hint">
              {{ $t('swiper_test_page.demo.ratio.hint') }}
            </p>
          </div>
        </template>
      </SwiperCustom>
    </section>

    <!-- Demo 5: 多位置插槽 -->
    <section class="swiper_test_page-section">
      <h2 class="swiper_test_page-section-title">
        {{ $t('swiper_test_page.demo.slots.title') }}
      </h2>
      <p class="swiper_test_page-section-description">
        {{ $t('swiper_test_page.demo.slots.description') }}
      </p>

      <SwiperCustom
        v-model="slotSlide"
        :slide-list="slotSlideList"
        :slot-name-is-default="true"
        should-fill-height
        has-navigation
        class="swiper_test_page-section-swiper"
        css-is-tall="true"
      >
        <template #default-top="{ index }">
          <div class="swiper_test_page-section-swiper-slot_demo" css-position="top">
            {{ $t('swiper_test_page.demo.slots.top') }} ({{ index + 1 }})
          </div>
        </template>
        <template #default-left="{ index }">
          <div class="swiper_test_page-section-swiper-slot_demo" css-position="left">
            {{ $t('swiper_test_page.demo.slots.left') }}
          </div>
        </template>
        <template #default="{ item, index }">
          <div class="swiper_test_page-section-swiper-slot_demo" css-position="center">
            <div class="swiper_test_page-section-swiper-slide-number">{{ index + 1 }}</div>
            <h3 class="swiper_test_page-section-swiper-slide-title">{{ item.title }}</h3>
            <p class="swiper_test_page-section-swiper-slide-content">
              {{ $t('swiper_test_page.demo.slots.center') }}
            </p>
          </div>
        </template>
        <template #default-right="{ index }">
          <div class="swiper_test_page-section-swiper-slot_demo" css-position="right">
            {{ $t('swiper_test_page.demo.slots.right') }}
          </div>
        </template>
        <template #default-bottom="{ index }">
          <div class="swiper_test_page-section-swiper-slot_demo" css-position="bottom">
            {{ $t('swiper_test_page.demo.slots.bottom') }} ({{ index + 1 }})
          </div>
        </template>
      </SwiperCustom>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('swiper_test_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('swiper_test_page.hero.description')
    }
  ]
});

// Demo 1: 基本滑動
const basicSlide = ref(0);
const basicSlideList = computed(() => [
  {
    value: 0,
    title: t('swiper_test_page.slides.slide1'),
    content: t('swiper_test_page.slides.content1')
  },
  {
    value: 1,
    title: t('swiper_test_page.slides.slide2'),
    content: t('swiper_test_page.slides.content2')
  },
  {
    value: 2,
    title: t('swiper_test_page.slides.slide3'),
    content: t('swiper_test_page.slides.content3')
  }
]);
const basicSlideIndex = computed(() => {
  if (typeof basicSlide.value === 'number') return basicSlide.value;
  return basicSlide.value?.value ?? 0;
});

// Demo 2: 帶導航按鈕
const navSlide = ref(0);
const navSlideList = computed(() => [
  { value: 0, title: t('swiper_test_page.colors.red'), color: '#ef5350' },
  { value: 1, title: t('swiper_test_page.colors.green'), color: '#66bb6a' },
  { value: 2, title: t('swiper_test_page.colors.blue'), color: '#42a5f5' },
  { value: 3, title: t('swiper_test_page.colors.purple'), color: '#ab47bc' }
]);
const navSlideIndex = computed(() => {
  if (typeof navSlide.value === 'number') return navSlide.value;
  return navSlide.value?.value ?? 0;
});

// Demo 3: 事件處理
const eventSlide = ref(0);
const lastEvent = ref('');
const eventLog = ref([]);
const eventSlideList = computed(() => [
  { value: 0, title: 'Slide 1', color: '#ff7043' },
  { value: 1, title: 'Slide 2', color: '#26c6da' },
  { value: 2, title: 'Slide 3', color: '#9ccc65' }
]);
const eventSlideIndex = computed(() => {
  if (typeof eventSlide.value === 'number') return eventSlide.value;
  return eventSlide.value?.value ?? 0;
});

function handleChange(value) {
  const idx = typeof value === 'number' ? value : (value?.value ?? 0);
  lastEvent.value = `change: ${idx}`;
  addEventLog(`change: ${idx}`);
}

function handleSliderMove(e, value, index) {
  lastEvent.value = `sliderMove: index=${index}`;
}

function handleSliderMoveEnd(value, index) {
  lastEvent.value = `sliderMoveEnd: index=${index}`;
  addEventLog(`sliderMoveEnd: index=${index}`);
}

function addEventLog(log) {
  eventLog.value.unshift(`[${new Date().toLocaleTimeString()}] ${log}`);
  if (eventLog.value.length > 5) {
    eventLog.value.pop();
  }
}

// Demo 4: 滑動比例調整
const ratioSlide = ref(0);
const longSwipesRatio = ref(0.2);
const ratioSlideList = computed(() => [
  { value: 0, title: 'Page 1', color: '#7e57c2' },
  { value: 1, title: 'Page 2', color: '#26a69a' },
  { value: 2, title: 'Page 3', color: '#ec407a' }
]);
const ratioSlideIndex = computed(() => {
  if (typeof ratioSlide.value === 'number') return ratioSlide.value;
  return ratioSlide.value?.value ?? 0;
});

// Demo 5: 多位置插槽
const slotSlide = ref(0);
const slotSlideList = computed(() => [
  { value: 0, title: t('swiper_test_page.slides.slide1') },
  { value: 1, title: t('swiper_test_page.slides.slide2') },
  { value: 2, title: t('swiper_test_page.slides.slide3') }
]);
const slotSlideIndex = computed(() => {
  if (typeof slotSlide.value === 'number') return slotSlide.value;
  return slotSlide.value?.value ?? 0;
});
</script>

<style lang="scss">
.swiper_test_page {
  min-height: 100vh;
  background-color: #f5f5f5;

  &-hero {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 280px;
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
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 20px;

    &-title {
      margin: 0 0 12px 0;
      font-size: 28px;
      font-weight: 700;
      color: #333;
    }

    &-description {
      margin: 0 0 20px 0;
      font-size: 16px;
      line-height: 1.6;
      color: #666;
    }

    &-status {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 16px;
      padding: 12px 16px;
      border-radius: 8px;
      background-color: #e8f5e9;

      &-text {
        margin: 0;
        font-size: 14px;
        font-weight: 500;
        color: #2e7d32;
      }

      &-event {
        margin: 0;
        font-size: 14px;
        color: #1565c0;
      }
    }

    &-controls {
      margin-bottom: 16px;
      padding: 16px;
      border-radius: 8px;
      background-color: #fff3e0;

      &-label {
        display: block;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 500;
        color: #e65100;
      }

      &-slider {
        max-width: 300px;
      }
    }

    // Swiper component wrapper
    &-swiper {
      /* Display & Box Model */
      height: 200px;
      border-radius: 12px;
      overflow: hidden;

      /* Visual */
      background-color: #fff;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

      /* Misc */
      user-select: none;
      -webkit-user-select: none;
      touch-action: pan-y;
      cursor: grab;

      &:active {
        cursor: grabbing;
      }

      &[css-has-nav='true'] {
        padding: 0 40px;
      }

      &[css-is-tall='true'] {
        height: 350px;
      }

      // Slide content
      &-slide {
        /* Display & Box Model */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 20px;

        /* Typography */
        text-align: center;

        /* Visual */
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

        &-number {
          /* Display & Box Model */
          display: flex;
          justify-content: center;
          align-items: center;
          width: 48px;
          height: 48px;
          margin-bottom: 12px;
          border-radius: 50%;

          /* Typography */
          font-size: 24px;
          font-weight: 700;
          color: #667eea;

          /* Visual */
          background-color: #fff;
        }

        &-title {
          /* Display & Box Model */
          margin: 0 0 8px 0;

          /* Typography */
          font-size: 24px;
          font-weight: 600;
          color: #fff;
        }

        &-content {
          /* Display & Box Model */
          margin: 0;

          /* Typography */
          font-size: 16px;
          color: rgba(255, 255, 255, 0.9);
        }

        &-hint {
          /* Display & Box Model */
          margin: 12px 0 0;
          padding: 8px 16px;
          border-radius: 20px;

          /* Typography */
          font-size: 12px;
          color: #fff;

          /* Visual */
          background-color: rgba(0, 0, 0, 0.2);
        }
      }

      // Navigation buttons
      &-nav_btn {
        /* Display & Box Model */
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;

        /* Typography */
        color: #fff;

        /* Visual */
        background-color: #44a08d;

        /* Misc */
        cursor: pointer;

        /* Animation */
        transition: background-color 0.2s;

        &:hover {
          background-color: #3d9480;
        }
      }

      // Slot demo areas
      &-slot_demo {
        /* Display & Box Model */
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px;

        /* Typography */
        font-size: 12px;
        font-weight: 500;
        color: #fff;

        &[css-position='top'] {
          height: 40px;
          background-color: #ef5350;
        }

        &[css-position='left'] {
          width: 60px;
          height: 100%;
          background-color: #66bb6a;
        }

        &[css-position='center'] {
          flex: 1;
          flex-direction: column;
          height: 100%;
          background: linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%);
        }

        &[css-position='right'] {
          width: 60px;
          height: 100%;
          background-color: #ffa726;
        }

        &[css-position='bottom'] {
          height: 40px;
          background-color: #ab47bc;
        }
      }
    }

    // Event log panel
    &-event_log {
      /* Display & Box Model */
      margin-top: 16px;
      padding: 16px;
      border-radius: 8px;

      /* Visual */
      background-color: #263238;

      &-title {
        /* Display & Box Model */
        margin: 0 0 12px 0;

        /* Typography */
        font-size: 14px;
        font-weight: 600;
        color: #4caf50;
      }

      &-list {
        /* Display & Box Model */
        margin: 0;
        padding: 0;

        /* Misc */
        list-style: none;

        &-item {
          /* Display & Box Model */
          padding: 4px 0;

          /* Typography */
          font-size: 12px;
          font-family: 'Consolas', 'Monaco', monospace;
          color: #b0bec5;
        }
      }
    }
  }
}
</style>
