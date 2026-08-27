<script setup>
useHeadMataData({
  title: 'css三角形測試'
});
</script>

<template>
  <div class="triangle_test_page">
    <!-- Hero Section -->
    <section class="triangle_test_page-hero">
      <div class="triangle_test_page-hero-background">
        <div class="triangle_test_page-hero-background-overlay" />
      </div>

      <div class="triangle_test_page-hero-content">
        <h1 class="triangle_test_page-hero-content-title">
          {{ $t('triangle_test_page.hero.title') }}
        </h1>
        <p class="triangle_test_page-hero-content-subtitle">
          {{ $t('triangle_test_page.hero.subtitle') }}
        </p>
        <p class="triangle_test_page-hero-content-description">
          {{ $t('triangle_test_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="triangle_test_page-section">
      <div class="triangle_test_page-demo">
        <div class="triangle_test_page-demo-cases_1" />
        <div class="triangle_test_page-demo-cases_2" />
        <div class="triangle_test_page-demo-cases_3" />
        <div class="triangle_test_page-demo-cases_4" />
        <div class="triangle_test_page-demo-cases_5" />
        <div class="triangle_test_page-demo-cases_6" />

        <Triangle size="100px" />

        <div class="triangle_test_page-demo-cases_7">
          <Triangle size="100px" angle-upper-left />
          <Triangle size="100px" color="rgb(147, 147, 255)" angle-lower-right />
        </div>
        <div class="triangle_test_page-demo-cases_7">
          <Triangle size="100px" angle-lower-left />
          <Triangle size="100px" angle-upper-right />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
// https://www.cnblogs.com/weiqinl/p/7048205.html
.triangle_test_page {
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
    padding: 40px 20px;
  }

  &-demo {
    display: flex;
    flex-direction: column;
    gap: 16px;

    &-cases_1 {
      width: 0px;
      height: 0px;
      border-width: 50px 50px 50px 50px;
      border-style: solid;
      border-color: rgb(255, 121, 121) rgb(147, 147, 255) rgb(147, 147, 255)
        rgb(255, 121, 121);
    }

    &-cases_2 {
      width: 0px;
      height: 0px;
      border-width: 0px 0px 50px 50px;
      border-style: solid;
      border-color: transparent rgb(255, 121, 121);
    }

    &-cases_3 {
      width: 0px;
      height: 0px;
      border-width: 0px 0px 50px 50px;
      border-style: solid;
      border-color: rgb(255, 121, 121) transparent;
    }

    &-cases_4 {
      width: 0px;
      height: 0px;
      border-width: 50px 50px 0px 0px;
      border-style: solid;
      border-color: rgb(255, 121, 121) transparent;
    }

    &-cases_5 {
      width: 0px;
      height: 0px;
      border-width: 0px 50px 50px 0px;
      border-style: solid;
      border-color: transparent rgb(255, 121, 121);
    }

    &-cases_6 {
      width: 0px;
      height: 0px;
      border-width: 0px 50px 50px 0px;
      border-style: solid;
      border-color: rgb(255, 121, 121) transparent;
    }

    &-cases_7 {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      align-items: center;
      align-content: center;
    }
  }
}
</style>
