<template>
  <div
    ref="scrollFetchRef"
    class="scroll_fetch"
    :style="cssVariable"
    v-scroll-end="{
      handler: handleScrollEnd,
      wait: scrollEndWait
    }"
    @mousedown="handlePullStart"
    @mousemove="handlePulling"
    @mouseup="handlePullEnd"
    @touchstart="handlePullStart"
    @touchmove="handlePulling"
    @touchend="handlePullEnd"
    @wheel="handleWheel"
    @scroll="handleScroll"
  >
    <div v-if="refreshDisable === false" class="scroll_fetch-trigger">
      <template v-if="iosStyle === true">
        <slot
          v-if="refreshing === false"
          name="refresh"
          :isPulling="isPulling"
          :isPullStart="isPullStart"
          :isShowRefreshIcon="isShowRefreshIcon"
        >
          <p v-show="isShowRefreshIcon" class="scroll_fetch-trigger-label">
            {{ isPulling === true ? pullingLabel : label }}
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

    <div
      v-if="isEmpty === false"
      class="scroll_fetch-container"
      @mouseover="handlePullEnd"
      @transitionend="handleRefreshIcon"
    >
      <slot />
    </div>

    <div v-if="isEmpty === true" class="scroll_fetch-empty">
      <slot name="empty">
        <p class="scroll_fetch-empty-label">{{ emptyLabel }}</p>
      </slot>
    </div>

    <div ref="infinityTriggerRef" />
    <slot
      v-if="infinityDisable === false"
      name="infinityLabel"
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
const MOVE_DISTANCE_LIMIT = 50;

const { $polyfillScrollEnd } = useNuxtApp();

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
  iosStyle: { type: Boolean, default: false },
  iosTypeIconSize: { type: [String, Number], default: 10 },
  iosTypeIconStrokeWidth: { type: [String, Number], default: 2 },
  isEmpty: { type: Boolean, default: false },
  emptyLabel: { type: String, default: '暂无资料' },
  useObserver: { type: Boolean, default: true }, // infinty scroll 的觸發方式
  infinityLabel: { type: String, default: '拉至底部可繼續加載' },
  infinityEndLabel: { type: String, default: '沒有更多資料了' },
  infinityBuffer: { type: Number, default: null },
  infinityDisable: { type: Boolean, default: false },
  isScrollToFetch: { type: Boolean, default: true },
  infinityEnd: { type: Boolean, default: true },
  infinityFetch: { type: Function, default: null },
  vibrate: { type: Boolean, default: false },
  scrollEndWait: { type: Number, default: 100 },
  infinityTimeout: { type: Number, default: null }
});
const emit = defineEmits([
  'refresh',
  'infinityFetch',
  'wheel',
  'scroll',
  'scrollEnd',
  'infinityFail'
]);

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

const infinityTrigger = ref(false);
const infinityLoading = ref(false);
const infinityTimeoutTimer = ref(null);

const refreshIconAnimation = ref(false);
const refreshTriggerZIndex = ref(-1);
const refreshIconRotate = ref(0);

const parentScrollIsTop = ref(false);
const parentIsScrollIng = ref(false);
const removeParentScrollEnd = ref(() => {});

const windowScrollIsTop = ref(false);
const windowIsScrollIng = ref(false);
const removeWindowScrollEnd = ref(() => {});

const cssVariable = computed(() => {
  const _cssVariable = {};

  if (props.iosStyle === true) {
    _cssVariable['--refresh_transition'] = `${duration.value}ms`;
    _cssVariable['--refresh_transform'] =
      `translate3d(0, ${moveDistance.value}px, 0)`;

    if (typeof props.iosTypeIconSize === 'string') {
      _cssVariable['--refresh_ios_type_icon_size'] = props.iosTypeIconSize;
    } else if (typeof props.iosTypeIconSize === 'number') {
      _cssVariable['--refresh_ios_type_icon_size'] =
        `${props.iosTypeIconSize}px`;
    }

    if (typeof props.iosTypeIconStrokeWidth === 'string') {
      _cssVariable['--refresh_ios_type_icon_stroke_width'] =
        props.iosTypeIconStrokeWidth;
    } else if (typeof props.iosTypeIconStrokeWidth === 'number') {
      _cssVariable['--refresh_ios_type_icon_stroke_width'] =
        `${props.iosTypeIconStrokeWidth}px`;
    }
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
  } else if (typeof props.height === 'number') {
    _cssVariable['--refresh_height'] = `${props.height}px`;
  }

  if (
    typeof props.containerHeight === 'string' &&
    props.containerHeight !== ''
  ) {
    _cssVariable['--refresh_container_height'] = props.containerHeight;
  } else if (typeof props.containerHeight === 'number') {
    _cssVariable['--refresh_container_height'] = `${props.containerHeight}px`;
  }

  if (moveDistance.value > 0) {
    _cssVariable['--refresh_overflow'] = 'hidden';
    if (typeof document?.querySelector === 'function') {
      document.querySelector('html').classList.add('scroll_fetching');
    }

    // _cssVariable['--refresh_trigger_z_index'] = 2;
  } else {
    _cssVariable['--refresh_overflow'] = 'auto';
    if (typeof document?.querySelector === 'function') {
      document.querySelector('html').classList.remove('scroll_fetching');
    }

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
watch(
  () => props.loading,
  async (newLoading) => {
    if (newLoading === false) {
      duration.value = 300;
      await nextTick();

      setTimeout(() => {
        isShowRefreshIcon.value = false;
        moveDistance.value = 0;
        refreshIconRotate.value = 0;
        isPulling.value = false;
      }, 300);
    }
  }
);
watch(
  () => props.useObserver,
  (newUseObserver) => {
    if (newUseObserver === true) {
      if (typeof observer.value?.observe === 'function') {
        observer.value.observe(infinityTriggerRef.value);
      } else {
        observer.value = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            // console.log('元素已出現在畫面可視範圍內');
            // handleInfinityFetch();

            infinityTrigger.value = true;
          }
        });

        observer.value.observe(infinityTriggerRef.value);
      }
    } else if (
      newUseObserver === false &&
      typeof observer.value?.unobserve === 'function' &&
      typeof infinityTriggerRef.value === 'object' &&
      infinityTriggerRef.value !== null
    ) {
      observer.value.unobserve(infinityTriggerRef.value);
    }
  },
  { immediate: true }
);
watch(
  () => props.infinityBuffer,
  (newInfinityBuffer) => {
    const elementInfo = scrollFetchRef.value || {};

    infinityTrigger.value = createNewInfinityTrigger(
      elementInfo.scrollHeight,
      elementInfo.scrollTop,
      newInfinityBuffer
    );
  }
);
watch(
  () => infinityTrigger.value,
  (newInfinityTrigger) => {
    handleInfinityTrigger(
      newInfinityTrigger,
      infinityLoading.value,
      props.infinityDisable,
      props.infinityEnd
    );
  }
);

onMounted(() => {
  if (
    typeof scrollFetchRef.value?.parentElement?.addEventListener === 'function'
  ) {
    scrollFetchRef.value.parentElement.addEventListener('scroll', parentScroll);
    removeParentScrollEnd.value = $polyfillScrollEnd(
      scrollFetchRef.value.parentElement,
      parentScrollEnd
    );
  }

  window.addEventListener('contextmenu', handlePullEnd);
  window.addEventListener('scroll', windowScroll);

  removeWindowScrollEnd.value = $polyfillScrollEnd(window, windowScrollEnd);

  // observer.value = new IntersectionObserver((entries) => {
  //   if (entries[0].isIntersecting) {
  //     // console.log('元素已出現在畫面可視範圍內');
  //     // handleInfinityFetch();
  //     infinityTrigger.value = true;
  //   }
  // });

  // observer.value.observe(infinityTriggerRef.value);
});
onUnmounted(() => {
  window.removeEventListener('contextmenu', handlePullEnd);
  window.removeEventListener('scroll', windowScroll);

  if (typeof removeWindowScrollEnd.value === 'function') {
    removeWindowScrollEnd.value();
  }

  if (
    typeof observer.value?.unobserve === 'function' &&
    typeof infinityTriggerRef.value === 'object' &&
    infinityTriggerRef.value !== null
  ) {
    observer.value.unobserve(infinityTriggerRef.value);
  }
});
async function handleInfinityTrigger(
  currentInfinityTrigger = false,
  currentInfinityLoading = false,
  currentInfinityDisable = false,
  currentInfinityEnd = false
) {
  if (currentInfinityTrigger !== true) return;

  if (currentInfinityLoading !== true) {
    if (typeof infinityTimeoutTimer.value === 'number') {
      clearTimeout(infinityTimeoutTimer.value);
    }

    const infinityTimeout =
      typeof props.infinityTimeout === 'number' && props.infinityTimeout > 0
        ? props.infinityTimeout
        : 100;

    infinityTimeoutTimer.value = setTimeout(async () => {
      await nextTick();
      clearTimeout(infinityTimeoutTimer.value);
      infinityTimeoutTimer.value = null;

      infinityLoading.valueOf = false;
    }, infinityTimeout);
  }

  if (currentInfinityDisable === false && currentInfinityEnd === false) {
    await handleInfinityFetch();
  }

  const elementInfo = scrollFetchRef.value || {};

  // infinityTrigger.value = false;
  infinityTrigger.value = createNewInfinityTrigger(
    elementInfo.scrollHeight,
    elementInfo.scrollTop
  );
}
async function handleInfinityFetch() {
  if (infinityLoading.value === true) {
    return;
  }

  if (typeof infinityTimeoutTimer.value === 'number') {
    clearTimeout(infinityTimeoutTimer.value);
  }

  infinityLoading.value = true;

  try {
    await Promise(async (resolve, reject) => {
      try {
        // 如果沒有正常觸發釋放事件，則由props.timeout自動釋放
        if (
          typeof props.infinityTimeout === 'number' &&
          props.infinityTimeout > 0
        ) {
          infinityTimeoutTimer.value = setTimeout(async () => {
            await nextTick();
            clearTimeout(infinityTimeoutTimer.value);
            infinityTimeoutTimer.value = null;

            reject(new Error('Infinity fetch timeout exceeded'));
          }, props.infinityTimeout);
        }

        if (typeof props.infinityFetch === 'function') {
          await props.infinityFetch();

          resolve();
        } else {
          emit('infinityFetch', () => resolve());
        }
      } catch (error) {
        reject(error);
      }
    });
  } catch (error) {
    console.error('ScrollFetch infinity fetch error:', error);

    emit('infinityFail', error);
  }

  if (typeof infinityTimeoutTimer.value === 'number') {
    clearTimeout(infinityTimeoutTimer.value);
    infinityTimeoutTimer.value = null;
  }
  infinityLoading.value = false;
}

function handlePullStart(e) {
  if (
    (windowIsScrollIng.value === true && windowScrollIsTop.value === false) ||
    (parentIsScrollIng.value === true && parentScrollIsTop.value === false) ||
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
    e.clientY ||
    e.pageY ||
    e.offsetY;
}
function handlePulling(e) {
  if (
    (parentIsScrollIng.value === true && parentScrollIsTop.value === false) ||
    (windowIsScrollIng.value === true && windowScrollIsTop.value === false)
  ) {
    moveDistance.value = 20;
    handlePullEnd(e);
  } else if (
    isPullStart.value === false &&
    ((parentIsScrollIng.value === true && parentScrollIsTop.value === true) ||
      (windowIsScrollIng.value === true && windowScrollIsTop.value === true))
  ) {
    handlePullStart(e);
  }

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
    e.clientY ||
    e.pageY ||
    e.offsetY;
  const move = currentClientY - startY.value;

  if (startY.value > 0 && move > 0) {
    isShowRefreshIcon.value = true;
    if (props.iosStyle === false) {
      refreshTriggerZIndex.value = 2;
    }

    const _moveDistance = Math.pow(move, 0.8);

    if (_moveDistance < MOVE_DISTANCE_LIMIT + 5) {
      moveDistance.value = _moveDistance;
      refreshIconRotate.value = _moveDistance * 5.5;
    } else if (
      props.vibrate === true &&
      typeof window?.navigator?.vibrate === 'function' &&
      _moveDistance <= MOVE_DISTANCE_LIMIT + 4 &&
      _moveDistance >= MOVE_DISTANCE_LIMIT + 3
    ) {
      window.navigator.vibrate(100);
    }
    isPulling.value = _moveDistance > MOVE_DISTANCE_LIMIT;

    if (props.iosStyle === false) {
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
  }

  if (
    props.refreshDisable === true ||
    refreshing.value === true ||
    infinityLoading.value === true
  ) {
    if (moveDistance.value > 6) {
      nextTick(() => {
        window.requestAnimationFrame(() => {
          moveDistance.value = 0;
          refreshIconRotate.value = 0;
        });
      });
    }
    return;
  }

  if (moveDistance.value > MOVE_DISTANCE_LIMIT && isPulling.value === true) {
    refreshing.value = true;
    isPulling.value = false;
    if (props.iosStyle === true) {
      moveDistance.value = 50;
    }
    if (typeof props.refresh === 'function') {
      await props.refresh(handleRefreshDone);
      handleRefreshDone();
    } else {
      emit('refresh', handleRefreshDone);
    }
  } else {
    moveDistance.value = 0;
    refreshIconRotate.value = 0;
  }
}
async function handleRefreshDone() {
  refreshing.value = false;

  if (props.iosStyle === true) {
    await nextTick();

    moveDistance.value = 0;
    refreshIconRotate.value = 0;
    isPulling.value = false;
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
function handleWheel(e) {
  emit('wheel', e);
}
function handleScroll(e) {
  emit('scroll', e);

  if (props.useObserver === false) {
    const scrollHeight = e?.target?.scrollHeight || 1;
    const scrollTop = e?.target?.scrollTop || 0;

    infinityTrigger.value = createNewInfinityTrigger(scrollHeight, scrollTop);
  }
}
function handleScrollEnd(e) {
  // console.log('scrollEnd', e);
  emit('scrollEnd', e);
}
function createNewInfinityTrigger(
  scrollHeight = 1,
  scrollTop = 0,
  newInfinityBuffer
) {
  const infinityBuffer = newInfinityBuffer || props.infinityBuffer || 0;
  const safeScrollHeight = typeof scrollHeight === 'number' ? scrollHeight : 1;
  const safeScrollTop = typeof scrollTop === 'number' ? scrollTop : 0;

  // const infinityLimint = safeScrollHeight * (props.infinityBuffer || 1);
  const infinityLimint = safeScrollHeight + infinityBuffer;

  // console.log({
  //   scrollHeight,
  //   safeScrollHeight,
  //   infinityLimint,
  //   scrollTop,
  //   safeScrollTop,
  // });

  return safeScrollTop >= infinityLimint;
}
function parentScroll(e) {
  if (e.target === scrollFetchRef.value || e.target === window) {
    if (e.target === scrollFetchRef.value) {
      parentScrollIsTop.value = false;
      parentIsScrollIng.value = false;
    }
    return;
  }

  parentIsScrollIng.value = true;

  parentScrollIsTop.value = scrollFetchRef.value?.parentElement?.scrollTop <= 0;
}
function parentScrollEnd(e) {
  if (e.target === scrollFetchRef.value || e.target === window) {
    return;
  }

  parentIsScrollIng.value = false;

  parentScrollIsTop.value = scrollFetchRef.value?.parentElement.scrollTop <= 0;
}
function windowScroll(e) {
  if (e.target === scrollFetchRef.value) {
    windowScrollIsTop.value = false;
    windowIsScrollIng.value = false;
    return;
  }

  windowIsScrollIng.value = true;

  const scrollTriggerElement =
    e.target?.body || e.target?.document?.body || e.target;
  const scrollTriggerElementBoundingClientReact =
    scrollTriggerElement?.getBoundingClientRect?.();

  windowScrollIsTop.value = scrollTriggerElementBoundingClientReact?.y <= 0;
}
function windowScrollEnd(e) {
  windowIsScrollIng.value = false;

  const scrollElement = e.target?.body || e.target?.document?.body || e.target;
  const scrollElementBoundingClientReact =
    scrollElement?.getBoundingClientRect?.();

  windowScrollIsTop.value = scrollElementBoundingClientReact?.y <= 0;
}
</script>

<style lang="scss">
.scroll_fetching {
  overflow: hidden;

  *:not(.scroll_fetch):not(.scroll_fetch *) {
    overflow: hidden;
  }
}
</style>

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
        // width: 23px;
        // height: 23px;
        // border: 4px solid lightgray;
        // border-top: 4px solid $primary;

        width: var(--refresh_ios_type_icon_size);
        height: var(--refresh_ios_type_icon_size);
        border: var(--refresh_ios_type_icon_stroke_width) solid lightgray;
        border-top: var(--refresh_ios_type_icon_stroke_width) solid $primary;

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
    height: var(--refresh_container_height);
    transition: all var(--refresh_transition);
    transform: var(--refresh_transform);
  }
  &-empty {
    height: var(--refresh_container_height, 100%);
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    &-label {
      margin: auto;
      margin-top: 50%;
      text-align: center;
    }
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
