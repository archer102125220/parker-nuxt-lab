<script setup>
const { locale, t } = useI18n();
const route = useRoute();
const system = useSystemStore();
const univerStore = useUniverStore();

const isCollaboration = ref(false);
const unitId = ref('');
const inputUnitId = ref('');

const license = computed(() => import.meta.env.VITE_UNIVER_LICENSE);

watch(
  () => [route.query.unitId, route.query.unit],
  ([newUnitId, newUnit]) => {
    unitId.value = newUnitId || newUnit || '';
    inputUnitId.value = newUnitId || newUnit || '';
  },
  { immediate: true }
);

function joinRoom() {
  if (isCollaboration.value === false || inputUnitId.value === '') return;
  unitId.value = inputUnitId.value;
}

async function createRoom() {
  system.setLoading(true);
  try {
    const res = await fetch('/universer-api/snapshot/1/unit/-/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    const data = await res.json();
    if (data && data.unitID) {
      unitId.value = data.unitID;
      inputUnitId.value = data.unitID;
    } else {
      system.setMessageState({
        text: `${t('univer_federation_doc_page.create_room_fail_title')}${JSON.stringify(data)}`,
        type: 'error'
      });
    }
  } catch (error) {
    console.error('Create room error:', error);
    system.setMessageState({
      text: t('univer_federation_doc_page.create_room_fail_desc'),
      type: 'error'
    });
  }
  system.setLoading(false);
}
</script>

<template>
  <div class="univer_federation_doc_page">
    <div class="univer_federation_doc_page-remark">
      <div class="univer_federation_doc_page-remark-title">
        <span class="univer_federation_doc_page-remark-title-icon">💡</span>
        <span class="univer_federation_doc_page-remark-title-text">{{ $t('univer_federation_doc_page.remark.lock_title') }}</span>
      </div>
      <ul class="univer_federation_doc_page-remark-list">
        <li class="univer_federation_doc_page-remark-list-item">
          <span class="univer_federation_doc_page-remark-list-item-title">{{ $t('univer_federation_doc_page.remark.local_export') }}</span>
          <span class="univer_federation_doc_page-remark-list-item-desc">{{ $t('univer_federation_doc_page.remark.local_export_desc') }}</span>
        </li>
        <li class="univer_federation_doc_page-remark-list-item">
          <span class="univer_federation_doc_page-remark-list-item-title">{{ $t('univer_federation_doc_page.remark.server_export') }}</span>
          <span class="univer_federation_doc_page-remark-list-item-desc">{{ $t('univer_federation_doc_page.remark.server_export_desc') }}</span>
        </li>
      </ul>
    </div>
    <div class="univer_federation_doc_page-warning">
      <div class="univer_federation_doc_page-warning-title">
        <span class="univer_federation_doc_page-warning-title-icon">⚠️</span>
        <span class="univer_federation_doc_page-warning-title-text">{{ $t('univer_federation_doc_page.warning.title') }}</span>
      </div>
      <ul class="univer_federation_doc_page-warning-list">
        <li class="univer_federation_doc_page-warning-list-item">
          <!-- 
            使用 <i18n-t> 進行多國語系字串替換：
            1. keypath: 對應 i18n JSON 檔中定義的翻譯鍵值（字串中包含 {link} 佔位符）。
            2. tag: 指定渲染後要包裝這段翻譯的 HTML 標籤（在此為 <span>）。
            3. <template #link>: 對應翻譯字串中的 {link} 佔位符。裡面的內容（如超連結 <a>）會被插入到該佔位符的位置，避免在翻譯檔內直接寫 HTML。
          -->
          <i18n-t
            keypath="univer_federation_doc_page.warning.performance_issue"
            tag="span"
            class="univer_federation_doc_page-warning-list-item-desc"
          >
            <template #link>
              <a href="https://github.com/archer102125220/parker-vue-lab" target="_blank" rel="noopener noreferrer">{{ $t('univer_federation_doc_page.warning.parker_vue_lab') }}</a>
            </template>
          </i18n-t>
        </li>
        <li class="univer_federation_doc_page-warning-list-item">
          <span class="univer_federation_doc_page-warning-list-item-title">{{ $t('univer_federation_doc_page.warning.collab') }}</span>
          <span class="univer_federation_doc_page-warning-list-item-desc">{{ $t('univer_federation_doc_page.warning.collab_desc') }}</span>
        </li>
        <li class="univer_federation_doc_page-warning-list-item">
          <span class="univer_federation_doc_page-warning-list-item-title">{{ $t('univer_federation_doc_page.warning.room') }}</span>
          <span class="univer_federation_doc_page-warning-list-item-desc">{{ $t('univer_federation_doc_page.warning.room_desc') }}</span>
        </li>
        <li class="univer_federation_doc_page-warning-list-item">
          <span class="univer_federation_doc_page-warning-list-item-title">{{ $t('univer_federation_doc_page.warning.export') }}</span>
          <span class="univer_federation_doc_page-warning-list-item-desc">{{ $t('univer_federation_doc_page.warning.export_desc') }}</span>
        </li>
        <li class="univer_federation_doc_page-warning-list-item">
          <span class="univer_federation_doc_page-warning-list-item-desc">{{ $t('univer_federation_doc_page.warning.overall_desc') }}</span>
        </li>
      </ul>
    </div>
    <div class="univer_federation_doc_page-tools">
      <div class="univer_federation_doc_page-tools-role">
        <label for="role_select">{{ $t('univer_federation_doc_page.tools.current_role') }}</label>
        <select
          id="role_select"
          v-model="univerStore.currentUserRole"
          class="univer_federation_doc_page-tools-role-select"
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
      <div class="univer_federation_doc_page-tools-online">
        <span class="univer_federation_doc_page-tools-online-label">{{ $t('univer_federation_doc_page.tools.online_users') }}</span>
        <div class="univer_federation_doc_page-tools-online-unit">
          <input
            v-model="inputUnitId"
            type="text"
            class="univer_federation_doc_page-tools-online-unit-collaboration_room"
            :placeholder="$t('univer_federation_doc_page.tools.input_room_id')"
            :disabled="isCollaboration === false"
            @keyup.enter="joinRoom"
          />
          <button
            class="univer_federation_doc_page-tools-online-unit-join_btn"
            :disabled="isCollaboration === false || inputUnitId === ''"
            @click="joinRoom"
          >
            {{ $t('univer_federation_doc_page.tools.join') }}
          </button>
        </div>
        <button
          class="univer_federation_doc_page-tools-online-create_btn"
          :disabled="isCollaboration === false"
          @click="createRoom"
        >
          {{ $t('univer_federation_doc_page.tools.create_room') }}
        </button>
        <div class="univer_federation_doc_page-tools-online-collaboration">
          <label for="collaboration_checkbox">{{ $t('univer_federation_doc_page.tools.collab_edit') }}</label>
          <input
            id="collaboration_checkbox"
            v-model="isCollaboration"
            type="checkbox"
          />
        </div>
      </div>
    </div>
    <div v-if="!unitId && isCollaboration" class="univer_federation_doc_page-empty">
      <p>{{ $t('univer_federation_doc_page.empty_room') }}</p>
    </div>
    <FederationUniverDoc
      v-else
      :key="unitId"
      class="univer_federation_doc_page-editor"
      :license="license"
      :locale="locale"
      :unit-id="unitId"
      :collaboration="isCollaboration"
    />
  </div>
</template>

<style lang="scss" scoped>
%bold {
  font-weight: bold;
}
.univer_federation_doc_page {
  display: flex;
  flex-direction: column;
  height: calc(100vh + 155px + 180px);

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

      &-text {
        @extend %bold;
      }
    }

    &-list {
      margin: 0;
      padding-left: 20px;
      &-item {
        &-title {
          @extend %bold;
        }
      }
    }
  }

  &-warning {
    @extend .univer_federation_doc_page-remark;
    background-color: #f8d7da;
    color: #721c24;
    border-bottom-color: #f5c6cb;

    &-title {
      margin: 0 0 4px 0;

      &-text {
        @extend %bold;
      }
    }

    &-list {
      margin: 0;
      padding-left: 20px;
      &-item {
        &-title {
          @extend %bold;
        }
      }
    }
  }

  &-tools {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;

    padding: 10px 16px;
    border-bottom: 1px solid #e9ecef;
    font-size: 14px;

    background-color: #f8f9fa;

    &-role {
      &-select {
        min-width: 150px;
        padding: 4px 8px;
        border: 1px solid #ced4da;
        border-radius: 4px;
        background-color: #fff;
        outline: none;

        &:focus {
          border-color: #80bdff;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }
      }
    }

    &-online {
      display: flex;
      align-items: center;
      gap: 12px;

      &-unit {
        display: flex;
        align-items: center;
        gap: 4px;

        &-collaboration_room {
          @extend .univer_federation_doc_page-tools-role-select;
          min-width: unset;

          &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
          }
        }

        &-join_btn {
          padding: 4px 12px;
          border: 1px solid transparent;
          border-radius: 4px;
          background-color: #007bff;
          color: #fff;
          cursor: pointer;
          font-size: 14px;
          transition:
            background-color 0.2s,
            color 0.2s,
            border-color 0.2s;

          &:not([disabled]):hover {
            background-color: #0056b3;
          }
          &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
          }
        }
      }

      &-collaboration {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      &-create_btn {
        @extend .univer_federation_doc_page-tools-online-unit-join_btn;

        background-color: transparent;
        border-color: #007bff;
        color: #007bff;

        &:not([disabled]):hover {
          background-color: #007bff;
          color: #fff;
        }
      }
    }
  }

  &-empty {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #6c757d;
    font-size: 16px;
    background-color: #fff;
  }

  &-editor {
    flex: 1;
  }
}
</style>
