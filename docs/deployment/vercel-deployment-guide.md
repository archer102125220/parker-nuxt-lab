# Vercel 部署配置說明

## 問題

部署到 Vercel 時出現錯誤：

```
Error: No Output Directory named "dist" found after the Build completed.
```

## 原因

Nuxt 3 的輸出目錄是 `.output`，而不是 `dist`。Vercel 應該會自動檢測 Nuxt 專案，但有時需要手動配置。

## 解決方案

### 方法 1：在 Vercel Dashboard 配置（推薦）

1. 進入 Vercel 專案設定
2. 找到 **Build & Development Settings**
3. 配置如下：
   - **Framework Preset**: `Nuxt.js`
   - **Build Command**: `yarn build` 或 `npm run build`
   - **Output Directory**: 留空（Vercel 會自動使用 `.output`）
   - **Install Command**: `yarn install` 或 `npm install`

### 方法 2：使用 vercel.json（備用）

如果方法 1 不行，創建 `vercel.json`：

```json
{
  "buildCommand": "yarn build",
  "outputDirectory": ".output/public"
}
```

## 注意事項

### 1. 模型檔案大小限制

> [!WARNING]
> Vercel 有檔案大小限制：
>
> - **Free Plan**: 100MB 部署大小限制
> - **Pro Plan**: 更大的限制
>
> face-api.js 模型約 15MB，可以部署
> InsightFace 模型約 750MB，**無法部署到 Vercel**

### 2. 建議的部署策略

**對於 face-api.js（當前實作）**：

- ✅ 可以部署到 Vercel
- ✅ 模型檔案會自動複製（已配置 Nitro hooks）

**對於 InsightFace（未來優化）**：

- ❌ 模型太大，無法部署到 Vercel
- ✅ 建議使用：
  - Railway
  - Render
  - DigitalOcean App Platform
  - 自架 VPS

### 3. 環境變數

確保在 Vercel 設定中添加必要的環境變數（如果有）。

### 4. 函數執行時間

Vercel 有執行時間限制：

- **Free**: 10 秒
- **Pro**: 60 秒

face-api.js 處理通常在 10 秒內完成，但 InsightFace 可能需要更長時間。

## 驗證部署

部署成功後，檢查：

1. **模型載入日誌**：

   ```
   Environment: production
   Loading face-api models from: /var/task/public/models
   ✅ Face-api models loaded successfully
   ```

2. **API 端點**：
   - 訪問 `https://your-app.vercel.app/api/face-swap/process`
   - 應該返回錯誤（因為沒有圖片），但不應該是 404

3. **功能測試**：
   - 訪問 `/face-swap/backend`
   - 上傳圖片測試換臉功能

## 常見問題

### Q: 部署後模型載入失敗？

A: 檢查 Nitro hooks 是否正確執行，查看建置日誌中的：

```
🔧 Nitro compiled hook: Copying AI model files...
✅ AI models copied successfully
```

### Q: 函數超時？

A: 考慮：

- 升級到 Pro Plan（60秒限制）
- 優化圖片大小
- 使用其他平台

### Q: 部署包太大？

A:

- 檢查 `.vercelignore` 排除不必要的檔案
- 確保 `node_modules` 正確處理
- 考慮使用 CDN 託管模型

## 替代部署平台

如果 Vercel 不適合（特別是 InsightFace）：

| 平台             | 優點                   | 缺點         |
| ---------------- | ---------------------- | ------------ |
| **Railway**      | 容器化部署，無檔案限制 | 付費         |
| **Render**       | 免費層級較寬鬆         | 冷啟動較慢   |
| **DigitalOcean** | 完全控制，可用 GPU     | 需要自行配置 |
| **Fly.io**       | 邊緣部署，快速         | 學習曲線     |

## 參考資源

- [Nuxt on Vercel](https://vercel.com/docs/frameworks/nuxt)
- [Vercel Build Configuration](https://vercel.com/docs/build-step)
- [Vercel Limits](https://vercel.com/docs/limits)
