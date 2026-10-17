import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AuthLayout from '@/layouts/AuthLayout.vue';
import Login from '@/pages/auth/Login.vue';

const form = vi.hoisted(() => ({
    errors: {} as Record<string, string>,
    processing: false,
    post: vi.fn((_url: string, options?: { onFinish?: () => void }) => {
        options?.onFinish?.();
    }),
    reset: vi.fn(),
}));

vi.mock('@inertiajs/vue3', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@inertiajs/vue3')>();

    return {
        ...actual,
        useForm: (data: Record<string, unknown>) => ({ ...data, ...form }),
    };
});

const mountLogin = (status?: string) =>
    shallowMount(Login, {
        props: { status },
        global: { renderStubDefaultSlot: true, stubs: { TextInput: false } },
    });

describe('auth/Login', () => {
    beforeEach(() => {
        window.localStorage.clear();
        document.documentElement.classList.remove('dark');
        form.errors = {};
        form.post.mockClear();
        form.reset.mockClear();
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
        expect(wrapper.find('[role="status"]').exists()).toBe(false);
    });

    it('shows the status flashed after a password reset', () => {
        expect(
            mountLogin('Your password has been reset.')
                .find('[role="status"]')
                .text(),
        ).toBe('Your password has been reset.');
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

    it('shows the messages returned by the authentication endpoint', () => {
        form.errors = {
            email: 'These credentials do not match our records.',
            password: 'The password field is required.',
        };

        const alerts = mountLogin().findAll('[role="alert"]');

        expect(alerts.map((alert) => alert.text())).toEqual([
            'These credentials do not match our records.',
            'The password field is required.',
        ]);
    });

    it('submits the credentials and clears the password afterwards', async () => {
        const wrapper = mountLogin();

        await wrapper.find('form').trigger('submit');

        expect(form.post).toHaveBeenCalledWith('/login', expect.any(Object));
        expect(form.reset).toHaveBeenCalledWith('password');
    });
});
