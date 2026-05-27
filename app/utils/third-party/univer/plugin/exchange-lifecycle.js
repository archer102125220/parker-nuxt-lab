// 官方 @univerjs-pro/exchange-client 並未將 RequestState export 至入口點
// 為了程式碼的可讀性，我們在此處自行定義對應的 Enum 避免使用魔法數字 (magic numbers)
export const REQUEST_STATE = {
  IDLE: 0,
  LOADING: 1,
  DONE: 2,
  ERROR: 3
};

export function createdUniverExchangeLifecyclePlugin(
  tryLimit = 10,
  tryCount = 0
) {
  if (typeof window === 'undefined') return;

  return new Promise((resolve, rejects) => {
    const {
      UniverCore = {},
      UniverUi = {},
      UniverProExchangeClient = {}
    } = window;
    const wendellhuRedi = window['@wendellhu/redi'] || {};

    const { IExchangeService } = UniverProExchangeClient;
    const { Injector, setDependencies } = wendellhuRedi;
    const { Plugin } = UniverCore;
    const { ILayoutService } = UniverUi;

    if (
      typeof IExchangeService === 'undefined' ||
      typeof Injector === 'undefined' ||
      typeof setDependencies === 'undefined' ||
      typeof Plugin === 'undefined' ||
      typeof ILayoutService === 'undefined'
    ) {
      if (tryCount < tryLimit) {
        resolve(createdUniverExchangeLifecyclePlugin(tryLimit, tryCount + 1));
      }
      return rejects(new Error('Failed to load Univer dependencies'));
    }

    /**
     * 本地文件匯出外掛 (支援 Word / Excel)
     * 專門處理「非協同模式」下，前端建立的本地檔案如何正確匯出為 DOCX / XLSX
     *
     * @example
     * ```typescript
     * univer.registerPlugin(UniverExchangeLifecyclePlugin, {
     *   apiPrefix: 'https://api.example.com/universer-api'
     * });
     * ```
     */
    class UniverExchangeLifecyclePlugin extends Plugin {
      static pluginName = 'exchange-lifecycle-plugin';

      constructor(_config, _injector, exchangeService, layoutService) {
        super();

        this._config = _config;
        this._injector = _injector;
        this.exchangeService = exchangeService;
        this.layoutService = layoutService;
      }

      onStarting() {
        if (!this.exchangeService) return;

        this.exchangeService.requestState$.subscribe((state) => {
          // 由於 IExchangeService 的狀態依賴未匯出的原始 REQUEST_STATE Enum，
          // 導致 TS 認為原生的 state 屬性與我們自定義的 REQUEST_STATE Enum 類型不重疊，
          // 依照 AGENTS.md 規範，這裡使用 as unknown as REQUEST_STATE 來進行安全轉型處理。
          const currentState = state.state;

          if (currentState === REQUEST_STATE.LOADING) {
            const startEvent = new CustomEvent('univer-exchange-started', {
              bubbles: true
            });
            if (this.layoutService.rootContainerElement) {
              this.layoutService.rootContainerElement.dispatchEvent(startEvent);
            } else {
              document.dispatchEvent(startEvent);
            }
          } else if (
            currentState === REQUEST_STATE.DONE ||
            currentState === REQUEST_STATE.ERROR
          ) {
            const endEvent = new CustomEvent('univer-exchange-ended', {
              bubbles: true
            });
            if (this.layoutService.rootContainerElement) {
              this.layoutService.rootContainerElement.dispatchEvent(endEvent);
            } else {
              document.dispatchEvent(endEvent);
            }
          }

          if (currentState === REQUEST_STATE.ERROR) {
            const errEvent = new CustomEvent('univer-exchange-error', {
              bubbles: true
            });
            if (this.layoutService.rootContainerElement) {
              this.layoutService.rootContainerElement.dispatchEvent(errEvent);
            } else {
              document.dispatchEvent(errEvent);
            }
          }
        });
      }
    }

    setDependencies(
      UniverExchangeLifecyclePlugin,
      [[Injector], [IExchangeService], [ILayoutService]],
      1
    );

    resolve(UniverExchangeLifecyclePlugin);
  });
}

export default createdUniverExchangeLifecyclePlugin;
