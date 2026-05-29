<script setup>
const { locale } = useI18n();
const route = useRoute();
const univerStore = useUniverStore();

const unitId = computed(() => route.query.unit);
</script>

<template>
  <div class="univer_sheet_page">
    <div class="univer_sheet_page-remark">
      <p class="univer_sheet_page-remark-title">⚠️ <b class="univer_sheet_page-remark-bold">Univer 載入與穩定度說明：</b></p>
      <ul class="univer_sheet_page-remark-list">
        <li class="univer_sheet_page-remark-list-item">
          Univer 的 npm 版在 Nuxt 上疑似因為打包轉譯設定的問題，光是載入就會觸發無盡 rerender，因此改用 CDN 的方式處理。
        </li>
        <li class="univer_sheet_page-remark-list-item">
          目前 Sheet 版本發展相對成熟，不太會出現無法正常載入的狀況。但若依然遇到編輯器沒有正常載入的情形，請嘗試<b class="univer_sheet_page-remark-bold">重新整理頁面</b>來讓 Univer 套件重新載入。
        </li>
        <li class="univer_sheet_page-remark-list-item">
          需要注意的是，由於改用 CDN 載入，初次載入的等待時間會比直接使用 npm 版本<b class="univer_sheet_page-remark-bold">久上許多</b>，請耐心等候。
        </li>
      </ul>
    </div>
    <div class="univer_sheet_page-tools">
      <label for="role_select">當前測試身份：</label>
      <select
        id="role_select"
        v-model="univerStore.currentUserRole"
        class="univer_sheet_page-tools-select"
      >
        <option
          v-for="role in univerStore.availableRoles"
          :key="role.value"
          :value="role.value"
        >
          {{ role.label }} ({{ role.value }})
        </option>
      </select>
    </div>
    <UniverSheetEditor :locale="locale" :unit-id="unitId" />
  </div>
</template>

<style lang="scss" scoped>
.univer_sheet_page {
  height: 90vh;

  &-remark {
    padding: 12px 16px;
    background-color: #fff3cd;
    color: #856404;
    border-bottom: 1px solid #ffeeba;
    font-size: 14px;
    line-height: 1.5;
    border-radius: 10px;
    margin-bottom: 16px;

    &-title {
      margin: 0 0 4px 0;

      &[css-is-spacing='true'] {
        margin-top: 12px;
      }
    }

    &-list {
      margin: 0;
      padding-left: 20px;
    }

    &-bold {
      font-weight: bold;
    }
  }

  &-tools {
    padding: 10px 16px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;

    &-select {
      padding: 4px 8px;
      border: 1px solid #ced4da;
      border-radius: 4px;
      background-color: #fff;
      min-width: 150px;
      outline: none;

      &:focus {
        border-color: #80bdff;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
      }
    }
  }
}
</style>
