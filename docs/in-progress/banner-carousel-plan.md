# Banner 輪播組件實施計劃

根據提供的圖片規格，建立一個符合專案規範的 Banner 輪播組件。

## 需求分析

根據圖片描述，Banner 組件需要滿足以下需求：

1. **容器總是高度固定**（不會因為 Banner 張數而影響）
2. **隨 Device 寬度變化**（不變形，此時高度會產生變化）
3. **Banner 最少有一張，二張以上時**：
   - 一張時：Default 在第一張
   - 三張以上時：Default 在第一張，三張以上時，左右各有 Banner
   - 二張以上時：Default 在第一張
4. **2 張以上時，Banner 需有自動滑動效果與可動滑動的功能**

## 技術規格

### 核心技術
- **框架**: Vue 3 Composition API (`<script setup>`)
- **語言**: 純 JavaScript（不使用 TypeScript）
- **樣式**: SCSS with scoped styles
- **CSS 規範**: 遵循專案 CSS 屬性順序標準

### CSS 屬性順序規範
```scss
.example {
  /* Positioning */
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;
  
  /* Display & Box Model */
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 1px solid #ccc;
  
  /* Typography */
  font-size: 16px;
  color: #333;
  text-align: center;
  
  /* Visual */
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  opacity: 1;
  
  /* Animation */
  transition: all 0.3s ease;
  transform: translateX(0);
  
  /* Misc */
  cursor: pointer;
}
```

## 組件設計

### 組件結構

#### [NEW] [Banner.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/Banner.vue)

主要的 Banner 輪播組件，包含以下功能：

**Props:**
- `banners`: Array - Banner 資料陣列
- `autoplay`: Boolean - 是否自動播放（預設 true，2 張以上時啟用）
- `interval`: Number - 自動播放間隔（毫秒，預設 3000）
- `height`: String/Number - 固定高度（預設 '300px'）
- `showIndicators`: Boolean - 是否顯示指示器（預設 true）
- `showNavigation`: Boolean - 是否顯示左右導航按鈕（預設 true）

**功能實作:**
1. **響應式高度管理**
   - 容器保持固定高度
   - 根據設備寬度調整內容顯示
   
2. **Banner 數量邏輯**
   ```javascript
   // 1 張：只顯示該張
   // 2 張：顯示第一張，啟用自動播放
   // 3 張以上：顯示第一張，左右各顯示部分 Banner（預覽效果）
   ```

3. **自動播放**
   - 僅在 2 張以上時啟用
   - 支援暫停/繼續
   - 滑鼠懸停時暫停

4. **手勢支援**
   - 觸控滑動
   - 滑鼠拖曳
   - 使用專案現有的 `$classifySwipeDirection` 工具

5. **過渡動畫**
   - 使用 CSS transform 實現平滑過渡
   - 支援自定義過渡時間

**Emits:**
- `change`: Banner 切換時觸發
- `update:modelValue`: 雙向綁定當前索引

**Slots:**
- `default`: 自定義 Banner 內容
- `indicator`: 自定義指示器
- `prev`: 自定義上一頁按鈕
- `next`: 自定義下一頁按鈕

---

### 示範頁面

#### [NEW] [banner-demo.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/pages/banner-demo.vue)

展示 Banner 組件的各種使用場景：

1. **單張 Banner**
2. **兩張 Banner**（自動播放）
3. **三張以上 Banner**（左右預覽效果）
4. **自定義內容 Banner**
5. **不同高度設定**

---

## 實施步驟

### 第一階段：核心功能開發

1. **建立基礎組件結構**
   - 建立 `Banner.vue` 檔案
   - 定義 props 和 emits
   - 建立基本模板結構

2. **實作響應式邏輯**
   - 實作固定高度容器
   - 實作設備寬度檢測
   - 實作 Banner 數量判斷邏輯

3. **實作輪播核心功能**
   - 實作當前索引管理
   - 實作切換邏輯
   - 實作循環播放

### 第二階段：互動功能

1. **實作自動播放**
   - 使用 `setInterval` 實現自動切換
   - 實作暫停/繼續邏輯
   - 實作滑鼠懸停暫停

2. **實作手勢支援**
   - 參考 `SwiperCustom.vue` 的實作
   - 整合 `$classifySwipeDirection`
   - 實作觸控和滑鼠事件處理

3. **實作導航控制**
   - 實作左右按鈕
   - 實作指示器點擊
   - 實作鍵盤導航（可選）

### 第三階段：樣式與動畫

1. **實作 CSS 樣式**
   - 遵循專案 CSS 屬性順序規範
   - 實作響應式佈局
   - 實作指示器和導航按鈕樣式

2. **實作過渡動畫**
   - 使用 CSS transform 和 transition
   - 實作平滑切換效果
   - 實作左右預覽效果（3 張以上時）

### 第四階段：測試與文檔

1. **建立示範頁面**
   - 建立 `banner-demo.vue`
   - 展示各種使用場景
   - 提供互動式範例

2. **測試**
   - 測試不同 Banner 數量
   - 測試響應式行為
   - 測試自動播放功能
   - 測試手勢操作

3. **文檔**
   - 撰寫組件使用說明
   - 建立 API 文檔
   - 建立 walkthrough

## 驗證計劃

### 自動化測試

```bash
# 執行組件測試
yarn test:unit Banner.spec.js

# 執行 E2E 測試
yarn test:e2e banner-demo.spec.js
```

### 手動驗證

1. **功能驗證**
   - [ ] 單張 Banner 正確顯示
   - [ ] 兩張 Banner 自動播放
   - [ ] 三張以上 Banner 左右預覽效果
   - [ ] 手勢滑動正常運作
   - [ ] 導航按鈕功能正常
   - [ ] 指示器點擊切換正常

2. **響應式驗證**
   - [ ] 桌面端顯示正常
   - [ ] 平板端顯示正常
   - [ ] 手機端顯示正常
   - [ ] 高度固定不變形

3. **效能驗證**
   - [ ] 動畫流暢無卡頓
   - [ ] 自動播放計時器正確清理
   - [ ] 無記憶體洩漏

## 參考資源

- 現有組件：[SwiperCustom.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/SwiperCustom.vue)
- 專案規範：[README.zh-TW.md](file:///Users/parker/Desktop/code/parker-nuxt-lab/README.zh-TW.md)
- CSS 規範：專案 CSS 屬性順序標準（Positioning → Display & Box Model → Typography → Visual → Animation → Misc）

## 時程規劃

- **第一階段**：2-3 小時（核心功能）
- **第二階段**：2-3 小時（互動功能）
- **第三階段**：1-2 小時（樣式與動畫）
- **第四階段**：1-2 小時（測試與文檔）
- **總計**：6-10 小時

## 風險與注意事項

1. **效能考量**
   - 大量 Banner 時可能影響效能
   - 建議限制最大 Banner 數量或使用虛擬滾動

2. **瀏覽器相容性**
   - 確保 CSS transform 在各瀏覽器正常運作
   - 測試觸控事件在不同設備的表現

3. **可訪問性**
   - 提供鍵盤導航支援
   - 提供適當的 ARIA 標籤
   - 確保自動播放可被暫停

## 後續優化

1. **效能優化**
   - 實作懶加載
   - 實作圖片預加載
   - 優化動畫效能

2. **功能擴展**
   - 支援垂直輪播
   - 支援多張同時顯示
   - 支援自定義過渡效果

3. **可訪問性增強**
   - 完整的鍵盤導航
   - 螢幕閱讀器支援
   - 減少動畫選項
