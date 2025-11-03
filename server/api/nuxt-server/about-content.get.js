/**
 * @openapi
 * /nuxt-server/about-content:
 *    get:
 *      description: 取得關於頁面內容
 *      responses:
 *        200:
 *          description: 關於頁面內容陣列
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    title:
 *                      type: string
 *                      description: 區塊標題
 *                    description:
 *                      type: array
 *                      description: 區塊描述文字陣列
 *                      items:
 *                        type: object
 *                        properties:
 *                          isDel:
 *                            type: boolean
 *                            description: 是否為刪除線文字
 *                          text:
 *                            type: string
 *                            description: 描述文字內容
 *                    listItemList:
 *                      type: array
 *                      description: 列表項目陣列
 *                      items:
 *                        type: string
 */
/**
 * 關於頁面內容資料
 * 
 * 包含專案介紹、技術棧、測試項目等相關資訊
 * 用於動態生成關於頁面的內容結構
 */
const ABOUT_CONTENT_DATA = [
  {
    title: '專案宗旨',
    description: [
      { isDel: false, text: '本專案為「Parker Chen 的Nuxt實驗室」，聚焦於 Nuxt 4 生態的整合與實驗' },
      { isDel: false, text: '，並透過實際頁面與 API 演示多語系、PWA、ISR、安全性、即時互動等主題。' },
      {
        isDel: true,
        text: '（原本沒有打算上線，不過礙於PWA測試需要，故將此專案上線）'
      }
    ]
  },
  {
    title: '核心模組與技術',
    listItemList: [
      'Nuxt 4、Vue 3、Pinia 狀態管理',
      'Vuetify 元件庫（透過 Vite 外掛整合）',
      'nuxt-i18n 多語系（含語系目錄與瀏覽器語言偵測）',
      'Vite PWA（injectManifest，自訂 service-worker）',
      'nuxt-security（CSP 與安全性標頭設定）',
      'SCSS + PostCSS（含 px-to-rem 與客製 plugin）'
    ]
  },
  {
    title: '渲染與快取策略',
    description: [
      { isDel: false, text: '路由採用 Prerender 與 ISR 混合策略，首頁與多語系路由皆啟用 ISR。' }
    ],
    listItemList: [
      '全域預渲染 `/**` 以利 PWA 完整快取',
      '多數功能頁（components、directives、css-drawing、route...）設為 ISR(24h)',
      '特定路由如 `/firebase/cloud-messaging` 以 SWR 15 秒更新',
      'Nitro 啟用 WebSocket（experimental）'
    ]
  },
  {
    title: 'API 與整合項目',
    listItemList: [
      'WebAuthn（註冊/驗證流程）',
      'FIDO2-lib 實作（option 產生/註冊/驗證）',
      'Firebase Admin 推播（Web / iOS / Android）與 Token 維護',
      '前端 API 快取測試與 Scroll Fetch 範例',
      'Server-Sent Events 與 Socket.IO 範例'
    ]
  },
  {
    title: 'API 文件（Swagger）',
    description: [
      { isDel: false, text: '以 swagger-jsdoc 動態掃描 server/api/**/*.js 的 JSDoc 註解，生成完整 OpenAPI 3 規格文件。' }
    ],
    listItemList: [
      '文件端點：/api/nuxt-server/swagger-docs',
      '涵蓋專案所有以 JSDoc 註解的 API 路徑與欄位結構'
    ]
  },
  {
    title: 'PWA 與應用外觀',
    listItemList: [
      '以 injectManifest 策略註冊 service worker，離線與版本更新自動化',
      '自訂 Manifest（名稱、語言、colors、icons）',
      '站點圖示與 Favicon 已配置，顯示模式為 standalone'
    ]
  },
  {
    title: '安全性配置',
    description: [
      { isDel: false, text: '透過 nuxt-security 設定 Content Security Policy 與 Permissions-Policy。' }
    ],
    listItemList: [
      '依環境切換 CSP（prod 與 dev 不同策略）',
      'Permissions-Policy 控制 camera、microphone、fullscreen、autoplay 等',
      '精簡生產環境 logger（removeLoggers）'
    ]
  },
  {
    title: '多語系與導覽',
    listItemList: [
      '支援 zh / en，並提供語系切換 UI',
      '頁面 head 設定 `htmlAttrs.lang` 與多語系路由',
      '站名與標題整合 i18n 文案'
    ]
  },
  {
    title: '特色頁面與實驗',
    listItemList: [
      'Components / Directives / CSS Drawing 示範頁',
      'WebAuthn、FIDO2、生物辨識流程',
      'WebCam 與臉部識別（Face API）',
      'Server-Sent Events 與 Socket.IO 互動測試',
      '前端 API 快取測試（Frontend API Cache Test）',
      'Firebase（含 Cloud Messaging）'
    ]
  },
  {
    title: '開發體驗與相容性',
    listItemList: [
      '別名與自動引入（composables、store）提升開發效率',
      'Windows 相容性處理（tfjs-node DLL 複製）',
      '樣式以 SCSS 模組化，並統一變數與混入'
    ]
  },
  {
    title: '設計與版權',
    listItemList: [
      '本站圖像與圖示由 Google Gemini 輔助生成與設計',
      '© Parker Chen 的Nuxt實驗室'
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
 *       "Nuxt4 框架的相關套件整合與應用"
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
