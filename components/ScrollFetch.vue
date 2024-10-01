<template>
  <div
    ref="scrollFetchRef"
    class="scroll_fetch"
    :style="cssVariable"
    @mousedown="handlePullStart"
    @mousemove="handlePulling"
    @mouseup="handlePullEnd"
    @mouseover="handlePullEnd"
    @touchstart="handlePullStart"
    @touchmove="handlePulling"
    @touchend="handlePullEnd"
    @scroll="handleScroll"
  >
    <div v-if="refreshDisable === false" class="scroll_fetch-trigger">
      <template v-if="iosType === true">
        <slot
          v-if="refreshing === false"
          name="refresh"
          :isPulling="isPulling"
          :isPullStart="isPullStart"
          :isShowRefreshIcon="isShowRefreshIcon"
        >
          <p v-show="isShowRefreshIcon" class="scroll_fetch-trigger-label">
            {{ isPulling === true ? label : pullingLabel }}
          </p>
        </slot>
        <slot v-else name="refreshing">
          <!-- https://www.crazyegg.com/blog/loading-spinners-css3-animation/ loading icon -->
          <div class="scroll_fetch-trigger-refreshing">
            <div
              class="scroll_fetch-trigger-refreshing-loading_icon scroll_fetch-trigger-icon_center-loading_icon_animation"
            />
            <p class="scroll_fetch-trigger-refreshing-label">
              {{ loadingLabel }}
            </p>
          </div>
        </slot>
      </template>
      <div
        v-else
        class="scroll_fetch-trigger-icon_center"
        @transitionend="handleRefreshIcon"
      >
        <slot
          name="refreshIcon"
          :is-show-refresh-icon="isShowRefreshIcon"
          :is-pull-start="isPullStart"
        >
          <div
            v-if="hasRefreshIcon === false"
            v-show="isShowRefreshIcon"
            :class="{
              'scroll_fetch-trigger-icon_center-icon': true,
              'scroll_fetch-trigger-icon_center-loading_icon_animation':
                refreshing === true && isPullStart === false
            }"
          />
          <div
            v-else
            v-show="isShowRefreshIcon"
            :class="{
              'scroll_fetch-trigger-icon_center-icon_img_bg': true,
              'scroll_fetch-trigger-icon_center-icon_img_bg-refresh_icon_animation':
                refreshIconAnimation
            }"
          >
            <img
              :src="computedRefreshIcon"
              :class="{
                'scroll_fetch-trigger-icon_center-icon_img_bg-icon_img': true,
                'scroll_fetch-trigger-icon_center-loading_icon_animation':
                  refreshing === true && isPullStart === false
              }"
            />
          </div>
        </slot>
      </div>
    </div>

    <div class="scroll_fetch-container" @transitionend="handleRefreshIcon">
      <slot />
    </div>

    <div ref="infinityTriggerRef" />
    <slot
      v-if="infinityDisable === false"
      name="infinityLbael"
      :loading="infinityLoading"
      :infinity-end="infinityEnd"
    >
      <p v-if="infinityEnd === false" class="scroll_fetch-infinity_label">
        {{ infinityLoading === true ? loadingLabel : infinityLabel }}
      </p>
      <p v-else class="scroll_fetch-infinity_label">
        {{ infinityEndLabel }}
      </p>
    </slot>
  </div>
</template>

<script setup>
const MOVE_DISTANCE_LIMIT = 90;

const props = defineProps({
  label: { type: String, default: '下拉即可重整...' },
  height: { type: [String, Number], default: null },
  containerHeight: { type: [String, Number], default: null },
  pullingLabel: { type: String, default: '釋放即可重整...' },
  loadingLabel: { type: String, default: '加載中...' },
  refresh: { type: Function, default: null },
  refreshIcon: { type: String, default: null },
  refreshingIcon: { type: String, default: null },
  refreshDisable: { type: Boolean, default: true },
  loading: { type: Boolean, default: false },
  iosType: { type: Boolean, default: false },
  infinityLabel: { type: String, default: '拉至底部可繼續加載' },
  infinityEndLabel: { type: String, default: '沒有更多資料了' },
  infinityBuffer: { type: Number, default: 100 },
  infinityDisable: { type: Boolean, default: false },
  isScrollToFetch: { type: Boolean, default: true },
  infinityEnd: { type: Boolean, default: true },
  infinityFetch: { type: Function, default: null }
});
const emit = defineEmits(['refresh', 'infinityFetch', 'scroll']);

const scrollFetchRef = ref(null);
const infinityTriggerRef = ref(null);

const observer = ref(null);
const isPullStart = ref(false);
const isShowRefreshIcon = ref(false);

const startY = ref(0);
const moveDistance = ref(0);
const duration = ref(0);

const refreshing = ref(false);
const isPulling = ref(false);

const infinityLoading = ref(false);

const refreshIconAnimation = ref(false);
const refreshTriggerZIndex = ref(-1);
const refreshIconRotate = ref(0);

const cssVariable = computed(() => {
  const _cssVariable = {};

  if (props.iosType === true) {
    _cssVariable['--refresh_transition'] = `${duration.value}ms`;
    _cssVariable['--refresh_transform'] =
      `translate3d(0, ${moveDistance.value}px, 0)`;
  } else {
    _cssVariable['--refresh_icon_transition'] = `${duration.value}ms`;
    _cssVariable['--refresh_icon_transform'] = `translate3d(0, ${
      moveDistance.value - 25
    }px, 0)`;
    _cssVariable['--refresh_icon_rotate'] =
      `rotate(${refreshIconRotate.value}deg)`;
  }

  if (typeof props.height === 'string' && props.height !== '') {
    _cssVariable['--refresh_height'] = props.height;
  } else if (typeof typeof props.height === 'number') {
    _cssVariable['--refresh_height'] = `${props.height}px`;
  }

  if (moveDistance.value > 0) {
    _cssVariable['--refresh_overflow'] = 'hidden';
    // _cssVariable['--refresh_trigger_z_index'] = 2;
  } else {
    _cssVariable['--refresh_overflow'] = 'auto';
    // _cssVariable['--refresh_trigger_z_index'] = -1;
  }
  _cssVariable['--refresh_trigger_z_index'] = refreshTriggerZIndex.value;

  return _cssVariable;
});

const hasRefreshIcon = computed(() => {
  return typeof props.refreshIcon === 'string' && props.refreshIcon !== '';
});
const computedRefreshIcon = computed(() => {
  return (
    (refreshing.value === true && isPullStart.value === false
      ? props.refreshingIcon
      : props.refreshIcon) || props.refreshIcon
  );
});

watch(
  () => refreshing.value,
  (newRefreshing) => {
    if (newRefreshing === false && duration.value === 300) {
      moveDistance.value = 0;
      refreshIconRotate.value = 0;
      isPulling.value = false;
    }
  }
);

onMounted(() => {
  // window.addEventListener('scroll', scrollEventListener);
  observer.value = new IntersectionObserver((entries) => {
    if (
      props.loading === false &&
      entries[0].isIntersecting &&
      props.infinityDisable === false &&
      props.infinityEnd === false
    ) {
      // console.log('元素已出現在畫面可視範圍內');
      handleInfinityFetch();
    }
  });

  observer.value.observe(infinityTriggerRef.value);
});
onUnmounted(() => {
  // window.removeEventListener('scroll', scrollEventListener);
  if (
    typeof infinityTriggerRef.value === 'object' &&
    infinityTriggerRef.value !== null
  ) {
    observer.value.unobserve(infinityTriggerRef.value);
  }
});
function getCurrentDistance() {
  const rect = scrollFetchRef.value.getBoundingClientRect();
  const scrollTop = window.innerHeight;

  return rect.bottom - scrollTop;
}
// function scrollEventListener(e) {
//   if (
//     infinityLoading.value === true ||
//     props.infinityEnd === true ||
//     props.isScrollToFetch !== true
//   ) {
//     return;
//   }
//   if (getCurrentDistance() <= props.infinityBuffer) {
//     handleInfinityFetch();
//   }
// }
async function handleInfinityFetch() {
  if (infinityLoading.value === true) {
    return;
  }

  infinityLoading.value = true;
  if (typeof props.infinityFetch === 'function') {
    await props.infinityFetch();
    infinityLoading.value = false;
  } else {
    emit('infinityFetch', () => {
      infinityLoading.value = false;
    });
  }
}

function handlePullStart(e) {
  if (
    props.refreshDisable === true ||
    infinityLoading.value === true ||
    refreshing.value === true
  ) {
    return;
  }
  // const scrollTop =
  //   scrollFetchRef.value?.scrollTop ||
  //   document.body?.scrollTop ||
  //   window.screenY ||
  //   window.pageYOffset;
  const scrollTop = scrollFetchRef.value?.scrollTop;

  if (scrollTop > 0) return;

  isPullStart.value = true;
  duration.value = 0;
  moveDistance.value = 0;
  refreshIconRotate.value = 0;
  startY.value =
    e.targetTouches?.[0]?.clientY ||
    e.targetTouches?.[0]?.pageY ||
    e.targetTouches?.[0]?.offsetY ||
    e.changedTouches?.[0]?.clientY ||
    e.changedTouches?.[0]?.pageY ||
    e.changedTouches?.[0]?.offsetY ||
    e.clientY;
}
function handlePulling(e) {
  if (
    props.refreshDisable === true ||
    isPullStart.value !== true ||
    infinityLoading.value === true ||
    refreshing.value === true ||
    props.loading === true
  )
    return;
  // const scrollTop =
  //   scrollFetchRef.value?.scrollTop ||
  //   document.body?.scrollTop ||
  //   window.screenY ||
  //   window.pageYOffset;
  const scrollTop = scrollFetchRef.value?.scrollTop;

  if (scrollTop > 0) return;

  const currentClientY =
    e.targetTouches?.[0]?.clientY ||
    e.targetTouches?.[0]?.pageY ||
    e.targetTouches?.[0]?.offsetY ||
    e.changedTouches?.[0]?.clientY ||
    e.changedTouches?.[0]?.pageY ||
    e.changedTouches?.[0]?.offsetY ||
    e.clientY;
  const move = currentClientY - startY.value;

  if (startY.value > 0 && move > 0) {
    isShowRefreshIcon.value = true;
    if (props.iosType === false) {
      refreshTriggerZIndex.value = 2;
    }

    const _moveDistance = Math.pow(move, 0.8);

    if (_moveDistance < MOVE_DISTANCE_LIMIT + 10) {
      moveDistance.value = _moveDistance;
      refreshIconRotate.value = _moveDistance * 3.5;
    }
    isPulling.value = _moveDistance > MOVE_DISTANCE_LIMIT;

    if (props.iosType === false) {
      refreshIconAnimation.value = _moveDistance > MOVE_DISTANCE_LIMIT;
    }
  }
}
async function handlePullEnd(e) {
  isPullStart.value = false;
  startY.value = 0;
  duration.value = 300;

  if (moveDistance.value <= 6) {
    moveDistance.value = 0;
    refreshIconRotate.value = 0;
    refreshTriggerZIndex.value = -1;
    isShowRefreshIcon.value = false;
  } else {
    nextTick(() => {
      window.requestAnimationFrame(() => {
        moveDistance.value = 0;
        refreshIconRotate.value = 0;
      });
    });
  }

  if (
    props.refreshDisable === true ||
    refreshing.value === true ||
    infinityLoading.value === true
  ) {
    return;
  }

  if (moveDistance.value > MOVE_DISTANCE_LIMIT && isPulling.value === true) {
    refreshing.value = true;
    isPulling.value = false;
    if (props.iosType === true) {
      moveDistance.value = 50;
    }
    if (typeof props.refresh === 'function') {
      await props.refresh();
      refreshing.value = false;
    } else {
      emit('refresh', () => {
        refreshing.value = false;
      });
    }
  } else {
    moveDistance.value = 0;
    refreshIconRotate.value = 0;
  }
}
function handleRefreshIcon() {
  if (refreshing.value === false) {
    window.requestAnimationFrame(() => {
      refreshTriggerZIndex.value = -1;
      isShowRefreshIcon.value = false;
    });
  }
}
function handleScroll(e) {
  emit('scroll', e);
}
</script>

<style lang="scss" scoped>
.scroll_fetch {
  position: relative;
  height: var(--refresh_height);
  overflow: var(--refresh_overflow);
  &-trigger {
    position: absolute;
    top: 0;
    // z-index: 2;
    z-index: var(--refresh_trigger_z_index);
    min-height: 30px;
    width: 100%;
    &-label {
      font-size: 14px;
      color: rgba(69, 90, 100, 0.6);
      text-align: center;
      margin: 0;
    }
    &-refreshing {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 5px;
      margin-top: 10px;
      margin-bottom: 20px;
      &-loading_icon {
        width: 23px;
        height: 23px;
        border: 4px solid lightgray;
        border-top: 4px solid $primary;
        border-radius: 50%;
      }
      &-label {
        @extend .scroll_fetch-trigger-label;
      }
    }
    &-icon_center {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: all var(--refresh_icon_transition);
      transform: var(--refresh_icon_transform);
      &-loading_icon_animation {
        animation: loading_animation 1s linear infinite;
      }
      &-icon {
        @extend .scroll_fetch-trigger-refreshing-loading_icon;
        margin: auto;
        transition: var(--refresh_icon_transition);
      }
      &-icon_img_bg {
        margin: auto;
        width: 40px;
        height: 40px;
        display: flex;
        border-radius: 50%;
        background-color: #fff;
        box-shadow:
          0 1px 6px rgba(0, 0, 0, 0.117647),
          0 1px 4px rgba(0, 0, 0, 0.117647);

        &-refresh_icon_animation {
          animation: refresh_icon_animation 0.2s;
        }
        &-icon_img {
          display: block;
          width: 23px;
          height: 23px;
          margin: auto;
          transition: var(--refresh_icon_transition);
          transform: var(--refresh_icon_rotate);
        }
      }
    }
  }
  &-container {
    transition: all var(--refresh_transition);
    transform: var(--refresh_transform);
  }
  &-infinity_label {
    @extend .scroll_fetch-trigger-label;
  }
}
@keyframes loading_animation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes refresh_icon_animation {
  from {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  to {
    transform: scale(1);
  }
}
</style>
