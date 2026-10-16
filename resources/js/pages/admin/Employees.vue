<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import Badge from '@/components/ui/Badge.vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import Icon from '@/components/ui/Icon.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import PanelLayout from '@/layouts/PanelLayout.vue';

defineOptions({ layout: PanelLayout });

type Employee = {
    initials: string;
    name: string;
    email: string;
    position: string;
    department: string;
    status: string;
    variant: 'success' | 'warning' | 'danger' | 'neutral' | 'info';
    hiredOn: string;
};

const employees: Employee[] = [
    {
        initials: 'CM',
        name: 'Carlos Mendez',
        email: 'carlos.mendez@company.com',
        position: 'Senior Developer',
        department: 'Technology',
        status: 'Active',
        variant: 'success',
        hiredOn: 'Mar 12, 2021',
    },
    {
        initials: 'LG',
        name: 'Laura Gomez',
        email: 'laura.gomez@company.com',
        position: 'Engineering Manager',
        department: 'Technology',
        status: 'Active',
        variant: 'success',
        hiredOn: 'Jan 8, 2019',
    },
    {
        initials: 'PS',
        name: 'Pedro Sanz',
        email: 'pedro.sanz@company.com',
        position: 'Operations Lead',
        department: 'Operations',
        status: 'On leave',
        variant: 'warning',
        hiredOn: 'Jul 1, 2020',
    },
    {
        initials: 'ML',
        name: 'Marina Leon',
        email: 'marina.leon@company.com',
        position: 'Sales Executive',
        department: 'Sales',
        status: 'Active',
        variant: 'success',
        hiredOn: 'Sep 23, 2022',
    },
    {
        initials: 'JC',
        name: 'Jose Cruz',
        email: 'jose.cruz@company.com',
        position: 'Financial Analyst',
        department: 'Finance',
        status: 'Active',
        variant: 'success',
        hiredOn: 'Feb 14, 2023',
    },
    {
        initials: 'AR',
        name: 'Ana Rivas',
        email: 'ana.rivas@company.com',
        position: 'HR Coordinator',
        department: 'People',
        status: 'Active',
        variant: 'success',
        hiredOn: 'Nov 4, 2018',
    },
    {
        initials: 'DT',
        name: 'Diego Torres',
        email: 'diego.torres@company.com',
        position: 'Support Specialist',
        department: 'Operations',
        status: 'Probation',
        variant: 'info',
        hiredOn: 'Sep 1, 2026',
    },
    {
        initials: 'RS',
        name: 'Rosa Silva',
        email: 'rosa.silva@company.com',
        position: 'Recruiter',
        department: 'People',
        status: 'Inactive',
        variant: 'neutral',
        hiredOn: 'May 30, 2017',
    },
];

const departments: string[] = [
    'All departments',
    'Technology',
    'Operations',
    'Sales',
    'Finance',
    'People',
];

const statusOptions: string[] = [
    'All statuses',
    'Active',
    'On leave',
    'Probation',
    'Inactive',
];
</script>

<template>
    <div>
        <Head title="Employees" />

        <PageHeader
            title="Employees"
            description="128 active employees across 6 departments."
        >
            <template #actions>
                <Button>
                    <Icon name="users" class="h-4 w-4" />
                    New employee
                </Button>
            </template>
        </PageHeader>

        <Card class="p-4">
            <div
                class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"
            >
                <label class="relative w-full lg:max-w-xs">
                    <span class="sr-only">Search employees</span>
                    <Icon
                        name="search"
                        class="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
                    />
                    <input
                        type="search"
                        placeholder="Search by name, email or position..."
                        class="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pr-3 pl-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                    />
                </label>
                <div class="flex flex-wrap items-center gap-3">
                    <select
                        class="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                    >
                        <option
                            v-for="department in departments"
                            :key="department"
                        >
                            {{ department }}
                        </option>
                    </select>
                    <select
                        class="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                    >
                        <option v-for="status in statusOptions" :key="status">
                            {{ status }}
                        </option>
                    </select>
                    <Button variant="outline">
                        <Icon name="download" class="h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>
        </Card>

        <Card class="mt-6">
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead
                        class="border-b border-slate-200 text-xs tracking-wide text-slate-500 uppercase dark:border-slate-800 dark:text-slate-400"
                    >
                        <tr>
                            <th class="px-5 py-3 font-medium">Employee</th>
                            <th class="px-5 py-3 font-medium">Position</th>
                            <th class="px-5 py-3 font-medium">Department</th>
                            <th class="px-5 py-3 font-medium">Status</th>
                            <th class="px-5 py-3 font-medium">Hired on</th>
                            <th class="px-5 py-3 font-medium">
                                <span class="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody
                        class="divide-y divide-slate-100 dark:divide-slate-800"
                    >
                        <tr
                            v-for="employee in employees"
                            :key="employee.email"
                            class="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                            <td class="px-5 py-3">
                                <div class="flex items-center gap-3">
                                    <span
                                        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                                    >
                                        {{ employee.initials }}
                                    </span>
                                    <div>
                                        <p
                                            class="font-medium text-slate-900 dark:text-white"
                                        >
                                            {{ employee.name }}
                                        </p>
                                        <p
                                            class="text-xs text-slate-500 dark:text-slate-400"
                                        >
                                            {{ employee.email }}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td
                                class="px-5 py-3 text-slate-600 dark:text-slate-300"
                            >
                                {{ employee.position }}
                            </td>
                            <td
                                class="px-5 py-3 text-slate-600 dark:text-slate-300"
                            >
                                {{ employee.department }}
                            </td>
                            <td class="px-5 py-3">
                                <Badge :variant="employee.variant">
                                    {{ employee.status }}
                                </Badge>
                            </td>
                            <td
                                class="px-5 py-3 text-slate-500 dark:text-slate-400"
                            >
                                {{ employee.hiredOn }}
                            </td>
                            <td class="px-5 py-3 text-right">
                                <button
                                    type="button"
                                    class="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div
                class="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:text-slate-400"
            >
                <span>Showing 8 of 128 employees</span>
                <div class="flex items-center gap-2">
                    <Button variant="outline" class="h-8 px-3 text-xs">
                        Previous
                    </Button>
                    <Button variant="outline" class="h-8 px-3 text-xs">
                        Next
                    </Button>
                </div>
            </div>
        </Card>
    </div>
</template>
