<script setup>
const toolCategories = [
  {
    title: 'Documents (Doc)',
    items: [
      { title: 'Collabora Doc', desc: 'Collaborative document editing using Collabora.', path: '/office-tool/collabora-doc' },
      { title: 'Syncfusion Doc', desc: 'Document editor powered by Syncfusion.', path: '/office-tool/syncfusion-doc' },
      { title: 'Tiptap Doc', desc: 'Rich text document editing using Tiptap.', path: '/office-tool/tiptap-doc' },
      { title: 'Univer Doc', desc: 'Document editing capabilities powered by Univer.', path: '/office-tool/univer-doc' }
    ]
  },
  {
    title: 'Spreadsheets (Sheet)',
    items: [
      { title: 'Collabora Sheet', desc: 'Collaborative spreadsheet editing using Collabora.', path: '/office-tool/collabora-sheet' },
      { title: 'Syncfusion Sheet', desc: 'Spreadsheet editor powered by Syncfusion.', path: '/office-tool/syncfusion-sheet' },
      { title: 'Univer Sheet', desc: 'Spreadsheet capabilities powered by Univer.', path: '/office-tool/univer-sheet' }
    ]
  },
  {
    title: 'PDF',
    items: [
      { title: 'PDF Reader', desc: 'View and interact with PDF files.', path: '/office-tool/pdf-reader' }
    ]
  }
];
</script>

<template>
  <div class="office_tool_index_page">
    <div class="office_tool_index_page-header">
      <h1 class="office_tool_index_page-header-title">Office Tools</h1>
      <p class="office_tool_index_page-header-desc">Explore different document, spreadsheet, and PDF implementations.</p>
    </div>

    <div class="office_tool_index_page-content">
      <section 
        v-for="(category, index) in toolCategories" 
        :key="index"
        class="office_tool_index_page-section"
      >
        <h2 class="office_tool_index_page-section-title">{{ category.title }}</h2>
        <div class="office_tool_index_page-grid">
          <NuxtLink 
            v-for="(item, itemIndex) in category.items" 
            :key="itemIndex"
            :to="item.path" 
            class="office_tool_index_page-card"
          >
            <h3 class="office_tool_index_page-card-title">{{ item.title }}</h3>
            <p class="office_tool_index_page-card-desc">{{ item.desc }}</p>
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
    position: relative;
    overflow: hidden;
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

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('/img/icon/NuxtRock.v.10.4.webp');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      opacity: 0.1;
      pointer-events: none;
      z-index: 0;
      transition: opacity 0.3s ease;
    }

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      border-color: var(--color_primary, #3b82f6);
    }

    &-title {
      position: relative;
      z-index: 1;
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--color_primary, #2563eb);
    }

    &-desc {
      position: relative;
      z-index: 1;
      margin: 0;
      font-size: 14px;
      color: var(--color_text_secondary, #6b7280);
      line-height: 1.5;
    }
  }
}
</style>
