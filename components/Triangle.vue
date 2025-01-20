<template>
  <div ref="triangleEl" class="triangle" :style="cssVariable">
    <slot>
      <p>{{ label }}</p>
    </slot>
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: '' },
  height: { type: [String, Number], default: null },
  width: { type: [String, Number], default: null },
  size: { type: [String, Number], default: null },
  color: { type: String, default: 'rgb(255, 121, 121)' },
  angleUpperRight: { type: Boolean, default: false },
  angleLowerLeft: { type: Boolean, default: false },
  angleUpperLeft: { type: Boolean, default: true },
  angleLowerRight: { type: Boolean, default: false }
});

const triangleEl = useTemplateRef('triangleEl');

const cssVariable = computed(() => {
  const _cssVariable = {};
  let height = null;
  let width = null;
  let color = null;

  if (
    (typeof props.size !== 'string' && typeof props.size !== 'number') ||
    props.size === ''
  ) {
    if (typeof props.height === 'string' && props.height !== '') {
      height = props.height;
    } else if (typeof props.height === 'number') {
      height = `${props.height}px`;
    }

    if (typeof props.width === 'string' && props.width !== '') {
      width = props.width;
    } else if (typeof props.width === 'number') {
      width = `${props.width}px`;
    }
  } else if (typeof props.size === 'string' && props.size !== '') {
    height = props.size;
    width = props.size;
  } else if (typeof props.size === 'number') {
    height = `${props.size}px`;
    width = `${props.size}px`;
  }

  if (typeof props.color === 'string' && props.color !== '') {
    color = props.color;
  }

  if (props.angleLowerLeft === true) {
    _cssVariable['--triangle_border_width'] = `0px ${height} ${width} 0px`;
    _cssVariable['--triangle_color'] = `${color} transparent`;
  } else if (props.angleLowerRight === true) {
    _cssVariable['--triangle_border_width'] = `${height} ${width} 0px 0px`;
    _cssVariable['--triangle_color'] = `transparent ${color}`;
  } else if (props.angleUpperRight === true) {
    _cssVariable['--triangle_border_width'] = `0px ${height} ${width} 0px`;
    _cssVariable['--triangle_color'] = `transparent ${color}`;
  } else if (props.angleUpperLeft === true) {
    _cssVariable['--triangle_border_width'] = `0px 0px ${height} ${width}`;
    _cssVariable['--triangle_color'] = `transparent ${color}`;
  }

  return _cssVariable;
});

defineExpose({
  get el() {
    return triangleEl.value;
  }
});
</script>

<style lang="scss">
// https://www.cnblogs.com/weiqinl/p/7048205.html
// http://tool.uis.cc/sjmaker/
.triangle {
  position: relative;

  width: 0px;
  height: 0px;
  border-color: var(--triangle_color);
  border-width: var(--triangle_border_width);
  border-style: solid;

  overflow: visible;
}
</style>
