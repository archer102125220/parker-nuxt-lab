export function createdLocalImportButtonPlugin(tryLimit = 10, tryCount = 0) {
  return new Promise((resolve, rejects) => {
    const {
      rxjs = {},
      UniverUi = {},
      UniverCore = {},
      UniverCoreFacade = {},
      UniverDesign = {}
    } = window;
    const wendellhuRedi = window['@wendellhu/redi'];

    const { Observable } = rxjs;
    const { Injector, setDependencies } = wendellhuRedi;
    const {
      ComponentManager,
      IMenuManagerService,
      MenuItemType,
      RibbonStartGroup,
      IMessageService,
      ILayoutService
    } = UniverUi;
    const { CommandType, ICommandService, Plugin, LocaleService } = UniverCore;
    const { FUniver } = UniverCoreFacade;
    const { MessageType } = UniverDesign;

    if (
      typeof Observable === 'undefined' ||
      typeof Injector === 'undefined' ||
      typeof setDependencies === 'undefined' ||
      typeof ComponentManager === 'undefined' ||
      typeof IMenuManagerService === 'undefined' ||
      typeof MenuItemType === 'undefined' ||
      typeof RibbonStartGroup === 'undefined' ||
      typeof IMessageService === 'undefined' ||
      typeof ILayoutService === 'undefined' ||
      typeof LocaleService === 'undefined' ||
      typeof CommandType === 'undefined' ||
      typeof ICommandService === 'undefined' ||
      typeof Plugin === 'undefined' ||
      typeof FUniver === 'undefined' ||
      typeof MessageType === 'undefined'
    ) {
      if (tryCount < tryLimit) {
        return setTimeout(() => {
          resolve(createdLocalImportButtonPlugin(tryLimit, tryCount + 1));
        }, 1000);
      }
      return rejects(new Error('Failed to load Univer dependencies'));
    }
    class LocalImportButtonPlugin extends Plugin {
      static pluginName = 'local-import-plugin';

      constructor(
        _config,
        _injector,
        menuManagerService,
        commandService,
        componentManager
      ) {
        super();
        this._injector = _injector;
        this.menuManagerService = menuManagerService;
        this.commandService = commandService;
        this.componentManager = componentManager;
      }

      onStarting() {
        const buttonId = 'local-import-button';

        const command = {
          type: CommandType.OPERATION,
          id: buttonId,
          handler: async (accessor) => {
            const messageService = accessor.get(IMessageService);
            const layoutService = accessor.get(ILayoutService);
            const localeService = accessor.get(LocaleService);
            // We use FUniver to access the import APIs easily
            const univerAPI = FUniver.newAPI(accessor.get(Injector));
            // 根據當前啟用的編輯器類型動態決定支援的副檔名
            const isDoc = !!univerAPI.getActiveDocument?.();
            const isSheet = !!univerAPI.getActiveWorkbook?.();

            let acceptExtensions = '.docx,.xlsx';
            let errorMessage = localeService.t(
              'parker-nuxt-lab-plugins.local-import.error.unsupportedAll'
            );

            if (isSheet) {
              acceptExtensions = '.xlsx';
              errorMessage = localeService.t(
                'parker-nuxt-lab-plugins.local-import.error.unsupportedSheet'
              );
            } else if (isDoc) {
              acceptExtensions = '.docx';
              errorMessage = localeService.t(
                'parker-vue-lab-plugins.local-import.error.unsupportedDoc'
              );
            }

            // 建立一個隱藏的 input 來選擇檔案
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = acceptExtensions;
            input.onchange = async (e) => {
              const target = e.target;
              const file = target.files?.[0];
              if (!file) return;

              const extension = file.name.split('.').pop()?.toLowerCase();
              const isValidExtension = isSheet
                ? extension === 'xlsx'
                : isDoc
                  ? extension === 'docx'
                  : extension === 'docx' || extension === 'xlsx';

              if (!isValidExtension) {
                messageService.show({
                  type: MessageType.Error,
                  content: errorMessage
                });
                return;
              }

              try {
                messageService.show({
                  type: MessageType.Info,
                  content: localeService.t(
                    'parker-vue-lab-plugins.local-import.info'
                  )
                });

                let snapshot = null;
                let fileType = '';
                let unitId = '';

                if (extension === 'docx') {
                  unitId = univerAPI.getActiveDocument()?.getId() || '';
                  snapshot = await univerAPI.importDOCXToSnapshotAsync(file);
                  fileType = 'doc';
                } else if (extension === 'xlsx') {
                  unitId = univerAPI.getActiveWorkbook()?.getId() || '';
                  snapshot = await univerAPI.importXLSXToSnapshotAsync(file);
                  fileType = 'sheet';
                }

                if (snapshot) {
                  // 發送一個自定義事件，優先發送到容器元素讓 Vue 可以透過 @ 監聽
                  const event = new CustomEvent(
                    'univer-local-import-snapshot',
                    {
                      detail: { snapshot, type: fileType, unitId },
                      bubbles: true
                    }
                  );

                  if (layoutService.rootContainerElement) {
                    layoutService.rootContainerElement.dispatchEvent(event);
                  } else {
                    document.dispatchEvent(event);
                  }

                  messageService.show({
                    type: MessageType.Success,
                    content: localeService.t(
                      'parker-vue-lab-plugins.local-import.success'
                    )
                  });
                }
              } catch (err) {
                console.error(err);
                const errorMessage =
                  err instanceof Error ? err.message : String(err);
                messageService.show({
                  type: MessageType.Error,
                  content:
                    localeService.t(
                      'parker-vue-lab-plugins.local-import.error.importFailed'
                    ) + errorMessage
                });
              }
            };
            input.click();

            return true;
          }
        };

        const menuItemFactory = () => ({
          id: buttonId,
          title: 'parker-vue-lab-plugins.local-import.title',
          tooltip: 'parker-vue-lab-plugins.local-import.tooltip',
          icon: 'ExportIcon',
          type: MenuItemType.BUTTON
        });

        // 註冊至工具列
        this.menuManagerService.mergeMenu({
          [RibbonStartGroup.OTHERS]: {
            [buttonId]: {
              order: 19,
              menuItemFactory
            }
          }
        });

        this.commandService.registerCommand(command);
      }
    }

    // 確保 Univer DI 容器在 JS 中解析這些依賴
    // 第一個元素是空的 (,)，因為索引 0 是未被注入的 _config 參數
    setDependencies(
      LocalImportButtonPlugin,
      [
        [Injector],
        [IMenuManagerService],
        [ICommandService],
        [ComponentManager]
      ],
      1
    ); // <--- 加入 1，讓依賴注入從 constructor 的第 1 個參數開始，完美跳過第 0 個的 _config

    resolve(LocalImportButtonPlugin);
  });
}

export default createdLocalImportButtonPlugin;
