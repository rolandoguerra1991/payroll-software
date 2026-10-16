import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Attendance from '@/pages/admin/Attendance.vue';

const mountPage = () =>
    shallowMount(Attendance, {
        global: { renderStubDefaultSlot: true, stubs: { PageHeader: false } },
    });

describe('admin/Attendance', () => {
    it('renders the daily overview heading', () => {
        const wrapper = mountPage();

        expect(wrapper.html()).toContain('title="Attendance"');
        expect(wrapper.text()).toContain(
            'Friday, October 16, 2026 · Daily check-in overview.',
        );
        expect(wrapper.text()).toContain('Export report');
    });

    it('summarises attendance for the day', () => {
        const text = mountPage().text();

        expect(text).toContain('Present');
        expect(text).toContain('118');
        expect(text).toContain('Late arrivals');
        expect(text).toContain('Absent');
        expect(text).toContain('On leave');
    });

    it('lists the check-in records with their status', () => {
        const text = mountPage().text();

        expect(text).toContain('Check-in log');
        expect(text).toContain('5 records need a manual review');
        expect(text).toContain('Carlos Mendez');
        expect(text).toContain('08:02');
        expect(text).toContain('On time');
        expect(text).toContain('Overtime is calculated automatically');
    });
});
