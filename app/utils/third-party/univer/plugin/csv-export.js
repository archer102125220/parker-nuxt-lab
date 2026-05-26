import Vue3IconCSVExport from '@app/components/Icon/CSVExport.jsx';

export function createdExportCSVButtonPlugin(tryLimit = 10, tryCount = 0) {
  return new Promise((resolve, rejects) => {
    const { rxjs = {}, UniverUi = {}, UniverCore = {} } = window;
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
      CommandType,
      ICommandService,
      IUniverInstanceService,
      Plugin,
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
      typeof CommandType === 'undefined' ||
      typeof ICommandService === 'undefined' ||
      typeof IUniverInstanceService === 'undefined' ||
      typeof Plugin === 'undefined' ||
      typeof UniverInstanceType === 'undefined'
    ) {
      if (tryCount < tryLimit) {
        return setTimeout(() => {
          resolve(createdExportCSVButtonPlugin(tryLimit, tryCount + 1));
        }, 1000);
      }
      return rejects(new Error('Failed to load Univer dependencies'));
    }
    /**
     * 匯出 CSV 按鈕外掛
     * 這個外掛會從目前的 Univer 工作表讀取資料並觸發 CSV 檔案下載。
     * 它展示了如何將自訂按鈕加入功能區、執行指令，
     * 以及直接從 Univer 資料模型讀取資料。
     */
    class ExportCSVButtonPlugin extends Plugin {
      static pluginName = 'export-csv-plugin';

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

      /**
       * onStarting 是 Univer 外掛的第一個生命週期方法。
       * 它會在掛載外掛時被呼叫，發生在建立業務實例（如工作簿）之前。
       * 這是註冊元件、指令與選單項目的理想位置。
       */
      onStarting() {
        // 1. 註冊我們想在選單中使用的圖示
        this.componentManager.register('Vue3IconCSVExport', Vue3IconCSVExport, {
          framework: 'vue3'
        });

        const buttonId = 'export-csv-button';

        // 2. 定義點擊按鈕時將會執行的指令
        const command = {
          type: CommandType.OPERATION, // OPERATION 代表這是 UI/使用者操作，而非核心資料變動（MUTATION）。這裡不需要復原/重做。
          id: buttonId,
          handler: (accessor) => {
            // 'accessor' 的作用類似於服務定位器，用於在執行指令期間動態獲取所需的服務。
            const univerInstanceService = accessor.get(IUniverInstanceService);

            // 獲取目前的工作簿（試算表文件）實例
            const workbook = univerInstanceService.getCurrentUnitOfType(
              UniverInstanceType.UNIVER_SHEET
            );
            if (!workbook) return false;

            // 獲取工作簿中目前活躍的工作表（分頁）
            const worksheet = workbook.getActiveSheet();

            // 找出工作表的最大列與欄限制
            const rowCount = worksheet.getRowCount();
            const colCount = worksheet.getColumnCount();

            let csvContent = '';

            // 3. 遍歷所有列與欄以提取儲存格資料
            for (let r = 0; r < rowCount; r++) {
              const rowData = [];
              for (let c = 0; c < colCount; c++) {
                // getCell 會回傳內部的儲存格資料物件（ICellData），如果儲存格完全為空則回傳 undefined
                const cell = worksheet.getCell(r, c);

                // 提取值。'v' 是原始值。
                // 另外，'m' 代表格式化後的字串值。
                const val = cell?.v ?? '';
                let strVal = String(val);

                // CSV 跳脫規則：
                // 如果值包含雙引號、逗號或換行符，請將其用雙引號包裝
                // 並將內部的雙引號重複一次來進行跳脫。
                if (
                  strVal.includes(',') ||
                  strVal.includes('"') ||
                  strVal.includes('\n')
                ) {
                  strVal = `"${strVal.replace(/"/g, '""')}"`;
                }
                rowData.push(strVal);
              }
              // 用逗號連接欄，用換行符連接列
              csvContent += rowData.join(',') + '\n';
            }

            // 4. 建立 Blob 並使用標準瀏覽器 API 觸發檔案下載
            // \uFEFF 是 UTF-8 的位元組順序記號 (BOM)，確保 Excel 能正確開啟 CSV。
            const blob = new Blob(['\uFEFF' + csvContent], {
              type: 'text/csv;charset=utf-8;'
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${worksheet.getName() || 'export'}.csv`; // 使用工作表名稱作為檔名
            link.style.display = 'none';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            return true;
          }
        };

        // 3. 定義 UI 功能區的選單項目設定
        const menuItemFactory = () => ({
          id: buttonId,
          title: 'parker-vue-lab-plugins.csv-export.title',
          tooltip: 'parker-vue-lab-plugins.csv-export.tooltip',
          icon: 'Vue3IconCSVExport', // 這必須與我們在 componentManager 中註冊的名稱相符
          type: MenuItemType.BUTTON,
          // hidden$ 是一個 Observable，動態決定何時應該隱藏按鈕。
          // 這裡，如果目前聚焦的文件不是試算表（例如切換到文件），我們就隱藏該按鈕。
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

        // 4. 將選單項目加入功能區選單結構
        // RibbonStartGroup.OTHERS 通常放置在工具列的最右側。
        this.menuManagerService.mergeMenu({
          [RibbonStartGroup.OTHERS]: {
            [buttonId]: {
              order: 11, // 顯示順序：放置在順序為 10 的匯入 CSV 之後
              menuItemFactory
            }
          }
        });

        // 5. 最後，向指令服務註冊指令，這樣我們的按鈕就能觸發它
        this.commandService.registerCommand(command);
      }
    }

    // 確保 Univer DI 容器在 JS 中解析這些依賴
    // 第一個元素是空的 (,)，因為索引 0 是未被注入的 _config 參數
    setDependencies(
      ExportCSVButtonPlugin,
      [
        [Injector],
        [IMenuManagerService],
        [ICommandService],
        [ComponentManager]
      ],
      1
    ); // <--- 加入 1，讓依賴注入從 constructor 的第 1 個參數開始，完美跳過第 0 個的 _config

    resolve(ExportCSVButtonPlugin);
  });
}

export default createdExportCSVButtonPlugin;
