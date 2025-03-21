<template>
  <div class="dialog_root" :style="cssVariable">
    <div
      v-if="modelValue === true"
      class="dialog_root-dialog"
      @click.self="handleClose"
      @transitionend="handleTransitionEnd"
    >
      <div class="dialog_root-dialog-center">
        <slot
          name="container"
          :is-show="modelValue"
          :title="title"
          :confirm="handleConfirm"
          :cancel="handleClose"
          :cancel-label="cancelLabel"
          :confirm-label="confirmLabel"
          :confirm-disabled="confirmDisabled"
        >
          <div class="dialog_root-dialog-center-container">
            <slot name="title" :title="title">
              <p class="dialog_root-dialog-center-container-title">
                {{ title }}
              </p>
            </slot>

            <slot>
              <div class="dialog_root-dialog-center-container-content">
                {{ content }}
              </div>
            </slot>

            <slot
              name="action"
              :confirm="handleConfirm"
              :cancel="handleClose"
              :cancel-label="cancelLabel"
              :confirm-label="confirmLabel"
              :confirm-disabled="confirmDisabled"
            >
              <div class="dialog_root-dialog-center-container-action">
                <slot
                  name="cancel"
                  :cancel="handleClose"
                  :cancel-label="cancelLabel"
                >
                  <v-btn
                    class="dialog_root-dialog-center-container-action-btn"
                    color="warning"
                    variant="outlined"
                    @click.stop="handleClose"
                  >
                    {{ cancelLabel }}
                  </v-btn>
                </slot>

                <slot
                  name="confirm"
                  :confirm="handleConfirm"
                  :confirm-label="confirmLabel"
                  :confirm-disabled="confirmDisabled"
                >
                  <v-btn
                    class="dialog_root-dialog-center-container-action-btn"
                    color="primary"
                    :disabled="confirmDisabled"
                    @click.stop="handleConfirm"
                  >
                    {{ confirmLabel }}
                  </v-btn>
                </slot>
              </div>
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
  position: { type: String, default: 'fixed' },
  rootPosition: { type: String, default: null },
  width: { type: [Number, String], default: null },
  minWidth: { type: [Number, String], default: '200px' },
  height: { type: [Number, String], default: null },
  minHeight: { type: [Number, String], default: null },
  zIndex: { type: [Number, String], default: 2 },
  title: { type: String, default: null },
  content: { type: String, default: null },
  confirmLabel: { type: String, default: '確定' },
  confirmDisabled: { type: Boolean, default: false },
  cancelLabel: { type: String, default: '取消' }
});
const emits = defineEmits(['update:modelValue', 'change', 'confirm', 'cancel']);

const opacityTrigger = ref(false);

const cssVariable = computed(() => {
  const _cssVariable = {};

  if (opacityTrigger.value === false) {
    _cssVariable['--dialog_opacity'] = '0';
  } else {
    _cssVariable['--dialog_opacity'] = '1';
  }

  if (typeof props.width === 'number') {
    _cssVariable['--dialog_width'] = `${props.width}px`;
  } else if (typeof props.width === 'string' && props.width !== '') {
    _cssVariable['--dialog_width'] = props.width;
  }

  if (typeof props.height === 'number') {
    _cssVariable['--dialog_height'] = `${props.height}px`;
  } else if (typeof props.height === 'string' && props.height !== '') {
    _cssVariable['--dialog_height'] = props.height;
  }

  if (typeof props.minWidth === 'number') {
    _cssVariable['--dialog_min_width'] = `${props.minWidth}px`;
  } else if (typeof props.minWidth === 'string' && props.minWidth !== '') {
    _cssVariable['--dialog_min_width'] = props.minWidth;
  }

  if (typeof props.minHeight === 'number') {
    _cssVariable['--dialog_min_height'] = `${props.minHeight}px`;
  } else if (typeof props.minHeight === 'string' && props.minHeight !== '') {
    _cssVariable['--dialog_min_height'] = props.minHeight;
  }

  if (
    typeof props.zIndex === 'number' ||
    (typeof props.zIndex === 'string' && props.zIndex !== '')
  ) {
    _cssVariable['--dialog_z_index'] = props.zIndex;
  }

  if (typeof props.position === 'string' && props.position !== '') {
    _cssVariable['--dialog_position'] = props.position;
  }

  if (typeof props.rootPosition === 'string' && props.rootPosition !== '') {
    _cssVariable['--dialog_root_position'] = props.rootPosition;
  } else if (props.position === 'absolute') {
    _cssVariable['--dialog_root_position'] = 'relative';
  }

  return _cssVariable;
});

watch(
  () => props.modelValue,
  (newIsShow) => {
    opacityTrigger.value = newIsShow;
  }
);

onMounted(() => {
  opacityTrigger.value = props.modelValue;
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

function handleConfirm() {
  emits('confirm');
  opacityTrigger.value = false;
}

function handleClose() {
  emits('cancel');
  opacityTrigger.value = false;
}
</script>

<style lang="scss" scoped>
@keyframes dialog_open {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes dialog_content {
  from {
    transform: translate(0px, 120px);
  }
  to {
    transform: translate(0px, 0px);
  }
}
.dialog_root {
  position: var(--dialog_root_position);

  &-dialog {
    position: var(--dialog_position, fixed);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--dialog_z_index, 2);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: #00000080;

    opacity: var(--dialog_opacity);

    transition: opacity 0.15s;

    animation-name: dialog_open;
    animation-duration: 0.3s;

    &-center {
      margin: auto;

      animation-name: dialog_content;
      animation-duration: 0.3s;

      &-container {
        display: flex;
        flex-direction: column;
        // justify-content: space-between;

        width: var(--dialog_width);
        height: var(--dialog_height);
        min-width: var(--dialog_min_width);
        min-height: var(--dialog_min_height);
        max-width: 100vw;
        max-height: 100vh;
        padding: 20px;
        border-radius: 8px;

        background-color: #fff;

        &-title {
          padding-bottom: 20px;

          font-size: 18px;
          font-weight: 600;
          line-height: 25.2px;
          text-align: center;
          color: #000000;
        }

        &-content {
          font-family: PingFang SC;
          font-size: 16px;
          font-weight: 400;
          line-height: 22.4px;
          text-align: left;
          text-underline-position: from-font;
          text-decoration-skip-ink: none;
          color: #909090;
        }

        &-action {
          display: flex;
          gap: 16px;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-around;

          margin-top: 16px;

          &-btn {
            // width: 135px;
            // width: 115px;
            // min-width: 135px;
            // min-width: 125px;
            min-width: 90px;
            min-height: 45px;
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>
