<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function getUserById($id) {
        $user = User::getUserById($id);
        if (!$user) {
            return response(["status" => false, "message" => "Пользователь не найден"], 404);
        }

        return response($user);
    }
}
