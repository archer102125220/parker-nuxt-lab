<template>
  <div class="notes_page">
    <section class="notes_page-header">
      <h1 class="notes_page-header-title">{{ t('notes_page.hero.title') }}</h1>
      <p class="notes_page-header-desc">
        {{ t('notes_page.hero.description') }}
      </p>
    </section>

    <section class="notes_page-content">
      <div class="notes_page-content-grid">
        <a
          v-for="note in notesList"
          :key="note.url"
          :href="note.url"
          target="_blank"
          rel="noopener noreferrer"
          class="notes_page-content-grid-card"
        >
          <div class="notes_page-content-grid-card-icon">📄</div>
          <h2 class="notes_page-content-grid-card-title">{{ note.title }}</h2>
          <div class="notes_page-content-grid-card-footer">
            <span class="notes_page-content-grid-card-footer-text">{{
              t('notes_page.read_on_notion')
            }}</span>
            <span class="notes_page-content-grid-card-footer-arrow">→</span>
          </div>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n, useHeadMataData } from '#imports';

const { t } = useI18n();

useHeadMataData({
  title: t('notes_page.seo.title'),
  description: t('notes_page.seo.description')
});

const notesList = [
  {
    title: '📄 [SEO 紀錄] GSC Sitemap 「無法擷取」除錯報告與新站推廣策略',
    url: 'https://www.notion.so/SEO-GSC-Sitemap-3256dcd96fa28083846ff3d6e90c9248'
  },
  {
    title: '📝 [SEO 實戰筆記] Sitemap, Robots.txt 與 GSC 常見除錯指南',
    url: 'https://www.notion.so/SEO-Sitemap-Robots-txt-GSC-3186dcd96fa2804d833ae0557de2e465'
  },
  {
    title: '🔐 Web Authn-無密碼登入',
    url: 'https://www.notion.so/Web-Authn-6480f13abf224ef59a41571df1531f6a'
  }
];
</script>

<style scoped lang="scss">
.notes_page {
  /* Display & Box Model */
  min-height: 100vh;
  padding: 120px 24px 80px;

  /* Visual */
  background: var(--color-bg-primary, #f8f9fa);

  &-header {
    /* Display & Box Model */
    max-width: 800px;
    margin: 0 auto 60px;
    text-align: center;

    &-title {
      /* Display & Box Model */
      margin-bottom: 16px;

      /* Typography */
      font-size: 48px;
      font-weight: 800;
      color: var(--color-text-primary, #1a1a1a);
      letter-spacing: -0.02em;

      /* Animation */
      animation: notes-fade-in-up 0.6s ease-out;

      @media (max-width: 768px) {
        font-size: 36px;
      }
    }

    &-desc {
      /* Typography */
      font-size: 18px;
      line-height: 1.6;
      color: var(--color-text-secondary, #6c757d);

      /* Animation */
      animation: notes-fade-in-up 0.6s ease-out 0.2s backwards;
    }
  }

  &-content {
    /* Display & Box Model */
    max-width: 1200px;
    margin: 0 auto;

    &-grid {
      /* Display & Box Model */
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;

      &-card {
        /* Display & Box Model */
        display: flex;
        flex-direction: column;
        padding: 32px 24px;
        border-radius: 20px;
        text-decoration: none;

        /* Visual */
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid rgba(0, 0, 0, 0.05);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
        backdrop-filter: blur(10px);

        /* Animation */
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        animation: notes-fade-in-up 0.6s ease-out 0.4s backwards;

        &:hover {
          /* Visual */
          background: #ffffff;
          border-color: rgba(68, 160, 141, 0.2);
          box-shadow: 0 12px 32px rgba(68, 160, 141, 0.1);

          /* Positioning */
          transform: translateY(-6px);

          .notes_page-content-grid-card-footer-arrow {
            transform: translateX(6px);
            color: #44a08d;
          }
        }

        &-icon {
          /* Display & Box Model */
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          margin-bottom: 20px;
          border-radius: 14px;

          /* Typography */
          font-size: 28px;

          /* Visual */
          background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
          border: 1px solid rgba(0, 0, 0, 0.03);
        }

        &-title {
          /* Display & Box Model */
          flex: 1;
          margin-bottom: 24px;

          /* Typography */
          font-size: 20px;
          font-weight: 600;
          line-height: 1.5;
          color: var(--color-text-primary, #1a1a1a);
        }

        &-footer {
          /* Display & Box Model */
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 20px;
          border-top: 1px solid rgba(0, 0, 0, 0.05);

          &-text {
            /* Typography */
            font-size: 14px;
            font-weight: 500;
            color: var(--color-text-secondary, #6c757d);
          }

          &-arrow {
            /* Typography */
            font-size: 18px;
            color: #adb5bd;

            /* Animation */
            transition: all 0.3s ease;
          }
        }
      }
    }
  }
}

@keyframes notes-fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
