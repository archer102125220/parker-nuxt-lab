<template>
  <div class="switch_button_page">
    <p>{{ value }}</p>
    <SwitchButton
      v-model="value"
      label="僅直播"
      color="rgba(144, 144, 144, 1)"
      bg-color="rgba(242, 243, 244, 1)"
      checked-color="rgba(227, 151, 83, 1)"
      checked-bg-color="rgba(253, 244, 239, 1)"
    />
  </div>
</template>

<script setup>
useHead({
  title: 'switch組件測試'
});

const value = ref(false);
</script>

<style lang="scss" scoped>
.switch_button_page {
}
</style>
