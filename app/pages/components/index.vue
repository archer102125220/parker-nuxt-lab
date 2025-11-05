<template>
  <section class="components_page">
    <p>
      自製組件主要是為避免因套件版本相容性或專案性質不合適使用npm上相關工具之狀況，因此自己實作相關components
    </p>
    <p>
      其餘主要是因為該套件並未提供vue版本，因此整合供純js之版本為組件的方式做實作
    </p>
    <v-img
      class="components_page-banner"
      src="/img/components-page/components-page-v.03.png"
    />
    <nav class="components_page-content">
      <!-- <NuxtLink
        v-for="link in linkList"
        :key="link.to"
        class="components_page-content-link"
        :to="link.to"
      >
        {{ link.label }}
      </NuxtLink> -->

      <LinkCard
        v-for="link in linkList"
        :key="link.to"
        :to="link.to"
        :banner="link.banner"
        :label="link.label"
        class="components_page-content-link"
      />
    </nav>
  </section>
</template>

<script setup>
useHeadMataData({
  title: '組件列表',
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} | 自製組件及第三方整合組件`
      : '自製組件及第三方整合組件';
  }
});
// https://www.cnblogs.com/ganto/articles/17917868.html
// const nuxtApp = useNuxtApp();

const localePath = useLocalePath();
const linkList = computed(() => [
  { to: localePath('/components/tab-test'), label: 'Tabs組件測試' },
  {
    to: localePath('/components/scroll-fetch-test'),
    label: '下拉重載/無限滾動測試'
  },
  {
    to: localePath('/components/wang-editor-test'),
    label: 'WangEditor（HTML編輯器）測試'
  },
  { to: localePath('/components/youtube-test'), label: 'Youtube測試' },
  {
    to: localePath('/components/components-test'),
    banner: '/img/components-test/components-test-v.03.png',
    label:
      '組件綜合測試（Tabs組件、下拉重載/無限滾動測試、WangEditor（HTML編輯器）、Youtube測試）'
  },
  { to: localePath('/components/swiper-js-test'), label: 'SwiperJs測試' },
  { to: localePath('/components/swiper-test'), label: '自製Swiper測試' },
  { to: localePath('/components/qr-code-test'), label: 'QRcode測試' },
  { to: localePath('/components/slide-in-panel'), label: '訊息佇列測試' },
  { to: localePath('/components/switch-button'), label: 'switch組件測試' },
  { to: localePath('/components/go-top'), label: '返回置頂組件測試' },
  {
    to: localePath('/components/virtual-scroller'),
    label: 'virtual-scroller組件測試'
  },
  { to: localePath('/components/enter-label'), label: '文字特效測試' },
  {
    to: localePath('/components/image-upload-test'),
    label: '選擇圖片組件測試'
  },
  { to: localePath('/components/dialog'), label: '彈窗組件' },
  { to: localePath('/components/drawer'), label: '抽屜收展組件' },
  { to: localePath('/components/selector'), label: '下拉選單組件' }
]);
</script>

<style lang="scss">
.components_page {
  &-banner {
    width: 100%;
  }

  &-content {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 8px;

    margin-top: 8px;

    &-link {
      flex: 1;
      flex-basis: 150px;
    }
  }
}
</style>
