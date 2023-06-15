<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;
use App\Events\UserRegistered;
use App\Helpers\Websocket;
use App\Events\UserUpdateProfile;
use App\Events\UserSendFile;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void {
        Event::listen(UserRegistered::class, fn($event) => $this->sendEventToWebsocket("server.user.registered", $event->user));

        Event::listen(UserUpdateProfile::class, fn($event) => $this->sendEventToWebsocket("server.user.update", $event->user));

        Event::listen(UserSendFile::class, fn($event) => $this->sendEventToWebsocket("server.user.sendfile", $event->message));
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }

    /**
     * Send event data to websocket server
     * @param $action
     * @param $data
     * @throws \WebSocket\BadOpcodeException
     */
    private function sendEventToWebsocket($action, $data) {
        Websocket::get()->send(["action" => $action, "data" => $data]);
    }
}
