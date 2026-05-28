import Vue3LockIcon from '@app/components/Icon/Lock';
import Vue3UnlockedIcon from '@app/components/Icon/Unlocked';

import { useUniverStore } from '@app/store/univer';

const DOC_LOCK_ERROR_MESSAGE = 'Edit blocked: Range is locked.';

function ignoreErrorLog() {
  if (typeof window === 'undefined') return;
  if (window.__UNIVER__DOC_LOCKED_ERROR_FILTERED__ === true) return;

  // 1. 攔截未捕獲的例外錯誤 (Uncaught Exception)
  // 如果 throw new Error 沒有被 try-catch 抓住，它會觸發 window 的 error 事件
  window.addEventListener('error', (event) => {
    if (event.error?.message?.includes(DOC_LOCK_ERROR_MESSAGE)) {
      event.preventDefault(); // 阻止瀏覽器在 Console 印出這個錯誤
    }
  });

  // 2. 攔截未處理的 Promise 拒絕 (Unhandled Promise Rejection)
  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason?.message?.includes(DOC_LOCK_ERROR_MESSAGE)) {
      event.preventDefault(); // 阻止瀏覽器在 Console 印出這個錯誤
    }
  });

  // 3. 原本的 console.error 覆寫 (以防 Univer 內部有去 catch 並且用 console.error 印出來)
  window.originalConsoleError = window.console.error;

  window.console.error = function (...args) {
    // 檢查參數中是否包含特定的鎖定阻擋錯誤（字串或 Error 物件）
    const isLockedError = args.some(
      (arg) =>
        (typeof arg === 'string' && arg.includes(DOC_LOCK_ERROR_MESSAGE)) ||
        (arg instanceof Error && arg.message.includes(DOC_LOCK_ERROR_MESSAGE))
    );

    if (isLockedError) {
      // 攔截到預期的鎖定阻擋錯誤，直接 return 吃掉，保持 console 乾淨
      return;
    }

    // 如果不是我們要攔截的錯誤，就照常印出
    window.originalConsoleError.apply(console, args);
  };

  window.__UNIVER__DOC_LOCKED_ERROR_FILTERED__ = true;
}

export function createdDocLockPlugin(tryLimit = 10, tryCount = 0) {
  if (typeof window === 'undefined') return;

  return new Promise((resolve, rejects) => {
    const {
      rxjs = {},
      UniverUi = {},
      UniverCore = {},
      UniverDesign = {},
      UniverDocs = {}
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
      CustomRangeType,
      generateRandomId,
      LocaleService
    } = UniverCore;
    const {
      ComponentManager,
      IMenuManagerService,
      MenuItemType,
      RibbonStartGroup,
      IMessageService
    } = UniverUi;
    const { MessageType } = UniverDesign;
    const {
      DocSelectionManagerService,
      addCustomRangeBySelectionFactory,
      deleteCustomRangeFactory
    } = UniverDocs;

    if (
      typeof Observable === 'undefined' ||
      typeof Injector === 'undefined' ||
      typeof setDependencies === 'undefined' ||
      typeof Plugin === 'undefined' ||
      typeof ICommandService === 'undefined' ||
      typeof IUniverInstanceService === 'undefined' ||
      typeof UniverInstanceType === 'undefined' ||
      typeof CommandType === 'undefined' ||
      typeof CustomRangeType === 'undefined' ||
      typeof generateRandomId === 'undefined' ||
      typeof LocaleService === 'undefined' ||
      typeof ComponentManager === 'undefined' ||
      typeof IMenuManagerService === 'undefined' ||
      typeof MenuItemType === 'undefined' ||
      typeof RibbonStartGroup === 'undefined' ||
      typeof IMessageService === 'undefined' ||
      typeof MessageType === 'undefined' ||
      typeof DocSelectionManagerService === 'undefined' ||
      typeof addCustomRangeBySelectionFactory === 'undefined' ||
      typeof deleteCustomRangeFactory === 'undefined'
    ) {
      if (tryCount < tryLimit) {
        resolve(createdDocLockPlugin(tryLimit, tryCount + 1));
      }
      return rejects(new Error('Failed to load Univer dependencies'));
    }

    class DocLockPlugin extends Plugin {
      static pluginName = 'doc-lock-plugin';

      constructor(
        _config,
        _injector,
        menuManagerService,
        commandService,
        componentManager
      ) {
        super();

        this._config = _config || {};
        this._injector = _injector;
        this.menuManagerService = menuManagerService;
        this.commandService = commandService;
        this.componentManager = componentManager;

        // 修正 Univer 編輯器在鎖定範圍時發出的錯誤訊息
        ignoreErrorLog();
      }

      onStarting() {
        this.componentManager.register('Vue3LockIcon', Vue3LockIcon, {
          framework: 'vue3'
        });
        this.componentManager.register('Vue3UnlockedIcon', Vue3UnlockedIcon, {
          framework: 'vue3'
        });

        // --- Univer Bug Fix: Patch DocSelectionManagerService to prevent preset-docs-hyper-link crash ---
        // The hyper-link plugin reads `activeRanges[0].segmentId` directly on hover,
        // which crashes if `getTextRanges()` returns an empty array.
        const docSelectionManagerService = this._injector.get(
          DocSelectionManagerService
        );
        if (docSelectionManagerService) {
          const originalGetTextRanges =
            docSelectionManagerService.getTextRanges.bind(
              docSelectionManagerService
            );
          docSelectionManagerService.getTextRanges = () => {
            const ranges = originalGetTextRanges();
            if (Array.isArray(ranges) && ranges.length === 0) {
              // Return a Proxy that acts as an empty array but returns an empty object for index 0 to avoid undefined crash
              return new Proxy(ranges, {
                get(target, prop) {
                  if (prop === '0') return {};
                  return Reflect.get(target, prop);
                }
              });
            }
            return ranges;
          };
        }

        const commandId = 'doc.command.lock-selection';

        const lockCommand = {
          type: CommandType.OPERATION,
          id: commandId,
          handler: async (accessor) => {
            const univerInstanceService = accessor.get(IUniverInstanceService);
            const docSelectionManagerService = accessor.get(
              DocSelectionManagerService
            );
            const messageService = accessor.get(IMessageService);
            const commandService = accessor.get(ICommandService);
            const localeService = accessor.get(LocaleService);

            const doc = univerInstanceService.getFocusedUnit();
            if (!doc || doc.type !== UniverInstanceType.UNIVER_DOC) {
              return false;
            }

            const activeTextRange =
              docSelectionManagerService.getActiveTextRange();
            if (!activeTextRange) {
              messageService.show({
                type: MessageType.Warning,
                content: localeService.t(
                  'parker-nuxt-lab-plugins.doc-lock.error.selectFirst'
                )
              });
              return false;
            }

            const store = useUniverStore();
            const permissionParams = await store.requestLockPermissions();
            if (!permissionParams) {
              return false; // 使用者取消鎖定
            }

            const { startOffset, endOffset } = activeTextRange;
            if (startOffset === endOffset) {
              messageService.show({
                type: MessageType.Warning,
                content: localeService.t(
                  'parker-nuxt-lab-plugins.doc-lock.error.emptySelection'
                )
              });
              return false;
            }

            // 使用 CustomRangeFactory 建立自訂範圍
            const rangeId = generateRandomId();
            const selection = {
              startOffset,
              endOffset,
              collapsed: false
            };
            if (activeTextRange.segmentId) {
              selection.segmentId = activeTextRange.segmentId;
            }
            const selections = [selection];

            const noStyle =
              typeof this._config.noStyle === 'boolean'
                ? this._config.noStyle
                : true;
            const customRangeMutation = addCustomRangeBySelectionFactory(
              accessor,
              {
                unitId: doc.getUnitId(),
                rangeId,
                rangeType: noStyle ? 8888 : CustomRangeType.CUSTOM,
                properties: {
                  locked: true,
                  allowedRoles: permissionParams.allowedRoles
                },
                selections
              }
            );

            if (customRangeMutation) {
              this.isPluginModifyingLock = true;
              try {
                commandService.syncExecuteCommand(
                  customRangeMutation.id,
                  customRangeMutation.params
                );
              } finally {
                this.isPluginModifyingLock = false;
              }
              messageService.show({
                type: MessageType.Success,
                content: `${localeService.t('parker-nuxt-lab-plugins.doc-lock.success.locked')}${startOffset} - ${endOffset}`
              });
              console.log(
                '[DocLockPlugin] Range locked:',
                startOffset,
                endOffset,
                customRangeMutation
              );
              return true;
            }

            return false;
          }
        };

        this.commandService.registerCommand(lockCommand);

        const unlockCommandId = 'doc.command.unlock-selection';
        const unlockCommand = {
          type: CommandType.OPERATION,
          id: unlockCommandId,
          handler: async (accessor) => {
            const univerInstanceService = accessor.get(IUniverInstanceService);
            const docSelectionManagerService = accessor.get(
              DocSelectionManagerService
            );
            const messageService = accessor.get(IMessageService);
            const commandService = accessor.get(ICommandService);
            const localeService = accessor.get(LocaleService);

            const doc = univerInstanceService.getFocusedUnit();
            if (!doc || doc.type !== UniverInstanceType.UNIVER_DOC) {
              return false;
            }

            const activeTextRange =
              docSelectionManagerService.getActiveTextRange();
            if (!activeTextRange) {
              messageService.show({
                type: MessageType.Warning,
                content: localeService.t(
                  'parker-nuxt-lab-plugins.doc-lock.error.selectFirst'
                )
              });
              return false;
            }

            const { startOffset: uStart, endOffset: uEnd } = activeTextRange;
            if (uStart === uEnd || uStart === undefined || uEnd === undefined) {
              messageService.show({
                type: MessageType.Warning,
                content: localeService.t(
                  'parker-nuxt-lab-plugins.doc-lock.error.emptySelection'
                )
              });
              return false;
            }

            const documentDataModel = doc;
            const customRanges = documentDataModel.getCustomRanges?.() || [];
            const lockedRanges = customRanges.filter(
              (r) => r.properties?.locked
            );

            const store = useUniverStore();
            let unlockedCount = 0;

            for (const lr of lockedRanges) {
              const lStart = lr.startIndex;
              const lEnd = lr.endIndex + 1; // Convert inclusive index to exclusive offset

              const overlapStart = Math.max(uStart, lStart);
              const overlapEnd = Math.min(uEnd, lEnd);

              if (overlapStart < overlapEnd) {
                // 解鎖前先檢查是否有權限
                const allowedRoles = lr.properties?.allowedRoles;
                if (
                  Array.isArray(allowedRoles) &&
                  allowedRoles.length > 0 &&
                  !allowedRoles.includes(store.currentUserRole)
                ) {
                  messageService.show({
                    type: MessageType.Error,
                    content: localeService.t(
                      'parker-nuxt-lab-plugins.doc-lock.error.lockedBlocked'
                    ) // 或者提供專門的拒絕解鎖訊息
                  });
                  return false; // 阻擋解鎖
                }
                unlockedCount++;

                this.isPluginModifyingLock = true;
                try {
                  // Delete the original locked range
                  const deleteMutation = deleteCustomRangeFactory(accessor, {
                    unitId: doc.getUnitId(),
                    rangeId: lr.rangeId
                  });

                  if (deleteMutation) {
                    commandService.syncExecuteCommand(
                      deleteMutation.id,
                      deleteMutation.params
                    );
                  }

                  // Create a new locked range for the left side (if any)
                  if (lStart < uStart) {
                    const newRangeIdLeft = generateRandomId();
                    const selectionLeft = {
                      startOffset: lStart,
                      endOffset: uStart,
                      collapsed: false
                    };
                    if (activeTextRange.segmentId) {
                      selectionLeft.segmentId = activeTextRange.segmentId;
                    }
                    const selectionsLeft = [selectionLeft];
                    const leftMutation = addCustomRangeBySelectionFactory(
                      accessor,
                      {
                        unitId: doc.getUnitId(),
                        rangeId: newRangeIdLeft,
                        rangeType: lr.rangeType,
                        properties: { ...lr.properties },
                        selections: selectionsLeft
                      }
                    );
                    if (leftMutation)
                      commandService.syncExecuteCommand(
                        leftMutation.id,
                        leftMutation.params
                      );
                  }

                  // Create a new locked range for the right side (if any)
                  if (lEnd > uEnd) {
                    const newRangeIdRight = generateRandomId();
                    const selectionRight = {
                      startOffset: uEnd,
                      endOffset: lEnd,
                      collapsed: false
                    };
                    if (activeTextRange.segmentId) {
                      selectionRight.segmentId = activeTextRange.segmentId;
                    }
                    const selectionsRight = [selectionRight];
                    const rightMutation = addCustomRangeBySelectionFactory(
                      accessor,
                      {
                        unitId: doc.getUnitId(),
                        rangeId: newRangeIdRight,
                        rangeType: lr.rangeType,
                        properties: { ...lr.properties },
                        selections: selectionsRight
                      }
                    );
                    if (rightMutation)
                      commandService.syncExecuteCommand(
                        rightMutation.id,
                        rightMutation.params
                      );
                  }
                } finally {
                  this.isPluginModifyingLock = false;
                }
              }
            }

            if (unlockedCount > 0) {
              messageService.show({
                type: MessageType.Success,
                content: `${localeService.t('parker-nuxt-lab-plugins.doc-lock.success.unlocked')}${uStart} - ${uEnd}`
              });
              return true;
            } else {
              messageService.show({
                type: MessageType.Info,
                content: localeService.t(
                  'parker-nuxt-lab-plugins.doc-lock.success.noLockedRange'
                )
              });
              return false;
            }
          }
        };

        this.commandService.registerCommand(unlockCommand);

        const menuItemFactory = () => ({
          id: commandId,
          title: 'parker-nuxt-lab-plugins.doc-lock.title',
          tooltip: 'parker-nuxt-lab-plugins.doc-lock.tooltip',
          icon: 'Vue3LockIcon',
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
                subscriber.next(unit?.type !== UniverInstanceType.UNIVER_DOC);
              }
            );
            return () => subscription.unsubscribe();
          })
        });

        const unlockMenuItemFactory = () => ({
          id: unlockCommandId,
          title: 'parker-nuxt-lab-plugins.doc-lock.unlockTitle',
          tooltip: 'parker-nuxt-lab-plugins.doc-lock.unlockTooltip',
          icon: 'Vue3UnlockedIcon',
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
                subscriber.next(unit?.type !== UniverInstanceType.UNIVER_DOC);
              }
            );
            return () => subscription.unsubscribe();
          })
        });

        this.menuManagerService.mergeMenu({
          [RibbonStartGroup.OTHERS]: {
            [commandId]: {
              order: 25,
              menuItemFactory
            },
            [unlockCommandId]: {
              order: 26,
              menuItemFactory: unlockMenuItemFactory
            }
          }
        });

        // 攔截核心編輯 Mutation
        this.commandService.beforeCommandExecuted((commandInfo) => {
          if (this.isPluginModifyingLock) return;

          if (commandInfo.id === 'doc.mutation.rich-text-editing') {
            const params = commandInfo.params;
            const univerInstanceService = this._injector.get(
              IUniverInstanceService
            );
            const doc = univerInstanceService.getUnit(params.unitId);

            if (doc && doc.type === UniverInstanceType.UNIVER_DOC) {
              // 取得文件中所有的 custom ranges
              const documentDataModel = doc;
              const customRanges = documentDataModel.getCustomRanges?.() || [];
              const lockedRanges = customRanges.filter(
                (r) => r.properties?.locked
              );

              if (lockedRanges.length > 0) {
                const store = useUniverStore();
                // 從 ot-json1 的 JSONOp 中遞迴尋找 TextX 操作陣列
                const findTextXActions = (obj) => {
                  if (Array.isArray(obj)) {
                    for (const item of obj) {
                      if (item && typeof item === 'object') {
                        const record = item;
                        if (record.t === 'TextX' && Array.isArray(record.o)) {
                          return record.o;
                        }
                        if (record.et === 'text-x' && Array.isArray(record.e)) {
                          return record.e;
                        }
                      }
                      const res = findTextXActions(item);
                      if (res) return res;
                    }
                  } else if (obj && typeof obj === 'object') {
                    const record = obj;
                    if (record.t === 'TextX' && Array.isArray(record.o)) {
                      return record.o;
                    }
                    if (record.et === 'text-x' && Array.isArray(record.e)) {
                      return record.e;
                    }
                    for (const key in record) {
                      const res = findTextXActions(record[key]);
                      if (res) return res;
                    }
                  }
                  return null;
                };

                const textXActions = findTextXActions(params.actions) || [];
                let currentOffset = 0;
                let isBlocked = false;

                for (const actionUnsafe of textXActions) {
                  const action = actionUnsafe;
                  if (action.t === 'r') {
                    if (action.body) {
                      const editStart = currentOffset;
                      const editEnd = currentOffset + (action.len ?? 0);
                      for (const lockedRange of lockedRanges) {
                        const lStart = lockedRange.startIndex;
                        const lEnd = lockedRange.endIndex + 1;
                        const overlap = Math.max(
                          0,
                          Math.min(editEnd, lEnd) - Math.max(editStart, lStart)
                        );
                        if (overlap > 0) {
                          const allowedRoles =
                            lockedRange.properties?.allowedRoles;
                          if (
                            Array.isArray(allowedRoles) &&
                            allowedRoles.includes(store.currentUserRole)
                          ) {
                            continue; // 允許編輯
                          }
                          isBlocked = true;
                          break;
                        }
                      }
                    }
                    currentOffset += action.len ?? 0;
                  } else if (action.t === 'i') {
                    const editOffset = currentOffset;
                    for (const lockedRange of lockedRanges) {
                      const lStart = lockedRange.startIndex;
                      const lEnd = lockedRange.endIndex + 1;
                      if (editOffset > lStart && editOffset < lEnd) {
                        const allowedRoles =
                          lockedRange.properties?.allowedRoles;
                        if (
                          Array.isArray(allowedRoles) &&
                          allowedRoles.includes(store.currentUserRole)
                        ) {
                          continue; // 允許編輯
                        }
                        isBlocked = true;
                        break;
                      }
                    }
                  } else if (action.t === 'd') {
                    const editStart = currentOffset;
                    const editEnd = currentOffset + (action.len ?? 0);
                    for (const lockedRange of lockedRanges) {
                      const lStart = lockedRange.startIndex;
                      const lEnd = lockedRange.endIndex + 1;
                      const overlap = Math.max(
                        0,
                        Math.min(editEnd, lEnd) - Math.max(editStart, lStart)
                      );
                      if (overlap > 0) {
                        const allowedRoles =
                          lockedRange.properties?.allowedRoles;
                        if (
                          Array.isArray(allowedRoles) &&
                          allowedRoles.includes(store.currentUserRole)
                        ) {
                          continue; // 允許編輯
                        }
                        isBlocked = true;
                        break;
                      }
                    }
                    currentOffset += action.len ?? 0;
                  }

                  if (isBlocked) break;
                }

                if (isBlocked) {
                  const messageService = this._injector.get(IMessageService);
                  const localeService = this._injector.get(LocaleService);
                  messageService.show({
                    type: MessageType.Error,
                    content: localeService.t(
                      'parker-nuxt-lab-plugins.doc-lock.error.lockedBlocked'
                    )
                  });
                  throw new Error(DOC_LOCK_ERROR_MESSAGE);
                }
              }
            }
          }
        });
      }
    }

    setDependencies(
      DocLockPlugin,
      [
        [Injector],
        [IMenuManagerService],
        [ICommandService],
        [ComponentManager]
      ],
      1
    );

    resolve(DocLockPlugin);
  });
}

export default createdDocLockPlugin;
