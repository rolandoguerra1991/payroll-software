import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Employees from '@/pages/admin/Employees.vue';

const mountPage = () =>
    shallowMount(Employees, {
        global: { renderStubDefaultSlot: true, stubs: { PageHeader: false } },
    });

describe('admin/Employees', () => {
    it('renders the page heading', () => {
        const wrapper = mountPage();

        expect(wrapper.html()).toContain('title="Employees"');
        expect(wrapper.text()).toContain(
            '128 active employees across 6 departments.',
        );
    });

    it('renders the search and filter controls', () => {
        const html = mountPage().html();

        expect(html).toContain('Search by name, email or position...');
        expect(html).toContain('All departments');
        expect(html).toContain('All statuses');
        expect(html).toContain('New employee');
        expect(html).toContain('Export');
    });

    it('lists employees with their position, department and status', () => {
        const text = mountPage().text();

        expect(text).toContain('Carlos Mendez');
        expect(text).toContain('carlos.mendez@company.com');
        expect(text).toContain('Senior Developer');
        expect(text).toContain('Technology');
        expect(text).toContain('Probation');
        expect(text).toContain('Showing 8 of 128 employees');
    });
});
