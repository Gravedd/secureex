<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Support\Facades\DB;

class ConversationsController extends Controller {

    public function getUserConversationsAll(Request $request) {
        $user_id = $request->user()['id'];
        $conversations = $request->user()->conversations()
            ->with('user1')
            ->with('user2')
            ->withCount(['messages as unread_count' => function ($query) use ($user_id) {
                $query->where('read', 0)->where("user_id", "!=", $user_id);
            }])
            ->get();

        $conversations = Conversation::filterUser($conversations, $request->user()['id']);
        $conversations = Conversation::getLastMessage($conversations);

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
