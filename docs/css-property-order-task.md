# CSS 屬性順序修正 - 全專案任務清單

## 總體進度：29/101 完成 (28.7%)

**已完成：** 29 個檔案 ✅
**進行中：** 0 個檔案 🔄
**待處理：** 72 個檔案 ⏳
**延後處理：** 3 個超大檔案 🔶

**最後更新：** 2025-11-27 17:45

---

## ✅ 已完成（第一、二階段）

### 核心樣式檔案
- [x] global.scss
- [x] mixin.scss

### 組件
- [x] Message.vue
- [x] Dialog.vue (PhoneInput.vue 已符合標準)
- [x] full-screen.vue (Layout)
- [x] SlideInPanel.vue
- [x] LoadingBar.vue
- [x] PWALoading.vue

---

## ✅ 第三階段：常用組件（6/8 完成 - 75%）

- [x] Drawer.vue ✅
- [x] Selector.vue ✅
- [x] GoTop.vue ✅
- [x] SwitchButton.vue ✅
- [x] ImageUpload.vue ✅
- [x] DatePicker.vue ✅ (無樣式)
- [ ] ScrollFetch.vue 🔶 (1050 行，延後處理)
- [ ] Countdown.vue 🔶 (1023 行，延後處理)

**狀態：** ⏸️ 暫停（剩餘 2 個超大檔案延後處理）

---

## 🔄 第四階段：其他組件（16/19 完成）

### 4A. 單檔組件（4/6）
- [x] NotificationPermission.vue ✅
- [x] Triangle.vue ✅
- [x] Youtube.vue ✅
- [x] SkeletonLoader.vue ✅
- [ ] SwiperCustom.vue
- [ ] SwiperJs.vue

### 4B. 子目錄組件（12/13）
- [x] Animation/EnterLabel.vue ✅
- [x] Animation/TriangleEnter.vue ✅
- [x] Link/Card.vue ✅
- [x] DialogModal/index.vue ✅
- [x] DialogModal/DemoContent.vue ✅
- [x] Hexagon/index.vue ✅
- [x] Hexagon/Container.vue ✅
- [x] Layout/Header.vue ✅
- [x] Layout/Footer.vue ✅
- [ ] Tabs/Bar.vue (1626 行，非常複雜)
- [x] Tabs/Content.vue ✅
- [x] WangEditor/index.vue ✅
- [x] WangEditor/View.vue ✅

**狀態：** 🔄 進行中

---

## 🔄 第五階段：頁面檔案（0/62 完成）

### 5A. 根目錄頁面（0/10）
- [ ] about.vue
- [ ] face-api.vue
- [ ] face-swap.vue
- [ ] fido2-lib.vue
- [ ] frontend-api-cach-test.vue
- [ ] index.vue
- [ ] offline.vue
- [ ] swagger-doc.vue
- [ ] web-authn.vue
- [ ] web-cam.vue

### 5B. 子目錄頁面（0/51）
#### components/* (測試頁面)
- [ ] components/base-button-test.vue
- [ ] components/countdown-test.vue
- [ ] components/date-picker-test.vue
- [ ] components/dialog-modal-test.vue
- [ ] components/dialog-test.vue
- [ ] components/drawer-test.vue
- [ ] components/go-top-test.vue
- [ ] components/hexagon-test.vue
- [ ] components/image-upload-test.vue
- [ ] components/index.vue
- [ ] components/phone-input.vue
- [ ] components/qr-code-test.vue
- [ ] components/scroll-fetch-test.vue
- [ ] components/selector-test.vue
- [ ] components/skeleton-loader-test.vue
- [ ] components/slide-in-panel-test.vue
- [ ] components/switch-button.vue
- [ ] components/swiper-custom-test.vue
- [ ] components/swiper-js-test.vue
- [ ] components/tab-test.vue
- [ ] components/virtual-scroller.vue
- [ ] components/wang-editor-test.vue

#### css-drawing/*
- [ ] css-drawing/hexagon-test.vue
- [ ] css-drawing/index.vue
- [ ] css-drawing/svg-color-change.vue
- [ ] css-drawing/triangle-anime-test.vue
- [ ] css-drawing/triangle-full-test.vue
- [ ] css-drawing/triangle-test.vue

#### directives/*
- [ ] directives/customize-lazyload-test.vue
- [ ] directives/customize-ripple-test.vue
- [ ] directives/index.vue

#### firebase/*
- [ ] firebase/cloud-messaging.vue
- [ ] firebase/index.vue

#### route/*
- [ ] route/index.vue
- [ ] route/params-back-test/[testData].vue
- [ ] route/params-back-test/index.vue
- [ ] route/query-back-test.vue

#### server-sent-event-test/*
- [ ] server-sent-event-test/global-get.vue
- [ ] server-sent-event-test/global-post.vue
- [ ] server-sent-event-test/index.vue
- [ ] server-sent-event-test/room-get/[uuId].vue
- [ ] server-sent-event-test/room-get/index.vue
- [ ] server-sent-event-test/room-post/[uuId].vue
- [ ] server-sent-event-test/room-post/index.vue

#### socket-test/*
- [ ] socket-test/index.vue
- [ ] socket-test/socket.io.vue
- [ ] socket-test/websocket.vue

#### web-rtc/*
- [ ] web-rtc/index.vue

### 5C. App 檔案（0/1）
- [ ] app.vue

**狀態：** ⏳ 待開始

---

## 📊 階段統計

| 階段 | 檔案數 | 已完成 | 進度 |
|------|--------|--------|------|
| 第一、二階段 | 7 | 7 | 100% ✅ |
| 第三階段 | 8 | 6 | 75% |
| 第四階段 | 19 | 16 | 84.2% |
| 第五階段 | 62 | 0 | 0% |
| **總計** | **101** | **29** | **28.7%** |

---

## 📝 使用說明

此檔案用於追蹤 CSS 屬性順序修正的進度。

**更新方式：**
1. 完成一個檔案後，將 `[ ]` 改為 `[x]`
2. 更新階段統計中的數字
3. 更新總體進度百分比
4. 更新「最後更新」時間

**相關文件：**
- 實施計劃：`docs/css-property-order-plan.md`
- 修正標準：遵循主流 CSS 屬性順序（Positioning → Display & Box Model → Typography → Visual → Animation → Misc）

---

**下一步：** 開始第三階段 - 修正常用組件
