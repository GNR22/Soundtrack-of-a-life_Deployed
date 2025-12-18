<?php
/*
namespace App\Services;

use Illuminate\Support\Facades\Http;

class DeezerService
{
    private $baseUrl = "https://api.deezer.com";

    public function searchAlbum($artist, $album)
    {
        $query = urlencode("$artist $album album");
        $url = "{$this->baseUrl}/search/album?q={$query}";

        $response = Http::get($url);
        return $response->json();
    }

    public function getAlbumTracks($albumId)
    {
        $url = "{$this->baseUrl}/album/{$albumId}/tracks";
        $response = Http::get($url);
        return $response->json();
    }

    public function getAlbumDetails($artist, $album)
    {
        $search = $this->searchAlbum($artist, $album);

        if (!isset($search['data'][0])) {
            return null;
        }

        $albumData = $search['data'][0];
        $albumId = $albumData['id'];

        $tracksResponse = $this->getAlbumTracks($albumId);

        $tracks = [];
        foreach ($tracksResponse['data'] ?? [] as $track) {
            $tracks[] = [
                'name' => $track['title'],
                'preview' => $track['preview'], // ALWAYS 30 seconds!
                'duration_ms' => $track['duration'] * 1000,
            ];
        }

        return [
            'deezer_id' => $albumId,
            'name' => $albumData['title'],
            'artist' => $albumData['artist']['name'],
            'image' => $albumData['cover_xl'] ?? $albumData['cover_big'],
            'track_count' => count($tracks),
            'preview_url' => $tracks[0]['preview'] ?? null,
            'tracks' => $tracks
        ];
    }
}
*/