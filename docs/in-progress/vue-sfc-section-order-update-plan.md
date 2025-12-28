# Vue SFC 區塊順序更新計畫

> 將專案中的 Vue Single File Component (SFC) 區塊順序，從 `template, script, style` 更新為目前主流的 `script, template, style` 順序。

## 📋 專案概覽

| 項目 | 數量 |
|------|------|
| 總 Vue 檔案數 | 111 |
| 需要更新（舊順序：template → script → style） | 109 |
| 已符合新順序（script → template → style） | 2 |

## 🎯 目標

將所有 Vue SFC 檔案的區塊順序從：

```
<template>...</template>
<script>...</script>
<style>...</style>
```

更新為 Vue 3 / Nuxt 3 主流順序：

```
<script setup>...</script>
<template>...</template>
<style>...</style>
```

## 📚 背景說明

### 為何採用 script-first 順序？

1. **Vue 3 官方推薦**: Vue 3 的 `<script setup>` 語法鼓勵邏輯優先的寫法
2. **開發體驗**: 先閱讀邏輯有助於理解元件功能
3. **一致性**: 與目前主流的 Vue 3 專案保持一致
4. **IDE 支援**: 更好的 TypeScript 類型推導支援

### 參考資料

- [Vue.js Style Guide](https://vuejs.org/style-guide/)
- [Nuxt 3 最佳實踐](https://nuxt.com/docs/guide/concepts/code-style)

---

## 📂 檔案清單分類

### ✅ 已符合新順序（無需變更）

| 檔案路徑 |
|----------|
| `app/components/Animation/RipplesBackground.vue` |

### 🔄 待更新檔案

#### 1. Components（元件）

| 狀態 | 檔案路徑 |
|------|----------|
| [ ] | `app/components/Animation/End.vue` |
| [ ] | `app/components/Drawer.vue` |
| [ ] | `app/components/Link/Card.vue` |
| [ ] | `app/components/LoadingBar.vue` |
| [ ] | `app/components/Message.vue` |
| [ ] | `app/components/NotificationPermission.vue` |
| [ ] | `app/components/PhoneInput.vue` |
| [ ] | `app/components/PWALoading.vue` |
| [ ] | `app/components/QRcode.vue` |
| [ ] | `app/components/ScrollFetch.vue` |
| [ ] | `app/components/Selector.vue` |
| [ ] | `app/components/SkeletonLoader.vue` |
| [ ] | `app/components/SlideInPanel.vue` |
| [ ] | `app/components/SwiperCustom.vue` |
| [ ] | `app/components/SwiperJs.vue` |
| [ ] | `app/components/SwitchButton.vue` |
| [ ] | `app/components/Tabs/Bar.vue` |
| [ ] | `app/components/Tabs/Content.vue` |
| [ ] | `app/components/Triangle.vue` |
| [ ] | `app/components/WangEditor/index.vue` |
| [ ] | `app/components/WangEditor/View.vue` |
| [ ] | `app/components/Youtube.vue` |

#### 2. Layouts（佈局）

| 狀態 | 檔案路徑 |
|------|----------|
| [ ] | `app/layouts/default.vue` |
| [ ] | `app/layouts/full-screen.vue` |
| [ ] | `app/layouts/home.vue` |

#### 3. Pages（頁面）

| 狀態 | 檔案路徑 |
|------|----------|
| [ ] | `app/app.vue` |
| [ ] | `app/pages/index.vue` |
| [ ] | `app/pages/about.vue` |
| [ ] | `app/pages/components/index.vue` |
| [ ] | `app/pages/css-drawing/index.vue` |
| [ ] | `app/pages/css-drawing/hexagon-test.vue` |
| [ ] | `app/pages/css-drawing/svg-color-change.vue` |
| [ ] | `app/pages/css-drawing/triangle-anime-test.vue` |
| [ ] | `app/pages/css-drawing/triangle-full-test.vue` |
| [ ] | `app/pages/css-drawing/triangle-test.vue` |
| [ ] | `app/pages/directives/index.vue` |
| [ ] | `app/pages/directives/customize-lazyload-test.vue` |
| [ ] | `app/pages/directives/customize-ripple-test.vue` |
| [ ] | `app/pages/face-api.vue` |
| [ ] | `app/pages/face-swap/index.vue` |
| [ ] | `app/pages/face-swap/backend.vue` |
| [ ] | `app/pages/face-swap/frontend.vue` |
| [ ] | `app/pages/fido2-lib.vue` |
| [ ] | `app/pages/firebase/index.vue` |
| [ ] | `app/pages/firebase/cloud-messaging.vue` |
| [ ] | `app/pages/server-sent-event-test/room-post/index.vue` |
| [ ] | `app/pages/server-sent-event-test/room-post/[uuId].vue` |
| [ ] | `app/pages/socket-test/index.vue` |
| [ ] | `app/pages/socket-test/socket.io.vue` |
| [ ] | `app/pages/socket-test/websocket.vue` |
| [ ] | `app/pages/web-rtc/websocket/index.vue` |
| [ ] | `app/pages/web-rtc/websocket/room/index.vue` |
| [ ] | `app/pages/web-rtc/websocket/room/[uuId].vue` |

> [!NOTE]
> 以上為主要核心檔案，完整清單請參考進度追蹤文件 `vue-sfc-section-order-update-progress.md`

---

## 🔧 更新步驟

### 每個檔案的更新流程

1. **備份原始檔案順序**（可選，透過 Git 追蹤）
2. **調整區塊順序**：
   - 將 `<script>` 或 `<script setup>` 區塊移至檔案開頭
   - 保留 `<template>` 區塊在中間
   - 保留 `<style>` 區塊在最後
3. **驗證語法正確性**：運行 `npm run lint`
4. **測試功能**：確保頁面正常運作

### 批次更新建議

建議按以下優先順序進行更新：

1. **Layouts** - 影響範圍較大，先確保佈局正常
2. **Core Components** - 常用的共用元件
3. **Pages** - 各頁面依重要性排序
4. **Sub-components** - 子元件

---

## 📌 驗證計畫

### 自動化驗證

```bash
# 1. 語法檢查
npm run lint

# 2. 型別檢查（如適用）
npm run typecheck

# 3. 開發伺服器啟動測試
npm run dev
```

### 手動驗證

- [ ] 首頁 (`/`) 正常載入
- [ ] 各主要頁面路由正常
- [ ] 元件渲染正確
- [ ] 無 Console 錯誤

---

## 📈 進度追蹤

詳細進度請參考：[vue-sfc-section-order-update-progress.md](./vue-sfc-section-order-update-progress.md)

| 階段 | 狀態 | 完成日期 |
|------|------|----------|
| 計畫建立 | ✅ 完成 | 2025-12-28 |
| Layouts 更新 | ⏳ 待開始 | - |
| Components 更新 | ⏳ 待開始 | - |
| Pages 更新 | ⏳ 待開始 | - |
| 驗證與測試 | ⏳ 待開始 | - |

---

## 📝 備註

- 此更新為純結構調整，不涉及邏輯變更
- 建議在獨立分支進行更新，完成後合併回主分支
- 每次更新後建議進行 commit，便於追蹤與回滾
