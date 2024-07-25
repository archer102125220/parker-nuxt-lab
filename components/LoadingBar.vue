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
const props = defineProps({
  position: { type: String, default: 'absolute' },
  loading: { type: Boolean, default: false },
  height: { type: String, default: '6' },
  width: { type: String, default: '100%' }
});
</script>

<style lang="scss" scoped>
.loading_bar {
  position: var(--loading_position);
  top: 0;
  left: 0;
  z-index: 10;
  width: var(--loading_width);

  height: var(--loading_height);
  background-color: rgb(217 217 217 / 25%);
  border-radius: 2px;
  transition: 0.4s linear;
  transition-property: width, background-color;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: var(--loading_height);
    width: 50%;
    // background-color: #fcbc51;
    background-color: $primary;
    animation: progressAnimationStrike 1.5s infinite;
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