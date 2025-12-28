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

import { Ripples } from '@app/utils/animation/ripples';

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
// Ripples Instance
// ========================================
let ripplesInstance = null;
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
onMounted(() => {
  if (containerRef.value) {
    // 初始化 Ripples
    ripplesInstance = Ripples.ripples(containerRef.value, ripplesOptions.value);

    // 設定自動水滴
    if (props.autoDrops) {
      startAutoDrops();
    }
  }
});

onBeforeUnmount(() => {
  stopAutoDrops();
  if (ripplesInstance) {
    ripplesInstance.destroy();
    ripplesInstance = null;
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
    if (!ripplesInstance || !containerRef.value) return;

    const rect = containerRef.value.getBoundingClientRect();
    const x = Math.random() * rect.width;
    const y = Math.random() * rect.height;
    const strength =
      props.autoDropsStrength + Math.random() * props.autoDropsStrengthVariance;

    ripplesInstance.drop(x, y, props.dropRadius, strength);
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
  if (ripplesInstance) {
    ripplesInstance.drop(x, y, radius, strength);
  }
}

/**
 * 暫停動畫
 */
function pause() {
  if (ripplesInstance) {
    ripplesInstance.pause();
  }
}

/**
 * 繼續播放動畫
 */
function play() {
  if (ripplesInstance) {
    ripplesInstance.play();
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
    <slot />
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
}
</style>
