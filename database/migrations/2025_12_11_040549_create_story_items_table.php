<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('story_items', function (Blueprint $table) {
            $table->id();

            // main data
            $table->unsignedBigInteger('user_id');
            $table->string('album_id')->nullable();
            $table->string('album_name');
            $table->string('artist_name');
            $table->string('album_cover')->nullable();

            // user-enhanced fields
            $table->boolean('favorite')->default(false);
            $table->integer('rating')->nullable();
            $table->string('notes', 1000)->nullable();
            $table->integer('track_count')->nullable();
            $table->string('preview_url')->nullable();

            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('story_items');
    }
};
