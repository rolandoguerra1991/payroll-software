import { ref, type Ref } from 'vue';

export type Theme = 'light' | 'dark';

export type UseTheme = {
    theme: Ref<Theme>;
    toggleTheme: () => void;
};

const STORAGE_KEY = 'payroll-theme';

function resolveTheme(): Theme {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (stored === 'light' || stored === 'dark') {
        return stored;
    }

    return document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'light';
}

export function useTheme(): UseTheme {
    const theme = ref<Theme>(resolveTheme());

    function apply(next: Theme): void {
        theme.value = next;
        document.documentElement.classList.toggle('dark', next === 'dark');
        window.localStorage.setItem(STORAGE_KEY, next);
    }

    apply(theme.value);

    function toggleTheme(): void {
        apply(theme.value === 'dark' ? 'light' : 'dark');
    }

    return { theme, toggleTheme };
}
