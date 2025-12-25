<template>
  <div class="selector_page">
    <!-- Hero Section -->
    <section class="selector_page-hero">
      <div class="selector_page-hero-background">
        <div class="selector_page-hero-background-overlay"></div>
      </div>
      
      <div class="selector_page-hero-content">
        <h1 class="selector_page-hero-content-title">
          {{ $t('selector_page.hero.title') }}
        </h1>
        <p class="selector_page-hero-content-subtitle">
          {{ $t('selector_page.hero.subtitle') }}
        </p>
        <p class="selector_page-hero-content-description">
          {{ $t('selector_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="selector_page-section">
      <div class="selector_page-demo">
        <h3 class="selector_page-demo-label">選擇運動類型：</h3>
        <Selector
          display-key="display"
          value-key="id"
          v-model="classId"
          :option-list="matchTypeList"
          class="selector_page-demo-selector"
        />
        
        <div class="selector_page-demo-result">
          <p class="selector_page-demo-result-label">目前選擇：</p>
          <code class="selector_page-demo-result-value">{{ currentSelection }}</code>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('selector_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('selector_page.hero.description')
    }
  ]
});

const classId = ref();
const matchTypeList = computed(() => {
  return [
    { id: 5, name: 'football', display: '足球' },
    { id: 4, name: 'basketball', display: '籃球' },
    { id: 14, name: 'e-sports', display: '電競' },
    { id: 'default', name: 'other', display: '預設' }
  ];
});

const currentSelection = computed(() => {
  const item = matchTypeList.value.find(m => m.id === classId.value);
  return item ? `${item.display} (ID: ${item.id})` : '(尚未選擇)';
});

onMounted(() => {
  classId.value = matchTypeList.value[0]?.id;
});
</script>

<style lang="scss" scoped>
.selector_page {
  min-height: 100vh;

  // Hero Section
  &-hero {
    position: relative;
    min-height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    overflow: hidden;
    
    &-background {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #44A08D 0%, #4ECDC4 100%);
      
      &-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(68, 160, 141, 0.9) 0%, rgba(78, 205, 196, 0.85) 100%);
      }
    }
    
    &-content {
      position: relative;
      z-index: 1;
      max-width: 800px;
      text-align: center;
      
      &-title {
        margin: 0 0 12px 0;
        font-size: 42px;
        font-weight: 800;
        color: #ffffff;
        
        @media (max-width: 768px) {
          font-size: 32px;
        }
      }
      
      &-subtitle {
        margin: 0 0 16px 0;
        font-size: 20px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.95);
      }
      
      &-description {
        margin: 0;
        font-size: 16px;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.9);
      }
    }
  }

  &-section {
    padding: 60px 20px;
    max-width: 600px;
    margin: 0 auto;
  }

  &-demo {
    &-label {
      margin-bottom: 16px;
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    &-selector {
      margin-bottom: 24px;
    }

    &-result {
      padding: 16px;
      border-radius: 8px;
      background: #f8f9fa;
      
      &-label {
        margin-bottom: 8px;
        font-weight: 600;
        color: #333;
      }
      
      &-value {
        display: block;
        padding: 12px;
        border-radius: 4px;
        background: #e9ecef;
        font-size: 14px;
      }
    }
  }
}
</style>
