<template>
  <div class="wang_editor_test_page">
    <WangEditor class="wang_editor_test_page-content" editorHeight="350px" />
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
useHead({
  title: 'Wang Editor整合測試'
});
</script>

<style lang="scss" scoped>
.wang_editor_test_page {
  &-content {
    margin-bottom: 8px;
  }
}
</style>
