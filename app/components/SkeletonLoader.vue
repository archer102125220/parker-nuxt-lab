<template>
  <div v-bind="$attrs" class="skeleton_loader" :css-fadein="loading === false">
    <div v-if="loading" class="skeleton_loader-loading" />
    <slot v-else />
  </div>
</template>

<script setup>
const props = defineProps({
  loading: { type: Boolean, default: false }
});
</script>

<style lang="scss">
@keyframes skeleton_animation {
  0% {
    background-position: 100% 100%;
  }
  50% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% -100%;
  }
}
@keyframes skeleton_after_animation {
  0% {
    transform: scale(4) translate(-100%, -100%);
  }
  50% {
    transform: scale(4) translate(0, 0);
  }
  100% {
    transform: scale(4) translate(100%, 100%);
  }
}

.skeleton_loader {
  &-loading {
    position: relative;

    height: 100%;
    width: 100%;
    // aspect-ratio: 1;
    border-radius: 1rem;

    overflow: hidden;
    // background-color: #dcdcdc;
    background: repeating-linear-gradient(126deg, #ededed, #dcdcdc, #ededed);
    // background: repeating-linear-gradient(
    //   126deg,
    //   #ededed 30%,
    //   #dcdcdc 50%,
    //   #ededed 70%
    // );
    // background-size: 400%;
    // animation: skeleton_animation 2.5s infinite linear;

    &:after {
      content: '';

      position: absolute;
      top: 0;
      bottom: 0;
      // right: 100%;
      right: 0;

      display: block;
      width: 100%;
      height: 100%;

      border-radius: 100%;

      // background: repeating-linear-gradient(90deg, #ededed, #dcdcdc);
      background: repeating-linear-gradient(
        126deg,
        #ededed 30%,
        #dcdcdc 50%,
        #ededed 70%
      );

      // animation: skeleton_after_animation 2.5s 2.5s infinite linear;
      animation: skeleton_after_animation 2.5s infinite linear;
    }
  }
}
</style>
