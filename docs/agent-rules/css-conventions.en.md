# CSS Development Standards

> All CSS/SCSS code must strictly follow these conventions.

## CSS Property Order Convention

CSS properties must be ordered as follows:

1. **Positioning** - `position`, `top`, `right`, `bottom`, `left`, `z-index`
2. **Display & Box Model** - `display`, `flex`, `grid`, `width`, `height`, `margin`, `padding`, `border`
3. **Typography** - `font`, `font-size`, `font-weight`, `color`, `text-align`, `line-height`
4. **Visual** - `background`, `background-color`, `box-shadow`, `opacity`, `visibility`
5. **Animation** - `transition`, `animation`, `transform`
6. **Misc** - `cursor`, `content`, `overflow`, `pointer-events`

### Example

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

> 💡 Comments are not required in actual development; use them only in complex styles for readability.

---

## CSS Naming Convention (Modified BEM)

The project adopts a **Modified BEM Naming Convention** to improve double-click selection efficiency.

### Naming Structure

| Type | Format | Example |
|------|--------|---------|
| **Block** | Single name, multi-word uses `_` | `.countdown`, `.image_upload` |
| **Element** | Connect with `-` | `.countdown-timer`, `.image_upload-preview` |
| **Sub-Element** | Continue with `-` | `.image_upload-preview-img` |
| **State** | Use HTML attributes | `[css-is-active='true']` |

### Root Element Naming

- **Page Root Elements**: `[page_name]_page`
  - Examples: `.hooks_test_page`, `.socket_io_page`, `.web_rtc_page`
- **Component Root Elements**: `[component_name]`
  - Examples: `.scroll_fetch`, `.image_upload`, `.countdown`

### SCSS Nesting

```scss
// ✅ Correct: All elements nested under root class
.hooks_test_page {
  &-description { }      // .hooks_test_page-description
  &-grid { }             // .hooks_test_page-grid
  &-section {            // .hooks_test_page-section
    &-title { }          // .hooks_test_page-section-title
    &-description { }    // .hooks_test_page-section-description
  }
}

// ❌ Wrong: Cannot identify which page they belong to
.hooks_test_page { }
.description { }
.grid { }
```

### Key Principles

1. **Each element uses only one className** - Do not combine multiple classes
2. **All elements within a Block must be children of that Block** - Connected with `-`
3. **Multiple semantic words within element names use `_`** - e.g., `content_box`, `value_display`
4. **States use HTML attributes** - e.g., `[css-is-active='true']`, `[data-pressed='true']`
5. **CSS-related HTML attributes must start with `css-`** - e.g., `css-is-active`, `css-is-dragging`
6. **CSS variable names must use `_` instead of `-`** - e.g., `--color_primary`, `--font_size_base`

---

## Inline Style Rules

### ✅ Allowed Inline Styles

1. **CSS Variable Passing** (including dynamic calculated values)
   ```vue
   <div :style="{ '--editor_height': `${height}px` }">
   <div :style="{ '--offset_y': `${offsetY}px` }">
   ```

2. **Third-party Library Requirements**
   ```vue
   <noscript :style="{ display: 'none', visibility: 'hidden' }">
   ```

### ❌ Prohibited Inline Styles

- Static style values (should use CSS classes)
- Dynamic calculated values (should use CSS variable passing)
- Predictable conditional styles (should use CSS attribute selectors)
- Repeated style patterns (should extract as placeholders or mixins)

---

## CSS File Organization

### Directory Structure

```
app/
├── assets/
│   └── styles/           # Global style tools (centralized)
│       ├── global.scss   # Global styles
│       ├── mixin.scss    # Mixins (reusable style functions)
│       ├── variable.scss # Variable definitions
│       └── animation.scss # Animation utilities
│
├── components/            # Component-specific styles (co-located)
│   └── Button.vue
│       └── <style scoped>
│
└── pages/                 # Page-specific styles (co-located)
    └── index.vue
        └── <style scoped>
```

### Style Placement Principles

1. **Global Tools** → `app/assets/styles/` directory
   - Mixins (`@mixin`)
   - Variable definitions
   - Global styles
   - Animation utilities

2. **Component Styles** → Within component file
   - Use `<style lang="scss">` (no `scoped` needed with BEM naming)
   - Use `<style scoped lang="scss">` only when overriding external packages (with `:deep()`)

3. **Page Styles** → Within `pages/` directory
   - Use `<style scoped lang="scss">`
   - **Each page must have a unique root class name**

### Important Rules

> ⚠️ **Do NOT share CSS class names between pages**
> 
> If multiple pages have similar DOM structures, create reusable components in `components/`.

---

## Placeholders vs Mixins

### When to Use Placeholders (`%name`)

- Multiple selectors need exactly the same styles
- Styles don't need parameters (static styles)
- Want to reduce CSS output size (selectors are merged)

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

### When to Use Mixins (`@mixin`)

- Need parameterized styles
- Need customization based on usage
- Need conditional logic in styles

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

## Responsive Design Mixins

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

// Usage
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
