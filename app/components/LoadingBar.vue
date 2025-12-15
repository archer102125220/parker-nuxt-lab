<template>
  <!-- <v-progress-linear
    v-if="loading"
    :height="height"
    indeterminate
    color="primary"
    class="loading_bar"
    :style="`--loading_width:${width};--loading_position:${position}`"
  /> -->
  <div
    v-if="loading"
    class="loading_bar"
    :style="`--loading_width:${width};--loading_height:${height}px;--loading_position:${position}`"
  />
</template>
<script setup>
console.log('components LoadingBar');

const props = defineProps({
  position: { type: String, default: 'absolute' },
  loading: { type: Boolean, default: false },
  height: { type: String, default: '6' },
  width: { type: String, default: '100%' }
});

console.log('components LoadingBar end');
</script>

<style lang="scss" scoped>
.loading_bar {
  // Positioning
  position: var(--loading_position);
  top: 0;
  left: 0;
  z-index: 10;

  // Display & Box Model
  width: var(--loading_width);
  height: var(--loading_height);
  border-radius: 2px;
  overflow: hidden;

  // Visual
  background-color: rgb(217 217 217 / 25%);

  // Animation
  transition: 0.4s linear;
  transition-property: width, background-color;

  &::after {
    // Display & Box Model
    display: block;
    width: 50%;
    height: var(--loading_height);

    // Visual
    background-color: $primary;

    // Animation
    animation: progressAnimationStrike 1.5s infinite;

    // Misc
    content: '';
  }
}
@keyframes progressAnimationStrike {
  from {
    transform: translateX(-150%);
  }
  to {
    transform: translateX(250%);
  }
}
</style>
