<template>
  <div :class="statusClass">
    <div id="aframeSEOContent">
      <slot name="SEOContent" />
    </div>
    <ClientOnly>
      <div v-if="aframe?.api !== null" v-bind="$attrs">
        <slot />
      </div>
    </ClientOnly>
  </div>
</template>
<script setup>
import { useAframe } from '@app/aframe/hooks/useAframe';
import { useCustomLookControls } from '@app/aframe/hooks/useCustomLookControls';
import { useAframeLink } from '@app/aframe/hooks/useAframeLink';
import { useAframeDialogTrigger } from '@app/aframe/hooks/useAframeDialogTrigger';
import { useAframeSlideTrigger } from '@app/aframe/hooks/useAframeSlideTrigger';
import { useAframeSkyAnimation } from '@app/aframe/hooks/useAframeSkyAnimation';
import { useVideoControl } from '@app/aframe/hooks/useVideoControl';
import { useAframeDialogVideo } from '@app/aframe/hooks/useAframeDialogVideo';

const props = defineProps({
  class: {
    type: [String, Array],
    default: () => null
  }
});
const emit = defineEmits(['beforeAframeLoad', 'getAframe', 'afterAframeLoad']);

const statusClass = computed(() =>
  [
    'aframe_content',
    Array.isArray(props.class) ? props.class.join(' ') : props.class
  ].join(' ')
);

function beforeAframeLoad(...arg) {
  emit('beforeAframeLoad', ...arg);
}

function getAframe(...arg) {
  emit('getAframe', ...arg);
}

function afterAframeLoad(...arg) {
  console.log('AframeContent afterAframeLoad');
  emit('afterAframeLoad', ...arg);
}

const aframe = useAframe({
  beforeAframeLoad,
  getAframe,
  afterAframeLoad
});
useCustomLookControls();
useAframeLink();
useAframeDialogTrigger();
useAframeSlideTrigger();
useAframeSkyAnimation();
useVideoControl();
useAframeDialogVideo();
</script>

<style lang="scss" scoped>
.aframe_content {
  width: 100%;
  height: 100%;
  :deep(.a-enter-vr) {
    position: fixed;
    // bottom: 180px;
    top: calc(100vh - 100px);
  }
}
</style>
