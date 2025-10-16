// https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource
// https://medium.com/@david.richards.tech/sse-server-sent-events-using-a-post-request-without-eventsource-1c0bd6f14425

export class PostEventSource extends EventTarget {
  #config;
  #controller;
  #reconnectTimeoutId = null;
  constructor(path, options = {}) {
    super();
    this.#config = { ...(options || { path: '/', postData: {} }), path };
    this.#controller = new AbortController();
    this.#start(this.#config);
  }

  get config() {
    return this.#config;
  }
  get url() {
    return this.#config?.path || '';
  }

  /**
   * 開始連線
   */
  async #start(config = this.#config) {
    const { path, postData, headers = {}, reconnectInterval = 3000 } = config;

    try {
      const response = await fetch(
        path,
        {
          method: 'POST',
          headers: {
            // 'Content-Type': 'text/event-stream',
            'Content-Type': 'application/json',
            ...headers
          },
          // body: postData,
          body: JSON.stringify(postData),
          signal: this.#controller.signal,
        }
      );
      console.log({ response });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.dispatchEvent(new Event('open'));

      return this.#readStream(response.body);
    } catch (error) {
      if (error.name !== 'AbortError') {
        this.dispatchEvent(new CustomEvent('error', { detail: error }));
        console.error('SSE 連線發生錯誤:', error);

        // 實作自動重連
        clearTimeout(this.#reconnectTimeoutId);
        this.#reconnectTimeoutId = setTimeout(() => this.#start(), reconnectInterval);
      }
    }
  }

  /**
   * 讀取並解析串流
   */
  async #readStream(stream) {
    const reader = stream.pipeThrough(new TextDecoderStream()).getReader();
    let buffer = '';

    while (true) {
      const readData = await reader.read();
      const { value, done } = readData;

      console.log({ readData });
      if (done) break;

      buffer += value;
      let boundary = buffer.indexOf('\n\n');

      console.log('Received', value);
      // if (typeof value?.event === 'string' && value?.event !== '') {
      //   this.dispatchEvent(new MessageEvent(value.event, { data: value }));
      // } else {
      //   this.dispatchEvent(new MessageEvent('message', { data: value }));
      // }
      while (boundary !== -1) {
        const message = buffer.substring(0, boundary);
        buffer = buffer.substring(boundary + 2);

        this.#parseAndDispatch(message);

        boundary = buffer.indexOf('\n\n');
      }
    }
  }

  /**
   * 解析單一 SSE 訊息並觸發事件
   */
  #parseAndDispatch(message) {
    if (!message) return;

    let eventName = 'message';
    let data = '';

    const lines = message.split('\n');
    for (const line of lines) {
      if (line.startsWith('event:')) {
        eventName = line.substring(6).trim();
      } else if (line.startsWith('data:')) {
        // 支援多行 data
        data += line.substring(5).trim() + '\n';
      }
      // 為了簡化，此處省略 id 和 retry 欄位的處理
    }

    // 移除最後一個換行符
    data = data.slice(0, -1);

    this.dispatchEvent(new MessageEvent(eventName, { data }));
  }

  close() {
    clearTimeout(this.#reconnectTimeoutId); // 取消計畫中的重連
    try {
      this.#controller.abort();
    } catch (error) { }
  }

};

export default PostEventSource;