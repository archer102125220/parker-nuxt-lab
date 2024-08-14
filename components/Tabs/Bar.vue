<template>
  <div class="tabs_bar" :style="cssVariable">
    <div
      v-for="(tab, index) in tabList"
      :key="index"
      ref="tabListRef"
      class="tabs_bar-tab_item"
      @mouseenter="handleBottomeStyleTemp"
      @mouseleave="resetBottomeStyleTemp"
      @click="handleTabChange(index)"
    >
      <slot :tab="tab" :index="index">
        <p>{{ tab?.label || tab }}</p>
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
  hover: {
    type: Boolean,
    default: false
  },
  tabList: {
    type: Array,
    default: () => []
  },
  tabBottomLineColor: {
    type: String,
    default: 'blue'
  },
  tabBottomLineHeight: {
    type: [Number, String],
    default: 3
  }
});
const emits = defineEmits(['update:modelValue']);

const tabListRef = ref(null);
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

  if (
    typeof props.tabBottomLineColor === 'string' &&
    props.tabBottomLineColor !== ''
  ) {
    _cssVariable['--tab_bottom_line_color'] = props.tabBottomLineColor;
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
});

function handleTabChange(newTabIndex) {
  emits('update:modelValue', newTabIndex);
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

function getBottomeStyle(tab) {
  const bottomeStyle = {};

  if (typeof tab === 'object' && tab !== null) {
    bottomeStyle['--tab_bottom_line_left'] = `${tab.offsetLeft}px`;
    bottomeStyle['--tab_bottom_line_width'] = `${tab.clientWidth}px`;
  }

  return bottomeStyle;
}
</script>

<style lang="scss" scoped>
.tabs_bar {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
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
    width: var(--tab_bottom_line_width, 69px);
    background-color: var(--tab_bottom_line_color, blue);
    transition: left 0.5s ease-in-out, width 0.5s 0.1s;
    pointer-events: none;
  }
}
</style>