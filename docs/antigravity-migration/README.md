# Antigravity Migration Tools

此資料夾包含 Google Antigravity (AI Agent) 的狀態遷移工具與相關文件。

## 📁 檔案清單

| 檔案 | 說明 |
|------|------|
| `MIGRATION.md` | 英文遷移指南 |
| `MIGRATION.zh-TW.md` | 中文遷移指南 |
| `import_antigravity.sh` | macOS/Linux 匯入腳本 |
| `import_antigravity.ps1` | Windows PowerShell 匯入腳本 |
| `antigravity_export.zip` | Agent 記憶備份包 (**已被 gitignore，不會上傳**) |

## 📝 產生紀錄

- **產生日期**: 2026-01-05
- **產生模型**: Gemini 3 Pro (via Google Antigravity)
- **操作系統**: macOS

## 🔬 模型比較結論

> **結論**: 對於此類「程序性任務」，不同 AI 模型之間幾乎不會有差異。

### 原因分析

1. **任務性質確定性高**:
   - 識別系統資料夾 (`~/.gemini/antigravity/...`)
   - 執行標準 `zip` 指令打包
   - 撰寫 Shell/PowerShell 腳本解壓縮
   - 生成操作說明文件

2. **無創意或分析成分**: 這些步驟非常明確，任何有能力的模型都會產出相同的結果。

3. **可能存在的微小差異**:
   - 文件措辭與格式（emoji 使用、段落結構）
   - 變數命名風格（`tempDir` vs `TEMP_DIR`）
   - 額外的錯誤處理或註解

### 適合比較模型差異的任務類型

- ✅ 創意任務（UI 設計、文案撰寫）
- ✅ 分析任務（程式碼 review、架構分析）
- ✅ 複雜推理（重構建議、技術選型）

---

## ⚠️ 注意事項

- `antigravity_export.zip` 包含私密對話紀錄，**請勿上傳至公開儲存庫**。
- 此檔案已被加入 `.gitignore`，但仍建議透過私密管道傳輸（USB、加密雲端硬碟等）。
