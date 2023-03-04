<?php

namespace Tests\Feature\Api\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    private string $registerRoute = "register";
    private string $validPassword = "111111111";
    private array $headers = [
        "Accept" => "application/json"
    ];

    protected function getRoute() {
        return route($this->registerRoute);
    }


    public function test_cannot_register_with_wrong_data(): void
    {
        $response = $this->postJson($this->getRoute(), array_merge([
            'name' => '',
            'email' => "",
            'password' => "",
            'password_confirmation' => "",
        ]), $this->headers);

        $response->assertStatus(422);
        $this->assertGuest();
    }


    public function test_can_register() {
        $response = $this->postJson($this->getRoute(), array_merge([
            'name' => "test".time(),
            'email' => "test".time()."@gmail.com",
            'password' => $this->validPassword,
            'password_confirmation' => $this->validPassword,
        ]), $this->headers);

        $response->assertStatus(201);
        $response->assertJson([
            'created' => true,
        ]);
    }

}
