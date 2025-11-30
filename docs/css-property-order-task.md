# CSS 屬性順序修正 - 全專案任務清單

## 總體進度：62/101 完成 (61.4%)

**已完成：** 62 個檔案 ✅
**進行中：** 0 個檔案 🔄
**待處理：** 39 個檔案 ⏳
**延後處理：** 0 個超大檔案 🔶

**最後更新：** 2025-11-30 11:32

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

## ✅ 第三階段：常用組件（8/8 完成 - 100%）

- [x] Drawer.vue ✅
- [x] Selector.vue ✅
- [x] GoTop.vue ✅
- [x] SwitchButton.vue ✅
- [x] ImageUpload.vue ✅
- [x] DatePicker.vue ✅ (無樣式)
- [x] ScrollFetch.vue ✅ (1050 行，已完成)
- [x] Countdown.vue ✅ (1023 行，已完成)

**狀態：** ✅ 完成

---

## ✅ 第四階段：其他組件（19/19 完成 - 100%）

### 4A. 單檔組件 (6/6 - 100%)
- [x] NotificationPermission.vue ✅
- [x] Triangle.vue ✅
- [x] Youtube.vue ✅
- [x] SkeletonLoader.vue ✅
- [x] SwiperCustom.vue ✅
- [x] SwiperJs.vue ✅

### 4B. 子目錄組件 (13/13 - 100%)
- [x] Animation/EnterLabel.vue ✅
- [x] Animation/TriangleEnter.vue ✅
- [x] Link/Card.vue ✅
- [x] DialogModal/index.vue ✅
- [x] DialogModal/DemoContent.vue ✅
- [x] Hexagon/index.vue ✅
- [x] Hexagon/Container.vue ✅
- [x] Layout/Header.vue ✅
- [x] Layout/Footer.vue ✅
- [x] Tabs/Bar.vue ✅ (1626 行，已完成)
- [x] Tabs/Content.vue ✅
- [x] WangEditor/index.vue ✅
- [x] WangEditor/View.vue ✅

**狀態：** ✅ 完成

---

## 🔄 第五階段：頁面檔案（31/62 完成 - 50.0%）

### 5A. 根目錄頁面（8/10 - 80%）
- [x] about.vue ✅
- [x] face-api.vue ✅
- [x] face-swap.vue ✅
- [x] fido2-lib.vue ✅
- [x] frontend-api-cach-test.vue ✅
- [x] index.vue ✅
- [x] offline.vue ✅
- [ ] swagger-doc.vue (僅導入外部 CSS，無需修正)
- [x] web-authn.vue ✅
- [x] web-cam.vue ✅

### 5B. 子目錄頁面（23/51 - 45.1%）
#### components/* (測試頁面) - 18/21 完成 (85.7%)
- [ ] components/base-button-test.vue
- [x] components/components-test.vue ✅
- [x] components/countdown-test.vue ✅
- [ ] components/date-picker-test.vue
- [x] components/dialog.vue ✅
- [ ] components/dialog-modal-test.vue
- [ ] components/dialog-test.vue
- [x] components/drawer.vue ✅
- [ ] components/drawer-test.vue
- [x] components/enter-label.vue ✅
- [x] components/go-top.vue ✅
- [ ] components/go-top-test.vue
- [ ] components/hexagon-test.vue
- [x] components/image-upload-test.vue ✅
- [x] components/index.vue ✅
- [ ] components/phone-input.vue
- [x] components/qr-code-test.vue ✅ (空 CSS)
- [x] components/scroll-fetch.vue ✅
- [x] components/selector.vue ✅ (空 CSS)
- [ ] components/skeleton-loader-test.vue
- [ ] components/skeleton-loader.vue
- [ ] components/slide-in-panel-test.vue
- [ ] components/slide-in-panel.vue
- [x] components/switch-button.vue ✅ (空 CSS)
- [ ] components/swiper-custom-test.vue
- [ ] components/swiper-js-test.vue
- [ ] components/swiper-test.vue
- [x] components/tab-test.vue ✅
- [x] components/virtual-scroller.vue ✅
- [ ] components/wang-editor-test.vue
- [ ] components/youtube-test.vue

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

**狀態：** 🔄 進行中

---

## 📊 階段統計

**更新方式：**
1. 完成一個檔案後，將 `[ ]` 改為 `[x]`
2. 更新階段統計中的數字
3. 更新總體進度百分比
4. 更新「最後更新」時間

**相關文件：**
- 實施計劃：`docs/css-property-order-plan.md`
- 修正標準：遵循主流 CSS 屬性順序（Positioning → Display & Box Model → Typography → Visual → Animation → Misc）

---

**下一步：** 繼續第五階段 - 修正剩餘頁面檔案
