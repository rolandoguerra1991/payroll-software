import { beforeEach, describe, expect, it } from 'vitest';
import { useTheme } from '@/composables/useTheme';

const STORAGE_KEY = 'payroll-theme';

describe('useTheme', () => {
    beforeEach(() => {
        window.localStorage.clear();
        document.documentElement.classList.remove('dark');
    });

    it('applies a stored dark theme', () => {
        window.localStorage.setItem(STORAGE_KEY, 'dark');

        const { theme } = useTheme();

        expect(theme.value).toBe('dark');
        expect(document.documentElement.classList.contains('dark')).toBe(true);
        expect(window.localStorage.getItem(STORAGE_KEY)).toBe('dark');
    });

    it('applies a stored light theme', () => {
        window.localStorage.setItem(STORAGE_KEY, 'light');

        const { theme } = useTheme();

        expect(theme.value).toBe('light');
        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('falls back to the document class when the stored value is invalid', () => {
        window.localStorage.setItem(STORAGE_KEY, 'blue');
        document.documentElement.classList.add('dark');

        expect(useTheme().theme.value).toBe('dark');
    });

    it('defaults to the light theme without a stored value', () => {
        expect(useTheme().theme.value).toBe('light');
    });

    it('toggles and persists the theme', () => {
        const { theme, toggleTheme } = useTheme();

        toggleTheme();

        expect(theme.value).toBe('dark');
        expect(document.documentElement.classList.contains('dark')).toBe(true);
        expect(window.localStorage.getItem(STORAGE_KEY)).toBe('dark');

        toggleTheme();

        expect(theme.value).toBe('light');
        expect(document.documentElement.classList.contains('dark')).toBe(false);
        expect(window.localStorage.getItem(STORAGE_KEY)).toBe('light');
    });
});
