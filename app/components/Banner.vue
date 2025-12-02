<template>
  <div
    ref="bannerContainer"
    class="banner"
    :style="cssVariables"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Navigation Buttons -->
    <div
      v-if="showNavigation && banners.length > 1"
      class="banner-nav banner-nav-prev"
      @click="handlePrev"
    >
      <slot name="prev">
        <div class="banner-nav-btn">
          {{ '<' }}
        </div>
      </slot>
    </div>
    <div
      v-if="showNavigation && banners.length > 1"
      class="banner-nav banner-nav-next"
      @click="handleNext"
    >
      <slot name="next">
        <div class="banner-nav-btn">
          {{ '>' }}
        </div>
      </slot>
    </div>

    <!-- Banner Container -->
    <div ref="bannerWrapper" class="banner-wrapper">
      <div
        ref="bannerTrack"
        class="banner-track"
        @mousedown="handleDragStart"
        @touchstart="handleDragStart"
      >
        <div
          v-for="(banner, index) in banners"
          :key="banner.id || index"
          class="banner-slide"
          :class="getSlideClass(index)"
          :style="getSlideStyle(index)"
        >
          <slot
            :banner="banner"
            :index="index"
            :is-active="index === currentIndex"
          >
            <div class="banner-slide-content">
              <img
                v-if="banner.image"
                :src="banner.image"
                :alt="banner.alt || `Banner ${index + 1}`"
                class="banner-slide-image"
              />
              <div
                v-if="banner.title || banner.description"
                class="banner-slide-text"
              >
                <h3 v-if="banner.title" class="banner-slide-title">
                  {{ banner.title }}
                </h3>
                <p v-if="banner.description" class="banner-slide-description">
                  {{ banner.description }}
                </p>
              </div>
            </div>
          </slot>
        </div>
      </div>
    </div>

    <!-- Indicators -->
    <div v-if="showIndicators && banners.length > 1" class="banner-indicators">
      <slot
        name="indicator"
        :current-index="currentIndex"
        :total="banners.length"
      >
        <div
          v-for="(banner, index) in banners"
          :key="`indicator-${banner.id || index}`"
          class="banner-indicator"
          :class="{ 'banner-indicator-active': index === currentIndex }"
          @click="handleIndicatorClick(index)"
        />
      </slot>
    </div>
  </div>
</template>

<script setup>
const { $classifySwipeDirection } = useNuxtApp();

const props = defineProps({
  banners: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: Number,
    default: 0
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 3000
  },
  height: {
    type: [String, Number],
    default: '300px'
  },
  showIndicators: {
    type: Boolean,
    default: true
  },
  showNavigation: {
    type: Boolean,
    default: true
  },
  transitionDuration: {
    type: Number,
    default: 300
  }
});

const emit = defineEmits(['change', 'update:modelValue']);

// Refs
const bannerContainer = ref(null);
const bannerWrapper = ref(null);
const bannerTrack = ref(null);

// State
const currentIndex = ref(props.modelValue);
const isDragging = ref(false);
const startX = ref(0);
const startY = ref(0);
const moveX = ref(0);
const autoplayTimer = ref(null);
const isHovered = ref(false);

// Computed
const cssVariables = computed(() => {
  const heightValue =
    typeof props.height === 'number' ? `${props.height}px` : props.height;
  const translateX = calculateTranslateX();

  return {
    '--banner-height': heightValue,
    '--banner-translate-x': `${translateX}px`,
    '--banner-transition-duration': isDragging.value
      ? '0ms'
      : `${props.transitionDuration}ms`,
    '--banner-slides-count': props.banners.length
  };
});

const shouldAutoplay = computed(() => {
  return props.autoplay && props.banners.length >= 2;
});

const has3DEffect = computed(() => {
  return props.banners.length >= 3;
});

// Methods
function getSlideClass(index) {
  const classes = [];

  if (index === currentIndex.value) {
    classes.push('banner-slide-active');
  }

  if (has3DEffect.value) {
    if (index === getPrevIndex()) {
      classes.push('banner-slide-prev');
    } else if (index === getNextIndex()) {
      classes.push('banner-slide-next');
    } else if (index !== currentIndex.value) {
      classes.push('banner-slide-hidden');
    }
  } else {
    // For 2 banners (no 3D effect), hide non-active slides
    if (index !== currentIndex.value) {
      classes.push('banner-slide-hidden');
    }
  }

  return classes;
}

function getSlideStyle(index) {
  const style = {};

  if (has3DEffect.value) {
    // 3 張以上：使用 3D 預覽效果
    if (index === getPrevIndex()) {
      // 左側 Banner：在後面，向左偏移，縮小
      style.transform = 'translate(-50%, -50%) translateX(-35%) scale(0.85)';
      style.zIndex = 1;
      style.opacity = 0.7;
    } else if (index === getNextIndex()) {
      // 右側 Banner：在後面，向右偏移，縮小
      style.transform = 'translate(-50%, -50%) translateX(35%) scale(0.85)';
      style.zIndex = 1;
      style.opacity = 0.7;
    } else if (index === currentIndex.value) {
      // 當前 Banner：在前面，正中央，正常大小
      style.transform = 'translate(-50%, -50%) translateX(0) scale(1)';
      style.zIndex = 3;
      style.opacity = 1;
    } else {
      // 其他 Banner：完全隱藏
      style.opacity = 0;
      style.zIndex = 0;
    }
  } else {
    // 2 張或更少：使用淡入淡出效果
    if (index === currentIndex.value) {
      // 當前 Banner：完全可見，在最上層
      style.transform = 'translate(-50%, -50%)';
      style.zIndex = 3;
      style.opacity = 1;
    } else {
      // 非當前 Banner：完全隱藏
      style.transform = 'translate(-50%, -50%)';
      style.zIndex = 0;
      style.opacity = 0;
    }
  }

  return style;
}

function getPrevIndex() {
  return currentIndex.value === 0
    ? props.banners.length - 1
    : currentIndex.value - 1;
}

function getNextIndex() {
  return currentIndex.value === props.banners.length - 1
    ? 0
    : currentIndex.value + 1;
}

function calculateTranslateX() {
  if (!bannerWrapper.value) return 0;

  const wrapperWidth = bannerWrapper.value.clientWidth;
  let baseTranslate = -currentIndex.value * wrapperWidth;

  // Add drag offset
  if (isDragging.value && moveX.value !== 0) {
    const dragOffset = moveX.value - startX.value;
    baseTranslate += dragOffset;
  }

  return baseTranslate;
}

function handlePrev() {
  if (props.banners.length <= 1) return;

  const newIndex =
    currentIndex.value === 0
      ? props.banners.length - 1
      : currentIndex.value - 1;

  goToSlide(newIndex);
}

function handleNext() {
  if (props.banners.length <= 1) return;

  const newIndex =
    currentIndex.value === props.banners.length - 1
      ? 0
      : currentIndex.value + 1;

  goToSlide(newIndex);
}

function goToSlide(index) {
  if (index < 0 || index >= props.banners.length) return;

  currentIndex.value = index;
  emit('update:modelValue', index);
  emit('change', index, props.banners[index]);

  resetAutoplay();
}

function handleIndicatorClick(index) {
  goToSlide(index);
}

function handleDragStart(e) {
  if (props.banners.length <= 1) return;

  isDragging.value = true;

  const eventX = e.pageX || e.touches?.[0]?.pageX || 0;
  const eventY = e.pageY || e.touches?.[0]?.pageY || 0;

  startX.value = eventX;
  startY.value = eventY;
  moveX.value = eventX;

  stopAutoplay();
}

function handleDragMove(e) {
  if (!isDragging.value) return;

  const eventX = e.pageX || e.touches?.[0]?.pageX || 0;
  const eventY = e.pageY || e.touches?.[0]?.pageY || 0;

  // Check if it's a horizontal swipe
  const { isHorizontal } = $classifySwipeDirection(
    { clientX: startX.value, clientY: startY.value },
    { clientX: eventX, clientY: eventY }
  );

  if (!isHorizontal) {
    isDragging.value = false;
    return;
  }

  moveX.value = eventX;
  e.preventDefault();
}

function handleDragEnd(e) {
  if (!isDragging.value) return;

  const dragDistance = moveX.value - startX.value;
  const threshold = bannerWrapper.value?.clientWidth * 0.2 || 50;

  if (Math.abs(dragDistance) > threshold) {
    if (dragDistance > 0) {
      handlePrev();
    } else {
      handleNext();
    }
  }

  isDragging.value = false;
  startX.value = 0;
  startY.value = 0;
  moveX.value = 0;

  if (shouldAutoplay.value && !isHovered.value) {
    startAutoplay();
  }
}

function handleMouseEnter() {
  isHovered.value = true;
  if (shouldAutoplay.value) {
    stopAutoplay();
  }
}

function handleMouseLeave() {
  isHovered.value = false;
  if (shouldAutoplay.value) {
    startAutoplay();
  }
}

function startAutoplay() {
  if (!shouldAutoplay.value) return;

  stopAutoplay();
  autoplayTimer.value = setInterval(() => {
    handleNext();
  }, props.interval);
}

function stopAutoplay() {
  if (autoplayTimer.value) {
    clearInterval(autoplayTimer.value);
    autoplayTimer.value = null;
  }
}

function resetAutoplay() {
  if (shouldAutoplay.value && !isHovered.value) {
    startAutoplay();
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('mousemove', handleDragMove);
  document.addEventListener('mouseup', handleDragEnd);
  document.addEventListener('touchmove', handleDragMove, { passive: false });
  document.addEventListener('touchend', handleDragEnd);

  if (shouldAutoplay.value) {
    startAutoplay();
  }
});

onUnmounted(() => {
  document.removeEventListener('mousemove', handleDragMove);
  document.removeEventListener('mouseup', handleDragEnd);
  document.removeEventListener('touchmove', handleDragMove);
  document.removeEventListener('touchend', handleDragEnd);

  stopAutoplay();
});

// Watch
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== currentIndex.value) {
      currentIndex.value = newValue;
    }
  }
);

watch(
  () => props.banners.length,
  () => {
    if (currentIndex.value >= props.banners.length) {
      currentIndex.value = 0;
    }
  }
);

watch(shouldAutoplay, (newValue) => {
  if (newValue) {
    startAutoplay();
  } else {
    stopAutoplay();
  }
});

// Expose
defineExpose({
  next: handleNext,
  prev: handlePrev,
  goTo: goToSlide,
  get currentIndex() {
    return currentIndex.value;
  }
});
</script>

<style lang="scss" scoped>
.banner {
  /* Positioning */
  position: relative;

  /* Display & Box Model */
  width: 100%;
  height: var(--banner-height, 300px);
  overflow: hidden;

  &-wrapper {
    /* Positioning */
    position: relative;

    /* Display & Box Model */
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &-track {
    /* Positioning */
    position: relative;

    /* Display & Box Model */
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    /* Animation */
    transition-property: transform;
    transition-duration: var(--banner-transition-duration, 300ms);
    transition-timing-function: ease-out;

    /* Misc */
    user-select: none;
  }

  &-slide {
    /* Positioning */
    position: absolute;
    top: 50%;
    left: 50%;

    /* Display & Box Model */
    flex-shrink: 0;
    width: 70%;
    max-width: 800px;
    height: 85%;

    /* Visual */
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);

    /* Animation */
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translate(-50%, -50%);

    &-hidden {
      /* Visual */
      opacity: 0;

      /* Misc */
      pointer-events: none;
    }

    &-prev,
    &-next {
      /* Misc */
      pointer-events: none;
    }

    &-active {
      /* Misc */
      pointer-events: auto;
    }

    &-content {
      /* Positioning */
      position: relative;

      /* Display & Box Model */
      width: 100%;
      height: 100%;
    }

    &-image {
      /* Display & Box Model */
      width: 100%;
      height: 100%;
      object-fit: cover;

      /* Misc */
      user-select: none;
      pointer-events: none;
    }

    &-text {
      /* Positioning */
      position: absolute;
      bottom: 0;
      left: 0;

      /* Display & Box Model */
      width: 100%;
      padding: 20px;

      /* Visual */
      background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    }

    &-title {
      /* Display & Box Model */
      margin: 0 0 8px;

      /* Typography */
      font-size: 24px;
      font-weight: 700;
      color: #fff;
    }

    &-description {
      /* Display & Box Model */
      margin: 0;

      /* Typography */
      font-size: 14px;
      color: #fff;
    }
  }

  &-nav {
    /* Positioning */
    position: absolute;
    top: 50%;
    z-index: 10;

    /* Display & Box Model */
    display: flex;
    align-items: center;
    justify-content: center;

    /* Animation */
    transform: translateY(-50%);

    /* Misc */
    cursor: pointer;

    &-prev {
      /* Positioning */
      left: 10px;
    }

    &-next {
      /* Positioning */
      right: 10px;
    }

    &-btn {
      /* Display & Box Model */
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;

      /* Typography */
      font-size: 20px;
      font-weight: 700;
      color: #fff;

      /* Visual */
      background-color: rgba(0, 0, 0, 0.5);

      /* Animation */
      transition: background-color 0.3s ease;

      &:hover {
        /* Visual */
        background-color: rgba(0, 0, 0, 0.8);
      }
    }
  }

  &-indicators {
    /* Positioning */
    position: absolute;
    bottom: 15px;
    left: 50%;
    z-index: 10;

    /* Display & Box Model */
    display: flex;
    gap: 8px;

    /* Animation */
    transform: translateX(-50%);
  }

  &-indicator {
    /* Display & Box Model */
    width: 10px;
    height: 10px;
    border-radius: 50%;

    /* Visual */
    background-color: rgba(255, 255, 255, 0.5);

    /* Animation */
    transition: all 0.3s ease;

    /* Misc */
    cursor: pointer;

    &:hover {
      /* Visual */
      background-color: rgba(255, 255, 255, 0.8);
    }

    &-active {
      /* Display & Box Model */
      width: 24px;
      border-radius: 5px;

      /* Visual */
      background-color: #fff;
    }
  }
}
</style>
