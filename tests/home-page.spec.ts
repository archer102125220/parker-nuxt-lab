import { test, expect } from '@playwright/test';

test('home page link test', async ({ page }) => {
  await page.goto('http://localhost:3001/');
  await page.getByRole('main').locator('div').nth(4).click();
  await page.getByRole('link', { name: '關於本站' }).click();
  await expect(page.getByRole('main')).toContainText(
    '關於本站專案目的這是一個用於測試和實驗的專案， 原本沒有打算上線，不過礙於PWA測試需要，故將此專案上線，主要聚焦於以下幾個方面：客製化 Vue 組件的開發與測試Nuxt3 框架的相關套件整合與應用PWA (Progressive Web App) 的實驗與實作主要測試項目nuxt-i18n 多語言功能實作方式記錄(尚未添加完成語系包)自製組件及第三方整合組件Vue 指令的開發與應用路由系統的紀錄與實作CSS 繪圖技術的實驗生物辨識技術的整合（WebAuthn、FIDO2）WebCam 與臉部識別 API 的應用前端 API 快取機制的實作技術棧Nuxt3 - Vue.js 伺服渲染框架Vue3 - 前端框架SCSS - CSS 預處理器PWA - 漸進式網頁應用ISR 技術測試本專案也包含了 Nuxt3 的 ISR (Incremental Static Regeneration) 技術測試，這是一種混合渲染策略，結合了靜態生成和動態更新的優點：實現頁面的靜態生成，提供更快的首次載入速度設定自動重新驗證時間，確保內容的即時性在後台自動更新過期內容，無需等待用戶請求優化 SEO 表現，同時保持內容的新鮮度設計與資源本站圖示 (Favicon) 採用 Google Gemini 輔助設計生成'
  );
  await page.getByRole('banner').getByRole('button').click();
  await expect(page.getByRole('navigation')).toContainText(
    '關於本站自製組件及第三方整合組件組件綜合測試自製vue指令route相關測試css繪圖相關測試生物辨識測試（原生）生物辨識測試（fido2-lib）WebCam測試face-api測試前端api快取測試'
  );
});
