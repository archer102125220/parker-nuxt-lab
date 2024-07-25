const zhHant = {
  common: { ok: '確定', delete: '刪除', enter: 'Enter' },
  blockQuote: { title: '引用' },
  codeBlock: { title: '程式碼區塊' },
  color: {
    color: '文字顏色',
    bgColor: '背景顏色',
    default: '預設顏色',
    clear: '清除背景顏色'
  },
  divider: { title: '分隔線' },
  emotion: { title: '表請' },
  fontSize: { title: '字型大小', default: '文字大小' },
  fontFamily: { title: '字體', default: '文字字體' },
  fullScreen: { title: '全螢幕' },
  header: { title: '標題', text: '正文' },
  image: {
    netImage: '網路圖片',
    delete: '刪除圖片',
    edit: '編輯圖片',
    viewLink: '查看連結',
    src: '圖片網址',
    desc: '圖片描述',
    link: '圖片連結'
  },
  indent: { decrease: '減少縮排', increase: '增加縮排' },
  justify: {
    left: '靠左對齊',
    right: '靠右對齊',
    center: '置中對齊',
    justify: '兩側對齊'
  },
  lineHeight: { title: '行高', default: '預設行高' },
  link: {
    insert: '插入連結',
    text: '連結文字',
    url: '連結網址',
    unLink: '取消連結',
    edit: '修改連結',
    view: '查看連結'
  },
  textStyle: {
    bold: '粗體',
    clear: '清除格式',
    code: '行內代碼',
    italic: '斜體',
    sub: '下標',
    sup: '上標',
    through: '刪除線',
    underline: '底線'
  },
  undo: { undo: '撤銷', redo: '重做' },
  todo: { todo: '代辦' },
  editor: {
    more: '更多',
    justify: '對級',
    indent: '縮排',
    image: '圖片',
    video: '影片'
  },
  videoModule: {
    delete: '刪除影片',
    uploadVideo: '上傳影片',
    insertVideo: '插入影片',
    videoSrc: '影片網址',
    videoSrcPlaceHolder: '影片檔案 url 或第三方 <iframe>',
    videoPoster: '影片封面',
    videoPosterPlaceHolder: '封面圖片 url',
    ok: '確定',
    editSize: '修改尺寸',
    width: '寬度',
    height: '高度'
  },
  uploadImgModule: {
    uploadImage: '上傳圖片',
    uploadError: '{{fileName}} 上傳錯誤'
  },
  highLightModule: { selectLang: '選擇語言' },
  listModule: { unOrderedList: '無序列表', orderedList: '有序列表' },
  tableModule: {
    deleteCol: '刪除列',
    deleteRow: '刪除行',
    deleteTable: '刪除表格',
    widthAuto: '寬度自適應',
    insertCol: '插入列',
    insertRow: '插入行',
    insertTable: '插入表格',
    header: '表頭'
  }
};

export function useWangEditor() {
  const wangEditor = ref(null);

  onBeforeMount(async () => {
    await import('@wangeditor/editor/dist/css/style.css');
  });
  onMounted(async () => {
    const dynamicImport = await Promise.all([
      import('@wangeditor/editor'),
      import('@wangeditor/editor-for-vue')
    ]);
    const { i18nAddResources, i18nChangeLanguage } = dynamicImport[0];
    i18nAddResources('zh-TW', zhHant);
    i18nAddResources('zh-HANT', zhHant);
    i18nChangeLanguage('zh-TW');
    wangEditor.value = dynamicImport[1];
  });

  return wangEditor;
}