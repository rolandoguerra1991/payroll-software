<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3';
import { ref } from 'vue';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';
import TextInput from '@/components/ui/TextInput.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { dashboard as adminDashboard } from '@/routes/admin';
import { request as passwordRequest } from '@/routes/password';

const email = ref('');
const password = ref('');
const remember = ref(false);

function submit(): void {
    router.visit(adminDashboard.url());
}
</script>

<template>
    <AuthLayout
        title="Sign in"
        heading="Sign in"
        description="Access your payroll workspace."
    >
        <form class="mt-8 space-y-5" @submit.prevent="submit">
            <TextInput
                id="email"
                v-model="email"
                type="email"
                name="email"
                autocomplete="email"
                placeholder="you@company.com"
                label="Work email"
            />

            <TextInput
                id="password"
                v-model="password"
                type="password"
                name="password"
                autocomplete="current-password"
                placeholder="••••••••"
                label="Password"
            />

            <div class="flex items-center justify-between">
                <label
                    class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
                >
                    <input
                        v-model="remember"
                        type="checkbox"
                        name="remember"
                        class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900"
                    />
                    Keep me signed in
                </label>
                <Link
                    :href="passwordRequest.url()"
                    class="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    Forgot password?
                </Link>
            </div>

            <Button type="submit" class="w-full">
                Sign in
                <Icon name="arrow-right" class="h-4 w-4" />
            </Button>
        </form>

        <p class="mt-8 text-xs text-slate-500 dark:text-slate-400">
            Accounts are created by Human Resources. Self sign-up is disabled.
        </p>
    </AuthLayout>
</template>
