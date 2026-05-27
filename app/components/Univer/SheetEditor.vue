<script>
import {
  LOCALE_TYPE,
  EVENT_TYPE,
  createSheetInstance
} from '@app/utils/third-party/univer/create-sheet';

import {
  fetchUniverSnapshot,
  UniverInstanceType
} from '@app/utils/third-party/univer/snapshot';

export { LOCALE_TYPE, EVENT_TYPE };
</script>

<script setup>
defineOptions({
  inheritAttrs: false
});

const disposableList = [];

const props = defineProps({
  locale: {
    type: String,
    default() {
      return LOCALE_TYPE?.list?.ZH_TW || 'zhTW';
    }
  },
  value: {
    type: Object,
    default: () => ({
      id: 'dQaYwz',
      sheetOrder: ['vYn9cBtHzC_Yp1qUiZSj2'],
      name: '',
      appVersion: '0.22.1',
      locale: 'zhCN',
      styles: {},
      sheets: {
        vYn9cBtHzC_Yp1qUiZSj2: {
          id: 'vYn9cBtHzC_Yp1qUiZSj2',
          name: 'Sheet1',
          tabColor: '',
          hidden: 0,
          rowCount: 1000,
          columnCount: 20,
          zoomRatio: 1,
          freeze: {
            xSplit: 0,
            ySplit: 0,
            startRow: -1,
            startColumn: -1
          },
          scrollTop: 0,
          scrollLeft: 0,
          defaultColumnWidth: 88,
          defaultRowHeight: 24,
          mergeData: [],
          cellData: {
            0: {
              0: {
                v: '測試預設資料',
                t: 1
              }
            }
          },
          rowData: {},
          columnData: {},
          showGridlines: 1,
          rowHeader: {
            width: 46,
            hidden: 0
          },
          columnHeader: {
            height: 20,
            hidden: 0
          },
          rightToLeft: 0
        }
      },
      resources: [
        {
          name: 'SHEET_RANGE_PROTECTION_PLUGIN',
          data: ''
        },
        {
          name: 'SHEET_AuthzIoMockService_PLUGIN',
          data: '{}'
        },
        {
          name: 'SHEET_WORKSHEET_PROTECTION_PLUGIN',
          data: '{}'
        },
        {
          name: 'SHEET_WORKSHEET_PROTECTION_POINT_PLUGIN',
          data: '{}'
        },
        {
          name: 'SHEET_DRAWING_PLUGIN',
          data: '{}'
        },
        {
          name: 'SHEET_DEFINED_NAME_PLUGIN',
          data: ''
        },
        {
          name: 'SHEET_RANGE_THEME_MODEL_PLUGIN',
          data: '{}'
        }
      ]
    })
  },
  workbook: {
    type: Object,
    default: () => ({})
  },
  worksheet: {
    type: Object,
    default: () => ({})
  },
  unitId: {
    type: String,
    default: ''
  }
});
const emits = defineEmits([
  'update:value',
  'update:workbook',
  'update:worksheet',
  'univerStarting',
  'univerReady',
  'univerRendered',
  'univerSteady',
  'univerChangeStart',
  'univerChange',
  'univerChangeEnd'
]);

const container = ref(null);

const currentWorkbook = ref({});
// const currentWorksheet = ref({});
const isRebuilding = ref(false);
const loading = ref(true);

const univerInstance = reactive({
  univer: null,
  univerAPI: null
});

async function handleUniverSheet(overrideSnapshot) {
  try {
    const { univer, univerAPI } = await createSheetInstance(
      container.value,
      props.locale,
      false
    );

    disposableList.push(
      univerAPI.addEvent(univerAPI.Event.LifeCycleChanged, (event) => {
        switch (event.stage) {
          case univerAPI.Enum.LifecycleStages.Starting:
            emits('univerStarting', event);
            break;
          case univerAPI.Enum.LifecycleStages.Ready:
            emits('univerReady', event);
            break;
          case univerAPI.Enum.LifecycleStages.Rendered:
            emits('univerRendered', event);
            break;
          case univerAPI.Enum.LifecycleStages.Steady:
            emits('univerSteady', event);
            break;
        }
      })
    );
    disposableList.push(
      univerAPI.addEvent(univerAPI.Event.SheetEditStarted, (event) => {
        emits('univerChangeStart', event);
      })
    );
    disposableList.push(
      univerAPI.addEvent(univerAPI.Event.SheetEditChanging, (event) => {
        emits('univerChange', event);
      })
    );
    disposableList.push(
      univerAPI.addEvent(univerAPI.Event.SheetEditEnded, (event) => {
        emits('univerChangeEnd', event);
        emits('update:value', event?.workbook?.save());
        emits('update:workbook', event?.workbook);
        emits('update:worksheet', event?.worksheet);
      })
    );
    if (overrideSnapshot) {
      currentWorkbook.value = univerAPI.createWorkbook(overrideSnapshot);
    } else {
      if (props.unitId) {
        try {
          const snapshot = await fetchUniverSnapshot(
            props.unitId,
            UniverInstanceType.UNIVER_SHEET
          );
          currentWorkbook.value = univerAPI.createWorkbook(snapshot);
        } catch (error) {
          console.error('Failed to fetch remote snapshot manually:', error);
          // Fallback
          currentWorkbook.value = univerAPI.createWorkbook({
            id: props.unitId
          });
        }
      } else {
        const snapshot = { ...props.value };
        currentWorkbook.value = univerAPI.createWorkbook(snapshot);
      }
    }

    univerInstance.univer = univer;
    univerInstance.univerAPI = univerAPI;
  } catch (error) {
    console.error(error);
  }

  loading.value = false;
}

function handleLocalImportEvent(customEvent) {
  const detail = customEvent.detail;
  if (detail && detail.snapshot && detail.type === 'sheet') {
    const currentUnitId = univerInstance.univerAPI
      ?.getActiveWorkbook()
      ?.getId();
    if (detail.unitId && currentUnitId && detail.unitId !== currentUnitId) {
      return; // 忽略不是由當前編輯器觸發的事件
    }
    if (univerInstance.univerAPI) {
      isRebuilding.value = true;

      try {
        // 先建立新的試算表，讓 Univer UI 自動切換過去 (UI 會正常更新)
        currentWorkbook.value = univerInstance.univerAPI.createWorkbook(
          detail.snapshot
        );

        // 註：不呼叫 disposeUnit()，因為 Univer 官方對於動態刪除當前 Unit 的支援有嚴重的 Bug
        // (會導致 SheetsSelectionsService 的 RxJS 報錯)。
        // 為了確保 SPA 畫面不崩潰且無報錯，選擇讓舊的資料保留在 Univer 的底層記憶體中，只做畫面的替換。
      } catch (err) {
        console.error('Failed to replace workbook:', err);
      }

      isRebuilding.value = false;
      loading.value = false;
    }
  }
}

function handleLocalImportEnded() {
  if (!isRebuilding.value) {
    loading.value = false;
  }
}

onMounted(() => {
  handleUniverSheet();
});

onUnmounted(() => {
  disposableList.forEach((item) => {
    try {
      item.dispose?.();
    } catch (error) {
      if (import.meta.dev) {
        console.error(error);
      }
    }
  });
  if (typeof univerInstance.univer?.dispose === 'function') {
    try {
      univerInstance.univer?.dispose();
    } catch (error) {
      if (import.meta.dev) {
        console.error(error);
      }
    }
  }
  if (typeof univerInstance.univerAPI?.dispose === 'function') {
    try {
      univerInstance.univerAPI?.dispose();
    } catch (error) {
      if (import.meta.dev) {
        console.error(error);
      }
    }
  }
  univerInstance.univer = null;
  univerInstance.univerAPI = null;
});
</script>

<template>
  <div class="univer_sheet">
    <div v-if="loading" class="univer_sheet-skeleton_wrap">
      <slot name="loading" :loading="loading">
        <SkeletonLoader
          :loading="true"
          class="univer_sheet-skeleton_wrap-skeleton"
        />
      </slot>
    </div>
    <div
      ref="container"
      class="univer_sheet-editor"
      @univer-local-import-started="loading = true"
      @univer-local-import-ended="handleLocalImportEnded"
      @univer-local-import-snapshot="handleLocalImportEvent"
      @univer-local-export-started="loading = true"
      @univer-local-export-ended="loading = false"
      @univer-exchange-started="loading = true"
      @univer-exchange-ended="loading = false"
    />
  </div>
</template>

<style lang="scss" scoped>
.univer_sheet {
  position: relative;
  height: 100%;

  &-skeleton_wrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 11; // 最小要設為 11 才蓋得掉 univer 的所有 UI

    &-skeleton {
      width: 100%;
      height: 100%;
    }
  }

  &-editor {
    height: 100%;
  }
}
</style>
