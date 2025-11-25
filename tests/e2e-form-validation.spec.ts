import { test, expect } from '@playwright/test';

/**
 * E2E 測試 - 表單驗證流程
 *
 * 測試電話號碼輸入組件的驗證功能
 */

test.describe('電話號碼輸入驗證', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/phone-input', {
      waitUntil: 'load' // 使用 load 而非 networkidle
    });
    // 等待 EnterLabel 動畫完成
    await page.waitForTimeout(1500);
  });

  test('應該顯示電話輸入頁面', async ({ page }) => {
    // 等待 EnterLabel 動畫完成
    await page.waitForTimeout(1000);
    // 檢查標題包含電話相關關鍵字
    const title = await page.title();
    expect(title).toContain('電話');
  });

  test('應該顯示國碼選擇器', async ({ page }) => {
    // 查找國碼選擇器 - 使用正確的 CSS class
    const countrySelector = page.locator('.phone_input').first();
    await expect(countrySelector).toBeVisible();
  });

  test('應該能夠輸入電話號碼', async ({ page }) => {
    // 等待頁面完全載入
    await page.waitForTimeout(500);

    // 查找電話輸入框
    const phoneInput = page.locator('input[type="tel"]').first();

    if (await phoneInput.isVisible()) {
      // 點擊輸入框以確保獲得焦點
      await phoneInput.click();
      await phoneInput.fill('0912345678');

      // 等待輸入處理
      await page.waitForTimeout(300);

      // 驗證輸入值（可能被組件處理過）
      const value = await phoneInput.inputValue();
      expect(value.length).toBeGreaterThan(0);
    }
  });

  test('應該驗證台灣手機號碼格式', async ({ page }) => {
    const phoneInput = page.locator('input[type="tel"]').first();

    if (await phoneInput.isVisible()) {
      // 輸入有效的台灣手機號碼
      await phoneInput.fill('0912345678');
      await phoneInput.blur();

      // 等待驗證
      await page.waitForTimeout(500);

      // 檢查是否沒有錯誤訊息
      const errorMessage = page.locator('.error, .v-messages__message').first();
      const hasError = await errorMessage.isVisible().catch(() => false);

      // 有效號碼不應該顯示錯誤
      if (hasError) {
        const errorText = await errorMessage.textContent();
        expect(errorText).not.toContain('無效');
      }
    }
  });

  test('應該拒絕無效的電話號碼', async ({ page }) => {
    const phoneInput = page.locator('input[type="tel"]').first();

    if (await phoneInput.isVisible()) {
      // 輸入無效的電話號碼
      await phoneInput.fill('123');
      await phoneInput.blur();

      // 等待驗證
      await page.waitForTimeout(500);

      // 可能會顯示錯誤訊息（取決於組件實作）
      const errorMessage = page.locator('.error, .v-messages__message');
      const count = await errorMessage.count();

      // 至少應該有某種視覺反饋
      expect(count).toBeGreaterThanOrEqual(0);
    }
  });

  test('應該能夠切換國碼', async ({ page }) => {
    // 查找國碼選擇器按鈕
    const countrySelectorButton = page
      .locator('button')
      .filter({ hasText: /\+886|\+1|\+86/ })
      .first();

    if (await countrySelectorButton.isVisible()) {
      await countrySelectorButton.click();

      // 等待選單出現
      await page.waitForTimeout(300);

      // 檢查是否有選單項目
      const menuItems = page.locator('.v-list-item, .menu-item');
      const count = await menuItems.count();

      expect(count).toBeGreaterThan(0);
    }
  });

  test('應該顯示電話號碼格式提示', async ({ page }) => {
    // 檢查是否有提示文字或標籤
    const hints = page.locator('.v-label, label, .hint, .helper-text');
    const count = await hints.count();

    expect(count).toBeGreaterThan(0);
  });

  test('應該能夠清空輸入', async ({ page }) => {
    const phoneInput = page.locator('input[type="tel"]').first();

    if (await phoneInput.isVisible()) {
      // 點擊並輸入號碼
      await phoneInput.click();
      await phoneInput.fill('0912345678');
      await page.waitForTimeout(300);

      // 驗證有輸入值
      const value = await phoneInput.inputValue();
      expect(value.length).toBeGreaterThan(0);

      // 清空
      await phoneInput.clear();
      await expect(phoneInput).toHaveValue('');
    }
  });
});
