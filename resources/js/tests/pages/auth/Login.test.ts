import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Login from '@/pages/auth/Login.vue';

const visit = vi.hoisted(() => vi.fn());

vi.mock('@inertiajs/vue3', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@inertiajs/vue3')>();

    return {
        ...actual,
        router: { visit },
    };
});

const mountLogin = () =>
    shallowMount(Login, { global: { renderStubDefaultSlot: true } });

describe('auth/Login', () => {
    beforeEach(() => {
        window.localStorage.clear();
        document.documentElement.classList.remove('dark');
        visit.mockClear();
    });

    it('renders the sign in form', () => {
        const wrapper = mountLogin();
        const text = wrapper.text();

        expect(wrapper.html()).toContain('title="Sign in"');
        expect(text).toContain('Sign in');
        expect(text).toContain('HR staff');
        expect(text).toContain('Employee');
        expect(text).toContain('Human resources and payroll');
        expect(text).toContain('Self sign-up is disabled');
    });

    it('opens the HR panel by default', async () => {
        const wrapper = mountLogin();

        await wrapper.find('form').trigger('submit');

        expect(visit).toHaveBeenCalledWith('/admin/dashboard');
    });

    it('opens the employee portal for the employee role', async () => {
        const wrapper = mountLogin();
        const employee = wrapper
            .findAll('button')
            .find((button) => button.text() === 'Employee');

        await employee?.trigger('click');

        expect(wrapper.find('button[aria-pressed="true"]').text()).toBe(
            'Employee',
        );

        await wrapper.find('form').trigger('submit');

        expect(visit).toHaveBeenCalledWith('/portal/dashboard');
    });

    it('keeps the typed credentials and remember flag in the form state', async () => {
        const wrapper = mountLogin();

        await wrapper.find('#email').setValue('carlos.mendez@company.com');
        await wrapper.find('#password').setValue('secret-password');
        await wrapper.find('input[name="remember"]').setValue(true);

        expect(wrapper.find<HTMLInputElement>('#email').element.value).toBe(
            'carlos.mendez@company.com',
        );
        expect(wrapper.find<HTMLInputElement>('#password').element.value).toBe(
            'secret-password',
        );
        expect(
            wrapper.find<HTMLInputElement>('input[name="remember"]').element
                .checked,
        ).toBe(true);
    });

    it('switches the color theme', async () => {
        const wrapper = mountLogin();

        await wrapper
            .find('button[aria-label="Switch to dark theme"]')
            .trigger('click');

        expect(document.documentElement.classList.contains('dark')).toBe(true);
        expect(
            wrapper.find('button[aria-label="Switch to light theme"]').exists(),
        ).toBe(true);
    });
});
