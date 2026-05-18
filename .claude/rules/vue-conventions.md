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
