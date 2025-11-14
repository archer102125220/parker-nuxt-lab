<template>
  <div class="skeleton_loader_page">
    <SkeletonLoader :loading="true" class="skeleton_loader_page-skeleton" />
  </div>
</template>

<script setup>
useHeadMataData({
  title: 'skeleton組件'
});
</script>

<style lang="scss" scoped>
.skeleton_loader_page {
  &-skeleton {
    width: 100%;
    height: 323px;
  }
}
</style>
