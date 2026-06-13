<script setup>
const { locale } = useI18n();
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
        text: '無法建立房間：' + JSON.stringify(data),
        type: 'error'
      });
    }
  } catch (error) {
    console.error('Create room error:', error);
    system.setMessageState({
      text: '建立房間失敗，請查看 Console。',
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
        <span class="univer_federation_doc_page-remark-title-text">鎖定狀態匯出說明：</span>
      </div>
      <ul class="univer_federation_doc_page-remark-list">
        <li class="univer_federation_doc_page-remark-list-item">
          <span class="univer_federation_doc_page-remark-list-item-title">Local Export (JSON Snapshot)：</span>
          <span class="univer_federation_doc_page-remark-list-item-desc">可以保留鎖定狀態。自訂區域屬性會記錄於 Snapshot 中，重新載入 JSON 後依然生效。</span>
        </li>
        <li class="univer_federation_doc_page-remark-list-item">
          <span class="univer_federation_doc_page-remark-list-item-title">Server Export (DOCX/XLSX)：</span>
          <span class="univer_federation_doc_page-remark-list-item-desc">無法保留鎖定狀態。標準 Office 格式不支援 Univer 自訂的區域鎖定機制，匯出的實體檔案將不含編輯限制。</span>
        </li>
      </ul>
    </div>
    <div class="univer_federation_doc_page-warning">
      <div class="univer_federation_doc_page-warning-title">
        <span class="univer_federation_doc_page-warning-title-icon">⚠️</span>
        <span class="univer_federation_doc_page-warning-title-text">線上環境功能限制說明：</span>
      </div>
      <ul class="univer_federation_doc_page-warning-list">
        <li class="univer_federation_doc_page-warning-list-item">
          <span class="univer_federation_doc_page-warning-list-item-title">協同編輯 / 演示跟隨：</span>
          <span class="univer_federation_doc_page-warning-list-item-desc">依賴後端 universer 服務進行 WebSocket 訊息廣播，以及 collaboration-server 處理 OT (Operational Transformation) 演算法同步。</span>
        </li>
        <li class="univer_federation_doc_page-warning-list-item">
          <span class="univer_federation_doc_page-warning-list-item-title">新建 / 加入房間：</span>
          <span class="univer_federation_doc_page-warning-list-item-desc">依賴 collaboration-helper 服務生成與儲存檔案快照 (Snapshot API)。</span>
        </li>
        <li class="univer_federation_doc_page-warning-list-item">
          <span class="univer_federation_doc_page-warning-list-item-title">實體檔案匯出 (XLSX)：</span>
          <span class="univer_federation_doc_page-warning-list-item-desc">若需在伺服器端轉換並匯出實體 Office 檔案，需依賴高運算資源的 exchange worker 服務。</span>
        </li>
        <li class="univer_federation_doc_page-warning-list-item">
          <span class="univer_federation_doc_page-warning-list-item-desc">若在線上環境中遇到功能失效或 API 報錯，通常是因為缺乏上述後端 Docker 微服務所導致（例如 /universer-api ），由於目前是 Vercel 做上線部署，因此若要測試需自行 clone 專案到本地端串接 univer docker 服務。</span>
        </li>
      </ul>
    </div>
    <div class="univer_federation_doc_page-tools">
      <div class="univer_federation_doc_page-tools-role">
        <label for="role_select">當前測試身份：</label>
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
        <div class="univer_federation_doc_page-tools-online-unit">
          <input
            v-model="inputUnitId"
            type="text"
            class="univer_federation_doc_page-tools-online-unit-collaboration_room"
            placeholder="輸入房間 ID"
            :disabled="isCollaboration === false"
            @keyup.enter="joinRoom"
          />
          <button
            class="univer_federation_doc_page-tools-online-unit-join_btn"
            :disabled="isCollaboration === false || inputUnitId === ''"
            @click="joinRoom"
          >
            加入
          </button>
        </div>
        <button
          class="univer_federation_doc_page-tools-online-create_btn"
          :disabled="isCollaboration === false"
          @click="createRoom"
        >
          新建房間
        </button>
        <div class="univer_federation_doc_page-tools-online-collaboration">
          <label for="collaboration_checkbox">協同編輯</label>
          <input
            id="collaboration_checkbox"
            v-model="isCollaboration"
            type="checkbox"
          />
        </div>
      </div>
    </div>
    <div
      v-if="!unitId && isCollaboration"
      class="univer_federation_doc_page-empty"
    >
      <p>目前沒有指定房間，請先「新建協同房間」以測試協同編輯功能。</p>
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
