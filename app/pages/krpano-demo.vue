<template>
  <div class="krpano_demo">
    <!-- 全景圖查看器 -->
    <Krpano
      ref="krpanoRef"
      class="krpano_demo-viewer"
      :xml="xml"
      :start-scene="startScene"
      :current-scene="currentScene"
      :hotspots="hotspots"
      :debug="debug"
      :text-layer-content="textLayerContent"
      @ready="onKrpanoReady"
      @load-complete="onLoadComplete"
    />

    <!-- 控制面板 (可收合) -->
    <div
      class="krpano_demo-controls"
      :css-is-expanded="controlsExpanded"
    >
      <button
        class="krpano_demo-controls-toggle"
        @click="controlsExpanded = !controlsExpanded"
      >
        <v-icon :icon="controlsExpanded ? 'mdi-chevron-down' : 'mdi-chevron-up'" />
        {{ controlsExpanded ? $t('krpano_demo_page.controls.hide') : $t('krpano_demo_page.controls.show') }}
      </button>

      <div class="krpano_demo-controls-panel">
        <!-- 場景切換 -->
        <div class="krpano_demo-controls-panel-group">
          <span class="krpano_demo-controls-panel-group-label">
            {{ $t('krpano_demo_page.controls.scene') }}
          </span>
          <div class="krpano_demo-controls-panel-group-buttons">
            <button
              v-for="scene in scenes"
              :key="scene.name"
              class="krpano_demo-controls-panel-group-buttons-btn"
              :css-is-active="currentScene === scene.name"
              @click="switchScene(scene.name)"
            >
              {{ scene.label }}
            </button>
          </div>
        </div>

        <!-- 熱點控制 -->
        <div class="krpano_demo-controls-panel-group">
          <span class="krpano_demo-controls-panel-group-label">
            {{ $t('krpano_demo_page.controls.hotspots') }}
          </span>
          <div class="krpano_demo-controls-panel-group-buttons">
            <button
              class="krpano_demo-controls-panel-group-buttons-btn"
              css-color="success"
              @click="addSampleHotspot"
            >
              {{ $t('krpano_demo_page.controls.add_hotspot') }}
            </button>
            <button
              class="krpano_demo-controls-panel-group-buttons-btn"
              css-color="warning"
              :disabled="hotspots.length === 0"
              @click="clearHotspots"
            >
              {{ $t('krpano_demo_page.controls.clear_hotspots') }}
            </button>
          </div>
        </div>

        <!-- Debug 模式 -->
        <div class="krpano_demo-controls-panel-group">
          <span class="krpano_demo-controls-panel-group-label">
            {{ $t('krpano_demo_page.controls.debug') }}
          </span>
          <button
            class="krpano_demo-controls-panel-group-buttons-btn"
            :css-is-active="debug"
            @click="debug = !debug"
          >
            {{ debug ? $t('krpano_demo_page.controls.debug_on') : $t('krpano_demo_page.controls.debug_off') }}
          </button>
        </div>
      </div>
    </div>

    <!-- 場景資訊覆蓋 -->
    <div class="krpano_demo-info">
      <h1 class="krpano_demo-info-title">
        {{ currentSceneLabel }}
      </h1>
    </div>

    <!-- 日誌面板 (可收合) -->
    <div
      class="krpano_demo-log"
      :css-is-expanded="logExpanded"
    >
      <button
        class="krpano_demo-log-toggle"
        @click="logExpanded = !logExpanded"
      >
        <v-icon icon="mdi-console" />
        <span class="krpano_demo-log-toggle-badge">{{ logs.length }}</span>
      </button>

      <div class="krpano_demo-log-panel">
        <div
          v-for="(log, index) in logs"
          :key="index"
          class="krpano_demo-log-panel-item"
          :data-type="log.type"
        >
          <span class="krpano_demo-log-panel-item-time">{{ log.time }}</span>
          <span class="krpano_demo-log-panel-item-message">{{ log.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();

definePageMeta({
  layout: 'immersive'
});

useHeadMataData({
  title: t('krpano_demo_page.hero.title')
});

// Refs
const krpanoRef = ref(null);

// UI State
const controlsExpanded = ref(true);
const logExpanded = ref(false);

// Krpano configuration
const xml = '/krpano/tour.xml';
const startScene = 'scene_bryan_goff_iuyhxaia8ea_unsplash';
const currentScene = ref(startScene);
const debug = ref(false);
const textLayerContent = ref('');

// Available scenes
const scenes = computed(() => [
  {
    name: 'scene_bryan_goff_iuyhxaia8ea_unsplash',
    label: t('krpano_demo_page.scenes.scene1')
  },
  {
    name: 'scene_timothy_oldfield_luufnhochru_unsplash',
    label: t('krpano_demo_page.scenes.scene2')
  }
]);

const currentSceneLabel = computed(() => {
  const scene = scenes.value.find(s => s.name === currentScene.value);
  return scene ? scene.label : '';
});

// Hotspots
const hotspots = ref([]);
let hotspotCounter = 0;

// Logs
const logs = ref([]);

// Helper: Add log
function addLog(message, type = 'info') {
  const time = new Date().toLocaleTimeString();
  logs.value.unshift({ time, message, type });
  if (logs.value.length > 15) {
    logs.value.pop();
  }
}

// Scene switching
function switchScene(sceneName) {
  currentScene.value = sceneName;
  addLog(`Scene: ${sceneName}`, 'info');
}

// Hotspot management
function addSampleHotspot() {
  hotspotCounter++;
  const randomAth = Math.floor(Math.random() * 360) - 180;
  const randomAtv = Math.floor(Math.random() * 90) - 45;

  const newHotspot = {
    name: `hotspot_${hotspotCounter}`,
    url: '/krpano/skin/vtourskin_hotspot.png',
    ath: randomAth,
    atv: randomAtv,
    scale: 0.5,
    visible: true,
    onClick: (config) => {
      addLog(`Click: ${config.name}`, 'success');
    }
  };

  hotspots.value = [...hotspots.value, newHotspot];
  addLog(`Added: ${newHotspot.name}`, 'success');
}

function clearHotspots() {
  const count = hotspots.value.length;
  hotspots.value = [];
  addLog(`Cleared ${count} hotspots`, 'warning');
}

// Krpano events
function onKrpanoReady() {
  addLog('Krpano ready', 'success');
}

function onLoadComplete() {
  addLog('Scene loaded', 'success');
}

// Initialize
onMounted(() => {
  addLog('Page mounted', 'info');
});
</script>

<style lang="scss">
.krpano_demo {
  // Positioning
  position: relative;

  // Display & Box Model
  width: 100vw;
  height: 100dvh;

  &-viewer {
    // Positioning
    position: absolute;
    top: 0;
    left: 0;

    // Display & Box Model
    width: 100%;
    height: 100%;
  }

  &-controls {
    // Positioning
    position: fixed;
    bottom: 24px;
    left: 50%;
    z-index: 50;
    transform: translateX(-50%);

    // Display & Box Model
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 90vw;

    &-toggle {
      // Display & Box Model
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border: none;
      border-radius: 20px;

      // Typography
      font-size: 13px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.9);

      // Visual
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(10px);

      // Misc
      cursor: pointer;

      // Animation
      transition: all 0.3s ease;

      &:hover {
        background: rgba(0, 0, 0, 0.8);
      }
    }

    &-panel {
      // Display & Box Model
      display: none;
      flex-wrap: wrap;
      gap: 16px;
      margin-top: 12px;
      padding: 16px 20px;
      border-radius: 16px;

      // Visual
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);

      &-group {
        // Display & Box Model
        display: flex;
        flex-direction: column;
        gap: 8px;

        &-label {
          // Typography
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: rgba(255, 255, 255, 0.6);
        }

        &-buttons {
          // Display & Box Model
          display: flex;
          flex-wrap: wrap;
          gap: 8px;

          &-btn {
            // Display & Box Model
            padding: 8px 14px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;

            // Typography
            font-size: 13px;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.8);

            // Visual
            background: rgba(255, 255, 255, 0.05);

            // Misc
            cursor: pointer;

            // Animation
            transition: all 0.2s ease;

            &:hover:not(:disabled) {
              background: rgba(255, 255, 255, 0.15);
              border-color: rgba(255, 255, 255, 0.3);
            }

            &:disabled {
              opacity: 0.4;
              cursor: not-allowed;
            }

            &[css-is-active='true'] {
              background: rgba(102, 126, 234, 0.3);
              border-color: rgba(102, 126, 234, 0.6);
              color: #fff;
            }

            &[css-color='success'] {
              border-color: rgba(104, 211, 145, 0.4);
              color: #68d391;

              &:hover:not(:disabled) {
                background: rgba(104, 211, 145, 0.2);
              }
            }

            &[css-color='warning'] {
              border-color: rgba(246, 173, 85, 0.4);
              color: #f6ad55;

              &:hover:not(:disabled) {
                background: rgba(246, 173, 85, 0.2);
              }
            }
          }
        }
      }
    }

    &[css-is-expanded='true'] &-panel {
      display: flex;
    }
  }

  &-info {
    // Positioning
    position: fixed;
    top: 80px;
    left: 50%;
    z-index: 30;
    transform: translateX(-50%);

    // Display & Box Model
    padding: 12px 24px;
    border-radius: 12px;

    // Visual
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);

    // Animation
    animation: fadeInDown 0.5s ease;

    &-title {
      // Typography
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #fff;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
  }

  &-log {
    // Positioning
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 50;

    // Display & Box Model
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    &-toggle {
      // Positioning
      position: relative;

      // Display & Box Model
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border: none;
      border-radius: 50%;

      // Typography
      color: rgba(255, 255, 255, 0.9);

      // Visual
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(10px);

      // Misc
      cursor: pointer;

      // Animation
      transition: all 0.3s ease;

      &:hover {
        background: rgba(0, 0, 0, 0.8);
        transform: scale(1.05);
      }

      &-badge {
        // Positioning
        position: absolute;
        top: -4px;
        right: -4px;

        // Display & Box Model
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 18px;
        height: 18px;
        padding: 0 4px;
        border-radius: 9px;

        // Typography
        font-size: 11px;
        font-weight: 600;
        color: #fff;

        // Visual
        background: #667eea;
      }
    }

    &-panel {
      // Display & Box Model
      display: none;
      flex-direction: column;
      max-width: 300px;
      max-height: 200px;
      margin-top: 8px;
      padding: 12px;
      border-radius: 12px;
      overflow-y: auto;

      // Visual
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(20px);

      // Typography
      font-family: monospace;

      &-item {
        // Display & Box Model
        display: flex;
        gap: 8px;
        padding: 4px 0;

        // Typography
        font-size: 11px;

        &-time {
          color: rgba(255, 255, 255, 0.5);
        }

        &-message {
          color: rgba(255, 255, 255, 0.9);
        }

        &[data-type='success'] &-message {
          color: #68d391;
        }

        &[data-type='warning'] &-message {
          color: #f6ad55;
        }

        &[data-type='error'] &-message {
          color: #fc8181;
        }
      }
    }

    &[css-is-expanded='true'] &-panel {
      display: flex;
    }
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
</style>
