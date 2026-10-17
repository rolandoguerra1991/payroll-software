import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AuthLayout from '@/layouts/AuthLayout.vue';
import TwoFactorChallenge from '@/pages/auth/TwoFactorChallenge.vue';

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
    shallowMount(TwoFactorChallenge, {
        global: { renderStubDefaultSlot: true, stubs: { TextInput: false } },
    });

const findToggle = (wrapper: ReturnType<typeof mountPage>, label: string) =>
    wrapper.findAll('button').find((button) => button.text() === label);

describe('auth/TwoFactorChallenge', () => {
    beforeEach(() => {
        form.errors = {};
        form.post.mockClear();
    });

    it('renders the two factor copy through the auth layout', () => {
        const layout = mountPage().findComponent(AuthLayout);

        expect(layout.props('title')).toBe('Two-factor authentication');
        expect(layout.props('heading')).toBe('Two-factor authentication');
        expect(layout.props('description')).toBe(
            'Enter the code from your authenticator app to finish signing in.',
        );
    });

    it('asks for the authentication code by default', async () => {
        const wrapper = mountPage();

        expect(wrapper.text()).toContain('Authentication code');
        expect(wrapper.text()).toContain('Use a recovery code');
        expect(wrapper.find('#code').exists()).toBe(true);
        expect(wrapper.find('#recovery_code').exists()).toBe(false);

        await wrapper.find('#code').setValue('123456');

        expect(wrapper.find<HTMLInputElement>('#code').element.value).toBe(
            '123456',
        );
    });

    it('switches to the recovery code field', async () => {
        const wrapper = mountPage();

        await findToggle(wrapper, 'Use a recovery code')?.trigger('click');

        expect(wrapper.text()).toContain('Recovery code');
        expect(wrapper.text()).toContain('Use an authentication code');
        expect(wrapper.find('#recovery_code').exists()).toBe(true);
        expect(wrapper.find('#code').exists()).toBe(false);

        await wrapper.find('#recovery_code').setValue('abcd-efgh-ijkl');

        expect(
            wrapper.find<HTMLInputElement>('#recovery_code').element.value,
        ).toBe('abcd-efgh-ijkl');
    });

    it('switches back to the authentication code field', async () => {
        const wrapper = mountPage();

        await findToggle(wrapper, 'Use a recovery code')?.trigger('click');
        await findToggle(wrapper, 'Use an authentication code')?.trigger(
            'click',
        );

        expect(wrapper.find('#code').exists()).toBe(true);
        expect(wrapper.find('#recovery_code').exists()).toBe(false);
    });

    it('shows the message returned by the challenge endpoint', () => {
        form.errors = {
            code: 'The provided two factor authentication code was invalid.',
        };

        expect(mountPage().find('[role="alert"]').text()).toBe(
            'The provided two factor authentication code was invalid.',
        );
    });

    it('shows the message returned for an invalid recovery code', async () => {
        form.errors = {
            recovery_code: 'The provided two factor recovery code was invalid.',
        };

        const wrapper = mountPage();

        await findToggle(wrapper, 'Use a recovery code')?.trigger('click');

        expect(wrapper.find('[role="alert"]').text()).toBe(
            'The provided two factor recovery code was invalid.',
        );
    });

    it('answers the two factor challenge', async () => {
        const wrapper = mountPage();

        await wrapper.find('form').trigger('submit');

        expect(form.post).toHaveBeenCalledWith('/two-factor-challenge');
    });
});
