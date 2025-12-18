<?php

namespace App\Http\Controllers;

use App\Models\StoryItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoryItemController extends Controller
{
    public function index()
    {
        return Inertia::render('Story/Index', [
            'items' => StoryItem::where('user_id', auth()->id())
                ->latest()
                ->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'album_name'  => 'required|string',
            'artist_name' => 'required|string',
            'album_cover' => 'nullable|string',
            'track_count' => 'nullable|integer',
            'preview_url' => 'nullable|string', 
        ]);

        StoryItem::create([
            'user_id' => auth()->id(),
            ...$validated
        ]);

        return redirect()->route('story.index')->with('success', 'Added to Story!');
    }

   
    public function update(Request $request, StoryItem $storyItem)
    {
        // 1. Security: Ensure the user owns this item before editing
        if ($storyItem->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        // 2. Validate the updates (ratings, favorites, notes)
        $validated = $request->validate([
            'rating'   => 'nullable|integer|min:1|max:5',
            'favorite' => 'boolean',
            'notes'    => 'nullable|string|max:1000',
        ]);

        // 3. Save changes
        $storyItem->update($validated);

        // 4. Return back 
        return back();
    }

    public function destroy(StoryItem $storyItem)
    {
        // Security check
        if ($storyItem->user_id === auth()->id()) {
            $storyItem->delete();
        }
        
        return back();
    }
}