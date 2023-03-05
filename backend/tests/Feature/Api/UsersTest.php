<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UsersTest extends TestCase {

    private string $loginRoute = "login";
    private string $getUserByIdRoute = "getUserById";
    private string $validPassword = "111111111";
    private array $headers = [
        "Accept" => "application/json"
    ];
    private static string $token = "";

    public function assertUserJson($response) {
        $response->assertJsonStructure(["id", "name", "email", "created_at"]);
    }

    public function test_can_get_user_by_id_with_auth() {
        $user = User::first();

        $response = $this->get(route($this->getUserByIdRoute, $user['id']), array_merge($this->headers, ["Authorization" => "Bearer ".$this->getAuthToken()]));

        $response->assertStatus(200);
        $this->assertUserJson($response);
    }

    public function test_cannot_get_user_by_id_without_auth() {
        $user = User::first();

        $response = $this->get(route($this->getUserByIdRoute, $user['id']), array_merge($this->headers, ["Authorization" => "Bearer 1|dasdasdad"]));

        $response->assertStatus(401);
    }


    public function test_cannot_get_non_existent_user_user_by_id() {
        $response = $this->get(route($this->getUserByIdRoute, 0), array_merge($this->headers, ["Authorization" => "Bearer ".$this->getAuthToken()]));
        $response->assertStatus(404);
    }


    public function getAuthToken() {
        if (!empty(self::$token)) {
            return self::$token;
        }
        $userData = [
            "name" => "user_".\Str::random(10),
            'email' => "user_".\Str::random(10)."@gmail.com",
            'password' => Hash::make($this->validPassword),
        ];

        $user = User::create($userData);

        $response = $this->postJson(route($this->loginRoute), [
            'email' => $userData['email'],
            'password' => $this->validPassword,
        ], $this->headers);

        $response->assertStatus(200);
        $loginToken = $response->json()['token'];

        return self::$token = $loginToken;
    }
}
