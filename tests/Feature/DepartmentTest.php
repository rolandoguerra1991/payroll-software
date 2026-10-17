<?php

use App\Enums\UserRole;
use App\Models\Department;
use App\Models\User;
use Database\Seeders\DepartmentSeeder;
use Inertia\Testing\AssertableInertia as Assert;

test('shows the department hierarchy to administrators and human resources', function (UserRole $role) {
    Department::factory()->create(['name' => 'Technology']);

    $response = $this->actingAs(User::factory()->create(['role' => $role]))
        ->get('/admin/departments');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/Departments')
        ->has('departments', 1)
        ->where('departments.0.name', 'Technology')
        ->where('departments.0.parent_id', null));
})->with([
    'administrator' => [UserRole::Admin],
    'human resources' => [UserRole::Hr],
]);

test('redirects employees away from the department administration', function () {
    $response = $this->actingAs(User::factory()->employee()->create())
        ->get('/admin/departments');

    $response->assertRedirect('/portal/dashboard');
});

test('creates a top-level department', function () {
    $response = $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/departments', ['name' => 'Finance']);

    $response->assertRedirect('/admin/departments');
    $response->assertSessionHas('status', 'Department created.');
    $this->assertDatabaseHas('departments', ['name' => 'Finance', 'parent_id' => null]);
});

test('creates a sub-department under an existing department', function () {
    $parent = Department::factory()->create();

    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/departments', ['name' => 'Engineering', 'parent_id' => $parent->id]);

    $this->assertDatabaseHas('departments', ['name' => 'Engineering', 'parent_id' => $parent->id]);
});

test('requires a name to create a department', function () {
    $response = $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/departments', ['name' => '']);

    $response->assertSessionHasErrors('name');
    $this->assertDatabaseCount('departments', 0);
});

test('rejects a parent department that does not exist', function () {
    $response = $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/departments', ['name' => 'Engineering', 'parent_id' => 999]);

    $response->assertSessionHasErrors('parent_id');
    $this->assertDatabaseCount('departments', 0);
});

test('updates a department name and parent', function () {
    $department = Department::factory()->create(['name' => 'Technology']);
    $parent = Department::factory()->create(['name' => 'Operations']);

    $response = $this->actingAs(User::factory()->admin()->create())
        ->put("/admin/departments/{$department->id}", [
            'name' => 'Engineering',
            'parent_id' => $parent->id,
        ]);

    $response->assertRedirect('/admin/departments');
    $response->assertSessionHas('status', 'Department updated.');
    $this->assertDatabaseHas('departments', [
        'id' => $department->id,
        'name' => 'Engineering',
        'parent_id' => $parent->id,
    ]);
});

test('prevents a department from being nested under itself', function () {
    $department = Department::factory()->create(['name' => 'Technology']);

    $response = $this->actingAs(User::factory()->admin()->create())
        ->put("/admin/departments/{$department->id}", [
            'name' => 'Technology',
            'parent_id' => $department->id,
        ]);

    $response->assertSessionHasErrors('parent_id');
    expect($department->fresh()->parent_id)->toBeNull();
});

test('prevents a cycle by rejecting a descendant as parent', function () {
    $root = Department::factory()->create(['name' => 'Technology']);
    $child = Department::factory()->childOf($root)->create(['name' => 'Engineering']);
    $grandchild = Department::factory()->childOf($child)->create(['name' => 'Platform']);

    $response = $this->actingAs(User::factory()->admin()->create())
        ->put("/admin/departments/{$root->id}", [
            'name' => 'Technology',
            'parent_id' => $grandchild->id,
        ]);

    $response->assertSessionHasErrors('parent_id');
    expect($root->fresh()->parent_id)->toBeNull();
});

test('deletes a department and promotes its children to the top level', function () {
    $parent = Department::factory()->create(['name' => 'Technology']);
    $child = Department::factory()->childOf($parent)->create(['name' => 'Engineering']);

    $response = $this->actingAs(User::factory()->admin()->create())
        ->delete("/admin/departments/{$parent->id}");

    $response->assertRedirect('/admin/departments');
    $response->assertSessionHas('status', 'Department deleted.');
    $this->assertDatabaseMissing('departments', ['id' => $parent->id]);
    $this->assertDatabaseHas('departments', ['id' => $child->id, 'parent_id' => null]);
});

test('exposes the parent and children relationships and the roots scope', function () {
    $parent = Department::factory()->create();
    $child = Department::factory()->childOf($parent)->create();

    expect($parent->children)->toHaveCount(1)
        ->and($child->parent?->is($parent))->toBeTrue()
        ->and(Department::roots()->pluck('id')->all())->toBe([$parent->id]);
});

test('seeds a realistic department hierarchy', function () {
    $this->seed(DepartmentSeeder::class);

    expect(Department::roots()->pluck('name')->sort()->values()->all())
        ->toBe(['Finance', 'Operations', 'People', 'Technology'])
        ->and(Department::where('name', 'Engineering')->first()->parent->name)
        ->toBe('Technology')
        ->and(Department::where('name', 'Customer Support')->first()->parent->name)
        ->toBe('Operations');
});
