<script setup>
const props = defineProps({
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

<template>
  <div class="hexagon_container" :style="cssVariable">
    <div class="hexagon_container-top" />
    <slot />
    <div class="hexagon_container-bottom" />
  </div>
</template>

<style lang="scss">
.hexagon_container {
  --hexagon_width: 100px;
  --triangle_height: calc(var(--hexagon_width) / 3);
  --triangle_width: calc(var(--hexagon_width) / 2);
  // --hexagon_mask_bg_color: #007bff;
  --hexagon_mask_bg_color: #fff;

  // Positioning
  position: relative;

  // Display & Box Model
  width: var(--hexagon_width);
  height: var(--hexagon_height);

  &-top {
    // Positioning
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;

    &::after {
      // Positioning
      position: absolute;
      right: 0;

      // Display & Box Model
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 var(--triangle_width) var(--triangle_height) 0;
      border-color: transparent var(--hexagon_mask_bg_color) transparent
        transparent;

      // Misc
      content: '';
    }

    &::before {
      // Positioning
      position: absolute;
      left: 0;

      // Display & Box Model
      width: 0;
      height: 0;
      border-style: solid;
      border-width: var(--triangle_height) var(--triangle_width) 0 0;
      border-color: var(--hexagon_mask_bg_color) transparent transparent
        transparent;

      // Misc
      content: '';
    }
  }

  &-bottom {
    // Positioning
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;

    &::after {
      // Positioning
      position: absolute;
      right: 0;
      bottom: 0;

      // Display & Box Model
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 0 var(--triangle_height) var(--triangle_width);
      border-color: transparent transparent var(--hexagon_mask_bg_color)
        transparent;

      // Misc
      content: '';
    }

    &::before {
      // Positioning
      position: absolute;
      bottom: 0;
      left: 0;

      // Display & Box Model
      width: 0;
      height: 0;
      border-style: solid;
      border-width: var(--triangle_height) 0 0 var(--triangle_width);
      border-color: transparent transparent transparent
        var(--hexagon_mask_bg_color);

      // Misc
      content: '';
    }
  }
}
</style>
