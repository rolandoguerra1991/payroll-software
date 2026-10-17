<?php

test('does not expose the disabled authentication features', function (string $method, string $uri) {
    $response = $this->{$method}($uri);

    $response->assertNotFound();
})->with([
    'registration screen' => ['get', '/register'],
    'registration endpoint' => ['post', '/register'],
    'email verification notice' => ['get', '/email/verify'],
    'email verification notification' => ['post', '/email/verification-notification'],
    'profile information update' => ['put', '/user/profile-information'],
    'password update' => ['put', '/user/password'],
    'passkey login' => ['post', '/passkeys/login'],
    'passkey login options' => ['get', '/passkeys/login/options'],
    'passkey registration' => ['post', '/user/passkeys'],
]);
