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
      ref="drawerWrappingRef"
      :class="[
        'drawer_root-wrapping',
        { 'drawer_root-wrapping_animation_transition': hasAnimation === true }
      ]"
      @click="handleClose"
      @transitionend="handleTransitionEnd"
    >
      <div
        v-if="hasMask === true"
        :class="[
          'drawer_root-wrapping-mask',
          { 'drawer_root-wrapping-mask_animation': hasAnimation === true }
        ]"
      />
      <div
        ref="drawerRef"
        :class="[
          'drawer_root-wrapping-drawer',
          {
            'drawer_root-wrapping-drawer_anchor_top':
              hasAnimation === true && computedAnchor === 'top',
            'drawer_root-wrapping-drawer_anchor_bottom':
              hasAnimation === true && computedAnchor === 'bottom',
            'drawer_root-wrapping-drawer_anchor_right':
              hasAnimation === true && computedAnchor === 'right',
            'drawer_root-wrapping-drawer_anchor_left':
              hasAnimation === true && computedAnchor === 'left'
          }
        ]"
        @click.stop=""
      >
        <slot
          name="drag"
          :anchor="computedAnchor"
          :is-vertical="isVertical"
          :is-horizontal="isHorizontal"
          :click="handleDragBarClick"
          :dragStart="handleDragStart"
          :draging="handleDraging"
          :dragEnd="handleDragEnd"
        >
          <div
            class="drawer_root-wrapping-drawer-drag_bar"
            :anchor="computedAnchor"
            :is-vertical="isVertical"
            :is-horizontal="isHorizontal"
            @click="handleDragBarClick"
            @mousedown="handleDragStart"
            @mousemove="handleDraging"
            @mouseup="handleDragEnd"
            @touchstart="handleDragStart"
            @touchmove="handleDraging"
            @touchend="handleDragEnd"
          />
        </slot>

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
const INIT_DRAG_DURATION = 50;
const IS_VERTICAL = ['top', 'bottom'];
const IS_HORIZONTAL = ['right', 'left'];

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  hasAnimation: { type: Boolean, default: true },
  dragCloseDisabled: { type: Boolean, default: false },
  anchor: { type: String, default: 'left' },
  rootPosition: { type: String, default: null },
  wrappingPosition: { type: String, default: 'fixed' },
  hasMask: { type: Boolean, default: true },
  maskPosition: { type: String, default: 'absolute' },
  position: { type: String, default: 'absolute' },
  width: { type: [Number, String], default: null },
  minWidth: { type: [Number, String], default: null },
  maxWidth: { type: [Number, String], default: null },
  height: { type: [Number, String], default: null },
  minHeight: { type: [Number, String], default: null },
  maxHeight: { type: [Number, String], default: null },
  top: { type: [Number, String], default: '0px' },
  right: { type: [Number, String], default: '0px' },
  bottom: { type: [Number, String], default: '0px' },
  left: { type: [Number, String], default: '0px' },
  zIndex: { type: [Number, String], default: '1' },
  triggerPercentage: { type: [Number, String], default: 0.25 }
});
const emits = defineEmits(['update:modelValue', 'change', 'close', 'open']);

const drawerWrappingRef = useTemplateRef('drawerWrappingRef');
const drawerRef = useTemplateRef('drawerRef');

const opacityTrigger = ref(false);
const animationReverse = ref(false);

const isDragStart = ref(false);
const isDraging = ref(false);
const dragDuration = ref(INIT_DRAG_DURATION);
const dragMoveDistance = ref(0);
const dragStartY = ref(0);
const dragStartX = ref(0);

const computedAnchor = computed(() => {
  const anchor = typeof props.anchor === 'string' ? props.anchor : '';
  return anchor.toLocaleLowerCase().trim() || 'left';
});
const isVertical = computed(() => {
  return IS_VERTICAL.includes(computedAnchor.value);
});
const isHorizontal = computed(() => {
  return IS_HORIZONTAL.includes(computedAnchor.value);
});
const cssVariable = computed(() => {
  const _cssVariable = {};

  if (opacityTrigger.value === false) {
    _cssVariable['--drawer_opacity'] = '0';
  } else {
    _cssVariable['--drawer_opacity'] = '1';
  }

  if (isVertical.value === true) {
    _cssVariable['--drawer_drag_transform'] =
      `translate3d(0, ${dragMoveDistance.value}px, 0)`;
  } else if (isHorizontal.value === true) {
    _cssVariable['--drawer_drag_transform'] =
      `translate3d(${dragMoveDistance.value}px, 0, 0)`;
  }

  if (props.hasAnimation === true) {
    _cssVariable['--drawer_drag_transition'] =
      `transform ${dragDuration.value}ms`;
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

  if (
    typeof props.zIndex === 'number' ||
    (typeof props.zIndex === 'string' && props.zIndex !== '')
  ) {
    _cssVariable['--drawer_z_index'] = props.zIndex;
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

  if (typeof props.top === 'number') {
    _cssVariable['--drawers_wrapping_top'] = `${props.top}px`;
  } else if (typeof props.top === 'string' && props.top !== '') {
    _cssVariable['--drawers_wrapping_top'] = props.top;
  }

  if (typeof props.right === 'number') {
    _cssVariable['--drawers_wrapping_right'] = `${props.right}px`;
  } else if (typeof props.right === 'string' && props.right !== '') {
    _cssVariable['--drawers_wrapping_right'] = props.right;
  }

  if (typeof props.bottom === 'number') {
    _cssVariable['--drawers_wrapping_bottom'] = `${props.bottom}px`;
  } else if (typeof props.bottom === 'string' && props.bottom !== '') {
    _cssVariable['--drawers_wrapping_bottom'] = props.bottom;
  }

  if (typeof props.left === 'number') {
    _cssVariable['--drawers_wrapping_left'] = `${props.left}px`;
  } else if (typeof props.left === 'string' && props.left !== '') {
    _cssVariable['--drawers_wrapping_left'] = props.left;
  }

  if (
    typeof props.zIndex === 'number' ||
    (typeof props.zIndex === 'string' && props.zIndex !== '')
  ) {
    _cssVariable['--drawers_wrapping_z_index'] = props.zIndex;
  }

  let containerMinWidth = '';
  let containerMaxWidth = '';
  let containerMinHeight = '';
  let containerMaxHeight = '';
  if (typeof props.minWidth === 'number') {
    containerMinWidth = `${props.minWidth}px`;
  } else if (typeof props.minWidth === 'string' && props.minWidth !== '') {
    containerMinWidth = props.minWidth;
  }
  if (typeof props.maxWidth === 'number') {
    containerMaxWidth = `${props.minWidth}px`;
  } else if (typeof props.maxWidth === 'string' && props.maxWidth !== '') {
    containerMaxWidth = props.maxWidth;
  }
  if (typeof props.maxHeight === 'number') {
    containerMaxHeight = `${props.maxHeight}px`;
  } else if (typeof props.maxHeight === 'string' && props.maxHeight !== '') {
    containerMaxHeight = props.maxHeight;
  }

  if (computedAnchor.value === 'right') {
    _cssVariable['--drawer_top'] = '0px';
    _cssVariable['--drawer_bottom'] = '0px';
    _cssVariable['--drawer_right'] = '0px';
    if (containerMaxWidth === '') {
      containerMaxWidth = '90%';
    }
    if (containerMinHeight === '') {
      containerMinHeight = '100%';
    }
  } else if (computedAnchor.value === 'top') {
    _cssVariable['--drawer_top'] = '0px';
    _cssVariable['--drawer_left'] = '0px';
    _cssVariable['--drawer_right'] = '0px';
    if (containerMaxHeight === '') {
      containerMaxHeight = '90%';
    }
    if (containerMinWidth === '') {
      containerMinWidth = '100%';
    }
  } else if (computedAnchor.value === 'bottom') {
    _cssVariable['--drawer_bottom'] = '0px';
    _cssVariable['--drawer_left'] = '0px';
    _cssVariable['--drawer_right'] = '0px';
    if (containerMaxHeight === '') {
      containerMaxHeight = '90%';
    }
    if (containerMinWidth === '') {
      containerMinWidth = '100%';
    }
  } else {
    // computedAnchor.value === 'left'
    _cssVariable['--drawer_top'] = '0px';
    _cssVariable['--drawer_bottom'] = '0px';
    _cssVariable['--drawer_left'] = '0px';
    if (containerMaxWidth === '') {
      containerMaxWidth = '90%';
    }
    if (containerMinHeight === '') {
      containerMinHeight = '100%';
    }
  }

  if (containerMinWidth !== '') {
    _cssVariable['--drawer_min_width'] = containerMinWidth;
  }
  if (containerMinHeight !== '') {
    _cssVariable['--drawer_min_height'] = containerMinHeight;
  }
  if (containerMaxWidth !== '') {
    _cssVariable['--drawer_max_width'] = containerMaxWidth;
  }
  if (containerMaxHeight !== '') {
    _cssVariable['--drawer_max_height'] = containerMaxHeight;
  }

  if (animationReverse.value === true) {
    _cssVariable['--drawer_animation_duration'] = '0.6s';
    _cssVariable['--drawer_animation_count'] = '2';
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
    if (typeof document?.querySelector === 'function') {
      if (newModelValue === false) {
        animationReverse.value = false;
        document.querySelector('html').classList.remove('drawer_open');
      } else {
        document.querySelector('html').classList.add('drawer_open');
      }
    }
  }
);

onBeforeRouteLeave(() => {
  if (opacityTrigger.value === true) {
    handleClose();
    return false;
  }

  return true;
});

onMounted(() => {
  handleInit();
});
onActivated(() => {
  handleInit();
});

onDeactivated(() => {
  handleBeforeUnmount();
});
onBeforeUnmount(() => {
  handleBeforeUnmount();
});

function handleInit() {
  opacityTrigger.value = props.modelValue;
  if (props.modelValue === false) {
    animationReverse.value = false;
  }
  window.addEventListener('keydown', handleWindowClose);
}

function handleBeforeUnmount() {
  emits('change', false);
  emits('update:modelValue', false);
  handleClose();
  window.removeEventListener('keydown', handleWindowClose);
}

function handleTransitionEnd() {
  if (opacityTrigger.value === false && props.modelValue === true) {
    emits('change', false);
    emits('update:modelValue', false);

    dragDuration.value = 300;
    dragMoveDistance.value = 0;
  }
}

function handleOpen() {
  emits('open');
  if (typeof document?.querySelector === 'function') {
    document.querySelector('html').classList.add('drawer_open');
  }
  opacityTrigger.value = true;
  animationReverse.value = false;
}

function handleClose() {
  emits('close');
  if (typeof document?.querySelector === 'function') {
    document.querySelector('html').classList.remove('drawer_open');
  }
  opacityTrigger.value = false;
  animationReverse.value = true;
}

function handleWindowClose(e) {
  if (e?.keyCode === 27) {
    handleClose();
  }
}

function handleDragBarClick() {
  if (props.dragCloseDisabled === false) return;
  handleClose();
}

function handleDragStart(e) {
  if (props.dragCloseDisabled === true) return;

  isDragStart.value = true;
  dragDuration.value = INIT_DRAG_DURATION;
  dragMoveDistance.value = 0;

  if (isVertical.value === true) {
    dragStartY.value =
      e.targetTouches?.[0]?.clientY ||
      e.targetTouches?.[0]?.pageY ||
      e.targetTouches?.[0]?.offsetY ||
      e.changedTouches?.[0]?.clientY ||
      e.changedTouches?.[0]?.pageY ||
      e.changedTouches?.[0]?.offsetY ||
      e.clientY ||
      e.pageY ||
      e.offsetY;
  } else if (isHorizontal.value === true) {
    dragStartX.value =
      e.targetTouches?.[0]?.clientX ||
      e.targetTouches?.[0]?.pageX ||
      e.targetTouches?.[0]?.offsetX ||
      e.changedTouches?.[0]?.clientX ||
      e.changedTouches?.[0]?.pageX ||
      e.changedTouches?.[0]?.offsetX ||
      e.clientX ||
      e.pageX ||
      e.offsetX;
  }
}

function handleDraging(e) {
  if (props.dragCloseDisabled === true || isDragStart.value === false) return;

  let move = 0;
  let dragStart = 0;

  if (isVertical.value === true) {
    dragStart = dragStartY.value;

    const currentClientY =
      e.targetTouches?.[0]?.clientY ||
      e.targetTouches?.[0]?.pageY ||
      e.targetTouches?.[0]?.offsetY ||
      e.changedTouches?.[0]?.clientY ||
      e.changedTouches?.[0]?.pageY ||
      e.changedTouches?.[0]?.offsetY ||
      e.clientY ||
      e.pageY ||
      e.offsetY;
    move = currentClientY - dragStartY.value;
  } else if (isHorizontal.value === true) {
    dragStart = dragStartX.value;

    const currentClientX =
      e.targetTouches?.[0]?.clientX ||
      e.targetTouches?.[0]?.pageX ||
      e.targetTouches?.[0]?.offsetX ||
      e.changedTouches?.[0]?.clientX ||
      e.changedTouches?.[0]?.pageX ||
      e.changedTouches?.[0]?.offsetX ||
      e.clientX ||
      e.pageX ||
      e.offsetX;
    move = currentClientX - dragStartX.value;
  }

  const drawerRect = drawerRef.value.getBoundingClientRect();
  const drawerWrapperRect = drawerWrappingRef.value.getBoundingClientRect();

  if (dragStart > 0) {
    if (
      (computedAnchor.value === 'right' &&
        drawerRect.right + move >= drawerWrapperRect.right) ||
      (computedAnchor.value === 'bottom' &&
        drawerRect.bottom + move >= drawerWrapperRect.bottom) ||
      (computedAnchor.value === 'left' &&
        drawerRect.left + move <= drawerWrapperRect.left) ||
      (computedAnchor.value === 'top' &&
        drawerRect.top + move <= drawerWrapperRect.top)
    ) {
      dragMoveDistance.value = move;
    } else {
      dragMoveDistance.value = 0;
    }

    isDraging.value = true;
  } else {
    isDraging.value = false;
  }
}

function handleDragEnd(e) {
  isDragStart.value = false;
  dragStartY.value = 0;
  dragStartX.value = 0;

  let triggerNumber = 0;
  if (isVertical.value === true) {
    triggerNumber =
      (drawerWrappingRef.value?.offsetHeight || 0) *
      Number(props.triggerPercentage);
  } else if (isHorizontal.value === true) {
    triggerNumber =
      (drawerWrappingRef.value?.offsetWidth || 0) *
      Number(props.triggerPercentage);
  }

  const _dragMoveDistance = Math.abs(dragMoveDistance.value);
  if (_dragMoveDistance >= triggerNumber) {
    handleClose();
  } else {
    dragDuration.value = 300;
    dragMoveDistance.value = 0;
  }
}
</script>

<style lang="scss">
.drawer_open {
  overflow: hidden;

  *:not(.drawer_root):not(.drawer_root *) {
    overflow: hidden;
  }
}
</style>

<style lang="scss" scoped>
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
    transform: translate(0px, -200vh);
  }
  to {
    transform: translate(0px, 0px);
  }
}
@keyframes drawer_content_anchor_bottom {
  from {
    transform: translate(0px, 200vh);
  }
  to {
    transform: translate(0px, 0px);
  }
}
@keyframes drawer_content_anchor_left {
  from {
    transform: translate(-200vh, 0px);
  }
  to {
    transform: translate(0px, 0px);
  }
}
@keyframes drawer_content_anchor_right {
  from {
    transform: translate(200vh, 0px);
  }
  to {
    transform: translate(0px, 0px);
  }
}
.drawer_root {
  position: var(--drawer_root_position);

  &-wrapping {
    position: var(--drawer_wrapping_position, fixed);
    // top: 0px;
    // right: 0px;
    // bottom: 0px;
    // left: 0px;
    // z-index: 1;
    top: var(--drawer_wrapping_top, 0px);
    right: var(--drawer_wrapping_right, 0px);
    bottom: var(--drawer_wrapping_bottom, 0px);
    left: var(--drawer_wrapping_left, 0px);
    z-index: var(--drawer_wrapping_z_index, 1);

    opacity: var(--drawer_opacity);

    transition: opacity 0.01s;

    &-mask {
      position: var(--drawer_mask_position, absolute);
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;

      background-color: #00000080;
    }
    &-mask_animation {
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

      max-width: var(--drawer_max_width, 100vw);
      max-height: var(--drawer_max_height, 100vh);

      // animation: var(--drawer_animation);
      animation-direction: var(--drawer_animation_direction);
      animation-duration: var(--drawer_animation_duration);
      animation-iteration-count: var(--drawer_animation_count);

      overflow: auto;

      transform: var(--drawer_drag_transform);
      transition: var(--drawer_drag_transition);

      &-drag_bar {
        position: absolute;

        display: flex;
        flex-direction: row;
        justify-content: center;

        padding-top: 5px;

        background-color: #fff;

        &[is-vertical='true'] {
          width: 100%;
          height: 20px;

          &[anchor='top'] {
            bottom: 0px;
          }
          &[anchor='bottom'] {
            top: 0px;
          }
          &:after {
            content: '';

            width: 31px;
            height: 3px;
            border-radius: 8px;

            background-color: #e4e4e4;
          }
        }
        &[is-horizontal='true'] {
          width: 20px;
          // height: 100%;
          top: 0px;
          bottom: 0px;

          align-items: center;

          &[anchor='left'] {
            right: 0px;
          }
          &[anchor='right'] {
            left: 0px;
          }
          &:after {
            content: '';

            width: 3px;
            height: 31px;
            border-radius: 8px;

            background-color: #e4e4e4;
          }
        }
      }

      &-container {
        width: var(--drawer_width);
        height: var(--drawer_height);
        min-width: var(--drawer_min_width);
        min-height: var(--drawer_min_height);
        max-width: 100%;
        max-height: 100%;

        overflow: auto;
        background-color: #fff;
      }
    }
  }

  &-wrapping_animation_transition {
    transition: opacity 0.2s;
  }
}
</style>
