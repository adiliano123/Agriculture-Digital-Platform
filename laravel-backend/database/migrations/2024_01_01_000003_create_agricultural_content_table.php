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
        Schema::create('agricultural_content', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->longText('content');
            $table->string('excerpt')->nullable();
            $table->enum('content_type', ['article', 'video', 'guide', 'resource', 'news']);
            $table->string('category')->nullable();
            $table->json('tags')->nullable();
            $table->foreignId('author_id')->constrained('users');
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->boolean('featured')->default(false);
            $table->integer('views_count')->default(0);
            $table->enum('language', ['en', 'sw', 'both'])->default('both');
            $table->string('image_url')->nullable();
            $table->string('video_url')->nullable();
            $table->json('attachments')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index(['status', 'published_at']);
            $table->index(['content_type']);
            $table->index(['category']);
            $table->index(['language']);
            $table->index(['featured']);
            $table->fullText(['title', 'content']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agricultural_content');
    }
};