<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class LastfmService
{
    protected string $key;
    protected string $url;

    public function __construct()
    {
        // Fallback to env() if config is not cached, just to be safe
        $this->key = config('services.lastfm.key', env('LASTFM_API_KEY'));
        $this->url = config('services.lastfm.url', 'http://ws.audioscrobbler.com/2.0/');
    }

    /**
     * Base request helper for Last.fm API
     */
    public function request(string $method, array $params = []): array
    {
        $response = Http::get($this->url, array_merge([
            'api_key' => $this->key,
            'format'  => 'json',
            'method'  => $method,
            'autocorrect' => 1, // Auto-fix small artist name typos
        ], $params));

        return $response->json() ?? [];
    }

    /**
     * Get Artist Info
     */
    public function getArtistInfo(string $artist): array
    {
        return $this->request('artist.getinfo', [
            'artist' => $artist
        ]) ?? [];
    }

    /**
     * Get Artist Albums
     */
    public function getArtistAlbums(string $artist): array
    {
        return $this->request('artist.gettopalbums', [
            'artist' => $artist
        ]) ?? [];
    }

    /**
     * Get Album Info (With Wiki/Bio Support)
     */
    public function getAlbumInfo(string $artist, string $album): array
    {
        $raw = $this->request('album.getinfo', [
            'artist' => $artist,
            'album'  => $album
        ]);

        if (!isset($raw['album'])) {
            return [
                'name'   => $album,
                'artist' => $artist,
                'mbid'   => null,
                'image'  => null,
                'tracks' => [],
                'wiki'   => null,
            ];
        }

        $a = $raw['album'];

        return [
            'name'   => $a['name'] ?? $album,
            'artist' => $a['artist'] ?? $artist,
            'mbid'   => $a['mbid'] ?? null,
            
            // Get the largest image available
            'image'  => $a['image'][3]['#text'] 
                        ?? $a['image'][2]['#text'] 
                        ?? null,

            // Capture the Bio/Wiki if it exists
            'wiki'   => isset($a['wiki']) ? [
                'summary' => $a['wiki']['summary'] ?? '',
                'content' => $a['wiki']['content'] ?? '',
                'published' => $a['wiki']['published'] ?? null,
            ] : null,

            'tracks' => array_map(
                fn($t) => [
                    'name' => $t['name'] ?? '',
                    'url'  => $t['url'] ?? null,
                    'duration' => $t['duration'] ?? 0,
                ],
                is_array($a['tracks']['track'] ?? null) 
                    ? $a['tracks']['track'] 
                    : [] // Handle single track or empty array edge cases
            ),
        ];
    }

    /**
     * Get just the bio (Used by MusicController)
     */
    public function getAlbumBio(string $artist, string $album): ?array
    {
        $info = $this->getAlbumInfo($artist, $album);

        if (!empty($info['wiki']['summary'])) {
            return [
                'summary' => $info['wiki']['summary'],
                'published' => $info['wiki']['published'] ?? null,
            ];
        }

        return null;
    }
}