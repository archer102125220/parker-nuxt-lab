<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('slide_in_panel_page.hero.title'),
  meta: [
    {
      name: 'description',
      content: t('slide_in_panel_page.hero.description')
    }
  ]
});

const message = ref('');
const showMessage = ref('');
const leftEnter = ref(true);

const tab = ref('');
const tabList = computed(() => {
  const _tabList = [];
  for (let i = 0; i <= 20; i++) {
    _tabList.push(i);
  }
  return _tabList;
});

function handleUpdateShowMessage() {
  showMessage.value = message.value;
}

onMounted(() => {
  // 從開發人員區手動模擬WebSocket等伺服端大量且連傳輸資料之狀況用
  window.___testSildrInPanel__ = (newValue) => (showMessage.value = newValue);
});
</script>

<template>
  <div class="slide_in_panel_page">
    <!-- Hero Section -->
    <section class="slide_in_panel_page-hero">
      <div class="slide_in_panel_page-hero-background">
        <div class="slide_in_panel_page-hero-background-overlay" />
      </div>

      <div class="slide_in_panel_page-hero-content">
        <h1 class="slide_in_panel_page-hero-content-title">
          {{ $t('slide_in_panel_page.hero.title') }}
        </h1>
        <p class="slide_in_panel_page-hero-content-subtitle">
          {{ $t('slide_in_panel_page.hero.subtitle') }}
        </p>
        <p class="slide_in_panel_page-hero-content-description">
          {{ $t('slide_in_panel_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="slide_in_panel_page-section">
      <div class="slide_in_panel_page-describe">
        <p class="slide_in_panel_page-describe-text">
          {{ $t('slide_in_panel_page.describe.text') }}
        </p>
        <span class="slide_in_panel_page-describe-note">（</span>
        <del class="slide_in_panel_page-describe-strikethrough">{{
          $t('slide_in_panel_page.describe.strikethrough')
        }}</del>
        <span class="slide_in_panel_page-describe-note">）</span>
      </div>

      <form
        class="slide_in_panel_page-form"
        @submit.prevent="handleUpdateShowMessage"
      >
        <v-text-field
          v-model="message"
          clearable
          :label="$t('slide_in_panel_page.form.message_label')"
          class="slide_in_panel_page-form-input"
        />

        <v-checkbox
          v-model="leftEnter"
          class="slide_in_panel_page-form-checkbox"
          :label="$t('slide_in_panel_page.form.left_enter_label')"
          color="primary"
          hide-details
          :value="true"
        />

        <div class="slide_in_panel_page-form-submit">
          <v-btn color="primary" type="submit" size="large">{{
            $t('slide_in_panel_page.buttons.test')
          }}</v-btn>
        </div>

        <TabsBar
          v-model="tab"
          class="slide_in_panel_page-form-tabs"
          gap="16px"
          border-side-height="2px"
          border-side-width="30px"
          border-side-color="#27C5C3"
          :tab-list="tabList"
        />
        <TabsContent
          v-model="tab"
          class="slide_in_panel_page-form-tabs_content"
          height="100%"
          tabs-content-height="70%"
          :tab-list="tabList"
          :slot-name-is-default="true"
        >
          <template #default="{ item }">
            <div
              class="slide_in_panel_page-form-tabs_content-item"
              :item="item"
            >
              <p class="slide_in_panel_page-form-tabs_content-item-text">
                {{ item }}
              </p>
              <p class="slide_in_panel_page-form-tabs_content-item-text">
                {{ item }}
              </p>
              <p class="slide_in_panel_page-form-tabs_content-item-text">
                {{ item }}
              </p>
              <p class="slide_in_panel_page-form-tabs_content-item-text">
                {{ item }}
              </p>
              <p class="slide_in_panel_page-form-tabs_content-item-text">
                {{ item }}
              </p>
              <SlideInPanel
                v-model="showMessage"
                bottom="0px"
                z-index="3"
                :timeout="3000000"
                container-position="absolute"
                :left-enter="leftEnter"
              />
            </div>
          </template>
        </TabsContent>
      </form>
    </section>
  </div>
</template>

<style lang="scss">
.slide_in_panel_page {
  // ========================================
  // Hero Section
  // ========================================
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
        margin: 0 0 12px 0;
        font-size: 42px;
        font-weight: 800;
        color: #ffffff;
        animation: fade-in-up 0.6s ease-out;

        @media (max-width: 768px) {
          font-size: 32px;
        }
      }

      &-subtitle {
        margin: 0 0 16px 0;
        font-size: 20px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.95);
        animation: fade-in-up 0.6s ease-out 0.1s both;
      }

      &-description {
        margin: 0;
        font-size: 16px;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.9);
        animation: fade-in-up 0.6s ease-out 0.2s both;
      }
    }
  }

  &-section {
    padding: 40px 20px;
    max-width: 1000px;
    margin: 0 auto;
  }

  &-describe {
    margin-bottom: 24px;
    text-align: center;

    &-text,
    &-note,
    &-strikethrough {
      display: inline;
    }
  }

  &-form {
    display: flex;
    flex-direction: column;
    min-height: 60vh;

    &-input {
      margin-bottom: 16px;
    }

    &-checkbox {
      margin-bottom: 16px;
    }

    &-submit {
      margin-bottom: 24px;
    }

    &-tabs {
      margin-bottom: 16px;
    }

    &-tabs_content {
      flex: 1;
      overflow: hidden;

      &-item {
        position: relative;
        overflow: hidden;

        &-text {
          margin-bottom: 8px;
        }
      }
    }
  }
}
</style>
