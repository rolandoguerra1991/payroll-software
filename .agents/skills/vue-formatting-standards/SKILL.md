---
name: vue-formatting-standards
description: Indentation, quotes, semicolons, line length, attribute order, CSS property order (vite-plus/vp)
---
# Skill: Vue Formatting Standards

## 1. General Rules (match repo)
- **Indentation:** 4 spaces (no tabs). `tabWidth: 4`
- **Line Length:** Max 80 characters (`printWidth: 80`)
- **Semicolons:** Mandatory
- **Quotes:**
  - Script (TS/JS): single quotes
  - Template (HTML attributes): double quotes
  - CSS: double quotes
- **Trailing commas:** follow existing style (ES5-friendly)
- **Whitespace:** trim trailing whitespace; final newline

Repo tooling: `vite-plus` via `vp check` / `vp check --fix`. Formatting config lives in `vite.config.ts` (`fmt` block).

## 2. Vue Template Specifics
- **Attribute order:** Follow Vue Style Guide (recommended): `v-for` → `v-if/v-else-if/v-else` → `v-bind`/props → `v-on`/events → `class/style` → `ref/id/key` etc. Keep consistent.
- **Multi-line attributes:** If >2 attributes, put each on new line; closing `>` on new line.
- **Event handlers:** use `@` shorthand.

```vue
<button
    v-if="isVisible"
    class="px-4 py-2"
    :disabled="disabled"
    @click="handleClick"
>
    Save
</button>
```

## 3. TypeScript/JavaScript
- **Imports:** External → Internal `@/` → Local `./`
- **Spacing:** `if (cond) {`, space after `:`, no space `fn()`
- **Types:** prefer explicit types; avoid `any`

## 4. CSS/Utility Classes
- Keep Tailwind classes readable. Group logically (layout → spacing → typography → colors → states → effects).
- `vite-plus` can sort Tailwind classes for `clsx`, `cn`, `cva` using `resources/css/app.css`.

## 5. Enforcement
Run `npm run check:fix` to auto-format per repo config. Don't override with Prettier/ESLint unless repo adds them.