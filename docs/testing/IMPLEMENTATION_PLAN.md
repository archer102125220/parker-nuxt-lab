# 測試套件實作計畫

為 Nuxt Lab 專案建立完整的測試覆蓋，包含單元測試、整合測試和端對端測試。

## User Review Required

> [!IMPORTANT]
> 此計畫將新增 Vitest 作為單元測試框架，並建立大量測試檔案。請確認：
> 1. 是否同意新增 Vitest 及相關測試依賴套件
> 2. 測試檔案的組織結構是否符合您的需求
> 3. 是否有特定的組件或功能需要優先測試

## Proposed Changes

### 測試框架設定

#### [NEW] [vitest.config.ts](file:///Users/parker/Desktop/code/parker-nuxt-lab/vitest.config.ts)

建立 Vitest 設定檔，配置：
- Vue 3 支援（使用 @vitejs/plugin-vue）
- 路徑別名對應（與 nuxt.config.js 一致）
- 測試環境設定（jsdom for component tests, node for utility tests）
- 覆蓋率報告設定
- Mock 設定

#### [MODIFY] [package.json](file:///Users/parker/Desktop/code/parker-nuxt-lab/package.json)

新增測試相關的 scripts 和 devDependencies：
- Scripts:
  - `test:unit` - 執行單元測試
  - `test:unit:watch` - 監聽模式執行單元測試
  - `test:unit:coverage` - 執行測試並產生覆蓋率報告
  - `test:integration` - 執行整合測試
  - `test:all` - 執行所有測試（unit + integration + e2e）
- DevDependencies:
  - `vitest`
  - `@vitejs/plugin-vue`
  - `@vue/test-utils`
  - `jsdom`
  - `@vitest/coverage-v8`
  - `happy-dom`

---

### 單元測試 - 工具函數

#### [NEW] [shared/helpers/__tests__/amount-format.spec.js](file:///Users/parker/Desktop/code/parker-nuxt-lab/shared/helpers/__tests__/amount-format.spec.js)

測試 `amountFormat` 函數：
- 基本千分位格式化
- 小數點處理
- 自訂分隔符號
- Safari 降級處理
- 邊界情況（null, undefined, 非數字）

#### [NEW] [shared/helpers/__tests__/number-unit.spec.js](file:///Users/parker/Desktop/code/parker-nuxt-lab/shared/helpers/__tests__/number-unit.spec.js)

測試 `numberUnit` 函數：
- 小於 10000 的數字處理
- 萬、億、兆等單位轉換
- 自訂單位陣列
- 負數處理
- 小數點精度

#### [NEW] [shared/helpers/__tests__/safeToJSON.spec.js](file:///Users/parker/Desktop/code/parker-nuxt-lab/shared/helpers/__tests__/safeToJSON.spec.js)

測試 `safeToJSON` 和 `safeParseJSON` 函數：
- 正常的 JSON 序列化/反序列化
- 循環引用處理
- 錯誤處理
- 特殊值處理（undefined, Symbol, Function）

#### [NEW] [shared/third-party/__tests__/check-phone.spec.js](file:///Users/parker/Desktop/code/parker-nuxt-lab/shared/third-party/__tests__/check-phone.spec.js)

測試 `checkPhone` 和 `checkTelephone` 函數：
- 有效電話號碼驗證（台灣、美國、日本等）
- 無效電話號碼處理
- 國碼驗證
- 空值處理
- 格式化字符處理（空格、括號、破折號）
- 錯誤訊息正確性

---

### 單元測試 - Vue 組件

#### [NEW] [app/components/__tests__/PhoneInput.spec.js](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/__tests__/PhoneInput.spec.js)

測試 `PhoneInput.vue` 組件：
- 組件渲染
- 國家選擇器互動
- 電話號碼輸入
- v-model 雙向綁定
- 驗證功能（validate prop）
- 即時驗證（validateOnInput prop）
- 錯誤訊息顯示
- returnObject 模式
- 事件發送（change, blur, focus, validate）

#### [NEW] [app/components/__tests__/Selector.spec.js](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/__tests__/Selector.spec.js)

測試 `Selector.vue` 組件：
- 組件渲染
- 選項列表顯示/隱藏
- 選項選擇
- v-model 綁定
- valueKey 和 displayKey props
- 自訂插槽（prefix, suffix, default）
- 空列表處理
- loading 狀態

#### [NEW] [app/components/__tests__/Dialog.spec.js](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/__tests__/Dialog.spec.js)

測試 `Dialog.vue` 組件：
- 對話框開啟/關閉
- 插槽內容渲染
- 遮罩點擊關閉
- ESC 鍵關閉
- 動畫效果

#### [NEW] [app/components/__tests__/Drawer.spec.js](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/__tests__/Drawer.spec.js)

測試 `Drawer.vue` 組件：
- 抽屜開啟/關閉
- 方向設定（left, right, top, bottom）
- 插槽內容渲染
- 遮罩點擊關閉

#### [NEW] [app/components/__tests__/SwitchButton.spec.js](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/__tests__/SwitchButton.spec.js)

測試 `SwitchButton.vue` 組件：
- 開關切換
- v-model 綁定
- disabled 狀態
- 自訂樣式

---

### 整合測試

#### [NEW] [tests/integration/phone-validation.spec.js](file:///Users/parker/Desktop/code/parker-nuxt-lab/tests/integration/phone-validation.spec.js)

測試 PhoneInput 組件與 check-phone 工具的整合：
- 完整的電話號碼驗證流程
- 不同國家的電話號碼驗證
- 錯誤訊息顯示
- 表單提交整合

#### [NEW] [tests/integration/api/oauth.spec.js](file:///Users/parker/Desktop/code/parker-nuxt-lab/tests/integration/api/oauth.spec.js)

測試 OAuth API 端點：
- Google OAuth 驗證
- Facebook OAuth 驗證
- Line OAuth 驗證
- 錯誤處理

---

### E2E 測試增強

#### [MODIFY] [tests/phone-input-demo.spec.ts](file:///Users/parker/Desktop/code/parker-nuxt-lab/tests/phone-input-demo.spec.ts)

新增 PhoneInput 組件的完整 E2E 測試：
- 訪問 demo 頁面
- 選擇不同國家
- 輸入電話號碼
- 驗證錯誤訊息顯示
- 驗證成功狀態

#### [NEW] [tests/components-navigation.spec.ts](file:///Users/parker/Desktop/code/parker-nuxt-lab/tests/components-navigation.spec.ts)

測試組件頁面導航：
- 組件列表頁面
- 各組件 demo 頁面訪問
- 頁面渲染正確性

#### [NEW] [tests/form-submission.spec.ts](file:///Users/parker/Desktop/code/parker-nuxt-lab/tests/form-submission.spec.ts)

測試表單提交流程：
- 表單填寫
- 驗證觸發
- 提交處理
- 錯誤處理

---

### 測試工具和輔助檔案

#### [NEW] [tests/utils/test-helpers.js](file:///Users/parker/Desktop/code/parker-nuxt-lab/tests/utils/test-helpers.js)

建立測試輔助函數：
- Vue 組件掛載輔助函數
- Mock 資料生成器
- 常用的測試斷言輔助函數

#### [NEW] [tests/mocks/phone-country-code.js](file:///Users/parker/Desktop/code/parker-nuxt-lab/tests/mocks/phone-country-code.js)

建立測試用的 mock 資料：
- 簡化的國家代碼資料
- 測試用的電話號碼範例

## Verification Plan

### Automated Tests

#### 單元測試
```bash
# 執行所有單元測試
yarn test:unit

# 執行單元測試並產生覆蓋率報告
yarn test:unit:coverage

# 監聽模式執行單元測試
yarn test:unit:watch
```

預期結果：
- 所有單元測試通過
- 工具函數測試覆蓋率 > 90%
- 組件測試覆蓋率 > 80%

#### 整合測試
```bash
# 執行整合測試
yarn test:integration
```

預期結果：
- 所有整合測試通過
- API 端點正確回應
- 組件間互動正常

#### E2E 測試
```bash
# 先建置並啟動測試伺服器
yarn pretest

# 執行 E2E 測試
yarn test:e2e
```

預期結果：
- 所有 E2E 測試通過
- 頁面導航正常
- 使用者互動流程正確

#### 執行所有測試
```bash
# 執行所有測試（單元 + 整合 + E2E）
yarn test:all
```

### Manual Verification

1. **檢查測試覆蓋率報告**
   - 執行 `yarn test:unit:coverage`
   - 開啟 `coverage/index.html` 查看詳細覆蓋率報告
   - 確認關鍵功能的測試覆蓋率達標

2. **檢查測試執行速度**
   - 單元測試應在 10 秒內完成
   - 整合測試應在 30 秒內完成
   - E2E 測試可能需要 1-2 分鐘

3. **檢查測試報告**
   - 查看 Playwright HTML 報告（執行 E2E 測試後自動開啟）
   - 確認所有測試案例都有清楚的描述
   - 檢查失敗測試的截圖和追蹤資訊
