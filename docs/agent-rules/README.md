# Agent 程式碼規範 (Agent Coding Rules)

> ⚠️ **強制規範**：此目錄下的所有規範文件必須被嚴格遵守。
> 
> 任何 AI Agent 在修改此專案的程式碼時，必須先閱讀並遵循這些規範。

## 📋 規範文件清單

| 文件 | 說明 |
|------|------|
| [css-conventions.md](./css-conventions.md) | CSS/SCSS 開發規範（屬性順序、BEM 命名、檔案組織） |

---

## 🔴 核心規則摘要

### CSS/SCSS 規範

1. **CSS 屬性順序**：Positioning → Display & Box Model → Typography → Visual → Animation → Misc

2. **Modified BEM 命名法**：
   - Block: `block_name`（多詞用 `_`）
   - Element: `block-element`（用 `-` 連接）
   - Sub-Element: `block-element-sub`（繼續用 `-`）
   - State: `[css-is-active='true']`（用 HTML 屬性）

3. **根元素命名**：
   - 頁面: `.page_name_page`
   - 組件: `.component_name`

4. **禁止**：
   - ❌ 多個頁面共用 CSS 類別名稱
   - ❌ 使用非 `css-` 開頭的狀態屬性
   - ❌ CSS 變數使用 `-` 連接（應使用 `_`）
   - ❌ 靜態內聯樣式

5. **CSS 變數**：
   - ✅ 正確: `--color_primary`, `--font_size_base`
   - ❌ 錯誤: `--color-primary`, `--font-size-base`

6. **HTML 狀態屬性**：
   - ✅ 正確: `css-is-active`, `css-is-dragging`
   - ❌ 錯誤: `is-active`, `isActive`

---

## 📖 詳細規範

請參閱各個規範文件獲取完整說明與範例：

- **CSS 開發規範**: [css-conventions.md](./css-conventions.md)

---

## 🛠️ 使用方式

### 對於 AI Agent

在處理此專案的任何程式碼修改任務之前，請：

1. 閱讀此 README 了解核心規則
2. 根據任務類型，閱讀對應的詳細規範文件
3. 確保所有修改都遵循規範
4. 如有疑問，遵循「寧可嚴格」的原則

### 快速參考

```scss
// ✅ 正確的 SCSS 寫法
.my_component {
  // Positioning
  position: relative;
  z-index: 1;
  
  // Display & Box Model
  display: flex;
  width: 100%;
  padding: 16px;
  
  // Typography
  font-size: 14px;
  color: var(--text_color);
  
  // Visual
  background-color: var(--bg_color);
  
  // Animation
  transition: opacity 0.3s;
  
  &-header {
    /* element styles */
  }
  
  &-content {
    &-item {
      /* sub-element styles */
    }
  }
  
  &[css-is-active='true'] {
    opacity: 1;
  }
}
```

```vue
<!-- ✅ 正確的 HTML 寫法 -->
<template>
  <div class="my_component" 
       :css-is-active="isActive"
       :style="{ '--offset_y': `${offset}px` }">
    <div class="my_component-header">Header</div>
    <div class="my_component-content">
      <div class="my_component-content-item">Item</div>
    </div>
  </div>
</template>
```

---

## 📝 更新日誌

- **2024-12-24**: 初始版本，從 README.md 提取 CSS 開發規範
