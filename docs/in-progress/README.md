# 進行中的計劃與任務

本目錄包含正在進行中的專案計劃和任務文檔。

## 📋 文檔列表

### Banner 輪播組件開發專案 🆕

**狀態：** 規劃階段  
**開始時間：** 2025-12-02  
**當前進度：** 已完成需求分析和計劃文檔

#### 相關文檔

1. **[banner-carousel-plan.md](./banner-carousel-plan.md)**
   - **類型：** 實施計劃
   - **內容：** Banner 輪播組件的完整實作計劃
   - **包含：**
     - 需求分析（根據圖片規格）
     - 技術規格（Vue 3 + 純 JS）
     - 組件設計（Props/Emits/Slots）
     - 實施步驟（四個階段）
     - 驗證計劃

2. **[banner-carousel-task.md](./banner-carousel-task.md)**
   - **類型：** 任務清單
   - **內容：** 詳細的開發任務清單
   - **包含：**
     - 5 個開發階段（71 個子任務）
     - 進度追蹤統計
     - 下一步行動計劃
     - 技術和品質要求

#### 當前狀態

**已完成：**

- ✅ 需求規格分析
- ✅ 現有組件研究
- ✅ 實施計劃文檔
- ✅ 任務清單文檔

**待完成：**

- ⏳ 核心組件開發（15 個任務）
- ⏳ 樣式與動畫（15 個任務）
- ⏳ 功能增強（16 個任務）
- ⏳ 測試與文檔（21 個任務）

#### 核心需求

根據圖片規格：

- 容器總是高度固定
- 隨 Device 寬度變化（不變形）
- 1 張：顯示第一張
- 2 張：顯示第一張，啟用自動播放
- 3 張以上：顯示第一張，左右各有 Banner
- 2 張以上時需有自動滑動效果與可動滑動功能

---

### AI 人臉替換後端優化專案 🚀

**狀態：** 規劃完成，準備實作  
**開始時間：** 2025-12-12  
**當前進度：** Phase 1-3 已完成基礎實作，Phase 4 深度優化規劃完成

#### 相關文檔

1. **[face-swap-implementation-plan.md](./face-swap-implementation-plan.md)**
   - **類型：** 實施計劃
   - **內容：** AI 人臉替換功能的完整實作計劃
   - **包含：**
     - Phase 1-3：基礎實作（已完成）
     - Phase 4：InsightFace InSwapper 深度優化（進行中）
     - 技術架構（ONNX Runtime + InsightFace）
     - 模型規格與下載指南
     - 驗證計劃與預期效果

2. **[face-swap-task-checklist.md](./face-swap-task-checklist.md)**
   - **類型：** 任務清單
   - **內容：** 詳細的開發任務清單
   - **包含：**
     - 4 個開發階段（環境準備、核心實作、後處理、整合測試）
     - 進度追蹤
     - 當前狀態與下一步行動

#### 當前狀態

**已完成：**

- ✅ Phase 1-3：基礎 face-api.js 實作
- ✅ 前端與後端版本
- ✅ API 端點與圖片處理
- ✅ 深度優化方案研究與規劃

**待完成：**

- ⏳ 安裝 ONNX Runtime 依賴
- ⏳ 下載 InsightFace 模型（~750MB）
- ⏳ 實作 InSwapper 換臉邏輯
- ⏳ 後處理優化與測試

#### 核心技術

**當前實作（v1）：**

- face-api.js + TensorFlow.js
- 簡單圖像處理與混合
- 基礎換臉效果

**優化方案（v2）：**

- InsightFace InSwapper ONNX 模型
- 專業級深度學習換臉
- 表情保留、光照匹配、無縫融合
- 模型：buffalo_l（人臉分析）+ inswapper_128（換臉）

#### 預期效果

- ✅ 邊緣完全融合，無接縫
- ✅ 色調自動匹配
- ✅ 完美保留目標表情
- ✅ 光照自然一致
- ✅ 專業級換臉品質

---

### CSS 命名規範審查與修正專案 🔄

**狀態：** 進行中  
**開始時間：** 2025-12-03  
**當前進度：** 階段 1 完成 50%，準備執行階段 2

#### 相關文檔

1. **[css-naming-audit-plan.md](./css-naming-audit-plan.md)**
   - **類型：** 實施計劃
   - **內容：** CSS 命名規範審查與修正的完整計劃
   - **包含：** 命名規範要點、5 個執行階段、詳細檢查項目、驗收標準

2. **[css-naming-progress.md](./css-naming-progress.md)**
   - **類型：** 進度追蹤
   - **內容：** 實時更新的進度追蹤文檔
   - **包含：** 總體進度表、各階段詳細狀態、修正統計、問題記錄

3. **[css-naming-quick-reference.md](./css-naming-quick-reference.md)**
   - **類型：** 快速參考
   - **內容：** CSS 命名規範快速查閱指南

#### 當前狀態

**已完成：**

- ✅ 建立計劃文檔和進度追蹤
- ✅ 建立檢查腳本 (scripts/check-css-naming.js)
- ✅ 更新 README 文檔

**待完成：**

- ⏳ 執行全專案掃描（階段 2）
- ⏳ 核心組件修正（階段 3-5）

#### 核心規範

**改良式 BEM 命名法：**

- Block: 使用底線 `_` 分隔（如 `drawer_root`）
- Element: 使用連字符 `-` 連接（如 `drawer_root-wrapping`）
- 狀態: 使用 HTML 屬性，必須以 `css-` 開頭（如 `[css-is-show='true']`）

---

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

- **進行中專案數：** 4 個
- **總檔案數：** 10 個文檔
- **當前測試數：** 270+ tests
- **當前覆蓋率：** 67.73%
- **目標覆蓋率：** 85-90%
- **最後更新：** 2025-12-12

---

## 🎯 下一步行動

### Banner 輪播組件開發

1. **立即執行**
   - 建立 Banner.vue 組件檔案
   - 定義基本的 props 和 emits
   - 建立基本模板結構

2. **短期目標**
   - 完成核心組件開發（預計 2-3 小時）
   - 實作基本的輪播功能和響應式邏輯

3. **中長期目標**
   - 完成樣式和互動功能（預計 3-5 小時）
   - 完成測試和文檔撰寫（預計 1-2 小時）

### 測試覆蓋率提升

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

### Face Swap Backend Optimization

1. **立即執行**
   - 安裝 `onnxruntime-node` 和 `sharp`
   - 下載 InsightFace 模型檔案
   - 建立模型目錄結構

2. **短期目標**
   - 實作 face-swap-insightface.js 核心功能
   - 整合 ONNX Runtime 推理
   - 測試基本換臉功能

3. **中長期目標**
   - 後處理優化（色彩校正、邊緣羽化）
   - 性能優化與測試
   - 比較優化前後效果

---

## 🔗 相關連結

- [已完成的計劃](../completed/README.md)
- [返回文檔首頁](../README.md)
