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
        label: 'Gross salary',
        value: '$2,450.00',
        hint: 'Current monthly base',
        icon: 'trending-up',
        iconClasses:
            'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    },
    {
        label: 'Deductions',
        value: '$392.00',
        hint: 'Taxes and contributions',
        icon: 'alert',
        iconClasses:
            'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
    },
    {
        label: 'Net paid',
        value: '$2,058.00',
        hint: 'September 30, 2026',
        icon: 'check',
        iconClasses:
            'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    },
    {
        label: 'Next payment',
        value: '$2,058.00',
        hint: 'Scheduled for October 30',
        icon: 'calendar',
        iconClasses:
            'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400',
    },
];

type Payslip = {
    period: string;
    paidOn: string;
    gross: string;
    deductions: string;
    net: string;
    status: string;
    variant: 'success' | 'info';
};

const payslips: Payslip[] = [
    {
        period: 'September 2026',
        paidOn: 'Sep 30, 2026',
        gross: '$2,450.00',
        deductions: '$392.00',
        net: '$2,058.00',
        status: 'Paid',
        variant: 'success',
    },
    {
        period: 'August 2026',
        paidOn: 'Aug 31, 2026',
        gross: '$2,450.00',
        deductions: '$392.00',
        net: '$2,058.00',
        status: 'Paid',
        variant: 'success',
    },
    {
        period: 'July 2026',
        paidOn: 'Jul 31, 2026',
        gross: '$2,380.00',
        deductions: '$380.80',
        net: '$1,999.20',
        status: 'Paid',
        variant: 'success',
    },
    {
        period: 'June 2026',
        paidOn: 'Jun 30, 2026',
        gross: '$2,380.00',
        deductions: '$380.80',
        net: '$1,999.20',
        status: 'Paid',
        variant: 'success',
    },
    {
        period: 'October 2026',
        paidOn: 'Oct 30, 2026',
        gross: '$2,450.00',
        deductions: '$392.00',
        net: '$2,058.00',
        status: 'Scheduled',
        variant: 'info',
    },
];

const breakdown: { concept: string; detail: string; amount: string }[] = [
    { concept: 'Base salary', detail: 'Monthly salary', amount: '+$2,450.00' },
    {
        concept: 'Performance bonus',
        detail: 'Q3 delivery bonus',
        amount: '+$120.00',
    },
    { concept: 'Income tax', detail: 'Progressive rate', amount: '-$280.00' },
    {
        concept: 'Social security',
        detail: 'Employee contribution',
        amount: '-$112.00',
    },
    {
        concept: 'Other deductions',
        detail: 'Insurance and savings',
        amount: '-$120.00',
    },
];
</script>

<template>
    <div>
        <Head title="My payroll" />

        <PageHeader
            title="My payroll"
            description="Payslips, bonuses and deductions history."
        >
            <template #actions>
                <Button variant="outline">
                    <Icon name="download" class="h-4 w-4" />
                    Download statements
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
                    Payment history
                </h2>
                <Badge variant="neutral">Last 5 periods</Badge>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead
                        class="border-b border-slate-200 text-xs tracking-wide text-slate-500 uppercase dark:border-slate-800 dark:text-slate-400"
                    >
                        <tr>
                            <th class="px-5 py-3 font-medium">Period</th>
                            <th class="px-5 py-3 font-medium">Payment date</th>
                            <th class="px-5 py-3 font-medium">Gross</th>
                            <th class="px-5 py-3 font-medium">Deductions</th>
                            <th class="px-5 py-3 font-medium">Net</th>
                            <th class="px-5 py-3 font-medium">Status</th>
                            <th class="px-5 py-3 font-medium">
                                <span class="sr-only">Payslip</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody
                        class="divide-y divide-slate-100 dark:divide-slate-800"
                    >
                        <tr
                            v-for="payslip in payslips"
                            :key="payslip.period"
                            class="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                            <td
                                class="px-5 py-3 font-medium text-slate-900 dark:text-white"
                            >
                                {{ payslip.period }}
                            </td>
                            <td
                                class="px-5 py-3 text-slate-500 dark:text-slate-400"
                            >
                                {{ payslip.paidOn }}
                            </td>
                            <td
                                class="px-5 py-3 text-slate-600 dark:text-slate-300"
                            >
                                {{ payslip.gross }}
                            </td>
                            <td
                                class="px-5 py-3 text-slate-600 dark:text-slate-300"
                            >
                                {{ payslip.deductions }}
                            </td>
                            <td
                                class="px-5 py-3 font-medium text-slate-900 dark:text-white"
                            >
                                {{ payslip.net }}
                            </td>
                            <td class="px-5 py-3">
                                <Badge :variant="payslip.variant">
                                    {{ payslip.status }}
                                </Badge>
                            </td>
                            <td class="px-5 py-3 text-right">
                                <button
                                    type="button"
                                    class="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    <Icon name="download" class="h-4 w-4" />
                                    Payslip
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>

        <Card class="mt-6 p-5">
            <h2 class="text-sm font-semibold text-slate-900 dark:text-white">
                Breakdown · September 2026
            </h2>
            <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
                How your net payment was calculated.
            </p>

            <ul class="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
                <li
                    v-for="line in breakdown"
                    :key="line.concept"
                    class="flex items-center justify-between gap-4 py-3"
                >
                    <div>
                        <p
                            class="text-sm font-medium text-slate-700 dark:text-slate-200"
                        >
                            {{ line.concept }}
                        </p>
                        <p class="text-xs text-slate-500 dark:text-slate-400">
                            {{ line.detail }}
                        </p>
                    </div>
                    <span
                        class="text-sm font-medium text-slate-900 dark:text-white"
                    >
                        {{ line.amount }}
                    </span>
                </li>
            </ul>

            <div
                class="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-800"
            >
                <span
                    class="text-sm font-semibold text-slate-900 dark:text-white"
                >
                    Net amount
                </span>
                <span
                    class="text-base font-semibold text-slate-900 dark:text-white"
                >
                    $2,058.00
                </span>
            </div>
        </Card>
    </div>
</template>
