<template>
  <div class="tabs_bar" :style="cssVariable">
    <div
      v-for="(tab, index) in tabList"
      :key="index"
      ref="tabListRef"
      class="tabs_bar-tab_item"
    >
      <slot :tab="tab" :index="index" :tabChange="() => handleTabChange(index)">
        <p @click="handleTabChange(index)">{{ tab?.label || tab }}</p>
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
  tabList: {
    type: Array,
    default: () => []
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

  return _cssVariable;
});

watch(
  () => props.modelValue,
  (newValue) => {
    const tabRef = tabListRef.value?.[newValue];
    console.log(tabRef);
    handleBottomeStyle(tabRef);
  }
);

onMounted(() => {
  console.log(tabListRef.value);
  handleBottomeStyle(tabListRef.value[0]);
});

function handleTabChange(newTabIndex) {
  console.log({ newTabIndex });
  emits('update:modelValue', newTabIndex);
}

function handleBottomeStyle(_tab) {
  const tab = _tab?.target || _tab;
  bottomLineStyle.value = getBottomeStyle(tab);
}

function handleBottomeStyleTemp(_tab) {
  const tab = _tab?.target || _tab;
  bottomLineStyleTemp.value = getBottomeStyle(tab);
}

function getBottomeStyle(tab) {
  if (typeof tab === 'object' && tab !== null) {
    return {
      // left: tab.offsetLeft,
      // width: tab.clientWidth,
      '--tab_bottom_line_left': `${tab.offsetLeft}px`,
      '--tab_bottom_line_width': `${tab.clientWidth}px`
    };
  }
}
</script>

<style lang="scss" scoped>
.tabs_bar {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  &-tab_item {
    padding: 0 10px;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    transition: left 0.5s ease-in-out, width 0.5s 0.1s;
    height: var(--tab_bottom_line_height, 3px);
    background-color: blue;
    left: var(--tab_bottom_line_left, 0px);
    width: var(--tab_bottom_line_width, 69px);
    pointer-events: none;
  }
}
</style>