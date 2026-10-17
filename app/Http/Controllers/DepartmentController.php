<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDepartmentRequest;
use App\Http\Requests\UpdateDepartmentRequest;
use App\Models\Department;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class DepartmentController extends Controller
{
    /**
     * Display the department hierarchy.
     */
    public function index(): Response
    {
        return Inertia::render('admin/Departments', [
            'departments' => Department::query()
                ->orderBy('name')
                ->get(['id', 'name', 'parent_id'])
                ->map(fn (Department $department): array => [
                    'id' => $department->id,
                    'name' => $department->name,
                    'parent_id' => $department->parent_id,
                ])
                ->all(),
        ]);
    }

    /**
     * Store a newly created department.
     */
    public function store(StoreDepartmentRequest $request): RedirectResponse
    {
        Department::create($request->validated());

        return to_route('admin.departments.index')->with('status', 'Department created.');
    }

    /**
     * Update the given department.
     */
    public function update(UpdateDepartmentRequest $request, Department $department): RedirectResponse
    {
        $department->update($request->validated());

        return to_route('admin.departments.index')->with('status', 'Department updated.');
    }

    /**
     * Delete the given department.
     */
    public function destroy(Department $department): RedirectResponse
    {
        $department->delete();

        return to_route('admin.departments.index')->with('status', 'Department deleted.');
    }
}
