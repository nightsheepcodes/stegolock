<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL; // 1. Add this exact line here
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // 2. Add this block to force Azure to use HTTPS
        if (env('APP_ENV') === 'production') {
            URL::forceScheme('https');
        }

        // Register custom Brevo HTTP API Mail Transport
        \Illuminate\Support\Facades\Mail::extend('brevo-api', function (array $config) {
            return new \App\Mail\Transports\BrevoApiTransport($config['key']);
        });
    }
}