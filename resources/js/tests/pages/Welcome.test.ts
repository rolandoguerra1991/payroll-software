import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Welcome from '@/pages/Welcome.vue';

const mountWelcome = () =>
    shallowMount(Welcome, {
        global: { renderStubDefaultSlot: true },
    });

describe('Welcome', () => {
    it('sets the page title through Head', () => {
        expect(mountWelcome().html()).toContain('title="Welcome"');
    });

    it('renders the starter content', () => {
        const text = mountWelcome().text();

        expect(text).toContain("Let's get started");
        expect(text).toContain('Documentation');
        expect(text).toContain('Laracasts');
        expect(text).toContain('Deploy now');
    });

    it('preconnects to the Inter font host and loads its stylesheet', () => {
        const html = mountWelcome().html();

        expect(html).toContain('https://rsms.me/');
        expect(html).toContain('https://rsms.me/inter/inter.css');
    });
});
