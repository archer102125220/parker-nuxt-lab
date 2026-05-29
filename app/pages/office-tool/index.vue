<script setup>
const { t } = useI18n();

const toolCategories = computed(() => [
  {
    title: t('office_tool_page.categories.doc'),
    color: '#3b82f6', // Blue
    items: [
      {
        title: t('office_tool_page.items.collabora_doc.title'),
        desc: t('office_tool_page.items.collabora_doc.desc'),
        path: '/office-tool/collabora-doc'
      },
      {
        title: t('office_tool_page.items.syncfusion_doc.title'),
        desc: t('office_tool_page.items.syncfusion_doc.desc'),
        path: '/office-tool/syncfusion-doc'
      },
      {
        title: t('office_tool_page.items.tiptap_doc.title'),
        desc: t('office_tool_page.items.tiptap_doc.desc'),
        path: '/office-tool/tiptap-doc'
      },
      {
        title: t('office_tool_page.items.univer_doc.title'),
        desc: t('office_tool_page.items.univer_doc.desc'),
        path: '/office-tool/univer-doc'
      }
    ]
  },
  {
    title: t('office_tool_page.categories.sheet'),
    color: '#10b981', // Green
    items: [
      {
        title: t('office_tool_page.items.collabora_sheet.title'),
        desc: t('office_tool_page.items.collabora_sheet.desc'),
        path: '/office-tool/collabora-sheet'
      },
      {
        title: t('office_tool_page.items.syncfusion_sheet.title'),
        desc: t('office_tool_page.items.syncfusion_sheet.desc'),
        path: '/office-tool/syncfusion-sheet'
      },
      {
        title: t('office_tool_page.items.univer_sheet.title'),
        desc: t('office_tool_page.items.univer_sheet.desc'),
        path: '/office-tool/univer-sheet'
      }
    ]
  },
  {
    title: t('office_tool_page.categories.pdf'),
    color: '#f43f5e', // Rose/Red
    items: [
      {
        title: t('office_tool_page.items.pdf_reader.title'),
        desc: t('office_tool_page.items.pdf_reader.desc'),
        path: '/office-tool/pdf-reader'
      }
    ]
  }
]);
</script>

<template>
  <div class="office_tool_index_page">
    <div class="office_tool_index_page-header">
      <h1 class="office_tool_index_page-header-title">
        {{ $t('office_tool_page.hero.title') }}
      </h1>
      <p class="office_tool_index_page-header-desc">
        {{ $t('office_tool_page.hero.description') }}
      </p>
    </div>

    <div class="office_tool_index_page-content">
      <section
        v-for="(category, index) in toolCategories"
        :key="index"
        class="office_tool_index_page-section"
      >
        <div class="office_tool_index_page-section-header">
          <div
            class="office_tool_index_page-section-dot"
            :style="{ backgroundColor: category.color }"
          ></div>
          <h2 class="office_tool_index_page-section-title">
            {{ category.title }}
          </h2>
        </div>
        <div class="office_tool_index_page-grid">
          <NuxtLink
            v-for="(item, itemIndex) in category.items"
            :key="itemIndex"
            :to="item.path"
            class="office_tool_index_page-card"
            :style="{ '--card_accent': category.color }"
          >
            <div class="office_tool_index_page-card-icon">
              {{ item.title.charAt(0) }}
            </div>
            <div class="office_tool_index_page-card-content">
              <h3 class="office_tool_index_page-card-title">
                {{ item.title }}
              </h3>
              <p class="office_tool_index_page-card-desc">{{ item.desc }}</p>
            </div>
            <div class="office_tool_index_page-card-glow"></div>
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
  gap: 48px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px;
  min-height: 100vh;

  /* Subtle dot background pattern */
  background-color: var(--color_bg_main, #f9fafb);
  background-image: radial-gradient(
    var(--color_border, #e5e7eb) 1px,
    transparent 1px
  );
  background-size: 24px 24px;

  &-header {
    display: flex;
    flex-direction: column;
    gap: 12px;
    text-align: center;

    &-title {
      margin: 0;
      font-size: 40px;
      font-weight: 800;
      color: var(--color_text_primary, #111827);
      letter-spacing: -0.02em;
    }

    &-desc {
      margin: 0;
      font-size: 18px;
      color: var(--color_text_secondary, #6b7280);
      max-width: 600px;
      margin: 0 auto;
    }
  }

  &-content {
    display: flex;
    flex-direction: column;
    gap: 56px;
  }

  &-section {
    display: flex;
    flex-direction: column;
    gap: 20px;

    &-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-bottom: 12px;
      border-bottom: 2px solid var(--color_border, #e5e7eb);
    }

    &-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    &-title {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      color: var(--color_text_primary, #1f2937);
    }
  }

  &-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
  }

  &-card {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 24px;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 16px;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.05),
      0 2px 4px -2px rgba(0, 0, 0, 0.025);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background-color: var(--card_accent);
      opacity: 0.6;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover {
      transform: translateY(-6px);
      box-shadow:
        0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 8px 10px -6px rgba(0, 0, 0, 0.1);
      background: rgba(255, 255, 255, 0.95);
      border-color: var(--color_border, #e5e7eb);

      &::before {
        opacity: 1;
        width: 6px;
      }

      .office_tool_index_page-card-glow {
        opacity: 0.1;
      }

      .office_tool_index_page-card-icon {
        transform: scale(1.1) rotate(5deg);
        background-color: var(--card_accent);
        color: #ffffff;
      }
    }

    &-icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background-color: color-mix(in srgb, var(--card_accent) 12%, transparent);
      color: var(--card_accent);
      font-size: 24px;
      font-weight: 700;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1;
    }

    &-content {
      display: flex;
      flex-direction: column;
      gap: 6px;
      z-index: 1;
    }

    &-title {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--color_text_primary, #111827);
    }

    &-desc {
      margin: 0;
      font-size: 14px;
      color: var(--color_text_secondary, #4b5563);
      line-height: 1.5;
    }

    &-glow {
      position: absolute;
      top: -50%;
      right: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(
        circle at center,
        var(--card_accent) 0%,
        transparent 50%
      );
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.5s ease;
      z-index: 0;
    }
  }
}
</style>
