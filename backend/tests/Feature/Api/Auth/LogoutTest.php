<?php

namespace Tests\Feature\Api\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class LogoutTest extends TestCase
{
    private string $logoutRoute = "logout";
    private string $validPassword = "111111111";
    private array $headers = [
        "Accept" => "application/json"
    ];

    protected function getRoute() {
        return route($this->logoutRoute);
    }

    public function test_can_logout() {
        $userData = [
            "name" => "user_".\Str::random(10),
            'email' => "user_".\Str::random(10)."@gmail.com",
            'password' => Hash::make($this->validPassword),
        ];

        $user = User::create($userData);

        $response = $this->postJson(route("login"), array_merge([
            'email' => $userData['email'],
            'password' => $this->validPassword,
        ]), $this->headers);

        $response->assertStatus(200);
        $loginToken = $response->json()['token'];

        $response = $this->postJson($this->getRoute(),[], array_merge($this->headers, ["Authorization" => "Bearer ".$loginToken]));

        $response->assertStatus(204);
    }

    public function test_cannot_logout_with_bad_credentials() {
        $response = $this->postJson($this->getRoute(),[], array_merge($this->headers, ["Authorization" => "Bearer 18|dasdasdadsad"]));
        $response->assertStatus(401);
    }
}
