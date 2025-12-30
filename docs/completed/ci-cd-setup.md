# CI/CD 流水線設置與測試重構專案

**狀態：** 100% 完成
**完成時間：** 2025-12-30

## 專案概述

本專案旨在建立一個穩健的 CI/CD 流水線，以自動化代碼品質檢查、單元測試、整合測試和端對端 (E2E) 測試。同時，我們也對現有的測試代碼進行了重構，以提高穩定性和可維護性。

## 這份文檔包含什麼？

1.  **CI/CD 架構說明**：詳細介紹 GitHub Actions 工作流程的各個階段。
2.  **秘密管理 (Secrets Management)**：說明如何安全地配置生產環境憑證。
3.  **E2E 測試設定**：解釋 Playwright 測試與矩陣策略。
4.  **遇到的問題與解決方案**：記錄開發過程中遇到的關鍵挑戰及其解決方法。

---

## 🚀 1. CI/CD 架構 (GitHub Actions)

我們使用 GitHub Actions 建立自動化工作流程，設定檔位於 `.github/workflows/ci.yml`。

該流水線包含以下四個主要 Job：

### 1.1 Lint Check (`lint`)
- **目的**：確保代碼風格一致且無語法錯誤。
- **工具**：ESLint (配合 Flat Config)
- **命令**：`yarn eslint .`

### 1.2 Unit Tests (`test-unit`)
- **目的**：驗證個別組件和函數的邏輯正確性。
- **工具**：Vitest
- **命令**：`yarn test:unit`

### 1.3 Integration Tests (`test-integration`)
- **目的**：驗證多個組件或模組之間的協同工作。
- **工具**：Vitest
- **命令**：`yarn test:integration`

### 1.4 E2E Tests (`test-e2e`)
- **目的**：模擬真實用戶操作，驗證整個應用程式的流程。
- **工具**：Playwright
- **策略**：使用 Matrix Strategy 並行在 Chromium, Firefox, WebKit 三種瀏覽器上執行。
- **流程**：
    1.  安裝依賴與瀏覽器。
    2.  **建置應用 (Build Application)**：執行 `yarn build --dotenv .env.e2e`。
    3.  **執行測試**：Playwright 會自動啟動 Web Server (`yarn start`) 並執行測試。

---

## 🔒 2. 秘密管理 (Secrets Management)

為了安全考量，我們不在版本控制中追蹤真實的憑證。所有的敏感資訊（如資料庫連線字串、Firebase 金鑰）都儲存在 GitHub Repository 的 Secrets 中。

### 需要配置的 Secrets

請在 GitHub 專案的 **Settings > Secrets and variables > Actions** 中設定以下變數：

| Secret 名稱 | 說明 |
| :--- | :--- |
| `DB_CONNECTION` | 資料庫連線類型 (如 postgres) |
| `POSTGRES_DATABASE` | 資料庫名稱 |
| `POSTGRES_USER` | 資料庫使用者名稱 |
| `POSTGRES_PASSWORD` | 資料庫密碼 |
| `POSTGRES_HOST` | 資料庫主機地址 |
| `POSTGRES_URL` | 完整的 PostgreSQL 連線字串 |
| `VITE_FIREBASE_CREDENTIAL` | Firebase 服務帳戶 JSON 字串 |
| `VITE_FIREBASE_API_KEY` | Firebase API Key |
| `VITE_APP_ID` | Firebase App ID |
| ...其他變數 | 詳見 `.env.example` |

這些 Secrets 會在 CI 執行時透過環境變數注入到 Runner 中。

---

## 🧪 3. E2E 測試與環境設定

### 環境變數檔案 (`.env.e2e`)

為了確保 E2E 測試環境的一致性，我們建立了一個專門的 `.env.e2e` 檔案。
此檔案中的敏感資訊已留空（安全起見），CI 流程會使用上述的 GitHub Secrets 來填充這些值。

### Web Server 設定

在 `playwright.config.js` 中，我們啟用了 `webServer` 設定：

```javascript
webServer: {
  command: 'yarn start',
  url: 'http://localhost:3001', // 使用測試環境 Port 3001
  reuseExistingServer: !process.env.CI,
  timeout: 120 * 1000,
},
```

這確保了測試執行前，應用程式已經在本地啟動並準備好接受請求。

---

## 🛠 4. 遇到的問題與解決方案

### 問題 1：CI 流程卡住 (Hang)
- **原因**：原本將 CI 中的建置步驟設為 `yarn pretest`，該命令包含 `yarn start`。由於 `yarn start` 會啟動伺服器並持續監聽，導致 CI 步驟永遠無法結束。
- **解決**：將 CI 步驟改為 `yarn build --dotenv .env.e2e`，只執行建置，不啟動伺服器。啟動伺服器的工作交由 Playwright 的 `webServer` 自動管理。

### 問題 2：Sequelize "Dialect needs to be explicitly supplied" 錯誤
- **原因**：在執行 `yarn build` (Prerendering 階段) 時，由於 `.env.e2e` 中的資料庫設定為空，Sequelize 初始化失敗。
- **解決**：在 `.env.e2e` 中填入正確的環境變數（在本地開發時），並在 GitHub CI 中透過 Secrets 注入這些變數。

### 問題 3：Playwright "Connection refused" 錯誤
- **原因**：Playwright 嘗試連線到 HTTP 3000，但在開發環境 (`yarn dev-https`) 我們是跑在 HTTPS 3000。
- **解決**：
    1.  修改 `.env.e2e` 將 `VITE_API_BASE` 和 `VITE_DOMAIN` 指向 `http://localhost:3001` (生產模式 Port)。
    2.  確保測試前執行 `yarn build` 和 `yarn start`，讓應用程式跑在 HTTP 3001 上。

---

## ✅ 結論

通過這次重構與設定，我們：
1.  **確保了代碼品質**：每次 Push 都會自動檢查 ESLint 錯誤。
2.  **增強了信心**：自動化 Unit 和 E2E 測試確保新功能不會破壞現有功能。
3.  **提升了安全性**：將敏感憑證移至 GitHub Secrets 管理。
