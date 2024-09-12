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
        <slot :name="_slot" v-bind="arg" />
      </template>

      <template v-for="(slotName, index) in slotsList" #[slotName]="{ ...arg }">
        <slot v-if="scrollFetch === false" :name="slotName" v-bind="arg" />

        <ScrollFetch
          v-else
          :key="slotName"
          v-bind="$attrs"
          :infinity-end="getInfinityEnd(tabList[index])"
          :refresh-disable="getRefreshDisable(tabList[index])"
        >
          <slot :name="slotName" v-bind="arg">
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
  loading: {
    type: Boolean,
    default: false
  },
  scrollFetch: {
    type: Boolean,
    default: true
  },
  refreshDisable: {
    type: Boolean,
    default: false
  },
  valueKey: {
    type: [Number, String],
    default: null
  },
  slotNameKey: {
    type: [Number, String],
    default: null
  }
});
const emits = defineEmits(['change', 'update:modelValue', 'sliderMove']);

const statusRefreshDisable = ref(false);

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
function getRefreshDisable(tab) {
  if (typeof tab?.refreshDisable !== 'boolean') {
    return props.refreshDisable || statusRefreshDisable.value;
  }
  return (
    tab.refreshDisable || props.refreshDisable || statusRefreshDisable.value
  );
}
function change(...arg) {
  console.log('change');
  emits('update:modelValue', ...arg);
  emits('change', ...arg);
}
function sliderMove(...arg) {
  statusRefreshDisable.value = true;
  emits('sliderMove', ...arg);
}
function resetRefreshDisable() {
  statusRefreshDisable.value = false;
}
</script>
<style lang="scss" scoped>
.tabs_content {
  position: relative;
  flex: 1;
  height: 100%;
  &-swiper {
    height: 100%;
  }
}
</style>
