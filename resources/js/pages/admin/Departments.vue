<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import Icon from '@/components/ui/Icon.vue';
import Modal from '@/components/ui/Modal.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import TextInput from '@/components/ui/TextInput.vue';
import PanelLayout from '@/layouts/PanelLayout.vue';
import {
    buildDepartmentTree,
    departmentDescendantIds,
    flattenDepartmentTree,
    visibleDepartmentRows,
    type DepartmentOption,
} from '@/lib/departments';
import {
    destroy as destroyDepartment,
    store as storeDepartment,
    update as updateDepartment,
} from '@/routes/admin/departments';

defineOptions({ layout: PanelLayout });

const props = defineProps<{
    departments: DepartmentOption[];
    status?: string;
}>();

const form = useForm<{ name: string; parent_id: number | null }>({
    name: '',
    parent_id: null,
});

const editing = ref<DepartmentOption | null>(null);
const formOpen = ref(false);
const expanded = ref<Set<number>>(defaultExpandedIds());

const tree = computed(() => buildDepartmentTree(props.departments));
const rows = computed(() => visibleDepartmentRows(tree.value, expanded.value));
const formTitle = computed(() =>
    editing.value === null ? 'New department' : `Edit ${editing.value.name}`,
);
const description = computed(
    () =>
        `${props.departments.length} ${
            props.departments.length === 1 ? 'department' : 'departments'
        } · Master data for your organization.`,
);
const parentOptions = computed(() => {
    const excluded = new Set<number>();

    if (editing.value !== null) {
        excluded.add(editing.value.id);

        for (const id of departmentDescendantIds(
            tree.value,
            editing.value.id,
        )) {
            excluded.add(id);
        }
    }

    return flattenDepartmentTree(tree.value)
        .filter((row) => !excluded.has(row.department.id))
        .map((row) => ({
            id: row.department.id,
            label: `${'— '.repeat(row.depth)}${row.department.name}`,
        }));
});

function defaultExpandedIds(): Set<number> {
    return new Set(
        props.departments
            .filter((department) => department.parent_id !== null)
            .map((department) => department.parent_id as number),
    );
}

function toggle(departmentId: number): void {
    const next = new Set(expanded.value);

    if (next.has(departmentId)) {
        next.delete(departmentId);
    } else {
        next.add(departmentId);
    }

    expanded.value = next;
}

function openCreate(parentId: number | null = null): void {
    editing.value = null;
    form.reset();
    form.clearErrors();
    form.parent_id = parentId;
    formOpen.value = true;
}

function openEdit(department: DepartmentOption): void {
    editing.value = department;
    form.clearErrors();
    form.name = department.name;
    form.parent_id = department.parent_id;
    formOpen.value = true;
}

function closeForm(): void {
    formOpen.value = false;
    editing.value = null;
    form.reset();
    form.clearErrors();
}

function submit(): void {
    if (editing.value !== null) {
        form.put(updateDepartment.url(editing.value.id), {
            onSuccess: () => closeForm(),
        });

        return;
    }

    form.post(storeDepartment.url(), {
        onSuccess: () => closeForm(),
    });
}

function remove(department: DepartmentOption): void {
    if (
        !window.confirm(
            `Delete "${department.name}"? Its sub-departments will move to the top level.`,
        )
    ) {
        return;
    }

    form.delete(destroyDepartment.url(department.id));
}
</script>

<template>
    <div>
        <Head title="Departments" />

        <PageHeader title="Departments" :description="description">
            <template #actions>
                <Button @click="openCreate()">
                    <Icon name="plus" class="h-4 w-4" />
                    New department
                </Button>
            </template>
        </PageHeader>

        <p
            v-if="status"
            role="status"
            class="mb-6 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
        >
            {{ status }}
        </p>

        <Modal :open="formOpen" :title="formTitle" @close="closeForm">
            <form class="space-y-5" @submit.prevent="submit">
                <TextInput
                    id="name"
                    v-model="form.name"
                    name="name"
                    label="Name"
                    placeholder="e.g. Engineering"
                    autofocus
                    :error="form.errors.name"
                />

                <div>
                    <label
                        for="parent_id"
                        class="block text-sm font-medium text-slate-700 dark:text-slate-200"
                    >
                        Parent department
                    </label>
                    <select
                        id="parent_id"
                        v-model="form.parent_id"
                        name="parent_id"
                        :aria-invalid="form.errors.parent_id ? true : undefined"
                        :aria-describedby="
                            form.errors.parent_id
                                ? 'parent_id-error'
                                : undefined
                        "
                        class="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    >
                        <option :value="null">No parent (top level)</option>
                        <option
                            v-for="option in parentOptions"
                            :key="option.id"
                            :value="option.id"
                        >
                            {{ option.label }}
                        </option>
                    </select>
                    <p
                        v-if="form.errors.parent_id"
                        id="parent_id-error"
                        role="alert"
                        class="mt-2 text-sm text-red-600 dark:text-red-400"
                    >
                        {{ form.errors.parent_id }}
                    </p>
                </div>

                <div class="flex items-center gap-3">
                    <Button type="submit" :disabled="form.processing">
                        {{
                            editing === null
                                ? 'Create department'
                                : 'Save changes'
                        }}
                    </Button>
                    <Button variant="outline" @click="closeForm">
                        Cancel
                    </Button>
                </div>
            </form>
        </Modal>

        <Card>
            <div
                v-if="rows.length === 0"
                class="p-8 text-center text-sm text-slate-500 dark:text-slate-400"
            >
                No departments yet. Create the first one to get started.
            </div>

            <table v-else class="w-full text-left text-sm">
                <thead>
                    <tr
                        class="border-b border-slate-200 text-xs tracking-wide text-slate-500 uppercase dark:border-slate-800 dark:text-slate-400"
                    >
                        <th class="px-5 py-3 font-medium">Department</th>
                        <th class="px-5 py-3 font-medium">Sub-departments</th>
                        <th class="px-5 py-3 text-right font-medium">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr
                        v-for="row in rows"
                        :key="row.department.id"
                        class="hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    >
                        <td class="px-5 py-3">
                            <div
                                class="flex items-center gap-2"
                                :style="{
                                    paddingLeft: `${row.depth * 1.5}rem`,
                                }"
                            >
                                <button
                                    v-if="row.hasChildren"
                                    type="button"
                                    class="flex h-6 w-6 items-center justify-center rounded text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
                                    :aria-label="`Toggle ${row.department.name}`"
                                    :aria-expanded="
                                        expanded.has(row.department.id)
                                    "
                                    @click="toggle(row.department.id)"
                                >
                                    <Icon
                                        name="chevron-right"
                                        class="h-4 w-4 transition-transform"
                                        :class="
                                            expanded.has(row.department.id)
                                                ? 'rotate-90'
                                                : ''
                                        "
                                    />
                                </button>
                                <span
                                    v-else
                                    class="inline-block h-6 w-6"
                                    aria-hidden="true"
                                />
                                <span
                                    class="font-medium text-slate-900 dark:text-white"
                                >
                                    {{ row.department.name }}
                                </span>
                            </div>
                        </td>
                        <td
                            class="px-5 py-3 text-slate-500 dark:text-slate-400"
                        >
                            {{ row.department.children.length }}
                        </td>
                        <td class="px-5 py-3">
                            <div class="flex items-center justify-end gap-1">
                                <button
                                    type="button"
                                    class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                                    :aria-label="`Add sub-department to ${row.department.name}`"
                                    @click="openCreate(row.department.id)"
                                >
                                    <Icon name="plus" class="h-4 w-4" />
                                </button>
                                <button
                                    type="button"
                                    class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                                    :aria-label="`Edit ${row.department.name}`"
                                    @click="openEdit(row.department)"
                                >
                                    <Icon name="pencil" class="h-4 w-4" />
                                </button>
                                <button
                                    type="button"
                                    class="flex h-8 w-8 items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
                                    :aria-label="`Delete ${row.department.name}`"
                                    @click="remove(row.department)"
                                >
                                    <Icon name="trash" class="h-4 w-4" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Card>
    </div>
</template>
