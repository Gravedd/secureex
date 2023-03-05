<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function getUser($param) {

        $user = $this->isIdOrName($param) ? User::getUserById($param) : User::getUserByName($param);

        if (!$user) {
            return response(["status" => false, "message" => "Пользователь не найден"], 404);
        }

        return response($user);
    }

    private function isIdOrName($nameOrId) {
        return (bool) intval($nameOrId);
    }

}
