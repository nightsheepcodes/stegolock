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
        Schema::create('process_metrics', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('document_id')->nullable()->index();
            $table->unsignedBigInteger('user_id')->nullable()->index();
            $table->string('job_id')->nullable()->index(); // UUID for the specific process run
            $table->string('job_type')->nullable()->index(); // e.g., 'lock', 'unlock'
            $table->string('step'); // e.g., 'encryption', 'embedding', 'cloud_storage'
            $table->decimal('duration_ms', 12, 4); // Precision up to 4 decimal places
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();

            // Foreign keys
            $table->foreign('document_id')->references('document_id')->on('documents')->onDelete('set null');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('process_metrics');
    }
};
