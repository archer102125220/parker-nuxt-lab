---
applyTo:
  - "**/*.scss"
  - "**/*.css"
  - "**/*.vue"
---
<rule_content>
# CSS/SCSS Coding Rules

## Property Order (MANDATORY)
1. Positioning (position, top, z-index)
2. Display & Box Model (display, flex, width, margin, padding, border)
3. Typography (font, color, text-align)
4. Visual (background, box-shadow, opacity)
5. Animation (transition, animation)
6. Misc (cursor, content)

## Modified BEM Naming (MANDATORY)
- Block: `block_name` (multi-word uses `_`)
- Element: `block-element` (connected with `-`)
- Sub-Element: `block-element-sub` (continue with `-`)
- State: `[css-is-active='true']` (HTML attributes)
- Color/Size variants: `[css-color='red']`, `[css-size='small']` (HTML attributes)

## Forbidden Practices
- ❌ **NEVER use `__` (double underscore)**
- ❌ **NEVER use `--` (double hyphen)** - use HTML attributes instead
- ❌ **NEVER use multiple classNames on a single element**

### HTML Attribute Usage:
**When to use**:
1. States: `[css-is-active='true']`, `[css-is-disabled='true']`
2. Color variants: `[css-color='red']`, `[css-color='blue']`
3. Size variants: `[css-size='small']`, `[css-size='large']`

**When to use separate classes**:
When class name has clear semantic meaning:
```scss
.alert {
  &-success { }  // Semantic
  &-error { }    // Semantic
}
```

## Root Element Naming
- Pages: `.page_name_page` (e.g., `.hooks_test_page`)
- Components: `.component_name` (e.g., `.scroll_fetch`)

## CSS Variables
- ✅ Use `_`: `--color_primary`, `--font_size_base`
- ❌ NOT `-`: `--color-primary`

## HTML State Attributes
- ✅ Use `css-` prefix: `css-is-active`, `css-is-dragging`
- ❌ NOT: `is-active`, `isActive`

## Inline Styles
- ✅ ALLOWED: CSS variable passing `{ '--editor_height': `${height}px` }`
- ✅ ALLOWED: Third-party library requirements (e.g., GTM)
- ❌ PROHIBITED: Static values
- ❌ PROHIBITED: Repeated patterns (extract as placeholders)

## Key Rules
1. Each element uses ONLY ONE className
2. Each element MUST have a UNIQUE className - Critical for:
   - **CSS relies on class names** (not tag selectors)
   - **Quick DOM debugging** in DevTools
   - ❌ Bad: `.footer-links a { ... }` (targeting tag)
   - ✅ Good: `.footer-link { ... }` (unique class)
   - ✅ Exception: Dynamic content (`.content p { ... }`)
   - ✅ Exception: Third-party content (WangEditor)
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
</rule_content>
