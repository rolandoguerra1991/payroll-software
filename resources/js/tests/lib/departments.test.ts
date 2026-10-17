import { describe, expect, it } from 'vitest';
import {
    buildDepartmentTree,
    departmentDescendantIds,
    flattenDepartmentTree,
    visibleDepartmentRows,
    type DepartmentOption,
} from '@/lib/departments';

const departments: DepartmentOption[] = [
    { id: 1, name: 'Technology', parent_id: null },
    { id: 2, name: 'Engineering', parent_id: 1 },
    { id: 3, name: 'IT Support', parent_id: 1 },
    { id: 4, name: 'Platform', parent_id: 2 },
    { id: 5, name: 'Operations', parent_id: null },
];

const tree = () => buildDepartmentTree(departments);

describe('buildDepartmentTree', () => {
    it('nests departments under their parent and sorts every level', () => {
        const roots = tree();

        expect(roots.map((node) => node.name)).toEqual([
            'Operations',
            'Technology',
        ]);

        const technology = roots[1];
        expect(technology.children.map((node) => node.name)).toEqual([
            'Engineering',
            'IT Support',
        ]);
        expect(
            technology.children[0].children.map((node) => node.name),
        ).toEqual(['Platform']);
    });

    it('promotes departments whose parent is missing to the top level', () => {
        const roots = buildDepartmentTree([
            { id: 1, name: 'Technology', parent_id: null },
            { id: 9, name: 'Orphan', parent_id: 404 },
        ]);

        expect(roots.map((node) => node.name)).toEqual([
            'Orphan',
            'Technology',
        ]);
    });
});

describe('flattenDepartmentTree', () => {
    it('returns every department with its depth', () => {
        expect(
            flattenDepartmentTree(tree()).map((row) => [
                row.department.name,
                row.depth,
                row.hasChildren,
            ]),
        ).toEqual([
            ['Operations', 0, false],
            ['Technology', 0, true],
            ['Engineering', 1, true],
            ['Platform', 2, false],
            ['IT Support', 1, false],
        ]);
    });
});

describe('visibleDepartmentRows', () => {
    it('keeps only the descendants of expanded departments', () => {
        expect(
            visibleDepartmentRows(tree(), new Set([1])).map(
                (row) => row.department.name,
            ),
        ).toEqual(['Operations', 'Technology', 'Engineering', 'IT Support']);
    });

    it('shows only the top level when nothing is expanded', () => {
        expect(
            visibleDepartmentRows(tree(), new Set()).map(
                (row) => row.department.name,
            ),
        ).toEqual(['Operations', 'Technology']);
    });
});

describe('departmentDescendantIds', () => {
    it('collects every nested department below a branch', () => {
        expect(
            [...departmentDescendantIds(tree(), 1)].sort(
                (left, right) => left - right,
            ),
        ).toEqual([2, 3, 4]);
    });

    it('collects the subtree of a nested department', () => {
        expect([...departmentDescendantIds(tree(), 2)]).toEqual([4]);
    });

    it('returns nothing for an unknown department', () => {
        expect([...departmentDescendantIds(tree(), 404)]).toEqual([]);
    });
});
