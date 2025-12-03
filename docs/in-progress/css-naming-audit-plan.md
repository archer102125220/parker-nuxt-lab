# CSS 命名規範審查與修正計劃

## 📋 專案概述

根據 [README.zh-TW.md](file:///Users/parker/Desktop/code/parker-nuxt-lab/README.zh-TW.md#L162-L187) 中定義的 CSS 命名規範,本專案採用**改良式 BEM 命名法**,具有以下特點:

### 命名規範要點

**參考檔案**: 
- [Drawer.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/Drawer.vue) ✅
- [GoTop.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/GoTop.vue) ✅
- [Countdown.vue](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/Countdown.vue) ✅

1. **Block(區塊)**: 使用底線 `_` 分隔多個語義單詞
   - 單一單詞: `.countdown`
   - 多個單詞: `.drawer_root`、`.go_top`
   
2. **Element(元素)**: 使用單個連字符 `-` 連接 Block,元素名稱內部使用底線 `_` 分隔語義單詞
   - 單一單詞元素: `.countdown-down`、`.drawer_root-wrapping`
   - 多單詞元素: `.countdown-down_enter`、`.countdown-up_leave`、`.drawer_root-drag_bar`
   
3. **Sub-Element(子元素)**: 使用單個連字符 `-` 連接父元素,名稱內部使用底線 `_` 分隔
   - `.countdown-down_enter-down_enter_up`
   - `.countdown-up_leave-up_leave_down`
   - `.drawer_root-wrapping-drawer`
   - `.drawer_root-wrapping-mask`
   
4. **狀態修飾**: 透過 HTML 屬性選擇器管理狀態,**不使用** BEM 的 `--modifier` 語法
   - **重要**: 用於樣式調整的 HTML 屬性必須以 `css-` 開頭
   - ✅ 正確: `&[css-is-anime-start='true']`、`&[css-is-show='true']`、`&[css-anchor='top']`
   - ❌ 錯誤: `.countdown--active`、`.drawer--open`、`&[is-active='true']`(缺少 css- 前綴)

### 核心優勢

- ✅ 雙擊可完整選取類別名稱(無 `__` 中斷)
- ✅ 透過 SCSS 巢狀結構(`&-element`)維持語義層級關係
- ✅ 使用 HTML 屬性而非 modifier 類別來管理狀態,減少類別數量
- ✅ 保持良好的可讀性與維護性
- ✅ 底線 `_` 用於分隔語義單詞,連字符 `-` 用於連接層級

---

## 🔍 審查範圍

### 需要檢查的檔案類型

1. **Vue 單檔組件** (`.vue`)
   - `app/components/*.vue`
   - `app/pages/**/*.vue`
   - `app/layouts/*.vue`
   - `app/app.vue`

2. **SCSS 樣式檔案** (`.scss`)
   - `app/assets/styles/*.scss`

3. **CSS 檔案** (`.css`)
   - 僅檢查專案自訂的 CSS，排除 `node_modules/`

### 排除範圍

- ❌ `node_modules/` 下的所有檔案
- ❌ 第三方套件的樣式檔案
- ❌ `coverage/` 測試覆蓋率報告

---

## 📝 檢查項目

### 1. Block 命名檢查

**規則**: Block 使用底線 `_` 分隔多個語義單詞

**正確範例**:
```scss
// 單一單詞
.countdown { }
.banner { }

// 多個單詞(使用底線分隔)
.drawer_root { }
.go_top { }
.socket_test_page { }
.frontend_api_cach_test_page { }
```

**錯誤範例**:
```scss
.drawer-root { }              // ❌ Block 不應使用連字符
.goTop { }                    // ❌ 不應使用駝峰命名
.socket__test__page { }       // ❌ 不應使用雙底線
.socket-test-page { }         // ❌ Block 應使用底線而非連字符
```

### 2. Element 命名檢查

**規則**: Element 使用單個連字符 `-` 連接 Block,元素名稱內部使用底線 `_` 分隔語義單詞

**正確範例**:
```scss
// 單一單詞元素
.countdown-down { }
.drawer_root-wrapping { }
.go_top-btn { }

// 多單詞元素(元素名稱內部使用底線)
.countdown-down_enter { }
.countdown-up_leave { }
.drawer_root-drag_bar { }
.banner-slide_content { }
```

**錯誤範例**:
```scss
.countdown__down { }           // ❌ 不應使用雙底線
.countdown-downEnter { }       // ❌ 元素名稱不應使用駝峰
.drawer-root-wrapping { }      // ❌ Block 應使用底線
.go_top-Btn { }                // ❌ 元素名稱不應使用駝峰
```

### 3. Sub-Element 命名檢查

**規則**: Sub-Element 使用單個連字符 `-` 連接父元素,名稱內部使用底線 `_` 分隔

**正確範例**:
```scss
.countdown-down_enter-down_enter_up { }
.countdown-up_leave-up_leave_down { }
.drawer_root-wrapping-drawer { }
.drawer_root-wrapping-mask { }
.drawer_root-wrapping-drawer-drag_bar { }
.drawer_root-wrapping-drawer-container { }
```

**錯誤範例**:
```scss
.countdown-down_enter__down_enter_up { }  // ❌ 不應使用雙底線
.countdown-down_enter-downEnterUp { }     // ❌ 不應使用駝峰
.drawer__root__wrapping__drawer { }       // ❌ 不應使用雙底線
```

### 4. 狀態修飾檢查

**規則**: 狀態應使用 HTML 屬性選擇器,而非額外的 modifier 類別或 BEM `--modifier` 語法

**重要**: 用於樣式調整的 HTML 屬性**必須**以 `css-` 開頭

**正確範例**:
```scss
.countdown-down_enter-down_enter_up {
  // ✅ 正確 - 使用 css- 前綴的屬性選擇器
  &[css-is-anime-start='true'] {
    animation: flip-up 1s;
  }
  &[css-is-end-second='true'] {
    // ...
  }
}

.go_top {
  // ✅ 正確 - 使用 css- 前綴
  &[css-is-show='true'] {
    opacity: 1;
  }
}

.drawer_root-wrapping-drawer-drag_bar {
  // ✅ 正確 - 使用 css- 前綴
  &[css-anchor='top'] {
    bottom: 0px;
  }
  &[css-is-vertical='true'] {
    width: 100%;
  }
  &[css-is-horizontal='true'] {
    height: 100%;
  }
}
```

**錯誤範例**:
```scss
// ❌ 錯誤 - 使用 BEM modifier 語法
.countdown--active { }
.countdown-down_enter--animating { }

// ❌ 錯誤 - 使用額外的狀態類別
.go_top.active { }
.drawer_root.open { }

// ❌ 錯誤 - 屬性選擇器缺少 css- 前綴
.go_top {
  &[is-show='true'] { }        // 應該是 css-is-show
}

.drawer_root-wrapping-drawer-drag_bar {
  &[anchor='top'] { }          // 應該是 css-anchor
  &[is-vertical='true'] { }    // 應該是 css-is-vertical
}
```

### 5. SCSS 巢狀結構檢查

**規則**: 應使用 `&-element` 語法維持語義層級

**正確範例**:
```scss
.drawer_root {
  &-wrapping {
    &-mask { }
    &-drawer {
      &-drag_bar { }
      &-container { }
    }
  }
}

.countdown {
  &-down_enter {
    &-down_enter_up { }
    &-down_enter_down { }
  }
  &-up_leave {
    &-up_leave_up { }
    &-up_leave_down { }
  }
}
```

**錯誤範例**:
```scss
.drawer_root {
  .drawer_root-wrapping { }  // ❌ 應使用 &-wrapping
}

.countdown {
  .countdown-down_enter { }  // ❌ 應使用 &-down_enter
}
```

---

## 🎯 執行計劃

本計劃分為 **5 個階段**，每個階段可獨立執行，方便分段進行審查與修正。

### 階段 1: 環境準備與工具設置

**目標**: 建立自動化檢查工具

**任務**:
1. 建立 CSS 命名規範檢查腳本
2. 設定檔案掃描範圍
3. 建立檢查報告模板

**預估時間**: 30 分鐘

**輸出**:
- `scripts/check-css-naming.js` - 自動檢查腳本
- `docs/css-naming-violations.md` - 違規報告模板

---

### 階段 2: 全專案掃描與報告生成

**目標**: 掃描所有檔案並生成詳細報告

**任務**:
1. 掃描所有 `.vue` 檔案
2. 掃描所有 `.scss` 檔案
3. 識別命名違規項目
4. 生成分類報告

**預估時間**: 15 分鐘

**輸出**:
- 違規檔案清單
- 違規類型統計
- 優先級排序建議

---

### 階段 3: 核心組件修正 (高優先級)

**目標**: 修正核心可重用組件的命名問題

**範圍**:
- `app/components/*.vue` (約 30+ 個組件)

**任務**:
1. 修正 Block 命名
2. 修正 Element 命名
3. 修正 Sub-Element 命名
4. 調整狀態修飾器
5. 更新 SCSS 巢狀結構

**預估時間**: 2-3 小時

**檢查點**:
- [ ] Banner.vue
- [ ] Dialog.vue
- [ ] Drawer.vue
- [ ] Message.vue
- [ ] Selector.vue
- [ ] SwitchButton.vue
- [ ] 其他組件...

---

### 階段 4: 頁面組件修正 (中優先級)

**目標**: 修正頁面級組件的命名問題

**範圍**:
- `app/pages/**/*.vue` (約 60+ 個頁面)

**任務**:
1. 按目錄分組處理
2. 修正各頁面的 CSS 命名
3. 確保頁面間命名一致性

**預估時間**: 3-4 小時

**分組處理**:
- [ ] `pages/*.vue` (根目錄頁面)
- [ ] `pages/socket-test/*.vue`
- [ ] `pages/firebase/*.vue`
- [ ] `pages/css-drawing/*.vue`
- [ ] `pages/directives/*.vue`
- [ ] `pages/route/*.vue`
- [ ] `pages/server-sent-event-test/*.vue`
- [ ] `pages/web-rtc/*.vue`
- [ ] 其他頁面目錄...

---

### 階段 5: 全域樣式與佈局修正 (低優先級)

**目標**: 修正全域樣式檔案和佈局組件

**範圍**:
- `app/layouts/*.vue`
- `app/assets/styles/*.scss`
- `app/app.vue`

**任務**:
1. 修正佈局組件命名
2. 修正全域樣式命名
3. 確保全域命名不衝突

**預估時間**: 1-2 小時

**檢查點**:
- [ ] `layouts/default.vue`
- [ ] `layouts/full-screen.vue`
- [ ] `layouts/home.vue`
- [ ] `assets/styles/global.scss`
- [ ] `assets/styles/animation.scss`
- [ ] `app.vue`

---

## 📊 進度追蹤

### 總體進度

| 階段 | 狀態 | 完成度 | 預估時間 |
|------|------|--------|----------|
| 階段 1: 環境準備 | ⏳ 待執行 | 0% | 30 分鐘 |
| 階段 2: 全專案掃描 | ⏳ 待執行 | 0% | 15 分鐘 |
| 階段 3: 核心組件修正 | ⏳ 待執行 | 0% | 2-3 小時 |
| 階段 4: 頁面組件修正 | ⏳ 待執行 | 0% | 3-4 小時 |
| 階段 5: 全域樣式修正 | ⏳ 待執行 | 0% | 1-2 小時 |

**總預估時間**: 7-10 小時

---

## 🚀 執行方式

### 方式一: 完整執行

一次性執行所有階段（適合有充足時間的情況）

```bash
# 執行完整修正流程
yarn fix-css-naming
```

### 方式二: 分階段執行（推薦）

根據可用時間分段執行

```bash
# 階段 1: 環境準備
yarn fix-css-naming:setup

# 階段 2: 掃描報告
yarn fix-css-naming:scan

# 階段 3: 修正核心組件
yarn fix-css-naming:components

# 階段 4: 修正頁面組件
yarn fix-css-naming:pages

# 階段 5: 修正全域樣式
yarn fix-css-naming:global
```

### 方式三: 手動執行

逐個檔案手動檢查與修正（適合學習和精細控制）

---

## ⚠️ 注意事項

### 執行前

1. **建立新分支**: 建議在新的 Git 分支上進行修正
   ```bash
   git checkout -b fix/css-naming-convention
   ```

2. **備份重要檔案**: 雖然會使用版本控制，但建議先備份

3. **確保測試通過**: 修正前確保現有測試都通過
   ```bash
   yarn test:e2e
   ```

### 執行中

1. **逐步提交**: 每完成一個階段就提交一次
2. **測試驗證**: 每個階段完成後進行視覺測試
3. **記錄問題**: 遇到特殊情況記錄在報告中

### 執行後

1. **全面測試**: 執行完整的測試套件
2. **視覺回歸測試**: 檢查 UI 是否有變化
3. **文件更新**: 更新相關文件說明
4. **Code Review**: 提交 PR 進行審查

---

## 📚 參考資源

- [README.zh-TW.md - CSS 命名規範](file:///Users/parker/Desktop/code/parker-nuxt-lab/README.zh-TW.md#L162-L187)
- [Banner.vue - 命名範例](file:///Users/parker/Desktop/code/parker-nuxt-lab/app/components/Banner.vue) (已符合規範)
- [BEM 官方文件](https://getbem.com/)
- [SCSS 巢狀結構最佳實踐](https://sass-lang.com/documentation/style-rules/parent-selector)

---

## 🤝 協作流程

1. **審查計劃**: 由專案負責人審查本計劃
2. **確認範圍**: 確認需要修正的範圍和優先級
3. **分配任務**: 如果是團隊協作，分配各階段任務
4. **執行修正**: 按照計劃執行
5. **審查驗證**: 完成後進行 Code Review
6. **合併主分支**: 審查通過後合併

---

## 📝 修正記錄

### 修正模板

每次修正後記錄以下資訊:

```markdown
### [日期] - 階段 X: [階段名稱]

**修正檔案數**: X 個
**主要變更**:
- 修正 Block 命名: X 處
- 修正 Element 命名: X 處
- 修正 Sub-Element 命名: X 處
- 調整狀態修飾: X 處

**遇到的問題**:
- 問題描述及解決方案

**測試結果**:
- ✅ 單元測試通過
- ✅ E2E 測試通過
- ✅ 視覺測試通過
```

---

## ✅ 驗收標準

### 技術標準

- [ ] 所有 Block 命名符合規範
- [ ] 所有 Element 命名符合規範
- [ ] 所有 Sub-Element 命名符合規範
- [ ] 狀態修飾使用 HTML 屬性選擇器
- [ ] SCSS 使用正確的巢狀結構
- [ ] 無命名衝突

### 測試標準

- [ ] 所有現有測試通過
- [ ] UI 視覺無變化
- [ ] 無控制台錯誤或警告
- [ ] 效能無明顯下降

### 文件標準

- [ ] 修正記錄完整
- [ ] 特殊案例有文件說明
- [ ] README 更新（如需要）

---

## 🎉 預期成果

完成本計劃後，專案將達到:

1. ✅ **命名一致性**: 所有 CSS 類別名稱遵循統一規範
2. ✅ **可維護性提升**: 更容易理解和修改樣式
3. ✅ **開發效率**: 雙擊選取、IDE 自動補全更順暢
4. ✅ **團隊協作**: 降低命名衝突和溝通成本
5. ✅ **程式碼品質**: 提升整體程式碼專業度

---

**建立日期**: 2025-12-03  
**最後更新**: 2025-12-03  
**版本**: 1.0.0
