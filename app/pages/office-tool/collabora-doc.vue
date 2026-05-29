<script setup>
import { COLLABORA_LOCALES } from '@app/components/CollaboraIframe.vue';

const route = useRoute();
const { locale } = useI18n();
const language = computed(() => {
  const _locale =
    locale.value === 'zh'
      ? 'zh-TW'
      : locale.value === 'en'
        ? 'en-US'
        : locale.value;

  const target = COLLABORA_LOCALES.find((item) => item.code === _locale);
  return target?.code ?? 'zh-TW';
});

const token = computed(() => 'testToken');
const fileType = computed(() => route.query.type || 'docx');
const fileId = computed(() => route.query.file || 'test.docx');
const collaboraHost = computed(() => {
  return import.meta.env.VITE_COLLABORA_HOST || 'http://localhost:9980';
});
const wopiHost = computed(() => {
  return (
    import.meta.env.VITE_WOPI_HOST || 'http://192.168.139.3:3000/collabora'
  );
});
</script>

<template>
  <div class="collabora_doc_page">
    <div class="collabora_doc_page-description">
      <p>Collabora Doc 編輯器</p>
      <p>
        礙於本專案目前部署環境為 Vercel（Serverless Functions），而 Collabora
        需要 Docker 啟動主要編輯檔案的服務，因此本示範僅能在本機 Docker
        環境下展示。
      </p>

      <v-btn
        href="https://hub.docker.com/r/collabora/code"
        target="_blank"
        rel="noopener noreferrer"
        color="grey-darken-4"
        rounded="xl"
        size="large"
      >
        <p>Collabora Docker</p>
        <v-icon icon="mdi-open-in-new" size="small" />
      </v-btn>
    </div>

    <CollaboraIframe
      class="collabora_doc_page-collabora"
      :token="token"
      :collabora-host="collaboraHost"
      :file-type="fileType"
      :file-id="fileId"
      :wopi-host="wopiHost"
      :language="language"
    />
  </div>
</template>

<style lang="scss" scoped>
.collabora_doc_page {
  width: 100%;
  height: 100vh;

  &-description {
    margin-bottom: 16px;
  }

  &-collabora {
    width: 100%;
    height: 100%;
  }
}
</style>
