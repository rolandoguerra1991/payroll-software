import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AppSidebar from '@/components/shell/AppSidebar.vue';
import type { NavigationItem } from '@/types';

const items: NavigationItem[] = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: 'dashboard' },
    { label: 'Employees', href: '/admin/employees', icon: 'users' },
];

const mountSidebar = (props: Record<string, unknown> = {}) =>
    shallowMount(AppSidebar, {
        global: { renderStubDefaultSlot: true },
        props: {
            open: false,
            items,
            activeHref: '/admin/dashboard',
            brand: 'Payroll HR',
            caption: 'Human Resources panel',
            user: { name: 'Ana Rivas', role: 'HR Coordinator' },
            switchLabel: 'Open employee portal',
            switchHref: '/portal/dashboard',
            switchIcon: 'wallet',
            ...props,
        },
    });

describe('AppSidebar', () => {
    it('renders the brand, navigation, user card and panel switch', () => {
        const text = mountSidebar().text();

        expect(text).toContain('Payroll HR');
        expect(text).toContain('Human Resources panel');
        expect(text).toContain('Dashboard');
        expect(text).toContain('Employees');
        expect(text).toContain('Ana Rivas');
        expect(text).toContain('HR Coordinator');
        expect(text).toContain('Open employee portal');
    });

    it('builds the user initials from the full name', () => {
        expect(mountSidebar().text()).toContain('AR');
    });

    it('highlights the active link and dims the rest', () => {
        const links = mountSidebar().findAll('link-stub');

        expect(links).toHaveLength(3);
        expect(links[0].attributes('aria-current')).toBe('page');
        expect(links[0].classes()).toContain('bg-blue-50');
        expect(links[1].attributes('aria-current')).toBeUndefined();
        expect(links[1].classes()).toContain('text-slate-600');
    });

    it('hides the panel while closed and shows it while open', () => {
        expect(mountSidebar().find('aside').classes()).toContain(
            '-translate-x-full',
        );
        expect(mountSidebar({ open: true }).find('aside').classes()).toContain(
            'translate-x-0',
        );
    });

    it('emits close when a navigation link is clicked', async () => {
        const wrapper = mountSidebar();

        await wrapper.findAll('link-stub')[0].trigger('click');

        expect(wrapper.emitted('close')).toHaveLength(1);
    });

    it('emits close when the panel switch is clicked', async () => {
        const wrapper = mountSidebar();

        await wrapper.findAll('link-stub')[2].trigger('click');

        expect(wrapper.emitted('close')).toHaveLength(1);
    });
});
