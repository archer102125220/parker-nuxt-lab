# CLAUDE.md - Project Coding Rules

> This file is auto-read by Claude AI. All rules must be strictly followed.

## CSS/SCSS Rules

### Property Order (MANDATORY)
1. Positioning (position, top, z-index)
2. Display & Box Model (display, flex, width, margin, padding, border)
3. Typography (font, color, text-align)
4. Visual (background, box-shadow, opacity)
5. Animation (transition, animation)
6. Misc (cursor, content)

### Modified BEM Naming (MANDATORY)
- Block: `block_name` (multi-word uses `_`)
- Element: `block-element` (connected with `-`)
- Sub-Element: `block-element-sub` (continue with `-`)
- State: `[css-is-active='true']` (HTML attributes)

### Root Element Naming
- Pages: `.page_name_page` (e.g., `.hooks_test_page`)
- Components: `.component_name` (e.g., `.scroll_fetch`)

### CSS Variables
- ✅ Use `_`: `--color_primary`, `--font_size_base`
- ❌ NOT `-`: `--color-primary`

### HTML State Attributes
- ✅ Use `css-` prefix: `css-is-active`, `css-is-dragging`
- ❌ NOT: `is-active`, `isActive`

### Inline Styles
- ✅ ALLOWED: CSS variable passing `{ '--height': height }`
- ✅ ALLOWED: Third-party library requirements
- ❌ PROHIBITED: Static values, dynamic calculations without CSS vars

### File Organization
- Global tools → `app/assets/styles/`
- Component styles → Inside `.vue` file with `<style lang="scss">`
- Page styles → Inside `.vue` file with `<style scoped lang="scss">`

### Key Rules
1. Each element uses ONLY ONE className
2. Each element MUST have a UNIQUE className for debugging
   - Unique class names help quickly identify which DOM element has issues
   - Besides CSS styling, unique class names enable fast debugging in DevTools
3. All elements MUST be nested under Block root class
4. Do NOT share CSS class names between pages
5. Use Placeholders (`%name`) for static shared styles
6. Use Mixins (`@mixin`) for parameterized styles

## SCSS Example

```scss
.my_component {
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  padding: 16px;
  font-size: 14px;
  color: var(--text_color);
  background-color: var(--bg_color);
  transition: opacity 0.3s;
  
  &-header { }
  &-content {
    &-item { }
  }
  
  &[css-is-active='true'] {
    opacity: 1;
  }
}
```

## Vue Template Example

```vue
<div class="my_component" 
     :css-is-active="isActive"
     :style="{ '--offset_y': `${offset}px` }">
  <div class="my_component-header">Header</div>
  <div class="my_component-content">
    <div class="my_component-content-item">Item</div>
  </div>
</div>
```

---

For detailed documentation, see: [docs/agent-rules/](./docs/agent-rules/)
