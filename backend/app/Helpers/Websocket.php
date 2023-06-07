<?php


namespace App\Helpers;


class Websocket {

    /** @var \App\Helpers\Websocket */
    private static $client;

    static function get() {
        if (empty(self::$client)) {
            self::$client = new self();
        }
        return self::$client;
    }

    private function __construct() {

    }

}
