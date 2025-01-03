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
        :show-icon="showIcon"
        :icon="icon"
        :checked-icon="checkedIcon"
      >
        <img v-if="typeof showIcon === 'string'" :src="showIcon" />
      </slot>
    </div>

    <div class="switch_button-label">
      <slot
        :show-label="showLabel"
        :label="label"
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
  checkedIcon: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  color: { type: String, default: null },
  bgColor: { type: String, default: null },
  checkedColor: { type: String, default: null },
  checkedBgColor: { type: String, default: null }
});
const emits = defineEmits('change', 'update:modelValue');

const iconRef = useTemplateRef('iconRef');

const cssVariable = computed(() => {
  const _cssVariable = {};

  const color =
    (modelValue.value === true ? props.checkedColor : props.color) ||
    props.color; // 預防 checkedColor 未傳入
  const bgColor =
    (modelValue.value === true ? props.checkedBgColor : props.bgColor) ||
    props.bgColor; // 預防 checkedBgColor 未傳入

  if (props.disabled === true) {
    _cssVariable['--switch_button_opacity'] = '0.3';
  }

  if (modelValue.value !== true) {
    // _cssVariable['--switch_button_icon_right'] = '8px';
    _cssVariable['--switch_button_icon_left'] = 'calc(100% - 39px)';
    _cssVariable['--switch_button_label_padding_right'] =
      `${iconRef.value?.clientWidth || 0}px`;
  } else {
    _cssVariable['--switch_button_icon_left'] = '8px';
    _cssVariable['--switch_button_label_padding_left'] =
      `${iconRef.value?.clientWidth || 0}px`;
  }

  if (typeof color === 'string' && color !== '') {
    _cssVariable['--switch_button_color'] = color;
  }

  if (typeof bgColor === 'string' && bgColor !== '') {
    _cssVariable['--switch_button_bg_color'] = bgColor;
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

function handleValueChange(e) {
  const newValue = e?.target?.value === 'true';

  // emits('change', !newValue);
  emits('update:modelValue', !newValue);
}
</script>

<style lang="scss" scoped>
.switch_button {
  position: relative;
  display: inline-block;
  padding: 12px 18px;
  border-radius: 999px;

  color: var(--switch_button_color);
  background-color: var(--switch_button_bg_color);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1) inset;

  transition:
    color 0.2s,
    background-color 0.2s;

  &-check {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    // display: none;

    opacity: 0;
  }
  &-icon {
    position: absolute;
    top: 8px;
    bottom: 8px;
    left: var(--switch_button_icon_left);
    right: var(--switch_button_icon_right);
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
