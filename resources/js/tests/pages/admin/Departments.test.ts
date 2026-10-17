import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Departments from '@/pages/admin/Departments.vue';

const mountPage = () =>
    shallowMount(Departments, {
        global: { renderStubDefaultSlot: true, stubs: { PageHeader: false } },
    });

describe('admin/Departments', () => {
    it('renders the departments heading', () => {
        const wrapper = mountPage();

        expect(wrapper.html()).toContain('title="Departments"');
        expect(wrapper.text()).toContain(
            '6 departments · 128 employees · $86,420 monthly payroll.',
        );
        expect(wrapper.text()).toContain('New department');
    });

    it('renders a card per department with its manager and headcount', () => {
        const text = mountPage().text();

        expect(text).toContain('Technology');
        expect(text).toContain('Manager · Laura Gomez');
        expect(text).toContain('2 open positions');
        expect(text).toContain('Monthly payroll');
        expect(text).toContain('View employees');
    });

    it('shows the payroll distribution summary', () => {
        const text = mountPage().text();

        expect(text).toContain('Payroll distribution');
        expect(text).toContain('Cost per department for the current period.');
    });
});
