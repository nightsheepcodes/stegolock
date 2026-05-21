<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Add email_2fa_enabled to users table
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('email_2fa_enabled')->default(false)->after('email_verified_at');
        });

        // 2. Create login_otps table
        Schema::create('login_otps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('code');
            $table->timestamp('expires_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('login_otps');

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('email_2fa_enabled');
        });
    }
};
