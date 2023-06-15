<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Support\Facades\DB;
use App\Events\UserSendFile;

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

    public function sendFile(Request $request) {
        $file = $request->file("file");
        if (!$file) {
            return response()->json(["message" => "файл не загружен"], 422);
        }

        $current_user = $request->user()->id;
        $to_user = $request->input("to_user");
        $uuid = $request->input("uuid");
        $conversation_id = Conversation::findConversation($current_user, $to_user);
        $conversation_id = $conversation_id['id'];

        $file->getMimeType();
        $path = $file->store('public/files');//storage/files/<filename>
        $filename = basename($path);

        $message = new Message();
        $message->user_id = $current_user;
        $message->read = 0;
        $message->conversation_id = $conversation_id;
        $message->body = "";
        $message->type = "file";
        $message->attach_data = [
            "path" => $filename,
            "filename" => $file->getClientOriginalName(),
            "filetype" => $file->getMimeType(),
            "size" => $file->getSize(),
        ];
        $message->save();

        $message->uuid = $uuid;
        event(new UserSendFile($message));

        return response()->json(['filename' => $filename, "uuid" => $uuid, "message" => $message], 201);
    }
}
