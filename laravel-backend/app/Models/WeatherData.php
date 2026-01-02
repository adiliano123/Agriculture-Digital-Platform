<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class WeatherData extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'location',
        'region',
        'district',
        'coordinates',
        'temperature',
        'humidity',
        'rainfall',
        'wind_speed',
        'wind_direction',
        'pressure',
        'weather_condition',
        'forecast_date',
        'data_source',
        'additional_data',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'coordinates' => 'array',
        'temperature' => 'decimal:1',
        'humidity' => 'decimal:1',
        'rainfall' => 'decimal:2',
        'wind_speed' => 'decimal:1',
        'pressure' => 'decimal:2',
        'forecast_date' => 'datetime',
        'additional_data' => 'array',
    ];

    /**
     * Scope a query to filter by region.
     */
    public function scopeInRegion(Builder $query, string $region): Builder
    {
        return $query->where('region', $region);
    }

    /**
     * Scope a query to filter by district.
     */
    public function scopeInDistrict(Builder $query, string $district): Builder
    {
        return $query->where('district', $district);
    }

    /**
     * Scope a query to filter by location.
     */
    public function scopeAtLocation(Builder $query, string $location): Builder
    {
        return $query->where('location', $location);
    }

    /**
     * Scope a query to filter by date range.
     */
    public function scopeDateBetween(Builder $query, $startDate, $endDate): Builder
    {
        return $query->whereBetween('forecast_date', [$startDate, $endDate]);
    }

    /**
     * Scope a query to get current weather.
     */
    public function scopeCurrent(Builder $query): Builder
    {
        return $query->whereDate('forecast_date', now()->toDateString());
    }

    /**
     * Scope a query to get forecast data.
     */
    public function scopeForecast(Builder $query, int $days = 7): Builder
    {
        return $query->whereBetween('forecast_date', [
            now()->toDateString(),
            now()->addDays($days)->toDateString()
        ]);
    }

    /**
     * Scope a query to get recent data.
     */
    public function scopeRecent(Builder $query, int $days = 30): Builder
    {
        return $query->where('forecast_date', '>=', now()->subDays($days));
    }

    /**
     * Get temperature in Fahrenheit.
     */
    public function getTemperatureFahrenheitAttribute(): float
    {
        return ($this->temperature * 9/5) + 32;
    }

    /**
     * Get formatted temperature.
     */
    public function getFormattedTemperatureAttribute(): string
    {
        return $this->temperature . '°C';
    }

    /**
     * Get formatted humidity.
     */
    public function getFormattedHumidityAttribute(): string
    {
        return $this->humidity . '%';
    }

    /**
     * Get formatted rainfall.
     */
    public function getFormattedRainfallAttribute(): string
    {
        return $this->rainfall . ' mm';
    }

    /**
     * Get formatted wind speed.
     */
    public function getFormattedWindSpeedAttribute(): string
    {
        return $this->wind_speed . ' km/h';
    }

    /**
     * Get formatted pressure.
     */
    public function getFormattedPressureAttribute(): string
    {
        return $this->pressure . ' hPa';
    }

    /**
     * Check if it's a rainy day.
     */
    public function isRainy(): bool
    {
        return $this->rainfall > 0;
    }

    /**
     * Check if it's a hot day (temperature > 30°C).
     */
    public function isHot(): bool
    {
        return $this->temperature > 30;
    }

    /**
     * Check if it's a cold day (temperature < 15°C).
     */
    public function isCold(): bool
    {
        return $this->temperature < 15;
    }

    /**
     * Check if humidity is high (> 80%).
     */
    public function isHighHumidity(): bool
    {
        return $this->humidity > 80;
    }

    /**
     * Get weather condition icon.
     */
    public function getWeatherIconAttribute(): string
    {
        $condition = strtolower($this->weather_condition);
        
        $icons = [
            'sunny' => '☀️',
            'clear' => '☀️',
            'cloudy' => '☁️',
            'partly cloudy' => '⛅',
            'overcast' => '☁️',
            'rainy' => '🌧️',
            'light rain' => '🌦️',
            'heavy rain' => '⛈️',
            'thunderstorm' => '⛈️',
            'foggy' => '🌫️',
            'windy' => '💨',
        ];

        return $icons[$condition] ?? '🌤️';
    }

    /**
     * Get farming advice based on weather conditions.
     */
    public function getFarmingAdviceAttribute(): array
    {
        $advice = [];

        if ($this->isRainy()) {
            $advice[] = 'Good day for planting if soil conditions are suitable';
            $advice[] = 'Avoid heavy machinery operations to prevent soil compaction';
        }

        if ($this->isHot()) {
            $advice[] = 'Ensure adequate irrigation for crops';
            $advice[] = 'Consider shade for livestock';
        }

        if ($this->isCold()) {
            $advice[] = 'Protect sensitive crops from cold damage';
            $advice[] = 'Provide shelter for livestock';
        }

        if ($this->isHighHumidity()) {
            $advice[] = 'Monitor crops for fungal diseases';
            $advice[] = 'Ensure good ventilation in storage areas';
        }

        if ($this->wind_speed > 20) {
            $advice[] = 'Avoid spraying pesticides or fertilizers';
            $advice[] = 'Secure loose materials and equipment';
        }

        return $advice;
    }

    /**
     * Get latitude coordinate.
     */
    public function getLatitudeAttribute(): ?float
    {
        return $this->coordinates['latitude'] ?? null;
    }

    /**
     * Get longitude coordinate.
     */
    public function getLongitudeAttribute(): ?float
    {
        return $this->coordinates['longitude'] ?? null;
    }
}