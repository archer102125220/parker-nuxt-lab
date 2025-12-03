# CSS 命名規範快速參考

> 本專案採用**改良式 BEM 命名法**

## 📌 核心規則

### 1️⃣ Block (區塊)
使用底線 `_` 分隔多個語義單詞

```scss
✅ .countdown
✅ .drawer_root
✅ .go_top
✅ .socket_test_page

❌ .drawer-root        // 不應使用連字符
❌ .goTop              // 不應使用駝峰
```

---

### 2️⃣ Element (元素)
使用單個連字符 `-` 連接 Block,元素名稱內部使用底線 `_` 分隔

```scss
✅ .countdown-down
✅ .drawer_root-wrapping
✅ .countdown-down_enter
✅ .drawer_root-drag_bar

❌ .countdown__down           // 不應使用雙底線
❌ .countdown-downEnter       // 不應使用駝峰
❌ .drawer-root-wrapping      // Block 應使用底線
```

---

### 3️⃣ Sub-Element (子元素)
使用單個連字符 `-` 連接父元素,名稱內部使用底線 `_` 分隔

```scss
✅ .countdown-down_enter-down_enter_up
✅ .drawer_root-wrapping-drawer
✅ .drawer_root-wrapping-drawer-drag_bar

❌ .countdown-down_enter__down_enter_up    // 不應使用雙底線
❌ .countdown-down_enter-downEnterUp       // 不應使用駝峰
```

---

### 4️⃣ 狀態修飾
使用 HTML 屬性選擇器,**不使用** BEM `--modifier` 語法

> **⚠️ 重要**: 用於樣式調整的 HTML 屬性**必須**以 `css-` 開頭

```scss
✅ &[css-is-show='true']
✅ &[css-is-anime-start='true']
✅ &[css-anchor='top']
✅ &[css-is-vertical='true']

❌ .countdown--active                // 不應使用 BEM modifier
❌ .go_top.active                    // 不應使用狀態類別
❌ &[is-show='true']                 // 缺少 css- 前綴
❌ &[anchor='top']                   // 缺少 css- 前綴
```

---

### 5️⃣ SCSS 巢狀結構
使用 `&-element` 語法維持語義層級

```scss
✅ 正確寫法:
.drawer_root {
  &-wrapping {
    &-drawer {
      &-drag_bar { }
    }
  }
}

❌ 錯誤寫法:
.drawer_root {
  .drawer_root-wrapping { }    // 應使用 &-wrapping
}
```

---

## 🎯 命名模式總結

| 層級 | 連接符號 | 語義單詞分隔 | 範例 |
|------|---------|------------|------|
| Block | - | `_` 底線 | `.drawer_root` |
| Element | `-` 連字符 | `_` 底線 | `.drawer_root-wrapping` |
| Sub-Element | `-` 連字符 | `_` 底線 | `.drawer_root-wrapping-drawer` |
| 狀態 | 屬性選擇器 | - | `[css-is-show='true']` |

---

## 📋 完整範例

```scss
// Block
.countdown {
  
  // Element
  &-down_enter {
    
    // Sub-Element
    &-down_enter_up {
      
      // 狀態修飾
      &[css-is-anime-start='true'] {
        animation: flip-up 1s;
      }
      
      &[css-is-end-second='true'] {
        // ...
      }
    }
  }
}
```

```html
<!-- HTML 使用範例 -->
<div class="countdown">
  <p 
    class="countdown-down_enter-down_enter_up"
    css-is-anime-start="true"
    css-is-end-second="false"
  >
    5
  </p>
</div>
```

---

## ✅ 核心優勢

1. **雙擊選取**: 無 `__` 中斷,可完整選取類別名稱
2. **語義清晰**: 底線 `_` 分隔語義,連字符 `-` 連接層級
3. **狀態管理**: 使用 HTML 屬性,減少類別數量
4. **SCSS 友善**: `&-element` 語法維持清晰結構

---

## 🔗 參考檔案

**符合規範的範例**:
- [Drawer.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/Drawer.vue)
- [GoTop.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/GoTop.vue)
- [Countdown.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/Countdown.vue)

**詳細計劃**:
- [CSS 命名規範審查與修正計劃](file:///Users/parker/.gemini/antigravity/brain/6db5bc97-76ef-4127-8af6-8cdaf0eeb0f4/css_naming_audit_plan.md)

---

**版本**: 1.2.0  
**更新日期**: 2025-12-03
