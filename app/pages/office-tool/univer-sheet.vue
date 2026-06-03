<script setup>
const { locale } = useI18n();
const route = useRoute();
const system = useSystemStore();
const univerStore = useUniverStore();
const isCollaboration = ref(false);
const isLiveShare = ref(false);

const unitId = ref('');
const inputUnitId = ref('');

watch(
  () => [route.query.unitId, route.query.unit],
  ([newUnitId, newUnit]) => {
    unitId.value = newUnitId || newUnit || '';
    inputUnitId.value = newUnitId || newUnit || '';
  },
  { immediate: true }
);

function joinRoom() {
  unitId.value = inputUnitId.value;
}

async function createRoom() {
  system.setLoading(true);
  try {
    const res = await fetch('/universer-api/snapshot/2/unit/-/create', {
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
  <div class="univer_sheet_page">
    <div class="univer_sheet_page-remark">
      <p class="univer_sheet_page-remark-title">
        ⚠️
        <b class="univer_sheet_page-remark-bold">{{
          $t('univer_sheet_page.remark.univer_title')
        }}</b>
      </p>
      <ul class="univer_sheet_page-remark-list">
        <li class="univer_sheet_page-remark-list-item">
          {{ $t('univer_sheet_page.remark.univer_npm') }}
          {{ $t('univer_sheet_page.remark.univer_npm_demo_1') }}
          <a
            href="https://archer102125220.github.io/parker-vue-lab/sheet-editor/univer"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ $t('univer_sheet_page.remark.univer_npm_demo_link') }}
          </a>
          {{ $t('univer_sheet_page.remark.univer_npm_demo_2') }}
        </li>
        <li class="univer_sheet_page-remark-list-item">
          {{ $t('univer_sheet_page.remark.univer_stability_1')
          }}<b class="univer_sheet_page-remark-bold">{{
            $t('univer_sheet_page.remark.univer_stability_2')
          }}</b
          >{{ $t('univer_sheet_page.remark.univer_stability_3') }}
        </li>
        <li class="univer_sheet_page-remark-list-item">
          {{ $t('univer_sheet_page.remark.univer_cdn_wait_1')
          }}<b class="univer_sheet_page-remark-bold">{{
            $t('univer_sheet_page.remark.univer_cdn_wait_2')
          }}</b
          >{{ $t('univer_sheet_page.remark.univer_cdn_wait_3') }}
        </li>
      </ul>
    </div>
    <div class="univer_sheet_page-warning">
      <p>⚠️ <b>線上環境功能限制說明：</b></p>
      <ul>
        <li>
          <b>協同編輯 / 演示跟隨：</b> 依賴後端 <code>universer</code> 服務進行
          WebSocket 訊息廣播，以及 <code>collaboration-server</code> 處理 OT
          (Operational Transformation) 演算法同步。
        </li>
        <li>
          <b>新建 / 加入房間：</b> 依賴
          <code>collaboration-helper</code> 服務生成與儲存檔案快照 (Snapshot
          API)。
        </li>
        <li>
          <b>實體檔案匯出 (XLSX)：</b> 若需在伺服器端轉換並匯出實體 Office
          檔案，需依賴高運算資源的 <code>exchange worker</code> 服務。
        </li>
        <li>
          若在線上環境中遇到功能失效或 API 報錯，通常是因為缺乏上述後端 Docker
          微服務所導致（例如 <code>/universer-api</code>），由於目前是 github
          static page 做上線部署，因此若要測試需自行 clone 專案到本地端串接
          univer docker 服務。
        </li>
      </ul>
    </div>
    <div class="univer_sheet_page-tools">
      <div class="univer_sheet_page-tools-role">
        <label for="role_select">{{
          $t('univer_sheet_page.tools.current_role')
        }}</label>
        <select
          id="role_select"
          v-model="univerStore.currentUserRole"
          class="univer_sheet_page-tools-role-select"
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
      <div class="univer_sheet_page-tools-online">
        <div class="univer_sheet_page-tools-online-unit">
          <input
            v-model="inputUnitId"
            type="text"
            class="univer_sheet_page-tools-online-unit-collaboration_room"
            placeholder="輸入房間 ID"
            :disabled="isCollaboration === false"
            @keyup.enter="joinRoom"
          />
          <button
            class="univer_sheet_page-tools-online-unit-join_btn"
            :disabled="isCollaboration === false"
            @click="joinRoom"
          >
            加入
          </button>
        </div>
        <button
          class="univer_sheet_page-tools-online-create_btn"
          :disabled="isCollaboration === false"
          @click="createRoom"
        >
          新建房間
        </button>
        <div class="univer_sheet_page-tools-online-collaboration">
          <label for="collaboration_checkbox">協同編輯</label>
          <input
            id="collaboration_checkbox"
            v-model="isCollaboration"
            type="checkbox"
          />
        </div>
        <div class="univer_sheet_page-tools-online-live_share">
          <label
            for="live_share_checkbox"
            class="univer_sheet_page-tools-online-live_share-label"
            :disabled="isCollaboration === false"
          >
            演示跟隨
          </label>
          <input
            id="live_share_checkbox"
            v-model="isLiveShare"
            type="checkbox"
            :disabled="isCollaboration === false"
          />
        </div>
      </div>
    </div>
    <div v-if="!unitId && isCollaboration" class="univer_sheet_page-empty">
      <p>目前沒有指定房間，請先「新建協同房間」以測試協同編輯功能。</p>
    </div>
    <UniverSheetEditor
      v-else
      :key="unitId"
      class="univer_sheet_page-editor"
      :locale="locale"
      :unit-id="unitId"
      :collaboration="isCollaboration"
      :live-share="isCollaboration && isLiveShare"
    />
  </div>
</template>

<style lang="scss" scoped>
.univer_sheet_page {
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
    }

    &-list {
      margin: 0;
      padding-left: 20px;
    }

    &-bold {
      font-weight: bold;
    }
  }

  &-warning {
    padding: 12px 16px;
    background-color: #f8d7da;
    color: #721c24;
    border-bottom: 1px solid #f5c6cb;
    font-size: 14px;
    line-height: 1.5;
    border-radius: 10px;
    margin-bottom: 16px;

    p {
      margin: 0 0 4px 0;
    }

    ul {
      margin: 0;
      padding-left: 20px;
    }

    b {
      font-weight: bold;
    }

    code {
      background-color: rgba(0, 0, 0, 0.05);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 0.9em;
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
          @extend .univer_sheet_page-tools-role-select;
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

      &-create_btn {
        @extend .univer_sheet_page-tools-online-unit-join_btn;

        background-color: transparent;
        border-color: #007bff;
        color: #007bff;

        &:not([disabled]):hover {
          background-color: #007bff;
          color: #fff;
        }
      }

      &-collaboration {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      &-live_share {
        @extend .univer_sheet_page-tools-online-collaboration;

        &-label[disabled='true'] {
          opacity: 0.5;
          cursor: not-allowed;
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
}
</style>
