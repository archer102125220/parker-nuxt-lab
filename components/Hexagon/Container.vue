<template>
  <div class="hexagon_container" :style="cssVariable">
    <div class="hexagon_container-top" />
    <slot />
    <div class="hexagon_container-bottom" />
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: '' },
  height: { type: [String, Number], default: '120px' },
  width: { type: [String, Number], default: '100px' },
  maskColor: { type: String, default: '#007bff' }
});

const cssVariable = computed(() => {
  const _cssVariable = {};
  let height = null;
  let width = null;
  let maskColor = null;

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

  if (typeof props.maskColor === 'string' && props.maskColor !== '') {
    maskColor = props.maskColor;
  }

  if (width !== null) {
    _cssVariable['--hexagon_width'] = width;
  }
  if (height !== null) {
    _cssVariable['--hexagon_height'] = height;
  }
  if (maskColor !== null) {
    _cssVariable['--hexagon_mask_bg_color'] = maskColor;
  }

  return _cssVariable;
});
</script>

<style lang="scss">
.hexagon_container {
  --hexagon_width: 100px;
  --triangle_height: calc(var(--hexagon_width) / 3);
  --triangle_width: calc(var(--hexagon_width) / 2);
  // --hexagon_mask_bg_color: #007bff;
  --hexagon_mask_bg_color: #fff;

  position: relative;

  width: var(--hexagon_width);
  // height: 120px;
  height: var(--hexagon_height);

  &-top {
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;

    &::after {
      content: '';

      position: absolute;
      right: 0;

      width: 0;
      // width: 100%;
      height: 0;
      border-style: solid;
      border-width: 0 var(--triangle_width) var(--triangle_height) 0;
      border-color: transparent var(--hexagon_mask_bg_color) transparent
        transparent;
    }

    &::before {
      content: '';

      position: absolute;
      left: 0;

      width: 0;
      // width: 100%;
      height: 0;
      border-style: solid;
      border-width: var(--triangle_height) var(--triangle_width) 0 0;
      border-color: var(--hexagon_mask_bg_color) transparent transparent
        transparent;
    }
  }

  &-bottom {
    position: absolute;
    bottom: 0px;
    // top: calc(100% + );
    left: 0;
    right: 0;

    &::after {
      content: '';

      position: absolute;
      bottom: 0;
      right: 0;

      width: 0;
      // width: 100%;
      height: 0;
      border-style: solid;
      border-width: 0 0 var(--triangle_height) var(--triangle_width);
      border-color: transparent transparent var(--hexagon_mask_bg_color)
        transparent;
    }

    &::before {
      content: '';

      position: absolute;
      bottom: 0;
      left: 0;

      width: 0;
      // width: 100%;
      height: 0;
      border-style: solid;
      border-width: var(--triangle_height) 0 0 var(--triangle_width);
      border-color: transparent transparent transparent
        var(--hexagon_mask_bg_color);
    }
  }
}
</style>
