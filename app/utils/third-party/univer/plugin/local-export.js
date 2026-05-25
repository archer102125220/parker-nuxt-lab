export function createdLocalExportButtonPlugin(tryLimit = 10, tryCount = 0) {
  return new Promise((resolve, rejects) => {
    const {
      rxjs = {},
      UniverUi = {},
      UniverCore = {},
      UniverDesign = {}
    } = window;
    const wendellhuRedi = window['@wendellhu/redi'] || {};

    const { Observable } = rxjs;
    const { Injector, setDependencies } = wendellhuRedi;
    const {
      ComponentManager,
      IMenuManagerService,
      MenuItemType,
      RibbonStartGroup,
      IMessageService
    } = UniverUi;
    const {
      CommandType,
      ICommandService,
      IUniverInstanceService,
      Plugin,
      UniverInstanceType
    } = UniverCore;
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
      typeof CommandType === 'undefined' ||
      typeof ICommandService === 'undefined' ||
      typeof IUniverInstanceService === 'undefined' ||
      typeof Plugin === 'undefined' ||
      typeof UniverInstanceType === 'undefined' ||
      typeof MessageType === 'undefined'
    ) {
      if (tryCount < tryLimit) {
        resolve(createdLocalExportButtonPlugin(tryLimit, tryCount + 1));
      }
      return rejects(new Error('Failed to load Univer dependencies'));
    }

    /**
     * 本地文件匯出外掛 (支援 Word / Excel)
     * 專門處理「非協同模式」下，前端建立的本地檔案如何正確匯出為 DOCX / XLSX
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
        this._injector = _injector;
        this.menuManagerService = menuManagerService;
        this.commandService = commandService;
        this.componentManager = componentManager;
      }

      onStarting() {
        const buttonId = 'local-export-button';

        const command = {
          type: CommandType.OPERATION,
          id: buttonId,
          handler: async (accessor) => {
            const univerInstanceService = accessor.get(IUniverInstanceService);
            const messageService = accessor.get(IMessageService);
            const doc = univerInstanceService.getFocusedUnit();
            if (!doc) return false;
            const focusedUnitId = doc.getUnitId();
            if (typeof focusedUnitId !== 'string' || focusedUnitId === '')
              return false;

            const isDoc = doc.type === UniverInstanceType.UNIVER_DOC;
            const isSheet = doc.type === UniverInstanceType.UNIVER_SHEET;

            if (!isDoc && !isSheet) return false;

            const fileType = isDoc ? 1 : 2; // 1: Doc, 2: Sheet
            const fileExtension = isDoc ? 'docx' : 'xlsx';

            try {
              messageService.show({
                type: MessageType.Info,
                content: '正在為您匯出文件，這可能需要幾秒鐘的時間，請稍候...'
              });

              // 1. 取得完整的文件 Snapshot JSON
              const snapshot = doc.getSnapshot();
              // 為了相容 Universer 的 Protobuf 定義，深拷貝一份，並移除後端不認識的屬性
              const clonedSnapshot = JSON.parse(JSON.stringify(snapshot));
              if (clonedSnapshot) {
                const invalidKeys = [
                  'id', 'documentStyle', 'locale', 'title', 'settings', 'disabled', 'rev', 
                  'tableSource', 'footers', 'headers', 'lists', 'drawings', 'drawingsOrder', 
                  'headerFooterDrawingsOrder', 'resources'
                ];
                invalidKeys.forEach(key => {
                  if (key in clonedSnapshot) delete clonedSnapshot[key];
                });
              }
              
              const snapshotStr = JSON.stringify(clonedSnapshot);

              // 定義後端 API 路徑 (這裡先預設使用預設的 proxy 或直連路徑)
              const UNIVERSER_HOST =
                import.meta.env.VITE_UNIVERSER_DOCKER_HOST ||
                'http://localhost:8000';
              const API_PREFIX = `${UNIVERSER_HOST}/universer-api`;

              // 2. 上傳快照到 Universer 取得 FileId (jsonID)
              const blob = new Blob([snapshotStr], {
                type: 'application/json'
              });
              const formData = new FormData();
              // 必須使用 Blob 封裝以符合 multipart/form-data 格式
              formData.append('file', blob, 'snapshot.json');

              const uploadUrl = `${API_PREFIX}/stream/file/upload?size=${blob.size}&source=1&flate=false`;
              const uploadRes = await fetch(uploadUrl, {
                method: 'POST',
                body: formData
              });

              if (!uploadRes.ok) {
                const errText = await uploadRes.text();
                throw new Error(`上傳失敗 (${uploadRes.status}): ${errText}`);
              }

              const uploadData = await uploadRes.json();

              // 注意: Univer 的成功代碼通常為 0 或 1
              if (
                typeof uploadData !== 'object' ||
                uploadData === null ||
                !uploadData.FileId
              ) {
                throw new Error('上傳 Snapshot 失敗');
              }
              const fileId = uploadData.FileId;

              // 3. 呼叫匯出 API (type: 1 代表 Doc，type: 2 代表 Sheet)
              const exportUrl = `${API_PREFIX}/exchange/${fileType}/export`;
              const exportRes = await fetch(exportUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  unitID: '', // 留空，因為這是一份尚未存在於後端資料庫的本地檔案
                  jsonID: fileId, // 帶入我們剛剛上傳後拿到的 jsonID
                  type: fileType
                })
              });
              const exportData = await exportRes.json();

              const taskID = exportData.taskID;
              if (typeof taskID !== 'string' || taskID === '') {
                throw new Error('呼叫匯出任務失敗，未取得 taskID');
              }

              // 4. Polling (輪詢) 檢查任務狀態
              let isSuccess = false;
              let finalTaskData = null;

              for (let i = 0; i < 30; i++) {
                // 最多等 30 秒
                const taskUrl = `${API_PREFIX}/exchange/task/${taskID}`;
                const taskRes = await fetch(taskUrl);
                const taskData = await taskRes.json();

                if (taskData.status === 'success') {
                  isSuccess = true;
                  finalTaskData = taskData;
                  break;
                } else if (
                  taskData.status === 'error' ||
                  taskData.status === 'failed'
                ) {
                  console.error(
                    '[LocalExportPlugin] Task failed details:',
                    taskData
                  );
                  throw new Error(
                    taskData.error?.message ||
                      '後端匯出任務執行失敗: ' + JSON.stringify(taskData)
                  );
                }

                // pending 或 running 狀態，等待 1 秒後再試
                await new Promise((r) => setTimeout(r, 1000));
              }

              if (!isSuccess || finalTaskData === null) {
                throw new Error('匯出任務超時');
              }

              // 5. 下載檔案
              // 通常 Univer 後端轉換完成後，taskData 裡面會帶有結果的 URL 或新的 FileId
              // 實際的欄位名稱可能因版本略有不同，以下根據經驗涵蓋常見的幾種情形
              let downloadUrl = '';
              if (
                typeof finalTaskData.url === 'string' &&
                finalTaskData.url !== ''
              ) {
                downloadUrl = finalTaskData.url;
              } else if (
                typeof finalTaskData.downloadUrl === 'string' &&
                finalTaskData.downloadUrl !== ''
              ) {
                downloadUrl = finalTaskData.downloadUrl;
              } else if (
                typeof finalTaskData.fileID === 'string' &&
                finalTaskData.fileID !== ''
              ) {
                downloadUrl = `${UNIVERSER_HOST}/file/${finalTaskData.fileID}/download`;
              } else if (
                typeof finalTaskData.fileId === 'string' &&
                finalTaskData.fileId !== ''
              ) {
                downloadUrl = `${UNIVERSER_HOST}/file/${finalTaskData.fileId}/download`;
              } else {
                // 如果沒有明確的下載網址，預設嘗試用 taskID 當作 fileID 下載看看
                downloadUrl = `${UNIVERSER_HOST}/file/${taskID}/download`;
                console.warn(
                  '未在任務結果中找到明確的下載欄位，嘗試使用預設組合:',
                  finalTaskData
                );
              }

              // 建立一個不可見的 <a> 標籤來觸發瀏覽器下載
              const link = document.createElement('a');
              link.href = downloadUrl;
              link.target = '_blank'; // 以防跨域直接開啟新分頁下載
              link.download = `export.${fileExtension}`;
              link.style.display = 'none';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);

              return true;
            } catch (err) {
              console.error('[LocalExportPlugin] Error:', err);
              const errorMessage =
                err instanceof Error ? err.message : String(err);
              messageService.show({
                type: MessageType.Error,
                content: '匯出發生錯誤：' + errorMessage
              });
              return false;
            }
          }
        };

        const menuItemFactory = () => ({
          id: buttonId,
          title: 'Export File',
          tooltip: 'Export as Local File',
          icon: 'ExportIcon',
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
                // 如果目前的檔案不是文件 (DOC) 且不是試算表 (SHEET)，就隱藏這顆按鈕
                subscriber.next(
                  unit?.type !== UniverInstanceType.UNIVER_DOC &&
                    unit?.type !== UniverInstanceType.UNIVER_SHEET
                );
              }
            );
            return () => subscription.unsubscribe();
          })
        });

        // 加入到工具列的 OTHER 群組
        this.menuManagerService.mergeMenu({
          [RibbonStartGroup.OTHERS]: {
            [buttonId]: {
              order: 20,
              menuItemFactory
            }
          }
        });

        this.commandService.registerCommand(command);
      }
    }

    setDependencies(LocalExportButtonPlugin, [
      , // eslint-disable-line no-sparse-arrays
      [Injector],
      [IMenuManagerService],
      [ICommandService],
      [ComponentManager]
    ]);

    resolve(LocalExportButtonPlugin);
  });
}

export default createdLocalExportButtonPlugin;
