# Claude Rules

This directory contains rules for Claude AI to ensure consistent code generation following project standards.

## Purpose

These rules are designed to work with:
- **Claude Desktop** - Via `.claude/rules/` directory
- **VS Code Claude Extension** - Automatically detects rules in this directory
- **Claude Code** - Agentic coding assistant

## Synchronization with Cursor Rules

The rules in this directory are synchronized with `.cursor/rules/*.mdc` to ensure consistency across different AI assistants.

### Current Status

✅ **Synchronized**: Rules are kept in sync with Cursor rules
📍 **Source of Truth**: `.cursor/rules/*.mdc`
🔄 **Sync Method**: Manual synchronization (see below)

## Available Rules

All rules from `.cursor/rules/` are available here in Markdown format:

1. `backend-orm.md` - Backend ORM best practices (Sequelize)
2. `css-conventions.md` - CSS/SCSS coding standards
3. `javascript-strict.md` - JavaScript strict type checking
4. `lint-policy.md` - Lint disable and error suppression policy
5. `no-scripts.md` - No scripts for code refactoring policy
6. `security-policy.md` - Security and best practices warning policy
7. `vue-conventions.md` - Vue/Nuxt coding rules

## How to Use

### For Claude Desktop / Claude Code

Rules in this directory are automatically loaded by Claude when working on this project.

### For VS Code

The VS Code Claude extension automatically detects and uses rules from `.claude/rules/`.

## Synchronization Guide

When updating rules, follow this process:

### 1. Update Source (Cursor Rules)

Edit the rule in `.cursor/rules/*.mdc`:

```markdown
---
description: Rule description
globs: ["**/*.vue", "**/*.ts"]
alwaysApply: true
---

# Rule Content
```

### 2. Sync to Claude Rules

Convert the `.mdc` file to `.md` format by:
1. Removing the frontmatter (YAML section)
2. Keeping the Markdown content
3. Saving to `.claude/rules/[same-name].md`

## Rule Format

### Cursor Format (.mdc)
```markdown
---
description: Brief description
globs: ["file patterns"]
alwaysApply: true/false
---

# Rule Content (Markdown)
```

### Claude Format (.md)
```markdown
# Rule Content (Markdown)

Same content as Cursor, without frontmatter
```

## Related Documentation

- **Coding Standards**: `docs/guides/coding-standards.md` - Complete coding standards
- **Cursor Rules**: `.cursor/rules/*.mdc` - Source of truth for rules
