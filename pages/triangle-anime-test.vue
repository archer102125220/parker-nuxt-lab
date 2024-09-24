<template>
  <div class="triangle_anime_test_page" @click="handleAnime">
    <Triangle
      ref="triangleBgLeft"
      class="triangle_anime_test_page-triangle_background_left"
      height="100vh"
      width="100vw"
      angle-upper-left
      color="#fff"
    />
    <Triangle
      ref="triangleLeft"
      class="triangle_anime_test_page-triangle_left"
      height="100vh"
      width="100vw"
      angle-upper-left
      color="#89afff"
    />
    <Triangle
      ref="triangleBgRight"
      class="triangle_anime_test_page-triangle_background_right"
      height="100vh"
      width="100vw"
      angle-lower-right
      color="#fff"
    />
    <Triangle
      ref="triangleRight"
      class="triangle_anime_test_page-triangle_right"
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

// onMounted(() => {});
</script>

<style lang="scss">
.triangle_anime_test_page {
  background-color: #f2f9ff;
  height: 100vh;
  &-triangle_background_left {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  }
  &-triangle_left {
    position: fixed;
    top: -2px;
    left: -2px;
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
    right: -2px;
    bottom: -2px;
    z-index: 2;
  }
}
</style>
