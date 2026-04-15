<script>
import _debounce from 'lodash/debounce';

export const DIRECTION_HORIZONTAL = 'horizontal';
export const DIRECTION_VERTICAL = 'vertical';
</script>

<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  amplitude: {
    // 震幅
    type: Number,
    default: 30
  },
  period: {
    // 週期數
    type: Number,
    default: 2
  },
  frequency: {
    // 頻率
    type: Number,
    default: 1
  },
  fps: {
    // 每秒幀數
    type: Number,
    default: 70
  },
  wavePadding: {
    // 波動區域
    type: Number,
    default: null
  },
  stop: {
    type: Boolean,
    default: false
  },
  direction: {
    type: String,
    default: DIRECTION_VERTICAL
  },
  onLoad: {
    type: Function,
    default: () => {}
  }
});

const systemStore = useSystemStore();

const imgRef = useTemplateRef('imgRef');
const canvasRef = useTemplateRef('canvasRef');

const animationFrameId = ref(null);
const scaledImageCanvas = ref(null);
const scaledImageCtx = ref(null);
const imgWidth = ref(null);
const imgHeight = ref(null);
const wavelength = ref(null);
const waveSpeed = ref(null);
const spatialFrequency = ref(null);
const amplitudeRatio = ref(null);
const timeNow = ref(null);
const timeLast = ref(null);
const delta = ref(null);
const distance = ref(null);
const imgLoading = ref(true);
const showImg = ref(true);
const canvasWidth = ref(null);
const canvasHeight = ref(null);

const windowSize = computed(() => ({
  width: systemStore.windowInnerWidth,
  height: systemStore.windowInnerHeight
}));
const amplitude = computed(() => props.amplitude ?? 30);
const period = computed(() => props.period ?? 2);
const frequency = computed(() => props.frequency ?? 1);
const fps = computed(() => props.fps ?? 70);
const wavePadding = computed(() => {
  return props.wavePadding ?? amplitude.value * 2;
});
const stop = computed(() =>
  typeof props.stop === 'boolean' ? props.stop : false
);
const direction = computed(() =>
  [DIRECTION_HORIZONTAL, DIRECTION_VERTICAL].includes(props.direction)
    ? props.direction
    : DIRECTION_VERTICAL
);

const interval = computed(() => {
  return 1000 / fps.value;
});
const cssVariables = computed(() => ({
  '--waving_image_wave_padding':
    direction.value === DIRECTION_HORIZONTAL
      ? `${wavePadding.value / 2}px 0 ${wavePadding.value / 2}px 0`
      : `0 ${wavePadding.value / 2}px 0 ${wavePadding.value / 2}px`,
  '--waving_image_img_display': showImg.value ? 'block' : 'none',
  '--waving_image_canvas_display': showImg.value ? 'none' : 'block',
  '--waving_image_wrapper_width': canvasWidth.value
    ? `${canvasWidth.value}px`
    : 'auto',
  '--waving_image_wrapper_height': canvasHeight.value
    ? `${canvasHeight.value}px`
    : 'auto'
}));

function handleImgLoading() {
  imgLoading.value = false;
}

function animateFrame() {
  if (stop.value) {
    animationFrameId.value = requestAnimationFrame(animateFrame);
    return;
  }

  const img = imgRef.value;
  const canvas = canvasRef.value;
  const ctx = canvas?.getContext('2d');

  if (
    img instanceof HTMLImageElement === false ||
    canvas instanceof HTMLCanvasElement === false ||
    ctx instanceof CanvasRenderingContext2D === false ||
    scaledImageCanvas.value instanceof HTMLCanvasElement === false ||
    wavelength.value === null ||
    waveSpeed.value === null ||
    spatialFrequency.value === null ||
    amplitudeRatio.value === null ||
    canvasWidth.value === null ||
    canvasHeight.value === null ||
    imgWidth.value === null ||
    imgHeight.value === null
  ) {
    console.error('animateFrame error', {
      img,
      canvas,
      ctx,
      scaledImageCanvas: scaledImageCanvas.value,
      wavelength: wavelength.value,
      waveSpeed: waveSpeed.value,
      spatialFrequency: spatialFrequency.value,
      amplitudeRatio: amplitudeRatio.value,
      canvasWidth: canvasWidth.value,
      canvasHeight
    });
    return;
  }

  timeNow.value = Date.now();
  delta.value = timeNow.value - timeLast.value;
  if (delta.value > interval.value) {
    timeLast.value = timeNow.value;
    distance.value += (delta.value / 1000) * waveSpeed.value;
    ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);

    if (direction.value === DIRECTION_HORIZONTAL) {
      for (let x = 0; x < imgWidth.value; x++) {
        const y =
          amplitudeRatio.value *
            x *
            Math.sin(spatialFrequency.value * (x - distance.value)) +
          wavePadding.value / 2;
        ctx.drawImage(
          scaledImageCanvas.value,
          x,
          0,
          1,
          imgHeight.value,
          x,
          y,
          1,
          imgHeight.value
        );
      }
    } else if (direction.value === DIRECTION_VERTICAL) {
      for (let y = 0; y < imgHeight.value; y++) {
        const x =
          amplitudeRatio.value *
            y *
            Math.sin(spatialFrequency.value * (y - distance.value)) +
          wavePadding.value / 2;
        ctx.drawImage(
          scaledImageCanvas.value,
          0,
          y,
          imgWidth.value,
          1,
          x,
          y,
          imgWidth.value,
          1
        );
      }
    }
  }

  animationFrameId.value = requestAnimationFrame(animateFrame);
}
function initWavingImageDOM() {
  if (animationFrameId.value !== null) {
    cancelAnimationFrame(animationFrameId.value);
  }
  animationFrameId.value = null;

  const img = imgRef.value;
  if (img instanceof HTMLImageElement === false) return;

  const canvas = canvasRef.value;
  if (canvas instanceof HTMLCanvasElement === false) return;

  const ctx = canvas.getContext('2d');
  if (ctx instanceof CanvasRenderingContext2D === false) return;

  if (typeof onLoad === 'function') onLoad(img, canvas, ctx);

  handleWavingImageSize(img);
  handleWavingImageCalculate();

  timeNow.value = Date.now(); // 當前時間
  timeLast.value = timeNow.value; // 上一幀時間
  delta.value = 0; // 連續幀之間間隔（實際）
  distance.value = 0;

  animationFrameId.value = requestAnimationFrame(animateFrame);
  requestAnimationFrame(function () {
    showImg.value = false;
  });
}
const initWavingImageDOMDebounce = _debounce(initWavingImageDOM, 150);
function handleWavingImageSize(img) {
  imgWidth.value = Math.floor(img.width);
  imgHeight.value = Math.floor(img.height);

  scaledImageCanvas.value = document.createElement('canvas');
  scaledImageCanvas.value.width = imgWidth.value;
  scaledImageCanvas.value.height = imgHeight.value;
  scaledImageCtx.value = scaledImageCanvas.value?.getContext('2d');
  if (scaledImageCtx.value instanceof CanvasRenderingContext2D) {
    scaledImageCtx.value.drawImage(img, 0, 0, imgWidth.value, imgHeight.value);
  }

  const newCanvasWidth =
    direction.value === DIRECTION_HORIZONTAL
      ? imgWidth.value
      : imgWidth.value + wavePadding.value;
  const newCanvasHeight =
    direction.value === DIRECTION_HORIZONTAL
      ? imgHeight.value + wavePadding.value
      : imgHeight.value;

  canvasWidth.value = newCanvasWidth;
  canvasHeight.value = newCanvasHeight;
}
function handleWavingImageCalculate() {
  wavelength.value = imgWidth.value / period.value; // 波長
  waveSpeed.value = wavelength.value * frequency.value; // 波速
  spatialFrequency.value = (2 * Math.PI) / wavelength.value; // x係數
  amplitudeRatio.value = amplitude.value / imgWidth.value; // 振幅係數
}

onMounted(() => {
  if (imgRef.value?.complete === true) {
    imgLoading.value = false;
  }
});
onUnmounted(() => {
  if (animationFrameId.value !== null) {
    cancelAnimationFrame(animationFrameId.value);
  }
});

watch(
  () => props.src,
  () => {
    imgLoading.value = true;
    showImg.value = true;
  }
);
watch(
  () => [windowSize.value, direction.value, amplitude.value],
  () => {
    showImg.value = true;
  }
);
watch(
  () => [imgLoading.value, windowSize.value, direction.value, amplitude.value],
  ([newImgLoading]) => {
    console.log('????');
    if (newImgLoading === false && imgRef.value?.complete === true) {
      nextTick(() => requestAnimationFrame(initWavingImageDOMDebounce));
    }
  }
);
watch(
  () => [
    period.value,
    frequency.value,
    fps.value,
    wavePadding.value,
    stop.value
  ],
  () => {
    handleWavingImageCalculate();
  }
);
</script>

<template>
  <div class="waving_image" :style="cssVariables">
    <img
      ref="imgRef"
      class="waving_image-img"
      :src="src"
      :alt="alt"
      @load="handleImgLoading"
    />
    <div class="waving_image-wrapper">
      <canvas
        ref="canvasRef"
        class="waving_image-wrapper-canvas"
        :width="canvasWidth ?? `${canvasWidth}`"
        :height="canvasHeight ?? `${canvasHeight}`"
      />
    </div>
  </div>
</template>

<style lang="scss">
.waving_image {
  &-wrapper {
    width: var(--waving_image_wrapper_width);
    height: var(--waving_image_wrapper_height);
    // overflow: hidden;

    &-canvas {
      display: var(--waving_image_canvas_display);
      width: 100%;
      height: 100%;
    }
  }
  &-img {
    display: var(--waving_image_img_display);
    max-width: 100%;
    max-height: 100%;
    padding: var(--waving_image_wave_padding);

    box-sizing: border-box;
  }
}
</style>
