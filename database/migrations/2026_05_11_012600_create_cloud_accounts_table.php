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
        Schema::create('cloud_accounts', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g. "Experimental Account"
            $table->string('key_id'); // B2 Application Key ID
            $table->text('application_key'); // Encrypted Application Key
            $table->string('bucket_name');
            $table->boolean('is_active')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cloud_accounts');
    }
};
