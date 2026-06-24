<script>
export const COLLABORA_LOCALES = [
  // 亞洲語系
  { code: 'zh-TW', locale: 'tw', label: '繁體中文 (台灣)' },
  { code: 'zh-CN', locale: 'cn', label: '简体中文' },
  { code: 'zh-HK', locale: 'hk', label: '繁體中文 (香港)' },
  { code: 'ja-JP', locale: 'jp', label: '日本語' },
  { code: 'ko-KR', locale: 'kr', label: '한국어' },

  // 歐美語系
  { code: 'en-US', locale: 'us', label: 'English (US)' },
  { code: 'en-GB', locale: 'gb', label: 'English (UK)' },
  { code: 'fr-FR', locale: 'fr', label: 'Français' }, // 法文
  { code: 'de-DE', locale: 'de', label: 'Deutsch' }, // 德文
  { code: 'es-ES', locale: 'es', label: 'Español' }, // 西班牙文
  { code: 'it-IT', locale: 'it', label: 'Italiano' }, // 義大利文
  { code: 'pt-BR', locale: 'br', label: 'Português (BR)' }, // 葡萄牙文 (巴西)
  { code: 'ru-RU', locale: 'ru', label: 'Русский' } // 俄文
];
export const COLLABORA_FILE_TYPE = [
  { code: 'xlsx', label: 'Excel' },
  { code: 'docx', label: 'Word' },
  { code: 'pptx', label: 'PowerPoint' }
];
</script>
<script setup>
const props = defineProps({
  token: {
    type: String,
    default: ''
  },
  fileType: {
    type: String,
    default: COLLABORA_FILE_TYPE[0].code
  },
  collaboraHost: {
    type: String,
    default: import.meta.env.VITE_COLLABORA_HOST || ''
  },
  fileId: {
    type: String,
    default: ''
  },
  wopiHost: {
    type: String,
    default: import.meta.env.VITE_WOPI_HOST || ''
  },
  language: {
    type: String,
    default: COLLABORA_LOCALES[0].code
  }
});

const loading = ref(true);

const iframeUrl = computed(() => {
  const fileType =
    COLLABORA_FILE_TYPE.find((item) => item.code === props.fileType)?.code ||
    'xlsx';
  const encodedWopiSrc = encodeURIComponent(
    `${props.wopiHost}/wopi/files/${props.fileId}?token=${props.token}&filetype=${fileType}`
  );
  console.log({
    iframeUrl: `${props.collaboraHost}/browser/dist/cool.html?WOPISrc=${encodedWopiSrc}&lang=${props.language}`
  });
  return `${props.collaboraHost}/browser/dist/cool.html?WOPISrc=${encodedWopiSrc}&lang=${props.language}`;
});
</script>

<template>
  <div class="collabora_iframe">
    <SkeletonLoader
      v-if="loading"
      :loading="true"
      class="collabora_iframe-skeleton"
    />
    <ClientOnly>
      <iframe
        class="collabora_iframe-iframe"
        :src="iframeUrl"
        frameborder="0"
        @load="loading = false"
      />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.collabora_iframe {
  position: relative;

  min-width: 100%;
  min-height: 100%;

  &-skeleton {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;

    width: 100%;
    height: 100%;
  }

  &-iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
