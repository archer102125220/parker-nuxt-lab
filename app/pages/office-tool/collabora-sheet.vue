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

const fileType = computed(() => route.query.type || 'xlsx');
const fileId = computed(() => route.query.file || 'test.xlsx');
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
  'collabora_sheet_user_id',
  () => `user-${Math.floor(Math.random() * 1000)}`
);
const userName = ref('Test User');
const token = ref('');

const { $successMessage } = useNuxtApp();

function onCollaboraClose() {
  // 關閉編輯器：清除 token 即可返回表單
  token.value = '';
}

function onCollaboraSave() {
  $successMessage('文件已儲存！ (File Saved)');
}
</script>

<template>
  <div class="collabora_sheet_page">
    <div class="collabora_sheet_page-description">
      <p>{{ $t('collabora_sheet_page.title') }}</p>
      <a
        href="https://hub.docker.com/r/collabora/code"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ $t('collabora_sheet_page.docker_btn') }}
      </a>
      <p>{{ $t('collabora_sheet_page.description') }}</p>
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
      class="collabora_sheet_page-collabora"
      :token="token"
      :collabora-host="collaboraHost"
      :file-id="fileId"
      :file-type="fileType"
      :wopi-host="wopiHost"
      :language="language"
      @close="onCollaboraClose"
      @save="onCollaboraSave"
    />
  </div>
</template>

<style lang="scss" scoped>
.collabora_sheet_page {
  width: 100%;
  height: 100%;
  min-height: 100vh;

  &-description {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    column-gap: 16px;

    margin-bottom: 16px;
  }

  &-collabora {
    width: 100%;
    height: 90vh;
  }
}
</style>
