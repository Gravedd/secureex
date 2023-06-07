<?php

namespace Tests\Feature\Api\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class CheckUserTest extends TestCase
{
    private string $loginRoute = "login";
    private string $validPassword = "111111111";
    private array $headers = [
        "Accept" => "application/json"
    ];

    public function test_can_success_check_user() {
        $userData = [
            "name" => $name = "user_".\Str::random(10),
            "nickname" => $name,
            'email' => "user_".\Str::random(10)."@gmail.com",
            'password' => Hash::make($this->validPassword),
        ];

        $user = User::create($userData);

        $response = $this->postJson(route("login"), array_merge([
            'email' => $userData['email'],
            'password' => $this->validPassword,
        ]), $this->headers);

        $response->assertStatus(200);
        $this->assertAuthenticated();

        $tokenUser = $response->json()['token'];

        $response = $this->get(route("checkUser"),array_merge($this->headers, ["Authorization" => "Bearer ".$tokenUser]));

        $response->assertStatus(200);
        $this->assertAuthenticated();
    }

    public function test_cannot_success_check_user_with_bad_credentials() {
        $response = $this->get(route("checkUser"),array_merge($this->headers, ["Authorization" => "Bearer 18|dasdasdadsad"]));
        $response->assertStatus(401);
        $this->assertGuest();
    }
}
