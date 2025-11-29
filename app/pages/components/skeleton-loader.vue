<template>
  <div class="skeleton_loader_page">
    <v-checkbox
      v-model="loading"
      :value="true"
      color="primary"
      label="開啟載入中狀態"
    />
    <SkeletonLoader :loading="loading" class="skeleton_loader_page-skeleton">
      <p>載入完成區塊</p>
    </SkeletonLoader>
  </div>
</template>

<script setup>
useHeadMataData({
  title: 'skeleton組件'
});
const loading = ref(true);
</script>

<style lang="scss" scoped>
.skeleton_loader_page {
  &-skeleton {
    /* Display & Box Model */
    width: 100%;
    height: 323px;
  }
}
</style>
