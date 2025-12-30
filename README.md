# Parker Nuxt Lab

[繁體中文說明](./README.zh-TW.md)

An experimental Nuxt 4 project that integrates PWA, i18n, Pinia, Vuetify, Socket.IO, WebRTC, Firebase Cloud Messaging, Swagger, and Sequelize (PostgreSQL). It serves as a sandbox to quickly validate features and showcase example pages.

- **Framework**: Nuxt 4 (Vue 3.5.8)
- **UI**: Vuetify 3.6
- **State**: Pinia 2.1
- **i18n**: `@nuxtjs/i18n` 9.0
- **PWA**: `@vite-pwa/nuxt` 0.10 (Inject Manifest)
- **Security**: `nuxt-security` 2.2 with CSP/Permissions Policy
- **Realtime**: Socket.IO 4.8, SSE, WebSocket, WebRTC pages
- **ML / Imaging**: `face-api.js` 0.22, `@tensorflow/tfjs-node` 4.22 (with Windows DLL copy helper)
- **Notifications**: Firebase Cloud Messaging 12.1 (Service Worker included)
- **API Docs**: Swagger (`/api/nuxt-server/swagger-docs`)
- **Testing**: Playwright 1.47 E2E
- **Database**: Sequelize 6.37 + PostgreSQL (migrations/seeds scripts)
- **Additional Libraries**: WangEditor 5.1 (rich text editor), FIDO2, QR Code, Swiper 11.1, Day.js, Axios 1.7
- **Analytics**: Vercel Analytics & Speed Insights

## Key Directories

- `pages/`: Example pages such as `web-rtc/`, `socket-test/`, `server-sent-event-test/`
- `plugins/`: Custom injections (Axios, Pinia, Firebase, Socket client, Vuetify, PWA)
- `server/`: Nitro server APIs, routes, plugins
- `service-worker/`: PWA Service Worker and Firebase Messaging SW
- `models/`: Sequelize setup and migrations
- `public/ai_models/`: `face-api.js` weight files

## Requirements

- Node.js 18+ (LTS recommended)
- Yarn 1.22+ (project default)
- PostgreSQL (if you use Sequelize features)
- On macOS, see node-canvas install notes in references

## Install

```bash
yarn install
```

## Development

Default (HTTP, bound to 0.0.0.0):

```bash
yarn dev
```

HTTPS (uses certificates in `local-ssl/`, already wired via CLI flags):

```bash
yarn dev-https
```

> Provide your own `local-ssl/cert.pem` and `local-ssl/key.pem` if needed.

## Build & Preview

Build:

```bash
yarn build
```

Local preview (Nitro preview server), or run the built server on port 3001:

```bash
yarn preview

# or run the built output
yarn start
```

## Scripts Overview

```bash
# deps/dev
yarn install
yarn dev
yarn dev-https
yarn build
yarn preview
yarn start

# analyze
yarn analyze

# i18n: export from Google Sheet to JSON (configure ./i18n/google-sheet-to-json.mjs)
yarn create-i18n

# Sequelize (configure DB in models/config/database.js or via env)
yarn createDB
yarn dropDB
yarn migrate
yarn migrate:undo
yarn seed
yarn seedAll

# DB init (drop -> create -> migrate -> seed:all)
yarn initDB

# tests
yarn test:e2e
yarn test:e2e-ui
yarn test:codegen
```

## Env & Config

Keep secrets and endpoints in `.env` (or platform env). `nuxt.config.js` exposes placeholders under `runtimeConfig.public` (mostly commented for opt-in):

- `VITE_GTM_ID`
- `VITE_API_BASE`
- `VITE_SOCKET_IO_BASE_PATH`
- `VITE_GOOGLE_CLIENT_ID`
- `VITE_FACEBOOK_APP_ID` / `VITE_FACEBOOK_API_VERSION`
- `VITE_FIREBASE_*` (API KEY, VAPID KEY, CREDENTIAL, etc.)
- `HTTPS` (control HTTPS behavior if needed)

### Upstash Redis Configuration

The project uses Upstash Redis for real-time data storage in WebRTC features. Configure in `.env`:

- `UPSTASH_REDIS_REST_URL`: Upstash Redis REST API URL
- `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis REST API Token

> **Redis Key Prefix**: All Redis keys use the `nuxt-lab:` prefix (e.g., `nuxt-lab:web-rtc-member-list-{roomId}`) to prevent key collisions when sharing the same Redis instance with other projects.

> Some routes (e.g., Firebase Cloud Messaging) are skipped during prerender via `nitro.hooks['prerender:generate']`.

## PWA Highlights

- `@vite-pwa/nuxt` with `injectManifest`; SW file: `./service-worker/service-worker.js`
- Manifest/icons configured in `nuxt.config.js` → `pwa.manifest`
- Cache size cap: `maximumFileSizeToCacheInBytes: 22MB`
- PWA can be enabled in dev (`devOptions.enabled`)

## Security & Headers

- Integrated `nuxt-security`; production vs dev CSP variants
- Multiple Permissions Policy directives (`camera`, `microphone`, `fullscreen`, etc.)

## Styling & DX

- Vuetify 3 via `vite-plugin-vuetify`
- PostCSS includes `autoprefixer` and `postcss-pxtorem` (all properties)
- Custom `postcss-zerorem` fix to avoid `+ 0` unit issues
- Global SCSS: `style/global.scss`, `style/animation.scss`; `variable.scss` and `mixin.scss` injected via `additionalData`

## 🎨 CSS Development Standards

### CSS Property Order Convention

The project follows mainstream CSS property ordering standards to ensure code consistency and maintainability:

1. **Positioning** (position, top, left, z-index...)
2. **Display & Box Model** (display, flex, width, margin, padding, border...)
3. **Typography** (font, color, text-align...)
4. **Visual** (background, box-shadow, opacity...)
5. **Animation** (transition, animation...)
6. **Misc** (cursor, content...)

**Example**:
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

> 💡 **Note**: In actual development, to keep code concise, you typically don't need to add comments before each property category. Comments are only recommended in complex styles to improve readability.

### CSS Naming Convention

The project adopts a **Modified BEM Naming Convention**, cleverly sacrificing standard BEM's visual symbols (`__`) for better double-click selection efficiency in development tools, while maintaining CSS specificity and state management semantic integrity through SCSS concatenation and HTML attributes.

#### Naming Structure

- **Block**: Single name, e.g., `.countdown`
- **Element**: Single hyphen `-` connecting Block and Element, e.g., `.countdown-down_enter`, `.countdown-up_leave`
- **Sub-Element**: Single hyphen `-` connecting parent and child elements, with underscores `_` separating semantic words within names, e.g.:
  - `.countdown-down_enter-down_enter_up`
  - `.image_upload-preview-img`
- **State Modifiers**: Managed via HTML attribute selectors, e.g., `[css-is-anime-start='true']`, `[css-is-active='true']`
- **Color/Size Variants**: Use HTML attributes, e.g., `[css-color='red']`, `[css-size='small']`

#### HTML Attribute Usage Guidelines

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

#### Root Element Naming Convention

To quickly identify problematic elements in browser dev tools, the project uses the following root element naming convention:

- **Page Root Elements**: Use `[page_name]_page` format
  - Examples: `.hooks_test_page`, `.socket_io_page`, `.web_rtc_page`
- **Component Root Elements**: Use `[component_name]` format
  - Examples: `.scroll_fetch`, `.image_upload`, `.countdown`

**Examples**:
```scss
// Page SCSS (pages/hooks-test/index.vue)
.hooks_test_page {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

// Component SCSS (components/ScrollFetch.vue)
.scroll_fetch {
  position: relative;
  width: 100%;
}
```

#### Advantages

1. ✅ **Double-click Selection** - No `__` interruption, complete class name selection
2. ✅ **SCSS Nesting** - Maintains semantic hierarchy through `&-element`
3. ✅ **Semantic Clarity** - Underscores separate multiple semantic words
4. ✅ **State Management** - Uses HTML attributes instead of modifier classes, reducing class count
5. ✅ **Maintainability** - Preserves good readability and maintainability

**Benefits**:
- ✅ Instantly identify element source in browser DevTools
- ✅ Quickly locate problematic files
- ✅ Easier debugging and maintenance

**Important Rule**:
> 📌 **All elements belonging to a page must be nested under the page root class**, making the hierarchy clear in the code.

```scss
// ✅ Correct: All elements nested under hooks_test_page
.hooks_test_page {
  @extend %test_page;
  
  &-description { }      // .hooks_test_page-description
  &-grid { }             // .hooks_test_page-grid
  &-section {            // .hooks_test_page-section
    &-title { }          // .hooks_test_page-section-title
    &-description { }    // .hooks_test_page-section-description
  }
}

// ❌ Wrong: Can't tell which page description and grid belong to
.hooks_test_page { }
.description { }
.grid { }
```

---

### SCSS Placeholders Style Reuse

The project uses **SCSS Placeholders (`%name`)** to achieve style reuse, reducing code duplication and improving maintainability.

#### Why Use Placeholders?

1. ✅ **Reduce Duplication** - Multiple selectors can inherit the same styles
2. ✅ **Improve Maintainability** - Modify once, affect all inheriting locations
3. ✅ **Better Organization** - Centralize shared styles
4. ✅ **Responsive Support** - Placeholders can use mixins

#### Usage Examples

**Defining Placeholders**:
```scss
// Define at the top of component or page <style> block
%data_block {
  padding: 40px;
  text-align: center;
  border-radius: 8px;
  font-size: 16px;
}

%section_title {
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 20px 0;

  @include tablet {
    font-size: 20px;
  }
  @include mobile {
    font-size: 18px;
  }
}

%data_field {
  padding: 16px;
  text-align: left;

  @include tablet {
    padding: 12px 8px;
  }
  @include mobile {
    padding: 8px 4px;
  }
}
```

**Using Placeholders**:
```scss
.index_page {
  &-list_section {
    &-section_title {
      @extend %section_title;  // Inherit shared styles
    }

    &-loading {
      @extend %data_block;     // Inherit shared styles
      background-color: #e3f2fd;
      color: #1976d2;
    }

    &-error {
      @extend %data_block;     // Inherit shared styles
      background-color: #ffebee;
      color: #c62828;
    }

    &-table {
      &-header {
        @extend %data_field;   // Inherit shared styles
        font-weight: 600;
        color: #ffffff;
      }

      &-cell {
        @extend %data_field;   // Inherit shared styles
        color: #e1e1e1;
      }
    }
  }
}
```

#### Placeholders vs Mixins

**When to Use Placeholders**:
- ✅ Multiple selectors need exactly the same styles
- ✅ Styles don't need parameters (static styles)
- ✅ Want to reduce CSS output size (selectors are merged)

**When to Use Mixins**:
- ✅ Need parameterized styles
- ✅ Need customization based on usage
- ✅ Need conditional logic in styles

**Mixins Example** (Responsive Design):
```scss
// assets/css/mixin.scss
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
.index_page {
  padding: 20px;

  @include tablet {
    padding: 12px;
  }
  @include mobile {
    padding: 8px;
  }
}
```

---

#### Examples

**Example 1: Basic Block and Element**
```scss
.section {
  /* Block styles */
  padding: 20px;
  background-color: #f5f5f5;
  
  &-title {
    // .section-title (Element connected with hyphen -)
    margin-top: 0;
    font-size: 18px;
  }
  
  &-description {
    // .section-description
    color: #666;
    margin-bottom: 15px;
  }
  
  &-content_box {
    // .section-content_box (Multiple semantic words within element name use underscore _)
    padding: 15px;
    background: white;
  }
}
```

**Example 2: Block with Multiple Semantic Words**
```scss
.image_upload {
  // Block name uses underscore _ for multiple words
  position: relative;
  
  &-preview {
    // .image_upload-preview (Element connected with hyphen -)
    width: 100%;
    
    &-img {
      // .image_upload-preview-img (Sub-Element connected with hyphen -)
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  
  &-mask {
    // .image_upload-mask
    &[css-is-dragging='true'] {
      opacity: 0.8;
    }
  }
}
```

**Example 3: State Management**
```scss
.dropdown {
  position: relative;
  
  &-menu {
    // .dropdown-menu
    position: absolute;
    
    &-item {
      // .dropdown-menu-item (Sub-Element)
      padding: 8px;
      cursor: pointer;
    }
  }
}

.key_status {
  padding: 10px;
  
  &[data-pressed='true'] {
    // State managed via HTML attributes
    color: white;
  }
}
```

#### HTML Usage Example

**Using Vue Scoped Styles**:
```vue
<template>
  <!-- Example 1: Basic usage -->
  <div class="section">
    <h2 class="section-title">Title</h2>
    <p class="section-description">Description</p>
    <div class="section-content_box">
      Content
    </div>
  </div>

  <!-- Example 2: Nested structure -->
  <div class="image_upload">
    <div class="image_upload-preview">
      <img class="image_upload-preview-img" src="..." />
    </div>
    <div class="image_upload-mask" css-is-dragging="true">
      <p>Drop image here</p>
    </div>
  </div>

  <!-- Example 3: Dropdown menu -->
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-menu-item">Option 1</div>
      <div class="dropdown-menu-item">Option 2</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// Component styles here
</style>
```

#### Key Principles

1. **Each element uses only one className** - Don't combine multiple classes
2. **Each element MUST have a UNIQUE className** - Critical for two reasons:
   - **CSS relies primarily on class names** for styling (not tag selectors)
   - **Quick DOM debugging** - Instantly identify which element has issues in DevTools
   - ❌ Bad: `.footer-links a { ... }` (targeting tag)
   - ✅ Good: `.footer-link { ... }` (unique class)
   - ✅ Exception: Dynamic content areas (e.g., `.content p { ... }`)
   - ✅ Exception: Third-party content (e.g., WangEditor)
3. **All elements within a Block should be children of that Block** - Connected with hyphen `-`
4. **Multiple semantic words within element names use underscore `_`** - e.g., `content_box`, `value_display`
5. **States use HTML attributes** - e.g., `[css-is-active='true']`, `[data-pressed='true']`
6. **CSS-related HTML attributes must start with `css-` prefix** - e.g., `css-is-active`, `css-is-dragging`, to avoid conflicts with native attributes and to clearly identify that the prop is intended for CSS usage when passing through component hierarchies
7. **CSS variable names must use underscore `_` instead of hyphen `-`** - e.g., `--color_primary`, `--font_size_base`, enabling double-click selection of complete variable names in editorsion via double-click in code editors

#### Inline Styles Exceptions

While the project follows CSS modularization and BEM naming conventions, inline styles are allowed in the following cases:

1. **CSS Variable Passing** (including dynamic calculated values)
   ```vue
   <!-- ✅ Allowed: Passing static or dynamic values via CSS variables -->
   <div :style="{ '--editor_height': `${height}px` }">
   <div :style="{ '--offset_y': `${offsetY}px` }">
   ```
   > 💡 **Reason**: Implement dynamic values through CSS variables, keeping style logic in CSS and improving component flexibility
   
   ```scss
   // Use CSS variables in SCSS
   .element {
     height: var(--editor_height);
     transform: translateY(var(--offset_y));
   }
   ```

2. **Third-party Library Requirements**
   ```vue
   <!-- ✅ Allowed: Google Tag Manager and other third-party requirements -->
   <noscript :style="{ display: 'none', visibility: 'hidden' }">
   ```

**❌ Inline Styles to Avoid**:
- Static style values (should use CSS classes)
- Dynamic calculated values (should use CSS variable passing)
- Predictable conditional styles (should use CSS attribute selectors)
- Repeated style patterns (should extract as placeholders or mixins)


All components in this project follow these CSS conventions to ensure code style consistency.

### CSS File Organization

The project adopts a **Hybrid Style Organization** strategy, combining centralized global tool management with component-specific styles placed nearby:

#### Directory Structure

```
parker-nuxt-lab/
├── app/
│   ├── assets/
│   │   └── styles/           # Global style tools (centralized)
│   │       ├── global.scss   # Global styles
│   │       ├── mixin.scss    # Mixins (reusable style functions)
│   │       ├── variable.scss # Variable definitions
│   │       ├── animation.scss # Animation utilities
│   │       └── customize-ripple.scss # Ripple effect customization
│   │
│   ├── components/            # Component-specific styles (co-located)
│   │   ├── Button.vue
│   │   │   └── <style scoped> # Component styles
│   │   └── Tabs/
│   │       └── Bar.vue
│   │           └── <style scoped>
│   │
│   └── pages/                 # Page-specific styles (co-located)
    └── index.vue
        └── <style scoped>    # Page styles
```

#### Style Placement Principles

1. **Global Tools** → `app/assets/styles/` directory
   - ✅ Mixins (`@mixin`) - Parameterized style functions
   - ✅ Variable definitions
   - ✅ Global styles
   - ✅ Animation utilities

2. **Component Styles** → Within component file
   - ✅ Co-located with component template
   - ✅ Use `<style lang="scss">` for component-specific styles (no `scoped` needed with BEM naming)
   - ✅ Use `<style scoped lang="scss">` only when overriding external package components or existing components (requires `:deep()` for style penetration)
   - ✅ Contains only component-specific styles

3. **Page Styles** → Within `pages/` directory
   - ✅ Co-located with page files
   - ✅ Use `<style scoped lang="scss">` to avoid global pollution
   - ✅ Contains only page-specific styles
   - ✅ **Each page must have a unique root class name** (e.g., `.hooks_test_page`, `.socket_io_page`)

> ⚠️ **Important Rules**:
> - Do NOT share CSS class names between pages (e.g., don't use `.web_rtc_room_page` in multiple pages). This helps quickly identify the corresponding file when debugging in browser DevTools.
> - If multiple pages have similar DOM structures, create a **reusable component** in `components/` that accepts CSS class names as props, rather than sharing a single CSS file.

#### Component Organization

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

#### Mixins & Placeholders Usage

**Mixins (`@mixin`)** - Currently Used:
```scss
// app/assets/styles/mixin.scss
@mixin flex-layout($gap: 12px) {
  display: flex;
  gap: $gap;
}

// Usage in component
.my-class {
  @include flex-layout(16px);  // Accepts parameters, more flexible
}
```

**Placeholders (`%name`)** - Optional for Future Needs:

> **Note**: If you need reusable style inheritance for future maintenance, create `app/assets/styles/placeholders.scss`.

```scss
// app/assets/styles/placeholders.scss (create when needed)
%flex {
  display: flex;
}

%text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// Usage in component
.my-class {
  @extend %flex;           // Merges selectors, reduces duplicate CSS
  @extend %text-ellipsis;  // Reusable style inheritance
}
```

**When to Use Placeholders**:
- ✅ When you need the same exact styles across multiple components
- ✅ When you want to reduce CSS output size (selectors are merged)
- ✅ When styles don't need parameters (static styles)

**When to Use Mixins**:
- ✅ When you need parameterized styles
- ✅ When styles need to be customized per usage
- ✅ When you need conditional logic in styles

#### Usage Example

```scss
// Import global tools in component SCSS
@use '@/assets/styles/mixin' as *;
@use '@/assets/styles/variable' as *;

.my-component {
  @include flex-layout(16px);       // Use mixin
  color: $primary-color;            // Use variable
  
  &-item {
    font-size: $font-size-base;

    &-item_title {
      //  style
    }
  }

  &-title {
    //  style
  }
}
```

#### Advantages

1. ✅ **Centralized Management** - Global tools are easy to maintain and update
2. ✅ **Co-location** - Component and page styles are easy to find
3. ✅ **Flexibility** - Mixins provide parameterized style functions
4. ✅ **Consistency** - Variables ensure consistent design tokens
5. ✅ **Maintainability** - Clear separation of concerns

All style files in this project follow these organizational principles to ensure consistency and maintainability in style management.

**Detailed Documentation**:

- [CSS Naming Convention Audit Plan](./docs/in-progress/css-naming-audit-plan.md)
- [CSS Naming Convention Quick Reference](./docs/in-progress/css-naming-quick-reference.md)
- [CSS Naming Convention Progress](./docs/in-progress/css-naming-progress.md)

## 🛠️ Vue/Nuxt Development Standards

### Dynamic Components with Auto-Imported Components (MANDATORY)

When using auto-imported components (like `NuxtLink`, `NuxtImg`) inside a dynamic `<component :is="...">`, you **MUST** use `resolveComponent()` to properly reference them:

```vue
<script setup>
import { resolveComponent } from 'vue';

// ✅ Correct: Use resolveComponent to get auto-imported component
const NuxtLink = resolveComponent('NuxtLink');
</script>

<template>
  <!-- ✅ Works correctly -->
  <component :is="disabled ? 'div' : NuxtLink" :to="to">
    Content
  </component>
</template>
```

**Why?** Auto-imported components are not available as runtime variables in `<script setup>`. Without `resolveComponent()`, you'll get:
> `[Vue warn]: Property "NuxtLink" was accessed during render but is not defined on instance.`

## Realtime / Media Pages

- `pages/socket-test/` (Socket.IO)
- `pages/server-sent-event-test/` (SSE)
- `pages/web-rtc/` (WebRTC / Socket.IO / WebSocket / SSE variants)
  - WebRTC SSE implementation uses Upstash Redis to store room state and member information
  - All Redis keys use the `nuxt-lab:` prefix to avoid conflicts when sharing with other projects
- `pages/firebase/` (FCM demo)

> Socket.IO server-side routes in `server/`; client setup in `plugins/07.socket.client.js` and `composables/useSocketIoClient.js`.
> 
> WebRTC SSE server routes are located in `server/routes/server-sent-event/web-rtc/`, using `@upstash/redis` for real-time data synchronization.

## API & Swagger

- Swagger JSON: `/api/nuxt-server/swagger-docs` (prerendered via `routeRules`)
- Also see `pages/swagger-doc.vue` for UI rendering

## Testing (Vitest + Playwright)

The project uses **Vitest** for unit/integration tests and **Playwright** for E2E tests.

### Test Statistics

- Total tests: 310+
- Pass rate: 97%+
- Utility function coverage: 7/9 (77.8%)
- Vue component coverage: 9/34 (26.5%)

### Testing Philosophy

> 💡 **The goal of testing is to catch bugs, not to achieve coverage metrics.**

The project follows "behavior-driven testing" principles:

**✅ Worth Testing**:
- Pure functions (utilities, validation logic)
- Observable component behavior

**❌ Not Worth Unit Testing**:
- Props existence checks
- CSS styles
- Features requiring browser APIs (use E2E instead)

See [Frontend Testing Guide](./docs/agent-rules/frontend-testing-guide.md) for details.

### Test Commands

```bash
# Unit tests
yarn test:unit
yarn test:unit:watch
yarn test:unit:coverage

# E2E tests
yarn test:e2e
yarn test:e2e-ui
yarn test:codegen
```

## Platform Notes

- Windows: on startup, `@tensorflow/tfjs-node`'s `tensorflow.dll` is copied from `napi-v9` to `napi-v8` to avoid load issues (see logic at top of `nuxt.config.js`).
- macOS: see node-canvas install notes in references.

## Assets & Models

- `public/ai_models`: `face-api.js` weight files
  - Reference: <https://github.com/justadudewhohacks/face-api.js/tree/master>

## 🤖 AI Agent Rules

This project includes coding rules for AI agents (Claude, Cursor, etc.) to ensure consistent code generation:

### Rule Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Quick reference for Claude AI |
| `.cursor/rules/css-conventions.mdc` | CSS/SCSS naming & property order |
| `.cursor/rules/security-policy.mdc` | Security warning policy |
| `.cursor/rules/lint-policy.mdc` | Lint disable comment policy |

### Official Documentation

- **CLAUDE.md**: [Claude Code - Memory & CLAUDE.md](https://docs.anthropic.com/en/docs/claude-code/memory) - Learn how Claude Code uses CLAUDE.md as project-specific instructions
- **.cursor/rules/**: [Cursor Rules Documentation](https://docs.cursor.com/context/rules) - Official guide for configuring Cursor IDE rules

### Documentation

| Document | Description |
|----------|-------------|
| [Agent Rules README](./docs/agent-rules/README.md) | Complete agent rules overview |
| [CSS Conventions](./docs/agent-rules/css-conventions.md) | Detailed CSS/SCSS standards |
| [Frontend Testing Guide](./docs/agent-rules/frontend-testing-guide.md) | Testing design principles |

> 💡 Human developers can also reference these rules for consistent coding practices.

## References

- Nuxt 4 Docs: <https://nuxt.com/docs/getting-started/introduction>
- Deployment: <https://nuxt.com/docs/getting-started/deployment>
- face-api.js models (weights): <https://github.com/justadudewhohacks/face-api.js/tree/master>
- node-canvas (macOS): <https://github.com/Automattic/node-canvas>

