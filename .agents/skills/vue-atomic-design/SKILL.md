---
name: vue-atomic-design
description: Atomic Design — Atoms, Molecules, Organisms hierarchy, mandatory extraction, naming
---
# Skill: Atomic Design for Vue Components

## 1. Component Decomposition Levels

| Level | Role | Location | Examples |
|---|---|---|---|
| **Atoms** | Smallest UI unit, no business logic | `resources/js/components/atoms/` | `BaseButton`, `BaseIcon`, `BaseInput`, `BaseTag` |
| **Molecules** | Group of atoms working together | `resources/js/components/molecules/` | `SearchBar` (Input + Button), `FormField` (Label + Input + Error) |
| **Organisms** | Complex sections with business context | `resources/js/components/organisms/` | `UserCard`, `NavigationBar`, `CommentThread` |
| **Templates** | Page structure composed of organisms | Handled via Layouts/Pages | Structural wrappers |
| **Pages** | Orchestrators that inject data | `resources/js/pages/` | See [vue-architecture-roles](../vue-architecture-roles/SKILL.md) |

## 2. Mandatory Extraction Rule
- If a piece of UI could logically be used in another component, extract it.
- Indicators: own visual identity, accepts its own data (props), appears in multiple contexts.
- When in doubt, extract.

## 3. Naming Conventions
- **Atoms:** Prefix with `Base` (e.g., `BaseButton`, `BaseIcon`).
- **Molecules & Organisms:** Descriptive, domain-aware names.
- Follow [vue-component-standard](../vue-component-standard/SKILL.md). Flat `.vue` files are preferred to match starter kit; use folders only if you add co-located types per component. Tests always go in `resources/js/tests/` mirroring the source path.

## 4. Props, Emits & Slots
- **Atoms:** Highly configurable via props/slots. No business logic or server calls.
- **Molecules:** Compose atoms; communicate upward via emits.
- **Organisms:** May use composables/Pinia per [vue-coding-standards](../vue-coding-standards/SKILL.md).

## 5. Implementation Flow
1. Identify atoms first
2. Compose molecules
3. Assemble organisms
4. Integrate into pages via layouts

## 6. Folder Organization Example
```
resources/js/components/
├── atoms/
│   └── BaseButton.vue
├── molecules/
│   └── SearchBar.vue
└── organisms/
    └── UserCard.vue
```

Tests mirror this tree under `resources/js/tests/`:
```
resources/js/tests/components/
├── atoms/
│   └── BaseButton.test.ts
├── molecules/
│   └── SearchBar.test.ts
└── organisms/
    └── UserCard.test.ts
```

> Prefer flat `.vue` files. Only create subfolders if you need co-located types (`*.types.ts`). Tests live in `resources/js/tests/` as `{ComponentName}.test.ts`. See [vue-unit-testing](../vue-unit-testing/SKILL.md).