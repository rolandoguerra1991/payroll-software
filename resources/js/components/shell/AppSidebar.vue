<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';
import Icon from '@/components/ui/Icon.vue';
import { cn } from '@/lib/utils';
import type { IconName, NavigationItem, SidebarUser } from '@/types';

const props = defineProps<{
    open: boolean;
    items: NavigationItem[];
    activeHref: string;
    brand: string;
    caption: string;
    user: SidebarUser;
    switchLabel?: string;
    switchHref?: string;
    switchIcon?: IconName;
    logoutHref: string;
}>();

const emit = defineEmits<{ close: [] }>();

const activeClasses =
    'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400';
const idleClasses =
    'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white';

const initials = computed(() =>
    props.user.name
        .split(' ')
        .map((word) => word.charAt(0))
        .slice(0, 2)
        .join('')
        .toUpperCase(),
);
</script>

<template>
    <aside
        class="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 dark:border-slate-800 dark:bg-slate-900"
        :class="open ? 'translate-x-0' : '-translate-x-full'"
    >
        <div
            class="flex h-16 items-center gap-3 border-b border-slate-200 px-6 dark:border-slate-800"
        >
            <span
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white"
            >
                <Icon name="wallet" class="h-5 w-5" />
            </span>
            <div class="min-w-0">
                <p
                    class="truncate text-sm font-semibold text-slate-900 dark:text-white"
                >
                    {{ brand }}
                </p>
                <p class="truncate text-xs text-slate-500 dark:text-slate-400">
                    {{ caption }}
                </p>
            </div>
        </div>

        <nav
            class="flex-1 overflow-y-auto px-3 py-4"
            aria-label="Primary navigation"
        >
            <ul class="space-y-1">
                <li v-for="item in items" :key="item.href">
                    <Link
                        :href="item.href"
                        :class="
                            cn(
                                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                item.href === activeHref
                                    ? activeClasses
                                    : idleClasses,
                            )
                        "
                        :aria-current="
                            item.href === activeHref ? 'page' : undefined
                        "
                        @click="emit('close')"
                    >
                        <Icon :name="item.icon" class="h-5 w-5 shrink-0" />
                        {{ item.label }}
                    </Link>
                </li>
            </ul>
        </nav>

        <div class="border-t border-slate-200 p-4 dark:border-slate-800">
            <Link
                v-if="switchHref && switchLabel && switchIcon"
                :href="switchHref"
                class="mb-3 flex items-center gap-3 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                @click="emit('close')"
            >
                <Icon :name="switchIcon" class="h-4 w-4 shrink-0" />
                {{ switchLabel }}
            </Link>

            <Link
                :href="logoutHref"
                method="post"
                as="button"
                class="mb-3 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                @click="emit('close')"
            >
                <Icon name="logout" class="h-4 w-4 shrink-0" />
                Sign out
            </Link>

            <div class="flex items-center gap-3 px-1">
                <span
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                    {{ initials }}
                </span>
                <div class="min-w-0">
                    <p
                        class="truncate text-sm font-medium text-slate-900 dark:text-white"
                    >
                        {{ user.name }}
                    </p>
                    <p
                        class="truncate text-xs text-slate-500 dark:text-slate-400"
                    >
                        {{ user.role }}
                    </p>
                </div>
            </div>
        </div>
    </aside>
</template>
