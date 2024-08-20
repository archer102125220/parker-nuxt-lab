<template>
  <div
    class="scroll_fetch"
    ref="containerRef"
    :style="cssVariable"
    @mousedown="handlePullStart"
    @mousemove="handlePulling"
    @mouseup="handlePullEnd"
    @mouseover="handlePullEnd"
    @touchstart="handlePullStart"
    @touchmove="handlePulling"
    @touchend="handlePullEnd"
  >
    <div class="scroll_fetch-trigger">
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
              {{ refreshingLabel }}
            </p>
          </div>
        </slot>
      </template>
      <div v-else class="scroll_fetch-trigger-icon_center">
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
                isPullStart === false
            }"
          />
          <div
            v-else
            v-show="isShowRefreshIcon"
            class="scroll_fetch-trigger-icon_center-icon_img_bg"
          >
            <img
              :src="computedRefreshIcon"
              :class="{
                'scroll_fetch-trigger-icon_center-icon_img_bg-icon_img': true,
                'scroll_fetch-trigger-icon_center-loading_icon_animation':
                  isPullStart === false
              }"
            />
          </div>
        </slot>
      </div>
    </div>

    <div class="scroll_fetch-container">
      <slot />
    </div>

    <div ref="infinityTriggerRef" />
    <slot
      name="infinityLbael"
      :loading="infinityLoading"
      :infinityEnd="infinityEnd"
    >
      <p v-if="infinityEnd === false" class="scroll_fetch-infinity_label">
        {{ infinityLoading === true ? refreshingLabel : infinityLabel }}
      </p>
      <p v-else class="scroll_fetch-infinity_label">
        {{ infinityEndLbael }}
      </p>
    </slot>
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: '下拉即可刷新...' },
  height: { type: [String, Number], default: null },
  pullingLabel: { type: String, default: '释放即可刷新...' },
  refreshingLabel: { type: String, default: '加载中...' },
  refresh: { type: Function, default: null },
  refreshIcon: { type: String, default: null },
  refreshingIcon: { type: String, default: null },
  iosType: { type: Boolean, default: true },
  infinityLabel: { type: String, default: '拉至底部可繼續加载' },
  infinityEndLbael: { type: String, default: '沒有更多資料了' },
  infinityBuffer: { type: Number, default: 100 },
  isScrollToFetch: { type: Boolean, default: true },
  infinityEnd: { type: Boolean, default: true },
  infinityFetch: { type: Function, default: null }
});
const emit = defineEmits(['refresh', 'infinityFetch']);

const containerRef = ref(null);
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

const cssVariable = computed(() => {
  const _cssVariable = {};

  if (props.iosType === true) {
    _cssVariable['--refresh_transition'] = `${duration.value}ms`;
    _cssVariable[
      '--refresh_transform'
    ] = `translate3d(0, ${moveDistance.value}px, 0)`;
  } else {
    _cssVariable['--refresh_icon_transition'] = `${duration.value}ms`;
    _cssVariable['--refresh_icon_transform'] = `translate3d(0, ${
      moveDistance.value - 25
    }px, 0)`;
  }

  if (typeof props.height === 'string' && props.height !== '') {
    _cssVariable['--refresh_height'] = props.height;
  } else if (typeof typeof props.height === 'number') {
    _cssVariable['--refresh_height'] = `${props.height}px`;
  }

  if (moveDistance.value > 0) {
    _cssVariable['--refresh_overflow'] = 'hidden';
  } else {
    _cssVariable['--refresh_overflow'] = 'auto';
  }

  return _cssVariable;
});

const hasRefreshIcon = computed(() => {
  return typeof props.refreshIcon === 'string' && props.refreshIcon !== '';
});
const computedRefreshIcon = computed(() => {
  return (
    (isPullStart.value === true ? props.refreshIcon : props.refreshingIcon) ||
    props.refreshIcon
  );
});

watch(
  () => refreshing.value,
  (newRefreshing) => {
    if (newRefreshing === false && duration.value === 300) {
      moveDistance.value = 0;
      isPulling.value = false;
    }
  }
);

onMounted(() => {
  // window.addEventListener('scroll', scrollEventListener);
  observer.value = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
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
  const rect = containerRef.value.getBoundingClientRect();
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
  // const scrollTop =
  //   containerRef.value?.scrollTop ||
  //   document.body?.scrollTop ||
  //   window.screenY ||
  //   window.pageYOffset;
  const scrollTop = containerRef.value?.scrollTop;

  if (scrollTop > 0) return;

  isPullStart.value = true;
  duration.value = 0;
  moveDistance.value = 0;
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
  if (isPullStart.value !== true) return;
  // const scrollTop =
  //   containerRef.value?.scrollTop ||
  //   document.body?.scrollTop ||
  //   window.screenY ||
  //   window.pageYOffset;
  const scrollTop = containerRef.value?.scrollTop;

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

  if (move > 0) {
    isShowRefreshIcon.value = true;
    const _moveDistance = Math.pow(move, 0.8);

    moveDistance.value = _moveDistance;
    isPulling.value = _moveDistance > 50;
  }
}
async function handlePullEnd(e) {
  isPullStart.value = false;
  startY.value = 0;
  duration.value = 300;
  if (moveDistance.value > 50 && isPulling.value === true) {
    refreshing.value = true;
    isPulling.value = false;
    if (props.iosType === true) {
      moveDistance.value = 50;
    }
    if (typeof props.refresh === 'function') {
      await props.refresh();
      refreshing.value = false;
      setTimeout(() => {
        isShowRefreshIcon.value = false;
      }, 100);
    } else {
      emit('refresh', () => {
        refreshing.value = false;
        setTimeout(() => {
          isShowRefreshIcon.value = false;
        }, 100);
      });
    }
  } else {
    isShowRefreshIcon.value = false;
    moveDistance.value = 0;
  }
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
    z-index: -1;
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
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647),
          0 1px 4px rgba(0, 0, 0, 0.117647);
        &-icon_img {
          display: block;
          width: 23px;
          height: 23px;
          margin: auto;
          transition: var(--refresh_icon_transition);
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
</style>