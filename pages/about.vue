<template>
  <div class="about_page">
    <div class="about_page-content">
      <h1 class="about_page-content-title">關於本站</h1>
      <section class="about_page-content-section">
        <h2 class="about_page-content-section-sub_title">專案目的</h2>
        <div class="about_page-content-section-description">
          <p>這是一個用於測試和實驗的專案</p>
          <del>， 原本沒有打算上線，不過礙於PWA實驗，故將此專案上線</del>
          <p>，主要聚焦於以下幾個方面：</p>
        </div>
        <ul class="about_page-content-section-list">
          <li class="about_page-content-section-list-item">
            客製化 Vue 組件的開發與測試
          </li>
          <li class="about_page-content-section-list-item">
            Nuxt3 框架的相關套件整合與應用
          </li>
          <li class="about_page-content-section-list-item">
            PWA (Progressive Web App) 的實驗與實作
          </li>
        </ul>
      </section>

      <section class="about_page-content-section">
        <h2 class="about_page-content-section-sub_title">主要測試項目</h2>
        <ul class="about_page-content-section-list">
          <li class="about_page-content-section-list-item">
            nuxt-i18n 多語言功能實作方式記錄(尚未添加完成語系包)
          </li>
          <li class="about_page-content-section-list-item">
            自製組件及第三方整合組件
          </li>
          <li class="about_page-content-section-list-item">
            Vue 指令的開發與應用
          </li>
          <li class="about_page-content-section-list-item">
            路由系統的紀錄與實作
          </li>
          <li class="about_page-content-section-list-item">
            CSS 繪圖技術的實驗
          </li>
          <li class="about_page-content-section-list-item">
            生物辨識技術的整合（WebAuthn、FIDO2）
          </li>
          <li class="about_page-content-section-list-item">
            WebCam 與臉部識別 API 的應用
          </li>
          <li class="about_page-content-section-list-item">
            前端 API 快取機制的實作
          </li>
        </ul>
      </section>

      <section class="about_page-content-section">
        <h2 class="about_page-content-section-sub_title">技術棧</h2>
        <ul class="about_page-content-section-list">
          <li class="about_page-content-section-list-item">
            Nuxt3 - Vue.js 伺服渲染框架
          </li>
          <li class="about_page-content-section-list-item">Vue3 - 前端框架</li>
          <li class="about_page-content-section-list-item">
            SCSS - CSS 預處理器
          </li>
          <li class="about_page-content-section-list-item">
            PWA - 漸進式網頁應用
          </li>
        </ul>
      </section>

      <section class="about_page-content-section">
        <h2 class="about_page-content-section-sub_title">ISR 技術測試</h2>
        <div class="about_page-content-section-description">
          <p>本專案也包含了 Nuxt3 的 ISR (Incremental Static Regeneration) 技術測試，這是一種混合渲染策略，結合了靜態生成和動態更新的優點：</p>
        </div>
        <ul class="about_page-content-section-list">
          <li class="about_page-content-section-list-item">
            實現頁面的靜態生成，提供更快的首次載入速度
          </li>
          <li class="about_page-content-section-list-item">
            設定自動重新驗證時間，確保內容的即時性
          </li>
          <li class="about_page-content-section-list-item">
            在後台自動更新過期內容，無需等待用戶請求
          </li>
          <li class="about_page-content-section-list-item">
            優化 SEO 表現，同時保持內容的新鮮度
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: '關於本站 - Nuxt實驗室',
  meta: [
    {
      name: 'description',
      content:
        '這是一個用於測試和實驗的專案，主要聚焦於客製化組件、Nuxt3套件整合以及PWA實驗。'
    }
  ]
});
</script>

<style lang="scss">
.about_page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  &-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &-title {
      font-size: 2.5rem;
      margin-bottom: 2rem;
      color: #333;
    }

    &-section {
      margin-bottom: 2rem;

      &-sub_title {
        font-size: 1.8rem;
        margin: 1.5rem 0 1rem;
        color: #444;
      }

      &-description {
        display: flex;
        align-items: center;
        // justify-content: space-between;

        margin-bottom: 1rem;
        line-height: 1.6;
        color: #666;
      }

      &-list {
        list-style-type: disc;
        padding-left: 2rem;
        margin-bottom: 1rem;

        &-item {
          margin-bottom: 0.5rem;
          line-height: 1.6;
          color: #666;
        }
      }
    }
  }
}
</style>
