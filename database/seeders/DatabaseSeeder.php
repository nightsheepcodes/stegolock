<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed Admin Users (only if empty)
        if (\App\Models\User::count() === 0) {
            $this->call(AdminUserSeeder::class);
        }

        // Seed Covers (only if empty)
        if (\Illuminate\Support\Facades\DB::table('covers')->count() === 0) {
            $this->call(StaticCoverSeeder::class);
        }

        // Seed Wiki Feeds (only if empty)
        if (\Illuminate\Support\Facades\DB::table('wiki_feeds')->count() === 0) {
            $this->call(WikiFeedsSeeder::class);
        }

        // Seed Survey Questions (only if empty)
        if (\App\Models\SurveyQuestion::count() === 0) {
            $this->call(SurveySeeder::class);
        }
    }
}
