---
name: vue-architecture-roles
description: Layouts vs Pages vs Components — responsibilities, locations, strict rules
---
# Skill: Architectural Roles (Layouts, Pages & Components)

## 1. Layout (Structural Wrapper)
- **Location:** `resources/js/layouts/` (or inside a feature if needed).
- **Responsibility:** Structural skeleton (Header, Sidebar, Footer). Persist across page changes.
- **Inertia:** Use persistent layouts via `defineOptions({ layout: Component })` or wrap in a layout component. Do **not** use `<router-view />` (Inertia handles rendering).
- **Naming:** Must end with `Layout` (e.g., `MainLayout`).
- **Standard:** Follow the directory structure conventions for components (see [vue-component-standard](../vue-component-standard/SKILL.md)).

## 2. Page / View (Orchestrator)
- **Location:** `resources/js/pages/` (Inertia standard).
- **Responsibility:** Orchestration, receives props from server, fetches via Inertia (`useForm`, `useHttp`, `router.visit`) or Wayfinder, passes data to children.
- **Structure:** Can be flat `.vue` files (match starter kit style). Keep lean; extract UI to components.
- **Strict Rule:** ALL pages MUST follow conventions defined in [vue-component-standard](../vue-component-standard/SKILL.md) where applicable.

## 3. Component (Presentation/UI)
- **Location:** `resources/js/components/`. Group by feature or by atomic levels (`atoms/`, `molecules/`, `organisms/`) if using Atomic Design (see [vue-atomic-design](../vue-atomic-design/SKILL.md)).
- **Responsibility:** Rendering data and emitting UI events. No direct server orchestration beyond props/emits.
- **Prohibition:** MUST NOT import API services to trigger arbitrary global side effects outside of what props/composables provide. Follow [vue-api-integration](../vue-api-integration/SKILL.md) for data access patterns.

## 4. Quick Rules
- Pages receive server state via Inertia props.
- Layouts are persistent wrappers (no router-view).
- Components are pure/presentational where possible.
- Use [wayfinder-development](../wayfinder-development/SKILL.md) for linking to backend routes.