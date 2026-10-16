import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Dashboard from '@/pages/admin/Dashboard.vue';

const mountPage = () =>
    shallowMount(Dashboard, {
        global: { renderStubDefaultSlot: true, stubs: { PageHeader: false } },
    });

describe('admin/Dashboard', () => {
    it('renders the page heading', () => {
        const wrapper = mountPage();

        expect(wrapper.html()).toContain('title="Dashboard"');
        expect(wrapper.text()).toContain(
            'Human resources overview for October 2026.',
        );
    });

    it('shows the headcount, payroll and attendance metrics', () => {
        const text = mountPage().text();

        expect(text).toContain('Active employees');
        expect(text).toContain('128');
        expect(text).toContain('Current payroll');
        expect(text).toContain('$86,420');
        expect(text).toContain('Attendance today');
        expect(text).toContain('94%');
        expect(text).toContain('2 need approval today');
    });

    it('shows the payroll breakdown per department', () => {
        const text = mountPage().text();

        expect(text).toContain('Payroll by department');
        expect(text).toContain('Technology');
        expect(text).toContain('$36,300');
        expect(text).toContain('Recent activity');
        expect(text).toContain('September payroll was approved');
    });

    it('lists the payroll runs and links to related modules', () => {
        const text = mountPage().text();

        expect(text).toContain('Payroll runs');
        expect(text).toContain('October 2026');
        expect(text).toContain('Scheduled');
        expect(text).toContain('Review departments');
        expect(text).toContain('job positions');
    });
});
