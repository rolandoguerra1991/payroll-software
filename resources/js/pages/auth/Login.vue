<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import { ref } from 'vue';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';
import { useTheme } from '@/composables/useTheme';
import { dashboard as adminDashboard } from '@/routes/admin';

const highlights: string[] = [
    'Payslips, bonuses and deductions in one place',
    'Attendance, schedules and time off tracking',
    'Employee records always up to date',
];

const email = ref('');
const password = ref('');
const remember = ref(false);

const { theme, toggleTheme } = useTheme();

function submit(): void {
    router.visit(adminDashboard.url());
}
</script>

<template>
    <div class="flex min-h-screen bg-white dark:bg-slate-950">
        <Head title="Sign in" />

        <div
            class="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-slate-900 p-12 lg:flex"
        >
            <div
                class="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl"
            />
            <div
                class="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl"
            />

            <div class="relative flex items-center gap-3">
                <span
                    class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white"
                >
                    <Icon name="wallet" class="h-5 w-5" />
                </span>
                <span class="text-sm font-semibold text-white">
                    Payroll Suite
                </span>
            </div>

            <div class="relative max-w-md">
                <h2 class="text-3xl font-semibold text-white">
                    Human resources and payroll, without the spreadsheets.
                </h2>
                <ul class="mt-8 space-y-3">
                    <li
                        v-for="highlight in highlights"
                        :key="highlight"
                        class="flex items-start gap-3 text-sm text-slate-300"
                    >
                        <span
                            class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-300"
                        >
                            <Icon name="check" class="h-3 w-3" />
                        </span>
                        {{ highlight }}
                    </li>
                </ul>
            </div>

            <p class="relative text-xs text-slate-400">
                Internal use only · Payroll Suite 2026
            </p>
        </div>

        <div class="flex w-full flex-col px-6 py-10 lg:w-1/2 lg:px-16">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3 lg:hidden">
                    <span
                        class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white"
                    >
                        <Icon name="wallet" class="h-5 w-5" />
                    </span>
                    <span
                        class="text-sm font-semibold text-slate-900 dark:text-white"
                    >
                        Payroll Suite
                    </span>
                </div>
                <button
                    type="button"
                    class="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                    :aria-label="
                        theme === 'dark'
                            ? 'Switch to light theme'
                            : 'Switch to dark theme'
                    "
                    @click="toggleTheme"
                >
                    <Icon
                        :name="theme === 'dark' ? 'sun' : 'moon'"
                        class="h-5 w-5"
                    />
                </button>
            </div>

            <div class="mx-auto my-auto w-full max-w-md py-10">
                <h1
                    class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white"
                >
                    Sign in
                </h1>
                <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Access your payroll workspace.
                </p>

                <form class="mt-8 space-y-5" @submit.prevent="submit">
                    <div>
                        <label
                            for="email"
                            class="block text-sm font-medium text-slate-700 dark:text-slate-200"
                        >
                            Work email
                        </label>
                        <input
                            id="email"
                            v-model="email"
                            type="email"
                            name="email"
                            autocomplete="email"
                            placeholder="you@company.com"
                            class="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                        />
                    </div>

                    <div>
                        <label
                            for="password"
                            class="block text-sm font-medium text-slate-700 dark:text-slate-200"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            v-model="password"
                            type="password"
                            name="password"
                            autocomplete="current-password"
                            placeholder="••••••••"
                            class="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                        />
                    </div>

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
                        <button
                            type="button"
                            class="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            Forgot password?
                        </button>
                    </div>

                    <Button type="submit" class="w-full">
                        Sign in
                        <Icon name="arrow-right" class="h-4 w-4" />
                    </Button>
                </form>

                <p class="mt-8 text-xs text-slate-500 dark:text-slate-400">
                    Accounts are created by Human Resources. Self sign-up is
                    disabled.
                </p>
            </div>
        </div>
    </div>
</template>
