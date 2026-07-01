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
  // Sheet
  { code: 'xlsx', label: 'Excel (XLSX)' },
  { code: 'xls', label: 'Excel 97-2003 (XLS)' },
  { code: 'ods', label: 'OpenDocument Spreadsheet (ODS)' },
  { code: 'csv', label: 'CSV' },
  // Doc
  { code: 'docx', label: 'Word (DOCX)' },
  { code: 'doc', label: 'Word 97-2003 (DOC)' },
  { code: 'odt', label: 'OpenDocument Text (ODT)' },
  { code: 'rtf', label: 'Rich Text Format (RTF)' },
  { code: 'txt', label: 'Plain Text (TXT)' },
  // Presentation
  { code: 'pptx', label: 'PowerPoint (PPTX)' },
  { code: 'ppt', label: 'PowerPoint 97-2003 (PPT)' },
  { code: 'odp', label: 'OpenDocument Presentation (ODP)' },
  // Export
  { code: 'pdf', label: 'PDF Document' }
];

const EXTENSION_MAP = {
  sheet: ['xlsx', 'xls', 'ods', 'csv', 'pdf'],
  doc: ['docx', 'doc', 'odt', 'rtf', 'txt', 'pdf'],
  presentation: ['pptx', 'ppt', 'odp', 'pdf']
};
</script>
<script setup>
const props = defineProps({
  token: {
    type: String,
    default: ''
  },
  collaboraHost: {
    type: String,
    default: import.meta.env.VITE_COLLABORA_HOST || ''
  },
  wopiHost: {
    type: String,
    default: import.meta.env.VITE_WOPI_HOST || ''
  },
  language: {
    type: String,
    default: COLLABORA_LOCALES[0].code
  },
  hasClosebutton: {
    type: Boolean,
    default: true
  },
  useDialog: {
    type: Boolean,
    default: true
  },
  autoOpenSaveAs: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits([
  'close',
  'save',
  'saveAs',
  'saveCompleted',
  'saveAsCompleted'
  // 'downloadAs'
]);

const fileId = defineModel('fileId', {
  type: String,
  default: ''
});
const fileType = defineModel('fileType', {
  type: String,
  default: COLLABORA_FILE_TYPE[0].code
});
const saveAsNewName = defineModel('saveAsNewName', {
  type: String,
  default: ''
});
const saveAsNewType = defineModel('saveAsNewType', {
  type: String,
  default: COLLABORA_FILE_TYPE[0].code
});

// 另存新檔 Dialog 狀態
const showSaveAsDialog = ref(false);
const isSaveAs = ref(false);
const isSave = ref(false);
const saveAsExtInputDisabled = ref(false);
const saveAsNameInput = ref('');
const saveAsExtInput = ref('');

const loading = ref(true);
const iframeRef = ref(null);
const iframeMessageId = ref('');

const confirmSaveAsDisabled = computed(
  () =>
    typeof saveAsNameInput.value !== 'string' ||
    saveAsNameInput.value.includes('.')
);

const availableExtensions = computed(() => {
  const current = fileType.value?.toLowerCase() || '';

  if (EXTENSION_MAP.sheet.includes(current)) {
    return EXTENSION_MAP.sheet;
  } else if (EXTENSION_MAP.doc.includes(current)) {
    return EXTENSION_MAP.doc;
  } else if (EXTENSION_MAP.presentation.includes(current)) {
    return EXTENSION_MAP.presentation;
  } else {
    return [current]; // Fallback
  }
});

function confirmSaveAs() {
  if (confirmSaveAsDisabled.value === true) {
    return; // 可依需求加上 Snackbar 提示
  }

  saveAsNewName.value = saveAsNameInput.value;
  saveAsNewType.value = saveAsExtInput.value;
  showSaveAsDialog.value = false;
}

const safeLanguage = computed(() => {
  const newSafeLanguage =
    COLLABORA_LOCALES.find((item) => item.code === props.language) ||
    COLLABORA_LOCALES[0].code;
  return newSafeLanguage.code;
});
const iframeUrl = computed(() => {
  let newIframeUrl = '';

  const currentFileType =
    COLLABORA_FILE_TYPE.find((item) => item.code === fileType.value)?.code ||
    'xlsx';
  const closebutton = props.hasClosebutton === true ? 1 : 0;
  const encodedWopiSrc = encodeURIComponent(
    `${props.wopiHost}/wopi/files/${fileId.value}`
  );

  newIframeUrl = `${props.collaboraHost}/browser/dist/cool.html?WOPISrc=${
    encodedWopiSrc
  }&type=${currentFileType}&access_token=${props.token}&lang=${
    safeLanguage.value
  }&closebutton=${closebutton}`;

  console.log({
    iframeUrl: newIframeUrl
  });
  return newIframeUrl;
});

function handleMessage(e) {
  try {
    if (typeof e?.data !== 'string' || e.data === '') {
      return;
    }
    const msg = JSON.parse(e.data);
    e.msgData = msg;

    iframeMessageId.value = msg.MessageId || '';

    // 開發階段方便觀察所有從 Collabora 送出來的事件
    // if (
    //   !['Status_Indicator', 'Doc_SizeChanged', 'View_Added'].includes(
    //     msg.MessageId
    //   )
    // ) {
    //   console.log('Collabora message received:', msg.MessageId, msg);
    // }

    const messageId = msg.MessageId.toLowerCase();
    if (messageId.includes('save') || messageId.includes('export')) {
      console.log({ msg });
    }

    if (msg.MessageId === 'Action_Save_Resp' && msg.Values?.success === true) {
      if (isSaveAs.value === true) {
        // 另存新檔成功
        if (props.autoOpenSaveAs === true) {
          const newFileName =
            msg.Values.fileName || saveAsNameInput.value || '';
          const newFileNameSplit = newFileName.split('.');
          const newFileType =
            saveAsExtInput.value ||
            msg.Values?.format ||
            newFileNameSplit[newFileNameSplit.length - 1] ||
            '';

          let newFileId = newFileName;

          if (typeof newFileName === 'string' && newFileName !== '') {
            if (newFileType !== newFileNameSplit[newFileNameSplit.length - 1]) {
              newFileId = `${newFileName.substring(
                0,
                newFileName.includes('.')
                  ? newFileName.lastIndexOf('.')
                  : newFileName.length
              )}.${newFileType}`;
            }
            fileId.value = newFileId;
          }

          if (
            typeof msg.Values.fileName !== 'string' ||
            msg.Values.fileName === ''
          ) {
            msg.Values.fileName = newFileId;
          }

          if (
            typeof newFileType === 'string' &&
            newFileType !== '' &&
            COLLABORA_FILE_TYPE.some((item) => item.code === newFileType)
          ) {
            fileType.value = newFileType;
            msg.Values.format = newFileType;
          }
        }

        emit('saveAsCompleted', msg, msg.Values.fileName, e);
      } else {
        // 一般存檔成功
        emit('saveCompleted', msg, msg.Values.fileName, e);
      }

      saveAsNameInput.value = '';
      saveAsExtInput.value = '';
      isSave.value = false;
      isSaveAs.value = false;
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
      isSave.value = true;
      emit('save', e);
    } else if (msg.MessageId === 'UI_SaveAs') {
      isSaveAs.value = true;
      if (props.useDialog === true) {
        if (
          typeof msg.Values?.format === 'string' &&
          msg.Values?.format !== ''
        ) {
          // 開啟自訂的「另存新檔」Dialog
          saveAsNameInput.value = fileId.value.replace(
            `.${fileType.value}`,
            ''
          );
          // 取得 Collabora 下拉選單傳來的 format
          saveAsExtInput.value = msg.Values?.format;
          saveAsExtInputDisabled.value = msg.Values?.format === 'pdf';
        } else {
          // 開啟自訂的「另存新檔」Dialog
          saveAsNameInput.value = '';
          // 取得 Collabora 下拉選單傳來的 format
          saveAsExtInput.value = fileType.value;
          saveAsExtInputDisabled.value = false;
        }
        showSaveAsDialog.value = true;
      }
      emit('saveAs', e);
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

watch(
  () => [
    iframeRef.value,
    iframeMessageId.value,
    saveAsNewName.value,
    saveAsNewType.value
  ],
  ([newIframeRef, newIframeMessageId, newSaveAsNewName, newSaveAsNewType]) => {
    if (
      newIframeMessageId !== 'UI_SaveAs' ||
      typeof newSaveAsNewName !== 'string' ||
      newSaveAsNewName === '' ||
      // typeof newSaveAsNewType !== 'string' ||
      // newSaveAsNewType === '' ||
      typeof newIframeRef?.contentWindow?.postMessage !== 'function'
    ) {
      return;
    }
    const newSaveAsNewNameSplit = newSaveAsNewName.split('.');

    const format = newSaveAsNewName.includes('.')
      ? newSaveAsNewNameSplit[newSaveAsNewNameSplit.length - 1]
      : newSaveAsNewType;
    const Filename =
      newSaveAsNewNameSplit.reduce((pre, current, index) => {
        if (index === newSaveAsNewNameSplit.length - 1) {
          return pre || current;
        }
        return pre + current;
      }, '') + `.${format}`;

    console.log({
      newSaveAsNewName,
      newSaveAsNewType,
      Filename,
      format
    });

    // 回傳 Action_SaveAs ，Collabora 收到後就會觸發後端 PUT_RELATIVE
    newIframeRef.contentWindow.postMessage(
      JSON.stringify({
        MessageId: 'Action_SaveAs',
        SendTime: Date.now(),
        Values: {
          Filename,
          format,
          Notify: true
        }
      }),
      props.collaboraHost
    );
  }
);

onMounted(() => {
  window.addEventListener('message', handleMessage);
});

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage);
});

// 如果需要從外部觸發下載
// function handleDownloadAs(format = '') {
//   const exportFormat = format || props.fileType; // 若未指定，則使用原始副檔名
//   console.log({ exportFormat });

//   if (iframeRef.value?.contentWindow) {
//     iframeRef.value.contentWindow.postMessage(
//       JSON.stringify({
//         MessageId: 'Action_Export',
//         Values: { Format: exportFormat } // 注意：必須是 Action_Export 且鍵名為大寫 Format
//       }),
//       props.collaboraHost
//     );
//   }
//   emit('downloadAs', exportFormat);
// }
</script>

<template>
  <div class="collabora_iframe">
    <v-dialog
      v-model="showSaveAsDialog"
      max-width="400"
      min-height="55vh"
      persistent
    >
      <v-card @keydown.enter="confirmSaveAs">
        <v-card-title>另存新檔 (Save As)</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="saveAsNameInput"
            label="新檔名 (不含副檔名)"
            :rules="[
              (newName) => !!newName || '請輸入檔名',
              (newName) => !newName?.includes('.') || '請勿輸入副檔名'
            ]"
            autofocus
          />
          <VSelector
            v-model="saveAsExtInput"
            :option-list="availableExtensions"
            :disabled="saveAsExtInputDisabled"
            label="副檔名"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="showSaveAsDialog = false">取消</v-btn>
          <v-btn
            color="primary"
            :disabled="confirmSaveAsDisabled"
            @click="confirmSaveAs"
          >
            確認
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="collabora_iframe-container">
      <SkeletonLoader
        v-if="loading"
        :loading="true"
        class="collabora_iframe-skeleton"
      />
      <ClientOnly>
        <!-- <div v-if="loading === false" class="collabora_iframe-toolbar">
          <p class="text-subtitle-1 font-weight-bold">編輯器 (Editor)</p>
          <v-spacer />
          <v-btn
            color="primary"
            prepend-icon="mdi-download"
            variant="elevated"
            @click="handleDownloadAs()"
          >
            下載 (Download)
          </v-btn>
        </div> -->

        <iframe
          ref="iframeRef"
          class="collabora_iframe-iframe"
          :src="iframeUrl"
          frameborder="0"
          allowfullscreen
          @load="onIframeLoad"
        />
      </ClientOnly>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.collabora_iframe {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100%;

  // &-toolbar {
  //   display: flex;
  //   align-items: center;
  //   margin-bottom: 8px;
  //   padding: 8px 16px;
  //   background-color: rgb(var(--v-theme-surface));
  //   border-radius: 8px;
  //   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  //   flex-shrink: 0;
  // }

  &-container {
    position: relative;
    flex-grow: 1;
    width: 100%;
    min-height: 0; // Fix flex bug
  }

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
