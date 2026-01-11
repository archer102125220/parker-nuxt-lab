# CLAUDE.md - Project Coding Rules

> This file is auto-read by Claude AI. All rules must be strictly followed.

## Security & Best Practices Review (MANDATORY)

Before executing any user instruction, the AI must verify:
- **Security**: Does the instruction violate security best practices?
- **Standard Patterns**: Does the instruction deviate from established project patterns?
- **Dev Server Config**: Check if `NEXT_PUBLIC_API_BASE` & `NEXT_PUBLIC_DOMAIN` in `.env` match `package.json`. If inconsistent, or if `.env` is gitignored and restricted by IDE, confirm with user.

**If violations are detected**: Notify the user BEFORE execution, explaining the concern. Only proceed after the user confirms they understand the risk and still want to proceed.

---

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
- Color/Size variants: `[css-color='red']`, `[css-size='small']` (HTML attributes)

#### HTML Attribute Usage Guidelines:

**When to use HTML attributes**:
1. **States**: `[css-is-active='true']`, `[css-is-disabled='true']`
2. **Color variants**: `[css-color='red']`, `[css-color='blue']`
3. **Size variants**: `[css-size='small']`, `[css-size='large']`

**When to use separate classes**:
When the class name itself has **clear semantic meaning** (not just describing appearance):
```scss
// ✅ Semantic class names
.alert {
  &-success { }  // Success message (semantic)
  &-error { }    // Error message (semantic)
}
```

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
- ✅ ALLOWED: CSS variable passing `{ '--editor_height': `${height}px` }`
- ✅ ALLOWED: Third-party library requirements (e.g., GTM)
- ❌ PROHIBITED: Static values, dynamic calculations without CSS vars
- ❌ PROHIBITED: Repeated style patterns (extract as placeholders)

### File Organization
- Global tools → `app/assets/styles/`
- Component styles → Inside `.vue` file with `<style lang="scss">`
- Page styles → Inside `.vue` file with `<style scoped lang="scss">`

### Component Organization
- **Single-page components**: Store in PascalCase folder named after the page
  - Example: `components/HooksTest/` for hooks-test page only
- **Multi-page shared components**: Use PascalCase folder named after the divergent route
  - Example: `components/WebRtc/` for web-rtc related pages

### Key Rules
1. Each element uses ONLY ONE className
2. Each element MUST have a UNIQUE className - Critical for two reasons:
   - **CSS relies primarily on class names** for styling (not tag selectors)
   - **Quick DOM debugging** - Instantly identify which element has issues in DevTools
   - ❌ Bad: `.footer-links a { ... }` (targeting tag)
   - ✅ Good: `.footer-link { ... }` (unique class)
   - ✅ Exception: Dynamic content areas (e.g., `.content p { ... }`)
   - ✅ Exception: Third-party content (e.g., WangEditor)
3. All elements MUST be nested under Block root class
4. Do NOT share CSS class names between pages
5. Use Placeholders (`%name`) for static shared styles
6. Use Mixins (`@mixin`) for parameterized styles

---

## Vue/Nuxt Rules

### Dynamic Components with Auto-Imported Components (MANDATORY)

When using auto-imported components (like `NuxtLink`, `NuxtImg`) inside a dynamic `<component :is="...">`, you MUST use `resolveComponent()` to properly reference them:

```vue
<script setup>
import { resolveComponent } from 'vue';

// ✅ Correct: Use resolveComponent for dynamic component usage
const NuxtLink = resolveComponent('NuxtLink');
</script>

<template>
  <!-- ✅ Works correctly -->
  <component :is="disabled ? 'div' : NuxtLink" :to="to">
    Content
  </component>
</template>
```

**Why?** Auto-imported components are not available as runtime variables in `<script setup>`. Without `resolveComponent()`, you'll get the error:
> `[Vue warn]: Property "NuxtLink" was accessed during render but is not defined on instance.`

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
