<template>
  <div ref="tabBarRootRef" class="tabs_bar" :style="cssVariable">
    <div
      v-if="hasNavigation === true"
      v-customize-ripple
      class="tabs_bar-prev"
      @pointerup="handlePrevScroll"
    >
      <img class="tabs_bar-prev-img" :src="navigationImg" />
    </div>
    <div
      ref="tabBarRef"
      :class="[
        'tabs_bar-option_list',
        selectedType !== '' ? 'tabs_bar-option_list_emphasize' : ''
      ]"
      @mousedown="handleStartTabBarScroll"
      @touchstart="handleStartTabBarScroll"
    >
      <div
        v-for="(tab, index) in tabList"
        :key="index"
        v-customize-ripple
        ref="tabListRef"
        class="tabs_bar-option_list-tab_item"
        @mouseenter="handleBottomeStyleTemp"
        @mouseleave="handleResetBottomeStyleTemp"
        @click="handleTabChange(index)"
      >
        <slot
          :tab="tab"
          :index="index"
          :selected="isSelected(modelValue, tab, index)"
        >
          <p>{{ tab?.[displayKey] || tab?.label || tab }}</p>
        </slot>
      </div>
    </div>
    <div
      v-if="hasNavigation === true"
      v-customize-ripple
      class="tabs_bar-next"
      @pointerup="handleNextScroll"
    >
      <img class="tabs_bar-next-img" :src="navigationImg" />
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: 0
  },
  justifyContent: {
    type: String,
    default: 'flex-start'
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
  bottomLineDistance: {
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
    default: 'underLine'
  },
  bottomLineColor: {
    type: String,
    default: ''
  },
  selectedColor: {
    type: String,
    default: ''
  },
  bottomLineWidth: {
    type: [Number, String],
    default: 30
  },
  bottomLineHeight: {
    type: [Number, String],
    default: 10
  }
});
const emits = defineEmits(['update:modelValue', 'change']);

const tabBarRootRef = ref(null);
const tabBarRef = ref(null);
const tabListRef = ref(null);

const mouseDown = ref(false);
const startX = ref(0);
const startY = ref(0);
const scrollLeft = ref(0);
const scrollTop = ref(0);

const bottomLineStyle = ref({});
const bottomLineStyleTemp = ref(null);

const cssVariable = computed(() => {
  const _cssVariable = {
    ...(bottomLineStyleTemp.value || bottomLineStyle.value)
  };

  if (props.selectedType === 'underLine') {
    _cssVariable['--tab_bottom_line_bottom'] = '0px';
    if (props.vertical === false) {
      if (typeof props.bottomLineHeight === 'number') {
        _cssVariable['--tab_bottom_line_height'] =
          `${props.bottomLineHeight}px`;
      } else if (
        typeof props.bottomLineHeight === 'string' &&
        props.bottomLineHeight !== ''
      ) {
        _cssVariable['--tab_bottom_line_height'] = props.bottomLineHeight;
      }
    }

    if (typeof props.bottomLineWidth === 'number') {
      _cssVariable['--tab_bottom_line_width'] = `${props.bottomLineWidth}px`;
    } else if (
      typeof props.bottomLineWidth === 'string' &&
      props.bottomLineWidth !== ''
    ) {
      _cssVariable['--tab_bottom_line_width'] = props.bottomLineWidth;
    }
  } else if (props.selectedType === 'mask') {
    // _cssVariable['--tab_bottom_line_height'] = '100%';
    _cssVariable['--tab_bottom_line_opacity'] = '0.1';
  }

  if (
    typeof props.bottomLineColor === 'string' &&
    props.bottomLineColor !== ''
  ) {
    _cssVariable['--tab_bottom_line_color'] = props.bottomLineColor;
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

  if (typeof props.bottomLineDistance === 'number') {
    _cssVariable['--tab_bar_bottom_line_distance'] =
      `${props.bottomLineDistance}px`;
  } else if (
    typeof props.bottomLineDistance === 'string' &&
    props.bottomLineDistance !== ''
  ) {
    _cssVariable['--tab_bar_bottom_line_distance'] = props.bottomLineDistance;
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

  if (props.vertical === true) {
    _cssVariable['--tab_bottom_line_bottom'] = 'unset';
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
  } else {
    // if (
    //   typeof tabBarRootRef.value === 'object' &&
    //   tabBarRootRef.value !== null
    // ) {
    //   const tabBarRootStyle = window.getComputedStyle(tabBarRootRef.value);
    //   _cssVariable['--tab_bottom_line_bottom'] =
    //     `-${tabBarRootStyle.bottomLineDistance}`;
    // } else {
    //   _cssVariable['--tab_bottom_line_bottom'] = '0px';
    // }
    _cssVariable['--tab_bottom_line_bottom'] = '0px';

    _cssVariable['--tab_flex_direction'] = 'row';
    _cssVariable['--navigation_width'] = '24px';
    _cssVariable['--navigation_top_right_radius'] = '15px';
    _cssVariable['--navigation_bottom_right_radius'] = '15px';
    // _cssVariable['--navigation_background'] =
    //   'linear-gradient(to right, transparent, #0000005c 80%)';
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
  (newValue) => {
    if (Array.isArray(tabListRef.value) === true) {
      const tabRef = tabListRef.value?.[getCurrentTabIndex(newValue) || 0];
      handleBottomeStyle(tabRef);
      handleCheckTab(tabRef);
    }
  }
);
watch(
  () => props.tabList,
  async () => {
    await nextTick();
    if (Array.isArray(tabListRef.value) === true) {
      const tabRef =
        tabListRef.value?.[getCurrentTabIndex(props.modelValue) || 0];
      handleBottomeStyle(tabRef);
      handleCheckTab(tabRef);
    }
  },
  {
    deep: true
  }
);

onMounted(() => {
  handleBottomeStyle(
    tabListRef.value?.[getCurrentTabIndex(props.modelValue) || 0]
  );
  document.addEventListener('mouseup', stopTabBarScroll);
  document.addEventListener('mousemove', handleTabBarScroll);
  document.addEventListener('touchend', stopTabBarScroll);
  document.addEventListener('touchmove', handleTabBarScroll, {
    passive: false
  });
});
onBeforeUnmount(() => {
  document.removeEventListener('mouseup', stopTabBarScroll);
  document.removeEventListener('mousemove', handleTabBarScroll);
  document.removeEventListener('touchend', stopTabBarScroll);
  document.removeEventListener('touchmove', handleTabBarScroll);
});

function getCurrentTabIndex(tab) {
  const _tabIndex = props.tabList.findIndex(
    (_tab) => _tab?.[props.valueKey] === tab || _tab?.value === tab
  );
  return typeof _tabIndex === 'number' && _tabIndex > -1 ? _tabIndex : tab;
}
function isSelected(currentTab, tab, index) {
  const value = tab?.[props.valueKey] || tab?.value || index;
  return currentTab === value;
}

function handlePrevScroll() {
  if (props.vertical === true) {
    tabBarRef.value.scrollTo({
      top: tabBarRef.value.scrollTop - 100,
      behavior: 'smooth'
    });
  } else {
    tabBarRef.value.scrollTo({
      left: tabBarRef.value.scrollLeft - 100,
      behavior: 'smooth'
    });
  }
}
function handleNextScroll() {
  if (props.vertical === true) {
    tabBarRef.value.scrollTo({
      top: tabBarRef.value.scrollTop + 100,
      behavior: 'smooth'
    });
  } else {
    tabBarRef.value.scrollTo({
      left: tabBarRef.value.scrollLeft + 100,
      behavior: 'smooth'
    });
  }
}

function getBottomeStyle(tab) {
  const bottomeStyle = {};

  if (typeof tab === 'object' && tab !== null) {
    if (props.vertical === true) {
      bottomeStyle['--tab_bottom_line_height'] = `${tab.clientHeight}px`;
    }

    if (props.vertical === false) {
      bottomeStyle['--tab_bottom_line_top'] = 'unset';
      if (
        (typeof props.bottomLineWidth !== 'number' &&
          typeof props.bottomLineWidth !== 'string') ||
        props.bottomLineWidth === ''
      ) {
        bottomeStyle['--tab_bottom_line_width'] = `${tab.clientWidth}px`;
        bottomeStyle['--tab_bottom_line_left'] = `${tab.offsetLeft}px`;
      } else {
        bottomeStyle['--tab_bottom_line_left'] = `calc(${
          tab.offsetLeft + tab.clientWidth / 2
        }px - var(--tab_bottom_line_width, 0px) / 2)`;
      }
    } else {
      bottomeStyle['--tab_bottom_line_left'] = '0px';
      if (
        (typeof props.bottomLineHeight !== 'number' &&
          typeof props.bottomLineHeight !== 'string') ||
        props.bottomLineHeight === ''
      ) {
        bottomeStyle['--tab_bottom_line_height'] = `${tab.clientHeight}px`;
        bottomeStyle['--tab_bottom_line_top'] = `${tab.offsetTop}px`;
      } else {
        bottomeStyle['--tab_bottom_line_top'] = `calc(${
          tab.offsetTop + tab.clientHeight / 2
        }px - var(--tab_bottom_line_height, 0px) / 2)`;
      }
    }

    if (props.selectedType === 'mask') {
      if (props.vertical === true) {
        bottomeStyle['--tab_bottom_line_width'] = `${tab.clientWidth}px`;
      } else {
        bottomeStyle['--tab_bottom_line_height'] = `${tab.clientHeight}px`;
      }
    }
  }

  return bottomeStyle;
}

function handleBottomeStyle(tab) {
  bottomLineStyle.value = getBottomeStyle(tab);
}

function handleBottomeStyleTemp(_tab) {
  if (props.hover === false) return;
  const tab = _tab?.target || _tab;
  bottomLineStyleTemp.value = getBottomeStyle(tab);
}
function handleResetBottomeStyleTemp() {
  if (props.hover === false) return;
  bottomLineStyleTemp.value = null;
}
function handleCheckTab(tabListRef) {
  const boundingClientRect = tabListRef?.getBoundingClientRect?.();

  const _tabBarRef = tabBarRef.value;
  const tabBarRefBoundingClientRect = _tabBarRef?.getBoundingClientRect?.();

  // const tabListRefBottom = boundingClientRect?.y + tabListRef?.clientHeight;
  const tabListRefBottom = boundingClientRect?.bottom;
  const tabBarRefClientHeight = _tabBarRef?.clientHeight;
  const tabBarRefTop = tabBarRefBoundingClientRect.top;

  // const tabListRefRight = boundingClientRect?.x + tabListRef?.clientWidth;
  const tabListRefRight = boundingClientRect?.right;
  const tabBarRefClientWidth = _tabBarRef?.clientWidth;
  const tabBarRefRight = tabBarRefBoundingClientRect.right;

  if (
    props.vertical === true &&
    (tabListRefBottom - tabBarRefTop < 0 ||
      tabListRefBottom - tabBarRefTop > tabBarRefClientHeight)
  ) {
    tabBarRef.value.scrollTo({
      top: tabListRef.offsetTop,
      behavior: 'smooth'
    });
  } else if (
    props.vertical === false &&
    (tabBarRefRight - tabListRefRight < 0 ||
      tabBarRefRight - tabListRefRight > tabBarRefClientWidth)
  ) {
    tabBarRef.value.scrollTo({
      left: tabListRef.offsetLeft,
      behavior: 'smooth'
    });
  }
}

function handleTabChange(newTabIndex) {
  emits('update:modelValue', newTabIndex);
  emits('change', newTabIndex);
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
  e.stopPropagation();
  mouseDown.value = true;
  if (props.vertical === true) {
    handleVerticalStartTabBarScroll(e);
  } else {
    handleHorizontalStartTabBarScroll(e);
  }
}

function stopTabBarScroll(e) {
  mouseDown.value = false;
}

function handleVerticalTabBarScroll(e) {
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

  tabBarRef.value.scrollTop = scrollTop.value - scrollY;
}
function handleHorizontalTabBarScroll(e) {
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
  tabBarRef.value.scrollLeft = scrollLeft.value - scrollX;
}
function handleTabBarScroll(e) {
  if (mouseDown.value === false) {
    return;
  }
  e.preventDefault();
  if (props.vertical === true) {
    handleVerticalTabBarScroll(e);
  } else {
    handleHorizontalTabBarScroll(e);
  }
}
</script>

<style lang="scss" scoped>
.tabs_bar {
  display: flex;
  flex-direction: var(--tab_flex_direction);
  gap: 8px;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  &-prev {
    @extend .tabs_bar-next;
    transform: rotate(180deg);
    &-img {
      @extend .tabs_bar-next-img;
    }
  }
  &-next {
    flex-shrink: 0;
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
  &-option_list {
    flex: 1;
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
    user-select: none;
    overflow: hidden;
    // overflow-x: hidden;
    // overflow-y: hidden;

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
  }
  &-option_list_emphasize {
    &::after {
      content: '';
      position: absolute;
      // bottom: 0px;
      top: var(--tab_bottom_line_top);
      bottom: var(--tab_bottom_line_bottom);
      // left: var(--tab_bottom_line_left, 0px);
      left: var(--tab_bottom_line_left);
      // height: var(--tab_bottom_line_height, 3px);
      // width: var(--tab_bottom_line_width, 69px);
      // width: var(--tab_bottom_line_width, 0px);
      height: var(--tab_bottom_line_height);
      width: var(--tab_bottom_line_width);
      border-radius: 5px;
      opacity: var(--tab_bottom_line_opacity);
      background-color: var(
        --tab_item_selected_color,
        var(--tab_bottom_line_color, blue)
      );
      transition:
        left 0.4s ease-in-out,
        top 0.4s ease-in-out,
        width 0.4s 0.1s;
      pointer-events: none;
    }
  }
}
</style>
