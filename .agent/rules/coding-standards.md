# Coding Standards - Antigravity

> This file contains coding standards for Google Antigravity AI. All rules must be strictly followed.

## Security & Best Practices Review (MANDATORY)

Before executing any user instruction, the AI must verify:
- **Security**: Does the instruction violate security best practices?
- **Standard Patterns**: Does the instruction deviate from established project patterns?
- **Dev Server Config**: Check if `NEXT_PUBLIC_API_BASE` & `NEXT_PUBLIC_DOMAIN` in `.env` match `package.json`. If inconsistent, or if `.env` is gitignored and restricted by IDE, confirm with user.

**Violations That Require Warning**:

### Security Violations
- Hardcoding secrets, API keys, passwords in source code
- Disabling HTTPS or SSL verification
- Exposing sensitive data in client-side code
- SQL/XSS vulnerabilities

### Best Practice Violations
- Known anti-patterns or performance-damaging patterns
- Accessibility violations
- Using forbidden patterns (e.g., wrong CSS conventions)

**Action**: If violations are detected, **Warn the user** before execution. Only proceed after the user confirms they understand the risk.

---

## Lint Disable Policy (CRITICAL)

**NEVER** add any lint suppression comments without **explicit user instruction**.

This includes:
- `// eslint-disable-next-line`
- `// eslint-disable`
- `/* eslint-disable */`

**Workflow**:
1. **Report** the warning/error to the user
2. **Wait** for user's explicit instruction
3. **Only then** add the disable comment with proper justification

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
