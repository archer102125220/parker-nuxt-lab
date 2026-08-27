<script setup>
const { t } = useI18n();

useHeadMataData({
  title: t('hexagon_test_page.hero.title')
});
</script>

<template>
  <div class="hexagon_page">
    <!-- Hero Section -->
    <section class="hexagon_page-hero">
      <div class="hexagon_page-hero-background">
        <div class="hexagon_page-hero-background-overlay" />
      </div>

      <div class="hexagon_page-hero-content">
        <h1 class="hexagon_page-hero-content-title">
          {{ $t('hexagon_test_page.hero.title') }}
        </h1>
        <p class="hexagon_page-hero-content-subtitle">
          {{ $t('hexagon_test_page.hero.subtitle') }}
        </p>
        <p class="hexagon_page-hero-content-description">
          {{ $t('hexagon_test_page.hero.description') }}
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="hexagon_page-section">
      <Hexagon class="hexagon_page-demo-component" />
      <HexagonContainer class="hexagon_page-demo-hexagon_container">
        <p>987654321</p>
        <p>87654321</p>
        <p>7654321</p>
        <p>654321</p>
        <p>54321</p>
        <p>4321</p>
        <p>321</p>
        <p>21</p>
        <p>1</p>
      </HexagonContainer>
      <HexagonContainer
        width="50px"
        height="60px"
        class="hexagon_page-demo-hexagon_container"
        mask-color="#fff"
      >
        <p>987654321</p>
        <p>87654321</p>
        <p>7654321</p>
        <p>654321</p>
        <p>54321</p>
        <p>4321</p>
        <p>321</p>
        <p>21</p>
        <p>1</p>
      </HexagonContainer>
      <div class="hexagon_page-demo-drawing_container">
        <div class="hexagon_page-demo-drawing_container-drawing" />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@mixin triangle {
  /* Positioning */
  position: absolute; /* 絕對定位,相對於 .hexagon */

  /* Display & Box Model */
  width: 0;
  border-left: calc(var(--hexagon_width) / 2) solid transparent; /* 三角形的左邊框,寬度是 .hexagon 寬度的一半 */
  border-right: calc(var(--hexagon_width) / 2) solid transparent; /* 三角形的右邊框,寬度是 .hexagon 寬度的一半 */

  /* Misc */
  content: ''; /* 偽元素必須有 content 屬性 */
}
.hexagon_page {
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
    &-component {
      margin-bottom: 100px;
    }

    &-hexagon_container {
      margin-bottom: 100px;
      overflow: hidden;
      background-color: #f8f9fa;
    }

    &-drawing_container {
      /* Display & Box Model */
      --hexagon_width: 100px;
      // height: 200px;
      width: var(--hexagon_width);

      // margin-top: 100px;

      &-drawing {
        /* Positioning */
        position: relative; /* 為了讓偽元素可以相對於它定位 */

        /* Display & Box Model */
        --hexagon_height: calc(
          var(--hexagon_width) * 1.73205 / 3
        ); /* sqrt(3) 的近似值約為 1.73205 */

        // width: 100px; /* 六邊形中間矩形部分的寬度 */
        // height: 57.735px; /* 六邊形中間矩形部分的高度 (寬度 * sqrt(3)/2 的一半,再乘以2) */
        width: var(--hexagon_width);
        // height: calc(var(--hexagon_width) * 1.73205 / 2);
        height: var(--hexagon_height);
        margin: calc(var(--hexagon_height) / 2) 0; /* 上下邊距,用來容納偽元素的高度 (高度的一半) */

        /* Visual */
        background-color: #6a0dad; /* 六邊形的顏色 (這裡用紫色作範例) */

        &::before {
          @include triangle;
          /* Positioning */
          bottom: 99%; /* 定位在 .hexagon 的下方 */

          /* Display & Box Model */
          // border-bottom: 28.8675px solid #6a0dad; /* 上方三角形的底邊,高度是 .hexagon 高度的一半,顏色與六邊形相同 */
          border-bottom: calc(var(--hexagon_height) / 2) solid #6a0dad; /* 上方三角形的底邊,高度是 .hexagon 高度的一半,顏色與六邊形相同 */
        }
        &::after {
          @include triangle;
          /* Positioning */
          top: 99%; /* 定位在 .hexagon 的上方 */

          /* Display & Box Model */
          width: 0;
          // border-top: 28.8675px solid #6a0dad; /* 下方三角形的頂邊,高度是 .hexagon 高度的一半,顏色與六邊形相同 */
          border-top: calc(var(--hexagon_height) / 2) solid #6a0dad; /* 下方三角形的頂邊,高度是 .hexagon 高度的一半,顏色與六邊形相同 */
        }
      }
    }
  }
}
</style>
