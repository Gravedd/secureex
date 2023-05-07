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


}
