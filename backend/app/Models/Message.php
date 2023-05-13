<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model {

    use HasFactory;

    protected $table = 'messages';

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function conversation()
    {
        return $this->belongsTo(Conversation::class, 'conversation_id', 'id');
    }
}