---
name: vue-project-setup
description: Core dependencies, Tailwind v4 Vite config, VS Code settings, EditorConfig, formatting via vite-plus (vp)
---
# Skill: Vue Project Setup (Laravel + Inertia)

## 1. Mandatory Dependencies

### Current (repo)
- `@inertiajs/vue3`, `@inertiajs/vite` — Inertia v3
- `@vitejs/plugin-vue` — Vue SFC
- `tailwindcss`, `@tailwindcss/vite` — Tailwind v4
- `vite` + `vite-plus` — build/dev/lint/fmt
- `@laravel/vite-plugin-wayfinder` — typed routes/actions generation
- `laravel-vite-plugin` + fonts (bunny)

### Planned/Add when needed
- **State:** `pinia`
- **Unit Testing:** `vitest`, `@vue/test-utils`
- **E2E Testing:** `playwright`

Add them with `npm i` as required.

## 2. Tailwind CSS v4

Integrated with Vite (repo uses `vite-plus` and the `tailwindcss()` plugin). See `vite.config.ts`.

```typescript
// vite.config.ts (canonical style)
import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import { defineConfig, lazyPlugins } from 'vite-plus';

export default defineConfig({
    plugins: lazyPlugins(() => [
        laravel({ input: ['resources/css/app.css', 'resources/js/app.ts'], refresh: true, fonts: [bunny('Instrument Sans', { weights: [400, 500, 600] })] }),
        inertia(),
        tailwindcss(),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        wayfinder({ formVariants: true }),
    ]),
});
```

Main CSS: `resources/css/app.css`
```css
@import 'tailwindcss';

@source '../../vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php';
@source '../../storage/framework/views/*.php';

@theme inline {
    --font-sans: Instrument Sans, ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}
```

## 3. Formatting & Linting

Use `vite-plus` (`vp`). Repo config in `vite.config.ts` under `fmt`/`lint`.

Commands:
- `npm run check` — check
- `npm run check:fix` — autofix
- `npm run types:check` — vue-tsc

Formatting rules (match repo):
- **indentation:** 4 spaces, `tabWidth: 4`
- **printWidth:** 80
- **quotes:** single quotes
- **semicolons:** true
- **htmlWhitespaceSensitivity:** css
- **ignorePatterns:** vendor/node_modules/public/bootstrap/ssr, UI components, routes, actions, wayfinder, etc.
- **sortTailwindcss:** for `clsx`, `cn`, `cva` using `resources/css/app.css`

Do **not** introduce Prettier/ESLint standalone configs unless explicitly requested; follow `vite-plus` conventions.

## 4. VS Code (recommended)

`.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit"
  },
  "typescript.preferences.quoteStyle": "single",
  "javascript.preferences.quoteStyle": "single",
  "editor.insertSpaces": true,
  "editor.tabSize": 4,
  "files.trimTrailingWhitespace": true
}
```

`.editorconfig` (if added, keep in sync with 4 spaces):
```ini
[*]
indent_style = space
indent_size = 4
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

## 5. TypeScript Paths

`tsconfig.json` uses `@/*` → `./resources/js/*`. Keep imports via `@/...`.

## 6. Wayfinder

This project uses `@laravel/vite-plugin-wayfinder` to generate typed `@/actions` and `@/routes`. Regenerate after route changes if needed: `php artisan wayfinder:generate --no-interaction` (or use `--with-form`). See [wayfinder-development](../wayfinder-development/SKILL.md).