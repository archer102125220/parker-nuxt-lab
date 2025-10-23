<template>
  <footer class="layout_footer">
    <p class="layout_footer-copyright">&copy; {{ copyright }}</p>
  </footer>
</template>
<script setup>
const copyright = computed(() => {
  return `${new Date().getFullYear()} Parker Chen 的Nuxt實驗室. All rights reserved.`;
});
</script>

<style lang="scss" scoped>
.layout_footer {
  &-copyright {
    padding: 16px;
    text-align: right;
    margin-top: 32px;
    color: #666;
    font-size: 14px;
  }
}
</style>
