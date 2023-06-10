<?php

namespace App\Listeners;

use App\Events\UserRegistered;
use App\Helpers\Websocket;

class UserRegisteredListener
{

    public function handle(UserRegistered $event): void {
        Websocket::get()->send(["action" => "server.user.registered", "data" => $event->user]);
    }
}
