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
        Schema::create('consultations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('farmer_id')->constrained('users');
            $table->foreignId('extension_officer_id')->nullable()->constrained('users');
            $table->string('title');
            $table->longText('question');
            $table->longText('answer')->nullable();
            $table->string('category')->nullable();
            $table->enum('status', ['pending', 'in_progress', 'answered', 'closed'])->default('pending');
            $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
            $table->json('attachments')->nullable();
            $table->timestamp('answered_at')->nullable();
            $table->decimal('rating', 3, 2)->nullable();
            $table->text('feedback')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index(['farmer_id']);
            $table->index(['extension_officer_id']);
            $table->index(['status']);
            $table->index(['priority']);
            $table->index(['category']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultations');
    }
};