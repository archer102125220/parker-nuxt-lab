// import { FolderIcon } from '@univerjs/icons';

import { handleSelectCSVFile } from '@app/utils/helpers/select-csv-file';

export function createdImportCSVButtonPlugin(tryLimit = 10, tryCount = 0) {
  return new Promise((resolve, rejects) => {
    const {
      rxjs = {},
      UniverUi = {},
      UniverSheets = {},
      UniverCore = {}
    } = window;
    const wendellhuRedi = window['@wendellhu/redi'];

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
      UniverInstanceType
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
      typeof UniverInstanceType === 'undefined'
    ) {
      if (tryCount < tryLimit) {
        return setTimeout(() => {
          resolve(createdImportCSVButtonPlugin(tryLimit, tryCount + 1));
        }, 1000);
      }
      return rejects(new Error('Failed to load Univer dependencies'));
    }

    /**
     * Import CSV Button Plugin
     * A simple Plugin example, show how to write a plugin.
     */
    class ImportCSVButtonPlugin extends Plugin {
      static pluginName = 'import-csv-plugin';

      constructor(
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

      /**
       * The first lifecycle of the plugin mounted on the Univer instance,
       * the Univer business instance has not been created at this time.
       * The plugin should add its own module to the dependency injection system at this lifecycle.
       * It is not recommended to initialize the internal module of the plugin outside this lifecycle.
       */
      onStarting() {
        // register icon component
        // this.componentManager.register('FolderIcon', FolderIcon);

        const buttonId = 'import-csv-button';

        const command = {
          type: CommandType.OPERATION,
          id: buttonId,
          handler: (accessor) => {
            // inject univer instance service
            const univerInstanceService = accessor.get(IUniverInstanceService);
            const commandService = accessor.get(ICommandService);
            const undoRedoService = accessor.get(IUndoRedoService);

            // get current sheet
            const worksheet = univerInstanceService
              .getCurrentUnitOfType(UniverInstanceType.UNIVER_SHEET)
              .getActiveSheet();
            const unitId = worksheet.getUnitId();
            const subUnitId = worksheet.getSheetId();

            // wait user select csv file, then assemble multiple mutations operation to enable correct undo/redo
            return handleSelectCSVFile(({ data, rowsCount, colsCount }) => {
              const redoMutations = [];
              const undoMutations = [];

              // set sheet row count
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

              // set sheet column count
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

              // parse csv to univer data
              const cellValue = covertCellValues(data, {
                startColumn: 0, // start column index
                startRow: 0, // start row index
                endColumn: colsCount - 1, // end column index
                endRow: rowsCount - 1 // end row index
              });

              // set sheet data
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
          title: 'Import CSV',
          tooltip: 'Import CSV',
          icon: 'FolderIcon', // icon name
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
        this.menuManagerService.mergeMenu({
          [RibbonStartGroup.OTHERS]: {
            [buttonId]: {
              order: 10,
              menuItemFactory
            }
          }
        });

        this.commandService.registerCommand(command);
      }
    }

    // Ensure Univer DI container resolves these dependencies in JS
    setDependencies(ImportCSVButtonPlugin, [
      [Injector],
      [IMenuManagerService],
      [ICommandService],
      [ComponentManager]
    ]);

    resolve(ImportCSVButtonPlugin);
  });
}

export default createdImportCSVButtonPlugin;
