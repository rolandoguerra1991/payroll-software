import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AuthLayout from '@/layouts/AuthLayout.vue';
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
    shallowMount(Login, {
        global: { renderStubDefaultSlot: true, stubs: { TextInput: false } },
    });

describe('auth/Login', () => {
    beforeEach(() => {
        window.localStorage.clear();
        document.documentElement.classList.remove('dark');
        visit.mockClear();
    });

    it('renders the sign in copy through the auth layout', () => {
        const layout = mountLogin().findComponent(AuthLayout);

        expect(layout.props('title')).toBe('Sign in');
        expect(layout.props('heading')).toBe('Sign in');
        expect(layout.props('description')).toBe(
            'Access your payroll workspace.',
        );
    });

    it('renders the credentials form and the password reset link', () => {
        const wrapper = mountLogin();
        const text = wrapper.text();

        expect(text).toContain('Work email');
        expect(text).toContain('Password');
        expect(text).toContain('Keep me signed in');
        expect(text).toContain('Forgot password?');
        expect(text).toContain('Self sign-up is disabled');
        expect(wrapper.find('link-stub').attributes('href')).toBe(
            '/forgot-password',
        );
        expect(wrapper.find<HTMLInputElement>('#email').element.autofocus).toBe(
            false,
        );
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

    it('opens the HR panel on submit', async () => {
        const wrapper = mountLogin();

        await wrapper.find('form').trigger('submit');

        expect(visit).toHaveBeenCalledWith('/admin/dashboard');
    });
});
