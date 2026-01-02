<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class MarketPrice extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'product_id',
        'market_name',
        'location',
        'region',
        'district',
        'price',
        'unit',
        'currency',
        'price_date',
        'source',
        'quality_grade',
        'availability_status',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'price_date' => 'date',
    ];

    /**
     * Get the product that owns the market price.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

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
     * Scope a query to filter by market.
     */
    public function scopeInMarket(Builder $query, string $market): Builder
    {
        return $query->where('market_name', $market);
    }

    /**
     * Scope a query to filter by date range.
     */
    public function scopeDateBetween(Builder $query, $startDate, $endDate): Builder
    {
        return $query->whereBetween('price_date', [$startDate, $endDate]);
    }

    /**
     * Scope a query to get recent prices.
     */
    public function scopeRecent(Builder $query, int $days = 30): Builder
    {
        return $query->where('price_date', '>=', now()->subDays($days));
    }

    /**
     * Scope a query to filter by availability.
     */
    public function scopeAvailable(Builder $query): Builder
    {
        return $query->where('availability_status', 'available');
    }

    /**
     * Get formatted price with currency.
     */
    public function getFormattedPriceAttribute(): string
    {
        return $this->currency . ' ' . number_format($this->price, 2);
    }

    /**
     * Get price per unit display.
     */
    public function getPricePerUnitAttribute(): string
    {
        return $this->getFormattedPriceAttribute() . ' per ' . $this->unit;
    }

    /**
     * Check if price is recent (within last 7 days).
     */
    public function isRecent(): bool
    {
        return $this->price_date && $this->price_date->isAfter(now()->subDays(7));
    }

    /**
     * Check if product is available.
     */
    public function isAvailable(): bool
    {
        return $this->availability_status === 'available';
    }

    /**
     * Get price trend compared to previous price.
     */
    public function getPriceTrendAttribute(): ?string
    {
        $previousPrice = static::where('product_id', $this->product_id)
            ->where('market_name', $this->market_name)
            ->where('price_date', '<', $this->price_date)
            ->orderBy('price_date', 'desc')
            ->first();

        if (!$previousPrice) {
            return null;
        }

        if ($this->price > $previousPrice->price) {
            return 'up';
        } elseif ($this->price < $previousPrice->price) {
            return 'down';
        } else {
            return 'stable';
        }
    }

    /**
     * Get price change percentage.
     */
    public function getPriceChangePercentageAttribute(): ?float
    {
        $previousPrice = static::where('product_id', $this->product_id)
            ->where('market_name', $this->market_name)
            ->where('price_date', '<', $this->price_date)
            ->orderBy('price_date', 'desc')
            ->first();

        if (!$previousPrice || $previousPrice->price == 0) {
            return null;
        }

        return round((($this->price - $previousPrice->price) / $previousPrice->price) * 100, 2);
    }
}