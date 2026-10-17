import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AuthLayout from '@/layouts/AuthLayout.vue';
import ResetPassword from '@/pages/auth/ResetPassword.vue';

const form = vi.hoisted(() => ({
    data: {} as Record<string, unknown>,
    errors: {} as Record<string, string>,
    processing: false,
    post: vi.fn(),
}));

vi.mock('@inertiajs/vue3', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@inertiajs/vue3')>();

    return {
        ...actual,
        useForm: (data: Record<string, unknown>) => {
            Object.assign(form.data, data);

            return { ...data, ...form };
        },
    };
});

const mountPage = () =>
    shallowMount(ResetPassword, {
        props: { email: 'carlos.mendez@company.com', token: 'reset-token' },
        global: { renderStubDefaultSlot: true, stubs: { TextInput: false } },
    });

describe('auth/ResetPassword', () => {
    beforeEach(() => {
        form.data = {};
        form.errors = {};
        form.post.mockClear();
    });

    it('renders the reset copy through the auth layout', () => {
        const layout = mountPage().findComponent(AuthLayout);

        expect(layout.props('title')).toBe('Reset password');
        expect(layout.props('heading')).toBe('Reset your password');
        expect(layout.props('description')).toBe(
            'Choose a new password for your account.',
        );
    });

    it('renders the email and password fields from the signed link', () => {
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

    it('sends the reset token from the link with the new password', () => {
        mountPage();

        expect(form.data.token).toBe('reset-token');
        expect(form.data.email).toBe('carlos.mendez@company.com');
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

    it('shows the message returned by the reset endpoint', () => {
        form.errors = {
            password: 'This password has been leaked in a data breach.',
        };

        expect(mountPage().find('[role="alert"]').text()).toBe(
            'This password has been leaked in a data breach.',
        );
    });

    it('submits the new password', async () => {
        const wrapper = mountPage();

        await wrapper.find('form').trigger('submit');

        expect(form.post).toHaveBeenCalledWith('/reset-password');
    });
});
