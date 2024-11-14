<template>
  <div class="index_page">
    <NuxtLink
      v-for="link in linkList"
      :key="link.to"
      class="index_page-content"
      :to="link.to"
    >
      {{ link.label }}
    </NuxtLink>
  </div>
</template>

<script setup>
// https://www.cnblogs.com/ganto/articles/17917868.html
const nuxtApp = useNuxtApp();

const linkList = computed(() => [
  { to: '/components', label: '自製組件及第三方整合組件' },
  { to: '/components-test', label: '組件綜合測試' },
  { to: '/directives', label: '自製vue指令' },
  { to: '/route', label: 'route相關測試' },
  { to: '/css-drawing', label: 'css繪圖相關測試' },
  { to: '/web-authn', label: '生物辨識測試（原生）' },
  { to: '/fido2-lib', label: '生物辨識測試（fido2-lib）' },
  { to: '/web-cam', label: 'WebCam測試' },
  { to: '/face-api', label: 'face-api測試' }
]);
</script>

<style lang="scss">
.index_page {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  &-content {
    flex: 1;
    flex-basis: 400px;
  }
}
</style>
