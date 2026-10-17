---
name: vue-component-standard
description: Component/view structure — flat .vue files preferred (matching starter kit), co-located types, tests in resources/js/tests
---
# Skill: Vue Component & View Standard

## 1. Standard Alignment
- **Architecture:** [vue-architecture-roles](../vue-architecture-roles/SKILL.md)
- **Styles:** [vue-styling-standards](../vue-styling-standards/SKILL.md) (Tailwind utility-first + cn())
- **Testing:** [vue-unit-testing](../vue-unit-testing/SKILL.md) (Vitest)
- **Coding:** [vue-coding-standards](../vue-coding-standards/SKILL.md)

## 2. File Structure (Flat Preferred)
Match the starter kit: prefer **flat `.vue` files**.

- **Simple component:** `ComponentName.vue`
- **With types:** `ComponentName.vue` + `ComponentName.types.ts` (or `types.ts` only if in folder; but prefer co-located)
- **With unit tests:** test goes in `resources/js/tests/` mirroring the source path as `ComponentName.test.ts` (never co-located)
- **Complex component (rare):** folder `ComponentName/index.vue`, optional `types.ts`; test at `resources/js/tests/.../ComponentName.test.ts`

Default: **flat files**. Create folders only when justified.

Locations:
- Pages: `resources/js/pages/`
- Layouts: `resources/js/layouts/`
- Components: `resources/js/components/` (grouped by atoms/molecules/organisms as needed)
- Tests: `resources/js/tests/` (mirrors the source tree)

## 3. Implementation Rules
- **Template:** Single root element (Fragment via `<template>` is fine; ensure valid single root in SFC).
- **Props/Emits:** Type-based via `defineProps`/`defineEmits` with external types when reusable ([vue-typescript-rules](../vue-typescript-rules/SKILL.md)).
- **Naming:** PascalCase for component files/names; kebab-case in templates is fine.
- **Testing:** Tests live in `resources/js/tests/`, mirroring the source path as `{ComponentName}.test.ts` ([vue-unit-testing](../vue-unit-testing/SKILL.md)).
- **Wayfinder:** For links to backend, prefer `<Link>` from Inertia or Wayfinder-generated URLs ([wayfinder-development](../wayfinder-development/SKILL.md)).
- **Data access:** Follow [vue-api-integration](../vue-api-integration/SKILL.md).