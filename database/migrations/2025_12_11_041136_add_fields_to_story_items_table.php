<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('story_items', function (Blueprint $table) {
            if (!Schema::hasColumn('story_items', 'favorite')) {
                $table->boolean('favorite')->default(false);
            }

            if (!Schema::hasColumn('story_items', 'track_count')) {
                $table->integer('track_count')->nullable();
            }

            if (!Schema::hasColumn('story_items', 'preview_url')) {
                $table->string('preview_url')->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('story_items', function (Blueprint $table) {
            if (Schema::hasColumn('story_items', 'favorite')) {
                $table->dropColumn('favorite');
            }

            if (Schema::hasColumn('story_items', 'track_count')) {
                $table->dropColumn('track_count');
            }

            if (Schema::hasColumn('story_items', 'preview_url')) {
                $table->dropColumn('preview_url');
            }
        });
    }
};
