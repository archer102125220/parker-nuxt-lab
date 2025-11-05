<template>
  <div class="index_page">
    <nav class="index_page-content">
      <!-- <NuxtLink
      v-for="link in linkList"
      :key="link.to"
      class="index_page-content-link"
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
        class="index_page-content-link"
      />
    </nav>
  </div>
</template>

<script setup>
useHeadMataData();
const localePath = useLocalePath();
const { t } = useI18n();

const linkList = computed(() => [
  {
    to: localePath('/about'),
    banner: '/img/about/about-v.08.png',
    // label: '關於本站',
    label: t('index.about')
  },
  {
    to: localePath('/components'),
    banner: '/img/components-page/components-page-v.03.png',
    // label: '自製組件及第三方整合組件',
    label: t('index.components')
  },
  // {
  //   to: localePath('/components-test'),
  //   banner: '/img/components-test/components-test-v.03.png',
  //   label: '組件綜合測試'
  // },
  {
    to: localePath('/directives'),
    banner: '/img/vue-directives/vue-directives-v.02.png',
    // label: '自製vue指令',
    label: t('index.directives')
  },
  {
    to: localePath('/route'),
    banner: '/img/route/route-v.03.png',
    // label: 'route相關測試',
    label: t('index.route')
  },
  {
    to: localePath('/css-drawing'),
    banner: '/img/css-drawing/css-drawing-v.03.png',
    // label: 'css繪圖相關測試',
    label: t('index.css_drawing')
  },
  {
    to: localePath('/web-authn'),
    banner: '/img/web-authn/web-authn-v.02.png',
    // label: '生物辨識測試（原生）',
    label: t('index.web_authn')
  },
  {
    to: localePath('/fido2-lib'),
    banner: '/img/fido2-lib/fido2-lib-v.06.png',
    // label: '生物辨識測試（fido2-lib）',
    label: t('index.fido2_lib')
  },
  {
    to: localePath('/web-cam'),
    // label: 'WebCam測試',
    label: t('index.web_cam')
  },
  {
    to: localePath('/face-api'),
    // label: 'face-api測試',
    label: t('index.fido2_lib')
  },
  {
    to: localePath('/frontend-api-cach-test'),
    // label: '前端api快取測試',
    label: t('index.frontend_cach_api')
  },
  {
    to: localePath('/firebase'),
    // label: 'firebase整合測試',
    label: t('index.firebase')
  },
  {
    to: localePath('/socket-test'),
    // label: 'socket測試',
    label: t('index.socket')
  },
  {
    to: localePath('/server-sent-event-test'),
    // label: 'Server Sent Event測試',
    label: t('index.server_sent_event')
  },
  {
    to: localePath('/web-rtc'),
    // label: 'WebRTC測試',
    label: t('index.web_rtc')
  }
  // { to: localePath('/face-swap'), label: 'AI 換臉 測試' }
]);
</script>

<style lang="scss">
.index_page {
  &-content {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    row-gap: 24px;
    column-gap: 8px;

    // width: 80%;
    // margin: auto;

    &-link {
      flex: 1;
      flex-basis: 150px;
    }
  }
}
</style>
