<?php
/* */
namespace App\Services;

use Illuminate\Support\Facades\Http;

class SpotifyService
{
    protected $clientId;
    protected $clientSecret;

    public function __construct()
    {
        $this->clientId = config('services.spotify.client_id');
        $this->clientSecret = config('services.spotify.client_secret');
    }

    /**
     * Centralized Token Management
     */
    private function getAccessToken()
    {
        // Check Cache
        if (cache()->has('spotify_token')) {
            return cache('spotify_token');
        }

        // Request from Real Spotify Auth URL
        $response = Http::asForm()
            ->withHeaders([
                'Authorization' => 'Basic ' . base64_encode("{$this->clientId}:{$this->clientSecret}")
            ])
            ->post('https://accounts.spotify.com/api/token', [
                'grant_type' => 'client_credentials',
            ]);

        $token = $response->json()['access_token'] ?? null;

        // Cache for 1 hour
        if ($token) {
            cache()->put('spotify_token', $token, 3500);
        }

        return $token;
    }

    /**
     * Generic GET request to Spotify API
     */
    private function get($endpoint, $params = [])
    {
        $token = $this->getAccessToken();
        if (!$token) return null;

        return Http::withToken($token)
            ->get("https://api.spotify.com/v1/{$endpoint}", $params)
            ->json();
    }

    // DASHBOARD GRID 
    public function getFeaturedArtists()
    {
        // Search for popular artists (simulated by year)
        $data = $this->get('search', [
            'q' => 'year:2024',
            'type' => 'artist',
            'limit' => 12 
        ]);

        return $data['artists']['items'] ?? [];
    }

    // SEARCH ARTIST ---
    public function getArtist($name)
    {
        $data = $this->get('search', [
            'q' => $name,
            'type' => 'artist',
            'limit' => 1
        ]);

        $artist = $data['artists']['items'][0] ?? null;

        if (!$artist) return null;

        return [
            'name' => $artist['name'],
            'image' => $artist['images'][0]['url'] ?? null,
            'listeners' => $artist['followers']['total'] ?? 0,
            'playcount' => 0, 
        ];
    }

    // ARTIST ALBUMS 
    public function searchAlbum($artist)
    {
        return $this->get('search', [
            'q' => "artist:{$artist}",
            'type' => 'album',
            'limit' => 10
        ]);
    }

    // ALBUM DETAILS 
    public function getAlbumDetails($id)
    {
        return $this->get("albums/{$id}");
    }

    // TRENDING ALBUMS
    public function getTrendingAlbums()
    {
        // Get new releases from Spotify
        $data = $this->get('browse/new-releases', [
            'limit' => 12
        ]);

        return array_map(function ($album) {
            return [
                'id' => $album['id'],
                'title' => $album['name'],
                'artist' => $album['artists'][0]['name'] ?? 'Unknown',
                'cover' => $album['images'][0]['url'] ?? 'https://via.placeholder.com/300'
            ];
        }, $data['albums']['items'] ?? []);
    }
}