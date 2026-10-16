import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Positions from '@/pages/admin/Positions.vue';

const mountPage = () =>
    shallowMount(Positions, {
        global: { renderStubDefaultSlot: true, stubs: { PageHeader: false } },
    });

describe('admin/Positions', () => {
    it('renders the positions heading', () => {
        const wrapper = mountPage();

        expect(wrapper.html()).toContain('title="Positions"');
        expect(wrapper.text()).toContain('24 positions across 6 departments.');
        expect(wrapper.text()).toContain('New position');
    });

    it('lists the position catalog with level, salary and status', () => {
        const text = mountPage().text();

        expect(text).toContain('Position catalog');
        expect(text).toContain('Engineering Manager');
        expect(text).toContain('Lead');
        expect(text).toContain('$5,200 – $6,400');
        expect(text).toContain('Recruiter');
        expect(text).toContain('Draft');
    });

    it('shows the pagination footer', () => {
        const text = mountPage().text();

        expect(text).toContain('Showing 8 of 24 positions');
        expect(text).toContain('Previous');
        expect(text).toContain('Next');
    });
});
