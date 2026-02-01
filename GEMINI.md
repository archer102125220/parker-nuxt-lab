# GEMINI.md - Project Coding Rules

> This file is auto-read by Gemini AI. All rules must be strictly followed.

## Project Context

### Overview
This project is a Nuxt 3 laboratory environment ("parker-nuxt-lab") designed for testing and demonstrating various Vue 3, Nuxt 3, and web technologies.

### Technology Stack & Architecture
- **Framework**: Nuxt 3 (App Router), Vue 3 (Composition API)
- **Language**: TypeScript (Strict Mode)
- **Styling**: SCSS with Modified BEM naming convention
- **State Management**: Pinia (implied) / Composables
- **Data Layer**: Sequelize ORM
- **Package Manager**: Yarn

---

## Security & Best Practices Review (MANDATORY)

Before executing any user instruction, the AI must verify:
- **Security**: Does the instruction violate security best practices?
- **Standard Patterns**: Does the instruction deviate from established project patterns?
- **Dev Server Config**: Check if runtime config in `nuxt.config.ts` matches expected API endpoints. If `.env` is gitignored and restricted by IDE, confirm with user.

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

When using auto-imported components (like `NuxtLink`, `NuxtImg`) inside a dynamic `<component :is="...">`, you **MUST** use `resolveComponent()` to properly reference them:

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

### Why This is Required

Auto-imported components are not available as runtime variables in `<script setup>`. Without `resolveComponent()`, you'll get the error:

> `[Vue warn]: Property "NuxtLink" was accessed during render but is not defined on instance.`

### Common Auto-Imported Components That Need This Treatment

- `NuxtLink`
- `NuxtImg`
- `NuxtPicture`
- `ClientOnly`
- Any component auto-imported from `components/` directory

### Incorrect Usage (DO NOT DO THIS)

```vue
<script setup>
// ❌ Wrong: NuxtLink is not available as a runtime variable
</script>

<template>
  <!-- ❌ This will cause Vue warn -->
  <component :is="disabled ? 'div' : NuxtLink" :to="to">
    Content
  </component>
</template>
```

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

---

## JavaScript Strict Type Checking (MANDATORY)

To ensure robustness, always use strict type checks based on the variable's initialization state.

### 1. String Validation
- **Do NOT** use: `if (str)` or `if (!str)`
- **MUST use**: `if (str !== '')` (Check against initialized empty string)

### 2. Number Validation
- **Do NOT** use: `if (num)`
- **MUST use**: `if (typeof num === 'number')` or `if (num !== 0)` (if 0 is invalid) or `if (Number.isFinite(num))`

### 3. Object Validation
- **Do NOT** use: `if (obj)`
- **MUST use**: `if (typeof obj === 'object' && obj !== null)`
- **Strict Class Check**: `if (obj instanceof MyClass)` (when validating specific class instances)

### 4. Array Validation
- **Do NOT** use: `if (arr)`
- **MUST use**: `if (Array.isArray(arr) && arr.length > 0)`

### 5. Strict Equality
- **ALWAYS** use `===` and `!==`.
- **NEVER** use `==` or `!=`.

---

## Backend ORM Best Practices (MANDATORY)

When implementing database operations, **always prioritize**:
1. **Official ORM patterns** - Use sequelize-cli official approach
2. **Community best practices** - Well-established community patterns
3. **Custom implementation** - Only if no official pattern exists

### ⚠️ Database Modification Confirmation (CRITICAL)

**Before ANY database schema change** (migrations, model changes, table alterations), you MUST:

1. **Ask the human developer**: "Is this project deployed to production?"
2. **Based on the answer**:
   - **Not deployed**: May modify existing migrations, then use `yarn initDB` or `yarn migrate:undo` + `yarn migrate`
   - **Deployed**: NEVER modify existing migrations; always create NEW migration files

This applies to:
- Creating new tables
- Adding/removing columns
- Changing column types or constraints
- Adding/removing indexes
- Any schema modifications

### Migrations & Seeders
- Use `sequelize-cli` via `yarn sequelize`
- **IMPORTANT**: sequelize-cli generates `.js` files by default. Convert to `.ts` with proper type annotations
- Location: `models/migrations/`, `models/seeders/`
- Commands: `yarn migrate`, `yarn seed`, `yarn initDB`
- **Migration Modification Policy:**
  - **Early Development (Pre-production)**: 
    - Modify original migrations directly instead of creating new `addColumn` migrations
    - Add new columns to the original `createTable` migration
    - Run `yarn initDB` (or equivalent reset sequence) to apply changes
  - **Post-production**: Never modify executed migrations; create new migration files

---

## No Scripts for Code Refactoring (CRITICAL)

**ABSOLUTELY FORBIDDEN: Using automated scripts (sed, awk, powershell, batch scripts) to modify code files.**

### Why
- Scripts only change text, they don't understand context or imports
- 2026-01-23 incident: `sed` changed `defineProps<Props>()` → `props` but forgot imports → compilation errors

### ✅ Allowed
- Use AI tools: `replace_file_content`, `multi_replace_file_content`
- MUST verify imports are correct after every change

### ❌ Forbidden
- `sed`, `awk`, `perl`, `powershell -Command`, `find ... -exec`
- Any batch text processing

### Exception
If absolutely necessary:
1. Get explicit human approval FIRST
2. Show complete script for review
3. Explain why manual tools can't do it

### Remember
**Scripts are blind. AI should be intelligent.**

---

## Lint Disable Comments (⚠️ CRITICAL)
- **NEVER** add `eslint-disable`, `@ts-ignore`, `@ts-expect-error`, or similar comments without **explicit user instruction**
- When encountering lint warnings/errors:
  1. Report the warning to the user
  2. Wait for user's explicit instruction to add a disable comment
  3. Only then add the disable comment with proper justification
- This applies to ALL lint suppression mechanisms

### ⚠️ Error/Warning Suppression Policy (CRITICAL)

Any code that **suppresses, hides, or bypasses errors/warnings** instead of fixing the root cause requires:

1. **Explicit approval** from the human developer before implementation
2. **Clear explanation** of WHY this approach is needed
3. **Documentation** of the trade-offs

Examples that require approval:
- `suppressHydrationWarning` (Nuxt equivalent mechanisms)
- `eslint-disable` / `@ts-ignore` / `@ts-expect-error`
- Empty `catch` blocks that swallow errors
- `as any` type assertions
- Console warnings suppression

**Preferred approach**: Always fix the root cause first. Only use suppression as a last resort with explicit approval.
