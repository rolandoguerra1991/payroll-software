<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3';
import { ref } from 'vue';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';
import TextInput from '@/components/ui/TextInput.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { login } from '@/routes';

const email = ref('carlos.mendez@company.com');
const password = ref('');
const passwordConfirmation = ref('');

function submit(): void {
    router.visit(login.url());
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
                v-model="email"
                type="email"
                name="email"
                autocomplete="username"
                label="Work email"
            />

            <TextInput
                id="password"
                v-model="password"
                type="password"
                name="password"
                autocomplete="new-password"
                placeholder="••••••••"
                label="New password"
                autofocus
            />

            <TextInput
                id="password_confirmation"
                v-model="passwordConfirmation"
                type="password"
                name="password_confirmation"
                autocomplete="new-password"
                placeholder="••••••••"
                label="Confirm password"
            />

            <Button type="submit" class="w-full">
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
