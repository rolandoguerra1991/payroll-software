---
name: vue-unit-testing
description: Unit testing rules with Vitest and Vue Test Utils — tests live in resources/js/tests mirroring the source path as {name}.test.ts, shallowMount, mocking, async, coverage
---
# Skill: Vue 3 Unit Testing

> [!IMPORTANT]
> **Dependencies:** `vitest`, `@vue/test-utils` (See [vue-project-setup](../vue-project-setup/SKILL.md))


## 1. Isolation
- Use `shallowMount` ONLY. Do not render child components.
- Each test file must test **one single component or composable**.

## 2. Test Location & Naming
- Tests live in a dedicated tree: **`resources/js/tests/`**.
- **Never** co-locate tests next to source files.
- Mirror the source path inside `tests/` and name the file `{component/function}.test.ts`.

| Source | Test |
| --- | --- |
| `resources/js/components/atoms/Button.vue` | `resources/js/tests/components/atoms/Button.test.ts` |
| `resources/js/composables/useCounter.ts` | `resources/js/tests/composables/useCounter.test.ts` |
| `resources/js/lib/utils.ts` | `resources/js/tests/lib/utils.test.ts` |
| `resources/js/pages/Welcome.vue` | `resources/js/tests/pages/Welcome.test.ts` |
| `resources/js/layouts/AppLayout.vue` | `resources/js/tests/layouts/AppLayout.test.ts` |

- Always import the subject through the `@/` alias, never with a relative path that
  climbs back out of `tests/`.

```typescript
// Good: mirrors resources/js/lib/utils.ts
import { cn } from '@/lib/utils';
```

```typescript
// Bad: co-located and/or relative import
import { cn } from './utils';
```

## 3. Mocking External Dependencies
- All external functions, services, and modules MUST be mocked with `vi.mock()`.
- Mock at the module level, not inside individual tests.

```typescript
// Good: Module-level mock
import { shallowMount } from '@vue/test-utils';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import UserCard from '@/components/UserCard.vue';
import { useAuth } from '@/composables/useAuth';

vi.mock('@/composables/useAuth', () => ({
  useAuth: vi.fn(() => ({
    user: ref({ name: 'John' }),
    isLoggedIn: ref(true),
  })),
}));

describe('UserCard', () => {
  it('renders user name from composable', () => {
    const wrapper = shallowMount(UserCard);
    expect(wrapper.text()).toContain('John');
  });
});
```

## 4. Testing Emits
- Verify emitted events with `wrapper.emitted()`.
- Assert both the event name and its payload.

```typescript
it('emits "update" with the new value on click', async () => {
  const wrapper = shallowMount(MyButton, {
    props: { label: 'Save' },
  });

  await wrapper.find('button').trigger('click');

  const emitted = wrapper.emitted('update');
  expect(emitted).toHaveLength(1);
  expect(emitted![0]).toEqual([expect.any(PointerEvent)]);
});
```

## 5. Testing Composables
- Test composables in isolation, outside of components, by calling them directly.
- Wrap calls in `withSetup` or use a dummy host component if lifecycle hooks are involved.

```typescript
import { describe, it, expect, vi } from 'vitest';
import { useCounter } from '@/composables/useCounter';

describe('useCounter', () => {
  it('increments the count', () => {
    const { count, increment } = useCounter();

    expect(count.value).toBe(0);
    increment();
    expect(count.value).toBe(1);
  });
});
```

## 6. Async State Updates
- Use `flushPromises()` after triggering async operations.
- Use `await nextTick()` after modifying reactive state that affects the DOM.

```typescript
import { flushPromises } from '@vue/test-utils';

it('shows data after async fetch', async () => {
  const wrapper = shallowMount(UserList);

  await flushPromises(); // Wait for onMounted async calls

  expect(wrapper.findAll('li')).toHaveLength(3);
});
```

## 7. Coverage
- **100% code coverage is mandatory** (branches, lines, functions, statements) and
  it is **enforced per file**: a single under-covered file fails the run and the
  CI job. Run with: `vitest run --coverage` (`npm run test:coverage`).
- The gate lives in `test.coverage.thresholds` (`{ 100: true, perFile: true }`), so
  never lower it and never add an ignore comment to sneak a file through.
- Coverage tracks **production source only**, via an explicit allow-list in
  `vite.config.ts` (`test.coverage.include`). Tests are never listed.
- When you create a **new source folder** under `resources/js/` (e.g. `stores/`,
  `services/`), you MUST add its glob to `test.coverage.include` in the same
  change, otherwise its files silently fall outside the coverage report.

```typescript
// vite.config.ts
coverage: {
    provider: 'v8',
    // `skipFull: false` keeps 100%-covered files visible in the console table;
    // vitest otherwise forces `skipFull: true` when it detects an agent.
    reporter: [['text', { skipFull: false }], 'html'],
    reportsDirectory: 'coverage',
    include: [
        'resources/js/components/**/*.{ts,vue}',
        'resources/js/composables/**/*.{ts,vue}',
        'resources/js/layouts/**/*.{ts,vue}',
        'resources/js/lib/**/*.ts',
        'resources/js/pages/**/*.{ts,vue}',
    ],
    exclude: ['resources/js/components/ui/**'],
    // Every source file must be fully covered; CI fails otherwise.
    thresholds: {
        100: true,
        perFile: true,
    },
},
```

### Reaching 100% with `shallowMount`

`shallowMount` replaces child components with stubs that do **not** render their
default slot. If the only executable code in a source file is a slot passed to a
child (e.g. `<Head><link /></Head>`), that code stays at 0% and the threshold
fails. Enable `renderStubDefaultSlot` so the slot runs while children stay stubbed:

```typescript
const mountWelcome = () =>
    shallowMount(Welcome, {
        global: { renderStubDefaultSlot: true },
    });
```