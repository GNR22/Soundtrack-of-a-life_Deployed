<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class MusicBrainzService
{
    protected $baseUrl = 'https://musicbrainz.org/ws/2';

    // MusicBrainz requires a unique User-Agent to prevent blocking
   protected function headers()
{
    // These pull from your .env file automatically
    $agent = env('MUSICBRAINZ_USER_AGENT', 'MusicExplorerApp/1.0');
    $email = env('MUSICBRAINZ_USER_AGENT_EMAIL');

    return [
        'User-Agent' => "{$agent} ({$email})",
        'Accept' => 'application/json'
    ];
}
    public function getArtistContext($artistName)
    {
        // 1. Search for the artist to get their MusicBrainz ID (MBID)
        // We use strict scoring to get the best match
        $search = Http::withHeaders($this->headers())
            ->timeout(5) // Stop waiting after 5 seconds
            ->get("{$this->baseUrl}/artist", [
                'query' => "artist:\"{$artistName}\"",
                'fmt' => 'json',
                'limit' => 1
            ])->json();

        $artist = $search['artists'][0] ?? null;

        if (!$artist) return null;

        $mbid = $artist['id'];

        // 2. Fetch full details: Release Groups (Albums), Relations (Links), and Tags
        $details = Http::withHeaders($this->headers())
            ->get("{$this->baseUrl}/artist/{$mbid}", [
                'inc' => 'release-groups+url-rels+tags',
                'fmt' => 'json'
            ])->json();

        return $this->formatHistory($details);
    }

    protected function formatHistory($data)
    {
        // Filter out only Albums and Singles, sort by release date
        $releases = collect($data['release-groups'] ?? [])
            ->filter(fn($rg) => in_array($rg['primary-type'] ?? '', ['Album', 'Single']))
            ->sortBy('first-release-date') // Chronological order
            ->map(fn($rg) => [
                'id' => $rg['id'],
                'title' => $rg['title'],
                'year' => substr($rg['first-release-date'] ?? 'Unknown', 0, 4),
                'date' => $rg['first-release-date'] ?? 'Unknown',
                'type' => $rg['primary-type'] ?? 'Unknown',
            ])
            ->values()
            ->all();

        return [
            'name' => $data['name'],
            'type' => $data['type'] ?? 'Unknown',
            'country' => $data['country'] ?? 'Unknown',
            'life_span' => [
                'begin' => $data['life-span']['begin'] ?? '?',
                'end' => $data['life-span']['end'] ?? ($data['life-span']['ended'] ? 'Disbanded' : 'Present'),
            ],
            'tags' => collect($data['tags'] ?? [])->take(5)->pluck('name')->all(),
            'releases' => $releases,
        ];
    }

    // Add this to app/Services/MusicBrainzService.php

    public function getAlbumMetadata($albumName)
    {
        // Search for the Release Group by name
        $response = \Illuminate\Support\Facades\Http::withHeaders($this->headers())
            ->get("{$this->baseUrl}/release-group", [
                'query' => 'release_group:"' . $albumName . '"', // Search strictly for this album
                'fmt' => 'json',
                'limit' => 1
            ])->json();

        $data = $response['release-groups'][0] ?? null;

        if (!$data) return null;

        return [
            'details' => 'First released in ' . ($data['first-release-date'] ?? 'Unknown'),
            'id' => $data['id']
        ];
    }
}