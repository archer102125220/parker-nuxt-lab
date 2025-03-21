<template>
  <div class="drawer_page">
    <Drawer v-model="isShow" :anchor="anchor" />

    <v-radio-group
      class="frontend_api_cach_test_page-form-http_method"
      v-model="anchor"
    >
      <v-radio color="primary" label="從上方進入" value="top" />
      <v-radio color="primary" label="從右側進入" value="right" />
      <v-radio color="primary" label="從下方進入" value="bottom" />
      <v-radio color="primary" label="從左側進入" value="left" />
      <v-radio color="primary" label="預設" value="" />
    </v-radio-group>
    <v-btn color="primary" @click="handleOpen">開啟</v-btn>
  </div>
</template>

<script setup>
const isShow = ref(false);
const anchor = ref('bottom');

function handleOpen() {
  isShow.value = true;
}
</script>

<style lang="scss" scoped>
.drawer_page {
}
</style>
