<template>
  <div
    class="tabs_bar"
    ref="tabBarRef"
    :style="cssVariable"
    @mousemove.stop="handleTabBarScroll"
    @mousedown="startTabBarScroll"
    @mouseup.stop="stopTabBarScroll"
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
      <slot :tab="tab" :index="index">
        <p>{{ tab?.[tabDisplayKey] || tab?.label || tab }}</p>
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
  center: {
    type: Boolean,
    default: false
  },
  hover: {
    type: Boolean,
    default: false
  },
  tabList: {
    type: Array,
    default: () => []
  },
  tabDisplayKey: {
    type: [Number, String],
    default: null
  },
  tabBottomLineColor: {
    type: String,
    default: 'blue'
  },
  tabBottomLineWidth: {
    type: [Number, String],
    default: null
  },
  tabBottomLineHeight: {
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

  if (typeof props.tabBottomLineHeight === 'number') {
    _cssVariable['--tab_bottom_line_height'] = `${props.tabBottomLineHeight}px`;
  } else if (
    typeof props.tabBottomLineHeight === 'string' &&
    props.tabBottomLineHeight !== ''
  ) {
    _cssVariable['--tab_bottom_line_height'] = props.tabBottomLineHeight;
  }

  if (typeof props.tabBottomLineWidth === 'number') {
    _cssVariable['--tab_bottom_line_width'] = `${props.tabBottomLineWidth}px`;
  } else if (
    typeof props.tabBottomLineWidth === 'string' &&
    props.tabBottomLineWidth !== ''
  ) {
    _cssVariable['--tab_bottom_line_width'] = props.tabBottomLineWidth;
  }

  if (
    typeof props.tabBottomLineColor === 'string' &&
    props.tabBottomLineColor !== ''
  ) {
    _cssVariable['--tab_bottom_line_color'] = props.tabBottomLineColor;
  }

  if (props.center === true) {
    _cssVariable['--tab_bar_justify_content'] = 'center';
  } else {
    _cssVariable['--tab_bar_justify_content'] = 'flex-start';
  }

  return _cssVariable;
});

watch(
  () => props.modelValue,
  (newValue) => {
    const tabRef = tabListRef.value?.[newValue];
    handleBottomeStyle(tabRef);
  }
);

onMounted(() => {
  handleBottomeStyle(tabListRef.value[0]);
  document.addEventListener('mouseup', stopTabBarScroll);
  document.addEventListener('mousemove', handleTabBarScroll);
});
onBeforeUnmount(() => {
  document.removeEventListener('mouseup', stopTabBarScroll);
  document.removeEventListener('mousemove', handleTabBarScroll);
});

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
  startX.value = e.pageX - tabBarRef.value.offsetLeft;
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
  const x = e.pageX - tabBarRef.value.offsetLeft;
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
  align-items: center;
  max-width: 100%;
  overflow: auto;
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
    padding: 0 10px;
    cursor: pointer;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: var(--tab_bottom_line_left, 0px);
    height: var(--tab_bottom_line_height, 3px);
    // width: var(--tab_bottom_line_width, 69px);
    width: var(--tab_bottom_line_width, 0px);
    background-color: var(--tab_bottom_line_color, blue);
    transition: left 0.5s ease-in-out, width 0.5s 0.1s;
    pointer-events: none;
  }
}
</style>