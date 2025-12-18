<?php
/* */
namespace App\Services;

use Illuminate\Support\Facades\Http;

class GeniusService
{
    protected $baseUrl = 'https://api.genius.com';

    protected function headers()
    {
        return [
            'Authorization' => 'Bearer ' . env('GENIUS_ACCESS_TOKEN'),
            'Accept' => 'application/json',
        ];
    }

    public function getSongData($artistName, $songName)
    {
        // Search for the specific song
        $response = Http::withHeaders($this->headers())
            ->get("{$this->baseUrl}/search", [
                'q' => "{$artistName} {$songName}"
            ])->json();

        // Return the first match's data (URL to lyrics, etc.)
        return $response['response']['hits'][0]['result'] ?? null;
    }
}