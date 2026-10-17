<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('renders the login screen for a guest', function () {
    $response = $this->get('/login');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page->component('auth/Login'));
});

test('redirects an authenticated user away from the login screen', function () {
    $response = $this->actingAs(User::factory()->create())->get('/login');

    $response->assertRedirect('/admin/dashboard');
});

test('authenticates a user with valid credentials', function () {
    $user = User::factory()->create();

    $response = $this->post('/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticatedAs($user);
    $response->assertRedirect('/admin/dashboard');
});

test('rejects credentials that do not match a user', function () {
    $user = User::factory()->create();

    $response = $this->from('/login')->post('/login', [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
    $response->assertRedirect('/login');
    $response->assertSessionHasErrors(['email' => trans('auth.failed')]);
});

test('requires an email and a password to log in', function () {
    $response = $this->from('/login')->post('/login');

    $this->assertGuest();
    $response->assertSessionHasErrors(['email', 'password']);
});

test('throttles repeated failed logins', function () {
    $user = User::factory()->create();

    foreach (range(1, 5) as $_) {
        $this->post('/login', ['email' => $user->email, 'password' => 'wrong-password']);
    }

    $response = $this->post('/login', ['email' => $user->email, 'password' => 'wrong-password']);

    $this->assertGuest();
    $response->assertStatus(429);
});

test('logs out the authenticated user', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/logout');

    $this->assertGuest();
    $response->assertRedirect('/');
});

test('redirects guests from the application pages to the login screen', function (string $path) {
    $response = $this->get($path);

    $response->assertRedirect('/login');
})->with([
    '/admin/dashboard',
    '/admin/employees',
    '/admin/attendance',
    '/admin/departments',
    '/admin/positions',
    '/portal/dashboard',
    '/portal/payroll',
    '/portal/attendance',
    '/portal/profile',
]);

test('renders the HR dashboard for an authenticated user', function () {
    $response = $this->actingAs(User::factory()->create())->get('/admin/dashboard');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page->component('admin/Dashboard'));
});
