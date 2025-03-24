<template>
  <div class="drawer_root" :style="cssVariable">
    <slot
      name="openBtn"
      :open="handleOpen"
      :value="modelValue"
      :anchor="anchor"
    />
    <slot
      name="closeBtn"
      :close="handleClose"
      :value="modelValue"
      :anchor="anchor"
    />

    <div
      v-if="modelValue === true"
      class="drawer_root-wrapping"
      @click="handleClose"
      @transitionend="handleTransitionEnd"
    >
      <div v-if="hasMask === true" class="drawer_root-wrapping-mask" />
      <div
        :class="[
          'drawer_root-wrapping-drawer',
          {
            'drawer_root-wrapping-drawer_anchor_top': computedAnchor === 'top',
            'drawer_root-wrapping-drawer_anchor_bottom':
              computedAnchor === 'bottom',
            'drawer_root-wrapping-drawer_anchor_right':
              computedAnchor === 'right',
            'drawer_root-wrapping-drawer_anchor_left': computedAnchor === 'left'
          }
        ]"
        @click.stop=""
      >
        <slot name="container" :close="handleClose">
          <div class="drawer_root-wrapping-drawer-container">
            <slot :close="handleClose">
              <p>抽屜內容、抽屜內容、抽屜內容、抽屜內容、抽屜內容、抽屜內容</p>
              <p>抽屜內容</p>
              <p>抽屜內容</p>
              <p>抽屜內容</p>
              <p>抽屜內容</p>
              <p>抽屜內容</p>
              <p>抽屜內容</p>
              <p>抽屜內容</p>
              <p>抽屜內容</p>
              <p>抽屜內容</p>
              <p>抽屜內容</p>
            </slot>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  anchor: { type: String, default: 'left' },
  rootPosition: { type: String, default: null },
  wrappingPosition: { type: String, default: 'fixed' },
  position: { type: String, default: 'absolute' },
  hasMask: { type: Boolean, default: true },
  maskPosition: { type: String, default: 'absolute' }
});
const emits = defineEmits(['update:modelValue', 'change', 'close', 'open']);

const opacityTrigger = ref(false);
const animationReverse = ref(false);

const computedAnchor = computed(() => {
  const anchor = typeof props.anchor === 'string' ? props.anchor : '';
  return anchor.toLocaleLowerCase().trim() || 'left';
});
const cssVariable = computed(() => {
  const _cssVariable = {};

  if (opacityTrigger.value === false) {
    _cssVariable['--drawer_opacity'] = '0';
  } else {
    _cssVariable['--drawer_opacity'] = '1';
  }

  if (typeof props.rootPosition === 'string' && props.rootPosition !== '') {
    _cssVariable['--drawer_root_position'] = props.rootPosition;
  }
  if (
    typeof props.wrappingPosition === 'string' &&
    props.wrappingPosition !== ''
  ) {
    _cssVariable['--drawer_wrapping_position'] = props.wrappingPosition;
  }

  if (
    props.hasMask === true &&
    typeof props.maskPosition === 'string' &&
    props.maskPosition !== ''
  ) {
    _cssVariable['--drawer_mask_position'] = props.maskPosition;
  }

  if (typeof props.position === 'string' && props.position !== '') {
    _cssVariable['--drawer_position'] = props.position;
  }

  if (typeof props.width === 'number') {
    _cssVariable['--drawer_width'] = `${props.width}px`;
  } else if (typeof props.width === 'string' && props.width !== '') {
    _cssVariable['--drawer_width'] = props.width;
  }

  if (typeof props.height === 'number') {
    _cssVariable['--drawer_height'] = `${props.height}px`;
  } else if (typeof props.height === 'string' && props.height !== '') {
    _cssVariable['--drawer_height'] = props.height;
  }

  if (typeof props.minWidth === 'number') {
    _cssVariable['--drawer_min_width'] = `${props.minWidth}px`;
  } else if (typeof props.minWidth === 'string' && props.minWidth !== '') {
    _cssVariable['--drawer_min_width'] = props.minWidth;
  }

  if (typeof props.minHeight === 'number') {
    _cssVariable['--drawer_min_height'] = `${props.minHeight}px`;
  } else if (typeof props.minHeight === 'string' && props.minHeight !== '') {
    _cssVariable['--drawer_min_height'] = props.minHeight;
  }

  if (
    typeof props.zIndex === 'number' ||
    (typeof props.zIndex === 'string' && props.zIndex !== '')
  ) {
    _cssVariable['--drawer_z_index'] = props.zIndex;
  }

  if (computedAnchor.value === 'right') {
    _cssVariable['--drawer_top'] = '0px';
    _cssVariable['--drawer_bottom'] = '0px';
    _cssVariable['--drawer_right'] = '0px';
  } else if (computedAnchor.value === 'top') {
    _cssVariable['--drawer_top'] = '0px';
    _cssVariable['--drawer_left'] = '0px';
    _cssVariable['--drawer_right'] = '0px';
  } else if (computedAnchor.value === 'bottom') {
    _cssVariable['--drawer_bottom'] = '0px';
    _cssVariable['--drawer_left'] = '0px';
    _cssVariable['--drawer_right'] = '0px';
  } else {
    // _anchor === 'left'
    _cssVariable['--drawer_top'] = '0px';
    _cssVariable['--drawer_bottom'] = '0px';
    _cssVariable['--drawer_left'] = '0px';
  }

  if (animationReverse.value === true) {
    _cssVariable['--drawer_animation_duration'] = '0.6s';
    _cssVariable['--drawer_animation_count'] = 'infinite';
    _cssVariable['--drawer_animation_direction'] = 'reverse';
  } else {
    _cssVariable['--drawer_animation_duration'] = '0.3s';
    _cssVariable['--drawer_animation_count'] = '1';
    _cssVariable['--drawer_animation_direction'] = 'normal';
  }

  return _cssVariable;
});

watch(
  () => props.modelValue,
  (newModelValue) => {
    opacityTrigger.value = newModelValue;
    if (newModelValue === false) {
      animationReverse.value = false;
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }
);

onMounted(() => {
  opacityTrigger.value = props.modelValue;
  if (props.modelValue === false) {
    animationReverse.value = false;
  }
});

onBeforeUnmount(() => {
  emits('change', false);
  emits('update:modelValue', false);
  handleClose();
});

function handleTransitionEnd() {
  if (opacityTrigger.value === false && props.modelValue === true) {
    emits('change', false);
    emits('update:modelValue', false);
  }
}

function handleOpen() {
  opacityTrigger.value = true;
  animationReverse.value = false;
  emits('open');
}

function handleClose() {
  opacityTrigger.value = false;
  animationReverse.value = true;
  emits('close');
}
</script>

<style lang="scss">
@keyframes drawer_open {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes drawer_content_anchor_top {
  from {
    transform: translate(0px, -100vh);
  }
  to {
    transform: translate(0px, 0px);
  }
}
@keyframes drawer_content_anchor_bottom {
  from {
    transform: translate(0px, 100vh);
  }
  to {
    transform: translate(0px, 0px);
  }
}
@keyframes drawer_content_anchor_left {
  from {
    transform: translate(-100vh, 0px);
  }
  to {
    transform: translate(0px, 0px);
  }
}
@keyframes drawer_content_anchor_right {
  from {
    transform: translate(100vh, 0px);
  }
  to {
    transform: translate(0px, 0px);
  }
}
.drawer_root {
  position: var(--drawer_root_position);

  &-wrapping {
    position: var(--drawer_wrapping_position, fixed);
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    z-index: 1;

    opacity: var(--drawer_opacity);

    transition: opacity 0.2s;

    &-mask {
      position: var(--drawer_mask_position, absolute);
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;

      background-color: #00000080;

      transition: opacity 0.15s;

      animation-name: drawer_open;
      animation-duration: 0.3s;
    }

    &-drawer_anchor_top {
      animation-name: drawer_content_anchor_top;
    }
    &-drawer_anchor_bottom {
      animation-name: drawer_content_anchor_bottom;
    }
    &-drawer_anchor_left {
      animation-name: drawer_content_anchor_left;
    }
    &-drawer_anchor_right {
      animation-name: drawer_content_anchor_right;
    }
    &-drawer {
      position: var(--drawer_position, absolute);
      top: var(--drawer_top);
      right: var(--drawer_right);
      bottom: var(--drawer_bottom);
      left: var(--drawer_left);
      z-index: var(--drawer_z_index, 2);

      // animation: var(--drawer_animation);
      animation-duration: var(--drawer_animation_duration);
      animation-iteration-count: var(--drawer_animation_count);
      animation-direction: var(--drawer_animation_direction);

      &-container {
        width: var(--drawer_width);
        height: var(--drawer_height);
        min-width: var(--drawer_min_width);
        min-height: var(--drawer_min_height);
        max-width: 100vw;
        max-height: 100vh;

        overflow: auto;
        background-color: #fff;
      }
    }
  }
}
</style>
