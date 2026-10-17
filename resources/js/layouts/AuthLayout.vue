<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import Icon from '@/components/ui/Icon.vue';
import { useTheme } from '@/composables/useTheme';

defineProps<{
    title: string;
    heading: string;
    description: string;
}>();

const highlights: string[] = [
    'Payslips, bonuses and deductions in one place',
    'Attendance, schedules and time off tracking',
    'Employee records always up to date',
];

const { theme, toggleTheme } = useTheme();
</script>

<template>
    <div class="flex min-h-screen bg-white dark:bg-slate-950">
        <Head :title="title" />

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
                    {{ heading }}
                </h1>
                <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {{ description }}
                </p>

                <slot />
            </div>
        </div>
    </div>
</template>
