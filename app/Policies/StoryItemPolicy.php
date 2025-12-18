<?php

namespace App\Policies;

use App\Models\StoryItem;
use App\Models\User;

class StoryItemPolicy
{
    public function update(User $user, StoryItem $item)
    {
        return $item->user_id === $user->id;
    }

    public function delete(User $user, StoryItem $item)
    {
        return $item->user_id === $user->id;
    }
}
