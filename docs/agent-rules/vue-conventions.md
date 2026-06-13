# Vue / Nuxt 開發規範 (Vue / Nuxt Development Standards)

> 所有 Vue / Nuxt 相關的組件、模板與指令必須嚴格遵守以下規範。

## 1. 動態組件與自動導入組件 (Dynamic Components with Auto-Imported Components)

當在動態 `<component :is="...">` 中使用自動導入的組件（如 `NuxtLink`、`NuxtImg` 等）時，必須使用 `resolveComponent()` 進行正確參照。

這是因為自動導入的組件在 `<script setup>` 中預設不是運行時可用的變數。若不使用 `resolveComponent()`，將會遇到以下警告：
`[Vue warn]: Property "NuxtLink" was accessed during render but is not defined on instance.`

**常見需要處理的自動導入組件：**
- `NuxtLink`
- `NuxtImg`, `NuxtPicture`
- `ClientOnly`
- 任何位於 `components/` 目錄下的自動導入組件

### 範例
**❌ 錯誤用法**
```vue
<script setup>
// 錯誤：NuxtLink 不是運行時可用的變數
</script>

<template>
  <component :is="disabled ? 'div' : NuxtLink" :to="to">
    Content
  </component>
</template>
```

**✅ 正確用法**
```vue
<script setup>
import { resolveComponent } from 'vue';

const NuxtLink = resolveComponent('NuxtLink');
</script>

<template>
  <component :is="disabled ? 'div' : NuxtLink" :to="to">
    Content
  </component>
</template>
```

---

## 2. 模板內文排版與 I18n (Template Text Formatting & I18n)

為了方便日後的人工維護、多語系翻譯（I18n）以及嚴格遵守 **Vue I18n 官方最佳實踐**，**絕對禁止在純文字句子中間穿插 HTML 標籤**。

### 核心原則
1. **句子中不包含行內標籤**：避免在連續的文字段落中間放入 `<b>`、`<code>` 或 `<span>` 等標籤。這會阻礙多語系翻譯的句型結構，並造成人工編輯困難。
2. **明確切分結構**：如果文字區塊帶有標題、標籤或圖示，必須明確將它們拆分為獨立的 HTML 結構（例如搭配 BEM 命名如 `-title`, `-desc`, `-icon`）。
3. **組件插值 (Component Interpolation)**：如果翻譯字串的中間**必須**包含動態元件或超連結（如 `<a href="...">`），請務必使用 Vue I18n 提供的 `<i18n-t>` 組件進行插值。**絕對禁止**使用 `v-html` 來渲染包含 HTML 的翻譯字串，這會導致 XSS 資訊安全漏洞。

### 範例

**❌ 錯誤寫法（在句子中穿插 HTML）**
```vue
<li class="item">
  ⚠️
  <b class="item-bold">注意：</b>
  請記得設定 <code class="item-code">config.ts</code> 檔案。
</li>
```

**✅ 正確寫法（明確切分結構）**
```vue
<li class="item">
  <div class="item-title">
    <span class="item-title-icon">⚠️</span>
    <span class="item-title-text">注意：</span>
  </div>
  <span class="item-desc">請記得設定 config.ts 檔案。</span>
</li>
```

**✅ 正確寫法（I18n 組件插值）**
```vue
<!-- 翻譯檔： "guide": "For a guide, {link} check out the documentation." -->
<i18n-t keypath="guide" tag="p">
  <template #link>
    <a href="/docs">link</a>
  </template>
</i18n-t>
```
