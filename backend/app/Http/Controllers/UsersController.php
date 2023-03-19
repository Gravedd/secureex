<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    public function getUser($param) {
        $user = $this->isIdOrName($param) ? User::getUserById($param) : User::getUserByName($param);

        return $user ? response($user) : response(["status" => false, "message" => "Пользователь не найден"], 404);
    }

    public function findUsersByParam($param) {
        $result = User::where("name", 'like', "%$param%")->get();

        return response($result);
    }


    public function selfEditUser(Request $request){
        $fields = $request->validate([
            'name' => 'string|unique:users,name',
            'email' => 'string|unique:users,email|email',
            'password' => 'string',
        ]);

        $user = $request->user();
        $user->fill($fields);

        if ($request->password) {
            $user->password = Hash::make($fields['password']);
        }

        $user->save();

        return response([
            "status" => true,
            "user" => $user,
        ]);
    }

    private function isIdOrName($nameOrId) {
        return (bool) intval($nameOrId);
    }

}
