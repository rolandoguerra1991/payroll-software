import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import AppSidebar from '@/components/shell/AppSidebar.vue';
import PanelLayout from '@/layouts/PanelLayout.vue';

const pageState = vi.hoisted(() => ({ url: '/admin/dashboard' }));

vi.mock('@inertiajs/vue3', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@inertiajs/vue3')>();

    return {
        ...actual,
        usePage: () => ({ url: pageState.url }),
    };
});

const mountLayout = () =>
    shallowMount(PanelLayout, { global: { renderStubDefaultSlot: true } });

describe('PanelLayout', () => {
    beforeEach(() => {
        window.localStorage.clear();
        document.documentElement.classList.remove('dark');
        pageState.url = '/admin/dashboard';
    });

    it('uses the HR panel on admin routes', () => {
        const sidebar = mountLayout().findComponent(AppSidebar);

        expect(sidebar.props('brand')).toBe('Payroll HR');
        expect(sidebar.props('items')).toHaveLength(5);
        expect(sidebar.props('items')).toContainEqual({
            label: 'Employees',
            href: '/admin/employees',
            icon: 'users',
        });
        expect(sidebar.props('switchLabel')).toBe('Open employee portal');
    });

    it('uses the employee portal on portal routes', () => {
        pageState.url = '/portal/payroll';

        const sidebar = mountLayout().findComponent(AppSidebar);

        expect(sidebar.props('brand')).toBe('Employee Portal');
        expect(sidebar.props('items')).toHaveLength(4);
        expect(sidebar.props('user')).toEqual({
            name: 'Carlos Mendez',
            role: 'Senior Developer',
        });
        expect(sidebar.props('switchHref')).toBe('/admin/dashboard');
    });

    it('opens and closes the mobile sidebar', async () => {
        const wrapper = mountLayout();
        const sidebar = () => wrapper.findComponent(AppSidebar);

        expect(sidebar().props('open')).toBe(false);
        expect(wrapper.find('[aria-hidden="true"]').exists()).toBe(false);

        await wrapper
            .find('button[aria-label="Open navigation menu"]')
            .trigger('click');

        expect(sidebar().props('open')).toBe(true);
        expect(wrapper.find('[aria-hidden="true"]').exists()).toBe(true);

        await wrapper.find('[aria-hidden="true"]').trigger('click');

        expect(sidebar().props('open')).toBe(false);
        expect(wrapper.find('[aria-hidden="true"]').exists()).toBe(false);
    });

    it('closes the mobile sidebar from the sidebar event', async () => {
        const wrapper = mountLayout();

        await wrapper
            .find('button[aria-label="Open navigation menu"]')
            .trigger('click');
        wrapper.findComponent(AppSidebar).vm.$emit('close');
        await nextTick();

        expect(wrapper.findComponent(AppSidebar).props('open')).toBe(false);
    });

    it('toggles the color theme', async () => {
        const wrapper = mountLayout();

        await wrapper
            .find('button[aria-label="Switch to dark theme"]')
            .trigger('click');

        expect(document.documentElement.classList.contains('dark')).toBe(true);
        expect(
            wrapper.find('button[aria-label="Switch to light theme"]').exists(),
        ).toBe(true);
        expect(wrapper.findComponent(AppSidebar).props('activeHref')).toBe(
            '/admin/dashboard',
        );
        expect(wrapper.text()).toContain('Human Resources panel');
    });
});
