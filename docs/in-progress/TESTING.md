# 測試文件說明

本文件說明專案的測試套件使用方式。

> [!TIP]
> 新增測試前，請先閱讀 [前端測試設計指南](../agent-rules/frontend-testing-guide.md)，
> 了解什麼值得測試、如何寫有意義的測試。

## 測試統計

**當前狀態：**
- 總測試數：270+ 個
- 通過率：94.4% (255/270)
- 測試框架：Vitest (單元測試/整合測試) + Playwright (E2E 測試)

**測試分布：**
- 單元測試：191 tests
- 整合測試：12 tests
- E2E 測試：9 test files

## 測試類型

### 單元測試
測試獨立的函數和組件：
- **純函數測試** - 最適合單元測試（工具函數、驗證邏輯）
- **行為測試** - 測試可觀察的行為，不測試 props 存在
- 參考範本：`LoadingBar.spec.js`, `SkeletonLoader.spec.js`


### 整合測試
測試組件間的互動：
- API 整合測試
- 組件整合測試
- 驗證流程測試

### E2E 測試
測試完整的使用者流程：
- 頁面導航測試
- 表單互動測試
- 組件功能測試

## 執行測試

```bash
# 執行所有單元測試
yarn test:unit

# 監聽模式（開發時使用）
yarn test:unit:watch

# 產生覆蓋率報告
yarn test:unit:coverage

# 執行整合測試
yarn test:integration

# 執行 E2E 測試
yarn test:e2e

# 執行所有測試
yarn test:all
```

## 查看覆蓋率報告

```bash
# 產生並開啟覆蓋率報告
yarn test:unit:coverage
open coverage/index.html
```

## 測試文件位置

```
tests/
├── unit/              # 單元測試
│   ├── app/          # 應用層測試
│   └── shared/       # 共享工具測試
├── integration/       # 整合測試
├── e2e-*.spec.js     # E2E 測試
└── setup.js          # 測試環境設定
```

## 撰寫測試

### 單元測試範例

```javascript
import { describe, it, expect } from 'vitest';
import { myFunction } from './myFunction';

describe('myFunction', () => {
  it('should return expected result', () => {
    expect(myFunction('input')).toBe('expected');
  });
});
```

### Vue 組件測試範例

```javascript
import { mount } from '@vue/test-utils';
import MyComponent from './MyComponent.vue';

describe('MyComponent', () => {
  it('should render correctly', () => {
    const wrapper = mount(MyComponent);
    expect(wrapper.find('.my-class').exists()).toBe(true);
  });
});
```

### E2E 測試範例

```javascript
import { test, expect } from '@playwright/test';

test('should navigate to page', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Expected Title/);
});
```

## 測試最佳實踐

1. **測試應該獨立** - 每個測試不應依賴其他測試
2. **清晰的描述** - 測試名稱應清楚說明測試內容
3. **適當的斷言** - 使用最合適的斷言方法
4. **測試邊界情況** - 不只測試正常情況，也要測試邊界和錯誤情況
5. **保持簡單** - 一個測試只測試一件事

## CI/CD 整合

測試可以整合到 CI/CD 流程中：

```yaml
# GitHub Actions 範例
- name: Run tests
  run: |
    yarn test:unit
    yarn test:integration
```
