<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import Badge from '@/components/ui/Badge.vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import Icon from '@/components/ui/Icon.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import PanelLayout from '@/layouts/PanelLayout.vue';
import { payroll } from '@/routes/portal';
import type { IconName } from '@/types';

defineOptions({ layout: PanelLayout });

type Summary = {
    label: string;
    value: string;
    hint: string;
    icon: IconName;
    iconClasses: string;
};

const summary: Summary[] = [
    {
        label: 'Next payment',
        value: '$2,058.00',
        hint: 'October 30, 2026',
        icon: 'wallet',
        iconClasses:
            'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    },
    {
        label: 'My position',
        value: 'Senior Developer',
        hint: 'Technology department',
        icon: 'briefcase',
        iconClasses:
            'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400',
    },
    {
        label: 'My department',
        value: 'Technology',
        hint: 'Manager · Laura Gomez',
        icon: 'building',
        iconClasses:
            'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    },
    {
        label: 'Attendance today',
        value: '08:02',
        hint: 'Checked in on time',
        icon: 'clock',
        iconClasses:
            'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    },
];

const week: {
    day: string;
    date: string;
    status: string;
    variant: 'success' | 'warning' | 'neutral';
}[] = [
    { day: 'Monday', date: 'Oct 12', status: 'On time', variant: 'success' },
    { day: 'Tuesday', date: 'Oct 13', status: 'On time', variant: 'success' },
    { day: 'Wednesday', date: 'Oct 14', status: 'Late', variant: 'warning' },
    { day: 'Thursday', date: 'Oct 15', status: 'On time', variant: 'success' },
    { day: 'Friday', date: 'Oct 16', status: 'Working', variant: 'neutral' },
];

const payslip: { concept: string; amount: string }[] = [
    { concept: 'Base salary', amount: '$2,450.00' },
    { concept: 'Deductions', amount: '-$392.00' },
    { concept: 'Net amount', amount: '$2,058.00' },
];
</script>

<template>
    <div>
        <Head title="My dashboard" />

        <PageHeader
            title="Hello, Carlos"
            description="Friday, October 16, 2026 · Here is your payroll summary."
        >
            <template #actions>
                <Button variant="outline" :href="payroll.url()">
                    <Icon name="wallet" class="h-4 w-4" />
                    View my payroll
                </Button>
            </template>
        </PageHeader>

        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Card v-for="item in summary" :key="item.label" class="p-5">
                <div class="flex items-start justify-between gap-3">
                    <div>
                        <p
                            class="text-sm font-medium text-slate-500 dark:text-slate-400"
                        >
                            {{ item.label }}
                        </p>
                        <p
                            class="mt-2 text-lg font-semibold text-slate-900 dark:text-white"
                        >
                            {{ item.value }}
                        </p>
                        <p
                            class="mt-1 text-xs text-slate-500 dark:text-slate-400"
                        >
                            {{ item.hint }}
                        </p>
                    </div>
                    <span
                        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                        :class="item.iconClasses"
                    >
                        <Icon :name="item.icon" class="h-5 w-5" />
                    </span>
                </div>
            </Card>
        </div>

        <div class="mt-6 grid gap-6 lg:grid-cols-2">
            <Card class="p-5">
                <div class="flex items-center justify-between gap-3">
                    <div>
                        <h2
                            class="text-sm font-semibold text-slate-900 dark:text-white"
                        >
                            Latest payslip
                        </h2>
                        <p
                            class="mt-1 text-xs text-slate-500 dark:text-slate-400"
                        >
                            September 2026 · Paid on Sep 30, 2026
                        </p>
                    </div>
                    <Badge variant="success">Paid</Badge>
                </div>

                <ul
                    class="mt-4 divide-y divide-slate-100 dark:divide-slate-800"
                >
                    <li
                        v-for="line in payslip"
                        :key="line.concept"
                        class="flex items-center justify-between py-3 text-sm"
                    >
                        <span class="text-slate-600 dark:text-slate-300">
                            {{ line.concept }}
                        </span>
                        <span
                            class="font-medium text-slate-900 dark:text-white"
                        >
                            {{ line.amount }}
                        </span>
                    </li>
                </ul>

                <Button
                    variant="outline"
                    class="mt-4 w-full"
                    :href="payroll.url()"
                >
                    <Icon name="download" class="h-4 w-4" />
                    Download payslip
                </Button>
            </Card>

            <Card class="p-5">
                <h2
                    class="text-sm font-semibold text-slate-900 dark:text-white"
                >
                    My week
                </h2>
                <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    October 12 – October 16, 2026
                </p>

                <ul
                    class="mt-4 divide-y divide-slate-100 dark:divide-slate-800"
                >
                    <li
                        v-for="day in week"
                        :key="day.day"
                        class="flex items-center justify-between gap-3 py-3"
                    >
                        <div>
                            <p
                                class="text-sm font-medium text-slate-700 dark:text-slate-200"
                            >
                                {{ day.day }}
                            </p>
                            <p
                                class="text-xs text-slate-500 dark:text-slate-400"
                            >
                                {{ day.date }}
                            </p>
                        </div>
                        <Badge :variant="day.variant">
                            {{ day.status }}
                        </Badge>
                    </li>
                </ul>
            </Card>
        </div>
    </div>
</template>
