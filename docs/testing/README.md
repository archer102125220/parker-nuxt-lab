# 測試文件說明

本目錄包含測試套件的規劃和進度文件。

## 文件說明

### [TASK_CHECKLIST.md](./TASK_CHECKLIST.md)
測試任務清單，包含：
- 各階段的測試任務
- 完成狀態追蹤
- 當前測試統計

### [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)
測試實作計劃，包含：
- 測試策略
- 技術選型
- 詳細實作步驟

### [PROGRESS_REPORT.md](./PROGRESS_REPORT.md)
測試進度報告，包含：
- 已完成的測試
- 測試覆蓋率統計
- 下一步建議

## 當前進度

**測試統計：**
- 總測試數：132 個
- 通過率：100%
- 整體覆蓋率：70.3%

**已完成：**
- ✅ 測試環境設定
- ✅ 工具函數單元測試（102 tests）
- ✅ Selector 組件測試（30 tests）

**進行中：**
- 🔄 Vue 組件單元測試

**待完成：**
- ⏳ 整合測試
- ⏳ E2E 測試增強

## 執行測試

```bash
# 執行所有單元測試
yarn test:unit

# 監聽模式
yarn test:unit:watch

# 產生覆蓋率報告
yarn test:unit:coverage

# 執行 E2E 測試
yarn test:e2e
```

## 查看覆蓋率報告

```bash
open coverage/index.html
```
