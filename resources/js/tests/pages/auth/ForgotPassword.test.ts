import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AuthLayout from '@/layouts/AuthLayout.vue';
import ForgotPassword from '@/pages/auth/ForgotPassword.vue';

const form = vi.hoisted(() => ({
    errors: {} as Record<string, string>,
    processing: false,
    post: vi.fn(),
}));

vi.mock('@inertiajs/vue3', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@inertiajs/vue3')>();

    return {
        ...actual,
        useForm: (data: Record<string, unknown>) => ({ ...data, ...form }),
    };
});

const mountPage = (status?: string) =>
    shallowMount(ForgotPassword, {
        props: { status },
        global: { renderStubDefaultSlot: true, stubs: { TextInput: false } },
    });

describe('auth/ForgotPassword', () => {
    beforeEach(() => {
        form.errors = {};
        form.post.mockClear();
    });

    it('renders the reset request copy through the auth layout', () => {
        const layout = mountPage().findComponent(AuthLayout);

        expect(layout.props('title')).toBe('Forgot password');
        expect(layout.props('heading')).toBe('Forgot your password?');
        expect(layout.props('description')).toBe(
            'Enter your work email and we will send you a password reset link.',
        );
    });

    it('renders the email field and the submit action', () => {
        const wrapper = mountPage();

        expect(wrapper.text()).toContain('Work email');
        expect(wrapper.text()).toContain('Email password reset link');
        expect(wrapper.find<HTMLInputElement>('#email').element.autofocus).toBe(
            true,
        );
        expect(wrapper.find('link-stub').attributes('href')).toBe('/login');
        expect(wrapper.find('[role="status"]').exists()).toBe(false);
    });

    it('keeps the typed email in the form state', async () => {
        const wrapper = mountPage();

        await wrapper.find('#email').setValue('carlos.mendez@company.com');

        expect(wrapper.find<HTMLInputElement>('#email').element.value).toBe(
            'carlos.mendez@company.com',
        );
    });

    it('shows the message returned by the email endpoint', () => {
        form.errors = { email: 'We can not find a user with that email.' };

        const wrapper = mountPage();

        expect(wrapper.find('[role="alert"]').text()).toBe(
            'We can not find a user with that email.',
        );
    });

    it('shows the status flashed by Fortify after sending the link', () => {
        expect(
            mountPage('We have emailed your password reset link.')
                .find('[role="status"]')
                .text(),
        ).toBe('We have emailed your password reset link.');
    });

    it('requests the reset link for the typed email', async () => {
        const wrapper = mountPage();

        await wrapper.find('form').trigger('submit');

        expect(form.post).toHaveBeenCalledWith('/forgot-password');
    });
});
