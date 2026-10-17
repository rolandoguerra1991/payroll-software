<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import Badge from '@/components/ui/Badge.vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import Icon from '@/components/ui/Icon.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import PanelLayout from '@/layouts/PanelLayout.vue';

defineOptions({ layout: PanelLayout });

type Field = { label: string; value: string };

const personal: Field[] = [
    { label: 'Full name', value: 'Carlos Mendez Rojas' },
    { label: 'Document ID', value: '1-1587-0421' },
    { label: 'Email', value: 'carlos.mendez@company.com' },
    { label: 'Phone', value: '+506 8812 4470' },
    { label: 'Date of birth', value: 'July 19, 1990' },
    { label: 'Address', value: 'San Jose, Costa Rica' },
    { label: 'Emergency contact', value: 'Maria Rojas · +506 8701 1188' },
];

const employment: Field[] = [
    { label: 'Employee ID', value: '#1042' },
    { label: 'Position', value: 'Senior Developer' },
    { label: 'Department', value: 'Technology' },
    { label: 'Manager', value: 'Laura Gomez' },
    { label: 'Employment type', value: 'Full time · Indefinite contract' },
    { label: 'Work schedule', value: 'Monday to Friday · 08:00 – 17:00' },
    { label: 'Base salary', value: '$2,450.00 monthly' },
    { label: 'Joined on', value: 'March 12, 2021' },
];
</script>

<template>
    <div>
        <Head title="My profile" />

        <PageHeader
            title="My profile"
            description="Personal and employment information on file."
        >
            <template #actions>
                <Button variant="outline">
                    <Icon name="user" class="h-4 w-4" />
                    Request a change
                </Button>
            </template>
        </PageHeader>

        <div class="grid gap-6 lg:grid-cols-3">
            <Card class="p-5">
                <div class="flex items-center gap-4">
                    <span
                        class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white"
                    >
                        CM
                    </span>
                    <div class="min-w-0">
                        <p
                            class="truncate text-base font-semibold text-slate-900 dark:text-white"
                        >
                            Carlos Mendez
                        </p>
                        <p
                            class="truncate text-sm text-slate-500 dark:text-slate-400"
                        >
                            Senior Developer
                        </p>
                    </div>
                </div>

                <div class="mt-4 flex items-center gap-2">
                    <Badge variant="success">Active</Badge>
                    <Badge variant="neutral">Technology</Badge>
                </div>

                <dl
                    class="mt-5 space-y-3 border-t border-slate-100 pt-4 dark:border-slate-800"
                >
                    <div class="flex items-center justify-between gap-3">
                        <dt class="text-xs text-slate-500 dark:text-slate-400">
                            Employee ID
                        </dt>
                        <dd
                            class="text-sm font-medium text-slate-900 dark:text-white"
                        >
                            #1042
                        </dd>
                    </div>
                    <div class="flex items-center justify-between gap-3">
                        <dt class="text-xs text-slate-500 dark:text-slate-400">
                            Joined on
                        </dt>
                        <dd
                            class="text-sm font-medium text-slate-900 dark:text-white"
                        >
                            March 12, 2021
                        </dd>
                    </div>
                    <div class="flex items-center justify-between gap-3">
                        <dt class="text-xs text-slate-500 dark:text-slate-400">
                            Seniority
                        </dt>
                        <dd
                            class="text-sm font-medium text-slate-900 dark:text-white"
                        >
                            5 years, 7 months
                        </dd>
                    </div>
                </dl>
            </Card>

            <Card class="p-5 lg:col-span-2">
                <h2
                    class="text-sm font-semibold text-slate-900 dark:text-white"
                >
                    Personal information
                </h2>
                <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Contact Human Resources to update these details.
                </p>

                <dl class="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                    <div
                        v-for="field in personal"
                        :key="field.label"
                        class="border-b border-slate-100 pb-3 dark:border-slate-800"
                    >
                        <dt class="text-xs text-slate-500 dark:text-slate-400">
                            {{ field.label }}
                        </dt>
                        <dd
                            class="mt-1 text-sm font-medium text-slate-900 dark:text-white"
                        >
                            {{ field.value }}
                        </dd>
                    </div>
                </dl>
            </Card>
        </div>

        <Card class="mt-6 p-5">
            <h2 class="text-sm font-semibold text-slate-900 dark:text-white">
                Employment information
            </h2>
            <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Position, department and contract details.
            </p>

            <dl class="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
                <div
                    v-for="field in employment"
                    :key="field.label"
                    class="rounded-lg bg-slate-50 px-4 py-3 dark:bg-slate-800/50"
                >
                    <dt class="text-xs text-slate-500 dark:text-slate-400">
                        {{ field.label }}
                    </dt>
                    <dd
                        class="mt-1 text-sm font-medium text-slate-900 dark:text-white"
                    >
                        {{ field.value }}
                    </dd>
                </div>
            </dl>
        </Card>
    </div>
</template>
