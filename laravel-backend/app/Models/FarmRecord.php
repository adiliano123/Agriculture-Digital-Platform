<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class FarmRecord extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'record_type',
        'title',
        'description',
        'crop_type',
        'field_name',
        'area_size',
        'planting_date',
        'harvest_date',
        'quantity_planted',
        'quantity_harvested',
        'unit',
        'cost',
        'revenue',
        'weather_conditions',
        'soil_conditions',
        'fertilizers_used',
        'pesticides_used',
        'irrigation_method',
        'notes',
        'images',
        'coordinates',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'planting_date' => 'date',
        'harvest_date' => 'date',
        'area_size' => 'decimal:2',
        'quantity_planted' => 'decimal:2',
        'quantity_harvested' => 'decimal:2',
        'cost' => 'decimal:2',
        'revenue' => 'decimal:2',
        'fertilizers_used' => 'array',
        'pesticides_used' => 'array',
        'images' => 'array',
        'coordinates' => 'array',
    ];

    /**
     * Get the user that owns the farm record.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to filter by record type.
     */
    public function scopeOfType(Builder $query, string $type): Builder
    {
        return $query->where('record_type', $type);
    }

    /**
     * Scope a query to filter by crop type.
     */
    public function scopeForCrop(Builder $query, string $crop): Builder
    {
        return $query->where('crop_type', $crop);
    }

    /**
     * Scope a query to filter by planting season.
     */
    public function scopePlantedBetween(Builder $query, $startDate, $endDate): Builder
    {
        return $query->whereBetween('planting_date', [$startDate, $endDate]);
    }

    /**
     * Scope a query to filter by harvest season.
     */
    public function scopeHarvestedBetween(Builder $query, $startDate, $endDate): Builder
    {
        return $query->whereBetween('harvest_date', [$startDate, $endDate]);
    }

    /**
     * Scope a query to get current season records.
     */
    public function scopeCurrentSeason(Builder $query): Builder
    {
        $currentYear = now()->year;
        return $query->whereYear('planting_date', $currentYear);
    }

    /**
     * Scope a query to get completed records (harvested).
     */
    public function scopeCompleted(Builder $query): Builder
    {
        return $query->whereNotNull('harvest_date');
    }

    /**
     * Scope a query to get ongoing records (not yet harvested).
     */
    public function scopeOngoing(Builder $query): Builder
    {
        return $query->whereNull('harvest_date')
                    ->whereNotNull('planting_date');
    }

    /**
     * Get the profit from this record.
     */
    public function getProfitAttribute(): float
    {
        return $this->revenue - $this->cost;
    }

    /**
     * Get the profit margin percentage.
     */
    public function getProfitMarginAttribute(): float
    {
        if ($this->cost == 0) {
            return 0;
        }
        return ($this->profit / $this->cost) * 100;
    }

    /**
     * Get yield per hectare.
     */
    public function getYieldPerHectareAttribute(): ?float
    {
        if (!$this->quantity_harvested || !$this->area_size || $this->area_size == 0) {
            return null;
        }
        return $this->quantity_harvested / $this->area_size;
    }

    /**
     * Get cost per hectare.
     */
    public function getCostPerHectareAttribute(): ?float
    {
        if (!$this->cost || !$this->area_size || $this->area_size == 0) {
            return null;
        }
        return $this->cost / $this->area_size;
    }

    /**
     * Get revenue per hectare.
     */
    public function getRevenuePerHectareAttribute(): ?float
    {
        if (!$this->revenue || !$this->area_size || $this->area_size == 0) {
            return null;
        }
        return $this->revenue / $this->area_size;
    }

    /**
     * Get growing period in days.
     */
    public function getGrowingPeriodAttribute(): ?int
    {
        if (!$this->planting_date || !$this->harvest_date) {
            return null;
        }
        return $this->planting_date->diffInDays($this->harvest_date);
    }

    /**
     * Get days since planting.
     */
    public function getDaysSincePlantingAttribute(): ?int
    {
        if (!$this->planting_date) {
            return null;
        }
        return $this->planting_date->diffInDays(now());
    }

    /**
     * Check if record is completed (harvested).
     */
    public function isCompleted(): bool
    {
        return !is_null($this->harvest_date);
    }

    /**
     * Check if record is ongoing.
     */
    public function isOngoing(): bool
    {
        return !is_null($this->planting_date) && is_null($this->harvest_date);
    }

    /**
     * Check if crop is ready for harvest (estimated).
     */
    public function isReadyForHarvest(): bool
    {
        if (!$this->planting_date || $this->isCompleted()) {
            return false;
        }

        // Rough estimates for common crops in Tanzania
        $cropMaturityDays = [
            'maize' => 120,
            'rice' => 120,
            'beans' => 90,
            'cassava' => 365,
            'sweet_potato' => 120,
            'irish_potato' => 90,
            'tomato' => 75,
            'onion' => 120,
            'cabbage' => 90,
        ];

        $maturityDays = $cropMaturityDays[strtolower($this->crop_type)] ?? 120;
        
        return $this->days_since_planting >= $maturityDays;
    }

    /**
     * Get formatted area size.
     */
    public function getFormattedAreaSizeAttribute(): string
    {
        return $this->area_size . ' hectares';
    }

    /**
     * Get formatted cost.
     */
    public function getFormattedCostAttribute(): string
    {
        return 'TZS ' . number_format($this->cost, 2);
    }

    /**
     * Get formatted revenue.
     */
    public function getFormattedRevenueAttribute(): string
    {
        return 'TZS ' . number_format($this->revenue, 2);
    }

    /**
     * Get formatted profit.
     */
    public function getFormattedProfitAttribute(): string
    {
        $profit = $this->profit;
        $sign = $profit >= 0 ? '+' : '';
        return $sign . 'TZS ' . number_format($profit, 2);
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

    /**
     * Get record status based on dates.
     */
    public function getStatusAttribute(): string
    {
        if ($this->isCompleted()) {
            return 'completed';
        } elseif ($this->isOngoing()) {
            if ($this->isReadyForHarvest()) {
                return 'ready_for_harvest';
            }
            return 'growing';
        } else {
            return 'planned';
        }
    }
}