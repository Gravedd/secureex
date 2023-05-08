<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conversation;

class ConversationsController extends Controller {

    public function getUserConversationsAll(Request $request) {
        $conversations = $request->user()->conversations()->with(['messages' => function ($query) {
            $query->orderBy('id', "desc")->take(1)/*->with('user')*/;
        }])->with('user1')->with('user2')->get();

        $conversations = Conversation::filterUser($conversations, $request->user()['id']);


        return response()->json(["conversations" => $conversations]);
    }

    public function getUserConversationsUsers(Request $request) {
        $conversations = $request->user()->conversations()->with('user1')->with('user2')->get();

        $conversations = Conversation::filterUser($conversations, $request->user()['id']);

        return response()->json(["conversations" => $conversations]);
    }

    public function getUserConversationsClean(Request $request) {
        $conversations = $request->user()->conversations()->get();

        return response()->json(["conversations" => $conversations]);
    }

}
