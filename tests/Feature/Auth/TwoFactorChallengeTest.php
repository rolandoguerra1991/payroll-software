<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use PragmaRX\Google2FA\Google2FA;

/**
 * Create a user with a confirmed two factor secret and optional recovery codes.
 *
 * @param  array<int, string>  $recoveryCodes
 */
function twoFactorUser(string $secret = 'JBSWY3DPEHPK3PXP', array $recoveryCodes = []): User
{
    return User::factory()->create([
        'two_factor_secret' => encrypt($secret),
        'two_factor_recovery_codes' => $recoveryCodes === [] ? null : encrypt(json_encode($recoveryCodes)),
        'two_factor_confirmed_at' => now(),
    ]);
}

test('redirects a login that needs a two factor challenge', function () {
    $user = twoFactorUser();

    $response = $this->post('/login', ['email' => $user->email, 'password' => 'password']);

    $this->assertGuest();
    $response->assertRedirect('/two-factor-challenge');
});

test('renders the two factor challenge for a pending login', function () {
    $user = twoFactorUser();
    $this->post('/login', ['email' => $user->email, 'password' => 'password']);

    $response = $this->get('/two-factor-challenge');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page->component('auth/TwoFactorChallenge'));
});

test('redirects the challenge screen to the login screen without a pending login', function () {
    $response = $this->get('/two-factor-challenge');

    $response->assertRedirect('/login');
});

test('authenticates the challenged user with a valid code', function () {
    $secret = 'JBSWY3DPEHPK3PXP';
    $user = twoFactorUser($secret);
    $this->post('/login', ['email' => $user->email, 'password' => 'password']);

    $response = $this->post('/two-factor-challenge', [
        'code' => app(Google2FA::class)->getCurrentOtp($secret),
    ]);

    $this->assertAuthenticatedAs($user);
    $response->assertRedirect('/portal/dashboard');
});

test('rejects an invalid two factor code', function () {
    $user = twoFactorUser();
    $this->post('/login', ['email' => $user->email, 'password' => 'password']);

    $response = $this->post('/two-factor-challenge', ['code' => '000000']);

    $this->assertGuest();
    $response->assertRedirect('/two-factor-challenge');
    $response->assertSessionHasErrors(['code' => 'The provided two factor authentication code was invalid.']);
});

test('authenticates the challenged user with a recovery code', function () {
    $user = twoFactorUser(recoveryCodes: ['recovery-code-one', 'recovery-code-two']);
    $this->post('/login', ['email' => $user->email, 'password' => 'password']);

    $response = $this->post('/two-factor-challenge', ['recovery_code' => 'recovery-code-one']);

    $this->assertAuthenticatedAs($user);
    $response->assertRedirect('/portal/dashboard');

    // Fortify burns the used recovery code and issues a fresh one in its place.
    $codes = $user->refresh()->recoveryCodes();

    expect($codes)->toHaveCount(2);
    expect($codes)->not->toContain('recovery-code-one');
    expect($codes)->toContain('recovery-code-two');
});

test('rejects an invalid recovery code', function () {
    $user = twoFactorUser(recoveryCodes: ['recovery-code-one']);
    $this->post('/login', ['email' => $user->email, 'password' => 'password']);

    $response = $this->post('/two-factor-challenge', ['recovery_code' => 'wrong-recovery-code']);

    $this->assertGuest();
    $response->assertRedirect('/two-factor-challenge');
    $response->assertSessionHasErrors(['recovery_code' => 'The provided two factor recovery code was invalid.']);
    expect($user->refresh()->recoveryCodes())->toBe(['recovery-code-one']);
});
