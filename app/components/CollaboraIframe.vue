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

const emit = defineEmits(['close', 'save']);

const loading = ref(true);
const iframeRef = ref(null);

const iframeUrl = computed(() => {
  const fileType =
    COLLABORA_FILE_TYPE.find((item) => item.code === props.fileType)?.code ||
    'xlsx';
  const encodedWopiSrc = encodeURIComponent(
    `${props.wopiHost}/wopi/files/${props.fileId}`
  );
  console.log({
    iframeUrl: `${props.collaboraHost}/browser/dist/cool.html?WOPISrc=${encodedWopiSrc}&type=${fileType}&access_token=${props.token}&lang=${props.language}&closebutton=1`
  });
  return `${props.collaboraHost}/browser/dist/cool.html?WOPISrc=${encodedWopiSrc}&type=${fileType}&access_token=${props.token}&lang=${props.language}&closebutton=1`;
});

function handleMessage(e) {
  try {
    if (typeof e?.data !== 'string' || e.data === '') {
      return;
    }
    const msg = JSON.parse(e.data);
    e.msgData = msg;

    // 開發階段方便觀察所有從 Collabora 送出來的事件
    if (
      !['Status_Indicator', 'Doc_SizeChanged', 'View_Added'].includes(
        msg.MessageId
      )
    ) {
      console.log('Collabora message received:', msg.MessageId, msg);
    }

    if (
      msg.MessageId === 'App_LoadingStatus' &&
      (msg.Values?.Status === 'Document_Loaded' ||
        msg.Values?.Status === 'Frame_Ready')
    ) {
      if (typeof iframeRef.value?.contentWindow?.postMessage === 'function') {
        iframeRef.value.contentWindow.postMessage(
          JSON.stringify({ MessageId: 'Host_PostmessageReady' }),
          props.collaboraHost
        );
      }
    }

    if (msg.MessageId === 'UI_Close') {
      emit('close', e);
    } else if (msg.MessageId === 'UI_Save') {
      emit('save', e);
    } else if (msg.MessageId === 'UI_SaveAs') {
      // 攔截「另存新檔」事件，向使用者詢問新檔名
      const newName = prompt(
        '請輸入新檔名 (請保留副檔名，例如 filename.docx)',
        ''
      );
      if (typeof newName === 'string' && newName !== '') {
        // 回傳 Action_SaveAs，Collabora 收到後就會觸發後端 PUT_RELATIVE
        if (typeof iframeRef.value?.contentWindow?.postMessage === 'function') {
          iframeRef.value.contentWindow.postMessage(
            JSON.stringify({
              MessageId: 'Action_SaveAs',
              SendTime: Date.now(),
              Values: { Filename: newName }
            }),
            props.collaboraHost
          );
        }
      }
    } else if (msg.MessageId === 'UI_InsertGraphic') {
      // 未來若要支援插入圖片，可在此攔截並開啟自己的檔案選擇器
      // 然後回傳 Action_InsertGraphic
      console.log('User clicked insert graphic');
    }
  } catch (error) {
    // 忽略非 JSON 格式的訊息
    console.error(error);
  }
}

function onIframeLoad() {
  loading.value = false;
}

onMounted(() => {
  window.addEventListener('message', handleMessage);
});

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage);
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
        ref="iframeRef"
        class="collabora_iframe-iframe"
        :src="iframeUrl"
        frameborder="0"
        @load="onIframeLoad"
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
