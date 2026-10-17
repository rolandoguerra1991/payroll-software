<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('redirects guests from the password confirmation screen to the login screen', function () {
    $response = $this->get('/user/confirm-password');

    $response->assertRedirect('/login');
});

test('renders the password confirmation screen for an authenticated user', function () {
    $response = $this->actingAs(User::factory()->create())->get('/user/confirm-password');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page->component('auth/ConfirmPassword'));
});

test('confirms the password of the authenticated user', function () {
    $user = User::factory()->admin()->create();

    $response = $this->actingAs($user)->post('/user/confirm-password', [
        'password' => 'password',
    ]);

    $response->assertRedirect('/admin/dashboard');
    $response->assertSessionHas('auth.password_confirmed_at');
});

test('rejects a password that does not match the authenticated user', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->from('/user/confirm-password')
        ->post('/user/confirm-password', ['password' => 'wrong-password']);

    $response->assertRedirect('/user/confirm-password');
    $response->assertSessionHasErrors(['password' => 'The provided password was incorrect.']);
});
