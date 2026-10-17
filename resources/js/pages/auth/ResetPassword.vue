<script setup lang="ts">
import { Link, useForm } from '@inertiajs/vue3';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';
import TextInput from '@/components/ui/TextInput.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { login } from '@/routes';
import { update as passwordUpdate } from '@/routes/password';

const props = defineProps<{
    email: string;
    token: string;
}>();

const form = useForm({
    token: props.token,
    email: props.email,
    password: '',
    password_confirmation: '',
});

function submit(): void {
    form.post(passwordUpdate.url());
}
</script>

<template>
    <AuthLayout
        title="Reset password"
        heading="Reset your password"
        description="Choose a new password for your account."
    >
        <form class="mt-8 space-y-5" @submit.prevent="submit">
            <TextInput
                id="email"
                v-model="form.email"
                type="email"
                name="email"
                autocomplete="username"
                label="Work email"
                :error="form.errors.email"
            />

            <TextInput
                id="password"
                v-model="form.password"
                type="password"
                name="password"
                autocomplete="new-password"
                placeholder="••••••••"
                label="New password"
                autofocus
                :error="form.errors.password"
            />

            <TextInput
                id="password_confirmation"
                v-model="form.password_confirmation"
                type="password"
                name="password_confirmation"
                autocomplete="new-password"
                placeholder="••••••••"
                label="Confirm password"
            />

            <Button type="submit" class="w-full" :disabled="form.processing">
                Reset password
                <Icon name="arrow-right" class="h-4 w-4" />
            </Button>
        </form>

        <p class="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            <Link
                :href="login.url()"
                class="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
                Back to sign in
            </Link>
        </p>
    </AuthLayout>
</template>
