import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Dashboard from '@/pages/portal/Dashboard.vue';

const mountPage = () =>
    shallowMount(Dashboard, {
        global: { renderStubDefaultSlot: true, stubs: { PageHeader: false } },
    });

describe('portal/Dashboard', () => {
    it('greets the employee with the date', () => {
        const wrapper = mountPage();

        expect(wrapper.html()).toContain('title="My dashboard"');
        expect(wrapper.text()).toContain('Hello, Carlos');
        expect(wrapper.text()).toContain(
            'Friday, October 16, 2026 · Here is your payroll summary.',
        );
    });

    it('shows the payment, position, department and attendance cards', () => {
        const text = mountPage().text();

        expect(text).toContain('Next payment');
        expect(text).toContain('$2,058.00');
        expect(text).toContain('Senior Developer');
        expect(text).toContain('Technology department');
        expect(text).toContain('08:02');
    });

    it('shows the latest payslip and the weekly summary', () => {
        const text = mountPage().text();

        expect(text).toContain('Latest payslip');
        expect(text).toContain('Base salary');
        expect(text).toContain('Download payslip');
        expect(text).toContain('My week');
        expect(text).toContain('Wednesday');
        expect(text).toContain('Late');
    });
});
