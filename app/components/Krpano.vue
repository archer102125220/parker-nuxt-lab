<template>
  <ClientOnly>
    <div :id="containerId" ref="containerRef" class="krpano" />
  </ClientOnly>
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid';

/**
 * Krpano 全景圖組件
 * 用於在 Vue/Nuxt 中嵌入 Krpano 全景圖查看器
 */

// 熱點點擊 callback 存儲
const hotspotCallbacks = new Map();

// 文字圖層名稱常量
const TEXT_LAYER_NAME = 'i18n_text_layer';

const props = defineProps({
  /** XML 配置文件路徑 */
  xml: { type: String, default: '/krpano/tour.xml' },
  /** 初始場景名稱 - 僅用於組件掛載時 */
  startScene: { type: String, default: '' },
  /** 當前場景名稱 - 用於動態切換 */
  currentScene: { type: String, default: '' },
  /** 熱點配置陣列 */
  hotspots: { type: Array, default: () => [] },
  /** 容器背景色 */
  bgcolor: { type: String, default: '#000000' },
  /** 是否開啟 Debug Log 視窗 */
  debug: { type: Boolean, default: false },
  /** 動態文字圖層內容 (i18n) */
  textLayerContent: { type: String, default: '' }
});

const emit = defineEmits(['ready', 'loadComplete']);

const containerRef = ref(null);
const krpanoInstance = ref(null);
const initialized = ref(false);
const prevHotspots = ref([]);

const instanceId = computed(() => uuidv4());
const panoId = computed(() => `krpano_${instanceId.value.replace(/-/g, '_')}`);
const containerId = computed(() => `${panoId.value}_container`);

// ========== Helper Functions ==========

/**
 * 設定單一事件的輔助函數
 */
function setHotspotEvent(krpano, config, eventName, krpanoAction, callback) {
  const callbackKey = `${panoId.value}_${config.name}_${eventName}`;

  if (callback) {
    // 儲存 callback
    hotspotCallbacks.set(callbackKey, () => callback(config, krpano));

    // 使用 jscall 呼叫全域函數
    const jsCallAction = `jscall(window.__krpanoHotspotClick('${callbackKey}'))`;

    // 如果有 krpanoAction，則串接兩者
    if (krpanoAction) {
      krpano.set(
        `hotspot[${config.name}].${eventName}`,
        `${krpanoAction}; ${jsCallAction}`
      );
    } else {
      krpano.set(`hotspot[${config.name}].${eventName}`, jsCallAction);
    }
  } else if (krpanoAction) {
    // 只有 Krpano action
    krpano.set(`hotspot[${config.name}].${eventName}`, krpanoAction);
    // 清除可能存在的舊 callback
    hotspotCallbacks.delete(callbackKey);
  } else {
    // 清除事件
    krpano.set(`hotspot[${config.name}].${eventName}`, '');
    hotspotCallbacks.delete(callbackKey);
  }
}

/**
 * 更新熱點屬性
 */
function updateHotspot(krpano, config) {
  krpano.set(`hotspot[${config.name}].url`, config.url);
  krpano.set(`hotspot[${config.name}].ath`, config.ath);
  krpano.set(`hotspot[${config.name}].atv`, config.atv);
  krpano.set(`hotspot[${config.name}].scale`, config.scale ?? 0.5);
  krpano.set(`hotspot[${config.name}].visible`, config.visible ?? true);

  // 設定各種事件
  setHotspotEvent(
    krpano,
    config,
    'onclick',
    config.krpanoOnClick,
    config.onClick
  );
  setHotspotEvent(
    krpano,
    config,
    'onover',
    config.krpanoOnOver,
    config.onHover
  );
  setHotspotEvent(krpano, config, 'onout', config.krpanoOnOut, config.onLeave);
  setHotspotEvent(
    krpano,
    config,
    'ondown',
    config.krpanoOnDown,
    config.onMouseDown
  );
  setHotspotEvent(krpano, config, 'onup', config.krpanoOnUp, config.onMouseUp);
}

/**
 * 添加單個熱點
 */
function addHotspot(krpano, config) {
  krpano.call(`addhotspot(${config.name})`);
  krpano.set(`hotspot[${config.name}].keep`, true);
  updateHotspot(krpano, config);
}

/**
 * 移除熱點
 */
function removeHotspot(krpano, name) {
  krpano.call(`removehotspot(${name})`);
  // 清除對應的所有事件 callbacks
  const eventTypes = ['onclick', 'onover', 'onout', 'ondown', 'onup'];
  eventTypes.forEach((eventName) => {
    const callbackKey = `${panoId.value}_${name}_${eventName}`;
    hotspotCallbacks.delete(callbackKey);
  });
}

/**
 * 初始化或更新文字圖層
 */
function initOrUpdateTextLayer(krpano, content) {
  if (content) {
    // 檢查圖層是否存在，如果不存在則創建
    const existingLayer = krpano.get(`layer[${TEXT_LAYER_NAME}]`);
    if (!existingLayer) {
      krpano.call(`addlayer(${TEXT_LAYER_NAME})`);
      krpano.set(`layer[${TEXT_LAYER_NAME}].type`, 'text');
      krpano.set(`layer[${TEXT_LAYER_NAME}].align`, 'bottom');
      krpano.set(`layer[${TEXT_LAYER_NAME}].x`, '0');
      krpano.set(`layer[${TEXT_LAYER_NAME}].y`, '10%');
      krpano.set(
        `layer[${TEXT_LAYER_NAME}].css`,
        'font-size:24px; color:white; text-shadow: 2px 2px 4px rgba(0,0,0,0.8); font-weight: bold;'
      );
      krpano.set(`layer[${TEXT_LAYER_NAME}].bg`, false);
    }
    // 更新文字內容
    krpano.set(`layer[${TEXT_LAYER_NAME}].html`, content);
    krpano.set(`layer[${TEXT_LAYER_NAME}].visible`, true);
  } else {
    // 如果沒有內容，隱藏圖層
    krpano.set(`layer[${TEXT_LAYER_NAME}].visible`, false);
  }
}

/**
 * 載入 Krpano script
 */
function loadScript() {
  return new Promise((resolve, reject) => {
    // 檢查是否已經載入
    if (window.embedpano) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = '/krpano/tour.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Krpano tour.js'));
    document.head.appendChild(script);
  });
}

/**
 * 初始化 Krpano
 */
async function initPano() {
  if (!containerRef.value) {
    await nextTick();
    return await initPano();
  }

  try {
    await loadScript();

    if (!window.embedpano || !containerRef.value) return;

    window.embedpano({
      id: panoId.value,
      xml: props.xml,
      target: containerId.value,
      html5: 'only',
      mobilescale: 1.0,
      passQueryParameters: props.startScene
        ? `startscene=${props.startScene}`
        : '',
      bgcolor: props.bgcolor,
      onready: (krpano) => {
        krpanoInstance.value = krpano;
        initialized.value = true;

        // 添加所有熱點
        props.hotspots.forEach((hotspot) => {
          addHotspot(krpano, hotspot);
        });
        prevHotspots.value = [...props.hotspots];

        // 定義統一的 onloadcomplete 回調
        window.onKrpanoLoadComplete = () => {
          initOrUpdateTextLayer(krpano, props.textLayerContent);
          emit('loadComplete', krpano);
        };

        // 使用 events.onloadcomplete 事件
        krpano.set('events.onloadcomplete', 'jscall(onKrpanoLoadComplete())');

        emit('ready', krpano);
      }
    });
  } catch (error) {
    console.error('Failed to initialize Krpano:', error);
  }
}

/**
 * 清理函數
 */
function cleanup() {
  // 清理所有熱點的 callbacks
  props.hotspots.forEach((hotspot) => {
    const eventTypes = ['onclick', 'onover', 'onout', 'ondown', 'onup'];
    eventTypes.forEach((eventName) => {
      const callbackKey = `${panoId.value}_${hotspot.name}_${eventName}`;
      hotspotCallbacks.delete(callbackKey);
    });
  });

  if (window.removepano) {
    window.removepano(panoId.value);
  }
  krpanoInstance.value = null;
  initialized.value = false;
}

/**
 * 獲取 Krpano 實例
 */
function getInstance() {
  return krpanoInstance.value;
}

// ========== Lifecycle Hooks ==========

onMounted(() => {
  // 定義全域函數供 Krpano jscall 使用
  window.__krpanoHotspotClick = (callbackKey) => {
    const callback = hotspotCallbacks.get(callbackKey);
    if (callback) {
      callback(krpanoInstance.value);
    }
  };

  initPano();
});

onUnmounted(() => {
  // 清理全域函數
  delete window.__krpanoHotspotClick;
  cleanup();
});

// ========== Watchers ==========

// 監聽當前場景更新
watch(
  () => props.currentScene,
  (newScene) => {
    const krpano = krpanoInstance.value;
    if (!krpano || !initialized.value || !newScene) return;

    krpano.call(`loadscene(${newScene}, null, MERGE, BLEND(0.5))`);
  }
);

// 監聽熱點陣列更新 - 進行 diff 並動態增減/更新熱點
watch(
  () => props.hotspots,
  (newHotspots) => {
    const krpano = krpanoInstance.value;
    if (!krpano || !initialized.value) return;

    const prevNames = new Set(prevHotspots.value.map((h) => h.name));
    const currentNames = new Set(newHotspots.map((h) => h.name));

    // 移除不再存在的熱點
    prevHotspots.value.forEach((hotspot) => {
      if (!currentNames.has(hotspot.name)) {
        removeHotspot(krpano, hotspot.name);
      }
    });

    // 添加新的熱點或更新現有熱點
    newHotspots.forEach((hotspot) => {
      if (!prevNames.has(hotspot.name)) {
        // 新熱點
        addHotspot(krpano, hotspot);
      } else {
        // 更新現有熱點
        updateHotspot(krpano, hotspot);
      }
    });

    // 更新 ref
    prevHotspots.value = [...newHotspots];
  },
  { deep: true }
);

// 監聽 debug 更新
watch(
  () => props.debug,
  (newDebug) => {
    const krpano = krpanoInstance.value;
    if (!krpano || !initialized.value) return;

    // 動態設定 debugmode
    krpano.set('debugmode', newDebug);
    // 開啟/關閉 Log 視窗
    krpano.call(`showlog(${newDebug})`);
  }
);

// 監聽 textLayerContent 更新
watch(
  () => props.textLayerContent,
  (newContent) => {
    const krpano = krpanoInstance.value;
    if (!krpano || !initialized.value) return;

    initOrUpdateTextLayer(krpano, newContent);
  }
);

// ========== Expose ==========

defineExpose({
  getInstance
});
</script>

<style lang="scss">
.krpano {
  // Display & Box Model
  width: 100%;
  height: 100%;
}
</style>
