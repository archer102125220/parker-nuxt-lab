import Vue3IconCSV from '@app/components/Icon/CSV.vue';
import Vue3IconCSVImport from '@/app/components/Icon/CSVImport';

import { handleSelectCSVFile } from '@app/utils/helpers/select-csv-file';

export function createdImportCSVButtonPlugin(tryLimit = 10, tryCount = 0) {
  return new Promise((resolve, rejects) => {
    const {
      rxjs = {},
      UniverUi = {},
      UniverSheets = {},
      UniverCore = {}
    } = window;
    const wendellhuRedi = window['@wendellhu/redi'] || {};

    const { Observable } = rxjs;
    const { Injector, setDependencies } = wendellhuRedi;
    const {
      ComponentManager,
      IMenuManagerService,
      MenuItemType,
      RibbonStartGroup
    } = UniverUi;
    const {
      SetRangeValuesMutation,
      SetRangeValuesUndoMutationFactory,
      SetWorksheetColumnCountMutation,
      SetWorksheetColumnCountUndoMutationFactory,
      SetWorksheetRowCountMutation,
      SetWorksheetRowCountUndoMutationFactory
    } = UniverSheets;
    const {
      CommandType,
      covertCellValues,
      ICommandService,
      IUndoRedoService,
      IUniverInstanceService,
      Plugin,
      sequenceExecute,
      UniverInstanceType,
      LocaleService
    } = UniverCore;

    if (
      typeof Observable === 'undefined' ||
      typeof Injector === 'undefined' ||
      typeof setDependencies === 'undefined' ||
      typeof ComponentManager === 'undefined' ||
      typeof IMenuManagerService === 'undefined' ||
      typeof MenuItemType === 'undefined' ||
      typeof RibbonStartGroup === 'undefined' ||
      typeof SetRangeValuesMutation === 'undefined' ||
      typeof SetRangeValuesUndoMutationFactory === 'undefined' ||
      typeof SetWorksheetColumnCountMutation === 'undefined' ||
      typeof SetWorksheetColumnCountUndoMutationFactory === 'undefined' ||
      typeof SetWorksheetRowCountMutation === 'undefined' ||
      typeof SetWorksheetRowCountUndoMutationFactory === 'undefined' ||
      typeof CommandType === 'undefined' ||
      typeof covertCellValues === 'undefined' ||
      typeof ICommandService === 'undefined' ||
      typeof IUndoRedoService === 'undefined' ||
      typeof IUniverInstanceService === 'undefined' ||
      typeof Plugin === 'undefined' ||
      typeof sequenceExecute === 'undefined' ||
      typeof UniverInstanceType === 'undefined' ||
      typeof LocaleService === 'undefined'
    ) {
      if (tryCount < tryLimit) {
        return setTimeout(() => {
          resolve(createdImportCSVButtonPlugin(tryLimit, tryCount + 1));
        }, 1000);
      }
      return rejects(new Error('Failed to load Univer dependencies'));
    }

    /**
     * 匯入 CSV 按鈕插件
     * 一個簡單的插件範例，展示如何撰寫插件。
     */
    class ImportCSVButtonPlugin extends Plugin {
      static pluginName = 'import-csv-plugin';

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

      /**
       * 插件掛載到 Univer 實例的第一個生命週期，
       * 此時 Univer 業務實例尚未建立。
       * 插件應在此生命週期將自身的模組加入到依賴注入系統中。
       * 不建議在此生命週期之外初始化插件的內部模組。
       */
      onStarting() {
        // 註冊圖標元件
        this.componentManager.register('Vue3CSVImportIcon', Vue3IconCSVImport, {
          framework: 'vue3'
        });

        try {
          this.componentManager.register('Vue3CSVIcon', Vue3IconCSV, {
            framework: 'vue3'
          });
        } catch (error) {
          if (import.meta.dev) {
            console.error(
              'registerPlugin ImportCSVButtonPlugin Vue3CSVIcon error',
              error
            );
          }
        }

        const buttonId = 'import-csv-button';

        const command = {
          type: CommandType.OPERATION,
          id: buttonId,
          handler: (accessor) => {
            // 注入 univer 實例服務
            const univerInstanceService = accessor.get(IUniverInstanceService);
            const commandService = accessor.get(ICommandService);
            const undoRedoService = accessor.get(IUndoRedoService);

            // 取得當前工作表
            const worksheet = univerInstanceService
              .getCurrentUnitOfType(UniverInstanceType.UNIVER_SHEET)
              .getActiveSheet();
            const unitId = worksheet.getUnitId();
            const subUnitId = worksheet.getSheetId();

            // 等待用戶選擇 CSV 檔案，然後組裝多個變更操作以啟用正確的復原/重做功能
            return handleSelectCSVFile(({ data, rowsCount, colsCount }) => {
              const redoMutations = [];
              const undoMutations = [];

              // 設定工作表列數
              const setRowCountMutationRedoParams = {
                unitId,
                subUnitId,
                rowCount: rowsCount
              };
              const setRowCountMutationUndoParams =
                SetWorksheetRowCountUndoMutationFactory(
                  accessor,
                  setRowCountMutationRedoParams
                );
              redoMutations.push({
                id: SetWorksheetRowCountMutation.id,
                params: setRowCountMutationRedoParams
              });
              undoMutations.push({
                id: SetWorksheetRowCountMutation.id,
                params: setRowCountMutationUndoParams
              });

              // 設定工作表欄數
              const setColumnCountMutationRedoParams = {
                unitId,
                subUnitId,
                columnCount: colsCount
              };
              const setColumnCountMutationUndoParams =
                SetWorksheetColumnCountUndoMutationFactory(
                  accessor,
                  setColumnCountMutationRedoParams
                );
              redoMutations.push({
                id: SetWorksheetColumnCountMutation.id,
                params: setColumnCountMutationRedoParams
              });
              undoMutations.unshift({
                id: SetWorksheetColumnCountMutation.id,
                params: setColumnCountMutationUndoParams
              });

              // 將 CSV 解析為 Univer 資料
              const cellValue = covertCellValues(data, {
                startColumn: 0, // 起始欄索引
                startRow: 0, // 起始列索引
                endColumn: colsCount - 1, // 結束欄索引
                endRow: rowsCount - 1 // 結束列索引
              });

              // 設定工作表資料
              const setRangeValuesMutationRedoParams = {
                unitId,
                subUnitId,
                cellValue
              };
              const setRangeValuesMutationUndoParams =
                SetRangeValuesUndoMutationFactory(
                  accessor,
                  setRangeValuesMutationRedoParams
                );
              redoMutations.push({
                id: SetRangeValuesMutation.id,
                params: setRangeValuesMutationRedoParams
              });
              undoMutations.unshift({
                id: SetRangeValuesMutation.id,
                params: setRangeValuesMutationUndoParams
              });

              const result = sequenceExecute(redoMutations, commandService);

              if (result.result) {
                undoRedoService.pushUndoRedo({
                  unitID: unitId,
                  undoMutations,
                  redoMutations
                });

                return true;
              }

              return false;
            });
          }
        };

        const menuItemFactory = () => ({
          id: buttonId,
          title: 'parker-nuxt-lab-plugins.csv-import.title',
          tooltip: 'parker-nuxt-lab-plugins.csv-import.tooltip',
          icon: 'Vue3CSVImportIcon', // 圖標名稱
          type: MenuItemType.BUTTON,
          hidden$: new Observable((subscriber) => {
            const univerInstanceService = this._injector.get(
              IUniverInstanceService
            );
            const subscription = univerInstanceService.focused$.subscribe(
              (unitId) => {
                if (!unitId) {
                  subscriber.next(true);
                  return;
                }
                const unit = univerInstanceService.getUnit(unitId);
                subscriber.next(unit?.type !== UniverInstanceType.UNIVER_SHEET);
              }
            );
            return () => subscription.unsubscribe();
          })
        });

        const parentMenuId = 'parker-nuxt-lab-plugins.csv-import-export-menu';

        this.menuManagerService.mergeMenu({
          [RibbonStartGroup.OTHERS]: {
            [parentMenuId]: {
              order: 10,
              menuItemFactory: () => ({
                id: parentMenuId,
                tooltip: 'CSV',
                icon: 'Vue3CSVIcon',
                type: MenuItemType.SUBITEMS
              }),
              [buttonId]: {
                order: 1,
                menuItemFactory
              }
            }
          }
        });

        this.commandService.registerCommand(command);
      }
    }

    // 確保 Univer 依賴注入容器在 JS 中正確解析這些依賴
    // 第一個元素是空的 (,)，因為索引 0 是 _config 參數，該參數不被注入
    setDependencies(
      ImportCSVButtonPlugin,
      [
        [Injector],
        [IMenuManagerService],
        [ICommandService],
        [ComponentManager]
      ],
      1
    ); // <--- 加入 1，讓依賴注入從 constructor 的第 1 個參數開始，完美跳過第 0 個的 _config

    resolve(ImportCSVButtonPlugin);
  });
}

export default createdImportCSVButtonPlugin;
