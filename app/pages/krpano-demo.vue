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
    <div class="krpano_demo-controls" :css-is-expanded="controlsExpanded">
      <button
        class="krpano_demo-controls-toggle"
        @click="controlsExpanded = !controlsExpanded"
      >
        <v-icon
          :icon="controlsExpanded ? 'mdi-chevron-down' : 'mdi-chevron-up'"
        />
        {{
          controlsExpanded
            ? $t('krpano_demo_page.controls.hide')
            : $t('krpano_demo_page.controls.show')
        }}
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
          
          <!-- 新增熱點表單 -->
          <div v-if="!isAddFormOpen" class="krpano_demo-controls-panel-group-buttons">
            <button
              class="krpano_demo-controls-panel-group-buttons-btn"
              css-color="success"
              @click="isAddFormOpen = true"
            >
              + {{ $t('krpano_demo_page.controls.add_hotspot') }}
            </button>
          </div>
          
          <div v-else class="krpano_demo-controls-panel-group-form">
            <input
              v-model="newHotspot.name"
              type="text"
              class="krpano_demo-controls-panel-group-form-input"
              :placeholder="$t('krpano_demo_page.hotspot_form.name_placeholder')"
            />
            <div class="krpano_demo-controls-panel-group-form-row">
              <input
                v-model.number="newHotspot.ath"
                type="number"
                class="krpano_demo-controls-panel-group-form-input"
                :placeholder="$t('krpano_demo_page.hotspot_form.ath_placeholder')"
              />
              <input
                v-model.number="newHotspot.atv"
                type="number"
                class="krpano_demo-controls-panel-group-form-input"
                :placeholder="$t('krpano_demo_page.hotspot_form.atv_placeholder')"
              />
            </div>
            
            <!-- 圖示類型切換 -->
            <div class="krpano_demo-controls-panel-group-form-tabs">
              <button
                class="krpano_demo-controls-panel-group-form-tabs-btn"
                :css-is-active="iconTabIndex === 0"
                @click="iconTabIndex = 0"
              >
                {{ $t('krpano_demo_page.hotspot_form.preset_icon') }}
              </button>
              <button
                class="krpano_demo-controls-panel-group-form-tabs-btn"
                :css-is-active="iconTabIndex === 1"
                @click="iconTabIndex = 1"
              >
                {{ $t('krpano_demo_page.hotspot_form.custom_url') }}
              </button>
            </div>
            
            <!-- 預設圖示選擇 -->
            <div v-if="iconTabIndex === 0" class="krpano_demo-controls-panel-group-form-icons">
              <button
                v-for="(icon, index) in hotspotIcons"
                :key="icon.url"
                class="krpano_demo-controls-panel-group-form-icons-btn"
                :css-is-active="selectedIconIndex === index"
                @click="selectedIconIndex = index"
              >
                {{ icon.label }}
              </button>
            </div>
            
            <!-- 自訂 URL 輸入 -->
            <div v-else class="krpano_demo-controls-panel-group-form-url">
              <input
                v-model="customIconUrl"
                type="text"
                class="krpano_demo-controls-panel-group-form-input"
                :placeholder="$t('krpano_demo_page.hotspot_form.url_placeholder')"
              />
            </div>
            
            <div class="krpano_demo-controls-panel-group-form-actions">
              <button
                class="krpano_demo-controls-panel-group-buttons-btn"
                @click="cancelAddHotspot"
              >
                {{ $t('krpano_demo_page.hotspot_form.cancel') }}
              </button>
              <button
                class="krpano_demo-controls-panel-group-buttons-btn"
                css-color="success"
                :disabled="!isFormValid"
                @click="confirmAddHotspot"
              >
                {{ $t('krpano_demo_page.hotspot_form.confirm') }}
              </button>
            </div>
          </div>
          
          <!-- 熱點列表 -->
          <div v-if="hotspots.length > 0" class="krpano_demo-controls-panel-group-list">
            <div
              v-for="hotspot in hotspots"
              :key="hotspot.name"
              class="krpano_demo-controls-panel-group-list-item"
            >
              <span class="krpano_demo-controls-panel-group-list-item-name">
                {{ hotspot.displayName || hotspot.name }}
              </span>
              <span class="krpano_demo-controls-panel-group-list-item-coords">
                ({{ hotspot.ath.toFixed(0) }}, {{ hotspot.atv.toFixed(0) }})
              </span>
              <div class="krpano_demo-controls-panel-group-list-item-actions">
                <button
                  class="krpano_demo-controls-panel-group-list-item-actions-btn"
                  :css-is-visible="hotspot.visible"
                  @click="toggleHotspotVisibility(hotspot.name)"
                >
                  {{ hotspot.visible ? '●' : '○' }}
                </button>
                <button
                  class="krpano_demo-controls-panel-group-list-item-actions-btn"
                  css-color="danger"
                  @click="removeHotspot(hotspot.name)"
                >
                  ×
                </button>
              </div>
            </div>
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
            {{
              debug
                ? $t('krpano_demo_page.controls.debug_on')
                : $t('krpano_demo_page.controls.debug_off')
            }}
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
    <div class="krpano_demo-log" :css-is-expanded="logExpanded">
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
          <span class="krpano_demo-log-panel-item-message">{{
            log.message
          }}</span>
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

const localePath = useLocalePath();
const DOMAIN = import.meta.env.VITE_DOMAIN || '';

// Schema.org 結構化資料 (nuxt-schema-org)
useSchemaOrg([
  defineWebPage({
    '@type': 'WebPage',
    name: t('krpano_demo_page.hero.title'),
    url: `${DOMAIN}${localePath('/krpano-demo')}`,
    inLanguage: ['zh-TW', 'en']
  })
]);


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
  const scene = scenes.value.find((s) => s.name === currentScene.value);
  return scene ? scene.label : '';
});

// Hotspots
const hotspots = ref([]);
let hotspotCounter = 0;

// Hotspot Form State
const isAddFormOpen = ref(false);
const selectedIconIndex = ref(0);
const iconTabIndex = ref(0); // 0: preset, 1: custom URL
const customIconUrl = ref('');
const newHotspot = ref({
  name: '',
  ath: 0,
  atv: 0
});

// Hotspot Icons
const hotspotIcons = [
  { label: 'Hotspot', url: '/krpano/skin/vtourskin_hotspot.png' },
  { label: 'Map', url: '/krpano/skin/vtourskin_mapspot.png' }
];

// Form validation
const isFormValid = computed(() => {
  if (!newHotspot.value.name.trim()) return false;
  if (iconTabIndex.value === 1 && !customIconUrl.value.trim()) return false;
  return true;
});

// Get hotspot URL based on tab selection
function getHotspotUrl() {
  if (iconTabIndex.value === 1 && customIconUrl.value.trim()) {
    return customIconUrl.value.trim();
  }
  return hotspotIcons[selectedIconIndex.value].url;
}

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
function confirmAddHotspot() {
  if (!isFormValid.value) return;
  
  hotspotCounter++;
  const hotspot = {
    name: `hotspot_${hotspotCounter}`,
    displayName: newHotspot.value.name.trim(),
    url: getHotspotUrl(),
    ath: newHotspot.value.ath || 0,
    atv: newHotspot.value.atv || 0,
    scale: 0.5,
    visible: true,
    onClick: (config) => {
      addLog(`Click: ${config.displayName || config.name}`, 'success');
    }
  };

  hotspots.value = [...hotspots.value, hotspot];
  addLog(`Added: ${hotspot.displayName}`, 'success');
  
  // Reset form
  newHotspot.value = { name: '', ath: 0, atv: 0 };
  selectedIconIndex.value = 0;
  iconTabIndex.value = 0;
  customIconUrl.value = '';
  isAddFormOpen.value = false;
}

function cancelAddHotspot() {
  newHotspot.value = { name: '', ath: 0, atv: 0 };
  selectedIconIndex.value = 0;
  iconTabIndex.value = 0;
  customIconUrl.value = '';
  isAddFormOpen.value = false;
}

function toggleHotspotVisibility(name) {
  const hotspot = hotspots.value.find((h) => h.name === name);
  if (hotspot) {
    hotspot.visible = !hotspot.visible;
    hotspots.value = [...hotspots.value]; // Trigger reactivity
    addLog(`${hotspot.displayName || name}: ${hotspot.visible ? 'Visible' : 'Hidden'}`, 'info');
  }
}

function removeHotspot(name) {
  const hotspot = hotspots.value.find((h) => h.name === name);
  const displayName = hotspot?.displayName || name;
  hotspots.value = hotspots.value.filter((h) => h.name !== name);
  addLog(`Removed: ${displayName}`, 'warning');
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
    bottom: 80px; // 調高避開 Krpano 自帶 UI
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
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-top: 12px;
      padding: 16px 20px;
      border-radius: 16px;
      max-height: 0;
      overflow: hidden;

      // Visual
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      opacity: 0;

      // Animation
      transition:
        max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
        opacity 0.3s ease,
        padding 0.3s ease,
        margin 0.3s ease;

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

        &-form {
          // Display & Box Model
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 12px;
          border-radius: 10px;

          // Visual
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);

          &-input {
            // Display & Box Model
            padding: 8px 12px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 6px;

            // Typography
            font-size: 13px;
            color: #fff;

            // Visual
            background: rgba(255, 255, 255, 0.05);

            // Animation
            transition: border-color 0.2s ease;

            &::placeholder {
              color: rgba(255, 255, 255, 0.4);
            }

            &:focus {
              outline: none;
              border-color: rgba(104, 211, 145, 0.6);
            }
          }

          &-row {
            // Display & Box Model
            display: flex;
            gap: 8px;
          }

          &-icons {
            // Display & Box Model
            display: flex;
            gap: 6px;

            &-btn {
              // Display & Box Model
              padding: 6px 12px;
              border: 1px solid rgba(255, 255, 255, 0.2);
              border-radius: 6px;

              // Typography
              font-size: 12px;
              color: rgba(255, 255, 255, 0.7);

              // Visual
              background: rgba(255, 255, 255, 0.05);

              // Misc
              cursor: pointer;

              // Animation
              transition: all 0.2s ease;

              &:hover {
                background: rgba(255, 255, 255, 0.1);
              }

              &[css-is-active='true'] {
                background: rgba(104, 211, 145, 0.3);
                border-color: rgba(104, 211, 145, 0.6);
                color: #68d391;
              }
            }
          }

          &-tabs {
            // Display & Box Model
            display: flex;
            gap: 4px;
            padding: 4px;
            border-radius: 8px;

            // Visual
            background: rgba(0, 0, 0, 0.3);

            &-btn {
              // Display & Box Model
              flex: 1;
              padding: 6px 10px;
              border: none;
              border-radius: 6px;

              // Typography
              font-size: 11px;
              font-weight: 500;
              color: rgba(255, 255, 255, 0.6);

              // Visual
              background: transparent;

              // Misc
              cursor: pointer;

              // Animation
              transition: all 0.2s ease;

              &:hover {
                color: rgba(255, 255, 255, 0.8);
              }

              &[css-is-active='true'] {
                background: rgba(255, 255, 255, 0.1);
                color: #fff;
              }
            }
          }

          &-url {
            // Display & Box Model
            display: flex;
          }

          &-actions {
            // Display & Box Model
            display: flex;
            justify-content: flex-end;
            gap: 8px;
            margin-top: 4px;
          }
        }

        &-list {
          // Display & Box Model
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 8px;

          &-item {
            // Display & Box Model
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 10px;
            border-radius: 6px;

            // Visual
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);

            &-name {
              // Typography
              font-size: 12px;
              font-weight: 500;
              color: rgba(255, 255, 255, 0.9);
            }

            &-coords {
              // Typography
              font-size: 11px;
              color: rgba(255, 255, 255, 0.5);
            }

            &-actions {
              // Display & Box Model
              display: flex;
              gap: 4px;
              margin-left: auto;

              &-btn {
                // Display & Box Model
                display: flex;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
                border: none;
                border-radius: 4px;

                // Typography
                font-size: 14px;
                color: rgba(255, 255, 255, 0.6);

                // Visual
                background: transparent;

                // Misc
                cursor: pointer;

                // Animation
                transition: all 0.2s ease;

                &:hover {
                  background: rgba(255, 255, 255, 0.1);
                  color: #fff;
                }

                &[css-is-visible='true'] {
                  color: #68d391;
                }

                &[css-color='danger'] {
                  color: rgba(252, 129, 129, 0.8);

                  &:hover {
                    background: rgba(252, 129, 129, 0.2);
                    color: #fc8181;
                  }
                }
              }
            }
          }
        }
      }
    }

    &[css-is-expanded='true'] &-panel {
      max-height: 300px;
      opacity: 1;
      padding: 16px 20px;
      overflow-y: auto;
    }

    &[css-is-expanded='false'] &-panel,
    &:not([css-is-expanded='true']) &-panel {
      max-height: 0;
      opacity: 0;
      padding: 0 20px;
      margin-top: 0;
      border-color: transparent;
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
      display: flex;
      flex-direction: column;
      max-width: 300px;
      max-height: 0;
      margin-top: 8px;
      padding: 0 12px;
      border-radius: 12px;
      overflow: hidden;

      // Visual
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(20px);
      opacity: 0;

      // Typography
      font-family: monospace;

      // Animation
      transition:
        max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
        opacity 0.3s ease,
        padding 0.3s ease,
        transform 0.3s ease;
      transform: translateY(-10px);

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
      max-height: 200px;
      opacity: 1;
      padding: 12px;
      overflow-y: auto;
      transform: translateY(0);
    }

    &[css-is-expanded='false'] &-panel,
    &:not([css-is-expanded='true']) &-panel {
      max-height: 0;
      opacity: 0;
      padding: 0 12px;
      transform: translateY(-10px);
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
