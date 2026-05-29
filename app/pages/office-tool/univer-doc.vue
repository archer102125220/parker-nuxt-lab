<script setup>
const { locale } = useI18n();
const route = useRoute();
const univerStore = useUniverStore();

const unitId = computed(() => route.query.unit);
</script>

<template>
  <div class="univer_doc_page">
    <div class="univer_doc_page-remark">
      <p class="univer_doc_page-remark-title">
        💡
        <b class="univer_doc_page-remark-bold">{{
          $t('univer_doc_page.remark.lock_title')
        }}</b>
      </p>
      <ul class="univer_doc_page-remark-list">
        <li class="univer_doc_page-remark-list-item">
          <b class="univer_doc_page-remark-bold">
            {{ $t('univer_doc_page.remark.local_export') }}
          </b>
          {{ $t('univer_doc_page.remark.local_export_desc') }}
        </li>
        <li class="univer_doc_page-remark-list-item">
          <b class="univer_doc_page-remark-bold">{{
            $t('univer_doc_page.remark.server_export')
          }}</b>
          {{ $t('univer_doc_page.remark.server_export_desc') }}
        </li>
      </ul>
      <p class="univer_doc_page-remark-title" css-is-spacing="true">
        ⚠️
        <b class="univer_doc_page-remark-bold">{{
          $t('univer_doc_page.remark.univer_title')
        }}</b>
      </p>
      <ul class="univer_doc_page-remark-list">
        <li class="univer_doc_page-remark-list-item">
          {{ $t('univer_doc_page.remark.univer_npm') }}
        </li>
        <li class="univer_doc_page-remark-list-item">
          {{ $t('univer_doc_page.remark.univer_stability_1') }}
          <b class="univer_doc_page-remark-bold">{{
            $t('univer_doc_page.remark.univer_stability_2')
          }}</b>
          {{ $t('univer_doc_page.remark.univer_stability_3') }}
        </li>
        <li class="univer_doc_page-remark-list-item">
          {{ $t('univer_doc_page.remark.univer_cdn_wait_1')
          }}<b class="univer_doc_page-remark-bold">{{
            $t('univer_doc_page.remark.univer_cdn_wait_2')
          }}</b
          >{{ $t('univer_doc_page.remark.univer_cdn_wait_3') }}
        </li>
      </ul>
    </div>
    <div class="univer_doc_page-tools">
      <label for="role_select">{{
        $t('univer_doc_page.tools.current_role')
      }}</label>
      <select
        id="role_select"
        v-model="univerStore.currentUserRole"
        class="univer_doc_page-tools-select"
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
    <UniverDocEditor :locale="locale" :unit-id="unitId" />
  </div>
</template>

<style lang="scss" scoped>
.univer_doc_page {
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
