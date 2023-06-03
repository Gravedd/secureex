<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'nickname',
        'email',
        'password',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function conversations() {
        return $this->hasMany(Conversation::class, 'user1_id', 'id')
            ->orWhere('user2_id', "=",$this->id);
    }

    public function messages() {
        return $this->hasMany(Message::class, 'user_id', 'id');
    }

    protected static function getUserPublic() {
        return self::select(["id", "name", "nickname", "email", "avatar", "created_at"]);
    }

    public static function getUserById($id) {
        return self::getUserPublic()->find($id);
    }

    public static function getUserByName($name) {
        return self::getUserPublic()->Where('nickname', 'LIKE', $name)->first();
    }

}
