<template>
  <div
    class="tabs_content"
    @mouseup="resetRefreshDisable"
    @mouseover="resetRefreshDisable"
    @touchend="resetRefreshDisable"
  >
    <slot v-if="slotNameKey !== 'default'" />
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
      :should-fill-height="scrollFetch === true"
      @update:model-value="change"
      @sliderMove="sliderMove"
    >
      <template v-for="_slot in slots" #[_slot]="{ ...arg }">
        <slot :name="_slot" v-bind="arg" :is-tab-moveing="isTabMoveing" />
      </template>

      <template v-for="(slotName, index) in slotsList" #[slotName]="{ ...arg }">
        <slot
          v-if="scrollFetch === false"
          :name="slotName"
          v-bind="arg"
          :is-tab-moveing="isTabMoveing"
        />

        <ScrollFetch
          v-else
          class="tabs_content-swiper-scroll_fetch"
          :key="slotName"
          :height="height"
          :refresh="refresh"
          :loading="loading"
          :ios-type="iosType"
          :refresh-icon="refreshIcon"
          :pullingLabel="pullingLabel"
          :loadingLabel="loadingLabel"
          :infinity-fetch="infinityFetch"
          :infinity-label="infinityLabel"
          :refreshing-icon="refreshingIcon"
          :infinity-buffer="infinityBuffer"
          :infinity-disable="infinityDisable"
          :is-scroll-to-fetch="isScrollToFetch"
          :infinity-end="getInfinityEnd(tabList[index])"
          :refresh-disable="getRefreshDisable(tabList[index])"
          :infinity-end-label="getInfinityEndLabel(tabList[index])"
          v-bind="$attrs"
        >
          <slot :name="slotName" v-bind="arg" :is-tab-moveing="isTabMoveing">
            <p>{{ tabList[index].content || tabList[index] }}</p>
          </slot>
        </ScrollFetch>
      </template>
    </SwiperJs>
  </div>
</template>

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
  loading: {
    type: Boolean,
    default: false
  },
  scrollFetch: {
    type: Boolean,
    default: true
  },
  label: { type: String, default: undefined },
  height: { type: [String, Number], default: undefined },
  pullingLabel: { type: String, default: undefined },
  loadingLabel: { type: String, default: undefined },
  refresh: { type: Function, default: undefined },
  refreshIcon: { type: String, default: undefined },
  refreshingIcon: { type: String, default: undefined },
  refreshDisable: { type: Boolean, default: undefined },
  iosType: { type: Boolean, default: undefined },
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
  return props.tabList.map((tab, index) => getSlotsKey(tab, index));
});
const slots = computed(() => {
  const _slots = Object.keys($slotsList).filter(
    (_slot) => slotsList.value.includes(_slot) === false
  );
  // console.log({ _slotList });
  return _slots;
});

watch(
  () => props.modelValue,
  (newModelValue) => {
    console.log({ newModelValue });
  }
);

function getSlotsKey(tab, index) {
  return tab?.[props.valueKey] || tab?.slotName || index;
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
  console.log('change');
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
<style lang="scss" scoped>
.tabs_content {
  position: relative;
  flex: 1;
  height: 100%;
  &-swiper {
    height: 100%;
    :deep(.tabs_content-swiper-scroll_fetch.scroll_fetch) {
      position: static;
    }
  }
}
</style>
