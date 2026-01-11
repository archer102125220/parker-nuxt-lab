# Antigravity 遷移指南 (Migration Guide)

> **注意**：這份文件與相關工具是由 **Gemini 3 Pro** 生成的。

本指南說明如何將此專案及其 AI Agent (Antigravity) 的狀態遷移到另一台電腦上。

## 📦 匯出檔案包含什麼？

`antigravity_export.zip` 檔案包含了：

1.  **專案規則**：`.agent/`, `GEMINI.md`, `CLAUDE.md`, `.cursor/rules`（程式碼規範與資安政策）。
2.  **Agent 記憶**：`.gemini/antigravity/brain`（包含任務歷史、實作計畫、Artifacts）。
3.  **對話紀錄**：`.gemini/antigravity/conversations`（過去的對話歷史）。

## 🚀 如何在透過新電腦匯入

### 步驟 1：Clone 專案
在您的新電腦上，像平常一樣 Clone 此專案的儲存庫：

```bash
git clone <your-repo-url>
cd parker-nuxt-lab
```

### 步驟 2：傳輸匯出檔案
將 `antigravity_export.zip` 檔案（即您剛剛產生的檔案）複製到新電腦的專案根目錄下。

### 步驟 3：執行匯入腳本

我們提供了自動化腳本，可以自動驗證並將 Agent 的記憶檔案放置到正確的系統位置。

#### macOS / Linux
在終端機執行：
```bash
chmod +x import_antigravity.sh
./import_antigravity.sh
```

#### Windows
使用 PowerShell 執行：
```powershell
.\import_antigravity.ps1
```
*注意：如果不允許執行腳本，可能需要先執行 `Set-ExecutionPolicy Unrestricted -Scope Process`。*

**此腳本會執行以下動作：**
- 解壓縮匯出檔。
- 自動識別 Agent 狀態資料夾（無論原電腦的使用者名稱為何）。
- 將其合併至您當前使用者的 `~/.gemini` (macOS/Linux) 或 `%USERPROFILE%\.gemini` (Windows) 目錄中。

### 步驟 4：驗證
在專案中啟動 Agent。它現在應該能夠存取過去的任務歷史與相關程式碼規則。

---

## ⚠️ 注意事項

- **覆蓋風險**：匯入腳本會進行檔案合併。如果您在新電腦上已經有針對*此特定專案*的 Antigravity 數據，它可能會被覆蓋。
- **專案檔案**：此腳本僅專注於恢復 `~/.gemini` 中的 Agent 腦袋。它假設您已經透過 git 取得專案程式碼檔案（如 `README.md` 等）。如果您有尚未提交（Uncommitted）的程式碼變更，您可能需要手動複製這些專案檔案。
