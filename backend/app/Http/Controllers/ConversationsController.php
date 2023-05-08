<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conversation;
use App\Models\Message;

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


    public function getMessages(Request $request, $with_user) {
        $user_id = $request->user()['id'];

        $conversation = Conversation::where(function ($query) use ($user_id, $with_user) {
            $query->where("user1_id", $user_id)->where("user2_id", $with_user);
        })
        ->orWhere(function ($query) use ($user_id, $with_user) {
            $query->where("user1_id", $with_user)->where("user2_id", $user_id);
        })->first();

        if (!$conversation) {
            //TODO: создать беседу
            return response()->json(["messages" => []]);
        }

        $messages = Message::where('conversation_id', $conversation['id'])->get();

        return response()->json(["messages" => $messages]);
    }
}
