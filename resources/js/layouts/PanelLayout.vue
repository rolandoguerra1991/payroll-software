<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import AppSidebar from '@/components/shell/AppSidebar.vue';
import Icon from '@/components/ui/Icon.vue';
import { useTheme } from '@/composables/useTheme';
import { USER_ROLE_LABELS } from '@/constants/roles';
import { logout } from '@/routes';
import type { IconName, NavigationItem, SidebarUser } from '@/types';

type PanelMeta = {
    brand: string;
    caption: string;
    switchLabel: string;
    switchHref: string;
    switchIcon: IconName;
};

const adminNavigation: NavigationItem[] = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: 'dashboard' },
    { label: 'Employees', href: '/admin/employees', icon: 'users' },
    { label: 'Attendance', href: '/admin/attendance', icon: 'clock' },
    { label: 'Departments', href: '/admin/departments', icon: 'building' },
    { label: 'Positions', href: '/admin/positions', icon: 'briefcase' },
];

const portalNavigation: NavigationItem[] = [
    { label: 'Dashboard', href: '/portal/dashboard', icon: 'dashboard' },
    { label: 'My payroll', href: '/portal/payroll', icon: 'wallet' },
    { label: 'My attendance', href: '/portal/attendance', icon: 'clock' },
    { label: 'My profile', href: '/portal/profile', icon: 'user' },
];

const adminPanel: PanelMeta = {
    brand: 'Payroll HR',
    caption: 'Human Resources panel',
    switchLabel: 'Open employee portal',
    switchHref: '/portal/dashboard',
    switchIcon: 'wallet',
};

const portalPanel: PanelMeta = {
    brand: 'Employee Portal',
    caption: 'Your payroll and attendance',
    switchLabel: 'Back to HR panel',
    switchHref: '/admin/dashboard',
    switchIcon: 'users',
};

const page = usePage();
const sidebarOpen = ref(false);
const { theme, toggleTheme } = useTheme();
const logoutUrl = logout.url();

const isAdmin = computed(() => page.url.startsWith('/admin'));
const canAccessAdminPanel = computed(
    () => page.props.auth.user.role !== 'employee',
);
const navigation = computed(() =>
    isAdmin.value ? adminNavigation : portalNavigation,
);
const panel = computed(() => (isAdmin.value ? adminPanel : portalPanel));
const sidebarUser = computed<SidebarUser>(() => ({
    name: page.props.auth.user.name,
    role: USER_ROLE_LABELS[page.props.auth.user.role],
}));
// Employees cannot reach the administration panel, so they get no panel switch.
const panelSwitch = computed(() =>
    canAccessAdminPanel.value ? panel.value : null,
);
const themeLabel = computed(() =>
    theme.value === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
);
const themeIcon = computed(() => (theme.value === 'dark' ? 'sun' : 'moon'));
</script>

<template>
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div
            v-if="sidebarOpen"
            class="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
            aria-hidden="true"
            @click="sidebarOpen = false"
        />

        <AppSidebar
            :open="sidebarOpen"
            :items="navigation"
            :active-href="page.url"
            :brand="panel.brand"
            :caption="panel.caption"
            :user="sidebarUser"
            :switch-label="panelSwitch?.switchLabel"
            :switch-href="panelSwitch?.switchHref"
            :switch-icon="panelSwitch?.switchIcon"
            :logout-href="logoutUrl"
            @close="sidebarOpen = false"
        />

        <div class="flex min-h-screen flex-col lg:pl-72">
            <header
                class="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 dark:border-slate-800 dark:bg-slate-900/95"
            >
                <button
                    type="button"
                    class="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden dark:text-slate-400 dark:hover:bg-slate-800"
                    aria-label="Open navigation menu"
                    @click="sidebarOpen = true"
                >
                    <Icon name="menu" class="h-5 w-5" />
                </button>

                <p
                    class="hidden text-sm text-slate-500 md:block dark:text-slate-400"
                >
                    {{ panel.caption }}
                </p>

                <div class="ml-auto flex items-center gap-2 sm:gap-3">
                    <label class="relative hidden md:block">
                        <span class="sr-only">Search</span>
                        <Icon
                            name="search"
                            class="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            type="search"
                            placeholder="Search..."
                            class="h-10 w-56 rounded-lg border border-slate-200 bg-slate-50 pr-3 pl-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                        />
                    </label>

                    <button
                        type="button"
                        class="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                        :aria-label="themeLabel"
                        @click="toggleTheme"
                    >
                        <Icon :name="themeIcon" class="h-5 w-5" />
                    </button>
                </div>
            </header>

            <main class="flex-1 px-4 py-6 sm:px-6 lg:px-8">
                <slot />
            </main>
        </div>
    </div>
</template>
