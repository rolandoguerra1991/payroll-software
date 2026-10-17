<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Laravel\Fortify\Contracts\PasswordConfirmedResponse as PasswordConfirmedResponseContract;
use Symfony\Component\HttpFoundation\Response;

class PasswordConfirmedResponse implements PasswordConfirmedResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     *
     * @return Response
     */
    public function toResponse($request)
    {
        if ($request->wantsJson()) {
            return new JsonResponse('', 201);
        }

        return redirect()->intended($request->user()->homePath());
    }
}
