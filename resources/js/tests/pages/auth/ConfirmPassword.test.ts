import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AuthLayout from '@/layouts/AuthLayout.vue';
import ConfirmPassword from '@/pages/auth/ConfirmPassword.vue';

const visit = vi.hoisted(() => vi.fn());

vi.mock('@inertiajs/vue3', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@inertiajs/vue3')>();

    return {
        ...actual,
        router: { visit },
    };
});

const mountPage = () =>
    shallowMount(ConfirmPassword, {
        global: { renderStubDefaultSlot: true, stubs: { TextInput: false } },
    });

describe('auth/ConfirmPassword', () => {
    beforeEach(() => {
        visit.mockClear();
    });

    it('renders the secure area copy through the auth layout', () => {
        const layout = mountPage().findComponent(AuthLayout);

        expect(layout.props('title')).toBe('Confirm password');
        expect(layout.props('heading')).toBe('Confirm your password');
        expect(layout.props('description')).toBe(
            'This is a secure area of the application. Please confirm your password before continuing.',
        );
    });

    it('renders the password field and the confirm action', () => {
        const wrapper = mountPage();

        expect(wrapper.text()).toContain('Password');
        expect(wrapper.text()).toContain('Confirm');
        expect(
            wrapper.find<HTMLInputElement>('#password').element.autofocus,
        ).toBe(true);
    });

    it('keeps the typed password in the form state', async () => {
        const wrapper = mountPage();

        await wrapper.find('#password').setValue('secret-password');

        expect(wrapper.find<HTMLInputElement>('#password').element.value).toBe(
            'secret-password',
        );
    });

    it('returns to the HR panel once the password is confirmed', async () => {
        const wrapper = mountPage();

        await wrapper.find('form').trigger('submit');

        expect(visit).toHaveBeenCalledWith('/admin/dashboard');
    });
});
