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
        label: 'Present',
        value: '118',
        hint: '92% of the headcount',
        icon: 'check',
        iconClasses:
            'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    },
    {
        label: 'Late arrivals',
        value: '7',
        hint: 'More than 15 minutes',
        icon: 'clock',
        iconClasses:
            'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    },
    {
        label: 'Absent',
        value: '2',
        hint: '1 without justification',
        icon: 'alert',
        iconClasses:
            'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
    },
    {
        label: 'On leave',
        value: '1',
        hint: 'Vacation until Oct 20',
        icon: 'calendar',
        iconClasses:
            'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    },
];

type Record = {
    initials: string;
    name: string;
    department: string;
    checkIn: string;
    checkOut: string;
    hours: string;
    status: string;
    variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
};

const records: Record[] = [
    {
        initials: 'CM',
        name: 'Carlos Mendez',
        department: 'Technology',
        checkIn: '08:02',
        checkOut: '17:05',
        hours: '9h 03m',
        status: 'On time',
        variant: 'success',
    },
    {
        initials: 'LG',
        name: 'Laura Gomez',
        department: 'Technology',
        checkIn: '08:14',
        checkOut: '17:30',
        hours: '9h 16m',
        status: 'On time',
        variant: 'success',
    },
    {
        initials: 'ML',
        name: 'Marina Leon',
        department: 'Sales',
        checkIn: '08:35',
        checkOut: '17:00',
        hours: '8h 25m',
        status: 'Late',
        variant: 'warning',
    },
    {
        initials: 'JC',
        name: 'Jose Cruz',
        department: 'Finance',
        checkIn: '07:58',
        checkOut: '16:45',
        hours: '8h 47m',
        status: 'On time',
        variant: 'success',
    },
    {
        initials: 'AR',
        name: 'Ana Rivas',
        department: 'People',
        checkIn: '08:05',
        checkOut: '17:10',
        hours: '9h 05m',
        status: 'On time',
        variant: 'success',
    },
    {
        initials: 'DT',
        name: 'Diego Torres',
        department: 'Operations',
        checkIn: '—',
        checkOut: '—',
        hours: '0h 00m',
        status: 'Absent',
        variant: 'danger',
    },
    {
        initials: 'PS',
        name: 'Pedro Sanz',
        department: 'Operations',
        checkIn: '—',
        checkOut: '—',
        hours: '0h 00m',
        status: 'On leave',
        variant: 'info',
    },
];

const pendingReview = '5 records need a manual review before payroll closes.';
</script>

<template>
    <div>
        <Head title="Attendance" />

        <PageHeader
            title="Attendance"
            description="Friday, October 16, 2026 · Daily check-in overview."
        >
            <template #actions>
                <Button variant="outline">
                    <Icon name="download" class="h-4 w-4" />
                    Export report
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
                <div>
                    <h2
                        class="text-sm font-semibold text-slate-900 dark:text-white"
                    >
                        Check-in log
                    </h2>
                    <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {{ pendingReview }}
                    </p>
                </div>
                <Badge variant="warning">5 pending</Badge>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead
                        class="border-b border-slate-200 text-xs tracking-wide text-slate-500 uppercase dark:border-slate-800 dark:text-slate-400"
                    >
                        <tr>
                            <th class="px-5 py-3 font-medium">Employee</th>
                            <th class="px-5 py-3 font-medium">Department</th>
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
                            v-for="record in records"
                            :key="record.name"
                            class="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                            <td class="px-5 py-3">
                                <div class="flex items-center gap-3">
                                    <span
                                        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                                    >
                                        {{ record.initials }}
                                    </span>
                                    <span
                                        class="font-medium text-slate-900 dark:text-white"
                                    >
                                        {{ record.name }}
                                    </span>
                                </div>
                            </td>
                            <td
                                class="px-5 py-3 text-slate-600 dark:text-slate-300"
                            >
                                {{ record.department }}
                            </td>
                            <td
                                class="px-5 py-3 text-slate-600 dark:text-slate-300"
                            >
                                {{ record.checkIn }}
                            </td>
                            <td
                                class="px-5 py-3 text-slate-600 dark:text-slate-300"
                            >
                                {{ record.checkOut }}
                            </td>
                            <td
                                class="px-5 py-3 text-slate-600 dark:text-slate-300"
                            >
                                {{ record.hours }}
                            </td>
                            <td class="px-5 py-3">
                                <Badge :variant="record.variant">
                                    {{ record.status }}
                                </Badge>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div
                class="border-t border-slate-200 px-5 py-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400"
            >
                Overtime is calculated automatically once the period closes.
            </div>
        </Card>
    </div>
</template>
