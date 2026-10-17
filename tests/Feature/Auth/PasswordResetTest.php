<?php

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Password;
use Inertia\Testing\AssertableInertia as Assert;

test('renders the reset link request screen for a guest', function () {
    $response = $this->get('/forgot-password');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page->component('auth/ForgotPassword'));
});

test('renders the reset password screen with the email and token from the link', function () {
    $response = $this->get('/reset-password/reset-token?email=carlos.mendez@company.com');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('auth/ResetPassword')
        ->where('token', 'reset-token')
        ->where('email', 'carlos.mendez@company.com'));
});

test('emails the reset link to a registered user', function () {
    Notification::fake();
    $user = User::factory()->create();

    $response = $this->from('/forgot-password')->post('/forgot-password', [
        'email' => $user->email,
    ]);

    Notification::assertSentTo($user, ResetPassword::class);
    $response->assertRedirect('/forgot-password');
    $response->assertSessionHas('status', trans('passwords.sent'));
});

test('shares the reset link status with the request screen', function () {
    $user = User::factory()->create();

    $this->from('/forgot-password')->post('/forgot-password', [
        'email' => $user->email,
    ]);

    $response = $this->get('/forgot-password');

    $response->assertInertia(fn (Assert $page) => $page->where('status', trans('passwords.sent')));
});

test('does not email a reset link to an unknown address', function () {
    Notification::fake();

    $response = $this->from('/forgot-password')->post('/forgot-password', [
        'email' => 'nobody@company.com',
    ]);

    Notification::assertNothingSent();
    $response->assertRedirect('/forgot-password');
    $response->assertSessionHasErrors(['email' => trans('passwords.user')]);
});

test('requires a valid email to request a reset link', function () {
    Notification::fake();

    $response = $this->from('/forgot-password')->post('/forgot-password', [
        'email' => 'not-an-email',
    ]);

    Notification::assertNothingSent();
    $response->assertSessionHasErrors('email');
});

test('resets the password with a valid token', function () {
    $user = User::factory()->create();
    $token = Password::broker()->createToken($user);

    $response = $this->post('/reset-password', [
        'token' => $token,
        'email' => $user->email,
        'password' => 'new-secret-password',
        'password_confirmation' => 'new-secret-password',
    ]);

    $response->assertRedirect('/login');
    $response->assertSessionHas('status', trans('passwords.reset'));
    expect(Hash::check('new-secret-password', $user->refresh()->password))->toBeTrue();
});

test('shares the reset status with the login screen', function () {
    $user = User::factory()->create();
    $token = Password::broker()->createToken($user);

    $this->post('/reset-password', [
        'token' => $token,
        'email' => $user->email,
        'password' => 'new-secret-password',
        'password_confirmation' => 'new-secret-password',
    ]);

    $response = $this->get('/login');

    $response->assertInertia(fn (Assert $page) => $page->where('status', trans('passwords.reset')));
});

test('rejects a reset with an invalid token', function () {
    $user = User::factory()->create();

    $response = $this->from('/reset-password/invalid-token')->post('/reset-password', [
        'token' => 'invalid-token',
        'email' => $user->email,
        'password' => 'new-secret-password',
        'password_confirmation' => 'new-secret-password',
    ]);

    $response->assertRedirect('/reset-password/invalid-token');
    $response->assertSessionHasErrors(['email' => trans('passwords.token')]);
    expect(Hash::check('password', $user->refresh()->password))->toBeTrue();
});

test('requires a confirmed password to reset', function () {
    $user = User::factory()->create();
    $token = Password::broker()->createToken($user);

    $response = $this->post('/reset-password', [
        'token' => $token,
        'email' => $user->email,
        'password' => 'new-secret-password',
        'password_confirmation' => 'different-password',
    ]);

    $response->assertSessionHasErrors('password');
    expect(Hash::check('password', $user->refresh()->password))->toBeTrue();
});
