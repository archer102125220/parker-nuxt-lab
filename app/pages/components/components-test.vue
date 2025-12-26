<template>
  <div class="components_test_page">
    <!-- Hero Section -->
    <section class="components_test_page-hero">
      <div class="components_test_page-hero-background">
        <div class="components_test_page-hero-background-overlay" />
      </div>
      
      <div class="components_test_page-hero-content">
        <h1 class="components_test_page-hero-content-title">
          {{ $t('components_test_page.hero.title') }}
        </h1>
        <p class="components_test_page-hero-content-subtitle">
          {{ $t('components_test_page.hero.subtitle') }}
        </p>
        <p class="components_test_page-hero-content-description">
          {{ $t('components_test_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="components_test_page-section">
    <TabsBar
      class="components_test_page-bar"
      v-model="tab"
      gap="16px"
      border-side-height="2px"
      border-side-width="30px"
      border-side-color="#27C5C3"
      :tab-list="tabList"
    />
    <div class="components_test_page-menu">
      <TabsBar
        v-model="tab"
        vertical
        gap="16px"
        tab-item-width="100%"
        border-side-width="5px"
        border-side-color="#27C5C3"
        :tab-list="tabList"
      />
    </div>
    <ScrollFetch
      class="components_test_page-content"
      :ios-style="false"
      :refresh-disable="false"
      height="100dvh"
      refresh-icon="/img/icon/refresh/refresh-icon.svg"
      refreshing-icon="/img/icon/refresh/refreshing-icon.svg"
      :infinityEnd="infinityEnd"
      @refresh="handleRefresh"
      @infinityFetch="handleInfinityFetch"
    >
      <div class="components_test_page-content-scroll_fetch">
        <TabsBar
          v-model="tab"
          gap="16px"
          border-side-height="2px"
          border-side-width="30px"
          border-side-color="#27C5C3"
          :tab-list="tabList"
        />
        <p class="components_test_page-content-scroll_fetch-text">12343</p>
        <WangEditor
          class="components_test_page-content-scroll_fetch-wang_editor"
          editorHeight="350px"
        />
        <div class="components_test_page-content-scroll_fetch-youtube">
          <Youtube video-id="RTtmcqPXwuw" autoplay />
        </div>
      </div>
    </ScrollFetch>
    </section>
  </div>
</template>

<script setup>
useHeadMataData({
  title: '組件綜合測試'
});
const nuxtApp = useNuxtApp();

const infinityEnd = ref(false);

const tab = ref(0);

const tabList = computed(() => {
  const _tabList = [];
  for (let i = 0; i <= 100; i++) {
    _tabList.push(i);
    // let tab = '';
    // for (let j = i; j >= 0; j--) {
    //   tab += j;
    // }
    // _tabList.push(tab);
  }
  return _tabList;
});

function handleRefresh(done) {
  nuxtApp.$store.system.setLoading(true);
  console.log('handleRefresh');
  setTimeout(() => {
    console.log('handleRefresh setTimeout');
    // nuxtApp.$successMessage('handleRefresh');
    nuxtApp.$store.system.setLoading(false);
    done();
  }, 1000);
}
function handleInfinityFetch(done) {
  nuxtApp.$store.system.setLoading(true);
  console.log('handleInfinityFetch');
  setTimeout(() => {
    // infinityEnd.value = true;
    console.log('handleInfinityFetch setTimeout');
    // nuxtApp.$successMessage('handleInfinityFetch');
    nuxtApp.$store.system.setLoading(false);
    done();
  }, 1000);
}
</script>

<style lang="scss" scoped>
.components_test_page {
  min-height: 100vh;

  &-hero {
    position: relative;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
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
        margin: 0 0 8px 0;
        font-size: 36px;
        font-weight: 800;
        color: #ffffff;
        
        @media (max-width: 768px) {
          font-size: 28px;
        }
      }
      
      &-subtitle {
        margin: 0 0 12px 0;
        font-size: 18px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.95);
      }
      
      &-description {
        margin: 0;
        font-size: 14px;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.9);
      }
    }
  }

  &-section {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: calc(100vh - 200px);
  }

  &-bar {
    flex: 1;
    flex-basis: 100%;
  }

  &-menu {
    flex-shrink: 0;
    flex-basis: 40px;
    max-height: 93%;
    overflow: hidden;
  }

  &-content {
    flex: 1;
    flex-basis: calc(100% - 40px);
    max-height: 93%;
    background-color: #fff;

    &-scroll_fetch {
      &-text {
        height: 200px;
      }

      &-wang_editor {
        margin-bottom: 8px;
      }

      &-youtube {
        height: 80dvh;
      }
    }
  }
}
</style>
