<template>
  <div class="animation_triangle_enter" @click="handleAnime">
    <Triangle
      ref="triangleBgLeft"
      class="animation_triangle_enter-triangle_background_left"
      height="100vh"
      width="100vw"
      angle-upper-left
      :color="leftBgColor"
    />
    <Triangle
      ref="triangleLeft"
      class="animation_triangle_enter-triangle_left"
      height="100vh"
      width="100vw"
      angle-upper-left
      :color="leftColor"
      :label="computedLeftLabel"
    >
      <slot name="leftLabel" :label="computedLeftLabel">
        <p>{{ computedLeftLabel }}</p>
      </slot>
    </Triangle>

    <slot name="default" />

    <Triangle
      ref="triangleBgRight"
      class="animation_triangle_enter-triangle_background_right"
      height="100vh"
      width="100vw"
      angle-lower-right
      :color="rightBgColor"
    />
    <Triangle
      ref="triangleRight"
      class="animation_triangle_enter-triangle_right"
      height="100vh"
      width="100vw"
      angle-lower-right
      :color="rightColor"
      :label="computedRightLabel"
    >
      <slot name="rightLabel" :label="computedRightLabel">
        <p>{{ computedRightLabel }}</p>
      </slot>
    </Triangle>
  </div>
</template>

<script setup>
import animejs from 'animejs';
import _debounce from 'lodash/debounce';

const triangleLeft = useTemplateRef('triangleLeft');
const triangleRight = useTemplateRef('triangleRight');
const triangleBgLeft = useTemplateRef('triangleBgLeft');
const triangleBgRight = useTemplateRef('triangleBgRight');

const props = defineProps({
  isMobile: { type: Boolean, default: null },
  leftLabel: { type: String, default: '' },
  label: { type: String, default: '' },
  rightLabel: { type: String, default: '' },
  leftColor: { type: String, default: '#89afff' },
  leftBgColor: { type: String, default: '#fff' },
  rightColor: { type: String, default: '#89afff' },
  rightBgColor: { type: String, default: '#fff' }
});
const emit = defineEmits(['animationInited', 'animationFinish']);

const isInited = ref(false);
const isOpened = ref(false);
const computedLeftLabel = computed(() => {
  if (typeof props.leftLabel === 'string' && props.leftLabel !== '') {
    return props.leftLabel;
  }

  const label = props.label || '';
  return label.substring(0, label.length / 2);
});
const computedRightLabel = computed(() => {
  if (typeof props.rightLabel === 'string' && props.rightLabel !== '') {
    return props.rightLabel;
  }

  const label = props.label || '';
  return label.substring(label.length / 2, label.length);
});

watch(
  () => props.isMobile,
  (newIsMobile, oldIsMobile) => {
    if (
      newIsMobile !== oldIsMobile &&
      isInited.value === false &&
      isOpened.value === false
    ) {
      isInited.value = false;
      handleAnimeInit(newIsMobile);
    }
  }
);

function promiseAnimeJs(payload = {}) {
  return new Promise((resolve) => {
    animejs({
      ...payload,
      complete(...arg) {
        if (typeof payload.complete === 'function') {
          payload.complete(...arg);
        }
        resolve();
      }
    });
  });
}

const handleAnimeInit = _debounce(async function handleAnimeInit(isMobile) {
  await Promise.all([
    promiseAnimeJs({
      targets: triangleLeft.value?.el,
      left: isMobile ? '-2px' : '-10px',
      // top: isMobile ? '-2px' : '-10px',
      // left: '-10px',
      top: '-10px',
      duration: 200
    }),
    promiseAnimeJs({
      targets: triangleRight.value?.el,
      right: isMobile ? '-2px' : '-10px',
      // bottom: isMobile ? '-2px' : '-10px',
      // right: '-10px',
      bottom: '-10px',
      duration: 200
    })
  ]);
  emit('animationInited');
  isInited.value = true;
}, 300);

async function handleAnime() {
  if (isInited.value === false) {
    return;
  }
  await Promise.all([
    promiseAnimeJs({
      targets: triangleLeft.value?.el,
      left: '-100vw',
      top: '-100vh',
      duration: 400
    }),
    promiseAnimeJs({
      targets: triangleBgLeft.value?.el,
      left: '-100vw',
      top: '-100vh',
      duration: 400
    }),
    promiseAnimeJs({
      targets: triangleRight.value?.el,
      right: '-100vw',
      bottom: '-100vh',
      duration: 400
    }),
    promiseAnimeJs({
      targets: triangleBgRight.value?.el,
      right: '-100vw',
      bottom: '-100vh',
      duration: 400
    })
  ]);

  isOpened.value = true;
  emit('animationFinish');
}

onMounted(() => {
  handleAnimeInit(props.isMobile);
});
</script>

<style lang="scss" scoped>
.animation_triangle_enter {
  &-triangle_background_left {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  }
  &-triangle_left {
    position: fixed;
    // top: -2px;
    // left: -2px;

    top: calc(100vh - 10px);
    left: calc(-100vw - 10px);
    z-index: 1;
  }

  &-triangle_background_right {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
  &-triangle_right {
    position: fixed;
    // right: -2px;
    // bottom: -2px;

    right: calc(-100vw - 10px);
    bottom: calc(100vh - 10px);
    z-index: 1;
  }
}
</style>
