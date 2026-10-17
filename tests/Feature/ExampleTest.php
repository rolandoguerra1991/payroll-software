<?php

test('redirects the home route to the login screen', function () {
    $response = $this->get(route('home'));

    $response->assertRedirect('/login');
});
