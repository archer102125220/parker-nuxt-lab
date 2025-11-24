# 測試套件實作任務清單

## 階段一：環境設定
- [ ] 安裝 Vitest 及相關依賴套件
  - [ ] vitest
  - [ ] @vitejs/plugin-vue
  - [ ] @vue/test-utils
  - [ ] jsdom
  - [ ] @vitest/coverage-v8
  - [ ] happy-dom
- [ ] 建立 vitest.config.ts 設定檔
- [ ] 更新 package.json 新增測試 scripts
- [ ] 建立測試輔助工具目錄結構

## 階段二：工具函數單元測試
- [ ] `shared/helpers/__tests__/amount-format.spec.js`
  - [ ] 基本千分位格式化測試
  - [ ] 小數點處理測試
  - [ ] 自訂分隔符號測試
  - [ ] Safari 降級處理測試
  - [ ] 邊界情況測試
- [ ] `shared/helpers/__tests__/number-unit.spec.js`
  - [ ] 小於 10000 的數字處理
  - [ ] 萬、億、兆等單位轉換
  - [ ] 自訂單位陣列測試
  - [ ] 負數處理測試
  - [ ] 小數點精度測試
- [ ] `shared/helpers/__tests__/safeToJSON.spec.js`
  - [ ] 正常序列化/反序列化測試
  - [ ] 循環引用處理測試
  - [ ] 錯誤處理測試
  - [ ] 特殊值處理測試
- [ ] `shared/third-party/__tests__/check-phone.spec.js`
  - [ ] 有效電話號碼驗證（多國）
  - [ ] 無效電話號碼處理
  - [ ] 國碼驗證測試
  - [ ] 空值處理測試
  - [ ] 格式化字符處理測試
  - [ ] 錯誤訊息正確性測試

## 階段三：Vue 組件單元測試
- [ ] `app/components/__tests__/Selector.spec.js`
  - [ ] 組件渲染測試
  - [ ] 選項列表顯示/隱藏測試
  - [ ] 選項選擇測試
  - [ ] v-model 綁定測試
  - [ ] valueKey 和 displayKey props 測試
  - [ ] 自訂插槽測試
  - [ ] 空列表處理測試
  - [ ] loading 狀態測試
- [ ] `app/components/__tests__/PhoneInput.spec.js`
  - [ ] 組件渲染測試
  - [ ] 國家選擇器互動測試
  - [ ] 電話號碼輸入測試
  - [ ] v-model 雙向綁定測試
  - [ ] 驗證功能測試
  - [ ] 即時驗證測試
  - [ ] 錯誤訊息顯示測試
  - [ ] returnObject 模式測試
  - [ ] 事件發送測試
- [ ] `app/components/__tests__/Dialog.spec.js`
  - [ ] 對話框開啟/關閉測試
  - [ ] 插槽內容渲染測試
  - [ ] 遮罩點擊關閉測試
  - [ ] ESC 鍵關閉測試
  - [ ] 動畫效果測試
- [ ] `app/components/__tests__/Drawer.spec.js`
  - [ ] 抽屜開啟/關閉測試
  - [ ] 方向設定測試
  - [ ] 插槽內容渲染測試
  - [ ] 遮罩點擊關閉測試
- [ ] `app/components/__tests__/SwitchButton.spec.js`
  - [ ] 開關切換測試
  - [ ] v-model 綁定測試
  - [ ] disabled 狀態測試
  - [ ] 自訂樣式測試

## 階段四：整合測試
- [ ] `tests/integration/phone-validation.spec.js`
  - [ ] 完整電話號碼驗證流程
  - [ ] 不同國家電話號碼驗證
  - [ ] 錯誤訊息顯示測試
  - [ ] 表單提交整合測試
- [ ] `tests/integration/api/oauth.spec.js`
  - [ ] Google OAuth 驗證測試
  - [ ] Facebook OAuth 驗證測試
  - [ ] Line OAuth 驗證測試
  - [ ] 錯誤處理測試

## 階段五：E2E 測試（Playwright）
- [ ] `tests/phone-input-demo.spec.ts`
  - [ ] 訪問 demo 頁面測試
  - [ ] 選擇不同國家測試
  - [ ] 輸入電話號碼測試
  - [ ] 驗證錯誤訊息顯示測試
  - [ ] 驗證成功狀態測試
- [ ] `tests/components-navigation.spec.ts`
  - [ ] 組件列表頁面測試
  - [ ] 各組件 demo 頁面訪問測試
  - [ ] 頁面渲染正確性測試
- [ ] `tests/form-submission.spec.ts`
  - [ ] 表單填寫測試
  - [ ] 驗證觸發測試
  - [ ] 提交處理測試
  - [ ] 錯誤處理測試

## 階段六：測試工具和輔助檔案
- [ ] `tests/utils/test-helpers.js`
  - [ ] Vue 組件掛載輔助函數
  - [ ] Mock 資料生成器
  - [ ] 常用測試斷言輔助函數
- [ ] `tests/mocks/phone-country-code.js`
  - [ ] 簡化的國家代碼資料
  - [ ] 測試用電話號碼範例

## 驗證階段
- [ ] 執行所有單元測試並確認通過
- [ ] 執行所有整合測試並確認通過
- [ ] 執行所有 E2E 測試並確認通過
- [ ] 檢查測試覆蓋率報告
  - [ ] 工具函數覆蓋率 > 90%
  - [ ] 組件覆蓋率 > 80%
- [ ] 檢查測試執行速度
  - [ ] 單元測試 < 10 秒
  - [ ] 整合測試 < 30 秒
- [ ] 產生最終測試報告

## 文件整理
- [ ] 更新 README.md 加入測試說明
- [ ] 建立測試最佳實踐文件
- [ ] 建立 CI/CD 整合指南
