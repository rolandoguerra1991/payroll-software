<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue';

defineProps<{ open: boolean; title: string }>();

const emit = defineEmits<{ close: [] }>();
</script>

<template>
    <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-4 backdrop-blur-sm sm:items-center"
        role="presentation"
        @click.self="emit('close')"
    >
        <div
            class="w-full max-w-lg rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900"
            role="dialog"
            aria-modal="true"
            :aria-label="title"
            tabindex="-1"
            @keydown.esc="emit('close')"
        >
            <div
                class="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800"
            >
                <h2
                    class="text-sm font-semibold text-slate-900 dark:text-white"
                >
                    {{ title }}
                </h2>
                <button
                    type="button"
                    class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                    aria-label="Close dialog"
                    @click="emit('close')"
                >
                    <Icon name="close" class="h-4 w-4" />
                </button>
            </div>

            <div class="p-5">
                <slot />
            </div>
        </div>
    </div>
</template>
