<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Lang;

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

    public function login(Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json(["status" => false, 'message' => 'Неправильный логин/пароль'], 401);
        }

        $token = Auth::user()->createToken('authtoken')->plainTextToken;

        return response(["status" => true, "token" => $token, "user" => Auth::user()]);
    }
}
