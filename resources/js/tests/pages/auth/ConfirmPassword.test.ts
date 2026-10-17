import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AuthLayout from '@/layouts/AuthLayout.vue';
import ConfirmPassword from '@/pages/auth/ConfirmPassword.vue';

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

const mountPage = () =>
    shallowMount(ConfirmPassword, {
        global: { renderStubDefaultSlot: true, stubs: { TextInput: false } },
    });

describe('auth/ConfirmPassword', () => {
    beforeEach(() => {
        form.errors = {};
        form.post.mockClear();
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

    it('shows the message returned by the confirmation endpoint', () => {
        form.errors = { password: 'The provided password was incorrect.' };

        expect(mountPage().find('[role="alert"]').text()).toBe(
            'The provided password was incorrect.',
        );
    });

    it('confirms the password against Fortify', async () => {
        const wrapper = mountPage();

        await wrapper.find('form').trigger('submit');

        expect(form.post).toHaveBeenCalledWith('/user/confirm-password');
    });
});
