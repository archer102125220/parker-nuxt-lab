<template>
  <div ref="swiper" class="swiper" :style="cssVariable">
    <div v-if="hasNavigation" class="swiper-prev" @click="handlePrev">
      <slot name="prev">
        <div v-ripple class="swiper-prev-btn">
          {{ '<' }}
        </div>
      </slot>
    </div>
    <div v-if="hasNavigation" class="swiper-next" @click="handleNext">
      <slot name="next">
        <div v-ripple class="swiper-prev-btn">
          {{ '>' }}
        </div>
      </slot>
    </div>
    <div ref="sliderContent" class="swiper-content">
      <div
        ref="sliderWrapper"
        class="swiper-content-wrapper"
        @mousedown="handleChangStart"
        @touchstart="handleChangStart"
      >
        <div
          v-for="(slide, index) in slideList"
          :key="slide[slotNameKey] || slide.slotName || index"
          class="swiper-content-wrapper-slide"
        >
          <slot
            v-if="slotNameIsDefault === false"
            :name="`${slide[slotNameKey] || slide.slotName || index}-top`"
            :item="slide"
            :index="index"
          />
          <slot v-else name="default-top" :item="slide" :index="index" />

          <slot
            v-if="slotNameIsDefault === false"
            :name="slide[slotNameKey] || slide.slotName || index"
            :item="slide"
            :index="index"
          >
            <p>{{ slide.content || slide }}</p>
          </slot>
          <slot v-else :item="slide" :index="index">
            <p>{{ slide.content || slide }}</p>
          </slot>

          <slot
            v-if="slotNameIsDefault === false"
            :name="`${slide[slotNameKey] || slide.slotName || index}-bottom`"
            :item="slide"
            :index="index"
          />
          <slot v-else name="default-bottom" :item="slide" :index="index" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [Number, String, Object],
    default: 0
  },
  valueKey: {
    type: [Number, String],
    default: null
  },
  longSwipesRatio: {
    type: Number,
    default: 0.2
  },
  slideList: {
    type: Array,
    default: () => []
  },
  slotNameKey: {
    type: String,
    default: null
  },
  slotNameIsDefault: {
    type: Boolean,
    default: false
  },
  overflow: {
    type: Boolean,
    default: false
  },
  hasNavigation: {
    type: Boolean,
    default: false
  },
  shouldFillHeight: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits([
  'change',
  'update:modelValue',
  'beforeInit',
  'init',
  'afterInit',
  'beforeDestroy',
  'destroy',
  'beforeSlideChangeStart',
  'slideChange',
  'sliderMove',
  'reachBeginning',
  'reachEnd',
  'fromEdge',
  'activeIndexChange',
  'beforeTransitionStart'
]);

const sliderContent = ref(null);
const sliderWrapper = ref(null);
const sliderActiveIndex = ref(0);
const isDragging = ref(false);
const canCancel = ref(false);
const startX = ref(null);
const startY = ref(null);
const moveX = ref(null);

const cssVariable = computed(() => {
  const _cssVariable = {
    '--wrapper_transform': `translate3d(${deltaX.value}px, 0, 0)`
  };
  if (
    typeof props.shouldFillHeight === 'boolean' &&
    props.shouldFillHeight === true
  ) {
    _cssVariable['--content_wrapper_slide_height'] = '100%';
  }

  if (typeof props.overflow === 'boolean' && props.overflow === true) {
    _cssVariable['--content_wrapper_slide_height'] = '100%';
    _cssVariable['--slide_overflow_y'] = 'auto';
    _cssVariable['--slide_overflow_x'] = 'hidden';
  }

  if (typeof sliderContent.value?.clientWidth === 'number') {
    _cssVariable['--slide_width'] = `${sliderContent.value.clientWidth}px`;
  }

  if (isDragging.value === false) {
    _cssVariable['--wrapper_transition_duration'] = '300ms';
  }

  return _cssVariable;
});

const slideXList = computed(() => {
  if (Array.isArray(props?.slideList) === false) {
    return [];
  }

  return props.slideList.map(
    (slide, index) => index * (sliderContent.value?.clientWidth || 1) * -1
  );
});

const deltaX = computed(() => {
  const sliderActive = slideXList.value[sliderActiveIndex.value];
  const _deltaX = sliderActive + moveX.value - startX.value;

  if (
    typeof sliderActive !== 'number' ||
    typeof startX.value !== 'number' ||
    typeof moveX.value !== 'number' ||
    isNaN(_deltaX) === true
  ) {
    return sliderActive;
  }

  return _deltaX;
});

onMounted(() => {
  document.addEventListener('mousemove', handleSliderMove);
  document.addEventListener('mouseup', handleChanging);
  document.addEventListener('touchmove', handleSliderMove);
  document.addEventListener('touchend', handleChanging);
});
onUnmounted(() => {
  document.removeEventListener('mousemove', handleSliderMove);
  document.removeEventListener('mouseup', handleChanging);
  document.removeEventListener('touchmove', handleSliderMove);
  document.removeEventListener('touchend', handleChanging);
});

watch(
  () => props.modelValue,
  (newModelValue) => {
    const swiperIndex = getCurrentSwiperIndex(newModelValue);
    sliderActiveIndex.value = swiperIndex;
  },
  { deep: true, immediate: true }
);

function getCurrentSwiperIndex(slide) {
  const _slideIndex = props.slideList.findIndex(
    (_slide) =>
      _slide?.[props.valueKey] === slide ||
      _slide?.value === slide ||
      _slide === slide
  );
  return typeof _slideIndex === 'number' && _slideIndex > -1
    ? _slideIndex
    : slide;
}

function handlePrev() {
  if (sliderActiveIndex.value > 0) {
    const newSliderActiveIndex = sliderActiveIndex.value - 1;
    const newSlide = props.slideList[newSliderActiveIndex] || {};
    const newValue = newSlide[props.valueKey] || newSlide.value || newSlide;
    emit('change', newValue);
    emit('update:modelValue', newValue);

    sliderActiveIndex.value = newSliderActiveIndex;
  }
}

function handleNext() {
  const _slideList = props.slideList || [];
  if (sliderActiveIndex.value < _slideList.length) {
    const newSliderActiveIndex = sliderActiveIndex.value + 1;
    const newSlide = props.slideList[newSliderActiveIndex] || {};
    const newValue = newSlide[props.valueKey] || newSlide.value || newSlide;
    emit('change', newValue);
    emit('update:modelValue', newValue);

    sliderActiveIndex.value = newSliderActiveIndex;
  }
}

function handleChangStart(e) {
  isDragging.value = true;
  canCancel.value = true;

  const eventX =
    e.pageX ||
    e.clientX ||
    e.offsetX ||
    e.targetTouches?.[0]?.pageX ||
    e.targetTouches?.[0]?.clientX ||
    e.targetTouches?.[0]?.offsetX ||
    e.changedTouches?.[0]?.pageX ||
    e.changedTouches?.[0]?.clientX ||
    e.changedTouches?.[0]?.offsetX;
  startX.value = eventX;

  const eventY =
    e.pageY ||
    e.clientY ||
    e.offsetY ||
    e.targetTouches?.[0]?.pageY ||
    e.targetTouches?.[0]?.clientY ||
    e.targetTouches?.[0]?.offsetY ||
    e.changedTouches?.[0]?.pageY ||
    e.changedTouches?.[0]?.clientY ||
    e.changedTouches?.[0]?.offsetY;

  startY.value = eventY;
}
function handleSliderMove(e) {
  if (isDragging.value === false) return;

  const eventY =
    e.pageY ||
    e.clientY ||
    e.offsetY ||
    e.targetTouches?.[0]?.pageY ||
    e.targetTouches?.[0]?.clientY ||
    e.targetTouches?.[0]?.offsetY ||
    e.changedTouches?.[0]?.pageY ||
    e.changedTouches?.[0]?.clientY ||
    e.changedTouches?.[0]?.offsetY;

  const eventX =
    e.pageX ||
    e.clientX ||
    e.offsetX ||
    e.targetTouches?.[0]?.pageX ||
    e.targetTouches?.[0]?.clientX ||
    e.targetTouches?.[0]?.offsetX ||
    e.changedTouches?.[0]?.pageX ||
    e.changedTouches?.[0]?.clientX ||
    e.changedTouches?.[0]?.offsetX;

  if (
    Math.abs(eventX - startX.value) > 15 ||
    (moveX.value > 0 && Math.abs(moveX.value - startX.value) > 20)
  ) {
    canCancel.value = false;
  }

  if (Math.abs(startY.value - eventY) > 5 && canCancel.value === true) {
    isDragging.value = false;
    return;
  }

  moveX.value = eventX;

  emit('sliderMove', e);
}
function handleChanging(e) {
  isDragging.value = false;

  const _slideXList = slideXList.value;

  let newSliderActiveIndex = -1;
  if (moveX.value > startX.value) {
    // prev
    newSliderActiveIndex = _slideXList.findIndex((slideX) =>
      handleSlideXFindLast(slideX)
    );
  } else if (moveX.value < startX.value) {
    // next
    newSliderActiveIndex = _slideXList.findLastIndex((slideX) =>
      handleSlideXFindLast(slideX)
    );
  }

  if (newSliderActiveIndex >= 0) {
    const newSlide = props.slideList[newSliderActiveIndex] || {};
    const newValue = newSlide[props.valueKey] || newSlide.value || newSlide;
    emit('change', newValue);
    emit('update:modelValue', newValue);

    sliderActiveIndex.value = newSliderActiveIndex;
  }

  startX.value = null;
  moveX.value = null;
}
function handleSlideXFindLast(slideX) {
  const sliderContentWidth = sliderContent.value?.clientWidth || 1;
  const longSwipesRatio =
    typeof props.longSwipesRatio !== 'number' ? 0.5 : props.longSwipesRatio;
  const _longSwipesRatio =
    longSwipesRatio >= 1 ? longSwipesRatio : Math.abs(1 - longSwipesRatio);

  const slideXAbs = Math.abs(slideX);
  const deltaXAbs = Math.abs(deltaX.value);
  const difference = Math.abs(slideXAbs - deltaXAbs);

  // return (
  //   (deltaX.value >= 0 && slideX === 0) ||
  //   (difference >= 0 && difference <= sliderContentWidth * 0.8)
  // );
  return (
    (deltaX.value >= 0 && slideX === 0) ||
    (difference >= 0 && difference <= sliderContentWidth * _longSwipesRatio)
  );
}
</script>

<style lang="scss" scoped>
.swiper {
  position: relative;
  &-prev {
    position: absolute;
    left: 5px;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 24px;
      border-radius: 100%;
      color: #fff;
      background-color: #008cff;
    }
  }
  &-next {
    @extend .swiper-prev;
    left: unset;
    right: 5px;
    &-btn {
      @extend .swiper-prev-btn;
    }
  }
  &-content {
    // height: 100%;
    height: var(--content_wrapper_slide_height);
    width: var(--content_wrapper_slide_width, 100%);

    // transition-delay: 0ms;
    // transition-duration: 0ms;
    // transition-duration: 50ms;
    transition-duration: var(--wrapper_transition_duration, 0ms);
    transform: var(--wrapper_transform);

    &-wrapper {
      // height: 100%;
      height: var(--content_wrapper_slide_height);
      display: flex;

      &-slide {
        // height: 100%;
        // overflow-y: auto;
        // overflow-x: hidden;
        flex-shrink: 0;
        position: relative;
        width: var(--slide_width, 100%);
        height: var(--content_wrapper_slide_height);

        overflow-y: var(--slide_overflow_y);
        overflow-x: var(--slide_overflow_x);
      }
    }
  }
}
</style>
