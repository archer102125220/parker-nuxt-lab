<template>
  <div class="triangle_test_page">
    <div class="triangle_test_page-cases_1" />
    <div class="triangle_test_page-cases_2" />
    <div class="triangle_test_page-cases_3" />
    <div class="triangle_test_page-cases_4" />
    <div class="triangle_test_page-cases_5" />
    <div class="triangle_test_page-cases_6" />

    <Triangle size="100px" />

    <div class="triangle_test_page-cases_7">
      <Triangle size="100px" angle-upper-left />
      <Triangle size="100px" color="rgb(147, 147, 255)" angle-lower-right />
    </div>
    <div class="triangle_test_page-cases_7">
      <Triangle size="100px" angle-lower-left />
      <Triangle size="100px" angle-upper-right />
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'css三角形測試'
});
</script>

<style lang="scss">
// https://www.cnblogs.com/weiqinl/p/7048205.html
.triangle_test_page {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &-cases_1 {
    width: 0px;
    height: 0px;
    border-color: rgb(255, 121, 121) rgb(147, 147, 255) rgb(147, 147, 255)
      rgb(255, 121, 121);
    border-width: 50px 50px 50px 50px;
    border-style: solid;
  }

  &-cases_2 {
    width: 0px;
    height: 0px;
    border-color: transparent rgb(255, 121, 121);
    border-width: 0px 0px 50px 50px;
    border-style: solid;
  }

  &-cases_3 {
    width: 0px;
    height: 0px;
    border-color: rgb(255, 121, 121) transparent;
    border-width: 0px 0px 50px 50px;
    border-style: solid;
  }

  &-cases_4 {
    width: 0px;
    height: 0px;
    border-color: rgb(255, 121, 121) transparent;
    border-width: 50px 50px 0px 0px;
    border-style: solid;
  }

  &-cases_5 {
    width: 0px;
    height: 0px;
    border-color: transparent rgb(255, 121, 121);
    border-width: 0px 50px 50px 0px;
    border-style: solid;
  }

  &-cases_6 {
    width: 0px;
    height: 0px;
    border-color: rgb(255, 121, 121) transparent;
    border-width: 0px 50px 50px 0px;
    border-style: solid;
  }

  &-cases_7 {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    align-content: center;
  }
}
</style>
