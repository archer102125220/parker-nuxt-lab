import { throttle } from 'lodash';

import Vue3LockedRoundIcon from '@app/components/Icon/LockedRound.vue';
import Vue3LockIcon from '@app/components/Icon/Lock';
import Vue3UnlockedIcon from '@app/components/Icon/Unlocked';

import { useUniverStore } from '@app/store/univer';

export const SHEET_LOCK_ERROR_MESSAGE = 'Edit blocked: Range is locked.';
export const COMMAND_ID_LOCK = 'sheet.command.lock-selection';
export const COMMAND_ID_UNLOCK = 'sheet.command.unlock-selection';
export const COMMAND_ID_UNLOCK_ENTIRE = 'sheet.command.unlock-selection-entire';
export const MENU_ID_PARENT = 'parker-nuxt-lab-plugins.sheet-lock-menu';

export function createdSheetLockPlugin(tryLimit = 10, tryCount = 0) {
  if (typeof window === 'undefined') return;

  return new Promise((resolve, rejects) => {
    const {
      rxjs = {},
      UniverUi = {},
      UniverCore = {},
      UniverDesign = {},
      UniverDocs = {},
      UniverSheets = {}
    } = window;
    const wendellhuRedi = window['@wendellhu/redi'] || {};

    const { Observable } = rxjs;
    const { Injector, setDependencies } = wendellhuRedi;
    const {
      Plugin,
      ICommandService,
      IUniverInstanceService,
      UniverInstanceType,
      CommandType,
      LocaleService,
      DOCS_FORMULA_BAR_EDITOR_UNIT_ID_KEY,
      DOCS_NORMAL_EDITOR_UNIT_ID_KEY
    } = UniverCore;
    const { MessageType } = UniverDesign;
    const {
      ComponentManager,
      IMenuManagerService,
      MenuItemType,
      RibbonStartGroup,
      IMessageService
    } = UniverUi;
    const { RichTextEditingMutation } = UniverDocs;
    const {
      SheetsSelectionsService,
      SetRangeValuesMutation,
      RemoveRowMutation,
      RemoveColMutation,
      INTERCEPTOR_POINT,
      SheetInterceptorService
    } = UniverSheets;

    if (
      typeof Observable === 'undefined' ||
      typeof Injector === 'undefined' ||
      typeof setDependencies === 'undefined' ||
      typeof Plugin === 'undefined' ||
      typeof ICommandService === 'undefined' ||
      typeof IUniverInstanceService === 'undefined' ||
      typeof UniverInstanceType === 'undefined' ||
      typeof CommandType === 'undefined' ||
      typeof LocaleService === 'undefined' ||
      typeof DOCS_FORMULA_BAR_EDITOR_UNIT_ID_KEY === 'undefined' ||
      typeof DOCS_NORMAL_EDITOR_UNIT_ID_KEY === 'undefined' ||
      typeof ComponentManager === 'undefined' ||
      typeof IMenuManagerService === 'undefined' ||
      typeof MenuItemType === 'undefined' ||
      typeof RibbonStartGroup === 'undefined' ||
      typeof IMessageService === 'undefined' ||
      typeof MessageType === 'undefined' ||
      typeof RichTextEditingMutation === 'undefined' ||
      typeof SheetsSelectionsService === 'undefined' ||
      typeof SetRangeValuesMutation === 'undefined' ||
      typeof RemoveRowMutation === 'undefined' ||
      typeof RemoveColMutation === 'undefined' ||
      typeof INTERCEPTOR_POINT === 'undefined' ||
      typeof SheetInterceptorService === 'undefined'
    ) {
      if (tryCount < tryLimit) {
        resolve(createdSheetLockPlugin(tryLimit, tryCount + 1));
      }
      return rejects(new Error('Failed to load Univer dependencies'));
    }

    class SheetLockPlugin extends Plugin {
      static pluginName = 'sheet-lock-plugin';
      #lockedRangeList = {};

      #_config;
      #_injector;
      #menuManagerService;
      #commandService;
      #componentManager;

      get SHEET_LOCK_ERROR_MESSAGE() {
        return SHEET_LOCK_ERROR_MESSAGE;
      }
      get COMMAND_ID_LOCK() {
        return COMMAND_ID_LOCK;
      }
      get COMMAND_ID_UNLOCK() {
        return COMMAND_ID_UNLOCK;
      }
      get COMMAND_ID_UNLOCK_ENTIRE() {
        return COMMAND_ID_UNLOCK_ENTIRE;
      }
      get MENU_ID_PARENT() {
        return MENU_ID_PARENT;
      }

      constructor(
        _config,
        _injector,
        menuManagerService,
        commandService,
        componentManager
      ) {
        super();

        this.config = _config;
        this.#_config = _config || {};
        this.#_injector = _injector;
        this.#menuManagerService = menuManagerService;
        this.#commandService = commandService;
        this.#componentManager = componentManager;

        // 修正 Univer 編輯器在鎖定範圍時發出的錯誤訊息
        this.#ignoreErrorLog();
      }

      // Filter error message from console
      #ignoreErrorLog() {
        if (typeof window === 'undefined') return;
        if (window.__UNIVER__SHEET_LOCKED_ERROR_FILTERED__ === true) return;

        window.addEventListener('error', (event) => {
          if (event.error?.message?.includes(SHEET_LOCK_ERROR_MESSAGE)) {
            event.preventDefault();
          }
        });

        window.addEventListener('unhandledrejection', (event) => {
          if (event.reason?.message?.includes(SHEET_LOCK_ERROR_MESSAGE)) {
            event.preventDefault();
          }
        });

        const originalConsoleError = window.console.error;
        window.originalConsoleError = originalConsoleError;
        window.console.error = function (...args) {
          const isLockedError = args.some(
            (arg) =>
              (typeof arg === 'string' &&
                arg.includes(SHEET_LOCK_ERROR_MESSAGE)) ||
              (arg instanceof Error &&
                arg.message.includes(SHEET_LOCK_ERROR_MESSAGE))
          );
          if (isLockedError) return;
          window.originalConsoleError?.apply(console, args);
        };

        window.__UNIVER__SHEET_LOCKED_ERROR_FILTERED__ = true;
      }

      onReady() {
        const sheetInterceptorService = this.#_injector.get(
          SheetInterceptorService
        );

        this.disposeWithMe(
          sheetInterceptorService.intercept(INTERCEPTOR_POINT.CELL_CONTENT, {
            priority: 100,
            handler: (cell, location, next) => {
              const noStyle =
                typeof this.#_config.noStyle === 'boolean'
                  ? this.#_config.noStyle
                  : true;

              if (noStyle) {
                return next(cell);
              }

              const { unitId, subUnitId, row, col } = location;
              const unitLocks =
                this.#lockedRangeList[unitId]?.[subUnitId] || [];

              for (const lock of unitLocks) {
                const { startRow, endRow, startColumn, endColumn } = lock.range;
                if (
                  row >= startRow &&
                  row <= endRow &&
                  col >= startColumn &&
                  col <= endColumn
                ) {
                  const newCell = {
                    ...cell,
                    s: {
                      ...(typeof cell?.s === 'object' ? cell.s : {}),
                      bg: { rgb: '#f3f4f6' }
                    }
                  };
                  return next(newCell);
                }
              }

              return next(cell);
            }
          })
        );
      }

      onStarting() {
        this.#_registerIcons();
        this.#_registerCommands();
        this.#_registerMenus();
        this.#_registerInterceptors();
      }

      #_registerIcons() {
        try {
          this.#componentManager.register(
            'Vue3LockedRoundIcon',
            Vue3LockedRoundIcon,
            { framework: 'vue3' }
          );
        } catch {}
        try {
          this.#componentManager.register('Vue3LockIcon', Vue3LockIcon, {
            framework: 'vue3'
          });
        } catch {}
        try {
          this.#componentManager.register(
            'Vue3UnlockedIcon',
            Vue3UnlockedIcon,
            {
              framework: 'vue3'
            }
          );
        } catch {}
      }

      #_registerCommands() {
        this.#commandService.registerCommand(this.#_createLockCommand());
        this.#commandService.registerCommand(
          this.#_createUnlockCommand(this.COMMAND_ID_UNLOCK, false)
        );
        this.#commandService.registerCommand(
          this.#_createUnlockCommand(this.COMMAND_ID_UNLOCK_ENTIRE, true)
        );
      }

      #_createLockCommand() {
        return {
          type: CommandType.OPERATION,
          id: this.COMMAND_ID_LOCK,
          handler: async (accessor) => {
            const univerInstanceService = accessor.get(IUniverInstanceService);
            const selectionManagerService = accessor.get(
              SheetsSelectionsService
            );
            const messageService = accessor.get(IMessageService);
            const localeService = accessor.get(LocaleService);

            const workbook = univerInstanceService.getFocusedUnit();
            if (
              !workbook ||
              workbook.type !== UniverInstanceType.UNIVER_SHEET
            ) {
              return false;
            }

            const selections = selectionManagerService.getCurrentSelections();
            if (!selections || selections.length === 0) {
              messageService.show({
                type: MessageType.Warning,
                content: localeService.t(
                  'parker-nuxt-lab-plugins.sheet-lock.error.selectFirst'
                )
              });
              return false;
            }

            const store = useUniverStore();
            const permissionParams = await store.requestLockPermissions();
            if (!permissionParams) {
              return false;
            }

            const unitId = workbook.getUnitId();
            const subUnitId = workbook.getActiveSheet()?.getSheetId();

            if (!subUnitId) return false;

            if (!this.#lockedRangeList[unitId])
              this.#lockedRangeList[unitId] = {};
            if (!this.#lockedRangeList[unitId][subUnitId]) {
              this.#lockedRangeList[unitId][subUnitId] = [];
            }

            const cellValue = {};

            for (const sel of selections) {
              this.#lockedRangeList[unitId][subUnitId].push({
                range: { ...sel.range },
                allowedRoles: permissionParams.allowedRoles
              });

              for (let r = sel.range.startRow; r <= sel.range.endRow; r++) {
                if (!cellValue[r]) cellValue[r] = {};
                for (
                  let c = sel.range.startColumn;
                  c <= sel.range.endColumn;
                  c++
                ) {
                  cellValue[r][c] = {};
                }
              }
            }

            accessor
              .get(ICommandService)
              .syncExecuteCommand(SetRangeValuesMutation.id, {
                unitId,
                subUnitId,
                cellValue,
                triggerByPlugin: true
              });

            messageService.show({
              type: MessageType.Success,
              content: localeService.t(
                'parker-nuxt-lab-plugins.sheet-lock.success.locked'
              )
            });

            return true;
          }
        };
      }

      #_createUnlockCommand(commandId, entire) {
        return {
          type: CommandType.OPERATION,
          id: commandId,
          handler: async (accessor) => {
            const univerInstanceService = accessor.get(IUniverInstanceService);
            const selectionManagerService = accessor.get(
              SheetsSelectionsService
            );
            const messageService = accessor.get(IMessageService);
            const localeService = accessor.get(LocaleService);

            const workbook = univerInstanceService.getFocusedUnit();
            if (
              !workbook ||
              workbook.type !== UniverInstanceType.UNIVER_SHEET
            ) {
              return false;
            }

            const selections = selectionManagerService.getCurrentSelections();
            if (!selections || selections.length === 0) {
              messageService.show({
                type: MessageType.Warning,
                content: localeService.t(
                  'parker-nuxt-lab-plugins.sheet-lock.error.selectFirstUnlock'
                )
              });
              return false;
            }

            const unitId = workbook.getUnitId();
            const subUnitId = workbook.getActiveSheet()?.getSheetId();
            if (!subUnitId) return false;

            const store = useUniverStore();
            const unitLocks = this.#lockedRangeList[unitId]?.[subUnitId] || [];

            let unlockedCount = 0;
            const cellValue = {};

            for (const sel of selections) {
              const { startRow, endRow, startColumn, endColumn } = sel.range;

              for (let i = unitLocks.length - 1; i >= 0; i--) {
                const lock = unitLocks[i];
                if (!lock) continue;
                const l = lock.range;

                const intersectRowStart = Math.max(startRow, l.startRow);
                const intersectRowEnd = Math.min(endRow, l.endRow);
                const intersectColStart = Math.max(startColumn, l.startColumn);
                const intersectColEnd = Math.min(endColumn, l.endColumn);

                const isIntersecting =
                  intersectRowStart <= intersectRowEnd &&
                  intersectColStart <= intersectColEnd;

                if (isIntersecting) {
                  if (
                    Array.isArray(lock.allowedRoles) &&
                    lock.allowedRoles.length > 0 &&
                    !lock.allowedRoles.includes(store.currentUserRole)
                  ) {
                    messageService.show({
                      type: MessageType.Error,
                      content: localeService.t(
                        'parker-nuxt-lab-plugins.sheet-lock.error.lockedBlocked'
                      )
                    });
                    return false;
                  }

                  unitLocks.splice(i, 1);
                  unlockedCount++;

                  if (!entire) {
                    const newLocks = [];
                    if (l.startRow < intersectRowStart) {
                      newLocks.push({
                        range: {
                          startRow: l.startRow,
                          endRow: intersectRowStart - 1,
                          startColumn: l.startColumn,
                          endColumn: l.endColumn
                        },
                        allowedRoles: lock.allowedRoles
                      });
                    }
                    if (l.endRow > intersectRowEnd) {
                      newLocks.push({
                        range: {
                          startRow: intersectRowEnd + 1,
                          endRow: l.endRow,
                          startColumn: l.startColumn,
                          endColumn: l.endColumn
                        },
                        allowedRoles: lock.allowedRoles
                      });
                    }
                    if (l.startColumn < intersectColStart) {
                      newLocks.push({
                        range: {
                          startRow: intersectRowStart,
                          endRow: intersectRowEnd,
                          startColumn: l.startColumn,
                          endColumn: intersectColStart - 1
                        },
                        allowedRoles: lock.allowedRoles
                      });
                    }
                    if (l.endColumn > intersectColEnd) {
                      newLocks.push({
                        range: {
                          startRow: intersectRowStart,
                          endRow: intersectRowEnd,
                          startColumn: intersectColEnd + 1,
                          endColumn: l.endColumn
                        },
                        allowedRoles: lock.allowedRoles
                      });
                    }
                    unitLocks.splice(i, 0, ...newLocks);

                    for (let r = intersectRowStart; r <= intersectRowEnd; r++) {
                      if (!cellValue[r]) cellValue[r] = {};
                      for (
                        let c = intersectColStart;
                        c <= intersectColEnd;
                        c++
                      ) {
                        cellValue[r][c] = {};
                      }
                    }
                  } else {
                    for (let r = l.startRow; r <= l.endRow; r++) {
                      if (!cellValue[r]) cellValue[r] = {};
                      for (let c = l.startColumn; c <= l.endColumn; c++) {
                        cellValue[r][c] = {};
                      }
                    }
                  }
                }
              }
            }

            if (unlockedCount > 0) {
              accessor
                .get(ICommandService)
                .syncExecuteCommand(SetRangeValuesMutation.id, {
                  unitId,
                  subUnitId,
                  cellValue,
                  triggerByPlugin: true
                });
              messageService.show({
                type: MessageType.Success,
                content: localeService.t(
                  'parker-nuxt-lab-plugins.sheet-lock.success.unlocked'
                )
              });
              return true;
            } else {
              messageService.show({
                type: MessageType.Info,
                content: localeService.t(
                  'parker-nuxt-lab-plugins.sheet-lock.success.noLockedRange'
                )
              });
              return false;
            }
          }
        };
      }

      #_createMenuItemHiddenObservable() {
        return new Observable((subscriber) => {
          const univerInstanceService = this.#_injector.get(
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
        });
      }

      #_registerMenus() {
        this.#menuManagerService.mergeMenu({
          [RibbonStartGroup.OTHERS]: {
            [this.MENU_ID_PARENT]: {
              order: 25,
              menuItemFactory: () => ({
                id: this.MENU_ID_PARENT,
                tooltip: 'parker-nuxt-lab-plugins.sheet-lock-menu.tooltip',
                icon: 'Vue3LockedRoundIcon',
                type: MenuItemType.SUBITEMS
              }),
              [this.COMMAND_ID_LOCK]: {
                order: 1,
                menuItemFactory: () => ({
                  id: this.COMMAND_ID_LOCK,
                  title: 'parker-nuxt-lab-plugins.sheet-lock.title',
                  tooltip: 'parker-nuxt-lab-plugins.sheet-lock.tooltip',
                  icon: 'Vue3LockIcon',
                  type: MenuItemType.BUTTON,
                  hidden$: this.#_createMenuItemHiddenObservable()
                })
              },
              [this.COMMAND_ID_UNLOCK]: {
                order: 2,
                menuItemFactory: () => ({
                  id: this.COMMAND_ID_UNLOCK,
                  title: 'parker-nuxt-lab-plugins.sheet-lock.unlockTitle',
                  tooltip: 'parker-nuxt-lab-plugins.sheet-lock.unlockTooltip',
                  icon: 'Vue3UnlockedIcon',
                  type: MenuItemType.BUTTON,
                  hidden$: this.#_createMenuItemHiddenObservable()
                })
              },
              [this.COMMAND_ID_UNLOCK_ENTIRE]: {
                order: 3,
                menuItemFactory: () => ({
                  id: this.COMMAND_ID_UNLOCK_ENTIRE,
                  title: 'parker-nuxt-lab-plugins.sheet-lock.unlockEntireTitle',
                  tooltip:
                    'parker-nuxt-lab-plugins.sheet-lock.unlockEntireTooltip',
                  icon: 'Vue3UnlockedIcon',
                  type: MenuItemType.BUTTON,
                  hidden$: this.#_createMenuItemHiddenObservable()
                })
              }
            }
          }
        });
      }

      #_isRangeBlocked(
        unitLocks,
        startRow,
        endRow,
        startColumn,
        endColumn,
        currentUserRole
      ) {
        for (const lock of unitLocks) {
          const l = lock.range;
          const intersectRow =
            Math.max(startRow, l.startRow) <= Math.min(endRow, l.endRow);
          const intersectCol =
            Math.max(startColumn, l.startColumn) <=
            Math.min(endColumn, l.endColumn);

          if (intersectRow && intersectCol) {
            if (
              Array.isArray(lock.allowedRoles) &&
              !lock.allowedRoles.includes(currentUserRole)
            ) {
              return true;
            }
          }
        }
        return false;
      }

      #_checkSelectionsBlocked(unitId, subUnitId, selections, currentUserRole) {
        const unitLocks = this.#lockedRangeList[unitId]?.[subUnitId] || [];
        if (unitLocks.length === 0) return false;

        if (selections && selections.length > 0) {
          const firstSelection = selections[0];
          if (firstSelection && firstSelection.primary) {
            const { startRow, endRow, startColumn, endColumn } =
              firstSelection.primary;
            return this.#_isRangeBlocked(
              unitLocks,
              startRow,
              endRow,
              startColumn,
              endColumn,
              currentUserRole
            );
          }
        }
        return false;
      }

      #_handleSelectionBlockedCheck(unitId, subUnitId, currentUserRole) {
        const selectionManagerService = this.#_injector.get(
          SheetsSelectionsService
        );
        const selections = selectionManagerService.getCurrentSelections();

        if (
          this.#_checkSelectionsBlocked(
            unitId,
            subUnitId,
            selections,
            currentUserRole
          )
        ) {
          this.#_showBlockedMessage();
          throw new Error(SHEET_LOCK_ERROR_MESSAGE);
        }
      }

      #_registerInterceptors() {
        this.#commandService.beforeCommandExecuted((commandInfo) => {
          const store = useUniverStore();
          const currentUserRole = store.currentUserRole;

          if (commandInfo.id === RichTextEditingMutation.id) {
            const params = commandInfo.params;
            if (
              params &&
              (params.unitId === DOCS_FORMULA_BAR_EDITOR_UNIT_ID_KEY ||
                params.unitId === DOCS_NORMAL_EDITOR_UNIT_ID_KEY)
            ) {
              const univerInstanceService = this.#_injector.get(
                IUniverInstanceService
              );
              const workbook = univerInstanceService.getCurrentUnitOfType(
                UniverInstanceType.UNIVER_SHEET
              );

              if (workbook) {
                const unitId = workbook.getUnitId();
                const subUnitId = workbook.getActiveSheet()?.getSheetId();
                if (subUnitId) {
                  this.#_handleSelectionBlockedCheck(
                    unitId,
                    subUnitId,
                    currentUserRole
                  );
                }
              }
            }
          }

          if (
            commandInfo.id === 'sheet.operation.set-cell-edit-visible' ||
            commandInfo.id === 'sheet.operation.set-cell-edit-visible-f2' ||
            commandInfo.id === 'sheet.operation.set-cell-edit-visible-arrow' ||
            commandInfo.id === 'sheet.operation.set-activate-cell-edit'
          ) {
            const params = commandInfo.params;

            if (!(params && 'visible' in params && params.visible === false)) {
              const univerInstanceService = this.#_injector.get(
                IUniverInstanceService
              );
              const unitId =
                params?.unitId ||
                univerInstanceService.getFocusedUnit()?.getUnitId();

              if (unitId) {
                const workbook = univerInstanceService.getUnit(unitId);
                const subUnitId = workbook?.getActiveSheet()?.getSheetId();

                if (subUnitId) {
                  this.#_handleSelectionBlockedCheck(
                    unitId,
                    subUnitId,
                    currentUserRole
                  );
                }
              }
            }
          }

          if (commandInfo.id === SetRangeValuesMutation.id) {
            const params = commandInfo.params;

            if (params.triggerByPlugin) return;

            const unitLocks =
              this.#lockedRangeList[params.unitId]?.[params.subUnitId] || [];
            if (unitLocks.length === 0) return;

            const { cellValue } = params;
            if (cellValue) {
              for (const rowStr in cellValue) {
                const row = parseInt(rowStr, 10);
                const rowData = cellValue[row];
                if (!rowData) continue;

                for (const colStr in rowData) {
                  const col = parseInt(colStr, 10);
                  const cell = rowData[col];
                  if (cell === undefined || cell === null) continue;

                  if (
                    this.#_isRangeBlocked(
                      unitLocks,
                      row,
                      row,
                      col,
                      col,
                      currentUserRole
                    )
                  ) {
                    this.#_showBlockedMessage();
                    throw new Error(SHEET_LOCK_ERROR_MESSAGE);
                  }
                }
              }
            }
          }

          if (commandInfo.id === RemoveRowMutation.id) {
            const params = commandInfo.params;
            const unitLocks =
              this.#lockedRangeList[params.unitId]?.[params.subUnitId] || [];
            if (unitLocks.length > 0) {
              const { startRow, endRow } = params.range;
              if (
                this.#_isRangeBlocked(
                  unitLocks,
                  startRow,
                  endRow,
                  -Infinity,
                  Infinity,
                  currentUserRole
                )
              ) {
                this.#_showBlockedMessage();
                throw new Error(SHEET_LOCK_ERROR_MESSAGE);
              }
            }
          }

          if (commandInfo.id === RemoveColMutation.id) {
            const params = commandInfo.params;
            const unitLocks =
              this.#lockedRangeList[params.unitId]?.[params.subUnitId] || [];
            if (unitLocks.length > 0) {
              const { startColumn, endColumn } = params.range;
              if (
                this.#_isRangeBlocked(
                  unitLocks,
                  -Infinity,
                  Infinity,
                  startColumn,
                  endColumn,
                  currentUserRole
                )
              ) {
                this.#_showBlockedMessage();
                throw new Error(SHEET_LOCK_ERROR_MESSAGE);
              }
            }
          }
        });
      }

      #_showBlockedMessage = throttle(
        () => {
          const messageService = this.#_injector.get(IMessageService);
          const localeService = this.#_injector.get(LocaleService);
          messageService.show({
            type: MessageType.Error,
            content: localeService.t(
              'parker-nuxt-lab-plugins.sheet-lock.error.lockedBlocked'
            )
          });
        },
        500,
        { trailing: false }
      );
    }

    setDependencies(
      SheetLockPlugin,
      [
        [Injector],
        [IMenuManagerService],
        [ICommandService],
        [ComponentManager]
      ],
      1
    );

    resolve(SheetLockPlugin);
  });
}

export default createdSheetLockPlugin;
