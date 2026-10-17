<?php

use App\Enums\UserRole;
use App\Models\User;

test('sends each role to the panel that matches their role after logging in', function (UserRole $role, string $path) {
    $user = User::factory()->create(['role' => $role]);

    $response = $this->post('/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticatedAs($user);
    $response->assertRedirect($path);
})->with([
    'administrator' => [UserRole::Admin, '/admin/dashboard'],
    'human resources' => [UserRole::Hr, '/admin/dashboard'],
    'employee' => [UserRole::Employee, '/portal/dashboard'],
]);

test('allows administrators and human resources into the administration panel', function (UserRole $role) {
    $response = $this->actingAs(User::factory()->create(['role' => $role]))->get('/admin/dashboard');

    $response->assertOk();
})->with([UserRole::Admin, UserRole::Hr]);

test('redirects an employee away from the administration panel to their portal', function () {
    $response = $this->actingAs(User::factory()->employee()->create())->get('/admin/dashboard');

    $response->assertRedirect('/portal/dashboard');
});

test('allows every role into the employee portal', function (UserRole $role) {
    $response = $this->actingAs(User::factory()->create(['role' => $role]))->get('/portal/dashboard');

    $response->assertOk();
})->with(UserRole::cases());

test('redirects an employee to their portal after confirming their password', function () {
    $response = $this->actingAs(User::factory()->employee()->create())
        ->post('/user/confirm-password', ['password' => 'password']);

    $response->assertRedirect('/portal/dashboard');
});
