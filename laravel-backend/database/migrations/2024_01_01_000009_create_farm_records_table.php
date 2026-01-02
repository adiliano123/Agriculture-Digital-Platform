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
        Schema::create('farm_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('record_type', ['planting', 'harvesting', 'fertilizing', 'pest_control', 'irrigation', 'sales', 'expenses']);
            $table->string('crop_name')->nullable();
            $table->decimal('area_size', 10, 2)->nullable();
            $table->decimal('quantity', 10, 2)->nullable();
            $table->string('unit')->nullable();
            $table->decimal('cost', 10, 2)->nullable();
            $table->decimal('revenue', 10, 2)->nullable();
            $table->text('notes')->nullable();
            $table->date('record_date');
            $table->json('additional_data')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index(['user_id']);
            $table->index(['record_type']);
            $table->index(['crop_name']);
            $table->index(['record_date']);
            $table->index(['user_id', 'record_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('farm_records');
    }
};