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
        Schema::create('survey_responses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->integer('experience_rating')->nullable(); // 1-5 rating
            $table->integer('ease_of_use_rating')->nullable(); // 1-5 rating
            $table->integer('security_confidence_rating')->nullable(); // 1-5 rating
            $table->text('features_used')->nullable(); // JSON or comma-separated
            $table->text('improvements_suggested')->nullable();
            $table->text('additional_comments')->nullable();
            $table->boolean('would_recommend')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('survey_responses');
    }
};
