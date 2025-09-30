export function createWebSocket(
  confing = { open() { }, message() { }, close() { }, error() { } }
) {
  if (typeof window !== 'object') return null;

  if (typeof confing !== 'object') throw new Error('invalid confing');

  const { url, open, message, close, error } = confing;

  if (typeof url !== 'string' || url === '') {
    throw new Error('invalid url');
  }

  const webSocketUrl = url.replaceAll('https://', 'wss://').replaceAll('http://', 'ws://');

  const domain = window?.location?.origin || '';
  const socket = new WebSocket(
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
  socket.send = function (event, data) {
    const payload = { event, data };

    if (import.meta.dev) {
      console.log(payload);
    }

    this._send(JSON.stringify(payload));
  }.bind(socket);

  if (typeof open === 'function') {
    socket.addEventListener('open', open);
  }
  handleHeatbeat(socket);

  if (typeof message === 'function') {
    socket.addEventListener('message', message);
  }
  if (typeof close === 'function') {
    socket.addEventListener('close', close);
  }
  if (typeof error === 'function') {
    socket.addEventListener('error', error);
  }

  return socket;
}

function handleHeatbeat(socket) {
  if (typeof socket !== 'object' || socket === null) return;

  if (socket.readyState !== WebSocket.OPEN) {
    return setTimeout(() => handleHeatbeat(socket), 500);
  }
  socket.send('ping');

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
}

export default createWebSocket;
