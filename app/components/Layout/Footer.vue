<template>
  <footer class="layout_footer" :css-animation="animation">
    <p class="layout_footer-copyright">&copy; {{ copyright }}</p>
  </footer>
</template>
<script setup>
const animation = computed(() => {
  if (import.meta.client) {
    return window.___IS_NUXT_INITED__ !== true;
  }
  return true;
});
const copyright = computed(() => {
  return `${new Date().getFullYear()} Parker Chen 的Nuxt實驗室. All rights reserved.`;
});

onMounted(() => {
  window.___IS_NUXT_INITED__ = true;
});
</script>

<style lang="scss" scoped>
@keyframes footerEnterAnimation {
  from {
    opacity: 0;
    transform: translate(0px, 120px);
  }

  to {
    opacity: 1;
    transform: translate(0px, 0px);
  }
}

.layout_footer {
  &[css-animation='true'] {
    animation-name: footerEnterAnimation;
    animation-duration: 0.3s;
  }
  &-copyright {
    padding: 16px;
    text-align: right;
    margin-top: 32px;
    color: #666;
    font-size: 14px;
  }
}
</style>
