<script setup>
const $slotsList = useSlots();

const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: 0
  },
  tabList: {
    type: Array,
    default: () => []
  },
  valueKey: {
    type: [Number, String],
    default: null
  },
  slotNameKey: {
    type: [Number, String],
    default: null
  },
  slotNameIsDefault: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  scrollFetch: {
    type: Boolean,
    default: true
  },
  tabsContentHeight: { type: [String, Number], default: '100%' },
  swiperHeight: { type: [String, Number], default: '100%' },
  label: { type: String, default: undefined },
  height: { type: [String, Number], default: undefined },
  pullingLabel: { type: String, default: undefined },
  loadingLabel: { type: String, default: undefined },
  refresh: { type: Function, default: undefined },
  refreshIcon: { type: String, default: undefined },
  refreshingIcon: { type: String, default: undefined },
  refreshDisable: { type: Boolean, default: undefined },
  iosStyle: { type: Boolean, default: undefined },
  infinityLabel: { type: String, default: undefined },
  infinityEndLabel: { type: String, default: undefined },
  infinityBuffer: { type: Number, default: undefined },
  infinityDisable: { type: Boolean, default: undefined },
  isScrollToFetch: { type: Boolean, default: undefined },
  infinityFetch: { type: Function, default: undefined }
});
const emits = defineEmits(['change', 'update:modelValue', 'sliderMove']);

const isTabMoveing = ref(false);

const slotsList = computed(() => {
  const _slotsList =
    props.slotNameIsDefault === true
      ? Object.keys($slotsList)
      : props.tabList
          .map((tab, index) => getSlotsKey(tab, index))
          .filter((slotName) => slotName !== null);

  return _slotsList;
});
const slots = computed(() => {
  const _slots =
    props.slotNameIsDefault === true
      ? []
      : Object.keys($slotsList).filter(
          (slot) => slotsList.value.includes(slot) === false
        );

  return _slots;
});
const cssVariable = computed(() => {
  const _cssVariable = {};

  if (
    typeof props.tabsContentHeight === 'string' &&
    props.tabsContentHeight !== ''
  ) {
    _cssVariable['--tabs_content_height'] = props.tabsContentHeight;
  } else if (
    typeof props.tabsContentHeight === 'number' ||
    isNaN(props.tabsContentHeight) === false
  ) {
    _cssVariable['--tabs_content_height'] = `${props.tabsContentHeight}px`;
  }

  if (typeof props.swiperHeight === 'string' && props.swiperHeight !== '') {
    _cssVariable['--tabs_content_swiper_height'] = props.swiperHeight;
  } else if (
    typeof props.swiperHeight === 'number' ||
    isNaN(props.swiperHeight) === false
  ) {
    _cssVariable['--tabs_content_swiper_height'] = `${props.swiperHeight}px`;
  }

  return _cssVariable;
});

function getSlotsKey(tab, index) {
  return tab?.[props.valueKey] || tab?.slotName || index;
}
function isNotScrollFetch(tab) {
  if (typeof tab?.isNotScrollFetch === 'boolean') {
    return tab.isNotScrollFetch;
  }
  return typeof tab !== 'object';
}
function getInfinityEnd(tab) {
  if (typeof tab?.infinityEnd !== 'boolean') {
    return true;
  }
  return tab.infinityEnd;
}
function getInfinityEndLabel(tab) {
  if (typeof tab?.infinityEndLabel !== 'string') {
    return props.infinityEndLabel;
  }
  return tab?.infinityEndLabel;
}
function getRefreshDisable(tab) {
  if (typeof tab?.refreshDisable !== 'boolean') {
    return props.refreshDisable || isTabMoveing.value;
  }
  return tab.refreshDisable || props.refreshDisable || isTabMoveing.value;
}
function change(...arg) {
  emits('update:modelValue', ...arg);
  emits('change', ...arg);
}
function sliderMove(...arg) {
  isTabMoveing.value = true;
  emits('sliderMove', ...arg);
}
function resetRefreshDisable() {
  isTabMoveing.value = false;
}
</script>

<template>
  <div
    class="tabs_content"
    :style="cssVariable"
    @mouseup="resetRefreshDisable"
    @mouseover="resetRefreshDisable"
    @touchend="resetRefreshDisable"
  >
    <slot name="tabTop" />

    <slot name="loading">
      <LoadingBar :loading="loading" />
    </slot>

    <SwiperJs
      class="tabs_content-swiper"
      :model-value="modelValue"
      :value-key="valueKey"
      :slide-list="tabList"
      :overflow="scrollFetch === false"
      :slot-name-key="slotNameKey || valueKey"
      :slot-name-is-default="slotNameIsDefault"
      :should-fill-height="scrollFetch === true"
      @update:model-value="change"
      @slider-move="sliderMove"
    >
      <template v-for="_slot in slots" #[_slot]="{ ...arg }">
        <slot :name="_slot" v-bind="arg" :is-tab-moveing="isTabMoveing" />
      </template>

      <template
        v-for="slotName in slotsList"
        #[slotName]="{ item: tab, ...arg }"
      >
        <slot
          v-if="scrollFetch === false && isNotScrollFetch(tab)"
          :name="slotName"
          v-bind="{ item: tab, ...arg }"
          :is-tab-moveing="isTabMoveing"
        />

        <ScrollFetch
          v-else
          :key="slotName"
          class="tabs_content-swiper-scroll_fetch"
          :height="height"
          :refresh="refresh"
          :loading="loading"
          :ios-style="iosStyle"
          :refresh-icon="refreshIcon"
          :pulling-label="pullingLabel"
          :loading-label="loadingLabel"
          :infinity-fetch="infinityFetch"
          :infinity-label="infinityLabel"
          :refreshing-icon="refreshingIcon"
          :infinity-buffer="infinityBuffer"
          :infinity-disable="infinityDisable"
          :is-scroll-to-fetch="isScrollToFetch"
          :infinity-end="getInfinityEnd(tab)"
          :refresh-disable="getRefreshDisable(tab)"
          :infinity-end-label="getInfinityEndLabel(tab)"
          v-bind="$attrs"
        >
          <slot
            :name="slotName"
            v-bind="{ item: tab, ...arg }"
            :is-tab-moveing="isTabMoveing"
          >
            <p>{{ tab.content || tab }}</p>
          </slot>
        </ScrollFetch>
      </template>
    </SwiperJs>
  </div>
</template>

<style lang="scss" scoped>
.tabs_content {
  // Positioning
  position: relative;

  // Display & Box Model
  flex: 1;
  height: var(--tabs_content_height);

  &-swiper {
    // Display & Box Model
    height: var(--tabs_content_swiper_height);

    :deep(.tabs_content-swiper-scroll_fetch.scroll_fetch) {
      // Positioning
      position: static;
    }
  }
}
</style>
