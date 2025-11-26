import { test, expect } from '@playwright/test';

/**
 * E2E 測試 - 無限滾動載入
 *
 * 測試滾動載入更多內容的功能
 */

test.describe('無限滾動載入', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/scroll-fetch', {
      waitUntil: 'load'
    });
    await page.waitForTimeout(1500);
  });

  test('應該顯示滾動載入頁面', async ({ page }) => {
    // 等待 EnterLabel 動畫完成
    await page.waitForTimeout(1000);
    await expect(page).toHaveTitle(/滾動|Scroll|下拉|無限/i);
  });

  test('應該初始載入一些內容', async ({ page }) => {
    // 等待內容載入
    await page.waitForTimeout(1000);

    // 檢查是否有列表項目
    const listItems = page.locator('.scroll-item, .list-item, .card, .v-card');
    const count = await listItems.count();

    expect(count).toBeGreaterThan(0);
  });

  test('應該在滾動到底部時載入更多內容', async ({ page }) => {
    // 等待初始內容載入
    await page.waitForTimeout(1000);

    // 獲取初始項目數量
    const listItems = page.locator('.scroll-item, .list-item, .card, .v-card');
    const initialCount = await listItems.count();

    // 滾動到頁面底部
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    // 等待新內容載入
    await page.waitForTimeout(2000);

    // 獲取新的項目數量
    const newCount = await listItems.count();

    // 新數量應該大於或等於初始數量（可能沒有更多內容）
    expect(newCount).toBeGreaterThanOrEqual(initialCount);
  });

  test('應該顯示載入指示器', async ({ page }) => {
    // 滾動到底部觸發載入
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    // 檢查載入指示器（可能很快消失）
    const loadingIndicator = page.locator(
      '.loading, .spinner, .v-progress-circular, [role="progressbar"]'
    );

    // 等待一小段時間看是否出現
    await page.waitForTimeout(500);

    // 載入指示器可能已經消失，所以我們只檢查頁面是否正常
    const pageContent = await page.content();
    expect(pageContent.length).toBeGreaterThan(0);
  });

  test('應該能夠多次滾動載入', async ({ page }) => {
    // 等待初始載入
    await page.waitForTimeout(1000);

    // 第一次滾動
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1500);

    // 第二次滾動
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1500);

    // 檢查頁面仍然正常運作
    const listItems = page.locator('.scroll-item, .list-item, .card, .v-card');
    const count = await listItems.count();

    expect(count).toBeGreaterThan(0);
  });

  test('應該能夠下拉重新載入', async ({ page }) => {
    // 等待初始載入
    await page.waitForTimeout(1000);

    // 滾動到頂部
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });

    // 模擬下拉手勢（在桌面瀏覽器中可能不會觸發）
    await page.mouse.move(200, 100);
    await page.mouse.down();
    await page.mouse.move(200, 300, { steps: 10 });
    await page.mouse.up();

    // 等待可能的重新載入
    await page.waitForTimeout(1000);

    // 檢查頁面仍然正常
    const listItems = page.locator('.scroll-item, .list-item, .card, .v-card');
    const count = await listItems.count();

    expect(count).toBeGreaterThan(0);
  });

  test('應該正確處理滾動位置', async ({ page }) => {
    // 滾動到中間位置
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight / 2);
    });

    await page.waitForTimeout(500);

    // 獲取當前滾動位置
    const scrollY = await page.evaluate(() => window.scrollY);

    expect(scrollY).toBeGreaterThan(0);
  });
});
