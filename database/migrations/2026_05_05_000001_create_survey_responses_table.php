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
            
            // Performance Efficiency (PE1-PE7)
            $table->integer('pe1')->nullable()->comment('Responsive when displaying information');
            $table->integer('pe2')->nullable()->comment('Responds quickly when updating user info');
            $table->integer('pe3')->nullable()->comment('No delays when accessing/updating data');
            $table->integer('pe4')->nullable()->comment('Buttons respond well without much time');
            $table->integer('pe5')->nullable()->comment('Responsive in providing results/reactions');
            $table->integer('pe6')->nullable()->comment('No performance issues (slow response, etc.)');
            $table->integer('pe7')->nullable()->comment('Compatible with device');
            
            // Usability (US1-US9)
            $table->integer('us1')->nullable()->comment('Easy to remember how to use');
            $table->integer('us2')->nullable()->comment('Easy to use');
            $table->integer('us3')->nullable()->comment('Quickly understand additional features');
            $table->integer('us4')->nullable()->comment('Makes updated data easier');
            $table->integer('us5')->nullable()->comment('Never had difficulty with features (original US6)');
            $table->integer('us6')->nullable()->comment('Never had difficulty using features');
            $table->integer('us7')->nullable()->comment('Easily accessible');
            $table->integer('us8')->nullable()->comment('Accessible in certain situations/conditions');
            $table->integer('us9')->nullable()->comment('Can be used anywhere');
            
            // Reliability (RE1-RE6)
            $table->integer('re1')->nullable()->comment('Can be used at any time');
            $table->integer('re2')->nullable()->comment('No crashes/lags/failures');
            $table->integer('re3')->nullable()->comment('Easily used on PC and mobile');
            $table->integer('re4')->nullable()->comment('Good performance with various internet connections');
            $table->integer('re5')->nullable()->comment('Recovers normally after errors');
            $table->integer('re6')->nullable()->comment('Always reliable overall');
            
            // Security (SC1-SC5)
            $table->integer('sc1')->nullable()->comment('Good control and data security');
            $table->integer('sc2')->nullable()->comment('Trustworthy application');
            $table->integer('sc3')->nullable()->comment('Only authorized users can view/update/upload');
            $table->integer('sc4')->nullable()->comment('Strong authentication mechanism');
            $table->integer('sc5')->nullable()->comment('Only provides access to authorized users');
            
            // Additional feedback
            $table->text('additional_comments')->nullable();
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
