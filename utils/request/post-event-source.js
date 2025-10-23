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
          body: JSON.stringify(postData),
          signal: this.#controller.signal,
        }
      );

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
      const { value, done } = await reader.read();
      if (done) break;

      buffer += value;
      let boundary = buffer.indexOf('\n\n');

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
        data += line.substring(5).trim() + '\n';
      }
    }

    data = data.slice(0, -1);

    this.dispatchEvent(new MessageEvent(eventName, { data: this.tryParseJSON(data) }));
  }

  close() {
    clearTimeout(this.#reconnectTimeoutId); // 取消計畫中的重連
    try {
      this.#controller.abort();
    } catch (error) { }
  }

  /**
   * 檢查一個字串是否是有效的 JSON 格式，並返回解析後的物件（如果有效）。
   * @param {string} text 要檢查的字串
   * @returns {object | null} 如果是有效的 JSON 則返回解析後的物件/值，否則返回 null。
  */
  tryParseJSON(text) {
    try {
      return JSON.parse(text);
    } catch (error) {
      // console.error('無效的 JSON 格式:', error.message);
      return text;
    }
  }

};

export default PostEventSource;