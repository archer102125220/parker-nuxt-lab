<template>
  <div class="triangle_anime_test_page" @click="handleAnime">
    <Triangle
      ref="triangleLeft"
      class="triangle_anime_test_page-triangle_left"
      height="100vh"
      width="100vw"
      angle-upper-left
    />
    <Triangle
      ref="triangleRight"
      class="triangle_anime_test_page-triangle_right"
      height="100vh"
      width="100vw"
      angle-lower-right
      color="rgb(147, 147, 255)"
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

function handleAnime() {
  animejs({
    targets: triangleLeft.value?.el,
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
}

// onMounted(() => {});
</script>

<style lang="scss">
.triangle_anime_test_page {
  &-triangle_left {
    position: fixed;
    top: 0;
    left: 0;
  }

  &-triangle_right {
    position: fixed;
    right: 0;
    bottom: 0;
  }
}
</style>
