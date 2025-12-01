# 進行中的計劃與任務

本目錄包含正在進行中的專案計劃和任務文檔。

## 📋 文檔列表

### 測試覆蓋率提升專案 🔄

**狀態：** 部分完成（進行中）  
**開始時間：** 2025-11-25  
**當前進度：** 核心測試已完成，擴展測試待實作

#### 相關文檔

1. **[TESTING.md](./TESTING.md)**
   - **類型：** 測試說明文檔
   - **內容：** 專案測試套件使用方式和統計資訊
   - **包含：**
     - 測試統計（270+ 個測試，94.4% 通過率）
     - 測試類型說明（單元/整合/E2E）
     - 執行測試的指令
     - 測試撰寫範例

2. **[TEST_IMPLEMENTATION_PLAN.md](./TEST_IMPLEMENTATION_PLAN.md)**
   - **類型：** 實施計劃
   - **內容：** 測試覆蓋率提升的實作計劃
   - **包含：**
     - 當前測試狀態分析
     - 未測試項目清單（27 個組件、16 個 composables）
     - 優先級建議（三個階段）
     - 預期成果（目標 85-90% 覆蓋率）

3. **[TEST_TASK_CHECKLIST.md](./TEST_TASK_CHECKLIST.md)**
   - **類型：** 任務清單
   - **內容：** E2E 測試擴展的詳細任務清單
   - **包含：**
     - 已完成的 E2E 測試（9 個測試文件）
     - 待完成測試項目（按優先級分類）
     - 測試策略和實作建議
     - 預期成果

#### 當前狀態

**已完成：**
- ✅ 單元測試：191 tests
- ✅ 整合測試：12 tests
- ✅ E2E 測試：9 test files
- ✅ 測試覆蓋率：67.73%
- ✅ 通過率：94.4% (255/270)

**待完成：**
- ⏳ 27 個未測試組件
- ⏳ 16 個未測試 composables
- ⏳ 14+ 個新的 E2E 測試文件
- 🎯 目標覆蓋率：85-90%

#### 優先級規劃

**第一優先級（核心功能）：**
- LoadingBar.vue
- useAsyncDataError.js
- useUserCookie.js
- shared/request/index.js
- DatePicker.vue

**第二優先級（常用組件）：**
- Countdown.vue
- ScrollFetch.vue
- QRcode.vue
- SwiperCustom.vue / SwiperJs.vue
- useDayjs.js

**第三優先級（特殊功能）：**
- useWebRTC.js
- useWebSocket.js
- useGoogle.js / useFacebook.js
- WangEditor 相關

---

## 📊 統計資訊

- **進行中專案數：** 1 個
- **總檔案數：** 3 個文檔
- **當前測試數：** 270+ tests
- **當前覆蓋率：** 67.73%
- **目標覆蓋率：** 85-90%
- **最後更新：** 2025-11-25

---

## 🎯 下一步行動

1. **優先測試核心功能**
   - LoadingBar.vue 測試
   - useAsyncDataError.js 測試
   - useUserCookie.js 測試

2. **逐步增加組件測試**
   - 常用組件測試
   - 特殊功能測試

3. **擴展 E2E 測試**
   - Dialog 和 Drawer 組件互動
   - 富文本編輯器流程
   - WebSocket 即時通訊

---

## 🔗 相關連結

- [已完成的計劃](../completed/README.md)
- [返回文檔首頁](../README.md)
