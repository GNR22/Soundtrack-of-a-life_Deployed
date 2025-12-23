<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\SpotifyService;
use App\Services\MusicBrainzService;
use App\Services\LastfmService; 
use App\Services\GeniusService;

class MusicController extends Controller
{
    protected $music;
    protected $brainz;
    protected $lastfm;
    protected $genius;

    // 4 services
    public function __construct(
        SpotifyService $music, 
        MusicBrainzService $brainz,
        LastfmService $lastfm,
        GeniusService $genius
    ) {
        $this->music = $music;
        $this->brainz = $brainz;
        $this->lastfm = $lastfm;
        $this->genius = $genius;
    }

    

public function index()
{
    // Check the cache first. If missing, ask Spotify.
    $featured = Cache::remember('dashboard_featured', 3600, function () {
        // FIX: Use $this->music, matching your constructor
        return $this->music->getFeaturedArtists(); 
    });

    return Inertia::render('Dashboard', [
        'featured' => $featured
    ]);
}
    private function getAuth(Request $request): array
    {
        return [
            'user' => $request->user(),
        ];
    }

    public function history(Request $request, $artist)
    {
        $history = $this->brainz->getArtistContext($artist);

        return Inertia::render('Artist/History', [
            'auth' => $this->getAuth($request),
            'artistName' => $artist,
            'history' => $history
        ]);
    }

    public function artist(Request $request, $artist)
    {
        $data = $this->music->getArtist($artist);

        return Inertia::render('Artist/Show', [
            'auth' => $this->getAuth($request),
            'artist' => $data
        ]);
    }

    public function albums(Request $request, $artist)
    {
        $albumData = $this->music->searchAlbum($artist);

        return Inertia::render('Artist/Albums', [
            'auth' => $this->getAuth($request),
            'artist' => $artist, 
            'albums' => $albumData, 
        ]);
    }

   public function albumInfo(Request $request, $artist, $id)
    {
        // 1. Define a unique cache key for this specific album
        // We use the ID so every album gets its own cache entry
        $cacheKey = "album_details_{$id}";

        // 2. Try to get data from Cache first. 
        // If missing, run the function (API calls), save it for 24 hours (86400s), and return it.
        $albumData = Cache::remember($cacheKey, 86400, function () use ($artist, $id) {
            
            // --- EXPENSIVE API WORK HAPPENS HERE ---
            
            // A. Core Data from Spotify
            $spotifyDetails = $this->music->getAlbumDetails($id); 

            // B. Return the combined array to be saved in Cache
            return [
                'name' => $spotifyDetails['name'],
                'artist' => $artist,
                'image' => $spotifyDetails['images'][0]['url'] ?? null,
                'tracks' => $spotifyDetails['tracks']['items'],
                
                // Secondary API Calls (MusicBrainz + Last.fm)
                'history' => $this->brainz->getAlbumMetadata($spotifyDetails['name']),
                'lastfm_info' => $this->lastfm->getAlbumBio($artist, $spotifyDetails['name']),
            ];
        });

        // 3. Render the View
        // Note: 'auth' is NOT cached because it changes depending on who is logged in.
        return Inertia::render('Artist/AlbumInfo', [
            'auth' => $this->getAuth($request),
            'album' => $albumData,
        ]);
    }


    public function lyrics(Request $request)
    {
        $artist = $request->input('artist');
        $track = $request->input('track');

        // 1. Call the Lyrics.ovh API (No Key Needed!)
        $response = \Illuminate\Support\Facades\Http::get("https://api.lyrics.ovh/v1/{$artist}/{$track}");
        
        $data = $response->json();

        // 2. Return the text, or a friendly error if not found
        return response()->json([
            'lyrics' => $data['lyrics'] ?? "Sorry, full lyrics for this track are not available in the public database."
        ]);
    }
}