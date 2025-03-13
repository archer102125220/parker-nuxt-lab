<template>
  <div class="slide_in_panel_list" :style="cssVariable" :left-enter="leftEnter">
    <div
      v-for="(message, index) in messageList"
      :key="message.timestamp"
      ref="messageEl"
      :style="{
        '--message_bottom': `calc(var(--message_item_height)  * ${messageList.length - index - 1})`,
        '--message_item_spacing': `calc(var(--slide_in_panel_list_item_spacing, 0px)  * ${messageList.length - index})`,
        ...messageStyleList[index]
      }"
      :left-enter="leftEnter"
      :remove-type="removeType"
      class="slide_in_panel_list-message"
      @transitionend="handleTransitionEnd(message, index)"
      @click="handleUserRemoveClick($event, message, index)"
      @mousedown="handleUserRemoveStart($event, message, index)"
      @mousemove="handleUserRemoveing($event, message, index)"
      @mouseup="handleUserRemoveEnd(message, index)"
      @touchstart="handleUserRemoveStart($event, message, index)"
      @touchmove="handleUserRemoveing($event, message, index)"
      @touchend="handleUserRemoveEnd(message, index)"
      @touchcancel="handleUserRemoveEnd(message, ndex)"
    >
      <slot
        :message="message"
        :content="message.content"
        :index="index"
        :remove-type="removeType"
      >
        <p>
          {{ message.content }}
        </p>
      </slot>
    </div>
  </div>
</template>
<script setup>
import _isElement from 'lodash/isElement';
import _cloneDeep from 'lodash/cloneDeep';

const MESSAGE_TIMEOUT_ID_LIST = {};
let MESSAGE_HIDDEN_TIMEOUT_ID = -1;
let MESSAGE_REMOVE_TIMEOUT_ID = -1;

const props = defineProps({
  value: { type: [String, Object], default: null },
  modelValue: { type: [String, Object], default: null },
  top: { type: [Number, String], default: null },
  bottom: { type: [Number, String], default: null },
  itemHeight: { type: [Number, String], default: null },
  timeout: { type: Number, default: 3000 },
  removeDeltaX: { type: Number, default: null },
  maxRow: { type: Number, default: 5 },
  zIndex: { type: [Number, String], default: null },
  userRemoveType: { type: String, default: 'none' },
  itemSpacing: { type: [Number, String], default: null },
  containerPosition: { type: String, default: 'fixed' },
  leftEnter: { type: Boolean, default: false },
  distance: { type: [Number, String], default: null }
});
const emit = defineEmits(['close', 'remove', 'update:modelValue']);

const messageEl = useTemplateRef('messageEl');

const messageList = ref([]);
const messageStyleList = ref([]);
const moveMessage = ref(null);
const moveMessageIndex = ref(-1);

const startX = ref(0);
const moveX = ref(0);
const userRemoveing = ref(false);
const userRemoveingId = ref(-1);

const cssVariable = computed(() => {
  const _cssVariable = {};

  if (typeof props.top === 'number' || isNaN(`${props.top}`) === false) {
    _cssVariable['--slide_in_panel_list_top'] = `${Number(props.top)}px`;
  } else if (typeof props.top === 'string' && props.top !== '') {
    _cssVariable['--slide_in_panel_list_top'] = props.top;
  }

  if (typeof props.bottom === 'number' || isNaN(`${props.bottom}`) === false) {
    _cssVariable['--slide_in_panel_list_bottom'] = `${Number(props.bottom)}px`;
  } else if (typeof props.bottom === 'string' && props.bottom !== '') {
    _cssVariable['--slide_in_panel_list_bottom'] = props.bottom;
  }

  if (
    typeof props.zIndex === 'number' ||
    (typeof props.zIndex === 'string' && isNaN(props.zIndex) === false)
  ) {
    _cssVariable['--slide_in_panel_list_zIndex'] = props.zIndex;
  }

  if (
    typeof props.itemHeight === 'number' ||
    isNaN(`${props.itemHeight}`) === false
  ) {
    _cssVariable['--message_item_height'] = `${Number(props.itemHeight)}px`;
  } else if (typeof props.itemHeight === 'string' && props.itemHeight !== '') {
    _cssVariable['--message_item_height'] = props.itemHeight;
  }

  if (
    typeof props.itemSpacing === 'number' ||
    isNaN(`${props.itemSpacing}`) === false
  ) {
    _cssVariable['--slide_in_panel_list_item_spacing'] =
      `${Number(props.itemSpacing)}px`;
  } else if (
    typeof props.itemSpacing === 'string' &&
    props.itemSpacing !== ''
  ) {
    _cssVariable['--slide_in_panel_list_item_spacing'] = props.itemSpacing;
  }

  if (
    typeof props.containerPosition === 'string' &&
    props.containerPosition !== ''
  ) {
    _cssVariable['--slide_in_panel_list_container_position'] =
      props.containerPosition;
  }

  let defaultRightLeft = '-100%';
  if (props.containerPosition === 'fixed') {
    defaultRightLeft = '-100vw';
    _cssVariable['--slide_in_panel_list_width'] = '100vw';
  } else {
    _cssVariable['--slide_in_panel_list_width'] = '100%';
  }

  const distance =
    typeof props.distance === 'number'
      ? `${props.distance}px`
      : typeof props.distance === 'string'
        ? props.distance
        : '0px';
  const rightLeft = `calc(${defaultRightLeft} + ${distance})`;
  if (props.leftEnter === true) {
    _cssVariable['--slide_in_panel_list_left'] = rightLeft;
  } else {
    _cssVariable['--slide_in_panel_list_right'] = rightLeft;
  }

  return _cssVariable;
});
const deltaX = computed(() => {
  return moveX.value - startX.value;
});
const removeType = computed(() => {
  let removeType = 'opacity';

  if (props.userRemoveType === 'remove') {
    removeType = 'move';
  }

  return removeType;
});

watch(
  () => [props.modelValue, props.value],
  ([newModelValue, newValue]) => {
    const value = newModelValue || newValue;
    if (value !== '' && value !== null) {
      const timestamp = Date.now();
      messageList.value.push({ content: value, timestamp });
      MESSAGE_TIMEOUT_ID_LIST[timestamp] = null;
    }
  },
  { deep: true }
);
watch(
  () => messageList.value,
  async (newMessageList = []) => {
    await nextTick();
    setTimeout(
      () =>
        window.requestAnimationFrame(() => {
          const newMessageStyleList = newMessageList.map((message, index) => {
            const newMessageStyle = handleMessageStyle(message);
            if (
              typeof props.maxRow === 'number' &&
              props.maxRow > 0 &&
              newMessageList.length > props.maxRow &&
              index < newMessageList.length - props.maxRow
            ) {
              clearTimeout(MESSAGE_TIMEOUT_ID_LIST[message.timestamp]);
              MESSAGE_TIMEOUT_ID_LIST[message.timestamp] = undefined;
              // console.log({
              //   ...handleMessageEnd(message, true, newMessageStyle),
              //   ...newMessageStyle,
              // });
              return {
                ...handleMessageEnd(message, true, newMessageStyle),
                ...newMessageStyle
              };
            }
            return newMessageStyle;
          });
          messageStyleList.value = newMessageStyleList.reverse();
          emit('update:modelValue', null);
        }),
      100
    );
  },
  { deep: true }
);

onMounted(() => {
  window.addEventListener('mouseout', handleMouseOut);
});
onBeforeUnmount(() => {
  window.removeEventListener('mouseout', handleMouseOut);
});

function handleMouseOut() {
  if (
    typeof moveMessage.value === 'object' &&
    moveMessage.value !== null &&
    typeof moveMessageIndex.value === 'number' &&
    moveMessageIndex.value > -1
  ) {
    handleUserRemoveEnd(moveMessage.value, moveMessageIndex.value);
  }
}

function getMessageIndex(message) {
  return messageList.value.findIndex(
    (_message) => _message.timestamp === message.timestamp
  );
}
function getMessageElIndex(message, defaultIndex = 0) {
  const index = messageEl.value?.findIndex((_messageEl) => {
    if (_isElement(_messageEl) === true) {
      return _messageEl.getAttribute('timestamp') === `${message.timestamp}`;
    }
    return false;
  });

  return index < 0 ? defaultIndex : index;
}

function handleMessageStyle(message) {
  const newMessageStyle = {};

  const index = getMessageIndex(message);
  const elIndex = getMessageElIndex(message, index);

  if (_isElement(messageEl.value?.[elIndex]) === true) {
    const isMessageStarted =
      messageEl.value[elIndex].getAttribute('message-started') === 'true';

    messageEl.value[elIndex].setAttribute('timestamp', message.timestamp);
    // messageEl.value[elIndex].setAttribute('index', index);

    if (typeof cssVariable.value?.['--message_item_height'] !== 'string') {
      let messageBottom = 0;
      for (let i = 0; i < elIndex; i++) {
        messageBottom += messageEl.value[i].clientHeight;
      }
      newMessageStyle['--message_bottom'] = `${messageBottom}px`;
    }

    if (isMessageStarted === false) {
      messageEl.value[elIndex].setAttribute('message-started', true);
    }
  }

  return newMessageStyle;
}
function handleTransitionEnd(message, index) {
  const elIndex = getMessageElIndex(message, index);
  const isMessageEnded =
    messageEl.value[elIndex].getAttribute('message-ended') === 'true';

  if (
    isMessageEnded === false &&
    typeof MESSAGE_TIMEOUT_ID_LIST[message.timestamp] !== 'number'
  ) {
    MESSAGE_TIMEOUT_ID_LIST[message.timestamp] = setTimeout(
      () => {
        MESSAGE_TIMEOUT_ID_LIST[message.timestamp] = null;
        handleMessageEnd(message);
      },
      props.timeout + (index || 0)
    );
  } else if (isMessageEnded === true) {
    handleMessageHidden();
  }
}

async function handleMessageHidden() {
  // 為避免bottom距離計算造成ui抖動，先將元件的z-index設為-1避免遮擋其他ui的使用者交互事件後在以setTimeout移除該訊息
  if (
    typeof MESSAGE_HIDDEN_TIMEOUT_ID === 'number' &&
    MESSAGE_HIDDEN_TIMEOUT_ID > -1
  ) {
    window.cancelAnimationFrame(MESSAGE_HIDDEN_TIMEOUT_ID);
  }
  if (
    typeof MESSAGE_REMOVE_TIMEOUT_ID === 'number' &&
    MESSAGE_REMOVE_TIMEOUT_ID > -1
  ) {
    clearTimeout(MESSAGE_REMOVE_TIMEOUT_ID);
  }

  messageList.value.forEach((message, index) => {
    if (
      _isElement(messageEl.value[index]) === true &&
      messageEl.value[index].getAttribute('message-ended') === 'true'
    ) {
      const newMessageStyleList = _cloneDeep(messageStyleList.value);
      newMessageStyleList[index]['--message_z_index'] = '-1';

      messageStyleList.value = newMessageStyleList;

      messageEl.value[index].setAttribute('message-remove', true);
    }
  });

  await nextTick();

  MESSAGE_HIDDEN_TIMEOUT_ID = window.requestAnimationFrame(() => {
    MESSAGE_HIDDEN_TIMEOUT_ID = -1;

    MESSAGE_REMOVE_TIMEOUT_ID = setTimeout(() => {
      MESSAGE_REMOVE_TIMEOUT_ID = -1;
      messageList.value = messageList.value.filter((message, removeIndex) => {
        const isNotRemove =
          _isElement(messageEl.value?.[removeIndex]) === false ||
          messageEl.value[removeIndex].getAttribute('message-ended') !== 'true';
        if (isNotRemove === true) {
          emit('remove', message, removeIndex);
        }
        return isNotRemove;
      });
    }, 2000);
  });
}
function handleMessageEnd(message, returnStyle = false, messageStyle) {
  // 確保index是正確的
  const index = getMessageIndex(message);
  const elIndex = getMessageElIndex(message, index);

  if (_isElement(messageEl.value?.[elIndex]) === true) {
    messageEl.value[elIndex].setAttribute('message-ended', true);
    emit('close', message, index, messageEl.value?.[elIndex]);

    const newMessageStyleList = _cloneDeep(messageStyleList.value);
    const newMessageStyle = messageStyle || newMessageStyleList[index];
    if (typeof newMessageStyle === 'object') {
      const cssVariableKey =
        props.leftEnter === true ? '--message_left' : '--message_right';

      if (typeof newMessageStyle?.[cssVariableKey] === 'string') {
        newMessageStyle['--message_transform'] = null;
        if (typeof messageEl.value?.[elIndex]?.clientWidth === 'number') {
          newMessageStyle[cssVariableKey] =
            `-${messageEl.value?.[elIndex].clientWidth}px`;
        }
        newMessageStyleList[index] = newMessageStyle;

        if (returnStyle === false) {
          messageStyleList.value = newMessageStyleList;
        } else {
          return newMessageStyle;
        }
      }
    }
  }
}
function handleUserRemoveClick(e, message, index) {
  if (props.userRemoveType !== 'click') return;
  e.stopPropagation();

  const elIndex = getMessageElIndex(message, index);
  if (messageEl.value[elIndex].getAttribute('message-ended') === 'true') {
    return;
  }
  handleMessageEnd(message);
}
function handleUserRemoveStart(e, message, index) {
  if (props.userRemoveType !== 'remove') return;
  e.stopPropagation();

  const elIndex = getMessageElIndex(message, index);
  if (messageEl.value[elIndex].getAttribute('message-ended') === 'true') {
    return;
  }

  userRemoveing.value = true;
  userRemoveingId.value = message.timestamp;

  const eventX =
    e.pageX ||
    e.clientX ||
    e.offsetX ||
    e.targetTouches?.[0]?.pageX ||
    e.targetTouches?.[0]?.clientX ||
    e.targetTouches?.[0]?.offsetX ||
    e.changedTouches?.[0]?.pageX ||
    e.changedTouches?.[0]?.clientX ||
    e.changedTouches?.[0]?.offsetX;

  startX.value = eventX;
}
function handleUserRemoveing(e, message, index) {
  if (
    props.userRemoveType !== 'remove' ||
    userRemoveing.value === false ||
    userRemoveingId.value !== message.timestamp
  ) {
    return;
  }
  e.stopPropagation();

  const elIndex = getMessageElIndex(message, index);

  if (messageEl.value[elIndex].getAttribute('message-ended') === 'true') {
    userRemoveing.value = false;
    startX.value = 0;
    moveX.value = 0;
  } else {
    const eventX =
      e.pageX ||
      e.clientX ||
      e.offsetX ||
      e.targetTouches?.[0]?.pageX ||
      e.targetTouches?.[0]?.clientX ||
      e.targetTouches?.[0]?.offsetX ||
      e.changedTouches?.[0]?.pageX ||
      e.changedTouches?.[0]?.clientX ||
      e.changedTouches?.[0]?.offsetX;

    const nextDeltaX = eventX - startX.value;
    const moveLimit = getMoveLimit(messageEl.value[index]);

    if (nextDeltaX > 0 || moveLimit.stopDeltaX >= nextDeltaX) return;
    moveX.value = eventX;
  }

  moveMessage.value = message;
  moveMessageIndex.value = index;

  nextTick(() =>
    window.requestAnimationFrame(() => {
      const cssVariableKey =
        props.leftEnter === true ? '--message_left' : '--message_right';

      const newMessageStyleList = _cloneDeep(messageStyleList.value);
      newMessageStyleList[index][cssVariableKey] =
        `calc(100% + ${deltaX.value}px)`;

      messageStyleList.value = newMessageStyleList;
    })
  );
}
function getMoveLimit(element) {
  let removeDeltaX = 100;
  let stopDeltaX = 200 * -1;

  if (typeof props.removeDeltaX === 'number' && props.removeDeltaX > 0) {
    removeDeltaX = props.removeDeltaX;
    stopDeltaX = props.removeDeltaX * -1;
  } else if (typeof element?.clientWidth === 'number') {
    removeDeltaX = element.clientWidth * 0.25;
    stopDeltaX = (element.clientWidth + 100) * -1;
  }

  return {
    removeDeltaX,
    stopDeltaX
  };
}
async function handleUserRemoveEnd(message, index) {
  if (props.userRemoveType !== 'remove') return;

  const elIndex = getMessageElIndex(message, index);
  if (
    userRemoveingId.value !== message.timestamp ||
    messageEl.value[elIndex].getAttribute('message-ended') === 'true'
  ) {
    return;
  }

  const moveLimit = getMoveLimit(messageEl.value[index]);

  if (
    Math.abs(deltaX.value) > moveLimit.removeDeltaX &&
    deltaX.value < 0 &&
    MESSAGE_TIMEOUT_ID_LIST[message.timestamp] !== undefined &&
    MESSAGE_TIMEOUT_ID_LIST[message.timestamp] !== null
  ) {
    clearTimeout(MESSAGE_TIMEOUT_ID_LIST[message.timestamp]);

    handleMessageEnd(message);

    await nextTick();
    window.requestAnimationFrame(() => {
      userRemoveing.value = false;
      startX.value = 0;
      moveX.value = 0;
      const _elIndex = getMessageElIndex(message, index);
      if (_isElement(messageEl.value[_elIndex]) === true) {
        const newMessageStyleList = _cloneDeep(messageStyleList.value);
        newMessageStyleList[index]['--message_transform'] =
          `translate3d(${deltaX.value}px, 0, 0)`;
        messageStyleList.value = newMessageStyleList;
      }
    });
  } else {
    userRemoveing.value = false;
    startX.value = 0;
    moveX.value = 0;
    window.requestAnimationFrame(() => {
      const _elIndex = getMessageElIndex(message, index);
      if (_isElement(messageEl.value[_elIndex]) === true) {
        const newMessageStyleList = _cloneDeep(messageStyleList.value);
        newMessageStyleList[index]['--message_transform'] =
          `translate3d(${deltaX.value}px, 0, 0)`;
        messageStyleList.value = newMessageStyleList;
      }
    });
  }
}
</script>
<style lang="scss" scoped>
.slide_in_panel_list {
  position: var(--slide_in_panel_list_container_position, fixed);
  top: var(--slide_in_panel_list_top);
  bottom: var(--slide_in_panel_list_bottom);
  z-index: var(--slide_in_panel_list_zIndex);
  width: var(--slide_in_panel_list_width, 100vw);
  user-select: none;

  &[left-enter='true'] {
    left: var(--slide_in_panel_list_left, -100vw);
  }
  &:not([left-enter='true']) {
    right: var(--slide_in_panel_list_right, -100vw);
  }

  &-message {
    position: absolute;
    bottom: calc(var(--message_bottom) + var(--message_item_spacing, 0px));
    z-index: var(--message_z_index);
    height: var(--message_item_height);
    opacity: 1;

    transition:
      left 0.5s linear,
      right 0.5s linear,
      bottom 0.15s,
      opacity 0.4s;

    word-break: keep-all;

    &[left-enter='true'] {
      left: var(--message_left, 0px);

      &[message-started='true'] {
        left: var(--message_left, 100%);
      }

      &[message-ended='true'] {
        &[remove-type='move'] {
          left: 0px;
        }
        &[remove-type='opacity'] {
          left: var(--message_left, 100%);
          opacity: 0;
        }
      }
    }

    &:not([left-enter='true']) {
      right: var(--message_right, 0px);

      &[message-started='true'] {
        right: var(--message_right, 100%);
      }

      &[message-ended='true'] {
        &[remove-type='move'] {
          right: 0px;
        }
        &[remove-type='opacity'] {
          right: var(--message_right, 100%);
          opacity: 0;
        }
      }
    }
  }
}
</style>
