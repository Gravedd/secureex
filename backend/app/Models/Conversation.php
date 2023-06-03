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

    public static function filterUser($conversations, $user_id) {
        foreach ($conversations as &$conversation) {
            $user_key = $conversation['user1']['id'] != $user_id ? 'user1' : 'user2';
            $conversation['user'] = $conversation[$user_key];
            unset($conversation['user1'], $conversation['user2']);
        }

        return $conversations;
    }

    public static function getLastMessage($conversations) {
        foreach ($conversations as &$conversation) {/** @var $conversation \App\Models\Conversation */
            $conversation['messages'] = [$conversation->messages()->orderBy("id")->first()];
        }

        return $conversations;
    }

}
