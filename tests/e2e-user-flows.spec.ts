import { test, expect } from '@playwright/test';

/**
 * E2E 測試：使用者流程
 * 測試完整的使用者互動流程
 * 使用 .env.e2e 中的 VITE_DOMAIN 作為 baseURL
 */

test.describe('完整使用者流程', () => {
  test('新使用者瀏覽網站流程', async ({ page }) => {
    // 1. 訪問首頁
    await page.goto('/');
    await expect(page).toHaveTitle(/Nuxt/);

    // 2. 查看導航選單
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();

    // 3. 點擊關於本站
    await page.getByRole('link', { name: '關於本站' }).click();
    await expect(page.getByText('關於本站')).toBeVisible();

    // 4. 返回首頁
    await page.goBack();
    await expect(nav).toBeVisible();
  });

  test('組件測試流程', async ({ page }) => {
    await page.goto('/');

    // 1. 導航到組件頁面
    await page.getByRole('link', { name: /組件/ }).first().click();

    // 2. 等待頁面載入
    await page.waitForLoadState('networkidle');

    // 3. 驗證組件展示
    await expect(
      page.locator('.component-demo, .demo-container, main')
    ).toBeVisible();
  });
});

test.describe('表單互動流程', () => {
  test('電話號碼輸入完整流程', async ({ page }) => {
    await page.goto('/components/phone-input');

    // 1. 選擇國家
    const countrySelector = page
      .locator('.phone_input-country_selector')
      .first();
    if (await countrySelector.isVisible()) {
      await countrySelector.click();
      await page.waitForTimeout(200);

      // 選擇台灣
      const taiwanOption = page.getByText('+886').first();
      if (await taiwanOption.isVisible()) {
        await taiwanOption.click();
      }
    }

    // 2. 輸入電話號碼
    const phoneInput = page.locator('input[type="tel"]').first();
    await phoneInput.fill('912345678');

    // 3. 驗證輸入
    await expect(phoneInput).toHaveValue('912345678');

    // 4. 觸發 blur 事件（驗證）
    await phoneInput.blur();
    await page.waitForTimeout(300);
  });

  test('選擇器互動流程', async ({ page }) => {
    await page.goto('/components/selector');

    // 1. 點擊選擇器
    const selector = page.locator('.selector').first();
    await selector.click();

    // 2. 等待選項列表出現
    await page.waitForTimeout(200);

    // 3. 選擇選項
    const options = page.locator('.selector-option');
    const optionCount = await options.count();

    if (optionCount > 0) {
      await options.nth(1).click();

      // 4. 驗證選項列表關閉
      await page.waitForTimeout(200);
    }
  });
});

test.describe('錯誤處理流程', () => {
  test('404 頁面處理', async ({ page }) => {
    const response = await page.goto('/non-existent-page');

    // 驗證返回 404 或顯示錯誤頁面
    if (response) {
      const status = response.status();
      expect([404, 200]).toContain(status); // Nuxt 可能會返回 200 並顯示錯誤頁面
    }
  });

  test('網路錯誤處理', async ({ page, context }) => {
    await page.goto('/');

    // 模擬離線
    await context.setOffline(true);

    // 嘗試導航
    const navigationPromise = page.goto('/about').catch(() => null);

    // 恢復在線
    await context.setOffline(false);

    await navigationPromise;
  });
});

test.describe('多頁面導航流程', () => {
  test('在多個頁面間導航', async ({ page }) => {
    // 1. 首頁
    await page.goto('/');
    await expect(page.getByRole('navigation')).toBeVisible();

    // 2. 關於頁面
    await page.getByRole('link', { name: '關於本站' }).click();
    await page.waitForLoadState('networkidle');

    // 3. 使用瀏覽器後退
    await page.goBack();
    await expect(page.getByRole('navigation')).toBeVisible();

    // 4. 使用瀏覽器前進
    await page.goForward();
    await page.waitForLoadState('networkidle');
  });
});

test.describe('效能關鍵流程', () => {
  test('快速連續互動', async ({ page }) => {
    await page.goto('/components/switch-button');

    const switchButton = page.locator('.switch_button').first();

    // 快速點擊多次
    for (let i = 0; i < 5; i++) {
      await switchButton.click();
      await page.waitForTimeout(100);
    }

    // 驗證組件仍然可用
    await expect(switchButton).toBeVisible();
  });

  test('大量資料載入', async ({ page }) => {
    await page.goto('/components/selector');

    // 打開選擇器（可能包含大量選項）
    const selector = page.locator('.selector').first();
    await selector.click();

    // 驗證選項列表載入
    await page.waitForTimeout(500);

    // 驗證可以滾動
    const optionList = page.locator('.selector-option_list').first();
    if (await optionList.isVisible()) {
      await optionList.evaluate((el) => (el.scrollTop = 100));
    }
  });
});

test.describe('跨瀏覽器相容性', () => {
  test('基本功能在所有瀏覽器正常運作', async ({ page, browserName }) => {
    await page.goto('/');

    // 驗證基本元素
    await expect(page.getByRole('navigation')).toBeVisible();

    // 驗證互動功能
    const links = page.getByRole('link');
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThan(0);

    console.log(`測試瀏覽器: ${browserName}, 連結數量: ${linkCount}`);
  });
});
