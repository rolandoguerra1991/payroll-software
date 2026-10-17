import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AuthLayout from '@/layouts/AuthLayout.vue';
import ForgotPassword from '@/pages/auth/ForgotPassword.vue';

const mountPage = () =>
    shallowMount(ForgotPassword, {
        global: { renderStubDefaultSlot: true, stubs: { TextInput: false } },
    });

describe('auth/ForgotPassword', () => {
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

    it('confirms that the reset link was emailed', async () => {
        const wrapper = mountPage();

        await wrapper.find('form').trigger('submit');

        expect(wrapper.find('[role="status"]').text()).toBe(
            'We have emailed your password reset link.',
        );
    });
});
