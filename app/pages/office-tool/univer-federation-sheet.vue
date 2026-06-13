<script setup>
const { locale, t } = useI18n();
const route = useRoute();
const system = useSystemStore();
const univerStore = useUniverStore();

const isCollaboration = ref(false);
const isLiveShare = ref(false);

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
        text: `${t('univer_federation_sheet_page.create_room_fail_title')}${JSON.stringify(data)}`,
        type: 'error'
      });
    }
  } catch (error) {
    console.error('Create room error:', error);
    system.setMessageState({
      text: t('univer_federation_sheet_page.create_room_fail_desc'),
      type: 'error'
    });
  }
  system.setLoading(false);
}
</script>

<template>
  <div class="univer_federation_sheet_page">
    <div class="univer_federation_sheet_page-warning">
      <div class="univer_federation_sheet_page-warning-title">
        <span class="univer_federation_sheet_page-warning-title-icon">⚠️</span>
        <span class="univer_federation_sheet_page-warning-title-text">{{ $t('univer_federation_sheet_page.warning.title') }}</span>
      </div>
      <ul class="univer_federation_sheet_page-warning-list">
        <li class="univer_federation_sheet_page-warning-list-item">
          <span class="univer_federation_sheet_page-warning-list-item-title">{{ $t('univer_federation_sheet_page.warning.collab') }}</span>
          <span class="univer_federation_sheet_page-warning-list-item-desc">{{ $t('univer_federation_sheet_page.warning.collab_desc') }}</span>
        </li>
        <li class="univer_federation_sheet_page-warning-list-item">
          <span class="univer_federation_sheet_page-warning-list-item-title">{{ $t('univer_federation_sheet_page.warning.room') }}</span>
          <span class="univer_federation_sheet_page-warning-list-item-desc">{{ $t('univer_federation_sheet_page.warning.room_desc') }}</span>
        </li>
        <li class="univer_federation_sheet_page-warning-list-item">
          <span class="univer_federation_sheet_page-warning-list-item-title">{{ $t('univer_federation_sheet_page.warning.export') }}</span>
          <span class="univer_federation_sheet_page-warning-list-item-desc">{{ $t('univer_federation_sheet_page.warning.export_desc') }}</span>
        </li>
        <li class="univer_federation_sheet_page-warning-list-item">
          <span class="univer_federation_sheet_page-warning-list-item-desc">{{ $t('univer_federation_sheet_page.warning.overall_desc') }}</span>
        </li>
      </ul>
    </div>
    <div class="univer_federation_sheet_page-tools">
      <div class="univer_federation_sheet_page-tools-role">
        <label for="role_select">{{ $t('univer_federation_sheet_page.tools.current_role') }}</label>
        <select
          id="role_select"
          v-model="univerStore.currentUserRole"
          class="univer_federation_sheet_page-tools-role-select"
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
      <div class="univer_federation_sheet_page-tools-online">
        <span class="univer_federation_sheet_page-tools-online-label">{{ $t('univer_federation_sheet_page.tools.online_users') }}</span>
        <div class="univer_federation_sheet_page-tools-online-unit">
          <input
            v-model="inputUnitId"
            type="text"
            class="univer_federation_sheet_page-tools-online-unit-collaboration_room"
            :placeholder="$t('univer_federation_sheet_page.tools.input_room_id')"
            :disabled="isCollaboration === false"
            @keyup.enter="joinRoom"
          />
          <button
            class="univer_federation_sheet_page-tools-online-unit-join_btn"
            :disabled="isCollaboration === false || inputUnitId === ''"
            @click="joinRoom"
          >
            {{ $t('univer_federation_sheet_page.tools.join') }}
          </button>
        </div>
        <button
          class="univer_federation_sheet_page-tools-online-create_btn"
          :disabled="isCollaboration === false"
          @click="createRoom"
        >
          {{ $t('univer_federation_sheet_page.tools.create_room') }}
        </button>
        <div class="univer_federation_sheet_page-tools-online-collaboration">
          <label for="collaboration_checkbox">{{ $t('univer_federation_sheet_page.tools.collab_edit') }}</label>
          <input
            id="collaboration_checkbox"
            v-model="isCollaboration"
            type="checkbox"
          />
        </div>
        <div class="univer_federation_sheet_page-tools-online-live_share">
          <label
            for="live_share_checkbox"
            class="univer_federation_sheet_page-tools-online-live_share-label"
            :disabled="isCollaboration === false"
          >
            {{ $t('univer_federation_sheet_page.tools.live_share') }}
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
    <div v-if="!unitId && isCollaboration" class="univer_federation_sheet_page-empty">
      <p>{{ $t('univer_federation_sheet_page.empty_room') }}</p>
    </div>
    <FederationUniverSheet
      v-else
      :key="unitId"
      class="univer_federation_sheet_page-editor"
      :license="license"
      :locale="locale"
      :unit-id="unitId"
      :collaboration="isCollaboration"
      :live-share="isCollaboration && isLiveShare"
    />
  </div>
</template>

<style lang="scss">
#univer-history-container {
  top: 61px !important;
}
</style>

<style lang="scss" scoped>
%bold {
  font-weight: bold;
}
.univer_federation_sheet_page {
  height: 90vh;

  &-warning {
    padding: 12px 16px;
    background-color: #f8d7da;
    color: #721c24;
    border-bottom: 1px solid #f5c6cb;
    font-size: 14px;
    line-height: 1.5;
    border-radius: 10px;
    margin-bottom: 16px;

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
          @extend .univer_federation_sheet_page-tools-role-select;
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
        @extend .univer_federation_sheet_page-tools-online-unit-join_btn;

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
        @extend .univer_federation_sheet_page-tools-online-collaboration;

        &-label[disabled='true'] {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }
  }

  &-empty {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - 50px);
    color: #6c757d;
    font-size: 16px;
    background-color: #fff;
  }

  &-editor {
    flex: 1;
  }
}
</style>
