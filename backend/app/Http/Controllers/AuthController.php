<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request) {
        $fields = $request->validate([
            'name' => 'required|string|',
            'email' => 'required|string|unique:users,email|email',
            'password' => 'required|string|confirmed',
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password']),
        ]);

        $token = $user->createToken("authtoken")->plainTextToken;

        return response([
            'created' => (bool) $user,
            'uid' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'token' => $token,
        ], 201);
    }
}
