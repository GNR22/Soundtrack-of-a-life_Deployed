<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\Facades\URL;
// ▼ IMPORT YOUR SERVICES (Crucial Step) ▼
use App\Services\SpotifyService;
use App\Services\LastFmService;
use App\Services\DeezerService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // ▼ THIS IS THE MISSING PART ▼
        $this->app->singleton('music', function ($app) {
            
            // Check .env for MUSIC_DRIVER=spotify
            $driver = env('MUSIC_DRIVER', 'spotify');

            return match ($driver) {
                'lastfm' => new LastFmService(),
                'deezer' => new DeezerService(),
                default  => new SpotifyService(),
            };
        });
    }

    /**
     * Bootstrap any application services.
     */
   public function boot(): void
    {
        // Force HTTPS when in production (Vercel)
        if (env('APP_ENV') === 'production') {
            URL::forceScheme('https');
        }
    }
}