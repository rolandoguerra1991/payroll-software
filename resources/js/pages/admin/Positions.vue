<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import Badge from '@/components/ui/Badge.vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import Icon from '@/components/ui/Icon.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import PanelLayout from '@/layouts/PanelLayout.vue';

defineOptions({ layout: PanelLayout });

type Position = {
    title: string;
    department: string;
    level: string;
    levelVariant: 'info' | 'success' | 'warning' | 'neutral';
    employees: string;
    salary: string;
    status: string;
    statusVariant: 'success' | 'neutral';
};

const positions: Position[] = [
    {
        title: 'Engineering Manager',
        department: 'Technology',
        level: 'Lead',
        levelVariant: 'warning',
        employees: '2',
        salary: '$5,200 – $6,400',
        status: 'Active',
        statusVariant: 'success',
    },
    {
        title: 'Senior Developer',
        department: 'Technology',
        level: 'Senior',
        levelVariant: 'info',
        employees: '14',
        salary: '$3,600 – $4,800',
        status: 'Active',
        statusVariant: 'success',
    },
    {
        title: 'Operations Lead',
        department: 'Operations',
        level: 'Lead',
        levelVariant: 'warning',
        employees: '3',
        salary: '$4,100 – $5,000',
        status: 'Active',
        statusVariant: 'success',
    },
    {
        title: 'Support Specialist',
        department: 'Operations',
        level: 'Mid',
        levelVariant: 'success',
        employees: '11',
        salary: '$1,800 – $2,400',
        status: 'Active',
        statusVariant: 'success',
    },
    {
        title: 'Sales Executive',
        department: 'Sales',
        level: 'Mid',
        levelVariant: 'success',
        employees: '16',
        salary: '$2,000 – $2,900',
        status: 'Active',
        statusVariant: 'success',
    },
    {
        title: 'Financial Analyst',
        department: 'Finance',
        level: 'Junior',
        levelVariant: 'neutral',
        employees: '5',
        salary: '$1,500 – $2,100',
        status: 'Active',
        statusVariant: 'success',
    },
    {
        title: 'HR Coordinator',
        department: 'People',
        level: 'Senior',
        levelVariant: 'info',
        employees: '4',
        salary: '$2,800 – $3,600',
        status: 'Active',
        statusVariant: 'success',
    },
    {
        title: 'Recruiter',
        department: 'People',
        level: 'Mid',
        levelVariant: 'success',
        employees: '0',
        salary: '$2,200 – $2,800',
        status: 'Draft',
        statusVariant: 'neutral',
    },
];
</script>

<template>
    <div>
        <Head title="Positions" />

        <PageHeader
            title="Positions"
            description="24 positions across 6 departments."
        >
            <template #actions>
                <Button>
                    <Icon name="briefcase" class="h-4 w-4" />
                    New position
                </Button>
            </template>
        </PageHeader>

        <Card>
            <div
                class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-800"
            >
                <h2
                    class="text-sm font-semibold text-slate-900 dark:text-white"
                >
                    Position catalog
                </h2>
                <Badge variant="neutral">24 registered</Badge>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead
                        class="border-b border-slate-200 text-xs tracking-wide text-slate-500 uppercase dark:border-slate-800 dark:text-slate-400"
                    >
                        <tr>
                            <th class="px-5 py-3 font-medium">Position</th>
                            <th class="px-5 py-3 font-medium">Department</th>
                            <th class="px-5 py-3 font-medium">Level</th>
                            <th class="px-5 py-3 font-medium">Employees</th>
                            <th class="px-5 py-3 font-medium">Base salary</th>
                            <th class="px-5 py-3 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody
                        class="divide-y divide-slate-100 dark:divide-slate-800"
                    >
                        <tr
                            v-for="position in positions"
                            :key="position.title"
                            class="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                            <td
                                class="px-5 py-3 font-medium text-slate-900 dark:text-white"
                            >
                                {{ position.title }}
                            </td>
                            <td
                                class="px-5 py-3 text-slate-600 dark:text-slate-300"
                            >
                                {{ position.department }}
                            </td>
                            <td class="px-5 py-3">
                                <Badge :variant="position.levelVariant">
                                    {{ position.level }}
                                </Badge>
                            </td>
                            <td
                                class="px-5 py-3 text-slate-600 dark:text-slate-300"
                            >
                                {{ position.employees }}
                            </td>
                            <td
                                class="px-5 py-3 text-slate-600 dark:text-slate-300"
                            >
                                {{ position.salary }}
                            </td>
                            <td class="px-5 py-3">
                                <Badge :variant="position.statusVariant">
                                    {{ position.status }}
                                </Badge>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div
                class="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:text-slate-400"
            >
                <span>Showing 8 of 24 positions</span>
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
