<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';

const props = withDefaults(
    defineProps<{
        variant?: Variant;
        href?: string;
        type?: 'button' | 'submit';
    }>(),
    { variant: 'primary', href: undefined, type: 'button' },
);

const base =
    'inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
    primary:
        'bg-blue-600 text-white shadow-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400',
    secondary:
        'bg-slate-900 text-white shadow-sm hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white',
    outline:
        'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800',
    ghost: 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
};

const classes = cn(base, variants[props.variant]);
</script>

<template>
    <Link
        v-if="href"
        :href="href"
        :class="classes"
    >
        <slot />
    </Link>
    <button
        v-else
        :type="type"
        :class="classes"
    >
        <slot />
    </button>
</template>
