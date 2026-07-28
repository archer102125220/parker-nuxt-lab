---
applyTo:
  - "**/*.vue"
---

# Vue/Nuxt Coding Rules

## Dynamic Components with Auto-Imported Components (MANDATORY)

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

<rationale>
Auto-imported components are not available as runtime variables in `<script setup>`. Without `resolveComponent()`, you'll get the error:

> `[Vue warn]: Property "NuxtLink" was accessed during render but is not defined on instance.`
</rationale>

### Common Auto-Imported Components That Need This Treatment

- `NuxtLink`
- `NuxtImg`
- `NuxtPicture`
- `ClientOnly`
- Any component auto-imported from `components/` directory

<example type="bad">
  <description>Incorrect Usage: Direct referencing of NuxtLink in template</description>
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
</example>
### Template Text Formatting & I18n (MANDATORY)

To facilitate manual editing, localization, and to strictly adhere to **Vue I18n Official Best Practices**, **DO NOT intersperse HTML tags within plain text sentences**.

1. **No Inline Tags in Sentences**: Avoid placing tags like `<b>`, `<code>`, or `<span>` directly in the middle of a continuous text block in the template.
2. **Explicit Separation**: If a block of text has a title, label, or icon, explicitly separate them into distinct structural HTML elements (e.g., using `-title` and `-desc` BEM elements).
3. **Component Interpolation for I18n**: If a sentence *must* contain links or dynamic styling in the middle of a translated string, use Vue I18n's `<i18n-t>` component. **NEVER** use `v-html` for translations due to XSS vulnerabilities.

<example type="bad">
  <description>Incorrect: Interspersed HTML</description>
```vue
<li class="item">
  ⚠️
  <b class="item-bold">Note:</b>
  Please configure the <code class="item-code">config.ts</code> file.
</li>
```
</example>

<example type="good">
  <description>Correct: Explicitly Separated</description>
```vue
<li class="item">
  <div class="item-title">
    <span class="item-title-icon">⚠️</span>
    <span class="item-title-text">Note:</span>
  </div>
  <span class="item-desc">Please configure the config.ts file.</span>
</li>
```
</example>

<example type="good">
  <description>Correct: I18n Component Interpolation</description>
```vue
<i18n-t keypath="message.guide" tag="p">
  <template #link>
    <a href="/docs">link</a>
  </template>
</i18n-t>
```
</example>
