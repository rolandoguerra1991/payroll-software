<script setup lang="ts">
import { onMounted, ref } from 'vue';

const model = defineModel<string>({ required: true });

const props = withDefaults(
    defineProps<{
        id: string;
        label: string;
        type?: string;
        name?: string;
        autocomplete?: string;
        placeholder?: string;
        inputmode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric';
        autofocus?: boolean;
    }>(),
    {
        type: 'text',
        name: undefined,
        autocomplete: undefined,
        placeholder: undefined,
        inputmode: undefined,
        autofocus: false,
    },
);

const input = ref<HTMLInputElement | null>(null);

onMounted(() => {
    if (props.autofocus) {
        input.value?.focus();
    }
});
</script>

<template>
    <div>
        <label
            :for="id"
            class="block text-sm font-medium text-slate-700 dark:text-slate-200"
        >
            {{ label }}
        </label>
        <input
            :id="id"
            ref="input"
            v-model="model"
            :type="type"
            :name="name"
            :autocomplete="autocomplete"
            :placeholder="placeholder"
            :inputmode="inputmode"
            :autofocus="autofocus ? true : undefined"
            class="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
        />
    </div>
</template>
