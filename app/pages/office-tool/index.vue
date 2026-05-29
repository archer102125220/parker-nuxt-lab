<script setup lang="ts">
// Office Tool Index Page
</script>

<template>
  <div class="office_tool_index_page">
    <div class="office_tool_index_page-header">
      <h1 class="office_tool_index_page-header-title">Office Tools</h1>
      <p class="office_tool_index_page-header-desc">Explore different document, spreadsheet, and PDF implementations.</p>
    </div>

    <div class="office_tool_index_page-content">
      <!-- Doc Section -->
      <section class="office_tool_index_page-section">
        <h2 class="office_tool_index_page-section-title">Documents (Doc)</h2>
        <div class="office_tool_index_page-grid">
          <NuxtLink to="/office-tool/collabora-doc" class="office_tool_index_page-card">
            <h3 class="office_tool_index_page-card-title">Collabora Doc</h3>
            <p class="office_tool_index_page-card-desc">Collaborative document editing using Collabora.</p>
          </NuxtLink>
          <NuxtLink to="/office-tool/syncfusion-doc" class="office_tool_index_page-card">
            <h3 class="office_tool_index_page-card-title">Syncfusion Doc</h3>
            <p class="office_tool_index_page-card-desc">Document editor powered by Syncfusion.</p>
          </NuxtLink>
          <NuxtLink to="/office-tool/tiptap-doc" class="office_tool_index_page-card">
            <h3 class="office_tool_index_page-card-title">Tiptap Doc</h3>
            <p class="office_tool_index_page-card-desc">Rich text document editing using Tiptap.</p>
          </NuxtLink>
          <NuxtLink to="/office-tool/univer-doc" class="office_tool_index_page-card">
            <h3 class="office_tool_index_page-card-title">Univer Doc</h3>
            <p class="office_tool_index_page-card-desc">Document editing capabilities powered by Univer.</p>
          </NuxtLink>
        </div>
      </section>

      <!-- Sheet Section -->
      <section class="office_tool_index_page-section">
        <h2 class="office_tool_index_page-section-title">Spreadsheets (Sheet)</h2>
        <div class="office_tool_index_page-grid">
          <NuxtLink to="/office-tool/collabora-sheet" class="office_tool_index_page-card">
            <h3 class="office_tool_index_page-card-title">Collabora Sheet</h3>
            <p class="office_tool_index_page-card-desc">Collaborative spreadsheet editing using Collabora.</p>
          </NuxtLink>
          <NuxtLink to="/office-tool/syncfusion-sheet" class="office_tool_index_page-card">
            <h3 class="office_tool_index_page-card-title">Syncfusion Sheet</h3>
            <p class="office_tool_index_page-card-desc">Spreadsheet editor powered by Syncfusion.</p>
          </NuxtLink>
          <NuxtLink to="/office-tool/univer-sheet" class="office_tool_index_page-card">
            <h3 class="office_tool_index_page-card-title">Univer Sheet</h3>
            <p class="office_tool_index_page-card-desc">Spreadsheet capabilities powered by Univer.</p>
          </NuxtLink>
        </div>
      </section>

      <!-- PDF Section -->
      <section class="office_tool_index_page-section">
        <h2 class="office_tool_index_page-section-title">PDF</h2>
        <div class="office_tool_index_page-grid">
          <NuxtLink to="/office-tool/pdf-reader" class="office_tool_index_page-card">
            <h3 class="office_tool_index_page-card-title">PDF Reader</h3>
            <p class="office_tool_index_page-card-desc">View and interact with PDF files.</p>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.office_tool_index_page {
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;

  &-header {
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-align: center;

    &-title {
      margin: 0;
      font-size: 32px;
      font-weight: 700;
      color: var(--color_text_primary, #111827);
    }

    &-desc {
      margin: 0;
      font-size: 16px;
      color: var(--color_text_secondary, #6b7280);
    }
  }

  &-content {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  &-section {
    display: flex;
    flex-direction: column;
    gap: 16px;

    &-title {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
      color: var(--color_text_primary, #374151);
      padding-bottom: 8px;
      border-bottom: 2px solid var(--color_border, #e5e7eb);
    }
  }

  &-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  &-card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 24px;
    background-color: var(--color_bg_surface, #ffffff);
    border: 1px solid var(--color_border, #e5e7eb);
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      border-color: var(--color_primary, #3b82f6);
    }

    &-title {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--color_primary, #2563eb);
    }

    &-desc {
      margin: 0;
      font-size: 14px;
      color: var(--color_text_secondary, #6b7280);
      line-height: 1.5;
    }
  }
}
</style>
