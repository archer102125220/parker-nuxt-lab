<script setup>
import { COLLABORA_LOCALES } from '@app/components/CollaboraIframe.vue';

const route = useRoute();
// const router = useRouter();
const { locale, t } = useI18n();

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

const queryFileType = computed(() => route.query.type || 'docx');
const queryFileId = computed(() => route.query.file || 'test.docx');
const fileType = ref(queryFileType.value);
const fileId = ref(queryFileId.value);
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
const permissions = useState('collabora_permissions', () => ({
  DisableWrite: false,
  DisableRename: false,
  DisableSaveAs: false,
  DisableExport: false,
  DisableCopy: false,
  DisablePrint: false
}));

const { $successMessage } = useNuxtApp();

function onCollaboraClose() {
  console.log('onCollaboraClose');
  // 關閉編輯器：清除 token 即可返回表單
  token.value = '';
}

function onCollaboraSave() {
  $successMessage(t('collabora.file_saved'));
}

function onCollaboraSaveAs(msgData, newFilename) {
  $successMessage(t('collabora.file_saved_as', { filename: newFilename }));
  // const newFileType = newFilename.includes('.')
  //   ? newFilename.split('.').pop()
  //   : fileType.value;

  // router.push({
  //   query: {
  //     ...route.query,
  //     file: newFilename,
  //     type: newFileType
  //   }
  // });
}

watch(
  () => [queryFileType.value, queryFileId.value],
  ([newQueryFileType, newQueryFileId]) => {
    if (newQueryFileType !== fileType.value) {
      fileType.value = newQueryFileType;
    }
    if (newQueryFileId !== fileId.value) {
      fileId.value = newQueryFileId;
    }
  }
);
</script>

<template>
  <div class="collabora_doc_page">
    <div class="collabora_doc_page-description">
      <p>{{ $t('collabora_doc_page.title') }}</p>
      <a
        href="https://hub.docker.com/r/collabora/code"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ $t('collabora_doc_page.docker_btn') }}
      </a>

      <p>{{ $t('collabora_doc_page.description') }}</p>

      <!-- <v-btn
        href="https://hub.docker.com/r/collabora/code"
        target="_blank"
        rel="noopener noreferrer"
        color="grey-darken-4"
        rounded="xl"
        size="large"
      >
        <p>{{ $t('collabora_doc_page.docker_btn') }}</p>
        <v-icon icon="mdi-open-in-new" size="small" />
      </v-btn> -->
    </div>

    <OfficeToolCollaboraGuide />

    <OfficeToolAuthForm
      v-model:user-id="userId"
      v-model:user-name="userName"
      v-model:token="token"
      v-model:permissions="permissions"
    />

    <CollaboraIframe
      v-if="token"
      :key="token"
      v-model:file-id="fileId"
      v-model:file-type="fileType"
      class="collabora_doc_page-collabora"
      :token="token"
      :collabora-host="collaboraHost"
      :wopi-host="wopiHost"
      :language="language"
      @close="onCollaboraClose"
      @save="onCollaboraSave"
      @save-as-completed="onCollaboraSaveAs"
    />
  </div>
</template>

<style lang="scss" scoped>
.collabora_doc_page {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 16px;

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
