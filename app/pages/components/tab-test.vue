<template>
  <div class="tab_test_page">
    <!-- Hero Section -->
    <section class="tab_test_page-hero">
      <div class="tab_test_page-hero-background">
        <div class="tab_test_page-hero-background-overlay" />
      </div>

      <div class="tab_test_page-hero-content">
        <h1 class="tab_test_page-hero-content-title">
          {{ $t('tab_test_page.hero.title') }}
        </h1>
        <p class="tab_test_page-hero-content-subtitle">
          {{ $t('tab_test_page.hero.subtitle') }}
        </p>
        <p class="tab_test_page-hero-content-description">
          {{ $t('tab_test_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="tab_test_page-section">
      <TabsBar
        class="tab_test_page-bar"
        v-model="tab"
        gap="16px"
        border-side-height="2px"
        border-side-width="30px"
        border-side-color="#27C5C3"
        :tab-list="tabList"
      />
      <TabsBar
        class="tab_test_page-bar"
        v-model="tab"
        gap="16px"
        limit-shadow
        border-side-height="2px"
        border-side-width="30px"
        border-side-color="#27C5C3"
        :tab-list="tabList"
      />
      <TabsBar
        class="tab_test_page-bar"
        v-model="tab"
        gap="16px"
        is-navigation-absolute
        border-side-height="2px"
        border-side-width="30px"
        border-side-color="#27C5C3"
        :tab-list="tabList"
      />
      <TabsBar
        class="tab_test_page-bar"
        v-model="tab"
        gap="16px"
        border-side-height="2px"
        border-side-width="30px"
        border-side-color="#27C5C3"
        :tab-list="tabList"
      >
        <template #prev="{ ...arg }">
          <div v-bind="arg" v-ripple class="tab_test_page-bar-prev">
            <img
              class="tab_test_page-bar-prev-img"
              src="/img/icon/arrow/arrow-right-line-black.svg"
            />
          </div>
        </template>
      </TabsBar>
      <TabsContent
        class="tab_test_page-tab_content"
        height="100%"
        v-model="tab"
        :tab-list="tabList"
      />

      <div class="tab_test_page-complex">
        <div class="tab_test_page-complex-menu">
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
          class="tab_test_page-complex-content"
          :ios-style="false"
          :refresh-disable="false"
          height="100dvh"
          refresh-icon="/img/icon/refresh/refresh-icon.svg"
          refreshing-icon="/img/icon/refresh/refreshing-icon.svg"
          :infinityEnd="infinityEnd"
          @refresh="handleRefresh"
          @infinityFetch="handleInfinityFetch"
        >
          <div>
            <TabsBar
              v-model="tab"
              gap="16px"
              border-side-height="2px"
              border-side-width="30px"
              border-side-color="#27C5C3"
              :tab-list="tabList"
            />
          </div>
        </ScrollFetch>
      </div>
    </section>
  </div>
</template>

<script setup>
useHeadMataData({
  title: '自製Tab測試'
});
const nuxtApp = useNuxtApp();

const infinityEnd = ref(false);

const tab = ref(0);

const tabList = computed(() => {
  const _tabList = [];
  for (let i = 0; i <= 20; i++) {
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
.tab_test_page {
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
      background: linear-gradient(135deg, #44a08d 0%, #4ecdc4 100%);

      &-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          135deg,
          rgba(68, 160, 141, 0.9) 0%,
          rgba(78, 205, 196, 0.85) 100%
        );
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
    padding: 20px;
  }

  &-bar {
    // flex: 1;
    // flex-basis: 100%;
    &-prev {
      /* Display & Box Model */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      width: var(--navigation_width);
      min-height: 24px;
      overflow: hidden;
      border-top-right-radius: var(--navigation_top_right_radius);
      border-bottom-right-radius: var(--navigation_bottom_right_radius);
      border-bottom-left-radius: var(--navigation_bottom_left_radius);

      /* Animation */
      transform: rotate(180deg);

      &-img {
        /* Display & Box Model */
        width: var(--navigation_img_size);
        height: var(--navigation_img_size);
      }
    }
  }
  &-tab_content {
    /* Display & Box Model */
    // flex: 1;
    // flex-basis: 100%;
    height: 30%;
  }
  &-complex {
    /* Display & Box Model */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 50%;
    &-menu {
      /* Display & Box Model */
      flex-shrink: 0;
      flex-basis: 40px;
      max-height: 93%;
      overflow: hidden;
    }
    &-content {
      /* Display & Box Model */
      flex: 1;
      flex-basis: calc(100% - 40px);
      max-height: 90%;

      /* Visual */
      background-color: #fff;
    }
  }
}
</style>
