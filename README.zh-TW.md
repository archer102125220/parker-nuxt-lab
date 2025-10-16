# Parker Nuxt Lab

[English README](./README.md)

一個以 Nuxt 3 為核心的實驗型專案，整合 PWA、i18n、Pinia、Vuetify、Socket.IO、WebRTC、Firebase Cloud Messaging、Swagger、Sequelize（PostgreSQL）等常見前後端能力，用於快速驗證功能與展示範例頁。

- **框架**: Nuxt 3（Vue 3）
- **UI**: Vuetify 3
- **狀態管理**: Pinia
- **多語系**: `@nuxtjs/i18n`
- **PWA**: `@vite-pwa/nuxt`（Inject Manifest）
- **安全性**: `nuxt-security` + CSP/Permissions Policy 設定
- **即時**: Socket.IO、SSE、WebSocket、WebRTC 範例頁
- **ML / 影像**: `face-api.js`、`@tensorflow/tfjs-node`（含 Windows DLL 複製處理）
- **通知**: Firebase Cloud Messaging（含 Service Worker）
- **API 文件**: Swagger（`/api/nuxt-server/swagger-docs`）
- **測試**: Playwright E2E
- **資料庫**: Sequelize + PostgreSQL（含 migrations/seeds 指令）


## 目錄重點

- `pages/`：多個示範頁（如 `web-rtc/`、`socket-test/`、`server-sent-event-test/`）
- `plugins/`：Axios、Pinia、Firebase、Socket 客戶端、Vuetify、PWA 等客製化注入
- `server/`：Nitro 端 API、路由、外掛
- `service-worker/`：PWA Service Worker 與 Firebase Messaging SW
- `models/`：Sequelize 設定與 migrations
- `public/models/`：`face-api.js` 權重檔案（weights）


## 環境需求

- Node.js 18+（建議 LTS）
- Yarn 1.x（專案預設）
- PostgreSQL（若使用 Sequelize 相關功能）
- macOS 安裝 `node-canvas` 依賴可參考官方文件


## 安裝依賴

```bash
yarn install
```


## 開發模式

預設啟動（HTTP，0.0.0.0 便於區網存取）：

```bash
yarn dev
```

HTTPS 開發（使用 `local-ssl/` 憑證，已在指令內設好 `--https` 與 cert/key 路徑）：

```bash
yarn dev-https
```

> 若需自備憑證，請將 `local-ssl/cert.pem`、`local-ssl/key.pem` 放入對應路徑。


## 打包與預覽

建置：

```bash
yarn build
```

本機預覽（Nitro 預設以 `NITRO_PORT=3001` 啟動於 `yarn start`）：

```bash
yarn preview

# 或使用正式輸出後的 Node 啟動（會用 3001 埠）
yarn start
```


## 重要指令總覽

```bash
# 依賴/開發
yarn install
yarn dev
yarn dev-https
yarn build
yarn preview
yarn start

# 分析
yarn analyze

# i18n：自 Google Sheet 匯出為 JSON（需在 ./i18n/google-sheet-to-json.mjs 設定對應）
yarn create-i18n

# Sequelize（請先設定資料庫連線與 .sequelizerc/或在 models/config/database.js）
yarn createDB
yarn dropDB
yarn migrate
yarn migrate:undo
yarn seed
yarn seedAll

# 初始化資料庫（drop -> create -> migrate -> seed:all）
yarn initDB

# 測試
yarn test:e2e
yarn test:e2e-ui
yarn test:codegen
```


## 環境變數與設定

請將敏感金鑰與 API 端點置於 `.env`（或透過部署平台的環境變數）。
`nuxt.config.js` 中 `runtimeConfig.public` 已預留以下常見鍵值（目前多數註解化，視需求開啟）：

- `VITE_GTM_ID`
- `VITE_API_BASE`
- `VITE_SOCKET_IO_BASE_PATH`
- `VITE_GOOGLE_CLIENT_ID`
- `VITE_FACEBOOK_APP_ID` / `VITE_FACEBOOK_API_VERSION`
- `VITE_FIREBASE_*`（API KEY、VAPID KEY、CREDENTIAL 等）
- `HTTPS`（若需以環境變數控制 HTTPS 行為）

> 部分頁面（如 Firebase Cloud Messaging）在預先產生（prerender）時會被跳過，相關行為已於 `nuxt.config.js` 的 `nitro.hooks['prerender:generate']` 中處理。


## PWA 設定重點

- 使用 `@vite-pwa/nuxt`，策略為 `injectManifest`，Service Worker 來源：`./service-worker/service-worker.js`
- `manifest` 與圖示已設定於 `nuxt.config.js` → `pwa.manifest`
- 快取容量上限：`maximumFileSizeToCacheInBytes: 22MB`
- 開發模式可啟用 PWA（`devOptions.enabled`）


## 安全性與標頭

- 已整合 `nuxt-security`，並在生產與開發區分不同的 **CSP** 設定
- 設定了多項 **Permissions Policy**（如 `camera`、`microphone`、`fullscreen` 等）


## 前端體驗與樣式

- **Vuetify 3** 已透過 `vite-plugin-vuetify` 注入
- **PostCSS** 內含 `autoprefixer` 與 `postcss-pxtorem`（全屬性轉換）
- 另有自訂 `postcss-zerorem` 處理，避免 `+ 0` 單位錯誤
- 全域 SCSS：`style/global.scss`、`style/animation.scss`，並透過 `additionalData` 注入 `variable.scss` 與 `mixin.scss`


## 即時通訊 / 影音相關頁面

- `pages/socket-test/`（Socket.IO）
- `pages/server-sent-event-test/`（SSE）
- `pages/web-rtc/`（WebRTC / Socket.IO / WebSocket / SSE variant）
- `pages/firebase/`（FCM 示範）

> Socket.IO 伺服器端路由與設定可在 `server/` 下查看，客戶端設定則在 `plugins/07.socket.client.js` 與 `composables/useSocketIoClient.js`。


## API 與 Swagger

- Swagger JSON：`/api/nuxt-server/swagger-docs`（已在 `routeRules` 中設定 prerender）
- 亦有 `pages/swagger-doc.vue` 可視化查看 API 文件


## 測試（Playwright）

- 測試指令：`yarn test:e2e`、`yarn test:e2e-ui`
- `yarn pretest` 會先以 `.env.e2e` 建置並啟動於 3001 埠，之後再執行測試
- 測試配置：`playwright.config.ts`，測試案例位於 `tests/`


## 平台相容性備註

- Windows：專案啟動時會自動將 `@tensorflow/tfjs-node` 的 `tensorflow.dll` 自 `napi-v9` 複製到 `napi-v8` 以避免載入問題（見 `nuxt.config.js` 開頭邏輯）
- macOS：安裝 `canvas`（node-canvas）請參考官方文件或下方連結


## 資料與模型

- `public/models`：`face-api.js` 權重檔案（weights）
  - 來源參考：<https://github.com/justadudewhohacks/face-api.js/tree/master>


## 參考連結

- Nuxt 3 文件：<https://nuxt.com/docs/getting-started/introduction>
- 部署文件：<https://nuxt.com/docs/getting-started/deployment>
- face-api.js models（weights）：<https://github.com/justadudewhohacks/face-api.js/tree/master>
- mac 安裝 node-canvas：<https://github.com/Automattic/node-canvas>


