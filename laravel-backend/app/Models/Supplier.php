<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Builder;

class Supplier extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'company_name',
        'business_license',
        'supplier_type',
        'description',
        'address',
        'region',
        'district',
        'verification_status',
        'rating',
        'total_reviews',
        'operating_hours',
        'delivery_areas',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'rating' => 'decimal:2',
        'operating_hours' => 'array',
        'delivery_areas' => 'array',
    ];

    /**
     * Get the user that owns the supplier profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the supplier's products.
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    /**
     * Get all of the supplier's reviews.
     */
    public function reviews(): MorphMany
    {
        return $this->morphMany(Review::class, 'reviewable');
    }

    /**
     * Scope a query to only include verified suppliers.
     */
    public function scopeVerified(Builder $query): Builder
    {
        return $query->where('verification_status', 'verified');
    }

    /**
     * Scope a query to filter by supplier type.
     */
    public function scopeOfType(Builder $query, string $type): Builder
    {
        return $query->where('supplier_type', $type);
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
     * Scope a query to search suppliers.
     */
    public function scopeSearch(Builder $query, string $search): Builder
    {
        return $query->where(function ($q) use ($search) {
            $q->where('company_name', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%");
        });
    }

    /**
     * Check if supplier is verified.
     */
    public function isVerified(): bool
    {
        return $this->verification_status === 'verified';
    }

    /**
     * Check if supplier is pending verification.
     */
    public function isPending(): bool
    {
        return $this->verification_status === 'pending';
    }

    /**
     * Check if supplier is rejected.
     */
    public function isRejected(): bool
    {
        return $this->verification_status === 'rejected';
    }

    /**
     * Get active products count.
     */
    public function getActiveProductsCountAttribute(): int
    {
        return $this->products()->where('status', 'active')->count();
    }

    /**
     * Update supplier rating based on reviews.
     */
    public function updateRating(): void
    {
        $averageRating = $this->reviews()->avg('rating') ?? 0;
        $totalReviews = $this->reviews()->count();

        $this->update([
            'rating' => round($averageRating, 2),
            'total_reviews' => $totalReviews,
        ]);
    }

    /**
     * Check if supplier delivers to a specific area.
     */
    public function deliversTo(string $area): bool
    {
        if (empty($this->delivery_areas)) {
            return false;
        }

        return in_array($area, $this->delivery_areas);
    }

    /**
     * Get supplier's operating status for current time.
     */
    public function isCurrentlyOpen(): bool
    {
        if (empty($this->operating_hours)) {
            return true; // Assume open if no hours specified
        }

        $currentDay = strtolower(now()->format('l'));
        $currentTime = now()->format('H:i');

        if (!isset($this->operating_hours[$currentDay])) {
            return false;
        }

        $hours = $this->operating_hours[$currentDay];
        
        if ($hours === 'closed') {
            return false;
        }

        if (isset($hours['open']) && isset($hours['close'])) {
            return $currentTime >= $hours['open'] && $currentTime <= $hours['close'];
        }

        return true;
    }
}