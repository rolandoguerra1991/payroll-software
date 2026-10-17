import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Payroll from '@/pages/portal/Payroll.vue';

const mountPage = () =>
    shallowMount(Payroll, {
        global: { renderStubDefaultSlot: true, stubs: { PageHeader: false } },
    });

describe('portal/Payroll', () => {
    it('renders the payroll heading', () => {
        const wrapper = mountPage();

        expect(wrapper.html()).toContain('title="My payroll"');
        expect(wrapper.text()).toContain(
            'Payslips, bonuses and deductions history.',
        );
        expect(wrapper.text()).toContain('Download statements');
    });

    it('summarises the salary, deductions and next payment', () => {
        const text = mountPage().text();

        expect(text).toContain('Gross salary');
        expect(text).toContain('$2,450.00');
        expect(text).toContain('Deductions');
        expect(text).toContain('$392.00');
        expect(text).toContain('Net paid');
        expect(text).toContain('Scheduled for October 30');
    });

    it('lists the payment history with payslip downloads', () => {
        const text = mountPage().text();

        expect(text).toContain('Payment history');
        expect(text).toContain('September 2026');
        expect(text).toContain('Sep 30, 2026');
        expect(text).toContain('Payslip');
    });

    it('breaks down the last payslip and its net amount', () => {
        const text = mountPage().text();

        expect(text).toContain('Breakdown · September 2026');
        expect(text).toContain('Performance bonus');
        expect(text).toContain('+$120.00');
        expect(text).toContain('Net amount');
        expect(text).toContain('$2,058.00');
    });
});
