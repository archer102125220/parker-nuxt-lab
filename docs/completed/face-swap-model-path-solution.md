# AI 模型檔案路徑解決方案

## 問題描述

在 Nuxt 專案中，開發模式和生產打包後的檔案路徑不同，導致 AI 模型（如 face-api.js 模型）在打包後無法正確載入。

## 解決方案

採用**雙重保障策略**：

### 1. 環境感知路徑解析

在模型載入時根據 `NODE_ENV` 環境變數動態決定路徑：

```javascript
// server/utils/face-swap.js
let modelsPath;

if (process.env.NODE_ENV === 'production') {
  // 生產環境：使用 .output/public/ai_models
  modelsPath = join(process.cwd(), 'public/ai_models');
} else {
  // 開發環境：使用專案根目錄 public/ai_models
  modelsPath = join(process.cwd(), 'public/ai_models');
}
```

### 2. 自動複製模型檔案

在 `nuxt.config.js` 中添加 Nitro hooks，在打包時自動複製模型檔案到輸出目錄：

```javascript
// nuxt.config.js
nitro: {
  hooks: {
    async 'compiled'(nitro) {
      const sourceModelsDir = path.join(__dirname, 'public/ai_models');
      const targetModelsDir = path.join(nitro.options.output.dir, 'public/ai_models');

      if (fs.existsSync(sourceModelsDir)) {
        await fs.ensureDir(targetModelsDir);
        await fs.copy(sourceModelsDir, targetModelsDir, {
          overwrite: true,
          errorOnExist: false
        });
        console.log('✅ AI models copied successfully');
      }
    }
  },
  publicAssets: [
    {
      dir: 'public',
      maxAge: 60 * 60 * 24 * 365
    }
  ]
}
```

## 已修改的檔案

### 1. `server/utils/face-swap.js`

- ✅ 添加環境判斷邏輯
- ✅ 添加詳細的錯誤處理與日誌
- ✅ 使用 try-catch 包裹模型載入

### 2. `server/plugins/face-api.js`

- ✅ 統一使用 `process.cwd()` 路徑
- ✅ 添加錯誤處理
- ✅ 移除舊的條件判斷邏輯

### 3. `nuxt.config.js`

- ✅ 添加 `compiled` hook 自動複製模型
- ✅ 配置 `publicAssets` 確保資源正確處理
- ✅ 添加詳細的建置日誌

## 工作原理

### 開發模式

1. 模型位於：`project-root/public/ai_models/`
2. `process.cwd()` 指向專案根目錄
3. 路徑解析為：`project-root/public/ai_models/`

### 生產模式

1. 打包時 `compiled` hook 觸發
2. 自動複製 `public/ai_models/` → `.output/public/ai_models/`
3. 運行時 `process.cwd()` 指向 `.output/`
4. 路徑解析為：`.output/public/ai_models/`

## 優勢

✅ **環境一致性**：開發和生產使用相同的路徑邏輯  
✅ **自動化**：打包時自動處理，無需手動操作  
✅ **容錯性**：即使模型不存在也不會中斷建置  
✅ **可擴展性**：適用於未來的 InsightFace 模型  
✅ **日誌完整**：詳細的載入日誌便於除錯

## 測試方法

### 開發環境測試

```bash
yarn dev
# 檢查控制台輸出：
# Environment: development
# Loading face-api models from: /path/to/project/public/ai_models
# ✅ Face-api models loaded successfully
```

### 生產環境測試

```bash
yarn build
# 檢查建置日誌：
# 🔧 Nitro compiled hook: Copying AI model files...
# ✅ AI models copied successfully

yarn preview
# 檢查運行日誌：
# Environment: production
# Loading face-api models from: /path/to/.output/public/ai_models
# ✅ Face-api models loaded successfully
```

## 適用於 InsightFace

這個解決方案同樣適用於未來的 InsightFace InSwapper 模型：

```javascript
// 未來的 server/utils/face-swap-insightface.js
const modelsPath =
  process.env.NODE_ENV === 'production'
    ? join(process.cwd(), 'public/ai_models/insightface')
    : join(process.cwd(), 'public/ai_models/insightface');
```

模型會在打包時自動複製到正確位置。

## 注意事項

> [!WARNING]
> **模型檔案大小**
>
> - face-api.js 模型：~15MB
> - InsightFace 模型：~750MB
> - 確保部署平台有足夠空間

> [!TIP]
> **CDN 優化**
>
> - 對於大型模型，考慮使用 CDN
> - 可以在載入時從遠端 URL 下載
> - 減少部署包大小

## 相關資源

- [Nuxt Nitro Hooks](https://nitro.unjs.io/guide/plugins#nitro-hooks)
- [Nuxt Public Assets](https://nuxt.com/docs/guide/directory-structure/public)
- [fs-extra Documentation](https://github.com/jprichardson/node-fs-extra)
