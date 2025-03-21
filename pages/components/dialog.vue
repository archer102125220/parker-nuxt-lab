<template>
  <div class="dialog_page">
    <Dialog v-model="isShow" />
    <v-btn color="primary" @click="handleOpen">開啟</v-btn>
  </div>
</template>

<script setup>
const isShow = ref(false);

function handleOpen() {
  isShow.value = true;
}
</script>

<style lang="scss" scoped>
.dialog_page {
}
</style>
