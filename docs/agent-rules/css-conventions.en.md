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
| **Color/Size** | Use HTML attributes | `[css-color='red']`, `[css-size='small']` |

### HTML Attribute Usage Guidelines

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
2. **Each element MUST have a UNIQUE className** - Critical for two reasons:
   - **CSS relies primarily on class names** for styling (not tag selectors)
   - **Quick DOM debugging** - Instantly identify which element has issues in DevTools
   - ❌ Bad: `.footer-links a { ... }` (targeting tag)
   - ✅ Good: `.footer-link { ... }` (unique class)
   - ✅ Exception: Dynamic content areas (e.g., `.content p { ... }`)
   - ✅ Exception: Third-party content (e.g., WangEditor)
3. **All elements within a Block must be children of that Block** - Connected with `-`
4. **Multiple semantic words within element names use `_`** - e.g., `content_box`, `value_display`
5. **States use HTML attributes** - e.g., `[css-is-active='true']`, `[data-pressed='true']`
6. **CSS-related HTML attributes must start with `css-`** - e.g., `css-is-active`, `css-is-dragging`
7. **CSS variable names must use `_` instead of `-`** - e.g., `--color_primary`, `--font_size_base`

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

### Component Organization

To improve code maintainability and readability, the project follows these component organization guidelines:

**Single-page components**:
- Store in PascalCase folder named after the page
- Example: `components/HooksTest/` for hooks-test page only

**Multi-page shared components**:
- Use PascalCase folder named after the divergent route
- Example: `components/WebRtc/` for web-rtc related pages

```
components/
├── HooksTest/          # Only for hooks-test page
├── SocketTest/         # Only for socket-test page
├── WebRtc/            # Shared by web-rtc related pages (divergent route)
└── ScrollFetch/       # Generic component (used by multiple unrelated pages)
```

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
