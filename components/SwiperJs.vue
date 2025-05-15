<template>
  <div
    class="swiper_js"
    :style="cssVariable"
    @mouseup="resetMoveingStatus"
    @touchend="resetMoveingStatus"
  >
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
          :swiper-loop-value="slide[valueKey] || slide.value || index"
        >
          <slot
            v-if="slotNameIsDefault === false"
            :name="`${slide[slotNameKey] || slide.slotName || index}-top`"
            :item="slide"
            :index="index"
            :is-slider-moveing="isSliderMoveing"
          />
          <slot
            v-else
            name="default-top"
            :item="slide"
            :index="index"
            :is-slider-moveing="isSliderMoveing"
          />

          <div class="swiper_js-content-wrapper-slide-center">
            <slot
              v-if="slotNameIsDefault === false"
              :name="`${slide[slotNameKey] || slide.slotName || index}-left`"
              :item="slide"
              :index="index"
              :is-slider-moveing="isSliderMoveing"
            />
            <slot
              v-else
              name="default-left"
              :item="slide"
              :index="index"
              :is-slider-moveing="isSliderMoveing"
            />

            <div class="swiper_js-content-wrapper-slide-center-middle">
              <slot
                v-if="slotNameIsDefault === false"
                :name="`${
                  slide[slotNameKey] || slide.slotName || index
                }-middle_top`"
                :item="slide"
                :index="index"
                :is-slider-moveing="isSliderMoveing"
              />
              <slot
                v-else
                name="default-middle_top"
                :item="slide"
                :index="index"
                :is-slider-moveing="isSliderMoveing"
              />

              <slot
                v-if="slotNameIsDefault === false"
                :name="slide[slotNameKey] || slide.slotName || index"
                :item="slide"
                :index="index"
                :is-slider-moveing="isSliderMoveing"
              >
                <p>{{ slide.content || slide }}</p>
              </slot>
              <slot
                v-else
                :item="slide"
                :index="index"
                :is-slider-moveing="isSliderMoveing"
              >
                <p>{{ slide.content || slide }}</p>
              </slot>

              <slot
                v-if="slotNameIsDefault === false"
                :name="`${
                  slide[slotNameKey] || slide.slotName || index
                }-middle_bottom`"
                :item="slide"
                :index="index"
                :is-slider-moveing="isSliderMoveing"
              />
              <slot
                v-else
                name="default-middle_bottom"
                :item="slide"
                :index="index"
                :is-slider-moveing="isSliderMoveing"
              />
            </div>

            <slot
              v-if="slotNameIsDefault === false"
              :name="`${slide[slotNameKey] || slide.slotName || index}-right`"
              :item="slide"
              :index="index"
              :is-slider-moveing="isSliderMoveing"
            />
            <slot
              v-else
              name="default-right"
              :item="slide"
              :index="index"
              :is-slider-moveing="isSliderMoveing"
            />
          </div>

          <slot
            v-if="slotNameIsDefault === false"
            :name="`${slide[slotNameKey] || slide.slotName || index}-bottom`"
            :item="slide"
            :index="index"
            :is-slider-moveing="isSliderMoveing"
          />
          <slot
            v-else
            name="default-bottom"
            :item="slide"
            :index="index"
            :is-slider-moveing="isSliderMoveing"
          />
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
    default: true
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
  },
  swiperHeight: {
    type: [String, Number],
    default: ''
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
  'slideChangeTransitionEnd',
  'sliderMove',
  'reachBeginning',
  'reachEnd',
  'fromEdge',
  'activeIndexChange',
  'beforeTransitionStart',
  'realIndexChange'
]);

const nextRef = ref(null);
const prevRef = ref(null);
const paginationRef = ref(null);
const scrollbarRef = ref(null);
const swiperRef = ref(null);

const swiperObj = ref(null);
const params = ref(null);
const isSliderMoveing = ref(false);

const cssVariable = computed(() => {
  const _cssVariable = {};

  if (typeof props.overflow === 'boolean' && props.overflow === true) {
    _cssVariable['--content_wrapper_slide_height'] = '100%';
    _cssVariable['--slide_height'] = '100%';
    _cssVariable['--slide_overflow_y'] = 'auto';
    _cssVariable['--slide_overflow_x'] = 'hidden';
  }

  if (
    typeof props.shouldFillHeight === 'boolean' &&
    props.shouldFillHeight === true
  ) {
    _cssVariable['--content_wrapper_slide_height'] = '100%';
    _cssVariable['--slide_height'] = '100%';
    _cssVariable['--slide_display'] = 'flex';
    _cssVariable['--slide_flex_direction'] = 'column';
    _cssVariable['--center_flex'] = 1;
  }

  if (typeof props.swiperHeight === 'string' && props.swiperHeight !== '') {
    _cssVariable['--content_wrapper_slide_height'] = props.swiperHeight;
    _cssVariable['--slide_height'] = props.swiperHeight;
  } else if (
    props.swiperHeight !== '' &&
    isNaN(Number(props.swiperHeight)) === false
  ) {
    _cssVariable['--content_wrapper_slide_height'] = `${props.swiperHeight}px`;
    _cssVariable['--slide_height'] = `${props.swiperHeight}px`;
  } else {
    // _cssVariable["--content_wrapper_slide_height"] = "";
    _cssVariable['--slide_height'] = '';
  }

  return _cssVariable;
});

watch(
  () => props,
  async (newProps, oldProps) => {
    // handleSwiperUpdata(newProps);
    await nextTick();
    window.requestAnimationFrame(() => {
      handleSwiperUpdata(newProps);
      if (
        JSON.stringify(newProps.slideList) !==
        JSON.stringify(oldProps.slideList)
      ) {
        syncSlideList(newProps.slideList, swiperObj.value);
      }

      const newModelValue =
        newProps.loop === true ? `${newProps.modelValue}` : props.modelValue;
      // const oldModelValue =
      //   newProps.loop === true ? `${oldProps.modelValue}` : oldProps.modelValue;

      // if (newModelValue !== oldModelValue) {
      //   syncSlide(newModelValue, swiperObj.value);
      // }

      syncSlide(newModelValue, swiperObj.value);
    });
  },
  {
    deep: true
  }
);
// watch(
//   () => props.modelValue,
//   (newModelValue) => {
//     syncSlide(newModelValue, swiperObj.value);
//   },
//   {
//     deep: true
//   }
// );
// watch(
//   () => props.slideList,
//   (newSlideList) => {
//     syncSlideList(newSlideList, swiperObj.value);
//   },
//   {
//     deep: true
//   }
// );

onMounted(() => {
  handleSwiperInit();
});

function handleSwiperInit() {
  const _params = {
    modules: [],
    centeredSlides: props.centeredSlides,
    slidesPerView: props.slidesPerView,
    spaceBetween: props.spaceBetween,
    longSwipesRatio: props.longSwipesRatio,
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
      beforeTransitionStart,
      realIndexChange,
      slideChangeTransitionEnd
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
      spaceBetween: newProps.spaceBetween,
      longSwipesRatio: newProps.longSwipesRatio
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
    (slide) =>
      (props.loop === true &&
        (`${slide?.[props.valueKey]}` === value ||
          `${slide?.value}` === value)) ||
      (props.loop === false &&
        (slide?.[props.valueKey] === value || slide?.value === value))
  );
  const slideIndex =
    typeof _slideIndex === 'number' && _slideIndex > -1 ? _slideIndex : value;

  if (Number(slideIndex) !== swiper.realIndex) {
    if (props.loop === true) {
      swiper.slideToLoop(slideIndex || 0);
    } else {
      swiper.slideTo(slideIndex || 0);
    }
  }
}
function syncSlideList(newSlideList = [], swiper) {
  if (
    typeof swiper?.slideTo !== 'function' ||
    Array.isArray(newSlideList) === false ||
    newSlideList.length <= 0
  ) {
    return;
  }
  const _slideIndex = newSlideList.findIndex(
    (slide) =>
      slide?.[props.valueKey] === props.modelValue ||
      slide?.value === props.modelValue
  );
  const slideIndex =
    typeof _slideIndex === 'number' && _slideIndex > -1
      ? _slideIndex
      : props.modelValue;
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
  if (props.loop === true) {
    const slideValueEl = swiper.slides[swiper.activeIndex];
    const slideValue = slideValueEl?.getAttribute('swiper-loop-value');

    if (`${props.modelValue}` !== slideValue) {
      emit('update:modelValue', slideValue, swiper.activeIndex);
      emit('change', slideValue, swiper.activeIndex);
    }
  } else {
    // const slideData = props.slideList[swiper.activeIndex];
    // const slideValue =
    //   slideData?.[props.valueKey] || slideData?.value || swiper.activeIndex;
    const slideData = props.slideList[swiper.realIndex];
    const slideValue =
      slideData?.[props.valueKey] || slideData?.value || swiper.realIndex;

    if (props.modelValue !== slideValue) {
      emit(
        'update:modelValue',
        isNaN(slideValue) ? slideValue : Number(slideValue)
      );
      emit('change', isNaN(slideValue) ? slideValue : Number(slideValue));
    }
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
function realIndexChange(swiper) {
  emit('realIndexChange', swiper);
}
function slideChangeTransitionEnd(swiper) {
  emit('slideChangeTransitionEnd', swiper);
}
function resetMoveingStatus() {
  isSliderMoveing.value = false;
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
        display: var(--slide_display);
        flex-direction: var(--slide_flex_direction);

        // height: var(--content_wrapper_slide_height);
        height: var(--slide_height);

        &-center {
          position: relative;
          flex: var(--center_flex);
          display: flex;
          height: var(--content_wrapper_slide_height);
          max-height: var(--content_wrapper_slide_height);

          &-middle {
            flex: 1;
            position: relative;
            height: var(--content_wrapper_slide_height);
            overflow-y: var(--slide_overflow_y);
            overflow-x: var(--slide_overflow_x);
          }
        }
      }
    }
  }
}
</style>
