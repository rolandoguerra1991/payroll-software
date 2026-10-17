---
name: vue-form-validation
description: Form validation with Inertia — useForm, <Form> errors, Laravel validation as source of truth
---
# Skill: Form Validation (Inertia + Laravel)

## 1. Laravel is the Source of Truth
- Validation rules live in **Laravel Form Requests** (`App\Http\Requests\...`) or controller validation.
- Frontend validation is optional UX (clear on input, disable submit while processing). Never duplicate all rules client-side unless necessary.
- Server returns errors via Inertia `errors` prop; `useForm` and `<Form>` expose them.

## 2. useForm (programmatic)
Use `useForm` from `@inertiajs/vue3` for controlled forms.

```vue
<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';

const form = useForm({
    email: '',
    password: '',
    password_confirmation: '',
});

function submit() {
    form.post('/register', {
        onSuccess: () => form.reset('password', 'password_confirmation'),
    });
}
</script>

<template>
    <form @submit.prevent="submit">
        <div>
            <label for="email">Email</label>
            <input id="email" v-model="form.email" type="email" @input="form.clearErrors('email')">
            <span v-if="form.errors.email">{{ form.errors.email }}</span>
        </div>

        <div>
            <label for="password">Password</label>
            <input id="password" v-model="form.password" type="password" @input="form.clearErrors('password')">
            <span v-if="form.errors.password">{{ form.errors.password }}</span>
        </div>

        <button type="submit" :disabled="form.processing">Register</button>
    </form>
</template>
```

## 3. <Form> Component (declarative)
Prefer `<Form>` for simple cases. It handles processing, errors, progress, and success states.

```vue
<script setup lang="ts">
import { Form } from '@inertiajs/vue3';
</script>

<template>
    <Form action="/login" method="post" #default="{ errors, processing, wasSuccessful, clearErrors }">
        <div>
            <input name="email" type="email" @input="clearErrors('email')">
            <span v-if="errors.email">{{ errors.email }}</span>
        </div>
        <div>
            <input name="password" type="password" @input="clearErrors('password')">
            <span v-if="errors.password">{{ errors.password }}</span>
        </div>
        <button type="submit" :disabled="processing">Login</button>
        <div v-if="wasSuccessful">Logged in</div>
    </Form>
</template>
```

## 4. UX Rules
- Clear field errors on `@input`/`@blur` where helpful.
- Disable submit while `processing`.
- Keep messages user-friendly (Laravel already returns localized messages).
- Don't duplicate server rules client-side unless it improves UX significantly.
- For Wayfinder-backed forms, you can bind `v-bind="action.form()"` where `action` comes from `@/actions/...`. See [wayfinder-development](../wayfinder-development/SKILL.md).
- Use [vue-constants-standard](../vue-constants-standard/SKILL.md) for UI labels/placeholders, not validation messages.
- Prefer [vue-error-handling](../vue-error-handling/SKILL.md) for non-form errors.