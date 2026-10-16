import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Profile from '@/pages/portal/Profile.vue';

const mountPage = () =>
    shallowMount(Profile, {
        global: { renderStubDefaultSlot: true, stubs: { PageHeader: false } },
    });

describe('portal/Profile', () => {
    it('renders the profile heading', () => {
        const wrapper = mountPage();

        expect(wrapper.html()).toContain('title="My profile"');
        expect(wrapper.text()).toContain(
            'Personal and employment information on file.',
        );
        expect(wrapper.text()).toContain('Request a change');
    });

    it('shows the employee summary card', () => {
        const text = mountPage().text();

        expect(text).toContain('Carlos Mendez');
        expect(text).toContain('Senior Developer');
        expect(text).toContain('Active');
        expect(text).toContain('5 years, 7 months');
    });

    it('shows the personal information section', () => {
        const text = mountPage().text();

        expect(text).toContain('Personal information');
        expect(text).toContain('Carlos Mendez Rojas');
        expect(text).toContain('Document ID');
        expect(text).toContain('Emergency contact');
    });

    it('shows the employment information section', () => {
        const text = mountPage().text();

        expect(text).toContain('Employment information');
        expect(text).toContain('Technology');
        expect(text).toContain('Manager');
        expect(text).toContain('$2,450.00 monthly');
    });
});
