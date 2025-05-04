import { test, expect } from '@playwright/test';

test('index page go to home page', async ({ page }) => {
  await page.goto('http://localhost:3001/');
  await page.getByRole('main').locator('div').nth(4).click();
  await expect(page.getByRole('navigation')).toContainText(
    '關於本站自製組件及第三方整合組件組件綜合測試自製vue指令route相關測試css繪圖相關測試生物辨識測試（原生）生物辨識測試（fido2-lib）WebCam測試face-api測試前端api快取測試'
  );
});
