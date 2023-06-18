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

    protected $casts = [
        'created_at' => 'datetime:H:i:s Y-m-d',
        'updated_at' => 'datetime:H:i:s Y-m-d',
        'attach_data' => 'array',
    ];

    /*
     * Подготовить дату для сериализации массива / JSON.
     *
     * @param  \DateTimeInterface  $date
     * @return string
    protected function `serializeDate`(DateTimeInterface $date)
    {
        return $date->format('Y-m-d');
    }*/

    public static function getMessages($conversation_id) {
        return Message::where('conversation_id', $conversation_id)->get();
    }

}
