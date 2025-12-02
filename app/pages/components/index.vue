<template>
  <section class="components_page">
    <p>
      <!-- 自製組件主要是為避免因套件版本相容性或專案性質不合適使用npm上相關工具之狀況，因此自己實作相關components -->
      {{ $t('components.description.span1') }}
    </p>
    <p>
      <!-- 其餘主要是因為該套件並未提供vue版本，因此整合供純js之版本為組件的方式做實作 -->
      {{ $t('components.description.span2') }}
    </p>
    <v-img
      class="components_page-banner"
      max-height="400"
      src="/img/components-page/components-page-v.05.webp"
    />
    <nav class="components_page-content" role="navigation">
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
const { t } = useI18n();

const linkList = computed(() => [
  {
    to: localePath('/components/tab-test'),
    //  label: 'Tabs組件測試',
    label: t('components.tab')
  },
  {
    to: localePath('/components/scroll-fetch'),
    // label: '下拉重載/無限滾動測試',
    label: t('components.scroll_fetch')
  },
  {
    to: localePath('/components/wang-editor-test'),
    // label: 'WangEditor（HTML編輯器）測試',
    label: t('components.wang_editor')
  },
  {
    to: localePath('/components/youtube-test'),
    //  label: 'Youtube測試',
    label: t('components.youtube')
  },
  {
    to: localePath('/components/components-test'),
    banner: '/img/components-test/components-test-v.05.webp',
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
  { to: localePath('/components/selector'), label: '下拉選單組件' },
  { to: localePath('/components/countdown-test'), label: '倒數計時組件' },
  { to: localePath('/components/skeleton-loader'), label: 'skeleton組件' },
  { to: localePath('/components/phone-input'), label: '電話號碼輸入組件' },
  { to: localePath('/components/banner-demo'), label: 'Banner 輪播組件測試' }
]);
</script>

<style lang="scss">
.components_page {
  &-banner {
    /* Display & Box Model */
    width: 100%;
    margin-bottom: 8px;
  }

  &-content {
    /* Display & Box Model */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px;

    &-link {
      /* Display & Box Model */
      flex: 1;
      flex-basis: 150px;
    }
  }
}
</style>
