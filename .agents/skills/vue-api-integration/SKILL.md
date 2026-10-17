---
name: vue-api-integration
description: Inertia-native data access — Wayfinder route functions, useHttp for JSON, Pinia actions, service objects, parallel calls
---
# Skill: Vue Inertia Data Access

## 1. Core Principles
- Prefer **Wayfinder** route functions (`@/actions`, `@/routes`) for server endpoints (see [wayfinder-development](../wayfinder-development/SKILL.md)).
- For **JSON-only** endpoints (APIs not returning full Inertia pages), use `useHttp` from `@inertiajs/vue3`.
- Encapsulate data logic in **services** or **Pinia actions**. Don't call endpoints directly from templates.
- Keep types explicit. Never use `any`.

## 2. Service Pattern (explicit, testable)
Define thin service objects that return typed promises. Use Wayfinder functions or fetchers.

```typescript
// services/post.service.ts
import { index, show, store } from '@/actions/App/Http/Controllers/PostController';
import type { Post } from '@/types/post';

export const PostService = {
    async list() {
        // Wayfinder functions return route metadata; for Inertia visits, prefer router.visit
        // For JSON, use useHttp; here we show a simple typed shape if wrapping
        return index();
    },

    async get(id: number): Promise<Post> {
        // If you have a JSON endpoint, wrap with useHttp in composable; keep types here
        return show(id) as unknown as Promise<Post>;
    },

    async create(payload: Partial<Post>) {
        return store.post(payload);
    },
};
```

Note: Wayfinder generates functions matching controller actions. For Inertia page visits, prefer `router.visit` with the generated action's URL/method, or `<Form v-bind="store.form()">`. For JSON endpoints, wrap with `useHttp`.

## 3. useHttp (standalone JSON requests)
Use `useHttp` when you need to hit JSON endpoints without triggering a full Inertia page visit.

```vue
<script setup lang="ts">
import { useHttp } from '@inertiajs/vue3';

const http = useHttp({ query: '' });

function search() {
    http.get('/api/search', {
        onSuccess: (res) => console.log(res),
    });
}
</script>

<template>
    <input v-model="http.query" @input="search">
    <span v-if="http.processing">Searching...</span>
</template>
```

## 4. Pinia Actions (shared client state)
When data needs to live in global client state, put fetch/mutations in Pinia actions (see [vue-state-management](../vue-state-management/SKILL.md)).

```typescript
// stores/post.store.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useHttp } from '@inertiajs/vue3';
import type { Post } from '@/types/post';

export const usePostStore = defineStore('post', () => {
    const posts = ref<Post[]>([]);
    const isLoading = ref(false);
    const http = useHttp();

    async function fetchAll() {
        isLoading.value = true;
        try {
            await http.get('/api/posts', {
                onSuccess: (res) => {
                    posts.value = res as Post[];
                },
            });
        } finally {
            isLoading.value = false;
        }
    }

    return { posts, isLoading, fetchAll };
});
```

## 5. Parallel Calls in Components
Keep orchestration simple in views/components.

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useHttp } from '@inertiajs/vue3';

const http = useHttp();
const users = ref(null);
const posts = ref(null);

onMounted(async () => {
    await Promise.all([
        http.get('/api/users', { onSuccess: (r) => (users.value = r) }),
        http.get('/api/posts', { onSuccess: (r) => (posts.value = r) }),
    ]);
});
</script>
```

## 6. Rules
- Use Wayfinder functions for Inertia-backed endpoints; don't hardcode URLs.
- Use `useHttp` only for JSON endpoints (not for full page navigations).
- For full page navigations, prefer `<Link>` or `router.visit` with Wayfinder.
- Never import axios; rely on Inertia's built-in XHR client.
- Keep services/composables thin; put shared/global state in Pinia actions when needed.
- Type all request/response shapes; externalize in `types.ts` per [vue-component-standard](../vue-component-standard/SKILL.md).