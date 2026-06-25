<script setup>
import { COLLABORA_LOCALES } from '@app/components/CollaboraIframe.vue';

const route = useRoute();
const { locale } = useI18n();
const systemStore = useSystemStore();

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

// 表單狀態
const userId = useState(
  'collabora_doc_user_id',
  () => `user-${Math.floor(Math.random() * 1000)}`
);
const userName = ref('Test User');
const token = ref('');

</script>

<template>
  <div class="collabora_doc_page">
    <div class="collabora_doc_page-description">
      <p>{{ $t('collabora_doc_page.title') }}</p>
      <p>{{ $t('collabora_doc_page.description') }}</p>

      <v-btn
        href="https://hub.docker.com/r/collabora/code"
        target="_blank"
        rel="noopener noreferrer"
        color="grey-darken-4"
        rounded="xl"
        size="large"
      >
        <p>{{ $t('collabora_doc_page.docker_btn') }}</p>
        <v-icon icon="mdi-open-in-new" size="small" />
      </v-btn>
    </div>

    <OfficeToolCollaboraGuide />

    <OfficeToolAuthForm
      v-model:user-id="userId"
      v-model:user-name="userName"
      @success="token = $event"
    />

    <CollaboraIframe
      v-if="token"
      :key="token"
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
