<template>
  <div class="animation_triangle_enter" @click="handleAnime">
    <Triangle
      ref="triangleBgLeft"
      class="animation_triangle_enter-triangle_background_left"
      height="100vh"
      width="100vw"
      angle-upper-left
      color="#fff"
    />
    <Triangle
      ref="triangleLeft"
      class="animation_triangle_enter-triangle_left"
      height="100vh"
      width="100vw"
      angle-upper-left
      color="#89afff"
    />
    <slot />
    <Triangle
      ref="triangleBgRight"
      class="animation_triangle_enter-triangle_background_right"
      height="100vh"
      width="100vw"
      angle-lower-right
      color="#fff"
    />
    <Triangle
      ref="triangleRight"
      class="animation_triangle_enter-triangle_right"
      height="100vh"
      width="100vw"
      angle-lower-right
      color="#89afff"
    />
  </div>
</template>

<script setup>
import animejs from 'animejs';

// const nuxtApp = useNuxtApp();
useHead({
  title: 'css三角形滿版動畫測試'
});

const triangleLeft = useTemplateRef('triangleLeft');
const triangleRight = useTemplateRef('triangleRight');
const triangleBgLeft = useTemplateRef('triangleBgLeft');
const triangleBgRight = useTemplateRef('triangleBgRight');

function handleAnime() {
  animejs({
    targets: triangleLeft.value?.el,
    left: '-100vw',
    top: '-100vh',
    duration: 400
  });
  animejs({
    targets: triangleBgLeft.value?.el,
    left: '-100vw',
    top: '-100vh',
    duration: 400
  });
  animejs({
    targets: triangleRight.value?.el,
    right: '-100vw',
    bottom: '-100vh',
    duration: 400
  });
  animejs({
    targets: triangleBgRight.value?.el,
    right: '-100vw',
    bottom: '-100vh',
    duration: 400
  });
}

onMounted(() => {
  animejs({
    targets: triangleLeft.value?.el,
    left: '-2px',
    top: '-2px',
    duration: 200
  });
  animejs({
    targets: triangleRight.value?.el,
    right: '-2px',
    bottom: '-2px',
    duration: 200
  });
});
</script>

<style lang="scss">
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

    top: calc(100vh - 2px);
    left: calc(-100vw - 2px);
    z-index: 2;
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

    right: calc(-100vw - 2px);
    bottom: calc(100vh - 2px);
    z-index: 2;
  }
}
</style>
