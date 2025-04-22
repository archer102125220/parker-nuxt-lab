<template>
  <div class="home_page">
    <nav class="home_page-content">
      <NuxtLink
        v-for="link in linkList"
        :key="link.to"
        class="home_page-content-link"
        :to="link.to"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup>
// https://www.cnblogs.com/ganto/articles/17917868.html
const nuxtApp = useNuxtApp();

const localePath = useLocalePath();
const linkList = computed(() => [
  { to: localePath('/about'), label: '關於本站' },
  { to: localePath('/components'), label: '自製組件及第三方整合組件' },
  { to: localePath('/components-test'), label: '組件綜合測試' },
  { to: localePath('/directives'), label: '自製vue指令' },
  { to: localePath('/route'), label: 'route相關測試' },
  { to: localePath('/css-drawing'), label: 'css繪圖相關測試' },
  { to: localePath('/web-authn'), label: '生物辨識測試（原生）' },
  { to: localePath('/fido2-lib'), label: '生物辨識測試（fido2-lib）' },
  { to: localePath('/web-cam'), label: 'WebCam測試' },
  { to: localePath('/face-api'), label: 'face-api測試' },
  { to: localePath('/frontend-api-cach-test'), label: '前端api快取測試' }
]);
</script>

<style lang="scss">
.home_page {
  &-content {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 8px;
    // width: 80%;
    // margin: auto;

    &-link {
      flex: 1;
      flex-basis: 400px;
    }
  }
}
</style>
