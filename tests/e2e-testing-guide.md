# E2E 測試文件

## 📋 測試概覽

本專案使用 [Playwright](https://playwright.dev/) 進行端對端（E2E）測試。

### 測試文件結構
```
tests/
├── example.spec.ts           # 基本範例測試
├── components.spec.ts        # 組件互動測試
├── user-flows.spec.ts        # 使用者流程測試
├── home-page.spec.ts         # 首頁測試
├── index-page.spec.ts        # 索引頁測試
├── unit/                     # 單元測試（Vitest）
└── integration/              # 整合測試（Vitest）
```

## 🚀 執行測試

### 前置條件
1. 確保開發伺服器正在運行：
```bash
yarn dev
# 或
npm run dev
```

### 執行所有 E2E 測試
```bash
yarn test:e2e
# 或
npx playwright test
```

### 執行特定測試文件
```bash
npx playwright test components.spec.ts
npx playwright test user-flows.spec.ts
```

### 執行特定瀏覽器
```bash
# 只在 Chromium 執行
npx playwright test --project=chromium

# 只在 Firefox 執行
npx playwright test --project=firefox

# 只在 WebKit (Safari) 執行
npx playwright test --project=webkit
```

### UI 模式（推薦用於開發）
```bash
npx playwright test --ui
```

### Debug 模式
```bash
npx playwright test --debug
```

### 查看測試報告
```bash
npx playwright show-report
```

## 📝 測試文件說明

### 1. example.spec.ts
**基本範例測試**
- 展示 Playwright 基本用法
- 包含截圖、等待、輸入等功能示範
- 適合新手學習

### 2. components.spec.ts
**組件互動測試**（9 個測試套件）
- ✅ 組件展示頁面導航
- ✅ SwitchButton 組件互動
- ✅ Selector 組件互動
- ✅ PhoneInput 組件互動
- ✅ 響應式設計測試
- ✅ 效能測試
- ✅ 無障礙測試

### 3. user-flows.spec.ts
**使用者流程測試**（7 個測試套件）
- ✅ 完整使用者流程
- ✅ 表單互動流程
- ✅ 錯誤處理流程
- ✅ 多頁面導航流程
- ✅ 效能關鍵流程
- ✅ 跨瀏覽器相容性

### 4. home-page.spec.ts
**首頁測試**
- 首頁連結導航
- 關於本站頁面驗證

### 5. index-page.spec.ts
**索引頁測試**
- 導航欄內容驗證

## 🎯 測試覆蓋範圍

### 功能測試
- [x] 頁面導航
- [x] 組件互動
- [x] 表單輸入
- [x] 選擇器操作
- [x] 開關切換

### 非功能測試
- [x] 響應式設計（手機、平板）
- [x] 效能測試（載入時間）
- [x] 無障礙測試（ARIA、鍵盤導航）
- [x] 跨瀏覽器相容性

### 錯誤處理
- [x] 404 頁面
- [x] 網路錯誤
- [x] 快速連續互動

## 🔧 配置說明

### playwright.config.ts
```typescript
{
  testDir: './tests',
  testMatch: /.*\.spec\.ts$/,
  testIgnore: ['**/unit/**', '**/integration/**'],
  
  // 瀏覽器配置
  projects: [
    { name: 'chromium' },
    { name: 'firefox' },
    { name: 'webkit' },
    { name: 'Mobile Chrome' },
    { name: 'Mobile Safari' }
  ]
}
```

## 💡 最佳實踐

### 1. 使用有意義的測試描述
```typescript
test('應該能夠輸入電話號碼', async ({ page }) => {
  // 清楚描述測試目的
});
```

### 2. 等待元素載入
```typescript
// ✅ 好的做法
await page.waitForSelector('.selector');
await expect(page.locator('.selector')).toBeVisible();

// ❌ 避免使用固定延遲
await page.waitForTimeout(1000); // 只在必要時使用
```

### 3. 使用語義化選擇器
```typescript
// ✅ 優先使用 role
await page.getByRole('button', { name: '提交' });

// ✅ 使用 label
await page.getByLabel('電話號碼');

// ⚠️ 避免過度依賴 class
await page.locator('.some-class'); // 只在必要時使用
```

### 4. 獨立的測試
```typescript
// 每個測試應該獨立運行
test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3001/');
});
```

## 🐛 常見問題

### Q: 測試失敗：timeout exceeded
**A:** 增加 timeout 或檢查元素選擇器是否正確
```typescript
await page.waitForSelector('.element', { timeout: 10000 });
```

### Q: 找不到元素
**A:** 使用 Playwright Inspector 檢查元素
```bash
npx playwright test --debug
```

### Q: 測試在 CI 環境失敗
**A:** 確保使用 headless 模式並增加重試次數
```typescript
// playwright.config.ts
{
  retries: process.env.CI ? 2 : 0,
}
```

## 📊 測試報告

執行測試後會生成 HTML 報告：
```bash
npx playwright show-report
```

報告包含：
- 測試結果統計
- 失敗測試的截圖
- 測試執行時間
- 瀏覽器相容性矩陣

## 🔗 相關資源

- [Playwright 官方文件](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Vitest 單元測試](../docs/testing/README.md)

## 📈 持續改進

### 待增強項目
- [ ] 增加視覺回歸測試
- [ ] 增加 API 測試
- [ ] 增加效能基準測試
- [ ] 整合 CI/CD 流程
- [ ] 增加測試覆蓋率報告
