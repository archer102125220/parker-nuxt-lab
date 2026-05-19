<script>
import {
  LOCALE_TYPE,
  EVENT_TYPE,
  createDocInstance
} from '@app/utils/third-party/univer/create-doc';

export { LOCALE_TYPE, EVENT_TYPE };
</script>

<script setup>
defineOptions({
  inheritAttrs: false
});

const disposable = [];

const props = defineProps({
  locale: {
    type: String,
    default() {
      return LOCALE_TYPE?.list?.ZH_TW || 'zhTW';
    }
  },
  doc: {
    type: Object,
    default: () => ({
      id: 'YBLWUR',
      documentStyle: {
        pageSize: {
          width: 793.3333333333334,
          height: 1122.6666666666667
        },
        documentFlavor: 1,
        marginTop: 50,
        marginBottom: 50,
        marginRight: 50,
        marginLeft: 50,
        renderConfig: {
          zeroWidthParagraphBreak: 0,
          vertexAngle: 0,
          centerAngle: 0,
          background: {
            rgb: '#ccc'
          }
        },
        autoHyphenation: 1,
        doNotHyphenateCaps: 0,
        consecutiveHyphenLimit: 2,
        defaultHeaderId: '',
        defaultFooterId: '',
        evenPageHeaderId: '',
        evenPageFooterId: '',
        firstPageHeaderId: '',
        firstPageFooterId: '',
        evenAndOddHeaders: 0,
        useFirstPageHeaderFooter: 0,
        marginHeader: 30,
        marginFooter: 30
      },
      locale: 'enUS',
      title: '',
      tableSource: {},
      drawings: {},
      drawingsOrder: [],
      headers: {},
      footers: {},
      body: {
        dataStream: '測試預設內容\r\n',
        textRuns: [],
        customBlocks: [],
        tables: [],
        paragraphs: [
          {
            startIndex: 13,
            paragraphStyle: {
              spaceAbove: {
                v: 5
              },
              lineSpacing: 1,
              spaceBelow: {
                v: 0
              }
            }
          }
        ],
        sectionBreaks: [
          {
            startIndex: 14
          }
        ],
        customRanges: [],
        customDecorations: []
      },
      settings: {},
      resources: [
        {
          name: 'SHEET_UNIVER_THREAD_COMMENT_PLUGIN',
          data: '{}'
        },
        {
          name: 'DOC_DRAWING_PLUGIN',
          data: '{"data":{},"order":[]}'
        },
        {
          name: 'DOC_HYPER_LINK_PLUGIN',
          data: '{"links":[]}'
        }
      ]
    })
  }
});
const emits = defineEmits([
  'univerStarting',
  'univerReady',
  'univerRendered',
  'univerSteady',
  'univerChangeStart',
  'univerChange',
  'univerChangeEnd'
]);

const container = ref(null);

const currentDoc = ref({});
// const currentWorksheet = ref({});
const loading = ref(true);

const univerInstance = reactive({
  univer: null,
  univerAPI: null
});

async function handleUniverDoc() {
  try {
    const { univer, univerAPI } = await createDocInstance(
      container.value,
      props.locale
    );

    disposable.push(
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
    // disposable.push(
    //   univerAPI.addEvent(univerAPI.Event.SheetEditStarted, (event) => {
    //     emits('univerChangeStart', event);
    //   })
    // );
    // disposable.push(
    //   univerAPI.addEvent(univerAPI.Event.SheetEditChanging, (event) => {
    //     emits('univerChange', event);
    //   })
    // );
    // disposable.push(
    //   univerAPI.addEvent(univerAPI.Event.SheetEditEnded, (event) => {
    //     console.log({ event });
    //     emits('univerChangeEnd', event);
    //   })
    // );
    currentDoc.value = univerAPI.createUniverDoc(props.doc);

    univerInstance.univer = univer;
    univerInstance.univerAPI = univerAPI;
  } catch (error) {
    console.error(error);
  }

  loading.value = false;
}

onMounted(() => {
  handleUniverDoc();
});

onUnmounted(() => {
  disposable.forEach((item) => {
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
  <div class="univer_doc">
    <SkeletonLoader
      v-if="loading"
      :loading="true"
      class="univer_doc-skeleton"
    />
    <div ref="container" class="univer_doc-editor" />
  </div>
</template>

<style lang="scss" scoped>
.univer_doc {
  position: relative;
  height: 100%;

  &-skeleton {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
  }

  &-editor {
    height: 100%;
  }
}
</style>
