import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AuthLayout from '@/layouts/AuthLayout.vue';
import ResetPassword from '@/pages/auth/ResetPassword.vue';

const visit = vi.hoisted(() => vi.fn());

vi.mock('@inertiajs/vue3', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@inertiajs/vue3')>();

    return {
        ...actual,
        router: { visit },
    };
});

const mountPage = () =>
    shallowMount(ResetPassword, {
        global: { renderStubDefaultSlot: true, stubs: { TextInput: false } },
    });

describe('auth/ResetPassword', () => {
    beforeEach(() => {
        visit.mockClear();
    });

    it('renders the reset copy through the auth layout', () => {
        const layout = mountPage().findComponent(AuthLayout);

        expect(layout.props('title')).toBe('Reset password');
        expect(layout.props('heading')).toBe('Reset your password');
        expect(layout.props('description')).toBe(
            'Choose a new password for your account.',
        );
    });

    it('renders the prefilled email and the password fields', () => {
        const wrapper = mountPage();
        const email = wrapper.find<HTMLInputElement>('#email');

        expect(wrapper.text()).toContain('Work email');
        expect(wrapper.text()).toContain('New password');
        expect(wrapper.text()).toContain('Confirm password');
        expect(email.element.value).toBe('carlos.mendez@company.com');
        expect(
            wrapper.find<HTMLInputElement>('#password').element.autofocus,
        ).toBe(true);
        expect(wrapper.find('#password_confirmation').exists()).toBe(true);
        expect(wrapper.find('link-stub').attributes('href')).toBe('/login');
    });

    it('keeps the typed credentials in the form state', async () => {
        const wrapper = mountPage();

        await wrapper.find('#email').setValue('ana.torres@company.com');
        await wrapper.find('#password').setValue('new-secret-password');
        await wrapper
            .find('#password_confirmation')
            .setValue('new-secret-password');

        expect(wrapper.find<HTMLInputElement>('#email').element.value).toBe(
            'ana.torres@company.com',
        );
        expect(wrapper.find<HTMLInputElement>('#password').element.value).toBe(
            'new-secret-password',
        );
        expect(
            wrapper.find<HTMLInputElement>('#password_confirmation').element
                .value,
        ).toBe('new-secret-password');
    });

    it('returns to sign in once the password is reset', async () => {
        const wrapper = mountPage();

        await wrapper.find('form').trigger('submit');

        expect(visit).toHaveBeenCalledWith('/login');
    });
});
