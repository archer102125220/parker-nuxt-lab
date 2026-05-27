import Vue3DownloadIcon from '@app/components/Icon/Download';

export function createdLocalExportButtonPlugin(tryLimit = 10, tryCount = 0) {
  return new Promise((resolve, rejects) => {
    const {
      rxjs = {},
      UniverUi = {},
      UniverCore = {},
      UniverDesign = {},
      UniverProExchangeClient = {}
    } = window;
    const wendellhuRedi = window['@wendellhu/redi'] || {};

    const { Observable } = rxjs;
    const {
      transformDocumentDataToSnapshotJson,
      transformWorkbookDataToSnapshotJson
    } = UniverProExchangeClient;
    const { Injector, setDependencies } = wendellhuRedi;
    const {
      ComponentManager,
      IMenuManagerService,
      MenuItemType,
      RibbonStartGroup,
      IMessageService,
      ILayoutService
    } = UniverUi;
    const {
      CommandType,
      ICommandService,
      IUniverInstanceService,
      Plugin,
      UniverInstanceType,
      LocaleService
    } = UniverCore;
    const { MessageType } = UniverDesign;

    if (
      typeof Observable === 'undefined' ||
      typeof transformDocumentDataToSnapshotJson === 'undefined' ||
      typeof transformWorkbookDataToSnapshotJson === 'undefined' ||
      typeof Injector === 'undefined' ||
      typeof setDependencies === 'undefined' ||
      typeof ComponentManager === 'undefined' ||
      typeof IMenuManagerService === 'undefined' ||
      typeof MenuItemType === 'undefined' ||
      typeof RibbonStartGroup === 'undefined' ||
      typeof IMessageService === 'undefined' ||
      typeof CommandType === 'undefined' ||
      typeof ICommandService === 'undefined' ||
      typeof IUniverInstanceService === 'undefined' ||
      typeof Plugin === 'undefined' ||
      typeof UniverInstanceType === 'undefined' ||
      typeof LocaleService === 'undefined' ||
      typeof ILayoutService === 'undefined' ||
      typeof MessageType === 'undefined'
    ) {
      if (tryCount < tryLimit) {
        resolve(createdLocalExportButtonPlugin(tryLimit, tryCount + 1));
      }
      return rejects(new Error('Failed to load Univer dependencies'));
    }

    /**
     * 純前端本地匯出外掛 (匯出 JSON Snapshot)
     * 此方法完全不依賴後端，直接在前端將目前的 Snapshot 打包下載
     */
    class LocalExportButtonPlugin extends Plugin {
      static pluginName = 'local-export-plugin';

      constructor(
        _config,
        _injector,
        menuManagerService,
        commandService,
        componentManager
      ) {
        super();

        this._config = _config;
        this._injector = _injector;
        this.menuManagerService = menuManagerService;
        this.commandService = commandService;
        this.componentManager = componentManager;
      }

      onStarting() {
        this.componentManager.register('Vue3DownloadIcon', Vue3DownloadIcon, {
          framework: 'vue3'
        });

        const buttonId = 'local-export-button';

        const command = {
          type: CommandType.OPERATION,
          id: buttonId,
          handler: async (accessor) => {
            const univerInstanceService = accessor.get(IUniverInstanceService);
            const messageService = accessor.get(IMessageService);
            const localeService = accessor.get(LocaleService);
            const layoutService = accessor.get(ILayoutService);

            const doc = univerInstanceService.getFocusedUnit();
            if (typeof doc !== 'object' || doc === null) return false;

            const focusedUnitId = doc.getUnitId();
            if (typeof focusedUnitId !== 'string' || focusedUnitId === '') {
              return false;
            }

            const isDoc = doc.type === UniverInstanceType.UNIVER_DOC;
            const isSheet = doc.type === UniverInstanceType.UNIVER_SHEET;

            if (isDoc === false && isSheet === false) {
              return false;
            }

            try {
              messageService.show({
                type: MessageType.Info,
                content: localeService.t(
                  'parker-nuxt-lab-plugins.local-export.info'
                )
              });

              const startEvent = new CustomEvent(
                'univer-local-export-started',
                {
                  bubbles: true
                }
              );
              if (layoutService.rootContainerElement) {
                layoutService.rootContainerElement.dispatchEvent(startEvent);
              } else {
                document.dispatchEvent(startEvent);
              }

              // 1. 取得完整的文件 Snapshot JSON
              const snapshot = doc.getSnapshot();
              let exportJson;

              if (isDoc === true) {
                exportJson =
                  await transformDocumentDataToSnapshotJson(snapshot);
              } else if (isSheet === true) {
                exportJson =
                  await transformWorkbookDataToSnapshotJson(snapshot);
              } else {
                throw new Error(
                  localeService.t(
                    'parker-nuxt-lab-plugins.local-export.error.snapshot'
                  )
                );
              }

              const snapshotStr = JSON.stringify(exportJson, null, 2);

              // 2. 純前端建立 Blob 並觸發下載
              const blob = new Blob([snapshotStr], {
                type: 'application/json'
              });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.target = '_blank';
              link.download = `snapshot_${isDoc ? 'doc' : 'sheet'}.json`;
              link.style.display = 'none';

              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);

              return true;
            } catch (err) {
              console.error('[LocalExportPlugin] Error:', err);
              const errorMessage =
                err instanceof Error ? err.message : String(err);
              messageService.show({
                type: MessageType.Error,
                content:
                  localeService.t(
                    'parker-nuxt-lab-plugins.local-export.error.exportFailed'
                  ) + errorMessage
              });
              return false;
            } finally {
              const endEvent = new CustomEvent('univer-local-export-ended', {
                bubbles: true
              });
              if (layoutService.rootContainerElement) {
                layoutService.rootContainerElement.dispatchEvent(endEvent);
              } else {
                document.dispatchEvent(endEvent);
              }
            }
          }
        };

        const menuItemFactory = () => ({
          id: buttonId,
          title: 'parker-nuxt-lab-plugins.local-export.title',
          tooltip: 'parker-nuxt-lab-plugins.local-export.tooltip',
          icon: 'Vue3DownloadIcon',
          type: MenuItemType.BUTTON,
          hidden$: new Observable((subscriber) => {
            const univerInstanceService = this._injector.get(
              IUniverInstanceService
            );
            const subscription = univerInstanceService.focused$.subscribe(
              (unitId) => {
                if (typeof unitId !== 'string' || unitId === '') {
                  subscriber.next(true);
                  return;
                }
                const unit = univerInstanceService.getUnit(unitId);
                subscriber.next(
                  unit?.type !== UniverInstanceType.UNIVER_DOC &&
                    unit?.type !== UniverInstanceType.UNIVER_SHEET
                );
              }
            );
            return () => subscription.unsubscribe();
          })
        });

        const parentMenuId = 'parker-nuxt-lab-plugins.import-export-menu';

        this.menuManagerService.mergeMenu({
          [RibbonStartGroup.OTHERS]: {
            [parentMenuId]: {
              order: 19,
              menuItemFactory: () => ({
                id: parentMenuId,
                tooltip: 'parker-nuxt-lab-plugins.import-export-menu.tooltip',
                icon: 'Vue3FolderIcon',
                type: MenuItemType.SUBITEMS
              }),
              [buttonId]: {
                order: 2,
                menuItemFactory
              }
            }
          }
        });

        this.commandService.registerCommand(command);
      }
    }

    setDependencies(
      LocalExportButtonPlugin,
      [
        [Injector],
        [IMenuManagerService],
        [ICommandService],
        [ComponentManager]
      ],
      1
    );

    resolve(LocalExportButtonPlugin);
  });
}

export default createdLocalExportButtonPlugin;
