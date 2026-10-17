import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import Departments from '@/pages/admin/Departments.vue';
import type { DepartmentOption } from '@/lib/departments';

const form = vi.hoisted(() => ({
    values: {} as Record<string, unknown>,
    errors: {} as Record<string, string>,
    processing: false,
    reset: vi.fn(),
    clearErrors: vi.fn(),
    post: vi.fn((_url: string, options?: { onSuccess?: () => void }) =>
        options?.onSuccess?.(),
    ),
    put: vi.fn((_url: string, options?: { onSuccess?: () => void }) =>
        options?.onSuccess?.(),
    ),
    delete: vi.fn(),
}));

vi.mock('@inertiajs/vue3', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@inertiajs/vue3')>();

    return {
        ...actual,
        useForm: (data: Record<string, unknown>) => {
            form.values = data;

            return Object.assign(data, {
                errors: form.errors,
                processing: form.processing,
                reset: form.reset,
                clearErrors: form.clearErrors,
                post: form.post,
                put: form.put,
                delete: form.delete,
            });
        },
    };
});

const departments: DepartmentOption[] = [
    { id: 1, name: 'Technology', parent_id: null },
    { id: 2, name: 'Engineering', parent_id: 1 },
    { id: 3, name: 'IT Support', parent_id: 1 },
    { id: 4, name: 'Platform', parent_id: 2 },
    { id: 5, name: 'Operations', parent_id: null },
];

const mountPage = (
    overrides: { departments?: DepartmentOption[]; status?: string } = {},
) =>
    shallowMount(Departments, {
        props: { departments, ...overrides },
        global: {
            renderStubDefaultSlot: true,
            stubs: {
                PageHeader: false,
                Button: false,
                TextInput: false,
                Modal: false,
            },
        },
    });

const findButton = (wrapper: ReturnType<typeof mountPage>, label: string) => {
    const match = wrapper
        .findAll('button')
        .find((button) => button.text().includes(label));

    if (!match) {
        throw new Error(`Button "${label}" was not found`);
    }

    return match;
};

const optionLabels = (wrapper: ReturnType<typeof mountPage>) =>
    wrapper.findAll('#parent_id option').map((option) => option.text());

describe('admin/Departments', () => {
    beforeEach(() => {
        form.values = {};
        form.errors = {};
        form.processing = false;
        form.reset.mockClear();
        form.clearErrors.mockClear();
        form.post.mockClear();
        form.put.mockClear();
        form.delete.mockClear();
        window.confirm = vi.fn(() => true);
    });

    it('renders the hierarchy with every branch expanded', () => {
        const wrapper = mountPage();
        const text = wrapper.text();

        expect(wrapper.html()).toContain('title="Departments"');
        expect(text).toContain(
            '5 departments · Master data for your organization.',
        );
        expect(text).toContain('New department');
        expect(text).toContain('Technology');
        expect(text).toContain('Engineering');
        expect(text).toContain('Platform');
        expect(text).toContain('IT Support');
        expect(text).toContain('Operations');
        expect(
            wrapper
                .find('[aria-label="Toggle Technology"]')
                .attributes('aria-expanded'),
        ).toBe('true');
    });

    it('uses the singular label for a single department', () => {
        expect(
            mountPage({
                departments: [{ id: 1, name: 'Finance', parent_id: null }],
            }).text(),
        ).toContain('1 department · Master data for your organization.');
    });

    it('shows the empty state when there are no departments', () => {
        const wrapper = mountPage({ departments: [] });

        expect(wrapper.text()).toContain(
            'No departments yet. Create the first one to get started.',
        );
        expect(wrapper.find('table').exists()).toBe(false);
    });

    it('shows the flashed status message after a change', () => {
        expect(
            mountPage({ status: 'Department created.' })
                .find('[role="status"]')
                .text(),
        ).toBe('Department created.');
        expect(mountPage().find('[role="status"]').exists()).toBe(false);
    });

    it('collapses and expands a department branch', async () => {
        const wrapper = mountPage();

        await wrapper.find('[aria-label="Toggle Technology"]').trigger('click');

        expect(wrapper.text()).not.toContain('Engineering');
        expect(
            wrapper
                .find('[aria-label="Toggle Technology"]')
                .attributes('aria-expanded'),
        ).toBe('false');

        await wrapper.find('[aria-label="Toggle Technology"]').trigger('click');

        expect(wrapper.text()).toContain('Engineering');
    });

    it('creates a top-level department from the header action', async () => {
        const wrapper = mountPage();

        await findButton(wrapper, 'New department').trigger('click');

        expect(wrapper.find('h2').text()).toBe('New department');
        expect(form.values.parent_id).toBeNull();

        await wrapper.find('form').trigger('submit');

        expect(form.post).toHaveBeenCalledWith(
            '/admin/departments',
            expect.any(Object),
        );
        await nextTick();
        expect(wrapper.find('form').exists()).toBe(false);
    });

    it('keeps the typed name and parent in the form state', async () => {
        const wrapper = mountPage();

        await findButton(wrapper, 'New department').trigger('click');
        await wrapper.find('#name').setValue('Marketing');
        await wrapper.find('#parent_id').setValue('1');

        expect(form.values.name).toBe('Marketing');
        expect(form.values.parent_id).toBe(1);
    });

    it('creates a sub-department from a row action', async () => {
        const wrapper = mountPage();

        await wrapper
            .find('[aria-label="Add sub-department to Technology"]')
            .trigger('click');

        expect(wrapper.find('h2').text()).toBe('New department');
        expect(form.values.parent_id).toBe(1);
    });

    it('edits an existing department', async () => {
        const wrapper = mountPage();

        await wrapper.find('[aria-label="Edit Technology"]').trigger('click');

        expect(wrapper.find('h2').text()).toBe('Edit Technology');
        expect(form.values.name).toBe('Technology');
        expect(form.values.parent_id).toBeNull();

        await wrapper.find('form').trigger('submit');

        expect(form.put).toHaveBeenCalledWith(
            '/admin/departments/1',
            expect.any(Object),
        );
    });

    it('excludes the department and its descendants from the parent options', async () => {
        const wrapper = mountPage();

        await wrapper.find('[aria-label="Edit Technology"]').trigger('click');

        const labels = optionLabels(wrapper);

        expect(labels).toContain('No parent (top level)');
        expect(labels).toContain('Operations');
        expect(labels.some((label) => label.includes('Technology'))).toBe(
            false,
        );
        expect(labels.some((label) => label.includes('Engineering'))).toBe(
            false,
        );
        expect(labels.some((label) => label.includes('Platform'))).toBe(false);
        expect(labels.some((label) => label.includes('IT Support'))).toBe(
            false,
        );
    });

    it('keeps every department selectable when editing a leaf', async () => {
        const wrapper = mountPage();

        await wrapper.find('[aria-label="Edit Operations"]').trigger('click');

        expect(
            optionLabels(wrapper).some((label) => label.includes('Technology')),
        ).toBe(true);
    });

    it('shows the validation errors returned by the backend', async () => {
        form.errors = {
            name: 'The name field is required.',
            parent_id: 'The selected parent is invalid.',
        };

        const wrapper = mountPage();

        await findButton(wrapper, 'New department').trigger('click');

        expect(
            wrapper.findAll('[role="alert"]').map((alert) => alert.text()),
        ).toEqual([
            'The name field is required.',
            'The selected parent is invalid.',
        ]);
    });

    it('closes the form when cancelled', async () => {
        const wrapper = mountPage();

        await findButton(wrapper, 'New department').trigger('click');
        await findButton(wrapper, 'Cancel').trigger('click');

        expect(wrapper.find('form').exists()).toBe(false);
        expect(form.reset).toHaveBeenCalled();
    });

    it('closes the dialog from its close button', async () => {
        const wrapper = mountPage();

        await findButton(wrapper, 'New department').trigger('click');
        await wrapper.find('[aria-label="Close dialog"]').trigger('click');

        expect(wrapper.find('form').exists()).toBe(false);
    });

    it('deletes a department once confirmed', async () => {
        const wrapper = mountPage();

        await wrapper.find('[aria-label="Delete Technology"]').trigger('click');

        expect(window.confirm).toHaveBeenCalled();
        expect(form.delete).toHaveBeenCalledWith('/admin/departments/1');
    });

    it('keeps the department when the deletion is not confirmed', async () => {
        window.confirm = vi.fn(() => false);

        const wrapper = mountPage();

        await wrapper.find('[aria-label="Delete Technology"]').trigger('click');

        expect(form.delete).not.toHaveBeenCalled();
    });
});
