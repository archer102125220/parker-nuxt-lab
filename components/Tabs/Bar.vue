<template>
  <div
    ref="tabBarRootRef"
    class="tabs_bar"
    :style="cssVariable"
    @wheel.stop.prevent="handleWheelScroll"
    @resize="handleResize"
  >
    <div
      v-if="hasNavigation === true && showPrev === true"
      class="tabs_bar-prev_position"
    >
      <slot name="prev" @pointerup="handlePrevScroll">
        <div
          v-ripple="loading === false && ripple === true"
          class="tabs_bar-prev_position-prev"
          @pointerup="handlePrevScroll"
        >
          <img class="tabs_bar-prev_position-prev-img" :src="navigationImg" />
        </div>
      </slot>
    </div>

    <div class="tabs_bar-first_limit_shadow" />

    <div
      ref="tabBarRef"
      :class="[
        'tabs_bar-option_list',
        validSelectedType !== false ? 'tabs_bar-option_list_emphasize' : ''
      ]"
      v-scroll-end="{
        handler: handleTabBarScrollEnd,
        wait: scrollEndWait
      }"
      @scroll="handleScroll"
      @mousedown="handleStartTabBarScroll"
      @mousemove="handleTabBarScroll"
      @mouseover="handleStopTabBarScroll"
      @mouseup="handleStopTabBarScroll"
      @touchstart="handleStartTabBarScroll"
      @touchmove="handleTabBarScroll"
      @touchend="handleStopTabBarScroll"
      @touchcancel="handleStopTabBarScroll"
      @transitionend="optionTransitionEnd"
    >
      <div
        v-for="(tab, index) in tabList"
        :key="index"
        ref="tabListRef"
        v-ripple="loading === false && ripple === true"
        :class="[
          'tabs_bar-option_list-tab_item',
          isSelected(modelValue, tab, index) === true
            ? 'tabs_bar-option_list-tab_item_selected'
            : ''
        ]"
        @mouseenter="handleBottomeStyleTemp"
        @mouseleave="handleResetBottomeStyleTemp"
        @click="handleTabChange(index)"
      >
        <slot
          :tab="tab"
          :index="index"
          :selected="isSelected(modelValue, tab, index)"
        >
          <p>{{ tab[displayKey] || tab.label || tab }}</p>
        </slot>
      </div>
      <slot v-if="tabList.length <= 0" name="empty">
        <p class="tabs_bar-option_list-empty">{{ empty }}</p>
      </slot>
    </div>

    <div class="tabs_bar-last_limit_shadow" />

    <div
      v-if="hasNavigation === true && showNext === true"
      class="tabs_bar-next_position"
    >
      <slot name="next" @pointerup="handleNextScroll">
        <div
          v-ripple="loading === false && ripple === true"
          class="tabs_bar-next_position-next"
          @pointerup="handleNextScroll"
        >
          <img class="tabs_bar-next_position-next-img" :src="navigationImg" />
        </div>
      </slot>
    </div>
  </div>
</template>
<script setup>
const SCROLL_STEP = 150;
const SELECTED_TRANSITION =
  'left 0.4s ease-in-out, top 0.4s ease-in-out, width 0.4s 0.1s';
const IS_KEEP_SCROLL_LIMIT = 50;
const LIMIT_SHADOW_SIZE = 60;
const SELECTED_TYPE_LIST = ['borderSide', 'mask'];

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [Number, String],
    default: 0
  },
  justifyContent: {
    type: String,
    default: 'flex-start'
  },
  empty: {
    type: String,
    default: '暫無資料'
  },
  tabItemWidth: {
    type: String,
    default: null
  },
  tabItemTextAlign: {
    type: String,
    default: null
  },
  alignItems: {
    type: String,
    default: 'center'
  },
  hasNavigation: {
    type: Boolean,
    default: true
  },
  isNavigationAbsolute: {
    type: Boolean,
    default: false
  },
  vertical: {
    type: Boolean,
    default: false
  },
  hover: {
    type: Boolean,
    default: false
  },
  gap: {
    type: [Number, String],
    default: null
  },
  borderSideDistance: {
    type: [Number, String],
    default: null
  },
  leftLineDistance: {
    type: [Number, String],
    default: null
  },
  tabList: {
    type: Array,
    default: () => []
  },
  displayKey: {
    type: [Number, String],
    default: null
  },
  valueKey: {
    type: [Number, String],
    default: null
  },
  selectedType: {
    type: String,
    default: 'borderSide'
  },
  borderSideColor: {
    type: String,
    default: ''
  },
  selectedColor: {
    type: String,
    default: ''
  },
  borderSideFullWidth: {
    type: Boolean,
    default: false
  },
  borderSideWidth: {
    type: [Number, String],
    default: 30
  },
  borderSideHeight: {
    type: [Number, String],
    default: 10
  },
  scrollDisable: {
    type: Boolean,
    default: false
  },
  blankAtTheEnd: {
    type: Boolean,
    default: false
  },
  limitShadow: {
    type: Boolean,
    default: null
  },
  scrollEndWait: {
    type: Number,
    default: null
  },
  moveTransition: {
    type: Boolean,
    default: null
  },
  lineBorderRadius: {
    type: [Number, String],
    default: null
  },
  ripple: {
    type: Boolean,
    default: true
  },
  tabListUpdateCurrentFocus: {
    type: Boolean,
    default: true
  }
});
const emits = defineEmits([
  'update:modelValue',
  'change',
  'scroll',
  'horizontalScroll',
  'verticalScroll',
  'scrollEnd'
]);

const tabBarRootRef = ref(null);
const tabBarRef = useTemplateRef('tabBarRef'); // vue 3.5之後官方推薦的取得dom的寫法
// const tabBarRef = ref(null); // vue 3.5之前取得dom的寫法
const tabListRef = ref(null);

const observer = ref(null);
const mouseDown = ref(false);
const isAutoScroll = ref(false);
const nextDisable = ref(false);
const prevDisable = ref(false);
const startX = ref(0);
const startY = ref(0);
const scrollLeft = ref(0);
const scrollTop = ref(0);
const prevOpacity = ref(1);
const nextOpacity = ref(1);
const showPrev = ref(true);
const showNext = ref(true);
const selectedTransition = ref(SELECTED_TRANSITION);

const isKeepScroll = ref(false);
const scrollTimer = ref(-1);
const animationFrameTimer = ref(-1);

const firstLimitShadowSize = ref(0);
const lastLimitShadowSize = ref(0);
const resetLimitShadowSizeTimer = ref(-1);

const borderSideStyle = ref({});
const borderSideStyleTemp = ref(null);

const computedLimitShadow = computed(() => {
  if (typeof props.limitShadow !== 'boolean') {
    return props.vertical;
  }
  return props.limitShadow;
});
const computedMoveTransition = computed(() => {
  if (typeof props.moveTransition !== 'boolean') {
    return props.vertical === false;
  }
  return props.moveTransition;
});
const validSelectedType = computed(() => {
  return SELECTED_TYPE_LIST.includes(props.selectedType);
});
const cssVariable = computed(() => {
  const _cssVariable = {
    ...(borderSideStyleTemp.value || borderSideStyle.value),
    '--prev_opacity': prevOpacity.value,
    '--next_opacity': nextOpacity.value,
    '--selected_transition':
      computedMoveTransition.value === false ? '' : selectedTransition.value
  };

  if (validSelectedType.value === true) {
    if (
      typeof props.lineBorderRadius === 'string' &&
      props.lineBorderRadius !== ''
    ) {
      _cssVariable['--tab_border_side_border_radius'] = props.lineBorderRadius;
    } else if (typeof props.lineBorderRadius === 'number') {
      _cssVariable['--tab_border_side_border_radius'] =
        `${props.lineBorderRadius}px`;
    }

    if (props.selectedType === 'borderSide') {
      _cssVariable['--tab_border_side_bottom'] = '0px';
      if (Array(props.tabList) && props.tabList.length > 0) {
        if (props.vertical === false) {
          if (typeof props.borderSideHeight === 'number') {
            _cssVariable['--tab_border_side_height'] =
              `${props.borderSideHeight}px`;
          } else if (
            typeof props.borderSideHeight === 'string' &&
            props.borderSideHeight !== ''
          ) {
            _cssVariable['--tab_border_side_height'] = props.borderSideHeight;
          }
        } else {
          _cssVariable['--tab_bar_min_width'] = '100%';
        }

        if (props.borderSideFullWidth !== true) {
          if (typeof props.borderSideWidth === 'number') {
            _cssVariable['--tab_border_side_width'] =
              `${props.borderSideWidth}px`;
          } else if (
            typeof props.borderSideWidth === 'string' &&
            props.borderSideWidth !== '' &&
            props.borderSideWidth !== '100%'
          ) {
            _cssVariable['--tab_border_side_width'] = props.borderSideWidth;
          }
        }
      } else {
        _cssVariable['--tab_border_side_width'] = '0px';
        _cssVariable['--tab_border_side_height'] = '0px';
        _cssVariable['--tab_bar_min_width'] = '100%';
      }
    } else if (props.selectedType === 'mask') {
      // _cssVariable['--tab_border_side_height'] = '100%';
      _cssVariable['--tab_border_side_opacity'] = '0.1';
    }
  } else {
    _cssVariable['--tab_bar_min_width'] = '100%';
  }

  if (
    typeof props.borderSideColor === 'string' &&
    props.borderSideColor !== ''
  ) {
    _cssVariable['--tab_border_side_color'] = props.borderSideColor;
  }

  if (typeof props.selectedColor === 'string' && props.selectedColor !== '') {
    _cssVariable['--tab_item_selected_color'] = props.selectedColor;
  }

  if (typeof props.justifyContent === 'string' && props.justifyContent !== '') {
    _cssVariable['--tab_bar_justify_content'] = props.justifyContent;
  }

  if (typeof props.alignItems === 'string' && props.alignItems !== '') {
    _cssVariable['--tab_bar_align_items'] = props.alignItems;
  }

  if (typeof props.gap === 'number') {
    _cssVariable['--tab_gap'] = `${props.gap}px`;
  } else if (typeof props.gap === 'string' && props.gap !== '') {
    _cssVariable['--tab_gap'] = props.gap;
  }

  if (typeof props.borderSideDistance === 'number') {
    _cssVariable['--tab_bar_border_side_distance'] =
      `${props.borderSideDistance}px`;
  } else if (
    typeof props.borderSideDistance === 'string' &&
    props.borderSideDistance !== ''
  ) {
    _cssVariable['--tab_bar_border_side_distance'] = props.borderSideDistance;
  }

  if (typeof props.leftLineDistance === 'number') {
    _cssVariable['--tab_bar_left_line_distance'] =
      `${props.leftLineDistance}px`;
  } else if (
    typeof props.leftLineDistance === 'string' &&
    props.leftLineDistance !== ''
  ) {
    _cssVariable['--tab_bar_left_line_distance'] = props.leftLineDistance;
  }

  if (props.isNavigationAbsolute === true) {
    _cssVariable['--navigation_position'] = 'absolute';
    if (props.vertical === true) {
      _cssVariable['--prev_top'] = '0px';
      _cssVariable['--next_bottom'] = '0px';
    } else {
      _cssVariable['--prev_left'] = '0px';
      _cssVariable['--next_right'] = '0px';
    }
  }

  if (props.vertical === true) {
    _cssVariable['--tab_border_side_bottom'] = 'unset';
    _cssVariable['--tab_flex_direction'] = 'column';
    _cssVariable['--navigation_width'] = '100%';
    _cssVariable['--navigation_img_size'] = '24px';
    _cssVariable['--navigation_bottom_right_radius'] = '15px';
    _cssVariable['--navigation_bottom_left_radius'] = '15px';
    // _cssVariable['--navigation_background'] =
    //   'linear-gradient(to bottom, transparent, #0000005c 80%)';

    if (isNaN(Number(props.tabItemWidth)) === false) {
      _cssVariable['--tab_item_width'] = `${props.tabItemWidth}px`;
    } else if (
      typeof props.tabItemWidth === 'string' &&
      props.tabItemWidth !== ''
    ) {
      _cssVariable['--tab_item_width'] = props.tabItemWidth;
    }
    if (
      typeof props.tabItemTextAlign === 'string' &&
      props.tabItemTextAlign !== ''
    ) {
      _cssVariable['--tab_item_text_align'] = props.tabItemTextAlign;
    }

    if (computedLimitShadow.value === true) {
      _cssVariable['--first_limit_shadow_left'] = '-2px';
      _cssVariable['--first_limit_shadow_right'] = '-2px';
      _cssVariable['--last_limit_shadow_left'] = '-2px';
      _cssVariable['--last_limit_shadow_right'] = '-2px';
      _cssVariable['--first_limit_shadow_width'] = 'unset';
      _cssVariable['--last_limit_shadow_width'] = 'unset';
      _cssVariable['--first_limit_shadow_bottom'] = 'unset';
      _cssVariable['--last_limit_shadow_top'] = 'unset';

      if (firstLimitShadowSize.value > 0) {
        _cssVariable['--first_limit_shadow_top'] = `-${
          firstLimitShadowSize.value * 0.7
        }px`;
        _cssVariable['--first_limit_shadow_height'] =
          `${firstLimitShadowSize.value}px`;
      } else {
        _cssVariable['--first_limit_shadow_top'] = `-${
          LIMIT_SHADOW_SIZE * 2
        }px`;
        _cssVariable['--first_limit_shadow_height'] = '0px';
      }

      if (lastLimitShadowSize.value > 0) {
        _cssVariable['--last_limit_shadow_bottom'] = `-${
          lastLimitShadowSize.value * 0.7
        }px`;
        _cssVariable['--last_limit_shadow_height'] =
          `${lastLimitShadowSize.value}px`;
      } else {
        _cssVariable['--last_limit_shadow_bottom'] = `-${
          LIMIT_SHADOW_SIZE * 2
        }px`;
        _cssVariable['--last_limit_shadow_height'] = '0px';
      }
    }
  } else {
    // if (
    //   typeof tabBarRootRef.value === 'object' &&
    //   tabBarRootRef.value !== null
    // ) {
    //   const tabBarRootStyle = window.getComputedStyle(tabBarRootRef.value);
    //   _cssVariable['--tab_border_side_bottom'] =
    //     `-${tabBarRootStyle.borderSideDistance}`;
    // } else {
    //   _cssVariable['--tab_border_side_bottom'] = '0px';
    // }
    _cssVariable['--tab_border_side_bottom'] = '0px';

    _cssVariable['--tab_flex_direction'] = 'row';
    _cssVariable['--navigation_width'] = '24px';
    _cssVariable['--navigation_top_right_radius'] = '15px';
    _cssVariable['--navigation_bottom_right_radius'] = '15px';
    // _cssVariable['--navigation_background'] =
    //   'linear-gradient(to right, transparent, #0000005c 80%)';

    if (computedLimitShadow.value === true) {
      _cssVariable['--first_limit_shadow_top'] = '-2px';
      _cssVariable['--first_limit_shadow_bottom'] = '-2px';
      _cssVariable['--last_limit_shadow_top'] = '-2px';
      _cssVariable['--last_limit_shadow_bottom'] = '-2px';
      _cssVariable['--first_limit_shadow_height'] = 'unset';
      _cssVariable['--last_limit_shadow_height'] = 'unset';
      _cssVariable['--first_limit_shadow_right'] = 'unset';
      _cssVariable['--last_limit_shadow_left'] = 'unset';

      if (firstLimitShadowSize.value > 0) {
        _cssVariable['--first_limit_shadow_left'] = `-${
          firstLimitShadowSize.value * 0.7
        }px`;
        _cssVariable['--first_limit_shadow_width'] =
          `${firstLimitShadowSize.value}px`;
      } else {
        _cssVariable['--first_limit_shadow_left'] = `-${
          LIMIT_SHADOW_SIZE * 2
        }px`;
        _cssVariable['--first_limit_shadow_width'] = '0px';
      }

      if (lastLimitShadowSize.value > 0) {
        _cssVariable['--last_limit_shadow_right'] = `-${
          lastLimitShadowSize.value * 0.7
        }px`;
        _cssVariable['--last_limit_shadow_width'] =
          `${lastLimitShadowSize.value}px`;
      } else {
        _cssVariable['--last_limit_shadow_right'] = `-${
          LIMIT_SHADOW_SIZE * 2
        }px`;
        _cssVariable['--last_limit_shadow_width'] = '0px';
      }
    }
  }

  if (props.blankAtTheEnd === true) {
    if (props.vertical === true) {
      _cssVariable['--tab_bar_border_side_distance'] = '40px';
    } else {
      _cssVariable['--tab_bar_right_line_distance'] = '20px';
    }
  }

  return _cssVariable;
});
const navigationImg = computed(() => {
  return props.vertical === true
    ? '/img/icon/arrow/arrow-down-line-black.svg'
    : '/img/icon/arrow/arrow-right-line-black.svg';
});

watch(
  () => props.modelValue,
  async (newValue) => {
    await nextTick();
    if (Array.isArray(tabListRef.value) === true) {
      window.requestAnimationFrame(() => {
        const tabRef = tabListRef.value?.[getCurrentTabIndex(newValue) || 0];
        handleBottomeStyle(tabRef);
        handleCheckTab(tabRef);
      });
    }
  }
);
watch(
  () => props.tabList,
  async (newTabList = [], oldTabList = []) => {
    if (
      props.tabListUpdateCurrentFocus === false &&
      newTabList.length === oldTabList.length
    ) {
      return;
    }

    if (
      JSON.stringify(newTabList) !== JSON.stringify(oldTabList) &&
      Array.isArray(tabListRef.value) === true
    ) {
      const tabRef =
        tabListRef.value?.[getCurrentTabIndex(props.modelValue) || 0];
      handleBottomeStyle(tabRef);
      handleCheckTab(tabRef);
    }
    if (props.vertical === true) {
      tabBarRef.value.scrollTo({
        top: 0,
        // behavior: 'smooth',
        behavior: 'instant'
      });
    } else if (
      JSON.stringify(newTabList) !== JSON.stringify(oldTabList) &&
      props.vertical === false
    ) {
      tabBarRef.value.scrollTo({
        left: 0,
        // behavior: 'smooth',
        behavior: 'instant'
      });
    }
    await nextTick();
    selectedTransition.value = '';

    if (
      Array.isArray(tabListRef.value) === true &&
      Array.isArray(newTabList) === true &&
      newTabList.length > 0
    ) {
      const tab = tabListRef.value?.[getCurrentTabIndex(props.modelValue) || 0];
      handleBottomeStyle(tab);
      handleCheckTab(tab);

      await nextTick();
      window.requestAnimationFrame(() => {
        selectedTransition.value = SELECTED_TRANSITION;
      });
    }
  },
  {
    deep: true
  }
);
watch(
  () => nextOpacity.value,
  (newNextOpacity) => {
    nextDisable.value = newNextOpacity === 0;
    if (props.isNavigationAbsolute === true) {
      nextTick(() => {
        window.requestAnimationFrame(() => {
          showNext.value = newNextOpacity === 1;
        });
      });
    }
  }
);
watch(
  () => prevOpacity.value,
  (newPrevOpacity) => {
    prevDisable.value = newPrevOpacity === 0;
    if (props.isNavigationAbsolute === true) {
      nextTick(() => {
        window.requestAnimationFrame(() => {
          showPrev.value = newPrevOpacity === 1;
        });
      });
    }
  }
);

onMounted(() => {
  handleCalculateNavigationShow(0 - SCROLL_STEP, SCROLL_STEP);
  document.addEventListener('mousemove', handleTabBarScroll);
  document.addEventListener('mouseup', handleStopTabBarScroll);
  document.addEventListener('touchmove', handleTabBarScroll, {
    passive: false
  });

  window.addEventListener('contextmenu', handleStopTabBarScroll);
  window.addEventListener('resize', handleResize);
  nextTick(() =>
    // css等畫面設置完全生效後再計算底線/遮罩的位置高度為多少
    window.requestAnimationFrame(handleResize)
  );

  observer.value = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      handleResize();
    }
  });

  observer.value.observe(tabBarRef.value);
});
onBeforeUnmount(() => {
  document.removeEventListener('mousemove', handleTabBarScroll);
  document.removeEventListener('mouseup', handleStopTabBarScroll);
  document.removeEventListener('touchmove', handleTabBarScroll);

  window.removeEventListener('contextmenu', handleStopTabBarScroll);
  window.removeEventListener('resize', handleResize);
  if (typeof tabBarRef.value === 'object' && tabBarRef.value !== null) {
    observer.value.unobserve(tabBarRef.value);
  }
});

function optionTransitionEnd() {
  nextTick(() =>
    window.requestAnimationFrame(() => {
      const tab =
        tabListRef?.value?.[getCurrentTabIndex(props.modelValue) || 0];
      handleBottomeStyle(tab);
    })
  );
}

function handleResize() {
  const tabRef = tabListRef.value?.[getCurrentTabIndex(props.modelValue) || 0];
  handleBottomeStyle(tabRef);
  handleCheckTab(tabRef);
}
function handleWheelScroll(event) {
  let scrollStep = SCROLL_STEP;

  let mouseScroll;
  if (props.vertical === true) {
    mouseScroll = tabBarRef.value.scrollTop;
  } else {
    mouseScroll = tabBarRef.value.scrollLeft;
  }

  if (
    (event?.deltaX !== 0 && event?.deltaX > 0) ||
    (event?.deltaY !== 0 && event?.deltaY > 0)
  ) {
    mouseScroll += SCROLL_STEP;
  } else {
    mouseScroll += SCROLL_STEP * -1;
    scrollStep = SCROLL_STEP * -1;
  }
  mouseScroll += Math.min(Math.max(0.125, mouseScroll), 4);

  // if (props.vertical === true) {
  //   tabBarRef.value.scrollTo({
  //     top: mouseScroll,
  //     behavior: 'smooth'
  //   });
  // } else {
  //   tabBarRef.value.scrollTo({
  //     left: mouseScroll,
  //     behavior: 'smooth'
  //   });
  // }
  handleCustomKeepScroll(
    mouseScroll,
    (event?.deltaX !== 0 && event?.deltaX > 0) ||
      (event?.deltaY !== 0 && event?.deltaY > 0)
  );

  handleCalculateNavigationShow(scrollStep, 0 - scrollStep);
}

function getCurrentTabIndex(tab) {
  const _tabIndex = props.tabList.findIndex(
    (_tab) => _tab?.[props.valueKey] === tab || _tab?.value === tab
  );
  return typeof _tabIndex === 'number' && _tabIndex > -1 ? _tabIndex : tab;
}
function isSelected(modelValue, tab, index) {
  const value = tab?.[props.valueKey] || tab?.value || index;
  return modelValue === value;
}

function handlePrevScroll() {
  if (prevDisable.value === true) return;
  handleCalculateNavigationShow(0 - SCROLL_STEP, SCROLL_STEP);
  if (props.vertical === true) {
    tabBarRef.value.scrollTo({
      top: tabBarRef.value.scrollTop - SCROLL_STEP,
      behavior: 'smooth'
    });
  } else {
    tabBarRef.value.scrollTo({
      left: tabBarRef.value.scrollLeft - SCROLL_STEP,
      behavior: 'smooth'
    });
  }
}
function handleNextScroll() {
  if (nextDisable.value === true) return;
  handleCalculateNavigationShow(SCROLL_STEP, 0 - SCROLL_STEP);
  if (props.vertical === true) {
    tabBarRef.value.scrollTo({
      top: tabBarRef.value.scrollTop + SCROLL_STEP,
      behavior: 'smooth'
    });
  } else {
    tabBarRef.value.scrollTo({
      left: tabBarRef.value.scrollLeft + SCROLL_STEP,
      behavior: 'smooth'
    });
  }
}

function handleCalculateNavigationShow(prevScrollStep = 0, nextScrollStep = 0) {
  if (props.hasNavigation === false) return;
  let _prevOpacity = prevOpacity.value;
  let _nextOpacity = nextOpacity.value;

  const _tabBarRef = tabBarRef.value;
  const _tabListRef = tabListRef.value || [];
  const firstTabRef = _tabListRef[0];
  const lastTabRef = _tabListRef[_tabListRef.length - 1];

  const firstTabBoundingClientRect = firstTabRef?.getBoundingClientRect();
  const lastTabBoundingClientRect = lastTabRef?.getBoundingClientRect();
  const tabBarBoundingClientRect = _tabBarRef.getBoundingClientRect();

  if (props.vertical === true) {
    if (
      firstTabBoundingClientRect.bottom >= tabBarBoundingClientRect.top &&
      lastTabBoundingClientRect.bottom <= tabBarBoundingClientRect.bottom
    ) {
      _prevOpacity = 0;
      _nextOpacity = 0;
    } else {
      if (
        firstTabBoundingClientRect.top > 0 &&
        Math.floor(firstTabBoundingClientRect.bottom + prevScrollStep) <=
          Math.floor(tabBarBoundingClientRect.top)
      ) {
        _prevOpacity = 0;
      } else {
        _prevOpacity = 1;
      }

      if (
        Math.floor(lastTabBoundingClientRect.bottom + nextScrollStep) <=
        Math.floor(tabBarBoundingClientRect.bottom)
      ) {
        _nextOpacity = 0;
      } else {
        _nextOpacity = 1;
      }
    }
  } else {
    if (
      firstTabBoundingClientRect.right >= tabBarBoundingClientRect.left &&
      lastTabBoundingClientRect.right <= tabBarBoundingClientRect.right
    ) {
      _prevOpacity = 0;
      _nextOpacity = 0;
    } else {
      if (
        firstTabBoundingClientRect.right > 0 &&
        Math.floor(firstTabBoundingClientRect.right + prevScrollStep) <=
          Math.floor(tabBarBoundingClientRect.left)
      ) {
        _prevOpacity = 0;
      } else {
        _prevOpacity = 1;
      }

      if (
        Math.floor(lastTabBoundingClientRect.right + nextScrollStep) <=
        Math.floor(tabBarBoundingClientRect.right)
      ) {
        _nextOpacity = 0;
      } else {
        _nextOpacity = 1;
      }
    }
  }

  prevOpacity.value = _prevOpacity;
  nextOpacity.value = _nextOpacity;
}
function handleNavigationShow() {
  if (props.hasNavigation === false) return;

  const _tabBarRef = tabBarRef.value;
  const _tabListRef = tabListRef.value || [];
  const firstTabRef = _tabListRef[0];
  const lastTabRef = _tabListRef[_tabListRef.length - 1];

  const firstTabBoundingClientRect = firstTabRef?.getBoundingClientRect();
  const lastTabBoundingClientRect = lastTabRef?.getBoundingClientRect();
  const tabBarBoundingClientRect = _tabBarRef.getBoundingClientRect();

  if (props.vertical === true) {
    if (
      Math.floor(firstTabBoundingClientRect.top) ===
      Math.floor(tabBarBoundingClientRect.top)
    ) {
      prevOpacity.value = 0;
    } else {
      prevOpacity.value = 1;
    }
    if (
      Math.floor(lastTabBoundingClientRect.bottom) ===
      Math.floor(tabBarBoundingClientRect.bottom)
    ) {
      nextOpacity.value = 0;
    } else {
      nextOpacity.value = 1;
    }
  } else {
    if (
      Math.floor(firstTabBoundingClientRect.left) ===
      Math.floor(tabBarBoundingClientRect.left)
    ) {
      prevOpacity.value = 0;
    } else {
      prevOpacity.value = 1;
    }
    if (
      Math.floor(lastTabBoundingClientRect.right) ===
      Math.floor(tabBarBoundingClientRect.right)
    ) {
      nextOpacity.value = 0;
    } else {
      nextOpacity.value = 1;
    }
  }
}

function getSelectedStyle(tab) {
  const borderSideStyle = {};

  if (
    validSelectedType.value === true &&
    typeof tab === 'object' &&
    tab !== null
  ) {
    if (props.vertical === true) {
      borderSideStyle['--tab_border_side_height'] = `${tab.clientHeight}px`;

      borderSideStyle['--tab_border_side_left'] = '0px';
      if (
        props.selectedType === 'mask' ||
        (typeof props.borderSideHeight !== 'number' &&
          typeof props.borderSideHeight !== 'string') ||
        props.borderSideHeight === ''
      ) {
        borderSideStyle['--tab_border_side_height'] = `${tab.clientHeight}px`;
        borderSideStyle['--tab_border_side_top'] = `${tab.offsetTop}px`;
      } else {
        borderSideStyle['--tab_border_side_top'] = `calc(${
          tab.offsetTop + tab.clientHeight / 2
        }px - var(--tab_border_side_height, 0px) / 2)`;
      }
    } else if (props.vertical === false) {
      borderSideStyle['--tab_border_side_top'] = 'unset';
      if (
        props.selectedType === 'mask' ||
        (typeof props.borderSideWidth !== 'number' &&
          typeof props.borderSideWidth !== 'string') ||
        props.borderSideWidth === ''
      ) {
        borderSideStyle['--tab_border_side_width'] = `${tab.clientWidth}px`;
        borderSideStyle['--tab_border_side_left'] = `${tab.offsetLeft}px`;
      } else {
        borderSideStyle['--tab_border_side_left'] = `calc(${
          tab.offsetLeft + tab.clientWidth / 2
        }px - var(--tab_border_side_width, 0px) / 2)`;

        if (
          (typeof props.borderSideWidth !== 'number' &&
            typeof props.borderSideWidth !== 'string') ||
          props.borderSideWidth === '' ||
          props.borderSideWidth === '100%' ||
          props.borderSideFullWidth === true
        ) {
          borderSideStyle['--tab_border_side_width'] = `${tab.clientWidth}px`;
        }
      }
    }

    if (props.selectedType === 'mask') {
      if (props.vertical === true) {
        borderSideStyle['--tab_border_side_width'] = `${tab.clientWidth}px`;
      } else {
        borderSideStyle['--tab_border_side_height'] = `${tab.clientHeight}px`;
      }
    }
  }

  return borderSideStyle;
}

function handleBottomeStyle(tab) {
  borderSideStyle.value = getSelectedStyle(tab);
}

function handleBottomeStyleTemp(_tab) {
  if (props.hover === false) return;
  const tab = _tab?.target || _tab;
  borderSideStyleTemp.value = getSelectedStyle(tab);
}
function handleResetBottomeStyleTemp() {
  if (props.hover === false) return;
  borderSideStyleTemp.value = null;
}
function handleCheckTab(tabListRef) {
  if (animationFrameTimer.value !== -1) {
    window.cancelAnimationFrame(animationFrameTimer.value);
    animationFrameTimer.value = -1;
  }
  isAutoScroll.value = true;

  const isNeedScroll = handleIsNeedScroll(tabListRef);

  if (isNeedScroll.verticalBufferScroll === true) {
    tabBarRef.value.scrollTo({
      top: tabListRef.offsetTop,
      behavior: 'smooth'
    });
  } else if (isNeedScroll.verticalScroll === true) {
    tabBarRef.value.scrollTo({
      top: tabListRef.offsetTop - tabBarRef.value.clientHeight * 0.8,
      behavior: 'smooth'
    });
  } else if (isNeedScroll.horizontalScroll === true) {
    tabBarRef.value.scrollTo({
      left: tabListRef.offsetLeft,
      behavior: 'smooth'
    });
  } else if (isNeedScroll.horizontalBufferScroll === true) {
    tabBarRef.value.scrollTo({
      left: tabListRef.offsetLeft - tabBarRef.value.clientWidth * 0.8,
      behavior: 'smooth'
    });
  }
}

function handleTabChange(newTabIndex) {
  if (props.loading === true) return;
  const newTab = props.tabList[newTabIndex]?.[props.valueKey] || newTabIndex;

  const tab = tabListRef.value?.[newTabIndex];
  const isNeedScroll = handleIsNeedScroll(tab) || {};

  emits('update:modelValue', newTab, newTabIndex, isNeedScroll);
  emits('change', newTab, newTabIndex, isNeedScroll);
}
function handleIsNeedScroll(tabRef) {
  const _tabBarRef = tabBarRef.value;
  const tabBarRefBoundingClientRect =
    _tabBarRef?.getBoundingClientRect?.() || {};

  const boundingClientRect = tabRef?.getBoundingClientRect?.();

  const tabRefClientHeight = tabRef?.clientHeight || 0;
  const tabRefTop = boundingClientRect?.y + tabRefClientHeight;
  const tabBarRefClientHeight = _tabBarRef?.clientHeight;
  const tabBarRefTop = tabBarRefBoundingClientRect.top;

  const tabRefClientWidth = tabRef?.clientWidth || 0;
  const tabRefLeft = boundingClientRect?.x + tabRefClientWidth;
  const tabBarRefClientWidth = _tabBarRef?.clientWidth;
  const tabBarRefLeft = tabBarRefBoundingClientRect.left;

  const verticalBufferScroll =
    props.vertical === true &&
    (tabRefTop - tabBarRefTop <= tabRefClientHeight / 2 ||
      tabRefTop - tabBarRefTop > tabBarRefClientHeight + 50);
  const verticalScroll =
    props.vertical === true &&
    (tabRefTop - tabBarRefTop <= 0 ||
      tabRefTop - tabBarRefTop > tabBarRefClientHeight);
  const horizontalScroll =
    props.vertical === false &&
    (tabRefLeft - tabBarRefLeft <= 0 ||
      tabRefLeft - tabBarRefLeft > tabBarRefClientWidth);
  const horizontalBufferScroll =
    props.vertical === false &&
    (tabRefLeft - tabBarRefLeft <= tabRefClientWidth / 2 ||
      tabRefLeft - tabBarRefLeft > tabBarRefClientWidth + 50);

  return {
    verticalBufferScroll,
    verticalScroll,
    horizontalBufferScroll,
    horizontalScroll
  };
}
function handleVerticalStartTabBarScroll(e) {
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

  startY.value = eventY - tabBarRef.value.offsetTop;
  scrollTop.value = tabBarRef.value.scrollTop;
}
function handleHorizontalStartTabBarScroll(e) {
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

  startX.value = eventX - tabBarRef.value.offsetLeft;
  scrollLeft.value = tabBarRef.value.scrollLeft;
}
function handleStartTabBarScroll(e) {
  if (props.scrollDisable === true) {
    mouseDown.value = false;
    resetLimitShadowSize();
    return;
  }
  e.stopPropagation();
  isAutoScroll.value = false;
  mouseDown.value = true;
  if (props.vertical === true) {
    handleVerticalStartTabBarScroll(e);
  } else {
    handleHorizontalStartTabBarScroll(e);
  }
}
function handleTabBarScrollEnd() {
  if (props.scrollDisable === true) {
    return;
  }
  emits(
    'scrollEnd',
    props.modelValue,
    getCurrentTabIndex(props.modelValue) || 0,
    true
  );
  if (isAutoScroll.value === false) return;
  // console.log(e);
  handleNavigationShow();
}

async function handleStopTabBarScroll(e) {
  mouseDown.value = false;
  resetLimitShadowSize();

  await nextTick();
  if (props.scrollDisable !== true && isKeepScroll.value === true) {
    if (isKeepScroll.value === true) {
      if (animationFrameTimer.value !== -1) {
        window.cancelAnimationFrame(animationFrameTimer.value);
        animationFrameTimer.value = -1;
      }
      if (props.vertical === true) {
        handleCustomVerticalScroll(e);
      } else {
        handleCustomHorizontalScroll(e);
      }

      isKeepScroll.value = false;
    }
  }
}

function handleVerticalTabBarScroll(e) {
  if (scrollTimer.value !== -1) {
    clearTimeout(scrollTimer.value);
  }
  if (resetLimitShadowSizeTimer.value !== -1) {
    clearTimeout(resetLimitShadowSizeTimer.value);
    resetLimitShadowSizeTimer.value = -1;
  }
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

  const y = eventY - tabBarRef.value.offsetTop;
  const scrollY = y - startY.value;

  const newScrollTop = scrollTop.value - scrollY;
  const oldScrollTop = tabBarRef.value.scrollTop;
  tabBarRef.value.scrollTop = newScrollTop;

  const scrollEndLimit = getScrollEndLimit(tabBarRef.value);
  if (computedLimitShadow.value === true && scrollEndLimit > 0) {
    let _firstLimitShadowSize = 0;
    let _lastLimitShadowSize = 0;
    if (oldScrollTop === tabBarRef.value.scrollTop) {
      if (oldScrollTop === 0) {
        _firstLimitShadowSize = LIMIT_SHADOW_SIZE;
      } else if (scrollEndLimit <= newScrollTop) {
        _lastLimitShadowSize = LIMIT_SHADOW_SIZE;
      }
    }
    firstLimitShadowSize.value = _firstLimitShadowSize;
    lastLimitShadowSize.value = _lastLimitShadowSize;

    resetLimitShadowSizeTimer.value = setTimeout(() => {
      resetLimitShadowSizeTimer.value = -1;
      if (firstLimitShadowSize.value !== 0 || lastLimitShadowSize.value !== 0) {
        resetLimitShadowSize();
      }
    }, 900);
  }

  if (Math.abs(scrollY) > IS_KEEP_SCROLL_LIMIT) {
    isKeepScroll.value = true;
    scrollTimer.value = setTimeout(() => {
      scrollTimer.value = -1;
      isKeepScroll.value = false;
    }, 100);
  }

  handleNavigationShow();
}
function handleHorizontalTabBarScroll(e) {
  if (scrollTimer.value !== -1) {
    clearTimeout(scrollTimer.value);
  }
  if (resetLimitShadowSizeTimer.value !== -1) {
    clearTimeout(resetLimitShadowSizeTimer.value);
    resetLimitShadowSizeTimer.value = -1;
  }
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

  const x = eventX - tabBarRef.value.offsetLeft;
  const scrollX = x - startX.value;

  const newScrollLeft = scrollLeft.value - scrollX;
  const oldScrollLeft = tabBarRef.value.scrollLeft;
  tabBarRef.value.scrollLeft = newScrollLeft;

  const scrollEndLimit = getScrollEndLimit(tabBarRef.value);
  if (computedLimitShadow.value === true && scrollEndLimit > 0) {
    let _firstLimitShadowSize = 0;
    let _lastLimitShadowSize = 0;
    if (oldScrollLeft === tabBarRef.value.scrollLeft) {
      if (oldScrollLeft === 0) {
        _firstLimitShadowSize = LIMIT_SHADOW_SIZE;
      } else if (scrollEndLimit <= newScrollLeft) {
        _lastLimitShadowSize = LIMIT_SHADOW_SIZE;
      }
    }
    firstLimitShadowSize.value = _firstLimitShadowSize;
    lastLimitShadowSize.value = _lastLimitShadowSize;

    resetLimitShadowSizeTimer.value = setTimeout(() => {
      resetLimitShadowSizeTimer.value = -1;
      if (firstLimitShadowSize.value !== 0 || lastLimitShadowSize.value !== 0) {
        resetLimitShadowSize();
      }
    }, 900);
  }

  if (Math.abs(scrollX) > IS_KEEP_SCROLL_LIMIT) {
    isKeepScroll.value = true;
    scrollTimer.value = setTimeout(() => {
      scrollTimer.value = -1;
      isKeepScroll.value = false;
    }, 100);
  }

  handleNavigationShow();
}
function handleTabBarScroll(e) {
  if (mouseDown.value === false || props.scrollDisable === true) {
    resetLimitShadowSize();
    return;
  }
  e.preventDefault();

  if (animationFrameTimer.value !== -1) {
    window.cancelAnimationFrame(animationFrameTimer.value);
    animationFrameTimer.value = -1;
    isKeepScroll.value = false;
  }
  if (props.vertical === true) {
    handleVerticalTabBarScroll(e);
  } else {
    handleHorizontalTabBarScroll(e);
  }
}

function resetLimitShadowSize() {
  firstLimitShadowSize.value = 0;
  lastLimitShadowSize.value = 0;
}

function handleScroll(event) {
  if (props.scrollDisable === true) {
    return;
  }
  emits('scroll', event);
}
function getScrollEndLimit(element) {
  const scrollEndLimit =
    props.vertical === true
      ? Math.max(element?.scrollHeight, element?.offsetHeight, 0) -
        (element?.clientHeight || 0)
      : Math.max(element?.scrollWidth, element?.offsetWidth, 0) -
        (element?.clientWidth || 0);

  return scrollEndLimit;
}
function handleCustomVerticalScroll(e) {
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

  const endY = eventY - tabBarRef.value.offsetTop;
  const scrollY = endY - startY.value;
  const newScrollTop = tabBarRef.value.scrollTop - scrollY;

  handleCustomKeepScroll(newScrollTop, endY < startY.value);
}
function handleCustomHorizontalScroll(e) {
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

  const endX = eventX - tabBarRef.value.offsetLeft;
  const scrollX = endX - startX.value;
  const newScrollLeft = tabBarRef.value.scrollLeft - scrollX;

  handleCustomKeepScroll(newScrollLeft, endX < startX.value);
}

// https://segmentfault.com/q/1010000043579651
function handleCustomKeepScroll(targetPosition, isScrollNext = true) {
  if (animationFrameTimer.value !== -1) {
    window.cancelAnimationFrame(animationFrameTimer.value);
    animationFrameTimer.value = -1;
    isKeepScroll.value = false;
  }

  let target = 0;
  if (props.vertical === true) {
    target = (tabBarRef.value?.scrollTop || 0) - targetPosition;
  } else {
    target = (tabBarRef.value?.scrollLeft || 0) - targetPosition;
  }

  const scrollFps = Math.max(Math.abs(target / 20), 1);

  handleCustomKeepScrollStep(targetPosition, scrollFps, isScrollNext);
}
function handleCustomKeepScrollStep(
  targetPosition,
  scrollFps = 1,
  isScrollNext = true
) {
  if (typeof tabBarRef.value?.scrollTo !== 'function') return;

  if (animationFrameTimer.value !== -1) {
    window.cancelAnimationFrame(animationFrameTimer.value);
    isKeepScroll.value = false;
  }
  let scrollTarget = 0;
  let start = 0;
  // let scrollEndLimit = 0;
  const scrollEndLimit = getScrollEndLimit(tabBarRef.value);

  if (props.vertical === true) {
    start = tabBarRef.value?.scrollTop || 0;
    // scrollEndLimit =
    //   Math.max(
    //     tabBarRef.value?.scrollHeight,
    //     tabBarRef.value?.offsetHeight,
    //     0
    //   ) - tabBarRef.value?.clientHeight;
  } else {
    start = tabBarRef.value?.scrollLeft || 0;
    // scrollEndLimit =
    //   Math.max(tabBarRef.value?.scrollWidth, tabBarRef.value?.offsetWidth, 0) -
    //   tabBarRef.value?.clientWidth;
  }

  if (isScrollNext === true) {
    scrollTarget = start + scrollFps;
  } else {
    scrollTarget = start - scrollFps;
  }

  if (
    (isScrollNext === true && scrollTarget > targetPosition) ||
    (isScrollNext === false && scrollTarget < targetPosition) ||
    (start === 0 && targetPosition < 0) ||
    scrollTarget >= scrollEndLimit
  ) {
    handleCalculateNavigationShow(targetPosition, 0 - targetPosition);
    animationFrameTimer.value = -1;
    isKeepScroll.value = false;
    return;
  }

  if (props.vertical === true) {
    tabBarRef.value.scrollTo({
      top: scrollTarget,
      behavior: 'instant'
    });
  } else {
    tabBarRef.value.scrollTo({
      left: scrollTarget,
      behavior: 'instant'
    });
  }

  animationFrameTimer.value = window.requestAnimationFrame(() => {
    animationFrameTimer.value = -1;
    handleCustomKeepScrollStep(targetPosition, scrollFps, isScrollNext);
  });
}
</script>

<style lang="scss" scoped>
.tabs_bar {
  position: relative;
  display: flex;
  flex-direction: var(--tab_flex_direction);
  gap: 8px;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;

  &-prev_position {
    flex-shrink: 0;
    position: var(--navigation_position);
    top: var(--prev_top);
    left: var(--prev_left);
    z-index: 1;

    opacity: var(--prev_opacity);
    transition: opacity 0.2s;

    &-prev {
      @extend .tabs_bar-next_position-next;
      transform: rotate(180deg);
      &-img {
        @extend .tabs_bar-next_position-next-img;
      }
    }
  }
  &-next_position {
    flex-shrink: 0;
    position: var(--navigation_position);
    right: var(--next_right);
    bottom: var(--next_bottom);
    z-index: 1;

    opacity: var(--next_opacity);
    transition: opacity 0.2s;

    &-next {
      // flex-basis: 24px;
      // width: 24px;
      width: var(--navigation_width);
      min-height: 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      // border-top-right-radius: 30px;
      // border-bottom-right-radius: 30px;
      // border-top-right-radius: 15px;
      // border-bottom-right-radius: 15px;
      border-top-right-radius: var(--navigation_top_right_radius);
      border-bottom-right-radius: var(--navigation_bottom_right_radius);
      border-bottom-left-radius: var(--navigation_bottom_left_radius);
      // background: linear-gradient(to right, transparent, #0000005c 80%);
      // background: var(--navigation_background);

      overflow: hidden;
      &-img {
        width: var(--navigation_img_size);
        height: var(--navigation_img_size);
      }
    }
  }

  &-first_limit_shadow {
    position: absolute;
    z-index: 1;

    height: var(--first_limit_shadow_height);
    width: var(--first_limit_shadow_width);
    left: var(--first_limit_shadow_left);
    right: var(--first_limit_shadow_right);
    top: var(--first_limit_shadow_top);
    bottom: var(--first_limit_shadow_bottom);

    background-color: #9d9c9c38;
    border-radius: 50%;
    transition:
      width 0.2s,
      height 0.2s;
  }

  &-option_list {
    flex: 1;
    min-width: var(--tab_bar_min_width);
    position: relative;
    display: flex;
    // flex-direction: row;
    flex-direction: var(--tab_flex_direction);
    flex-wrap: nowrap;
    justify-content: var(--tab_bar_justify_content, flex-start);
    // gap: var(--tab_gap);
    // align-items: center;
    align-items: var(--tab_bar_align_items, cneter);
    max-width: 100%;
    max-height: 100%;
    padding-bottom: var(--tab_bar_border_side_distance);
    padding-left: var(--tab_bar_left_line_distance);
    padding-right: var(--tab_bar_right_line_distance);
    overflow: hidden;
    // overflow-x: hidden;
    // overflow-y: hidden;
    user-select: none;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 0px;
      background-color: transparent;
      border: 0 solid transparent;
    }

    &::-webkit-scrollbar-button {
      background: transparent;
      border-radius: 0px;
    }

    &::-webkit-scrollbar-track-piece {
      background-color: transparent;
    }

    &::-webkit-scrollbar-track {
      box-shadow: transparent;
    }

    &-tab_item {
      padding: 0 calc(var(--tab_gap) / 2);
      // min-height: 25px;
      width: var(--tab_item_width);

      color: #606060;
      // text-align: center;
      text-align: var(--tab_item_text_align);

      /* Body/17px */
      font-family: 'PingFang SC';
      font-size: 17px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%; /* 25.5px */

      white-space: nowrap;
      cursor: pointer;
    }
    &-tab_item_selected {
      color: var(--tab_item_selected_color, #000);
    }

    &-empty {
      flex: 1;
      text-align: center;
    }
  }

  &-last_limit_shadow {
    @extend .tabs_bar-first_limit_shadow;

    height: var(--last_limit_shadow_height);
    width: var(--last_limit_shadow_width);
    left: var(--last_limit_shadow_left);
    right: var(--last_limit_shadow_right);
    top: var(--last_limit_shadow_top);
    bottom: var(--last_limit_shadow_bottom);
  }

  &-option_list_emphasize {
    &::after {
      content: '';
      position: absolute;
      // bottom: 0px;
      top: var(--tab_border_side_top);
      bottom: var(--tab_border_side_bottom);
      // left: var(--tab_border_side_left, 0px);
      left: var(--tab_border_side_left);
      // height: var(--tab_border_side_height, 3px);
      // width: var(--tab_border_side_width, 69px);
      // width: var(--tab_border_side_width, 0px);
      height: var(--tab_border_side_height);
      width: var(--tab_border_side_width);
      // border-radius: 5px;
      border-radius: var(--tab_border_side_border_radius);
      opacity: var(--tab_border_side_opacity);
      background-color: var(
        --tab_item_selected_color,
        var(--tab_border_side_color, blue)
      );
      // transition:
      //   left 0.4s ease-in-out,
      //   top 0.4s ease-in-out,
      //   width 0.4s 0.1s;
      transition: var(--selected_transition);
      pointer-events: none;
    }
  }
}
</style>
