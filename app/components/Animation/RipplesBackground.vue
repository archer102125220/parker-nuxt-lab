<script setup>
/**
 * RipplesBackground 組件
 *
 * 基於 WebGL 的互動式水波紋背景效果組件。
 * 支援滑鼠/觸控互動、自動水滴、可自訂樣式。
 *
 * @example
 * <RipplesBackground
 *   image-url="/img/background.svg"
 *   :resolution="512"
 *   :drop-radius="20"
 *   :perturbance="0.04"
 *   :interactive="true"
 *   :auto-drops="true"
 *   :auto-drops-interval="400"
 * >
 *   <h1>Content on top of ripples</h1>
 * </RipplesBackground>
 */

import { Ripples as RipplesAnimation } from '@app/utils/animation/ripples';

// ========================================
// Props
// ========================================
const props = defineProps({
  /** 背景圖片 URL */
  imageUrl: {
    type: String,
    required: true
  },
  /** 水波紋解析度 (建議: 256, 512, 1024) */
  resolution: {
    type: Number,
    default: 256
  },
  /** 水滴半徑 */
  dropRadius: {
    type: Number,
    default: 20
  },
  /** 擾動強度 (建議: 0.01 ~ 0.1) */
  perturbance: {
    type: Number,
    default: 0.03
  },
  /** 是否啟用滑鼠/觸控互動 */
  interactive: {
    type: Boolean,
    default: true
  },
  /** 圖片 CORS 設定 */
  crossOrigin: {
    type: String,
    default: ''
  },
  /** 是否啟用自動水滴 */
  autoDrops: {
    type: Boolean,
    default: false
  },
  /** 自動水滴間隔 (毫秒) */
  autoDropsInterval: {
    type: Number,
    default: 400
  },
  /** 自動水滴強度 */
  autoDropsStrength: {
    type: Number,
    default: 0.04
  },
  /** 自動水滴強度變化範圍 */
  autoDropsStrengthVariance: {
    type: Number,
    default: 0.04
  }
});

// ========================================
// Template Refs
// ========================================
const containerRef = ref(null);

// ========================================
// Auto Drops
// ========================================
let autoDropsIntervalId = null;

// ========================================
// Computed Options
// ========================================
const ripplesOptions = computed(() => ({
  imageUrl: props.imageUrl,
  resolution: props.resolution,
  dropRadius: props.dropRadius,
  perturbance: props.perturbance,
  interactive: props.interactive,
  crossOrigin: props.crossOrigin
}));

// ========================================
// Lifecycle
// ========================================
let visibilityObserver = null;
let isVisible = true;

onMounted(() => {
  if (containerRef.value) {
    // 初始化 Ripples (實例會存儲在 el.ripples 屬性上)
    RipplesAnimation.ripples(containerRef.value, ripplesOptions.value);

    // 設定自動水滴
    if (props.autoDrops) {
      startAutoDrops();
    }

    // 建立可視範圍觀察器
    visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 回復可視範圍，繼續動畫
            isVisible = true;
            play();
          } else {
            // 超出可視範圍，暫停動畫
            isVisible = false;
            pause();
          }
        });
      },
      {
        // 當元素有任何部分進入視窗時觸發
        threshold: 0
      }
    );

    visibilityObserver.observe(containerRef.value);
  }
});

onBeforeUnmount(() => {
  // 清理可視範圍觀察器
  if (visibilityObserver) {
    visibilityObserver.disconnect();
    visibilityObserver = null;
  }

  stopAutoDrops();

  // 銷毀 Ripples 實例
  if (containerRef.value?.ripples) {
    RipplesAnimation.ripples(containerRef.value, 'destroy');
  }
});

// ========================================
// Watch Props
// ========================================
watch(
  () => props.autoDrops,
  (newVal) => {
    if (newVal) {
      startAutoDrops();
    } else {
      stopAutoDrops();
    }
  }
);

watch(
  () => props.autoDropsInterval,
  () => {
    if (props.autoDrops) {
      stopAutoDrops();
      startAutoDrops();
    }
  }
);

// ========================================
// Methods
// ========================================

/**
 * 開始自動水滴
 */
function startAutoDrops() {
  if (autoDropsIntervalId) return;

  autoDropsIntervalId = setInterval(() => {
    // 如果不可見，則跳過水滴產生
    if (!isVisible) return;
    if (!containerRef.value?.ripples) return;

    const rect = containerRef.value.getBoundingClientRect();
    const x = Math.random() * rect.width;
    const y = Math.random() * rect.height;
    const strength =
      props.autoDropsStrength + Math.random() * props.autoDropsStrengthVariance;

    // 使用靜態方法調用 drop 命令
    RipplesAnimation.ripples(
      containerRef.value,
      'drop',
      x,
      y,
      props.dropRadius,
      strength
    );
  }, props.autoDropsInterval);
}

/**
 * 停止自動水滴
 */
function stopAutoDrops() {
  if (autoDropsIntervalId) {
    clearInterval(autoDropsIntervalId);
    autoDropsIntervalId = null;
  }
}

/**
 * 手動觸發水滴
 * @param {number} x - X 座標
 * @param {number} y - Y 座標
 * @param {number} [radius] - 水滴半徑
 * @param {number} [strength] - 水滴強度
 */
function drop(
  x,
  y,
  radius = props.dropRadius,
  strength = props.autoDropsStrength
) {
  if (containerRef.value) {
    // 使用靜態方法調用 drop 命令
    RipplesAnimation.ripples(
      containerRef.value,
      'drop',
      x,
      y,
      radius,
      strength
    );
  }
}

/**
 * 暫停動畫
 */
function pause() {
  if (containerRef.value?.ripples) {
    RipplesAnimation.ripples(containerRef.value, 'pause');
  }
}

/**
 * 繼續播放動畫
 */
function play() {
  if (containerRef.value?.ripples) {
    RipplesAnimation.ripples(containerRef.value, 'play');
  }
}

// ========================================
// Expose Methods
// ========================================
defineExpose({
  drop,
  pause,
  play,
  startAutoDrops,
  stopAutoDrops
});
</script>

<template>
  <div ref="containerRef" class="ripples_background">
    <div class="ripples_background-content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.ripples_background {
  /* Positioning */
  position: relative;

  /* Display & Box Model */
  width: 100%;
  height: 100%;

  /* Visual - for Ripples animation */
  background-size: cover;
  background-position: center;

  [css-ripples-canvas] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  &-content {
    position: relative;
    z-index: 1;
  }
}
</style>
