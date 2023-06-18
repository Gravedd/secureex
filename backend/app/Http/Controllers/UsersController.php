<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use App\Models\Conversation;
use App\Events\UserUpdateProfile;

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

        $result = User::where("name", 'like', "%$param%")->orWhere("nickname", "=", $param)->get();

        return response($result);
    }

    public function selfEditUser(Request $request){
        $user = $request->user();

        $newUserData = $request->validate([
            'name' => ['string', 'max:255'],
            'nickname' => ['string', 'max:255', Rule::unique('users')->ignore($user->id)],
        ]);

        if ($newUserData['name']) {
            $user->name = $newUserData['name'];
        }
        if ($newUserData['nickname']) {
            $user->nickname = $newUserData['nickname'];
        }
        $user->save();

        event(new UserUpdateProfile($user));

        return response()->json(["status" => true, "user" => $user]);
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

        event(new UserUpdateProfile($user));

        return response()->json(['path' => $filename], 201);
    }

    private function isIdOrName($nameOrId) {
        return (bool) intval($nameOrId);
    }

}
