<?php

namespace Tests\Feature\Api\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class LoginTest extends TestCase
{
    private string $loginRoute = "login";
    private string $validPassword = "111111111";
    private array $headers = [
        "Accept" => "application/json"
    ];

    protected function getRoute() {
        return route($this->loginRoute);
    }

    public function test_can_success_login() {
        $userData = [
            "name" => "user_".\Str::random(10),
            'email' => "user_".\Str::random(10)."@gmail.com",
            'password' => Hash::make($this->validPassword),
        ];

        $user = User::create($userData);

        $response = $this->postJson($this->getRoute(), array_merge([
            'email' => $userData['email'],
            'password' => $this->validPassword,
        ]), $this->headers);

        $response->assertStatus(200);
        $this->assertAuthenticated();
    }


    public function test_cannot_success_login_with_bad_conditionals() {
        $response = $this->postJson($this->getRoute(), array_merge([
            'email' => "user".time()."@mail.com",
            'password' => "wrongPassword",
        ]), $this->headers);

        $response->assertStatus(401);
        $this->assertGuest();
    }

}
