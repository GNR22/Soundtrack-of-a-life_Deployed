<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MusicController;
use App\Http\Controllers\StoryItemController;
use App\Http\Controllers\ProfileController;
use App\Services\SpotifyService;
/*
|--------------------------------------------------------------------------
| Public Routes (NO auth)
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/*
|--------------------------------------------------------------------------
| Auth Routes (Breeze)
|--------------------------------------------------------------------------
*/

require __DIR__.'/auth.php';

/*
|--------------------------------------------------------------------------
| Protected Routes (AUTH REQUIRED)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {

   // Import the service at the top of the file if not already there, 
    // or just inject it like this:
   Route::get('/dashboard', function (SpotifyService $spotify) {
    return Inertia::render('Dashboard', [
        // This passes the data to your React component
        'featured' => $spotify->getFeaturedArtists() 
    ]);
})->name('dashboard');


    // MUSIC (API-driven)
    Route::get('/artist/{artist}', [MusicController::class, 'artist'])
        ->name('artist.show');

    Route::get('/artist/{artist}/albums', [MusicController::class, 'albums'])
        ->name('artist.albums');

    Route::get('/artist/{artist}/album/{album}', [MusicController::class, 'albumInfo'])
        ->name('artist.album');

    // STORY CRUD
    Route::get('/story-items', [StoryItemController::class, 'index'])
        ->name('story.index');

    Route::post('/story-items', [StoryItemController::class, 'store'])
        ->name('story.store');

    Route::patch('/story-items/{storyItem}', [StoryItemController::class, 'update'])
        ->name('story.update');

    Route::delete('/story-items/{storyItem}', [StoryItemController::class, 'destroy'])
        ->name('story.destroy');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/artist/{artist}/history', [MusicController::class, 'history'])
    ->name('artist.history');
    
    Route::get('/artist/{artist}/album/{id}', [MusicController::class, 'albumInfo'])
    ->name('artist.album');

    // Fetch Lyrics URL on demand
    Route::get('/lyrics/fetch', [MusicController::class, 'lyrics'])->name('lyrics.fetch');
});
