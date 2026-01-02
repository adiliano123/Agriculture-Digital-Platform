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
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('farm_size', 10, 2)->nullable();
            $table->text('farm_location')->nullable();
            $table->json('crops_grown')->nullable();
            $table->json('livestock_owned')->nullable();
            $table->integer('farming_experience')->nullable();
            $table->string('education_level')->nullable();
            $table->enum('preferred_language', ['en', 'sw'])->default('en');
            $table->text('bio')->nullable();
            $table->json('coordinates')->nullable(); // For GPS location
            $table->timestamps();
            
            // Indexes
            $table->index(['user_id']);
            $table->index(['preferred_language']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};