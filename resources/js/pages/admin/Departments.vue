<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import Icon from '@/components/ui/Icon.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import PanelLayout from '@/layouts/PanelLayout.vue';
import { employees } from '@/routes/admin';
import type { IconName } from '@/types';

defineOptions({ layout: PanelLayout });

type Department = {
    name: string;
    icon: IconName;
    iconClasses: string;
    manager: string;
    headcount: string;
    payroll: string;
    openPositions: string;
};

const departments: Department[] = [
    {
        name: 'Technology',
        icon: 'briefcase',
        iconClasses:
            'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
        manager: 'Laura Gomez',
        headcount: '42',
        payroll: '$36,300',
        openPositions: '2',
    },
    {
        name: 'Operations',
        icon: 'building',
        iconClasses:
            'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
        manager: 'Pedro Sanz',
        headcount: '31',
        payroll: '$22,480',
        openPositions: '1',
    },
    {
        name: 'Sales',
        icon: 'trending-up',
        iconClasses:
            'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
        manager: 'Marina Leon',
        headcount: '24',
        payroll: '$15,560',
        openPositions: '3',
    },
    {
        name: 'Finance',
        icon: 'wallet',
        iconClasses:
            'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400',
        manager: 'Jose Cruz',
        headcount: '14',
        payroll: '$8,960',
        openPositions: '0',
    },
    {
        name: 'People',
        icon: 'users',
        iconClasses:
            'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
        manager: 'Ana Rivas',
        headcount: '9',
        payroll: '$3,120',
        openPositions: '1',
    },
    {
        name: 'Support',
        icon: 'clock',
        iconClasses:
            'bg-slate-100 text-slate-600 dark:bg-slate-500/10 dark:text-slate-300',
        manager: 'Diego Torres',
        headcount: '8',
        payroll: '$2,890',
        openPositions: '0',
    },
];
</script>

<template>
    <div>
        <Head title="Departments" />

        <PageHeader
            title="Departments"
            description="6 departments · 128 employees · $86,420 monthly payroll."
        >
            <template #actions>
                <Button>
                    <Icon name="building" class="h-4 w-4" />
                    New department
                </Button>
            </template>
        </PageHeader>

        <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <Card
                v-for="department in departments"
                :key="department.name"
                class="flex flex-col p-5"
            >
                <div class="flex items-start justify-between gap-3">
                    <span
                        class="flex h-11 w-11 items-center justify-center rounded-lg"
                        :class="department.iconClasses"
                    >
                        <Icon :name="department.icon" class="h-5 w-5" />
                    </span>
                    <span class="text-xs text-slate-500 dark:text-slate-400">
                        {{ department.openPositions }} open positions
                    </span>
                </div>

                <h2
                    class="mt-4 text-base font-semibold text-slate-900 dark:text-white"
                >
                    {{ department.name }}
                </h2>
                <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Manager · {{ department.manager }}
                </p>

                <dl
                    class="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 dark:border-slate-800"
                >
                    <div>
                        <dt class="text-xs text-slate-500 dark:text-slate-400">
                            Employees
                        </dt>
                        <dd
                            class="mt-1 text-sm font-semibold text-slate-900 dark:text-white"
                        >
                            {{ department.headcount }}
                        </dd>
                    </div>
                    <div>
                        <dt class="text-xs text-slate-500 dark:text-slate-400">
                            Monthly payroll
                        </dt>
                        <dd
                            class="mt-1 text-sm font-semibold text-slate-900 dark:text-white"
                        >
                            {{ department.payroll }}
                        </dd>
                    </div>
                </dl>

                <Link
                    class="mt-5 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    :href="employees.url()"
                >
                    View employees
                    <Icon name="arrow-right" class="h-4 w-4" />
                </Link>
            </Card>
        </div>

        <Card class="mt-6 p-5">
            <h2 class="text-sm font-semibold text-slate-900 dark:text-white">
                Payroll distribution
            </h2>
            <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Cost per department for the current period.
            </p>
            <ul class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <li
                    v-for="department in departments"
                    :key="`cost-${department.name}`"
                    class="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 dark:bg-slate-800/50"
                >
                    <span class="text-sm text-slate-600 dark:text-slate-300">
                        {{ department.name }}
                    </span>
                    <span
                        class="text-sm font-semibold text-slate-900 dark:text-white"
                    >
                        {{ department.payroll }}
                    </span>
                </li>
            </ul>
        </Card>
    </div>
</template>
