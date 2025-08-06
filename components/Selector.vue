<template>
  <div
    class="selector"
    :style="cssVariable"
    @click.stop="handleOptionListTrigger(!isOptionListOpen)"
  >
    <div class="selector-prefix">
      <slot name="prefix" :is-option-open="isOptionListOpen" />
    </div>
    <div class="selector-current_value">
      <slot name="value" :value="modelValue">
        <p class="selector-current_value-label">
          {{ displayValue }}
        </p>
      </slot>
    </div>
    <div ref="optionListRef" class="selector-option_list">
      <div
        v-for="(option, index) in optionList"
        :key="index"
        v-ripple
        :class="[
          'selector-option_list-item',
          isSelected(option, index) === true
            ? 'selector-option_list-item_selsected'
            : ''
        ]"
        @click.stop="handleChange(option, index)"
      >
        <slot
          :index="index"
          :option="option"
          :selected="isSelected(option, index)"
        >
          <p>
            {{ option[displayKey] || option.label || option }}
          </p>
        </slot>
      </div>
      <div
        v-if="optionList.length <= 0"
        class="selector-option_list-item_empty"
      >
        <p>暂无资料</p>
      </div>
    </div>
    <div class="selector-suffix">
      <slot name="suffix" :is-option-open="isOptionListOpen">
        <img
          class="selector-suffix-arrow_icon"
          src="/img/icon/selector/down-arrow-icon.svg"
        />
      </slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [String, Number, Object],
    default: null
  },
  optionList: {
    type: Array,
    default: () => []
  },
  valueKey: {
    type: [String, Number],
    default: null
  },
  displayKey: {
    type: [String, Number],
    default: null
  },
  hasTransition: {
    type: Boolean,
    default: true
  },
  hasShadow: {
    type: Boolean,
    default: false
  },
  optionListTop: {
    type: [String, Number],
    default: null
  },
  optionListLeft: {
    type: [String, Number],
    default: null
  },
  optionListRight: {
    type: [String, Number],
    default: null
  },
  optionListWidth: {
    type: [String, Number],
    default: null
  }
});
const emit = defineEmits(['change', 'update:modelValue']);

const optionListRef = useTemplateRef('optionListRef');

const isOptionListOpen = ref(false);
const optionListHeight = ref(null);

const cssVariable = computed(() => {
  const _cssVariable = {};

  if (typeof optionListHeight.value === 'number') {
    if (typeof props.optionListTop === 'number') {
      _cssVariable['--select_option_list_top'] =
        `calc(100% + ${props.optionListTop}px)`;
    } else if (
      typeof props.optionListTop === 'string' &&
      props.optionListTop !== ''
    ) {
      _cssVariable['--select_option_list_top'] =
        `calc(100% + ${props.optionListTop})`;
    } else {
      _cssVariable['--select_option_list_top'] = '100%';
    }

    if (isOptionListOpen.value === true) {
      _cssVariable['--select_option_list_heigth'] =
        `${optionListHeight.value}px`;
    } else {
      _cssVariable['--select_option_list_heigth'] = '0px';
    }
  } else {
    _cssVariable['--select_option_list_heigth'] = null;
    _cssVariable['--select_option_list_top'] = null;
  }

  if (isOptionListOpen.value === true) {
    _cssVariable['--selector_arrow_icon'] = 'rotate(180deg)';

    if (props.hasShadow === false) {
      _cssVariable['--select_option_list_border_radius'] = '4px';
      _cssVariable['--select_option_list_border'] = '1px solid #d5d5d5';
    }
  } else {
    _cssVariable['--selector_arrow_icon'] = 'rotate(0deg)';
  }

  if (props.hasShadow === true) {
    _cssVariable['--select_option_list_shadow'] = '-1px 3px 6px 0px #00000033';
  }
  if (props.hasTransition === true) {
    _cssVariable['--select_suffix_arrow_icon_transition'] =
      'transform 0.3s ease-in-out';
    _cssVariable['--select_option_list_transition'] = 'height 0.3s ease-in-out';
    _cssVariable['--select_option_list_item_selsected_transition'] =
      'color, background-color 0.4s ease-in-out';
  }

  if (typeof props.optionListLeft === 'number') {
    _cssVariable['--select_option_list_left'] = `${props.optionListLeft}px`;
  } else if (typeof props.optionListLeft === 'string') {
    _cssVariable['--select_option_list_left'] = props.optionListLeft;
  }

  if (typeof props.optionListRight === 'number') {
    _cssVariable['--select_option_list_right'] = `${props.optionListRight}px`;
  } else if (typeof props.optionListRight === 'string') {
    _cssVariable['--select_option_list_right'] = props.optionListRight;
  }

  if (typeof props.optionListWidth === 'number') {
    _cssVariable['--select_option_list_width'] = `${props.optionListWidth}px`;
  } else if (typeof props.optionListWidth === 'string') {
    _cssVariable['--select_option_list_width'] = props.optionListWidth;
  }

  return _cssVariable;
});
const displayValue = computed(() => {
  const currentOption = props.optionList.find(
    (option) =>
      (option?.[props.valueKey] || option.value || option) ===
      (props.modelValue?.[props.valueKey] ||
        props.modelValue?.value ||
        props.modelValue)
  );
  console.log(
    currentOption,
    props.modelValue,
    props.valueKey,
    props.displayKey
  );
  return (
    currentOption?.[props.displayKey] ||
    props.modelValue?.[props.displayKey] ||
    props.modelValue?.label ||
    props.modelValue
  );
});

watch(
  () => props.optionList,
  async () => {
    optionListHeight.value = null;
    await nextTick();
    handleOptionListHeight();
  },
  { deep: true }
);
watch(
  () => props.loading,
  (newLoading) => {
    if (newLoading === true) {
      isOptionListOpen.value = false;
    }
  }
);

onMounted(() => {
  handleOptionListHeight();
  window.addEventListener('resize', handleOptionListHeight);
  window.addEventListener('click', handleOptionListClose);

  if (typeof window?.screen?.orientation?.addEventListener === 'function') {
    window?.screen?.orientation?.addEventListener(
      'change',
      handleOptionListHeight
    );
  }
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleOptionListHeight);
  window.removeEventListener('click', handleOptionListClose);

  if (typeof window?.screen?.orientation?.removeEventListener === 'function') {
    window?.screen?.orientation?.removeEventListener(
      'change',
      handleOptionListHeight
    );
  }
});

async function handleOptionListHeight() {
  optionListHeight.value = null;
  await nextTick();
  window.requestAnimationFrame(() => {
    if (
      typeof optionListRef.value?.offsetHeight !== 'number' ||
      optionListRef.value?.offsetHeight === 0
    ) {
      setTimeout(handleOptionListHeight, 500);
    } else {
      optionListHeight.value = optionListRef.value?.offsetHeight;
    }
  });
}
function isSelected(option) {
  const value = option?.[props.valueKey] || option?.value || option;
  const currentValue = props.modelValue?.[props.valueKey] || props.modelValue;
  return currentValue === value;
}
function handleOptionListTrigger(newIsOptionListOpen = false) {
  if (props.loading === true) return;
  isOptionListOpen.value = newIsOptionListOpen;
}
function handleOptionListClose() {
  handleOptionListTrigger(false);
}
function handleChange(option, index) {
  const newValue = option?.[props.valueKey] || option?.value || option;
  if (props.modelValue !== newValue) {
  }
  if (props.modelValue !== newValue) {
    if (
      typeof props.valueKey !== 'undefined' &&
      typeof props.valueKey !== 'object' &&
      props.valueKey !== null
    ) {
      emit('change', newValue, index);
      emit('update:modelValue', newValue, index);
    } else {
      emit('change', props.optionList?.[newValue] || newValue, index);
      emit(
        'update:modelValue',
        props.optionList?.[newValue] || newValue,
        index
      );
    }
  }
  handleOptionListTrigger(false);
}
</script>

<style lang="scss">
.selector {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 100%;

  &-prefix {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &-current_value {
    flex: 1;
    color: #111;

    /* Body/12px */
    font-family: 'PingFang SC';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 166.667% */

    overflow: hidden;
    &-label {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  &-option_list {
    position: absolute;
    top: var(--select_option_list_top, 500vh);
    left: var(--select_option_list_left);
    right: var(--select_option_list_right);
    z-index: 2;
    width: var(--select_option_list_width, 100%);
    height: var(--select_option_list_heigth);
    max-height: 45vh;
    overflow: auto;
    background-color: #fff;

    // box-shadow: -1px 3px 6px 0px #00000033;
    box-shadow: var(--select_option_list_shadow);

    border-radius: var(--select_option_list_border_radius);
    border: var(--select_option_list_border);

    // transition: height 0.3s ease-in-out;
    transition: var(--select_option_list_transition);

    &-item {
      padding: 8px;

      color: #111;

      /* Body/12px */
      font-family: 'PingFang SC';
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 166.667% */
    }
    &-item_selsected {
      color: $primary;
      background-color: $secondary;
      // transition: color, background-color 0.4s ease-in-out;
      transition: var(--select_option_list_item_selsected_transition);
    }
    &-item_empty {
      padding: 8px;

      color: #111;

      /* Body/12px */
      font-family: 'PingFang SC';
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 166.667% */
      text-align: center;
    }
  }
  &-suffix {
    display: flex;
    flex-direction: column;
    justify-content: center;
    &-arrow_icon {
      // transition: transform 0.3s ease-in-out;
      transition: var(--select_suffix_arrow_icon_transition);
      transform: var(--selector_arrow_icon, rotate(0deg));
    }
  }
}
</style>
