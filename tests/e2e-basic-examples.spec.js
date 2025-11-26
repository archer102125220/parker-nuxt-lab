import { test, expect } from '@playwright/test';

/**
 * E2E 測試範例
 * 展示基本的 Playwright 測試寫法
 * 使用 .env.e2e 中的 VITE_DOMAIN 作為 baseURL
 */

test.describe('基本範例測試', () => {
  test('應該能夠訪問首頁', async ({ page }) => {
    await page.goto('/');

    // 驗證頁面標題
    await expect(page).toHaveTitle(/Nuxt/);

    // 驗證導航欄存在
    await expect(page.getByRole('navigation')).toBeVisible();
  });

  test('應該能夠點擊連結', async ({ page }) => {
    await page.goto('/');

    // 查找並點擊第一個連結
    const firstLink = page.getByRole('link').first();
    await expect(firstLink).toBeVisible();

    await firstLink.click();

    // 等待導航完成
    await page.waitForLoadState('networkidle');
  });
});

test.describe('Playwright 功能展示', () => {
  test('截圖功能', async ({ page }) => {
    await page.goto('/');

    // 截取整個頁面
    await page.screenshot({ path: 'screenshots/homepage.png', fullPage: true });

    // 截取特定元素
    const nav = page.getByRole('navigation');
    await nav.screenshot({ path: 'screenshots/navigation.png' });
  });

  test('等待元素出現', async ({ page }) => {
    await page.goto('/');

    // 等待特定元素出現
    await page.waitForSelector('nav', { timeout: 5000 });

    // 驗證元素可見
    await expect(page.locator('nav')).toBeVisible();
  });

  test('模擬使用者輸入', async ({ page }) => {
    await page.goto('/components/phone-input');

    // 查找輸入框
    const input = page.locator('input[type="tel"]').first();

    if (await input.isVisible()) {
      // 模擬打字
      await input.type('0912345678', { delay: 100 });

      // 驗證輸入值
      await expect(input).toHaveValue('0912345678');
    }
  });

  test('檢查元素屬性', async ({ page }) => {
    await page.goto('/');

    const nav = page.getByRole('navigation');

    // 檢查元素是否可見
    await expect(nav).toBeVisible();

    // 檢查元素是否啟用
    await expect(nav).toBeEnabled();

    // 檢查元素包含文字
    const navText = await nav.textContent();
    expect(navText).toBeTruthy();
  });
});
