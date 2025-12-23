# Parker Nuxt Lab

[English README](./README.md)

一個以 Nuxt 4 為核心的實驗型專案，整合 PWA、i18n、Pinia、Vuetify、Socket.IO、WebRTC、Firebase Cloud Messaging、Swagger、Sequelize（PostgreSQL）等常見前後端能力，用於快速驗證功能與展示範例頁。

- **框架**: Nuxt 4（Vue 3.5.8）
- **UI**: Vuetify 3.6
- **狀態管理**: Pinia 2.1
- **多語系**: `@nuxtjs/i18n` 9.0
- **PWA**: `@vite-pwa/nuxt` 0.10（Inject Manifest）
- **安全性**: `nuxt-security` 2.2 + CSP/Permissions Policy 設定
- **即時**: Socket.IO 4.8、SSE、WebSocket、WebRTC 範例頁
- **ML / 影像**: `face-api.js` 0.22、`@tensorflow/tfjs-node` 4.22（含 Windows DLL 複製處理）
- **通知**: Firebase Cloud Messaging 12.1（含 Service Worker）
- **API 文件**: Swagger（`/api/nuxt-server/swagger-docs`）
- **測試**: Playwright 1.47 E2E
- **資料庫**: Sequelize 6.37 + PostgreSQL（含 migrations/seeds 指令）
- **額外套件**: WangEditor 5.1（富文本編輯器）、FIDO2、QR Code、Swiper 11.1、Day.js、Axios 1.7
- **分析工具**: Vercel Analytics & Speed Insights

## 目錄重點

- `pages/`：多個示範頁（如 `web-rtc/`、`socket-test/`、`server-sent-event-test/`）
- `plugins/`：Axios、Pinia、Firebase、Socket 客戶端、Vuetify、PWA 等客製化注入
- `server/`：Nitro 端 API、路由、外掛
- `service-worker/`：PWA Service Worker 與 Firebase Messaging SW
- `models/`：Sequelize 設定與 migrations
- `public/ai_models/`：`face-api.js` 權重檔案（weights）

## 環境需求

- Node.js 18+（建議 LTS）
- Yarn 1.22+（專案預設）
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

### Upstash Redis 設定

專案使用 Upstash Redis 作為 WebRTC 功能的即時資料儲存。請在 `.env` 中設定：

- `UPSTASH_REDIS_REST_URL`：Upstash Redis REST API URL
- `UPSTASH_REDIS_REST_TOKEN`：Upstash Redis REST API Token

> **Redis Key 前綴**：所有 Redis keys 都使用 `nuxt-lab:` 前綴（例如 `nuxt-lab:web-rtc-member-list-{roomId}`），以避免與其他共用同一 Redis 實例的專案產生 key 衝突。

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

## 🎨 CSS 開發規範

### CSS 屬性順序規範

專案遵循主流 CSS 屬性排序標準，以確保代碼一致性與可維護性：

1. **Positioning** (position, top, left, z-index...)
2. **Display & Box Model** (display, flex, width, margin, padding, border...)
3. **Typography** (font, color, text-align...)
4. **Visual** (background, box-shadow, opacity...)
5. **Animation** (transition, animation...)
6. **Misc** (cursor, content...)

**範例**：
```scss
.example {
  // Positioning
  position: relative;
  top: 0;
  z-index: 10;

  // Display & Box Model
  display: flex;
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;

  // Typography
  font-size: 16px;
  color: #333;

  // Visual
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  // Animation
  transition: all 0.3s;

  // Misc
  cursor: pointer;
}
```

> 💡 **注意**：在實際開發中，為了保持代碼簡潔，通常不需要在每個屬性分類前加上註解。只有在複雜的樣式中才建議使用註解來提高可讀性。

### CSS 命名規範

專案採用**改良式 BEM 命名法**，巧妙地犧牲了標準 BEM 的視覺符號（`__`），以換取更高的開發工具雙擊選取效率，並透過 SCSS 拼接和 HTML 屬性來確保其 CSS 權重和狀態管理的語義完整性。

#### 命名結構

- **Block（區塊）**：使用單一名稱，如 `.countdown`
- **Element（元素）**：使用單個連字符 `-` 連接 Block 與 Element，如 `.countdown-down_enter`、`.countdown-up_leave`
- **Sub-Element（子元素）**：使用單個連字符 `-` 連接父元素與子元素，元素名稱內部使用底線 `_` 分隔語義單詞，如：
  - `.countdown-down_enter-down_enter_up`
  - `.image_upload-preview-img`
- **狀態修飾**：透過 HTML 屬性選擇器管理狀態，如 `[css-is-anime-start='true']`、`[css-is-active='true']`

#### 根元素命名規範

為了在瀏覽器開發工具中快速定位問題元素，專案採用以下根元素命名規範：

- **頁面根元素**：使用 `[頁面名稱]_page` 格式
  - 例如：`.hooks_test_page`、`.socket_io_page`、`.web_rtc_page`
- **組件根元素**：使用 `[組件名]` 格式
  - 例如：`.scroll_fetch`、`.image_upload`、`.countdown`

**範例**：
```scss
// 頁面 SCSS (pages/hooks-test/index.vue)
.hooks_test_page {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

// 組件 SCSS (components/ScrollFetch.vue)
.scroll_fetch {
  position: relative;
  width: 100%;
}
```

#### 優勢

1. ✅ **雙擊選取** - 無 `__` 中斷，可完整選取類別名稱
2. ✅ **SCSS 巢狀** - 透過 `&-element` 維持語義層級關係
3. ✅ **語義清晰** - 使用底線分隔多個語義單詞
4. ✅ **狀態管理** - 使用 HTML 屬性而非 modifier 類別來管理狀態，減少類別數量
5. ✅ **可維護性** - 保持良好的可讀性與維護性

**好處**：
- ✅ 在瀏覽器開發工具中立即識別元素來源
- ✅ 快速定位問題檔案
- ✅ 更容易除錯和維護

**重要規則**：
> 📌 **所有屬於頁面的元素都必須嵌套在頁面根類別下**，使代碼中的層級關係清晰明確。

```scss
// ✅ 正確：所有元素都嵌套在 hooks_test_page 下
.hooks_test_page {
  @extend %test_page;
  
  &-description { }      // .hooks_test_page-description
  &-grid { }             // .hooks_test_page-grid
  &-section {            // .hooks_test_page-section
    &-title { }          // .hooks_test_page-section-title
    &-description { }    // .hooks_test_page-section-description
  }
}

// ❌ 錯誤：無法判斷 description 和 grid 屬於哪個頁面
.hooks_test_page { }
.description { }
.grid { }
```

---

### SCSS Placeholders 樣式複用

專案使用 **SCSS Placeholders（`%name`）** 來實現樣式複用，減少重複代碼並提高可維護性。

#### 為什麼使用 Placeholders？

1. ✅ **減少重複** - 多個選擇器可以繼承相同的樣式
2. ✅ **提高可維護性** - 修改一處即可影響所有繼承的地方
3. ✅ **更好的組織** - 將共用樣式集中管理
4. ✅ **支援響應式** - Placeholders 內可以使用 mixins

#### 使用範例

**定義 Placeholders**：
```scss
// 在組件或頁面的 <style> 區塊頂部定義
%data_block {
  padding: 40px;
  text-align: center;
  border-radius: 8px;
  font-size: 16px;
}

%section_title {
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 20px 0;

  @include tablet {
    font-size: 20px;
  }
  @include mobile {
    font-size: 18px;
  }
}

%data_field {
  padding: 16px;
  text-align: left;

  @include tablet {
    padding: 12px 8px;
  }
  @include mobile {
    padding: 8px 4px;
  }
}
```

**使用 Placeholders**：
```scss
.index_page {
  &-list_section {
    &-section_title {
      @extend %section_title;  // 繼承共用樣式
    }

    &-loading {
      @extend %data_block;     // 繼承共用樣式
      background-color: #e3f2fd;
      color: #1976d2;
    }

    &-error {
      @extend %data_block;     // 繼承共用樣式
      background-color: #ffebee;
      color: #c62828;
    }

    &-table {
      &-header {
        @extend %data_field;   // 繼承共用樣式
        font-weight: 600;
        color: #ffffff;
      }

      &-cell {
        @extend %data_field;   // 繼承共用樣式
        color: #e1e1e1;
      }
    }
  }
}
```

#### Placeholders vs Mixins

**使用 Placeholders 的時機**：
- ✅ 多個選擇器需要完全相同的樣式
- ✅ 樣式不需要參數（靜態樣式）
- ✅ 想要減少 CSS 輸出大小（選擇器會被合併）

**使用 Mixins 的時機**：
- ✅ 需要參數化的樣式
- ✅ 需要根據使用情況客製化
- ✅ 需要在樣式中使用條件邏輯

**Mixins 範例**（響應式設計）：
```scss
// assets/css/mixin.scss
@mixin mobile {
  @media (max-width: 707px) {
    @content;
  }
}

@mixin tablet {
  @media (max-width: 1140px) {
    @content;
  }
}

// 使用方式
.index_page {
  padding: 20px;

  @include tablet {
    padding: 12px;
  }
  @include mobile {
    padding: 8px;
  }
}
```

---

#### 範例

**範例 1：基本 Block 與 Element**
```scss
.section {
  /* Block 樣式 */
  padding: 20px;
  background-color: #f5f5f5;
  
  &-title {
    // .section-title (Element 用連字符 - 連接)
    margin-top: 0;
    font-size: 18px;
  }
  
  &-description {
    // .section-description
    color: #666;
    margin-bottom: 15px;
  }
  
  &-content_box {
    // .section-content_box (Element 名稱內部用底線 _ 分隔多個語義詞)
    padding: 15px;
    background: white;
  }
}
```

**範例 2：Block 名稱有多個語義詞**
```scss
.image_upload {
  // Block 名稱內部用底線 _ 分隔
  position: relative;
  
  &-preview {
    // .image_upload-preview (用連字符 - 連接 Element)
    width: 100%;
    
    &-img {
      // .image_upload-preview-img (Sub-Element 再用連字符 - 連接)
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  
  &-mask {
    // .image_upload-mask
    &[css-is-dragging='true'] {
      opacity: 0.8;
    }
  }
}
```

**範例 3：狀態管理**
```scss
.dropdown {
  position: relative;
  
  &-menu {
    // .dropdown-menu
    position: absolute;
    
    &-item {
      // .dropdown-menu-item (Sub-Element)
      padding: 8px;
      cursor: pointer;
    }
  }
}

.key_status {
  padding: 10px;
  
  &[data-pressed='true'] {
    // 使用 HTML 屬性管理狀態
    color: white;
  }
}
```

#### HTML 使用範例

**使用 Vue Scoped 樣式**：
```vue
<template>
  <!-- 範例 1：基本使用 -->
  <div class="section">
    <h2 class="section-title">標題</h2>
    <p class="section-description">描述</p>
    <div class="section-content_box">
      內容
    </div>
  </div>

  <!-- 範例 2：多層結構 -->
  <div class="image_upload">
    <div class="image_upload-preview">
      <img class="image_upload-preview-img" src="..." />
    </div>
    <div class="image_upload-mask" css-is-dragging="true">
      <p>拖拉圖片到此</p>
    </div>
  </div>

  <!-- 範例 3：下拉選單 -->
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-menu-item">選項 1</div>
      <div class="dropdown-menu-item">選項 2</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 組件樣式
</style>
```

#### 重要原則

1. **每個元素只使用一個 className** - 不要組合多個類別
2. **Block 內的所有元素都應該是 Block 的子元素** - 使用連字符 `-` 連接
3. **Element 名稱內部的多個語義詞使用底線 `_`** - 如 `content_box`、`value_display`
4. **狀態使用 HTML 屬性** - 如 `[css-is-active='true']`、`[data-pressed='true']`


本專案所有組件都遵循這些 CSS 規範，確保代碼風格一致性。

### CSS 檔案組織規範

專案採用**混合式樣式組織**策略，結合全域工具集中管理與組件樣式就近放置的優勢：

#### 目錄結構


```
parker-nuxt-lab/
├── app/
│   ├── assets/
│   │   └── styles/           # 全域樣式工具（集中管理）
│   │       ├── global.scss   # 全域樣式
│   │       ├── mixin.scss    # Mixins（可重用的樣式函數）
│   │       ├── variable.scss # 變數定義
│   │       ├── animation.scss # 動畫工具
│   │       └── customize-ripple.scss # 漣漪效果客製化
│   │
│   ├── components/            # 組件特定樣式（就近放置）
│   │   ├── Button.vue
│   │   │   └── <style scoped> # 組件樣式
│   │   └── Tabs/
│   │       └── Bar.vue
│   │           └── <style scoped>
│   │
│   └── pages/                 # 頁面特定樣式（就近放置）
        └── index.vue
            └── <style scoped> # 頁面樣式
```

#### 樣式放置原則

1. **全域工具** → `app/assets/styles/` 目錄
   - ✅ Mixins（`@mixin`）- 可傳參數的樣式函數
   - ✅ 變數定義
   - ✅ 全域樣式
   - ✅ 動畫工具

2. **組件樣式** → 組件檔案內
   - ✅ 與組件模板放在一起
   - ✅ 使用 `<style scoped lang="scss">`
   - ✅ 只包含該組件特定的樣式

3. **頁面樣式** → `pages/` 目錄內
   - ✅ 與頁面檔案放在同一目錄
   - ✅ 使用 `<style scoped lang="scss">` 避免全域污染
   - ✅ 只包含該頁面特定的樣式

#### Mixins 與 Placeholders 使用方式

**Mixins (`@mixin`)** - 目前使用中：
```scss
// app/assets/styles/mixin.scss
@mixin flex-layout($gap: 12px) {
  display: flex;
  gap: $gap;
}

// 在組件中使用
.my-class {
  @include flex-layout(16px);  // 可傳參數，更靈活
}
```

**Placeholders (`%name`)** - 可選的未來擴展：

> **注意**：如果後續維護需要繼承用的共用樣式，可建立 `app/assets/styles/placeholders.scss`。

```scss
// app/assets/styles/placeholders.scss（需要時再建立）
%flex {
  display: flex;
}

%text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 在組件中使用
.my-class {
  @extend %flex;           // 會合併選擇器，減少重複 CSS
  @extend %text-ellipsis;  // 可重用的樣式繼承
}
```

**何時使用 Placeholders**：
- ✅ 當多個組件需要完全相同的樣式時
- ✅ 當想要減少 CSS 輸出大小（選擇器會被合併）
- ✅ 當樣式不需要參數（靜態樣式）

**何時使用 Mixins**：
- ✅ 當需要參數化的樣式時
- ✅ 當樣式需要根據使用情況客製化時
- ✅ 當需要在樣式中使用條件邏輯時

#### 使用範例

```scss
// 在組件 SCSS 中引入全域工具
@use '@/assets/styles/mixin' as *;
@use '@/assets/styles/variable' as *;

.my-component {
  @include flex-layout(16px);       // 使用 mixin
  color: $primary-color;            // 使用變數
  
  &_item {
    font-size: $font-size-base;
  }
}
```

#### 優勢

1. ✅ **集中管理** - 全域工具易於維護和更新
2. ✅ **就近放置** - 組件和頁面樣式易於查找
3. ✅ **靈活性** - Mixins 提供參數化的樣式函數
4. ✅ **一致性** - 變數確保設計標記的一致性
5. ✅ **可維護性** - 清晰的職責分離

本專案所有樣式檔案都遵循這些組織原則，確保樣式管理的一致性與可維護性。

**詳細文檔**：

- [CSS 命名規範審查與修正計劃](./docs/in-progress/css-naming-audit-plan.md)
- [CSS 命名規範快速參考](./docs/in-progress/css-naming-quick-reference.md)
- [CSS 命名規範修正進度](./docs/in-progress/css-naming-progress.md)

## 即時通訊 / 影音相關頁面

- `pages/socket-test/`（Socket.IO）
- `pages/server-sent-event-test/`（SSE）
- `pages/web-rtc/`（WebRTC / Socket.IO / WebSocket / SSE variant）
  - WebRTC SSE 實作使用 Upstash Redis 儲存房間狀態與成員資訊
  - 所有 Redis keys 使用 `nuxt-lab:` 前綴以避免多專案共用時的衝突
- `pages/firebase/`（FCM 示範）

> Socket.IO 伺服器端路由與設定可在 `server/` 下查看，客戶端設定則在 `plugins/07.socket.client.js` 與 `composables/useSocketIoClient.js`。
> 
> WebRTC SSE 相關的伺服器端路由位於 `server/routes/server-sent-event/web-rtc/`，使用 `@upstash/redis` 進行即時資料同步。

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

- `public/ai_models`：`face-api.js` 權重檔案（weights）
  - 來源參考：<https://github.com/justadudewhohacks/face-api.js/tree/master>

## 參考連結

- Nuxt 4 文件：<https://nuxt.com/docs/getting-started/introduction>
- 部署文件：<https://nuxt.com/docs/getting-started/deployment>
- face-api.js models（weights）：<https://github.com/justadudewhohacks/face-api.js/tree/master>
- mac 安裝 node-canvas：<https://github.com/Automattic/node-canvas>
