<template>
  <div class="slide_in_panel_list" :style="cssVariable">
    <div
      v-for="(message, index) in messageList"
      :key="message.timestamp"
      ref="messageEl"
      :style="messageStyleList[index]"
      class="slide_in_panel_list-message"
      @transitionend="handleMessageStyle(message, index, true)"
      @mousedown="handleUserRemoveStart($event, message, index)"
      @mousemove="handleUserRemoveing($event, message, index)"
      @mouseup="handleUserRemoveEnd(message, index)"
      @touchstart="handleUserRemoveStart($event, message, index)"
      @touchmove="handleUserRemoveing($event, message, index)"
      @touchend="handleUserRemoveEnd(message, index)"
      @touchcancel="handleUserRemoveEnd(message, ndex)"
    >
      <slot :message="message" :index="index">
        <p>
          {{ message.text }}
        </p>
      </slot>
    </div>
  </div>
</template>
<script setup>
import _isElement from 'lodash/isElement';
import _cloneDeep from 'lodash/cloneDeep';

const MESSAGE_TIMEOUT_ID_LIST = {};
let MESSAGE_REMOVE_TIMEOUT_ID = -1;

const props = defineProps({
  value: { type: String, default: null },
  modelValue: { type: String, default: null },
  top: { type: [Number, String], default: null },
  bottom: { type: [Number, String], default: null },
  timeout: { type: Number, default: 5000 },
  removeDeltaX: { type: Number, default: null },
  maxRow: { type: Number, default: 6 },
  zIndex: { type: Number, default: null }
});
const emits = defineEmits(['close', 'remove', 'update:modelValue']);

const messageEl = useTemplateRef('messageEl');

const messageList = ref([]);
const messageStyleList = ref([]);

const startX = ref(0);
const moveX = ref(0);
const userRemoveing = ref(false);
const userRemoveingId = ref(-1);

const cssVariable = computed(() => {
  const _cssVariable = {};

  if (typeof props.top === 'number' || isNaN(props.top) === false) {
    _cssVariable['--slide_in_panel_list_top'] = `${Number(props.top)}px`;
  }

  if (typeof props.top === 'string' && props.top !== '') {
    _cssVariable['--slide_in_panel_list_top'] = props.top;
  }

  if (typeof props.bottom === 'number' || isNaN(props.bottom) === false) {
    _cssVariable['--slide_in_panel_list_bottom'] = `${Number(props.bottom)}px`;
  }

  if (typeof props.bottom === 'string' && props.bottom !== '') {
    _cssVariable['--slide_in_panel_list_bottom'] = props.bottom;
  }

  if (typeof props.zIndex === 'number') {
    _cssVariable['--slide_in_panel_list_zIndex'] = props.zIndex;
  }

  return _cssVariable;
});

const deltaX = computed(() => {
  return moveX.value - startX.value;
});

watch(
  () => [props.modelValue, props.value],
  ([newModelValue, newValue]) => {
    const value = newModelValue || newValue;
    if (value !== '' && value !== null) {
      const timestamp = Date.now();
      messageList.value.push({ text: value, timestamp });
      MESSAGE_TIMEOUT_ID_LIST[timestamp] = null;
    }
  }
);
watch(
  () => messageList.value,
  async (newMessageList = []) => {
    await nextTick();
    window.requestAnimationFrame(() => {
      const newMessageStyleList = newMessageList.map((message, index) =>
        handleMessageStyle(message, index)
      );
      messageStyleList.value = newMessageStyleList.reverse();
      emits('update:modelValue', null);

      if (
        typeof props.maxRow === 'number' &&
        props.maxRow > 0 &&
        newMessageList.length > props.maxRow
      ) {
        for (let i = 0; i < newMessageList.length - props.maxRow; i++) {
          const message = newMessageList[i];

          clearTimeout(MESSAGE_TIMEOUT_ID_LIST[message.timestamp]);
          handleMessageEnd(message);
        }
      }
    });
  },
  { deep: true }
);

function getMessageIndex(message) {
  return messageList.value.findIndex(
    (_message) => _message.timestamp === message.timestamp
  );
}
function getMessageElIndex(message, defaultIndex = 0) {
  const index = messageEl?.value?.findIndex((_messageEl) => {
    if (_isElement(_messageEl) === true) {
      return _messageEl.getAttribute('timestamp') === `${message.timestamp}`;
    }
    return false;
  });

  return index < 0 ? defaultIndex : index;
}

function handleMessageStyle(message, _index, isEnd = false) {
  const newMessageStyle = {};

  const index = getMessageIndex(message);
  const elIndex = getMessageElIndex(message, index);

  if (_isElement(messageEl?.value?.[elIndex]) === true) {
    const isMessageStarted =
      messageEl.value[elIndex].getAttribute('message-started') === 'true';
    const isMessageEnded =
      messageEl.value[elIndex].getAttribute('message-ended') === 'true';

    messageEl.value[elIndex].setAttribute('timestamp', message.timestamp);
    messageEl.value[elIndex].setAttribute('index', index);

    if (isEnd === false) {
      let messageBottom = 0;
      for (let i = 0; i < elIndex; i++) {
        messageBottom += messageEl.value[i].clientHeight;
      }
      newMessageStyle['--message_bottom'] = `${messageBottom}px`;
      if (isMessageEnded === false) {
        newMessageStyle['--message_left'] = '100%';
      }
    }

    if (isMessageStarted === false && isEnd === false) {
      messageEl.value[elIndex].setAttribute('message-started', true);
    } else if (
      isEnd === true &&
      isMessageEnded === false &&
      typeof MESSAGE_TIMEOUT_ID_LIST[message.timestamp] !== 'number'
    ) {
      MESSAGE_TIMEOUT_ID_LIST[message.timestamp] = setTimeout(() => {
        MESSAGE_TIMEOUT_ID_LIST[message.timestamp] = null;
        handleMessageEnd(message);
      }, props.timeout);
    } else if (isEnd === true && isMessageEnded === true) {
      if (
        typeof MESSAGE_REMOVE_TIMEOUT_ID === 'number' &&
        MESSAGE_REMOVE_TIMEOUT_ID > -1
      ) {
        clearTimeout(MESSAGE_REMOVE_TIMEOUT_ID);
      }

      MESSAGE_REMOVE_TIMEOUT_ID = setTimeout(() => {
        MESSAGE_REMOVE_TIMEOUT_ID = -1;
        messageList.value = messageList.value.filter((message, removeIndex) => {
          const isRemove =
            _isElement(messageEl?.value?.[removeIndex]) === false ||
            messageEl.value[removeIndex].getAttribute('message-ended') !==
              'true';
          if (isRemove === true) {
            emits('remove', message, removeIndex);
          }
          return isRemove;
        });
      }, 500);
    }
  }

  return newMessageStyle;
}
function handleMessageEnd(message) {
  // 確保index是正確的
  const index = getMessageIndex(message);
  const elIndex = getMessageElIndex(message, index);

  if (_isElement(messageEl?.value?.[elIndex]) === true) {
    messageEl.value[elIndex].setAttribute('message-ended', true);
    emits('close', message, index, messageEl?.value?.[elIndex]);

    const newMessageStyleList = _cloneDeep(messageStyleList.value);
    if (
      typeof newMessageStyleList[index] === 'object' &&
      typeof newMessageStyleList[index]?.['--message_left'] === 'string'
    ) {
      newMessageStyleList[index]['--message_transform'] = null;
      if (typeof messageEl?.value?.[elIndex]?.clientWidth === 'number') {
        newMessageStyleList[index]['--message_left'] =
          `-${messageEl?.value?.[elIndex].clientWidth}px`;
      }

      messageStyleList.value = newMessageStyleList;
    }
  }
}
function handleUserRemoveStart(e, message, index) {
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
    userRemoveing.value === false ||
    userRemoveingId.value !== message.timestamp
  ) {
    return;
  }
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

  nextTick(() =>
    window.requestAnimationFrame(() => {
      const newMessageStyleList = _cloneDeep(messageStyleList.value);
      newMessageStyleList[index]['--message_transform'] =
        `translate3d(${deltaX.value}px, 0, 0)`;

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
    typeof MESSAGE_TIMEOUT_ID_LIST[message.timestamp] !== null
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
  position: fixed;
  top: var(--slide_in_panel_list_top);
  left: -100vw;
  bottom: var(--slide_in_panel_list_bottom);
  z-index: var(--slide_in_panel_list_zIndex);
  width: 100vw;

  &-message {
    position: absolute;
    left: var(--message_left, 0px);
    bottom: var(--message_bottom, 0px);
    display: var(--message_display);

    transform: var(--message_transform);
    transition:
      left 0.5s linear,
      bottom 0.15s linear,
      transform 0.1s;
  }
}
</style>
