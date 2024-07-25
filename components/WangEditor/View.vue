<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <article class="wang_editor_view" v-bind="$attrs" v-html="value" />
</template>
<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  value: { type: String, default: '' }
});
</script>

<style lang="scss" scoped>
.wang_editor_view {
  width: 100%;
  height: 100%;
  :deep([data-w-e-is-void]) {
    text-align: center;
    iframe {
      width: 70vw;
      height: 50vh;
      max-width: 100%;
      @include tablet {
        width: 90vw;
        min-height: 90vw;
      }
    }
  }
}
</style>
