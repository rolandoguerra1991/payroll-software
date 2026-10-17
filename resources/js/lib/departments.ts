export type DepartmentOption = {
    id: number;
    name: string;
    parent_id: number | null;
};

export type DepartmentNode = DepartmentOption & {
    children: DepartmentNode[];
};

export type DepartmentRow = {
    department: DepartmentNode;
    depth: number;
    hasChildren: boolean;
};

/**
 * Turn the flat department list returned by the backend into a nested tree,
 * sorted alphabetically at every level. Departments pointing at a missing
 * parent are promoted to the top level so no branch is ever lost.
 */
export function buildDepartmentTree(
    departments: DepartmentOption[],
): DepartmentNode[] {
    const nodes = new Map<number, DepartmentNode>();

    for (const department of departments) {
        nodes.set(department.id, { ...department, children: [] });
    }

    const roots: DepartmentNode[] = [];

    for (const node of nodes.values()) {
        const parent =
            node.parent_id === null ? undefined : nodes.get(node.parent_id);

        if (parent === undefined) {
            roots.push(node);
        } else {
            parent.children.push(node);
        }
    }

    sortByName(roots);

    return roots;
}

/**
 * Flatten the whole tree into table rows, keeping the depth of each level.
 */
export function flattenDepartmentTree(
    nodes: DepartmentNode[],
): DepartmentRow[] {
    return walk(nodes, 0, () => true);
}

/**
 * Flatten the tree keeping only the descendants whose ancestors are expanded.
 */
export function visibleDepartmentRows(
    nodes: DepartmentNode[],
    expanded: ReadonlySet<number>,
): DepartmentRow[] {
    return walk(nodes, 0, (node) => expanded.has(node.id));
}

/**
 * The ids of every department nested below the given one.
 */
export function departmentDescendantIds(
    nodes: DepartmentNode[],
    departmentId: number,
): Set<number> {
    const descendants = new Set<number>();
    const target = findDepartmentNode(nodes, departmentId);

    if (target === undefined) {
        return descendants;
    }

    collectIds(target.children, descendants);

    return descendants;
}

function walk(
    nodes: DepartmentNode[],
    depth: number,
    shouldDescend: (node: DepartmentNode) => boolean,
): DepartmentRow[] {
    const rows: DepartmentRow[] = [];

    for (const node of nodes) {
        rows.push({
            department: node,
            depth,
            hasChildren: node.children.length > 0,
        });

        if (shouldDescend(node)) {
            rows.push(...walk(node.children, depth + 1, shouldDescend));
        }
    }

    return rows;
}

function sortByName(nodes: DepartmentNode[]): void {
    nodes.sort((left, right) => left.name.localeCompare(right.name));

    for (const node of nodes) {
        sortByName(node.children);
    }
}

function findDepartmentNode(
    nodes: DepartmentNode[],
    id: number,
): DepartmentNode | undefined {
    for (const node of nodes) {
        if (node.id === id) {
            return node;
        }

        const match = findDepartmentNode(node.children, id);

        if (match !== undefined) {
            return match;
        }
    }

    return undefined;
}

function collectIds(nodes: DepartmentNode[], ids: Set<number>): void {
    for (const node of nodes) {
        ids.add(node.id);
        collectIds(node.children, ids);
    }
}
