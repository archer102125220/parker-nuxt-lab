# 剩餘頁面重新設計計畫

> **專案狀態**: 📋 待開始
> **創建日期**: 2025-12-25
> **優先級**: P1（中優先級）

## 專案概述

完成導航頁面和功能頁面的重新設計後，剩餘約 52 個子頁面/組件測試頁面需要統一設計風格。

---

## 已完成專案回顧

| 專案 | 頁面數 | 狀態 |
|------|--------|------|
| 導航頁面重新設計 | 10 | ✅ 已完成 |
| 功能頁面重新設計 | 7 | ✅ 已完成 |
| **總計** | **17** | ✅ |

---

## 剩餘頁面分類

### 1. Components 子頁面（23個）

| 頁面 | 路徑 | 複雜度 | 優先級 |
|------|------|--------|--------|
| Banner Demo | `/components/banner-demo` | 低 | P2 |
| Components Test | `/components/components-test` | 中 | P2 |
| Countdown Test | `/components/countdown-test` | 低 | P2 |
| Dialog | `/components/dialog` | 中 | P1 |
| Drawer | `/components/drawer` | 中 | P1 |
| Enter Label | `/components/enter-label` | 低 | P2 |
| Go Top | `/components/go-top` | 低 | P2 |
| Image Upload Test | `/components/image-upload-test` | 中 | P1 |
| Phone Input | `/components/phone-input` | 中 | P1 |
| QR Code Test | `/components/qr-code-test` | 低 | P2 |
| Scroll Fetch | `/components/scroll-fetch` | 中 | P2 |
| Selector | `/components/selector` | 中 | P1 |
| Skeleton Loader | `/components/skeleton-loader` | 低 | P2 |
| Slide In Panel | `/components/slide-in-panel` | 中 | P1 |
| Swiper JS Test | `/components/swiper-js-test` | 中 | P2 |
| Swiper Test | `/components/swiper-test` | 中 | P2 |
| Switch Button | `/components/switch-button` | 低 | P2 |
| Tab Test | `/components/tab-test` | 中 | P2 |
| Virtual Scroller | `/components/virtual-scroller` | 高 | P2 |
| Wang Editor Test | `/components/wang-editor-test` | 高 | P2 |
| YouTube Test | `/components/youtube-test` | 低 | P2 |

### 2. CSS Drawing 子頁面（5個）

| 頁面 | 路徑 | 複雜度 | 優先級 |
|------|------|--------|--------|
| Hexagon Test | `/css-drawing/hexagon-test` | 低 | P3 |
| SVG Color Change | `/css-drawing/svg-color-change` | 低 | P3 |
| Triangle Anime Test | `/css-drawing/triangle-anime-test` | 低 | P3 |
| Triangle Full Test | `/css-drawing/triangle-full-test` | 低 | P3 |
| Triangle Test | `/css-drawing/triangle-test` | 低 | P3 |

### 3. Directives 子頁面（2個）

| 頁面 | 路徑 | 複雜度 | 優先級 |
|------|------|--------|--------|
| Customize Lazyload Test | `/directives/customize-lazyload-test` | 中 | P2 |
| Customize Ripple Test | `/directives/customize-ripple-test` | 中 | P2 |

### 4. Route 子頁面（3個）

| 頁面 | 路徑 | 複雜度 | 優先級 |
|------|------|--------|--------|
| Params Back Test Index | `/route/params-back-test` | 低 | P3 |
| Params Back Test [testData] | `/route/params-back-test/[testData]` | 低 | P3 |
| Query Back Test | `/route/query-back-test` | 低 | P3 |

### 5. Firebase 子頁面（1個）

| 頁面 | 路徑 | 複雜度 | 優先級 |
|------|------|--------|--------|
| Cloud Messaging | `/firebase/cloud-messaging` | 中 | P1 |

### 6. Face Swap 子頁面（2個）

| 頁面 | 路徑 | 複雜度 | 優先級 |
|------|------|--------|--------|
| Frontend | `/face-swap/frontend` | 高 | P1 |
| Backend | `/face-swap/backend` | 高 | P1 |

### 7. Server-Sent Event 子頁面（4個）

| 頁面 | 路徑 | 複雜度 | 優先級 |
|------|------|--------|--------|
| Global GET | `/server-sent-event-test/global-get` | 中 | P2 |
| Global POST | `/server-sent-event-test/global-post` | 中 | P2 |
| Room GET [uuId] | `/server-sent-event-test/room-get/[uuId]` | 中 | P2 |

### 8. Socket Test 子頁面（預估4-6個）

| 頁面 | 路徑 | 複雜度 | 優先級 |
|------|------|--------|--------|
| Socket.IO 相關 | `/socket-test/*` | 中 | P2 |
| WebSocket 相關 | `/socket-test/*` | 中 | P2 |

### 9. Web RTC 子頁面（預估4-6個）

| 頁面 | 路徑 | 複雜度 | 優先級 |
|------|------|--------|--------|
| WebSocket Room | `/web-rtc/websocket/*` | 高 | P2 |

---

## 優先級說明

| 優先級 | 說明 | 頁面數 |
|--------|------|--------|
| **P1** | 常用/重要功能，需優先處理 | ~10 |
| **P2** | 組件測試頁，可稍後處理 | ~30 |
| **P3** | 展示性頁面，最後處理 | ~12 |

---

## 建議執行順序

### 第一階段：P1 高優先級（約 10 頁面）
1. Face Swap Frontend/Backend（複雜，需特別處理）
2. Firebase Cloud Messaging
3. Components: Dialog, Drawer, Slide In Panel
4. Components: Image Upload, Phone Input, Selector

### 第二階段：P2 中優先級（約 30 頁面）
1. Directives 子頁面
2. Server-Sent Event 子頁面
3. Socket Test 子頁面
4. Web RTC 子頁面
5. Components 其餘頁面

### 第三階段：P3 低優先級（約 12 頁面）
1. CSS Drawing 子頁面
2. Route 子頁面

---

## 預計工作量

| 階段 | 頁面數 | 預計時間 |
|------|--------|----------|
| 第一階段 (P1) | ~10 | 8-12 小時 |
| 第二階段 (P2) | ~30 | 20-30 小時 |
| 第三階段 (P3) | ~12 | 6-10 小時 |
| **總計** | **~52** | **34-52 小時** |

---

## 設計規範

沿用之前的統一設計元素：
- ✅ Hero Section（綠色漸層背景）
- ✅ 簡介區塊
- ✅ Vuetify 組件
- ✅ 動畫效果
- ✅ 響應式設計
- ✅ i18n 支援

---

## 相關文件

- [導航頁面完成報告](./completed/navigation-pages-redesign.md)
- [功能頁面完成報告](./completed/functional-pages-redesign.md)

---

**創建日期**: 2025-12-25  
**維護者**: AI Assistant  
**狀態**: 📋 待開始
