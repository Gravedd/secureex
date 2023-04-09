<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller {

    public function getUser($param) {
        $user = $this->isIdOrName($param) ? User::getUserById($param) : User::getUserByName($param);

        return $user ? response($user) : response(["status" => false, "message" => "Пользователь не найден"], 404);
    }

    public function findUsersByParam(Request $request) {
        $param = $request->get("query");

        if (empty($param)) {
            return response([]);
        }

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

    public function uploadAvatar(Request $request) {
        $file = $request->file("file");
        if (!$file) {
            return response()->json(["message" => "файл не загружен"], 422);
        }

        $path = $file->store('public/avatars');
        $filename = basename($path);
        $user = $request->user();
        $user->avatar = $filename;
        $user->save();

        return response()->json(['path' => $filename], 201);
    }


    private function isIdOrName($nameOrId) {
        return (bool) intval($nameOrId);
    }

}
