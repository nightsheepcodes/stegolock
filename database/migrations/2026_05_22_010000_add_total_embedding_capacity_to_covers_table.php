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
        Schema::table('covers', function (Blueprint $table) {
            $table->bigInteger('total_embedding_capacity')->nullable()->after('size_bytes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('covers', function (Blueprint $table) {
            $table->dropColumn('total_embedding_capacity');
        });
    }
};
