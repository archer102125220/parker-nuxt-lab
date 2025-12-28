# Vue SFC 區塊順序更新 - 進度追蹤

> 此文件用於追蹤 Vue SFC 區塊順序更新的詳細進度

**建立日期**: 2025-12-28  
**最後更新**: 2025-12-28  
**關聯計畫**: [vue-sfc-section-order-update-plan.md](./vue-sfc-section-order-update-plan.md)

---

## 📊 總覽

| 類別 | 總數 | 已完成 | 待更新 | 進度 |
|------|------|--------|--------|------|
| Layouts | 3 | 0 | 3 | 0% |
| Components | 22 | 1 | 21 | 5% |
| Pages | 86 | 1 | 85 | 1% |
| **總計** | **111** | **2** | **109** | **2%** |

---

## ✅ 已符合新順序（無需變更）

以下檔案已使用 `script → template → style` 順序：

- [x] `app/components/Animation/RipplesBackground.vue`
- [x] (其他已使用新順序的檔案)

---

## 🔄 待更新清單

### 1. App 根元件

| 狀態 | 檔案路徑 | 備註 |
|:----:|----------|------|
| [ ] | `app/app.vue` | 應用程式根元件 |

### 2. Layouts（佈局元件）

| 狀態 | 檔案路徑 | 備註 |
|:----:|----------|------|
| [ ] | `app/layouts/default.vue` | 預設佈局 |
| [ ] | `app/layouts/full-screen.vue` | 全螢幕佈局 |
| [ ] | `app/layouts/home.vue` | 首頁佈局 |

### 3. Components（共用元件）

#### 3.1 核心元件

| 狀態 | 檔案路徑 | 備註 |
|:----:|----------|------|
| [ ] | `app/components/Drawer.vue` | 抽屜元件 |
| [ ] | `app/components/LoadingBar.vue` | 載入進度條 |
| [ ] | `app/components/Message.vue` | 訊息元件 |
| [ ] | `app/components/SkeletonLoader.vue` | 骨架載入器 |
| [ ] | `app/components/SlideInPanel.vue` | 滑入面板 |

#### 3.2 表單元件

| 狀態 | 檔案路徑 | 備註 |
|:----:|----------|------|
| [ ] | `app/components/PhoneInput.vue` | 電話輸入框 |
| [ ] | `app/components/Selector.vue` | 選擇器 |
| [ ] | `app/components/SwitchButton.vue` | 開關按鈕 |

#### 3.3 互動元件

| 狀態 | 檔案路徑 | 備註 |
|:----:|----------|------|
| [ ] | `app/components/PWALoading.vue` | PWA 載入元件 |
| [ ] | `app/components/QRcode.vue` | QR Code 元件 |
| [ ] | `app/components/ScrollFetch.vue` | 捲動載入元件 |
| [ ] | `app/components/NotificationPermission.vue` | 通知權限元件 |

#### 3.4 輪播/Swiper 元件

| 狀態 | 檔案路徑 | 備註 |
|:----:|----------|------|
| [ ] | `app/components/SwiperCustom.vue` | 自訂輪播元件 |
| [ ] | `app/components/SwiperJs.vue` | Swiper.js 元件 |

#### 3.5 媒體元件

| 狀態 | 檔案路徑 | 備註 |
|:----:|----------|------|
| [ ] | `app/components/Youtube.vue` | YouTube 嵌入元件 |

#### 3.6 動畫元件

| 狀態 | 檔案路徑 | 備註 |
|:----:|----------|------|
| [ ] | `app/components/Animation/End.vue` | 結束動畫 |
| [ ] | `app/components/Animation/EnterLabel.vue` | 標籤進入動畫 |
| [ ] | `app/components/Animation/TriangleEnter.vue` | 三角形進入動畫 |

#### 3.7 Tab 元件

| 狀態 | 檔案路徑 | 備註 |
|:----:|----------|------|
| [ ] | `app/components/Tabs/Bar.vue` | Tab 導覽列 |
| [ ] | `app/components/Tabs/Content.vue` | Tab 內容區 |

#### 3.8 編輯器元件

| 狀態 | 檔案路徑 | 備註 |
|:----:|----------|------|
| [ ] | `app/components/WangEditor/index.vue` | WangEditor 主元件 |
| [ ] | `app/components/WangEditor/View.vue` | WangEditor 檢視元件 |

#### 3.9 其他元件

| 狀態 | 檔案路徑 | 備註 |
|:----:|----------|------|
| [ ] | `app/components/Link/Card.vue` | 連結卡片 |
| [ ] | `app/components/Triangle.vue` | 三角形元件 |

### 4. Pages（頁面）

#### 4.1 主要頁面

| 狀態 | 檔案路徑 | 備註 |
|:----:|----------|------|
| [ ] | `app/pages/index.vue` | 首頁 |
| [ ] | `app/pages/about.vue` | 關於頁面 |
| [ ] | `app/pages/components/index.vue` | 元件展示頁 |

#### 4.2 CSS 繪圖頁面

| 狀態 | 檔案路徑 | 備註 |
|:----:|----------|------|
| [ ] | `app/pages/css-drawing/index.vue` | CSS 繪圖首頁 |
| [ ] | `app/pages/css-drawing/hexagon-test.vue` | 六邊形測試 |
| [ ] | `app/pages/css-drawing/svg-color-change.vue` | SVG 變色測試 |
| [ ] | `app/pages/css-drawing/triangle-anime-test.vue` | 三角形動畫測試 |
| [ ] | `app/pages/css-drawing/triangle-full-test.vue` | 三角形完整測試 |
| [ ] | `app/pages/css-drawing/triangle-test.vue` | 三角形測試 |

#### 4.3 指令測試頁面

| 狀態 | 檔案路徑 | 備註 |
|:----:|----------|------|
| [ ] | `app/pages/directives/index.vue` | 指令首頁 |
| [ ] | `app/pages/directives/customize-lazyload-test.vue` | 自訂懶載入測試 |
| [ ] | `app/pages/directives/customize-ripple-test.vue` | 自訂波紋測試 |

#### 4.4 AI/臉部辨識頁面

| 狀態 | 檔案路徑 | 備註 |
|:----:|----------|------|
| [ ] | `app/pages/face-api.vue` | Face API 測試 |
| [ ] | `app/pages/face-swap/index.vue` | AI 換臉首頁 |
| [ ] | `app/pages/face-swap/backend.vue` | AI 換臉後端 |
| [ ] | `app/pages/face-swap/frontend.vue` | AI 換臉前端 |

#### 4.5 認證頁面

| 狀態 | 檔案路徑 | 備註 |
|:----:|----------|------|
| [ ] | `app/pages/fido2-lib.vue` | FIDO2 測試 |
| [ ] | `app/pages/web-authn.vue` | WebAuthn 測試 |

#### 4.6 Firebase 頁面

| 狀態 | 檔案路徑 | 備註 |
|:----:|----------|------|
| [ ] | `app/pages/firebase/index.vue` | Firebase 首頁 |
| [ ] | `app/pages/firebase/cloud-messaging.vue` | 雲端訊息推播 |

#### 4.7 即時通訊頁面

| 狀態 | 檔案路徑 | 備註 |
|:----:|----------|------|
| [ ] | `app/pages/socket-test/index.vue` | Socket 測試首頁 |
| [ ] | `app/pages/socket-test/socket.io.vue` | Socket.IO 測試 |
| [ ] | `app/pages/socket-test/websocket.vue` | WebSocket 測試 |
| [ ] | `app/pages/server-sent-event-test/room-post/index.vue` | SSE 測試首頁 |
| [ ] | `app/pages/server-sent-event-test/room-post/[uuId].vue` | SSE 房間頁面 |

#### 4.8 WebRTC 頁面

| 狀態 | 檔案路徑 | 備註 |
|:----:|----------|------|
| [ ] | `app/pages/web-rtc/websocket/index.vue` | WebRTC 首頁 |
| [ ] | `app/pages/web-rtc/websocket/room/index.vue` | WebRTC 房間首頁 |
| [ ] | `app/pages/web-rtc/websocket/room/[uuId].vue` | WebRTC 房間頁面 |

#### 4.9 其他測試頁面

> [!NOTE]
> 其他頁面包括路由測試、API 測試、攝影機測試等，數量較多，將在實際執行時逐一更新。

---

## 📝 更新日誌

| 日期 | 更新內容 | 檔案數量 |
|------|----------|----------|
| 2025-12-28 | 建立計畫及進度追蹤文件 | 0 |

---

## 🔖 操作說明

### 更新進度標記

當完成一個檔案的區塊順序更新後，請將該檔案的狀態從 `[ ]` 改為 `[x]`：

```markdown
<!-- 更新前 -->
| [ ] | `app/components/Youtube.vue` | YouTube 嵌入元件 |

<!-- 更新後 -->
| [x] | `app/components/Youtube.vue` | YouTube 嵌入元件 |
```

### 更新總覽進度

每次更新檔案後，請同步更新上方「總覽」表格中的「已完成」和「進度」數值。

---

## ⚠️ 注意事項

1. **保持 Git 追蹤**: 每完成一批檔案更新後，建議進行 commit
2. **測試驗證**: 更新後務必運行 `npm run dev` 確認無錯誤
3. **保持文件同步**: 更新檔案後同步更新此進度追蹤文件
