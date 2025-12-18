<?php

namespace App\Http\Controllers;

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
        // 1. Core Data from Spotify
        $spotifyDetails = $this->music->getAlbumDetails($id); 

        // 2, 3, 4. Combined Metadata
        return Inertia::render('Artist/AlbumInfo', [
            'auth' => $this->getAuth($request),
            'album' => [
                'name' => $spotifyDetails['name'],
                'artist' => $artist,
                'image' => $spotifyDetails['images'][0]['url'] ?? null,
                'tracks' => $spotifyDetails['tracks']['items'],
                'history' => $this->brainz->getAlbumMetadata($spotifyDetails['name']),
                'lastfm_info' => $this->lastfm->getAlbumBio($artist, $spotifyDetails['name']),
            
            ]
        ]);
    }


    public function lyrics(Request $request)
    {
        $artist = $request->input('artist');
        $track = $request->input('track');

        // Use the service to get the real Genius data
        $songData = $this->genius->getSongData($artist, $track);

        return response()->json([
            'url' => $songData['url'] ?? "https://genius.com/search?q=" . urlencode("$artist $track")
        ]);
    }
}