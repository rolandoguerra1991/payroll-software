<script setup lang="ts">
import type { IconName } from '@/types';

defineProps<{ name: IconName }>();

const paths: Record<IconName, string[]> = {
    alert: [
        'M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z',
        'M12 9v4',
        'M12 17h.01',
    ],
    'arrow-right': ['M5 12h14', 'M12 5l7 7-7 7'],
    briefcase: [
        'M4 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z',
        'M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
        'M2 13h20',
    ],
    building: [
        'M3 21h18',
        'M5 21V7l7-4 7 4v14',
        'M9 21v-4h6v4',
        'M9 9h.01',
        'M15 9h.01',
        'M9 13h.01',
        'M15 13h.01',
    ],
    calendar: [
        'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
        'M16 2v4',
        'M8 2v4',
        'M3 10h18',
    ],
    check: ['M20 6 9 17l-5-5'],
    clock: [
        'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
        'M12 6v6l4 2',
    ],
    close: ['M18 6 6 18', 'M6 6l12 12'],
    dashboard: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M14 14h7v7h-7z', 'M3 14h7v7H3z'],
    download: [
        'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4',
        'M7 10l5 5 5-5',
        'M12 15V3',
    ],
    logout: ['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', 'M16 17l5-5-5-5', 'M21 12H9'],
    menu: ['M3 6h18', 'M3 12h18', 'M3 18h18'],
    moon: ['M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'],
    search: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'M21 21l-4.35-4.35'],
    sun: [
        'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z',
        'M12 1v2',
        'M12 21v2',
        'M4.22 4.22l1.42 1.42',
        'M18.36 18.36l1.42 1.42',
        'M1 12h2',
        'M21 12h2',
        'M4.22 19.78l1.42-1.42',
        'M18.36 5.64l1.42-1.42',
    ],
    'trending-up': ['M23 6l-9.5 9.5-5-5L1 18', 'M17 6h6v6'],
    user: [
        'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',
        'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
    ],
    users: [
        'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2',
        'M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
        'M22 21v-2a4 4 0 0 0-3-3.87',
        'M16 3.13a4 4 0 0 1 0 7.75',
    ],
    wallet: [
        'M20 12V8H6a2 2 0 0 1 0-4h12v4',
        'M4 6v12a2 2 0 0 0 2 2h14v-4',
        'M18 12a2 2 0 0 0 0 4h4v-4z',
    ],
};
</script>

<template>
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
    >
        <path
            v-for="(path, index) in paths[name]"
            :key="index"
            :d="path"
        />
    </svg>
</template>
