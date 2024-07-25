<template>
  <div class="wang_editor" :style="cssVariable">
    <v-skeleton-loader :loading="!wangEditor?.Toolbar || !wangEditor?.Editor">
      <component
        :is="wangEditor?.Toolbar"
        :class="toolbarClassName"
        :editor="editorRef"
        :default-config="toolbarConfig"
        :mode="mode"
      />
      <component
        :is="wangEditor?.Editor"
        v-model="valueHtml"
        :class="editorClassName"
        :mode="mode"
        :default-config="editorConfig"
        :is-disabled="disabled"
        :style="`height:${editorHeight};`"
        @on-created="handleCreated"
        @on-change="handleChange"
        @on-focus="handleFocus"
        @on-blur="handleBlur"
        @custom-alert="handleCustomAlert"
      />
    </v-skeleton-loader>
  </div>
</template>

<script setup>
const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  error: {
    type: Boolean,
    default: false
  },
  disabled: { type: Boolean, default: false },
  toolbarBgColor: {
    type: String,
    default: ''
  },
  editorBgColor: {
    type: String,
    default: '#f6f6f7'
  },
  editorHoverBorderColor: {
    type: String,
    default: ''
  },
  editorHoverBgColor: {
    type: String,
    default: ''
  },
  editorFocusBgColor: {
    type: String,
    default: '#dbdcdd'
  },
  editorHeight: {
    type: String,
    default: 'auot'
  },
  maxTextLenght: {
    type: [Number, String],
    default: null
  },
  toolbarClassName: {
    type: [String, Array],
    default: null
  },
  editorClassName: {
    type: [String, Array],
    default: null
  },
  excludeKeys: {
    type: Array,
    default: null
  },
  placeholder: {
    type: String,
    default: ''
  },
  mode: {
    type: String,
    default: 'default'
  },
  readOnly: {
    type: Boolean,
    default: false
  },
  autoFocus: {
    type: Boolean,
    default: false
  },
  toolbarConfig: {
    type: Object,
    default: () => ({})
  },
  token: {
    type: String,
    default: ''
  },
  uploadImgUrl: {
    type: String,
    default: ''
  },
  uploadImg: {
    type: Function,
    default: null
  },
  checkImage: {
    type: Function,
    default: null
  },
  uploadVideoUrl: {
    type: String,
    default: ''
  },
  uploadVideo: {
    type: Function,
    default: null
  },
  checkVideo: {
    type: Function,
    default: null
  },
  parseVideoSrc: {
    type: Function,
    default: null
  },
  menuConf: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits([
  'getEditor',
  'change',
  'update:value',
  'focus',
  'blur'
]);

const nuxtApp = useNuxtApp();
const { $store } = nuxtApp;
const wangEditor = useWangEditor();

const editorRef = shallowRef();

const valueHtml = ref('<p></p>');
const valueText = ref('');
const isFocus = ref(false);

// https://www.wangeditor.com/v5/editor-config.html
const editorConfig = computed(() => {
  // https://www.wangeditor.com/v5/menu-config.html
  const menuConf = props.menuConf;

  const uploadImgUrl = props.uploadImgUrl;
  const uploadImg = props.uploadImg;
  if (typeof uploadImgUrl === 'string' && uploadImgUrl !== '') {
    if (menuConf.uploadImage === undefined) {
      menuConf.uploadImage = {
        server: uploadImgUrl
      };
    } else if (typeof menuConf?.uploadImage?.customUpload !== 'function') {
      menuConf.uploadImage = {
        server: uploadImgUrl,
        ...menuConf.uploadImage
      };
    }
  }
  if (typeof uploadImg === 'function') {
    if (menuConf.uploadImage === undefined) {
      menuConf.uploadImage = { customUpload: uploadImg };
    } else {
      menuConf.uploadImage = {
        ...menuConf.uploadImage,
        customUpload: uploadImg
      };
    }
  }

  if (menuConf.insertImage === undefined) {
    menuConf.insertImage = {
      checkImage: handleCheckImage
    };
  } else {
    menuConf.insertImage = {
      ...menuConf.insertImage,
      checkImage: handleCheckImage
    };
  }

  if (menuConf.editImage === undefined) {
    menuConf.editImage = {
      checkImage: handleCheckImage
    };
  } else {
    menuConf.editImage = {
      ...menuConf.editImage,
      checkImage: handleCheckImage
    };
  }

  const uploadVideoUrl = props.uploadVideoUrl;
  const uploadVideo = props.uploadVideo;
  if (typeof uploadVideoUrl === 'string' && uploadVideoUrl !== '') {
    if (menuConf.uploadVideo === undefined) {
      menuConf.uploadVideo = {
        server: uploadVideoUrl
      };
    } else if (typeof menuConf?.uploadVideo?.customUpload !== 'function') {
      menuConf.uploadVideo = {
        server: uploadVideoUrl,
        ...menuConf.uploadVideo
      };
    }
  }
  if (typeof uploadVideo === 'function') {
    if (menuConf.uploadVideo === undefined) {
      menuConf.uploadVideo = { customUpload: uploadVideo };
    } else {
      menuConf.uploadVideo = {
        ...menuConf.uploadVideo,
        customUpload: uploadVideo
      };
    }
  }

  if (menuConf.insertVideo === undefined) {
    menuConf.insertVideo = {
      parseVideoSrc: handleParseVideoSrc
    };
  } else {
    menuConf.insertVideo = {
      ...menuConf.insertVideo,
      parseVideoSrc: handleParseVideoSrc
    };
  }

  if (menuConf.insertVideo === undefined) {
    menuConf.insertVideo = {
      checkVideo: handleCheckVideo
    };
  } else {
    menuConf.insertVideo = {
      ...menuConf.insertVideo,
      checkVideo: handleCheckVideo
    };
  }

  if (typeof props.token === 'string' && props.token !== '') {
    if (typeof menuConf.uploadImage === 'object') {
      const _headers = menuConf.uploadImage.headers || {};
      menuConf.uploadImage.headers = {
        ..._headers,
        'x-token': props.token.replace(/\"/g, '')
      };
    }

    if (typeof menuConf.uploadVideoUrl === 'object') {
      const _headers = menuConf.uploadVideoUrl.headers || {};
      menuConf.uploadVideoUrl.headers = {
        ..._headers,
        'x-token': props.token.replace(/\"/g, '')
      };
    }
  }

  return {
    placeholder: props.placeholder,
    readOnly: props.readOnly || props.disabled,
    autoFocus: props.autoFocus,
    MENU_CONF: menuConf
  };
});
// https://www.wangeditor.com/v5/toolbar-config.html
const toolbarConfig = computed(() => {
  const _toolbarConfig = props.toolbarConfig;
  let excludeKeys = _toolbarConfig.excludeKeys || [];

  const _excludeKeys = props.excludeKeys;
  if (Array.isArray(_excludeKeys)) {
    excludeKeys = [...excludeKeys, ..._excludeKeys];
  }

  const menuConf = props.menuConf;
  const uploadImgUrl = props.uploadImgUrl;
  const uploadImg = props.uploadImg;
  const uploadVideoUrl = props.uploadVideoUrl;
  const uploadVideo = props.uploadVideo;
  if (
    typeof menuConf?.uploadImage?.server !== 'string' &&
    (typeof uploadImgUrl !== 'string' || uploadImgUrl === '') &&
    typeof uploadImg !== 'function' &&
    typeof menuConf?.uploadImage?.customUpload !== 'function'
  ) {
    excludeKeys = [...excludeKeys, 'uploadImage'];
  }

  if (
    typeof menuConf?.uploadVideo?.server !== 'string' &&
    (typeof uploadVideoUrl !== 'string' || uploadVideoUrl === '') &&
    typeof uploadVideo !== 'function' &&
    typeof menuConf?.uploadVideo?.customUpload !== 'function'
  ) {
    excludeKeys = [...excludeKeys, 'uploadVideo'];
  }

  _toolbarConfig.excludeKeys = [...excludeKeys, 'editVideoSize'];
  return _toolbarConfig;
});
const cssVariable = computed(() => {
  let _cssVariable = '--editor_height:' + props.editorHeight + ';';

  if (
    typeof props.editorFocusBgColor === 'string' &&
    props.editorFocusBgColor !== '' &&
    isFocus.value === true
  ) {
    if (props.error === false) {
      _cssVariable += `--editor_bg_color: ${props.editorFocusBgColor};`;
    } else {
      _cssVariable += '--editor_bg_color: #dbd4d5;';
    }
  } else if (props.error === true) {
    _cssVariable += '--editor_bg_color: #f6eced;';
  } else if (
    typeof props.editorBgColor === 'string' &&
    props.editorBgColor !== ''
  ) {
    _cssVariable += `--editor_bg_color: ${props.editorBgColor};`;
  }

  if (
    typeof props.editorFocusBgColor === 'string' &&
    props.editorFocusBgColor !== '' &&
    isFocus.value === true
  ) {
    if (props.error === false) {
      _cssVariable += `--editor_hover_bg_color: ${props.editorFocusBgColor};`;
    } else {
      _cssVariable += '--editor_hover_bg_color: #dbd4d5;';
    }
  } else if (props.error === true) {
    _cssVariable += '--editor_hover_bg_color: #eee5e5;';
  } else if (
    typeof props.editorHoverBgColor === 'string' &&
    props.editorHoverBgColor !== ''
  ) {
    _cssVariable += `--editor_hover_bg_color: ${props.editorHoverBgColor};`;
  }

  if (
    typeof props.editorHoverBorderColor === 'string' &&
    props.editorHoverBorderColor !== ''
  ) {
    if (props.error === false) {
      _cssVariable += `--editor_hover_border_color: ${props.editorHoverBorderColor};`;
    } else {
      _cssVariable += '--editor_hover_border_color: #b81e3a;';
    }
  } else if (props.error === true) {
    _cssVariable += '--editor_hover_border_color: #b81e3a;';
  }

  if (typeof props.toolbarBgColor === 'string' && props.toolbarBgColor !== '') {
    _cssVariable += `--toolbar_bg_color: ${props.toolbarBgColor};`;
  }

  if (isFocus.value === true) {
    _cssVariable += '--editor_border: 2px;';
    if (props.error === false) {
      _cssVariable += '--editor_border: 2px;--editor_border_color: #212529;';
    } else if (props.error === true) {
      _cssVariable += '--editor_border: 2px;--editor_border_color: #b00020;';
    }
  } else if (props.error === true) {
    _cssVariable += '--editor_border_color: #db929f;';
  }

  return _cssVariable;
});
const editorClassName = computed(() => {
  const defaultClass = 'wang_editor-editor';
  const _editorClassName = props.editorClassName;
  if (typeof _editorClassName === 'string' && _editorClassName !== '') {
    return `${defaultClass} ${_editorClassName}`;
  } else if (Array.isArray(_editorClassName) === true) {
    return [defaultClass, ..._editorClassName];
  }

  return defaultClass;
});
const toolbarClassName = computed(() => {
  const defaultClass = 'wang_editor-toolbar';
  const _toolbarClassName = props.toolbarClassName;
  if (typeof _toolbarClassName === 'string' && _toolbarClassName !== '') {
    return `${defaultClass} ${_toolbarClassName}`;
  } else if (Array.isArray(_toolbarClassName) === true) {
    return [defaultClass, ..._toolbarClassName];
  }

  return defaultClass;
});

watch(
  () => [props.maxTextLenght, valueText.value, valueHtml.value],
  (newValue = [], oldValue = []) => {
    const [newMaxTextLenght, newValueText] = newValue;
    const oldValueText = oldValue[1];
    const oldValueHtml = oldValue[2];
    if (newMaxTextLenght < newValueText.length) {
      if (newValueText !== oldValueText) {
        valueHtml.value = oldValueHtml;
        valueText.value = oldValueText;
      } else {
        valueHtml.value = '';
        valueText.value = '';
      }
    }
  }
);

function handleCustomAlert(msg, type) {
  switch (type) {
    case 'success':
      $store.system.setMessageState({
        text: msg,
        type: 'success'
      });
      break;
    case 'info':
      $store.system.setMessageState({
        text: msg,
        type: 'info'
      });
      break;
    case 'warning':
      $store.system.setMessageState({
        text: msg,
        type: 'warning'
      });
      break;
    case 'error':
      $store.system.setMessageState({
        text: msg,
        type: 'error'
      });
      break;
    default:
      $store.system.setMessageState({
        text: msg,
        type: 'info'
      });
      break;
  }
}

function handleCheckImage(src = '', ...arg) {
  if (typeof props.checkImage === 'function') {
    const checked = props.checkImage(src, ...arg);
    if (checked !== true) return checked;
  }

  if (src.indexOf('https://') !== 0 && src.indexOf('https://') !== 0) {
    return '請輸入有效網址';
  }

  return true;
}

function handleParseVideoSrc(src = '', ...arg) {
  if (typeof props.parseVideoSrc === 'function') {
    const parseVideoSrc = props.parseVideoSrc(src, ...arg);
    if (parseVideoSrc !== src) return parseVideoSrc;
  }

  if (src.indexOf('https://youtu') === 0) {
    const srcArray = src.split('/');
    return `<iframe src='https://www.youtube.com/embed/${
      srcArray[srcArray.length - 1]
    }' title='YouTube video player' frameborder='0' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  } else if (src.indexOf('https://www.youtube') === 0 && src.includes('?v=')) {
    const vedioId = src.substring(
      src.indexOf('?v=') + 3,
      src.indexOf('&') <= -1 ? src.length : src.indexOf('&')
    );
    return `<iframe src='https://www.youtube.com/embed/${vedioId}' title='YouTube video player' frameborder='0' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  }

  return src;
}

function handleCheckVideo(src = '', ...arg) {
  if (typeof props.checkVideo === 'function') {
    const checked = props.checkVideo(src, ...arg);
    if (checked !== true) return checked;
  }

  // if (src.indexOf('https://www.youtube') === 0) {
  //   return 'youtube不允許直接以url的方式做分享';
  // }

  if (src.indexOf('https://') !== 0 && src.indexOf('https://') !== 0) {
    return '請輸入有效網址';
  }

  return true;
}

function handleCreated(editor) {
  // https://www.wangeditor.com/v5/API.html
  editorRef.value = editor;
  editor.setHtml(props.value);
  const _valueHtml = editor.getHtml();
  if (valueHtml.value !== _valueHtml) {
    valueHtml.value = _valueHtml;
  }
  valueText.value = editor.getText();
  emit('getEditor', editor, {
    children: editor.children,
    text: editor.getText(),
    htmlString: editor.getHtml()
  });
}
function handleChange(editor) {
  valueText.value = editor.getText();
  const htmlString = editor.getHtml();
  emit('change', {
    editor,
    children: editor.children,
    text: editor.getText(),
    htmlString
  });
  emit('update:value', htmlString);
}
function handleFocus(editor) {
  isFocus.value = true;
  emit('focus', editor, {
    children: editor.children,
    text: editor.getText(),
    htmlString: editor.getHtml()
  });
}
function handleBlur(editor) {
  isFocus.value = false;
  emit('blur', editor, {
    children: editor.children,
    text: editor.getText(),
    htmlString: editor.getHtml()
  });
}

onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>

<style lang="scss" scoped>
.wang_editor {
  // min-height: 400px;
  z-index: 2;
  --editor_border: 1px;
  --editor_border_color: #a5a6a9;
  --toolbar_bg_color: #fff;
  --editor_hover_bg_color: #eeeeee;
  --editor_hover_border_color: #3c3f43;
  [is-loading='false'] {
    display: block;
  }
  // :deep(.v-skeleton-loader) {
  //   height: 100%;
  // }
  :deep(.v-skeleton-loader__bone) {
    height: calc(var(--editor_height) + 75px);
  }
  :deep(.w-e-text-container) {
    word-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;
    p {
      margin: 0;
    }
  }
  &-toolbar {
    border-bottom: 1px solid #ccc;
    :deep(.w-e-toolbar) {
      background-color: var(--toolbar_bg_color);
    }
  }
  &-editor {
    height: var(--editor_height);
    width: 100%;
    cursor: text;
    flex: 1;
    &:not([is-disabled='true']) {
      border-bottom: var(--editor_border) solid var(--editor_border_color);
      &:hover {
        border-bottom-color: var(--editor_hover_border_color);
      }
      :hover {
        :deep(.w-e-scroll) {
          background-color: var(--editor_hover_bg_color);
        }
      }
    }
    :deep(.w-e-scroll) {
      background-color: var(--editor_bg_color);
    }
    :deep([data-slate-void='true']) {
      text-align: center;
      iframe {
        width: 70vw;
        height: 50vh;
        @include tablet {
          width: 90vw;
          min-height: 90vw;
        }
      }
    }
    :deep([data-menu-key='editVideoSize']) {
      display: none;
    }
  }
}
</style>