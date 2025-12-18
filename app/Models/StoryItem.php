<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StoryItem extends Model
{
    use HasFactory;

    protected $table = 'story_items';

    protected $fillable = [
        'user_id',
        'album_id',
        'album_name',
        'artist_name',
        'album_cover',
        'track_count',
        'preview_url',
    
        'notes',
        'rating',
        'favorite',
    ];

    /**
     * Casts help React understand the data types correctly.
     */
    protected $casts = [
        'favorite' => 'boolean', // Converts 0/1 to false/true automatically
        'rating' => 'integer',
        'track_count' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}