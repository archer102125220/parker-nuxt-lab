<template>
  <div
    class="tabs_bar"
    ref="tabBarRef"
    :style="cssVariable"
    @mousedown="startTabBarScroll"
    @touchstart="startTabBarScroll"
  >
    <div
      v-for="(tab, index) in tabList"
      :key="index"
      v-customize-ripple
      ref="tabListRef"
      class="tabs_bar-tab_item"
      @mouseenter="handleBottomeStyleTemp"
      @mouseleave="resetBottomeStyleTemp"
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
  center: {
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
  bottomLineWidth: {
    type: [Number, String],
    default: null
  },
  bottomLineHeight: {
    type: [Number, String],
    default: 3
  }
});
const emits = defineEmits(['update:modelValue']);

const tabBarRef = ref(null);
const tabListRef = ref(null);

const mouseDown = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);

const bottomLineStyle = ref({});
const bottomLineStyleTemp = ref(null);

const cssVariable = computed(() => {
  const _cssVariable = {
    ...(bottomLineStyleTemp.value || bottomLineStyle.value)
  };

  if (props.selectedType === 'underLine') {
    _cssVariable['--tab_bottom_line_bottom'] = '0px';
    if (typeof props.bottomLineHeight === 'number') {
      _cssVariable['--tab_bottom_line_height'] = `${props.bottomLineHeight}px`;
    } else if (
      typeof props.bottomLineHeight === 'string' &&
      props.bottomLineHeight !== ''
    ) {
      _cssVariable['--tab_bottom_line_height'] = props.bottomLineHeight;
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
    _cssVariable['--tab_bottom_line_opacity'] = '0.2';
  }

  if (
    typeof props.bottomLineColor === 'string' &&
    props.bottomLineColor !== ''
  ) {
    _cssVariable['--tab_bottom_line_color'] = props.bottomLineColor;
  }

  if (props.center === true) {
    _cssVariable['--tab_bar_justify_content'] = 'center';
  } else {
    _cssVariable['--tab_bar_justify_content'] = 'flex-start';
  }

  if (typeof props.justifyContent === 'string' && props.justifyContent !== '') {
    _cssVariable['--tab_bar_justify_content'] = props.justifyContent;
  }

  if (typeof props.gap === 'number') {
    _cssVariable['--tab_gap'] = `${props.gap}px`;
  } else if (typeof props.gap === 'string' && props.gap !== '') {
    _cssVariable['--tab_gap'] = props.gap;
  }

  return _cssVariable;
});

watch(
  () => props.modelValue,
  (newValue) => {
    const _tabIndex = props.tabList.findIndex(
      (tab) => tab?.[props.valueKey] === newValue || tab?.value === newValue
    );
    const tabIndex = _tabIndex || newValue;
    const tabRef =
      tabListRef.value?.[typeof tabIndex === 'number' ? tabIndex : 0];
    handleBottomeStyle(tabRef);
  }
);

onMounted(() => {
  handleBottomeStyle(tabListRef.value[0]);
  document.addEventListener('mouseup', stopTabBarScroll);
  document.addEventListener('mousemove', handleTabBarScroll);
  document.addEventListener('touchend', stopTabBarScroll);
  document.addEventListener('touchmove', handleTabBarScroll);
});
onBeforeUnmount(() => {
  document.removeEventListener('mouseup', stopTabBarScroll);
  document.removeEventListener('mousemove', handleTabBarScroll);
  document.removeEventListener('touchend', stopTabBarScroll);
  document.removeEventListener('touchmove', handleTabBarScroll);
});

function isSelected(currentTab, tab, index) {
  const value = tab?.[props.valueKey] || tab?.value || index;
  return currentTab === value;
}

function getBottomeStyle(tab) {
  const bottomeStyle = {};

  if (typeof tab === 'object' && tab !== null) {
    if (
      (typeof props.tabBottomLineWidth !== 'number' &&
        typeof props.tabBottomLineWidth !== 'string') ||
      props.tabBottomLineWidth === ''
    ) {
      bottomeStyle['--tab_bottom_line_width'] = `${tab.clientWidth}px`;
      bottomeStyle['--tab_bottom_line_left'] = `${tab.offsetLeft}px`;
    } else {
      bottomeStyle['--tab_bottom_line_left'] = `calc(${
        tab.offsetLeft + tab.clientWidth / 2
      }px - var(--tab_bottom_line_width, 0px) / 2)`;
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
function resetBottomeStyleTemp() {
  if (props.hover === false) return;
  bottomLineStyleTemp.value = null;
}

function handleTabChange(newTabIndex) {
  emits('update:modelValue', newTabIndex);
}

function startTabBarScroll(e) {
  mouseDown.value = true;
  const eventX =
    e.pageX ||
    e.clientX ||
    e.offsetX ||
    e.changedTouches?.[0]?.pageX ||
    e.changedTouches?.[0]?.clientX ||
    e.changedTouches?.[0]?.offsetX;

  startX.value = eventX - tabBarRef.value.offsetLeft;
  scrollLeft.value = tabBarRef.value.scrollLeft;
}

function stopTabBarScroll(e) {
  mouseDown.value = false;
}

function handleTabBarScroll(e) {
  e.preventDefault();
  if (mouseDown.value === false) {
    return;
  }
  const eventX =
    e.pageX ||
    e.clientX ||
    e.offsetX ||
    e.changedTouches?.[0]?.pageX ||
    e.changedTouches?.[0]?.clientX ||
    e.changedTouches?.[0]?.offsetX;

  const x = eventX - tabBarRef.value.offsetLeft;
  const scroll = x - startX.value;
  tabBarRef.value.scrollLeft = scrollLeft.value - scroll;
}
</script>

<style lang="scss" scoped>
.tabs_bar {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  // justify-content: flex-start;
  justify-content: var(--tab_bar_justify_content, flex-start);
  // gap: var(--tab_gap);
  align-items: center;
  max-width: 100%;
  overflow: hidden;
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
    color: #606060;
    white-space: nowrap;
    cursor: pointer;
  }
  &-tab_item_selected {
    color: #000;
  }
  &::after {
    content: '';
    position: absolute;
    // bottom: 0px;
    bottom: var(--tab_bottom_line_bottom);
    left: var(--tab_bottom_line_left, 0px);
    height: var(--tab_bottom_line_height, 3px);
    // width: var(--tab_bottom_line_width, 69px);
    width: var(--tab_bottom_line_width, 0px);
    border-radius: 5px;
    background-color: var(--tab_bottom_line_color, blue);
    transition: left 0.5s ease-in-out, width 0.5s 0.1s;
    pointer-events: none;
  }
}
</style>