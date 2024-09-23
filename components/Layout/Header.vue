<template>
  <div class="layout_header">
    <v-btn color="primary" @click="handleGoBack">返回</v-btn>
  </div>
</template>
<script setup>
const router = useRouter();
function handleGoBack() {
  router.back();
}
</script>

<style lang="scss" scoped>
.layout_header {
  margin: 8px;
}
</style>
