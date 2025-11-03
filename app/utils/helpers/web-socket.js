import { safeParseJSON } from '@shared/helpers/safeToJSON';

export function createWebSocket(
  confing = { open() { }, message() { }, close() { }, error() { } },
  log = false
) {
  if (typeof window !== 'object') return null;

  if (typeof confing !== 'object') throw new Error('invalid confing');

  const { url, open, close, error, listener } = confing;

  if (typeof url !== 'string' || url === '') {
    throw new Error('invalid url');
  }

  const webSocketUrl = url.replaceAll('https://', 'wss://').replaceAll('http://', 'ws://');

  const domain = window?.location?.origin || '';
  const socket = new window.WebSocket(
    webSocketUrl.indexOf('ws') === 0
      ? webSocketUrl
      : (
        (domain.includes('https://')
          ? 'wss://'
          : 'ws://')
        + webSocketUrl
      )
  );

  socket._send = socket.send;
  socket.send = async function (event, data) {
    const payload = { event, data };

    if (log === true && import.meta.dev) {
      console.log(payload);
    }

    await handleWaitConnect(this);
    this._send(JSON.stringify(payload));
  }.bind(socket);

  let intervalId = null;
  function start() {
    if (intervalId !== null) return;
    intervalId = setInterval(() => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send('ping');
      }
    }, 30000);
  }

  function stop() {
    if (intervalId === null) return;
    clearInterval(intervalId);
    intervalId = null;
  }

  socket.addEventListener('open', start);
  socket.addEventListener('close', stop);
  socket.addEventListener('error', stop);
  start();

  if (typeof open === 'function') {
    socket.addEventListener('open', open.bind(socket));
  }
  // if (typeof message === 'function') {
  //   socket.addEventListener('message', message.bind(socket));
  // }
  socket.addEventListener('message', function (event) {
    const jsonData = safeParseJSON(event.data);
    event.jsonData = jsonData;

    if (
      typeof jsonData.event === 'string' &&
      jsonData.event !== '' &&
      jsonData.event !== 'message'
    ) {
      const messageEvent = new MessageEvent(jsonData.event, { data: event.data });
      messageEvent.jsonData = jsonData;
      this.dispatchEvent(messageEvent);
    } else if (typeof confing.message === 'function') {
      confing.message.call(this, event);
    }

  }.bind(socket));

  socket.addEventListener('pong', function (event) {
    if (typeof confing.pong === 'function') {
      confing.pong.call(this, event);
    }

    setTimeout(() => handleHeatbeat(this), 3000);
  }.bind(socket));

  if (typeof close === 'function') {
    socket.addEventListener('close', close.bind(socket));
  }
  if (typeof error === 'function') {
    socket.addEventListener('error', error.bind(socket));
  }

  if (typeof listener === 'object' && listener !== null) {
    Object.keys(listener).forEach(listenerKey => {
      if (
        ['open', 'message'].includes(listenerKey) === false &&
        typeof listener[listenerKey] === 'function'
      ) {
        socket.addEventListener(listenerKey, listener[listenerKey].bind(socket));
      }
    });
  }

  handleHeatbeat(socket);
  return socket;
}

function handleWaitConnect(socket) {
  return new Promise(async resolve => {
    if (socket instanceof window.WebSocket === false || socket.readyState === window.WebSocket.OPEN) {
      return setTimeout(resolve, 500);
    }

    await new Promise((_resolve) => setTimeout(_resolve, 500));
    resolve(handleWaitConnect(socket));
  })
}

function handleHeatbeat(socket) {
  if (typeof socket !== 'object' || socket === null) return;

  if (socket.readyState !== window.WebSocket.OPEN) {
    return setTimeout(() => handleHeatbeat(socket), 500);
  }
  socket.send('ping');
}

export default createWebSocket;
