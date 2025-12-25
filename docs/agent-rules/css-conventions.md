# CSS 開發規範 (CSS Development Standards)

> 所有 CSS/SCSS 代碼必須嚴格遵守以下規範。

## CSS 屬性順序規範

CSS 屬性必須按照以下順序排列：

1. **Positioning** - `position`, `top`, `right`, `bottom`, `left`, `z-index`
2. **Display & Box Model** - `display`, `flex`, `grid`, `width`, `height`, `margin`, `padding`, `border`
3. **Typography** - `font`, `font-size`, `font-weight`, `color`, `text-align`, `line-height`
4. **Visual** - `background`, `background-color`, `box-shadow`, `opacity`, `visibility`
5. **Animation** - `transition`, `animation`, `transform`
6. **Misc** - `cursor`, `content`, `overflow`, `pointer-events`

### 範例

```scss
.example {
  // Positioning
  position: relative;
  top: 0;
  z-index: 10;

  // Display & Box Model
  display: flex;
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;

  // Typography
  font-size: 16px;
  color: #333;

  // Visual
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  // Animation
  transition: all 0.3s;

  // Misc
  cursor: pointer;
}
```

> 💡 在實際開發中不需要加註解，僅在複雜樣式時使用註解提高可讀性。

---

## CSS 命名規範 (Modified BEM)

專案採用**改良式 BEM 命名法**，以提高雙擊選取效率。

### 命名結構

| 類型 | 格式 | 範例 |
|------|------|------|
| **Block** | 單一名稱，多詞用 `_` | `.countdown`, `.image_upload` |
| **Element** | 用 `-` 連接 Block | `.countdown-timer`, `.image_upload-preview` |
| **Sub-Element** | 繼續用 `-` 連接 | `.image_upload-preview-img` |
| **State** | 用 HTML 屬性 | `[css-is-active='true']` |
| **Color/Size** | 用 HTML 屬性 | `[css-color='red']`, `[css-size='small']` |

### HTML 屬性使用規範

**何時使用 HTML 屬性**：
1. **狀態**: `[css-is-active='true']`, `[css-is-disabled='true']`
2. **顏色變體**: `[css-color='red']`, `[css-color='blue']`
3. **大小變體**: `[css-size='small']`, `[css-size='large']`

**何時使用獨立 class**：
當 class name 本身具有**明確語義**時（不只描述外觀）：
```scss
// ✅ 語義化的 class name
.alert {
  &-success { }  // 成功提示（語義明確）
  &-error { }    // 錯誤提示（語義明確）
}
```

### 根元素命名

- **頁面根元素**: `[頁面名稱]_page`
  - 範例: `.hooks_test_page`, `.socket_io_page`, `.web_rtc_page`
- **組件根元素**: `[組件名]`
  - 範例: `.scroll_fetch`, `.image_upload`, `.countdown`

### SCSS 巢狀寫法

```scss
// ✅ 正確：所有元素都嵌套在根類別下
.hooks_test_page {
  &-description { }      // .hooks_test_page-description
  &-grid { }             // .hooks_test_page-grid
  &-section {            // .hooks_test_page-section
    &-title { }          // .hooks_test_page-section-title
    &-description { }    // .hooks_test_page-section-description
  }
}

// ❌ 錯誤：無法判斷歸屬
.hooks_test_page { }
.description { }
.grid { }
```

### 關鍵原則

1. **每個元素只使用一個 className** - 禁止組合多個類別
2. **每個元素必須有唯一的 className** - 這對於以下兩個關鍵原因至關重要：
   - **CSS 主要依賴 class name 進行樣式設定**（而非標籤選擇器）
   - **快速定位 DOM 問題** - 在瀏覽器 DevTools 中立即識別哪個元素有問題
   - ❌ 不好：`.footer-links a { ... }`（針對標籤）
   - ✅ 好：`.footer-link { ... }`（唯一 class）
   - ✅ 例外：動態內容區域（如：`.content p { ... }`）
   - ✅ 例外：第三方內容（如：WangEditor）
3. **Block 內的所有元素都必須是 Block 的子元素** - 使用 `-` 連接
4. **Element 名稱內部的多個語義詞使用 `_`** - 如 `content_box`, `value_display`
5. **狀態使用 HTML 屬性** - 如 `[css-is-active='true']`, `[data-pressed='true']`
6. **CSS 相關的 HTML 屬性必須以 `css-` 開頭** - 如 `css-is-active`, `css-is-dragging`
7. **CSS 變數名稱必須使用 `_` 而非 `-`** - 如 `--color_primary`, `--font_size_base`

---

## 內聯樣式規範

### ✅ 允許的內聯樣式

1. **CSS 變數傳遞**（包含動態計算值）
   ```vue
   <div :style="{ '--editor_height': `${height}px` }">
   <div :style="{ '--offset_y': `${offsetY}px` }">
   ```

2. **第三方庫要求**
   ```vue
   <noscript :style="{ display: 'none', visibility: 'hidden' }">
   ```

### ❌ 禁止的內聯樣式

- 靜態樣式值（應使用 CSS 類別）
- 動態計算值（應使用 CSS 變數傳遞）
- 可預測的條件樣式（應使用 CSS 屬性選擇器）
- 重複的樣式模式（應提取為 placeholders 或 mixins）

---

## CSS 檔案組織規範

### 目錄結構

```
app/
├── assets/
│   └── styles/           # 全域樣式工具（集中管理）
│       ├── global.scss   # 全域樣式
│       ├── mixin.scss    # Mixins（可重用的樣式函數）
│       ├── variable.scss # 變數定義
│       └── animation.scss # 動畫工具
│
├── components/            # 組件特定樣式（就近放置）
│   └── Button.vue
│       └── <style scoped>
│
└── pages/                 # 頁面特定樣式（就近放置）
    └── index.vue
        └── <style scoped>
```

### 樣式放置原則

1. **全域工具** → `app/assets/styles/` 目錄
   - Mixins (`@mixin`)
   - 變數定義
   - 全域樣式
   - 動畫工具

2. **組件樣式** → 組件檔案內
   - 使用 `<style lang="scss">` 撰寫（使用 BEM 命名時不需要 `scoped`）
   - 僅在覆蓋套件組件時使用 `<style scoped lang="scss">` 搭配 `:deep()`

3. **頁面樣式** → `pages/` 目錄內
   - 使用 `<style scoped lang="scss">`
   - **每個頁面必須有獨立的根類別名稱**

### 重要規則

> ⚠️ **禁止在多個頁面間共用相同的 CSS 類別名稱**
> 
> 如果多個頁面有相似的 DOM 結構，請在 `components/` 中建立可重用組件。

### 組件組織規範

為了提高代碼的可維護性和可讀性，專案採用以下組件組織規範：

**單一頁面重複使用的組件**：
- 以雙駝峰頁面名稱的資料夾統一儲存
- 範例：`components/HooksTest/` 僅供 hooks-test 頁面使用

**兩個以上頁面使用的組件**：
- 依照共用頁面的分歧路由為基準，以該路由作為雙駝峰資料夾名稱
- 範例：`components/WebRtc/` 供 web-rtc 相關頁面共用

```
components/
├── HooksTest/          # 僅 hooks-test 頁面使用的組件
├── SocketTest/         # 僅 socket-test 頁面使用的組件
├── WebRtc/            # web-rtc 相關頁面共用的組件（分歧路由）
└── ScrollFetch/       # 通用組件（多個不相關頁面使用）
```

---

## Placeholders vs Mixins

### 使用 Placeholders (`%name`) 的時機

- 多個選擇器需要完全相同的樣式
- 樣式不需要參數（靜態樣式）
- 想要減少 CSS 輸出大小（選擇器會被合併）

```scss
%data_block {
  padding: 40px;
  text-align: center;
  border-radius: 8px;
}

.loading {
  @extend %data_block;
  background-color: #e3f2fd;
}

.error {
  @extend %data_block;
  background-color: #ffebee;
}
```

### 使用 Mixins (`@mixin`) 的時機

- 需要參數化的樣式
- 需要根據使用情況客製化
- 需要在樣式中使用條件邏輯

```scss
@mixin flex-layout($gap: 12px) {
  display: flex;
  gap: $gap;
}

.my-class {
  @include flex-layout(16px);
}
```

---

## 響應式設計 Mixins

```scss
@mixin mobile {
  @media (max-width: 707px) {
    @content;
  }
}

@mixin tablet {
  @media (max-width: 1140px) {
    @content;
  }
}

// 使用方式
.element {
  padding: 20px;

  @include tablet {
    padding: 12px;
  }
  @include mobile {
    padding: 8px;
  }
}
```
