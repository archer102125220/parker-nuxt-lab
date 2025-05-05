import { test, expect } from '@playwright/test';

test('home page link test', async ({ page }) => {
  await page.goto('http://localhost:3001/');
  await page.getByRole('main').locator('div').nth(4).click();
  await page.getByRole('link', { name: '關於本站' }).click();
  await expect(
    page.getByText(
      '關於本站專案目的這是一個用於測試和實驗的專案， 原本沒有打算上線，不過礙於PWA測試需要，故將此專案上線，主要聚焦於以下幾個方面：客製化 Vue'
    )
  ).toBeVisible();
  await page.getByRole('banner').getByRole('button').click();
  await expect(
    page.getByText('關於本站自製組件及第三方整合組件組件綜合測試自製vue指令')
  ).toBeVisible();
});
