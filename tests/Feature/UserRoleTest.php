<?php

use App\Enums\UserRole;
use App\Models\User;

test('casts the role attribute to the user role enum', function () {
    $user = User::factory()->hr()->create();

    expect($user->role)->toBe(UserRole::Hr)
        ->and($user->refresh()->role)->toBe(UserRole::Hr);
});

test('defaults the role of new users to employee', function () {
    expect(User::factory()->create()->role)->toBe(UserRole::Employee);
});

test('reports whether the user has any of the given roles', function () {
    $user = User::factory()->admin()->create();

    expect($user->hasRole(UserRole::Admin, UserRole::Hr))->toBeTrue()
        ->and($user->hasRole(UserRole::Employee))->toBeFalse();
});

test('resolves the home path for each role', function (UserRole $role, string $path) {
    expect(User::factory()->create(['role' => $role])->homePath())->toBe($path);
})->with([
    'administrator' => [UserRole::Admin, '/admin/dashboard'],
    'human resources' => [UserRole::Hr, '/admin/dashboard'],
    'employee' => [UserRole::Employee, '/portal/dashboard'],
]);

test('exposes a human readable label for each role', function (UserRole $role, string $label) {
    expect($role->label())->toBe($label);
})->with([
    [UserRole::Admin, 'Administrator'],
    [UserRole::Hr, 'Human Resources'],
    [UserRole::Employee, 'Employee'],
]);

test('exposes the scalar value of every role', function () {
    expect(UserRole::values())->toBe(['admin', 'hr', 'employee']);
});
