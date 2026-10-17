<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import Badge from '@/components/ui/Badge.vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import Icon from '@/components/ui/Icon.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import PanelLayout from '@/layouts/PanelLayout.vue';
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
        label: 'Days present',
        value: '12',
        hint: 'Out of 12 workdays',
        icon: 'check',
        iconClasses:
            'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    },
    {
        label: 'Late arrivals',
        value: '1',
        hint: 'October 14 at 08:35',
        icon: 'clock',
        iconClasses:
            'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    },
    {
        label: 'Absences',
        value: '0',
        hint: 'No unexcused absence',
        icon: 'alert',
        iconClasses:
            'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
    },
    {
        label: 'Hours worked',
        value: '96h 30m',
        hint: 'Average 8h 02m per day',
        icon: 'trending-up',
        iconClasses:
            'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    },
];

type Day = {
    date: string;
    checkIn: string;
    checkOut: string;
    hours: string;
    status: string;
    variant: 'success' | 'warning' | 'neutral';
};

const days: Day[] = [
    {
        date: 'Friday, October 16',
        checkIn: '08:02',
        checkOut: '—',
        hours: 'In progress',
        status: 'Working',
        variant: 'neutral',
    },
    {
        date: 'Thursday, October 15',
        checkIn: '08:05',
        checkOut: '17:10',
        hours: '9h 05m',
        status: 'On time',
        variant: 'success',
    },
    {
        date: 'Wednesday, October 14',
        checkIn: '08:35',
        checkOut: '17:00',
        hours: '8h 25m',
        status: 'Late',
        variant: 'warning',
    },
    {
        date: 'Tuesday, October 13',
        checkIn: '08:01',
        checkOut: '17:15',
        hours: '9h 14m',
        status: 'On time',
        variant: 'success',
    },
    {
        date: 'Monday, October 12',
        checkIn: '07:58',
        checkOut: '17:05',
        hours: '9h 07m',
        status: 'On time',
        variant: 'success',
    },
];

const balances: { label: string; value: string; detail: string }[] = [
    { label: 'Vacation days', value: '12 days', detail: 'Available this year' },
    { label: 'Sick leave', value: '5 days', detail: 'Not used yet' },
    { label: 'Personal days', value: '2 days', detail: 'Request 3 days ahead' },
];
</script>

<template>
    <div>
        <Head title="My attendance" />

        <PageHeader
            title="My attendance"
            description="October 2026 · 12 workdays recorded."
        >
            <template #actions>
                <Button variant="outline">
                    <Icon name="calendar" class="h-4 w-4" />
                    Request time off
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
                            class="mt-2 text-2xl font-semibold text-slate-900 dark:text-white"
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

        <Card class="mt-6">
            <div
                class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-800"
            >
                <h2
                    class="text-sm font-semibold text-slate-900 dark:text-white"
                >
                    Daily records
                </h2>
                <Badge variant="info">October 2026</Badge>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead
                        class="border-b border-slate-200 text-xs tracking-wide text-slate-500 uppercase dark:border-slate-800 dark:text-slate-400"
                    >
                        <tr>
                            <th class="px-5 py-3 font-medium">Date</th>
                            <th class="px-5 py-3 font-medium">Check in</th>
                            <th class="px-5 py-3 font-medium">Check out</th>
                            <th class="px-5 py-3 font-medium">Hours</th>
                            <th class="px-5 py-3 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody
                        class="divide-y divide-slate-100 dark:divide-slate-800"
                    >
                        <tr
                            v-for="day in days"
                            :key="day.date"
                            class="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                            <td
                                class="px-5 py-3 font-medium text-slate-900 dark:text-white"
                            >
                                {{ day.date }}
                            </td>
                            <td
                                class="px-5 py-3 text-slate-600 dark:text-slate-300"
                            >
                                {{ day.checkIn }}
                            </td>
                            <td
                                class="px-5 py-3 text-slate-600 dark:text-slate-300"
                            >
                                {{ day.checkOut }}
                            </td>
                            <td
                                class="px-5 py-3 text-slate-600 dark:text-slate-300"
                            >
                                {{ day.hours }}
                            </td>
                            <td class="px-5 py-3">
                                <Badge :variant="day.variant">
                                    {{ day.status }}
                                </Badge>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>

        <div class="mt-6 grid gap-6 sm:grid-cols-3">
            <Card v-for="balance in balances" :key="balance.label" class="p-5">
                <p
                    class="text-sm font-medium text-slate-500 dark:text-slate-400"
                >
                    {{ balance.label }}
                </p>
                <p
                    class="mt-2 text-xl font-semibold text-slate-900 dark:text-white"
                >
                    {{ balance.value }}
                </p>
                <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {{ balance.detail }}
                </p>
            </Card>
        </div>
    </div>
</template>
