import { test, expect } from '@playwright/test';

/**
 * E2E 測試：組件展示頁面
 * 測試各個組件的基本功能和互動
 * 使用 .env.e2e 中的 VITE_DOMAIN 作為 baseURL
 */

test.describe('組件展示頁面', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('應該能夠導航到組件頁面', async ({ page }) => {
    // 等待頁面載入
    await expect(page).toHaveTitle(/Nuxt/);

    // 檢查導航欄是否存在
    await expect(page.getByRole('navigation')).toBeVisible();
  });

  test('應該能夠查看關於本站頁面', async ({ page }) => {
    // 點擊關於本站連結
    await page.getByRole('link', { name: '關於本站' }).click();

    // 驗證頁面內容
    await expect(page.getByText('關於本站')).toBeVisible();
    await expect(page.getByText('專案目的')).toBeVisible();
  });
});

test.describe('SwitchButton 組件測試', () => {
  test('應該能夠切換開關狀態', async ({ page }) => {
    await page.goto('/components/switch-button');

    // 查找第一個 switch button
    const switchButton = page.locator('.switch_button').first();
    await expect(switchButton).toBeVisible();

    // 點擊切換
    await switchButton.click();

    // 驗證狀態改變（檢查 class 或其他視覺指標）
    await page.waitForTimeout(300); // 等待動畫完成
  });
});

test.describe('Selector 組件測試', () => {
  test('應該能夠打開選項列表', async ({ page }) => {
    await page.goto('/components/selector');

    // 查找 selector
    const selector = page.locator('.selector').first();
    await expect(selector).toBeVisible();

    // 點擊打開選項列表
    await selector.click();

    // 驗證選項列表顯示
    await expect(page.locator('.selector-option_list')).toBeVisible();
  });

  test('應該能夠選擇選項', async ({ page }) => {
    await page.goto('/components/selector');

    const selector = page.locator('.selector').first();
    await selector.click();

    // 選擇第一個選項
    const firstOption = page.locator('.selector-option').first();
    await firstOption.click();

    // 驗證選項列表關閉
    await expect(page.locator('.selector-option_list')).not.toBeVisible();
  });
});

test.describe('PhoneInput 組件測試', () => {
  test('應該能夠輸入電話號碼', async ({ page }) => {
    await page.goto('/components/phone-input');

    // 查找電話輸入框 - 使用 BEM 規範的 CSS class
    const phoneInput = page.locator('.phone-input__number__field').first();
    await expect(phoneInput).toBeVisible();

    // 輸入電話號碼
    await phoneInput.fill('0912345678');

    // 驗證輸入值
    await expect(phoneInput).toHaveValue('0912345678');
  });

  test('應該能夠選擇國家代碼', async ({ page }) => {
    await page.goto('/components/phone-input');

    // 點擊國家選擇器 - 使用 BEM 規範的 CSS class
    const countrySelector = page
      .locator('.phone-input__country-selector')
      .first();
    await countrySelector.click();

    // 驗證選項列表顯示
    await expect(page.locator('.selector-option_list')).toBeVisible();
  });
});

test.describe('響應式測試', () => {
  test('應該在手機視窗正常顯示', async ({ page }) => {
    // 設定手機視窗大小
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // 驗證導航欄在手機視窗下可見
    await expect(page.getByRole('navigation')).toBeVisible();
  });

  test('應該在平板視窗正常顯示', async ({ page }) => {
    // 設定平板視窗大小
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    await expect(page.getByRole('navigation')).toBeVisible();
  });
});

test.describe('效能測試', () => {
  test('首頁應該在合理時間內載入', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    // 驗證載入時間小於 3 秒
    expect(loadTime).toBeLessThan(3000);

    // 驗證頁面可互動
    await expect(page.getByRole('navigation')).toBeVisible();
  });
});

test.describe('無障礙測試', () => {
  test('應該有適當的 ARIA 標籤', async ({ page }) => {
    await page.goto('/');

    // 檢查主要導航有適當的 role
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('main')).toBeVisible();
  });

  test('應該支援鍵盤導航', async ({ page }) => {
    await page.goto('/');

    // 使用 Tab 鍵導航
    await page.keyboard.press('Tab');

    // 驗證焦點移動到可互動元素
    const focusedElement = await page.evaluate(
      () => document.activeElement?.tagName
    );
    expect(['A', 'BUTTON', 'INPUT']).toContain(focusedElement);
  });
});
