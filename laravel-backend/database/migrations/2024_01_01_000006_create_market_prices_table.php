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
        Schema::create('market_prices', function (Blueprint $table) {
            $table->id();
            $table->string('crop_name');
            $table->string('market_location');
            $table->decimal('price_per_kg', 10, 2);
            $table->string('currency', 10)->default('TZS');
            $table->date('date_recorded');
            $table->string('source')->nullable();
            $table->enum('quality_grade', ['premium', 'standard', 'low'])->default('standard');
            $table->json('additional_info')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index(['crop_name']);
            $table->index(['market_location']);
            $table->index(['date_recorded']);
            $table->index(['crop_name', 'market_location', 'date_recorded']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('market_prices');
    }
};