<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Story extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'album_id',
        'album_name',
        'artist_name',
        'album_cover',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
