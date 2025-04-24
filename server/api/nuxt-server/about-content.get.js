
const ABOUT_CONTENT_DATA = {
  pageTitle: '關於本站 (來自 API)',
  sectionList: [
    {
      title: '專案目的',
      description: [
        { isDel: false, text: '這是一個用於測試和實驗的專案' },
        {
          isDel: true,
          text: '， 原本沒有打算上線，不過礙於PWA實驗，故將此專案上線'
        },
        { isDel: false, text: '，主要聚焦於以下幾個方面：' }
      ],
      listItemList: [
        '客製化 Vue 組件的開發與測試',
        'Nuxt3 框架的相關套件整合與應用',
        'PWA (Progressive Web App) 的實驗與實作'
      ]
    },
    {
      title: '主要測試項目',
      listItemList: [
        'nuxt-i18n 多語言功能實作方式記錄(尚未添加完成語系包)',
        '自製組件及第三方整合組件',
        'Vue 指令的開發與應用',
        '路由系統的紀錄與實作',
        'CSS 繪圖技術的實驗',
        '生物辨識技術的整合（WebAuthn、FIDO2）',
        'WebCam 與臉部識別 API 的應用',
        '前端 API 快取機制的實作'
      ]
    },
    {
      title: '技術棧',
      listItemList: [
        'Nuxt3 - Vue.js 伺服渲染框架',
        'Vue3 - 前端框架',
        'SCSS - CSS 預處理器',
        'PWA - 漸進式網頁應用'
      ]
    },
    {
      title: 'ISR 技術測試',
      description: [
        {
          isDel: false,
          text: '本專案也包含了 Nuxt3 的 ISR (Incremental Static Regeneration) 技術測試，這是一種混合渲染策略，結合了靜態生成和動態更新的優點：'
        }
      ],
      listItemList: [
        '實現頁面的靜態生成，提供更快的首次載入速度',
        '設定自動重新驗證時間，確保內容的即時性',
        '在後台自動更新過期內容，無需等待用戶請求',
        '優化 SEO 表現，同時保持內容的新鮮度'
      ]
    }
  ]
};

export default defineEventHandler(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ABOUT_CONTENT_DATA);
    }, 1000);
  });
});
