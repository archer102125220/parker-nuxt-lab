<template>
  <NuxtLayout
    :class="['a_frame_engine', `a_frame_engine-${paramsPlace}`]"
    name="immersive"
    :style="cssVariable"
  >
    <LoadingBar height="5" :loading="aFrameStore.isAFrameLoading" />
    <AframeContent
      @before-aframe-load="beforeAframeLoad"
      @after-aframe-load="afterAframeLoad"
    >
      <a-scene
        id="a_frame_engine-scene"
        a_frame-mode-ui="enterVRButton: #vRButton;"
      >
        <a-assets id="a_frame_engine_layout_assets">
          <slot name="assets" />

          <template v-for="(_aFrameSetting, index) in aFrameSettingList">
            <img
              v-if="
                typeof _aFrameSetting.sky === 'string' &&
                _aFrameSetting.sky !== ''
              "
              :id="`sky-${_aFrameSetting.name}`"
              :key="index"
              :src="_aFrameSetting.sky"
              :alt="`sky-${_aFrameSetting.name}`"
            />
            <video
              v-if="
                typeof _aFrameSetting.sky_video === 'string' &&
                _aFrameSetting.sky_video !== ''
              "
              :id="`sky_video-${_aFrameSetting.name}`"
              :key="index"
              :src="_aFrameSetting.sky_video"
              :alt="`sky_video-${_aFrameSetting.name}`"
            />
            <template v-for="(item, itemIndex) in _aFrameSetting?.list || []">
              <img
                v-if="typeof item.sky === 'string' && item.sky !== ''"
                :id="`sky-${item.name}`"
                :key="`${index}-${itemIndex}`"
                :src="item.sky"
                :alt="`sky-${item.name}`"
              />
              <video
                v-if="
                  typeof item.sky_video === 'string' && item.sky_video !== ''
                "
                :id="`sky_video-${item.name}`"
                :key="`${index}-${itemIndex}`"
                :src="item.sky_video"
                :alt="`sky_video-${item.name}`"
              />
              <template v-for="(subItem, subItemIndex) in item?.sub_list || []">
                <img
                  v-if="typeof subItem.sky === 'string' && subItem.sky !== ''"
                  :id="`sky-${subItem.name}`"
                  :key="`${index}-${itemIndex}-${subItemIndex}`"
                  :src="subItem.sky"
                  :alt="`sky-${subItem.name}`"
                />
                <video
                  v-if="
                    typeof subItem.sky_video === 'string' &&
                    subItem.sky_video !== ''
                  "
                  :id="`sky_video-${subItem.name}`"
                  :key="`${index}-${itemIndex}-${subItemIndex}`"
                  :src="subItem.sky_video"
                  :alt="`sky_video-${subItem.name}`"
                />
              </template>
            </template>
          </template>
        </a-assets>
        <a-sky :src="skyImg" aframe-sky-animation />
        <AframeSkyVideo
          v-if="typeof skyVideo === 'string' && skyVideo !== ''"
          :video-id="skyVideo"
        />

        <slot />
        <a-camera
          id="a_frame_engine-camera"
          active
          wasd-controls-enabled="false"
          look-controls="magicWindowTrackingEnabled: false;"
        >
          <a-entity
            v-if="aFrameStore.isAFrameArMode === false"
            cursor="rayOrigin: mouse"
            raycaster="objects: [data-raycastable]"
          />
          <a-cursor
            v-if="aFrameStore.isAFrameArMode === true"
            raycaster="objects: [data-raycastable]"
            animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
            animation__fusing="property: fusing; startEvents: fusing; from: 1 1 1; to: 0.1 0.1 0.1; dur: 1500"
            event-set__1="_event: mouseenter; color: #0092d8"
            event-set__2="_event: mouseleave; color: #004997"
            color="#004997"
          />
          <AframeVideo
            v-for="(video, index) in fixedVideo"
            :key="index"
            :title="video.title"
            :video-id="video.id"
            :video-src="video.videoSrc"
            :position="video.position"
            :rotation="video.rotation"
            :scale="video.scale"
            :autoplay="video.autoplay"
            :loop="video.loop"
            :fixed="true"
          />
        </a-camera>
        <!-- <a-video
          src="#beihai_tunnel_video"
          position="2.144 1.284 -1.865"
          rotation="0 90 0"
          video-control="loop: true;"
        /> -->
        <!-- <a-video
          src="#beihai_tunnel_video"
          position="2.144 1.284 -1.865"
          rotation="0 90 0"
          video-control="autoplay: true;"
        /> -->
        <!-- <a-videosphere
          src="#beihai_tunnel_video"
          video-control="loop:true; control:false;"
        /> -->
        <div ref="btnBlockDom" class="a_frame_engine-btn_block">
          <el-button class="a_frame_engine-btn_block-btn">
            <NuxtLink to="/360vr">
              <img
                src="/a_frame/icons/over_a_frame-icon.svg"
                class="a_frame_engine-btn_block-btn-icon"
                alt="結束VR(End)"
              />
              <div class="a_frame_engine-btn_block-btn-label">
                {{ $t('vr_header_1_1') }}
                <!-- <p>結束VR</p>
                <p>End</p> -->
              </div>
            </NuxtLink>
          </el-button>
          <el-button class="a_frame_engine-btn_block-btn">
            <NuxtLink to="/360vr/matsu-map">
              <img
                src="/a_frame/icons/map-icon.svg"
                class="a_frame_engine-btn_block-btn-icon"
                alt="地圖(Map)"
              />
              <div class="a_frame_engine-btn_block-btn-label">
                {{ $t('a_frame_engine_1') }}
                <!-- <p>地圖</p>
                <p>Map</p> -->
              </div>
            </NuxtLink>
          </el-button>
          <el-button id="vRButton" class="a_frame_engine-btn_block-btn">
            <img
              src="/a_frame/icons/vr_mode-icon.svg"
              class="a_frame_engine-btn_block-btn-icon"
              alt="VR模式(VR Mode)"
            />
            <div class="a_frame_engine-btn_block-btn-label">
              {{ $t('a_frame_engine_2') }}
              <!-- <p>VR模式</p>
              <p>VR Mode</p> -->
            </div>
          </el-button>
          <el-button class="a_frame_engine-btn_block-btn">
            <!-- @click="illustrateDialog = true" -->
            <img
              src="/a_frame/icons/illustrate-icon.svg"
              class="a_frame_engine-btn_block-btn-icon"
              alt="說明(Instructions)"
            />
            <div class="a_frame_engine-btn_block-btn-label">
              {{ $t('a_frame_engine_3') }}
              <!-- <p>說明</p>
              <p>Instructions</p> -->
            </div>
          </el-button>
          <el-button
            class="a_frame_engine-btn_block-rwd_ui_close"
            icon="el-icon-close"
            @click="handleRwdBtnTrigger(false)"
          />
        </div>
      </a-scene>
    </AframeContent>
    <ClientOnly>
      <!-- <el-dialog
        v-model="aFrameStore.dialogTrigger"
        :top="aFrameStore.dialogWindowTop || '0.9vh'"
        width="80vw"
        class="a_frame_engine-dialog"
        @close="hendleDialogClose"
      >
        <VRDialogContent />
      </el-dialog>
      <el-dialog
        v-model="aFrameStore.slideTrigger"
        top="13vh"
        width="100vw"
        class="a_frame_engine-dialog_slide"
        @close="hendleDlideClose"
      >
        <VRDialogSlideImgList />
      </el-dialog>
      <el-dialog
        v-model="aFrameStore.videoTrigger"
        top="5vh"
        width="98vw"
        class="a_frame_engine-dialog_video"
        @close="hendleVideoClose"
      >
        <VRDialogVideo />
      </el-dialog>
      <el-dialog
        v-model="illustrateDialog"
        top="var(--dialog_illustrate_top)"
        width="var(--dialog_illustrate_width)"
        class="a_frame_engine-dialog_illustrate"
      >
        <div class="a_frame_engine-dialog_illustrate-illustrate">
          <div
            v-for="(illustrate, index) in illustrateList"
            :key="index"
            class="a_frame_engine-dialog_illustrate-illustrate-row"
          >
            <div
              v-for="(_illustrate, _index) in illustrate"
              :key="_index"
              :class="[
                'a_frame_engine-dialog_illustrate-illustrate-row-block',
                _illustrate.class
              ]"
            >
              <div
                :class="[
                  'a_frame_engine-dialog_illustrate-illustrate-row-block-title',
                  _illustrate.titleClass
                ]"
              >
                <p>{{ _illustrate.title }}</p>
              </div>
              <div
                :class="[
                  'a_frame_engine-dialog_illustrate-illustrate-row-block-item_list',
                  _illustrate.itemClass
                ]"
              >
                <div
                  v-for="(illustrateItem, itemIndex) in _illustrate.item"
                  :key="itemIndex"
                  :class="[
                    'a_frame_engine-dialog_illustrate-illustrate-row-block-item_list-item',
                    illustrateItem.class
                  ]"
                >
                  <img
                    :class="[
                      'a_frame_engine-dialog_illustrate-illustrate-row-block-item_list-item-icon',
                      illustrateItem.iconClass
                    ]"
                    :src="illustrateItem.icon"
                  />
                  <div
                    :class="[
                      'a_frame_engine-dialog_illustrate-illustrate-row-block-item_list-item-icon_title',
                      illustrateItem.titleClass
                    ]"
                  >
                    <p>{{ illustrateItem.title }}</p>
                  </div>
                  <div
                    v-if="illustrateItem.zh_remark"
                    :class="[
                      'a_frame_engine-dialog_illustrate-illustrate-row-block-item_list-item-icon_remark',
                      illustrateItem.remarkClass
                    ]"
                  >
                    <p>{{ illustrateItem.remark }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
      <el-dialog
        v-model="guidedTourDialogTrigger"
        top="2.5vh"
        width="80vw"
        :class="`a_frame_engine-${paramsPlace}-guided_tour_dialog`"
      >
        <VRDialogContent
          :dialog-img="guidedTourDialogImg"
          :dialog-title="guidedTourDialogTitle"
          :dialog-content="guidedTourDialogContent"
        />
      </el-dialog> -->
    </ClientOnly>
    <el-button
      class="a_frame_engine-btn_block_rwd_ui_open"
      icon="el-icon-arrow-up"
      @click="handleRwdBtnTrigger(true)"
    />
  </NuxtLayout>
</template>

<script setup>
import { useAFrameStore } from '@/store/aFrameStore';
import { useSystemStore } from '@/store/system';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
useHead({
  titleTemplate: (titleChunk) => {
    // return titleChunk ? `${titleChunk} | 探索馬祖` : "探索馬祖";
    return titleChunk
      ? `${titleChunk} | ${t('360vr_item_title')}`
      : t('360vr_item_title');
  }
});

const RWD_HEIGHT = 450;

const aFrameStore = useAFrameStore();
const systemStore = useSystemStore();
const route = useRoute();
let time = -1;
const ms = 500;

const rwdBtnTrigger = ref(false);
const cssVariable = computed(() => {
  // const windowInnerWidth = systemStore.windowInnerWidth;
  const windowInnerHeight = systemStore.windowInnerHeight;
  const _cssVariable = {
    '--btn_block_width': btnBlockWidth.value,
    '--btn_block_bottom': '40px'
  };

  if (windowInnerHeight <= RWD_HEIGHT) {
    if (rwdBtnTrigger.value === true) {
      _cssVariable['--rwd_ui_trigger_bg_color'] = '#fff0';
      _cssVariable['--rwd_ui_open_opacity'] = '0';
      _cssVariable['--rwd_ui_close_opacity'] = '1';
    } else {
      _cssVariable['--rwd_ui_trigger_bg_color'] = '#ffffffe6';
      _cssVariable['--btn_block_bottom'] = '-135px';
      _cssVariable['--rwd_ui_open_opacity'] = '1';
      _cssVariable['--rwd_ui_close_opacity'] = '0';
    }
  } else {
    _cssVariable['--rwd_ui_trigger_display'] = 'none';
  }

  return _cssVariable;
});

const aframeApi = ref(null);
async function afterAframeLoad(_aframe) {
  aframeApi.value = _aframe;
  // console.log({ _aframe, window });
  await nextTick();
  aFrameStore.setAframeLoad(true);
  // aFrameStore.setAFrameLoading(false);
}
function beforeAframeLoad() {
  aFrameStore.setAFrameLoading(true);
  // console.log("beforeAframeLoad");
}

const btnBlockDom = ref(null);
const btnBlockWidth = ref('2px');
// const illustrateDialog = ref(false);
// const guidedTourDialogTrigger = ref(false);
const aFrameSettingList = ref([]);
// const aFrameSetting = computed(() => aFrameStore.aFrameSetting || []);
const paramsPlace = computed(() => route.params.place);
// const guidedTourDialogTitle = computed(
//   () => aFrameStore.aFramePageSetting?.guidedTourDialog?.title
// );
// const guidedTourDialogImg = computed(
//   () => aFrameStore.aFramePageSetting?.guidedTourDialog?.img
// );
// const guidedTourDialogContent = computed(
//   () => aFrameStore.aFramePageSetting?.guidedTourDialog?.content
// );

// const skyImg = computed(() => `#sky-${aFrameStore.aFramePageSetting?.name}`);
const skyImg = computed(() => {
  try {
    if (document.querySelector(`#sky-${aFrameStore.aFramePageSetting?.name}`)) {
      return `#sky-${aFrameStore.aFramePageSetting?.name}`;
    }
  } catch (_error) {}
  return aFrameStore.aFramePageSetting?.sky;
});
// const skyVideo = computed(() =>
//   aFrameStore.aFramePageSetting?.sky_video
//     ? `sky_video-${aFrameStore.aFramePageSetting?.name}`
//     : ""
// );
const skyVideo = computed(() => {
  if (aFrameStore.aFramePageSetting?.sky_video) {
    try {
      if (
        document.querySelector(
          `#sky_video-${aFrameStore.aFramePageSetting?.name}`
        )
      ) {
        return `#sky_video-${aFrameStore.aFramePageSetting?.name}`;
      }
    } catch (_error) {}
    return aFrameStore.aFramePageSetting?.sky_video;
  }
  return '';
});
const fixedVideo = computed(
  () => aFrameStore.aFrameData?.[paramsPlace.value]?.fixedVideo || []
);
// const illustrateList = computed(() => [
//   [
//     {
//       class: [
//         'a_frame_engine-dialog_illustrate-illustrate-row-block_mouse'
//       ].join(' '),
//       title: t('a_frame_engine_4'),
//       zh_title: '滑鼠操作',
//       en_title: 'Using a Mouse',
//       item: [
//         {
//           title: t('a_frame_engine_5'),
//           zh_title: '拖曳移動',
//           en_title: 'Drag to Move',
//           icon: '/a_frame/icons/illustrate/mouse-icon.svg'
//         }
//         // {
//         //   title: "捲軸縮放",
//         //   icon: "/a_frame/icons/illustrate/mouse-wheel-icon.svg",
//         // },
//       ]
//     },
//     {
//       class: [
//         'a_frame_engine-dialog_illustrate-illustrate-row-block_gesture_operation'
//       ].join(' '),
//       title: t('a_frame_engine_6'),
//       zh_title: '手勢操作',
//       en_title: 'Using Gestures',
//       item: [
//         {
//           title: t('a_frame_engine_7'),
//           zh_title: '拖曳移動',
//           en_title: 'Drag to Move',
//           icon: '/a_frame/icons/illustrate/gesture_operation_move-icon.svg'
//         }
//         // {
//         //   title: "捲軸縮放",
//         //   icon: "/a_frame/icons/illustrate/gesture_operation_zoom_out-icon.svg",
//         // },
//         // {
//         //   title: "捲軸縮放",
//         //   icon: "/a_frame/icons/illustrate/gesture_operation_zoom_in-icon.svg",
//         // },
//       ]
//     },
//     {
//       title: t('a_frame_engine_18'),
//       zh_title: '按鈕說明',
//       en_title: 'Button Instructions',
//       item: [
//         {
//           title: t('a_frame_engine_8'),
//           zh_title: '回到介紹頁',
//           en_title: 'Back to Intro Page',
//           icon: '/a_frame/icons/illustrate/home-icon.svg'
//         },
//         {
//           title: t('a_frame_engine_9'),
//           zh_title: '四鄉五島地圖',
//           en_title: 'Map of Inhabited Islands',
//           icon: '/a_frame/icons/illustrate/map-icon.svg'
//         },
//         {
//           title: t('a_frame_engine_2'),
//           zh_title: 'VR模式',
//           en_title: 'VR Mode',
//           icon: '/a_frame/icons/illustrate/vr-icon.svg',
//           remark: t('a_frame_engine_10'),
//           zh_remark: '需搭配VR設備',
//           en_remark: 'VR Equipment Required'
//           // remarkClass: [].join(" "),
//         },
//         {
//           title: t('a_frame_engine_11'),
//           zh_title: '操作說明',
//           en_title: 'Instructions',
//           icon: '/a_frame/icons/illustrate/illustrate-icon.svg'
//         }
//       ]
//     }
//   ],
//   [
//     {
//       title: t('a_frame_engine_12'),
//       zh_title: '導覽說明',
//       en_title: 'Navigation Instructions',
//       // titleClass: [].join(" "),
//       item: [
//         {
//           class: [
//             'a_frame_engine-dialog_illustrate-illustrate-row-block-item_list-item_navigation_instructions'
//           ].join(' '),
//           title: t('a_frame_engine_13'),
//           zh_title: '主題景點',
//           en_title: 'Theme Attractions',
//           // titleClass: [].join(" "),
//           icon: '/a_frame/icons/illustrate/theme-attractions-icon.svg',
//           iconClass: [
//             'a_frame_engine-dialog_illustrate-illustrate-row-block-item_list-item-icon_navigation_instructions'
//           ].join(' ')
//         },
//         {
//           class: [
//             'a_frame_engine-dialog_illustrate-illustrate-row-block-item_list-item_navigation_instructions'
//           ].join(' '),
//           title: t('a_frame_engine_14'),
//           zh_title: '景點',
//           en_title: 'Attractions',
//           // titleClass: [].join(" "),
//           icon: '/a_frame/icons/illustrate/attractions-icon.svg'
//           // iconClass: [].join(" "),
//         },
//         {
//           class: [
//             'a_frame_engine-dialog_illustrate-illustrate-row-block-item_list-item_navigation_instructions'
//           ].join(' '),
//           title: t('a_frame_engine_15'),
//           zh_title: '路線',
//           en_title: 'Route',
//           // titleClass: [].join(" "),
//           icon: '/a_frame/icons/illustrate/route-icon.svg',
//           iconClass: [
//             'a_frame_engine-dialog_illustrate-illustrate-row-block-item_list-item-route_icon'
//           ].join(' ')
//         },
//         {
//           class: [
//             'a_frame_engine-dialog_illustrate-illustrate-row-block-item_list-item_navigation_instructions'
//           ].join(' '),
//           title: t('a_frame_engine_16'),
//           zh_title: '景點詳情',
//           en_title: 'Attraction Details',
//           // titleClass: [].join(" "),
//           icon: '/a_frame/icons/illustrate/attractions-info-icon.svg'
//           // iconClass: [].join(" "),
//         },
//         {
//           class: [
//             'a_frame_engine-dialog_illustrate-illustrate-row-block-item_list-item_navigation_instructions'
//           ].join(' '),
//           title: t('a_frame_engine_17'),
//           zh_title: '景點照片',
//           en_title: 'Attraction Photos',
//           // titleClass: [].join(" "),
//           icon: '/a_frame/icons/illustrate/attractions-photo-icon.svg'
//           // iconClass: [].join(" "),
//         }
//       ]
//       // itemClass: [].join(" "),
//     }
//   ]
// ]);

// watch(
//   () => guidedTourDialogContent.value,
//   (newValue) => {
//     guidedTourDialogTrigger.value =
//       typeof newValue === 'string' && newValue !== '';
//   },
//   {
//     immediate: true
//   }
// );
watch(
  () => systemStore.windowInnerHeight,
  (newValue) => {
    rwdBtnTrigger.value = newValue > RWD_HEIGHT;
  }
);

// function hendleDialogClose() {
//   aFrameStore.setDialogImg('');
//   aFrameStore.setDialogTitle('');
//   aFrameStore.setDialogContent('');
// }
// function hendleDlideClose() {
//   aFrameStore.setSlideImgList([]);
// }
// function hendleVideoClose() {
//   aFrameStore.setVideoSrc('');
//   aFrameStore.setYoutubeId('');
//   aFrameStore.setVideoTitle('');
// }

function handleChackIsLandscape() {
  let _btnBlockWidth = 2;
  if (Number(btnBlockDom.value?.offsetWidth) > 0) {
    _btnBlockWidth = btnBlockDom.value?.offsetWidth;
  }
  btnBlockWidth.value = _btnBlockWidth + 'px';

  if (typeof aframeApi.value === 'object' && aframeApi.value !== null) {
    const scene = document.querySelector('a-scene');
    if (typeof scene?.is === 'function') {
      aFrameStore.setIsAFrameArMode(
        scene.is('a_frame-mode') || scene.is('ar-mode')
      );
    }
  }

  if (time !== -1) {
    clearTimeout(time);
    time = -1;
  }
  time = setTimeout(handleChackIsLandscape, ms);
}

function handleRwdBtnTrigger(payload = false) {
  const windowInnerHeight = systemStore.windowInnerHeight;
  if (windowInnerHeight <= RWD_HEIGHT) rwdBtnTrigger.value = payload;
}

onMounted(async () => {
  time = setTimeout(handleChackIsLandscape, ms);
  await nextTick();
  aFrameSettingList.value = aFrameStore.aFrameSetting;
});
onUnmounted(() => {
  aFrameStore.setAframeLoad(false);
  // guidedTourDialogTrigger.value = false;
  if (time !== -1) {
    clearTimeout(time);
  }
});
</script>

<style lang="scss">
.a_frame_engine {
  width: 100vw;
  height: 100vh;
  --el-button-bg-color: #fff0;
  --el-bg-color: rgb(255, 255, 255, 0%);
  --dialog_illustrate_width: 60%;
  --dialog_illustrate_top: 15vh;
  @include vrTablet {
    --dialog_illustrate_top: 5vh;
    --dialog_illustrate_width: auto;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    background: unset;
    padding: 0;
  }
  a-scene {
    cursor: default;
    user-select: none;
    .a-canvas {
      cursor: inherit;
      background: #fff;
      &.a-grab-cursor {
        cursor: inherit;
      }
    }
  }
  .el-dialog__headerbtn {
    top: 20px;
    right: 20px;
    font-size: 3.6rem;
    z-index: 10000000;
    .el-dialog__close {
      color: #fff;
    }
  }
  // &-dongyin_lighthouse,
  // &-a_thread_of_sky,
  // &-taibai_echo_cliff {
  //   &-guided_tour_dialog {
  //     .vr_dialog_content {
  //       &-title {
  //         text-align: center;
  //       }
  //     }
  //   }
  // }
  &-btn_block {
    --el-button-bg-color: #fff0;
    --rwd_ui_trigger_bg_color: #fff0;
    position: fixed;
    // bottom: 40px;
    bottom: var(--btn_block_bottom);
    // left: calc(50vw - 438.75px / 2);
    left: calc(50vw - var(--btn_block_width) / 2);
    z-index: 3;
    display: inline-flex;
    padding: 8px 40px;
    align-items: flex-start;
    gap: 24px;
    border-radius: 20px;
    background: #ffffffe6;
    backdrop-filter: blur(2px);
    transition: all 0.14s;
    @include mobile {
      padding: 8px 24px;
      // left: calc(50vw - 365.06px / 2);
    }
    &-btn {
      height: auto;
      border: 0;
      margin: 0 !important;
      background-color: #fff0;
      transition: all 0.14s;
      &.el-button {
        --el-button-bg-color: #fff0 !important;
        --el-border: 0 !important;
      }
      a {
        text-decoration: none;
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      > span {
        // display: block;
        flex-direction: column;
      }
      &-icon {
        display: block;
        width: 48px;
        height: 48px;
        @include mobile {
          width: 24px;
          height: 24px;
        }
      }
      &-label {
        color: #33b7c2;
        font-size: 1.6rem;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 24px */
        @include mobile {
          font-size: 1.2rem;
        }
        p {
          padding: 0;
          margin: 0;
        }
      }
    }
    &-rwd_ui_trigger {
      @extend .a_frame_engine-btn_block-btn;
      padding: 10px;
      display: var(--rwd_ui_trigger_display);
      color: #33b7c2;
      background-color: var(--rwd_ui_trigger_bg_color);
    }
    &-rwd_ui_close {
      @extend .a_frame_engine-btn_block-rwd_ui_trigger;
      position: absolute;
      right: 0px;
      top: 0px;
      opacity: var(--rwd_ui_close_opacity);
      border-radius: 100%;
      --el-border-radius-base: 100%;
    }
  }
  &-btn_block_rwd_ui_open {
    @extend .a_frame_engine-btn_block-rwd_ui_trigger;
    position: fixed;
    bottom: -5px;
    right: 10px;
    z-index: 50;
    opacity: var(--rwd_ui_open_opacity);
    border-top-left-radius: 20%;
    border-top-right-radius: 20%;
    background-color: #ffffffe6;
  }
  &-dialog {
  }
  &-dialog_slide {
    .el-dialog__headerbtn {
      position: fixed;
      top: 24px;
      right: 24px;
      // width: 48px;
      // height: 48px;
      font-size: 4.8rem;
    }
    .el-carousel__indicator--horizontal:not(.is-active) .el-carousel__button {
      background-color: #fff9;
    }
  }
  &-dialog_video {
    .el-dialog__headerbtn {
      top: 10px;
      right: 20px;
      font-size: 4.8rem;
    }
    .el-carousel__indicator--horizontal:not(.is-active) .el-carousel__button {
      background-color: #fff9;
    }
  }
  &-dialog_illustrate {
    background: rgba(13, 13, 13, 0.7);
    backdrop-filter: blur(2px);
    .el-dialog__headerbtn {
      top: 8px;
      right: 8px;
      font-size: 3.6rem;
      border-radius: 100px;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(2px);
    }
    &-illustrate {
      min-width: 885px;
      max-width: 100%;
      // min-height: 603px;
      padding: 80px;
      user-select: auto;
      @include vrTablet {
        padding: 40px;
        min-width: unset;
      }
      &-row {
        display: flex;
        gap: 40px;
        margin-bottom: 8px;
        @include vrTablet {
          flex-direction: column;
          &:not(:last-child) {
            margin-bottom: 40px;
          }
        }
        &-block {
          flex: 1;
          display: flex;
          flex-direction: column;
          // justify-content: space-between;
          &-title {
            padding: 4px;
            padding-bottom: 8px;
            margin-bottom: 24px;
            color: #fff;
            font-size: 2.4rem;
            font-style: normal;
            font-weight: 500;
            line-height: 150%; /* 36px */
            border-bottom: 0.5px solid #3cc8e7;
            p {
              padding: 0;
              margin: 0;
            }
          }
          &-item_list {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            row-gap: 40px;
            @include vrTablet {
              flex-wrap: wrap;
            }
            &-item {
              // height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              gap: 8px;
              @include vrTablet {
                flex-basis: 106px;
              }
              &-icon {
                margin: 0;
                object-fit: contain;
                height: 48px;
                // height: calc(100% - 24px - 16px - 17px);
              }
              &-route_icon {
                height: 70px;
                margin-top: -9px;
              }
              &-icon_navigation_instructions {
                height: 80px;
              }
              &-icon_title {
                margin: 0;
                color: #fff;
                font-size: 1.6rem;
                font-style: normal;
                font-weight: 700;
                line-height: normal;
                text-align: center;
                p {
                  margin: 0;
                  padding: 0;
                }
              }
              &-icon_remark {
                margin: 0;
                color: #fff;
                font-size: 1.2rem;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                text-align: center;
                p {
                  margin: 0;
                  padding: 0;
                }
              }
            }
            &-item_navigation_instructions {
              min-height: 120px;
              flex-basis: unset;
              height: 100%;
            }
          }
        }
        &-block_mouse {
          @include vrTablet {
            display: none;
          }
        }
        &-block_gesture_operation {
          display: none;
          @include vrTablet {
            display: flex;
          }
        }
      }
    }
  }
}
</style>
