/**
 * 關於頁面內容資料
 * 
 * 包含專案介紹、技術棧、測試項目等相關資訊
 * 用於動態生成關於頁面的內容結構
 */
const ABOUT_CONTENT_DATA = [
  {
    title: '專案目的',
    description: [
      { isDel: false, text: '這是一個用於測試和實驗的專案' },
      {
        isDel: true,
        text: '， 原本沒有打算上線，不過礙於PWA測試需要，故將此專案上線'
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
  },
  {
    title: '設計與資源',
    listItemList: [
      '本站圖示 (Favicon) 採用 Google Gemini 輔助設計生成'
    ]
  }
];

/**
 * 取得關於頁面內容 API
 * 
 * 回傳關於頁面的靜態內容資料，包含專案介紹、技術棧、
 * 測試項目等資訊。模擬延遲回應以測試前端載入狀態。
 * 
 * @api {GET} /api/nuxt-server/about-content 取得關於頁面內容
 * @apiGroup Content
 * @apiName GetAboutContent
 * 
 * @apiSuccess {Array} data 關於頁面內容陣列
 * @apiSuccess {String} data[].title 區塊標題
 * @apiSuccess {Array} [data[].description] 區塊描述文字陣列
 * @apiSuccess {Boolean} data[].description[].isDel 是否為刪除線文字
 * @apiSuccess {String} data[].description[].text 描述文字內容
 * @apiSuccess {Array} [data[].listItemList] 列表項目陣列
 * 
 * @example
 * // 請求範例
 * GET /api/nuxt-server/about-content
 * 
 * @example
 * // 成功回應範例
 * [
 *   {
 *     "title": "專案目的",
 *     "description": [
 *       { "isDel": false, "text": "這是一個用於測試和實驗的專案" }
 *     ],
 *     "listItemList": [
 *       "客製化 Vue 組件的開發與測試",
 *       "Nuxt3 框架的相關套件整合與應用"
 *     ]
 *   }
 * ]
 * 
 * @description
 * 此 API 模擬 1 秒的延遲回應，用於測試前端的載入狀態處理
 */
export default defineEventHandler(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ABOUT_CONTENT_DATA);
    }, 1000);
  });
});
