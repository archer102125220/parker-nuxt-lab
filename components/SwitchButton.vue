<template>
  <span class="switch_button" :style="cssVariable">
    <input
      class="switch_button-check"
      type="checkbox"
      :disabled="disabled"
      :value="modelValue"
      @change="handleValueChange"
    />

    <div ref="iconRef" class="switch_button-icon">
      <slot
        name="icon"
        :icon="icon"
        :value="modelValue"
        :show-icon="showIcon"
        :checked-icon="checkedIcon"
      >
        <img v-if="typeof showIcon === 'string'" :src="showIcon" />
      </slot>
    </div>

    <div class="switch_button-label">
      <slot
        :label="label"
        :value="modelValue"
        :show-label="showLabel"
        :checked-label="checkedLabel"
      >
        <p>{{ showLabel }}</p>
      </slot>
    </div>
  </span>
</template>

<script setup>
const modelValue = defineModel({ type: Boolean, default: false });
const props = defineProps({
  label: { type: String, default: '' },
  checkedLabel: { type: String, default: '' },
  icon: { type: String, default: null },
  radius: { type: String, default: '999px' },
  checkedIcon: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  color: { type: String, default: null },
  bgColor: { type: String, default: null },
  checkedColor: { type: String, default: null },
  checkedBgColor: { type: String, default: null }
});
const emits = defineEmits(['change', 'update:modelValue']);

const iconRef = useTemplateRef('iconRef');

const iconClientWidth = ref(0);

const cssVariable = computed(() => {
  const _cssVariable = {
    '--switch_button_cursor': 'pointer'
  };

  const color =
    (modelValue.value === true ? props.checkedColor : props.color) ||
    props.color; // 預防 checkedColor 未傳入
  const bgColor =
    (modelValue.value === true ? props.checkedBgColor : props.bgColor) ||
    props.bgColor; // 預防 checkedBgColor 未傳入

  if (props.disabled === true) {
    _cssVariable['--switch_button_opacity'] = '0.3';
    _cssVariable['--switch_button_cursor'] = 'not-allowed';
  }

  if (modelValue.value !== true) {
    // _cssVariable['--switch_button_icon_right'] = '8px';
    _cssVariable['--switch_button_icon_left'] = 'calc(100% - 39px)';
    _cssVariable['--switch_button_label_padding_right'] =
      `${iconRef.value?.clientWidth || iconClientWidth.value || 0}px`;
  } else {
    _cssVariable['--switch_button_icon_left'] = '8px';
    _cssVariable['--switch_button_label_padding_left'] =
      `${iconRef.value?.clientWidth || iconClientWidth.value || 0}px`;
  }

  if (typeof color === 'string' && color !== '') {
    _cssVariable['--switch_button_color'] = color;
  }

  if (typeof bgColor === 'string' && bgColor !== '') {
    _cssVariable['--switch_button_bg_color'] = bgColor;
  }

  if (typeof props.radius === 'string' && props.radius !== '') {
    _cssVariable['--switch_button_radius'] = props.radius;
  }

  return _cssVariable;
});
const showLabel = computed(() => {
  if (
    modelValue.value === true &&
    typeof props.checkedLabel === 'string' &&
    props.checkedLabel !== ''
  ) {
    return props.checkedLabel;
  }

  return props.label;
});
const showIcon = computed(() => {
  if (
    modelValue.value === true &&
    typeof props.checkedIcon === 'string' &&
    props.checkedIcon !== ''
  ) {
    return props.checkedIcon;
  } else if (
    typeof props.checkedIcon === 'string' &&
    props.checkedIcon !== ''
  ) {
    return props.icon;
  }

  return null;
});

onMounted(() => {
  iconClientWidth.value = iconRef.value?.clientWidth || 0;
});

function handleValueChange(e) {
  const newValue = e?.target?.value === 'true';

  emits('change', !newValue);
  emits('update:modelValue', !newValue);
}
</script>

<style lang="scss" scoped>
.switch_button {
  position: relative;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 18px;
  // border-radius: 999px;
  border-radius: var(--switch_button_radius);

  color: var(--switch_button_color);
  background-color: var(--switch_button_bg_color);
  opacity: var(--switch_button_opacity);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1) inset;

  overflow: hidden;
  cursor: pointer;
  transition:
    color 0.2s,
    background-color 0.2s,
    opacity 0.2s;

  &-check {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    // display: none;

    opacity: 0;
    // cursor: pointer;
    cursor: var(--switch_button_cursor);
  }
  &-icon {
    position: absolute;
    top: 8px;
    bottom: 8px;
    left: var(--switch_button_icon_left);
    right: var(--switch_button_icon_right);
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    flex-wrap: nowrap;

    // height: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 100%;
    background-color: #fff;
    // box-shadow: 0px 4px 6px -2px rgba(0, 0, 0, 0.05);
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);

    transition:
      left 0.2s,
      right 0.2s;
  }
  &-label {
    padding-right: var(--switch_button_label_padding_right);
    padding-left: var(--switch_button_label_padding_left);
    transition: padding 0.2s;
  }
}
</style>
