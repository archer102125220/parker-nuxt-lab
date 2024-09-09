<template>
  <div class="swiper_js" :style="cssVariable">
    <!-- If we need navigation buttons -->
    <div v-if="hasNavigation" ref="prevRef" class="swiper_js-prev">
      <slot name="prev">
        <div v-ripple class="swiper_js-prev-btn">
          {{ '<' }}
        </div>
      </slot>
    </div>
    <div v-if="hasNavigation" ref="nextRef" class="swiper_js-next">
      <slot name="next">
        <div v-ripple class="swiper_js-prev-btn">
          {{ '>' }}
        </div>
      </slot>
    </div>

    <!-- Additional required wrapper -->
    <div ref="swiperRef" class="swiper_js-content">
      <div class="swiper_js-content-wrapper swiper-wrapper">
        <!-- Slides -->
        <div
          v-for="(slide, index) in slideList"
          :key="slide[slotNameKey] || slide.slotName || index"
          class="swiper_js-content-wrapper-slide swiper-slide"
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

    <!-- If we need pagination -->
    <div v-if="hasPagination" ref="paginationRef" class="swiper-pagination" />

    <!-- If we need scrollbar -->
    <div v-if="hasScrollbar" ref="scrollbarRef" class="swiper-scrollbar" />
  </div>
</template>

<script setup>
// Import Swiper and modules
import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const props = defineProps({
  modelValue: {
    type: [Number, String, Object],
    default: 0
  },
  valueKey: {
    type: [Number, String],
    default: null
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
  centeredSlides: {
    type: Boolean,
    default: null
  },
  spaceBetween: {
    type: [Number, String],
    default: null
  },
  overflow: {
    type: Boolean,
    default: false
  },
  hasPagination: {
    type: Boolean,
    default: false
  },
  paginationClickable: {
    type: Boolean,
    default: true
  },
  dynamicBullets: {
    type: Boolean,
    default: false
  },
  hasNavigation: {
    type: Boolean,
    default: false
  },
  autoplayDelay: {
    type: Number,
    default: null
  },
  autoplayDisableOnInteraction: {
    type: Boolean,
    default: false
  },
  slidesPerView: {
    type: [Number, String],
    default: 1
  },
  loop: {
    type: Boolean,
    default: false
  },
  hasScrollbar: {
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

const nextRef = ref(null);
const prevRef = ref(null);
const paginationRef = ref(null);
const scrollbarRef = ref(null);
const swiperRef = ref(null);

const swiperObj = ref(null);
const params = ref(null);
const cssVariable = computed(() => {
  const _cssVariable = {};
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
  return _cssVariable;
});

watch(
  () => props,
  (newProps) => {
    handleSwiperUpdata(newProps);
  },
  {
    deep: true
  }
);
watch(
  () => props.modelValue,
  (newModelValue) => {
    syncSlide(newModelValue, swiperObj.value);
  },
  {
    deep: true
  }
);

onMounted(() => {
  handleSwiperInit();
});

function handleSwiperInit() {
  const _params = {
    modules: [],
    centeredSlides: props.centeredSlides,
    slidesPerView: props.slidesPerView,
    spaceBetween: props.spaceBetween,
    on: {
      beforeInit,
      init,
      afterInit,
      beforeDestroy,
      destroy,
      beforeSlideChangeStart,
      slideChange,
      sliderMove,
      reachBeginning,
      reachEnd,
      fromEdge,
      activeIndexChange,
      beforeTransitionStart
    }
  };
  if (props.hasNavigation === true) {
    _params.modules = [..._params.modules, Navigation];
    _params.navigation = {
      nextEl: nextRef.value,
      prevEl: prevRef.value
    };
  }
  if (props.hasPagination === true) {
    _params.modules = [..._params.modules, Pagination];
    _params.pagination = {
      el: paginationRef.value,
      clickable: props.paginationClickable,
      dynamicBullets: props.dynamicBullets
    };
  }
  if (props.hasScrollbar === true) {
    _params.modules = [..._params.modules, Scrollbar];
    _params.scrollbar = {
      el: scrollbarRef.value
    };
  }

  if (props.autoplayDelay !== null && isNaN(props.autoplayDelay) === false) {
    _params.modules = [..._params.modules, Autoplay];
    _params.autoplay = {
      delay: props.autoplayDelay,
      disableOnInteraction: props.autoplayDisableOnInteraction
    };
  }
  if (props.loop === true) {
    _params.loop = props.loop;
  }

  swiperObj.value = new Swiper(swiperRef.value, _params);
  params.value = _params;

  // 疑似是生命週期因素，自動循環的初次播放需透過button觸發
  if (
    props.autoplayDelay !== null &&
    isNaN(props.autoplayDelay) === false &&
    typeof swiperRef.value?.swiper?.autoplay?.start === 'function'
  ) {
    setTimeout(() => {
      if (typeof nextRef.value?.click === 'function') {
        nextRef.value.click();
      }
    }, props.autoplayDelay);
  }
}
function handleSwiperUpdata(newProps) {
  if (
    typeof swiperObj.value?.update === 'function' &&
    Array.isArray(newProps.slideList) &&
    newProps.slideList.length > 0
  ) {
    const _params = {
      ...(params.value || {}),
      modules: [],
      centeredSlides: newProps.centeredSlides,
      slidesPerView: newProps.slidesPerView,
      spaceBetween: newProps.spaceBetween
    };
    if (newProps.hasNavigation === true) {
      _params.modules = [..._params.modules, Navigation];
      _params.navigation = {
        nextEl: nextRef.value,
        prevEl: prevRef.value
      };
    }
    if (newProps.hasPagination === true) {
      _params.modules = [..._params.modules, Pagination];
      _params.pagination = {
        el: paginationRef.value,
        clickable: newProps.paginationClickable,
        dynamicBullets: newProps.dynamicBullets
      };
    }
    if (newProps.hasScrollbar === true) {
      _params.modules = [..._params.modules, Scrollbar];
      _params.scrollbar = {
        el: scrollbarRef.value
      };
    }
    swiperObj.value.update(_params);
    params.value = _params;
  }
}
function beforeInit(swiper) {
  emit('beforeInit', swiper);
}
function init(swiper) {
  emit('init', swiper);
}
function syncSlide(value, swiper) {
  if (
    typeof swiper?.slideTo !== 'function' ||
    Array.isArray(props.slideList) === false ||
    props.slideList.length <= 0
  ) {
    return;
  }
  const _slideIndex = props.slideList.findIndex(
    (slide) => slide?.[props.modelValueKey] === value || slide?.value === value
  );
  const slideIndex =
    typeof _slideIndex === 'number' && _slideIndex > -1 ? _slideIndex : value;
  console.log({ slideIndex });
  swiper.slideTo(slideIndex || 0);
}
function afterInit(swiper) {
  syncSlide(props.modelValue, swiper);
  emit('afterInit', swiper);
  // console.log({ Swiper, swiper }, swiper.onTouchMove);
}
function beforeDestroy(swiper) {
  emit('beforeDestroy', swiper);
}
function destroy(swiper) {
  emit('destroy', swiper);
}
function beforeSlideChangeStart(swiper) {
  emit('beforeSlideChangeStart', swiper);
}
function slideChange(swiper) {
  const slideData = props.slideList[swiper.activeIndex];
  const slideValue =
    slideData?.[props.modelValueKey] || slideData?.value || swiper.activeIndex;

  console.log({ slideValue });

  if (props.modelValue !== slideValue) {
    emit('update:modelValue', slideValue);
    emit('change', slideValue);
  }
  emit('slideChange', swiper);
}
function sliderMove(swiper) {
  emit('sliderMove', swiper);
}
function reachBeginning(swiper) {
  emit('reachBeginning', swiper);
}
function reachEnd(swiper) {
  emit('reachEnd', swiper);
}
function fromEdge(swiper) {
  emit('fromEdge', swiper);
}
function activeIndexChange(swiper) {
  emit('activeIndexChange', swiper);
}
function beforeTransitionStart(swiper) {
  emit('beforeTransitionStart', swiper);
}
</script>

<style lang="scss" scoped>
.swiper_js {
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
    @extend .swiper_js-prev;
    right: 5px;
    &-btn {
      @extend .swiper_js-prev-btn;
    }
  }
  &-content {
    // height: 100%;
    height: var(--content_wrapper_slide_height);
    &-wrapper {
      // height: 100%;
      height: var(--content_wrapper_slide_height);
      &-slide {
        // height: 100%;
        // overflow-y: auto;
        // overflow-x: hidden;
        position: relative;
        height: var(--content_wrapper_slide_height);
        overflow-y: var(--slide_overflow_y);
        overflow-x: var(--slide_overflow_x);
      }
    }
  }
}
</style>
