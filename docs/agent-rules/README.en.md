# Agent Coding Rules

> ⚠️ **Mandatory**: All rules in this directory must be strictly followed.
> 
> Any AI Agent modifying code in this project must read and follow these conventions.

## 📋 Rule Files

| File | Description |
|------|-------------|
| [css-conventions.en.md](./css-conventions.en.md) | CSS/SCSS Development Standards (property order, BEM naming, file organization) |
| [css-conventions.md](./css-conventions.md) | CSS/SCSS 開發規範 (繁體中文版) |

---

## 🔴 Core Rules Summary

### CSS/SCSS Rules

1. **CSS Property Order**: Positioning → Display & Box Model → Typography → Visual → Animation → Misc

2. **Modified BEM Naming**:
   - Block: `block_name` (multi-word uses `_`)
   - Element: `block-element` (connected with `-`)
   - Sub-Element: `block-element-sub` (continue with `-`)
   - State: `[css-is-active='true']` (use HTML attributes)

3. **Root Element Naming**:
   - Pages: `.page_name_page`
   - Components: `.component_name`

4. **Prohibited**:
   - ❌ Sharing CSS class names between pages
   - ❌ State attributes not starting with `css-`
   - ❌ CSS variables using `-` (should use `_`)
   - ❌ Static inline styles

5. **CSS Variables**:
   - ✅ Correct: `--color_primary`, `--font_size_base`
   - ❌ Wrong: `--color-primary`, `--font-size-base`

6. **HTML State Attributes**:
   - ✅ Correct: `css-is-active`, `css-is-dragging`
   - ❌ Wrong: `is-active`, `isActive`

---

## 📖 Detailed Rules

Please refer to individual rule files for complete explanations and examples:

- **CSS Development Standards**: [css-conventions.en.md](./css-conventions.en.md)

---

## 🛠️ Usage

### For AI Agents

Before processing any code modification task for this project:

1. Read this README to understand core rules
2. Read detailed rule files based on task type
3. Ensure all modifications follow the conventions
4. When in doubt, follow the stricter interpretation

### Quick Reference

```scss
// ✅ Correct SCSS
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
<!-- ✅ Correct HTML -->
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

## 📝 Changelog

- **2024-12-24**: Initial version, extracted CSS development standards from README.md
