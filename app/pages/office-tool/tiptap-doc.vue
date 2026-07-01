<script setup>
const { t } = useI18n();

const requirementLimits = computed(() => [
  {
    id: 'open_word',
    statusText: t('tiptap_doc_page.limits.open_word.statusText'),
    title: t('tiptap_doc_page.limits.open_word.title'),
    reason: t('tiptap_doc_page.limits.open_word.reason'),
    wordImpact: t('tiptap_doc_page.limits.open_word.wordImpact')
  },
  {
    id: 'editable_region',
    statusText: t('tiptap_doc_page.limits.editable_region.statusText'),
    title: t('tiptap_doc_page.limits.editable_region.title'),
    reason: t('tiptap_doc_page.limits.editable_region.reason'),
    wordImpact: t('tiptap_doc_page.limits.editable_region.wordImpact')
  },
  {
    id: 'edit_history',
    statusText: t('tiptap_doc_page.limits.edit_history.statusText'),
    title: t('tiptap_doc_page.limits.edit_history.title'),
    reason: t('tiptap_doc_page.limits.edit_history.reason'),
    wordImpact: t('tiptap_doc_page.limits.edit_history.wordImpact')
  },
  {
    id: 'auto_chapter_numbering',
    statusText: t('tiptap_doc_page.limits.auto_chapter_numbering.statusText'),
    title: t('tiptap_doc_page.limits.auto_chapter_numbering.title'),
    reason: t('tiptap_doc_page.limits.auto_chapter_numbering.reason'),
    wordImpact: t('tiptap_doc_page.limits.auto_chapter_numbering.wordImpact')
  },
  {
    id: 'full_toolbar',
    statusText: t('tiptap_doc_page.limits.full_toolbar.statusText'),
    title: t('tiptap_doc_page.limits.full_toolbar.title'),
    reason: t('tiptap_doc_page.limits.full_toolbar.reason'),
    wordImpact: t('tiptap_doc_page.limits.full_toolbar.wordImpact')
  },
  {
    id: 'excel_formula',
    statusText: t('tiptap_doc_page.limits.excel_formula.statusText'),
    title: t('tiptap_doc_page.limits.excel_formula.title'),
    reason: t('tiptap_doc_page.limits.excel_formula.reason'),
    wordImpact: t('tiptap_doc_page.limits.excel_formula.wordImpact')
  }
]);
</script>

<template>
  <div class="tiptap_doc_page">
    <section class="tiptap_doc_page-limit_panel">
      <div class="tiptap_doc_page-limit_panel-header">
        <h1 class="tiptap_doc_page-limit_panel-header-title">
          {{ $t('tiptap_doc_page.limitations_title') }}
        </h1>
        <p class="tiptap_doc_page-limit_panel-header-summary">
          {{ $t('tiptap_doc_page.limitations_summary') }}
        </p>
      </div>

      <ul class="tiptap_doc_page-limit_panel-list">
        <li
          v-for="requirementLimit in requirementLimits"
          :key="requirementLimit.id"
          class="tiptap_doc_page-limit_panel-list-card"
        >
          <strong class="tiptap_doc_page-limit_panel-list-card-status">
            {{ requirementLimit.statusText }}
          </strong>
          <h2 class="tiptap_doc_page-limit_panel-list-card-item_title">
            {{ requirementLimit.title }}
          </h2>
          <p class="tiptap_doc_page-limit_panel-list-card-item_reason">
            {{ requirementLimit.reason }}
          </p>
          <p class="tiptap_doc_page-limit_panel-list-card-item_word">
            {{ $t('tiptap_doc_page.word_impact') }} {{ requirementLimit.wordImpact }}
          </p>
        </li>
      </ul>
    </section>

    <section class="tiptap_doc_page-editor_panel">
      <TiptapDocEditor :status-panel="false" />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.tiptap_doc_page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 90vh;
  padding: 16px;
  //   background: #eef2f7;

  @media (max-width: 760px) {
    padding: 10px;
  }

  &-limit_panel {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 18px;
    border: 1px solid #d8e0eb;
    border-radius: 8px;
    background: #ffffff;

    &-header {
      display: flex;
      flex-direction: column;
      gap: 6px;

      &-title {
        margin: 0;
        font-size: 20px;
        line-height: 1.35;
        color: #172033;
      }
      &-summary {
        margin: 0;
        font-size: 14px;
        line-height: 1.6;
        color: #526072;
      }
    }

    &-list {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      margin: 0;
      padding: 0;
      list-style: none;

      @media (max-width: 1180px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      @media (max-width: 760px) {
        grid-template-columns: 1fr;
      }

      &-card {
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-height: 180px;
        padding: 8px;
        border: 1px solid #f0c7c7;
        border-radius: 8px;
        background: #fff7f7;

        &-status {
          display: inline-flex;
          align-self: flex-start;
          padding: 4px 8px;
          border: 1px solid #f3a8a8;
          border-radius: 999px;
          font-size: 12px;
          line-height: 1.2;
          color: #9f1239;
          background: #ffe4e6;
        }

        &-item_title {
          margin: 0;
          font-size: 15px;
          line-height: 1.45;
          color: #172033;
        }

        &-item_reason {
          margin: 0;
          font-size: 13px;
          line-height: 1.65;
          color: #475569;
        }
        &-item_word {
          @extend .tiptap_doc_page-limit_panel-list-card-item_reason;
          color: #7c2d12;
        }
      }
    }
  }

  &-editor_panel {
    min-height: 90vh;
  }
}
</style>
