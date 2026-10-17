---
name: vue-styling-standards
description: Tailwind v4 utility-first styling with cn() (clsx + tailwind-merge), responsive, a11y, dark mode
---
# Skill: Vue Styling Standards (Tailwind v4 Utility-First)

## 1. Utility-First with `cn()`

Use Tailwind utility classes directly in templates. Compose conditionally with `cn()` from `@/lib/utils` (`clsx` + `tailwind-merge`).

```vue
<script setup lang="ts">
import { cn } from '@/lib/utils';

const props = defineProps<{ isActive?: boolean }>();
</script>

<template>
    <button :class="cn('px-4 py-2 rounded-md text-sm font-medium', props.isActive && 'bg-black text-white dark:bg-white dark:text-black')">
        Click
    </button>
</template>
```

## 2. Global CSS

Keep global styles in `resources/css/app.css` (Tailwind v4). Use `@theme inline` for design tokens. Avoid writing component-scoped CSS files unless there's a strong, isolated need.

## 3. Responsive & Dark Mode

Use Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) mobile-first. Use `dark:` variants with `dark` class on html/body as configured.

## 4. Component Variants (optional)

For reusable component variants, use `cva` + `cn()`. Keep variants co-located with the component.

```typescript
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
    {
        variants: {
            variant: { default: 'bg-black text-white', ghost: 'hover:bg-gray-100' },
            size: { sm: 'h-8 px-3', md: 'h-10 px-4' },
        },
        defaultVariants: { variant: 'default', size: 'md' },
    },
);

export function buttonClass(opts: { variant?: string; size?: string; class?: string }) {
    return cn(buttonVariants({ variant: opts.variant as any, size: opts.size as any }), opts.class);
}
```

## 5. Accessibility

- Use semantic elements (`button`, `a`, `nav`, `main`, `section`, `header`, `footer`).
- Ensure focus-visible styles: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`.
- Minimum touch target **44x44px** on mobile for interactive elements.
- Use `aria-*` when no visible text exists.

## 6. Visual Consistency

- Prefer design tokens via `@theme` over hardcoded hex values.
- Keep spacing/typography consistent with Tailwind scale.
- Avoid inline `style` except for truly dynamic values (e.g. CSS vars from props).
- Use `transition-*`/`duration-*` sparingly and purposefully.

## 7. Formatting
Follow [vue-formatting-standards](../vue-formatting-standards/SKILL.md) (4 spaces, 80 cols, single quotes). Tailwind classes should be readable; group logically (layout → spacing → typography → colors → states). `vite-plus`'s `sortTailwindcss` helps when enabled.

## 8. Related
- [tailwindcss-development](../tailwindcss-development/SKILL.md) — canonical Tailwind guidance
- [vue-ux-ui-standards](../vue-ux-ui-standards/SKILL.md) — UX/a11y patterns
- [vue-component-standard](../vue-component-standard/SKILL.md) — flat file structure (no styles.css required by default)