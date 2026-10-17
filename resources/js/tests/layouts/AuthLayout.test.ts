import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import AuthLayout from '@/layouts/AuthLayout.vue';

const mountLayout = () =>
    shallowMount(AuthLayout, {
        props: {
            title: 'Sign in',
            heading: 'Sign in',
            description: 'Access your payroll workspace.',
        },
        slots: {
            default: '<div data-test="slot">Form goes here</div>',
        },
    });

describe('AuthLayout', () => {
    beforeEach(() => {
        window.localStorage.clear();
        document.documentElement.classList.remove('dark');
    });

    it('renders the document title and the page copy', () => {
        const wrapper = mountLayout();
        const text = wrapper.text();

        expect(wrapper.html()).toContain('title="Sign in"');
        expect(text).toContain('Sign in');
        expect(text).toContain('Access your payroll workspace.');
    });

    it('renders the brand panel with its highlights', () => {
        const text = mountLayout().text();

        expect(text).toContain('Payroll Suite');
        expect(text).toContain(
            'Human resources and payroll, without the spreadsheets.',
        );
        expect(text).toContain('Payslips, bonuses and deductions in one place');
        expect(text).toContain('Internal use only · Payroll Suite 2026');
    });

    it('renders the page content in the default slot', () => {
        expect(mountLayout().find('[data-test="slot"]').text()).toBe(
            'Form goes here',
        );
    });

    it('switches the color theme', async () => {
        const wrapper = mountLayout();

        expect(
            wrapper.find('button[aria-label="Switch to dark theme"]').exists(),
        ).toBe(true);

        await wrapper
            .find('button[aria-label="Switch to dark theme"]')
            .trigger('click');

        expect(document.documentElement.classList.contains('dark')).toBe(true);
        expect(
            wrapper.find('button[aria-label="Switch to light theme"]').exists(),
        ).toBe(true);
    });
});
