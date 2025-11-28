<template>
  <section class="index_page">
    <nav class="index_page-content" role="navigation">
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
  </section>
</template>

<script setup>
useHeadMataData();
definePageMeta({
  title: 'system.defaultTitle'
});

const localePath = useLocalePath();
const { t } = useI18n();

const linkList = computed(() => [
  {
    to: localePath('/about'),
    banner: '/img/about/about-v.10.webp',
    // label: '關於本站',
    label: t('index.about')
  },
  {
    to: localePath('/components'),
    banner: '/img/components-page/components-page-v.05.webp',
    // label: '自製組件及第三方整合組件',
    label: t('index.components')
  },
  // {
  //   to: localePath('/components-test'),
  //   banner: '/img/components-test/components-test-v.05.webp',
  //   label: '組件綜合測試'
  // },
  {
    to: localePath('/directives'),
    banner: '/img/vue-directives/vue-directives-v.04.webp',
    // label: '自製vue指令',
    label: t('index.directives')
  },
  {
    to: localePath('/route'),
    banner: '/img/route/route-v.05.webp',
    // label: 'route相關測試',
    label: t('index.route')
  },
  {
    to: localePath('/css-drawing'),
    banner: '/img/css-drawing/css-drawing-v.05.webp',
    // label: 'css繪圖相關測試',
    label: t('index.css_drawing')
  },
  {
    to: localePath('/web-authn'),
    banner: '/img/web-authn/web-authn-v.06.webp',
    // label: '生物辨識測試（原生）',
    label: t('index.web_authn')
  },
  {
    to: localePath('/fido2-lib'),
    banner: '/img/fido2-lib/fido2-lib-v.09.webp',
    // label: '生物辨識測試（fido2-lib）',
    label: t('index.fido2_lib')
  },
  {
    to: localePath('/web-cam'),
    banner: '/img/web-cam/web-cam-v.05.webp',
    // label: 'WebCam測試',
    label: t('index.web_cam')
  },
  {
    to: localePath('/face-api'),
    banner: '/img/face-api/face-api-v.04.webp',
    // label: 'face-api測試',
    label: t('index.face_api')
  },
  {
    to: localePath('/frontend-api-cach-test'),
    banner: '/img/frontend-api-cach/frontend-api-cach-v.06.webp',
    // label: '前端api快取測試',
    label: t('index.frontend_cach_api')
  },
  {
    to: localePath('/firebase'),
    banner: '/img/firebase/firebase-v.07.webp',
    // label: 'firebase整合測試',
    label: t('index.firebase')
  },
  {
    to: localePath('/socket-test'),
    banner: '/img/socket/socket-v.05.webp',
    // label: 'socket測試',
    label: t('index.socket')
  },
  {
    to: localePath('/server-sent-event-test'),
    banner: '/img/server-sent-event/server-sent-event-v.04.webp',
    // label: 'Server Sent Event測試',
    label: t('index.server_sent_event')
  },
  {
    to: localePath('/web-rtc'),
    banner: '/img/web-rtc/web-rtc-v.04.webp',
    // label: 'WebRTC測試',
    label: t('index.web_rtc')
  }
  // { to: localePath('/face-swap'), label: 'AI 換臉 測試' }
]);
</script>

<style lang="scss">
.index_page {
  &-content {
    /* Display & Box Model */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 24px;
    column-gap: 8px;
    // width: 80%;
    // margin: auto;

    &-link {
      /* Display & Box Model */
      flex: 1;
      flex-basis: 150px;
    }
  }
}
</style>
