<?php


namespace App\Helpers;


use WebSocket\Client;

class Websocket {

    private string $ws_url = "";
    private string $ws_key = "";

    private static Websocket $websocket;

    private Client $client;

    /**
     * Получить подключение к вебсокету
     * @return \App\Helpers\Websocket
     */
    static function get() {
        if (empty(self::$websocket)) {
            self::$websocket = new self();
        }
        return self::$websocket;
    }

    private function __construct() {
        $this->ws_url = env("WS_HOST");
        $this->ws_key = env("WS_KEY");
        $options = [
            "headers" => [
                "origin" => "localhost",
                "server_key" => $this->ws_key,
            ],
            "timeout" => 5,
        ];

        $this->client = new Client($this->ws_url, $options);
    }

    public function __destruct() {
        $this->close();
    }

    /**
     * Отправить данные в ws
     * @param $data
     * @throws \WebSocket\BadOpcodeException
     */
    public function send($data) {
        $data = array_merge($data, ["ws_key" => $this->ws_key]);
        $data = json_encode($data);
        $this->client->send($data);
    }

    /**
     * Закрыть соединение
     */
    public function close() {
        $this->client->close();
    }

}
