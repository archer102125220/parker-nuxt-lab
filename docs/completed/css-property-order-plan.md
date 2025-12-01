# CSS 屬性順序修正 - 全專案實施計劃

## 📋 專案概述

**目標：** 修正專案中所有 Vue 檔案的 CSS 屬性順序，使其符合主流標準

**總檔案數：** 101 個 Vue 檔案
- ✅ 已完成：7 個（第一、二階段）
- 🔄 待處理：94 個

**預估總時間：** 20-30 分鐘

---

## 🎯 實施階段

### 第三階段：常用組件修正（優先）

**目標：** 修正最常使用的核心組件

**檔案清單：** 8 個檔案
1. [Drawer.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/Drawer.vue) ⚠️ 已發現問題
2. [Selector.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/Selector.vue) ⚠️ 已發現問題
3. [Countdown.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/Countdown.vue)
4. [DatePicker.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/DatePicker.vue)
5. [ImageUpload.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/ImageUpload.vue)
6. [ScrollFetch.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/ScrollFetch.vue)
7. [SwitchButton.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/SwitchButton.vue)
8. [GoTop.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/GoTop.vue)

**預估時間：** 5-8 分鐘

---

### 第四階段：其他組件修正

**目標：** 修正剩餘的組件檔案

#### 4A. 單檔組件（6 個）
1. [NotificationPermission.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/NotificationPermission.vue)
2. [SkeletonLoader.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/SkeletonLoader.vue)
3. [SwiperCustom.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/SwiperCustom.vue)
4. [SwiperJs.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/SwiperJs.vue)
5. [Triangle.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/Triangle.vue)
6. [Youtube.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/Youtube.vue)

#### 4B. 子目錄組件（13 個）
1. [Animation/EnterLabel.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/Animation/EnterLabel.vue)
2. [Animation/TriangleEnter.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/Animation/TriangleEnter.vue)
3. [DialogModal/index.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/DialogModal/index.vue)
4. [DialogModal/DemoContent.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/DialogModal/DemoContent.vue)
5. [Hexagon/index.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/Hexagon/index.vue)
6. [Hexagon/Container.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/Hexagon/Container.vue)
7. [Layout/Header.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/Layout/Header.vue)
8. [Layout/Footer.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/Layout/Footer.vue)
9. [Link/Card.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/Link/Card.vue)
10. [Tabs/Bar.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/Tabs/Bar.vue)
11. [Tabs/Content.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/Tabs/Content.vue)
12. [WangEditor/index.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/WangEditor/index.vue)
13. [WangEditor/View.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/WangEditor/View.vue)

**預估時間：** 8-12 分鐘

---

### 第五階段：頁面檔案修正

**目標：** 修正所有頁面檔案

#### 5A. 根目錄頁面（10 個）
1. [about.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/pages/about.vue)
2. [face-api.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/pages/face-api.vue)
3. [face-swap.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/pages/face-swap.vue)
4. [fido2-lib.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/pages/fido2-lib.vue)
5. [frontend-api-cach-test.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/pages/frontend-api-cach-test.vue)
6. [index.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/pages/index.vue)
7. [offline.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/pages/offline.vue)
8. [swagger-doc.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/pages/swagger-doc.vue)
9. [web-authn.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/pages/web-authn.vue)
10. [web-cam.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/pages/web-cam.vue)

#### 5B. 子目錄頁面（約 50+ 個）
- pages/components/* - 組件測試頁面
- pages/css-drawing/* - CSS 繪圖測試頁面
- pages/directives/* - 指令測試頁面
- pages/firebase/* - Firebase 相關頁面
- pages/route/* - 路由測試頁面
- pages/server-sent-event-test/* - SSE 測試頁面
- pages/socket-test/* - Socket 測試頁面
- pages/web-rtc/* - WebRTC 頁面

#### 5C. App 檔案（1 個）
1. [app.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/app.vue)

**預估時間：** 10-15 分鐘

---

## 🔧 修正標準

所有修正都遵循以下 CSS 屬性順序：

1. **Positioning** - `position`, `top`, `right`, `bottom`, `left`, `z-index`
2. **Display & Box Model** - `display`, `flex-*`, `width`, `height`, `margin`, `padding`, `border`, `overflow`
3. **Typography** - `font-*`, `line-height`, `color`, `text-*`, `word-break`
4. **Visual** - `background-*`, `box-shadow`, `opacity`, `border-color`
5. **Animation** - `transition`, `animation`, `transform`
6. **Misc** - `cursor`, `appearance`, `user-select`, `content`, `align-self`

每個選擇器都會添加清晰的分組註解。

---

## ✅ 驗證計劃

### 每階段驗證
- 確認開發伺服器正常運行
- 檢查修改後的檔案語法正確
- 確認沒有視覺變化

### 最終驗證
- 運行完整的專案構建
- 檢查所有頁面功能正常
- 確認沒有 CSS 相關錯誤

---

## 📊 進度追蹤

進度將記錄在 `docs/css-property-order-task.md` 檔案中，每完成一個階段就更新一次。

---

## 🎯 成功標準

- ✅ 所有 94 個剩餘檔案完成修正
- ✅ 所有檔案都有清晰的分組註解
- ✅ 100% 符合主流 CSS 屬性順序規範
- ✅ 開發伺服器正常運行
- ✅ 沒有功能破壞或視覺變化

---

## 📝 注意事項

1. **批量處理：** 每次處理 5-10 個檔案，避免一次性修改過多
2. **進度保存：** 每完成一批就更新 task.md
3. **問題記錄：** 如遇到特殊情況，記錄在相關文件
4. **備份建議：** 建議在開始前提交當前代碼到 git
