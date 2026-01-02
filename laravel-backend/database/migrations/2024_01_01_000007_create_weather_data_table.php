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
        Schema::create('weather_data', function (Blueprint $table) {
            $table->id();
            $table->string('region');
            $table->string('district')->nullable();
            $table->decimal('temperature_min', 5, 2)->nullable();
            $table->decimal('temperature_max', 5, 2)->nullable();
            $table->decimal('humidity', 5, 2)->nullable();
            $table->decimal('rainfall', 8, 2)->nullable();
            $table->decimal('wind_speed', 5, 2)->nullable();
            $table->string('weather_condition')->nullable();
            $table->date('forecast_date');
            $table->json('hourly_data')->nullable();
            $table->json('agricultural_advisory')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index(['region']);
            $table->index(['district']);
            $table->index(['forecast_date']);
            $table->index(['region', 'forecast_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('weather_data');
    }
};