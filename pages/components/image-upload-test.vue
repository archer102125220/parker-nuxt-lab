<template>
  <div class="image_upload_test_page">
    <ImageUpload
      v-model="identifyImage"
      @update:model-value="identifyImage = $event"
    />
  </div>
</template>

<script setup>
useHead({
  title: '選擇圖片組件測試'
});
const identifyImage = ref('');
</script>

<style lang="scss" scoped>
.image_upload_test_page {
  min-height: 100vh;
}
</style>
