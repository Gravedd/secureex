<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Support\Facades\DB;
use App\Events\UserSendFile;

class ConversationsController extends Controller {

    public function getUserConversationsAll(Request $request) {
        $conversations = Conversation::getUserConversationsWithUserAndLastMessage($request->user());

        return response()->json(["conversations" => $conversations]);
    }

    public function getUserConversationsUsers(Request $request) {
        $conversations = Conversation::getUserConversationsWithUser($request->user());

        return response()->json(["conversations" => $conversations]);
    }

    public function getUserConversationsClean(Request $request) {
        $conversations = Conversation::getUserConversations($request->user());

        return response()->json(["conversations" => $conversations]);
    }

    public function getMessages(Request $request, $with_user) {
        $user_id = $request->user()['id'];

        $conversation = Conversation::findConversation($user_id, $with_user);

        if (!$conversation) { //TODO: создать беседу
            return response()->json(["messages" => []]);
        }

        $messages = Message::getMessages($conversation['id']);

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
