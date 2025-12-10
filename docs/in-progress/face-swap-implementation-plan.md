# AI 人臉替換功能頁面實作計劃

將現有的 `face-swap.vue` 改為資料夾結構，提供導航頁面讓使用者選擇不同的人臉替換實作版本。

---

## Proposed Changes

### Phase 1: Folder Structure Conversion

#### [DELETE] [face-swap.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/pages/face-swap.vue)
將現有檔案移動至新資料夾結構

---

#### [NEW] [index.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/pages/face-swap/index.vue)
導航頁面，讓使用者選擇實作版本：

```vue
<template>
  <section class="face_swap_index_page">
    <h1>AI 人臉替換</h1>
    <p>選擇實作版本</p>
    
    <div class="face_swap_index_page-cards">
      <!-- 前端版本 -->
      <v-card to="/face-swap/frontend">
        <v-card-title>純前端版本</v-card-title>
        <v-card-text>
          使用 face-api.js + Canvas 實現
          適合快速測試，效果較基礎
        </v-card-text>
      </v-card>
      
      <!-- 後端版本 -->
      <v-card to="/face-swap/backend">
        <v-card-title>後端 AI 版本</v-card-title>
        <v-card-text>
          使用 Node.js 後端 + AI 模型
          效果更精緻（開發中）
        </v-card-text>
      </v-card>
    </div>
  </section>
</template>
```

---

#### [NEW] [frontend.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/pages/face-swap/frontend.vue)
純前端人臉替換實作（移動現有 `face-swap.vue` 內容並增強）

**新增功能：**
- 來源臉部圖片上傳區
- 替換結果預覽 Canvas
- 執行替換 / 重置 / 下載按鈕
- 保留現有人臉偵測展示（可折疊）

---

#### [NEW] [backend.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/pages/face-swap/backend.vue)
後端版本佔位頁面

```vue
<template>
  <section class="face_swap_backend_page">
    <h1>後端 AI 人臉替換</h1>
    <v-alert type="info">
      此功能開發中，敬請期待！
    </v-alert>
    <v-btn to="/face-swap">返回</v-btn>
  </section>
</template>
```

---

### Phase 2: Frontend Version Enhancement

在 `frontend.vue` 中實作核心人臉替換邏輯：

1. **`performFaceSwap()`** - 主要替換流程
2. **`extractFaceFromImage()`** - 提取臉部區域
3. **`calculateFaceTransform()`** - 計算變換參數
4. **`blendFaces()`** - Canvas 疊加混合

---

### Phase 3: Backend Version (Future)

> [!NOTE]
> 此階段為未來規劃，目前僅建立佔位頁面

預計使用技術：
- Node.js 後端 API
- InsightFace / DeepFaceLab 等 AI 模型
- 伺服器端 GPU 加速處理

---

## Verification Plan

### Manual Testing

1. 瀏覽至 `/face-swap` 確認導航頁面正常
2. 點擊進入 `/face-swap/frontend` 測試前端版本
3. 點擊進入 `/face-swap/backend` 確認佔位頁面
4. 測試返回導航功能
