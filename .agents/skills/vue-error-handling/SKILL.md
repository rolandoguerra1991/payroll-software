---
name: vue-error-handling
description: Centralized error handling for Inertia — server errors, form errors, HTTP exceptions, toasts, error boundaries
---
# Skill: Error Handling (Inertia)

## 1. Error Categories

| Category | Example | Handling |
|---|---|---|
| **Form/Validation** | 422 | Display via `useForm.errors` / `<Form>` errors; inline per field (see [vue-form-validation](../vue-form-validation/SKILL.md)). |
| **Auth** | 401/419 (CSRF/session) | Let Inertia handle redirects or redirect to login; don't manually force unless necessary. |
| **Permission/Forbidden** | 403 | Show toast/alert and optionally redirect; use [vue-ux-ui-standards](../vue-ux-ui-standards/SKILL.md) for feedback. |
| **Not Found** | 404 | Let Laravel's Inertia error handling render 404 page, or show empty state. |
| **Server Error** | 500+ | Show user-friendly message via toast; log details server-side. |
| **Network/HTTP Exception** | networkError/httpException | Handle via Inertia router events if needed (`router.on('httpException', ...)`, `router.on('networkError', ...)`) or show fallback UI. |

## 2. Form Errors (Preferred)

Use `useForm` or `<Form>` from `@inertiajs/vue3`. Never duplicate validation messaging logic.

```vue
<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';

const form = useForm({ email: '' });

function submit() {
    form.post('/subscribe', {
        onError: () => {
            // form.errors already populated; optionally show toast for general errors
        },
    });
}
</script>
```

## 3. Non-Form Errors (Toasts/Alerts)

For standalone actions (e.g. delete via Wayfinder action called imperatively), catch and show feedback. Keep messages in constants (see [vue-constants-standard](../vue-constants-standard/SKILL.md)).

```typescript
import { router } from '@inertiajs/vue3';
import { showToast } from '@/composables/useToast'; // if exists
import { MESSAGES } from '@/constants/messages';

async function deleteItem(id: string) {
    try {
        router.delete(`/items/${id}`);
    } catch (e) {
        showToast({ type: 'error', message: MESSAGES.GENERIC_ERROR });
    }
}
```

Note: Inertia visits are async in effect but `router.visit/delete/post` doesn't always throw synchronously; prefer `onError`/`onFinish` callbacks or Inertia error events for visit-based flows.

## 4. Global Inertia Error Handling

Use router events for app-wide handling when appropriate:
```typescript
import { router } from '@inertiajs/vue3';

router.on('httpException', (event) => {
    // event.detail.response?.status
    // show toast/fallback; avoid blocking navigation
});

router.on('networkError', () => {
    // show offline/retry message
});
```

## 5. Error Boundaries (Render Errors)

Catch unexpected render errors in components. Place at layout level if desired.

```vue
<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue';

const hasError = ref(false);
onErrorCaptured((err) => {
    console.error('[ErrorBoundary]', err);
    hasError.value = true;
    return false; // prevent propagation
});

function retry() {
    hasError.value = false;
}
</script>

<template>
    <div v-if="hasError">
        <p>Something went wrong.</p>
        <button @click="retry">Retry</button>
    </div>
    <slot v-else />
</template>
```

## 6. Rules
- Never expose raw stack traces or HTTP bodies to end users.
- Prefer server-side validation (Laravel) as source of truth.
- Use [vue-ux-ui-standards](../vue-ux-ui-standards/SKILL.md) for loading/success/error states.
- Keep messages centralized in `constants/messages.ts`.