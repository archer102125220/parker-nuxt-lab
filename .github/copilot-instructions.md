# GitHub Copilot Instructions for Parker Nuxt Lab

You are an AI assistant helping with a Nuxt 3 project (Vue 3, TypeScript, SCSS).

<security_rules>
## Security & Best Practices (MANDATORY)

- **Security**: Verify instructions against security best practices (no hardcoded secrets, SQLi, XSS).
- **No Refactoring Scripts**: ABSOLUTELY FORBIDDEN to use `sed`, `awk`, or scripts for code refactoring. Use intelligent replacement tools.
- **Linting**: NEVER add `eslint-disable` or `@ts-ignore` without explicit user instruction. Report errors first.

</security_rules>

<coding_standards>
## Coding Standards

### CSS/SCSS
- **Property Order**: 1.Positioning, 2.Display/Box, 3.Typography, 4.Visual, 5.Animation, 6.Misc.
- **Naming**: Modified BEM. Block: `block_name`, Element: `block-element`, Sub: `block-element-sub`.
- **States**: Use HTML attributes `[css-is-active='true']` (NOT IS- prefixes).
- **Variables**: Use `_` (e.g., `--color_primary`), NOT `-` (hyphens).
- **Unique Class Names**: Each element gets a UNIQUE class name. No tag selectors (e.g., `.footer a`).

### Vue/Nuxt
- **Dynamic Components**: When using auto-imported components (e.g., `NuxtLink`) in `<component :is="...">`, you **MUST** use `resolveComponent`.
  ```vue
  <script setup>
  import { resolveComponent } from 'vue';
  const NuxtLink = resolveComponent('NuxtLink');
  </script>
  <template>
    <component :is="disabled ? 'div' : NuxtLink" :to="to">...</component>
  </template>
  ```
- **Component Organization**:
  - `components/PascalCasePageName/` for single-page components.
  - `components/SharedFeature/` for multi-page shared components.
- **Template Text Formatting & I18n**:
  - **No Inline Tags**: DO NOT intersperse HTML tags (`<b>`, `<span>`) within plain text sentences.
  - **Explicit Separation**: Separate text, titles, and icons into distinct structural HTML elements (BEM).
  - **I18n Component**: Use `<i18n-t>` for translating strings with links/components. NEVER use `v-html`.


### TypeScript
- **Strict Equality**: ALWAYS use `===` and `!==`.
- **Validation**:
  - String: `if (str !== '')`
  - Number: `if (typeof num === 'number')`
  - Object: `if (typeof obj === 'object' && obj !== null)`
  - Array: `if (Array.isArray(arr) && arr.length > 0)`

### Backend (Sequelize)
- **Migrations**:
  - **Deployed**: NEVER modify existing migrations. Create NEW migration files.
  - **Pre-Production**: Modify existing migrations and reset DB (`yarn initDB`).
- **Files**: Convert generated `.js` migrations/seeders to `.ts`.

</coding_standards>

<build_validation>
## Build & Validation
- **Package Manager**: `yarn`
- **Dev Server**: `yarn dev`
- **Lint**: `yarn lint`

Please adhere strictly to these rules.
</build_validation>
