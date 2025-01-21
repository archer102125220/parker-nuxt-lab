<template>
  <div class="svg_color_change_page" :style="{ '--change_color': color }">
    <form @submit.prevent="">
      <v-color-picker v-model="color" />
      <p>{{ color }}</p>
    </form>
    <div class="svg_color_change_page-pseudo_elements">
      <p>偽元素測試：</p>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'svg替換顏色測試'
});
const color = ref('#000000');
</script>

<style lang="scss">
// https://codepen.io/noahblon/post/coloring-svgs-in-css-background-images
.svg_color_change_page {
  &-pseudo_elements {
    display: flex;
    &::after {
      content: '';
      display: block;
      width: 24px;
      height: 24px;

      background-color: var(--change_color, #fff);
      // background-image: url('@/static/android.svg');
      mask: url('/img/svg-color-change/android.svg');
    }
  }
}
</style>
