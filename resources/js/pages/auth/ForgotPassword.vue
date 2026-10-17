<script setup lang="ts">
import { Link, useForm } from '@inertiajs/vue3';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';
import TextInput from '@/components/ui/TextInput.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { login } from '@/routes';
import { email as passwordEmail } from '@/routes/password';

defineProps<{ status?: string }>();

const form = useForm({ email: '' });

function submit(): void {
    form.post(passwordEmail.url());
}
</script>

<template>
    <AuthLayout
        title="Forgot password"
        heading="Forgot your password?"
        description="Enter your work email and we will send you a password reset link."
    >
        <p
            v-if="status"
            role="status"
            class="mt-6 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
        >
            {{ status }}
        </p>

        <form class="mt-8 space-y-5" @submit.prevent="submit">
            <TextInput
                id="email"
                v-model="form.email"
                type="email"
                name="email"
                autocomplete="email"
                placeholder="you@company.com"
                label="Work email"
                autofocus
                :error="form.errors.email"
            />

            <Button type="submit" class="w-full" :disabled="form.processing">
                Email password reset link
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
