<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import Badge from '@/components/ui/Badge.vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import Icon from '@/components/ui/Icon.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import PanelLayout from '@/layouts/PanelLayout.vue';
import { employees, positions } from '@/routes/admin';
import { index as departmentsIndex } from '@/routes/admin/departments';
import type { IconName } from '@/types';

defineOptions({ layout: PanelLayout });

type Stat = {
    label: string;
    value: string;
    hint: string;
    icon: IconName;
    iconClasses: string;
};

const stats: Stat[] = [
    {
        label: 'Active employees',
        value: '128',
        hint: '+4 this month',
        icon: 'users',
        iconClasses:
            'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    },
    {
        label: 'Current payroll',
        value: '$86,420',
        hint: 'Closes on October 30',
        icon: 'wallet',
        iconClasses:
            'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    },
    {
        label: 'Attendance today',
        value: '94%',
        hint: '118 of 128 clocked in',
        icon: 'clock',
        iconClasses:
            'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    },
    {
        label: 'Open requests',
        value: '6',
        hint: '2 need approval today',
        icon: 'alert',
        iconClasses:
            'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
    },
];

const payrollByDepartment: { name: string; amount: string; share: string }[] = [
    { name: 'Technology', amount: '$36,300', share: '42%' },
    { name: 'Operations', amount: '$22,480', share: '26%' },
    { name: 'Sales', amount: '$15,560', share: '18%' },
    { name: 'Finance', amount: '$8,960', share: '10%' },
    { name: 'People', amount: '$3,120', share: '4%' },
];

const activity: { title: string; time: string; icon: IconName }[] = [
    {
        title: 'September payroll was approved',
        time: '12 minutes ago',
        icon: 'check',
    },
    {
        title: 'New employee added to Operations',
        time: '1 hour ago',
        icon: 'users',
    },
    {
        title: '3 attendance exceptions need review',
        time: '3 hours ago',
        icon: 'clock',
    },
    {
        title: 'Position "Senior Developer" was updated',
        time: 'Yesterday',
        icon: 'briefcase',
    },
];

const payrollRuns: {
    period: string;
    date: string;
    headcount: string;
    status: string;
    variant: 'info' | 'warning' | 'success' | 'neutral';
}[] = [
    {
        period: 'October 2026',
        date: 'October 30, 2026',
        headcount: '128',
        status: 'Scheduled',
        variant: 'info',
    },
    {
        period: 'September 2026',
        date: 'September 30, 2026',
        headcount: '126',
        status: 'Paid',
        variant: 'success',
    },
    {
        period: 'August 2026',
        date: 'August 31, 2026',
        headcount: '124',
        status: 'Paid',
        variant: 'success',
    },
    {
        period: 'July 2026',
        date: 'July 31, 2026',
        headcount: '122',
        status: 'Under review',
        variant: 'warning',
    },
];
</script>

<template>
    <div>
        <Head title="Dashboard" />

        <PageHeader
            title="Dashboard"
            description="Human resources overview for October 2026."
        >
            <template #actions>
                <Button :href="employees.url()">
                    <Icon name="users" class="h-4 w-4" />
                    Manage employees
                </Button>
            </template>
        </PageHeader>

        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Card v-for="stat in stats" :key="stat.label" class="p-5">
                <div class="flex items-start justify-between gap-3">
                    <div>
                        <p
                            class="text-sm font-medium text-slate-500 dark:text-slate-400"
                        >
                            {{ stat.label }}
                        </p>
                        <p
                            class="mt-2 text-2xl font-semibold text-slate-900 dark:text-white"
                        >
                            {{ stat.value }}
                        </p>
                        <p
                            class="mt-1 text-xs text-slate-500 dark:text-slate-400"
                        >
                            {{ stat.hint }}
                        </p>
                    </div>
                    <span
                        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                        :class="stat.iconClasses"
                    >
                        <Icon :name="stat.icon" class="h-5 w-5" />
                    </span>
                </div>
            </Card>
        </div>

        <div class="mt-6 grid gap-6 lg:grid-cols-3">
            <Card class="p-5 lg:col-span-2">
                <div class="flex items-center justify-between gap-3">
                    <div>
                        <h2
                            class="text-sm font-semibold text-slate-900 dark:text-white"
                        >
                            Payroll by department
                        </h2>
                        <p
                            class="mt-1 text-xs text-slate-500 dark:text-slate-400"
                        >
                            Share of the October 2026 run.
                        </p>
                    </div>
                    <Badge variant="info">October 2026</Badge>
                </div>

                <ul class="mt-6 space-y-4">
                    <li
                        v-for="department in payrollByDepartment"
                        :key="department.name"
                    >
                        <div class="flex items-center justify-between text-sm">
                            <span
                                class="font-medium text-slate-700 dark:text-slate-200"
                            >
                                {{ department.name }}
                            </span>
                            <span class="text-slate-500 dark:text-slate-400">
                                {{ department.amount }}
                            </span>
                        </div>
                        <div
                            class="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
                        >
                            <div
                                class="h-full rounded-full bg-blue-600 dark:bg-blue-500"
                                :style="{ width: department.share }"
                            />
                        </div>
                    </li>
                </ul>
            </Card>

            <Card class="p-5">
                <h2
                    class="text-sm font-semibold text-slate-900 dark:text-white"
                >
                    Recent activity
                </h2>
                <ul class="mt-4 space-y-4">
                    <li
                        v-for="event in activity"
                        :key="event.title"
                        class="flex gap-3"
                    >
                        <span
                            class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                        >
                            <Icon :name="event.icon" class="h-4 w-4" />
                        </span>
                        <div>
                            <p
                                class="text-sm text-slate-700 dark:text-slate-200"
                            >
                                {{ event.title }}
                            </p>
                            <p
                                class="mt-0.5 text-xs text-slate-500 dark:text-slate-400"
                            >
                                {{ event.time }}
                            </p>
                        </div>
                    </li>
                </ul>
            </Card>
        </div>

        <Card class="mt-6">
            <div
                class="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-800"
            >
                <h2
                    class="text-sm font-semibold text-slate-900 dark:text-white"
                >
                    Payroll runs
                </h2>
                <Badge variant="neutral">Last 4 periods</Badge>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead
                        class="border-b border-slate-200 text-xs tracking-wide text-slate-500 uppercase dark:border-slate-800 dark:text-slate-400"
                    >
                        <tr>
                            <th class="px-5 py-3 font-medium">Period</th>
                            <th class="px-5 py-3 font-medium">Payment date</th>
                            <th class="px-5 py-3 font-medium">Employees</th>
                            <th class="px-5 py-3 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody
                        class="divide-y divide-slate-100 dark:divide-slate-800"
                    >
                        <tr
                            v-for="run in payrollRuns"
                            :key="run.period"
                            class="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                            <td
                                class="px-5 py-3 font-medium text-slate-900 dark:text-white"
                            >
                                {{ run.period }}
                            </td>
                            <td
                                class="px-5 py-3 text-slate-500 dark:text-slate-400"
                            >
                                {{ run.date }}
                            </td>
                            <td
                                class="px-5 py-3 text-slate-500 dark:text-slate-400"
                            >
                                {{ run.headcount }}
                            </td>
                            <td class="px-5 py-3">
                                <Badge :variant="run.variant">
                                    {{ run.status }}
                                </Badge>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div
                class="flex items-center justify-between gap-3 border-t border-slate-200 px-5 py-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400"
            >
                <span>Payroll closes 3 days before the payment date.</span>
                <Link
                    class="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    :href="departmentsIndex.url()"
                >
                    Review departments
                </Link>
            </div>
        </Card>

        <p class="mt-4 text-xs text-slate-500 dark:text-slate-400">
            Positions are managed from the
            <Link
                class="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                :href="positions.url()"
            >
                job positions
            </Link>
            module.
        </p>
    </div>
</template>
