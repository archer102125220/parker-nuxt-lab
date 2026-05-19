<script setup>
import { COLLABORA_LOCALES } from '@app/components/CollaboraIframe.vue';

const { locale } = useI18n();
console.log(locale.value);
const currentLocale = computed(() => {
  const _locale =
    locale.value === 'zh'
      ? 'zh-TW'
      : locale.value === 'en'
        ? 'en-US'
        : locale.value;

  console.log({ _locale });

  const target = COLLABORA_LOCALES.find((item) => item.code === _locale);
  return target?.code ?? 'zh-TW';
});
</script>

<template>
  <div class="collabora_doc_page">
    <p>Collabora</p>
    <p>
      礙於本專案目前部署環境為 Vercel（Serverless Functions），而 Collabora 需要
      Docker 啟動主要編輯檔案的服務，因此本示範僅能在本機 Docker 環境下展示。
    </p>
    <CollaboraIframe
      class="collabora_doc_page-collabora"
      token="testToken"
      collabora-host="http://localhost:9980"
      file-type="docx"
      file-id="test.docx"
      wopi-host="http://192.168.139.3:3000/collabora"
      :language="currentLocale"
    />
  </div>
</template>

<style lang="scss" scoped>
.collabora_doc_page {
  width: 100%;
  height: 100vh;

  &-collabora {
    width: 100%;
    height: 100%;
  }
}
</style>
