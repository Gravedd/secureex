<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;

    protected $table = 'conversations';

    public function user1() {
        return $this->belongsTo(User::class, 'user1_id', 'id');
    }

    public function user2() {
        return $this->belongsTo(User::class, 'user2_id', 'id');
    }

    public function messages() {
        return $this->hasMany(Message::class, 'conversation_id', 'id');
    }


    public static function getUserConversationsWithUserAndLastMessage(User $user) {
        $user_id = $user['id'];
        $conversations = $user->conversations()->with('user1')->with('user2')
            ->withCount(['messages as unread_count' => function ($query) use ($user_id) {
                $query->where('read', 0)->where("user_id", "!=", $user_id);
            }])->get();
        $conversations = Conversation::filterUser($conversations, $user_id);

        return Conversation::getLastMessage($conversations);
    }

    public static function getUserConversationsWithUser(User $user) {
        $conversations = $user->conversations()->with('user1')->with('user2')->get();

        return Conversation::filterUser($conversations, $user['id']);
    }

    public static function getUserConversations(User $user) {
        return $user->conversations()->get();
    }

    public static function findConversation($user1, $user2) {
        return Conversation::where(function ($query) use ($user1, $user2) {
            $query->where('user1_id', '=', $user1)
                ->orWhere('user1_id', '=', $user2);
        })->orWhere(function ($query) use ($user1, $user2) {
            $query->where('user1_id', '=', $user2)
                ->orWhere('user1_id', '=', $user1);
        })->first();
    }


    private static function filterUser($conversations, $user_id) {
        foreach ($conversations as &$conversation) {
            $user_key = $conversation['user1']['id'] != $user_id ? 'user1' : 'user2';
            $conversation['user'] = $conversation[$user_key];
            unset($conversation['user1'], $conversation['user2']);
        }

        return $conversations;
    }

    private static function getLastMessage($conversations) {
        foreach ($conversations as &$conversation) {/** @var $conversation \App\Models\Conversation */
            $conversation['messages'] = [$conversation->messages()->latest()->first()];
        }

        return $conversations;
    }

}
