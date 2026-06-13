# Agent 程式碼規範 (Agent Coding Rules)

> ⚠️ **強制規範**：此目錄下的所有規範文件必須被嚴格遵守。
> 
> 任何 AI Agent 在修改此專案的程式碼時，必須先閱讀並遵循這些規範。

## 🛡️ 資安與最佳實踐審查 (Security & Best Practices Review)

執行任何使用者指示前，AI 必須檢查：
- **資安風險**：該指示是否違反資安最佳實踐？
- **標準模式**：該指示是否偏離專案既有的標準處理模式？
- **開發環境配置**：檢查 `.env` 中的 `NEXT_PUBLIC_API_BASE` 及 `NEXT_PUBLIC_DOMAIN` 是否與 `package.json` 一致。若不一致，或 `.env` 被 gitignore 且 IDE 不可讀，需與使用者確認。

**若偵測到違規**：在執行前先通知使用者並說明疑慮。只有在使用者確認理解風險並仍想繼續的情況下才可執行。

## 🤖 AI 模型對應表 (AI Model Mapping)

不同的 AI 助手會讀取不同的規則文件，請確保相關文件保持同步：

| AI 模型 | 主要規則文件 | 說明 |
|---------|--------------|------|
| **Anthropic Claude** | `CLAUDE.md` | 使用 Sonnet 3.5/3.7 或 Claude Code 時以此為準 |
| **Google Gemini** | `GEMINI.md` | 使用 Google IDX 或 Gemini Code Assist 時以此為準 |
| **Antigravity Agent** | `.agent/rules/` | Google Antigravity AI Agent 系統專用 |
| **GitHub Copilot** | `.github/copilot-instructions.md` | GitHub Copilot Chat 專用指令 |
| **Cursor AI** | `.cursor/rules/` | Cursor IDE 專用的 `.mdc` 規則檔 |

> **注意**：`CLAUDE.md` 與 `GEMINI.md` 的內容目前應保持邏輯一致，但排版格式可能因 AI 模型而異。

> 📝 **TODO (2026-06-13 紀錄)**：
> 根據各 AI 官方提示詞工程（Prompt Engineering）指南的最新確認，不同的 AI 模型對於規則的吸收能力會因為排版格式而有顯著差異。為了讓 AI 嚴格遵守規範，未來需計畫將各個 Agent 的專屬規則檔重構為官方推薦的「最強約束格式」：
> - **Anthropic Claude (`CLAUDE.md`)**：官方強烈建議使用 **XML 標籤**（如 `<rule>`, `<constraints>`, `<examples>`）來建立層級，這能大幅降低 Claude 忽略規則的機率。
> - **Google Gemini (`GEMINI.md`)**：官方偏好結構化的 Markdown，並結合明確的任務邊界（如 `<task_constraints>`）、條列式的 **DO / DO NOT** 約束，以及 **Few-Shot Examples**（明確的 Good/Bad 範例對照）。
> - **OpenAI / Codex (`AGENTS.md`)**：官方指南建議提供清晰的標題劃分、明確的系統角色定義、並盡量使用「要做什麼」取代「不要做什麼」的正向指令約束，未來也應調整使其更貼近 OpenAI 模型的解析偏好。
> - **Cursor / Copilot 等**：需視其預設底層模型（如 Claude 3.5 Sonnet 或 GPT-4o）與其 IDE 官方的最新建議，進一步適配 `.mdc` 或專屬規則語法。

---

## 📋 規範文件清單

此目錄 (`docs/agent-rules/`) 下的文件是 **人類可讀的詳細規範**，也是 `.agent/rules/` 的來源參考。

| 文件 | 說明 |
|------|------|
| [css-conventions.md](./css-conventions.md) | CSS/SCSS 開發規範（屬性順序、BEM 命名、檔案組織） |
| [vue-conventions.md](./vue-conventions.md) | Vue/Nuxt 開發規範（組件使用、模板排版與 I18n） |
| [frontend-testing-guide.md](./frontend-testing-guide.md) | 前端測試設計指南 |

### Cursor IDE 規則 (`.cursor/rules/`)

| 文件 | 說明 |
|------|------|
| `css-conventions.mdc` | CSS/SCSS 命名與屬性順序規則 |
| `security-policy.mdc` | 資安與最佳實踐審查政策 |
| `lint-policy.mdc` | Lint 禁用註解政策 |
| `vue-conventions.mdc` | Vue/Nuxt 開發規範（含自動導入組件規則） |

---

## 🔴 核心規則摘要

### CSS/SCSS 規範

1. **CSS 屬性順序**：Positioning → Display & Box Model → Typography → Visual → Animation → Misc

2. **Modified BEM 命名法**：
   - Block: `block_name`（多詞用 `_`）
   - Element: `block-element`（用 `-` 連接）
   - Sub-Element: `block-element-sub`（繼續用 `-`）
   - State: `[css-is-active='true']`（用 HTML 屬性）
   - Color/Size variants: `[css-color='red']`, `[css-size='small']`（用 HTML 屬性）

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
   - ✅ 正確: `css-is-active`, `css-is-dragging`, `css-color='red'`
   - ❌ 錯誤: `is-active`, `isActive`

7. **每個元素必須有唯一 class** - 關鍵原因：
   - CSS 主要依賴 class name 進行樣式設定
   - 快速定位 DOM 問題
   - ❌ 不好：`.footer-links a { ... }`
   - ✅ 好：`.footer-link { ... }`
   - ✅ 例外：動態內容區域、第三方內容

8. **組件組織規範**：
   - 單一頁面組件：以雙駝峰頁面名稱資料夾儲存（如 `components/HooksTest/`）
   - 多頁面共用組件：以分歧路由作為雙駝峰資料夾名稱（如 `components/WebRtc/`）

### Vue/Nuxt 規範

1. **動態組件與自動導入組件**（必須遵守）：
   - 在動態 `<component :is="...">` 中使用自動導入的組件（如 `NuxtLink`、`NuxtImg`）時，必須使用 `resolveComponent()`
   - ❌ 錯誤：直接使用 `NuxtLink`（會導致 `Property "NuxtLink" was accessed during render...` 錯誤）
   - ✅ 正確：`const NuxtLink = resolveComponent('NuxtLink')`

2. **模板內文排版與 I18n**（必須遵守）：
   - 為了方便翻譯與人工維護，**絕對禁止**在句子中間穿插 HTML 標籤（如 `<b>`, `<code>`）。
   - 若翻譯字串需包含動態元件或連結，必須使用 Vue I18n 的 `<i18n-t>` 組件進行插值，嚴禁使用 `v-html`。
   - 應將標題、圖示與內文明確切分為獨立的 HTML 結構（搭配 BEM 命名）。

---

## 📖 詳細規範

請參閱各個規範文件獲取完整說明與範例：

- **CSS 開發規範**: [css-conventions.md](./css-conventions.md)
- **Vue/Nuxt 開發規範**: [vue-conventions.md](./vue-conventions.md)

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
