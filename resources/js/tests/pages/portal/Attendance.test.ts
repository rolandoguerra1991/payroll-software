import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Attendance from '@/pages/portal/Attendance.vue';

const mountPage = () =>
    shallowMount(Attendance, {
        global: { renderStubDefaultSlot: true, stubs: { PageHeader: false } },
    });

describe('portal/Attendance', () => {
    it('renders the monthly attendance heading', () => {
        const wrapper = mountPage();

        expect(wrapper.html()).toContain('title="My attendance"');
        expect(wrapper.text()).toContain(
            'October 2026 · 12 workdays recorded.',
        );
        expect(wrapper.text()).toContain('Request time off');
    });

    it('summarises worked days, late arrivals and hours', () => {
        const text = mountPage().text();

        expect(text).toContain('Days present');
        expect(text).toContain('Late arrivals');
        expect(text).toContain('October 14 at 08:35');
        expect(text).toContain('Hours worked');
        expect(text).toContain('96h 30m');
    });

    it('lists the daily records with their status', () => {
        const text = mountPage().text();

        expect(text).toContain('Daily records');
        expect(text).toContain('Friday, October 16');
        expect(text).toContain('Working');
        expect(text).toContain('On time');
    });

    it('shows the time off balances', () => {
        const text = mountPage().text();

        expect(text).toContain('Vacation days');
        expect(text).toContain('12 days');
        expect(text).toContain('Sick leave');
        expect(text).toContain('Personal days');
    });
});
