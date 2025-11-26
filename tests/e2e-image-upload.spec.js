import { test, expect } from '@playwright/test';

/**
 * E2E 測試 - 圖片上傳流程
 *
 * 測試圖片上傳組件的完整用戶流程
 */

test.describe('圖片上傳流程', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/image-upload-test', {
      waitUntil: 'load' // 使用 load 而非 networkidle
    });
    // 等待 EnterLabel 動畫完成
    await page.waitForTimeout(1500);
  });

  test('應該顯示圖片上傳頁面', async ({ page }) => {
    // 等待 EnterLabel 動畫完成後再檢查標題
    await page.waitForTimeout(1000);
    await expect(page).toHaveTitle(/選擇圖片|Image Upload|圖片上傳/i);

    // 檢查上傳按鈕存在
    const uploadButton = page.getByRole('button', { name: /上傳圖片|upload/i });
    await expect(uploadButton).toBeVisible();
  });

  test('應該能夠點擊選擇圖片', async ({ page }) => {
    // 直接點擊上傳按鈕以觸發 handeChange 函數
    const uploadButton = page.locator('.image_upload-btn').first();
    await expect(uploadButton).toBeVisible();

    // 準備文件選擇器
    const fileChooserPromise = page.waitForEvent('filechooser');

    // 點擊按鈕
    await uploadButton.click();

    const fileChooser = await fileChooserPromise;
    expect(fileChooser).toBeTruthy();
  });

  test('應該能夠上傳圖片並顯示預覽', async ({ page }) => {
    // 點擊上傳按鈕以觸發 handeChange
    const uploadButton = page.locator('.image_upload-btn').first();
    await expect(uploadButton).toBeVisible();

    // 準備文件選擇器
    const fileChooserPromise = page.waitForEvent('filechooser');
    await uploadButton.click();

    const fileChooser = await fileChooserPromise;

    // 上傳測試圖片（使用 buffer 創建）
    await fileChooser.setFiles({
      name: 'test-image.png',
      mimeType: 'image/png',
      buffer: Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQ42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        'base64'
      )
    });

    // 等待預覽圖片出現
    await page.waitForTimeout(500);

    // 檢查預覽圖片是否顯示
    const previewImage = page.locator('.image_upload-preview-img').first();
    await expect(previewImage).toBeVisible();
  });

  test('應該支援拖拉上傳', async ({ page }) => {
    const uploadArea = page.locator('.image_upload').first();
    await expect(uploadArea).toBeVisible();

    // 創建 DataTransfer 對象模擬拖拉
    const buffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );

    // 創建文件
    const dataTransfer = await page.evaluateHandle((data) => {
      const dt = new DataTransfer();
      const file = new File(
        [Uint8Array.from(atob(data), (c) => c.charCodeAt(0))],
        'test.png',
        { type: 'image/png' }
      );
      dt.items.add(file);
      return dt;
    }, buffer.toString('base64'));

    // 觸發 drop 事件
    await uploadArea.dispatchEvent('drop', { dataTransfer });

    // 等待處理
    await page.waitForTimeout(500);
  });

  test('應該顯示遮罩當拖拉進入時', async ({ page }) => {
    const uploadArea = page.locator('.image_upload').first();
    await expect(uploadArea).toBeVisible();

    // 觸發 dragenter 事件
    await uploadArea.dispatchEvent('dragenter');

    // 檢查遮罩是否顯示
    const mask = page.locator('.image_upload-mask').first();
    await expect(mask).toBeVisible();
  });

  test('應該能夠處理多個上傳組件', async ({ page }) => {
    // 檢查頁面上是否有多個上傳組件
    const uploadAreas = page.locator('.image_upload');
    const count = await uploadAreas.count();

    expect(count).toBeGreaterThanOrEqual(1);

    // 每個組件都應該可見
    for (let i = 0; i < Math.min(count, 3); i++) {
      await expect(uploadAreas.nth(i)).toBeVisible();
    }
  });
});
